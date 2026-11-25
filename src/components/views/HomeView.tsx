"use client";

import Link from "next/link";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { HomeQuery, ServiceConnectionQuery } from "../../../tina/__generated__/types";
import { sortServices, type TinaProps } from "@/lib/tina";
import { useSite } from "@/components/site-context";
import { BookButton, ButtonLink, Container, Eyebrow, Heading, Icon, Ornament, Photo, Reveal } from "@/components/ui";

export function HomeView(props: {
  home: TinaProps<HomeQuery>;
  services: TinaProps<ServiceConnectionQuery>;
}) {
  const home = useTina(props.home).data.home;
  const site = useSite();
  const services = sortServices(useTina(props.services).data.serviceConnection.edges).filter((s) => s.featured);
  const highlights = (home.highlights ?? []).filter((h) => h?.title);
  const gallery = (home.gallery ?? []).filter((g) => g?.image);
  const testimonials = (home.testimonials ?? []).filter((t) => t?.quote);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="relative pt-10 md:pt-16 pb-20 md:pb-28 grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
          <Reveal>
            <Eyebrow field={tinaField(home, "heroEyebrow")}>{home.heroEyebrow}</Eyebrow>
            <Heading as="h1" className="mt-6" field={tinaField(home, "heroTitle")}>
              {home.heroTitle}
            </Heading>
            {home.heroText && (
              <p className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-muted text-pretty" data-tina-field={tinaField(home, "heroText")}>
                {home.heroText}
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              <BookButton />
              <ButtonLink href="/services" variant="secondary">
                Bekijk het aanbod
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative mx-auto w-full max-w-[26rem]">
            <div
              aria-hidden
              className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,#ecd3c4_0%,transparent_65%)] opacity-80"
            />
            <div aria-hidden className="absolute -inset-3 arch border border-clay-soft/50" />
            <Photo
              src={home.heroImage}
              alt=""
              eager
              className="relative w-full aspect-[4/5] arch"
              field={tinaField(home, "heroImage")}
            />
          </Reveal>
        </Container>
      </section>

      {/* Pillars */}
      {highlights.length > 0 && (
        <section className="bg-sand">
          <Container className="py-16 md:py-20 grid gap-12 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={i} delay={i * 120} className="text-center" data-tina-field={tinaField(h!)}>
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-sage/40 text-sage-dark">
                  <Icon name={h!.icon} className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-3xl">{h!.title}</h3>
                {h!.text && <p className="mt-3 text-muted leading-relaxed max-w-xs mx-auto">{h!.text}</p>}
              </Reveal>
            ))}
          </Container>
        </section>
      )}

      {/* Introduction */}
      <Container className="mt-24 md:mt-36 grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal className="relative order-2 md:order-1 mx-auto w-full max-w-md">
          <Photo
            src={home.introImage}
            alt=""
            className="w-full aspect-[4/5] rounded-[1.25rem]"
            field={tinaField(home, "introImage")}
          />
          <div aria-hidden className="hidden sm:block absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-clay-soft/30" />
        </Reveal>
        <Reveal delay={100} className="order-1 md:order-2">
          <Eyebrow field={tinaField(home, "introEyebrow")}>{home.introEyebrow}</Eyebrow>
          {home.introTitle && (
            <Heading className="mt-5" field={tinaField(home, "introTitle")}>
              {home.introTitle}
            </Heading>
          )}
          <div className="rich-text mt-7 text-foreground/85" data-tina-field={tinaField(home, "body")}>
            <TinaMarkdown content={home.body} />
          </div>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.16em] text-sage-dark border-b border-sage-dark/40 pb-1 hover:border-sage-dark"
          >
            Meer over mij <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Container>

      {/* Offerings */}
      {services.length > 0 && (
        <section className="mt-24 md:mt-36">
          <Container>
            <Reveal className="text-center max-w-2xl mx-auto">
              <Eyebrow field={tinaField(home, "servicesEyebrow")}>{home.servicesEyebrow}</Eyebrow>
              <Heading className="mt-5" field={tinaField(home, "servicesTitle")}>
                {home.servicesTitle}
              </Heading>
              {home.servicesText && (
                <p className="mt-5 text-lg text-muted leading-relaxed" data-tina-field={tinaField(home, "servicesText")}>
                  {home.servicesText}
                </p>
              )}
            </Reveal>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal as="article" key={s.id} delay={i * 120}>
                  <Link href={`/services#${s._sys.filename}`} className="group block">
                    <div className="overflow-hidden arch">
                      <Photo
                        src={s.image}
                        alt={s.title}
                        className="w-full aspect-[4/5] arch transition-transform duration-700 group-hover:scale-[1.04]"
                        field={tinaField(s, "image")}
                      />
                    </div>
                    <div className="mt-6 text-center px-2">
                      <h3 className="font-serif text-3xl group-hover:text-sage-dark transition-colors" data-tina-field={tinaField(s, "title")}>
                        {s.title}
                      </h3>
                      {s.summary && (
                        <p className="mt-3 text-muted leading-relaxed" data-tina-field={tinaField(s, "summary")}>
                          {s.summary}
                        </p>
                      )}
                      {(s.price || s.duration) && (
                        <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-clay">
                          {[s.duration, s.price].filter(Boolean).join("  ·  ")}
                        </p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-14 text-center">
              <ButtonLink href="/services" variant="secondary">
                Bekijk alle sessies
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {(testimonials.length > 0 || home.reviewsNote) && (
        <section className="mt-24 md:mt-36 bg-sage-dark text-cream">
          <Container className="py-20 md:py-28">
            <Reveal className="text-center">
              <Icon name="lotus" className="w-9 h-9 mx-auto text-clay-soft" />
              {home.testimonialsTitle && (
                <h2 className="mt-5 font-serif font-light text-4xl md:text-5xl" data-tina-field={tinaField(home, "testimonialsTitle")}>
                  {home.testimonialsTitle}
                </h2>
              )}
            </Reveal>
            {testimonials.length > 0 && (
            <div className={`mt-14 grid gap-12 ${testimonials.length > 1 ? "md:grid-cols-3" : "max-w-2xl mx-auto"}`}>
              {testimonials.map((t, i) => (
                <Reveal as="figure" key={i} delay={i * 120} className="text-center" data-tina-field={tinaField(t!)}>
                  <blockquote className="font-serif italic text-2xl leading-snug text-cream/95">“{t!.quote}”</blockquote>
                  {t!.name && (
                    <figcaption className="mt-5 text-[12px] uppercase tracking-[0.24em] text-cream/60">{t!.name}</figcaption>
                  )}
                </Reveal>
              ))}
            </div>
            )}
            {home.reviewsNote && (
              <Reveal className="mt-10 text-center">
                <a
                  href={site.bookingUrl || "/contact"}
                  target={site.bookingUrl ? "_blank" : undefined}
                  rel={site.bookingUrl ? "noopener noreferrer" : undefined}
                  className="inline-flex flex-col items-center gap-3 group"
                  data-tina-field={tinaField(home, "reviewsNote")}
                >
                  <span className="text-clay-soft text-2xl tracking-[0.3em]" aria-hidden>★★★★★</span>
                  <span className="font-serif italic text-2xl md:text-3xl text-cream/95">{home.reviewsNote}</span>
                  <span className="text-[12px] uppercase tracking-[0.2em] text-cream/60 group-hover:text-cream transition-colors">
                    Lees de ervaringen →
                  </span>
                </a>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <Container className="mt-24 md:mt-36">
          {home.galleryTitle && (
            <Reveal>
              <Heading className="text-center" field={tinaField(home, "galleryTitle")}>
                {home.galleryTitle}
              </Heading>
            </Reveal>
          )}
          <div className="mt-12 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
            {gallery.map((g, i) => (
              <Reveal
                as="figure"
                key={i}
                delay={i * 100}
                data-tina-field={tinaField(g!)}
              >
                <Photo src={g!.image} alt={g!.caption || ""} className="w-full aspect-square rounded-[1.25rem]" />
                {g!.caption && (
                  <figcaption className="mt-3 text-center font-serif italic text-lg text-muted">{g!.caption}</figcaption>
                )}
              </Reveal>
            ))}
          </div>
        </Container>
      )}

      {/* Closing */}
      <Container className="mt-24 md:mt-36">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-sand px-6 py-16 md:py-24 text-center">
          <div
            aria-hidden
            className="absolute left-1/2 -bottom-48 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle,#ecd3c4_0%,transparent_65%)]"
          />
          <div className="relative">
            <Ornament />
            {home.closingTitle && (
              <Heading className="mt-8" field={tinaField(home, "closingTitle")}>
                {home.closingTitle}
              </Heading>
            )}
            {home.closingText && (
              <p className="mt-5 max-w-xl mx-auto text-lg text-muted leading-relaxed" data-tina-field={tinaField(home, "closingText")}>
                {home.closingText}
              </p>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <BookButton />
              <ButtonLink href="/contact" variant="secondary">
                Stel een vraag
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
