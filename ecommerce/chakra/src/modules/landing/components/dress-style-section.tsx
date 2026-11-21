import { Box, GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { dressStyles } from "@/data/landing";
import { DressStyleTile } from "./dress-style-tile";

export function DressStyleSection() {
  return (
    <Box as="section" py={{ base: "10", lg: "16" }}>
      <PageContainer>
        <Stack
          gap={{ base: "7", lg: "16" }}
          bg="surface.panel"
          rounded={{ base: "3xl", lg: "2.5rem" }}
          px={{ base: "6", lg: "16" }}
          py={{ base: "10", lg: "16" }}
        >
          <SectionHeading>Browse by dress style</SectionHeading>
          <SimpleGrid columns={{ base: 1, lg: 5 }} gap={{ base: "4", lg: "5" }}>
            {dressStyles.map((style) => (
              <GridItem key={style.name} colSpan={{ base: 1, lg: style.span === "wide" ? 3 : 2 }}>
                <DressStyleTile style={style} />
              </GridItem>
            ))}
          </SimpleGrid>
        </Stack>
      </PageContainer>
    </Box>
  );
}
