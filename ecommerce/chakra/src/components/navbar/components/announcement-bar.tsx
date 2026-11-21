"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Box, Flex, Icon, IconButton, Link, Text } from "@chakra-ui/react";
import { CloseIcon } from "@/components/icons";
import { PAGE_GUTTER, PageContainer } from "@/components/page-container";
import { announcement } from "@/data/navigation";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Box bg="black" color="white">
      <PageContainer position="relative" py="2">
        <Text textStyle={{ base: "xs", md: "sm" }} textAlign="center">
          {announcement.message}{" "}
          <Link asChild color="white" fontWeight="medium" textDecoration="underline">
            <NextLink href={announcement.action.href}>{announcement.action.label}</NextLink>
          </Link>
        </Text>
        <Flex position="absolute" right={PAGE_GUTTER} top="0" bottom="0" hideBelow="md" align="center">
          <IconButton
            variant="plain"
            size="xs"
            color="white"
            aria-label="Dismiss announcement"
            onClick={() => setDismissed(true)}
          >
            <Icon boxSize="5"><CloseIcon /></Icon>
          </IconButton>
        </Flex>
      </PageContainer>
    </Box>
  );
}
