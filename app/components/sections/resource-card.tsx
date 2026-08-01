import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/cn";

type ResourceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
};

export function ResourceCard({ icon: Icon, title, description, href, className }: ResourceCardProps) {
  return (
    <article className={cn("rounded-[var(--radius)] border border-border/70 bg-white p-6 shadow-soft", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Learn more
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}