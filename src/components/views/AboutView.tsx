"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { AboutQuery } from "../../../tina/__generated__/types";
import type { TinaProps } from "@/lib/tina";
import { ButtonLink, Container, Photo } from "@/components/ui";

export function AboutView(props: { page: TinaProps<AboutQuery> }) {
  const page = useTina(props.page).data.about;

  return (
    <Container className="pt-16 md:pt-24 grid gap-10 md:grid-cols-[2fr_3fr] md:items-start">
      <Photo
        src={page.image}
        alt={page.title}
        eager
        className="w-full aspect-[4/5] rounded-2xl md:sticky md:top-24"
        field={tinaField(page, "image")}
      />
      <div>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-balance" data-tina-field={tinaField(page, "title")}>
          {page.title}
        </h1>
        <div className="rich-text mt-8 max-w-2xl" data-tina-field={tinaField(page, "body")}>
          <TinaMarkdown content={page.body} />
        </div>
        <div className="mt-10">
          <ButtonLink href="/contact">Get in touch</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
