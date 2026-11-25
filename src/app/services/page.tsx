import type { Metadata } from "next";
import { ServicesView } from "@/components/views/ServicesView";
import { getServices, getServicesPage } from "@/lib/tina";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getServicesPage();
  return { title: data.servicesPage.title, description: data.servicesPage.intro ?? undefined };
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([getServicesPage(), getServices()]);
  return <ServicesView page={page} services={services} />;
}
