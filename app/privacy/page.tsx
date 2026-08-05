import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Privacy Policy", description: "How EmoEase handles information shared through its website and community contact channels." };

const sections = [
  ["Our approach", "EmoEase aims to collect as little personal information as possible. You can browse this website without creating an account, and we do not ask visitors to share mental-health details through a website form."],
  ["Information you choose to share", "When you contact EmoEase by WhatsApp, phone, email, or social platforms, you may choose to share your name, contact details, and the contents of your message. We use this only to respond, provide requested community support, share information you ask for, or connect you with relevant support options."],
  ["How access is limited", "We do not sell personal information. Access to messages is limited to people who need it to respond to your request or run EmoEase safely. Please do not send information you would not be comfortable sharing through a third-party messaging platform."],
  ["Third-party services", "WhatsApp, email, phone providers, and social platforms process messages under their own terms and privacy practices. EmoEase is not responsible for how those platforms handle information once it is sent through their service."],
  ["Retention and deletion", "We aim to keep communications only for as long as they are needed to respond, provide follow-through, maintain safety, or meet applicable obligations. You can ask us to access, correct, or delete the personal information we hold about you by emailing emoease23@gmail.com. We will explain if we cannot complete a request immediately or in full."],
  ["Cookies and website data", "This website is not designed to use advertising or behavioural tracking cookies. Basic technical information may be processed by the hosting provider to deliver and protect the website."],
  ["Changes to this policy", "We may update this policy as EmoEase grows. The latest version will always be posted on this page."],
];

export default function PrivacyPage() { return <SiteShell><main id="main-content"><PageHero eyebrow="Privacy" title="Your trust matters here." description="This page explains, in plain language, how EmoEase handles information you choose to share with us." /><Container className="max-w-4xl py-16 sm:py-20"><p className="text-sm text-muted-foreground">Last updated: August 5, 2026</p><div className="mt-10 space-y-10">{sections.map(([title, text]) => <section key={title}><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 leading-8 text-muted-foreground">{text}</p></section>)}</div></Container></main></SiteShell>; }
