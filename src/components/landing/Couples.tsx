import { useLanguage } from "@/contexts/LanguageContext";
import { Embrace } from "@/components/brand/Embrace";
import WaitlistForm from "./WaitlistForm";

/**
 * Soft rose field right after the hero: the app for couples is coming soon,
 * with its own sign-up. Only its category may be named, never its name,
 * concept or launch date.
 */
const Couples = () => {
  const { t } = useLanguage();

  return (
    <section id="couples" className="bg-livales-rose-soft">
      <div className="page grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end lg:gap-20">
        <div>
          <Embrace group="couple" className="max-w-[8rem]" />
          <h2 className="heading-lg mt-8 max-w-[18ch]">{t("couples.title")}</h2>
          <p className="mt-5 text-[1.1rem] text-ink/75">{t("couples.body")}</p>
        </div>
        <WaitlistForm source="couples" />
      </div>
    </section>
  );
};

export default Couples;
