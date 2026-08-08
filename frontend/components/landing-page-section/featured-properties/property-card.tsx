import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types/property";

interface PropertyCardProps {
  property: Property;
}

function formatSpecs(property: Property) {
  if (property.tag === "Investment" && property.beds === 0) {
    return `${property.sqft.toLocaleString()} sqft commercial`;
  }
  return `${property.beds} Beds · ${property.baths} Baths · ${property.sqft.toLocaleString()} sqft`;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group w-[220px] shrink-0 overflow-hidden rounded-xl border border-[color:var(--color-line)] bg-surface shadow-[0_12px_40px_rgba(26,26,28,0.08)] sm:w-[240px] md:w-[252px]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="252px"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-ink">
          {property.tag}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-text">{property.title}</h3>
        <p className="mt-1 text-xs text-muted">{property.location}</p>
        <p className="mt-2 text-base font-semibold text-text">{property.price}</p>
        <p className="mt-2 text-[11px] text-muted">{formatSpecs(property)}</p>
        <Link
          href="#contact"
          className="mt-3 inline-block cursor-pointer text-xs font-medium text-accent transition-colors hover:text-text"
        >
          View Details &rarr;
        </Link>
      </div>
    </article>
  );
}
