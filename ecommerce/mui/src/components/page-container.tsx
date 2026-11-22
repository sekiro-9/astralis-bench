import Container, { type ContainerProps } from "@mui/material/Container";

export const PAGE_GUTTER = { xs: 2, md: 4, lg: 6, xl: "6.25rem" } as const;

// MUI's documented way to let callers add to a component's own `sx`.
export function PageContainer({ sx, ...props }: ContainerProps) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={[{ maxWidth: "90rem", px: PAGE_GUTTER }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    />
  );
}
