import NextLink from "next/link";
import { Box, Button, Grid, GridItem, Heading, Image, Stack, Text } from "astralis-ui";
import { SparkleIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { hero } from "@/data/landing";
import { surfaces } from "@/theme";
import { HeroStats } from "./hero-stats";

const HERO_GUTTER = { base: "4", md: "8", lg: "16", xl: "7rem" } as const;

export function Hero() {
  return (
    <Box as="section" bg={surfaces.hero} overflow="hidden">
      <PageContainer maxW="80rem" px={HERO_GUTTER}>
        <Grid columns={{ base: "1", lg: "12" }} gap="0">
          <GridItem colSpan={{ base: "1", lg: "7" }}>
            <Stack
              gap={{ base: "5", lg: "6", xl: "8" }}
              pt={{ base: "10", lg: "16", xl: "24" }}
              pb={{ base: "5", lg: "20", xl: "28" }}
            >
              <Heading
                as="h1"
                size={{ base: "4xl", lg: "5xl", xl: "6xl" }}
                weight="extrabold"
                lineHeight="tight"
                casing="uppercase"
                maxW="11em"
                animation="slide-right"
                animationDuration="slow"
              >
                {hero.title}
              </Heading>
              <Text color="muted" size={{ base: "sm", lg: "md" }} maxW="34rem" animation="fade-up" animationDuration="slow" animationDelay="200">
                {hero.description}
              </Text>
              <Button
                as={NextLink}
                href={hero.action.href}
                colorScheme="gray"
                size="lg"
                rounded="full"
                w={{ base: "full", md: "13rem" }}
                animation="pop"
                animationDuration="slow"
                animationDelay="300"
              >
                {hero.action.label}
              </Button>
              <Box pt={{ base: "0", lg: "4" }} animation="fade-up" animationDuration="slow" animationDelay="500">
                <HeroStats stats={hero.stats} />
              </Box>
            </Stack>
          </GridItem>

          <GridItem
            colSpan={{ base: "1", lg: "5" }}
            position="relative"
            minH="28rem"
            mx={{ base: "-1rem", md: "-2rem", lg: "0" }}
          >
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              loading="eager"
              animation="scale-in"
              animationDuration="slow"
              objectFit="cover"
              position="absolute"
              inset="0"
              h="full"
              w="full"
            />
            <Box
              position="absolute"
              top={{ base: "2.5rem", lg: "13%" }}
              right={{ base: "1.25rem", lg: "4%" }}
              size={{ base: "4.75rem", lg: "6.5rem" }}
              color="base"
              animation="pop"
              animationDuration="slow"
              animationDelay="700"
            >
              <SparkleIcon aria-hidden width="100%" height="100%" />
            </Box>
            <Box
              position="absolute"
              top={{ base: "8.5rem", lg: "45%" }}
              left={{ base: "1.75rem", lg: "5%" }}
              size={{ base: "11", lg: "14" }}
              color="base"
              animation="pop"
              animationDuration="slow"
              animationDelay="1000"
            >
              <SparkleIcon aria-hidden width="100%" height="100%" />
            </Box>
          </GridItem>
        </Grid>
      </PageContainer>
    </Box>
  );
}
