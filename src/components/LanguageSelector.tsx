import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const options: { value: Language; label: string }[] = [
  { value: "id", label: "Bahasa Indonesia" },
  { value: "en", label: "English" },
];

/** Plain "ID / EN" text toggle. */
const LanguageSelector = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div role="radiogroup" aria-label="Language" className={cn("flex items-center gap-1 text-[0.95rem]", className)}>
      {options.map((opt, i) => (
        <span key={opt.value} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-ink/30">/</span>}
          <button
            type="button"
            role="radio"
            aria-checked={language === opt.value}
            aria-label={opt.label}
            onClick={() => setLanguage(opt.value)}
            className={cn(
              "rounded px-1 py-0.5 font-semibold uppercase",
              language === opt.value ? "text-ink" : "text-ink/45 hover:text-ink"
            )}
          >
            {opt.value}
          </button>
        </span>
      ))}
    </div>
  );
};

export default LanguageSelector;
