import { Container } from "@/components/layout/container";
import { ResourceCard } from "@/components/sections/resource-card";
import { SectionHeading } from "@/components/sections/section-heading";
import type { ResourceItem } from "@/types/landing";

type ResourcesSectionProps = {
  items: ResourceItem[];
};

export function ResourcesSection({ items }: ResourcesSectionProps) {
  return (
    <section id="resources" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          id="resources-heading"
          eyebrow="Resource categories"
          title="Start with the concern that feels closest today."
          description="Each category offers a calm entry point so visitors can move from stress to something more concrete."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ResourceCard key={item.title} icon={item.icon} title={item.title} description={item.description} href={item.href} />
          ))}
        </div>
      </Container>
    </section>
  );
}