import { Icon, Input, InputGroup } from "astralis-ui";
import { SearchIcon } from "@/components/icons";

export function SearchField() {
  return (
    <InputGroup prefix={<Icon as={SearchIcon} size="sm" color="subtle" />}>
      <Input
        type="search"
        variant="filled"
        placeholder="Search for products..."
        aria-label="Search for products"
      />
    </InputGroup>
  );
}
