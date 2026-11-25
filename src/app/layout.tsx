import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { getSettings } from "@/lib/tina";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getSettings();
  const { businessName, tagline, description } = data.settings;
  const name = tagline ? `${businessName} · ${tagline}` : businessName;
  return {
    title: { default: name, template: `%s | ${businessName}` },
    description: description ?? undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {/* Marks that JS runs, so scroll animations never hide content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${jost.variable} ${cormorant.variable}`}>
        <SiteShell settings={settings}>{children}</SiteShell>
      </body>
    </html>
  );
}
