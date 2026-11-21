import NextLink from "next/link";
import { Box, Image, Text } from "astralis-ui";
import type { DressStyle } from "@/data/landing";

export function DressStyleTile({ style }: { style: DressStyle }) {
  return (
    <Box
      as={NextLink}
      href={style.href}
      display="block"
      position="relative"
      overflow="hidden"
      rounded="3xl"
      bg="base"
      h={{ base: "12rem", lg: "18rem" }}
    >
      <Image src={style.image} alt="" objectFit="cover" position="absolute" inset="0" h="full" w="full" />
      <Text
        as="span"
        position="absolute"
        top={{ base: "4", lg: "6" }}
        left={{ base: "6", lg: "8" }}
        size={{ base: "2xl", lg: "4xl" }}
        weight="bold"
      >
        {style.name}
      </Text>
    </Box>
  );
}
