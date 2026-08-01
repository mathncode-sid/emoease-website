import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { WhyEmoEaseSection } from "@/components/sections/why-emoease-section";
import { StatisticsSection } from "@/components/sections/statistics-section";
import { ProgramsSection } from "@/components/sections/programs-section";
import { ResourcesSection } from "@/components/sections/resources-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import {
  ctaContent,
  featureItems,
  footerLinkGroups,
  footerUtilityLinks,
  heroContent,
  navigationItems,
  programItems,
  resourceItems,
  socialLinks,
  statisticItems,
  testimonialItems,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <>
      <Navbar items={navigationItems} supportHref={heroContent.primaryAction.href} />
      <main id="main-content">
        <HeroSection content={heroContent} />
        <WhyEmoEaseSection items={featureItems} />
        <StatisticsSection items={statisticItems} />
        <ProgramsSection items={programItems} />
        <ResourcesSection items={resourceItems} />
        <TestimonialsSection items={testimonialItems} />
        <CtaSection content={ctaContent} />
      </main>
      <Footer linkGroups={footerLinkGroups} socialLinks={socialLinks} utilityLinks={footerUtilityLinks} />
    </>
  );
}
