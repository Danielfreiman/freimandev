"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import formStyles from "../../novo/page.module.css";

export default function EditarClientePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            name: data.name ?? "",
            company: data.company ?? "",
            email: data.email ?? "",
            phone: data.phone ?? "",
            notes: data.notes ?? "",
          });
        }
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error: dbError } = await supabase
      .from("clients")
      .update({
        name: form.name,
        company: form.company || null,
        email: form.email || null,
        phone: form.phone || null,
        notes: form.notes || null,
      })
      .eq("id", id);

    if (dbError) {
      setError("Erro ao salvar.");
      setSaving(false);
      return;
    }

    router.push(`/admin/clientes/${id}`);
    router.refresh();
  }

  if (loading) return <p style={{ color: "var(--steel)" }}>Carregando...</p>;

  return (
    <div className={formStyles.page}>
      <h1 className={formStyles.title}>Editar cliente</h1>

      <form className={formStyles.form} onSubmit={handleSubmit}>
        {error && <p className={formStyles.error}>{error}</p>}

        <label className={formStyles.field}>
          <span className={formStyles.label}>Nome *</span>
          <input
            required
            className={formStyles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Empresa</span>
          <input
            className={formStyles.input}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </label>

        <div className={formStyles.row}>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Email</span>
            <input
              type="email"
              className={formStyles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className={formStyles.field}>
            <span className={formStyles.label}>Telefone</span>
            <input
              className={formStyles.input}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
        </div>

        <label className={formStyles.field}>
          <span className={formStyles.label}>Notas</span>
          <textarea
            rows={3}
            className={formStyles.textarea}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </label>

        <div className={formStyles.actions}>
          <button type="submit" className={formStyles.save} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            className={formStyles.cancel}
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
