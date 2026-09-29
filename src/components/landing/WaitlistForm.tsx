import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { subscribe } from "@/lib/subscribe";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error" | "failed";

interface WaitlistFormProps {
  className?: string;
  /** Where on the page the form lives; stored with the sign-up. */
  source?: string;
}

const WaitlistForm = ({ className, source = "updates" }: WaitlistFormProps) => {
  const { t, language } = useLanguage();
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await subscribe(email, language, source);
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Subscribe failed", err);
      setStatus("failed");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className={cn("flex items-start gap-4", className)}>
        {/* The mark's dot, now inside the embrace: you're in. */}
        <svg viewBox="0 0 80 92" className="h-12 w-auto shrink-0" aria-hidden="true">
          <rect x="0" y="62" width="80" height="30" rx="15" fill="#f07c8f" />
          <rect x="0" y="0" width="30" height="92" rx="15" fill="#2ecc40" />
          <circle cx="58" cy="32" r="15" fill="#2ecc40" />
        </svg>
        <div>
          <p className="font-display text-[1.15rem] font-semibold">{t("form.success.title")}</p>
          <p className="mt-1 text-[1rem] text-ink/75">{t("form.success.body")}</p>
        </div>
      </div>
    );
  }

  const hasError = status === "error" || status === "failed";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={inputId} className="mb-2 block text-[0.95rem] font-semibold">
        {t("form.email")}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t("form.placeholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (hasError) setStatus("idle");
          }}
          aria-invalid={hasError}
          aria-describedby={hasError ? messageId : undefined}
          className={cn(
            "h-12 w-full min-w-0 rounded-full border-2 sm:flex-1 bg-white px-5 text-[1rem] text-ink placeholder:text-ink/40 focus:outline-none focus-visible:outline-offset-2",
            hasError ? "border-destructive" : "border-ink/20 focus:border-ink"
          )}
        />
        <button type="submit" disabled={status === "submitting"} className="btn-ink gap-2 disabled:opacity-70">
          {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {status === "submitting" ? t("form.submitting") : t("form.submit")}
        </button>
      </div>
      {hasError && (
        <p id={messageId} role="alert" className="mt-3 text-[0.95rem] font-medium text-destructive">
          {t(status === "error" ? "form.error" : "form.failed")}
        </p>
      )}
    </form>
  );
};

export default WaitlistForm;
