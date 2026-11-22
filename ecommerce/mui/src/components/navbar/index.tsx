import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
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
      <AppBar position="static" color="inherit" elevation={0}>
        <PageContainer>
          <Toolbar disableGutters sx={{ minHeight: { xs: "auto" }, py: 2, gap: { xs: 2, lg: 5 } }}>
            <Stack direction="row" alignItems="center" spacing={2} useFlexGap>
              <Box sx={{ display: { lg: "none" } }}>
                <MobileNav />
              </Box>
              <Logo />
            </Stack>
            <MainNav />
            <Box sx={{ flex: 1, display: { xs: "none", lg: "block" } }}>
              <SearchField />
            </Box>
            <Box sx={{ ml: { xs: "auto", lg: 0 } }}>
              <HeaderActions />
            </Box>
          </Toolbar>
        </PageContainer>
      </AppBar>
    </>
  );
}
