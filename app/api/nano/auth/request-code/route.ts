import { NextRequest, NextResponse } from "next/server";
import { AccountError, accountsEnabled, createLoginCode } from "@/lib/nano/account";
import { emailEnabled, loginCodeEmail, sendEmail } from "@/lib/nano/email";
import { normalizeEmail } from "@/lib/nano/waitlist";

export const runtime = "nodejs";

// POST { email, locale? } → { ok } and an e-mail with a 6-digit code.
// Without Resend (local dev only) the code comes back as devCode.
export async function POST(req: NextRequest) {
  const dev = process.env.NODE_ENV !== "production";
  if (!accountsEnabled() || (!emailEnabled() && !dev)) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  const email = normalizeEmail(body?.email);
  if (!email) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  const locale = typeof body?.locale === "string" ? body.locale.slice(0, 10) : "en";

  try {
    const code = await createLoginCode(email);
    if (!emailEnabled()) return NextResponse.json({ ok: true, devCode: code });
    await sendEmail(loginCodeEmail(email, code, locale));
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof AccountError) return NextResponse.json({ error: err.code }, { status: err.status });
    throw err;
  }
}
