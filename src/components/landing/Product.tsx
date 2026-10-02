import type { ReactNode } from "react";
import { Gift } from "lucide-react";
import { useLanguage, KANA_URL, KADO_URL } from "@/contexts/LanguageContext";

/**
 * Soft green field with a "shelf" of products: the live ones (linked), the
 * app for couples (in development — only its category may be named, never
 * its name or concept), and an empty slot still to be filled.
 */
const Product = () => {
  const { t, language } = useLanguage();

  const live: { key: string; href: string; mark: ReactNode }[] = [
    {
      key: "kana",
      href: KANA_URL[language],
      mark: (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[1.4rem] font-bold leading-none text-white">
          か
        </span>
      ),
    },
    {
      key: "kado",
      href: KADO_URL,
      mark: (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-livales-rose text-ink">
          <Gift className="h-6 w-6" strokeWidth={2.25} />
        </span>
      ),
    },
  ];

  return (
    <section id="product" className="bg-livales-green-soft">
      <div className="page py-20 sm:py-28">
        <h2 className="heading-lg max-w-[20ch]">{t("product.title")}</h2>
        <p className="prose-copy mt-6">{t("product.body")}</p>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t("nav.product")}>
          {live.map(({ key, href, mark }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[15rem] flex-col justify-between rounded-[2rem] bg-white p-6"
              >
                <span aria-hidden="true">{mark}</span>
                <span>
                  <span className="block font-display text-[1.25rem] font-semibold">{t(`product.${key}.name`)}</span>{" "}
                  <span className="mt-1 block text-[1rem] text-ink/70">{t(`product.${key}.desc`)}</span>{" "}
                  <span className="mt-4 inline-block font-semibold underline decoration-livales-rose decoration-[3px] underline-offset-[6px] group-hover:decoration-ink">
                    {t(`product.${key}.cta`)}
                  </span>
                  <span className="sr-only"> {t("product.kana.newTab")}</span>
                </span>
              </a>
            </li>
          ))}
          <li className="flex min-h-[15rem] flex-col justify-between rounded-[2rem] bg-white/70 p-6">
            <span aria-hidden="true" className="block h-12 w-12 rounded-full bg-livales-green" />
            <span>
              <span className="block font-display text-[1.25rem] font-semibold">{t("product.couple.name")}</span>{" "}
              <span className="mt-1 block text-[1rem] text-ink/70">{t("product.couple.status")}</span>
            </span>
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
