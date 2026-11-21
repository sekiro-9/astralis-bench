"use client";

import NextLink from "next/link";
import { Button, Drawer, Icon, Link, Text, VStack } from "astralis-ui";
import { MenuIcon } from "@/components/icons";
import { primaryLinks, shopCategories } from "@/data/navigation";

export function MobileNav() {
  return (
    <Drawer placement="left" size="sm">
      <Drawer.Trigger>
        <Button
          variant="text"
          colorScheme="gray"
          size="sm"
          leftIcon={<Icon as={MenuIcon} size="md" />}
          aria-label="Open menu"
        />
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Menu</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <VStack as="nav" aria-label="Mobile" gap="6" alignItems="stretch">
            <VStack gap="3" alignItems="start">
              <Text size="sm" weight="medium" color="muted">
                Shop
              </Text>
              {shopCategories.map((category) => (
                <Drawer.Close key={category.href}>
                  <Link as={NextLink} href={category.href} color="base" size="lg">
                    {category.label}
                  </Link>
                </Drawer.Close>
              ))}
            </VStack>
            <VStack gap="3" alignItems="start">
              {primaryLinks.map((link) => (
                <Drawer.Close key={link.href}>
                  <Link as={NextLink} href={link.href} color="base" size="lg">
                    {link.label}
                  </Link>
                </Drawer.Close>
              ))}
            </VStack>
          </VStack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}
