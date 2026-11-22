import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/page-container";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import type { Product } from "@/data/products";
import { reveal } from "@/theme/motion";

type ProductShowcaseProps = {
  title: string;
  products: Product[];
  viewAllHref: string;
};

export function ProductShowcase({ title, products, viewAllHref }: ProductShowcaseProps) {
  return (
    <Box component="section" sx={{ py: { xs: 5, lg: 8 } }}>
      <PageContainer>
        <Stack spacing={{ xs: 4, lg: 7 }} alignItems="center">
          <SectionHeading>{title}</SectionHeading>
          {/* The reveal sits outside the scroller: a view timeline inside a
              scroll container tracks that container, not the page. */}
          <Box sx={[{ width: "100%" }, reveal("slide-left")]}>
            <Stack
              component="ul"
              direction="row"
              spacing={{ xs: 2, lg: 2.5 }}
              sx={{
                listStyle: "none",
                m: 0,
                px: 0,
                py: 1.5,
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {products.map((product) => (
                <Box component="li" key={product.id} sx={{ flex: { xs: "0 0 12.5rem", lg: "1 1 0" }, minWidth: 0 }}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
        <Stack alignItems="center" sx={{ mt: { xs: 3, lg: 4.5 } }}>
          <Button href={viewAllHref} variant="outlined" size="large" sx={{ width: { xs: "100%", md: "13.5rem" } }}>
            View All
          </Button>
        </Stack>
      </PageContainer>
    </Box>
  );
}
