import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { copyright, footerColumns, footerIntro } from "@/data/footer";
import { FooterColumn } from "./components/footer-column";
import { Newsletter } from "./components/newsletter";
import { PaymentMethods } from "./components/payment-methods";
import { SocialLinks } from "./components/social-links";

// The grey footer starts behind the newsletter band: it is pulled up by the
// same amount it is padded, so the band sits half over the page and half over
// the footer without either knowing the band's height.
const NEWSLETTER_OVERLAP = { xs: "9rem", lg: "5.5rem" } as const;
const NEWSLETTER_PULL = { xs: "-9rem", lg: "-5.5rem" } as const;

export function Footer() {
  return (
    <Box component="footer">
      <PageContainer sx={{ position: "relative" }}>
        <Newsletter />
      </PageContainer>
      <Box sx={{ bgcolor: "surface.panel", mt: NEWSLETTER_PULL, pt: NEWSLETTER_OVERLAP }}>
        <PageContainer sx={{ pt: 6, pb: 10 }}>
          <Grid container columns={{ xs: 2, lg: 5 }} columnSpacing={{ xs: 2, lg: 5 }} rowSpacing={3}>
            <Grid size={{ xs: 2, lg: 1 }}>
              <Stack spacing={{ xs: 2.5, lg: 3 }} sx={{ maxWidth: "16rem" }}>
                <Logo />
                <Typography variant="body2" color="textSecondary">
                  {footerIntro}
                </Typography>
                <SocialLinks />
              </Stack>
            </Grid>
            {footerColumns.map((column) => (
              <Grid key={column.title} size={1}>
                <FooterColumn column={column} />
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: { xs: 5, lg: 6 } }} />
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography variant="body2" color="textSecondary">
              {copyright}
            </Typography>
            <PaymentMethods />
          </Stack>
        </PageContainer>
      </Box>
    </Box>
  );
}
