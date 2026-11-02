import { useLanguage, HL_TESTER_URL } from "@/contexts/LanguageContext";
import { products, type ProductKey } from "@/content/products";
import { ProductMark } from "@/components/brand/ProductMark";
import ProductStack from "@/components/ProductStack";
import PageHeader from "@/components/layout/PageHeader";
import PhoneShot from "@/components/PhoneShot";
import TextLink from "@/components/TextLink";
import { cn } from "@/lib/utils";

const features: Record<ProductKey, string[]> = {
  kado: ["f1", "f2", "f3", "f4"],
  kana: ["f1", "f2", "f3"],
  hl: ["f1", "f2", "f3", "f4"],
};
const facts = ["platform", "language", "price"];
// Flat fields alternate so each app reads as its own room.
const field: Record<ProductKey, string> = {
  kado: "",
  kana: "bg-livales-green-soft",
  hl: "bg-livales-rose-soft",
};

const Products = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <PageHeader
        title={t("products.title")}
        lead={t("products.body")}
        aside={<ProductStack />}
        wideAside
      />

      {products.map(({ key, url }) => (
        <section key={key} id={key} aria-labelledby={`${key}-title`} className={cn(field[key], !field[key] && "border-t border-ink/10")}>
          <div
            className={cn(
              "page grid gap-12 py-20 sm:py-24 lg:gap-20",
              key === "hl" ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]"
            )}
          >
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <ProductMark product={key} className="h-16 w-16" />
                <span className={cn("rounded-full px-4 py-1.5 text-[0.95rem] font-semibold", field[key] ? "bg-white" : "bg-livales-green-soft")}>
                  {t(`product.${key}.status`)}
                </span>
              </div>
              <h2 id={`${key}-title`} className="heading-lg mt-8">
                {t(`product.${key}.name`)}
              </h2>
              <p className="prose-copy mt-5 text-ink/80">{t(`products.${key}.body`)}</p>

              <h3 className="heading-md mt-10">{t("products.features")}</h3>
              <ul className="mt-5 max-w-[36rem] space-y-3 text-[1.05rem]">
                {features[key].map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.55rem] h-2.5 w-2.5 shrink-0 rounded-full bg-livales-green" />
                    {t(`products.${key}.${f}`)}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                {key === "hl" ? (
                  <>
                    <a href={HL_TESTER_URL[language]} target="_blank" rel="noopener noreferrer" className="btn-ink">
                      {t("product.hl.tester")}
                      <span className="sr-only"> {t("common.newTab")}</span>
                    </a>{" "}
                    <TextLink to={url[language]} newTabLabel={t("common.newTab")}>
                      {t("product.hl.cta")}
                    </TextLink>
                  </>
                ) : (
                  <a href={url[language]} target="_blank" rel="noopener noreferrer" className="btn-ink">
                    {t(`product.${key}.cta`)}
                    <span className="sr-only"> {t("common.newTab")}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-10">
              {key === "hl" && (
                <div className="grid grid-cols-2 gap-4">
                  <PhoneShot src={`/products/hearts-and-ladders/board-${language}.webp`} alt={t("hl.shot.board")} />
                  <PhoneShot
                    src={`/products/hearts-and-ladders/vault-${language}.webp`}
                    alt={t("hl.shot.vault")}
                    className="mt-12"
                  />
                </div>
              )}
              <dl className="border-t border-ink/15">
                {facts.map((f) => (
                  <div key={f} className="flex justify-between gap-6 border-b border-ink/15 py-4 text-[1rem]">
                    <dt className="text-ink/65">{t(`products.facts.${f}`)}</dt>
                    <dd className="text-right font-semibold">{t(`products.${key}.${f}`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Products;
