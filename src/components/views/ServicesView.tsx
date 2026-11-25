"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { ServiceConnectionQuery, ServicesPageQuery } from "../../../tina/__generated__/types";
import { sortServices, type TinaProps } from "@/lib/tina";
import { ButtonLink, Container, PageHeading, Photo } from "@/components/ui";

export function ServicesView(props: {
  page: TinaProps<ServicesPageQuery>;
  services: TinaProps<ServiceConnectionQuery>;
}) {
  const page = useTina(props.page).data.servicesPage;
  const services = sortServices(useTina(props.services).data.serviceConnection.edges);

  return (
    <>
      <PageHeading
        title={page.title}
        intro={page.intro}
        titleField={tinaField(page, "title")}
        introField={tinaField(page, "intro")}
      />

      <Container className="space-y-16 md:space-y-24">
        {services.map((s, i) => (
          <article
            key={s.id}
            id={s._sys.filename}
            className="scroll-mt-24 grid gap-8 md:grid-cols-2 md:items-center"
          >
            <Photo
              src={s.image}
              alt={s.title}
              className={`w-full aspect-[4/3] rounded-2xl ${i % 2 ? "md:order-2" : ""}`}
              field={tinaField(s, "image")}
            />
            <div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight" data-tina-field={tinaField(s, "title")}>
                {s.title}
              </h2>
              {(s.price || s.duration) && (
                <p className="mt-3 text-sm">
                  {s.price && (
                    <span className="font-medium" data-tina-field={tinaField(s, "price")}>
                      {s.price}
                    </span>
                  )}
                  {s.price && s.duration && <span className="text-muted"> · </span>}
                  {s.duration && (
                    <span className="text-muted" data-tina-field={tinaField(s, "duration")}>
                      {s.duration}
                    </span>
                  )}
                </p>
              )}
              <div className="rich-text mt-5 text-foreground/90" data-tina-field={tinaField(s, "body")}>
                <TinaMarkdown content={s.body} />
              </div>
            </div>
          </article>
        ))}
      </Container>

      <Container className="mt-20 md:mt-28">
        <div className="rich-text max-w-2xl text-muted" data-tina-field={tinaField(page, "body")}>
          <TinaMarkdown content={page.body} />
        </div>
        <div className="mt-8">
          <ButtonLink href="/contact">Get in touch</ButtonLink>
        </div>
      </Container>
    </>
  );
}
