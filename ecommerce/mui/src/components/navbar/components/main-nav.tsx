"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { ChevronDownIcon } from "@/components/icons";
import { primaryLinks, shopCategories } from "@/data/navigation";

export function MainNav() {
  const router = useRouter();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);

  const go = (href: string) => {
    setAnchor(null);
    router.push(href);
  };

  return (
    <Stack
      component="nav"
      aria-label="Main"
      direction="row"
      alignItems="center"
      spacing={3}
      sx={{ display: { xs: "none", lg: "flex" } }}
    >
      <Button
        id="shop-menu-button"
        color="inherit"
        size="small"
        endIcon={<ChevronDownIcon width={16} height={16} />}
        aria-controls={open ? "shop-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchor(event.currentTarget)}
        sx={{ fontSize: "0.875rem", px: 1.5, minWidth: 0 }}
      >
        Shop
      </Button>
      <Menu
        id="shop-menu"
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        slotProps={{ list: { "aria-labelledby": "shop-menu-button" } }}
      >
        {shopCategories.map((category) => (
          <MenuItem key={category.href} onClick={() => go(category.href)} sx={{ minWidth: 160 }}>
            {category.label}
          </MenuItem>
        ))}
      </Menu>
      {primaryLinks.map((link) => (
        <Link key={link.href} href={link.href} color="textPrimary" sx={{ flexShrink: 0 }}>
          {link.label}
        </Link>
      ))}
    </Stack>
  );
}
