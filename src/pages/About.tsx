import { useLanguage, CONTACT_EMAIL, THREADS_URL, LINKEDIN_URL } from "@/contexts/LanguageContext";
import { Embrace, HeroMark, type EmbraceGroup } from "@/components/brand/Embrace";
import PageHeader from "@/components/layout/PageHeader";
import TextLink from "@/components/TextLink";

const groups: EmbraceGroup[] = ["couple", "family", "anyone"];
const principles = ["p1", "p2", "p3", "p4"];

const About = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader
        title={t("about.title")}
        lead={t("about.lead")}
        aside={
          <div className="order-first w-28 sm:w-36 lg:order-none lg:ml-auto lg:w-48">
            <HeroMark label={t("about.markLabel")} />
          </div>
        }
      />

      {/* A short note from the team. */}
      <section aria-labelledby="why-title" className="border-t border-ink/10">
        <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <h2 id="why-title" className="heading-lg">
            {t("about.why.title")}
          </h2>
          <div className="space-y-6 text-[1.15rem] leading-[1.75] sm:text-[1.3rem]">
            <p className="max-w-[38rem]">{t("about.p1")}</p>
            <p className="max-w-[38rem]">{t("about.p2")}</p>
            <p className="max-w-[38rem] text-ink/75">{t("about.p3")}</p>
            <p className="pt-2 font-display text-[1rem] font-semibold">{t("about.sign")}</p>
          </div>
        </div>
      </section>

      {/* Soft rose field: the logo's embrace around different groups of people. */}
      <section aria-labelledby="audience-title" className="bg-livales-rose-soft">
        <div className="page py-20 sm:py-28">
          <h2 id="audience-title" className="heading-lg">
            {t("audience.title")}
          </h2>
          <ul className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-3">
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

      <section aria-labelledby="approach-title">
        <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <h2 id="approach-title" className="heading-lg">
            {t("approach.title")}
          </h2>
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

      <section id="contact" aria-labelledby="contact-title" className="border-t border-ink/10">
        <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
          <h2 id="contact-title" className="heading-lg">
            {t("contact.title")}
          </h2>
          <div>
            <p className="prose-copy">{t("contact.body")}</p>
            <dl className="mt-10 grid max-w-[36rem] gap-8 sm:grid-cols-2">
              <div>
                <dt className="text-[0.95rem] text-ink/65">{t("contact.email")}</dt>
                <dd className="mt-2 text-[1.1rem]">
                  <TextLink to={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</TextLink>
                </dd>
              </div>
              <div>
                <dt className="text-[0.95rem] text-ink/65">{t("contact.social")}</dt>
                <dd className="mt-2 flex gap-6 text-[1.1rem]">
                  <TextLink to={THREADS_URL} newTabLabel={t("common.newTab")}>
                    Threads
                  </TextLink>{" "}
                  <TextLink to={LINKEDIN_URL} newTabLabel={t("common.newTab")}>
                    LinkedIn
                  </TextLink>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
