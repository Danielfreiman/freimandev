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

const PRESETS = [
  { key: "landing", label: "Landing page", description: "Design e desenvolvimento de landing page", price: 3200 },
  { key: "institucional", label: "Site institucional", description: "Site institucional de até 5 páginas", price: 5800 },
  { key: "repaginacao", label: "Repaginação", description: "Repaginação visual e melhoria de experiência", price: 4500 },
  { key: "ecommerce", label: "E-commerce", description: "Loja virtual com catálogo, carrinho e pagamento", price: 8500 },
  { key: "pagina", label: "Página adicional", description: "Página adicional", price: 750 },
  { key: "cms", label: "Painel de conteúdo", description: "CMS ou painel administrativo", price: 2200 },
  { key: "integracao", label: "Integração", description: "Integração com serviço ou API externa", price: 1600 },
  { key: "seo", label: "SEO técnico", description: "Configuração técnica de SEO e performance", price: 1200 },
] as const;

export function BudgetEditor({
  projectId,
  items: initialItems,
  totalValue,
  projectName,
  clientName,
  clientCompany,
}: Props) {
  const [items, setItems] = useState(initialItems);
  const [clientLogo, setClientLogo] = useState<string | null>(null);
  const [logoName, setLogoName] = useState("");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const estimated = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.unit_price),
    0,
  );

  const currency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function isSelected(description: string) {
    return items.some((item) => item.description === description);
  }

  function togglePreset(preset: (typeof PRESETS)[number]) {
    if (isSelected(preset.description)) {
      setItems(items.filter((item) => item.description !== preset.description));
      return;
    }
    setItems([
      ...items,
      {
        id: `preset-${preset.key}`,
        description: preset.description,
        quantity: 1,
        unit_price: preset.price,
        sort_order: items.length,
      },
    ]);
  }

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
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  }

  async function handleLogo(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Selecione uma imagem para o logo.");
      return;
    }
    setClientLogo(await fileToDataUrl(file));
    setLogoName(file.name);
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
      .map((item, index) => ({
        project_id: projectId,
        description: item.description.trim(),
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        sort_order: index,
      }));

    if (rows.length) {
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
          heading: "Contexto",
          lines: [
            `Proposta preparada para ${clientName}${clientCompany ? `, ${clientCompany}` : ""}.`,
            "O escopo abaixo pode ser refinado antes da contratação.",
          ],
        },
        {
          heading: "Escopo e investimento",
          lines: validItems.map(
            (item) =>
              `${item.description}  |  ${Number(item.quantity).toLocaleString("pt-BR")} × ${currency(Number(item.unit_price))}  |  ${currency(Number(item.quantity) * Number(item.unit_price))}`,
          ),
        },
        {
          heading: "Investimento total",
          lines: [
            currency(estimated),
            `Entrada para início (50%): ${currency(estimated * 0.5)}`,
            `Saldo na entrega (50%): ${currency(estimated * 0.5)}`,
          ],
        },
        {
          heading: "Condições",
          lines: [
            "O início do projeto está condicionado à assinatura do contrato e ao pagamento da entrada de 50%.",
            "Prazos começam após o recebimento dos materiais necessários. Alterações fora do escopo serão orçadas separadamente.",
            "Validade desta proposta: 15 dias.",
          ],
        },
      ],
      {
        clientLogo,
        documentLabel: "Proposta comercial",
      },
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
      <div>
        <span className={styles.groupLabel}>Composição rápida</span>
        <p className={styles.groupHelp}>
          Marque os serviços para montar a estimativa. Quantidades e valores continuam editáveis.
        </p>
        <div className={styles.presets}>
          {PRESETS.map((preset) => {
            const checked = isSelected(preset.description);
            return (
              <label className={`${styles.preset} ${checked ? styles.presetSelected : ""}`} key={preset.key}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePreset(preset)}
                />
                <span>
                  <strong>{preset.label}</strong>
                  <small>A partir de {currency(preset.price)}</small>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.items}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.row}>
            <input
              className={styles.desc}
              aria-label={`Descrição do item ${index + 1}`}
              placeholder="Descrição do item"
              value={item.description}
              onChange={(event) => updateItem(index, "description", event.target.value)}
            />
            <input
              className={styles.qty}
              aria-label={`Quantidade do item ${index + 1}`}
              type="number"
              min="0.01"
              step="0.01"
              value={item.quantity}
              onChange={(event) => updateItem(index, "quantity", event.target.value)}
            />
            <input
              className={styles.price}
              aria-label={`Valor unitário do item ${index + 1}`}
              type="number"
              min="0"
              step="0.01"
              value={item.unit_price}
              onChange={(event) => updateItem(index, "unit_price", event.target.value)}
            />
            <span className={styles.subtotal}>
              {currency(Number(item.quantity) * Number(item.unit_price))}
            </span>
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
      </div>

      <button type="button" className={styles.add} onClick={addItem}>
        + Adicionar item personalizado
      </button>

      <label className={styles.logoField}>
        <span>
          <strong>Logo do cliente</strong>
          <small>{logoName || "PNG ou JPG; se vazio, o PDF reserva o espaço."}</small>
        </span>
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleLogo(event.target.files?.[0])} />
      </label>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.totalLabel}>Estimativa</span>
          <span className={styles.totalValue}>{currency(estimated)}</span>
        </div>
        {totalValue !== estimated && totalValue > 0 && (
          <p className={styles.note}>
            Valor atual do projeto: {currency(totalValue)} — ao salvar, será atualizado para {currency(estimated)}.
          </p>
        )}
        <div className={styles.actions}>
          <button type="button" className={styles.save} disabled={saving || generating} onClick={saveBudget}>
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
        </div>
        {message && <p className={styles.message} aria-live="polite">{message}</p>}
      </div>
    </div>
  );
}
