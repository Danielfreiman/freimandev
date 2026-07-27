"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

export default function NovoClientePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name") as string,
      company: (form.get("company") as string) || null,
      email: (form.get("email") as string) || null,
      phone: (form.get("phone") as string) || null,
      notes: (form.get("notes") as string) || null,
    };

    const supabase = createClient();
    const { error: dbError } = await supabase.from("clients").insert(payload);

    if (dbError) {
      setError("Erro ao salvar. Tente novamente.");
      setSaving(false);
      return;
    }

    router.push("/admin/clientes");
    router.refresh();
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Novo cliente</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.field}>
          <span className={styles.label}>Nome *</span>
          <input name="name" required className={styles.input} />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Empresa</span>
          <input name="company" className={styles.input} />
        </label>

        <div className={styles.row}>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input name="email" type="email" className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Telefone</span>
            <input name="phone" className={styles.input} />
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Notas</span>
          <textarea name="notes" rows={3} className={styles.textarea} />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.save} disabled={saving}>
            {saving ? "Salvando..." : "Salvar cliente"}
          </button>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
