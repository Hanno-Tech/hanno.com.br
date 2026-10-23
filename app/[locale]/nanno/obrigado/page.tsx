import { getTranslations, setRequestLocale } from "next-intl/server";
import NanoCat, { MYSTERY_SKIN, SKINS } from "@/components/nano/nano-cat";
import NannoLogo from "@/components/nano/nanno-logo";
import { stripe } from "@/lib/nano/stripe";
import styles from "../nano.module.css";

// Reads ?session_id on every request, so it must not be prerendered.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nano.thanks" });
  return { title: t("metaTitle"), robots: { index: false } };
}

async function loadSession(id?: string) {
  const client = stripe();
  if (!client || !id?.startsWith("cs_")) return null;
  try {
    return await client.checkout.sessions.retrieve(id);
  } catch {
    return null;
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nano.thanks" });
  const session = await loadSession((await searchParams).session_id);
  const paid = session?.status === "complete";
  const founder = session?.metadata?.plan === "founder";
  const email = session?.customer_details?.email;

  return (
    <div className={styles.page}>
      <div className={`${styles.heroBand} ${styles.thanks}`}>
        <a className={styles.brand} href={locale === "en" ? "/nanno" : `/${locale}/nanno`}>
          <NannoLogo height={24} />
        </a>
        <div className={styles.thanksCard}>
          <NanoCat className={styles.thanksCat} skin={founder ? MYSTERY_SKIN : SKINS[0]} mystery={founder} />
          <h1 className={`${styles.h2} ${styles.h2White}`}>{founder ? t("founderTitle") : t("title")}</h1>
          <p className={styles.subtitle}>{paid ? (founder ? t("founder") : t("plus")) : t("pending")}</p>
          {email && <p className={styles.formNote}>{t("receipt", { email })}</p>}
          <p className={styles.formNote}>{t("refund")}</p>
          <a className={styles.btnLime} href={locale === "en" ? "/nanno" : `/${locale}/nanno`}>
            {t("back")}
          </a>
        </div>
      </div>
    </div>
  );
}
