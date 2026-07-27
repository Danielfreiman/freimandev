"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { archivePdf, createAdminPdf, safeFileName } from "@/lib/adminPdf";
import styles from "./DocumentEditor.module.css";

const DEFAULT_CLAUSES = [
  "O objeto deste contrato é a prestação dos serviços descritos na proposta comercial aprovada, que integra este instrumento para todos os fins.",
  "O valor total será pago com entrada obrigatória de 50% antes do início dos trabalhos. Os 50% restantes serão pagos na entrega, salvo cronograma diferente registrado na proposta.",
  "O cronograma começa após a confirmação da entrada de 50% e o recebimento de todos os materiais necessários. Atrasos do contratante prorrogam os prazos na mesma proporção.",
  "Estão incluídas até duas rodadas de ajustes compatíveis com o escopo aprovado. Mudanças de escopo serão orçadas separadamente.",
  "O contratante deve fornecer textos, imagens, acessos e aprovações necessários e declara possuir os direitos de uso dos materiais enviados.",
  "A propriedade do trabalho final é transferida ao contratante após a quitação integral. Ferramentas, bibliotecas e componentes de uso geral permanecem de seus respectivos titulares.",
  "Cada parte deve manter em sigilo informações confidenciais recebidas durante o projeto.",
  "O contrato pode ser rescindido mediante comunicação por escrito. Valores correspondentes ao trabalho já executado permanecem devidos.",
  "Fica eleito o foro do domicílio do prestador para resolver controvérsias, com preferência por tentativa prévia de solução amigável.",
];

type ExistingContract = {
  id: string;
  status: string;
  clauses: unknown;
  signed_at: string | null;
} | null;

export function ContractEditor({
  projectId,
  projectName,
  clientName,
  company,
  totalValue,
  existing,
}: {
  projectId: string;
  projectName: string;
  clientName: string;
  company: string | null;
  totalValue: number;
  existing: ExistingContract;
}) {
  const initialClauses =
    Array.isArray(existing?.clauses) && existing.clauses.every((item) => typeof item === "string")
      ? (existing.clauses as string[])
      : DEFAULT_CLAUSES;
  const [clauses, setClauses] = useState(initialClauses);
  const [status, setStatus] = useState(existing?.status ?? "rascunho");
  const [signedAt, setSignedAt] = useState(existing?.signed_at ?? "");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const currency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  async function saveContract() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();
    const payload = {
      project_id: projectId,
      status,
      clauses: clauses.filter((clause) => clause.trim()),
      upfront_percent: 50,
      signed_at: signedAt || null,
    };
    const result = existing
      ? await supabase.from("contracts").update(payload).eq("id", existing.id)
      : await supabase.from("contracts").insert(payload);
    setSaving(false);
    if (result.error) {
      setMessage("Não foi possível salvar o contrato.");
      return false;
    }
    setMessage("Contrato salvo.");
    router.refresh();
    return true;
  }

  async function generateContract() {
    setGenerating(true);
    const saved = await saveContract();
    if (!saved) {
      setGenerating(false);
      return;
    }

    const blob = createAdminPdf(
      "Contrato de prestação de serviços",
      `${projectName} · ${clientName}`,
      [
        {
          heading: "Partes",
          lines: [
            `Contratante: ${clientName}${company ? ` — ${company}` : ""}.`,
            "Contratado: Freiman Dev.",
          ],
        },
        {
          heading: "Valor e pagamento",
          lines: [
            `Valor total: ${currency(totalValue)}.`,
            `Entrada obrigatória antes do início: ${currency(totalValue * 0.5)} (50%).`,
            `Saldo: ${currency(totalValue * 0.5)} (50%).`,
          ],
        },
        ...clauses
          .filter((clause) => clause.trim())
          .map((clause, index) => ({
            heading: `Cláusula ${index + 1}`,
            lines: [clause],
          })),
        {
          heading: "Aceite",
          lines: [
            "As partes declaram estar de acordo com os termos acima.",
            "Contratante: ______________________________________________",
            "Contratado: _______________________________________________",
            "Data: ____/____/________",
          ],
        },
      ],
    );

    try {
      await archivePdf(
        createClient(),
        projectId,
        "contrato",
        `contrato-${safeFileName(projectName)}`,
        blob,
      );
      setMessage("Contrato gerado e arquivado.");
    } catch {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `contrato-${safeFileName(projectName)}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("PDF baixado. Não foi possível arquivá-lo no Supabase.");
    }
    setGenerating(false);
  }

  return (
    <div className={styles.editor}>
      <p className={styles.notice}>
        Regra fixa: a entrada é sempre 50% e o trabalho só começa após a confirmação do pagamento.
      </p>

      <label className={styles.field}>
        <span className={styles.label}>Status</span>
        <select className={styles.select} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="rascunho">Rascunho</option>
          <option value="enviado">Enviado</option>
          <option value="assinado">Assinado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </label>

      {status === "assinado" && (
        <label className={styles.field}>
          <span className={styles.label}>Data da assinatura</span>
          <input className={styles.input} type="date" value={signedAt} onChange={(e) => setSignedAt(e.target.value)} />
        </label>
      )}

      {clauses.map((clause, index) => (
        <div className={styles.clause} key={index}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <textarea
            className={styles.textarea}
            value={clause}
            onChange={(e) =>
              setClauses(clauses.map((item, itemIndex) => (itemIndex === index ? e.target.value : item)))
            }
          />
          <button
            type="button"
            className={styles.remove}
            aria-label={`Remover cláusula ${index + 1}`}
            onClick={() => setClauses(clauses.filter((_, itemIndex) => itemIndex !== index))}
          >
            ×
          </button>
        </div>
      ))}

      <button type="button" className={styles.add} onClick={() => setClauses([...clauses, ""])}>
        + Adicionar cláusula
      </button>

      <div className={styles.actions}>
        <button type="button" className={styles.primary} disabled={saving || generating} onClick={saveContract}>
          {saving ? "Salvando..." : "Salvar contrato"}
        </button>
        <button type="button" className={styles.secondary} disabled={saving || generating} onClick={generateContract}>
          {generating ? "Gerando..." : "Gerar PDF e arquivar"}
        </button>
        {message && <p className={styles.message} aria-live="polite">{message}</p>}
      </div>
    </div>
  );
}
