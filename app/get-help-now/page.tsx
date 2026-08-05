import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Hospital, PhoneCall, ShieldAlert } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Get Help Now", description: "Immediate safety guidance and support options from EmoEase." };

export default function GetHelpNowPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="Urgent support" title="If it feels urgent, take the next safe step now." description="EmoEase is a community and referral space, not an emergency or clinical service. If you are in immediate danger, use emergency medical help first." />
    <Container className="max-w-5xl py-16 sm:py-20">
      <section className="rounded-3xl border border-red-200 bg-red-50 p-7 sm:p-10"><div className="flex gap-4"><ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-red-700" aria-hidden="true" /><div><h2 className="text-3xl font-bold">If there is immediate danger</h2><p className="mt-4 max-w-3xl leading-8 text-muted-foreground">Contact local emergency services now, go to the nearest hospital, or ask a trusted person to stay with you while you get help. Do not wait for a reply from EmoEase.</p></div></div></section>
      <section className="mt-10"><h2 className="text-3xl font-bold">Three things you can do right now</h2><div className="mt-6 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border bg-card p-6 shadow-soft"><PhoneCall className="h-7 w-7 text-secondary" aria-hidden="true" /><h3 className="mt-5 text-xl font-bold">Tell someone</h3><p className="mt-3 leading-7 text-muted-foreground">Call or sit with someone you trust. You can simply say: &quot;I do not feel safe being alone right now.&quot;</p></article>
        <article className="rounded-2xl border bg-card p-6 shadow-soft"><Hospital className="h-7 w-7 text-secondary" aria-hidden="true" /><h3 className="mt-5 text-xl font-bold">Get in-person help</h3><p className="mt-3 leading-7 text-muted-foreground">If safety is at risk, go to the nearest hospital or emergency service as soon as you can.</p></article>
        <article className="rounded-2xl border bg-card p-6 shadow-soft"><HeartHandshake className="h-7 w-7 text-secondary" aria-hidden="true" /><h3 className="mt-5 text-xl font-bold">Reach EmoEase</h3><p className="mt-3 leading-7 text-muted-foreground">When it is safe, contact us for community support and referral options. We will not replace emergency care.</p><Link href="/support" className="mt-5 inline-block font-semibold text-primary">Contact EmoEase -&gt;</Link></article>
      </div></section>
      <p className="mt-12 border-t pt-6 text-sm leading-7 text-muted-foreground">If you are supporting someone else, focus on staying with them or helping them reach emergency medical care. EmoEase cannot provide emergency intervention through this website.</p>
    </Container>
  </main></SiteShell>;
}
