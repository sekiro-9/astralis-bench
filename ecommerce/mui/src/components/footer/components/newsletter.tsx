"use client";

import { useState, type FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MailIcon } from "@/components/icons";
import { reveal } from "@/theme/motion";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      alignItems={{ xs: "stretch", lg: "center" }}
      justifyContent="space-between"
      spacing={{ xs: 4, lg: 5 }}
      sx={[
        { bgcolor: "common.black", borderRadius: 3, px: { xs: 3, lg: 8 }, py: { xs: 4, lg: 4.5 } },
        reveal("scale-in"),
      ]}
    >
      <Typography
        variant="h2"
        sx={{ color: "common.white", fontSize: { xs: "1.875rem", lg: "2.25rem" }, lineHeight: 1.25, maxWidth: "15em" }}
      >
        Stay up to date about our latest offers
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: { xs: "100%", lg: "22rem" }, flexShrink: 0 }}>
        {subscribed ? (
          <Typography role="status" align="center" sx={{ color: "common.white", fontWeight: 500 }}>
            Thanks for subscribing. Look out for our next offer in your inbox.
          </Typography>
        ) : (
          <Stack spacing={1.75}>
            <OutlinedInput
              type="email"
              required
              fullWidth
              size="small"
              placeholder="Enter your email address"
              inputProps={{ "aria-label": "Email address" }}
              startAdornment={
                <InputAdornment position="start" sx={{ color: "text.subtle" }}>
                  <MailIcon width={16} height={16} />
                </InputAdornment>
              }
              sx={{ bgcolor: "common.white", borderRadius: 9999, height: 40, fontSize: "0.875rem" }}
            />
            <Button
              type="submit"
              fullWidth
              sx={{ bgcolor: "grey.100", color: "grey.800", height: 40, "&:hover": { bgcolor: "grey.200" } }}
            >
              Subscribe to Newsletter
            </Button>
          </Stack>
        )}
      </Box>
    </Stack>
  );
}
