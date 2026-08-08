"use client";

import { useState, type FormEvent } from "react";

const inputClassName =
  "w-full rounded-xl border border-[color:var(--color-line)] bg-surface px-4 py-3.5 text-sm text-text placeholder:text-muted/60 outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[color:var(--color-line)] bg-surface p-8 text-center shadow-sm">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/25 bg-surface shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7 text-accent" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl text-text">Message sent</p>
        <p className="mt-2 max-w-xs text-sm text-muted">
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">First Name</span>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Jane"
            className={inputClassName}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Last Name</span>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Smith"
            className={inputClassName}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Email</span>
        <input
          type="email"
          name="email"
          required
          placeholder="jane@example.com"
          className={inputClassName}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about the property you are looking for..."
          className={`${inputClassName} resize-none`}
        />
      </label>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-ink shadow-md transition-all duration-200 hover:bg-jet hover:shadow-lg active:scale-[0.98] sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
