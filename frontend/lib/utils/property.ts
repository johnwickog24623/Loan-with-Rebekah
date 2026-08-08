import { properties } from "@/lib/data/properties";
import type { Property } from "@/lib/types/property";

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function getAllPropertySlugs(): string[] {
  return properties.map((property) => property.slug);
}

export function getRelatedProperties(slug: string, limit = 3): Property[] {
  return properties.filter((property) => property.slug !== slug).slice(0, limit);
}

export function toMasonryListings(list: Property[] = properties) {
  return list.map((property) => ({
    id: property.id,
    img: property.image,
    url: `/listings/${property.slug}`,
    height: property.masonryHeight ?? 700,
    title: property.title,
    subtitle: `${property.tag} · ${property.price}`,
  }));
}
