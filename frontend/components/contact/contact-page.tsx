import { PageShell } from "@/components/shared-components/page-shell";
import { ContactContentSection } from "./contact-content-section";
import { ContactHero } from "./contact-hero";

export function ContactPage() {
  return (
    <PageShell>
      <ContactHero />
      <ContactContentSection />
    </PageShell>
  );
}
