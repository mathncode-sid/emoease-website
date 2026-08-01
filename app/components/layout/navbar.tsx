"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { useScrollLock } from "@/hooks/use-scroll-lock";
import type { NavigationItem } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

type NavbarProps = {
  items: NavigationItem[];
  supportHref: string;
};

export function Navbar({ items, supportHref }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useScrollLock(isOpen);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-border/70 bg-background/95">
      <Container className="flex items-center justify-between py-4 sm:py-5">
        <Link href="#top" aria-label="EmoEase home" className="flex items-center rounded-xl px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          <Image src="/images/emoease-logo.png" alt="EmoEase" width={86} height={58} priority className="h-[58px] w-[86px] object-contain" />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-3">
            <Link href={supportHref}>Get Support</Link>
          </Button>
        </nav>

        <div className="lg:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-11 w-11 rounded-xl px-0"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        className={cn("border-t border-border/70 bg-background lg:hidden", isOpen ? "block" : "hidden")}
      >
        <Container className="flex flex-col gap-2 py-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-2 w-full" onClick={closeMenu}>
            <Link href={supportHref}>Get Support</Link>
          </Button>
        </Container>
      </div>
    </header>
  );
}
