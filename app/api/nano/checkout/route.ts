import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { normalizeCode, normalizeEmail } from "@/lib/nano/waitlist";
import { FOUNDER_LIMIT, PLANS, foundersSold, isPlan, presaleOpen, priceId, stripe } from "@/lib/nano/stripe";

export const runtime = "nodejs";

// GET → whether checkout is open and how many Founder's Packs are left.
export async function GET() {
  const enabled = Boolean(stripe());
  const sold = enabled ? await foundersSold() : 0;
  return NextResponse.json({ enabled, presaleOpen: presaleOpen(), founderLeft: Math.max(0, FOUNDER_LIMIT - sold) });
}

// POST { plan, locale?, email?, ref? } → { url } of a Stripe Checkout Session.
export async function POST(req: NextRequest) {
  const client = stripe();
  if (!client) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  const body = await req.json().catch(() => null);
  const plan = body?.plan;
  if (!isPlan(plan)) return NextResponse.json({ error: "invalid_plan" }, { status: 400 });
  if (!presaleOpen()) return NextResponse.json({ error: "not_open" }, { status: 403 });
  if (plan === "founder" && (await foundersSold()) >= FOUNDER_LIMIT) {
    return NextResponse.json({ error: "sold_out" }, { status: 409 });
  }

  const locale = (routing.locales as readonly string[]).includes(body?.locale) ? body.locale : routing.defaultLocale;
  const base = `${req.nextUrl.origin}${locale === routing.defaultLocale ? "" : `/${locale}`}/nanno`;
  const email = normalizeEmail(body?.email);
  const ref = normalizeCode(body?.ref);
  const metadata = { plan, ...(ref ? { ref } : {}) };

  const session = await client.checkout.sessions.create({
    mode: PLANS[plan].mode,
    line_items: [{ price: await priceId(plan), quantity: 1 }],
    success_url: `${base}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}#pricing`,
    ...(email ? { customer_email: email } : {}),
    ...(plan === "founder" ? { customer_creation: "always" as const } : {}),
    allow_promotion_codes: true,
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "1" },
    locale: locale === "pt-BR" ? "pt-BR" : "en",
    metadata,
    ...(plan === "founder"
      ? { payment_intent_data: { metadata } }
      : { subscription_data: { metadata } }),
    // Unpaid sessions release their spot quickly so the 500 limit stays accurate.
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    custom_text: {
      submit: {
        message:
          locale === "pt-BR"
            ? "Reembolso em 7 dias, sem perguntas: é só responder o e-mail do recibo."
            : "7-day refund, no questions asked: just reply to your receipt email.",
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
