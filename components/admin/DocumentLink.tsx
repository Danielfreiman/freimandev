"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function DocumentLink({
  path,
  children,
  className,
}: {
  path: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  const [opening, setOpening] = useState(false);

  async function openDocument() {
    if (!path) return;
    setOpening(true);
    const supabase = createClient();
    const { data } = await supabase.storage
      .from("admin-documents")
      .createSignedUrl(path, 60);
    setOpening(false);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button className={className} type="button" onClick={openDocument} disabled={!path || opening}>
      {opening ? "Abrindo..." : children}
    </button>
  );
}
