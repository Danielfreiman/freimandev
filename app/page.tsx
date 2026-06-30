import About from "@/components/About";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freiman.dev";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Freiman Dev",
  url: siteUrl,
  description:
    "Desenvolvimento de sites, landing pages e e-commerces de alta performance.",
  areaServed: "BR",
  telephone: "+55 22 99818-3416",
  knowsAbout: [
    "Desenvolvimento Web",
    "Landing Pages",
    "E-commerce",
    "SEO técnico",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded bg-accent px-4 py-2 font-bold text-background-dark transition-transform focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
