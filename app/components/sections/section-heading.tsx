import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, description, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
      <h2 id={id} className="mt-4 font-display text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}
