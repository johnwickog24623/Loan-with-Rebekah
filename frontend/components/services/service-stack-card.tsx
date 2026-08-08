import { ServiceIcon } from "@/components/landing-page-section/services/service-icon";

interface ServiceStackCardProps {
  index: number;
  title: string;
  icon: string;
  description: string;
  features: string[];
}

export function ServiceStackCard({
  index,
  title,
  icon,
  description,
  features,
}: ServiceStackCardProps) {
  return (
    <article className="relative isolate min-h-[22rem] overflow-hidden p-7 sm:p-8 md:min-h-[24rem] md:p-12 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-surface via-ink to-surface-raised" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,153,126,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/55 to-transparent" />
      <div className="relative flex h-full flex-col justify-between gap-8 lg:flex-row lg:gap-14 xl:gap-16">
        <div className="flex max-w-2xl flex-1 flex-col">
          <div className="mb-6 flex items-center gap-4 sm:mb-8 sm:gap-5">
            <span className="font-display text-sm tracking-[0.28em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-accent/30 sm:w-10" />
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-surface text-accent shadow-[0_4px_16px_rgba(26,26,28,0.06)] sm:h-12 sm:w-12">
              <ServiceIcon name={icon} />
            </div>
          </div>
          <h3 className="font-display text-3xl leading-[1.1] tracking-tight text-text md:text-4xl lg:text-[2.75rem]">
            {title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:mt-5 md:text-base">
            {description}
          </p>
        </div>
        <div className="w-full shrink-0 border-t border-[color:var(--color-line)] pt-6 sm:pt-8 lg:w-72 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2 xl:w-80">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-champagne sm:mb-5">
            Included
          </p>
          <ul className="space-y-0">
            {features.map((feature) => (
              <li
                key={feature}
                className="border-b border-[color:var(--color-line)] py-3.5 text-sm text-text last:border-b-0"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
