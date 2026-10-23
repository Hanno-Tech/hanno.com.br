import { setRequestLocale } from "next-intl/server";
import LegalPage from "@/components/nano/legal-page";
import { legalDoc } from "@/lib/nano/legal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const doc = legalDoc("terms", locale);
  return {
    title: `${doc.title} — Nanno`,
    description: doc.intro.slice(0, 155),
    alternates: { canonical: "/nanno/terms", languages: { en: "/nanno/terms", "pt-BR": "/pt-BR/nanno/terms" } },
    icons: { icon: "/nanno/icon.png" },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage kind="terms" locale={locale} />;
}
