#!/usr/bin/env bash
# Renders cv.html to assets/cv.pdf. Run from the repository root after
# editing the CV. Chrome supplies the print engine; the page rules live
# in assets/cv.css under @media print.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=12000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$PWD/assets/cv.pdf" "file://$PWD/cv.html"
echo "assets/cv.pdf rebuilt"
