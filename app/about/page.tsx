import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "About", description: "Learn about EmoEase and its approach to community-based support for men in Kenya." };

const principles = [
  ["Dignity first", "Men deserve to be listened to without being shamed, rushed, or asked to perform strength."],
  ["Practical support", "We make room for honest conversation alongside useful next steps, tools, and trusted referrals."],
  ["Community matters", "Connection, accountability, and showing up for one another can make a meaningful difference."],
];

export default function AboutPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="About EmoEase" title="A place to speak honestly and be met with care." description="EmoEase is a Kenyan community supporting men’s mental health through conversation, education, peer connection, and pathways to further help." />
    <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
      <div className="space-y-6 text-base leading-8 text-muted-foreground">
        <h2 className="text-3xl font-bold leading-tight text-foreground">Why we exist</h2>
        <p>Many men carry pressure quietly: from work, money, family, relationships, loss, and expectations around masculinity. EmoEase creates a gentler starting point for saying what is happening.</p>
        <p>We are a community and referral space, not a replacement for emergency services or licensed clinical treatment. When someone needs more specialised support, we help point them toward appropriate care.</p>
        <Button asChild><Link href="/support">Talk to us</Link></Button>
      </div>
      <div className="space-y-4">{principles.map(([title, text]) => <article key={title} className="rounded-2xl border bg-card p-6 shadow-soft"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}</div>
    </Container>
  </main></SiteShell>;
}
