import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, Phone, ShieldAlert } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Get Support", description: "Contact EmoEase for community support, questions, programs, and trusted referral pathways." };

const options = [
  { title: "WhatsApp", text: "Send a message when you are ready. You do not need perfect words to begin.", href: "https://wa.me/254116745520", label: "Message on WhatsApp", icon: MessageCircle },
  { title: "Email", text: "Ask a question, enquire about a programme, or reach out in your own time.", href: "mailto:emoease23@gmail.com", label: "emoease23@gmail.com", icon: Mail },
  { title: "Phone", text: "Prefer to speak directly? Call the EmoEase team during available hours.", href: "tel:+254116745520", label: "+254 116 745520", icon: Phone },
];

export default function SupportPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="Get support" title="Start with one honest message." description="Reach out to ask a question, join the community, hear about an event, or say how things have been. EmoEase is here to listen and help you find a next step." />
    <Container className="py-16 sm:py-20"><div className="grid gap-5 md:grid-cols-3">{options.map((option) => { const Icon = option.icon; return <a key={option.title} href={option.href} className="rounded-2xl border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Icon className="h-7 w-7 text-secondary" aria-hidden="true" /><h2 className="mt-5 text-2xl font-bold">{option.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{option.text}</p><span className="mt-6 inline-block font-semibold text-primary">{option.label} -&gt;</span></a>; })}</div>
      <section id="urgent-help" className="mt-12 rounded-3xl border border-red-200 bg-red-50 p-8 sm:p-10"><div className="flex gap-4"><ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-red-700" aria-hidden="true" /><div><p className="text-sm font-bold uppercase tracking-[.14em] text-red-800">If it feels urgent</p><h2 className="mt-2 text-3xl font-bold">Your immediate safety comes first.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">EmoEase is not an emergency service and cannot provide crisis intervention or clinical treatment. If you or someone else may be in immediate danger, contact local emergency services now, go to the nearest hospital, or tell a trusted person who can stay with you.</p><Link href="/get-help-now" className="mt-5 inline-block font-semibold text-red-800 hover:text-red-950">Read urgent-help guidance -&gt;</Link></div></div></section>
    </Container>
  </main></SiteShell>;
}
