"use client";
import type { NextPage } from "next";
import { Box } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type ScalabilitySupportType = {
  className?: string;
};

const features = [
  { icon: "/Group2.svg", key: "transparentWorkflow", width: 43, height: 42 },
  { icon: "/Group9.svg", key: "dedicatedSupport", width: 46, height: 41 },
  { icon: "/Group8.svg", key: "scalability", width: 46, height: 45 },
  { icon: "/Group11.svg", key: "clearCommunication", width: 46, height: 45 },
];

const ScalabilitySupport: NextPage<ScalabilitySupportType> = ({ className = "" }) => {
  const t = useTranslations("home.features");
  return (
    <Box
      component="section"
      className={className}
      sx={{
        width: "100%",
        backgroundColor: "var(--color-blueviolet-200)",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          gap: { xs: 3, md: 4 },
        }}
      >
        {features.map((feature) => (
          <Box
            key={feature.key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              minWidth: { xs: "140px", sm: "auto" },
            }}
          >
            <Image
              loading="lazy"
              width={feature.width}
              height={feature.height}
              alt={t(feature.key)}
              src={feature.icon}
            />
            <Box
              sx={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: { xs: "0.85rem", md: "1.25rem" },
                color: "var(--color-midnightblue-200)",
                lineHeight: 1.3,
              }}
            >
              {t(feature.key)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ScalabilitySupport;
