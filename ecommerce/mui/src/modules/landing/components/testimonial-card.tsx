import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { VerifiedIcon } from "@/components/icons";
import type { Testimonial } from "@/data/landing";
import { lift } from "@/theme/motion";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card variant="outlined" sx={[{ borderRadius: 2, height: "100%" }, lift]}>
      <CardContent sx={{ px: 3.5, py: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Stack spacing={{ xs: 1.5, lg: 2 }}>
          <Rating value={testimonial.rating} precision={0.5} readOnly sx={{ fontSize: "1.25rem" }} />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography
              component="span"
              sx={{ fontSize: { xs: "1rem", lg: "1.25rem" }, lineHeight: { xs: 1.5, lg: 1.4 }, fontWeight: 700 }}
            >
              {testimonial.name}
            </Typography>
            {testimonial.verified && (
              <Typography component="span" color="success" sx={{ display: "inline-flex" }}>
                <VerifiedIcon width={20} height={20} role="img" aria-label="Verified buyer" />
              </Typography>
            )}
          </Stack>
          <Typography color="textSecondary" sx={{ fontSize: { xs: "0.875rem", lg: "1rem" } }}>
            &ldquo;{testimonial.quote}&rdquo;
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
