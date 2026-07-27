"use client";

import type { SupabaseClient } from "@supabase/supabase-js";

export type PdfSection = {
  heading?: string;
  lines: string[];
};

type PdfLine = {
  text: string;
  style: "title" | "subtitle" | "heading" | "body" | "muted";
};

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;

function pdfText(value: string) {
  return value
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/•/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x20-\xFF]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrap(value: string, limit = 84) {
  const result: string[] = [];
  for (const paragraph of (value || "—").split(/\n/)) {
    const words = paragraph.trim().split(/\s+/);
    let line = "";
    for (const word of words) {
      if (!line) line = word;
      else if (`${line} ${word}`.length <= limit) line += ` ${word}`;
      else {
        result.push(line);
        line = word;
      }
    }
    result.push(line || " ");
  }
  return result;
}

function pageStream(lines: PdfLine[], page: number, pages: number) {
  let y = 765;
  const commands = [
    "0.039 0.039 0.039 rg",
    `0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT} re f`,
    "0.145 0.388 1 RG",
    "44 794 m 551 794 l S",
  ];

  for (const line of lines) {
    const font = line.style === "title" || line.style === "heading" ? "F2" : "F1";
    const size =
      line.style === "title" ? 22 : line.style === "subtitle" ? 10 : line.style === "heading" ? 11 : 9.5;
    const color =
      line.style === "muted" || line.style === "subtitle"
        ? "0.62 0.62 0.65"
        : line.style === "heading"
          ? "0.145 0.388 1"
          : "0.96 0.96 0.95";

    commands.push(
      `${color} rg`,
      `BT /${font} ${size} Tf 44 ${y} Td (${pdfText(line.text)}) Tj ET`,
    );
    y -= line.style === "title" ? 34 : line.style === "heading" ? 21 : 14;
  }

  commands.push(
    "0.62 0.62 0.65 rg",
    `BT /F1 8 Tf 44 28 Td (Freiman Dev  |  ${page}/${pages}) Tj ET`,
  );
  return commands.join("\n");
}

export function createAdminPdf(title: string, subtitle: string, sections: PdfSection[]) {
  const lines: PdfLine[] = [
    { text: title.toUpperCase(), style: "title" },
    { text: subtitle, style: "subtitle" },
  ];

  for (const section of sections) {
    lines.push({ text: " ", style: "body" });
    if (section.heading) lines.push({ text: section.heading.toUpperCase(), style: "heading" });
    for (const value of section.lines) {
      lines.push(...wrap(value).map((text) => ({ text, style: "body" as const })));
    }
  }

  const pages: PdfLine[][] = [];
  let current: PdfLine[] = [];
  let height = 0;
  for (const line of lines) {
    const lineHeight = line.style === "title" ? 34 : line.style === "heading" ? 21 : 14;
    if (height + lineHeight > 700 && current.length) {
      pages.push(current);
      current = [];
      height = 0;
    }
    current.push(line);
    height += lineHeight;
  }
  if (current.length) pages.push(current);

  const objects: string[] = [];
  const pageIds = pages.map((_, index) => 5 + index * 2);
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

  pages.forEach((pageLines, index) => {
    const pageId = pageIds[index]!;
    const contentId = pageId + 1;
    const content = pageStream(pageLines, index + 1, pages.length);
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
    objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets = [0];
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i += 1) bytes[i] = pdf.charCodeAt(i) & 0xff;
  return new Blob([bytes], { type: "application/pdf" });
}

export function safeFileName(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase() || "documento"
  );
}

export async function archivePdf(
  supabase: SupabaseClient,
  projectId: string,
  type: "orcamento" | "contrato" | "entregavel",
  fileName: string,
  blob: Blob,
) {
  const path = `${projectId}/${Date.now()}-${safeFileName(fileName)}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from("admin-documents")
    .upload(path, blob, { contentType: "application/pdf" });
  if (uploadError) throw uploadError;

  const { error: documentError } = await supabase.from("documents").insert({
    project_id: projectId,
    type,
    file_name: `${fileName}.pdf`,
    file_url: path,
  });
  if (documentError) throw documentError;

  const { data } = await supabase.storage
    .from("admin-documents")
    .createSignedUrl(path, 60);
  if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
}
