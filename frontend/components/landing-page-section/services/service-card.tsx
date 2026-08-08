import type { ServiceItem } from "@/lib/data/services";
import { ServiceIcon } from "./service-icon";

interface ServiceCardProps {
  service: ServiceItem;
  step: number;
}

export function ServiceCard({ service, step }: ServiceCardProps) {
  return (
    <article className="group relative flex h-[220px] w-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/14 via-white/6 to-black/50 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:shadow-[0_28px_60px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <span className="pointer-events-none absolute -right-2 -top-4 select-none text-[5.5rem] font-light leading-none text-white/[0.06]">
        0{step}
      </span>
      <div className="relative mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-md">
          <ServiceIcon name={service.icon} />
        </div>
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-gray-300">
          0{step}
        </span>
      </div>
      <h3 className="relative text-xl font-medium tracking-tight text-white drop-shadow-md">
        {service.title}
      </h3>
      <p className="relative mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-200/90">
        {service.description}
      </p>
      <div className="relative mt-5 h-px w-full bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </article>
  );
}
