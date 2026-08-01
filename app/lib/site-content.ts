import {
  Brain,
  BookUser,
  CircleUserRound,
  HeartHandshake,
  HeartPulse,
  Megaphone,
  MessageSquareText,
  BriefcaseBusiness,
  ShieldCheck,
  Thermometer,
  UsersRound,
} from "lucide-react";

import type {
  CtaContent,
  FeatureItem,
  FooterLinkGroup,
  HeroContent,
  NavigationItem,
  ProgramItem,
  ResourceItem,
  StatisticItem,
  TestimonialItem,
} from "@/types/landing";

export const navigationItems: NavigationItem[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#why-emoease" },
  { label: "Programs", href: "#programs" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#support" },
];

export const heroContent: HeroContent = {
  eyebrow: "Men's mental health, without the performance",
  title: "Support circle for men",
  description:
    "EmoEase helps men talk honestly, find practical mental health resources, and stay connected to people who understand the pressure of carrying too much alone.",
  primaryAction: { label: "Get Support", href: "#support" },
  secondaryAction: { label: "Explore Programs", href: "#programs" },
  image: {
    src: "/images/emoease-hero.png",
    alt: "EmoEase support circle for men artwork",
  },
  supportNote: "Start with a conversation, a resource, or a community circle. No pressure to have the right words.",
};

export const featureItems: FeatureItem[] = [
  {
    title: "Brotherhood",
    description:
      "Support spaces where men can speak plainly about pressure, identity, grief, relationships, work, and responsibility.",
    icon: ShieldCheck,
  },
  {
    title: "Practical Tools",
    description:
      "Clear guidance for stress, low mood, anger, anxiety, burnout, and the everyday habits that keep men grounded.",
    icon: BookUser,
  },
  {
    title: "Steady Support",
    description:
      "Peer circles, workshops, and outreach designed to keep support close before a difficult week becomes a crisis.",
    icon: HeartHandshake,
  },
];

export const statisticItems: StatisticItem[] = [
  {
    value: "4x",
    label: "higher suicide rate among males than females in the United States in 2024.",
    note: "Source: CDC suicide data",
    sourceHref: "https://www.cdc.gov/suicide/data/index.html",
  },
  {
    value: "727k",
    label: "people die by suicide globally each year, with many more suicide attempts affecting families and communities.",
    note: "Source: WHO suicide fact sheet",
    sourceHref: "https://www.who.int/news-room/fact-sheets/detail/suicide",
  },
  {
    value: "17.8%",
    label: "of U.S. men ages 18-44 received mental health treatment in 2021, compared with 28.6% of women.",
    note: "Source: CDC NCHS data brief",
    sourceHref: "https://www.cdc.gov/nchs/products/databriefs/db444.htm",
  },
  {
    value: "Men",
    label: "can experience depression, anxiety, PTSD, substance use, ADHD, and other mental health conditions, even when symptoms look different.",
    note: "Source: NIMH men's mental health",
    sourceHref: "https://www.nimh.nih.gov/health/topics/men-and-mental-health",
  },
];

export const programItems: ProgramItem[] = [
  {
    title: "Peer Support Circles",
    description:
      "Small, guided conversations where men can talk straight, listen well, and leave with a clearer next step.",
    href: "#support",
    icon: MessageSquareText,
  },
  {
    title: "Wellness Workshops",
    description:
      "Practical sessions on stress, emotional regulation, communication, relationships, money pressure, and habits that hold up in real life.",
    href: "#support",
    icon: HeartPulse,
  },
  {
    title: "Awareness Campaigns",
    description:
      "Community campaigns that make it normal for men to talk about pressure, pain, and help-seeking before things get worse.",
    href: "#support",
    icon: Megaphone,
  },
  {
    title: "Community Outreach",
    description:
      "Partnerships with workplaces, campuses, faith groups, and local communities that want men to stay connected and supported.",
    href: "#support",
    icon: UsersRound,
  },
];

export const resourceItems: ResourceItem[] = [
  {
    title: "Anxiety",
    description: "Grounding techniques, warning signs, and ways to steady yourself when worry, fear, or panic rises.",
    href: "#support",
    icon: Brain,
  },
  {
    title: "Depression",
    description: "Guidance for recognizing low mood, numbness, fatigue, isolation, irritability, and when it is time to reach out.",
    href: "#support",
    icon: HeartPulse,
  },
  {
    title: "Stress",
    description: "Tools for work strain, overload, family pressure, money stress, and the load that keeps stacking up.",
    href: "#support",
    icon: Thermometer,
  },
  {
    title: "Relationships",
    description: "Support for communication, conflict, boundaries, repair, and showing up with more clarity.",
    href: "#support",
    icon: HeartHandshake,
  },
  {
    title: "Fatherhood",
    description: "Resources for men navigating identity, responsibility, emotional presence, and care at home.",
    href: "#support",
    icon: CircleUserRound,
  },
  {
    title: "Workplace Mental Health",
    description: "Practical support for burnout, leadership pressure, workplace conflict, and staying grounded at work.",
    href: "#support",
    icon: BriefcaseBusiness,
  },
];

export const testimonialItems: TestimonialItem[] = [
  {
    quote:
      "Speak with honesty. We build spaces where men can name what is really happening without being shamed, rushed, or dismissed.",
    name: "Dignity first",
    context: "Every support path should respect the person in front of it.",
    label: "What to expect",
  },
  {
    quote:
      "Use practical tools. We focus on clear next steps: who to contact, what to try today, and when a concern needs professional help.",
    name: "Clarity over jargon",
    context: "Support should feel usable in the middle of a real week.",
    label: "What to expect",
  },
  {
    quote:
      "Stay connected. Healing is easier when men have community, accountability, and a reason to keep showing up.",
    name: "Community care",
    context: "EmoEase is a bridge to conversation, resources, and ongoing support.",
    label: "What to expect",
  },
];

export const ctaContent: CtaContent = {
  eyebrow: "Take the next step",
  title: "You do not have to muscle through it alone.",
  description:
    "Reach out to EmoEase, ask about a support circle, invite us to your community, or begin with the resource category that matches what you are facing today.",
  primaryAction: { label: "Email EmoEase", href: "mailto:emoease23@gmail.com" },
  secondaryAction: { label: "Call EmoEase", href: "tel:+25416745520" },
  supportNote: "If someone may be in immediate danger, contact local emergency services right away. EmoEase does not replace emergency care or licensed clinical treatment.",
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#top" },
      { label: "About", href: "#why-emoease" },
      { label: "Programs", href: "#programs" },
      { label: "Resources", href: "#resources" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Anxiety", href: "#resources" },
      { label: "Depression", href: "#resources" },
      { label: "Stress", href: "#resources" },
      { label: "Workplace Mental Health", href: "#resources" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "emoease23@gmail.com", href: "mailto:emoease23@gmail.com" },
      { label: "+254 167 45520", href: "tel:+25416745520" },
      { label: "Support section", href: "#support" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/emoea.se" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/emo-ease-10981637b/" },
  { label: "YouTube", href: "https://www.youtube.com/@EmoEase-23" },
];

export const footerUtilityLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const newsletterCopy = {
  eyebrow: "Newsletter",
  title: "Stay connected to practical support and community updates.",
  description:
    "Get a straightforward monthly email with new resources, community announcements, and ideas you can use right away.",
};
