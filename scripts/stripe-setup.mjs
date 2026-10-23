// Creates the Nanno products and prices in Stripe (idempotent: prices are found by lookup_key).
// Usage: npm run stripe:setup   (uses STRIPE_SECRET_KEY from .env.local; run it once per Stripe mode)
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY is not set");
  process.exit(1);
}
const stripe = new Stripe(key);

const PRICES = [
  { lookup: "nanno_plus_monthly", product: "Nanno Plus", amount: 499, recurring: { interval: "month" } },
  { lookup: "nanno_plus_annual", product: "Nanno Plus", amount: 3999, recurring: { interval: "year" } },
  { lookup: "nanno_founder", product: "Nanno Founder's Pack", amount: 4900 },
];

const products = new Map();
async function product(name) {
  if (products.has(name)) return products.get(name);
  const found = await stripe.products.search({ query: `name:"${name}" AND active:"true"` });
  const p = found.data[0] ?? (await stripe.products.create({ name, metadata: { app: "nanno" } }));
  products.set(name, p.id);
  return p.id;
}

for (const p of PRICES) {
  const existing = await stripe.prices.list({ lookup_keys: [p.lookup], active: true });
  if (existing.data[0]) {
    console.log(`ok      ${p.lookup} → ${existing.data[0].id}`);
    continue;
  }
  const price = await stripe.prices.create({
    product: await product(p.product),
    currency: "usd",
    unit_amount: p.amount,
    lookup_key: p.lookup,
    tax_behavior: "exclusive",
    ...(p.recurring ? { recurring: p.recurring } : {}),
  });
  console.log(`created ${p.lookup} → ${price.id}`);
}
