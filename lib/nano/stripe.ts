import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

export const PLANS = {
  monthly: { lookup: "nanno_plus_monthly", mode: "subscription" },
  annual: { lookup: "nanno_plus_annual", mode: "subscription" },
  founder: { lookup: "nanno_founder", mode: "payment" },
} as const;
export type Plan = keyof typeof PLANS;

export const FOUNDER_LIMIT = 500;
// The Founder's presale opens on Black Friday; NANNO_PRESALE_OPEN=1 opens it early (tests).
const PRESALE_OPENS = Date.parse("2026-11-27T00:00:00-03:00");

export function isPlan(value: unknown): value is Plan {
  return typeof value === "string" && value in PLANS;
}

export function presaleOpen(now = Date.now()) {
  return process.env.NANNO_PRESALE_OPEN === "1" || now >= PRESALE_OPENS;
}

let client: Stripe | null = null;
export function stripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

function db() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}

export async function priceId(plan: Plan) {
  const prices = await stripe()!.prices.list({ lookup_keys: [PLANS[plan].lookup], active: true });
  const price = prices.data[0];
  if (!price) throw new Error(`Stripe price ${PLANS[plan].lookup} not found; run npm run stripe:setup`);
  return price.id;
}

export async function foundersSold() {
  const sql = db();
  if (!sql) return 0;
  const rows = await sql.query("select count(*)::int as n from nano_orders where plan = 'founder' and status = 'paid'");
  return rows[0].n as number;
}

export async function recordCheckout(session: Stripe.Checkout.Session) {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL is not set");
  const plan = session.metadata?.plan;
  if (!isPlan(plan)) return;
  const id = (v: string | { id: string } | null) => (typeof v === "string" ? v : (v?.id ?? null));
  await sql.query(
    `insert into nano_orders (stripe_session_id, stripe_customer_id, subscription_id, payment_intent_id,
                              email, plan, status, amount_cents, currency, ref_code, locale)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     on conflict (stripe_session_id) do update set status = excluded.status, updated_at = now()`,
    [
      session.id,
      id(session.customer),
      id(session.subscription),
      id(session.payment_intent),
      session.customer_details?.email?.toLowerCase() ?? null,
      plan,
      plan === "founder" ? "paid" : "active",
      session.amount_total,
      session.currency,
      session.metadata?.ref ?? null,
      session.locale ?? null,
    ],
  );
  return { email: session.customer_details?.email?.toLowerCase() ?? null, plan, locale: session.locale ?? null };
}

export async function updateSubscription(sub: Stripe.Subscription) {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL is not set");
  const status = sub.status === "active" || sub.status === "trialing" ? "active" : sub.status === "past_due" ? "past_due" : "canceled";
  await sql.query("update nano_orders set status = $2, updated_at = now() where subscription_id = $1", [sub.id, status]);
}

export async function markRefunded(paymentIntentId: string) {
  const sql = db();
  if (!sql) throw new Error("DATABASE_URL is not set");
  await sql.query("update nano_orders set status = 'refunded', updated_at = now() where payment_intent_id = $1", [paymentIntentId]);
}
