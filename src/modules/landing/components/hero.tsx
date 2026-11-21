import NextLink from "next/link";
import { Box, Button, Grid, Heading, Image, Stack, Text } from "astralis-ui";
import { SparkleIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { hero } from "@/data/landing";
import { HeroStats } from "./hero-stats";

const HERO_BACKGROUND = "#f2f0f1";

export function Hero() {
  return (
    <Box as="section" bg={HERO_BACKGROUND} overflow="hidden">
      <PageContainer>
        <Grid columns={{ base: "1", lg: "2" }} gap="0">
          <Stack
            gap={{ base: "5", lg: "6", xl: "8" }}
            pt={{ base: "10", lg: "16", xl: "24" }}
            pb={{ base: "5", lg: "20", xl: "28" }}
          >
            <Heading
              as="h1"
              size={{ base: "4xl", xl: "5xl" }}
              weight="extrabold"
              lineHeight="none"
              casing="uppercase"
              maxW="11em"
            >
              {hero.title}
            </Heading>
            <Text color="muted" size={{ base: "sm", lg: "md" }} maxW="34rem">
              {hero.description}
            </Text>
            <Button
              as={NextLink}
              href={hero.action.href}
              colorScheme="gray"
              size="lg"
              rounded="full"
              w={{ base: "full", md: "13rem" }}
            >
              {hero.action.label}
            </Button>
            <Box pt={{ base: "0", lg: "4" }}>
              <HeroStats stats={hero.stats} />
            </Box>
          </Stack>

          <Box position="relative" minH="28rem" mx={{ base: "-1rem", md: "-2rem", lg: "0" }}>
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              loading="eager"
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
            >
              <SparkleIcon aria-hidden width="100%" height="100%" />
            </Box>
            <Box
              position="absolute"
              top={{ base: "8.5rem", lg: "45%" }}
              left={{ base: "1.75rem", lg: "5%" }}
              size={{ base: "11", lg: "14" }}
              color="base"
            >
              <SparkleIcon aria-hidden width="100%" height="100%" />
            </Box>
          </Box>
        </Grid>
      </PageContainer>
    </Box>
  );
}
