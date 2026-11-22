import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/page-container";
import { brands } from "@/data/landing";
import { reveal } from "@/theme/motion";

export function BrandStrip() {
  return (
    <Box component="section" aria-label="Featured brands" sx={{ bgcolor: "common.black" }}>
      <PageContainer sx={{ py: { xs: 5, lg: 5.5 } }}>
        <Stack
          direction="row"
          useFlexGap
          sx={[
            {
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { xs: "center", lg: "space-between" },
              columnGap: { xs: 4, lg: 3 },
              rowGap: 3,
            },
            reveal("blur-in"),
          ]}
        >
          {brands.map((brand) => (
            <Box
              key={brand.name}
              component="img"
              src={brand.logo}
              alt={brand.name}
              sx={{ height: { xs: "1.5rem", lg: "1.75rem", xl: "2.25rem" }, width: "auto", objectFit: "contain" }}
            />
          ))}
        </Stack>
      </PageContainer>
    </Box>
  );
}
