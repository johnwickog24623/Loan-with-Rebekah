import { contactInfo } from "@/lib/data/contact-info";

interface ContactDetailItemProps {
  label: string;
  value: string;
  href?: string;
}

function ContactDetailItem({ label, value, href }: ContactDetailItemProps) {
  const content = (
    <span className="text-sm font-medium text-text">{value}</span>
  );
  return (
    <div className="rounded-xl border border-[color:var(--color-line)] bg-surface px-4 py-3.5 shadow-sm transition-all duration-200 hover:border-accent/40">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{label}</p>
      {href ? (
        <a href={href} className="mt-1 inline-block cursor-pointer transition-colors hover:text-accent">
          {content}
        </a>
      ) : (
        <p className="mt-1">{content}</p>
      )}
    </div>
  );
}

export function ContactDetails() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      <ContactDetailItem
        label="Email"
        value={contactInfo.email}
        href={`mailto:${contactInfo.email}`}
      />
      <ContactDetailItem
        label="Phone"
        value={contactInfo.phoneDisplay}
        href={`tel:${contactInfo.phone}`}
      />
      <ContactDetailItem label="Office" value={contactInfo.office} />
    </div>
  );
}
