"use client";

import { Box, Carousel, Flex, HStack, Icon, Stack } from "astralis-ui";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/data/landing";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials() {
  const isTablet = useMediaQuery("(min-width: 48rem)");
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const slidesPerView = isDesktop ? 3 : isTablet ? 2 : 1;

  return (
    <Box as="section" py={{ base: "10", lg: "16" }}>
      <PageContainer>
        <Carousel slidesPerView={slidesPerView} slideGap={20} loop colorScheme="gray">
          <Stack gap={{ base: "6", lg: "10" }}>
            <Flex alignItems="end" justifyContent="between" gap="4">
              <SectionHeading align="start">Our happy customers</SectionHeading>
              <HStack gap="2">
                <Carousel.Prev icon={<Icon as={ArrowLeftIcon} size="md" />} />
                <Carousel.Next icon={<Icon as={ArrowRightIcon} size="md" />} />
              </HStack>
            </Flex>
            <Box reveal="fade-up">
              <Carousel.Track>
                {testimonials.map((testimonial) => (
                  <Carousel.Slide key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </Carousel.Slide>
                ))}
              </Carousel.Track>
            </Box>
          </Stack>
        </Carousel>
      </PageContainer>
    </Box>
  );
}
