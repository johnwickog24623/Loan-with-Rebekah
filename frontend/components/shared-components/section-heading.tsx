interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "cinematic";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  tone = "default",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const isCinematic = tone === "cinematic";
  return (
    <div className={`mb-12 max-w-2xl ${alignClass} ${className}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-medium uppercase tracking-[0.22em] ${
            isCinematic ? "text-champagne" : "text-muted"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-normal md:text-4xl lg:text-5xl ${
          isCinematic
            ? "font-display text-text tracking-tight"
            : "drop-shadow-lg"
        }`}
        style={isCinematic ? undefined : { letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base md:text-lg ${
            isCinematic ? "text-muted" : "text-gray-300 drop-shadow-md"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
