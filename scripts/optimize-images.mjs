/**
 * Converts the real Freiman Dev project covers (downloaded from the live site)
 * into web-optimised webp and reports the intrinsic dimensions so the sections
 * can declare width/height and avoid layout shift.
 *
 * Usage: node scripts/optimize-images.mjs <sourceDir>
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
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
const manifest = {};

for (const file of files) {
  const slug = path.basename(file, ".png");
  const input = path.join(sourceDir, file);
  const output = path.join(outDir, `${slug}.webp`);

  const pipeline = sharp(input).resize({
    width: 1600,
    withoutEnlargement: true,
  });

  const info = await pipeline.webp({ quality: 78, effort: 6 }).toFile(output);
  manifest[slug] = { width: info.width, height: info.height, bytes: info.size };

  console.log(
    `${slug}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
  );
}

await writeFile(
  path.join(process.cwd(), "data", "image-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);
console.log("\nWrote data/image-manifest.json");
