import { useLanguage, KANA_URL } from "@/contexts/LanguageContext";

/**
 * Green field with a "shelf" of products: Kana Speed (live), the app for
 * couples (in development — only its category may be named, never its name
 * or concept), and empty slots still to be filled.
 */
const Product = () => {
  const { t, language } = useLanguage();

  return (
    <section id="product" className="bg-livales-green">
      <div className="page py-20 sm:py-28">
        <h2 className="heading-lg max-w-[20ch]">{t("product.title")}</h2>
        <p className="prose-copy mt-6">{t("product.body")}</p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t("nav.product")}>
          <li>
            <a
              href={KANA_URL[language]}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[15rem] flex-col justify-between rounded-[2rem] bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[1.4rem] font-bold leading-none text-white"
              >
                か
              </span>
              <span>
                <span className="block font-display text-[1.25rem] font-semibold">{t("product.kana.name")}</span>
                <span className="mt-1 block text-[1rem] text-ink/70">{t("product.kana.desc")}</span>
                <span className="mt-4 inline-block font-semibold underline decoration-livales-rose decoration-[3px] underline-offset-[6px] group-hover:decoration-ink">
                  {t("product.kana.cta")}
                </span>
                <span className="sr-only"> {t("product.kana.newTab")}</span>
              </span>
            </a>
          </li>
          <li className="flex min-h-[15rem] flex-col justify-between rounded-[2rem] bg-white/55 p-6">
            <span aria-hidden="true" className="block h-12 w-12 rounded-full bg-livales-rose" />
            <span>
              <span className="block font-display text-[1.25rem] font-semibold">{t("product.couple.name")}</span>
              <span className="mt-1 block text-[1rem] text-ink/70">{t("product.couple.status")}</span>
            </span>
          </li>
          {[3, 4].map((n) => (
            <li
              key={n}
              className="flex min-h-[15rem] items-end rounded-[2rem] border-2 border-dashed border-ink/35 p-6"
            >
              <span className="text-[1rem] font-medium text-ink/70">{t("product.slotNext")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Product;
