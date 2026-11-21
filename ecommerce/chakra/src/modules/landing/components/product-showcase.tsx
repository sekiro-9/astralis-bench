import NextLink from "next/link";
import { Box, Button, Flex, List, ScrollArea, Stack } from "@chakra-ui/react";
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
        <Stack gap={{ base: "8", lg: "14" }} align="center">
          <SectionHeading>{title}</SectionHeading>
          {/* The reveal sits outside the scroll area: a view timeline inside a
              scroll container tracks that container, not the page. */}
          <Box w="full" animationStyle="reveal-slide-left">
            <ScrollArea.Root size="xs">
              <ScrollArea.Viewport>
                <ScrollArea.Content>
                  <List.Root listStyle="none" flexDirection="row" gap={{ base: "4", lg: "5" }} py="3">
                    {products.map((product) => (
                      <List.Item
                        key={product.id}
                        flexBasis={{ base: "12.5rem", lg: "0" }}
                        flexGrow="1"
                        flexShrink="0"
                        minW="0"
                      >
                        <ProductCard product={product} />
                      </List.Item>
                    ))}
                  </List.Root>
                </ScrollArea.Content>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </Box>
        </Stack>
        <Flex justify="center" mt={{ base: "6", lg: "9" }}>
          <Button asChild variant="outline" size="xl" fontSize="md" rounded="full" w={{ base: "full", md: "13.5rem" }}>
            <NextLink href={viewAllHref}>View All</NextLink>
          </Button>
        </Flex>
      </PageContainer>
    </Box>
  );
}
