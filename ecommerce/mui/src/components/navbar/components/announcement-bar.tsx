"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { CloseIcon } from "@/components/icons";
import { PAGE_GUTTER, PageContainer } from "@/components/page-container";
import { announcement } from "@/data/navigation";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Box sx={{ bgcolor: "common.black", color: "common.white" }}>
      <PageContainer sx={{ position: "relative", py: 1 }}>
        <Typography align="center" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" }, lineHeight: { xs: "1rem", md: "1.25rem" } }}>
          {announcement.message}{" "}
          <Link href={announcement.action.href} color="inherit" underline="always" sx={{ fontWeight: 500 }}>
            {announcement.action.label}
          </Link>
        </Typography>
        <Box
          sx={{
            position: "absolute",
            right: PAGE_GUTTER,
            top: 0,
            bottom: 0,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          <IconButton size="small" color="inherit" aria-label="Dismiss announcement" onClick={() => setDismissed(true)}>
            <CloseIcon width={20} height={20} />
          </IconButton>
        </Box>
      </PageContainer>
    </Box>
  );
}
