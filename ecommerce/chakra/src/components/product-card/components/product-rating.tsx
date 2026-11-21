import { HStack, RatingGroup, Text } from "@chakra-ui/react";

export function ProductRating({ rating }: { rating: number }) {
  return (
    <HStack gap="3">
      <RatingGroup.Root
        count={5}
        value={rating}
        allowHalf
        readOnly
        size="sm"
        colorPalette="yellow"
        aria-label={`Rated ${rating} out of 5`}
      >
        <RatingGroup.HiddenInput />
        <RatingGroup.Control gap="0.5" />
      </RatingGroup.Root>
      <Text as="span" textStyle={{ base: "xs", lg: "sm" }}>
        {rating.toFixed(1)}
        <Text as="span" color="fg.muted">
          /5
        </Text>
      </Text>
    </HStack>
  );
}
