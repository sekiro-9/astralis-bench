"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { primaryLinks, shopCategories, type NavLink } from "@/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const drawerLink = (link: NavLink) => (
    <Link key={link.href} href={link.href} color="textPrimary" onClick={close} sx={{ fontSize: "1.125rem" }}>
      {link.label}
    </Link>
  );

  return (
    <>
      <IconButton color="inherit" size="small" aria-label="Open menu" onClick={() => setOpen(true)}>
        <MenuIcon width={24} height={24} />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={close} slotProps={{ paper: { sx: { width: 320, maxWidth: "85vw" } } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 2 }}>
          <Typography component="h2" sx={{ fontSize: "1.125rem", fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton size="small" aria-label="Close menu" onClick={close}>
            <CloseIcon width={20} height={20} />
          </IconButton>
        </Stack>
        <Box component="nav" aria-label="Mobile" sx={{ px: 3, pb: 3 }}>
          <Stack spacing={3}>
            <Stack spacing={1.5} alignItems="flex-start">
              <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500 }}>
                Shop
              </Typography>
              {shopCategories.map(drawerLink)}
            </Stack>
            <Stack spacing={1.5} alignItems="flex-start">
              {primaryLinks.map(drawerLink)}
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
