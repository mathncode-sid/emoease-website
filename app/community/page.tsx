import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Community", description: "Join the EmoEase community for honest conversations, practical support, and respectful connection." };

const expectations = ["Speak with respect and protect one another's privacy.", "Share only what feels safe; listening is participation too.", "Use urgent medical services first when someone may be in immediate danger."];

export default function CommunityPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="The EmoEase community" title="Connection without the pressure to pretend." description="A moderated space for men to speak honestly, learn practical tools, and find people who understand. You do not need a website account to begin." />
    <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
      <section><h2 className="text-3xl font-bold">How to join</h2><ol className="mt-7 space-y-6">{[["1", "Send a message", "Tell us you would like to join or learn more. There is no need to explain everything at once."], ["2", "Get the right next step", "The EmoEase team will share the current community option, upcoming sessions, and any joining details."], ["3", "Show up in your own way", "Listen, ask a question, or share when you are ready. Respect and confidentiality matter."]].map(([number, title, text]) => <li key={number} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">{number}</span><div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div></li>)}</ol>
        <a href="https://wa.me/254116745520?text=Hi%20EmoEase%2C%20I%20would%20like%20to%20learn%20about%20joining%20the%20community." className="mt-9 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90"><MessageCircle className="h-5 w-5" aria-hidden="true" />Ask to join on WhatsApp</a>
      </section>
      <aside className="rounded-3xl bg-accent p-7 sm:p-9"><UsersRound className="h-8 w-8 text-secondary" aria-hidden="true" /><h2 className="mt-5 text-3xl font-bold">What holds the space together</h2><div className="mt-6 space-y-5">{expectations.map((expectation) => <p key={expectation} className="flex gap-3 leading-7 text-muted-foreground"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />{expectation}</p>)}</div><div className="mt-8 border-t border-secondary/20 pt-6"><ShieldCheck className="h-6 w-6 text-secondary" aria-hidden="true" /><p className="mt-3 leading-7 text-muted-foreground">EmoEase is a community and referral space, not an emergency or clinical service. <a href="/get-help-now" className="font-semibold text-primary">Get urgent-help guidance.</a></p></div></aside>
    </Container>
  </main></SiteShell>;
}
