import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/helix-lifestyle.webp");
const outputDir = path.join(root, "public/videos");
const output = path.join(outputDir, "helix-banner.mp4");

const FPS = 30;
const DURATION = 5;
const FRAMES = FPS * DURATION;
const WIDTH = 1920;
const HEIGHT = 1080;

// Smooth Ken Burns loop: subtle zoom + pan over exactly one cycle in 5s.
const vf = [
  `scale=${WIDTH * 2}:${HEIGHT * 2}:force_original_aspect_ratio=increase`,
  `crop=${WIDTH * 2}:${HEIGHT * 2}`,
  `zoompan=z='1.06+0.04*sin(2*PI*on/${FRAMES})':x='(iw-iw/zoom)/2+40*sin(2*PI*on/${FRAMES})':y='(ih-ih/zoom)/2+24*cos(2*PI*on/${FRAMES})':d=1:s=${WIDTH}x${HEIGHT}:fps=${FPS}`,
].join(",");

await mkdir(outputDir, { recursive: true });

if (!ffmpegPath) {
  throw new Error("ffmpeg-static binary not found");
}

console.log("Generating banner video...");
console.log(`  Input:  ${input}`);
console.log(`  Output: ${output}`);
console.log(`  Length: ${DURATION}s @ ${FPS}fps`);

await new Promise((resolve, reject) => {
  const proc = spawn(
    ffmpegPath,
    [
      "-loop",
      "1",
      "-i",
      input,
      "-vf",
      vf,
      "-t",
      String(DURATION),
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      "-y",
      output,
    ],
    { stdio: "inherit" }
  );

  proc.on("error", reject);
  proc.on("close", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`ffmpeg exited with code ${code}`));
  });
});

console.log("Done.");
