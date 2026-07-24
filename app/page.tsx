import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freiman.dev";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Freiman Dev",
  url: siteUrl,
  description: "Desenvolvimento de sites, landing pages e e-commerces de alta performance.",
  areaServed: "BR",
  telephone: "+55 22 99818-3416",
  knowsAbout: ["Desenvolvimento Web", "Landing Pages", "E-commerce", "SEO técnico"],
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
        href="#portfolio"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-background-dark shadow-lg transition-transform duration-300 focus:translate-y-0"
      >
        Ver projetos
      </a>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
