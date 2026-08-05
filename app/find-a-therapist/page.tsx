import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, CircleHelp, ShieldAlert, UserRoundSearch } from "lucide-react";

import { ReferralRequestForm } from "@/components/forms/referral-request-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Find a Therapist", description: "Ask EmoEase for help finding a suitable mental-health professional or support service." };

export default function FindATherapistPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="Professional support" title="Finding the right support should feel less overwhelming." description="Tell us a little about the practical support you are looking for, and EmoEase can share possible referral options. You do not need to have all the answers before reaching out." />
    <Container className="py-16 sm:py-20"><section className="rounded-3xl border border-secondary/25 bg-accent p-7 sm:p-9"><div className="flex gap-4"><ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-secondary" aria-hidden="true" /><div><h2 className="text-2xl font-bold">This is not an emergency service</h2><p className="mt-2 max-w-3xl leading-7 text-muted-foreground">If you or someone else may be in immediate danger, contact local emergency services, go to the nearest hospital, or ask a trusted person to stay with you. Do not wait for a referral response.</p><Link href="/get-help-now" className="mt-4 inline-block font-semibold text-primary">Get urgent-help guidance -&gt;</Link></div></div></section>
      <div className="mt-14 grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20"><div><h2 className="text-3xl font-bold">How referrals work</h2><div className="mt-7 space-y-7">{[[UserRoundSearch, "1. Tell us your preferences", "Share only practical details such as your location, whether online support works, and the kind of support you are seeking."], [BadgeCheck, "2. We share possible options", "The EmoEase team can point you toward relevant professionals or services as available. You decide what feels right."], [CircleHelp, "3. You choose the next step", "Contact a provider directly, ask questions about fit and cost, and decide whether you would like to book with them."]].map(([Icon, title, text]) => { const ItemIcon = Icon as typeof UserRoundSearch; return <article key={title as string} className="flex gap-4"><ItemIcon className="mt-1 h-6 w-6 shrink-0 text-secondary" aria-hidden="true" /><div><h3 className="text-xl font-bold">{title as string}</h3><p className="mt-2 leading-7 text-muted-foreground">{text as string}</p></div></article>; })}</div>
        <p className="mt-10 rounded-2xl border bg-muted/50 p-5 text-sm leading-6 text-muted-foreground">The public therapist directory is being built carefully. EmoEase will only publish providers after its verification process is ready; this referral request is the safer first path.</p></div>
        <ReferralRequestForm />
      </div>
    </Container>
  </main></SiteShell>;
}
