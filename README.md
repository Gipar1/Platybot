# 🦆 Platybot

Autonomous DLMM LP agent untuk Meteora di Solana. Dioperasikan lewat Telegram.
Dibangun di atas Platybot oleh Platybot — dikustomisasi dengan KAIROS memory system.

## Fitur
- Screening pool otomatis (fee/TVL, organic score, wash filter, rugpull flag)
- KAIROS memory — belajar mandiri 24/7 via Auto-Dream
- Virtual dry-run — simulasi tanpa modal
- Morning briefing harian
- Full Telegram control

## Install (1 command)
```bash
curl -fsSL https://raw.githubusercontent.com/USERNAME/platybot/main/install.sh | bash
```

## Manual Setup
```bash
git clone https://github.com/USERNAME/platybot.git
cd platybot
npm install
cp .env.example .env
nano .env        # isi semua API key
npm run dev
```

## Konfigurasi .env
```env
TELEGRAM_BOT_TOKEN=     # dari @BotFather
TELEGRAM_CHAT_ID=       # chat ID kamu
OPENROUTER_API_KEY=     # atau Blink API key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
WALLET_PRIVATE_KEY=     # private key wallet Solana
DRY_RUN=true            # true = simulasi, false = live
AUTO_DRYRUN=true        # auto learning mode
```

## Command Telegram

| Command | Fungsi |
|---------|--------|
| /start | Menu utama |
| /status | Wallet + posisi aktif |
| /candidates | Pool terbaik sekarang |
| /briefing | Morning briefing harian |
| /learn | Belajar dari top LPers |
| /kairos | Status KAIROS memory |
| /dryrun | Simulasi tanpa SOL |
| /dryon | Nyalain auto learning |
| /evolve | Update threshold |

Semua lainnya bisa natural language langsung di chat.

## Credit
- Original: [Platybot/platybot](https://github.com/Platybot/platybot)
- KAIROS system & kustomisasi: Platybot
