import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/content/products";
import { ProductMark } from "@/components/brand/ProductMark";
import { cn } from "@/lib/utils";

/**
 * The shelf as a list: one row per app, each row a link to the app's own site.
 * Live apps first, then the one in testing.
 */
const ProductList = ({ className }: { className?: string }) => {
  const { t, language } = useLanguage();

  return (
    <ul className={cn("border-t border-ink/15", className)} aria-label={t("nav.products")}>
      {products.map(({ key, url, live }) => (
        <li key={key} className="border-b border-ink/15">
          <a
            href={url[language]}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-3 py-6 sm:grid-cols-[auto_minmax(0,14rem)_minmax(0,1fr)_auto] sm:gap-x-8"
          >
            <ProductMark product={key} className={cn("row-span-2 h-14 w-14 sm:row-span-1 sm:h-16 sm:w-16", key === "kado" && "bg-white")} />
            <span className="font-display text-[1.2rem] font-semibold decoration-livales-rose decoration-[3px] underline-offset-[6px] group-hover:underline sm:text-[1.35rem]">
              {t(`product.${key}.name`)}
            </span>{" "}
            <span className="text-[1.05rem] text-ink/75">{t(`product.${key}.short`)}</span>{" "}
            <span
              className={cn(
                "col-start-2 justify-self-start rounded-full px-3.5 py-1 text-[0.9rem] font-semibold sm:col-start-auto sm:justify-self-end",
                live ? "bg-white" : "bg-livales-rose-soft"
              )}
            >
              {t(`product.${key}.status`)}
            </span>
            <span className="sr-only"> {t("common.newTab")}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
