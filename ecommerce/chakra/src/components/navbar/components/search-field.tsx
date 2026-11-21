"use client";

import { Icon, Input, InputGroup } from "@chakra-ui/react";
import { SearchIcon } from "@/components/icons";

// InputGroup clones its single Input child (React.Children.only), which fails
// on an element serialised from a Server Component, so this renders on the client.
export function SearchField() {
  return (
    <InputGroup startElement={<Icon boxSize="5" color="fg.subtle"><SearchIcon /></Icon>}>
      <Input
        type="search"
        variant="subtle"
        rounded="full"
        size="md"
        placeholder="Search for products..."
        aria-label="Search for products"
      />
    </InputGroup>
  );
}
