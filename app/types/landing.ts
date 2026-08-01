import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
};

export type ActionLink = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StatisticItem = {
  value: string;
  label: string;
  note: string;
  sourceHref?: string;
};

export type ProgramItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ResourceItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  context: string;
  label: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavigationItem[];
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: ActionLink;
  secondaryAction: ActionLink;
  image: {
    src: string;
    alt: string;
  };
  supportNote: string;
};

export type CtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: ActionLink;
  secondaryAction: ActionLink;
  supportNote: string;
};
