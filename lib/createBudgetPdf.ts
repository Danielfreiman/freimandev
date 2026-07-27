export type BudgetBrief = {
  clientName: string;
  email: string;
  company: string;
  projectType: string;
  objective: string;
  pages: string;
  features: string[];
  contentStatus: string;
  deadline: string;
  budgetRange: string;
  notes: string;
};

type PdfLine = {
  text: string;
  kind?: "title" | "meta" | "label" | "body" | "space";
};

function toWinAnsi(value: string): string {
  const replacements: Record<string, string> = {
    "–": "-", "—": "-", "“": '"', "”": '"', "‘": "'", "’": "'", "•": "-", "…": "...",
  };
  return value
    .replace(/[–—“”‘’•…]/g, (character) => replacements[character] ?? character)
    .replace(/[^\x09\x0A\x0D\x20-\xFF]/g, "?");
}

function escapePdfText(value: string): string {
  return toWinAnsi(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(value: string, limit = 82): string[] {
  const wrapped: string[] = [];
  for (const paragraph of value.trim().split(/\n+/)) {
    let current = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      if (!current) current = word;
      else if (`${current} ${word}`.length <= limit) current += ` ${word}`;
      else {
        wrapped.push(current);
        current = word;
      }
    }
    if (current) wrapped.push(current);
  }
  return wrapped.length ? wrapped : ["Não informado"];
}

function field(label: string, value: string): PdfLine[] {
  return [
    { text: label.toUpperCase(), kind: "label" },
    ...wrapText(value || "Não informado").map((text) => ({ text, kind: "body" as const })),
    { text: "", kind: "space" },
  ];
}

function buildContent(lines: PdfLine[], pageNumber: number, pageCount: number): string {
  let y = 794;
  const commands = [
    "0.039 0.039 0.039 rg",
    "0 0 595 842 re f",
    "0.145 0.388 1 RG",
    "48 766 m 547 766 l S",
  ];

  for (const line of lines) {
    const kind = line.kind ?? "body";
    if (kind === "space") {
      y -= 8;
      continue;
    }
    const font = kind === "title" || kind === "label" ? "F2" : "F1";
    const size = kind === "title" ? 20 : kind === "meta" || kind === "label" ? 8 : 10;
    const color =
      kind === "label"
        ? "0.145 0.388 1"
        : kind === "meta"
          ? "0.843 0.843 0.855"
          : "0.961 0.961 0.953";
    commands.push(
      `${color} rg`,
      `BT /${font} ${size} Tf 48 ${y} Td (${escapePdfText(line.text)}) Tj ET`,
    );
    y -= kind === "title" ? 30 : kind === "label" ? 15 : 14;
  }

  commands.push(
    "0.843 0.843 0.855 rg",
    `BT /F1 8 Tf 48 32 Td (Freiman Dev  |  Briefing para orçamento  |  ${pageNumber}/${pageCount}) Tj ET`,
  );
  return commands.join("\n");
}

function toBytes(value: string): ArrayBuffer {
  const buffer = new ArrayBuffer(value.length);
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }
  return buffer;
}

export function createBudgetPdf(data: BudgetBrief): void {
  const generatedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const lines: PdfLine[] = [
    { text: "BRIEFING PARA ORÇAMENTO", kind: "title" },
    { text: `Gerado em ${generatedAt}`, kind: "meta" },
    { text: "", kind: "space" },
    ...field("Contato", data.clientName),
    ...field("Email", data.email),
    ...field("Empresa ou marca", data.company),
    ...field("Tipo de projeto", data.projectType),
    ...field("Objetivo principal", data.objective),
    ...field("Páginas ou volume estimado", data.pages),
    ...field("Funcionalidades", data.features.length ? data.features.join(", ") : "Nenhuma selecionada"),
    ...field("Conteúdo e identidade visual", data.contentStatus),
    ...field("Prazo desejado", data.deadline),
    ...field("Faixa de investimento", data.budgetRange),
    ...field("Observações", data.notes),
    {
      text: "Este documento organiza o escopo inicial. Valores e prazos finais dependem da análise técnica.",
      kind: "meta",
    },
  ];

  const pages: PdfLine[][] = [];
  for (let index = 0; index < lines.length; index += 38) {
    pages.push(lines.slice(index, index + 38));
  }

  const objects: string[] = [];
  const pageIds = pages.map((_, index) => 5 + index * 2);
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  pages.forEach((page, index) => {
    const pageId = pageIds[index]!;
    const contentId = pageId + 1;
    const content = buildContent(page, index + 1, pages.length);
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [0];
  const objectCount = objects.length - 1;
  for (let id = 1; id <= objectCount; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= objectCount; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const url = URL.createObjectURL(new Blob([toBytes(pdf)], { type: "application/pdf" }));
  const anchor = document.createElement("a");
  const safeName =
    (data.company || data.clientName || "projeto")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "projeto";
  anchor.href = url;
  anchor.download = `briefing-orcamento-${safeName}.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
