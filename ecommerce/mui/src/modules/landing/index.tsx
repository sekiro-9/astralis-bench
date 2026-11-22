import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { PageContainer } from "@/components/page-container";
import { newArrivals, topSelling } from "@/data/products";
import { BrandStrip } from "./components/brand-strip";
import { DressStyleSection } from "./components/dress-style-section";
import { Hero } from "./components/hero";
import { ProductShowcase } from "./components/product-showcase";
import { Testimonials } from "./components/testimonials";

export function LandingPage() {
  return (
    <Box component="main">
      <Hero />
      <BrandStrip />
      <ProductShowcase title="New arrivals" products={newArrivals} viewAllHref="/new-arrivals" />
      <PageContainer>
        <Divider />
      </PageContainer>
      <ProductShowcase title="Top selling" products={topSelling} viewAllHref="/top-selling" />
      <DressStyleSection />
      <Testimonials />
    </Box>
  );
}
