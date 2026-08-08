export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  tag: string;
  description: string;
  amenities: string[];
  gallery: string[];
  masonryHeight?: number;
}
