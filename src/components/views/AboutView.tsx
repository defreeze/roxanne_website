"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { AboutQuery } from "../../../tina/__generated__/types";
import type { TinaProps } from "@/lib/tina";
import { BookButton, ButtonLink, Container, Eyebrow, Heading, Icon, Photo, Reveal } from "@/components/ui";

export function AboutView(props: { page: TinaProps<AboutQuery> }) {
  const page = useTina(props.page).data.about;
  const qualifications = (page.qualifications ?? []).filter(Boolean) as string[];

  return (
    <>
      {/* Story */}
      <Container className="pt-12 md:pt-20 grid gap-12 md:gap-20 md:grid-cols-[1fr_1.2fr] md:items-start">
        <Reveal className="relative mx-auto w-full max-w-md md:sticky md:top-28">
          <div aria-hidden className="absolute -inset-3 arch border border-clay-soft/50" />
          <Photo src={page.image} alt={page.title} eager className="relative w-full aspect-[4/5] arch" field={tinaField(page, "image")} />
        </Reveal>
        <Reveal delay={100} className="md:pt-10">
          <Eyebrow field={tinaField(page, "eyebrow")}>{page.eyebrow}</Eyebrow>
          <Heading as="h1" className="mt-6" field={tinaField(page, "title")}>
            {page.title}
          </Heading>
          <div className="rich-text mt-8 text-foreground/85" data-tina-field={tinaField(page, "body")}>
            <TinaMarkdown content={page.body} />
          </div>
        </Reveal>
      </Container>

      {/* Quote */}
      {page.quote && (
        <section className="mt-24 md:mt-32 bg-sage-dark text-cream">
          <Container className="py-20 md:py-24 text-center">
            <Reveal className="max-w-4xl mx-auto">
              <Icon name="lotus" className="w-9 h-9 mx-auto text-clay-soft" />
              <blockquote
                className="mt-8 font-serif italic font-light text-3xl md:text-5xl leading-tight text-balance"
                data-tina-field={tinaField(page, "quote")}
              >
                “{page.quote}”
              </blockquote>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Training */}
      {qualifications.length > 0 && (
        <Container className="mt-24 md:mt-32 grid gap-12 md:gap-20 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal>
            <Eyebrow>Achtergrond</Eyebrow>
            {page.qualificationsTitle && (
              <Heading className="mt-5" field={tinaField(page, "qualificationsTitle")}>
                {page.qualificationsTitle}
              </Heading>
            )}
            <ul className="mt-10 divide-y divide-line border-y border-line" data-tina-field={tinaField(page, "qualifications")}>
              {qualifications.map((q, i) => (
                <li key={i} className="flex items-center gap-4 py-4 text-lg">
                  <Icon name="leaf" className="w-5 h-5 shrink-0 text-sage" />
                  {q}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <BookButton />
              <ButtonLink href="/services" variant="secondary">
                Bekijk het aanbod
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={100} className="mx-auto w-full max-w-sm">
            <Photo
              src={page.secondImage}
              alt=""
              className="w-full aspect-[4/5] rounded-[1.25rem]"
              field={tinaField(page, "secondImage")}
            />
          </Reveal>
        </Container>
      )}
    </>
  );
}
