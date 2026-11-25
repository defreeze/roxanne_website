"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type { SettingsQuery } from "../../tina/__generated__/types";
import type { TinaProps } from "@/lib/tina";

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

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: "/", label: s.nav?.home || "Home", field: "home" },
    { href: "/services", label: s.nav?.services || "Services", field: "services" },
    { href: "/about", label: s.nav?.about || "About", field: "about" },
    { href: "/contact", label: s.nav?.contact || "Contact", field: "contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight"
            data-tina-field={tinaField(s, "businessName")}
          >
            {s.businessName}
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-tina-field={s.nav ? tinaField(s.nav, l.field as never) : undefined}
                className={
                  isActive(l.href)
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground transition-colors"
                }
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden -mr-2 p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden border-t border-line px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block py-3 text-lg ${isActive(l.href) ? "text-foreground font-medium" : "text-muted"}`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-line mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-serif text-xl">{s.businessName}</p>
            {s.location && (
              <p className="text-muted mt-1" data-tina-field={tinaField(s, "location")}>
                {s.location}
              </p>
            )}
          </div>
          <ul className="space-y-1 sm:text-right text-muted">
            {s.email && (
              <li>
                <a className="hover:text-foreground" href={`mailto:${s.email}`} data-tina-field={tinaField(s, "email")}>
                  {s.email}
                </a>
              </li>
            )}
            {s.phone && (
              <li>
                <a className="hover:text-foreground" href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} data-tina-field={tinaField(s, "phone")}>
                  {s.phone}
                </a>
              </li>
            )}
            {s.instagram && (
              <li>
                <a
                  className="hover:text-foreground"
                  href={`https://instagram.com/${s.instagram.replace(/^@/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tina-field={tinaField(s, "instagram")}
                >
                  @{s.instagram.replace(/^@/, "")}
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-8 flex flex-wrap justify-between gap-2 text-xs text-muted/70">
          <span>
            © {new Date().getFullYear()} {s.businessName}
          </span>
          <a href="https://www.alexdevri.es" target="_blank" rel="noopener noreferrer" className="hover:text-muted">
            Website by de Vries
          </a>
        </div>
      </footer>
    </div>
  );
}
