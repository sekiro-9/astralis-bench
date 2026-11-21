import { Box, HStack, Image } from "astralis-ui";
import { paymentMethods } from "@/data/footer";

export function PaymentMethods() {
  return (
    <HStack as="ul" gap="3" aria-label="Accepted payment methods">
      {paymentMethods.map((method) => (
        <Box as="li" key={method.name}>
          <Image src={method.logo} alt={method.name} h={{ base: "1.625rem", lg: "1.875rem" }} w="auto" />
        </Box>
      ))}
    </HStack>
  );
}
