#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f package-lock.json ]]; then
  echo "No package-lock.json on this revision; skipping Node dependency install"
  exit 0
fi

npm ci

if [[ -f prisma/schema.prisma ]]; then
  npx prisma generate
fi
