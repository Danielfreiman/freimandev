import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Freiman Dev",
    short_name: "Freiman Dev",
    description: "Desenvolvimento web sob medida e de alta performance.",
    start_url: "/",
    display: "standalone",
    background_color: "#080a0f",
    theme_color: "#080a0f",
    lang: "pt-BR",
  };
}
