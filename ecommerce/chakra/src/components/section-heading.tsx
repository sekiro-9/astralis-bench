import type { ReactNode } from "react";
import { Heading } from "@chakra-ui/react";

type SectionHeadingProps = {
  children: ReactNode;
  align?: "start" | "center";
};

export function SectionHeading({ children, align = "center" }: SectionHeadingProps) {
  return (
    <Heading
      as="h2"
      fontSize={{ base: "3xl", lg: "5xl" }}
      fontWeight="extrabold"
      lineHeight="1"
      letterSpacing="tight"
      textTransform="uppercase"
      textAlign={align}
      animationStyle="reveal-blur-in"
    >
      {children}
    </Heading>
  );
}
