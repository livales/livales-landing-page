import { HL_URL, KADO_URL, KANA_URL } from "@/i18n/ui";
import type { Locale } from "@/i18n/routes";

export type ProductKey = "kado" | "kana" | "hl";

export interface Product {
  key: ProductKey;
  url: Record<Locale, string>;
  /** Live products come first; the one in testing follows. */
  live: boolean;
  /** A real 600 × 1334 phone screenshot, per language (public/products/). */
  preview: (lang: Locale) => string;
}

/** The shelf, in order. Copy lives under `product.<key>.*` and `products.<key>.*`. */
export const products: Product[] = [
  { key: "kado", url: KADO_URL, live: true, preview: (l) => `/products/kado/home-${l}.webp` },
  { key: "kana", url: KANA_URL, live: true, preview: (l) => `/products/kana/home-${l}.webp` },
  { key: "hl", url: HL_URL, live: false, preview: (l) => `/products/hearts-and-ladders/board-${l}.webp` },
];
