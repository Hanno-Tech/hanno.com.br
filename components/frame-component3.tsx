"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type FrameComponent3Type = {
  className?: string;
};

const services = [
  { key: "saas", href: "/saas" },
  { key: "customSystems", href: "/custom-systems" },
  { key: "landingPages", href: "/landing-pages" },
  { key: "maintenance", href: "/maintenance" },
  { key: "security", href: "/security" },
] as const;

const FrameComponent3: NextPage<FrameComponent3Type> = ({ className = "" }) => {
  const t = useTranslations("home.services");
  return (
    <Box
      component="main"
      className={className}
      sx={{
        width: "100%",
        backgroundColor: "var(--color-midnightblue-200)",
        py: { xs: 6, md: 12 },
        px: { xs: 2, sm: 4, md: 8 },
        mb: { xs: 4, md: 9 },
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-boldonse)",
              color: "var(--color-blueviolet-100)",
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              lineHeight: 1.5,
              mb: { xs: 2, md: 4 },
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-gainsboro-200)",
              fontSize: { xs: "1rem", md: "1.56rem" },
              lineHeight: 1.6,
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Services Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1.5fr 1fr 1fr",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* Main SaaS Card */}
          <Box
            component={Link}
            href={services[0].href}
            sx={{
              gridRow: { sm: "span 2", lg: "span 2" },
              borderRadius: "var(--br-20)",
              backgroundColor: "var(--color-blueviolet-100)",
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "300px", md: "500px" },
              textDecoration: "none",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 30px rgba(40, 0, 77, 0.3)",
              },
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily: "var(--font-boldonse)",
                color: "var(--color-gainsboro-100)",
                fontSize: { xs: "1.6rem", md: "2.5rem" },
                lineHeight: 1.5,
                whiteSpace: "pre-line",
              }}
            >
              {t("items.saas.title")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-gainsboro-200)",
                fontSize: { xs: "0.9rem", md: "1.2rem" },
                lineHeight: 1.6,
                whiteSpace: "pre-line",
              }}
            >
              {t("items.saas.description")}
            </Typography>
          </Box>

          {/* Smaller service cards */}
          {services.slice(1).map((service) => (
            <Box
              key={service.key}
              component={Link}
              href={service.href}
              sx={{
                borderRadius: "var(--br-30)",
                backgroundColor: "var(--color-thistle)",
                p: { xs: 2.5, md: 3 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: { xs: "180px", md: "220px" },
                textDecoration: "none",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(40, 0, 77, 0.3)",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-boldonse)",
                  color: "var(--color-midnightblue-200)",
                  fontSize: { xs: "1.1rem", md: "1.5rem" },
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}
              >
                {t(`items.${service.key}.title`)}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--color-midnightblue-200)",
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  lineHeight: 1.5,
                }}
              >
                {t(`items.${service.key}.description`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FrameComponent3;
