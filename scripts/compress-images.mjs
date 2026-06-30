import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const dir = "public/images";
const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const input = join(dir, file);
  const base = file.replace(/\.png$/, "");
  const webp = join(dir, `${base}.webp`);

  await sharp(input)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(webp);

  const meta = await sharp(webp).metadata();
  console.log(`${base}.webp — ${meta.width}x${meta.height}`);
}
