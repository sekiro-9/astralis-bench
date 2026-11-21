import { Card, HStack, Icon, RatingGroup, Stack, Text } from "@chakra-ui/react";
import { VerifiedIcon } from "@/components/icons";
import type { Testimonial } from "@/data/landing";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card.Root variant="outline" rounded="2xl" h="full" layerStyle="lift">
      <Card.Body px="7" py="5">
        <Stack gap={{ base: "3", lg: "4" }}>
          <RatingGroup.Root
            count={5}
            value={testimonial.rating}
            allowHalf
            readOnly
            size="md"
            colorPalette="yellow"
            aria-label={`Rated ${testimonial.rating} out of 5`}
          >
            <RatingGroup.HiddenInput />
            <RatingGroup.Control gap="0.5" />
          </RatingGroup.Root>
          <HStack gap="1">
            <Text as="span" textStyle={{ base: "md", lg: "xl" }} fontWeight="bold">
              {testimonial.name}
            </Text>
            {testimonial.verified && (
              <Icon boxSize="5" color="green.600" aria-label="Verified buyer"><VerifiedIcon /></Icon>
            )}
          </HStack>
          <Text color="fg.muted" textStyle={{ base: "sm", lg: "md" }}>
            &ldquo;{testimonial.quote}&rdquo;
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
