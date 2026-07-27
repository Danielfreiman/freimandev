import { BRAND, WHATSAPP_DISPLAY, whatsappUrl } from "@/data/brand";
import { Action } from "@/components/ui/Action";
import styles from "./Contact.module.css";

/**
 * The narrative lands here: the frame the Signature Scene has been assembling
 * returns one last time, already live, and its content is the invitation.
 * Only facts published on the live site are shown — there is no e-mail or
 * social profile to display, so none is invented.
 */
export function Contact() {
  return (
    <section id="contato" className={styles.section}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.frame}>
          <div className={styles.bar}>
            <span className={styles.dots} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className={styles.url}>freimandev.com.br</span>
            <span className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              no ar
            </span>
          </div>

          <div className={styles.body}>
            <h2 className={styles.title}>
              Qual demanda precisa entrar no ar?
            </h2>
            <p className={styles.text}>
              Envie o contexto do projeto e o que precisa ser executado. A
              Freiman Dev retorna com os próximos passos.
            </p>

            <Action href={whatsappUrl()} external className={styles.cta}>
              Conversar no WhatsApp
            </Action>

            <dl className={styles.facts}>
              <div>
                <dt>WhatsApp</dt>
                <dd>{WHATSAPP_DISPLAY}</dd>
              </div>
              <div>
                <dt>Retorno</dt>
                <dd>{BRAND.responseTime}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
