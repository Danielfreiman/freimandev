"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { archivePdf, createAdminPdf, safeFileName } from "@/lib/adminPdf";
import styles from "./BudgetEditor.module.css";

interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  sort_order: number;
}

interface Props {
  projectId: string;
  items: BudgetItem[];
  totalValue: number;
  projectName: string;
  clientName: string;
  clientCompany?: string | null;
}

export function BudgetEditor({
  projectId,
  items: initialItems,
  totalValue,
  projectName,
  clientName,
  clientCompany,
}: Props) {
  const [items, setItems] = useState(initialItems);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const estimated = items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0,
  );

  function addItem() {
    setItems([
      ...items,
      {
        id: `new-${Date.now()}`,
        description: "",
        quantity: 1,
        unit_price: 0,
        sort_order: items.length,
      },
    ]);
  }

  function updateItem(index: number, field: string, value: string | number) {
    setItems(
      items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function saveBudget() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();

    const { error: deleteError } = await supabase
      .from("budget_items")
      .delete()
      .eq("project_id", projectId);
    if (deleteError) {
      setMessage("Não foi possível salvar o orçamento.");
      setSaving(false);
      return false;
    }

    const rows = items
      .filter((item) => item.description.trim())
      .map((item, i) => ({
        project_id: projectId,
        description: item.description,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        sort_order: i,
      }));

    if (rows.length > 0) {
      const { error } = await supabase.from("budget_items").insert(rows);
      if (error) {
        setMessage("Não foi possível salvar os itens.");
        setSaving(false);
        return false;
      }
    }

    const { error: projectError } = await supabase
      .from("projects")
      .update({ total_value: estimated })
      .eq("id", projectId);

    setSaving(false);
    if (projectError) {
      setMessage("Os itens foram salvos, mas o total do projeto não foi atualizado.");
      return false;
    }
    router.refresh();
    return true;
  }

  function currency(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  async function handleGenerate() {
    setGenerating(true);
    setMessage("");
    const saved = await saveBudget();
    if (!saved) {
      setGenerating(false);
      return;
    }

    const validItems = items.filter((item) => item.description.trim());
    const blob = createAdminPdf(
      "Proposta comercial",
      `${projectName} · ${clientCompany || clientName}`,
      [
        {
          heading: "Contratante",
          lines: [clientName, clientCompany || ""].filter(Boolean),
        },
        {
          heading: "Investimento",
          lines: validItems.map(
            (item) =>
              `${item.description} — ${Number(item.quantity).toLocaleString("pt-BR")} × ${currency(Number(item.unit_price))} = ${currency(Number(item.quantity) * Number(item.unit_price))}`,
          ),
        },
        { heading: "Total estimado", lines: [currency(estimated)] },
        {
          heading: "Condição",
          lines: [
            "A proposta pode sofrer ajustes de escopo antes da contratação.",
            "O início do projeto está condicionado à assinatura do contrato e ao pagamento da entrada de 50%.",
          ],
        },
      ],
    );

    try {
      await archivePdf(
        createClient(),
        projectId,
        "orcamento",
        `proposta-${safeFileName(projectName)}`,
        blob,
      );
      setMessage("Proposta gerada e arquivada.");
    } catch {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `proposta-${safeFileName(projectName)}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("PDF baixado. Não foi possível arquivá-lo no Supabase.");
    }
    setGenerating(false);
  }

  return (
    <div className={styles.editor}>
      <div className={styles.items}>
        {items.map((item, i) => (
          <div key={item.id} className={styles.row}>
            <input
              className={styles.desc}
              placeholder="Descrição do item"
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
            />
            <input
              className={styles.qty}
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Qtd"
              value={item.quantity}
              onChange={(e) => updateItem(i, "quantity", e.target.value)}
            />
            <input
              className={styles.price}
              type="number"
              min="0"
              step="0.01"
              placeholder="Valor unit."
              value={item.unit_price}
              onChange={(e) => updateItem(i, "unit_price", e.target.value)}
            />
            <span className={styles.subtotal}>
              {currency(item.quantity * item.unit_price)}
            </span>
            <button
              type="button"
              className={styles.remove}
              onClick={() => removeItem(i)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button type="button" className={styles.add} onClick={addItem}>
        + Adicionar item
      </button>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.totalLabel}>Estimativa</span>
          <span className={styles.totalValue}>{currency(estimated)}</span>
        </div>
        {totalValue !== estimated && totalValue > 0 && (
          <p className={styles.note}>
            Valor atual do projeto: {currency(totalValue)} — ao salvar, será
            atualizado para {currency(estimated)}.
          </p>
        )}
        <button
          type="button"
          className={styles.save}
          disabled={saving}
          onClick={saveBudget}
        >
          {saving ? "Salvando..." : "Salvar orçamento"}
        </button>
        <button
          type="button"
          className={styles.secondary}
          disabled={saving || generating || estimated <= 0}
          onClick={handleGenerate}
        >
          {generating ? "Gerando..." : "Gerar proposta em PDF"}
        </button>
        {message && (
          <p className={styles.message} aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
