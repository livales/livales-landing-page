import { useId, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

// TODO: connect to a real mailing-list backend (e.g. Firebase, Supabase, Loops).
// Until then submissions are only acknowledged in the UI.
async function submitToWaitlist(_email: string) {
  await new Promise((r) => setTimeout(r, 900));
}

const WaitlistForm = ({ className }: { className?: string }) => {
  const { t } = useLanguage();
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    await submitToWaitlist(email.trim());
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex w-full max-w-md items-start gap-3 rounded-2xl border border-primary/30 bg-livales-mint p-4 text-left",
          className
        )}
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <div>
          <p className="font-semibold text-foreground">{t("form.success.title")}</p>
          <p className="text-sm text-muted-foreground">{t("form.success.body")}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full max-w-md", className)}>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-2xl border bg-white p-1.5 shadow-[0_10px_30px_-15px_rgba(18,32,35,0.25)] transition-colors sm:flex-row sm:rounded-full",
          status === "error"
            ? "border-destructive/60"
            : "border-ink/10 focus-within:border-primary/60"
        )}
      >
        <label htmlFor={inputId} className="sr-only">
          {t("form.email")}
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={t("form.email")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-livales-green-light disabled:opacity-70 sm:rounded-full"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("form.submitting")}
            </>
          ) : (
            <>
              {t("form.submit")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 px-4 text-sm text-destructive">{t("form.error")}</p>
      )}
    </form>
  );
};

export default WaitlistForm;
