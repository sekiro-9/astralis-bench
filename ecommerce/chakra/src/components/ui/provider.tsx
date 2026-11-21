"use client";

import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";
import { EmotionRegistry } from "./emotion-registry";

// Light mode only, so the snippet's next-themes ColorModeProvider is left out:
// Chakra's tokens resolve to their light values when no `.dark` class is set.
export function Provider({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}
