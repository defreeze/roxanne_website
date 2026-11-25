import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";
import { getAbout } from "@/lib/tina";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getAbout();
  return { title: data.about.title };
}

export default async function AboutPage() {
  return <AboutView page={await getAbout()} />;
}
