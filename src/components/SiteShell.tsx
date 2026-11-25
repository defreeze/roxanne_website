"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type { SettingsQuery } from "../../tina/__generated__/types";
import type { TinaProps } from "@/lib/tina";
import { SiteContext, bookingHref, whatsappHref } from "./site-context";
import { Icon } from "./ui";

export function SiteShell({
  settings,
  children,
}: {
  settings: TinaProps<SettingsQuery>;
  children: React.ReactNode;
}) {
  const { data } = useTina(settings);
  const s = data.settings;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: s.nav?.home || "Home", field: "home" },
    { href: "/services", label: s.nav?.services || "Offerings", field: "services" },
    { href: "/about", label: s.nav?.about || "About", field: "about" },
    { href: "/contact", label: s.nav?.contact || "Contact", field: "contact" },
  ] as const;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const book = bookingHref(s);
  const bookExternal = /^https?:/.test(book);
  const instagram = s.instagram?.replace(/^@/, "");

  return (
    <SiteContext.Provider value={s}>
      <div className="min-h-screen flex flex-col">
        <header
          className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
            scrolled || open ? "bg-background/95 backdrop-blur shadow-[0_1px_0_var(--color-line)]" : "bg-background"
          }`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-6">
            <Link href="/" className="group flex items-center gap-3 min-w-0">
              <span className="text-sage shrink-0">
                <Icon name="lotus" className="w-8 h-8" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-[1.65rem] leading-none tracking-wide" data-tina-field={tinaField(s, "businessName")}>
                  {s.businessName}
                </span>
                {s.tagline && (
                  <span
                    className="block mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-muted truncate"
                    data-tina-field={tinaField(s, "tagline")}
                  >
                    {s.tagline}
                  </span>
                )}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-tina-field={s.nav ? tinaField(s.nav, l.field) : undefined}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`relative text-[13px] uppercase tracking-[0.16em] transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:bg-clay after:transition-all ${
                    isActive(l.href) ? "text-foreground after:w-full" : "text-muted hover:text-foreground after:w-0 hover:after:w-full"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={book}
                target={bookExternal ? "_blank" : undefined}
                rel={bookExternal ? "noopener noreferrer" : undefined}
                className="rounded-full bg-forest px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] text-cream hover:bg-sage-dark transition-colors"
                data-tina-field={tinaField(s, "bookingLabel")}
              >
                {s.bookingLabel || "Book a session"}
              </Link>
            </nav>

            <button
              type="button"
              className="md:hidden -mr-2 p-2 text-foreground"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>

          {open && (
            <nav className="md:hidden border-t border-line px-4 pt-4 pb-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block py-3 font-serif text-3xl ${isActive(l.href) ? "text-foreground" : "text-muted"}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={book}
                target={bookExternal ? "_blank" : undefined}
                rel={bookExternal ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex rounded-full bg-forest px-7 py-3.5 text-[13px] uppercase tracking-[0.16em] text-cream"
              >
                {s.bookingLabel || "Book a session"}
              </Link>
            </nav>
          )}
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-forest text-cream/80 mt-28 md:mt-36">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3 text-cream">
                <Icon name="lotus" className="w-8 h-8 text-clay-soft" />
                <span className="font-serif text-3xl">{s.businessName}</span>
              </div>
              {s.tagline && <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-cream/60">{s.tagline}</p>}
              {s.description && <p className="mt-6 max-w-sm leading-relaxed">{s.description}</p>}
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-cream/50 mb-4">Explore</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-cream transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-cream/50 mb-4">Contact</p>
              <ul className="space-y-2 break-words">
                {s.email && (
                  <li>
                    <a className="hover:text-cream transition-colors" href={`mailto:${s.email}`} data-tina-field={tinaField(s, "email")}>
                      {s.email}
                    </a>
                  </li>
                )}
                {s.phone && (
                  <li>
                    <a className="hover:text-cream transition-colors" href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} data-tina-field={tinaField(s, "phone")}>
                      {s.phone}
                    </a>
                  </li>
                )}
                {s.whatsapp && (
                  <li>
                    <a className="hover:text-cream transition-colors" href={whatsappHref(s.whatsapp)} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </li>
                )}
                {instagram && (
                  <li>
                    <a className="hover:text-cream transition-colors" href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                      @{instagram}
                    </a>
                  </li>
                )}
                {s.location && <li className="text-cream/60">{s.location}</li>}
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 border-t border-cream/10 flex flex-wrap justify-between gap-2 text-xs text-cream/50">
            <span>
              © {new Date().getFullYear()} {s.businessName}
            </span>
            <a href="https://www.alexdevri.es" target="_blank" rel="noopener noreferrer" className="hover:text-cream/80">
              Website by de Vries
            </a>
          </div>
        </footer>
      </div>
    </SiteContext.Provider>
  );
}
