import { NextRequest, NextResponse } from "next/server";
import { AccountError, accountsEnabled, planFor, signEntitlement, verifyLoginCode } from "@/lib/nano/account";
import { normalizeEmail } from "@/lib/nano/waitlist";

export const runtime = "nodejs";

// POST { email, code } → { token, user, entitlement }. The token identifies this device from now on.
export async function POST(req: NextRequest) {
  if (!accountsEnabled()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const body = await req.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  const code = typeof body?.code === "string" ? body.code.replace(/\D/g, "") : "";
  if (!email || code.length !== 6) return NextResponse.json({ error: "code_invalid" }, { status: 400 });

  try {
    const token = await verifyLoginCode(email, code);
    const plan = await planFor(email);
    return NextResponse.json({ token, user: { email, plan }, entitlement: signEntitlement(email, plan) });
  } catch (err) {
    if (err instanceof AccountError) return NextResponse.json({ error: err.code }, { status: err.status });
    throw err;
  }
}
