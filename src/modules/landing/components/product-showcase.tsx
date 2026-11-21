import NextLink from "next/link";
import { Box, Button, Flex, ScrollArea, Stack } from "astralis-ui";
import { PageContainer } from "@/components/page-container";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import type { Product } from "@/data/products";

type ProductShowcaseProps = {
  title: string;
  products: Product[];
  viewAllHref: string;
};

export function ProductShowcase({ title, products, viewAllHref }: ProductShowcaseProps) {
  return (
    <Box as="section" py={{ base: "10", lg: "16" }}>
      <PageContainer>
        <Stack gap={{ base: "8", lg: "14" }} alignItems="center">
          <SectionHeading>{title}</SectionHeading>
          <Box w="full" reveal="fade-up">
            <ScrollArea direction="horizontal" hideScrollbar>
              <Flex as="ul" gap={{ base: "4", lg: "5" }}>
                {products.map((product) => (
                  <Box as="li" key={product.id} basis={{ base: "12.5rem", lg: "0" }} grow="1" shrink="0" minW="0">
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Flex>
            </ScrollArea>
          </Box>
        </Stack>
        <Flex justifyContent="center" mt={{ base: "6", lg: "9" }}>
          <Button
            as={NextLink}
            href={viewAllHref}
            variant="outline"
            colorScheme="gray"
            size="lg"
            rounded="full"
            w={{ base: "full", md: "13.5rem" }}
          >
            View All
          </Button>
        </Flex>
      </PageContainer>
    </Box>
  );
}
