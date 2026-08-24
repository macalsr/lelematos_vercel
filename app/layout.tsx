import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Space_Grotesk } from "next/font/google";
import { getSiteSettings } from "@/lib/sanity";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    title: siteSettings?.siteTitle || "Portfólio de artista",
    description: "Portfólio online com galeria de obras.",
    ...(siteSettings?.favicon
      ? {
          icons: {
            icon: siteSettings.favicon,
            shortcut: siteSettings.favicon,
            apple: siteSettings.favicon,
          },
        }
      : {}),
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} ${dmMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
