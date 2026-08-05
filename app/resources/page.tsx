import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { resourceItems } from "@/lib/site-content";

export const metadata: Metadata = { title: "Resources", description: "Practical mental health resources for men in Kenya: stress, low mood, pressure, relationships, and urgent support." };

export default function ResourcesPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="Resources" title="Clear language for the things that can feel hard to name." description="Start where you are. These topics are here to make conversations about mental health more practical, less isolating, and easier to begin." />
    <Container className="py-16 sm:py-20"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{resourceItems.map((resource) => { const Icon = resource.icon; return <Link key={resource.title} href={resource.href} className="group rounded-2xl border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Icon className="h-7 w-7 text-secondary" aria-hidden="true" /><h2 className="mt-5 text-xl font-bold group-hover:text-primary">{resource.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{resource.description}</p><span className="mt-5 inline-block font-semibold text-primary">Start a conversation →</span></Link>; })}</div>
      <aside className="mt-12 rounded-2xl border border-secondary/25 bg-accent p-7"><h2 className="text-2xl font-bold">These resources are a starting point.</h2><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">They do not replace professional or emergency care. If you are worried about your safety, or someone else’s, contact local emergency services or a trusted person immediately.</p><Link href="/support" className="mt-5 inline-block font-semibold text-primary">Find support options →</Link></aside>
    </Container>
  </main></SiteShell>;
}
