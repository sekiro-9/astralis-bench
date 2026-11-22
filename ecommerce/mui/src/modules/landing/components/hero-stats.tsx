import { Fragment } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type HeroStat = {
  value: string;
  label: string;
};

export function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <Stack
      direction="row"
      useFlexGap
      sx={{
        flexWrap: "wrap",
        justifyContent: { xs: "center", md: "flex-start" },
        columnGap: { xs: 3.5, lg: 3 },
        rowGap: 1.5,
      }}
    >
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 && (
            <Divider
              orientation="vertical"
              flexItem
              sx={index === stats.length - 1 ? { display: { xs: "none", md: "block" } } : undefined}
            />
          )}
          {/* The label comes first in the DOM so the <dl> reads term-then-value;
              the column is reversed to show the figure on top, as designed. */}
          <Box component="dl" sx={{ m: 0, display: "flex", flexDirection: "column-reverse" }}>
            <Typography
              component="dt"
              color="textSecondary"
              sx={{ fontSize: { xs: "0.75rem", xl: "0.875rem" }, lineHeight: { xs: "1rem", xl: "1.25rem" }, fontWeight: 500 }}
            >
              {stat.label}
            </Typography>
            <Typography
              component="dd"
              sx={{ m: 0, fontSize: { xs: "1.25rem", xl: "2.25rem" }, lineHeight: { xs: "1.75rem", xl: "2.5rem" }, fontWeight: 700 }}
            >
              {stat.value}
            </Typography>
          </Box>
        </Fragment>
      ))}
    </Stack>
  );
}
