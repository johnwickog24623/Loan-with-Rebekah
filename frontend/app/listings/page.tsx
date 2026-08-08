import type { Metadata } from "next";
import { ListingsPage } from "@/components/listings/listings-page";

export const metadata: Metadata = {
  title: "Listings | Protonix Estate",
  description:
    "Browse available luxury properties and investment holdings with Protonix Estate.",
};

export default function Listings() {
  return <ListingsPage />;
}
