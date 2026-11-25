"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ContactQuery } from "../../../tina/__generated__/types";
import type { TinaProps } from "@/lib/tina";
import { BookButton, Container, Icon, Reveal } from "@/components/ui";
import { useSite, whatsappHref } from "@/components/site-context";
import { PageIntro } from "./PageIntro";

const ICONS: Record<string, React.ReactNode> = {
  email: <path d="M4 6.5h16v11H4zM4.5 7l7.5 6l7.5-6" />,
  phone: (
    <path d="M6.5 4h3l1.5 4l-2 1.3a10 10 0 0 0 5.7 5.7L16 13l4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z" />
  ),
  whatsapp: (
    <>
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.3 18.4z" />
      <path d="M9.3 8.8c.3 2.6 2.4 4.9 5.2 5.6l1-1.3l-1.8-.9l-.8.8a4.5 4.5 0 0 1-2.3-2.3l.8-.8l-.9-1.8z" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r=".6" fill="currentColor" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
};

export function ContactView(props: { page: TinaProps<ContactQuery> }) {
  const page = useTina(props.page).data.contact;
  const s = useSite();
  const instagram = s.instagram?.replace(/^@/, "");

  const methods = [
    s.email && { key: "email", label: "Email", value: s.email, href: `mailto:${s.email}`, field: tinaField(s, "email") },
    s.phone && {
      key: "phone",
      label: "Phone",
      value: s.phone,
      href: `tel:${s.phone.replace(/[^\d+]/g, "")}`,
      field: tinaField(s, "phone"),
    },
    s.whatsapp && {
      key: "whatsapp",
      label: "WhatsApp",
      value: "Send a message",
      href: whatsappHref(s.whatsapp),
      field: tinaField(s, "whatsapp"),
    },
    instagram && {
      key: "instagram",
      label: "Instagram",
      value: `@${instagram}`,
      href: `https://instagram.com/${instagram}`,
      field: tinaField(s, "instagram"),
    },
    s.location && { key: "location", label: "Location", value: s.location, href: "", field: tinaField(s, "location") },
  ].filter(Boolean) as { key: string; label: string; value: string; href: string; field: string }[];

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        fields={{ eyebrow: tinaField(page, "eyebrow"), title: tinaField(page, "title"), intro: tinaField(page, "intro") }}
      />

      <Container className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal as="div" className="grid gap-4 sm:grid-cols-2 content-start">
          {methods.map((m) => {
            const inner = (
              <>
                <span className="grid place-items-center w-12 h-12 rounded-full bg-sand text-sage-dark shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[m.key]}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.24em] text-muted">{m.label}</span>
                  <span className="block mt-1 font-serif text-xl [overflow-wrap:anywhere]" data-tina-field={m.field}>
                    {m.value}
                  </span>
                </span>
              </>
            );
            const cls = "flex items-center gap-4 rounded-[1.25rem] border border-line bg-background p-5 sm:p-6";
            return m.href ? (
              <a
                key={m.key}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${cls} hover:border-sage hover:bg-sand/40 transition-colors`}
              >
                {inner}
              </a>
            ) : (
              <div key={m.key} className={cls}>
                {inner}
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={100} className="rounded-[1.5rem] bg-sage-dark text-cream p-8 md:p-10 relative overflow-hidden">
          <Icon name="lotus" className="absolute -right-6 -bottom-6 w-40 h-40 text-cream/[0.06]" />
          <p className="text-[11px] uppercase tracking-[0.24em] text-cream/60">Availability</p>
          {page.hours && (
            <p className="mt-4 whitespace-pre-line font-serif text-2xl leading-relaxed" data-tina-field={tinaField(page, "hours")}>
              {page.hours}
            </p>
          )}
          <div className="rich-text mt-6 text-cream/80 [&_a]:text-cream" data-tina-field={tinaField(page, "body")}>
            <TinaMarkdown content={page.body} />
          </div>
          <div className="mt-8 relative">
            <BookButton variant="light" />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
