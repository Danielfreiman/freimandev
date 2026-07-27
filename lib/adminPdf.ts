"use client";

import { jsPDF } from "jspdf";
import type { SupabaseClient } from "@supabase/supabase-js";

export type PdfImage = {
  dataUrl: string;
  label?: string;
  caption?: string;
};

export type PdfSection = {
  heading?: string;
  lines?: string[];
  images?: PdfImage[];
};

export type PdfOptions = {
  clientLogo?: string | null;
  documentLabel?: string;
};

const BLUE = [37, 99, 255] as const;
const BLACK = [18, 18, 20] as const;
const GRAY = [96, 96, 104] as const;
const LIGHT = [226, 228, 234] as const;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function drawBrand(doc: jsPDF, options: PdfOptions, pageNumber: number) {
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, PAGE_WIDTH, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...BLUE);
  doc.text("FREIMAN DEV", MARGIN, 15);

  if (options.documentLabel) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GRAY);
    doc.text(options.documentLabel.toUpperCase(), PAGE_WIDTH - MARGIN, 15, {
      align: "right",
    });
  }

  doc.setDrawColor(...LIGHT);
  doc.line(MARGIN, PAGE_HEIGHT - 15, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY);
  doc.text("Documento gerado pelo painel Freiman Dev", MARGIN, PAGE_HEIGHT - 9);
  doc.text(String(pageNumber).padStart(2, "0"), PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 9, {
    align: "right",
  });
}

function imageDimensions(doc: jsPDF, dataUrl: string, maxWidth: number, maxHeight: number) {
  const properties = doc.getImageProperties(dataUrl);
  const ratio = Math.min(maxWidth / properties.width, maxHeight / properties.height);
  return {
    width: properties.width * ratio,
    height: properties.height * ratio,
    format: properties.fileType,
  };
}

function drawContainedImage(
  doc: jsPDF,
  image: PdfImage,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  doc.setDrawColor(...LIGHT);
  doc.setFillColor(248, 249, 252);
  doc.roundedRect(x, y, width, height, 1.5, 1.5, "FD");
  const dimensions = imageDimensions(doc, image.dataUrl, width - 4, height - 4);
  const imageX = x + (width - dimensions.width) / 2;
  const imageY = y + (height - dimensions.height) / 2;
  doc.addImage(
    image.dataUrl,
    dimensions.format,
    imageX,
    imageY,
    dimensions.width,
    dimensions.height,
    undefined,
    "FAST",
  );
}

export function createAdminPdf(
  title: string,
  subtitle: string,
  sections: PdfSection[],
  options: PdfOptions = {},
) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  let pageNumber = 1;
  let y = 30;

  const newPage = () => {
    doc.addPage();
    pageNumber += 1;
    drawBrand(doc, options, pageNumber);
    y = 27;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - 22) newPage();
  };

  drawBrand(doc, options, pageNumber);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(23);
  doc.setTextColor(...BLACK);
  const titleLines = doc.splitTextToSize(title.toUpperCase(), 125) as string[];
  doc.text(titleLines, MARGIN, y);

  if (options.clientLogo) {
    try {
      const logo = imageDimensions(doc, options.clientLogo, 38, 22);
      doc.addImage(
        options.clientLogo,
        logo.format,
        PAGE_WIDTH - MARGIN - logo.width,
        25,
        logo.width,
        logo.height,
        undefined,
        "FAST",
      );
    } catch {
      // Um arquivo de logo inválido não deve impedir a geração do documento.
    }
  } else {
    doc.setDrawColor(...LIGHT);
    doc.setLineDashPattern([1.5, 1.5], 0);
    doc.roundedRect(PAGE_WIDTH - MARGIN - 38, 25, 38, 20, 1.5, 1.5);
    doc.setLineDashPattern([], 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text("LOGO DO CLIENTE", PAGE_WIDTH - MARGIN - 19, 36, { align: "center" });
  }

  y += titleLines.length * 9 + 3;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  const subtitleLines = doc.splitTextToSize(subtitle, 125) as string[];
  doc.text(subtitleLines, MARGIN, y);
  y = Math.max(y + subtitleLines.length * 5 + 12, 57);

  sections.forEach((section, sectionIndex) => {
    const lines = section.lines ?? [];
    const images = section.images ?? [];
    const imageHeight = images.length ? (images.length === 1 ? 92 : 72) : 0;
    ensureSpace(18 + Math.min(lines.length * 6, 35) + imageHeight);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...BLUE);
    doc.text(String(sectionIndex + 1).padStart(2, "0"), MARGIN, y);
    doc.text((section.heading || "INFORMAÇÕES").toUpperCase(), MARGIN + 12, y);
    y += 5;

    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.5);
    doc.line(MARGIN + 12, y, PAGE_WIDTH - MARGIN, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...BLACK);
    for (const line of lines) {
      const wrapped = doc.splitTextToSize(line || "—", CONTENT_WIDTH - 12) as string[];
      ensureSpace(wrapped.length * 5 + 3);
      doc.text(wrapped, MARGIN + 12, y);
      y += wrapped.length * 5 + 3;
    }

    if (images.length) {
      ensureSpace(imageHeight + 15);
      const gap = 6;
      const boxWidth =
        images.length === 1
          ? CONTENT_WIDTH - 12
          : (CONTENT_WIDTH - 12 - gap) / 2;
      const boxHeight = images.length === 1 ? 88 : 68;

      images.slice(0, 2).forEach((image, imageIndex) => {
        const x = MARGIN + 12 + imageIndex * (boxWidth + gap);
        if (image.label) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(...BLUE);
          doc.text(image.label.toUpperCase(), x, y);
        }
        drawContainedImage(doc, image, x, y + 4, boxWidth, boxHeight);
        if (image.caption) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(7.5);
          doc.setTextColor(...GRAY);
          const caption = doc.splitTextToSize(image.caption, boxWidth) as string[];
          doc.text(caption, x, y + boxHeight + 8);
        }
      });
      y += boxHeight + 14;
    }

    y += 9;
  });

  return doc.output("blob");
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

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
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
