import type { Testimonial } from "@/lib/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "carousel" | "grid";
}

export function TestimonialCard({ testimonial, variant = "carousel" }: TestimonialCardProps) {
  const layoutClass = variant === "carousel" ? "w-full" : "w-full";
  return (
    <blockquote
      className={`group relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-surface/90 p-5 shadow-[0_16px_40px_rgba(26,26,28,0.05)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[280px] sm:p-6 ${layoutClass}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/55 to-transparent" />
      <span className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-6xl leading-none text-accent/10">
        &ldquo;
      </span>
      <div className="relative flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <span key={index} className="text-sm text-champagne">
            &#9733;
          </span>
        ))}
      </div>
      <p className="relative mt-4 min-w-0 flex-1 break-words text-sm leading-relaxed text-text">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <footer className="relative mt-6 border-t border-[color:var(--color-line)] pt-4">
        <p className="text-sm font-semibold text-text">{testimonial.name}</p>
        <p className="mt-1 text-xs text-muted">{testimonial.role}</p>
      </footer>
    </blockquote>
  );
}
