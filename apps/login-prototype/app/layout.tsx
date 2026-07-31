import type { Metadata } from "next";
import { headers } from "next/headers";
import "@arcsyn-io/react/styles.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Acessar | ArcSyn Control Plane",
    description: "Acesso seguro à operação ArcSyn.",
    openGraph: {
      title: "Acesse sua operação.",
      description: "Controle, disponibilidade e rastreabilidade em um único ambiente.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "ArcSyn — Acesse sua operação." }],
    },
    twitter: { card: "summary_large_image", title: "Acesse sua operação.", images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-arcsyn-theme="dark">
      <body>{children}</body>
    </html>
  );
}
