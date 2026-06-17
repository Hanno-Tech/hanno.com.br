"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useTranslations, useLocale } from "next-intl";

export type GroupComponentType = {
  className?: string;
};

const GroupComponent: NextPage<GroupComponentType> = ({ className = "" }) => {
  const tf = useTranslations("footer");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const base = locale === "en" ? "" : `/${locale}`;
  const navLinks = [
    { key: "home", href: `${base}/#top` },
    { key: "services", href: `${base}/#services` },
    { key: "howItWorks", href: `${base}/#how-it-works` },
    { key: "contact", href: `${base}/contact` },
  ];
  return (
    <Box
      component="footer"
      className={className}
      sx={{
        width: "100%",
        backgroundColor: "var(--color-blueviolet-100)",
        py: { xs: 5, md: 7 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 5, md: 8 },
        }}
      >
        {/* Left column */}
        <Box sx={{ flex: { md: "1 1 40%" } }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-boldonse)",
              color: "var(--color-gray)",
              fontSize: { xs: "1.6rem", md: "2.5rem" },
              lineHeight: 1.5,
              mb: { xs: 3, md: 5 },
              whiteSpace: "pre-line",
            }}
          >
            {tf("tagline")}
          </Typography>

          {/* Nav links */}
          <Box
            component="nav"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 3 },
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.key}
                component="a"
                href={link.href}
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: "var(--color-gray)",
                  textDecoration: "none",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {tn(link.key)}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Right columns - Contact info */}
        <Box
          sx={{
            flex: { md: "1 1 60%" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 4, md: 6 },
            flexWrap: "wrap",
          }}
        >
          {/* Contact Us */}
          <Box sx={{ minWidth: "150px" }}>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "var(--color-gray)",
                mb: 2,
              }}
            >
              {tf("contactUs")}
            </Typography>
            <Box
              sx={{
                fontFamily: "var(--font-inter)",
                fontSize: { xs: "0.85rem", md: "1rem" },
                color: "var(--color-gray)",
                lineHeight: 1.8,
              }}
            >
              <Box>rafael.ramos@hanno.com.br</Box>
              <Box>+55 48 99653-6876</Box>
              <Box>@hanno.tech</Box>
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                color: "var(--color-black)",
                mt: 3,
              }}
            >
              {tf("copyright")}
            </Typography>
          </Box>

          {/* Rafael */}
          <Box sx={{ minWidth: "150px" }}>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "var(--color-gray)",
                mb: 1,
              }}
            >
              Rafael Ramos
            </Typography>
            <Box
              sx={{
                fontFamily: "var(--font-inter)",
                fontSize: { xs: "0.85rem", md: "1rem" },
                color: "var(--color-gray)",
                lineHeight: 1.8,
              }}
            >
              <Box>{tf("roles.founder")}</Box>
              <Box>rafael.ramos@hanno.com.br</Box>
            </Box>
          </Box>

          {/* Leo */}
          <Box sx={{ minWidth: "150px" }}>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                color: "var(--color-gray)",
                mb: 1,
              }}
            >
              Leo Dalaz
            </Typography>
            <Box
              sx={{
                fontFamily: "var(--font-inter)",
                fontSize: { xs: "0.85rem", md: "1rem" },
                color: "var(--color-gray)",
                lineHeight: 1.8,
              }}
            >
              <Box>{tf("roles.brand")}</Box>
              <Box>hi@leodalaz.com</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupComponent;
