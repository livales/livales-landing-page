import { useLanguage } from "@/contexts/LanguageContext";

const principles = ["p1", "p2", "p3", "p4"];

const Approach = () => {
  const { t } = useLanguage();

  return (
    <section id="approach">
      <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <h2 className="heading-lg">{t("approach.title")}</h2>
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p}>
              <dt className="heading-md">{t(`approach.${p}.title`)}</dt>
              <dd className="mt-3 text-[1.05rem] leading-relaxed text-ink/75">{t(`approach.${p}.body`)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Approach;
