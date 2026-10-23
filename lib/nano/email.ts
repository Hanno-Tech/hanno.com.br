import { createHmac, timingSafeEqual } from "node:crypto";

// Transactional and broadcast e-mail for Nanno via Resend (https://resend.com/docs/api-reference).
// Needs RESEND_API_KEY and a sender on a verified domain in RESEND_FROM.

const SITE = process.env.NEXT_PUBLIC_URL || "https://hanno.com.br";
export const DOWNLOAD_URL = `${SITE}/api/nano/download`;

export function emailEnabled() {
  return Boolean(process.env.RESEND_API_KEY);
}

export type Email = { to: string; subject: string; html: string; text: string; headers?: Record<string, string> };

function payload({ to, subject, html, text, headers }: Email) {
  return {
    from: process.env.RESEND_FROM || "Nanno <nanno@hanno.com.br>",
    to: [to],
    subject,
    html,
    text,
    ...(headers ? { headers } : {}),
    ...(process.env.RESEND_REPLY_TO ? { reply_to: process.env.RESEND_REPLY_TO } : {}),
  };
}

async function resend(path: string, body: unknown) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

export const sendEmail = (email: Email) => resend("/emails", payload(email));
// Up to 100 e-mails in one request (Resend's batch limit).
export const sendBatch = (emails: Email[]) => resend("/emails/batch", emails.map(payload));

const pt = (locale?: string | null) => Boolean(locale?.startsWith("pt"));
const landing = (locale?: string | null) => `${SITE}${pt(locale) ? "/pt-BR" : ""}/nanno`;

// ---------- Unsubscribe (broadcasts only; transactional e-mails always go out) ----------

function unsubscribeSig(email: string) {
  const secret = createHmac("sha256", "nanno-unsubscribe").update(process.env.NANNO_SIGNING_KEY ?? "").digest();
  return createHmac("sha256", secret).update(email).digest("base64url").slice(0, 22);
}

export function unsubscribeUrl(email: string) {
  return `${SITE}/api/nano/unsubscribe?e=${encodeURIComponent(email)}&t=${unsubscribeSig(email)}`;
}

