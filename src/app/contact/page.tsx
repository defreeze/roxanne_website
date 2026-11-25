import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";
import { getContact, getSettings } from "@/lib/tina";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getContact();
  return { title: data.contact.title, description: data.contact.intro ?? undefined };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContact(), getSettings()]);
  return <ContactView page={page} settings={settings} />;
}
