import { setRequestLocale } from "next-intl/server";
import LegalPage from "@/components/nano/legal-page";
import { legalDoc } from "@/lib/nano/legal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const doc = legalDoc("privacy", locale);
  return {
    title: `${doc.title} — Nanno`,
    description: doc.intro.slice(0, 155),
    alternates: { canonical: "/nanno/privacy", languages: { en: "/nanno/privacy", "pt-BR": "/pt-BR/nanno/privacy" } },
    icons: { icon: "/nanno/icon.png" },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage kind="privacy" locale={locale} />;
}
