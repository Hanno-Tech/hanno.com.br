"use client";
import { Box, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

const HannoProducts = () => {
  const t = useTranslations("home.products");
  const locale = useLocale();
  const nanoHref = locale === "en" ? "https://nanno.hanno.com.br" : `https://nanno.hanno.com.br/${locale}`;
  return (
    <Box
      component="section"
      id="products"
      sx={{
        width: "100%",
        backgroundColor: "var(--color-midnightblue-200)",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: "var(--font-boldonse)",
            color: "var(--color-white)",
            fontSize: { xs: "1.6rem", md: "2.5rem" },
            lineHeight: 1.5,
            mb: { xs: 3, md: 5 },
          }}
        >
          {t("title")}
        </Typography>
        <Box
          component="a"
          href={nanoHref}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 2.5, md: 4 },
            maxWidth: "720px",
            p: { xs: 3, md: 4 },
            borderRadius: "var(--br-30)",
            background: "linear-gradient(135deg, #14111e 0%, #0c0a12 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--color-white)",
            textDecoration: "none",
            transition: "transform .2s ease, box-shadow .2s ease",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 20px 50px rgba(132,71,255,.35)" },
          }}
        >
          <Box
            aria-hidden
            sx={{
              flex: "none",
              width: 88,
              height: 88,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 32% 52%, #c6f25b 7px, transparent 8px), radial-gradient(circle at 68% 52%, #c6f25b 7px, transparent 8px), radial-gradient(circle at 35% 30%, #3a3846, #17161c 70%)",
              boxShadow: "0 0 30px rgba(132,71,255,.55)",
            }}
          />
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Typography sx={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.9rem" } }}>
                {t("nanoTitle")}
              </Typography>
              <Box
                component="span"
                sx={{
                  px: 1.25,
                  py: 0.25,
                  borderRadius: "999px",
                  backgroundColor: "rgba(198,242,91,.15)",
                  color: "#c6f25b",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {t("tag")}
              </Box>
            </Box>
            <Typography sx={{ fontFamily: "var(--font-inter)", color: "var(--color-silver)", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.6, mb: 1.5 }}>
              {t("nanoBody")}
            </Typography>
            <Typography sx={{ fontFamily: "var(--font-inter)", color: "#b79bff", fontWeight: 600 }}>{t("nanoCta")} →</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HannoProducts;
