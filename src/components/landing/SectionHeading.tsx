import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ eyebrow, title, className, align = "left" }: SectionHeadingProps) => (
  <div className={cn("reveal", align === "center" && "mx-auto text-center", className)}>
    <span className="eyebrow">
      <span className="h-px w-6 bg-primary/60" />
      {eyebrow}
    </span>
    <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-foreground sm:text-4xl lg:text-[44px]">
      {title}
    </h2>
  </div>
);

export default SectionHeading;
