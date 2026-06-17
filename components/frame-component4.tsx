"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

export type FrameComponent4Type = {
  className?: string;
};

const rows = [
  { key: "customDevelopment", softwareHouses: true },
  { key: "responsivePlatforms", softwareHouses: true },
  { key: "scalableArchitecture", softwareHouses: true },
  { key: "structuredOnboarding", softwareHouses: false },
  { key: "clearCommunication", softwareHouses: false },
  { key: "closeSupport", softwareHouses: false },
  { key: "brandingSupport", softwareHouses: false },
  { key: "guidanceBeyond", softwareHouses: false },
  { key: "humanCentered", softwareHouses: false },
];

const CheckMark = () => (
  <Box
    sx={{
      width: { xs: 24, md: 28 },
      height: { xs: 24, md: 28 },
      borderRadius: "50%",
      backgroundColor: "var(--color-blueviolet-100)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg viewBox="0 0 24 24" width="55%" height="55%" aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        fill="none"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

const Cross = () => (
  <Box
    sx={{
      width: { xs: 24, md: 28 },
      height: { xs: 24, md: 28 },
      borderRadius: "50%",
      backgroundColor: "var(--color-gainsboro-200)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg viewBox="0 0 24 24" width="45%" height="45%" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        fill="none"
        stroke="var(--color-dimgray)"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  </Box>
);

const FrameComponent4: NextPage<FrameComponent4Type> = ({ className = "" }) => {
  const t = useTranslations("home.comparison");
  const cellBase = {
    display: "flex",
    alignItems: "center",
    py: { xs: 1.5, md: 2 },
  };

  return (
    <Box
      component="section"
      className={className}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-boldonse)",
            color: "var(--color-gray)",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            lineHeight: 1.5,
            mb: { xs: 2, md: 4 },
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-inter)",
            color: "var(--color-black)",
            fontSize: { xs: "1rem", md: "1.56rem" },
            lineHeight: 1.6,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          {t("subtitle")}
        </Typography>
      </Box>

      {/* Comparison Table */}
      <Box
        sx={{
          border: "1px solid var(--color-gainsboro-200)",
          borderRadius: "var(--br-20)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 56px 56px",
            sm: "1fr 110px 110px",
            md: "2fr 1fr 1fr",
          },
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            ...cellBase,
            pl: { xs: 2, md: 4 },
            borderBottom: "1px solid var(--color-gainsboro-200)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: { xs: "0.85rem", md: "1.1rem" },
              color: "var(--color-gray)",
            }}
          >
            {t("expHeader")}
          </Typography>
        </Box>
        <Box
          sx={{
            ...cellBase,
            justifyContent: "center",
            backgroundColor: "var(--color-table-highlight)",
            borderBottom: "1px solid var(--color-gainsboro-200)",
          }}
        >
          <Image width={90} height={16} alt="Hanno" src="/Group10.svg" />
        </Box>
        <Box
          sx={{
            ...cellBase,
            justifyContent: "center",
            borderBottom: "1px solid var(--color-gainsboro-200)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: { xs: "0.7rem", md: "1rem" },
              color: "var(--color-gray)",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {t("shHeader")}
          </Typography>
        </Box>

        {/* Data rows */}
        {rows.map((row, idx) => {
          const last = idx === rows.length - 1;
          const border = last
            ? "none"
            : "1px solid var(--color-gainsboro-200)";
          return (
            <Box key={row.key} sx={{ display: "contents" }}>
              <Box
                sx={{ ...cellBase, pl: { xs: 2, md: 4 }, borderBottom: border }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-inter)",
                    fontSize: { xs: "0.8rem", md: "1.1rem" },
                    color: "var(--color-dimgray)",
                    lineHeight: 1.4,
                  }}
                >
                  {t(`rows.${row.key}`)}
                </Typography>
              </Box>
              <Box
                sx={{
                  ...cellBase,
                  justifyContent: "center",
                  backgroundColor: "var(--color-table-highlight)",
                  borderBottom: border,
                }}
              >
                <CheckMark />
              </Box>
              <Box
                sx={{
                  ...cellBase,
                  justifyContent: "center",
                  borderBottom: border,
                }}
              >
                {row.softwareHouses ? <CheckMark /> : <Cross />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FrameComponent4;
