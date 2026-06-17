import { setRequestLocale, getTranslations } from "next-intl/server";
import ServicePage from "@/components/service-page";

type Props = { params: Promise<{ locale: string }> };
const NS = "services.saas";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: `${NS}.meta` });
  return { title: t("title"), description: t("description") };
}

export default async function SaasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations(NS);
  const tp = await getTranslations("servicePage");
  const process = (
    t.raw("process") as { title: string; description: string }[]
  ).map((p, i) => ({ number: String(i + 1), ...p }));

  return (
    <ServicePage
      heroTitle={t("heroTitle")}
      heading={t("heading")}
      subtitle={t("subtitle")}
      intro={t.raw("intro") as string[]}
      offerings={t.raw("offerings") as { title: string; description: string }[]}
      process={process}
      processHeading={tp("processHeading")}
      cta={{
        heading: t("cta.heading"),
        subtitle: t("cta.subtitle"),
        button: t("cta.button"),
      }}
    />
  );
}
