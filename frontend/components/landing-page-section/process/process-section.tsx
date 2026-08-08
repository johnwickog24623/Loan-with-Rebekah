import { SectionHeading } from "@/components/shared-components/section-heading";
import { processSteps } from "@/lib/data/process-steps";
import { ProcessStepCard } from "./process-step";

export function ProcessSection() {
  return (
    <section className="relative px-6 py-20 md:px-12 lg:px-16">
      <div className="mx-auto mb-12 flex max-w-2xl justify-center">
        <SectionHeading
          eyebrow="How It Works"
          title="A clear path from search to keys"
          description="Four simple steps designed to remove friction and keep you informed at every stage."
          align="center"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <ProcessStepCard key={step.id} step={step} />
        ))}
      </div>
    </section>
  );
}
