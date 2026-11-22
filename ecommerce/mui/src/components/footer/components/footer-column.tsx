import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FooterColumn as FooterColumnData } from "@/data/footer";

const linkSize = { xs: "0.875rem", lg: "1rem" } as const;

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return (
    <Stack component="nav" aria-label={column.title} spacing={{ xs: 2, lg: 3 }}>
      <Typography
        component="h3"
        sx={{ fontSize: linkSize, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {column.title}
      </Typography>
      <Stack component="ul" spacing={{ xs: 1.5, lg: 2 }} sx={{ listStyle: "none", m: 0, p: 0 }}>
        {column.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} color="textSecondary" sx={{ fontSize: linkSize }}>
              {link.label}
            </Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
