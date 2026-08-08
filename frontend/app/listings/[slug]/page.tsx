import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetailPage } from "@/components/listings/listing-detail-page";
import {
  getAllPropertySlugs,
  getPropertyBySlug,
  getRelatedProperties,
} from "@/lib/utils/property";

interface ListingDetailRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ListingDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    return { title: "Listing | Protonix Estate" };
  }
  return {
    title: `${property.title} | Protonix Estate`,
    description: property.description,
  };
}

export default async function ListingDetailRoute({ params }: ListingDetailRouteProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();
  const related = getRelatedProperties(slug, 3);
  return <ListingDetailPage property={property} related={related} />;
}
