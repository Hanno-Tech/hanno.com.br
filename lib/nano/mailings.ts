import { neon } from "@neondatabase/serverless";
import { betaDownloadEmail, emailEnabled, presaleOpenEmail, sendBatch, sendEmail, type Email } from "./email";
import { presaleOpen } from "./stripe";

// Who gets which Nanno e-mail, never twice: every send first claims (email, kind) in
// nano_email_log; a failed send releases the claim so the next run retries it.

// The founders' beta opens on December 1; NANNO_BETA_OPEN=1 opens it early (tests).
const BETA_OPENS = Date.parse("2026-12-01T00:00:00-03:00");
export function betaOpen(now = Date.now()) {
  return process.env.NANNO_BETA_OPEN === "1" || now >= BETA_OPENS;
}

function db() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

async function claim(emails: string[], kind: string) {
  if (!emails.length) return [];
  const rows = await db()!.query(
    `insert into nano_email_log (email, kind) select unnest($1::text[]), $2
     on conflict do nothing returning email`,
    [emails, kind],
  );
  return rows.map((r) => r.email as string);
}

async function release(emails: string[], kind: string) {
  await db()!.query("delete from nano_email_log where email = any($1::text[]) and kind = $2", [emails, kind]);
}

// Marks an e-mail as already sent without sending it (e.g. the purchase e-mail carried the download).
export const markSent = (email: string, kind: string) => claim([email], kind);

// Sends one transactional e-mail at most once per (email, kind). Never throws: a failed e-mail
// must not fail the signup or the Stripe webhook.
export async function sendOnce(email: string, kind: string, build: () => Email) {
  if (!emailEnabled() || !db()) return false;
  try {
    if (!(await claim([email], kind)).length) return false;
    try {
      await sendEmail(build());
      return true;
    } catch (err) {
      await release([email], kind);
      throw err;
    }
  } catch (err) {
    console.error(`nanno e-mail ${kind} failed:`, err);
    return false;
  }
}

type Recipient = { email: string; locale: string | null };

const BROADCASTS = {
  // Waitlist (still subscribed, hasn't bought yet) when the presale opens.
  presale_open: {
    open: () => presaleOpen(),
    build: (r: Recipient) => presaleOpenEmail(r.email, r.locale),
    recipients: `select w.email, w.locale from nano_waitlist w
                  where w.unsubscribed_at is null
                    and not exists (select 1 from nano_email_log l where l.email = w.email and l.kind = 'presale_open')
                    and not exists (select 1 from nano_orders o where o.email = w.email and o.status in ('paid', 'active'))
                  order by w.id limit $1`,
  },
  // Everyone with an active plan when the beta opens.
  beta_download: {
    open: () => betaOpen(),
    build: (r: Recipient) => betaDownloadEmail(r.email, r.locale),
    recipients: `select o.email, max(o.locale) as locale from nano_orders o
                  where o.email is not null
                    and ((o.plan = 'founder' and o.status = 'paid') or (o.plan in ('monthly', 'annual') and o.status in ('active', 'past_due')))
                    and not exists (select 1 from nano_email_log l where l.email = o.email and l.kind = 'beta_download')
                  group by o.email order by min(o.id) limit $1`,
  },
} as const;
export type BroadcastKind = keyof typeof BROADCASTS;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Sends up to `limit` pending e-mails of each open broadcast. Safe to run as often as you like.
// dryRun only counts who would get each e-mail.
export async function runBroadcasts({ limit = 200, dryRun = false } = {}) {
  const result: Record<string, { open: boolean; sent: number; pending: number }> = {};
  if (!db()) return result;
  for (const [kind, b] of Object.entries(BROADCASTS) as [BroadcastKind, (typeof BROADCASTS)[BroadcastKind]][]) {
    const pending = (await db()!.query(b.recipients, [limit])) as Recipient[];
    result[kind] = { open: b.open(), sent: 0, pending: pending.length };
    if (!b.open() || dryRun || !emailEnabled()) continue;
    for (let i = 0; i < pending.length; i += 100) {
      const chunk = pending.slice(i, i + 100);
      const claimed = new Set(await claim(chunk.map((r) => r.email), kind));
      const batch = chunk.filter((r) => claimed.has(r.email));
      if (!batch.length) continue;
      try {
        await sendBatch(batch.map(b.build));
        result[kind].sent += batch.length;
      } catch (err) {
        await release([...claimed], kind);
        console.error(`nanno broadcast ${kind} failed:`, err);
        break;
      }
      await sleep(600); // Resend allows ~2 requests per second
    }
  }
  return result;
}

export async function unsubscribe(email: string) {
  await db()!.query("update nano_waitlist set unsubscribed_at = coalesce(unsubscribed_at, now()) where email = $1", [email]);
}
