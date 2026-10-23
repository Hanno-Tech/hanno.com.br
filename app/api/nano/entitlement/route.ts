import { NextRequest, NextResponse } from "next/server";
import { accountsEnabled, bearer, deviceEmail, planFor, signEntitlement } from "@/lib/nano/account";

export const runtime = "nodejs";

// GET (Bearer token) → { user, entitlement } with the current plan, signed for offline checks.
export async function GET(req: NextRequest) {
  if (!accountsEnabled()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const email = await deviceEmail(bearer(req.headers.get("authorization")));
  if (!email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const plan = await planFor(email);
  return NextResponse.json({ user: { email, plan }, entitlement: signEntitlement(email, plan) });
}
