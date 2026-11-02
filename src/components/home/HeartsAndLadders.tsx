import { useLanguage, HL_URL, HL_TESTER_URL } from "@/contexts/LanguageContext";
import PhoneShot from "@/components/PhoneShot";
import TextLink from "@/components/TextLink";
import { ProductMark } from "@/components/brand/ProductMark";

const points = ["point1", "point2", "point3"];

/**
 * Soft rose field right after the hero: Hearts & Ladders, the app for couples,
 * is in Android testing and looking for early testers (sign-up happens on its
 * own site). Screenshots are real, copied from its site.
 */
const HeartsAndLadders = () => {
  const { t, language } = useLanguage();

  return (
    <section className="overflow-hidden bg-livales-rose-soft">
      <div className="page grid gap-14 py-20 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-center lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <ProductMark product="hl" className="h-14 w-14" />
            <span className="rounded-full bg-white px-4 py-1.5 text-[0.95rem] font-semibold">
              {t("product.hl.status")}
            </span>
          </div>
          <h2 className="heading-lg mt-8 max-w-[20ch]">{t("hl.title")}</h2>
          <p className="prose-copy mt-6 text-ink/80">{t("hl.body")}</p>
          <ul className="mt-8 max-w-[34rem] space-y-3 text-[1.05rem]">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.55rem] h-2.5 w-2.5 shrink-0 rounded-full bg-livales-rose" />
                {t(`hl.${p}`)}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a href={HL_TESTER_URL[language]} target="_blank" rel="noopener noreferrer" className="btn-ink">
              {t("product.hl.tester")}
              <span className="sr-only"> {t("common.newTab")}</span>
            </a>{" "}
            <TextLink to={HL_URL[language]} newTabLabel={t("common.newTab")}>
              {t("product.hl.cta")}
            </TextLink>
          </div>
        </div>

        {/* Two screens, the second a step lower: a pair, side by side. */}
        <div className="mx-auto grid w-full max-w-[24rem] grid-cols-2 gap-4 sm:gap-5 lg:max-w-none">
          <PhoneShot src={`/products/hearts-and-ladders/board-${language}.webp`} alt={t("hl.shot.board")} />
          <PhoneShot
            src={`/products/hearts-and-ladders/challenge-${language}.webp`}
            alt={t("hl.shot.challenge")}
            className="mt-12"
          />
        </div>
      </div>
    </section>
  );
};

export default HeartsAndLadders;
