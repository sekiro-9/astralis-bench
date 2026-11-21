"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Button, HStack, Icon, Link, Menu } from "astralis-ui";
import { ChevronDownIcon } from "@/components/icons";
import { primaryLinks, shopCategories } from "@/data/navigation";

export function MainNav() {
  const router = useRouter();

  return (
    <HStack as="nav" aria-label="Main" gap="6" display={{ base: "hidden", lg: "flex" }}>
      <Menu>
        <Menu.Trigger>
          <Button variant="text" colorScheme="gray" size="sm" rightIcon={<Icon as={ChevronDownIcon} size="xs" />}>
            Shop
          </Button>
        </Menu.Trigger>
        <Menu.Content>
          {shopCategories.map((category) => (
            <Menu.Item key={category.href} onSelect={() => router.push(category.href)}>
              {category.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu>
      {primaryLinks.map((link) => (
        <Link key={link.href} as={NextLink} href={link.href} color="base" shrink="0">
          {link.label}
        </Link>
      ))}
    </HStack>
  );
}
