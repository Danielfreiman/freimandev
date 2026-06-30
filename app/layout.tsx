import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freiman.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Freiman Dev | Desenvolvimento de Sites de Alta Performance",
    template: "%s | Freiman Dev",
  },
  description:
    "Sites, landing pages e e-commerces sob medida, rápidos e otimizados para SEO. Transforme sua presença digital em resultados para o seu negócio.",
  applicationName: "Freiman Dev",
  keywords: [
    "desenvolvimento de sites",
    "criação de landing page",
    "desenvolvimento web",
    "e-commerce",
    "SEO técnico",
    "Freiman Dev",
  ],
  authors: [{ name: "Freiman Dev", url: siteUrl }],
  creator: "Freiman Dev",
  publisher: "Freiman Dev",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Freiman Dev",
    title: "Freiman Dev | Sites que convertem e impressionam",
    description:
      "Desenvolvimento web sob medida com alta performance, design estratégico e SEO.",
    images: [
      {
        url: "/assets/projects/sitio-home.png",
        width: 1887,
        height: 938,
        alt: "Portfólio de desenvolvimento web da Freiman Dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freiman Dev | Sites que convertem e impressionam",
    description:
      "Desenvolvimento web sob medida com alta performance, design estratégico e SEO.",
    images: ["/assets/projects/sitio-home.png"],
  },
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
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1c1e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={spaceGrotesk.variable}>
      <body className="bg-background-dark font-display text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
