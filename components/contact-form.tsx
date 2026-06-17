"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const optionKeys = [
  "saas",
  "custom",
  "landing",
  "maintenance",
  "security",
  "other",
] as const;

const CONTACT_EMAIL = "rafael.ramos@hanno.com.br";

const fieldSx = {
  width: "100%",
  backgroundColor: "var(--color-white)",
  border: "1px solid transparent",
  borderRadius: "var(--br-10)",
  px: { xs: 2, md: 3 },
  py: { xs: 1.8, md: 2.1 },
  fontFamily: "var(--font-inter)",
  fontSize: { xs: "0.95rem", md: "1.1rem" },
  color: "var(--color-gray)",
  outline: "none",
  "&::placeholder": { color: "var(--color-silver)" },
  "&:focus": { borderColor: "var(--color-blueviolet-100)" },
} as const;

type Field = "name" | "email" | "company" | "lookingFor" | "message";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    lookingFor: "",
    message: "",
  });

  const update =
    (key: Field) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Looking for: ${form.lookingFor}`,
      "",
      form.message,
    ].join("\n");
    const subject = `${t("emailSubject")} — ${form.name || "Hanno"}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "640px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 2.5 },
      }}
    >
      <Box
        component="input"
        type="text"
        required
        placeholder={t("namePlaceholder")}
        value={form.name}
        onChange={update("name")}
        sx={fieldSx}
      />
      <Box
        component="input"
        type="email"
        required
        placeholder={t("emailPlaceholder")}
        value={form.email}
        onChange={update("email")}
        sx={fieldSx}
      />
      <Box
        component="input"
        type="text"
        placeholder={t("companyPlaceholder")}
        value={form.company}
        onChange={update("company")}
        sx={fieldSx}
      />

      {/* What are you looking for? */}
      <Box
        sx={{
          backgroundColor: "var(--color-white)",
          borderRadius: "var(--br-10)",
          px: { xs: 2, md: 3 },
          py: { xs: 2.5, md: 3 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-inter)",
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            color: "var(--color-gray)",
            mb: 2,
          }}
        >
          {t("lookingForLabel")}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {optionKeys.map((key) => {
            const label = t(`options.${key}`);
            return (
              <Box
                key={key}
                component="label"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  fontFamily: "var(--font-inter)",
                  fontSize: { xs: "0.9rem", md: "1.05rem" },
                  color: "var(--color-dimgray)",
                }}
              >
                <Box
                  component="input"
                  type="radio"
                  name="lookingFor"
                  value={label}
                  checked={form.lookingFor === label}
                  onChange={update("lookingFor")}
                  sx={{
                    accentColor: "var(--color-blueviolet-200)",
                    width: 18,
                    height: 18,
                    cursor: "pointer",
                    m: 0,
                  }}
                />
                {label}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box
        component="textarea"
        rows={4}
        placeholder={t("messagePlaceholder")}
        value={form.message}
        onChange={update("message")}
        sx={{ ...fieldSx, minHeight: "120px", resize: "vertical" }}
      />

      <Box
        component="button"
        type="submit"
        sx={{
          width: "100%",
          border: "none",
          cursor: "pointer",
          backgroundColor: "var(--color-blueviolet-200)",
          borderRadius: "var(--br-10)",
          color: "var(--color-white)",
          fontFamily: "var(--font-inter)",
          fontWeight: 600,
          fontSize: { xs: "1rem", md: "1.2rem" },
          py: { xs: 1.8, md: 2.1 },
          mt: 1,
          "&:hover": { backgroundColor: "var(--color-blueviolet-100)" },
        }}
      >
        {t("submit")}
      </Box>
    </Box>
  );
}
