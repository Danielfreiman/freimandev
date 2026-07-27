import { ENGAGEMENTS } from "@/data/process";
import styles from "./Engagement.module.css";

export function Engagement() {
  return (
    <section className={styles.section}>
      <div className={`shell ${styles.inner}`}>
        <header className={styles.head}>
          <p className="eyebrow">Formatos</p>
          <h2 className={styles.title}>
            Execução no formato que a demanda exige.
          </h2>
        </header>

        <dl className={styles.list}>
          {ENGAGEMENTS.map((item) => (
            <div key={item.id} className={styles.row}>
              <dt className={styles.term}>{item.label}</dt>
              <dd className={styles.def}>{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
