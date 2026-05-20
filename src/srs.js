// ========== SRS MODULE (SM-2 Enhanced Spaced Repetition) ==========
// Implements the SM-2 algorithm for flashcard scheduling.
//
// Each word card stores: { ef, interval, repetition, due, lapses, count, box }
//   ef:         Easiness Factor (>=1.3, starts at 2.5)
//   interval:   Days until next review
//   repetition: Consecutive correct answers
//   due:        Timestamp (ms) when review is due
//   lapses:     Total times marked "belum hafal" (forgot)
//   count:      Alias for lapses (backward compatibility)
//   box:        Mapped from repetition (backward compatibility with Leitner)

'use strict';

// Legacy Leitner intervals (kept for reference/migration)
const SRS_INTERVALS_MS = [
  0,                          // box 0 (unused)
  10 * 60 * 1000,             // box 1 → 10 minutes
  24 * 60 * 60 * 1000,        // box 2 → 1 day
  3  * 24 * 60 * 60 * 1000,   // box 3 → 3 days
  7  * 24 * 60 * 60 * 1000,   // box 4 → 7 days
  21 * 24 * 60 * 60 * 1000    // box 5 → 21 days
];

// ── Cached allWords for performance ──
// BABS.flatMap() is expensive; cache it so getForgetPool/getForgetStats don't recompute.
let _cachedAllWords = null;

/**
 * Get or compute the flattened word list from BABS.
 * Cache is invalidated only if BABS length changes (shouldn't happen after init).
 * @returns {Array} Array of word objects with babNum
 */
function getAllWords() {
  if (!_cachedAllWords || _cachedAllWords._babsLen !== BABS.length) {
    _cachedAllWords = BABS.flatMap((b) =>
      b.kotoba.map((k) => Object.assign({}, k, { babNum: b.num }))
    );
    _cachedAllWords._babsLen = BABS.length;
  }
  return _cachedAllWords;
}

/**
 * Generate a canonical key for a word object.
 * Uses romaji (lowercased, trimmed) as single source of truth across chapters.
 * @param {Object} word - Word object with rom/id properties
 * @returns {string} Canonical key
 */
function wordKey(word) {
  return (word.rom || word.id || '').toString().trim().toLowerCase();
}

/**
 * Get SRS data for a word.
 * @param {Object} word - Word object
 * @returns {Object|null} SRS card data or null
 */
function srsGet(word) {
  const k = wordKey(word);
  if (!k) return null;
  return srs[k] || null;
}

/**
 * Record a "hafal" (memorized) response using SM-2 algorithm.
 * @param {Object} word - Word object
 * @param {number} [quality=4] - Response quality (0-5 scale; 4=hafal, 5=easy)
 */
function sm2RecordHafal(word, quality) {
  quality = quality || 4;
  const k = wordKey(word);
  if (!k) return;

  let card = srs[k] || { ef: 2.5, interval: 0, repetition: 0, due: 0, lapses: 0, count: 0 };

  // Migrate from old Leitner format if needed
  if (card.box !== undefined && card.ef === undefined) {
    card.ef = 2.5;
    card.interval = card.box <= 1 ? 0 : card.box <= 2 ? 1 : card.box <= 3 ? 3 : card.box <= 4 ? 7 : 21;
    card.repetition = card.box || 0;
  }

  if (quality >= 3) {
    // Correct response — increase interval
    if (card.repetition === 0) {
      card.interval = 1;
    } else if (card.repetition === 1) {
      card.interval = 3;
    } else {
      card.interval = Math.round(card.interval * card.ef);
    }
    card.repetition++;

    // Reduce lapses on correct answer so "Terlupa" progress actually decreases
    if ((card.lapses || 0) > 0) {
      card.lapses = card.lapses - 1;
    }
  } else {
    // Incorrect but still called hafal (edge case)
    card.repetition = 0;
    card.interval = 1;
  }

  // Update Easiness Factor (SM-2 formula)
  card.ef = Math.max(1.3, card.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  // Calculate due date
  card.due = Date.now() + (card.interval * 24 * 60 * 60 * 1000);

  // Backward compatibility
  card.box = Math.min(5, card.repetition);
  card.count = card.lapses || 0;

  srs[k] = card;
  lsSet('n5srs', srs);
}

/**
 * Record a "belum hafal" (not yet memorized) response.
 * Resets repetition, reduces EF, schedules for 10 minutes later.
 * @param {Object} word - Word object
 */
function sm2RecordBelum(word) {
  const k = wordKey(word);
  if (!k) return;

  let card = srs[k] || { ef: 2.5, interval: 0, repetition: 0, due: 0, lapses: 0, count: 0 };

  // Migrate from old format if needed
  if (card.box !== undefined && card.ef === undefined) {
    card.ef = 2.5;
    card.interval = 0;
    card.repetition = 0;
  }

  // Reset repetition, reduce EF
  card.repetition = 0;
  card.interval = 0;
  card.ef = Math.max(1.3, (card.ef || 2.5) - 0.2);
  card.lapses = (card.lapses || 0) + 1;
  card.count = card.lapses;
  card.due = Date.now() + (10 * 60 * 1000); // 10 minutes

  // Backward compatibility
  card.box = 1;

  srs[k] = card;
  lsSet('n5srs', srs);
}

// Public API aliases
function recordBelum(word) { return sm2RecordBelum(word); }
function recordHafal(word) { return sm2RecordHafal(word); }

/**
 * Get pool of words that are due for review or have been forgotten.
 * @param {number} [threshold=1] - Minimum lapses to include
 * @returns {Array} Sorted array of word objects with babNum
 */
function getForgetPool(threshold) {
  threshold = threshold || 1;
  const now = Date.now();
  const allWords = getAllWords();
  return allWords.filter((w) => {
    const e = srsGet(w);
    if (!e) return false;
    return (e.lapses || 0) >= threshold;
  }).sort((a, b) => {
    const ea = srsGet(a) || {}, eb = srsGet(b) || {};
    const dueA = (ea.due || 0) <= now ? 1 : 0;
    const dueB = (eb.due || 0) <= now ? 1 : 0;
    if (dueA !== dueB) return dueB - dueA;
    if ((eb.lapses || 0) !== (ea.lapses || 0)) return (eb.lapses || 0) - (ea.lapses || 0);
    return (ea.box || 0) - (eb.box || 0);
  });
}

/**
 * Get statistics about forgotten words.
 * @returns {{total: number, struggling: number, due: number}}
 */
function getForgetStats() {
  const allWords = getAllWords();
  const now = Date.now();
  let total = 0, struggling = 0, due = 0;
  allWords.forEach((w) => {
    const e = srsGet(w);
    if (!e) return;
    const lap = e.lapses || 0;
    if (lap >= 1) total++;
    if (lap >= 3) struggling++;
    if ((e.due || 0) <= now && lap >= 1) due++;
  });
  return { total, struggling, due };
}

// Proxy for backward compatibility: forgetCount[wordKey] → lapses count
const forgetCount = new Proxy({}, {
  get(_, prop) {
    const e = srs[prop];
    return e ? (e.lapses || e.count || 0) : 0;
  },
  has(_, prop) { return !!srs[prop]; }
});
