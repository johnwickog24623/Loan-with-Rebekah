import { execFileSync } from "child_process";
import ffmpegPath from "ffmpeg-static";

if (!ffmpegPath) {
  process.exit(1);
}
execFileSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    "public/55538-501275401.mp4",
    "-vf",
    "scale=1280:-2",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "26",
    "-g",
    "5",
    "-keyint_min",
    "5",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    "public/videos/hero-scrub.mp4",
  ],
  { stdio: "inherit" },
);
