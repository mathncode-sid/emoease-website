import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using the EmoEase website and contacting the EmoEase community." };

const sections = [
  ["Purpose of EmoEase", "EmoEase provides community connection, education, practical resources, and referral pathways for men's mental health. Our website and communication channels are for general information and support; they are not medical, legal, or therapeutic advice."],
  ["Not emergency or clinical care", "EmoEase does not provide emergency response, diagnosis, or treatment. If there is immediate danger or a serious concern for your safety or another person's safety, contact local emergency services, go to the nearest hospital, or seek help from a qualified professional immediately."],
  ["Community respect", "Please engage with EmoEase staff and community members respectfully. Harassment, threats, discrimination, exploitation, or sharing another person's private information without permission are not acceptable."],
  ["External links and referrals", "We may share links or referrals to other organisations and professionals. These are possible next steps, not guarantees or endorsements. Please make your own informed decision about whether a service is right for you."],
  ["Contact", "For questions about these terms, contact us at emoease23@gmail.com."],
];

export default function TermsPage() { return <SiteShell><main id="main-content"><PageHero eyebrow="Terms of use" title="Using EmoEase with clarity and care." description="These terms set out what EmoEase offers and the expectations that help keep our community spaces safer for everyone." /><Container className="max-w-4xl py-16 sm:py-20"><p className="text-sm text-muted-foreground">Last updated: August 5, 2026</p><div className="mt-10 space-y-10">{sections.map(([title, text]) => <section key={title}><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 leading-8 text-muted-foreground">{text}</p></section>)}</div></Container></main></SiteShell>; }
