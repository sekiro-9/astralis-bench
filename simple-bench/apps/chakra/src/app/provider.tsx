"use client";

// Chakra's documented App Router setup: the system object isn't serializable,
// so the provider must be composed inside a client file.
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
