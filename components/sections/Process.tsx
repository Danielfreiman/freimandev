import { PROCESS } from "@/data/process";
import styles from "./Process.module.css";

/**
 * A five-bar glyph in the same language as the Signature Scene. It carries the
 * same story in miniature: dispersed → aligned → assembled → live.
 */
function StageGlyph({ step }: { step: number }) {
  return (
    <span
      className={`${styles.glyph} ${styles[`step${step}`] ?? ""}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function Process() {
  return (
    <section id="processo" className={styles.section}>
      <div className={`shell ${styles.head}`}>
        <p className="eyebrow">Processo</p>
        <h2 className={styles.title}>
          A demanda entra. A execução acontece.
        </h2>
      </div>

      <ol className={`shell ${styles.stages}`}>
        {PROCESS.map((stage, i) => (
          <li key={stage.index} className={styles.stage}>
            <StageGlyph step={i} />
            <p className={styles.index}>{stage.index}</p>
            <h3 className={styles.stageTitle}>{stage.title}</h3>
            <p className={styles.stageText}>{stage.description}</p>
            <p
              className={`${styles.status} ${
                i === PROCESS.length - 1 ? styles.statusLive : ""
              }`}
            >
              {stage.status}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
