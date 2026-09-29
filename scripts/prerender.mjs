// Injects the server-rendered home page into dist/index.html so crawlers and
// link previews get real HTML without running JavaScript.
// Runs after `vite build` and `vite build --ssr` (see the "build" script).
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");

const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const appHtml = render("/");

const indexPath = resolve(dist, "index.html");
const template = readFileSync(indexPath, "utf8");
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}
writeFileSync(indexPath, template.replace(placeholder, `<div id="root">${appHtml}</div>`));
rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
