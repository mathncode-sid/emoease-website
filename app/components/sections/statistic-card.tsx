import { cn } from "@/lib/cn";

type StatisticCardProps = {
  value: string;
  label: string;
  note: string;
  sourceHref?: string;
  className?: string;
};

export function StatisticCard({ value, label, note, sourceHref, className }: StatisticCardProps) {
  return (
    <article className={cn("rounded-[var(--radius)] border border-border/70 bg-white p-6 shadow-soft", className)}>
      <p className="text-4xl font-semibold leading-none text-primary sm:text-5xl">{value}</p>
      <p className="mt-4 text-sm leading-7 text-foreground sm:text-base">{label}</p>
      {sourceHref ? (
        <a
          href={sourceHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {note}
        </a>
      ) : (
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{note}</p>
      )}
    </article>
  );
}
