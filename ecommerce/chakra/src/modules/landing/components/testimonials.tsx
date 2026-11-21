"use client";

import { Box, Carousel, Flex, HStack, Icon, IconButton, Stack, useBreakpointValue } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/data/landing";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials() {
  // Chakra's Carousel takes a plain number for slidesPerPage, so the
  // responsive value is resolved from the theme breakpoints here.
  const slidesPerPage = useBreakpointValue({ base: 1, md: 2, lg: 3 }) ?? 1;

  return (
    <Box as="section" py={{ base: "10", lg: "16" }}>
      <PageContainer>
        <Carousel.Root
          slideCount={testimonials.length}
          slidesPerPage={slidesPerPage}
          slidesPerMove={1}
          spacing="20px"
          loop
          gap="0"
        >
          <Stack gap={{ base: "6", lg: "10" }}>
            <Flex align="end" justify="space-between" gap="4">
              <SectionHeading align="start">Our happy customers</SectionHeading>
              <HStack gap="2">
                <Carousel.PrevTrigger asChild>
                  <IconButton variant="outline" size="sm" rounded="full" aria-label="Previous slide">
                    <Icon boxSize="5"><ArrowLeftIcon /></Icon>
                  </IconButton>
                </Carousel.PrevTrigger>
                <Carousel.NextTrigger asChild>
                  <IconButton variant="outline" size="sm" rounded="full" aria-label="Next slide">
                    <Icon boxSize="5"><ArrowRightIcon /></Icon>
                  </IconButton>
                </Carousel.NextTrigger>
              </HStack>
            </Flex>
            <Box animationStyle="reveal-slide-left">
              <Carousel.ItemGroup>
                {testimonials.map((testimonial, index) => (
                  <Carousel.Item key={testimonial.id} index={index}>
                    <TestimonialCard testimonial={testimonial} />
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>
            </Box>
          </Stack>
        </Carousel.Root>
      </PageContainer>
    </Box>
  );
}
