"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./PaymentList.module.css";

interface Payment {
  id: string;
  amount: number;
  type: string;
  status: string;
  due_date: string | null;
  paid_at: string | null;
  notes: string | null;
}

interface Props {
  projectId: string;
  payments: Payment[];
}

const TYPE_LABELS: Record<string, string> = {
  entrada: "Entrada",
  parcela: "Parcela",
  final: "Final",
};

const STATUS_LABELS: Record<string, string> = {
  pendente: "Pendente",
  pago: "Pago",
  atrasado: "Atrasado",
  cancelado: "Cancelado",
};

export function PaymentList({ projectId, payments }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function currency(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const status = form.get("status") as string;

    const { error } = await supabase.from("payments").insert({
      project_id: projectId,
      amount: Number(form.get("amount")),
      type: form.get("type") as string,
      status,
      due_date: (form.get("due_date") as string) || null,
      paid_at: status === "pago" ? new Date().toISOString().slice(0, 10) : null,
      notes: (form.get("notes") as string) || null,
    });

    setSaving(false);
    if (error) return;
    setShowForm(false);
    router.refresh();
  }

  async function markPaid(id: string) {
    const supabase = createClient();
    await supabase
      .from("payments")
      .update({ status: "pago", paid_at: new Date().toISOString().slice(0, 10) })
      .eq("id", id);
    router.refresh();
  }

  return (
    <div className={styles.wrap}>
      {payments.length > 0 ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Vencimento</th>
                <th>Pago em</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{TYPE_LABELS[p.type] ?? p.type}</td>
                  <td className={styles.amount}>
                    {currency(Number(p.amount))}
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[`status_${p.status}`] ?? ""}`}
                    >
                      {STATUS_LABELS[p.status] ?? p.status}
                    </span>
                  </td>
                  <td>
                    {p.due_date
                      ? new Date(p.due_date).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td>
                    {p.paid_at
                      ? new Date(p.paid_at).toLocaleDateString("pt-BR")
                      : "—"}
                  </td>
                  <td>
                    {p.status !== "pago" && p.status !== "cancelado" && (
                      <button
                        type="button"
                        className={styles.paidBtn}
                        onClick={() => markPaid(p.id)}
                      >
                        Marcar pago
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.empty}>Nenhum pagamento registrado.</p>
      )}

      {!showForm ? (
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowForm(true)}
        >
          + Registrar pagamento
        </button>
      ) : (
        <form className={styles.form} onSubmit={handleAdd}>
          <div className={styles.formRow}>
            <select name="type" className={styles.input} defaultValue="entrada">
              <option value="entrada">Entrada</option>
              <option value="parcela">Parcela</option>
              <option value="final">Final</option>
            </select>
            <input
              name="amount"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Valor"
              className={styles.input}
            />
            <select name="status" className={styles.input} defaultValue="pendente">
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
            </select>
            <input name="due_date" type="date" className={styles.input} />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
