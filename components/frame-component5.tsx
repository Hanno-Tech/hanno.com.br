"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export type FrameComponent5Type = {
  className?: string;
};

const stepNumbers = ["01", "02", "03", "04"];

const FrameComponent5: NextPage<FrameComponent5Type> = ({ className = "" }) => {
  const t = useTranslations("home.howItWorks");
  const steps = stepNumbers.map((number, i) => ({
    number,
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));
  return (
    <Box
      component="section"
      className={className}
      sx={{
        width: "100%",
        backgroundColor: "var(--color-blueviolet-100)",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 8 },
            mb: { xs: 5, md: 8 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-boldonse)",
              color: "var(--color-gray)",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              lineHeight: 1.5,
              flex: { md: "0 0 auto" },
              maxWidth: { md: "500px" },
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-gray)",
              fontSize: { xs: "1rem", md: "1.56rem" },
              lineHeight: 1.6,
              flex: 1,
            }}
          >
            {t("subtitle")}
          </Typography>
        </Box>

        {/* Steps */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr" },
            gap: { xs: 4, md: 5 },
          }}
        >
          {steps.map((step) => (
            <Box key={step.number}>
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: { xs: "1.1rem", md: "1.56rem" },
                  color: "var(--color-gray)",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                {step.number}
                <br />
                {step.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: { xs: "0.9rem", md: "1.25rem" },
                  color: "var(--color-gray)",
                  lineHeight: 1.5,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Bottom quote */}
        <Typography
          sx={{
            fontFamily: "var(--font-inter)",
            color: "var(--color-gray)",
            fontSize: { xs: "1rem", md: "1.56rem" },
            lineHeight: 1.6,
            mt: { xs: 5, md: 8 },
            maxWidth: "500px",
          }}
        >
          {t("bottomQuote")}
        </Typography>
      </Box>
    </Box>
  );
};

export default FrameComponent5;
