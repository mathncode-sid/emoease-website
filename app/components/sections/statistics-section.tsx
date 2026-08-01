import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatisticCard } from "@/components/sections/statistic-card";
import type { StatisticItem } from "@/types/landing";

type StatisticsSectionProps = {
  items: StatisticItem[];
};

export function StatisticsSection({ items }: StatisticsSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="statistics-heading"
          eyebrow="Why this matters"
          title="Men's mental health needs earlier, easier doors into support."
          description="The data points to a serious gap: many men are in pain, but fewer reach care early. EmoEase exists to make that first step feel human, practical, and close."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <StatisticCard
              key={item.label}
              value={item.value}
              label={item.label}
              note={item.note}
              sourceHref={item.sourceHref}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
