import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { DressStyle } from "@/data/landing";
import { lift, reveal } from "@/theme/motion";

export function DressStyleTile({ style }: { style: DressStyle }) {
  return (
    <Box sx={reveal("pop")}>
      <Card sx={[{ borderRadius: 3 }, lift]}>
        <Link
          href={style.href}
          color="textPrimary"
          underline="none"
          sx={{ display: "block", position: "relative", height: { xs: "12rem", lg: "18rem" } }}
        >
          <CardMedia
            component="img"
            image={style.image}
            alt=""
            loading="lazy"
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Typography
            component="span"
            sx={{
              position: "absolute",
              top: { xs: 16, lg: 24 },
              left: { xs: 24, lg: 32 },
              fontSize: { xs: "1.5rem", lg: "2.25rem" },
              lineHeight: { xs: "2rem", lg: "2.5rem" },
              fontWeight: 700,
            }}
          >
            {style.name}
          </Typography>
        </Link>
      </Card>
    </Box>
  );
}
