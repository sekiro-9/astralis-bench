import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkleIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { hero } from "@/data/landing";
import { entrance } from "@/theme/motion";
import { HeroStats } from "./hero-stats";

const HERO_GUTTER = { xs: 2, md: 4, lg: 8, xl: "7rem" } as const;

const sparkles = [
  {
    position: { top: { xs: "2.5rem", lg: "13%" }, right: { xs: "1.25rem", lg: "4%" } },
    size: { xs: "4.75rem", lg: "6.5rem" },
    delay: 700,
  },
  {
    position: { top: { xs: "8.5rem", lg: "45%" }, left: { xs: "1.75rem", lg: "5%" } },
    size: { xs: "2.75rem", lg: "3.5rem" },
    delay: 1000,
  },
];

export function Hero() {
  return (
    <Box component="section" sx={{ bgcolor: "surface.hero", overflow: "hidden" }}>
      <PageContainer sx={{ maxWidth: "80rem", px: HERO_GUTTER }}>
        <Grid container columns={12}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack
              spacing={{ xs: 2.5, lg: 3, xl: 4 }}
              sx={{ pt: { xs: 5, lg: 8, xl: 12 }, pb: { xs: 2.5, lg: 10, xl: 14 } }}
            >
              <Typography variant="h1" sx={[{ maxWidth: "11em" }, entrance("slide-right")]}>
                {hero.title}
              </Typography>
              <Typography
                color="textSecondary"
                sx={[{ fontSize: { xs: "0.875rem", lg: "1rem" }, maxWidth: "34rem" }, entrance("fade-up", 200)]}
              >
                {hero.description}
              </Typography>
              <Button
                href={hero.action.href}
                variant="contained"
                size="large"
                sx={[{ width: { xs: "100%", md: "13rem" } }, entrance("pop", 300)]}
              >
                {hero.action.label}
              </Button>
              <Box sx={[{ pt: { xs: 0, lg: 2 } }, entrance("fade-up", 500)]}>
                <HeroStats stats={hero.stats} />
              </Box>
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, lg: 5 }}
            sx={{ position: "relative", minHeight: "28rem", mx: { xs: -2, md: -4, lg: 0 } }}
          >
            <Box
              component="img"
              src={hero.image.src}
              alt={hero.image.alt}
              fetchPriority="high"
              sx={[{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }, entrance("scale-in")]}
            />
            {sparkles.map((sparkle) => (
              <Box
                key={sparkle.delay}
                sx={[
                  { position: "absolute", ...sparkle.position, width: sparkle.size, height: sparkle.size },
                  entrance("pop", sparkle.delay),
                ]}
              >
                <SparkleIcon aria-hidden width="100%" height="100%" />
              </Box>
            ))}
          </Grid>
        </Grid>
      </PageContainer>
    </Box>
  );
}
