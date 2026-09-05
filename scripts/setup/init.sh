#!/usr/bin/env bash
set -e

echo "=== Initializing Janbhasha Platform Environment ==="

if ! command -v node &> /dev/null; then
    echo "Error: Node.js 18+ is required."
    exit 1
fi

echo "Installing root and workspace dependencies..."
npm install

echo "Building core shared libraries (@janbhasha/domain, schemas, shared, api-client)..."
npm run build --workspace=@janbhasha/domain
npm run build --workspace=@janbhasha/schemas
npm run build --workspace=@janbhasha/shared
npm run build --workspace=@janbhasha/api-client
npm run build --workspace=@janbhasha/ui

echo "=== Janbhasha setup completed successfully! ==="
