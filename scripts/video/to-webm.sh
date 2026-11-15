#!/usr/bin/env bash
# WebM (VP9) twins of every homepage MP4, for Linux browsers without the H.264 decoder
# (e.g. Firefox on Fedora, open-source Chromium builds). Each MP4 gets <name>.webm next to it.
# Muted ambient films drop audio; gallery films (played with sound) keep it as Opus.
set -euo pipefail
cd "$(dirname "$0")/../../public/videos"
enc() { # file, keep_audio
  local src="$1" out="${1%.mp4}.webm" audio="-an"
  [ "$2" = 1 ] && audio="-c:a libopus -b:a 96k"
  [ -f "$out" ] && { echo "skip $out"; return; }
  ffmpeg -y -v error -i "$src" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 4 \
    -pix_fmt yuv420p $audio "$out.tmp.webm" && mv "$out.tmp.webm" "$out"
  echo "done $out $(stat -c %s "$out")"
}
for f in banners/hero-*.mp4 what-we-solve.mp4 DEM.mp4 FEA.mp4 Magma.mp4 Polyworks.mp4; do enc "$f" 0; done
for f in mill.mp4 hero.mp4; do enc "$f" 1; done
# The 4-minute corporate film at 720p keeps its WebM well under GitHub's 50 MB warning.
[ -f corporate.webm ] || { ffmpeg -y -v error -i corporate.mp4 -vf scale=1280:-2 -c:v libvpx-vp9 -crf 38 -b:v 0   -row-mt 1 -deadline good -cpu-used 5 -pix_fmt yuv420p -c:a libopus -b:a 80k corporate.webm.tmp.webm   && mv corporate.webm.tmp.webm corporate.webm; }
