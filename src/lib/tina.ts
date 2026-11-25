import client from "../../tina/__generated__/client";

/** What a page passes to a client component so `useTina` can make it live-editable. */
export type TinaProps<T> = {
  query: string;
  variables: Record<string, unknown>;
  data: T;
};

function pick<T>(res: { query: string; variables: Record<string, unknown>; data: T }): TinaProps<T> {
  return { query: res.query, variables: res.variables, data: res.data };
}

export async function getSettings() {
  return pick(await client.queries.settings({ relativePath: "settings.json" }));
}

export async function getHome() {
  return pick(await client.queries.home({ relativePath: "home.md" }));
}

export async function getServicesPage() {
  return pick(await client.queries.servicesPage({ relativePath: "services.md" }));
}

export async function getServices() {
  return pick(await client.queries.serviceConnection({ first: 100 }));
}

export async function getAbout() {
  return pick(await client.queries.about({ relativePath: "about.md" }));
}

export async function getContact() {
  return pick(await client.queries.contact({ relativePath: "contact.md" }));
}

/** Services in display order, from a serviceConnection query result. */
export function sortServices<
  T extends { order?: number | null; title?: string | null },
>(edges: ({ node?: T | null } | null)[] | null | undefined): T[] {
  return (edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is T => !!n)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || (a.title ?? "").localeCompare(b.title ?? ""));
}
