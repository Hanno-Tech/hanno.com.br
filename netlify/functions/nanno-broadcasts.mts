// Every 15 minutes: asks the site to send whatever Nanno broadcast is due (presale on Nov 27,
// beta download on Dec 1). The route does nothing until a date arrives, and never repeats an e-mail.
export default async () => {
  const res = await fetch(`${process.env.URL}/api/nano/broadcast`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NANNO_ADMIN_TOKEN}` },
  });
  console.log("nanno broadcasts", res.status, await res.text());
};

export const config = { schedule: "*/15 * * * *" };
