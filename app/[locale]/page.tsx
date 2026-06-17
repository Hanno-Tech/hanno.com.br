import { setRequestLocale } from "next-intl/server";
import Desktop1 from "./desktop1";

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Desktop1 />;
}
