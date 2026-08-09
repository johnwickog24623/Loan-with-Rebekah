import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Loan Solutions", href: "#solutions" },
  { label: "Mortgage Calculator", href: "#calculator" },
  { label: "Schedule Call", href: "#booking" },
];

interface FooterProps {
  variant?: "default" | "cinematic";
}

export function Footer({ variant = "default" }: FooterProps) {
  const isCinematic = variant === "cinematic";
  return (
    <footer
      className={`relative border-t px-6 pb-28 pt-12 sm:pb-16 md:px-12 md:py-14 lg:px-16 ${isCinematic
          ? "border-[color:var(--color-line)] bg-surface/90 backdrop-blur-sm"
          : "border-[color:var(--color-line)] bg-surface/80 backdrop-blur-sm"
        }`}
    >
      <ScrollReveal variant="fade-up">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="mx-auto max-w-sm text-center md:mx-0 md:text-left space-y-2">
            <p className="font-display text-2xl font-semibold tracking-tight text-text">
              Loans With Rebekah
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Professional mortgage brokerage services led by Rebekah. Dedicated home loan financing, rate optimization, and 24/7 AI scheduling.
            </p>
            <p className="text-xs text-muted/70 pt-1">
              Equal Housing Opportunity. All mortgage products subject to credit and underwriting approval.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent text-center md:text-left">
              Navigation
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 sm:gap-6 md:justify-start">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-sm font-medium text-text transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-[color:var(--color-line)] pt-6 text-center text-sm text-muted md:border-t-0 md:pt-0 md:text-left space-y-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              Contact & Hours
            </p>
            <p className="font-medium text-text">Rebekah — Mortgage Professional</p>
            <p className="text-xs font-semibold text-accent">Phone: <a href="tel:+14477866065" className="hover:underline">+1 (447) 786-6065</a></p>
            <p className="text-xs text-muted">Office Hours: Mon - Fri, 9:00 AM - 5:00 PM</p>
            <p className="text-xs text-emerald-800 font-semibold pt-1">Elliot AI Voice Assistant: 24/7 Available</p>
          </div>
        </div>
        <div className="mt-10 border-t border-[color:var(--color-line)] pt-6 text-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Loans With Rebekah. All rights reserved.</p>
        </div>
      </ScrollReveal>
    </footer>
  );
}
