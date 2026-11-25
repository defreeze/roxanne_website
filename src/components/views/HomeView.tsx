"use client";

import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { HomeQuery, ServiceConnectionQuery } from "../../../tina/__generated__/types";
import { sortServices, type TinaProps } from "@/lib/tina";
import { ButtonLink, Container, Photo } from "@/components/ui";

export function HomeView(props: {
  home: TinaProps<HomeQuery>;
  services: TinaProps<ServiceConnectionQuery>;
}) {
  const home = useTina(props.home).data.home;
  const services = sortServices(useTina(props.services).data.serviceConnection.edges).filter(
    (s) => s.featured,
  );
  const gallery = (home.gallery ?? []).filter((g) => g?.image);
  const testimonials = (home.testimonials ?? []).filter((t) => t?.quote);

  return (
    <>
      {/* Hero */}
      <Container className="pt-12 md:pt-20 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
            data-tina-field={tinaField(home, "heroTitle")}
          >
            {home.heroTitle}
          </h1>
          {home.heroText && (
            <p className="mt-6 text-lg md:text-xl text-muted text-pretty" data-tina-field={tinaField(home, "heroText")}>
              {home.heroText}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" data-tina-field={tinaField(home, "ctaLabel")}>
              {home.ctaLabel || "Get in touch"}
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              {home.servicesTitle || "Services"}
            </ButtonLink>
          </div>
        </div>
        <Photo
          src={home.heroImage}
          alt=""
          eager
          className="w-full aspect-[4/3] md:aspect-[4/5] rounded-2xl"
          field={tinaField(home, "heroImage")}
        />
      </Container>

      {/* Introduction */}
      <Container className="mt-24 md:mt-32 grid gap-6 md:grid-cols-[1fr_2fr]">
        {home.introTitle && (
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight" data-tina-field={tinaField(home, "introTitle")}>
            {home.introTitle}
          </h2>
        )}
        <div className="rich-text max-w-2xl" data-tina-field={tinaField(home, "body")}>
          <TinaMarkdown content={home.body} />
        </div>
      </Container>

      {/* Services */}
      {services.length > 0 && (
        <Container className="mt-24 md:mt-32">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight" data-tina-field={tinaField(home, "servicesTitle")}>
              {home.servicesTitle}
            </h2>
            <Link href="/services" className="text-sm text-brand hover:text-brand-dark shrink-0">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.id}
                href={`/services#${s._sys.filename}`}
                className="group rounded-2xl bg-surface p-6 flex flex-col hover:bg-line/60 transition-colors"
              >
                <h3 className="text-xl font-medium" data-tina-field={tinaField(s, "title")}>
                  {s.title}
                </h3>
                {s.summary && (
                  <p className="mt-2 text-muted flex-1" data-tina-field={tinaField(s, "summary")}>
                    {s.summary}
                  </p>
                )}
                {(s.price || s.duration) && (
                  <p className="mt-6 text-sm">
                    {s.price && <span className="font-medium">{s.price}</span>}
                    {s.price && s.duration && <span className="text-muted"> · </span>}
                    {s.duration && <span className="text-muted">{s.duration}</span>}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </Container>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <Container className="mt-24 md:mt-32">
          {home.galleryTitle && (
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-8" data-tina-field={tinaField(home, "galleryTitle")}>
              {home.galleryTitle}
            </h2>
          )}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <figure key={i} data-tina-field={tinaField(g!)}>
                <Photo src={g!.image} alt={g!.caption || ""} className="w-full aspect-[4/3] rounded-xl" />
                {g!.caption && <figcaption className="mt-2 text-sm text-muted">{g!.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </Container>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <Container className="mt-24 md:mt-32">
          {home.testimonialsTitle && (
            <h2
              className="font-serif text-3xl md:text-4xl tracking-tight mb-8"
              data-tina-field={tinaField(home, "testimonialsTitle")}
            >
              {home.testimonialsTitle}
            </h2>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="border-l-2 border-brand pl-6" data-tina-field={tinaField(t!)}>
                <p className="font-serif text-xl md:text-2xl leading-snug">“{t!.quote}”</p>
                {t!.name && <footer className="mt-3 text-sm text-muted">{t!.name}</footer>}
              </blockquote>
            ))}
          </div>
        </Container>
      )}

      {/* Closing call to action */}
      <Container className="mt-24 md:mt-32">
        <div className="rounded-2xl bg-foreground text-background px-6 py-12 md:px-12 md:py-16 text-center">
          <p className="font-serif text-3xl md:text-4xl tracking-tight text-balance">{home.ctaLabel || "Get in touch"}</p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:bg-surface transition-colors"
            >
              Contact →
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
