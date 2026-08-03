import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";

  return {
    metadataBase: new URL(origin),
    title: "La Peau — Parfumerie de Contact",
    description:
      "Uma nova casa de perfumes, onde a fragrância encontra a pele. Em breve.",
    icons: { icon: "/brand-board.png" },
    openGraph: {
      title: "La Peau — Parfumerie de Contact",
      description: "O perfume encontra a pele. Em breve.",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "La Peau — Parfumerie de Contact",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "La Peau — Parfumerie de Contact",
      description: "O perfume encontra a pele. Em breve.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bodoni.variable} ${cormorant.variable} ${greatVibes.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
