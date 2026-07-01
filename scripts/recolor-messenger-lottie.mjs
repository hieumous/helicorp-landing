import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(
  root,
  "public/lottie/messenger-unpacked/animations/bc83901c-ca24-41c8-b3b0-1df08f55d012.json"
);
const output = path.join(root, "public/lottie/messenger-purple.json");

/** Helix primary purple gradient — matches --primary oklch(~277°) */
const PURPLE_GRADIENT = [
  0, 0.486, 0.129, 0.714, // #5b21b6
  0.5, 0.486, 0.227, 0.929, // #7c3aed
  1, 0.655, 0.545, 0.98, // #a78bfa
];

const ORIGINAL_GRADIENT = [
  0, 0.447, 0.867, 0.012, 0.5, 0.224, 0.933, 0.506, 1, 0, 1, 1,
];

function sameGradient(a, b) {
  return a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 0.001);
}

function recolor(node) {
  if (!node || typeof node !== "object") return;

  if ((node.ty === "gf" || node.ty === "gs") && node.g?.k?.k) {
    const k = node.g.k.k;
    if (sameGradient(k, ORIGINAL_GRADIENT)) {
      node.g.k.k = [...PURPLE_GRADIENT];
    }
  }

  for (const value of Object.values(node)) {
    if (value && typeof value === "object") recolor(value);
  }
}

mkdirSync(path.dirname(output), { recursive: true });
const animation = JSON.parse(readFileSync(input, "utf8"));
recolor(animation);
writeFileSync(output, JSON.stringify(animation));
console.log("Wrote", output);
