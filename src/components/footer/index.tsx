import { Box, Flex, Grid, GridItem, Separator, Stack, Text } from "astralis-ui";
import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { copyright, footerColumns, footerIntro } from "@/data/footer";
import { surfaces } from "@/theme";
import { FooterColumn } from "./components/footer-column";
import { Newsletter } from "./components/newsletter";
import { PaymentMethods } from "./components/payment-methods";
import { SocialLinks } from "./components/social-links";

const NEWSLETTER_OVERLAP = { base: "9rem", lg: "5.5rem" } as const;
const NEWSLETTER_PULL = { base: "-9rem", lg: "-5.5rem" } as const;

export function Footer() {
  return (
    <Box as="footer">
      <PageContainer position="relative">
        <Newsletter />
      </PageContainer>
      <Box bg={surfaces.panel} mt={NEWSLETTER_PULL} pt={NEWSLETTER_OVERLAP}>
        <PageContainer pt="12" pb="20">
          <Grid columns={{ base: "2", lg: "5" }} columnGap={{ base: "4", lg: "10" }} rowGap="6">
            <GridItem colSpan={{ base: "2", lg: "1" }}>
              <Stack gap={{ base: "5", lg: "6" }} maxW="16rem">
                <Logo />
                <Text color="muted" size="sm">
                  {footerIntro}
                </Text>
                <SocialLinks />
              </Stack>
            </GridItem>
            {footerColumns.map((column) => (
              <FooterColumn key={column.title} column={column} />
            ))}
          </Grid>
          <Separator my={{ base: "10", lg: "12" }} />
          <Flex
            direction={{ base: "column", md: "row" }}
            alignItems="center"
            justifyContent="between"
            gap="4"
          >
            <Text color="muted" size="sm">
              {copyright}
            </Text>
            <PaymentMethods />
          </Flex>
        </PageContainer>
      </Box>
    </Box>
  );
}
