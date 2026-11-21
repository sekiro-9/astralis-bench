import NextLink from "next/link";
import { Image, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import type { Product } from "@/data/products";
import { ProductPrice } from "./components/product-price";
import { ProductRating } from "./components/product-rating";

export function ProductCard({ product }: { product: Product }) {
  return (
    <LinkBox as="article">
      <Stack gap={{ base: "2", lg: "3" }}>
        <Image
          src={product.image}
          alt={product.name}
          aspectRatio="square"
          objectFit="cover"
          w="full"
          rounded="3xl"
          layerStyle="lift"
        />
        <Text as="h3" textStyle={{ base: "md", lg: "xl" }} lineHeight={{ lg: "1.75rem" }} fontWeight="bold" truncate>
          <LinkOverlay asChild>
            <NextLink href={`/products/${product.slug}`}>{product.name}</NextLink>
          </LinkOverlay>
        </Text>
        <ProductRating rating={product.rating} />
        <ProductPrice price={product.price} originalPrice={product.originalPrice} />
      </Stack>
    </LinkBox>
  );
}
