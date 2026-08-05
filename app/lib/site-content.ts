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
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Community", href: "/community" },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/support" },
];

export const heroContent: HeroContent = {
  eyebrow: "A Kenyan community for men's mental health",
  title: "You do not have to carry it alone.",
  description:
    "EmoEase is an online safe space where men can share, unpack, and express themselves freely without judgement. Join a community that listens, learns, and walks with you through real life in Kenya.",
  primaryAction: { label: "Talk to us on WhatsApp", href: "https://wa.me/254116745520" },
  secondaryAction: { label: "Explore our community", href: "#programs" },
  image: {
    src: "/images/emoease-hero.png",
    alt: "EmoEase support circle for men artwork",
  },
  supportNote: "Start with a conversation. You do not need the perfect words, and you do not need to be in crisis to reach out.",
};

export const featureItems: FeatureItem[] = [
  {
    title: "Seen and heard",
    description:
      "A respectful space where men can speak plainly about pressure, identity, grief, relationships, work, and responsibility without judgement.",
    icon: ShieldCheck,
  },
  {
    title: "Small steps that help",
    description:
      "Grounded conversations and practical ideas for stress, low mood, anger, anxiety, burnout, and the everyday habits that keep you steady.",
    icon: BookUser,
  },
  {
    title: "Community that follows through",
    description:
      "Check-ins, webinars, events, and links to caring professionals so support does not end after one conversation.",
    icon: HeartHandshake,
  },
];

export const statisticItems: StatisticItem[] = [
  {
    value: "Free",
    label: "online community space where you can share, learn, and grow together.",
    note: "Open to men in Kenya",
  },
  {
    value: "Weekly",
    label: "prompts, check-ins, and practical conversations to help you pause and reflect.",
    note: "Wellness Wednesday",
  },
  {
    value: "Real",
    label: "conversations about the pressure men face at home, at work, in relationships, and in society.",
    note: "No performance required",
  },
  {
    value: "Kenya",
    label: "rooted in local community, with online and in-person ways to connect when possible.",
    note: "From Nairobi and beyond",
  },
];

export const programItems: ProgramItem[] = [
  {
    title: "Wellness Wednesday",
    description:
      "Regular online prompts and check-ins that make space for men to say how the week is really going, one day at a time.",
    href: "/programs",
    icon: MessageSquareText,
  },
  {
    title: "Webinars and conversations",
    description:
      "Accessible sessions on emotional resilience, masculinity, relationships, pressure, and the issues men are facing on the ground.",
    href: "/programs",
    icon: HeartPulse,
  },
  {
    title: "Mental health walks and events",
    description:
      "In-person gatherings that bring conversation, movement, creativity, education, and community care together.",
    href: "/programs",
    icon: Megaphone,
  },
  {
    title: "Referral and follow-through",
    description:
      "A listening first step, followed by links to caring professionals and other support when a situation needs more help.",
    href: "/find-a-therapist",
    icon: UsersRound,
  },
];

export const resourceItems: ResourceItem[] = [
  {
    title: "Pressure and expectations",
    description: "Conversations about the weight of being a provider, partner, son, father, student, or the person everyone relies on.",
    href: "/resources/pressure-expectations",
    icon: Brain,
  },
  {
    title: "Stress and low mood",
    description: "Practical language for low mood, numbness, fatigue, isolation, irritability, and knowing when to reach out.",
    href: "/resources/stress-low-mood",
    icon: HeartPulse,
  },
  {
    title: "Work, money, and school fees",
    description: "A place to unpack work strain, unemployment, business pressure, family needs, and the costs that keep stacking up.",
    href: "/resources",
    icon: Thermometer,
  },
  {
    title: "Relationships and fatherhood",
    description: "Support for communication, conflict, boundaries, repair, parenting, and showing up with more clarity.",
    href: "/resources/relationships-fatherhood",
    icon: HeartHandshake,
  },
  {
    title: "Finding your people",
    description: "Why community matters, how to start a conversation, and how to keep showing up when life feels heavy.",
    href: "/resources",
    icon: CircleUserRound,
  },
  {
    title: "When it feels urgent",
    description: "A clear reminder of when to contact a trusted person, caring professional, or emergency service immediately.",
    href: "/resources/when-it-feels-urgent",
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
  eyebrow: "Start with a conversation",
  title: "Uko safe kuongea hapa.",
  description:
    "Whether you are in Nairobi or elsewhere in Kenya, you can reach out to ask a question, join the community, learn about an upcoming webinar or event, or simply say how things have been.",
  primaryAction: { label: "Message us on WhatsApp", href: "https://wa.me/254116745520" },
  secondaryAction: { label: "Email EmoEase", href: "mailto:emoease23@gmail.com" },
  supportNote: "We listen without judgement. EmoEase is a community and referral space, not a replacement for emergency care or licensed clinical treatment. If someone is in immediate danger, contact local emergency services now.",
};

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Community", href: "/community" },
      { label: "Events", href: "/events" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Anxiety", href: "/resources" },
      { label: "Depression", href: "/resources" },
      { label: "Stress", href: "/resources" },
      { label: "Workplace Mental Health", href: "/resources" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "emoease23@gmail.com", href: "mailto:emoease23@gmail.com" },
      { label: "+254 116 745520", href: "tel:+254116745520" },
      { label: "Find a therapist", href: "/find-a-therapist" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/emoea.se" },
  { label: "TikTok", href: "https://www.tiktok.com/@emoease" },
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
