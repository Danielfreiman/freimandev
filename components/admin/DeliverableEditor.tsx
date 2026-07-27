"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  archivePdf,
  createAdminPdf,
  fileToDataUrl,
  safeFileName,
} from "@/lib/adminPdf";
import { ClientLogoField } from "./ClientLogoField";
import styles from "./DocumentEditor.module.css";

type Deliverable = {
  id: string;
  title: string;
  description: string | null;
  items: unknown;
} | null;

type StoredComparison = {
  id: string;
  title: string;
  beforePath: string;
  afterPath: string;
};

type StoredContent = {
  projectType: "novo" | "repaginacao";
  entries: string[];
  comparisons: StoredComparison[];
};

type Comparison = StoredComparison & {
  beforeFile: File | null;
  afterFile: File | null;
  beforeData: string | null;
  afterData: string | null;
  beforeName: string;
  afterName: string;
};

function readStoredContent(value: unknown): StoredContent {
  if (Array.isArray(value)) {
    return {
      projectType: "novo",
      entries: value.filter((item): item is string => typeof item === "string"),
      comparisons: [],
    };
  }

  if (value && typeof value === "object") {
    const stored = value as Partial<StoredContent>;
    return {
      projectType: stored.projectType === "repaginacao" ? "repaginacao" : "novo",
      entries: Array.isArray(stored.entries)
        ? stored.entries.filter((item): item is string => typeof item === "string")
        : [""],
      comparisons: Array.isArray(stored.comparisons)
        ? stored.comparisons.filter(
            (item): item is StoredComparison =>
              Boolean(
                item &&
                  typeof item.id === "string" &&
                  typeof item.title === "string" &&
                  typeof item.beforePath === "string" &&
                  typeof item.afterPath === "string",
              ),
          )
        : [],
    };
  }

  return { projectType: "novo", entries: [""], comparisons: [] };
}

function comparisonFromStored(item: StoredComparison): Comparison {
  return {
    ...item,
    beforeFile: null,
    afterFile: null,
    beforeData: null,
    afterData: null,
    beforeName: item.beforePath ? "Imagem salva" : "",
    afterName: item.afterPath ? "Imagem salva" : "",
  };
}

function emptyComparison(index: number): Comparison {
  return {
    id: `comparativo-${Date.now()}-${index}`,
    title: "",
    beforePath: "",
    afterPath: "",
    beforeFile: null,
    afterFile: null,
    beforeData: null,
    afterData: null,
    beforeName: "",
    afterName: "",
  };
}

