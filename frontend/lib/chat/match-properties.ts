import { properties } from "@/lib/data/properties";
import type { ChatPropertyCard } from "@/lib/types/chat";
import type { Property } from "@/lib/types/property";

function toChatProperty(property: Property): ChatPropertyCard {
  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    location: property.location,
    price: property.price,
    tag: property.tag,
    image: property.image,
    beds: property.beds,
    baths: property.baths,
    sqft: property.sqft,
  };
}

export function resolvePropertiesByIds(ids: string[]): ChatPropertyCard[] {
  const uniqueIds = [...new Set(ids.map((id) => id.trim()).filter(Boolean))];
  return uniqueIds
    .map((id) => properties.find((property) => property.id === id))
    .filter((property): property is Property => Boolean(property))
    .map(toChatProperty);
}

export function matchPropertiesFromText(text: string): ChatPropertyCard[] {
  const normalized = text.toLowerCase();
  const matched = properties.filter((property) =>
    normalized.includes(property.title.toLowerCase())
  );
  return matched.map(toChatProperty);
}

export function mergePropertyCards(
  primary: ChatPropertyCard[],
  fallback: ChatPropertyCard[]
): ChatPropertyCard[] {
  const map = new Map<string, ChatPropertyCard>();
  [...primary, ...fallback].forEach((property) => {
    map.set(property.id, property);
  });
  return Array.from(map.values()).slice(0, 3);
}
