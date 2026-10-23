import { createHash, createPrivateKey, randomBytes, randomInt, sign } from "node:crypto";
import { neon } from "@neondatabase/serverless";

// Nanno desktop accounts. Login is a 6-digit code sent by e-mail; a successful login gives the
// device a token, and the device trades that token for a signed entitlement (what it may unlock),
// which the app verifies offline with the public key built into it.

const CODE_TTL_MIN = 10;
const CODE_MAX_ATTEMPTS = 5;
const RESEND_AFTER_S = 30;
// Entitlements expire so a refund or a canceled subscription reaches devices that stay offline.
const ENTITLEMENT_DAYS = { free: 30, plus: 14, founder: 90 } as const;

export type Plan = keyof typeof ENTITLEMENT_DAYS;
export type Entitlement = { payload: string; signature: string };

function db() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

export function accountsEnabled() {
  return Boolean(process.env.DATABASE_URL && process.env.NANNO_SIGNING_KEY);
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

export class AccountError extends Error {
  constructor(public code: string, public status = 400) {
    super(code);
  }
}

// Creates (or replaces) the login code for this e-mail and returns it so the caller can send it.
export async function createLoginCode(email: string) {
  const sql = db()!;
  const recent = await sql.query(
    `select 1 from nano_login_codes where email = $1 and created_at > now() - make_interval(secs => $2)`,
    [email, RESEND_AFTER_S],
  );
  if (recent.length) throw new AccountError("too_soon", 429);
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await sql.query(
    `insert into nano_login_codes (email, code_hash, attempts, expires_at, created_at)
     values ($1, $2, 0, now() + make_interval(mins => $3), now())
     on conflict (email) do update
       set code_hash = excluded.code_hash, attempts = 0, expires_at = excluded.expires_at, created_at = now()`,
    [email, sha256(`${email}:${code}`), CODE_TTL_MIN],
  );
  return code;
}

// Checks the code and, if right, returns a new device token (shown to the device only once).
export async function verifyLoginCode(email: string, code: string) {
  const sql = db()!;
  const rows = await sql.query(
    `update nano_login_codes set attempts = attempts + 1
      where email = $1 and expires_at > now() and attempts < $2
      returning code_hash`,
    [email, CODE_MAX_ATTEMPTS],
  );
  if (!rows.length) throw new AccountError("code_expired", 400);
  if (rows[0].code_hash !== sha256(`${email}:${code}`)) throw new AccountError("code_invalid", 400);

  await sql.query("delete from nano_login_codes where email = $1", [email]);
  const token = `nnt_${randomBytes(32).toString("base64url")}`;
  await sql.query("insert into nano_devices (token_hash, email) values ($1, $2)", [sha256(token), email]);
  return token;
}

export async function deviceEmail(token: string | null) {
  if (!token?.startsWith("nnt_")) return null;
  const rows = await db()!.query(
    "update nano_devices set last_seen = now() where token_hash = $1 returning email",
    [sha256(token)],
  );
  return (rows[0]?.email as string | undefined) ?? null;
}

export async function revokeDevice(token: string) {
  await db()!.query("delete from nano_devices where token_hash = $1", [sha256(token)]);
}

// Founder's Pack (paid) > active subscription > free. Matching is by the checkout e-mail.
export async function planFor(email: string): Promise<Plan> {
  const rows = await db()!.query(
    `select plan, status from nano_orders
      where email = $1 and ((plan = 'founder' and status = 'paid') or (plan in ('monthly', 'annual') and status in ('active', 'past_due')))`,
    [email],
  );
  if (rows.some((r) => r.plan === "founder")) return "founder";
  return rows.length ? "plus" : "free";
}

// NANNO_SIGNING_KEY is the Ed25519 private key as base64 PKCS#8 DER (scripts/nanno-signing-key.mjs).
export function signEntitlement(email: string, plan: Plan, now = Date.now()): Entitlement {
  const key = createPrivateKey({ key: Buffer.from(process.env.NANNO_SIGNING_KEY!, "base64"), format: "der", type: "pkcs8" });
  const iat = Math.floor(now / 1000);
  const claims = { sub: email, plan, skins: [] as string[], iat, exp: iat + ENTITLEMENT_DAYS[plan] * 86_400 };
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return { payload, signature: sign(null, Buffer.from(payload), key).toString("base64url") };
}

export function bearer(header: string | null) {
  const match = header?.match(/^Bearer\s+(\S+)$/i);
  return match ? match[1] : null;
}
