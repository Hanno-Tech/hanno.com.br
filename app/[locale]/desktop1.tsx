"use client";
import type { NextPage } from "next";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import EmptyList from "@/components/empty-list";
import FrameComponent1 from "@/components/frame-component1";
import ScalabilitySupport from "@/components/scalability-support";
import FrameComponent from "@/components/frame-component";
import FrameComponent2 from "@/components/frame-component2";
import FrameComponent3 from "@/components/frame-component3";
import FrameComponent4 from "@/components/frame-component4";
import FrameComponent5 from "@/components/frame-component5";
import GroupComponent from "@/components/group-component";

const Desktop1: NextPage = () => {
  const t = useTranslations("home.closing");
  const tc = useTranslations("common");
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
      <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Hero area with purple background */}
        <Box
          id="top"
          sx={{
            background:
              "linear-gradient(180deg, var(--color-blueviolet-100) 0%, var(--color-blueviolet-200) 100%)",
            width: "100%",
            pt: { xs: 3, md: 5 },
          }}
        >
          <EmptyList />
          <FrameComponent1 />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <ScalabilitySupport />
          <FrameComponent />
        </Box>

        {/* "Technology shouldn't feel..." with Group-8.svg background */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, var(--color-blueviolet-100) 0%, var(--color-midnightblue-200) 100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "200%", md: "120%" },
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <Image
              width={1694}
              height={969}
              sizes="100vw"
              alt=""
              src="/Group-8.svg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <FrameComponent2 />
          </Box>
        </Box>

        <Box id="services">
          <FrameComponent3 />
        </Box>
        <FrameComponent4 />
        <Box id="how-it-works">
          <FrameComponent5 />
        </Box>

        {/* "Let's build something clearer" + Schedule CTA with Mask-group.svg background */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "var(--color-midnightblue-200)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "200%", md: "120%" },
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <Image
              width={1638}
              height={1005}
              sizes="100vw"
              alt=""
              src="/Mask-group.svg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              py: { xs: 8, md: 12 },
              px: { xs: 3, md: 6 },
              textAlign: "center",
              maxWidth: "829px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 5 },
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-boldonse)",
                color: "var(--color-white)",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "4.3rem" },
                lineHeight: { xs: 1.3, md: 1.5 },
                textAlign: "center",
              }}
            >
              {t("heading")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-gainsboro-100)",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.87rem" },
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              {t("body1")}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-inter)",
                color: "var(--color-gainsboro-100)",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.87rem" },
                lineHeight: 1.6,
                textAlign: "center",
                maxWidth: "809px",
              }}
            >
              {t("body2")}
            </Typography>
          </Box>

          {/* Schedule a Call CTA */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              py: { xs: 4, md: 6 },
              px: { xs: 3, md: 6 },
              position: "relative",
              zIndex: 2,
            }}
          >
            <Button
              component={Link}
              href="/contact"
              variant="text"
              sx={{
                fontFamily: "var(--font-boldonse)",
                fontSize: { xs: "1.4rem", md: "2.2rem" },
                lineHeight: 1.4,
                textAlign: "center",
                color: "var(--color-midnightblue-200)",
                textTransform: "none",
                maxWidth: "477px",
                whiteSpace: "pre-line",
              }}
            >
              {tc("scheduleCall")}
            </Button>
          </Box>
        </Box>

        <GroupComponent />
      </Box>
    </Box>
  );
};

export default Desktop1;
