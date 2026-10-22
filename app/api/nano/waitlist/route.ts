import { NextRequest, NextResponse } from "next/server";
import { normalizeCode, normalizeEmail, waitlist } from "@/lib/nano/waitlist";

export const runtime = "nodejs";

function unavailable() {
  return NextResponse.json({ error: "unavailable" }, { status: 503 });
}

// POST { email, ref?, locale?, source?, website? } → { refCode, position, referrals, total }
export async function POST(req: NextRequest) {
  const store = waitlist();
  if (!store) return unavailable();

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  // Honeypot: real visitors never fill the hidden "website" field.
  if (body.website) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  const email = normalizeEmail(body.email);
  if (!email) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  const locale = typeof body.locale === "string" ? body.locale.slice(0, 10) : null;
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : null;
  const status = await store.join({ email, referredBy: normalizeCode(body.ref), locale, source });
  return NextResponse.json(status);
}

// GET ?code=xxxxxxxx → current position for a returning visitor.
export async function GET(req: NextRequest) {
  const store = waitlist();
  if (!store) return unavailable();
  const code = normalizeCode(req.nextUrl.searchParams.get("code"));
  if (!code) return NextResponse.json({ error: "invalid_code" }, { status: 400 });
  const status = await store.status(code);
  if (!status) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(status);
}
