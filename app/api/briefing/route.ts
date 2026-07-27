import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type BriefingPayload = {
  clientName?: string;
  email?: string;
  company?: string;
  projectType?: string;
  objective?: string;
  pages?: string;
  features?: string[];
  contentStatus?: string;
  deadline?: string;
  budgetRange?: string;
  notes?: string;
  turnstileToken?: string;
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength = 4000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function validateTurnstile(token: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  let payload: BriefingPayload;
  try {
    payload = (await request.json()) as BriefingPayload;
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  // Honeypot: bots costumam preencher este campo invisível.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const clientName = clean(payload.clientName, 120);
  const email = clean(payload.email, 180).toLowerCase();
  const company = clean(payload.company, 160);
  const projectType = clean(payload.projectType, 120);
  const objective = clean(payload.objective);
  const pages = clean(payload.pages, 120);
  const contentStatus = clean(payload.contentStatus, 240);
  const deadline = clean(payload.deadline, 120);
  const budgetRange = clean(payload.budgetRange, 120);
  const notes = clean(payload.notes);
  const features = Array.isArray(payload.features)
    ? payload.features.map((item) => clean(item, 120)).filter(Boolean).slice(0, 20)
    : [];

  if (
    !clientName ||
    !EMAIL_PATTERN.test(email) ||
    !projectType ||
    !objective ||
    !pages ||
    !contentStatus ||
    !deadline ||
    !budgetRange
  ) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatórios." },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim() || null;
  const turnstileConfigured = Boolean(process.env.TURNSTILE_SECRET_KEY);
  const turnstileVisible = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  if (turnstileConfigured !== turnstileVisible) {
    console.error("Briefing email: both Turnstile keys must be configured together.");
    return NextResponse.json(
      { error: "A proteção do formulário está temporariamente indisponível." },
      { status: 503 },
    );
  }
  const captchaValid = await validateTurnstile(
    clean(payload.turnstileToken, 2048),
    remoteIp,
  );
  if (!captchaValid) {
    return NextResponse.json(
      { error: "Confirme que você não é um robô e tente novamente." },
      { status: 403 },
    );
  }

  const password = process.env.smtp_password || process.env.SMTP_PASSWORD;
  if (!password) {
    console.error("Briefing email: SMTP password is not configured.");
    return NextResponse.json(
      { error: "O envio está temporariamente indisponível." },
      { status: 503 },
    );
  }

  const smtpUser = process.env.SMTP_USER || "comercial@freimandev.com.br";
  const recipient = process.env.BRIEFING_RECIPIENT || "comercial@freimandev.com.br";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: smtpUser,
      pass: password,
    },
  });

  const rows: Array<[string, string]> = [
    ["Nome", clientName],
    ["Email", email],
    ["Empresa ou marca", company || "Não informado"],
    ["Tipo de projeto", projectType],
    ["Objetivo", objective],
    ["Páginas ou telas", pages],
    ["Funcionalidades", features.length ? features.join(", ") : "Nenhuma selecionada"],
    ["Conteúdo e identidade", contentStatus],
    ["Prazo", deadline],
    ["Investimento", budgetRange],
    ["Observações", notes || "Não informado"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;border-bottom:1px solid #e2e4ea;color:#606068;font-size:12px;text-transform:uppercase;letter-spacing:.06em;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 12px;border-bottom:1px solid #e2e4ea;color:#121214;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Freiman Dev — Briefing" <${smtpUser}>`,
        to: recipient,
        replyTo: email,
        subject: `Novo briefing — ${company || clientName} — ${projectType}`,
        text,
        html: `
          <div style="margin:0;padding:28px;background:#f5f6f8;font-family:Arial,sans-serif">
            <div style="max-width:680px;margin:0 auto;background:#fff;border-top:6px solid #2563ff">
              <div style="padding:28px 28px 18px">
                <div style="color:#2563ff;font-size:12px;font-weight:700;letter-spacing:.1em">FREIMAN DEV</div>
                <h1 style="margin:16px 0 6px;color:#121214;font-size:26px">Novo briefing recebido</h1>
                <p style="margin:0;color:#606068">Enviado pelo formulário de orçamento do site.</p>
              </div>
              <table role="presentation" style="width:100%;border-collapse:collapse">${htmlRows}</table>
              <p style="margin:0;padding:20px 28px;color:#606068;font-size:12px">Responda este email para falar diretamente com ${escapeHtml(clientName)}.</p>
            </div>
          </div>
        `,
      }),
      transporter.sendMail({
        from: `"Freiman Dev" <${smtpUser}>`,
        to: email,
        replyTo: smtpUser,
        subject: `Recebemos seu briefing — ${company || projectType}`,
        text: [
          `Olá, ${clientName}.`,
          "",
          "Recebemos seu briefing e já temos o contexto inicial do projeto.",
          `Projeto: ${projectType}`,
          company ? `Empresa ou marca: ${company}` : "",
          `Prazo informado: ${deadline}`,
          "",
          "Vamos analisar as informações e entraremos em contato em breve para alinhar escopo, prazo e próximos passos.",
          "",
          "Freiman Dev",
          "Da demanda ao ar.",
        ]
          .filter(Boolean)
          .join("\n"),
        html: `
          <div style="margin:0;padding:32px 16px;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#f5f5f3">
            <div style="max-width:640px;margin:0 auto;border:1px solid #333338;background:#1a1a1c">
              <div style="height:6px;background:#2563ff"></div>
              <div style="padding:28px 30px 20px;border-bottom:1px solid #333338">
                <table role="presentation" style="width:100%;border-collapse:collapse">
                  <tr>
                    <td style="color:#2563ff;font-size:12px;font-weight:700;letter-spacing:.12em">FREIMAN DEV</td>
                    <td style="color:#9b9ba2;font-size:11px;letter-spacing:.08em;text-align:right">BRIEFING RECEBIDO</td>
                  </tr>
                </table>
              </div>
              <div style="padding:36px 30px">
                <div style="color:#9b9ba2;font-size:11px;letter-spacing:.1em;text-transform:uppercase">Da demanda ao ar</div>
                <h1 style="margin:14px 0 12px;color:#f5f5f3;font-size:30px;line-height:1.1;letter-spacing:-.03em">Recebemos seu briefing.</h1>
                <p style="margin:0;color:#d7d7da;font-size:16px;line-height:1.65">Olá, ${escapeHtml(clientName)}. As informações chegaram e já temos o contexto inicial para analisar sua demanda.</p>

                <div style="margin:30px 0;border-top:1px solid #333338;border-bottom:1px solid #333338">
                  <table role="presentation" style="width:100%;border-collapse:collapse">
                    <tr>
                      <td style="padding:14px 0;color:#9b9ba2;font-size:11px;letter-spacing:.08em;text-transform:uppercase">Projeto</td>
                      <td style="padding:14px 0;color:#f5f5f3;font-size:14px;font-weight:700;text-align:right">${escapeHtml(projectType)}</td>
                    </tr>
                    ${
                      company
                        ? `<tr><td style="padding:14px 0;border-top:1px solid #333338;color:#9b9ba2;font-size:11px;letter-spacing:.08em;text-transform:uppercase">Marca</td><td style="padding:14px 0;border-top:1px solid #333338;color:#f5f5f3;font-size:14px;font-weight:700;text-align:right">${escapeHtml(company)}</td></tr>`
                        : ""
                    }
                    <tr>
                      <td style="padding:14px 0;border-top:1px solid #333338;color:#9b9ba2;font-size:11px;letter-spacing:.08em;text-transform:uppercase">Prazo informado</td>
                      <td style="padding:14px 0;border-top:1px solid #333338;color:#f5f5f3;font-size:14px;font-weight:700;text-align:right">${escapeHtml(deadline)}</td>
                    </tr>
                  </table>
                </div>

                <h2 style="margin:0 0 10px;color:#f5f5f3;font-size:18px">O que acontece agora</h2>
                <p style="margin:0;color:#d7d7da;font-size:15px;line-height:1.65">Vamos revisar o escopo, o prazo e as necessidades técnicas. Entraremos em contato em breve pelo email informado para alinhar os próximos passos.</p>
                <a href="mailto:${smtpUser}" style="display:inline-block;margin-top:26px;padding:13px 18px;background:#2563ff;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:.08em;text-decoration:none;text-transform:uppercase">Falar com a Freiman Dev</a>
              </div>
              <div style="padding:20px 30px;border-top:1px solid #333338;color:#9b9ba2;font-size:12px;line-height:1.5">
                Este é um email automático de confirmação. Se precisar acrescentar alguma informação, responda diretamente esta mensagem.
              </div>
            </div>
          </div>
        `,
      }),
    ]);
  } catch (error) {
    console.error("Briefing email delivery failed:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar o briefing. Tente novamente." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
