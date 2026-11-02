// Renders the link-preview images from scripts/og-image.html with headless Chrome,
// one per language, using the tagline from src/i18n/ui.ts so the two never drift.
// Needs Node 23.6+ (imports the TypeScript dictionary directly) and Google Chrome.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ui } from "../src/i18n/ui.ts";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputs = { id: "public/og-image.png", en: "public/og-image-en.png" };

for (const [lang, out] of Object.entries(outputs)) {
  const page = pathToFileURL(resolve("scripts/og-image.html"));
  page.search = new URLSearchParams({ lang, tagline: ui[lang]["footer.tagline"] }).toString();
  execFileSync(CHROME, [
    "--headless",
    "--hide-scrollbars",
    "--window-size=1200,630",
    "--virtual-time-budget=8000",
    `--screenshot=${resolve(out)}`,
    page.href,
  ], { stdio: "ignore" });
  console.log(`og-image: wrote ${out}`);
}
