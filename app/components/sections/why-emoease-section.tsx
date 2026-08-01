import { Container } from "@/components/layout/container";
import { FeatureCard } from "@/components/sections/feature-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { FeatureItem } from "@/types/landing";

type WhyEmoEaseSectionProps = {
  items: FeatureItem[];
};

export function WhyEmoEaseSection({ items }: WhyEmoEaseSectionProps) {
  return (
    <section id="why-emoease" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="why-emoease-heading"
          eyebrow="Why EmoEase"
          title="A place where men can be honest without feeling small."
          description="EmoEase is built around brotherhood, practical support, and the idea that strength includes speaking up when the load gets heavy."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <FeatureCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </Container>
    </section>
  );
}