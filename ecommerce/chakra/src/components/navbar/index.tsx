import { Box, Flex, HStack } from "@chakra-ui/react";
import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { AnnouncementBar } from "./components/announcement-bar";
import { HeaderActions } from "./components/header-actions";
import { MainNav } from "./components/main-nav";
import { MobileNav } from "./components/mobile-nav";
import { SearchField } from "./components/search-field";

export function Navbar() {
  return (
    <>
      <AnnouncementBar />
      <Box as="header" bg="bg">
        <PageContainer py="4">
          <Flex align="center" gap={{ base: "4", lg: "10" }}>
            <HStack gap="4">
              <Box hideFrom="lg">
                <MobileNav />
              </Box>
              <Logo />
            </HStack>
            <MainNav />
            <Box flex="1" hideBelow="lg">
              <SearchField />
            </Box>
            <Box ml={{ base: "auto", lg: "0" }}>
              <HeaderActions />
            </Box>
          </Flex>
        </PageContainer>
      </Box>
    </>
  );
}
