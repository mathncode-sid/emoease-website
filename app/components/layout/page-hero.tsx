import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-border/70 bg-accent/40 py-16 sm:py-20 lg:py-24">
      <Container className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">{eyebrow}</p>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
        {children}
      </Container>
    </section>
  );
}
