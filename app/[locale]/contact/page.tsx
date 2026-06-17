import { Box, Typography } from "@mui/material";
import { setRequestLocale, getTranslations } from "next-intl/server";
import EmptyList from "@/components/empty-list";
import GroupComponent from "@/components/group-component";
import ContactForm from "@/components/contact-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

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
          <EmptyList showNav={false} />
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
              }}
            >
              {t("hero")}
            </Typography>
          </Box>
        </Box>

        {/* Form section */}
        <Box
          component="section"
          sx={{
            width: "100%",
            maxWidth: "1000px",
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
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.3rem" },
              lineHeight: 1.4,
              textAlign: "center",
              mb: { xs: 3, md: 4 },
              whiteSpace: "pre-line",
            }}
          >
            {t("heading")}
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-gray)",
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.6,
              textAlign: "center",
              maxWidth: "640px",
              mx: "auto",
              mb: { xs: 4, md: 6 },
            }}
          >
            {t("subtitle")}
          </Typography>
          <ContactForm />
        </Box>

        <GroupComponent />
      </Box>
    </Box>
  );
}
