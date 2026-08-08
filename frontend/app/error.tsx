"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-text">
      <h1 className="font-display text-4xl font-bold text-accent md:text-6xl">System Exception</h1>
      <p className="mt-4 text-base text-text/80 md:text-lg">An unexpected error occurred.</p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-accent px-8 py-3 font-medium text-ink transition-colors hover:bg-jet cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-[color:var(--color-line)] bg-surface px-8 py-3 font-medium text-text transition-colors hover:border-accent/35"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
