import { getLessonsForPrompt, getPerformanceSummary } from "./lessons.js";
import { discoverPools } from "./tools/screening.js";
import { log } from "./logger.js";

export async function generateBriefing() {
  try {
    const [pools, perfSummary, lessons] = await Promise.all([
      Promise.resolve().then(() => discoverPools()).catch(() => ({})),
      Promise.resolve().then(() => getPerformanceSummary()).catch(() => "Belum ada data performance."),
      Promise.resolve().then(() => getLessonsForPrompt(5)).catch(() => ""),
    ]);

    const poolsArr = Array.isArray(pools) ? pools : (pools?.pools || pools?.candidates || Object.values(pools || {}));
    const topPools = poolsArr.slice(0, 5);
    const now = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    // Market snapshot
    const poolLines = topPools.length > 0
      ? topPools.map((p, i) => {
          const fee = (p.fee_active_tvl_ratio ?? 0).toFixed(2);
          const vol = p.trade_volume_24h ? `$${Math.round(p.trade_volume_24h / 1000)}k` : "$0";
          const organic = p.organic_score ?? 0;
          const inRange = p.in_range_pct ? `${p.in_range_pct.toFixed(0)}%` : "?";
          const warning = p.trade_volume_24h < 1000 ? " LOW VOL" :
                          organic < 70 ? " LOW ORGANIC" :
                          fee > 5 ? " HOT" : "";
          return `${i + 1}. ${p.name || p.mint?.slice(0,8)}\n   Fee/TVL: ${fee}% | Vol: ${vol} | Organic: ${organic} | In-Range: ${inRange}${warning}`;
        }).join("\n\n")
      : "Tidak ada pool yang lolos filter saat ini.";

    // Action recommendation
    const hotPool = topPools.find(p => (p.fee_active_tvl_ratio ?? 0) > 3 && (p.organic_score ?? 0) >= 75);
    const actionLine = hotPool
      ? `REKOMENDASI: Deploy ke ${hotPool.name} — fee/TVL tinggi + organic bagus.`
      : "REKOMENDASI: Tunggu dulu, belum ada pool yang cukup kuat hari ini.";

    const briefing = [
      "MORNING BRIEFING — Platybot",
      now,
      "",
      "PERFORMA BOT (24h)",
      typeof perfSummary === "string" ? perfSummary : JSON.stringify(perfSummary),
      "",
      "MARKET SNAPSHOT — TOP POOLS SEKARANG",
      poolLines,
      "",
      actionLine,
      "",
      "LESSONS AKTIF (top 5)",
      lessons || "Belum ada lesson. Jalankan /learn dulu.",
    ].join("\n");

    return briefing;

  } catch (e) {
    log("briefing", `Error: ${e.message}`);
    return "Briefing gagal dimuat. Coba lagi nanti.";
  }
}
