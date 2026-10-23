import { NextRequest, NextResponse } from "next/server";
import { accountsEnabled, bearer, revokeDevice } from "@/lib/nano/account";

export const runtime = "nodejs";

// POST (Bearer token) → forgets this device.
export async function POST(req: NextRequest) {
  if (!accountsEnabled()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const token = bearer(req.headers.get("authorization"));
  if (token) await revokeDevice(token);
  return NextResponse.json({ ok: true });
}
