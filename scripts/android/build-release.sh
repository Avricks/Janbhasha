#!/usr/bin/env bash
set -e

echo "=== Building Production Release for Janbhasha Android ==="

cd apps/android
echo "Building APK..."
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

echo "Release build bundle completed."
