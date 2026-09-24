import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "./SectionHeading";

const items = ["1", "2", "3", "4", "5"];

const Faq = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />

        <AccordionPrimitive.Root type="single" collapsible defaultValue="1" className="reveal">
          {items.map((n) => (
            <AccordionPrimitive.Item key={n} value={n} className="border-b border-ink/[0.08] first:border-t">
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold text-foreground transition-colors hover:text-livales-green-deep sm:text-xl">
                  {t(`faq.q${n}`)}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white transition-transform duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-primary/50 group-data-[state=open]:text-livales-green-deep">
                    <Plus className="h-4 w-4" />
                  </span>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-xl pb-6 pr-12 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {t(`faq.a${n}`)}
                </p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
};

export default Faq;
