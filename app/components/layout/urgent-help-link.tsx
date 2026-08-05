import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export function UrgentHelpLink() {
  return (
    <Link
      href="/get-help-now"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-red-700 px-4 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 md:hidden"
    >
      <ShieldAlert className="h-4 w-4" aria-hidden="true" />
      Get Help Now
    </Link>
  );
}
