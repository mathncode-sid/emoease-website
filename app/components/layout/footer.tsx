import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/container";
import { SocialIcon } from "@/components/ui/social-icon";
import type { FooterLinkGroup } from "@/types/landing";

type FooterProps = {
  linkGroups: FooterLinkGroup[];
  socialLinks: { label: string; href: string }[];
  utilityLinks: { label: string; href: string }[];
};

export function Footer({ linkGroups, socialLinks, utilityLinks }: FooterProps) {
  return (
    <footer className="border-t border-border/70 bg-white/80">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-xl space-y-6">
            <Link
              href="#top"
              aria-label="EmoEase home"
              className="inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Image src="/images/emoease-logo.png" alt="EmoEase" width={148} height={96} className="h-20 w-32 object-contain sm:h-24 sm:w-36" />
            </Link>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              Supporting men&apos;s mental health through education, peer support, trusted resources, and community
              engagement.
            </p>
            <Link href="/get-help-now" className="inline-flex w-fit items-center rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2">
              Get Help Now
            </Link>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((socialLink) => (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit EmoEase on ${socialLink.label}`}
                  title={socialLink.label}
                >
                  <SocialIcon label={socialLink.label} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-foreground/85 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/70 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} EmoEase. All rights reserved. Built and maintained by mathncode-sid.</p>
          <div className="flex flex-wrap gap-5">
            {utilityLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium text-foreground/85 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
