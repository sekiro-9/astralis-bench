import type { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { reveal } from "@/theme/motion";

type SectionHeadingProps = {
  children: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({ children, align = "center" }: SectionHeadingProps) {
  return (
    <Typography variant="h2" align={align} sx={reveal("blur-in")}>
      {children}
    </Typography>
  );
}
