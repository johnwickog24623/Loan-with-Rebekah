import Image from "next/image";
import Link from "next/link";
import type { Neighborhood } from "@/lib/types/neighborhood";

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl">
      <div className="relative aspect-[3/4]">
        <Image
          src={neighborhood.image}
          alt={neighborhood.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 p-6">
          <h3 className="text-xl font-medium">{neighborhood.name}</h3>
          <p className="mt-2 text-sm text-gray-300">{neighborhood.description}</p>
          <p className="mt-3 text-xs text-gray-400">
            {neighborhood.listings} active listings
          </p>
          <Link
            href="#contact"
            className="mt-4 inline-block cursor-pointer text-sm font-medium text-white transition-colors hover:text-gray-300"
          >
            Explore Area &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
