import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared-components/scroll-reveal";
import type { Property } from "@/lib/types/property";

interface ListingRelatedProps {
  properties: Property[];
}

export function ListingRelated({ properties }: ListingRelatedProps) {
  if (properties.length === 0) return null;
  return (
    <section className="relative px-6 py-12 md:px-12 md:py-16 lg:px-16">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-accent">
            Continue Exploring
          </p>
          <h2 className="mb-10 font-display text-3xl tracking-tight text-text md:text-4xl">
            Related residences
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, index) => (
              <ScrollReveal key={property.id} delay={index * 80} variant="fade-up">
                <Link href={`/listings/${property.slug}`} className="group block cursor-pointer">
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--color-line)] bg-surface shadow-[0_8px_24px_rgba(26,26,28,0.04)]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-md bg-surface/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent shadow-sm backdrop-blur-sm">
                      {property.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-text transition-colors group-hover:text-accent">
                    {property.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{property.location}</p>
                  <p className="mt-2 font-display text-lg text-text">{property.price}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
