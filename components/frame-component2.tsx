"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type FrameComponent2Type = {
  className?: string;
};

const painPoints = [
  { icon: "/Group3.svg", key: "confusingWorkflows", width: 55, height: 54 },
  { icon: "/Group4.svg", key: "genericSolutions", width: 52, height: 51 },
  { icon: "/Group12.svg", key: "poorSupport", width: 52, height: 51 },
  { icon: "/Group7.svg", key: "technologyOverload", width: 53, height: 51 },
  { icon: "/Group6.svg", key: "technicalConfusion", width: 51, height: 50 },
];

const FrameComponent2: NextPage<FrameComponent2Type> = ({ className = "" }) => {
  const t = useTranslations("home.painPoints");
  return (
    <Box
      component="section"
      className={className}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 6, md: 8 },
      }}
    >
      {/* Title */}
      <Typography
        component="h2"
        sx={{
          fontFamily: "var(--font-boldonse)",
          color: "var(--color-white)",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.38rem" },
          lineHeight: { xs: 1.4, md: 2.2 },
          textAlign: "center",
          mb: { xs: 2, md: 3 },
        }}
      >
        {t("title")}
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontFamily: "var(--font-inter)",
          color: "var(--color-gainsboro-100)",
          fontSize: { xs: "1rem", md: "1.56rem" },
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: "900px",
          mx: "auto",
          mb: { xs: 4, md: 6 },
        }}
      >
        {t("subtitle")}
      </Typography>

      {/* Pain Points Icons */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 3, md: 5 },
          mb: { xs: 4, md: 6 },
        }}
      >
        {painPoints.map((point) => (
          <Box
            key={point.key}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              width: { xs: "80px", sm: "120px", md: "150px" },
            }}
          >
            <Box
              sx={{
                width: { xs: "60px", md: "99px" },
                height: { xs: "60px", md: "99px" },
                borderRadius: "50%",
                backgroundColor: "var(--color-gainsboro-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                loading="lazy"
                width={point.width}
                height={point.height}
                alt={t(`items.${point.key}`)}
                src={point.icon}
                style={{ width: "55%", height: "55%" }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: { xs: "0.75rem", md: "1rem" },
                color: "var(--color-white)",
                textAlign: "center",
                lineHeight: 1.3,
                whiteSpace: "pre-line",
              }}
            >
              {t(`items.${point.key}`)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Bottom text */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 6 },
          mt: { xs: 4, md: 8 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            color: "var(--color-white)",
            fontSize: { xs: "1.1rem", md: "2.19rem" },
            lineHeight: 1.5,
            flex: 1,
            textAlign: "left",
            whiteSpace: "pre-line",
          }}
        >
          {t("bottom1")}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            color: "var(--color-white)",
            fontSize: { xs: "1.1rem", md: "2.19rem" },
            lineHeight: 1.5,
            flex: 1,
            textAlign: "left",
          }}
        >
          {t("bottom2")}
        </Typography>
      </Box>
    </Box>
  );
};

export default FrameComponent2;
