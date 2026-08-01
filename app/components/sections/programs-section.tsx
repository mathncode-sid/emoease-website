import { Container } from "@/components/layout/container";
import { ProgramCard } from "@/components/sections/program-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { ProgramItem } from "@/types/landing";

type ProgramsSectionProps = {
  items: ProgramItem[];
};

export function ProgramsSection({ items }: ProgramsSectionProps) {
  return (
    <section id="programs" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="programs-heading"
          eyebrow="Programs"
          title="Programs that build trust, skill, and connection."
          description="Each program is shaped around real experiences, from peer connection to community education and outreach."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <ProgramCard key={item.title} icon={item.icon} title={item.title} description={item.description} href={item.href} />
          ))}
        </div>
      </Container>
    </section>
  );
}