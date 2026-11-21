"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

// Cache Components streams the page through Suspense, so Emotion's styles
// must be flushed into each streamed chunk or the server HTML arrives unstyled
// and mismatches on hydration (Chakra's Next.js guide, "Streaming" step).
export function EmotionRegistry({ children }: { children: ReactNode }) {
  const [registry] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    const insert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name);
      return insert(...args);
    };
    const flush = () => {
      const names = inserted;
      inserted = [];
      return names;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = registry.flush();
    if (names.length === 0) return null;
    const styles = names.map((name) => registry.cache.inserted[name]).join("");
    return (
      <style
        key={registry.cache.key}
        data-emotion={`${registry.cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={registry.cache}>{children}</CacheProvider>;
}
