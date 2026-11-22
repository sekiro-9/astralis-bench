import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { AccountIcon, CartIcon, SearchIcon } from "@/components/icons";

export function HeaderActions() {
  return (
    <Stack direction="row" spacing={{ xs: 0.5, lg: 1 }}>
      <IconButton href="/search" color="inherit" size="small" aria-label="Search" sx={{ display: { lg: "none" } }}>
        <SearchIcon width={24} height={24} />
      </IconButton>
      <IconButton href="/cart" color="inherit" size="small" aria-label="Cart">
        <CartIcon width={24} height={24} />
      </IconButton>
      <IconButton href="/account" color="inherit" size="small" aria-label="Account">
        <AccountIcon width={24} height={24} />
      </IconButton>
    </Stack>
  );
}
