import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SiteShell } from "@/components/layout/site-shell";
import { eventListings } from "@/lib/content";

export const metadata: Metadata = { title: "Events", description: "Upcoming EmoEase community conversations, wellness sessions, and in-person events." };

export default function EventsPage() {
  return <SiteShell><main id="main-content">
    <PageHero eyebrow="Events" title="Make room for a conversation that matters." description="Join online check-ins, webinars, walks, and community conversations. Dates are shared once each session is confirmed." />
    <Container className="py-16 sm:py-20"><div className="grid gap-5 md:grid-cols-2">{eventListings.map((event) => <article key={event.title} className="rounded-2xl border bg-card p-7 shadow-soft"><span className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">Schedule coming soon</span><h2 className="mt-5 text-2xl font-bold">{event.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{event.description}</p><dl className="mt-6 space-y-3 text-sm text-muted-foreground"><div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-secondary" aria-hidden="true" /><dt className="sr-only">Format</dt><dd>{event.format}</dd></div><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-secondary" aria-hidden="true" /><dt className="sr-only">Timing</dt><dd>{event.timing}</dd></div><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" aria-hidden="true" /><dt className="sr-only">Location</dt><dd>Online or location announced with the event</dd></div></dl></article>)}</div>
      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10"><h2 className="text-3xl font-bold">Want the next event in your inbox?</h2><p className="mt-3 max-w-2xl leading-7 text-primary-foreground/85">Subscribe to the newsletter for announcements, or message us to ask about the next session.</p><div className="mt-6 flex flex-wrap gap-4"><Link href="/#newsletter" className="rounded-xl bg-white px-5 py-3 font-semibold text-primary hover:bg-white/90">Subscribe for updates</Link><Link href="/support" className="rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10">Ask about events</Link></div></section>
    </Container>
  </main></SiteShell>;
}
