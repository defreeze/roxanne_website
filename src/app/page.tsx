import { HomeView } from "@/components/views/HomeView";
import { getHome, getServices } from "@/lib/tina";

export default async function HomePage() {
  const [home, services] = await Promise.all([getHome(), getServices()]);
  return <HomeView home={home} services={services} />;
}
