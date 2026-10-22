"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import NanoCat, { SKINS } from "@/components/nano/nano-cat";
import WaitlistForm from "./waitlist-form";
import styles from "./nano.module.css";

const FEATURES = ["act", "talk", "remember", "private", "study", "style"] as const;
const STEPS = ["install", "connect", "ask"] as const;
const PLANS = ["monthly", "annual", "founder"] as const;
const AIS = ["ChatGPT", "Claude", "Gemini", "DeepSeek", "Grok", "Mistral", "Qwen", "Llama"];
const APPS = ["Notion", "Google Calendar", "Gmail"];
// Same cat icons the Hanno home uses for its feature strip.
const STRIP = [
  { icon: "/Group2.svg", key: "talk" },
  { icon: "/Group9.svg", key: "act" },
  { icon: "/Group8.svg", key: "remember" },
  { icon: "/Group11.svg", key: "private" },
] as const;
const LOCALES = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT" },
] as const;

// Links between languages differ on nanno.hanno.com.br ("/", "/pt-BR") and on the
// main site ("/nanno", "/pt-BR/nanno").
function useNannoHost() {
  const [nannoHost, setNannoHost] = useState(false);
  useEffect(() => setNannoHost(window.location.host.startsWith("nanno.")), []);
  return nannoHost;
}

function localeHref(code: string, nannoHost: boolean) {
  if (nannoHost) return code === "en" ? "/" : `/${code}`;
  return code === "en" ? "/nanno" : `/${code}/nanno`;
}

