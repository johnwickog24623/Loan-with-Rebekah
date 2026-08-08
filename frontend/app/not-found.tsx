import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-text">
      <h1 className="font-display text-6xl font-bold text-accent md:text-8xl">404</h1>
      <p className="mt-4 text-xl text-text/80 md:text-2xl">Page Not Found</p>
      <p className="mt-2 max-w-md text-sm text-text/60">
        The residence or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-8 py-3 font-medium text-ink transition-colors hover:bg-jet"
      >
        Return to Home
      </Link>
    </div>
  );
}
