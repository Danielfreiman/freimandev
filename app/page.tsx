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
  description: "Portfólio de design digital e experiência de produto para web modernista.",
  areaServed: "BR",
  telephone: "+55 22 99818-3416",
  knowsAbout: ["Design digital", "Web design", "E-commerce", "Experiência do usuário"],
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
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
