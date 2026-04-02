import { addLesson } from './lessons.js';

const lessons = [
  { text: "REALITY: Profit tidak datang langsung dari install. Edge nyata dari lesson berkualitas yang diakumulasi agent. Akumulasi fee + price move di pool narrative kuat + volume stabil. Bukan magic.", tags: ["platybot", "mindset"] },
  { text: "TARGET PROFIT: Modal 0.2 SOL target 0.1 SOL/hari. Modal 0.5-1 SOL target 5-20 USD/hari. Realistis setelah agent punya cukup lesson ter-train.", tags: ["platybot", "target"] },
  { text: "VIRTUAL DRY-RUN: Setiap screening cycle, simulasi deploy 0.15 SOL ke setiap pool kandidat. Hitung projected fee, IL, range efficiency, in-range%, volume trend, narrative. Simpan sebagai virtual lesson ke KAIROS. Belajar tanpa risiko modal.", tags: ["platybot", "dryrun", "kairos"] },
  { text: "PREFER: Pool dimana top LPers hold kurang dari 30 menit. Entry saat price action baru mulai, bukan di peak. Scalp style lebih aman.", tags: ["platybot", "entry", "timing"] },
  { text: "PREFER: Pool paired SOL + narrative kuat dari early project. Narrative kuat = specific origin story, real community, viral catalyst, named entities.", tags: ["platybot", "pool", "narrative"] },
  { text: "AVOID: Pool dengan organic score di bawah 70. Skip pool meme tanpa narrative spesifik. Organic score adalah filter utama.", tags: ["platybot", "screening", "filter"] },
  { text: "OOR RULE: Out of range lebih dari 60 menit = CLOSE. Price direction unlikely to reverse. Close + klaim fees + redeploy ke candidate baru.", tags: ["platybot", "oor", "exit"] },
  { text: "TP BIJAK: Fee 5-8.5% dari modal sudah sangat bagus untuk DLMM. Jangan greedy. Ambil profit lalu redeploy ke pool baru yang lebih hot.", tags: ["platybot", "tp"] },
  { text: "EDGE UTAMA: Bukan framework-nya tapi lesson yang kamu transfer ke agent. Semakin banyak lesson berkualitas semakin pintar agent.", tags: ["platybot", "edge", "mindset"] },
  { text: "PROFIT BESAR DATANG DARI: User yang sudah jago DLMM manual lalu mindah ilmunya ke agent via lesson berkualitas. Pemula yang langsung install biasanya struggle.", tags: ["platybot", "mindset"] },
  { text: "POSITION SIZING: Modal kecil 0.5 SOL = max 0.15 SOL per posisi, max 2 posisi aktif. Sisanya gas reserve.", tags: ["platybot", "sizing"] },
  { text: "JANGAN INTERFERE MANUAL: Kalau agent sudah deploy biarkan manage sendiri. Interference manual saat OOR sering bikin loss lebih besar.", tags: ["platybot", "management"] },
  { text: "MORNING ROUTINE: Tiap pagi cek briefing, lessons, market condition. Kasih insight tambahan ke agent sebelum cycle dimulai.", tags: ["platybot", "routine"] },
  { text: "DARWINIAN SELF-EVOLVE: Weight signal sendiri berdasarkan real performance. Signal jelek otomatis diturunkan weight-nya. Gunakan /evolve secara rutin.", tags: ["platybot", "evolve", "kairos"] },
  { text: "AUTORESEARCH: Agent detect bagian prompt/lesson yang jelek, generate improvement, test beberapa close, lalu keep atau revert sendiri.", tags: ["platybot", "autoresearch", "kairos"] },
  { text: "DATASET ADALAH RAJA: Lesson harus terstruktur, bersih, spesifik. Lesson bagus = situasi spesifik + action yang diambil + hasil nyata.", tags: ["platybot", "lesson", "quality"] },
  { text: "SMART WALLET CHECK: Sebelum deploy, cek apakah whale atau alpha wallet sudah aktif di pool. Smart wallet masuk duluan = sinyal conviction positif.", tags: ["platybot", "smart-wallet"] },
  { text: "VOLATILITY MANAGEMENT: Volatility lebih dari 5 = interval 3 menit. Volatility 2-5 = 5 menit. Volatility kurang dari 2 = 10 menit.", tags: ["platybot", "volatility"] },
  { text: "FEE/TVL THRESHOLD: Minimal fee/aTVL 2% untuk timeframe 24h. Di bawah itu skip. Fee/TVL lebih dari 5% = priority deploy.", tags: ["platybot", "threshold"] },
  { text: "RANGE WIDTH: Top LPers hold kurang 30 menit = tight range. Hold lebih 60 menit = wide range. Sesuaikan range dengan behavior top LPer di pool itu.", tags: ["platybot", "range", "strategy"] },
];

let count = 0;
for (const l of lessons) {
  await addLesson(l.text, l.tags);
  console.log(`[${++count}/${lessons.length}] ${l.text.slice(0, 60)}`);
}
console.log('\nDONE — ' + lessons.length + ' lessons masuk KAIROS');
