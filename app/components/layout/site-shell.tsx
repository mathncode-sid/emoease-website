import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { UrgentHelpLink } from "@/components/layout/urgent-help-link";
import { footerLinkGroups, footerUtilityLinks, navigationItems, socialLinks } from "@/lib/site-content";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar items={navigationItems} supportHref="/support" />
      {children}
      <Footer linkGroups={footerLinkGroups} socialLinks={socialLinks} utilityLinks={footerUtilityLinks} />
      <UrgentHelpLink />
    </>
  );
}
