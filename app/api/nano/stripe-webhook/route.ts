import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { purchaseEmail } from "@/lib/nano/email";
import { betaOpen, markSent, sendOnce } from "@/lib/nano/mailings";
import { markRefunded, recordCheckout, stripe, updateSubscription } from "@/lib/nano/stripe";

export const runtime = "nodejs";

// Stripe → Nanno orders. Configure the endpoint with these events:
// checkout.session.completed, customer.subscription.updated, customer.subscription.deleted, charge.refunded
export async function POST(req: NextRequest) {
  const client = stripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!client || !secret) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  let event: Stripe.Event;
  try {
    event = client.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature") ?? "", secret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      if (event.data.object.payment_status === "unpaid") break;
      const order = await recordCheckout(event.data.object);
      if (order?.email) {
        const { email, plan, locale } = order;
        const open = betaOpen();
        const sent = await sendOnce(email, `purchase_${plan}`, () => purchaseEmail(email, locale, { plan, betaOpen: open }));
        if (sent && open) await markSent(email, "beta_download"); // the purchase e-mail already has the download
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      await updateSubscription(event.data.object);
      break;
    case "charge.refunded": {
      const pi = event.data.object.payment_intent;
      if (pi) await markRefunded(typeof pi === "string" ? pi : pi.id);
      break;
    }
  }
  return NextResponse.json({ received: true });
}