// Cycles through the skin catalog; dots let visitors pick one.
function SkinShowcase({ bubbles }: { bubbles: string[] }) {
  const t = useTranslations("nano.skins");
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % SKINS.length), 3200);
    return () => clearInterval(id);
  }, [paused]);
  const skin = SKINS[i];
  return (
    <div className={styles.heroArt} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={styles.glow} style={{ background: `radial-gradient(circle, ${skin.aura}88, transparent 68%)` }} aria-hidden="true" />
      <Bubbles items={bubbles} />
      <NanoCat className={styles.heroCat} skin={skin} />
      <div className={styles.skinPicker}>
        <span className={styles.skinName} key={skin.id}>
          {t("label")}: <strong>{t(skin.id)}</strong>
        </span>
        <div className={styles.skinDots} role="group" aria-label={t("label")}>
          {SKINS.map((s, n) => (
            <button
              key={s.id}
              type="button"
              className={n === i ? styles.skinDotOn : styles.skinDot}
              style={{ background: s.eye }}
              aria-label={t(s.id)}
              aria-pressed={n === i}
              onClick={() => setI(n)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubbles({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 3200);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className={styles.bubble} aria-hidden="true">
      <span key={i} className={styles.bubbleText}>
        {items[i]}
      </span>
    </div>
  );
}

function Check({ on }: { on: boolean }) {
  return on ? (
    <span className={styles.yes} aria-label="✓">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 12.5 10 16.5 18 8" />
      </svg>
    </span>
  ) : (
    <span className={styles.no} aria-label="✗">
      ×
    </span>
  );
}

export default function NanoLanding() {
  const t = useTranslations("nano");
  const locale = useLocale();
  const nannoHost = useNannoHost();
  const othersHas = t.raw("compare.others_has") as boolean[];

  return (
    <div className={styles.page}>
      <div className={styles.heroBand}>
        <header className={styles.nav}>
          <a className={styles.brand} href="#top">
            <Image width={101} height={18} alt="Hanno" src="/Group5.svg" />
            <span className={styles.brandSep} aria-hidden="true" />
            <span className={styles.brandMark} aria-hidden="true" />
            Nanno
          </a>
          <nav className={styles.navLinks}>
            <a href="#features">{t("nav.features")}</a>
            <a href="#pricing">{t("nav.pricing")}</a>
            <a href="#faq">{t("nav.faq")}</a>
          </nav>
          <div className={styles.navRight}>
            <div className={styles.lang}>
              {LOCALES.map((l, i) => (
                <span key={l.code}>
                  <a href={localeHref(l.code, nannoHost)} hrefLang={l.code} aria-current={l.code === locale ? "true" : undefined}>
                    {l.label}
                  </a>
                  {i < LOCALES.length - 1 && <span className={styles.langSep}>|</span>}
                </span>
              ))}
            </div>
            <a className={styles.navCta} href="#join">
              {t("nav.join")}
            </a>
          </div>
        </header>

        <section id="top" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}>{t("hero.badge")}</p>
            <h1 className={styles.title}>{t("hero.title")}</h1>
            <p className={styles.subtitle}>{t("hero.subtitle")}</p>
            <div id="join" className={styles.join}>
              <WaitlistForm />
            </div>
          </div>
          <SkinShowcase bubbles={t.raw("hero.bubbles") as string[]} />
        </section>

        <ul className={styles.strip}>
          {STRIP.map(({ icon, key }) => (
            <li key={key}>
              <Image width={44} height={42} alt="" src={icon} />
              {t(`features.items.${key}.title`)}
            </li>
          ))}
        </ul>
      </div>

      <section className={styles.works}>
        <p className={styles.worksLabel}>{t("worksWith")}</p>
        <ul className={styles.chips}>
          {AIS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className={styles.worksLabel}>{t("apps")}</p>
        <ul className={`${styles.chips} ${styles.chipsApps}`}>
          {APPS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section id="features" className={styles.dark}>
        <div className={styles.inner}>
          <h2 className={`${styles.h2} ${styles.h2Violet}`}>{t("features.title")}</h2>
          <div className={styles.bento}>
            {FEATURES.map((key, i) => (
              <article key={key} className={i === 0 ? styles.bentoMain : styles.bentoCard}>
                <h3>{t(`features.items.${key}.title`)}</h3>
                <p>{t(`features.items.${key}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.light}>
        <div className={styles.inner}>
          <h2 className={`${styles.h2} ${styles.center}`}>{t("compare.title")}</h2>
          <p className={`${styles.lead} ${styles.center}`}>{t("compare.subtitle")}</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{t("compare.feature")}</th>
                  <th scope="col" className={styles.colNano}>
                    <span className={styles.brandMark} aria-hidden="true" /> {t("compare.nano")}
                  </th>
                  <th scope="col">{t("compare.others")}</th>
                </tr>
              </thead>
              <tbody>
                {(t.raw("compare.rows") as string[]).map((row, i) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    <td className={styles.colNano}>
                      <Check on />
                    </td>
                    <td>
                      <Check on={othersHas[i]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.violet}>
        <div className={`${styles.inner} ${styles.how}`}>
          <h2 className={`${styles.h2} ${styles.h2Dark}`}>{t("how.title")}</h2>
          <ol className={styles.steps}>
            {STEPS.map((key, i) => (
              <li key={key}>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{t(`how.steps.${key}.title`)}</h3>
                <p>{t(`how.steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.light}>
        <div className={`${styles.inner} ${styles.real}`}>
          <div className={styles.photo} role="img" aria-label={t("real.photoAlt")}>
            <NanoCat className={styles.photoCat} />
            <span>{t("real.photoSoon")}</span>
          </div>
          <div>
            <p className={styles.eyebrow}>{t("real.eyebrow")}</p>
            <h2 className={styles.h2}>{t("real.title")}</h2>
            <p className={styles.realBody}>{t("real.body")}</p>
            <p className={styles.signature}>{t("real.signature")}</p>
          </div>
        </div>
      </section>

      <section id="founders" className={styles.founder}>
        <div className={styles.stars} aria-hidden="true" />
        <div className={`${styles.inner} ${styles.founderGrid}`}>
          <div className={styles.mysteryBox}>
            <div className={styles.mysteryInner}>
              <span className={styles.mysteryTag}>{t("founder.mysteryName")}</span>
              <NanoCat className={styles.mysteryCat} mystery />
              <span className={styles.mysteryHint}>{t("founder.mysteryHint")}</span>
            </div>
          </div>
          <div>
            <p className={styles.founderEyebrow}>{t("founder.eyebrow")}</p>
            <h2 className={`${styles.h2} ${styles.h2White}`}>{t("founder.title")}</h2>
            <p className={styles.founderBody}>{t("founder.body")}</p>
            <ul className={styles.founderPerks}>
              {(t.raw("pricing.founder.features") as string[]).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className={styles.founderPrice}>
              {t("founder.price")} <small>{t("founder.period")}</small>
            </p>
            <a className={styles.btnLime} href="#join">
              {t("founder.cta")}
            </a>
            <p className={styles.founderSpots}>{t("founder.spots")}</p>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.dark}>
        <div className={styles.inner}>
          <h2 className={`${styles.h2} ${styles.h2Violet} ${styles.center}`}>{t("pricing.title")}</h2>
          <p className={`${styles.lead} ${styles.leadLight} ${styles.center}`}>{t("pricing.subtitle")}</p>
          <div className={styles.plans}>
            {PLANS.map((plan) => (
              <article key={plan} className={plan === "founder" ? styles.planFounder : styles.plan}>
                {plan === "founder" && <span className={styles.ribbon}>{t("pricing.founder.ribbon")}</span>}
                <header>
                  <h3>{t(`pricing.${plan}.name`)}</h3>
                  {plan !== "monthly" && <span className={styles.planBadge}>{t(`pricing.${plan}.badge`)}</span>}
                </header>
                <p className={styles.price}>
                  {t(`pricing.${plan}.price`)} <small>{t(`pricing.${plan}.period`)}</small>
                </p>
                <ul>
                  {(t.raw(`pricing.${plan}.features`) as string[]).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a className={plan === "founder" ? styles.btnLime : styles.btnDark} href={plan === "founder" ? "#founders" : "#join"}>
                  {plan === "founder" ? t("pricing.founderCta") : t("pricing.cta")}
                </a>
              </article>
            ))}
          </div>
          <p className={`${styles.fine} ${styles.center}`}>{t("pricing.note")}</p>
        </div>
      </section>

      <section id="faq" className={styles.light}>
        <div className={`${styles.inner} ${styles.faqGrid}`}>
          <h2 className={styles.h2}>{t("faq.title")}</h2>
          <div className={styles.faq}>
            {(t.raw("faq.items") as { q: string; a: string }[]).map(({ q, a }) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.finalPattern} aria-hidden="true">
          <Image width={1638} height={1005} sizes="100vw" alt="" src="/Mask-group.svg" />
        </div>
        <div className={styles.finalInner}>
          <NanoCat className={styles.finalCat} />
          <h2 className={`${styles.h2} ${styles.h2White}`}>{t("final.title")}</h2>
          <p className={styles.finalLead}>{t("final.subtitle")}</p>
        </div>
        <a className={styles.dome} href="#join">
          {t("final.cta")}
        </a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          <p className={styles.footerTag}>{t("footer.product")}</p>
          <nav className={styles.footerLinks}>
            <a href="#features">{t("nav.features")}</a>
            <a href="#pricing">{t("nav.pricing")}</a>
            <a href="#faq">{t("nav.faq")}</a>
            <a href={locale === "en" ? "https://hanno.com.br" : `https://hanno.com.br/${locale}`}>hanno.com.br</a>
          </nav>
          <p className={styles.footerRights}>{t("footer.rights")}</p>
        </div>
      </footer>
    </div>
  );
}
