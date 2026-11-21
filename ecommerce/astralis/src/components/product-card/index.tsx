import NextLink from "next/link";
import { Box, Card, Image, Stack, Text } from "astralis-ui";
import type { Product } from "@/data/products";
import { ProductPrice } from "./components/product-price";
import { ProductRating } from "./components/product-rating";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Box as={NextLink} href={`/products/${product.slug}`} display="block">
      <Stack gap={{ base: "2", lg: "3" }}>
        <Card variant="unstyled" size="lg" hoverable>
          <Image src={product.image} alt={product.name} aspectRatio="square" objectFit="cover" rounded="3xl" />
        </Card>
        <Text as="h3" size={{ base: "md", lg: "xl" }} weight="bold" truncate>
          {product.name}
        </Text>
        <ProductRating rating={product.rating} />
        <ProductPrice price={product.price} originalPrice={product.originalPrice} />
      </Stack>
    </Box>
  );
}
