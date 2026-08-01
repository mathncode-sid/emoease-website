import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, centered = false, dark = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <p className={cn("text-sm font-semibold uppercase tracking-[0.2em]", dark ? "text-white/65" : "text-secondary")}>{eyebrow}</p>
      <h2 id={id} className={cn("mt-4 font-display text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-foreground")}>
        {title}
      </h2>
      {description ? <p className={cn("mt-4 text-base leading-7 sm:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>{description}</p> : null}
    </div>
  );
}
