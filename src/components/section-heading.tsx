import type { ReactNode } from "react";
import { Heading } from "astralis-ui";

type SectionHeadingProps = {
  children: ReactNode;
  align?: "start" | "center";
};

export function SectionHeading({ children, align = "center" }: SectionHeadingProps) {
  return (
    <Heading
      as="h2"
      size={{ base: "3xl", lg: "5xl" }}
      weight="extrabold"
      lineHeight="none"
      casing="uppercase"
      align={align === "center" ? "center" : "left"}
    >
      {children}
    </Heading>
  );
}
