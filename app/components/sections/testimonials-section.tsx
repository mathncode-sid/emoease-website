import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import type { TestimonialItem } from "@/types/landing";

type TestimonialsSectionProps = {
  items: TestimonialItem[];
};

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Our approach"
          title="What men should feel when they meet EmoEase."
          description="Before stories and impact reports are published, the landing page should still be clear about the standard of care EmoEase is building toward."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard
              key={item.quote}
              quote={item.quote}
              name={item.name}
              context={item.context}
              label={item.label}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
