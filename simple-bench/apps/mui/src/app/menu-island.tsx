"use client";

// MUI's Menu is imperative (anchorEl state lives in userland), so the island
// needs its own client component — there is no self-managing menu compound.
import { useState, type MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

export function MenuIsland() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="outlined" color="inherit" size="small" onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}>
        Actions
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Export CSV</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Refresh</MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)}>Reset filters</MenuItem>
      </Menu>
    </>
  );
}
