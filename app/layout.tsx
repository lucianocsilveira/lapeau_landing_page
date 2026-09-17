import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const description =
  "LA PEAU é uma loja de perfumes com curadoria de perfumes importados, perfumes árabes e fragrâncias para cada presença.";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LA PEAU",
  description,
  sameAs: ["https://www.instagram.com/lapeau.parfumerie/"],
  ...(siteUrl
    ? {
        url: siteUrl,
        logo: `${siteUrl}/la-peau-logo.png`,
      }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "LA PEAU | Perfumes Importados e Árabes",
  description,
  applicationName: "LA PEAU",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "LA PEAU",
    title: "LA PEAU | Perfumes Importados e Árabes",
    description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "LA PEAU — Parfumerie de Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LA PEAU | Perfumes Importados e Árabes",
    description,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}<Analytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /></body></html>;
}
