import { ContactPage } from "@/components/contact/contact-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Protonix Estate",
  description: "Contact Protonix Estate for a free consultation, property valuation, or private viewing.",
};

export default function Contact() {
  return <ContactPage />;
}
