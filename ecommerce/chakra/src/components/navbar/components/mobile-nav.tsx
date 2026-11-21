"use client";

import NextLink from "next/link";
import { CloseButton, Drawer, Icon, IconButton, Link, Portal, Text, VStack } from "@chakra-ui/react";
import { MenuIcon } from "@/components/icons";
import { primaryLinks, shopCategories, type NavLink } from "@/data/navigation";

function DrawerLink({ link }: { link: NavLink }) {
  return (
    <Drawer.ActionTrigger asChild>
      <Link asChild color="fg" textStyle="lg">
        <NextLink href={link.href}>{link.label}</NextLink>
      </Link>
    </Drawer.ActionTrigger>
  );
}

export function MobileNav() {
  return (
    <Drawer.Root placement="start" size="xs">
      <Drawer.Trigger asChild>
        <IconButton variant="ghost" size="xs" aria-label="Open menu">
          <Icon boxSize="6"><MenuIcon /></Icon>
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack as="nav" aria-label="Mobile" gap="6" align="stretch">
                <VStack gap="3" align="start">
                  <Text textStyle="sm" fontWeight="medium" color="fg.muted">
                    Shop
                  </Text>
                  {shopCategories.map((category) => (
                    <DrawerLink key={category.href} link={category} />
                  ))}
                </VStack>
                <VStack gap="3" align="start">
                  {primaryLinks.map((link) => (
                    <DrawerLink key={link.href} link={link} />
                  ))}
                </VStack>
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
