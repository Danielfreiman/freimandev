/**
 * Converts project homepage screenshots (PNG) into web-optimised webp in
 * public/projects, and prints each one's intrinsic dimensions so they can be
 * declared in data/projects.ts and avoid layout shift.
 *
 * Usage: node scripts/optimize-images.mjs <sourceDir>
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("Usage: node scripts/optimize-images.mjs <sourceDir>");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "public", "projects");
await mkdir(outDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const slug = path.basename(file, ".png");
  const input = path.join(sourceDir, file);
  const output = path.join(outDir, `${slug}.webp`);

  const pipeline = sharp(input).resize({
    width: 1600,
    withoutEnlargement: true,
  });

  const info = await pipeline.webp({ quality: 78, effort: 6 }).toFile(output);

  console.log(
    `${slug}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
  );
}

