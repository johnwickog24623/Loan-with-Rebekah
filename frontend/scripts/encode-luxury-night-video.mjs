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
    "public/videos/luxury-night-source.mp4",
    "-vf",
    "scale=1920:-2",
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
    "public/videos/luxury-night-home.mp4",
  ],
  { stdio: "inherit" },
);
