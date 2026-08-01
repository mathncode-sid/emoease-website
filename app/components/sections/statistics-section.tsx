import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatisticCard } from "@/components/sections/statistic-card";
import type { StatisticItem } from "@/types/landing";

type StatisticsSectionProps = {
  items: StatisticItem[];
};

export function StatisticsSection({ items }: StatisticsSectionProps) {
  return (
    <section className="bg-foreground py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          id="statistics-heading"
          eyebrow="Why this matters"
          title="Men's mental health needs earlier, easier doors into support."
          description="EmoEase is building a support culture that feels human, practical, and close to everyday life in Kenya."
          dark
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <StatisticCard
              key={item.label}
              value={item.value}
              label={item.label}
              note={item.note}
              sourceHref={item.sourceHref}
              dark
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
