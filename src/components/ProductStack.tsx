import { useLanguage } from "@/contexts/LanguageContext";
import { products, type ProductKey } from "@/content/products";
import { cn } from "@/lib/utils";

// Fanned like cards in a hand: each phone a step to the right, the outer two
// tilted out. Later apps sit on top, so the newest is the one in front.
const placement: Record<ProductKey, string> = {
  kado: "left-[3%] top-[10%] -rotate-6 z-[1]",
  kana: "left-[29%] top-0 z-[2]",
  hl: "left-[55%] top-[10%] rotate-6 z-[3]",
};

/**
 * Products page header: a real screenshot of every Livales app, stacked. The
 * phones rise out of the line under the header (the bottom is cropped by it),
 * and each one jumps to that app's section below.
 */
const ProductStack = ({ className }: { className?: string }) => {
  const { t, language } = useLanguage();

  return (
    <ul
      aria-label={t("nav.products")}
      className={cn(
        "relative -mb-16 h-[19rem] w-full max-w-[24rem] overflow-hidden sm:-mb-20 sm:h-[24rem] lg:max-w-none",
        className
      )}
    >
      {products.map(({ key, preview }) => (
        <li key={key} className={cn("absolute w-[42%]", placement[key])}>
          <a
            href={`#${key}`}
            className="block rounded-[2rem] transition-transform duration-200 hover:-translate-y-2 focus-visible:-translate-y-2"
          >
            <span className="block overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink">
              <img
                src={preview(language)}
                alt={t(`products.preview.${key}`)}
                width={600}
                height={1334}
                className="block h-auto w-full rounded-[1.6rem]"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ProductStack;
