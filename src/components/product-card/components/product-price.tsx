import { Badge, HStack, Text } from "astralis-ui";
import { discountPercent, formatPrice } from "@/lib/format";

type ProductPriceProps = {
  price: number;
  originalPrice?: number;
};

export function ProductPrice({ price, originalPrice }: ProductPriceProps) {
  return (
    <HStack gap={{ base: "1.5", lg: "2.5" }}>
      <Text as="span" size={{ base: "xl", lg: "2xl" }} weight="bold">
        {formatPrice(price)}
      </Text>
      {originalPrice && (
        <>
          <Text as="span" size={{ base: "xl", lg: "2xl" }} weight="bold" color="subtle" textDecoration="line-through">
            {formatPrice(originalPrice)}
          </Text>
          <Badge colorScheme="red" variant="subtle" size="sm">
            -{discountPercent(price, originalPrice)}%
          </Badge>
        </>
      )}
    </HStack>
  );
}
