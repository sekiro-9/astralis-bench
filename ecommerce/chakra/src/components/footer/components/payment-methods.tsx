import { Image, List } from "@chakra-ui/react";
import { paymentMethods } from "@/data/footer";

export function PaymentMethods() {
  return (
    <List.Root listStyle="none" display="flex" flexDirection="row" gap="3" aria-label="Accepted payment methods">
      {paymentMethods.map((method) => (
        <List.Item key={method.name}>
          <Image src={method.logo} alt={method.name} h={{ base: "1.625rem", lg: "1.875rem" }} w="auto" />
        </List.Item>
      ))}
    </List.Root>
  );
}
