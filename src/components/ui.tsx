"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { bookingHref, useSite } from "./site-context";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Fades its content up into view when scrolled to. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "figure" | "blockquote";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} data-reveal="" className={className} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, field, className = "" }: { children?: React.ReactNode; field?: string; className?: string }) {
  if (!children) return null;
  return (
    <p className={`text-xs sm:text-[13px] font-normal uppercase tracking-[0.28em] text-clay ${className}`} data-tina-field={field}>
      {children}
    </p>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
  className = "",
  field,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  field?: string;
}) {
  const size =
    Tag === "h1"
      ? "text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl"
      : Tag === "h2"
        ? "text-4xl leading-[1.1] md:text-5xl"
        : "text-2xl md:text-3xl leading-tight";
  return (
    <Tag className={`font-serif font-light tracking-tight text-balance ${size} ${className}`} data-tina-field={field}>
      {children}
    </Tag>
  );
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const styles = {
    primary: "bg-forest text-cream hover:bg-sage-dark",
    secondary: "border border-foreground/25 text-foreground hover:border-foreground/60 hover:bg-foreground/[0.03]",
    light: "bg-cream text-forest hover:bg-sand",
  }[variant];
  return (
    <Link
      href={href}
      target={isExternal(href) ? "_blank" : undefined}
      rel={isExternal(href) ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-normal uppercase tracking-[0.16em] transition-colors duration-300 ${styles} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** "Book" button: goes to the booking tool when set, otherwise to the contact page. */
export function BookButton({ variant = "primary", label }: { variant?: "primary" | "secondary" | "light"; label?: string }) {
  const s = useSite();
  return (
    <ButtonLink href={bookingHref(s)} variant={variant}>
      {label || s.bookingLabel || "Book a session"}
    </ButtonLink>
  );
}

/** Image from the editor's media library. Falls back to a soft block when empty. */
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

/** A small hand-drawn style divider: line · lotus · line. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-sage ${className}`} aria-hidden>
      <span className="h-px w-12 bg-current opacity-40" />
      <Icon name="lotus" className="w-6 h-6" />
      <span className="h-px w-12 bg-current opacity-40" />
    </div>
  );
}

const ICON_PATHS: Record<string, React.ReactNode> = {
  lotus: (
    <>
      <path d="M12 4.5c2.2 2.6 2.7 6 0 9.8c-2.7-3.8-2.2-7.2 0-9.8z" />
      <path d="M12 14.3c-.9-3.3-3.4-5.7-7.3-6.1c0 3.6 2.7 5.9 7.3 6.1z" />
      <path d="M12 14.3c.9-3.3 3.4-5.7 7.3-6.1c0 3.6-2.7 5.9-7.3 6.1z" />
      <path d="M4 17.2c2.4 1.4 5 2 8 2s5.6-.6 8-2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" />
    </>
  ),
  moon: <path d="M19.5 14.5A7.8 7.8 0 0 1 9.5 4.5a7.8 7.8 0 1 0 10 10z" />,
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 14-14c0 9-6 14-14 14z" />
      <path d="M5 19l8.5-8.5" />
    </>
  ),
  wave: <path d="M3 9.5c3-3 6 3 9 0s6 3 9 0M3 14.5c3-3 6 3 9 0s6 3 9 0" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z" />,
  sparkle: (
    <>
      <path d="M12 3.5l1.7 5.8l5.8 1.7l-5.8 1.7L12 18.5l-1.7-5.8L4.5 11l5.8-1.7z" />
      <path d="M18.5 16.5l.6 1.9l1.9.6l-1.9.6l-.6 1.9l-.6-1.9l-1.9-.6l1.9-.6z" />
    </>
  ),
};

export function Icon({ name, className = "w-6 h-6" }: { name?: string | null; className?: string }) {
  const path = ICON_PATHS[name || "lotus"] ?? ICON_PATHS.lotus;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {path}
    </svg>
  );
}
