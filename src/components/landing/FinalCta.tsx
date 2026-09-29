import { useLanguage } from "@/contexts/LanguageContext";
import WaitlistForm from "./WaitlistForm";

const FinalCta = () => {
  const { t } = useLanguage();

  return (
    <section id="updates" className="bg-livales-blush">
      <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end lg:gap-20">
        <div>
          <h2 className="heading-lg max-w-[20ch]">{t("cta.title")}</h2>
          <p className="mt-5 text-[1.1rem] text-ink/75">{t("cta.body")}</p>
        </div>
        <WaitlistForm />
      </div>
    </section>
  );
};

export default FinalCta;
