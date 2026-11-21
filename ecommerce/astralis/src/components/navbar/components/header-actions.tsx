import NextLink from "next/link";
import { Box, Button, HStack, Icon } from "astralis-ui";
import { AccountIcon, CartIcon, SearchIcon } from "@/components/icons";

export function HeaderActions() {
  return (
    <HStack gap={{ base: "1", lg: "2" }}>
      <Box display={{ base: "block", lg: "hidden" }}>
        <Button
          as={NextLink}
          href="/search"
          variant="text"
          colorScheme="gray"
          size="sm"
          leftIcon={<Icon as={SearchIcon} size="md" />}
          aria-label="Search"
        />
      </Box>
      <Button
        as={NextLink}
        href="/cart"
        variant="text"
        colorScheme="gray"
        size="sm"
        leftIcon={<Icon as={CartIcon} size="md" />}
        aria-label="Cart"
      />
      <Button
        as={NextLink}
        href="/account"
        variant="text"
        colorScheme="gray"
        size="sm"
        leftIcon={<Icon as={AccountIcon} size="md" />}
        aria-label="Account"
      />
    </HStack>
  );
}
