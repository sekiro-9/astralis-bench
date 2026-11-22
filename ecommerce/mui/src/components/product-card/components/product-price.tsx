import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { discountPercent, formatPrice } from "@/lib/format";

type ProductPriceProps = {
  price: number;
  originalPrice?: number;
};

const priceStyle = { fontSize: { xs: "1.25rem", lg: "1.5rem" }, lineHeight: { xs: "1.75rem", lg: "2rem" }, fontWeight: 700 };

export function ProductPrice({ price, originalPrice }: ProductPriceProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0.75, lg: 1.25 }}>
      <Typography component="span" sx={priceStyle}>
        {formatPrice(price)}
      </Typography>
      {originalPrice && (
        <>
          <Typography component="span" sx={[priceStyle, { color: "text.subtle", textDecoration: "line-through" }]}>
            {formatPrice(originalPrice)}
          </Typography>
          <Chip
            variant="soft"
            color="error"
            size="small"
            label={`-${discountPercent(price, originalPrice)}%`}
          />
        </>
      )}
    </Stack>
  );
}
