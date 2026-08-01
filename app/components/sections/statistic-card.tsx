import { cn } from "@/lib/cn";

type StatisticCardProps = {
  value: string;
  label: string;
  note: string;
  sourceHref?: string;
  className?: string;
  dark?: boolean;
};

export function StatisticCard({ value, label, note, sourceHref, className, dark = false }: StatisticCardProps) {
  return (
    <article className={cn("border-t p-5 pt-6 sm:p-6 sm:pt-7", dark ? "border-white/20" : "border-border/70", className)}>
      <p className={cn("font-display text-4xl font-semibold leading-none sm:text-5xl", dark ? "text-[#e8f0ed]" : "text-primary")}>{value}</p>
      <p className={cn("mt-4 text-sm leading-7 sm:text-base", dark ? "text-white/80" : "text-foreground")}>{label}</p>
      {sourceHref ? (
        <a
          href={sourceHref}
          target="_blank"
          rel="noreferrer"
          className={cn("mt-4 inline-flex text-xs font-medium uppercase tracking-[0.18em] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", dark ? "text-white/50 hover:text-white" : "text-muted-foreground")}
        >
          {note}
        </a>
      ) : (
        <p className={cn("mt-4 text-xs font-medium uppercase tracking-[0.18em]", dark ? "text-white/50" : "text-muted-foreground")}>{note}</p>
      )}
    </article>
  );
}
