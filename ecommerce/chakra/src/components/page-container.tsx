import { Container, type ContainerProps } from "@chakra-ui/react";

export const PAGE_GUTTER = { base: "4", md: "8", lg: "12", xl: "6.25rem" } as const;

export function PageContainer(props: ContainerProps) {
  return <Container maxW="90rem" px={PAGE_GUTTER} {...props} />;
}
