import NextLink from "next/link";
import { Link, List, Stack, Text } from "@chakra-ui/react";
import type { FooterColumn as FooterColumnData } from "@/data/footer";

export function FooterColumn({ column }: { column: FooterColumnData }) {
  return (
    <Stack as="nav" aria-label={column.title} gap={{ base: "4", lg: "6" }}>
      <Text as="h3" textStyle={{ base: "sm", lg: "md" }} fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
        {column.title}
      </Text>
      <List.Root listStyle="none" gap={{ base: "3", lg: "4" }}>
        {column.links.map((link) => (
          <List.Item key={link.href}>
            <Link asChild color="fg.muted" textStyle={{ base: "sm", lg: "md" }}>
              <NextLink href={link.href}>{link.label}</NextLink>
            </Link>
          </List.Item>
        ))}
      </List.Root>
    </Stack>
  );
}
