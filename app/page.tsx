import { SiteShell } from "@/components/layout/site-shell";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyEmoEaseSection } from "@/components/sections/why-emoease-section";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import { ResourcesSection } from "@/components/sections/resources-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import {
  ctaContent,
  featureItems,
  heroContent,
  newsletterCopy,
  programItems,
  resourceItems,
  statisticItems,
  testimonialItems,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <HeroSection content={heroContent} />
        <WhyEmoEaseSection items={featureItems} />
        <StatisticsSection items={statisticItems} />
        <ProgramsSection items={programItems} />
        <ResourcesSection items={resourceItems} />
        <NewsletterSection {...newsletterCopy} />
        <TestimonialsSection items={testimonialItems} />
        <CtaSection content={ctaContent} />
      </main>
    </SiteShell>
  );
}
