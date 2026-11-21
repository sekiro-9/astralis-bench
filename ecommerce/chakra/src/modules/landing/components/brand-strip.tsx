import { Box, Flex, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/page-container";
import { brands } from "@/data/landing";

export function BrandStrip() {
  return (
    <Box as="section" aria-label="Featured brands" bg="black">
      <PageContainer py={{ base: "10", lg: "11" }}>
        <Flex
          wrap="wrap"
          align="center"
          justify={{ base: "center", lg: "space-between" }}
          columnGap={{ base: "8", lg: "6" }}
          rowGap="6"
          animationStyle="reveal-blur-in"
        >
          {brands.map((brand) => (
            <Image
              key={brand.name}
              src={brand.logo}
              alt={brand.name}
              objectFit="contain"
              h={{ base: "1.5rem", lg: "1.75rem", xl: "2.25rem" }}
              w="auto"
            />
          ))}
        </Flex>
      </PageContainer>
    </Box>
  );
}
