#!/bin/bash
# ============================================
# Hiranmaye Digital — Deploy Build Script
# Builds the project and creates a deploy-ready zip
# Usage: npm run deploy
# ============================================

set -e

DEPLOY_ZIP="hiranmaye-site.zip"
WEB_CONFIG="deploy/web.config"

echo ""
echo "🚀 Hiranmaye Digital — Deploy Build"
echo "===================================="
echo ""

# Step 1: Build
echo "📦 Step 1/3 — Building production bundle..."
npm run build
echo "✅ Build complete!"
echo ""

# Step 2: Copy web.config into dist
echo "⚙️  Step 2/3 — Adding IIS web.config..."
cp "$WEB_CONFIG" dist/web.config
echo "✅ web.config added!"
echo ""

# Step 3: Create zip
echo "🗜️  Step 3/3 — Creating deploy zip..."
rm -f "$DEPLOY_ZIP"
cd dist && zip -r "../$DEPLOY_ZIP" . && cd ..
echo ""
echo "===================================="
echo "✅ Deploy zip ready!"
echo ""
echo "📁 File: $DEPLOY_ZIP"
echo "📏 Size: $(du -h "$DEPLOY_ZIP" | cut -f1)"
echo ""
echo "Next steps:"
echo "  1. Log in to Plesk → https://p4302.bom1.stableserver.net:8443"
echo "  2. File Manager → httpdocs/"
echo "  3. Upload $DEPLOY_ZIP"
echo "  4. Extract in place → delete the zip"
echo "===================================="
echo ""
