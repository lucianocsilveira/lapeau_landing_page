import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LA PEAU | Parfumerie de Contact",
  description: "Uma perfumaria de contato feita para descobrir fragrâncias com calma.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
