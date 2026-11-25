"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ServiceConnectionQuery, ServicesPageQuery } from "../../../tina/__generated__/types";
import { sortServices, type TinaProps } from "@/lib/tina";
import { BookButton, ButtonLink, Container, Eyebrow, Heading, Icon, Ornament, Photo, Reveal } from "@/components/ui";
import { PageIntro } from "./PageIntro";

export function ServicesView(props: {
  page: TinaProps<ServicesPageQuery>;
  services: TinaProps<ServiceConnectionQuery>;
}) {
  const page = useTina(props.page).data.servicesPage;
  const services = sortServices(useTina(props.services).data.serviceConnection.edges);
  const schedule = (page.schedule ?? []).filter((c) => c?.name);
  const faq = (page.faq ?? []).filter((f) => f?.question);

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        fields={{ eyebrow: tinaField(page, "eyebrow"), title: tinaField(page, "title"), intro: tinaField(page, "intro") }}
      />

      {/* Jump links */}
      {services.length > 1 && (
        <Container className="-mt-4 mb-16 md:mb-24">
          <nav className="flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s._sys.filename}`}
                className="rounded-full border border-line px-4 py-2 text-sm text-muted hover:border-sage hover:text-foreground transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      )}

      {/* Offerings */}
      <Container className="space-y-24 md:space-y-32">
        {services.map((s, i) => (
          <article key={s.id} id={s._sys.filename} className="scroll-mt-28 grid gap-10 md:gap-16 md:grid-cols-2 md:items-center">
            <Reveal className={`mx-auto w-full max-w-md ${i % 2 ? "md:order-2" : ""}`}>
              <Photo src={s.image} alt={s.title} className="w-full aspect-[4/5] arch" field={tinaField(s, "image")} />
            </Reveal>
            <Reveal delay={100}>
              <div className="flex items-center gap-3 text-sage">
                <Icon name={s.icon} className="w-7 h-7" />
                <span className="h-px w-10 bg-sage/40" />
              </div>
              <Heading className="mt-5" field={tinaField(s, "title")}>
                {s.title}
              </Heading>
              {(s.price || s.duration) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.duration && (
                    <span className="rounded-full bg-sand px-4 py-1.5 text-sm" data-tina-field={tinaField(s, "duration")}>
                      {s.duration}
                    </span>
                  )}
                  {s.price && (
                    <span className="rounded-full bg-sand px-4 py-1.5 text-sm font-normal" data-tina-field={tinaField(s, "price")}>
                      {s.price}
                    </span>
                  )}
                </div>
              )}
              <div className="rich-text mt-6 text-foreground/85" data-tina-field={tinaField(s, "body")}>
                <TinaMarkdown content={s.body} />
              </div>
              <div className="mt-8">
                <BookButton />
              </div>
            </Reveal>
          </article>
        ))}
      </Container>

      {/* Schedule */}
      {schedule.length > 0 && (
        <section id="schedule" className="mt-28 md:mt-40 bg-sand scroll-mt-20">
          <Container className="py-20 md:py-24">
            <Reveal className="text-center max-w-2xl mx-auto">
              <Eyebrow>Schedule</Eyebrow>
              {page.scheduleTitle && (
                <Heading className="mt-5" field={tinaField(page, "scheduleTitle")}>
                  {page.scheduleTitle}
                </Heading>
              )}
              {page.scheduleText && (
                <p className="mt-5 text-muted leading-relaxed" data-tina-field={tinaField(page, "scheduleText")}>
                  {page.scheduleText}
                </p>
              )}
            </Reveal>
            <Reveal className="mt-12 max-w-3xl mx-auto">
              <ul className="divide-y divide-line border-y border-line">
                {schedule.map((c, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[9rem_10rem_1fr_auto] gap-x-4 gap-y-1 py-5 items-baseline"
                    data-tina-field={tinaField(c!)}
                  >
                    <span className="font-serif text-2xl">{c!.day}</span>
                    <span className="text-muted tabular-nums sm:order-none">{c!.time}</span>
                    <span className="col-start-2 sm:col-start-auto font-normal">{c!.name}</span>
                    {c!.location && (
                      <span className="col-start-2 sm:col-start-auto text-sm text-muted sm:text-right">{c!.location}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <Container className="mt-24 md:mt-32">
          <div className="max-w-3xl mx-auto">
          <Reveal className="text-center">
            <Eyebrow>FAQ</Eyebrow>
            {page.faqTitle && (
              <Heading className="mt-5" field={tinaField(page, "faqTitle")}>
                {page.faqTitle}
              </Heading>
            )}
          </Reveal>
          <Reveal className="mt-12 divide-y divide-line border-y border-line">
            {faq.map((f, i) => (
              <details key={i} className="group py-6" data-tina-field={tinaField(f!)}>
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-serif text-2xl">
                  {f!.question}
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full border border-line text-sage-dark transition-transform group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                {f!.answer && <p className="mt-4 pr-12 text-muted leading-relaxed">{f!.answer}</p>}
              </details>
            ))}
          </Reveal>
          </div>
        </Container>
      )}

      {/* Notes + call to action */}
      <Container className="mt-24 md:mt-32 text-center">
        <Reveal className="max-w-2xl mx-auto">
          <Ornament />
          <div className="rich-text mt-8 text-muted" data-tina-field={tinaField(page, "body")}>
            <TinaMarkdown content={page.body} />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <BookButton />
            <ButtonLink href="/contact" variant="secondary">
              Ask a question
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
