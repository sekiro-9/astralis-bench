"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Button, HStack, Icon, Link, Menu, Portal } from "@chakra-ui/react";
import { ChevronDownIcon } from "@/components/icons";
import { primaryLinks, shopCategories } from "@/data/navigation";

export function MainNav() {
  const router = useRouter();

  return (
    <HStack as="nav" aria-label="Main" gap="6" hideBelow="lg">
      <Menu.Root onSelect={({ value }) => router.push(value)}>
        <Menu.Trigger asChild>
          <Button variant="ghost" size="xs" px="3" fontSize="sm" fontWeight="medium">
            Shop
            <Icon boxSize="4"><ChevronDownIcon /></Icon>
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content minW="10rem">
              {shopCategories.map((category) => (
                <Menu.Item key={category.href} value={category.href}>
                  {category.label}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      {primaryLinks.map((link) => (
        <Link key={link.href} asChild color="fg" flexShrink="0">
          <NextLink href={link.href}>{link.label}</NextLink>
        </Link>
      ))}
    </HStack>
  );
}
