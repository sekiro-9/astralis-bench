import { HStack, Rating, Text } from "astralis-ui";

export function ProductRating({ rating }: { rating: number }) {
  return (
    <HStack gap="3">
      <Rating value={rating} readOnly size="sm" />
      <Text as="span" size={{ base: "xs", lg: "sm" }}>
        {rating.toFixed(1)}
        <Text as="span" size={{ base: "xs", lg: "sm" }} color="muted">
          /5
        </Text>
      </Text>
    </HStack>
  );
}
