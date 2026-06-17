import { ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import EmptyList from "./empty-list";
import GroupComponent from "./group-component";

export type ServicePageProps = {
  heroTitle: ReactNode;
  heading: string;
  subtitle: string;
  intro: string[];
  offerings: { title: string; description: string }[];
  process: { number: string; title: string; description: string }[];
  processHeading: string;
  processVariant?: "light" | "dark";
  cta: { heading: string; subtitle: string; button: string; href?: string };
};

export default function ServicePage({
  heroTitle,
  heading,
  subtitle,
  intro,
  offerings,
  process,
  processHeading,
  processVariant = "light",
  cta,
}: ServicePageProps) {
  const dark = processVariant === "dark";
  const proc = {
    bg: dark ? "var(--color-midnightblue-200)" : "var(--color-blueviolet-100)",
    title: dark ? "var(--color-blueviolet-100)" : "var(--color-gray)",
    circleBg: dark
      ? "var(--color-blueviolet-100)"
      : "var(--color-midnightblue-200)",
    number: dark
      ? "var(--color-midnightblue-200)"
      : "var(--color-blueviolet-100)",
    stepTitle: dark ? "var(--color-blueviolet-100)" : "var(--color-gray)",
    stepDesc: dark ? "var(--color-gainsboro-200)" : "var(--color-gray)",
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        backgroundColor: "var(--color-gainsboro-100)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {/* Purple hero */}
        <Box
          sx={{
            background:
              "linear-gradient(180deg, var(--color-blueviolet-100) 0%, var(--color-blueviolet-200) 100%)",
            width: "100%",
            pt: { xs: 3, md: 5 },
          }}
        >
          <EmptyList />
          <Box
            sx={{
              width: "100%",
              maxWidth: "1400px",
              mx: "auto",
              px: { xs: 2, sm: 3, md: 5 },
              pb: { xs: 5, md: 8 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontFamily: "var(--font-boldonse)",
                color: "var(--color-white)",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                lineHeight: 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {heroTitle}
            </Typography>
          </Box>
        </Box>

        {/* Intro + content */}
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 5 },
            py: { xs: 6, md: 10 },
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-boldonse)",
              color: "var(--color-gray)",
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
              lineHeight: 1.4,
              textAlign: "center",
              mb: { xs: 3, md: 4 },
            }}
          >
            {heading}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-gray)",
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.6,
              textAlign: "center",
              maxWidth: "820px",
              mx: "auto",
              mb: { xs: 5, md: 8 },
            }}
          >
            {subtitle}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 5, md: 8 },
            }}
          >
            {/* Left column */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2.5, md: 3 },
              }}
            >
              {intro.map((paragraph) => (
                <Typography
                  key={paragraph.slice(0, 24)}
                  sx={{
                    fontFamily: "var(--font-inter)",
                    color: "var(--color-gray)",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    lineHeight: 1.6,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>

            {/* Right column */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: { xs: 3, md: 4 },
              }}
            >
              {offerings.map((item) => (
                <Box key={item.title}>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      color: "var(--color-blueviolet-200)",
                      fontSize: { xs: "1.1rem", md: "1.4rem" },
                      lineHeight: 1.4,
                      mb: 1,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-inter)",
                      color: "var(--color-gray)",
                      fontSize: { xs: "0.95rem", md: "1.1rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* The Process */}
        <Box
          component="section"
          sx={{
            width: "100%",
            backgroundColor: proc.bg,
            py: { xs: 6, md: 10 },
            px: { xs: 2, sm: 4, md: 8 },
          }}
        >
          <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: "var(--font-boldonse)",
                color: proc.title,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                lineHeight: 1.4,
                textAlign: "center",
                mb: { xs: 5, md: 8 },
              }}
            >
              {processHeading}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 4, md: 4 },
              }}
            >
              {process.map((step) => (
                <Box
                  key={step.number}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 64, md: 72 },
                      height: { xs: 64, md: 72 },
                      borderRadius: "50%",
                      backgroundColor: proc.circleBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-boldonse)",
                        color: proc.number,
                        fontSize: { xs: "1.3rem", md: "1.6rem" },
                        lineHeight: 1,
                      }}
                    >
                      {step.number}
                    </Typography>
                  </Box>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      color: proc.stepTitle,
                      fontSize: { xs: "1.05rem", md: "1.2rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-inter)",
                      color: proc.stepDesc,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      lineHeight: 1.5,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* CTA */}
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: "900px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 5 },
            py: { xs: 8, md: 12 },
            textAlign: "center",
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-boldonse)",
              color: "var(--color-gray)",
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
              lineHeight: 1.4,
              mb: { xs: 2, md: 3 },
            }}
          >
            {cta.heading}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-gray)",
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.6,
              maxWidth: "560px",
              mx: "auto",
              mb: { xs: 4, md: 5 },
            }}
          >
            {cta.subtitle}
          </Typography>
          <Button
            component={Link}
            href={cta.href ?? "/contact"}
            disableElevation
            variant="contained"
            sx={{
              backgroundColor: "var(--color-blueviolet-100)",
              color: "var(--color-midnightblue-200)",
              borderRadius: "var(--br-10)",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: { xs: "1rem", md: "1.25rem" },
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              textTransform: "none",
              "&:hover": { backgroundColor: "var(--color-blueviolet-200)" },
            }}
          >
            {cta.button}
          </Button>
        </Box>

        <GroupComponent />
      </Box>
    </Box>
  );
}
