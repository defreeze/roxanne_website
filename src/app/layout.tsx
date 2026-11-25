import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { getSettings } from "@/lib/tina";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSettings();
  const name = data.settings.businessName;
  return {
    title: { default: name, template: `%s | ${name}` },
    description: data.settings.description ?? undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <SiteShell settings={settings}>{children}</SiteShell>
      </body>
    </html>
  );
}
