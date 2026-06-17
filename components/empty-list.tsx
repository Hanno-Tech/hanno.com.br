"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export type EmptyListType = {
  className?: string;
  showNav?: boolean;
};

const navLinks = [
  { key: "home", hash: "top" },
  { key: "services", hash: "services" },
  { key: "howItWorks", hash: "how-it-works" },
];

const locales: { code: "en" | "pt-BR"; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt-BR", label: "PT" },
];

const LanguageSwitcher = () => {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        fontFamily: "var(--font-inter)",
        fontSize: { xs: "0.8rem", md: "0.95rem" },
        color: "var(--color-gainsboro-100)",
      }}
    >
      {locales.map((l, i) => (
        <Box key={l.code} sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="button"
            type="button"
            onClick={() => router.replace(pathname, { locale: l.code })}
            sx={{
              cursor: "pointer",
              border: "none",
              background: "none",
              p: 0,
              fontFamily: "inherit",
              fontSize: "inherit",
              color: "inherit",
              fontWeight: activeLocale === l.code ? 700 : 500,
              opacity: activeLocale === l.code ? 1 : 0.6,
              "&:hover": { opacity: 1 },
            }}
          >
            {l.label}
          </Box>
          {i < locales.length - 1 && (
            <Box component="span" sx={{ mx: 0.5, opacity: 0.4 }}>
              |
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

const EmptyList: NextPage<EmptyListType> = ({
  className = "",
  showNav = true,
}) => {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const base = locale === "en" ? "" : `/${locale}`;

  return (
    <Box
      component="header"
      className={className}
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 3, md: 5 },
        pb: { xs: 6, md: 15 },
        fontFamily: "var(--font-inter)",
        color: "var(--color-gainsboro-100)",
      }}
    >
      {/* Logo */}
      <Box
        component={Link}
        href="/"
        sx={{ flexShrink: 0, display: "inline-flex" }}
      >
        <Image
          loading="lazy"
          width={101}
          height={18}
          alt="Hanno Logo"
          src="/Group5.svg"
        />
      </Box>

      {/* Navigation Links */}
      {showNav && (
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: { md: 3, lg: 5 },
            fontSize: "1.25rem",
          }}
        >
          {navLinks.map((link) => (
            <Typography
              key={link.key}
              component="a"
              href={`${base}/#${link.hash}`}
              sx={{
                fontWeight: 500,
                fontSize: "inherit",
                color: "inherit",
                textDecoration: "none",
                "&:hover": { opacity: 0.8 },
              }}
            >
              {t(link.key)}
            </Typography>
          ))}
        </Box>
      )}

      {/* Right group: language switcher + contact */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 } }}>
        <LanguageSwitcher />
        <Box
          component={Link}
          href="/contact"
          sx={{
            cursor: "pointer",
            border: "none",
            display: "inline-block",
            textDecoration: "none",
            px: { xs: 2, md: 2.5 },
            py: { xs: 1, md: 1.2 },
            backgroundColor: "var(--color-midnightblue-200)",
            borderRadius: "var(--br-10)",
            color: "var(--color-gainsboro-100)",
            fontFamily: "var(--font-inter)",
            fontSize: { xs: "0.85rem", md: "1rem" },
            fontWeight: 500,
            whiteSpace: "nowrap",
            "&:hover": { backgroundColor: "var(--color-indigo)" },
          }}
        >
          {tc("contactUs")}
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyList;
