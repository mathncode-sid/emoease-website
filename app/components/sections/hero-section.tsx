"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/types/landing";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const titleWords = content.title.split(" ");

  const motionProps = reduceMotion
    ? { initial: false, animate: false }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7 },
      };

  return (
    <section className="relative isolate min-h-[calc(100svh-88px)] overflow-hidden bg-foreground text-white">
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-foreground/65" />

      <Container className="relative flex min-h-[calc(100svh-88px)] items-center py-20 sm:py-24 lg:py-28">
        <motion.div {...motionProps} className="max-w-3xl">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
            {content.eyebrow}
          </p>
          <motion.h1
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? undefined : "visible"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
            }}
            aria-label={content.title}
            className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[0.94] text-white sm:text-7xl lg:text-8xl"
          >
            {titleWords.map((word) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 26, rotate: 3 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                className="mr-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/85 sm:text-lg sm:leading-9">
            {content.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90">
              <Link href={content.primaryAction.href} target={content.primaryAction.href.startsWith("http") ? "_blank" : undefined} rel={content.primaryAction.href.startsWith("http") ? "noreferrer" : undefined}>
                {content.primaryAction.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href={content.secondaryAction.href}>{content.secondaryAction.label}</Link>
            </Button>
          </div>

          <p className="mt-7 max-w-xl text-sm leading-7 text-white/70">{content.supportNote}</p>
        </motion.div>
      </Container>

      <div className="absolute bottom-6 left-0 right-0 hidden sm:block">
        <Container className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
          <span>Listen. Reflect. Heal.</span>
          <span>EmoEase Kenya</span>
        </Container>
      </div>
    </section>
  );
}
