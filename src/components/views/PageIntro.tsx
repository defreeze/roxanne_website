"use client";

import { Container, Eyebrow, Heading, Reveal } from "@/components/ui";

/** Centered page heading used at the top of inner pages. */
export function PageIntro({
  eyebrow,
  title,
  intro,
  fields,
}: {
  eyebrow?: string | null;
  title: string;
  intro?: string | null;
  fields: { eyebrow?: string; title?: string; intro?: string };
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 -top-64 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-[radial-gradient(circle,#ecd3c4_0%,transparent_62%)] opacity-60"
      />
      <Container className="relative pt-16 md:pt-24 pb-16 md:pb-20 text-center">
        <Reveal className="max-w-3xl mx-auto">
          <Eyebrow field={fields.eyebrow}>{eyebrow}</Eyebrow>
          <Heading as="h1" className="mt-6" field={fields.title}>
            {title}
          </Heading>
          {intro && (
            <p className="mt-7 text-lg md:text-xl text-muted leading-relaxed text-pretty" data-tina-field={fields.intro}>
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
