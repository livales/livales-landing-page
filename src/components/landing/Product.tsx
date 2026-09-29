import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Green field with a "shelf" of product slots: one filled (the first app,
 * kept anonymous — it is confidential), the rest waiting to be filled.
 */
const Product = () => {
  const { t } = useLanguage();

  return (
    <section id="product" className="bg-livales-green">
      <div className="page py-20 sm:py-28">
        <h2 className="heading-lg max-w-[18ch]">{t("product.title")}</h2>
        <p className="prose-copy mt-6">{t("product.body")}</p>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label={t("nav.product")}>
          <li className="flex aspect-[5/4] sm:aspect-[4/5] flex-col justify-between rounded-[2rem] bg-white p-5 sm:p-6">
            <span className="block h-8 w-8 rounded-full bg-livales-rose" aria-hidden="true" />
            <span>
              <span className="block font-display text-[1.05rem] font-semibold sm:text-[1.2rem]">
                {t("product.slot1.name")}
              </span>
              <span className="mt-1 block text-[0.95rem] text-ink/70">{t("product.slot1.status")}</span>
            </span>
          </li>
          {[2, 3, 4].map((n) => (
            <li
              key={n}
              className="flex aspect-[5/4] sm:aspect-[4/5] items-end rounded-[2rem] border-2 border-dashed border-ink/35 p-5 sm:p-6"
            >
              <span className="text-[0.95rem] font-medium text-ink/70">{t("product.slotNext")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Product;
