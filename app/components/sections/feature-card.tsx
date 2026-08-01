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
        "border-b border-foreground/15 px-0 py-7 transition-colors duration-200 hover:bg-white/35 md:border-b-0 md:border-r md:px-7 first:md:pl-0 last:md:border-r-0 last:md:pr-0",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-[#e8f0ed]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </article>
  );
}
