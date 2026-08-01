import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import type { TestimonialItem } from "@/types/landing";

type TestimonialsSectionProps = {
  items: TestimonialItem[];
};

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Our approach"
          title="What men should feel when they meet EmoEase."
          description="These are the commitments behind every check-in, webinar, event, and conversation in the EmoEase community."
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
