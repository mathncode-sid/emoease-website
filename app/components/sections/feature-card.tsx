import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <article
      className={cn(
        "rounded-[var(--radius)] border border-border/70 bg-card p-6 shadow-soft transition-transform duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </article>
  );
}