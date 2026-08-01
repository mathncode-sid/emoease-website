import { Quote } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  context: string;
  label: string;
};

export function TestimonialCard({ quote, name, context, label }: TestimonialCardProps) {
  return (
    <article className="rounded-[var(--radius)] border border-border/70 bg-white p-6 shadow-soft">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Quote className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-5 text-base leading-7 text-foreground sm:text-lg">&quot;{quote}&quot;</p>
      <div className="mt-6 border-t border-border/70 pt-5">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{context}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      </div>
    </article>
  );
}
