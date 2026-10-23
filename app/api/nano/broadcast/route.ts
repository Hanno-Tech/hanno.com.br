import { NextRequest, NextResponse } from "next/server";
import { bearer } from "@/lib/nano/account";
import { runBroadcasts } from "@/lib/nano/mailings";

export const runtime = "nodejs";
export const maxDuration = 26;

// POST (Bearer NANNO_ADMIN_TOKEN) [?dry=1] → sends pending presale/beta e-mails whose date has come.
// Called every 15 min by netlify/functions/nanno-broadcasts.mts, and by hand with ?dry=1 to preview.
export async function POST(req: NextRequest) {
  const admin = process.env.NANNO_ADMIN_TOKEN;
  if (!admin || bearer(req.headers.get("authorization")) !== admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const dryRun = req.nextUrl.searchParams.get("dry") === "1";
  // NANNO_BROADCASTS=1 arms the real sends; without it every run is a dry run.
  return NextResponse.json(await runBroadcasts({ dryRun: dryRun || process.env.NANNO_BROADCASTS !== "1" }));
}
