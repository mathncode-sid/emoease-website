"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type NewsletterSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function NewsletterSection({ eyebrow, title, description }: NewsletterSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const subject = encodeURIComponent("EmoEase newsletter subscription");
    const body = encodeURIComponent(`Please add ${email} to the EmoEase newsletter.`);
    window.location.href = `mailto:emoease23@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  }

  return (
    <section id="newsletter" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-8 rounded-[1.5rem] border border-border/70 bg-white p-6 shadow-soft md:p-10 lg:grid-cols-[1fr_0.85fr] lg:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Email address
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="h-12 rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </label>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Join the newsletter
            </Button>

            <p className={cn("text-sm text-muted-foreground", isSubmitted && "text-secondary")} aria-live="polite">
              {isSubmitted
                ? "Your email app is opening with a subscription request. Send the message to join the list."
                : "This opens your email app with a ready-to-send subscription request. We will only use your email for EmoEase updates."}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
