import type { ReactNode } from "react";
import { useLanguage, KANA_URL, KADO_URL } from "@/contexts/LanguageContext";

const linkCard = "group flex h-full min-h-[15rem] flex-col justify-between rounded-[2rem] bg-white p-6";

/**
 * Soft green field with a "shelf" of products, relationships first: Kado
 * Livales (live), the app for couples (in development — only its category may
 * be named, never its name or concept), then Kana Speed, labelled as a side
 * project, and an empty slot still to be filled.
 */
const Product = () => {
  const { t, language } = useLanguage();

  const card = (key: string, mark: ReactNode, tag?: string) => (
    <>
      <span className="flex items-start justify-between gap-3">
        <span aria-hidden="true">{mark}</span>
        {tag && (
          <span className="rounded-full bg-livales-green-soft px-3 py-1 text-[0.85rem] font-medium text-ink/80">
            {tag}
          </span>
        )}
      </span>
      <span>
        <span className="block font-display text-[1.25rem] font-semibold">{t(`product.${key}.name`)}</span>{" "}
        <span className="mt-1 block text-[1rem] text-ink/70">{t(`product.${key}.desc`)}</span>{" "}
        <span className="mt-4 inline-block font-semibold underline decoration-livales-rose decoration-[3px] underline-offset-[6px] group-hover:decoration-ink">
          {t(`product.${key}.cta`)}
        </span>
        <span className="sr-only"> {t("product.kana.newTab")}</span>
      </span>
    </>
  );

  return (
    <section id="product" className="bg-livales-green-soft">
      <div className="page py-20 sm:py-28">
        <h2 className="heading-lg max-w-[20ch]">{t("product.title")}</h2>
        <p className="prose-copy mt-6">{t("product.body")}</p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t("nav.product")}>
          <li>
            <a href={KADO_URL} target="_blank" rel="noopener noreferrer" className={linkCard}>
              {/* Temporary icon supplied by the Kado team; swap the file to update it. */}
              {card("kado", <img src="/products/kado-livales.svg" alt="" width={48} height={48} className="h-12 w-12" />)}
            </a>
          </li>
          <li className="flex min-h-[15rem] flex-col justify-between rounded-[2rem] bg-white/70 p-6">
            <span aria-hidden="true" className="block h-12 w-12 rounded-full bg-livales-green" />
            <span>
              <span className="block font-display text-[1.25rem] font-semibold">{t("product.couple.name")}</span>{" "}
              <span className="mt-1 block text-[1rem] text-ink/70">{t("product.couple.status")}</span>
            </span>
          </li>
          <li>
            <a href={KANA_URL[language]} target="_blank" rel="noopener noreferrer" className={linkCard}>
              {card(
                "kana",
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[1.4rem] font-bold leading-none text-white">
                  か
                </span>,
                t("product.kana.side"),
              )}
            </a>
          </li>
          <li className="flex min-h-[15rem] items-end rounded-[2rem] border-2 border-dashed border-ink/35 p-6">
            <span className="text-[1rem] font-medium text-ink/70">{t("product.slotNext")}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Product;
