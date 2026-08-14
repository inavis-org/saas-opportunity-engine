#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

npx prisma generate

if [[ -n "${DATABASE_URL:-}" ]]; then
  npx prisma migrate deploy
fi

npx next build
