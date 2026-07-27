import type { MetadataRoute } from "next";
import { BRAND } from "@/data/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — Desenvolvimento web sob demanda`,
    short_name: BRAND.name,
    description:
      "Sites, landing pages, e-commerces, integrações e melhorias técnicas executados sob demanda.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070a",
    theme_color: "#05070a",
    lang: "pt-BR",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
