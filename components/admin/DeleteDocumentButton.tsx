"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export function DeleteDocumentButton({
  documentId,
  fileName,
  filePath,
  className,
}: {
  documentId: string;
  fileName: string;
  filePath: string | null;
  className?: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Excluir “${fileName}”? Esta ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    setError("");
    const supabase = createClient();

    const { error: documentError } = await supabase
      .from("documents")
      .delete()
      .eq("id", documentId);

    if (documentError) {
      setError("Não foi possível excluir.");
      setDeleting(false);
      return;
    }

    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("admin-documents")
        .remove([filePath]);

      if (storageError) {
        console.error("Document storage cleanup failed:", storageError);
      }
    }

    router.refresh();
  }

  return (
    <span>
      <button
        type="button"
        className={className}
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Excluindo..." : "Excluir"}
      </button>
      {error && <span role="alert">{error}</span>}
    </span>
  );
}
