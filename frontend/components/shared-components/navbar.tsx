"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Loan Solutions", href: "#solutions" },
  { label: "Mortgage Calculator", href: "#calculator" },
  { label: "Schedule Call", href: "#booking" },
];

interface NavbarProps {
  variant?: "default" | "cinematic";
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const isCinematic = variant === "cinematic";
  const shellClass = isCinematic ? "nav-cinematic" : "liquid-glass";
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] px-6 pt-5 md:px-12 lg:px-16">
      <div className="pointer-events-auto">
        <nav
          className={`${shellClass} relative flex items-center justify-between rounded-xl px-4 py-2`}
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="cursor-pointer font-script text-2xl sm:text-3xl md:text-4xl text-text font-normal leading-none"
          >
            Loans With Rebekah
          </Link>
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex lg:gap-7">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="cursor-pointer text-sm font-medium text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link
              href="#booking"
              className="hidden cursor-pointer rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-jet lg:inline-flex shadow"
            >
              Book Call
            </Link>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-[color:var(--color-line)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`h-0.5 w-5 bg-text transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-5 bg-text transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-5 bg-text transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
        {open ? (
          <div className={`${shellClass} mt-3 rounded-xl p-4 lg:hidden`}>
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block cursor-pointer rounded-lg px-3 py-3 text-sm font-medium text-text transition-colors hover:bg-surface-raised"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#booking"
              onClick={closeMenu}
              className="mt-3 block cursor-pointer rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-jet shadow"
            >
              Book Call
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
