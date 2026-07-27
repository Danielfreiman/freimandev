import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Roboto } from "next/font/google";
import { BRAND, SITE_URL, WHATSAPP_DISPLAY } from "@/data/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SceneBoot } from "@/components/scene/SceneBoot";
import "./globals.css";

/** Bricolage is reserved for headings; Roboto handles every utility role. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Desenvolvimento Web Sob Demanda | Freiman Dev",
    template: "%s | Freiman Dev",
  },
  description:
    "Sites, landing pages, e-commerces, integrações e melhorias técnicas executados sob demanda, com foco em performance, SEO e resultado.",
  applicationName: BRAND.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: BRAND.name,
    title: "Desenvolvimento Web Sob Demanda | Freiman Dev",
    description:
      "Da demanda ao ar. Sites, landing pages, e-commerces e melhorias técnicas executados com clareza, velocidade e responsabilidade.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desenvolvimento Web Sob Demanda | Freiman Dev",
    description:
      "Da demanda ao ar. Sites, landing pages, e-commerces e melhorias técnicas executados sob demanda.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

/** Structured data uses only facts published on the live site. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND.name,
  url: SITE_URL,
  description:
    "Desenvolvimento web sob demanda: sites, landing pages, e-commerces, integrações e melhorias técnicas.",
  telephone: WHATSAPP_DISPLAY,
  areaServed: { "@type": "Country", name: "Brasil" },
  availableLanguage: "pt-BR",
  serviceType: [
    "Desenvolvimento de sites",
    "Landing pages",
    "E-commerce",
    "Integrações",
    "Otimização de performance e SEO",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${roboto.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>
        <SceneBoot />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
