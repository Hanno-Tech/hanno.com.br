// Transactional e-mail for Nanno via Resend (https://resend.com/docs/api-reference/emails/send-email).
// Needs RESEND_API_KEY and a sender on a verified domain in RESEND_FROM.

export function emailEnabled() {
  return Boolean(process.env.RESEND_API_KEY);
}

export type Email = { to: string; subject: string; html: string; text: string };

export async function sendEmail({ to, subject, html, text }: Email) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Nanno <nanno@hanno.com.br>",
      to: [to],
      subject,
      html,
      text,
      ...(process.env.RESEND_REPLY_TO ? { reply_to: process.env.RESEND_REPLY_TO } : {}),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

// Shared look for every Nanno e-mail: dark card, the cat icon and one big call to action or code.
export function layout({ title, body, highlight, footer }: { title: string; body: string; highlight?: string; footer: string }) {
  return `<!doctype html><html><body style="margin:0;background:#0f0c1d;font-family:Inter,Segoe UI,Arial,sans-serif;color:#f4f3fa">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px"><tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#1a1530;border-radius:20px;padding:32px">
      <tr><td align="center"><img src="https://hanno.com.br/nanno/icon.png" width="56" height="56" alt="Nanno" style="border-radius:14px"></td></tr>
      <tr><td style="padding-top:20px;font-size:20px;font-weight:700;text-align:center">${title}</td></tr>
      <tr><td style="padding-top:12px;font-size:15px;line-height:1.55;color:#c9c6dc;text-align:center">${body}</td></tr>
      ${highlight ? `<tr><td align="center" style="padding-top:22px"><div style="display:inline-block;padding:14px 22px;border-radius:14px;background:#2a2150;font-size:30px;font-weight:700;letter-spacing:8px;color:#c6f25b">${highlight}</div></td></tr>` : ""}
      <tr><td style="padding-top:24px;font-size:12px;color:#8b87a3;text-align:center">${footer}</td></tr>
    </table>
  </td></tr></table></body></html>`;
}

export function loginCodeEmail(to: string, code: string, locale: string): Email {
  const pt = locale.startsWith("pt");
  const title = pt ? "Seu código de acesso" : "Your sign-in code";
  const body = pt
    ? "Digite este código no Nanno para entrar na sua conta. Ele vale por 10 minutos."
    : "Enter this code in Nanno to sign in. It expires in 10 minutes.";
  const footer = pt
    ? "Se você não pediu este código, pode ignorar este e-mail."
    : "If you didn't ask for this code, you can ignore this e-mail.";
  return {
    to,
    subject: pt ? `${code} é o seu código do Nanno` : `${code} is your Nanno code`,
    html: layout({ title, body, highlight: code, footer }),
    text: `${title}: ${code}\n\n${body}\n\n${footer}`,
  };
}
