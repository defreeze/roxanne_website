"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ContactQuery, SettingsQuery } from "../../../tina/__generated__/types";
import type { TinaProps } from "@/lib/tina";
import { Container, PageHeading } from "@/components/ui";

export function ContactView(props: { page: TinaProps<ContactQuery>; settings: TinaProps<SettingsQuery> }) {
  const page = useTina(props.page).data.contact;
  const s = useTina(props.settings).data.settings;
  const instagram = s.instagram?.replace(/^@/, "");

  const methods = [
    s.email && { label: "Email", value: s.email, href: `mailto:${s.email}`, field: tinaField(s, "email") },
    s.phone && {
      label: "Phone",
      value: s.phone,
      href: `tel:${s.phone.replace(/[^\d+]/g, "")}`,
      field: tinaField(s, "phone"),
    },
    instagram && {
      label: "Instagram",
      value: `@${instagram}`,
      href: `https://instagram.com/${instagram}`,
      field: tinaField(s, "instagram"),
    },
  ].filter(Boolean) as { label: string; value: string; href: string; field: string }[];

  return (
    <>
      <PageHeading
        title={page.title}
        intro={page.intro}
        titleField={tinaField(page, "title")}
        introField={tinaField(page, "intro")}
      />
      <Container className="grid gap-12 md:grid-cols-2">
        <ul className="space-y-6">
          {methods.map((m) => (
            <li key={m.label}>
              <p className="text-sm text-muted">{m.label}</p>
              <a
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-2xl md:text-3xl font-serif tracking-tight hover:text-brand transition-colors break-all"
                data-tina-field={m.field}
              >
                {m.value}
              </a>
            </li>
          ))}
          {s.location && (
            <li>
              <p className="text-sm text-muted">Location</p>
              <p className="text-2xl md:text-3xl font-serif tracking-tight" data-tina-field={tinaField(s, "location")}>
                {s.location}
              </p>
            </li>
          )}
        </ul>

        <div className="space-y-8">
          {page.hours && (
            <div className="rounded-2xl bg-surface p-6">
              <p className="text-sm text-muted mb-2">Availability</p>
              <p className="whitespace-pre-line text-lg" data-tina-field={tinaField(page, "hours")}>
                {page.hours}
              </p>
            </div>
          )}
          <div className="rich-text" data-tina-field={tinaField(page, "body")}>
            <TinaMarkdown content={page.body} />
          </div>
        </div>
      </Container>
    </>
  );
}
