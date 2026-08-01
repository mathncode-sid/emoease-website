import { Quote } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  name: string;
  context: string;
  label: string;
};

export function TestimonialCard({ quote, name, context, label }: TestimonialCardProps) {
  return (
    <article className="border-t-2 border-primary/70 pt-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Quote className="h-5 w-5" aria-hidden="true" />
      </div>
      <p className="mt-5 font-display text-2xl leading-[1.15] text-foreground sm:text-3xl">&quot;{quote}&quot;</p>
      <div className="mt-6 border-t border-border/70 pt-5">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{context}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      </div>
    </article>
  );
}
