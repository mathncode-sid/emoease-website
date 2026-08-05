import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { programItems } from "@/lib/site-content";

export const metadata: Metadata = { title: "Programs", description: "Explore EmoEase community programs, check-ins, webinars, events, and support pathways." };

export default function ProgramsPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="Programs and community" title="Ways to show up, connect, and keep going." description="Our programs create low-pressure chances to reflect, learn, move, and find people who understand the weight you are carrying." />
    <Container className="py-16 sm:py-20"><div className="grid gap-5 md:grid-cols-2">{programItems.map((program) => { const Icon = program.icon; return <article key={program.title} className="flex flex-col rounded-2xl border bg-card p-7 shadow-soft"><Icon className="h-7 w-7 text-secondary" aria-hidden="true" /><h2 className="mt-5 text-2xl font-bold">{program.title}</h2><p className="mt-3 flex-1 leading-7 text-muted-foreground">{program.description}</p><Link href="/support" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80">Ask how to join <ArrowRight className="h-4 w-4" /></Link></article>; })}</div>
      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10"><p className="text-sm font-bold uppercase tracking-[.15em] text-primary-foreground/75">Upcoming activity</p><h2 className="mt-3 text-3xl font-bold">Want to hear about the next session or event?</h2><p className="mt-3 max-w-2xl leading-7 text-primary-foreground/85">Send us a WhatsApp message or email. We will share the current schedule and the best way to take part.</p><Button asChild variant="secondary" className="mt-6"><Link href="/support">Get programme updates</Link></Button></section>
    </Container>
  </main></SiteShell>;
}
