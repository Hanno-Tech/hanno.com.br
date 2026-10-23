// Puts the Nanno checkout live: checks the key's permissions, creates the prices, creates the
// webhook endpoint and stores STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET in Netlify (production,
// secret). Secrets are never printed.
// Usage: node --env-file=.env.live.local scripts/stripe-go-live.mjs
import { execFileSync } from "node:child_process";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY ?? "";
const WEBHOOK_URL = "https://hanno.com.br/api/nano/stripe-webhook";
const EVENTS = ["checkout.session.completed", "customer.subscription.updated", "customer.subscription.deleted", "charge.refunded"];
const PRICES = [
  { lookup: "nanno_plus_monthly", product: "Nanno Plus", amount: 499, recurring: { interval: "month" } },
  { lookup: "nanno_plus_annual", product: "Nanno Plus", amount: 3999, recurring: { interval: "year" } },
  { lookup: "nanno_founder", product: "Nanno Founder's Pack", amount: 4900 },
];

if (!/^(sk|rk)_live_/.test(key)) {
  console.error(`A chave precisa começar com sk_live_ ou rk_live_ (começa com "${key.slice(0, 8)}").`);
  process.exit(1);
}
const stripe = new Stripe(key);

// 1. Permissions the site needs. Restricted keys fail here with a clear list.
const needs = [
  ["Products (leitura)", () => stripe.products.list({ limit: 1 })],
  ["Prices (leitura)", () => stripe.prices.list({ limit: 1 })],
  ["Checkout Sessions (leitura)", () => stripe.checkout.sessions.list({ limit: 1 })],
  ["Subscriptions (leitura)", () => stripe.subscriptions.list({ limit: 1 })],
  ["Webhook Endpoints (leitura)", () => stripe.webhookEndpoints.list({ limit: 1 })],
];
const missing = [];
for (const [name, fn] of needs) {
  try {
    await fn();
  } catch {
    missing.push(name);
  }
}
if (missing.length) {
  console.error("A chave não tem estas permissões:\n  - " + missing.join("\n  - "));
  console.error("Na chave restrita, libere como 'Gravação': Products, Prices, Checkout Sessions, Customers, Webhook Endpoints; 'Leitura': Subscriptions, Charges.");
  process.exit(1);
}
console.log("✓ permissões básicas ok");

// 2. Prices (idempotent by lookup_key).
const products = new Map();
for (const p of PRICES) {
  const existing = await stripe.prices.list({ lookup_keys: [p.lookup], active: true });
  if (existing.data[0]) {
    console.log(`✓ preço ${p.lookup} já existe`);
    continue;
  }
  if (!products.has(p.product)) {
    const found = await stripe.products.search({ query: `name:"${p.product}" AND active:"true"` });
    const product = found.data[0] ?? (await stripe.products.create({ name: p.product, metadata: { app: "nanno" } }));
    products.set(p.product, product.id);
  }
  await stripe.prices.create({
    product: products.get(p.product),
    currency: "usd",
    unit_amount: p.amount,
    lookup_key: p.lookup,
    tax_behavior: "exclusive",
    ...(p.recurring ? { recurring: p.recurring } : {}),
  });
  console.log(`✓ preço ${p.lookup} criado`);
}

// 3. Webhook endpoint. The signing secret is only returned on creation, so an existing
// endpoint is replaced.
const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
for (const e of endpoints.data.filter((e) => e.url === WEBHOOK_URL)) {
  await stripe.webhookEndpoints.del(e.id);
}
const endpoint = await stripe.webhookEndpoints.create({ url: WEBHOOK_URL, enabled_events: EVENTS, description: "Nanno" });
console.log("✓ webhook criado para", WEBHOOK_URL);

// 4. Netlify env (production only, secret). Values go through argv to the CLI, not the console.
const setEnv = (name, value) =>
  execFileSync("netlify", ["env:set", name, value, "--secret", "--context", "production"], { stdio: "ignore" });
setEnv("STRIPE_SECRET_KEY", key);
setEnv("STRIPE_WEBHOOK_SECRET", endpoint.secret);
console.log("✓ STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET salvas no Netlify (produção, secretas)");
console.log("\nPronto. Agora é só pedir um novo deploy.");
