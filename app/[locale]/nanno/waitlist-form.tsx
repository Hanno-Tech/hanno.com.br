"use client";
import { FormEvent, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import styles from "./nano.module.css";

const REF_BUMP = 10;
const REWARD_AT = 3;
const CODE_KEY = "nanno.waitlist.code";

type Status = { refCode: string; position: number; referrals: number; total: number };

function readCode() {
  try {
    return localStorage.getItem(CODE_KEY);
  } catch {
    return null;
  }
}

function saveCode(code: string) {
  try {
    localStorage.setItem(CODE_KEY, code);
  } catch {}
}

export default function WaitlistForm() {
  const t = useTranslations("nano.waitlist");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "invalid" | "error">("idle");
  const [status, setStatus] = useState<Status | null>(null);
  const [copied, setCopied] = useState(false);

  // Returning visitors see their current position instead of the form.
  useEffect(() => {
    const code = readCode();
    if (!code) return;
    fetch(`/api/nano/waitlist?code=${encodeURIComponent(code)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => s && setStatus(s))
      .catch(() => {});
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("sending");
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/nano/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          ref: params.get("ref"),
          source: params.get("utm_source") ?? (document.referrer ? new URL(document.referrer).host : null),
          locale,
          website: form.get("website"),
        }),
      });
      if (res.status === 400) return setState("invalid");
      if (!res.ok) return setState("error");
      const s: Status = await res.json();
      saveCode(s.refCode);
      setStatus(s);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (status) {
    const link = `${window.location.origin}${window.location.pathname}?ref=${status.refCode}`;
    const count = Math.min(status.referrals, REWARD_AT);
    const share = `https://x.com/intent/post?text=${encodeURIComponent(t("shareText"))}&url=${encodeURIComponent(link)}`;
    return (
      <div className={styles.joined} aria-live="polite">
        <p className={styles.joinedTitle}>{t("successTitle", { position: status.position })}</p>
        <p className={styles.joinedBody}>{t("successBody", { bump: REF_BUMP, goal: REWARD_AT })}</p>
        <div className={styles.refRow}>
          <input className={styles.refLink} readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label="Referral link" />
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={() => {
              navigator.clipboard?.writeText(link).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              });
            }}
          >
            {copied ? t("copied") : t("copy")}
          </button>
          <a className={styles.secondaryBtn} href={share} target="_blank" rel="noopener noreferrer">
            {t("share")}
          </a>
        </div>
        <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={REWARD_AT} aria-valuenow={count}>
          <span style={{ width: `${(count / REWARD_AT) * 100}%` }} />
        </div>
        <p className={styles.progressLabel}>
          {status.referrals >= REWARD_AT ? t("unlocked") : t("progress", { count, goal: REWARD_AT })}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <label className={styles.srOnly} htmlFor="nano-email">
        {t("label")}
      </label>
      <input
        id="nano-email"
        className={styles.input}
        type="email"
        autoComplete="email"
        required
        placeholder={t("placeholder")}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (state === "invalid" || state === "error") setState("idle");
        }}
        aria-invalid={state === "invalid"}
      />
      <input className={styles.honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className={styles.primaryBtn} type="submit" disabled={state === "sending"}>
        {state === "sending" ? t("sending") : t("cta")}
      </button>
      <p className={state === "invalid" || state === "error" ? styles.formError : styles.formNote} role="status">
        {state === "invalid" ? t("invalid") : state === "error" ? t("error") : t("note")}
      </p>
    </form>
  );
}
