import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export function Logo() {
  return (
    <Link
      asChild
      color="fg"
      fontFamily="heading"
      fontWeight="extrabold"
      fontSize={{ base: "2xl", lg: "3xl" }}
      lineHeight="1"
      _hover={{ textDecoration: "none" }}
    >
      <NextLink href="/">SHOP.CO</NextLink>
    </Link>
  );
}
