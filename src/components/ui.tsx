import Link from "next/link";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-dark"
      : "border border-foreground/20 text-foreground hover:border-foreground/50";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function PageHeading({
  title,
  intro,
  titleField,
  introField,
}: {
  title: string;
  intro?: string | null;
  titleField?: string;
  introField?: string;
}) {
  return (
    <Container className="pt-16 md:pt-24 pb-10 md:pb-14">
      <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-balance" data-tina-field={titleField}>
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-2xl text-lg md:text-xl text-muted text-pretty" data-tina-field={introField}>
          {intro}
        </p>
      )}
    </Container>
  );
}

/** Image from the editor's media library. Falls back to a neutral block when empty. */
export function Photo({
  src,
  alt,
  className = "",
  field,
  eager = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  field?: string;
  eager?: boolean;
}) {
  if (!src) return <div className={`bg-surface ${className}`} data-tina-field={field} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`object-cover bg-surface ${className}`}
      loading={eager ? "eager" : "lazy"}
      data-tina-field={field}
    />
  );
}
