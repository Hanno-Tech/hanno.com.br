import { getTranslations, setRequestLocale } from "next-intl/server";
import NanoLanding from "./nano-landing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nano.meta" });
  const base = "https://hanno.com.br";
  const path = locale === "en" ? "/nanno" : `/${locale}/nanno`;
  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(base),
    icons: { icon: "/nanno/icon.png", apple: "/nanno/icon.png" },
    alternates: {
      canonical: path,
      languages: { en: "/nanno", "pt-BR": "/pt-BR/nanno" },
    },
    openGraph: { title: t("title"), description: t("description"), url: `${base}${path}`, siteName: "Nanno" },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NanoLanding />;
}