export function validUnsubscribe(email: string, token: string) {
  const a = Buffer.from(unsubscribeSig(email));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

function broadcastHeaders(email: string) {
  return { "List-Unsubscribe": `<${unsubscribeUrl(email)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" };
}

// ---------- Layout ----------

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

type Layout = {
  title: string;
  body: string[]; // paragraphs (already escaped/HTML)
  highlight?: string; // big code
  cta?: { label: string; href: string };
  footer: string;
  unsubscribe?: { label: string; href: string };
};

export function layout({ title, body, highlight, cta, footer, unsubscribe }: Layout) {
  const p = (html: string) => `<tr><td style="padding-top:12px;font-size:15px;line-height:1.55;color:#c9c6dc;text-align:center">${html}</td></tr>`;
  return `<!doctype html><html><body style="margin:0;background:#0f0c1d;font-family:Inter,Segoe UI,Arial,sans-serif;color:#f4f3fa">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px"><tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#1a1530;border-radius:20px;padding:32px">
      <tr><td align="center"><img src="${SITE}/nanno/icon.png" width="56" height="56" alt="Nanno" style="border-radius:14px"></td></tr>
      <tr><td style="padding-top:20px;font-size:20px;font-weight:700;text-align:center">${title}</td></tr>
      ${body.map(p).join("")}
      ${highlight ? `<tr><td align="center" style="padding-top:22px"><div style="display:inline-block;padding:14px 22px;border-radius:14px;background:#2a2150;font-size:30px;font-weight:700;letter-spacing:8px;color:#c6f25b">${highlight}</div></td></tr>` : ""}
      ${cta ? `<tr><td align="center" style="padding-top:24px"><a href="${cta.href}" style="display:inline-block;padding:13px 26px;border-radius:12px;background:#c6f25b;color:#0f0c1d;font-weight:700;font-size:15px;text-decoration:none">${cta.label}</a></td></tr>` : ""}
      <tr><td style="padding-top:26px;font-size:12px;line-height:1.5;color:#8b87a3;text-align:center">${footer}${unsubscribe ? `<br><a href="${unsubscribe.href}" style="color:#8b87a3">${unsubscribe.label}</a>` : ""}</td></tr>
    </table>
  </td></tr></table></body></html>`;
}

const plain = (...parts: (string | undefined)[]) => parts.filter(Boolean).join("\n\n").replace(/<[^>]+>/g, "");
const SIGNATURE = "Hanno Tech · hanno.com.br";

// ---------- Templates ----------

export function loginCodeEmail(to: string, code: string, locale: string): Email {
  const p = pt(locale);
  const title = p ? "Seu código de acesso" : "Your sign-in code";
  const body = p
    ? "Digite este código no Nanno para entrar na sua conta. Ele vale por 10 minutos."
    : "Enter this code in Nanno to sign in. It expires in 10 minutes.";
  const footer = p
    ? "Se você não pediu este código, pode ignorar este e-mail."
    : "If you didn't ask for this code, you can ignore this e-mail.";
  return {
    to,
    subject: p ? `${code} é o seu código do Nanno` : `${code} is your Nanno code`,
    html: layout({ title, body: [body], highlight: code, footer }),
    text: plain(`${title}: ${code}`, body, footer),
  };
}

export function waitlistWelcomeEmail(to: string, locale: string | null, { position, refCode }: { position: number; refCode: string }): Email {
  const p = pt(locale);
  const link = `${landing(locale)}?ref=${refCode}`;
  const title = p ? "Você está na lista do Nanno 🐈‍⬛" : "You're on the Nanno list 🐈‍⬛";
  const body = p
    ? [
        `Você é o <strong style="color:#f4f3fa">nº ${position}</strong> da fila.`,
        "A pré-venda do Founder's Pack abre em <strong style=\"color:#f4f3fa\">27 de novembro</strong>, com só 500 unidades. A gente te avisa por aqui.",
        "Cada amigo que entrar pelo seu link te sobe 10 posições. Com 3 indicações, você ganha uma skin exclusiva.",
        `<span style="color:#c4b5fd">${esc(link)}</span>`,
      ]
    : [
        `You're <strong style="color:#f4f3fa">#${position}</strong> in line.`,
        "The Founder's Pack presale opens on <strong style=\"color:#f4f3fa\">November 27</strong>, limited to 500. We'll let you know right here.",
        "Every friend who joins through your link moves you up 10 spots. Refer 3 and you get an exclusive skin.",
        `<span style="color:#c4b5fd">${esc(link)}</span>`,
      ];
  const cta = { label: p ? "Compartilhar meu link" : "Share my link", href: link };
  const unsubscribe = { label: p ? "Não quero mais receber e-mails do Nanno" : "Unsubscribe from Nanno e-mails", href: unsubscribeUrl(to) };
  return {
    to,
    subject: title,
    html: layout({ title, body, cta, footer: SIGNATURE, unsubscribe }),
    text: plain(title, ...body, `${unsubscribe.label}: ${unsubscribe.href}`),
    headers: broadcastHeaders(to),
  };
}

export function presaleOpenEmail(to: string, locale: string | null): Email {
  const p = pt(locale);
  const title = p ? "A pré-venda do Nanno abriu 🐈‍⬛" : "The Nanno presale is open 🐈‍⬛";
  const body = p
    ? [
        "O <strong style=\"color:#f4f3fa\">Founder's Pack</strong> está à venda: Nanno Plus para sempre, uma skin secreta que nunca volta à venda, seu nome nos créditos e acesso ao beta em 1º de dezembro.",
        "São só <strong style=\"color:#f4f3fa\">500 unidades</strong>, por US$ 49 em pagamento único. Se preferir, o Plus também sai por US$ 4,99/mês.",
        "Reembolso em 7 dias, sem perguntas.",
      ]
    : [
        "The <strong style=\"color:#f4f3fa\">Founder's Pack</strong> is on sale: Nanno Plus forever, a secret skin that never comes back, your name in the credits and beta access on December 1.",
        "Only <strong style=\"color:#f4f3fa\">500 packs</strong>, US$49 one-time. Or get Plus for US$4.99/month.",
        "7-day refund, no questions asked.",
      ];
  const cta = { label: p ? "Garantir meu Founder's Pack" : "Get my Founder's Pack", href: `${landing(locale)}#pricing` };
  const unsubscribe = { label: p ? "Não quero mais receber e-mails do Nanno" : "Unsubscribe from Nanno e-mails", href: unsubscribeUrl(to) };
  return {
    to,
    subject: title,
    html: layout({ title, body, cta, footer: SIGNATURE, unsubscribe }),
    text: plain(title, ...body, `${cta.label}: ${cta.href}`, `${unsubscribe.label}: ${unsubscribe.href}`),
    headers: broadcastHeaders(to),
  };
}

function installSteps(to: string, p: boolean) {
  return p
    ? [
        "1. Baixe e abra o instalador. Se o Windows avisar \"editor desconhecido\", clique em <em>Mais informações → Executar assim mesmo</em>.",
        `2. Quando o Nanno abrir, entre com <strong style="color:#f4f3fa">${esc(to)}</strong>: a gente te manda um código.`,
      ]
    : [
        "1. Download and run the installer. If Windows says \"unknown publisher\", click <em>More info → Run anyway</em>.",
        `2. When Nanno opens, sign in with <strong style="color:#f4f3fa">${esc(to)}</strong> and we'll send you a code.`,
      ];
}

export function purchaseEmail(to: string, locale: string | null, { plan, betaOpen }: { plan: string; betaOpen: boolean }): Email {
  const p = pt(locale);
  const founder = plan === "founder";
  const title = founder ? (p ? "Bem-vindo, founder! 👑" : "Welcome, founder! 👑") : p ? "Seu Nanno Plus está ativo ✨" : "Your Nanno Plus is active ✨";
  const intro = founder
    ? p
      ? "Obrigado por acreditar no Nanno desde o começo. Seu Founder's Pack está confirmado: Plus para sempre, a skin secreta e seu nome nos créditos."
      : "Thank you for believing in Nanno from day one. Your Founder's Pack is confirmed: Plus forever, the secret skin and your name in the credits."
    : p
      ? "Obrigado por assinar! Sua assinatura do Nanno Plus está ativa."
      : "Thanks for subscribing! Your Nanno Plus subscription is active.";
  const next = betaOpen
    ? installSteps(to, p)
    : [
        p
          ? `Em <strong style="color:#f4f3fa">1º de dezembro</strong> você recebe aqui o download do beta. Para ativar, é só entrar no app com este e-mail (${esc(to)}).`
          : `On <strong style="color:#f4f3fa">December 1</strong> you'll get the beta download right here. To activate, just sign in to the app with this e-mail (${esc(to)}).`,
      ];
  const refund = p
    ? "Mudou de ideia? Responda o recibo da compra em até 7 dias e devolvemos tudo."
    : "Changed your mind? Reply to your receipt within 7 days for a full refund.";
  const cta = betaOpen ? { label: p ? "Baixar o Nanno" : "Download Nanno", href: DOWNLOAD_URL } : undefined;
  return {
    to,
    subject: title,
    html: layout({ title, body: [intro, ...next], cta, footer: `${refund}<br>${SIGNATURE}` }),
    text: plain(title, intro, ...next, cta && `${cta.label}: ${cta.href}`, refund),
  };
}

export function betaDownloadEmail(to: string, locale: string | null): Email {
  const p = pt(locale);
  const title = p ? "O Nanno chegou! 🐈‍⬛" : "Nanno is here! 🐈‍⬛";
  const intro = p
    ? "O beta está aberto e o seu Nanno já pode morar no seu desktop. Ele funciona no Windows 10 e 11."
    : "The beta is open and your Nanno is ready to move into your desktop. It runs on Windows 10 and 11.";
  const steps = installSteps(to, p);
  const help = p
    ? "Achou um bug ou tem uma ideia? Responda este e-mail: a gente lê tudo."
    : "Found a bug or have an idea? Just reply to this e-mail. We read everything.";
  const cta = { label: p ? "Baixar o Nanno" : "Download Nanno", href: DOWNLOAD_URL };
  return {
    to,
    subject: p ? "Seu Nanno está pronto para baixar 🐈‍⬛" : "Your Nanno is ready to download 🐈‍⬛",
    html: layout({ title, body: [intro, ...steps, help], cta, footer: SIGNATURE }),
    text: plain(title, intro, ...steps, `${cta.label}: ${cta.href}`, help),
  };
}
