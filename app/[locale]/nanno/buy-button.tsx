"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type Availability = { enabled: boolean; presaleOpen: boolean; founderLeft: number };
type Plan = "monthly" | "annual" | "founder";

// One request per page, shared by every BuyButton and FounderLeft.
let availability: Promise<Availability | null> | null = null;
function useAvailability() {
  const [value, setValue] = useState<Availability | null>(null);
  useEffect(() => {
    availability ??= fetch("/api/nano/checkout")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
    availability.then(setValue);
  }, []);
  return value;
}

function referral() {
  try {
    return new URLSearchParams(window.location.search).get("ref");
  } catch {
    return null;
  }
}

// Opens Stripe Checkout once sales are open; before that it links to the waitlist.
export default function BuyButton({
  plan,
  className,
  waitlistLabel,
  waitlistHref = plan === "founder" ? "#founders" : "#join",
}: {
  plan: Plan;
  className: string;
  waitlistLabel: string;
  waitlistHref?: string;
}) {
  const t = useTranslations("nano.buy");
  const locale = useLocale();
  const a = useAvailability();
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  if (!a?.enabled || !a.presaleOpen) {
    return (
      <a className={className} href={waitlistHref}>
        {waitlistLabel}
      </a>
    );
  }
  const soldOut = plan === "founder" && a.founderLeft <= 0;

  async function buy() {
    setState("loading");
    try {
      const res = await fetch("/api/nano/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan, locale, ref: referral() }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error);
      window.location.assign(data.url);
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={buy} disabled={soldOut || state === "loading"}>
        {soldOut ? t("soldOut") : state === "loading" ? t("loading") : t(plan)}
      </button>
      {state === "error" && (
        <small role="alert" style={{ display: "block", marginTop: 8 }}>
          {t("error")}
        </small>
      )}
    </>
  );
}

export function FounderLeft({ className, fallback }: { className: string; fallback: string }) {
  const t = useTranslations("nano.buy");
  const a = useAvailability();
  return <p className={className}>{a?.enabled && a.presaleOpen ? t("left", { count: a.founderLeft }) : fallback}</p>;
}
