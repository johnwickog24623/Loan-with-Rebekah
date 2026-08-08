import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Children, isValidElement } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { ScrollZoom } from "./scroll-zoom";

interface PageShellProps {
  children: React.ReactNode;
}

function shouldSkipScrollZoom(child: React.ReactNode) {
  if (!isValidElement(child)) return false;
  const props = child.props as Record<string, unknown>;
  return "data-skip-scroll-zoom" in props;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <SmoothScrollProvider>
      <main className="relative isolate min-h-screen overflow-x-clip bg-ink text-text">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(168,153,126,0.1),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgba(61,74,92,0.06),transparent_42%)]" />
          <div className="premium-noise absolute inset-0" />
        </div>
        <Navbar variant="cinematic" />
        <ScrollZoom>
          {Children.map(children, (child, index) => (
            <div
              key={index}
              {...(shouldSkipScrollZoom(child) ? {} : { "data-scroll-zoom": true })}
              className="w-full"
            >
              {child}
            </div>
          ))}
          <Footer variant="cinematic" />
        </ScrollZoom>
      </main>
    </SmoothScrollProvider>
  );
}
