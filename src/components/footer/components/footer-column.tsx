import NextLink from "next/link";
import { Box, Link, Stack, Text } from "astralis-ui";
import type { FooterColumn as FooterColumnData } from "@/data/footer";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return (
    <Stack as="nav" aria-label={column.title} gap={{ base: "4", lg: "6" }}>
      <Text as="h3" size={{ base: "sm", lg: "md" }} weight="medium" casing="uppercase" letterSpacing="wider">
        {column.title}
      </Text>
      <Stack as="ul" gap={{ base: "3", lg: "4" }}>
        {column.links.map((link) => (
          <Box as="li" key={link.href}>
            <Link as={NextLink} href={link.href} color="muted" size={{ base: "sm", lg: "md" }}>
              {link.label}
            </Link>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
