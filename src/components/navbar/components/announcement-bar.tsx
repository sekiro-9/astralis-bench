"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Icon, Link, Text } from "astralis-ui";
import { CloseIcon } from "@/components/icons";
import { PAGE_GUTTER, PageContainer } from "@/components/page-container";
import { announcement } from "@/data/navigation";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Box bg="inverted" color="inverted">
      <PageContainer position="relative" py="2">
        <Text size={{ base: "xs", md: "sm" }} align="center">
          {announcement.message}{" "}
          <Link as={NextLink} href={announcement.action.href} variant="underline" weight="medium" color="inverted">
            {announcement.action.label}
          </Link>
        </Text>
        <Flex position="absolute" right={PAGE_GUTTER} top="0" bottom="0" display={{ base: "hidden", md: "flex" }} alignItems="center">
          <Button
            variant="text"
            colorScheme="gray"
            size="xs"
            leftIcon={<Icon as={CloseIcon} size="sm" color="inverted" />}
            aria-label="Dismiss announcement"
            onClick={() => setDismissed(true)}
          />
        </Flex>
      </PageContainer>
    </Box>
  );
}
