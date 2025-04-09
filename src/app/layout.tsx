import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hanno - Tecnologia sob medida para o seu crescimento",
  description: "Desenvolvemos o sistema perfeito para as necessidades de startups, micro e pequenas empresas!",
  keywords: "tecnologia, desenvolvimento de sistemas, startups, micro empresas, pequenas empresas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
