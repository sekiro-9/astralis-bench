import { Box, Carousel, Flex, HStack, Icon, Stack } from "astralis-ui";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { PageContainer } from "@/components/page-container";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/data/landing";
import { TestimonialCard } from "./testimonial-card";

export function Testimonials() {
  return (
    <Box as="section" py={{ base: "10", lg: "16" }}>
      <PageContainer>
        <Carousel slidesPerView={{ base: 1, md: 2, lg: 3 }} slideGap={20} loop colorScheme="gray">
          <Stack gap={{ base: "6", lg: "10" }}>
            <Flex alignItems="end" justifyContent="between" gap="4">
              <SectionHeading align="start">Our happy customers</SectionHeading>
              <HStack gap="2">
                <Carousel.Prev icon={<Icon as={ArrowLeftIcon} size="md" />} />
                <Carousel.Next icon={<Icon as={ArrowRightIcon} size="md" />} />
              </HStack>
            </Flex>
            <Box reveal="slide-left">
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
