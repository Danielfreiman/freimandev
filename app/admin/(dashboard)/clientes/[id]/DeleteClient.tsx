"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

export function DeleteClient({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Excluir este cliente e todos os projetos vinculados?")) return;

    const supabase = createClient();
    await supabase.from("clients").delete().eq("id", id);
    router.push("/admin/clientes");
    router.refresh();
  }

  return (
    <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
      Excluir
    </button>
  );
}
