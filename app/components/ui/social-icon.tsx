type SocialIconProps = {
  label: string;
  className?: string;
};

export function SocialIcon({ label, className = "h-5 w-5" }: SocialIconProps) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (label === "Instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>;
  if (label === "YouTube") return <svg {...common}><path d="M21.4 7.1a2.8 2.8 0 0 0-2-2C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.4.5a2.8 2.8 0 0 0-2 2C2.1 8.8 2.1 12 2.1 12s0 3.2.5 4.9a2.8 2.8 0 0 0 2 2c1.7.5 7.4.5 7.4.5s5.7 0 7.4-.5a2.8 2.8 0 0 0 2-2c.5-1.7.5-4.9.5-4.9s0-3.2-.5-4.9Z" /><path d="m10 15.3 5-3.3-5-3.3v6.6Z" fill="currentColor" stroke="none" /></svg>;
  if (label === "LinkedIn") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10.5V16" /><path d="M8 7.6v.1" strokeWidth="2.8" /><path d="M12 16v-3.1a2.4 2.4 0 0 1 4.8 0V16" /><path d="M12 10.5V16" /></svg>;
  if (label === "TikTok") return <svg {...common}><path d="M14.6 3v10.1a4.4 4.4 0 1 1-3.8-4.4" /><path d="M14.6 3c.5 2.5 2 4.1 4.3 4.5" /></svg>;

  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M8.5 12h7M12 8.5v7" /></svg>;
}
