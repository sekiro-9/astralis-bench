import NextLink from "next/link";
import { Box, Image, Link, Text } from "@chakra-ui/react";
import type { DressStyle } from "@/data/landing";

export function DressStyleTile({ style }: { style: DressStyle }) {
  return (
    <Box animationStyle="reveal-pop">
      <Link
        asChild
        display="block"
        position="relative"
        overflow="hidden"
        rounded="3xl"
        bg="bg"
        h={{ base: "12rem", lg: "18rem" }}
        color="fg"
        layerStyle="lift"
        _hover={{ textDecoration: "none" }}
      >
        <NextLink href={style.href}>
          <Image src={style.image} alt="" objectFit="cover" position="absolute" inset="0" h="full" w="full" />
          <Text
            as="span"
            position="absolute"
            top={{ base: "4", lg: "6" }}
            left={{ base: "6", lg: "8" }}
            textStyle={{ base: "2xl", lg: "4xl" }}
            fontWeight="bold"
          >
            {style.name}
          </Text>
        </NextLink>
      </Link>
    </Box>
  );
}
