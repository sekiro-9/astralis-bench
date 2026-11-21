import { Box, Flex, HStack } from "astralis-ui";
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
      <Box as="header" bg="base">
        <PageContainer py="4">
          <Flex alignItems="center" gap={{ base: "4", lg: "10" }}>
            <HStack gap="4">
              <Box display={{ base: "block", lg: "hidden" }}>
                <MobileNav />
              </Box>
              <Logo />
            </HStack>
            <MainNav />
            <Box flex="1" display={{ base: "hidden", lg: "block" }}>
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
