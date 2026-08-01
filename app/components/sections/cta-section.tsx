"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { CtaContent } from "@/types/landing";

type CtaSectionProps = {
  content: CtaContent;
};

export function CtaSection({ content }: CtaSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="support" className="bg-[#e8f0ed] py-20 sm:py-24 lg:py-32">
      <Container>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="border-y border-foreground/20 py-2 sm:py-4"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{content.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">{content.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <Link href={content.primaryAction.href}>{content.primaryAction.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={content.secondaryAction.href}>{content.secondaryAction.label}</Link>
              </Button>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-foreground/80">{content.supportNote}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
