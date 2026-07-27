import { whatsappUrl } from "@/data/brand";
import { Action } from "@/components/ui/Action";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="topo" className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <p className="eyebrow">Desenvolvimento web sob demanda</p>

        {/* The space between the lines is significant: without it the
            accessible name collapses to "Da demandaao ar.". */}
        <h1 className={styles.title}>
          <span className={styles.line}>Da demanda</span>{" "}
          <span className={styles.line}>ao ar.</span>
        </h1>

        <p className={styles.support}>
          Sites, landing pages, e-commerces e melhorias técnicas executados com
          clareza, velocidade e responsabilidade.
        </p>

        <div className={styles.actions}>
          <Action href={whatsappUrl()} external>
            Enviar uma demanda
          </Action>
          <Action href="#projetos" variant="line">
            Explorar projetos
          </Action>
        </div>

        <p className={styles.micro}>
          Projeto completo, melhoria pontual ou execução recorrente.
        </p>
      </div>
    </section>
  );
}
