#!/usr/bin/env node
// ========== SRS / SM-2 Unit Tests ==========
// Tests the spaced repetition algorithm logic.
// Run: node tests/srs.test.js

'use strict';

// ── Test Framework (minimal, zero-dependency) ──
let _passed = 0, _failed = 0, _total = 0;

function describe(name, fn) {
  console.log(`\n  📋 ${name}`);
  fn();
}

function it(name, fn) {
  _total++;
  try {
    fn();
    _passed++;
    console.log(`     ✅ ${name}`);
  } catch(e) {
    _failed++;
    console.log(`     ❌ ${name}`);
    console.log(`        → ${e.message}`);
  }
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(`${msg || 'Assertion failed'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertTrue(val, msg) {
  if (!val) throw new Error(msg || 'Expected truthy value');
}

function assertInRange(val, min, max, msg) {
  if (val < min || val > max) {
    throw new Error(`${msg || 'Range check'}: ${val} not in [${min}, ${max}]`);
  }
}

// ── Mock Environment ──
// Simulate the app's global state that SRS functions depend on
global.srs = {};
global.lsSet = function(key, val) { /* no-op for tests */ };
global.BABS = [
  {
    num: 1, title: 'Test', sub: 'test', color: 'bab-1',
    kotoba: [
      { jp: 'テスト', rom: 'tesuto', id: 'test', cat: 'Kata Benda', lv: 'core' },
      { jp: '猫', rom: 'neko', id: 'kucing', cat: 'Kata Benda', lv: 'core' },
      { jp: '犬', rom: 'inu', id: 'anjing', cat: 'Kata Benda', lv: 'core' }
    ]
  },
  {
    num: 2, title: 'Test2', sub: 'test2', color: 'bab-2',
    kotoba: [
      { jp: '食べる', rom: 'taberu', id: 'makan', cat: 'Kata Kerja', lv: 'core' }
    ]
  }
];

// Load the SRS module (simulate browser global scope)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const srsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'srs.js'), 'utf-8');
// Remove 'use strict' and execute in global context
const srsCodeClean = srsCode.replace("'use strict';", '');
vm.runInThisContext(srsCodeClean, { filename: 'srs.js' });

// ── Tests ──
console.log('\n🧪 Running SRS/SM-2 Tests...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

describe('wordKey()', function() {
  it('should generate lowercase trimmed key from romaji', function() {
    assertEqual(wordKey({ rom: 'Tesuto', id: 'test' }), 'tesuto');
  });

  it('should trim whitespace', function() {
    assertEqual(wordKey({ rom: '  neko  ', id: 'kucing' }), 'neko');
  });

  it('should fallback to id when rom is empty', function() {
    assertEqual(wordKey({ rom: '', id: 'fallback' }), 'fallback');
  });

  it('should return empty string for null/undefined', function() {
    assertEqual(wordKey({}), '');
    assertEqual(wordKey({ rom: null, id: null }), '');
  });
});

describe('srsGet()', function() {
  it('should return null for unknown word', function() {
    srs = {};
    assertEqual(srsGet({ rom: 'unknown' }), null);
  });

  it('should return card data for known word', function() {
    srs = { 'neko': { ef: 2.5, interval: 1, repetition: 1, due: 100, lapses: 0, count: 0 } };
    const card = srsGet({ rom: 'neko' });
    assertEqual(card.ef, 2.5);
    assertEqual(card.interval, 1);
  });
});

describe('sm2RecordHafal() — correct response', function() {
  it('should set interval=1 on first correct answer (repetition 0→1)', function() {
    srs = {};
    sm2RecordHafal({ rom: 'tesuto' }, 4);
    const card = srs['tesuto'];
    assertEqual(card.interval, 1, 'interval');
    assertEqual(card.repetition, 1, 'repetition');
  });

  it('should set interval=3 on second correct answer (repetition 1→2)', function() {
    srs = { 'tesuto': { ef: 2.5, interval: 1, repetition: 1, due: 0, lapses: 0, count: 0 } };
    sm2RecordHafal({ rom: 'tesuto' }, 4);
    const card = srs['tesuto'];
    assertEqual(card.interval, 3, 'interval');
    assertEqual(card.repetition, 2, 'repetition');
  });

  it('should multiply interval by EF on subsequent correct answers', function() {
    srs = { 'tesuto': { ef: 2.5, interval: 3, repetition: 2, due: 0, lapses: 0, count: 0 } };
    sm2RecordHafal({ rom: 'tesuto' }, 4);
    const card = srs['tesuto'];
    // interval = round(3 * 2.5) = 8
    assertEqual(card.interval, 8, 'interval should be 3*2.5=8 (rounded)');
    assertEqual(card.repetition, 3, 'repetition');
  });

  it('should update EF using SM-2 formula (quality=4)', function() {
    srs = { 'tesuto': { ef: 2.5, interval: 1, repetition: 1, due: 0, lapses: 0, count: 0 } };
    sm2RecordHafal({ rom: 'tesuto' }, 4);
    const card = srs['tesuto'];
    // EF = 2.5 + (0.1 - (5-4) * (0.08 + (5-4)*0.02)) = 2.5 + (0.1 - 0.1) = 2.5
    assertEqual(card.ef, 2.5, 'EF should stay 2.5 for quality=4');
  });

  it('should increase EF for quality=5 (easy)', function() {
    srs = { 'tesuto': { ef: 2.5, interval: 1, repetition: 1, due: 0, lapses: 0, count: 0 } };
    sm2RecordHafal({ rom: 'tesuto' }, 5);
    const card = srs['tesuto'];
    // EF = 2.5 + (0.1 - (5-5)*(0.08+(5-5)*0.02)) = 2.5 + 0.1 = 2.6
    assertEqual(card.ef, 2.6, 'EF should increase to 2.6 for quality=5');
  });

  it('should decrease EF for quality=3 (difficult)', function() {
    srs = { 'tesuto': { ef: 2.5, interval: 1, repetition: 1, due: 0, lapses: 0, count: 0 } };
    sm2RecordHafal({ rom: 'tesuto' }, 3);
    const card = srs['tesuto'];
    // EF = 2.5 + (0.1 - (5-3)*(0.08+(5-3)*0.02)) = 2.5 + (0.1 - 2*(0.08+0.04))
    //    = 2.5 + (0.1 - 0.24) = 2.5 - 0.14 = 2.36
    assertInRange(card.ef, 2.35, 2.37, 'EF for quality=3');
  });

  it('should never let EF go below 1.3', function() {
    srs = { 'tesuto': { ef: 1.3, interval: 1, repetition: 1, due: 0, lapses: 0, count: 0 } };
    sm2RecordHafal({ rom: 'tesuto' }, 3);
    const card = srs['tesuto'];
    assertEqual(card.ef, 1.3, 'EF should not go below 1.3');
  });

  it('should set due date in the future', function() {
    const before = Date.now();
    srs = {};
    sm2RecordHafal({ rom: 'tesuto' }, 4);
    const card = srs['tesuto'];
    // Due = now + 1 day (first correct: interval=1)
    assertTrue(card.due > before, 'due should be in the future');
    assertTrue(card.due <= before + (2 * 24 * 60 * 60 * 1000), 'due should be within 2 days');
  });

  it('should maintain backward compat (box field)', function() {
    srs = {};
    sm2RecordHafal({ rom: 'tesuto' }, 4);
    assertEqual(srs['tesuto'].box, 1, 'box should map from repetition');
  });
});

describe('sm2RecordBelum() — incorrect response', function() {
  it('should reset repetition to 0', function() {
    srs = { 'neko': { ef: 2.5, interval: 7, repetition: 3, due: 0, lapses: 0, count: 0 } };
    sm2RecordBelum({ rom: 'neko' });
    assertEqual(srs['neko'].repetition, 0, 'repetition');
  });

  it('should reset interval to 0', function() {
    srs = { 'neko': { ef: 2.5, interval: 7, repetition: 3, due: 0, lapses: 0, count: 0 } };
    sm2RecordBelum({ rom: 'neko' });
    assertEqual(srs['neko'].interval, 0, 'interval');
  });

  it('should reduce EF by 0.2', function() {
    srs = { 'neko': { ef: 2.5, interval: 7, repetition: 3, due: 0, lapses: 0, count: 0 } };
    sm2RecordBelum({ rom: 'neko' });
    assertInRange(srs['neko'].ef, 2.29, 2.31, 'EF should decrease by 0.2');
  });

  it('should not let EF go below 1.3', function() {
    srs = { 'neko': { ef: 1.4, interval: 1, repetition: 1, due: 0, lapses: 0, count: 0 } };
    sm2RecordBelum({ rom: 'neko' });
    assertEqual(srs['neko'].ef, 1.3, 'EF floor is 1.3');
  });

  it('should increment lapses count', function() {
    srs = { 'neko': { ef: 2.5, interval: 7, repetition: 3, due: 0, lapses: 2, count: 2 } };
    sm2RecordBelum({ rom: 'neko' });
    assertEqual(srs['neko'].lapses, 3, 'lapses');
    assertEqual(srs['neko'].count, 3, 'count (alias)');
  });

  it('should set due to ~10 minutes in the future', function() {
    const before = Date.now();
    srs = { 'neko': { ef: 2.5, interval: 7, repetition: 3, due: 0, lapses: 0, count: 0 } };
    sm2RecordBelum({ rom: 'neko' });
    const due = srs['neko'].due;
    const tenMin = 10 * 60 * 1000;
    assertTrue(due >= before + tenMin - 100, 'due should be ~10min from now');
    assertTrue(due <= before + tenMin + 1000, 'due should not be much more than 10min');
  });

  it('should set box to 1 for backward compat', function() {
    srs = { 'neko': { ef: 2.5, interval: 7, repetition: 3, due: 0, lapses: 0, count: 0, box: 4 } };
    sm2RecordBelum({ rom: 'neko' });
    assertEqual(srs['neko'].box, 1, 'box should reset to 1');
  });
});

describe('getForgetPool()', function() {
  it('should return empty array when no words have been studied', function() {
    srs = {};
    const pool = getForgetPool(1);
    assertEqual(pool.length, 0, 'pool length');
  });

  it('should include words with lapses >= threshold', function() {
    srs = {
      'tesuto': { ef: 2.5, interval: 1, repetition: 0, due: 0, lapses: 2, count: 2 },
      'neko': { ef: 2.5, interval: 3, repetition: 2, due: Date.now() + 99999, lapses: 0, count: 0 }
    };
    const pool = getForgetPool(1);
    assertEqual(pool.length, 1, 'only tesuto has lapses>=1');
    assertEqual(pool[0].rom, 'tesuto');
  });

  it('should sort due words first, then by lapses', function() {
    const now = Date.now();
    srs = {
      'tesuto': { ef: 2.5, interval: 1, repetition: 0, due: now + 99999, lapses: 3, count: 3 },
      'neko': { ef: 2.0, interval: 0, repetition: 0, due: now - 1000, lapses: 1, count: 1 },
      'inu': { ef: 2.5, interval: 1, repetition: 0, due: now - 5000, lapses: 5, count: 5 }
    };
    const pool = getForgetPool(1);
    assertEqual(pool.length, 3, 'all 3 have lapses>=1');
    // Due words first (neko and inu are due), then sorted by lapses desc
    assertEqual(pool[0].rom, 'inu', 'inu is due with most lapses');
    assertEqual(pool[1].rom, 'neko', 'neko is due');
    assertEqual(pool[2].rom, 'tesuto', 'tesuto is not due yet');
  });
});

describe('getForgetStats()', function() {
  it('should count total, struggling, and due correctly', function() {
    const now = Date.now();
    srs = {
      'tesuto': { ef: 2.5, interval: 1, repetition: 0, due: now - 1000, lapses: 4, count: 4 },
      'neko': { ef: 2.0, interval: 0, repetition: 0, due: now + 99999, lapses: 1, count: 1 },
      'inu': { ef: 2.5, interval: 1, repetition: 0, due: now - 5000, lapses: 3, count: 3 },
      'taberu': { ef: 2.5, interval: 7, repetition: 3, due: now + 99999, lapses: 0, count: 0 }
    };
    const stats = getForgetStats();
    assertEqual(stats.total, 3, 'total with lapses>=1');
    assertEqual(stats.struggling, 2, 'struggling with lapses>=3');
    assertEqual(stats.due, 2, 'due and has lapses>=1');
  });
});

describe('SM-2 integration: hafal → belum → hafal cycle', function() {
  it('should handle a realistic learning session', function() {
    srs = {};
    const word = { rom: 'taberu', id: 'makan' };

    // First time correct
    sm2RecordHafal(word, 4);
    assertEqual(srs['taberu'].repetition, 1);
    assertEqual(srs['taberu'].interval, 1);

    // Second time correct
    sm2RecordHafal(word, 4);
    assertEqual(srs['taberu'].repetition, 2);
    assertEqual(srs['taberu'].interval, 3);

    // Forgot!
    sm2RecordBelum(word);
    assertEqual(srs['taberu'].repetition, 0);
    assertEqual(srs['taberu'].lapses, 1);
    assertTrue(srs['taberu'].ef < 2.5, 'EF should decrease after lapse');

    // Correct again (restart) — lapses decreases on correct answer
    sm2RecordHafal(word, 4);
    assertEqual(srs['taberu'].repetition, 1);
    assertEqual(srs['taberu'].interval, 1);
    assertEqual(srs['taberu'].lapses, 0, 'lapses should decrease by 1 on correct answer');
  });
});

describe('Backward compatibility: Leitner migration', function() {
  it('should migrate old box-only format on hafal', function() {
    srs = { 'neko': { box: 3, due: Date.now(), count: 2 } };
    sm2RecordHafal({ rom: 'neko' }, 4);
    const card = srs['neko'];
    assertTrue(card.ef !== undefined, 'should have ef after migration');
    assertTrue(card.repetition !== undefined, 'should have repetition');
    assertTrue(card.interval !== undefined, 'should have interval');
  });

  it('should migrate old box-only format on belum', function() {
    srs = { 'inu': { box: 4, due: Date.now(), count: 1 } };
    sm2RecordBelum({ rom: 'inu' });
    const card = srs['inu'];
    assertEqual(card.repetition, 0, 'repetition reset');
    assertEqual(card.ef, 2.3, 'EF = 2.5 - 0.2 = 2.3');
    assertEqual(card.lapses, 1, 'lapses incremented from 0');
  });
});

// ── Results ──
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
if (_failed === 0) {
  console.log(`🎉 All ${_total} tests passed!`);
} else {
  console.log(`⚠️  ${_passed}/${_total} passed, ${_failed} failed`);
}
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

process.exit(_failed > 0 ? 1 : 0);
