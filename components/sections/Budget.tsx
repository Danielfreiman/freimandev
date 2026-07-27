"use client";

import { useMemo, useState } from "react";
import Script from "next/script";
import { createBudgetPdf, type BudgetBrief } from "@/lib/createBudgetPdf";
import { TypeIn } from "@/components/ui/TypeIn";
import styles from "./Budget.module.css";

const PROJECT_TYPES = [
  "Site institucional",
  "Landing page",
  "Loja virtual",
  "Sistema web",
  "Melhoria em site existente",
  "Ainda não sei",
];
const FEATURES = ["Formulários", "WhatsApp", "Pagamentos", "Área restrita", "Blog / CMS", "Integrações"];
const STEP_TITLES = ["O projeto", "O escopo", "Prazo e investimento"];
const INITIAL_DATA: BudgetBrief = {
  clientName: "",
  email: "",
  company: "",
  projectType: "",
  objective: "",
  pages: "",
  features: [],
  contentStatus: "",
  deadline: "",
  budgetRange: "",
  notes: "",
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function Budget() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BudgetBrief>(INITIAL_DATA);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);
  const [sending, setSending] = useState(false);
  const [website, setWebsite] = useState("");
  const progress = ((step + 1) / STEP_TITLES.length) * 100;
  const summary = useMemo(
    () => [
      { label: "Projeto", value: data.projectType || "A definir" },
      { label: "Escopo", value: data.pages || "A definir" },
      { label: "Prazo", value: data.deadline || "A definir" },
      { label: "Investimento", value: data.budgetRange || "A definir" },
    ],
    [data],
  );

  function update<K extends keyof BudgetBrief>(key: K, value: BudgetBrief[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
    setGenerated(false);
  }

  function toggleFeature(feature: string) {
    update(
      "features",
      data.features.includes(feature)
        ? data.features.filter((item) => item !== feature)
        : [...data.features, feature],
    );
  }

  function validateStep(): boolean {
    const valid =
      step === 0
        ? Boolean(
            data.clientName.trim() &&
              data.email.trim() &&
              data.email.includes("@") &&
              data.projectType &&
              data.objective.trim(),
          )
        : step === 1
          ? Boolean(data.pages && data.contentStatus)
          : Boolean(data.deadline && data.budgetRange);
    if (!valid) setError("Preencha os campos obrigatórios para continuar.");
    return valid;
  }

  function nextStep() {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, STEP_TITLES.length - 1));
  }

  function resetTurnstile() {
    (
      window as Window & {
        turnstile?: { reset: () => void };
      }
    ).turnstile?.reset();
  }

  async function submitBriefing() {
    if (!validateStep()) return;
    const turnstileToken = TURNSTILE_SITE_KEY
      ? document.querySelector<HTMLInputElement>(
          'input[name="cf-turnstile-response"]',
        )?.value || ""
      : "";

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Confirme que você não é um robô para enviar.");
      return;
    }

    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken, website }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error || "Não foi possível enviar o briefing.");
        resetTurnstile();
        return;
      }
      createBudgetPdf(data);
      setGenerated(true);
    } catch {
      setError("Não foi possível enviar o briefing. Verifique sua conexão.");
      resetTurnstile();
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="orcamento" className={styles.section}>
      {TURNSTILE_SITE_KEY ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
      <div className={`shell ${styles.intro}`}>
        <p className="eyebrow">
          <TypeIn text="Briefing rápido" />
        </p>
        <h2 className={styles.title}>Um orçamento começa com as perguntas certas.</h2>
        <p className={styles.lead}>
          Organize o essencial do projeto em poucos minutos. Ao enviar, o
          briefing chega diretamente à equipe e uma cópia em PDF é baixada.
        </p>
      </div>

      <div className={`shell ${styles.workspace}`}>
        <form
          className={styles.form}
          aria-busy={sending}
          onSubmit={(event) => event.preventDefault()}
        >
          <label className={styles.honeypot} aria-hidden="true">
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </label>
          <div className={styles.progressHead}>
            <span>Etapa {step + 1} de {STEP_TITLES.length}</span>
            <span>{STEP_TITLES[step]}</span>
          </div>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEP_TITLES.length}
            aria-valuenow={step + 1}
            aria-label={`Etapa ${step + 1} de ${STEP_TITLES.length}`}
          >
            <span style={{ width: `${progress}%` }} />
          </div>

          {step === 0 ? (
            <fieldset className={styles.fields}>
              <legend>Conte sobre a demanda</legend>
              <div className={styles.twoColumns}>
                <label className={styles.field}>
                  <span>Seu nome *</span>
                  <input
                    value={data.clientName}
                    onChange={(event) => update("clientName", event.target.value)}
                    placeholder="Como podemos chamar você?"
                    autoComplete="name"
                  />
                </label>
                <label className={styles.field}>
                  <span>Seu email *</span>
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="voce@empresa.com.br"
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className={styles.field}>
                <span>Empresa ou marca</span>
                <input
                  value={data.company}
                  onChange={(event) => update("company", event.target.value)}
                  placeholder="Nome do negócio"
                  autoComplete="organization"
                />
              </label>
              <div className={styles.field}>
                <span>O que precisa ser desenvolvido? *</span>
                <div className={styles.options}>
                  {PROJECT_TYPES.map((type) => (
                    <label key={type} className={styles.option}>
                      <input
                        type="radio"
                        name="projectType"
                        checked={data.projectType === type}
                        onChange={() => update("projectType", type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className={styles.field}>
                <span>Qual é o principal objetivo? *</span>
                <textarea
                  value={data.objective}
                  onChange={(event) => update("objective", event.target.value)}
                  placeholder="Ex.: apresentar os serviços e gerar contatos qualificados."
                  rows={4}
                />
              </label>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset className={styles.fields}>
              <legend>Dimensione o trabalho</legend>
              <label className={styles.field}>
                <span>Quantas páginas ou telas você imagina? *</span>
                <select value={data.pages} onChange={(event) => update("pages", event.target.value)}>
                  <option value="">Selecione uma opção</option>
                  <option>1 página</option>
                  <option>2 a 5 páginas</option>
                  <option>6 a 10 páginas</option>
                  <option>Mais de 10 páginas</option>
                  <option>Ainda não sei</option>
                </select>
              </label>
              <div className={styles.field}>
                <span>Quais funcionalidades entram no projeto?</span>
                <div className={styles.options}>
                  {FEATURES.map((feature) => (
                    <label key={feature} className={styles.option}>
                      <input
                        type="checkbox"
                        checked={data.features.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                      />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className={styles.field}>
                <span>Como estão os textos e a identidade visual? *</span>
                <select
                  value={data.contentStatus}
                  onChange={(event) => update("contentStatus", event.target.value)}
                >
                  <option value="">Selecione uma opção</option>
                  <option>Textos e identidade já estão prontos</option>
                  <option>Tenho parte do material</option>
                  <option>Preciso de apoio com o conteúdo</option>
                  <option>Preciso de apoio com conteúdo e identidade</option>
                </select>
              </label>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset className={styles.fields}>
              <legend>Defina as balizas</legend>
              <div className={styles.twoColumns}>
                <label className={styles.field}>
                  <span>Quando precisa estar no ar? *</span>
                  <select value={data.deadline} onChange={(event) => update("deadline", event.target.value)}>
                    <option value="">Selecione uma opção</option>
                    <option>Em até 2 semanas</option>
                    <option>Em 3 a 4 semanas</option>
                    <option>Em 1 a 2 meses</option>
                    <option>Sem data definida</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Faixa de investimento prevista *</span>
                  <select
                    value={data.budgetRange}
                    onChange={(event) => update("budgetRange", event.target.value)}
                  >
                    <option value="">Selecione uma opção</option>
                    <option>Até R$ 3 mil</option>
                    <option>De R$ 3 mil a R$ 6 mil</option>
                    <option>De R$ 6 mil a R$ 12 mil</option>
                    <option>Acima de R$ 12 mil</option>
                    <option>Prefiro avaliar uma proposta</option>
                  </select>
                </label>
              </div>
              <label className={styles.field}>
                <span>Há mais alguma informação importante?</span>
                <textarea
                  value={data.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Referências, restrições técnicas, integrações específicas ou qualquer contexto útil."
                  rows={5}
                />
              </label>
              <div className={styles.ready}>
                <span aria-hidden="true">PDF</span>
                <p>
                  <strong>Seu briefing está pronto.</strong>
                  Ao enviar, as respostas chegam à Freiman Dev e o PDF é baixado imediatamente.
                </p>
              </div>
              {TURNSTILE_SITE_KEY ? (
                <div
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_SITE_KEY}
                  data-theme="dark"
                  data-language="pt-BR"
                />
              ) : null}
            </fieldset>
          ) : null}

          <div className={styles.formFooter}>
            <div aria-live="polite">
              {error ? <p className={styles.error}>{error}</p> : null}
              {generated ? (
                <p className={styles.success}>Briefing enviado e PDF baixado.</p>
              ) : null}
            </div>
            <div className={styles.actions}>
              {step > 0 ? (
                <button
                  type="button"
                  className={styles.back}
                  onClick={() => {
                    setStep((current) => current - 1);
                    setError("");
                  }}
                >
                  Voltar
                </button>
              ) : null}
              {step < STEP_TITLES.length - 1 ? (
                <button type="button" className={styles.next} onClick={nextStep}>
                  Continuar <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.next}
                  disabled={sending}
                  onClick={submitBriefing}
                >
                  {sending ? "Enviando..." : "Enviar briefing e baixar PDF"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </form>

        <aside className={styles.preview} aria-label="Prévia do briefing">
          <div className={styles.previewTop}>
            <span>Freiman Dev</span>
            <span>Briefing / orçamento</span>
          </div>
          <div className={styles.previewBody}>
            <span className={styles.fileLabel}>DOCUMENTO EM CONSTRUÇÃO</span>
            <h3>{data.company || "Seu projeto"}</h3>
            <p className={styles.previewObjective}>
              {data.objective || "O objetivo informado aparecerá aqui."}
            </p>
            <dl className={styles.summary}>
              {summary.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.completeness}>
              <span>Briefing preenchido</span>
              <strong>{Math.round(progress)}%</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
