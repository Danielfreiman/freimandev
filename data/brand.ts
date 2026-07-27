/**
 * Single source of truth for Freiman Dev brand + contact data.
 *
 * Every value here was read off the live site at https://freimandev.com.br
 * (wordmark, icon colour, WhatsApp number, response time). Nothing is invented.
 * Fields the live site does not publish — e-mail, social profiles, address —
 * are deliberately absent so they are never rendered.
 */

/**
 * Canonical origin. Overridable per environment via NEXT_PUBLIC_SITE_URL
 * (see .env.example) so previews do not advertise the production URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.freimandev.com.br";

export const BRAND = {
  /** Wordmark is set as two parts: solid + accented suffix. */
  name: "Freiman Dev",
  wordmark: { head: "FREIMAN", tail: "/DEV" },
  tagline: "Desenvolvimento web sob demanda.",
  /** Confirmed on the live site footer/contact block. */
  responseTime: "Resposta em até 24 horas úteis",
} as const;

const WHATSAPP_NUMBER = "5522998183416";

/** Human-readable form, exactly as displayed on the live site. */
export const WHATSAPP_DISPLAY = "+55 22 99818-3416";

/**
 * Builds a wa.me deep link with a pre-filled first message.
 * Defaults to the brief's opening line.
 */
export function whatsappUrl(
  message = "Olá, vim pelo site da Freiman Dev e gostaria de conversar sobre uma demanda.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
] as const;
