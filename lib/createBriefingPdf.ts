import { jsPDF } from "jspdf";

import type { BudgetBrief } from "@/lib/createBudgetPdf";

const BLUE = [37, 99, 255] as const;
const INK = [18, 18, 20] as const;
const MUTED = [96, 96, 104] as const;
const RULE = [226, 228, 234] as const;

export function createBriefingPdf(data: BudgetBrief): Uint8Array {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let pageNumber = 1;
  let y = 0;

  const drawPageFrame = () => {
    pdf.setFillColor(...BLUE);
    pdf.rect(0, 0, pageWidth, 4, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(...BLUE);
    pdf.text("FREIMAN DEV", margin, 15);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...MUTED);
    pdf.text("BRIEFING / ORÇAMENTO", pageWidth - margin, 15, {
      align: "right",
    });

    pdf.setDrawColor(...RULE);
    pdf.line(margin, 20, pageWidth - margin, 20);

    pdf.setFontSize(7.5);
    pdf.text(
      `Freiman Dev  ·  Briefing recebido  ·  ${pageNumber}`,
      margin,
      pageHeight - 10,
    );
  };

  const startPage = () => {
    if (pageNumber > 1) pdf.addPage();
    drawPageFrame();
    y = 31;
  };

  const ensureSpace = (height: number) => {
    if (y + height <= pageHeight - 20) return;
    pageNumber += 1;
    startPage();
  };

  const drawField = (label: string, value: string) => {
    const normalizedValue = value.trim() || "Não informado";
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10.5);
    const lines = pdf.splitTextToSize(normalizedValue, contentWidth) as string[];
    const fieldHeight = 10 + lines.length * 5 + 7;
    ensureSpace(fieldHeight);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...BLUE);
    pdf.text(label.toUpperCase(), margin, y);
    y += 7;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10.5);
    pdf.setTextColor(...INK);
    pdf.text(lines, margin, y);
    y += lines.length * 5 + 5;

    pdf.setDrawColor(...RULE);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 7;
  };

  startPage();

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...MUTED);
  pdf.text("DOCUMENTO DE CONTEXTO INICIAL", margin, y);
  y += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(...INK);
  pdf.text("Briefing para orçamento", margin, y);
  y += 9;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...MUTED);
  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
  pdf.text(`Recebido em ${generatedAt}`, margin, y);
  y += 13;

  drawField("Nome", data.clientName);
  drawField("Email", data.email);
  drawField("Empresa ou marca", data.company);
  drawField("Tipo de projeto", data.projectType);
  drawField("Objetivo principal", data.objective);
  drawField("Páginas ou telas", data.pages);
  drawField(
    "Funcionalidades",
    data.features.length ? data.features.join(", ") : "Nenhuma selecionada",
  );
  drawField("Conteúdo e identidade visual", data.contentStatus);
  drawField("Prazo desejado", data.deadline);
  drawField("Faixa de investimento", data.budgetRange);
  drawField("Informações adicionais", data.notes);

  ensureSpace(24);
  pdf.setFillColor(245, 247, 255);
  pdf.rect(margin, y, contentWidth, 20, "F");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...MUTED);
  const notice = pdf.splitTextToSize(
    "Este documento registra o briefing enviado pelo cliente. Valores, prazos e escopo finais dependem da análise técnica e da proposta comercial.",
    contentWidth - 10,
  ) as string[];
  pdf.text(notice, margin + 5, y + 7);

  return new Uint8Array(pdf.output("arraybuffer"));
}
