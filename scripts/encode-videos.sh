#!/usr/bin/env bash
# Re-encodes the Theory of Architecture videos into web-friendly H.264 MP4s.
# Both sources are vertical (9:16). Output is 720x1280, which is enough for the
# on-page player and keeps each file well under GitHub's 100 MB limit.
#
# Usage: bash scripts/encode-videos.sh
# Requires ffmpeg on PATH (winget install --id Gyan.FFmpeg -e --source winget).
set -euo pipefail

SRC="projects/theory of architecture"
OUT="public/video"
mkdir -p "$OUT"

encode () {
  local in="$1" out="$2"
  ffmpeg -y -hide_banner -loglevel error -i "$in" \
    -vf "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,format=yuv420p" \
    -c:v libx264 -profile:v high -crf 24 -preset slow \
    -c:a aac -b:a 128k -movflags +faststart \
    "$OUT/$out.mp4"
  # Poster frame taken 2 seconds in, used before playback starts.
  ffmpeg -y -hide_banner -loglevel error -ss 2 -i "$OUT/$out.mp4" -frames:v 1 -q:v 3 "$OUT/$out-poster.jpg"
}

encode "$SRC/P1.1 - Paper Folding.mp4" "p1-1-paper-folding"
encode "$SRC/P1.2 - Group Video _ Planes.mov" "p1-2-planes"

ls -lh "$OUT"
