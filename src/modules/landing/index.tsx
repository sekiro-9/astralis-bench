import { Box, Separator } from "astralis-ui";
import { PageContainer } from "@/components/page-container";
import { newArrivals, topSelling } from "@/data/products";
import { BrandStrip } from "./components/brand-strip";
import { DressStyleSection } from "./components/dress-style-section";
import { Hero } from "./components/hero";
import { ProductShowcase } from "./components/product-showcase";
import { Testimonials } from "./components/testimonials";

export function LandingPage() {
  return (
    <Box as="main">
      <Hero />
      <BrandStrip />
      <ProductShowcase title="New arrivals" products={newArrivals} viewAllHref="/new-arrivals" />
      <PageContainer>
        <Separator />
      </PageContainer>
      <ProductShowcase title="Top selling" products={topSelling} viewAllHref="/top-selling" />
      <DressStyleSection />
      <Testimonials />
    </Box>
  );
}
