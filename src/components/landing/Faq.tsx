import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const items = ["1", "2", "3", "4", "5"];

const Faq = () => {
  const { t } = useLanguage();

  return (
    <section id="faq">
      <div className="page grid gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
        <h2 className="heading-lg">{t("faq.title")}</h2>

        <AccordionPrimitive.Root type="single" collapsible className="border-t border-ink/15">
          {items.map((n) => (
            <AccordionPrimitive.Item key={n} value={n} className="border-b border-ink/15">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.15rem] font-semibold sm:text-[1.25rem]">
                  {t(`faq.q${n}`)}
                  {/* Plus that turns into a minus: two pills, the vertical one collapses. */}
                  <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[3px] w-4 -translate-y-1/2 rounded-full bg-ink" />
                    <span className="absolute left-1/2 top-0 h-4 w-[3px] -translate-x-1/2 rounded-full bg-ink transition-transform duration-200 group-data-[state=open]:scale-y-0" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              {/* forceMount keeps closed answers in the (prerendered) HTML so search
                  engines can read them; CSS hides them while closed. */}
              <AccordionPrimitive.Content
                forceMount
                className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
              >
                <p className="max-w-[40rem] pb-7 pr-10 text-[1.05rem] leading-relaxed text-ink/75">{t(`faq.a${n}`)}</p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
};

export default Faq;
