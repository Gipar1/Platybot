#!/bin/bash
set -e

echo "🦆 Platybot Installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Cek Node.js
if ! command -v node &> /dev/null; then
  echo "📦 Installing Node.js v22..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 20 ]; then
  echo "❌ Node.js v20+ required. Current: $(node -v)"
  exit 1
fi

echo "✅ Node.js $(node -v)"

# Clone repo
if [ -d "platybot" ]; then
  echo "📁 Folder platybot sudah ada, skip clone."
  cd platybot
else
  echo "📥 Cloning Platybot..."
  git clone https://github.com/USERNAME/platybot.git platybot
  cd platybot
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent

# Setup .env
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "⚙️  Setup .env — isi kredensial kamu:"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  
  read -p "Telegram Bot Token: " TG_TOKEN
  read -p "Telegram Chat ID: " TG_CHAT
  read -p "OpenRouter/Blink API Key: " API_KEY
  read -p "Solana RPC URL [https://api.mainnet-beta.solana.com]: " RPC_URL
  RPC_URL=${RPC_URL:-https://api.mainnet-beta.solana.com}
  read -sp "Wallet Private Key (hidden): " PRIV_KEY
  echo ""

  sed -i "s|TELEGRAM_BOT_TOKEN=.*|TELEGRAM_BOT_TOKEN=$TG_TOKEN|" .env
  sed -i "s|TELEGRAM_CHAT_ID=.*|TELEGRAM_CHAT_ID=$TG_CHAT|" .env
  sed -i "s|OPENROUTER_API_KEY=.*|OPENROUTER_API_KEY=$API_KEY|" .env
  sed -i "s|SOLANA_RPC_URL=.*|SOLANA_RPC_URL=$RPC_URL|" .env
  sed -i "s|WALLET_PRIVATE_KEY=.*|WALLET_PRIVATE_KEY=$PRIV_KEY|" .env

  echo "✅ .env tersimpan"
else
  echo "✅ .env sudah ada, skip."
fi

# Seed KAIROS lessons
echo ""
echo "🧠 Seeding KAIROS lessons dari @0xyunss..."
node seed-lessons.mjs

# Done
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Platybot siap!"
echo ""
echo "Jalankan bot:"
echo "  cd platybot && npm run dev"
echo ""
echo "Atau pakai screen biar jalan di background:"
echo "  screen -S platybot"
echo "  npm run dev"
echo "  Ctrl+A D (keluar dari screen)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
