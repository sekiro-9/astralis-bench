import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Product } from "@/data/products";
import { lift } from "@/theme/motion";
import { ProductPrice } from "./components/product-price";
import { ProductRating } from "./components/product-rating";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} color="inherit" underline="none" sx={{ display: "block" }}>
      <Stack spacing={{ xs: 1, lg: 1.5 }}>
        <Card sx={[{ borderRadius: 3, bgcolor: "grey.200" }, lift]}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            loading="lazy"
            sx={{ aspectRatio: "1", objectFit: "cover" }}
          />
        </Card>
        <Typography variant="h3" noWrap>
          {product.name}
        </Typography>
        <ProductRating rating={product.rating} />
        <ProductPrice price={product.price} originalPrice={product.originalPrice} />
      </Stack>
    </Link>
  );
}
