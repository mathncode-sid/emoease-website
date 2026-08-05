export type EventListing = {
  title: string;
  format: string;
  timing: string;
  description: string;
  status: "upcoming" | "schedule-soon";
};

// This is the single source for launch content. It can be replaced by a WordPress
// or other CMS adapter once EmoEase chooses and configures its editorial platform.
export const eventListings: EventListing[] = [
  {
    title: "Wellness Wednesday",
    format: "Online community check-in",
    timing: "Schedule announced by EmoEase",
    description: "A regular space to pause, reflect on the week, and speak honestly without needing to have everything figured out.",
    status: "schedule-soon",
  },
  {
    title: "Community walks and conversations",
    format: "In-person gathering",
    timing: "Schedule announced by EmoEase",
    description: "A chance to connect through movement, conversation, and practical mental-health learning in community.",
    status: "schedule-soon",
  },
];
