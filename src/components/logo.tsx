import NextLink from "next/link";
import { Link } from "astralis-ui";

export function Logo() {
  return (
    <Link
      as={NextLink}
      href="/"
      variant="plain"
      color="base"
      fontFamily="heading"
      weight="extrabold"
      size={{ base: "2xl", lg: "3xl" }}
      lineHeight="none"
    >
      SHOP.CO
    </Link>
  );
}
