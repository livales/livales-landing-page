import { useLanguage } from "@/contexts/LanguageContext";
import { Embrace, type EmbraceGroup } from "@/components/brand/Embrace";

const groups: EmbraceGroup[] = ["learner", "couple", "family", "anyone"];

/** Soft rose field: the same embrace from the logo, around different audiences. */
const Audience = () => {
  const { t } = useLanguage();

  return (
    <section id="audience" className="bg-livales-rose-soft">
      <div className="page py-20 sm:py-28">
        <h2 className="heading-lg">{t("audience.title")}</h2>
        <ul className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <li key={g}>
              <Embrace group={g} className="max-w-[11rem]" />
              <h3 className="heading-md mt-7">{t(`audience.${g}.title`)}</h3>
              <p className="mt-2 max-w-[18rem] text-[1.05rem] leading-relaxed">{t(`audience.${g}.body`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Audience;
