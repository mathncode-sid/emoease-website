"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/types/landing";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? { initial: false, animate: false }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
      };

  return (
    <section className="pt-8 sm:pt-10 lg:pt-14">
      <Container className="grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20">
        <motion.div {...motionProps} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{content.eyebrow}</p>
          <h1 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">{content.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link href={content.primaryAction.href}>{content.primaryAction.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={content.secondaryAction.href}>{content.secondaryAction.label}</Link>
            </Button>
          </div>

          <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">{content.supportNote}</p>
        </motion.div>

        <motion.figure
          {...motionProps}
            transition={reduceMotion ? undefined : { duration: 0.8, delay: 0.08 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-white p-3 shadow-soft">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <p className="text-sm font-semibold text-foreground">A calmer path forward</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Trusted support, clear resources, and community grounded in dignity.
              </p>
            </div>
          </div>
        </motion.figure>
      </Container>
    </section>
  );
}
