import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";
import { getContact } from "@/lib/tina";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getContact();
  return { title: data.contact.title, description: data.contact.intro ?? undefined };
}

export default async function ContactPage() {
  return <ContactView page={await getContact()} />;
}
