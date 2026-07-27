"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { fileToDataUrl } from "@/lib/adminPdf";
import styles from "./ClientLogoField.module.css";

export function ClientLogoField({
  clientId,
  initialPath,
  onLogoReady,
}: {
  clientId: string;
  initialPath: string | null;
  onLogoReady: (dataUrl: string) => void;
}) {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState(initialPath ? "Logo salva" : "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!initialPath) return;
    let active = true;

    async function loadSavedLogo() {
      const supabase = createClient();
      const { data } = await supabase.storage
        .from("admin-documents")
        .createSignedUrl(initialPath!, 120);
      if (!data?.signedUrl || !active) return;

      try {
        const response = await fetch(data.signedUrl);
        if (!response.ok || !active) return;
        const blob = await response.blob();
        const file = new File([blob], "logo-cliente", { type: blob.type });
        const dataUrl = await fileToDataUrl(file);
        if (active) onLogoReady(dataUrl);
      } catch {
        if (active) setMessage("A logo salva não pôde ser carregada.");
      }
    }

    loadSavedLogo();
    return () => {
      active = false;
    };
  }, [initialPath, onLogoReady]);

  function selectFile(file?: File) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setMessage("Use uma imagem PNG, JPG ou WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("A imagem deve ter no máximo 5 MB.");
      return;
    }
    setPendingFile(file);
    setFileName(file.name);
    setMessage("Imagem selecionada. Clique em Salvar logo para confirmar.");
  }

  async function saveLogo() {
    if (!pendingFile) return;
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const path = `client-logos/${clientId}/logo`;
    const { error: uploadError } = await supabase.storage
      .from("admin-documents")
      .upload(path, pendingFile, {
        contentType: pendingFile.type,
        upsert: true,
      });

    if (uploadError) {
      setMessage("Não foi possível enviar a logo.");
      setSaving(false);
      return;
    }

    const { error: clientError } = await supabase
      .from("clients")
      .update({ logo_url: path })
      .eq("id", clientId);
    if (clientError) {
      setMessage("A imagem foi enviada, mas não foi vinculada ao cliente.");
      setSaving(false);
      return;
    }

    onLogoReady(await fileToDataUrl(pendingFile));
    setPendingFile(null);
    setFileName("Logo salva");
    setMessage("Logo salva e pronta para os próximos documentos.");
    setSaving(false);
  }

  return (
    <div className={styles.field}>
      <label>
        <span>
          <strong>Logo do cliente</strong>
          <small>{fileName || "PNG, JPG ou WebP; máximo de 5 MB."}</small>
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => selectFile(event.target.files?.[0])}
        />
      </label>
      <button type="button" disabled={!pendingFile || saving} onClick={saveLogo}>
        {saving ? "Salvando..." : "Salvar logo"}
      </button>
      {message && <p aria-live="polite">{message}</p>}
    </div>
  );
}
