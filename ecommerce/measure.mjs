import { chromium } from "playwright";

export const profiles = {
  desktop: { label: "Desktop 1440px", viewport: { width: 1440, height: 900 }, cpu: 1, network: null },
  phone: {
    label: "Phone 390px, CPU 4x, slow 4G",
    viewport: { width: 390, height: 844 },
    cpu: 4,
    network: {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    },
  },
};

const observers = `
  window.__perf = { lcp: 0, lcpElement: "", fcp: 0, tbt: 0, cls: 0 };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__perf.lcp = entry.startTime;
      const el = entry.element;
      window.__perf.lcpElement = el ? (el.tagName + " " + (el.currentSrc || el.src || el.textContent || "").slice(0, 60)) : "";
    }
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (entry.name === "first-contentful-paint") window.__perf.fcp = entry.startTime;
  }).observe({ type: "paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__perf.tbt += Math.max(0, entry.duration - 50);
  }).observe({ type: "longtask", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__perf.cls += entry.value;
  }).observe({ type: "layout-shift", buffered: true });
`;

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

async function launch() {
  try {
    return await chromium.launch({ channel: "msedge" });
  } catch {
    return chromium.launch();
  }
}

async function loadOnce(browser, url, profile) {
  const context = await browser.newContext({ viewport: profile.viewport });
  const page = await context.newPage();
  await page.addInitScript(observers);
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Performance.enable");
  if (profile.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpu });
  if (profile.network) await cdp.send("Network.emulateNetworkConditions", profile.network);

  const bytes = {};
  const typeOf = new Map();
  cdp.on("Network.responseReceived", (event) => typeOf.set(event.requestId, event.type));
  cdp.on("Network.loadingFinished", (event) => {
    const type = typeOf.get(event.requestId) ?? "Other";
    bytes[type] = (bytes[type] ?? 0) + event.encodedDataLength;
  });

  await page.goto(url, { waitUntil: "load" });
  // The hero photo is the page's largest paint; waiting for it keeps a late
  // photo from being reported as a fast paragraph paint.
  await page
    .waitForFunction(
      () => performance.getEntriesByType("resource").some((r) => r.name.includes("hero-couple") && r.responseEnd > 0),
      null,
      { timeout: 30_000 },
    )
    .catch(() => {});
  await page.waitForTimeout(1500);

  const perf = await page.evaluate(() => {
    const hero = performance.getEntriesByType("resource").find((r) => r.name.includes("hero-couple"));
    return { ...window.__perf, heroRequested: hero ? hero.startTime : -1, heroLoaded: hero ? hero.responseEnd : -1 };
  });
  const metrics = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
  await context.close();
  return { ...perf, scriptMs: metrics.ScriptDuration * 1000, mainThreadMs: metrics.TaskDuration * 1000, bytes };
}

/** Measures each target ({ name, url }) under each profile; one warm-up load, then `runs` cold loads, medians reported. */
export async function measure(targets, { runs = 5, only } = {}) {
  const browser = await launch();
  const results = [];
  try {
    for (const [profileKey, profile] of Object.entries(profiles)) {
      if (only && only !== profileKey) continue;
      for (const target of targets) {
        const samples = [];
        for (let i = 0; i <= runs; i++) {
          const sample = await loadOnce(browser, target.url, profile);
          if (i > 0) samples.push(sample);
        }
        const pick = (key) => Math.round(median(samples.map((s) => s[key])));
        const kb = (type) => Math.round(median(samples.map((s) => s.bytes[type] ?? 0)) / 1024);
        const row = {
          profile: profileKey,
          app: target.name,
          jsKB: kb("Script"),
          cssKB: kb("Stylesheet"),
          htmlKB: kb("Document"),
          imageKB: kb("Image"),
          scriptMs: pick("scriptMs"),
          mainThreadMs: pick("mainThreadMs"),
          tbtMs: pick("tbt"),
          fcpMs: pick("fcp"),
          heroRequestedMs: pick("heroRequested"),
          lcpMs: pick("lcp"),
          cls: Number(median(samples.map((s) => s.cls)).toFixed(3)),
          lcpElement: samples.at(-1).lcpElement,
        };
        results.push(row);
        console.log(`  ${profileKey.padEnd(7)} ${target.name.padEnd(8)} LCP ${row.lcpMs} ms, JS ${row.jsKB} kB, script ${row.scriptMs} ms`);
      }
    }
  } finally {
    await browser.close();
  }
  return results;
}
