import { Card, HStack, Icon, Rating, Stack, Text } from "astralis-ui";
import { VerifiedIcon } from "@/components/icons";
import type { Testimonial } from "@/data/landing";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card variant="outline" size="lg" hoverable>
      <Card.Body>
        <Stack gap={{ base: "3", lg: "4" }}>
          <Rating value={testimonial.rating} readOnly size="md" />
          <HStack gap="1">
            <Text as="span" size={{ base: "md", lg: "xl" }} weight="bold">
              {testimonial.name}
            </Text>
            {testimonial.verified && <Icon as={VerifiedIcon} size="md" color="success" aria-label="Verified buyer" />}
          </HStack>
          <Text color="muted" size={{ base: "sm", lg: "md" }}>
            &ldquo;{testimonial.quote}&rdquo;
          </Text>
        </Stack>
      </Card.Body>
    </Card>
  );
}
