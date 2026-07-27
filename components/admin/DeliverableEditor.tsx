"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  archivePdf,
  createAdminPdf,
  fileToDataUrl,
  safeFileName,
} from "@/lib/adminPdf";
import styles from "./DocumentEditor.module.css";

type Deliverable = {
  id: string;
  title: string;
  description: string | null;
  items: unknown;
} | null;

type StoredContent = {
  projectType?: "novo" | "repaginacao";
  entries?: string[];
};

function readStoredContent(value: unknown): Required<StoredContent> {
  if (Array.isArray(value)) {
    return {
      projectType: "novo",
      entries: value.filter((item): item is string => typeof item === "string"),
    };
  }
  if (value && typeof value === "object") {
    const stored = value as StoredContent;
    return {
      projectType: stored.projectType === "repaginacao" ? "repaginacao" : "novo",
      entries: Array.isArray(stored.entries)
        ? stored.entries.filter((item): item is string => typeof item === "string")
        : [""],
    };
  }
  return { projectType: "novo", entries: [""] };
}

export function DeliverableEditor({
  projectId,
  projectName,
  clientName,
  existing,
}: {
  projectId: string;
  projectName: string;
  clientName: string;
  existing: Deliverable;
}) {
  const stored = readStoredContent(existing?.items);
  const [title, setTitle] = useState(existing?.title ?? `Entrega — ${projectName}`);
  const [description, setDescription] = useState(existing?.description ?? "");
  const [projectType, setProjectType] = useState<"novo" | "repaginacao">(stored.projectType);
  const [items, setItems] = useState(stored.entries.length ? stored.entries : [""]);
  const [clientLogo, setClientLogo] = useState<string | null>(null);
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [assetNames, setAssetNames] = useState({ logo: "", before: "", after: "" });
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function loadImage(
    file: File | undefined,
    target: "logo" | "before" | "after",
  ) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Selecione uma imagem PNG, JPG ou WebP.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    if (target === "logo") setClientLogo(dataUrl);
    if (target === "before") setBeforeImage(dataUrl);
    if (target === "after") setAfterImage(dataUrl);
    setAssetNames((current) => ({ ...current, [target]: file.name }));
  }

  async function saveDeliverable() {
    if (!title.trim()) {
      setMessage("Informe um título.");
      return null;
    }
    setSaving(true);
    setMessage("");
    const payload = {
      project_id: projectId,
      title: title.trim(),
      description: description.trim() || null,
      items: {
        projectType,
        entries: items.filter((item) => item.trim()),
      },
    };
    const supabase = createClient();
    const result = existing
      ? await supabase.from("deliverables").update(payload).eq("id", existing.id).select("id").single()
      : await supabase.from("deliverables").insert(payload).select("id").single();
    setSaving(false);

    if (result.error || !result.data) {
      setMessage("Não foi possível salvar o entregável.");
      return null;
    }
    setMessage("Entregável salvo.");
    if (!existing) router.replace(`/admin/projetos/${projectId}/entregavel/${result.data.id}`);
    router.refresh();
    return result.data.id;
  }

  async function generateDeliverable() {
    if (projectType === "repaginacao" && (!beforeImage || !afterImage)) {
      setMessage("Projetos de repaginação precisam das imagens de antes e depois.");
      return;
    }

    setGenerating(true);
    const id = await saveDeliverable();
    if (!id) {
      setGenerating(false);
      return;
    }

    const sections = [
      {
        heading: "Visão geral",
        lines: [
          description || "Entrega concluída conforme o escopo aprovado.",
          `Tipo de projeto: ${projectType === "repaginacao" ? "Repaginação" : "Novo projeto"}.`,
        ],
      },
      ...(projectType === "repaginacao" && beforeImage && afterImage
        ? [
            {
              heading: "Evolução visual",
              lines: ["Comparativo do projeto antes e depois da intervenção."],
              images: [
                { dataUrl: beforeImage, label: "Antes", caption: "Estado anterior do projeto" },
                { dataUrl: afterImage, label: "Depois", caption: "Resultado entregue" },
              ],
            },
          ]
        : []),
      {
        heading: "O que foi entregue",
        lines: items
          .filter((item) => item.trim())
          .map((item, index) => `${index + 1}. ${item}`),
      },
      {
        heading: "Encerramento",
        lines: [
          "Este documento registra os itens disponibilizados ao cliente na conclusão desta etapa.",
          `Data da geração: ${new Date().toLocaleDateString("pt-BR")}.`,
        ],
      },
    ];

    const blob = createAdminPdf(
      title,
      `${projectName} · ${clientName}`,
      sections,
      {
        clientLogo,
        documentLabel: "Relatório de entrega",
      },
    );

    try {
      await archivePdf(
        createClient(),
        projectId,
        "entregavel",
        `entregavel-${safeFileName(title)}`,
        blob,
      );
      setMessage("Entregável gerado e arquivado.");
    } catch {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `entregavel-${safeFileName(title)}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("PDF baixado. Não foi possível arquivá-lo no Supabase.");
    }
    setGenerating(false);
  }

  return (
    <div className={styles.editor}>
      <div className={styles.rowFields}>
        <label className={styles.field}>
          <span className={styles.label}>Título</span>
          <input className={styles.input} value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Tipo de projeto</span>
          <select
            className={styles.select}
            value={projectType}
            onChange={(event) => setProjectType(event.target.value as "novo" | "repaginacao")}
          >
            <option value="novo">Novo projeto</option>
            <option value="repaginacao">Repaginação</option>
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Resumo do trabalho realizado</span>
        <textarea className={styles.textarea} value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>

      <div className={styles.assetGrid}>
        <label className={styles.assetField}>
          <span>Logo do cliente</span>
          <small>{assetNames.logo || "Opcional; o espaço será reservado no PDF"}</small>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => loadImage(event.target.files?.[0], "logo")} />
        </label>

        {projectType === "repaginacao" && (
          <>
            <label className={styles.assetField}>
              <span>Imagem anterior</span>
              <small>{assetNames.before || "Obrigatória para repaginação"}</small>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => loadImage(event.target.files?.[0], "before")} />
            </label>
            <label className={styles.assetField}>
              <span>Imagem do resultado</span>
              <small>{assetNames.after || "Obrigatória para repaginação"}</small>
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => loadImage(event.target.files?.[0], "after")} />
            </label>
          </>
        )}
      </div>

      <span className={styles.label}>Itens entregues</span>
      {items.map((item, index) => (
        <div className={styles.clause} key={index}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <textarea
            className={styles.textarea}
            value={item}
            placeholder="Ex.: Site publicado, acesso ao painel e arquivos-fonte"
            onChange={(event) =>
              setItems(items.map((value, itemIndex) => (itemIndex === index ? event.target.value : value)))
            }
          />
          <button
            type="button"
            className={styles.remove}
            aria-label={`Remover item ${index + 1}`}
            onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            ×
          </button>
        </div>
      ))}
      <button type="button" className={styles.add} onClick={() => setItems([...items, ""])}>
        + Adicionar item
      </button>

      <div className={styles.actions}>
        <button type="button" className={styles.primary} disabled={saving || generating} onClick={saveDeliverable}>
          {saving ? "Salvando..." : "Salvar entregável"}
        </button>
        <button type="button" className={styles.secondary} disabled={saving || generating} onClick={generateDeliverable}>
          {generating ? "Gerando..." : "Gerar PDF e arquivar"}
        </button>
        {message && <p className={styles.message} aria-live="polite">{message}</p>}
      </div>
    </div>
  );
}
