"use client";
import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = "" }) => {
  const t = useTranslations("home.about");
  const tags = ["structured", "human", "scalable"] as const;
  const descriptions = ["workflows", "support", "solutions"] as const;
  return (
    <Box
      component="section"
      className={className}
      sx={{
        width: "100%",
        backgroundColor: "var(--color-blueviolet-100)",
        py: { xs: 6, md: 11 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
          alignItems: { xs: "flex-start", md: "flex-start" },
        }}
      >
        {/* About Us Title */}
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-boldonse)",
            color: "var(--color-gray)",
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "2.5rem" },
            lineHeight: 1.4,
            flexShrink: 0,
          }}
        >
          {t("title")}
        </Typography>

        {/* About Us Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-gray)",
              fontSize: { xs: "1rem", md: "1.56rem" },
              lineHeight: 1.6,
              mb: { xs: 4, md: 6 },
            }}
          >
            {t("paragraph")}
          </Typography>

          {/* Tags */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 4 },
              mb: { xs: 3, md: 5 },
            }}
          >
            {tags.map((tag) => (
              <Typography
                key={tag}
                component="span"
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: { xs: "1.1rem", md: "1.56rem" },
                  color: "var(--color-gray)",
                  lineHeight: 1.6,
                }}
              >
                {t(`tags.${tag}`)}
              </Typography>
            ))}
          </Box>

          {/* Descriptions */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 3 },
            }}
          >
            {descriptions.map((desc) => (
              <Typography
                key={desc}
                sx={{
                  fontFamily: "var(--font-inter)",
                  fontSize: { xs: "0.85rem", md: "1.25rem" },
                  color: "var(--color-gray)",
                  lineHeight: 1.5,
                  minWidth: { xs: "100%", sm: "200px" },
                  flex: { sm: "1 1 200px" },
                }}
              >
                {t(`descriptions.${desc}`)}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FrameComponent;
