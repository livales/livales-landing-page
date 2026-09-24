import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const options: Language[] = ["id", "en"];

const LanguageSelector = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      className={cn(
        "inline-flex rounded-full border border-ink/10 bg-ink/[0.03] p-0.5",
        className
      )}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={language === opt}
          onClick={() => setLanguage(opt)}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors",
            language === opt
              ? "bg-ink/10 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
