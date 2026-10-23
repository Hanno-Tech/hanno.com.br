import { randomBytes } from "node:crypto";
import { neon } from "@neondatabase/serverless";

// Each referral moves the referrer up this many spots; REWARD_AT referrals unlock the
// "Referral Cat" skin.
export const REF_BUMP = 10;
export const REWARD_AT = 3;

export type WaitlistStatus = {
  created?: boolean; // true only on the request that added this e-mail
  refCode: string;
  position: number;
  referrals: number;
  total: number;
};

export type JoinInput = {
  email: string;
  referredBy?: string | null;
  locale?: string | null;
  source?: string | null;
};

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const CODE_RE = /^[a-z0-9]{8}$/;

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const value = email.trim().toLowerCase();
  return EMAIL_RE.test(value) ? value : null;
}

export function normalizeCode(code: unknown): string | null {
  if (typeof code !== "string") return null;
  const value = code.trim().toLowerCase();
  return CODE_RE.test(value) ? value : null;
}

function newCode() {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  return Array.from(randomBytes(8), (b) => alphabet[b % alphabet.length]).join("");
}

interface Store {
  join(input: JoinInput): Promise<WaitlistStatus>;
  status(code: string): Promise<WaitlistStatus | null>;
}

// Position = rank by (id - REF_BUMP * referrals), so earlier signups and active referrers
// come first.
const RANKED = `
  with scored as (
    select w.ref_code,
           w.id - ${REF_BUMP} * (select count(*) from nano_waitlist r where r.referred_by = w.ref_code) as score,
           (select count(*) from nano_waitlist r where r.referred_by = w.ref_code)::int as referrals
      from nano_waitlist w
  )
  select me.referrals,
         (select count(*) from scored s where s.score < me.score)::int + 1 as position,
         (select count(*) from nano_waitlist)::int as total
    from scored me
   where me.ref_code = $1`;

function neonStore(url: string): Store {
  const sql = neon(url);
  const status = async (code: string) => {
    const rows = await sql.query(RANKED, [code]);
    const row = rows[0];
    return row
      ? { refCode: code, position: row.position, referrals: row.referrals, total: row.total }
      : null;
  };
  return {
    status,
    async join({ email, referredBy, locale, source }) {
      const existing = await sql.query("select ref_code from nano_waitlist where email = $1", [email]);
      if (existing[0]) return (await status(existing[0].ref_code))!;
      const code = newCode();
      await sql.query(
        `insert into nano_waitlist (email, ref_code, referred_by, locale, source)
         values ($1, $2, (select ref_code from nano_waitlist where ref_code = $3), $4, $5)
         on conflict (email) do nothing`,
        [email, code, referredBy ?? null, locale ?? null, source ?? null],
      );
      const row = await sql.query("select ref_code from nano_waitlist where email = $1", [email]);
      return { ...(await status(row[0].ref_code))!, created: row[0].ref_code === code };
    },
  };
}

// Dev-only fallback so the landing works before Neon is provisioned. Data is lost on restart.
function memoryStore(): Store {
  const rows: { id: number; email: string; code: string; by: string | null }[] = [];
  const status = async (code: string) => {
    const score = (r: (typeof rows)[number]) =>
      r.id - REF_BUMP * rows.filter((x) => x.by === r.code).length;
    const me = rows.find((r) => r.code === code);
    if (!me) return null;
    return {
      refCode: code,
      referrals: rows.filter((r) => r.by === code).length,
      position: rows.filter((r) => score(r) < score(me)).length + 1,
      total: rows.length,
    };
  };
  return {
    status,
    async join({ email, referredBy }) {
      let me = rows.find((r) => r.email === email);
      const created = !me;
      if (!me) {
        const by = rows.some((r) => r.code === referredBy) ? referredBy! : null;
        me = { id: rows.length + 1, email, code: newCode(), by };
        rows.push(me);
      }
      return { ...(await status(me.code))!, created };
    },
  };
}

let store: Store | null = null;

export function waitlist(): Store | null {
  if (store) return store;
  const url = process.env.DATABASE_URL;
  if (url) store = neonStore(url);
  else if (process.env.NODE_ENV !== "production") store = memoryStore();
  return store;
}
