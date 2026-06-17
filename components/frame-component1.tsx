"use client";
import type { NextPage } from "next";
import { Box, Typography, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export type FrameComponent1Type = {
  className?: string;
};

const FrameComponent1: NextPage<FrameComponent1Type> = ({ className = "" }) => {
  const t = useTranslations("home.hero");
  return (
    <Box
      component="section"
      className={className}
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5 },
        pb: { xs: 8, md: 18 },
        textAlign: "center",
      }}
    >
      {/* Hero Title */}
      <Typography
        component="h1"
        sx={{
          fontFamily: "var(--font-boldonse)",
          color: "var(--color-white)",
          fontSize: { xs: "2.2rem", sm: "3rem", md: "4.3rem" },
          lineHeight: { xs: 1.3, md: 1.5 },
          mb: { xs: 3, md: 4 },
          whiteSpace: "pre-line",
        }}
      >
        {t("title")}
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontFamily: "var(--font-inter)",
          color: "var(--color-gainsboro-100)",
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.87rem" },
          lineHeight: 1.6,
          maxWidth: "700px",
          mx: "auto",
          textAlign: "center",
          mb: { xs: 3, md: 4 },
        }}
      >
        {t("subtitle")}
      </Typography>

      {/* CTA Button */}
      <Button
        component={Link}
        href="/contact"
        disableElevation
        variant="contained"
        sx={{
          backgroundColor: "var(--color-thistle)",
          color: "var(--color-gray)",
          borderRadius: "var(--br-10)",
          fontFamily: "var(--font-inter)",
          fontWeight: 600,
          fontSize: { xs: "0.9rem", md: "1.1rem" },
          px: { xs: 3, md: 4 },
          py: { xs: 1.2, md: 1.5 },
          textTransform: "none",
          "&:hover": { backgroundColor: "var(--color-thistle)" },
        }}
      >
        {t("cta")}
      </Button>
    </Box>
  );
};

export default FrameComponent1;
