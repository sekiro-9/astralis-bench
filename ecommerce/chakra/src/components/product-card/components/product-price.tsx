import { Badge, HStack, Text } from "@chakra-ui/react";
import { discountPercent, formatPrice } from "@/lib/format";

type ProductPriceProps = {
  price: number;
  originalPrice?: number;
};

export function ProductPrice({ price, originalPrice }: ProductPriceProps) {
  return (
    <HStack gap={{ base: "1.5", lg: "2.5" }}>
      <Text as="span" textStyle={{ base: "xl", lg: "2xl" }} fontWeight="bold">
        {formatPrice(price)}
      </Text>
      {originalPrice && (
        <>
          <Text
            as="span"
            textStyle={{ base: "xl", lg: "2xl" }}
            fontWeight="bold"
            color="fg.subtle"
            textDecoration="line-through"
          >
            {formatPrice(originalPrice)}
          </Text>
          <Badge colorPalette="red" variant="subtle" size="sm" rounded="full">
            -{discountPercent(price, originalPrice)}%
          </Badge>
        </>
      )}
    </HStack>
  );
}
