import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import type { Property } from "@/lib/types/property";

interface ListingDetailHeroProps {
  property: Property;
}

export function ListingDetailHero({ property }: ListingDetailHeroProps) {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden md:min-h-[88vh]">
      <Image
        src={property.image}
        alt={property.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-transparent" />
      <div className="relative z-10 flex min-h-[78vh] flex-col justify-end px-6 pb-12 pt-28 md:min-h-[88vh] md:px-12 md:pb-16 lg:px-16">
        <ScrollReveal variant="fade-up">
          <div className="mx-auto w-full max-w-6xl">
            <Link
              href="/listings"
              className="mb-6 inline-flex cursor-pointer items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-accent transition-colors hover:text-jet"
            >
              <span>←</span> Back to listings
            </Link>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-champagne md:text-sm">
              {property.tag}
            </p>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-text md:text-5xl lg:text-6xl">
              {property.title}
            </h1>
            <p className="mt-4 text-base text-muted md:text-lg">{property.location}</p>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <p className="font-display text-3xl tracking-tight text-text md:text-4xl">
                {property.price}
              </p>
              <Link
                href={`/contact?property=${encodeURIComponent(property.title)}`}
                className="cursor-pointer rounded-lg bg-accent px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-jet"
              >
                Request a private viewing
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
