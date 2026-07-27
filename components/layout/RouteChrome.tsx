"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SceneBoot } from "@/components/scene/SceneBoot";

export function RouteChrome({
  children,
  structuredData,
}: {
  children: React.ReactNode;
  structuredData: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <SceneBoot />
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
