import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s | Admin — Freiman Dev", default: "Admin — Freiman Dev" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
