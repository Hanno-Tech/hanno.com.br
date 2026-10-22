import { getTranslations, setRequestLocale } from "next-intl/server";
import NanoLanding from "./nano-landing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nano.meta" });
  const base = "https://nanno.hanno.com.br";
  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(base),
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: { en: "/", "pt-BR": "/pt-BR" },
    },
    openGraph: { title: t("title"), description: t("description"), url: base, siteName: "Nanno" },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NanoLanding />;
}
