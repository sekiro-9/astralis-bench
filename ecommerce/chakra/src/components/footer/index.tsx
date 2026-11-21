import { Box, Flex, GridItem, Separator, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Logo } from "@/components/logo";
import { PageContainer } from "@/components/page-container";
import { copyright, footerColumns, footerIntro } from "@/data/footer";
import { FooterColumn } from "./components/footer-column";
import { Newsletter } from "./components/newsletter";
import { PaymentMethods } from "./components/payment-methods";
import { SocialLinks } from "./components/social-links";

// The grey footer starts behind the newsletter band: it is pulled up by the
// same amount it is padded, so the band sits half over the page and half over
// the footer without either knowing the band's height.
const NEWSLETTER_OVERLAP = { base: "9rem", lg: "5.5rem" } as const;
const NEWSLETTER_PULL = { base: "-9rem", lg: "-5.5rem" } as const;

export function Footer() {
  return (
    <Box as="footer">
      <PageContainer position="relative">
        <Newsletter />
      </PageContainer>
      <Box bg="surface.panel" mt={NEWSLETTER_PULL} pt={NEWSLETTER_OVERLAP}>
        <PageContainer pt="12" pb="20">
          <SimpleGrid columns={{ base: 2, lg: 5 }} columnGap={{ base: "4", lg: "10" }} rowGap="6">
            <GridItem colSpan={{ base: 2, lg: 1 }}>
              <Stack gap={{ base: "5", lg: "6" }} maxW="16rem">
                <Logo />
                <Text color="fg.muted" textStyle="sm">
                  {footerIntro}
                </Text>
                <SocialLinks />
              </Stack>
            </GridItem>
            {footerColumns.map((column) => (
              <FooterColumn key={column.title} column={column} />
            ))}
          </SimpleGrid>
          <Separator my={{ base: "10", lg: "12" }} />
          <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap="4">
            <Text color="fg.muted" textStyle="sm">
              {copyright}
            </Text>
            <PaymentMethods />
          </Flex>
        </PageContainer>
      </Box>
    </Box>
  );
}
