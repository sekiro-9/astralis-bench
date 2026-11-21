import NextLink from "next/link";
import { Box, Button, Container, GridItem, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { SparkleIcon } from "@/components/icons";
import { hero } from "@/data/landing";
import { HeroStats } from "./hero-stats";

const HERO_GUTTER = { base: "4", md: "8", lg: "16", xl: "7rem" } as const;

export function Hero() {
  return (
    <Box as="section" bg="surface.hero" overflow="hidden">
      <Container maxW="80rem" px={HERO_GUTTER}>
        <SimpleGrid columns={{ base: 1, lg: 12 }}>
          <GridItem colSpan={{ base: 1, lg: 7 }}>
            <Stack
              gap={{ base: "5", lg: "6", xl: "8" }}
              pt={{ base: "10", lg: "16", xl: "24" }}
              pb={{ base: "5", lg: "20", xl: "28" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "4xl", lg: "5xl", xl: "6xl" }}
                fontWeight="extrabold"
                lineHeight="1.25"
                letterSpacing="tight"
                textTransform="uppercase"
                maxW="11em"
                animationStyle="slide-right-in"
                animationDuration="entrance"
              >
                {hero.title}
              </Heading>
              <Text
                color="fg.muted"
                textStyle={{ base: "sm", lg: "md" }}
                maxW="34rem"
                animationStyle="fade-up-in"
                animationDuration="entrance"
                animationDelay="200ms"
              >
                {hero.description}
              </Text>
              <Button
                asChild
                size="xl"
                textStyle="lg"
                rounded="full"
                w={{ base: "full", md: "13rem" }}
                animationStyle="pop-in"
                animationDuration="entrance"
                animationDelay="300ms"
              >
                <NextLink href={hero.action.href}>{hero.action.label}</NextLink>
              </Button>
              <Box pt={{ base: "0", lg: "4" }} animationStyle="fade-up-in" animationDuration="entrance" animationDelay="500ms">
                <HeroStats stats={hero.stats} />
              </Box>
            </Stack>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            position="relative"
            minH="28rem"
            mx={{ base: "-4", md: "-8", lg: "0" }}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              loading="eager"
              objectFit="cover"
              position="absolute"
              inset="0"
              h="full"
              w="full"
              animationStyle="zoom-in"
              animationDuration="entrance"
            />
            <Box
              position="absolute"
              top={{ base: "2.5rem", lg: "13%" }}
              right={{ base: "1.25rem", lg: "4%" }}
              boxSize={{ base: "4.75rem", lg: "6.5rem" }}
              color="fg"
              animationStyle="pop-in"
              animationDuration="entrance"
              animationDelay="700ms"
            >
              <SparkleIcon aria-hidden width="100%" height="100%" />
            </Box>
            <Box
              position="absolute"
              top={{ base: "8.5rem", lg: "45%" }}
              left={{ base: "1.75rem", lg: "5%" }}
              boxSize={{ base: "11", lg: "14" }}
              color="fg"
              animationStyle="pop-in"
              animationDuration="entrance"
              animationDelay="1000ms"
            >
              <SparkleIcon aria-hidden width="100%" height="100%" />
            </Box>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
