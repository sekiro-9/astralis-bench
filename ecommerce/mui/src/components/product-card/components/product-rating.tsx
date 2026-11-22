import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const labelSize = { xs: "0.75rem", lg: "0.875rem" } as const;

export function ProductRating({ rating }: { rating: number }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Rating value={rating} precision={0.5} readOnly sx={{ fontSize: "1rem" }} />
      <Typography component="span" sx={{ fontSize: labelSize }}>
        {rating.toFixed(1)}
        <Typography component="span" color="textSecondary" sx={{ fontSize: "inherit" }}>
          /5
        </Typography>
      </Typography>
    </Stack>
  );
}
