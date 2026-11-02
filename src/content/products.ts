import { HL_URL, KADO_URL, KANA_URL, type Language } from "@/contexts/LanguageContext";

export type ProductKey = "kado" | "kana" | "hl";

export interface Product {
  key: ProductKey;
  url: Record<Language, string>;
  /** Live products come first; the one in testing follows. */
  live: boolean;
}

/** The shelf, in order. Copy lives under `product.<key>.*` and `products.<key>.*`. */
export const products: Product[] = [
  { key: "kado", url: KADO_URL, live: true },
  { key: "kana", url: KANA_URL, live: true },
  { key: "hl", url: HL_URL, live: false },
];