export function DeliverableEditor({
  projectId,
  projectName,
  clientId,
  clientName,
  clientLogoPath,
  existing,
}: {
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  clientLogoPath: string | null;
  existing: Deliverable;
}) {
  const initialContent = useRef(readStoredContent(existing?.items)).current;
  const [recordId, setRecordId] = useState(existing?.id ?? null);
  const [title, setTitle] = useState(existing?.title ?? `Entrega — ${projectName}`);
  const [description, setDescription] = useState(existing?.description ?? "");
  const [projectType, setProjectType] = useState<"novo" | "repaginacao">(
    initialContent.projectType,
  );
  const [items, setItems] = useState(
    initialContent.entries.length ? initialContent.entries : [""],
  );
  const [comparisons, setComparisons] = useState<Comparison[]>(
    initialContent.comparisons.length
      ? initialContent.comparisons.map(comparisonFromStored)
      : [emptyComparison(0)],
  );
  const [clientLogo, setClientLogo] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function storageImageToDataUrl(path: string) {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from("admin-documents")
      .createSignedUrl(path, 120);
    if (!data?.signedUrl) return null;
    const response = await fetch(data.signedUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    return fileToDataUrl(new File([blob], "imagem", { type: blob.type }));
  }

  useEffect(() => {
    if (!existing?.id || !initialContent.comparisons.length) return;
    let active = true;

    async function loadSavedComparisons() {
      const loaded = await Promise.all(
        initialContent.comparisons.map(async (item) => ({
          ...comparisonFromStored(item),
          beforeData: await storageImageToDataUrl(item.beforePath),
          afterData: await storageImageToDataUrl(item.afterPath),
        })),
      );
      if (active) setComparisons(loaded);
    }

    loadSavedComparisons();
    return () => {
      active = false;
    };
  }, [existing?.id, initialContent]);

  async function selectComparisonImage(
    comparisonId: string,
    side: "before" | "after",
    file?: File,
  ) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setMessage("Use imagens PNG, JPG ou WebP.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setMessage("Cada imagem deve ter no máximo 8 MB.");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setComparisons((current) =>
      current.map((comparison) =>
        comparison.id === comparisonId
          ? {
              ...comparison,
              [`${side}File`]: file,
              [`${side}Data`]: dataUrl,
              [`${side}Name`]: file.name,
            }
          : comparison,
      ),
    );
    setMessage("Imagem selecionada. Salve o entregável para confirmar.");
  }

  function validateComparisons() {
    if (projectType !== "repaginacao") return true;
    const valid =
      comparisons.length > 0 &&
      comparisons.every(
        (comparison) =>
          comparison.title.trim() &&
          (comparison.beforeFile || comparison.beforePath) &&
          (comparison.afterFile || comparison.afterPath),
      );
    if (!valid) {
      setMessage("Cada comparativo precisa de título, imagem anterior e imagem do resultado.");
    }
    return valid;
  }

  async function uploadComparison(
    deliverableId: string,
    comparison: Comparison,
  ): Promise<Comparison> {
    const supabase = createClient();
    let beforePath = comparison.beforePath;
    let afterPath = comparison.afterPath;

    for (const side of ["before", "after"] as const) {
      const file = comparison[`${side}File`];
      if (!file) continue;
      const path = `deliverables/${projectId}/${deliverableId}/${comparison.id}-${side}`;
      const { error } = await supabase.storage
        .from("admin-documents")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      if (side === "before") beforePath = path;
      else afterPath = path;
    }

    return {
      ...comparison,
      beforePath,
      afterPath,
      beforeFile: null,
      afterFile: null,
      beforeName: "Imagem salva",
      afterName: "Imagem salva",
    };
  }

  async function saveDeliverable() {
    if (!title.trim()) {
      setMessage("Informe um título.");
      return null;
    }
    if (!validateComparisons()) return null;

    setSaving(true);
    setMessage("");
    const supabase = createClient();
    let deliverableId = recordId;

    if (!deliverableId) {
      const { data, error } = await supabase
        .from("deliverables")
        .insert({
          project_id: projectId,
          title: title.trim(),
          description: description.trim() || null,
          items: { projectType, entries: [], comparisons: [] },
        })
        .select("id")
        .single();
      if (error || !data) {
        setMessage("Não foi possível criar o entregável.");
        setSaving(false);
        return null;
      }
      deliverableId = data.id;
      setRecordId(data.id);
    }

    try {
      const savedComparisons =
        projectType === "repaginacao"
          ? await Promise.all(
              comparisons.map((comparison) =>
                uploadComparison(deliverableId!, comparison),
              ),
            )
          : [];
      const storedComparisons = savedComparisons.map(
        ({ id, title: comparisonTitle, beforePath, afterPath }) => ({
          id,
          title: comparisonTitle.trim(),
          beforePath,
          afterPath,
        }),
      );

      const { error } = await supabase
        .from("deliverables")
        .update({
          title: title.trim(),
          description: description.trim() || null,
          items: {
            projectType,
            entries: items.filter((item) => item.trim()),
            comparisons: storedComparisons,
          },
        })
        .eq("id", deliverableId);
      if (error) throw error;

      setComparisons(savedComparisons.length ? savedComparisons : comparisons);
      setMessage("Entregável e imagens salvos.");
      if (!existing) {
        router.replace(`/admin/projetos/${projectId}/entregavel/${deliverableId}`);
      }
      router.refresh();
      setSaving(false);
      return { id: deliverableId, comparisons: savedComparisons };
    } catch {
      setMessage("Não foi possível salvar o entregável e suas imagens.");
      setSaving(false);
      return null;
    }
  }

  async function generateDeliverable() {
    setGenerating(true);
    const saved = await saveDeliverable();
    if (!saved) {
      setGenerating(false);
      return;
    }

    const comparisonsWithData = await Promise.all(
      saved.comparisons.map(async (comparison) => ({
        ...comparison,
        beforeData:
          comparison.beforeData ||
          (comparison.beforePath
            ? await storageImageToDataUrl(comparison.beforePath)
            : null),
        afterData:
          comparison.afterData ||
          (comparison.afterPath
            ? await storageImageToDataUrl(comparison.afterPath)
            : null),
      })),
    );

    const blob = createAdminPdf(
      title,
      `${projectName} · ${clientName}`,
      [
        {
          heading: "Visão geral",
          lines: [
            description || "Entrega concluída conforme o escopo aprovado.",
            `Tipo de projeto: ${projectType === "repaginacao" ? "Repaginação" : "Novo projeto"}.`,
          ],
        },
        ...comparisonsWithData
          .filter(
            (comparison) => comparison.beforeData && comparison.afterData,
          )
          .map((comparison) => ({
            heading: comparison.title,
            lines: ["Comparativo antes e depois da intervenção."],
            images: [
              {
                dataUrl: comparison.beforeData!,
                label: "Antes",
                caption: `${comparison.title} — estado anterior`,
              },
              {
                dataUrl: comparison.afterData!,
                label: "Depois",
                caption: `${comparison.title} — resultado entregue`,
              },
            ],
          })),
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
      ],
      { clientLogo, documentLabel: "Relatório de entrega" },
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

      <ClientLogoField
        clientId={clientId}
        initialPath={clientLogoPath}
        onLogoReady={setClientLogo}
      />

      {projectType === "repaginacao" && (
        <div className={styles.comparisonList}>
          <div>
            <span className={styles.label}>Comparativos de repaginação</span>
            <p className={styles.help}>Crie um bloco para cada tela ou fluxo transformado.</p>
          </div>
          {comparisons.map((comparison, index) => (
            <div className={styles.comparisonCard} key={comparison.id}>
              <div className={styles.comparisonHead}>
                <span>Comparativo {String(index + 1).padStart(2, "0")}</span>
                {comparisons.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setComparisons((current) =>
                        current.filter((item) => item.id !== comparison.id),
                      )
                    }
                  >
                    Remover
                  </button>
                )}
              </div>
              <label className={styles.field}>
                <span className={styles.label}>Título do comparativo *</span>
                <input
                  className={styles.input}
                  value={comparison.title}
                  placeholder="Ex.: Homepage, checkout ou área do cliente"
                  onChange={(event) =>
                    setComparisons((current) =>
                      current.map((item) =>
                        item.id === comparison.id
                          ? { ...item, title: event.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </label>
              <div className={styles.assetGrid}>
                <label className={styles.assetField}>
                  <span>Imagem anterior *</span>
                  <small>{comparison.beforeName || "Selecione o estado anterior"}</small>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) =>
                      selectComparisonImage(
                        comparison.id,
                        "before",
                        event.target.files?.[0],
                      )
                    }
                  />
                </label>
                <label className={styles.assetField}>
                  <span>Imagem do resultado *</span>
                  <small>{comparison.afterName || "Selecione o resultado entregue"}</small>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) =>
                      selectComparisonImage(
                        comparison.id,
                        "after",
                        event.target.files?.[0],
                      )
                    }
                  />
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            className={styles.add}
            onClick={() =>
              setComparisons((current) => [
                ...current,
                emptyComparison(current.length),
              ])
            }
          >
            + Adicionar comparativo
          </button>
        </div>
      )}

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
