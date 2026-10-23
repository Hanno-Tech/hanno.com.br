import NannoLogo from "@/components/nano/nanno-logo";
import { LEGAL_UPDATED, legalDoc } from "@/lib/nano/legal";
import styles from "@/app/[locale]/nanno/nano.module.css";

// Privacy policy / terms of use page, same look as the rest of /nanno.
export default function LegalPage({ kind, locale }: { kind: "privacy" | "terms"; locale: string }) {
  const doc = legalDoc(kind, locale);
  const pt = locale.startsWith("pt");
  const base = locale === "en" ? "/nanno" : `/${locale}/nanno`;
  const updated = new Date(`${LEGAL_UPDATED}T12:00:00`).toLocaleDateString(pt ? "pt-BR" : "en-US", { dateStyle: "long" });
  return (
    <div className={styles.page}>
      <div className={styles.legalBand}>
        <a className={styles.brand} href={base}>
          <NannoLogo height={24} />
        </a>
      </div>
      <main className={styles.legal}>
        <h1>{doc.title}</h1>
        <p className={styles.legalUpdated}>{pt ? `Última atualização: ${updated}` : `Last updated: ${updated}`}</p>
        <p>{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </section>
        ))}
        <nav className={styles.legalNav}>
          <a href={`${base}/privacy`}>{pt ? "Privacidade" : "Privacy"}</a>
          <a href={`${base}/terms`}>{pt ? "Termos de uso" : "Terms of use"}</a>
          <a href={base}>{pt ? "Voltar para o Nanno" : "Back to Nanno"}</a>
        </nav>
      </main>
    </div>
  );
}
