import { Box, Flex, Image } from "astralis-ui";
import { PageContainer } from "@/components/page-container";
import { brands } from "@/data/landing";

export function BrandStrip() {
  return (
    <Box as="section" aria-label="Featured brands" bg="inverted">
      <PageContainer py={{ base: "10", lg: "11" }}>
        <Flex
          wrap="wrap"
          alignItems="center"
          justifyContent={{ base: "center", lg: "between" }}
          columnGap={{ base: "8", lg: "6" }}
          rowGap="6"
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
