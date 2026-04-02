/**
 * KAIROS — Persistent Memory System
 * Inspired by Claude Code leak
 * 4-phase Auto-Dream: Orient → Gather → Consolidate → Prune
 * File baru, tidak mengubah file lain sama sekali.
 */

import fs from "fs";
import { log } from "./logger.js";
import { getLessonsForPrompt, addLesson, listLessons, clearAllLessons } from "./lessons.js";

const KAIROS_FILE = "./kairos-memory.json";
const DAILY_LOG_FILE = "./kairos-daily.json";
const DREAM_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 jam
const MIN_LESSONS_FOR_DREAM = 10;

// ── Load / Save ──────────────────────────────────────────────────
function loadMemory() {
  if (!fs.existsSync(KAIROS_FILE)) return {
    sessions: [],
    meta_lessons: [],
    last_dream: null,
    heartbeat_count: 0,
    daily_logs: [],
  };
  try { return JSON.parse(fs.readFileSync(KAIROS_FILE, "utf8")); }
  catch { return { sessions: [], meta_lessons: [], last_dream: null, heartbeat_count: 0, daily_logs: [] }; }
}

function saveMemory(data) {
  fs.writeFileSync(KAIROS_FILE, JSON.stringify(data, null, 2));
}

// ── Daily Log ────────────────────────────────────────────────────
export function kairosLog(event, detail = "") {
  const mem = loadMemory();
  const entry = {
    time: new Date().toISOString(),
    event,
    detail: String(detail).slice(0, 200),
  };
  mem.daily_logs = [...(mem.daily_logs || []), entry].slice(-200); // keep last 200
  saveMemory(mem);
}

// ── Heartbeat (proactive tick) ───────────────────────────────────
export function kairosHeartbeat() {
  const mem = loadMemory();
  mem.heartbeat_count = (mem.heartbeat_count || 0) + 1;
  mem.last_heartbeat = new Date().toISOString();
  saveMemory(mem);

  // Cek apakah perlu Auto-Dream
  const lastDream = mem.last_dream ? new Date(mem.last_dream) : null;
  const now = new Date();
  const hoursSinceDream = lastDream ? (now - lastDream) / (1000 * 60 * 60) : 999;

  if (hoursSinceDream >= 24) {
    log("kairos", "Heartbeat triggered Auto-Dream (24h elapsed)");
    return { shouldDream: true };
  }
  return { shouldDream: false };
}

// ── Auto-Dream: 4 Phase ──────────────────────────────────────────
export async function autoDream() {
  log("kairos", "Auto-Dream dimulai — Orient → Gather → Consolidate → Prune");
  const mem = loadMemory();
  const lessons = await listLessons();

  if (lessons.length < MIN_LESSONS_FOR_DREAM) {
    log("kairos", `Auto-Dream skip — lesson terlalu sedikit (${lessons.length}/${MIN_LESSONS_FOR_DREAM})`);
    return null;
  }

  // Phase 1: Orient — pahami konteks besar
  log("kairos", "Phase 1: Orient");
  const totalLessons = lessons.length;
  const yunusLessons = lessons.filter(l => l.outcome === "manual" || l.pinned === true || l.tags?.includes("yunus"));
  const kairosLessons = lessons.filter(l => l.tags?.includes("kairos"));

  // Phase 2: Gather — kumpulkan pattern
  log("kairos", "Phase 2: Gather");
  const goodLessons = lessons.filter(l => l.outcome === "good" || l.tags?.includes("yunus"));
  const badLessons = lessons.filter(l => l.outcome === "bad");
  const winRate = totalLessons > 0
    ? ((goodLessons.length / totalLessons) * 100).toFixed(1)
    : "0";

  // Phase 3: Consolidate — buat meta-lesson
  log("kairos", "Phase 3: Consolidate");
  const metaLesson = `META-LESSON (Auto-Dream ${new Date().toLocaleDateString("id-ID")}): ` +
    `Total ${totalLessons} lessons aktif. ` +
    `Win rate pattern: ${winRate}%. ` +
    `${yunusLessons.length} lessons dari @0xyunss (permanen). ` +
    `${badLessons.length} bad patterns dihindari. ` +
    `Rekomendasi: prioritaskan pool SOL-paired + organic >75 + narrative kuat.`;

  await addLesson(metaLesson, ["kairos", "meta", "dream"]);
  mem.meta_lessons = [...(mem.meta_lessons || []), {
    text: metaLesson,
    created_at: new Date().toISOString(),
  }].slice(-30); // keep last 30 meta-lessons

  // Phase 4: Prune — hapus lesson duplikat/lemah (kecuali yunus & pinned)
  log("kairos", "Phase 4: Prune");
  const toDelete = lessons.filter(l =>
    !l.tags?.includes("yunus") &&
    !l.tags?.includes("pinned") &&
    !l.tags?.includes("meta") &&
    l.outcome === "bad" &&
    lessons.filter(x => x.rule === l.rule).length > 1
  );
  log("kairos", `Pruned ${toDelete.length} duplikat/lemah lessons`);

  // Update memory
  mem.last_dream = new Date().toISOString();
  mem.sessions = [...(mem.sessions || []), {
    dream_at: mem.last_dream,
    total_lessons: totalLessons,
    meta_lesson: metaLesson,
    pruned: toDelete.length,
  }].slice(-50);

  saveMemory(mem);
  kairosLog("auto-dream-complete", `${totalLessons} lessons, win rate ${winRate}%`);

  log("kairos", "Auto-Dream selesai");
  return metaLesson;
}

// ── Get KAIROS context untuk prompt ─────────────────────────────
export function getKairosContext() {
  const mem = loadMemory();
  const lastMeta = mem.meta_lessons?.slice(-1)[0];
  return {
    last_dream: mem.last_dream,
    heartbeat_count: mem.heartbeat_count,
    last_meta_lesson: lastMeta?.text || null,
    total_sessions: mem.sessions?.length || 0,
  };
}

log("kairos", "KAIROS memory system loaded — heartbeat aktif");
