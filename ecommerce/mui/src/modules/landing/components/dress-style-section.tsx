import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { dressStyles } from "@/data/landing";
import { DressStyleTile } from "./dress-style-tile";

export function DressStyleSection() {
  return (
    <Box component="section" sx={{ py: { xs: 5, lg: 8 } }}>
      <PageContainer>
        <Stack
          spacing={{ xs: 3.5, lg: 8 }}
          sx={{
            bgcolor: "surface.panel",
            borderRadius: { xs: 3, lg: 5 },
            px: { xs: 3, lg: 8 },
            py: { xs: 5, lg: 8 },
          }}
        >
          <SectionHeading>Browse by dress style</SectionHeading>
          <Grid container columns={{ xs: 1, lg: 5 }} spacing={{ xs: 2, lg: 2.5 }}>
            {dressStyles.map((style) => (
              <Grid key={style.name} size={{ xs: 1, lg: style.span === "wide" ? 3 : 2 }}>
                <DressStyleTile style={style} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </PageContainer>
    </Box>
  );
}
