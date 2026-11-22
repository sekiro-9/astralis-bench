import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import { SearchIcon } from "@/components/icons";

export function SearchField() {
  return (
    <InputBase
      type="search"
      fullWidth
      placeholder="Search for products..."
      inputProps={{ "aria-label": "Search for products" }}
      startAdornment={
        <InputAdornment position="start" sx={{ color: "text.subtle", mr: 1 }}>
          <SearchIcon width={16} height={16} />
        </InputAdornment>
      }
      sx={{ bgcolor: "grey.100", borderRadius: 9999, height: 40, px: 1.5, fontSize: "0.875rem" }}
    />
  );
}
