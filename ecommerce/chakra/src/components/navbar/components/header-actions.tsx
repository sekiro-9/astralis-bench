import NextLink from "next/link";
import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { AccountIcon, CartIcon, SearchIcon } from "@/components/icons";

export function HeaderActions() {
  return (
    <HStack gap={{ base: "1", lg: "2" }}>
      <IconButton asChild variant="ghost" size="xs" aria-label="Search" hideFrom="lg">
        <NextLink href="/search">
          <Icon boxSize="6"><SearchIcon /></Icon>
        </NextLink>
      </IconButton>
      <IconButton asChild variant="ghost" size="xs" aria-label="Cart">
        <NextLink href="/cart">
          <Icon boxSize="6"><CartIcon /></Icon>
        </NextLink>
      </IconButton>
      <IconButton asChild variant="ghost" size="xs" aria-label="Account">
        <NextLink href="/account">
          <Icon boxSize="6"><AccountIcon /></Icon>
        </NextLink>
      </IconButton>
    </HStack>
  );
}
