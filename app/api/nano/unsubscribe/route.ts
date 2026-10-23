import { NextRequest, NextResponse } from "next/server";
import { validUnsubscribe } from "@/lib/nano/email";
import { unsubscribe } from "@/lib/nano/mailings";
import { normalizeEmail } from "@/lib/nano/waitlist";

export const runtime = "nodejs";

async function handle(req: NextRequest) {
  const email = normalizeEmail(req.nextUrl.searchParams.get("e"));
  const token = req.nextUrl.searchParams.get("t") ?? "";
  if (!email || !validUnsubscribe(email, token)) return null;
  await unsubscribe(email);
  return email;
}

// GET: link in the e-mail footer → small confirmation page.
export async function GET(req: NextRequest) {
  const email = await handle(req);
  const html = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nanno</title>
  <body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0f0c1d;color:#f4f3fa;font-family:Inter,Segoe UI,Arial,sans-serif;text-align:center;padding:16px">
  <div><img src="/nanno/icon.png" width="64" height="64" alt="" style="border-radius:16px"><h1 style="font-size:20px">${
    email ? "Pronto, você não vai mais receber e-mails do Nanno." : "Link inválido ou expirado."
  }</h1><p style="color:#a9a7bb">${email ? "You won't get Nanno e-mails anymore." : "Invalid or expired link."}</p></div></body></html>`;
  return new NextResponse(html, { status: email ? 200 : 400, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

// POST: one-click unsubscribe from the mail app (List-Unsubscribe-Post).
export async function POST(req: NextRequest) {
  const email = await handle(req);
  return NextResponse.json({ ok: Boolean(email) }, { status: email ? 200 : 400 });
}
