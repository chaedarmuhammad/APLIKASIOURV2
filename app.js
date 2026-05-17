// ========== N5→N4 日本語 Flashcard — Main Application ==========
// 
// ARCHITECTURE (v2.2.0):
// ┌─────────────────────────────────────────────────────────┐
// │  index.html                                             │
// │  ├── data-n5.js          → BABS (Bab 1-35)             │
// │  ├── data-n4.js          → BABS_N4 (Bab 36-78)         │
// │  ├── data.js             → Merges BABS + BABS_N4        │
// │  ├── src/utils.js        → escapeHtml, sanitize, toast  │
// │  ├── src/bab-colors.js   → Dynamic CSS injection        │
// │  ├── src/storage.js      → localStorage + IndexedDB     │
// │  ├── src/srs.js          → SM-2 spaced repetition       │
// │  ├── src/version.js      → Versioning & update check    │
// │  ├── src/export-import.js→ Export/Import data manager    │
// │  ├── src/navigation.js   → Screen switching & home UI   │
// │  ├── src/ui-study.js     → Bunpou, Kotoba, Flashcard    │
// │  ├── src/ui-kamus.js     → Kamus Kategori               │
// │  ├── src/ui-rangkuman.js → Rangkuman semua tab           │
// │  └── app.js              → Core: init, state, openBab   │
// └─────────────────────────────────────────────────────────┘
//
// SECURITY: innerHTML usage in this file is intentional for rendering
// Japanese text with <ruby> furigana tags from TRUSTED static data.
// User input (search queries, file names) is escaped via escapeHtml().

// ========== ERROR HANDLING WRAPPER ==========
// Global error handler — catches unhandled errors and shows fallback UI
window.onerror = function(msg, src, line, col, err) {
  console.error('App Error:', msg, src, line, col, err);
  showAppError('Terjadi kesalahan: ' + (msg || 'Unknown error'));
  return true;
};
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

function showAppError(message) {
  const errorScreen = document.getElementById('errorScreen');
  const errorMsg = document.getElementById('errorMessage');
  const loadingScreen = document.getElementById('loadingScreen');
  if (errorScreen && errorMsg) {
    errorMsg.textContent = message || 'Aplikasi gagal dimuat. Silakan refresh halaman.';
    errorScreen.style.display = 'flex';
  }
  if (loadingScreen) loadingScreen.classList.add('hidden');
}

// NOTE: showToast, safeExec, escapeHtml are now defined in src/utils.js
// The following are kept as fallbacks if utils.js fails to load:
if (typeof showToast === 'undefined') {
  function showToast(msg, type) {
    const existing = document.getElementById('appToast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'appToast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    const bg = type === 'error' ? 'rgba(248,113,113,0.95)' : 
               type === 'success' ? 'rgba(52,211,153,0.95)' : 'rgba(124,106,247,0.95)';
    toast.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
      background:${bg};color:white;padding:10px 20px;border-radius:10px;font-size:0.82rem;
      font-weight:600;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.4);
      animation:fadeIn 0.2s ease;max-width:90%;text-align:center`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3500);
  }
}
if (typeof safeExec === 'undefined') {
  function safeExec(fn, fallbackMsg) {
    try { return fn(); } catch(e) { console.error('SafeExec error:', e); return null; }
  }
}

// ========== DATA VALIDATION ==========
function validateData() {
  if (typeof BABS === 'undefined' || !Array.isArray(BABS) || BABS.length === 0) {
    throw new Error('Data bab (BABS) tidak ditemukan atau kosong.');
  }
  // Validate first and last bab structure
  const first = BABS[0];
  if (!first.num || !first.title || !Array.isArray(first.kotoba)) {
    throw new Error('Struktur data bab tidak valid.');
  }
  return true;
}


// ========== LAZY LOADING FOR BAB CONTENT ==========
// Only render study content when a bab is actually opened
const _renderedBabs = new Set();

function lazyRenderBab(babNum) {
  // Study content is rendered on-demand, not at startup
  _renderedBabs.add(babNum);
}

// Intersection Observer for bab cards (animate in view)
let _babObserver = null;
function initBabObserver() {
  if (!('IntersectionObserver' in window)) return;
  _babObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        _babObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '50px', threshold: 0.1 });
}

function observeBabCards() {
  if (!_babObserver) return;
  document.querySelectorAll('.bab-card').forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    _babObserver.observe(card);
  });
}

// ========== SM-2 ENHANCED SRS ==========
// sm2RecordHafal, sm2RecordBelum, recordBelum, recordHafal
// are now defined in src/srs.js (loaded before app.js)

// ========== APP INITIALIZATION ==========
async function initApp() {
  try {
    // Validate data is loaded
    validateData();
    
    // Auto-restore dari IndexedDB jika localStorage kosong (user clear data)
    await idbTryRestore();
    
    // Re-read vars setelah restore (mungkin berubah)
    progress = lsGet('n5prog', progress);
    stars = lsGet('n5stars', stars);
    srs = lsGet('n5srs', srs);
    
    // Initialize IntersectionObserver for lazy animations
    initBabObserver();
    
    // Render home (main entry point of existing app)
    renderHome();
    refreshForgetBanner();
    
    // Observe bab cards for lazy animation
    requestAnimationFrame(function() {
      observeBabCards();
    });
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(function() { loadingScreen.remove(); }, 500);
    }
    
    // Simpan snapshot awal ke IndexedDB
    idbScheduleSave();
    
    // Auto-save periodik setiap 30 detik (safety net)
    setInterval(function() { idbScheduleSave(); }, 30000);
    
    // Save saat user meninggalkan halaman
    window.addEventListener('beforeunload', function() {
      if (_idb) {
        const snapshot = { n5prog: progress, n5stars: stars, n5srs: srs, savedAt: Date.now() };
        idbPut(_idb, 'all_progress', snapshot);
      }
    });
    
    // Save saat app di-hide (mobile: switch tab/minimize)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) idbScheduleSave();
    });
    
    console.log('[N5N4] App initialized. BABS:', BABS.length, 'chapters. IndexedDB:', _idbReady ? 'OK' : 'N/A');
    
    // Check for version update notification
    if (typeof checkVersionUpdate === 'function') checkVersionUpdate();
    
  } catch(e) {
    console.error('[N5N4] Initialization failed:', e);
    showAppError(e.message || 'Gagal memuat aplikasi. Coba refresh halaman.');
  }
}

// ========== APP STATE ==========
let currentBab = null;
let currentTab = 0;
let fcCards = [], fcIndex = 0, fcHafal = [], fcBelum = [], fcSeen = [], fcStreak = 0;
let fcDir = 'jp2id', fcStarOnly = false, fcFlipped = false;

let crossCoreOnly = false, crossBabs = [], crossCats = [];
// Session tracking — prevent reset when switching tabs
let fcSessionBab = null;

// ========== UTILS ==========
// escapeHtml is now defined in src/utils.js (loaded before app.js)

// ========== STORAGE & IDB ==========
// idbOpen, idbPut, idbGet, idbScheduleSave, idbTryRestore, lsGet, lsSet
// are now defined in src/storage.js (loaded before app.js)

let progress = lsGet('n5prog', {});
let stars    = lsGet('n5stars', {});
let rangkumanRendered = false;

// ========== SRS STATE & MIGRATION ==========
// SRS functions (wordKey, srsGet, sm2RecordHafal, sm2RecordBelum, recordBelum,
// recordHafal, getForgetPool, getForgetStats, forgetCount, SRS_INTERVALS_MS)
// are now defined in src/srs.js (loaded before app.js)

let srs = lsGet('n5srs', null);

// Migrasi otomatis dari skema lama 'n5forget' (count saja, key bercampur babNum).
// Skema baru: key = romaji canonical, value = object SRS.
(function migrateForgetToSRS() {
  const legacy = lsGet('n5forget', null);
  if (srs && Object.keys(srs).length) return; // sudah ada SRS → skip
  srs = {};
  if (legacy && typeof legacy === 'object') {
    Object.keys(legacy).forEach(oldKey => {
      const cnt = legacy[oldKey] || 0;
      if (cnt <= 0) return;
      // ambil bagian setelah "babNum_" sebagai kandidat romaji
      const guess = oldKey.replace(/^[^_]+_/, '').replace(/_/g, ' ').toLowerCase();
      const k = guess.trim();
      if (!k) return;
      // gabung kalau collision (ambil yang paling sering lupa)
      const cur = srs[k];
      if (!cur || cnt > cur.lapses) {
        srs[k] = { box: 1, due: Date.now(), lapses: cnt, count: cnt };
      }
    });
  }
  lsSet('n5srs', srs);
  // legacy dipertahankan untuk fallback ekspor; tidak dihapus
})();


// ========== RANGKUMAN → BAB NAVIGATION ==========
let _rsumNavState = null; // {scrollY, tabIdx, clickedElement}

function openBabFromRangkuman(babNum, tabIdx, chipEl) {
  // Validasi: pastikan babNum ada di BABS
  var targetBab = BABS.find(function(b) { return b.num === babNum; });
  if (!targetBab) {
    showToast('Bab ' + babNum + ' tidak ditemukan', 'error');
    return;
  }
  // Simpan posisi scroll dan tab aktif
  _rsumNavState = {
    scrollY: window.scrollY,
    tabIdx: rsumActiveTab,
    clickedBab: babNum,
    chipId: chipEl ? (chipEl.closest('[id]') || {}).id : null
  };
  // Tampilkan banner
  var banner = document.getElementById('backToRangkumanBanner');
  if (banner) {
    banner.classList.add('visible');
    var tabNames = ['Pola', 'Partikel', 'Bentuk VV', 'Konjugasi', 'Ragam', 'Kata Sifat', 'Transitif & Intransitif', 'Angka', 'Lainnya'];
    var tabInfoEl = document.getElementById('bannerTabInfo');
    if (tabInfoEl) tabInfoEl.textContent = '\u203A ' + (tabNames[rsumActiveTab] || '');
  }
  openBab(babNum);
}

function goBackToRangkuman() {
  // Simpan state sebelum operasi apapun (bisa null-kan di akhir)
  var savedState = _rsumNavState;
  
  try {
    // Sembunyikan banner
    var banner = document.getElementById('backToRangkumanBanner');
    if (banner) banner.classList.remove('visible');

    // Pastikan rangkuman sudah di-render
    if (!rangkumanRendered) {
      renderRangkuman();
      rangkumanRendered = true;
    }

    // Navigasi kembali ke rangkuman
    showScr('rangkumanScr');

    // Restore tab
    if (savedState) {
      var tabIdx = savedState.tabIdx;
      // Validasi tabIdx
      if (typeof tabIdx === 'number' && tabIdx >= 0 && tabIdx <= 8) {
        switchRsumTab(tabIdx);
      } else {
        switchRsumTab(0);
      }

      // Restore scroll position
      var savedY = savedState.scrollY || 0;
      requestAnimationFrame(function() {
        window.scrollTo(0, savedY);

        // Highlight flash pada item yang terakhir diklik
        setTimeout(function() {
          try {
            var targetId = savedState.chipId;
            if (targetId) {
              var targetEl = document.getElementById(targetId);
              if (targetEl) {
                targetEl.classList.add('rsum-highlight-flash');
                setTimeout(function() { targetEl.classList.remove('rsum-highlight-flash'); }, 2000);
              }
            }
            // Untuk tab Bentuk VV, highlight row terdekat
            if (savedState.tabIdx === 2 && savedState.clickedBab) {
              var chips = document.querySelectorAll('#rsum-tab-2 .rsum-bab-chip.clickable');
              chips.forEach(function(chip) {
                if (chip.textContent.includes('Bab ' + savedState.clickedBab)) {
                  var row = chip.closest('tr');
                  if (row) {
                    row.classList.add('rsum-highlight-flash');
                    setTimeout(function() { row.classList.remove('rsum-highlight-flash'); }, 2000);
                  }
                }
              });
            }
          } catch(highlightErr) {
            console.warn('[Rangkuman] Highlight error (non-fatal):', highlightErr);
          }
        }, 100);
      });
    }
  } catch(e) {
    console.error('[Rangkuman] goBackToRangkuman error:', e);
    // Fallback: navigasi ke rangkuman tanpa restore state
    try {
      showScr('rangkumanScr');
      switchRsumTab(0);
      window.scrollTo(0, 0);
    } catch(fallbackErr) {
      // Last resort: kembali ke beranda
      goHome();
    }
  }
  _rsumNavState = null;
}


// ========== OPEN BAB ==========
function openBab(num) {
  const prevBab = currentBab ? currentBab.num : null;
  currentBab = BABS.find(b => b.num === num);
  if (!currentBab) {
    showToast('Bab ' + num + ' tidak ditemukan', 'error');
    // Jika dari rangkuman, kembali ke rangkuman
    if (_rsumNavState) {
      goBackToRangkuman();
    }
    return;
  }
  lsSet('n5lastbab', num);
  document.getElementById('studyTitle').textContent = `Bab ${num} — ${currentBab.title}`;
  document.getElementById('studySub').textContent = currentBab.sub;
  if (prevBab !== num) {
    fcCards = []; fcSessionBab = null;
    fcIndex = 0; fcHafal = []; fcBelum = []; fcSeen = []; fcStreak = 0;
  }
  // Sembunyikan banner jika bukan dari Rangkuman
  if (!_rsumNavState) {
    const banner = document.getElementById('backToRangkumanBanner');
    if (banner) banner.classList.remove('visible');
  }
  setStudyTabsVisible(true);
  renderBunpou();
  renderKotoba();
  showScr('studyScr');
  const savedTab = lsGet('n5tab_' + num, 0);
  switchTab(parseInt(savedTab));
}

// ========== TIPS PER BAB ==========
const BAB_TIPS = {
  1: [
    {icon:"💡", title:"Partikel は vs が", points:[
      "は (wa) menandai <b>TOPIK</b> kalimat, bukan selalu subjek gramatikal.",
      "Gunakan は saat memperkenalkan topik baru atau membandingkan sesuatu.",
      "Contoh: わたし<b>は</b> がくせいです (Saya adalah siswa).",
      "⚠️ は dibaca '<b>wa</b>', bukan 'ha', ketika digunakan sebagai partikel!"
    ]},
    {icon:"🗣️", title:"Urutan Perkenalan Diri Formal", points:[
      "① <b>はじめまして</b> — Salam pertama kali bertemu",
      "② <b>[nama]と<ruby><rb>申します</rb><rt>もうします</rt></ruby></b> — Perkenalkan nama saya...",
      "③ <b>[asal/pekerjaan]です</b> — Saya berasal dari... / Saya bekerja sebagai...",
      "④ <b>どうぞ、よろしくお<ruby><rb>願</rb><rt>ねが</rt></ruby>いします</b> — Salam kenal",
      "💡 Hafalkan urutan ini sebagai satu blok!"
    ]},
    {icon:"🔢", title:"Angka 1–99", points:[
      "1–10: いち・に・さん・<b>し(よん)</b>・ご・ろく・<b>なな(しち)</b>・はち・<b>きゅう(く)</b>・じゅう",
      "Puluhan: にじゅう(20), さんじゅう(30), よんじゅう(40), ごじゅう(50)...",
      "Kombinasi: にじゅういち = 21, さんじゅうご = 35",
      "⚠️ Angka 4 dan 7 punya 2 cara baca: 4=し/よん, 7=しち/なな"
    ]}
  ],
  2: [
    {icon:"💡", title:"これ/それ/あれ vs この/その/あの", points:[
      "<b>これ/それ/あれ</b> → berdiri SENDIRI sebagai kata benda penunjuk",
      "<b>この/その/あの</b> → selalu diikuti kata benda (tidak bisa berdiri sendiri)",
      "Contoh: これは<ruby><rb>本</rb><rt>ほん</rt></ruby>です (Ini buku) vs <b>この<ruby><rb>本</rb><rt>ほん</rt></ruby></b> (buku ini)",
      "Jarak: この/これ = dekat pembicara | その/それ = dekat pendengar | あの/あれ = jauh keduanya"
    ]},
    {icon:"🔑", title:"Fungsi Partikel の", points:[
      "① <b>Kepemilikan</b>: わたし<b>の</b><ruby><rb>本</rb><rt>ほん</rt></ruby> (buku saya)",
      "② <b>Kategori / isi</b>: にほんご<b>の</b><ruby><rb>本</rb><rt>ほん</rt></ruby> (buku bahasa Jepang)",
      "③ <b>Pengganti KB</b> yang sudah jelas: それはわたし<b>の</b>です (itu milik saya)",
      "💡 Fungsi ③ (pronominalisasi) sangat umum dalam percakapan sehari-hari!"
    ]}
  ],
  3: [
    {icon:"💡", title:"ここ / そこ / あそこ — Bedakan!", points:[
      "<b>ここ</b> = di sini (dekat PEMBICARA)",
      "<b>そこ</b> = di situ (dekat PENDENGAR)",
      "<b>あそこ</b> = di sana (JAUH dari keduanya)",
      "🎩 Versi sopan: こちら / そちら / あちら (dipakai di kantor, toko, situasi formal)"
    ]},
    {icon:"🏢", title:"Menanyakan Lokasi & Lantai", points:[
      "Lokasi umum: <b>KB は どこですか</b> → KB ada di mana?",
      "Lantai gedung: <b>KB は なんがいですか</b> → KB di lantai berapa?",
      "Contoh jawaban: ２<ruby><rb>階</rb><rt>かい</rt></ruby>と４<ruby><rb>階</rb><rt>かい</rt></ruby>です (di lantai 2 dan 4)",
      "Ingat: <ruby><rb>階</rb><rt>かい</rt></ruby> dibaca <b>かい</b> (bukan がい kecuali dalam なんがい)"
    ]}
  ],
  4: [
    {icon:"💰", title:"Membaca Angka Besar — Aturan Umum", points:[
      "100 = <b>ひゃく</b> | 1.000 = <b>せん</b> | 10.000 = <b>いちまん</b>",
      "Pola ratusan: にひゃく(200), さんびゃく(300)⚠️, ごひゃく(500)...",
      "Pola ribuan: にせん(2000), さんぜん(3000)⚠️, ごせん(5000)..."
    ]},
    {icon:"⚠️", title:"Angka-angka yang Berubah Bunyi!", points:[
      "Ratusan: 300 → <b>さんびゃく</b> | 600 → <b>ろっぴゃく</b> | 800 → <b>はっぴゃく</b>",
      "Ribuan: 3000 → <b>さんぜん</b> | 8000 → <b>はっせん</b>",
      "Cara hafal ratusan: yang berubah adalah 3 (び), 6 (ぴ), 8 (ぴ)",
      "💡 Semua lainnya ikuti pola biasa tanpa perubahan bunyi"
    ]}
  ],
  5: [
    {icon:"⏰", title:"Membaca JAM (〜<ruby><rb>時</rb><rt>じ</rt></ruby>)", points:[
      "Umumnya: angka + じ | Contoh: 1<ruby><rb>時</rb><rt>じ</rt></ruby>=いちじ, 2<ruby><rb>時</rb><rt>じ</rt></ruby>=にじ, 6<ruby><rb>時</rb><rt>じ</rt></ruby>=ろくじ",
      "⚠️ Istimewa: 4<ruby><rb>時</rb><rt>じ</rt></ruby> = <b>よじ</b> (bukan しじ!), 9<ruby><rb>時</rb><rt>じ</rt></ruby> = <b>くじ</b> (bukan きゅうじ!)",
      "Setengah jam: ～<ruby><rb>時</rb><rt>じ</rt></ruby><b><ruby><rb>半</rb><rt>はん</rt></ruby></b> | Contoh: 3<ruby><rb>時半</rb><rt>じはん</rt></ruby>=さんじはん (jam 3:30)"
    ]},
    {icon:"⚠️", title:"Membaca MENIT (〜<ruby><rb>分</rb><rt>ふん</rt></ruby>) — Ada yang Berubah!", points:[
      "1<ruby><rb>分</rb><rt>ふん</rt></ruby>=<b>いっぷん</b> | 2<ruby><rb>分</rb><rt>ふん</rt></ruby>=にふん | 3<ruby><rb>分</rb><rt>ふん</rt></ruby>=<b>さんぷん</b> | 4<ruby><rb>分</rb><rt>ふん</rt></ruby>=よんぷん",
      "5<ruby><rb>分</rb><rt>ふん</rt></ruby>=ごふん | 6<ruby><rb>分</rb><rt>ふん</rt></ruby>=<b>ろっぷん</b> | 7<ruby><rb>分</rb><rt>ふん</rt></ruby>=ななふん | 8<ruby><rb>分</rb><rt>ふん</rt></ruby>=<b>はっぷん</b>",
      "9<ruby><rb>分</rb><rt>ふん</rt></ruby>=きゅうふん | 10<ruby><rb>分</rb><rt>ふん</rt></ruby>=<b>じゅっぷん</b>",
      "💡 Yang berubah (ふん→<b>ぷん</b>): angka <b>1, 3, 6, 8, 10</b>"
    ]},
    {icon:"📅", title:"Hari dalam Seminggu — Cara Hafal", points:[
      "<ruby><rb>月</rb><rt>げつ</rt></ruby>(bulan)→Senin | <ruby><rb>火</rb><rt>か</rt></ruby>(api)→Selasa | <ruby><rb>水</rb><rt>すい</rt></ruby>(air)→Rabu",
      "<ruby><rb>木</rb><rt>もく</rt></ruby>(pohon)→Kamis | <ruby><rb>金</rb><rt>きん</rt></ruby>(emas)→Jumat",
      "<ruby><rb>土</rb><rt>ど</rt></ruby>(tanah)→Sabtu | <ruby><rb>日</rb><rt>にち</rt></ruby>(matahari)→Minggu",
      "💡 Hafalkan artinya: elemen alam yang mudah divisualisasikan!"
    ]}
  ],
  6: [
    {icon:"💡", title:"4 Bentuk Kata Kerja ます", points:[
      "① <b>おきます</b> — positif non-lampau (bangun / akan bangun)",
      "② <b>おきません</b> — negatif non-lampau (tidak bangun)",
      "③ <b>おきました</b> — positif lampau (sudah bangun)",
      "④ <b>おきませんでした</b> — negatif lampau (tidak bangun [kemarin/dulu])"
    ]},
    {icon:"⏱️", title:"Partikel に setelah Waktu", points:[
      "✅ DIPAKAI setelah waktu SPESIFIK: ７<ruby><rb>時</rb><rt>じ</rt></ruby><b>に</b>おきます (bangun jam 7)",
      "✅ Juga dipakai: <ruby><rb>月曜日</rb><rt>げつようび</rt></ruby><b>に</b> (pada hari Senin)",
      "❌ TIDAK dipakai dengan: きのう, きょう, あした, まいにち, まいあさ",
      "💡 Aturan: kata waktu yang sudah 'relatif/umum' tidak butuh に"
    ]}
  ],
  7: [
    {icon:"🚌", title:"Partikel で vs へ — Bedakan!", points:[
      "<b>へ</b> = menunjukkan ARAH/TUJUAN: とうきょう<b>へ</b>いきます (pergi ke Tokyo)",
      "<b>で</b> = menunjukkan ALAT/KENDARAAN: でんしゃ<b>で</b>いきます (pergi dengan kereta)",
      "Keduanya bisa hadir bersama: でんしゃ<b>で</b>とうきょう<b>へ</b>いきます",
      "💡 Ingat: <b>で</b>=cara/alat, <b>へ</b>=arah"
    ]},
    {icon:"📅", title:"Tanggal 1–10 yang Istimewa", points:[
      "1<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>ついたち</b> | 2<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>ふつか</b> | 3<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>みっか</b> | 4<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>よっか</b>",
      "5<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>いつか</b> | 6<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>むいか</b> | 7<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>なのか</b> | 8<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>ようか</b>",
      "9<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>ここのか</b> | 10<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>とおか</b>",
      "⚠️ Khusus lain: 14<ruby><rb>日</rb><rt>にち</rt></ruby>=じゅうよっか | 20<ruby><rb>日</rb><rt>にち</rt></ruby>=<b>はつか</b> | 24<ruby><rb>日</rb><rt>にち</rt></ruby>=にじゅうよっか"
    ]},
    {icon:"📆", title:"Nama Bulan — Sangat Mudah!", points:[
      "Cukup pakai angka + <b>がつ</b>: 1<ruby><rb>月</rb><rt>がつ</rt></ruby>=いちがつ, 2<ruby><rb>月</rb><rt>がつ</rt></ruby>=にがつ ... 12<ruby><rb>月</rb><rt>がつ</rt></ruby>=じゅうにがつ",
      "Tidak ada nama khusus seperti Januari, Februari, dll.",
      "💡 Bedakan: <ruby><rb>月</rb><rt>がつ</rt></ruby>(がつ) = nama bulan vs <ruby><rb>月</rb><rt>がつ</rt></ruby>(げつ) = bahan hari Senin"
    ]}
  ],
  8: [
    {icon:"💡", title:"Partikel を — Objek Langsung", points:[
      "を menandai OBJEK langsung kata kerja transitif",
      "Contoh: ビール<b>を</b>のみます (minum bir), てがみ<b>を</b>かきます (menulis surat)",
      "⚠️ を dibaca '<b>o</b>', bukan 'wo'",
      "Jangan dipakai untuk kata kerja intransitif (あります, います, いきます, dll.)"
    ]},
    {icon:"🔑", title:"Partikel で — Tempat Tindakan", points:[
      "で setelah TEMPAT = lokasi terjadinya tindakan/aktivitas",
      "こうえん<b>で</b>サッカーをします (bermain sepak bola <b>di</b> taman)",
      "❗ Bedakan dengan に yang menunjukkan <b>keberadaan</b>: こうえん<b>に</b>あります (ada di taman)",
      "💡 Aturan: で=tindakan terjadi di sana | に=benda/orang berada di sana"
    ]}
  ],
  9: [
    {icon:"🎁", title:"あげます / もらいます / くれます", points:[
      "<b>あげます</b> = saya/kita MEMBERI ke orang lain (saya→orang lain)",
      "<b>もらいます</b> = saya/kita MENERIMA dari orang lain (orang lain→saya)",
      "<b>くれます</b> (Bab 35) = orang lain MEMBERI ke saya (orang lain→saya)",
      "💡 PEMBICARA selalu jadi titik referensi penentu kata yang dipakai!"
    ]},
    {icon:"💡", title:"Partikel に untuk Penerima", points:[
      "に setelah orang = menandai PENERIMA sesuatu",
      "ともだち<b>に</b>プレゼントをあげます (memberikan hadiah <b>kepada</b> teman)",
      "Berlaku untuk: あげます, おしえます, かします, おくります, かけます (telepon), dll.",
      "Berlaku juga untuk penerima dalam もらいます/かります: ともだち<b>に</b>かります (meminjam dari teman)"
    ]}
  ],
  10: [
    {icon:"💡", title:"もう vs まだ", points:[
      "<b>もう</b> + ました = sudah melakukan | Contoh: もうたべました (sudah makan)",
      "<b>まだです</b> = belum | Contoh: いいえ、まだです (belum)",
      "❌ SALAH: いいえ、まだたべません → ✅ BENAR: いいえ、まだです",
      "💡 Ingat: もう selalu berpasangan dengan bentuk lampau (ました)"
    ]},
    {icon:"🤝", title:"ませんか vs ましょう — Mengajak", points:[
      "<b>〜ませんか</b> = ajakan sopan, nuansa bertanya (Maukah ~?)",
      "<b>〜ましょう</b> = respons positif / ajakan aktif (Ayo ~!)",
      "Contoh dialog: A: いっしょにたべ<b>ませんか</b>。B: ええ、たべ<b>ましょう</b>。",
      "Menolak: すみません、ちょっと… (maaf, agak repot...)"
    ]},
    {icon:"🔧", title:"Partikel で — Alat / Cara", points:[
      "で setelah BENDA = alat, cara, atau bahasa yang digunakan",
      "はし<b>で</b>たべます (makan <b>dengan</b> sumpit)",
      "にほんご<b>で</b>かきます (menulis <b>dalam</b> bahasa Jepang)",
      "⚠️ Bedakan dengan で (tempat tindakan) di Bab 8 — konteksnya berbeda!"
    ]}
  ],
  11: [
    {icon:"💡", title:"Konjugasi Kata Sifat い", points:[
      "Positif: たかい<b>です</b>",
      "Negatif: たか<b>くない</b>です",
      "Lampau positif: たか<b>かった</b>です",
      "Lampau negatif: たか<b>くなかった</b>です"
    ]},
    {icon:"💡", title:"Konjugasi Kata Sifat な", points:[
      "Positif: きれい<b>です</b>",
      "Negatif: きれい<b>じゃありません</b>",
      "Lampau positif: きれい<b>でした</b>",
      "Lampau negatif: きれい<b>じゃありませんでした</b>"
    ]},
    {icon:"⚠️", title:"いい (bagus) — Tidak Beraturan!", points:[
      "Negatif: <b>よく</b>ない (❌ bukan いくない)",
      "Lampau positif: <b>よかった</b>です",
      "Lampau negatif: <b>よくなかった</b>です",
      "💡 Selalu gunakan よ- untuk semua bentuk selain positif non-lampau!"
    ]},
    {icon:"🎯", title:"あまり vs ぜんぜん", points:[
      "<b>あまり</b> + negatif = tidak terlalu ~ | あまりおいしく<b>ない</b>です",
      "<b>ぜんぜん</b> + negatif = sama sekali tidak ~ | ぜんぜんわかり<b>ません</b>",
      "⚠️ Keduanya WAJIB diikuti bentuk negatif — tidak boleh diikuti positif!"
    ]}
  ],
  12: [
    {icon:"💡", title:"Kata Sifat sebagai Penerang KB", points:[
      "<b>KS い</b> langsung di depan KB: たかい<b>やま</b> (gunung tinggi)",
      "<b>KS な</b> tambahkan な sebelum KB: きれい<b>な</b>まち (kota yang indah)",
      "❌ SALAH: きれいまち (tanpa な) | ✅ BENAR: きれいなまち",
      "💡 Mudah: い-adjektiva langsung, な-adjektiva butuh な"
    ]},
    {icon:"❓", title:"どんな vs どれ vs どの", points:[
      "<b>どんな</b> + KB = seperti apa ~ (menanyakan sifat/karakter)",
      "<b>どれ</b> = yang mana (pilih dari 3 benda atau lebih, berdiri sendiri)",
      "<b>どの</b> + KB = yang mana (spesifik, selalu diikuti KB)",
      "Contoh: どん<b>な</b>まちですか vs <b>どの</b>まちですか"
    ]}
  ],
  13: [
    {icon:"💡", title:"Partikel が untuk Suka, Bisa, Mengerti", points:[
      "Gunakan <b>が</b> (bukan を) setelah objek untuk kata-kata ini:",
      "スポーツ<b>が</b>すきです | ダンス<b>が</b>じょうずです",
      "にほんご<b>が</b>わかります | くるま<b>が</b>あります",
      "💡 Pola: [topik]は [objek]が [sifat/KK]です"
    ]},
    {icon:"🔑", title:"〜から — Menyatakan Alasan", points:[
      "<b>[alasan]から、[hasil/akibat]</b> = karena ~, maka ~",
      "いそがしいです<b>から</b>、いけません (Karena sibuk, tidak bisa pergi)",
      "Bisa dibalik: いけません。いそがしいです<b>から</b>。(alasan di akhir)",
      "💡 Jawaban untuk どうして/なぜ: alasan + から (tanpa klausa utama)"
    ]}
  ],
  14: [
    {icon:"🏠", title:"あります vs います — Kapan Dipakai?", points:[
      "<b>あります</b> = ada (untuk benda mati, termasuk tumbuhan)",
      "<b>います</b> = ada (untuk manusia dan hewan yang bergerak sendiri)",
      "⚠️ Tumbuhan/pohon pakai あります (bukan います)!",
      "Contoh: つくえ<b>が</b>あります | ねこ<b>が</b>います"
    ]},
    {icon:"📍", title:"Kata Posisi — Pasangan Antonim", points:[
      "<b>うえ</b>(atas) ↔ <b>した</b>(bawah) | <b>まえ</b>(depan) ↔ <b>うしろ</b>(belakang)",
      "<b>みぎ</b>(kanan) ↔ <b>ひだり</b>(kiri) | <b>なか</b>(dalam) ↔ <b>そと</b>(luar)",
      "<b>となり</b>(sebelah) | <b>ちかく</b>(dekat) | <b>あいだ</b>(antara A と B)",
      "Pola: [KB₁]の[posisi]<b>に</b>[KB₂]が あります/います"
    ]}
  ],
  15: [
    {icon:"🔢", title:"Kata Bantu Bilangan (<ruby><rb>助数詞</rb><rt>じょすうし</rt></ruby>)", points:[
      "<b>〜つ</b> (ひとつ〜とお): benda umum yang bisa digenggam/dihitung",
      "<b>〜<ruby><rb>人</rb><rt>ひと</rt></ruby>(にん)</b>: orang (3+) | Khusus: 1<ruby><rb>人</rb><rt>ひと</rt></ruby>=ひとり, 2<ruby><rb>人</rb><rt>ひと</rt></ruby>=ふたり",
      "<b>〜<ruby><rb>台</rb><rt>だい</rt></ruby>(だい)</b>: mesin, kendaraan (mobil, komputer, TV, dll.)",
      "<b>〜<ruby><rb>枚</rb><rt>まい</rt></ruby>(まい)</b>: benda tipis/lembaran (kertas, prangko, tiket)"
    ]},
    {icon:"👨‍👩‍👧‍👦", title:"Istilah Keluarga — Dua Versi!", points:[
      "<b>Versi merendah</b> (untuk keluarga sendiri): ちち, はは, あに, あね, おとうと, いもうと",
      "<b>Versi hormat</b> (untuk keluarga orang lain): おとうさん, おかあさん, おにいさん, おねえさん",
      "Saat berbicara tentang keluarga orang lain, selalu pakai versi hormat!",
      "Contoh: わたしのちち vs tanaka-sanのおとうさん"
    ]}
  ],
  16: [
    {icon:"⏱️", title:"Durasi vs Waktu Spesifik", points:[
      "Durasi: <b>〜<ruby><rb>時間</rb><rt>じかん</rt></ruby></b>(jam), <b>〜<ruby><rb>週間</rb><rt>しゅうかん</rt></ruby></b>(minggu), <b>〜か<ruby><rb>月</rb><rt>がつ</rt></ruby></b>(bulan), <b>〜<ruby><rb>年</rb><rt>ねん</rt></ruby></b>(tahun)",
      "Durasi TIDAK perlu partikel に: ２<ruby><rb>時間</rb><rt>じかん</rt></ruby>べんきょうします (belajar 2 jam)",
      "Waktu spesifik BUTUH に: ７<ruby><rb>時</rb><rt>じ</rt></ruby><b>に</b>おきます (bangun jam 7)",
      "Perbedaan: ２<ruby><rb>時間</rb><rt>じかん</rt></ruby>(selama 2 jam) vs ２<ruby><rb>時</rb><rt>じ</rt></ruby>に(pada jam 2)"
    ]},
    {icon:"🔁", title:"Frekuensi — [jangka waktu]に〜<ruby>回<rt>かい</rt></ruby>", points:[
      "Pola: [jangka waktu]<b>に</b>[berapa<ruby><rb>回</rb><rt>かい</rt></ruby>] + KK",
      "１<ruby><rb>週間</rb><rt>しゅうかん</rt></ruby>に３<b><ruby><rb>回</rb><rt>かい</rt></ruby></b>テニスをします (3 kali seminggu bermain tenis)",
      "Partikel <b>に</b> setelah jangka waktu WAJIB ada!",
      "Untuk bertanya: <b>どのぐらい</b> (~berapa lama) | <b><ruby><rb>何回</rb><rt>なんかい</rt></ruby></b> (~berapa kali)"
    ]},
    {icon:"⏰", title:"かかります — Waktu yang Dibutuhkan", points:[
      "Pola: [dari]から[ke]まで [kendaraan]で [durasi]かかります",
      "うちから<ruby><rb>学校</rb><rt>がっこう</rt></ruby>までバスで30<ruby><rb>分</rb><rt>ふん</rt></ruby><b>かかります</b>",
      "Untuk bertanya: <b>どのぐらい</b>かかりますか (berapa lama?)",
      "Bisa juga untuk uang: ～<ruby><rb>円</rb><rt>えん</rt></ruby><b>かかります</b> (membutuhkan ~ yen)"
    ]}
  ],
  17: [
    {icon:"⚖️", title:"Membandingkan 2 Benda", points:[
      "Pola: <b>KB₁は KB₂より KS です</b> (KB1 lebih KS dari KB2)",
      "Pertanyaan: KB₁<b>と</b>KB₂<b>と どちらが</b> KS ですか",
      "Jawaban: <b>〜のほうが</b> KS です (yang ini lebih KS)",
      "Dua-duanya sama: <b>どちらも</b> KS です"
    ]},
    {icon:"🏆", title:"Superlative — yang Paling (いちばん)", points:[
      "Pola: [kelompok]<b>の<ruby><rb>中</rb><rt>なか</rt></ruby>で</b> [apa/siapa/kapan]が <b>いちばん</b> KS ですか",
      "Contoh: スポーツの<ruby><rb>中</rb><rt>なか</rt></ruby>で サッカーが<b>いちばん</b>すきです",
      "Kata tanya yang dipakai: <b><ruby><rb>何</rb><rt>なん</rt></ruby></b>(benda), <b>どこ</b>(tempat), <b>だれ</b>(orang), <b>いつ</b>(waktu)",
      "⚠️ どちら = pilihan dari 2 | どれ = pilihan dari 3 atau lebih"
    ]}
  ],
  18: [
    {icon:"⏮️", title:"Konjugasi Kata Sifat Bentuk Lampau", points:[
      "KS い → positif: <b>〜かった</b>です | negatif: <b>〜くなかった</b>です",
      "KS な/KB → positif: <b>〜でした</b> | negatif: <b>〜じゃなかった</b>です",
      "❌ SALAH: あつい<b>でした</b> | ✅ BENAR: あつ<b>かった</b>です",
      "❌ SALAH: きれい<b>くなかった</b> | ✅ BENAR: きれい<b>じゃなかった</b>"
    ]},
    {icon:"☀️", title:"Kosakata Cuaca", points:[
      "<b>はれ</b>(cerah) | <b>あめ</b>(hujan) | <b>くもり</b>(berawan) | <b>ゆき</b>(salju)",
      "Cuaca dinyatakan sebagai kata benda: きょうは<b>はれ</b>です",
      "Kata sifat cuaca: あつい(panas) | さむい(dingin) | すずしい(sejuk) | あたたかい(hangat)",
      "Perubahan cuaca: あつくなりました (menjadi panas) → pakai なります!"
    ]}
  ],
  19: [
    {icon:"💡", title:"ほしい vs たい — Bedakan!", points:[
      "<b>KB が ほしいです</b> = ingin MEMILIKI benda",
      "<b>KK(ます) + たいです</b> = ingin MELAKUKAN sesuatu",
      "Contoh: あたらしいパソコン<b>がほしい</b> vs にほんへいき<b>たい</b>",
      "💡 Objek たい bisa pakai を atau が (keduanya benar)"
    ]},
    {icon:"⚠️", title:"たい/ほしい — Hanya untuk Pembicara!", points:[
      "〜たいです dan 〜ほしいです hanya untuk keinginan PEMBICARA SENDIRI",
      "Untuk keinginan orang KETIGA: 〜たがっています / 〜ほしがっています",
      "❌ SALAH: かれはいきた<b>いです</b>。",
      "✅ BENAR: かれはいき<b>たがっています</b>。"
    ]}
  ],
  20: [
    {icon:"🎯", title:"Tujuan Pergi — [KK]に いきます", points:[
      "Pola: [tempat]へ <b>[KK ます<ruby><rb>形</rb><rt>けい</rt></ruby>] に いきます/きます/かえります</b>",
      "KK harus dalam bentuk <b>ます<ruby><rb>形</rb><rt>けい</rt></ruby></b> (tanpa ます): たべ<b>に</b>, あそび<b>に</b>",
      "Contoh: こうえんへ あそび<b>に</b>いきます (pergi ke taman untuk bermain)",
      "Kata benda juga bisa: びじゅつのべんきょう<b>に</b>きました"
    ]},
    {icon:"💡", title:"Perbedaan へ dan に di Pola Ini", points:[
      "<b>へ</b> menunjukkan TEMPAT TUJUAN (pergi ke mana)",
      "<b>に</b> menunjukkan TUJUAN KEGIATAN (untuk apa)",
      "Keduanya hadir bersama: こうえん<b>へ</b>あそび<b>に</b>いきます",
      "Urutan: [tempat]へ + [kegiatan]に + いきます/きます/かえります"
    ]}
  ],
  21: [
    {icon:"🔀", title:"Cara Membentuk Kata Kerja Bentuk て", points:[
      "<b>Grup I</b>: い/ち/り→って | み/び/に→んで | き→いて | ぎ→いで | し→して",
      "<b>Grup II</b>: ます→て | Contoh: たべます→たべて, みます→みて",
      "<b>Grup III</b>: きます→きて | します→して",
      "⚠️ PENGECUALIAN: いきます → <b>いって</b> (bukan いいて!)"
    ]},
    {icon:"⚠️", title:"Pengecualian Penting: いきます → いって", points:[
      "いきます (pergi) adalah SATU-SATUNYA pengecualian di Grup I",
      "Seharusnya き→いて, tapi berubah menjadi <b>いって</b>",
      "❌ SALAH: いきて | ✅ BENAR: <b>いって</b>",
      "Hafalkan khusus: いきます → <b>いって</b>ください"
    ]},
    {icon:"🙏", title:"てください vs ましょうか — Bedakan!", points:[
      "<b>〜てください</b> = meminta orang lain melakukan (Tolong ~)",
      "<b>〜ましょうか</b> = menawarkan diri untuk membantu (Boleh saya ~?)",
      "Jawaban ましょうか: ええ、おねがいします (ya, tolong)",
      "Contoh: みせて<b>ください</b> vs みせ<b>ましょうか</b>"
    ]}
  ],
  22: [
    {icon:"🚦", title:"てもいいですか vs てはいけません", points:[
      "<b>〜てもいいですか</b> = meminta IZIN (Bolehkah ~?)",
      "<b>〜てはいけません</b> = menyatakan LARANGAN (Tidak boleh ~)",
      "Izin diterima: はい、どうぞ / いいですよ",
      "⚠️ Keduanya adalah PASANGAN BERLAWANAN — hafal keduanya sekaligus!"
    ]},
    {icon:"🔑", title:"Bentuk て Berlaku di Banyak Pola", points:[
      "Satu bentuk て, banyak fungsi:",
      "〜<b>て</b>ください = tolong lakukan",
      "〜<b>て</b>もいいですか = bolehkah ~",
      "〜<b>て</b>はいけません = tidak boleh ~ | 〜<b>て</b>います = sedang ~ / keadaan ~"
    ]}
  ],
  23: [
    {icon:"📸", title:"〜ています — 3 Makna Berbeda!", points:[
      "① <b>Sedang berlangsung</b>: いまテレビをみ<b>ています</b> (sedang menonton)",
      "② <b>Hasil/keadaan berlanjut</b>: けっこんし<b>ています</b> (sudah menikah, masih menikah)",
      "③ <b>Kebiasaan/pekerjaan</b>: だいがくでべんきょうし<b>ています</b> (belajar di universitas — profesi)",
      "💡 Pahami konteks untuk membedakan ketiga makna ini!"
    ]},
    {icon:"⚠️", title:"しっています → negatifnya しりません!", points:[
      "しっています = mengetahui (sekarang)",
      "Negatif: <b>しりません</b> (BUKAN しっていません!)",
      "❌ SALAH: しっていません | ✅ BENAR: <b>しりません</b>",
      "Ini pengecualian yang sering salah dalam ujian!"
    ]},
    {icon:"🏠", title:"すんでいます vs います — Bedakan!", points:[
      "<b>すんでいます</b> = tinggal di ~ (keadaan berlanjut, tempat tinggal tetap)",
      "<b>います</b> = ada/berada di ~ (lokasi saat ini, mungkin sementara)",
      "とうきょうに<b>すんでいます</b> (tinggal di Tokyo = alamat tetap)",
      "いまとしょかんに<b>います</b> (sekarang ada di perpustakaan = lokasi sementara)"
    ]}
  ],
  24: [
    {icon:"📋", title:"〜て、〜 vs 〜てから、〜", points:[
      "<b>〜て、〜</b> = urutan aksi biasa (lalu, kemudian)",
      "<b>〜てから、〜</b> = menekankan urutan KETAT (baru setelah selesai)",
      "Contoh て: ごはんをたべ<b>て</b>、テレビをみます",
      "Contoh てから: ごはんをたべ<b>てから</b>、テレビをみます (lebih tegas urutannya)"
    ]},
    {icon:"⏱️", title:"Waktu dalam KK て、KK て、KK", points:[
      "Waktu seluruh kalimat ditentukan oleh kata kerja di <b>AKHIR</b>",
      "Contoh (masa depan): あさジョギングをし<b>て</b>、シャワーをあびて、がっこうへ<b>いきます</b>",
      "Contoh (lampau): ごはんをたべ<b>て</b>、テレビをみ<b>ました</b>",
      "💡 Semua kata kerja tengah tidak perlu berubah bentuk waktu"
    ]},
    {icon:"🚆", title:"Kata Kerja Transportasi Kereta", points:[
      "でんしゃに<b>のります</b> (naik kereta) — partikel <b>に</b>",
      "でんしゃを<b>おります</b> (turun kereta) — partikel <b>を</b>",
      "でんしゃに<b>のりかえます</b> (ganti kereta) — partikel <b>に</b>",
      "Urutan umum: のる → のりかえる (jika perlu) → おりる"
    ]}
  ],
  25: [
    {icon:"🐘", title:"Pola KB₁ は KB₂ が KS", points:[
      "Menyatakan ciri/sifat khusus yang dimiliki topik",
      "ぞう<b>は</b>はな<b>が</b>ながいです (Gajah, hidungnya panjang)",
      "KB₁ は = topik keseluruhan | KB₂ が = ciri yang dideskripsikan",
      "Terjemahkan bebas: 'mengenai KB₁, KB₂-nya adalah KS'"
    ]},
    {icon:"🔗", title:"Menggabungkan Kata Sifat (〜くて/〜で)", points:[
      "<b>KS い</b>: buang い, tambah <b>くて</b> | ひろい → ひろ<b>くて</b>あかるいです",
      "<b>KS な</b>: buang な, tambah <b>で</b> | しずか → しずか<b>で</b>べんりです",
      "Gabungan berbeda: ひろ<b>くて</b>、きれい<b>です</b> (い + な di akhir)",
      "❌ SALAH: しずか<b>くて</b> | ✅ BENAR: しずか<b>で</b>"
    ]},
    {icon:"💡", title:"KB は KS vs KB は KB が KS", points:[
      "<b>KB は KS</b> = topik langsung dideskripsikan: とうきょう<b>は</b>おおきいです",
      "<b>KB は KB が KS</b> = melalui ciri bagiannya: とうきょう<b>は</b>ひと<b>が</b>おおいです",
      "Kunci: apakah ada DUA kata benda? Jika ya, pakai pola kedua",
      "Gunakan untuk deskripsi fisik: かみがながい, めがおおきい, dll."
    ]}
  ],
  26: [
    {icon:"🔄", title:"Cara Membentuk Bentuk ない", points:[
      "<b>Grup I</b>: ubah bunyi akhir i→a, tambah ない",
      "Contoh: かき→かか+ない | のみ→のま+ない | はなし→はなさ+ない",
      "<b>Grup II</b>: buang ます, tambah ない | たべます→たべない",
      "<b>Grup III</b>: きます→こない | します→しない"
    ]},
    {icon:"⚠️", title:"Pengecualian: あいます → あわない!", points:[
      "あいます (bertemu) → <b>あわない</b> (bukan ああない!)",
      "Terjadi karena vokal あ+い bergabung menjadi あわ",
      "Begitu pula: かいます→<b>かわない</b> | つかいます→<b>つかわない</b>",
      "Hafal pola ini: kata kerja berakhiran -います → akhiran ない pakai わ"
    ]},
    {icon:"📋", title:"4 Pola Bentuk ない yang Wajib Hafal", points:[
      "① <b>〜ないでください</b> = Tolong jangan ~ (permintaan negatif)",
      "② <b>〜なければなりません</b> = Harus ~ (kewajiban)",
      "③ <b>〜なくてもいいです</b> = Tidak perlu ~ (tidak wajib)",
      "Urutan logis: jangan (①) → harus (②) → tidak perlu (③)"
    ]}
  ],
  27: [
    {icon:"📖", title:"Cara Membentuk Bentuk Kamus (<ruby>辞書形<rt>じしょけい</rt></ruby>)", points:[
      "<b>Grup I</b>: ubah bunyi akhir i→u | かきます→かく, のみます→のむ",
      "<b>Grup II</b>: buang ます, tambah る | たべます→たべる, みます→みる",
      "<b>Grup III</b>: きます→<b>くる</b> | します→<b>する</b>",
      "Bentuk kamus selalu berakhiran vokal-u: く,ぐ,す,つ,ぬ,ぶ,む,う,る"
    ]},
    {icon:"💪", title:"できます — 2 Cara Penggunaan", points:[
      "① <b>KB が できます</b>: うんてん<b>が</b>できます (bisa mengemudi)",
      "② <b>KK kamus + ことが できます</b>: うたうこと<b>が</b>できます",
      "⚠️ Objek できます selalu pakai <b>が</b>, BUKAN を!",
      "Negatif: できません | Pertanyaan: できますか"
    ]},
    {icon:"🎯", title:"〜<ruby><rb>趣味</rb><rt>しゅみ</rt></ruby>は〜ことです — Mengungkapkan Hobi", points:[
      "Cara 1 (singkat): しゅみは<b>つり</b>です (hobi saya memancing)",
      "Cara 2 (detail): しゅみはほんをよむ<b>こと</b>です",
      "こと = nominalizer (mengubah KK menjadi kata benda)",
      "Cara 2 lebih spesifik dan formal, cocok untuk wawancara/percakapan serius"
    ]}
  ],
  28: [
    {icon:"⏮️", title:"Bentuk た = Bentuk て, Ganti て→た", points:[
      "Bentuk た dibuat dari bentuk て: cukup ganti <b>て→た</b> dan <b>で→だ</b>",
      "Contoh: かって→<b>かった</b> | のんで→<b>のんだ</b> | たべて→<b>たべた</b>",
      "Grup III: きて→<b>きた</b> | して→<b>した</b>",
      "💡 Hafal bentuk て dulu, bentuk た otomatis mengikuti!"
    ]},
    {icon:"🌏", title:"〜たことがあります — Pengalaman", points:[
      "Pola: <b>KK た + ことが あります</b> = pernah melakukan ~",
      "Belum pernah: <b>〜たことが ありません</b>",
      "Belum pernah sama sekali: <b><ruby><rb>一度</rb><rt>いちど</rt></ruby>も〜ありません</b>",
      "Pertanyaan: 〜たことが<b>ありますか</b>?"
    ]},
    {icon:"🔀", title:"〜たり〜たりします — Contoh Kegiatan", points:[
      "Pola: [KK た]<b>り</b>、[KK た]<b>り します</b>",
      "Menyebutkan BEBERAPA contoh dari banyak kegiatan (tidak exhaustive)",
      "⚠️ <b>します</b> di akhir WAJIB ada!",
      "Contoh: そうじし<b>たり</b>、せんたくし<b>たり します</b>"
    ]}
  ],
  29: [
    {icon:"⏱️", title:"3 Pola Urutan Waktu — Perbandingan", points:[
      "① <b>KK kamus + まえに</b> = SEBELUM melakukan (tindakan belum terjadi)",
      "② <b>KK た + あとで</b> = SETELAH melakukan (tindakan sudah terjadi)",
      "③ <b>KK て + から</b> = LANGSUNG SETELAH (urutan lebih ketat dari あとで)",
      "Urutan keketatan: てから > あとで"
    ]},
    {icon:"⚠️", title:"まえに — Selalu Bentuk KAMUS!", points:[
      "Sebelum まえに, KK SELALU bentuk kamus, apapun waktu kalimat utama",
      "✅ BENAR: たべる<b>まえに</b>てをあらいます",
      "❌ SALAH: たべた<b>まえに</b>てをあらいます",
      "Bandingkan: あとで pakai bentuk た — たべた<b>あとで</b> ✅"
    ]},
    {icon:"🔑", title:"KB の まえに / KB の あとで", points:[
      "Kata benda bisa langsung + の + まえに/あとで",
      "テスト<b>のまえに</b>ふくしゅうしてください (sebelum ujian)",
      "パーティー<b>のあとで</b>おさらをあらいます (setelah pesta)",
      "💡 Lebih simple — tidak perlu mengubah kata kerja sama sekali!"
    ]}
  ],
  30: [
    {icon:"🗣️", title:"Ragam Biasa vs Sopan — Tabel Singkat", points:[
      "<b>KK</b>: かきます→かく | かきません→かかない | かきました→かいた",
      "<b>KS い</b>: おおきいです→おおきい | おおきくないです→おおきくない",
      "<b>KS な/KB</b>: べんりです→べんりだ | べんりじゃない | べんりだった",
      "💡 Ragam biasa = hilangkan です/ます di akhir, sesuaikan konjugasi"
    ]},
    {icon:"💡", title:"Kapan Gunakan Ragam Biasa?", points:[
      "✅ GUNAKAN: dengan teman sebaya/dekat, adik, anak, buku harian",
      "✅ GUNAKAN: dalam kalimat kutipan 〜と<ruby><rb>思</rb><rt>おも</rt></ruby>います/〜と<ruby><rb>言</rb><rt>い</rt></ruby>います",
      "❌ JANGAN: kepada atasan, guru, orang lebih tua, orang baru dikenal",
      "Dalam kutipan (〜と<ruby><rb>思</rb><rt>おも</rt></ruby>います), selalu biasa meski konteks formal!"
    ]},
    {icon:"💬", title:"Ekspresi Informal yang Sering Dipakai", points:[
      "<b>うん</b> = ya (informal dari はい)",
      "<b>ううん/うううん</b> = tidak (informal dari いいえ)",
      "<b>〜けど</b> = tapi (informal dari 〜が) | <b>ぼく</b> = aku (laki-laki)",
      "<b>〜くん</b> = untuk nama laki-laki (informal dari 〜さん)"
    ]}
  ],
  31: [
    {icon:"💭", title:"〜と<ruby><rb>思</rb><rt>おも</rt></ruby>います — Menyatakan Pendapat", points:[
      "Pola: <b>[bentuk biasa] + と<ruby><rb>思</rb><rt>おも</rt></ruby>います</b>",
      "Bentuk sebelum と SELALU ragam biasa (kamus/ない/た/だ)",
      "Contoh: あしたあめ<b>だ</b>とおもいます | むずかし<b>い</b>とおもいます",
      "Untuk bertanya: 〜について<b>どう<ruby><rb>思</rb><rt>おも</rt></ruby>いますか</b>?"
    ]},
    {icon:"🗨️", title:"〜と<ruby><rb>言</rb><rt>い</rt></ruby>います — Melaporkan Ucapan", points:[
      "Pola: <b>[kutipan bentuk biasa] + と<ruby><rb>言</rb><rt>い</rt></ruby>いました</b>",
      "Isi kutipan TIDAK berubah mengikuti waktu kalimat utama",
      "Contoh: せんせいはあしたテストがある<b>と<ruby><rb>言</rb><rt>い</rt></ruby>いました</b>",
      "⚠️ Berbeda dari bahasa Indonesia yang mengubah bentuk dalam kutipan tak langsung"
    ]},
    {icon:"💡", title:"と<ruby><rb>思</rb><rt>おも</rt></ruby>います vs と<ruby><rb>言</rb><rt>い</rt></ruby>います — Bedakan!", points:[
      "<b>と<ruby><rb>思</rb><rt>おも</rt></ruby>います</b> = PIKIRAN/PENDAPAT pembicara sendiri",
      "<b>と<ruby><rb>言</rb><rt>い</rt></ruby>います</b> = melaporkan UCAPAN orang lain",
      "Kata keterangan berguna: たぶん(mungkin) | きっと(pasti) | もちろん(tentu saja)",
      "Kedua pola ini wajib menggunakan ragam biasa sebelum と"
    ]}
  ],
  32: [
    {icon:"👔", title:"Kata Kerja Memakai Pakaian", points:[
      "<b>きます</b> (<ruby><rb>着</rb><rt>き</rt></ruby>る) = baju, kemeja, jaket, jas (bagian atas badan)",
      "<b>はきます</b> (<ruby><rb>履</rb><rt>は</rt></ruby>く) = celana, rok, sepatu, kaus kaki (bagian bawah/kaki)",
      "<b>かぶります</b> (<ruby><rb>被</rb><rt>かぶ</rt></ruby>る) = topi, helm (kepala)",
      "<b>かけます</b> = kacamata | <b>します</b> = dasi, perhiasan | <b>もちます</b> = tas"
    ]},
    {icon:"🔗", title:"Kata Kerja Memodifikasi Kata Benda", points:[
      "<b>KK た</b> + KB = tindakan sudah terjadi: つくっ<b>た</b>りょうり (masakan yang dibuat)",
      "<b>KK kamus</b> + KB = tindakan akan/sedang terjadi: たべ<b>る</b>じかん (waktu makan)",
      "<b>KK ている</b> + KB = kondisi berlanjut: かけ<b>ている</b>ひと (orang yang memakai)",
      "⚠️ Kata kerja dalam klausa penerang SELALU bentuk biasa (ragam biasa)!"
    ]}
  ],
  33: [
    {icon:"⏰", title:"とき — 4 Bentuk, 4 Makna", points:[
      "<b>KK kamus + とき</b> = 'saat akan' melakukan (tindakan belum terjadi): たべ<b>るとき</b>",
      "<b>KK た + とき</b> = 'setelah' melakukan (tindakan sudah terjadi): たべ<b>たとき</b>",
      "<b>KS い + とき</b>: わかい<b>とき</b> (waktu masih muda)",
      "<b>KB/KS な + の + とき</b>: こども<b>のとき</b> (waktu masih anak-anak)"
    ]},
    {icon:"💡", title:"KK kamus vs KK た sebelum とき", points:[
      "✅ BENAR: ほんをかり<b>る</b>とき、カードがいります (saat akan meminjam → belum terjadi)",
      "✅ BENAR: うちにかえっ<b>た</b>とき、てをあらいます (setelah sampai → sudah terjadi)",
      "Kunci: apakah tindakan di klausa とき sudah terjadi atau belum?",
      "Ini perbedaan penting yang sering muncul di JLPT!"
    ]},
    {icon:"🔑", title:"とき vs まえに vs てから", points:[
      "<b>まえに</b> = sebelum tindakan (pasti belum terjadi)",
      "<b>てから</b> = langsung setelah tindakan (urutan ketat)",
      "<b>たとき</b> = saat/ketika setelah tindakan (lebih umum/longgar)",
      "<b>るとき</b> = saat akan melakukan tindakan"
    ]}
  ],
  34: [
    {icon:"🔄", title:"Cara Membentuk 'Menjadi' (なります)", points:[
      "<b>KS い</b>: ganti い → く + なります | さむい→さむ<b>く</b>なります",
      "<b>KS な</b>: hilangkan な + に + なります | げんきな→げんき<b>に</b>なります",
      "<b>KB</b>: + に + なります | いしゃ<b>に</b>なります | はる<b>に</b>なります",
      "⚠️ いい → <b>よく</b>なります (bukan いくなります!)"
    ]},
    {icon:"💡", title:"なります vs です — Proses vs Keadaan", points:[
      "<b>なります</b> = ada PERUBAHAN menjadi ~ (menekankan proses)",
      "<b>です</b> = menyatakan keadaan SEKARANG (statis)",
      "にほんごがじょうず<b>になりました</b> (ada kemajuan, berubah)",
      "にほんごがじょうず<b>です</b> (keadaan saat ini, tanpa info perubahan)"
    ]},
    {icon:"📈", title:"Kata Keterangan yang Cocok dengan なります", points:[
      "<b>だんだん〜</b> = semakin/bertahap: だんだんさむ<b>くなります</b>",
      "<b>もうすぐ〜</b> = segera menjadi: もうすぐはる<b>になります</b>",
      "<b>もっと〜</b> = menjadi lebih: もっとじょうず<b>になりたい</b>",
      "〜てきました = perubahan bertahap hingga sekarang (nuansa N4)"
    ]}
  ],
  35: [
    {icon:"🎁", title:"くれます — Kapan Digunakan?", points:[
      "<b>くれます</b> = orang lain MEMBERI kepada SAYA (atau keluarga saya)",
      "Perbedaan: あげます (saya→orang lain) | もらいます (orang lain→saya, sudut pandang saya) | くれます (orang lain→saya, sudut pandang pemberi)",
      "Subjek くれます = orang lain (bukan saya!)",
      "Contoh: たなかさんは わたし<b>に</b>じしょをくれました"
    ]},
    {icon:"🔗", title:"て+あげます/もらいます/くれます", points:[
      "<b>〜てあげます</b> = saya melakukan untuk orang lain (manfaat→orang lain)",
      "<b>〜てもらいます</b> = saya minta/dapat orang lain melakukan (manfaat→saya)",
      "<b>〜てくれます</b> = orang lain melakukan untuk saya secara sukarela (manfaat→saya)",
      "💡 もらいます vs くれます: sama-sama saya terima, tapi SUBJEK kalimat berbeda!"
    ]},
    {icon:"🔄", title:"Ringkasan Pola Memberi & Menerima N5", points:[
      "<b>あげます</b>: A→B | <b>もらいます</b>: B→A (A=saya yang menerima)",
      "<b>くれます</b>: B→A (B=orang lain yang memberi ke saya)",
      "<b>てあげます</b>: A melakukan untuk B | <b>てもらいます</b>: A=saya menerima bantuan",
      "<b>てくれます</b>: B melakukan untuk A=saya (inisiatif dari B)"
    ]},
  ],
  36: [
    {icon:"🗺️", title:"と untuk Petunjuk Arah", points:[
      "<b>まっすぐ いくと</b> = kalau jalan lurus...",
      "<b><ruby><rb>角</rb><rt>かど</rt></ruby>を まがると</b> = kalau belok di tikungan...",
      "<b><ruby><rb>交差点</rb><rt>こうさてん</rt></ruby>を わたると</b> = kalau menyeberang persimpangan...",
      "Hasil selalu PASTI & otomatis: ada tempat/bangunan, dll."
    ]},
    {icon:"⚙️", title:"と untuk Cara Kerja Alat", points:[
      "ボタンを <b><ruby><rb>押</rb><rt>お</rt></ruby>すと</b> = kalau menekan tombol...",
      "レバーを <b><ruby><rb>引</rb><rt>ひ</rt></ruby>くと</b> = kalau menarik tuas...",
      "つまみを <b><ruby><rb>回</rb><rt>かい</rt></ruby>すと</b> = kalau memutar knop...",
      "⚠️ Ingat: と TIDAK bisa diikuti keinginan (~たい) atau ajakan (~ましょう)!"
    ]},
    {icon:"💡", title:"と vs たら — Kapan Pakai Yang Mana?", points:[
      "<b>と</b>: Hukum alam, petunjuk, cara kerja mesin. Hasil PASTI.",
      "<b>たら</b>: Kondisi hipotetis. Bisa pakai ~たい, ~ましょう, ~てください.",
      "Ingat: 'と' = 'tomatis' (otomatis), 'たら' = bisa tambah harapan!"
    ]}
  ],
  37: [
    {icon:"📐", title:"Konjugasi ~たら — Ringkasan", points:[
      "KK I: のむ → のんだ → <b>のんだら</b> | まつ → まった → <b>まったら</b>",
      "KK II: たべる → たべた → <b>たべたら</b> | みる → みた → <b>みたら</b>",
      "KK III: くる → きた → <b>きたら</b> | する → した → <b>したら</b>",
      "KS い: あつい → あつかった → <b>あつかったら</b>",
      "KS な: きれいだ → きれいだった → <b>きれいだったら</b>",
      "KB: やすみだ → やすみだった → <b>やすみだったら</b>"
    ]},
    {icon:"💡", title:"もし dengan たら", points:[
      "もし = 'seandainya / kalau seandainya' (kondisi yang belum tentu terjadi)",
      "もし 〜たら → menekankan kondisi hipotetis/pengandaian",
      "Contoh: <b>もし</b> 1<ruby><rb>億円</rb><rt>おくえん</rt></ruby> あったら、<ruby><rb>旅行</rb><rt>りょこう</rt></ruby>したいです。",
      "もし tidak selalu harus digunakan, tapi menambahkan penekanan."
    ]}
  ],
  38: [
    {icon:"⏰", title:"たら Temporal vs Kondisional", points:[
      "<b>Kondisional</b> (bab 37): もし 〜たら = Seandainya... (belum tentu terjadi)",
      "<b>Temporal</b> (bab 38): 〜たら、すぐ = Setelah/Saat... langsung... (pasti terjadi)",
      "Contoh temporal: <ruby><rb>家</rb><rt>うち</rt></ruby>へ <ruby><rb>帰</rb><rt>かえ</rt></ruby>ったら、すぐ シャワーを <ruby><rb>浴</rb><rt>あ</rt></ruby>びます。",
      "Kunci: temporal biasanya ada kata urutan seperti すぐ (langsung)."
    ]},
    {icon:"📝", title:"Latihan Konjugasi たら", points:[
      "<ruby><rb>卒業</rb><rt>そつぎょう</rt></ruby>します → <b><ruby><rb>卒業した</rb><rt>そつぎょうした</rt></ruby>ら</b> (setelah lulus)",
      "<ruby><rb>仕事</rb><rt>しごと</rt></ruby>が <ruby><rb>終</rb><rt>お</rt></ruby>わります → <b><ruby><rb>仕事</rb><rt>しごと</rt></ruby>が <ruby><rb>終</rb><rt>お</rt></ruby>わったら</b> (setelah kerja selesai)",
      "うちへ <ruby><rb>帰り</rb><rt>かえり</rt></ruby>ます → <b>うちへ <ruby><rb>帰</rb><rt>かえ</rt></ruby>ったら</b> (setelah pulang)",
      "<ruby><rb>年</rb><rt>ねん</rt></ruby>を <ruby><rb>取ります</rb><rt>とります</rt></ruby> → <b><ruby><rb>年</rb><rt>ねん</rt></ruby>を <ruby><rb>取</rb><rt>と</rt></ruby>ったら</b> (saat sudah tua)"
    ]}
  ],
  39: [
    {icon:"📐", title:"Konjugasi ~ても — Ringkasan", points:[
      "KK bentuk て + も: たべて → <b>たべても</b> | いって → <b>いっても</b>",
      "KK ない なくて + も: たべない → たべなくて → <b>たべなくても</b>",
      "KS い: あつい → あつくて → <b>あつくても</b> | よい → <b>よくても</b>",
      "KS な: きれいだ → きれいで → <b>きれいでも</b>",
      "KB: あめだ → あめで → <b>あめでも</b>"
    ]},
    {icon:"⚡", title:"いくら〜ても", points:[
      "いくら = bagaimanapun / seberapa pun",
      "いくら 〜ても + negatif = walaupun seberapa pun... tetap tidak bisa",
      "Contoh: いくら <b><ruby><rb>考</rb><rt>かんが</rt></ruby>えても</b>、わかりません。",
      "(Bagaimanapun saya pikirkan, tetap tidak mengerti.)"
    ]},
    {icon:"🔄", title:"ても vs たら vs と — Review Lengkap", points:[
      "<b>と</b>: Kalau X → Y pasti terjadi (otomatis/alam). Tidak bisa pakai keinginan.",
      "<b>たら</b>: Kalau X → bisa pakai keinginan, ajakan, permintaan.",
      "<b>ても</b>: Walaupun X → Y tetap terjadi (berlawanan harapan).",
      "3 pola kondisional ini adalah INTI tata bahasa N4!"
    ]}
  ],
  40: [
    {icon:"💬", title:"んです — Kapan Digunakan?", points:[
      "Menjelaskan ALASAN atau KONDISI: なぜ<ruby><rb>遅</rb><rt>おそ</rt></ruby>れたの? → <b><ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>が <ruby><rb>止</rb><rt>と</rt></ruby>まったんです。</b>",
      "Meminta penjelasan: どうしたんですか？ (Ada apa?)",
      "Berbagi informasi latar: <ruby><rb>実</rb><rt>じつ</rt></ruby>は、<ruby><rb>明日</rb><rt>あした</rt></ruby> <ruby><rb>日本</rb><rt>にほん</rt></ruby>へ <ruby><rb>行く</rb><rt>いく</rt></ruby>んです。",
      "〜んです membuat percakapan lebih natural & hangat dalam bahasa Jepang."
    ]},
    {icon:"📐", title:"Konjugasi ~んです", points:[
      "KK (bentuk biasa) + んです: たべる → <b>たべるんです</b>",
      "KS い + んです: あつい → <b>あついんです</b>",
      "KS な (だ→な) + んです: きれいだ → <b>きれいなんです</b>",
      "KB (だ→な) + んです: がくせいだ → <b>がくせいなんです</b>",
      "⚠️ KS な dan KB: だ berubah menjadi な sebelum んです!"
    ]},
  ],
  41: [
    {icon:"💡", title:"〜んですが — Meminta dengan Sopan", points:[
      "〜んです = penjelasan (pernyataan selesai).",
      "〜んですが = pengantar topik → lanjut ke permintaan/pertanyaan.",
      "Lebih sopan: 〜て いただけませんか (vs 〜てください).",
      "〜たら いいですか = meminta saran cara terbaik."
    ]},
    {icon:"📝", title:"Pola いつでも / どこでも / だれでも / なんでも", points:[
      "〜でも = 'pun' (kapan pun, di mana pun, siapa pun, apa pun).",
      "いつでも いいです = kapan pun boleh.",
      "なんでも たべられます = apa pun bisa dimakan.",
      "Pola ini sering muncul dalam undangan atau penawaran terbuka."
    ]}
  ],
  42: [
    {icon:"🔧", title:"Cara Membentuk Kata Kerja Potensial", points:[
      "<b>Grup I</b>: Akhiran う→える. のむ→<b>のめる</b>, かく→<b>かける</b>, いく→<b>いける</b>",
      "<b>Grup II</b>: Tambah られる. たべる→<b>たべられる</b>",
      "<b>Grup III</b>: くる→<b>こられる</b>, する→<b>できる</b>",
      "Partikel objek: を → <b>が</b> (umumnya dengan kata kerja potensial)."
    ]},
    {icon:"⚠️", title:"しか + bentuk negatif — Hati-hati!", points:[
      "しか SELALU diikuti bentuk NEGATIF: 〜しか〜ません.",
      "ひらがなしか よめません = hanya bisa membaca hiragana.",
      "Jangan gunakan しか dengan bentuk positif!",
      "Bandingkan: だけ = hanya (positif/negatif boleh)."
    ]}
  ],
  43: [
    {icon:"🎵", title:"ながら — Dua Tindakan Bersamaan", points:[
      "KK1 (bentuk ます tanpa ます) + ながら + KK2 (tindakan utama).",
      "<ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を <ruby><rb>聞</rb><rt>き</rt></ruby>き<b>ながら</b> <ruby><rb>料理</rb><rt>りょうり</rt></ruby>します → memasak sambil dengar musik.",
      "KK2 adalah tindakan UTAMA, KK1 tindakan sampingan.",
      "ながら ≠ て bentuk (て = urutan, ながら = bersamaan)."
    ]},
    {icon:"👁️", title:"<ruby><rb>見</rb><rt>み</rt></ruby>えます vs <ruby><rb>見</rb><rt>み</rt></ruby>ます / <ruby><rb>聞</rb><rt>き</rt></ruby>こえます vs <ruby><rb>聞</rb><rt>き</rt></ruby>きます", points:[
      "<ruby><rb>見</rb><rt>み</rt></ruby>ます = melihat secara aktif (sengaja).",
      "<ruby><rb>見</rb><rt>み</rt></ruby>えます = terlihat secara alami (tanpa usaha).",
      "<ruby><rb>聞</rb><rt>き</rt></ruby>きます = mendengar aktif / bertanya.",
      "<ruby><rb>聞</rb><rt>き</rt></ruby>こえます = terdengar secara alami."
    ]}
  ],
  44: [
    {icon:"🍜", title:"て bentuk vs ないで — Cara Melakukan", points:[
      "KK1 <b>て</b> KK2 = melakukan KK2 dengan cara KK1.",
      "KK1 <b>ないで</b> KK2 = melakukan KK2 tanpa melakukan KK1.",
      "ソースを つけて <ruby><rb>食</rb><rt>た</rt></ruby>べます (makan dengan saus).",
      "ソースを つけないで <ruby><rb>食</rb><rt>た</rt></ruby>べます (makan tanpa saus)."
    ]},
    {icon:"🎨", title:"Warna-Warna dalam Bahasa Jepang", points:[
      "くろ(<ruby><rb>黒</rb><rt>くろ</rt></ruby>)=hitam, しろ(<ruby><rb>白</rb><rt>しろ</rt></ruby>)=putih, あか(<ruby><rb>赤</rb><rt>あか</rt></ruby>)=merah, あお(<ruby><rb>青</rb><rt>あお</rt></ruby>)=biru",
      "みどり(<ruby><rb>緑</rb><rt>みどり</rt></ruby>)=hijau, きいろ(<ruby><rb>黄色</rb><rt>きいろ</rt></ruby>)=kuning, むらさき(<ruby><rb>紫</rb><rt>むらさき</rt></ruby>)=ungu",
      "ちゃいろ(<ruby><rb>茶色</rb><rt>ちゃいろ</rt></ruby>)=coklat, こん(<ruby><rb>紺</rb><rt>こん</rt></ruby>)=navy/biru gelap",
      "Warna digunakan juga sebagai kata sifat: あかい、あおい dll."
    ]}
  ],
  45: [
    {icon:"🔄", title:"Intransitif vs Transitif — Kunci Pemahaman", points:[
      "<b><ruby>自動詞<rt>じどうし</rt></ruby></b> (Intransitif): KB <b>が</b> KK — perubahan terjadi sendiri.",
      "<b><ruby><rb>他動詞</rb><rt>たどうし</rt></ruby></b> (Transitif): KB <b>を</b> KK — ada pelaku yang melakukan.",
      "<ruby><rb>電気</rb><rt>でんき</rt></ruby>が <b>つきます</b> (lampu menyala sendiri) ← intransitif.",
      "<ruby><rb>電気</rb><rt>でんき</rt></ruby>を <b>つけます</b> (seseorang menyalakan lampu) ← transitif."
    ]},
    {icon:"📊", title:"Pasangan Kata Kerja Intransitif & Transitif", points:[
      "つきます ↔ つけます | きえます ↔ けします",
      "あきます ↔ あけます | しまります ↔ しめます",
      "とまります ↔ とめます | はじまります ↔ はじめます",
      "われます ↔ わります | こわれます ↔ こわします"
    ]},
  ],
  46: [
    {icon:"🔄", title:"てしまいました — 2 Makna Penting", points:[
      "<b>① Penyelesaian tuntas:</b> <ruby><rb>図書館</rb><rt>としょかん</rt></ruby>の<ruby><rb>本</rb><rt>ほん</rt></ruby>を<ruby><rb>読</rb><rt>よ</rt></ruby>んで<b>しまいました</b> (Sudah selesai baca buku perpustakaan)",
      "<b>② Penyesalan/tidak sengaja:</b> パスポートを<ruby><rb>落</rb><rt>お</rt></ruby>として<b>しまいました</b> (Tidak sengaja menjatuhkan paspor)",
      "💡 Konteks menentukan makna: kalau ada kata negatif (<ruby><rb>落</rb><rt>お</rt></ruby>とす, <ruby><rb>忘</rb><rt>わす</rt></ruby>れる, <ruby><rb>壊</rb><rt>こわ</rt></ruby>す) → penyesalan",
      "Informal: てしまう→<b>ちゃう</b> / でしまう→<b>じゃう</b> (<ruby><rb>食</rb><rt>た</rt></ruby>べちゃった = <ruby><rb>食</rb><rt>た</rt></ruby>べてしまった)"
    ]},
    {icon:"⚠️", title:"Kata Kerja yang Sering Pakai てしまいました (penyesalan)", points:[
      "わすれて しまいました (lupa) | おとして しまいました (menjatuhkan)",
      "こわして しまいました (merusak) | よごして しまいました (mengotori)",
      "まちがえて しまいました (salah) | おくれて しまいました (terlambat)",
      "💡 Semua ini adalah tindakan yang TIDAK DIINGINKAN — makanya pakai てしまいました"
    ]}
  ],
  47: [
    {icon:"📋", title:"ておきます — 3 Nuansa Persiapan", points:[
      "<b>① Persiapan untuk sesuatu:</b> <ruby><rb>会議</rb><rt>かいぎ</rt></ruby>の<ruby><rb>前</rb><rt>まえ</rt></ruby>に<ruby><rb>資料</rb><rt>しりょう</rt></ruby>を<ruby><rb>読</rb><rt>よ</rt></ruby>んで<b>おきます</b> (Baca dokumen sebelum rapat)",
      "<b>② Menjaga keadaan tetap:</b> エアコンをつけて<b>おきましょう</b> (Biarkan AC tetap menyala)",
      "<b>③ Mengembalikan ke posisi semula:</b> <ruby><rb>使</rb><rt>つか</rt></ruby>ったら<ruby><rb>元の所</rb><rt>もとのところ</rt></ruby>に<ruby><rb>戻</rb><rt>もど</rt></ruby>して<b>おきましょう</b>",
      "Informal: ておく→<b>とく</b> (<ruby><rb>買</rb><rt>か</rt></ruby>っとく = <ruby><rb>買</rb><rt>か</rt></ruby>っておく)"
    ]},
    {icon:"🔑", title:"ておきます vs てあります (Bab 48)", points:[
      "<b>ておきます</b> = TINDAKAN persiapan (fokus pada melakukan)",
      "<b>てあります</b> = KEADAAN hasil persiapan (fokus pada hasil yang terlihat)",
      "Contoh: <ruby><rb>窓</rb><rt>まど</rt></ruby>を<ruby><rb>開</rb><rt>あ</rt></ruby>けて<b>おきました</b> (Saya buka jendela [persiapan])",
      "→ <ruby><rb>窓</rb><rt>まど</rt></ruby>が<ruby><rb>開</rb><rt>あ</rt></ruby>けて<b>あります</b> (Jendela sudah dibuka [keadaan sekarang])"
    ]}
  ],
  48: [
    {icon:"🏠", title:"てあります vs ています — Perbedaan Kunci", points:[
      "<b>KK transitif + てあります</b>: ada PELAKU yang sengaja melakukan. ポスターが<ruby><rb>貼</rb><rt>は</rt></ruby>って<b>あります</b>",
      "<b>KK intransitif + ています</b>: terjadi sendiri/alami. ドアが<ruby><rb>開</rb><rt>あ</rt></ruby>いて<b>います</b>",
      "Partikel: てあります selalu pakai <b>が</b> (bukan を) untuk objek",
      "💡 てあります = 'sudah di-[KK]-kan oleh seseorang dengan tujuan tertentu'"
    ]},
    {icon:"📍", title:"Kata Posisi Rumah yang Sering Muncul", points:[
      "<b><ruby><rb>壁</rb><rt>かべ</rt></ruby>(かべ)</b>=tembok | <b><ruby><rb>玄関</rb><rt>げんかん</rt></ruby>(げんかん)</b>=pintu masuk | <b><ruby><rb>廊下</rb><rt>ろうか</rt></ruby>(ろうか)</b>=koridor",
      "<b><ruby><rb>隅</rb><rt>すみ</rt></ruby>(すみ)</b>=sudut | <b><ruby><rb>真ん中</rb><rt>まんなか</rt></ruby>(まんなか)</b>=tengah | <b><ruby><rb>回</rb><rt>かい</rt></ruby>り(まわり)</b>=sekeliling",
      "Pola kalimat: [<ruby><rb>場所</rb><rt>ばしょ</rt></ruby>]に [<ruby><rb>物</rb><rt>もの</rt></ruby>]が [KK transitif]て あります",
      "Contoh: <ruby><rb>壁</rb><rt>かべ</rt></ruby><b>に</b> <ruby><rb>時計</rb><rt>とけい</rt></ruby><b>が</b> <ruby><rb>掛</rb><rt>か</rt></ruby>けて あります (Jam sudah digantung di dinding)"
    ]}
  ],
  49: [
    {icon:"💪", title:"<ruby><rb>意向形</rb><rt>いこうけい</rt></ruby> (Bentuk Maksud) — Konjugasi", points:[
      "<b>Grup I</b>: ます→お+う. よみます→よも<b>う</b> | かきます→かこ<b>う</b> | はなします→はなそ<b>う</b>",
      "<b>Grup II</b>: ます→よう. たべます→たべ<b>よう</b> | みます→み<b>よう</b>",
      "<b>Grup III</b>: きます→<b>こよう</b> | します→<b>しよう</b>",
      "= Bentuk kasual dari ～ましょう (ayo ~)"
    ]},
    {icon:"🎯", title:"と<ruby><rb>思</rb><rt>おも</rt></ruby>っています vs と<ruby><rb>思</rb><rt>おも</rt></ruby>います", points:[
      "<b>～ようと<ruby><rb>思</rb><rt>おも</rt></ruby>って<u>います</u></b> = niat/rencana yang sudah ada sejak lama (berkelanjutan)",
      "<b>～ようと<ruby><rb>思</rb><rt>おも</rt></ruby>います</b> = keputusan yang baru saja dibuat (saat ini)",
      "Contoh: <ruby><rb>来年</rb><rt>らいねん</rt></ruby><ruby><rb>日本</rb><rt>にほん</rt></ruby>へ<ruby><rb>行</rb><rt>い</rt></ruby>こうと<ruby><rb>思</rb><rt>おも</rt></ruby>って<b>います</b> (Sudah lama berniat pergi ke Jepang)",
      "Contoh: じゃ、タクシーで<ruby><rb>行</rb><rt>い</rt></ruby>こうと<ruby><rb>思</rb><rt>おも</rt></ruby><b>います</b> (Keputusan baru: naik taksi saja)"
    ]},
    {icon:"⏳", title:"まだ～ていません — Belum ~", points:[
      "Pola: <b>まだ + KK て いません</b> = belum melakukan ~",
      "Jawaban untuk もう～ましたか?: いいえ、まだ<ruby><rb>食</rb><rt>た</rt></ruby>べて<b>いません</b>",
      "❌ SALAH: まだ<ruby><rb>食</rb><rt>た</rt></ruby>べません (ini = belum mau makan [di masa depan])",
      "✅ BENAR: まだ<ruby><rb>食</rb><rt>た</rt></ruby>べて<b>いません</b> (belum makan [sampai sekarang])"
    ]}
  ],
  50: [
    {icon:"📊", title:"Tingkat Kepastian Rencana", points:[
      "<b>～ようと<ruby><rb>思</rb><rt>おも</rt></ruby>っています</b> (Bab 49): niat dalam pikiran, belum pasti (~50%)",
      "<b>～つもりです</b>: niat/tekad pribadi yang sudah cukup pasti (~70%)",
      "<b>～<ruby><rb>予定</rb><rt>よてい</rt></ruby>です</b>: rencana terjadwal/terencana, paling pasti (~90%)",
      "Urutan: と<ruby><rb>思</rb><rt>おも</rt></ruby>っています < つもり ≦ <ruby><rb>予定</rb><rt>よてい</rt></ruby>"
    ]},
    {icon:"⚠️", title:"つもりです — Hanya untuk PEMBICARA!", points:[
      "つもりです hanya untuk menyatakan niat DIRI SENDIRI",
      "Untuk orang lain: <ruby><rb>田中</rb><rt>たなか</rt></ruby>さんは<ruby><rb>来</rb><rt>き</rt></ruby>る<b>と<ruby><rb>言</rb><rt>い</rt></ruby>っていました</b> (bukan つもりです)",
      "Negatif: KK ない + つもりです = tidak berniat melakukan ~",
      "Contoh: <ruby><rb>今年</rb><rt>ことし</rt></ruby>はJLPTを<ruby><rb>受</rb><rt>う</rt></ruby>け<b>ないつもりです</b> (Tidak berniat ikut JLPT tahun ini)"
    ]}
  ],
  51: [
    {icon:"💊", title:"ほうがいいです — Saran Positif & Negatif", points:[
      "<b>KK た + ほうがいいです</b> = sebaiknya lakukan ~ (saran positif)",
      "<b>KK ない + ほうがいいです</b> = sebaiknya jangan ~ (saran negatif)",
      "❌ SALAH: <ruby><rb>食べる</rb><rt>たべる</rt></ruby> ほうがいいです → ✅ BENAR: <ruby><rb>食</rb><rt>た</rt></ruby>べ<b>た</b> ほうがいいです",
      "💡 Ingat: saran positif SELALU pakai bentuk た (bukan kamus!)"
    ]},
    {icon:"🏥", title:"Kosakata Kesehatan Penting", points:[
      "<b><ruby><rb>風邪を</rb><rt>かぜを</rt></ruby>ひきます</b>(masuk angin) | <b><ruby><rb>熱が</rb><rt>ねつが</rt></ruby><ruby><rb>続</rb><rt>つづ</rt></ruby>きます</b>(demam berlanjut)",
      "<b><ruby><rb>咳</rb><rt>せき</rt></ruby>(せき)</b>=batuk | <b><ruby><rb>注射</rb><rt>ちゅうしゃ</rt></ruby>(ちゅうしゃ)</b>=suntikan | <b>けが</b>=luka",
      "<b>やけど</b>=luka bakar | <b><ruby><rb>運動</rb><rt>うんどう</rt></ruby>します</b>=berolahraga",
      "なかなか～ない = tidak mudah ~ (なかなか<ruby><rb>治</rb><rt>なお</rt></ruby>りません = tidak mudah sembuh)"
    ]}
  ],
  52: [
    {icon:"🔮", title:"Tingkat Kepastian: かもしれません vs でしょう", points:[
      "<b>かもしれません</b> (~30-50%): Mungkin saja ~ (tidak yakin sama sekali)",
      "<b>でしょう</b> (~70-80%): Akan ~ / Mungkin ~ (cukup yakin, sering untuk cuaca)",
      "Contoh かも: <ruby><rb>今夜</rb><rt>こんや</rt></ruby><ruby><rb>雪が降る</rb><rt>ゆきがふる</rt></ruby><b>かもしれません</b> (Mungkin saja turun salju)",
      "Contoh でしょう: <ruby><rb>午後から</rb><rt>ごごから</rt></ruby><ruby><rb>強い風が吹く</rb><rt>つよいかぜがふく</rt></ruby><b>でしょう</b> (Sore ini akan ada angin kencang)"
    ]},
    {icon:"📝", title:"Konjugasi sebelum かもしれません & でしょう", points:[
      "<b>KK</b>: bentuk biasa langsung. <ruby><rb>降る</rb><rt>ふる</rt></ruby> かもしれません / <ruby><rb>降る</rb><rt>ふる</rt></ruby> でしょう",
      "<b>KS い</b>: bentuk biasa. <ruby><rb>寒い</rb><rt>さむい</rt></ruby> かもしれません / <ruby><rb>寒い</rb><rt>さむい</rt></ruby> でしょう",
      "<b>KS な</b>: だ DIHILANGKAN. きれい<s>だ</s> かもしれません",
      "<b>KB</b>: だ DIHILANGKAN. <ruby><rb>日本人</rb><rt>にほんじん</rt></ruby><s>だ</s> かもしれません"
    ]}
  ],
  53: [
    {icon:"📋", title:"～し、～し — Menyebutkan Beberapa Alasan", points:[
      "Pola: <b>[alasan1]し、[alasan2]し、[kesimpulan]</b>",
      "Menyebutkan beberapa alasan untuk mendukung satu kesimpulan",
      "Contoh: やすい<b>し</b>、おいしい<b>し</b>、あの<ruby><rb>店</rb><rt>みせ</rt></ruby>でよく<ruby><rb>食</rb><rt>た</rt></ruby>べます",
      "💡 し menggunakan bentuk biasa (seperti と<ruby><rb>思</rb><rt>おも</rt></ruby>います)"
    ]},
    {icon:"🔑", title:"し vs から vs ので — Bedakan!", points:[
      "<b>し</b>: beberapa alasan sekaligus (A し、B し、kesimpulan)",
      "<b>から</b>: satu alasan langsung/subjektif (A から、B)",
      "<b>ので</b>: satu alasan sopan/objektif (A ので、B)",
      "し paling cocok saat ingin meyakinkan dengan BANYAK alasan"
    ]}
  ],
  54: [
    {icon:"📐", title:"Konjugasi Bentuk ば (Kondisional)", points:[
      "<b>Grup I</b>: ます→え+ば. のみます→のめ<b>ば</b> | かきます→かけ<b>ば</b>",
      "<b>Grup II</b>: ます→れば. たべます→たべれ<b>ば</b> | みます→みれ<b>ば</b>",
      "<b>Grup III</b>: きます→くれ<b>ば</b> | します→すれ<b>ば</b>",
      "KS い: い→けれ<b>ば</b>. やすい→やすけれ<b>ば</b> | いい→<b>よけれ</b>ば ⚠️"
    ]},
    {icon:"⚖️", title:"ば vs たら vs と — Kapan Pakai?", points:[
      "<b>ば</b>: kondisi umum/logis, sering dengan ～いいですか (Bagaimana kalau ~?)",
      "<b>たら</b>: paling fleksibel, bisa untuk semua situasi kondisional",
      "<b>と</b>: hasil pasti/otomatis (hukum alam, mesin, petunjuk)",
      "Pertanyaan saran: どうすれ<b>ば</b>いいですか = Apa yang harus saya lakukan?"
    ]}
  ],
  55: [
    {icon:"🔀", title:"KS ければ / KS な・KB なら — Kondisional", points:[
      "<b>KS い</b>: い→<b>ければ</b>. あつい→あつ<b>ければ</b> | よい→<b>よければ</b> ⚠️",
      "<b>KS な/KB</b>: tambah <b>なら</b>. ひまなら | あめなら",
      "Negatif KS い: くな<b>ければ</b>. たかくな<b>ければ</b>、かいます",
      "Negatif KS な/KB: じゃな<b>ければ</b>. べんりじゃな<b>ければ</b>..."
    ]},
    {icon:"💬", title:"なら — Merespons Lawan Bicara", points:[
      "<b>KB なら</b> juga digunakan untuk merespons topik yang baru disebutkan lawan bicara",
      "A: <ruby><rb>東京</rb><rt>とうきょう</rt></ruby>で<ruby><rb>花見</rb><rt>はなみ</rt></ruby>がしたいんですが。B: <ruby><rb>花見</rb><rt>はなみ</rt></ruby><b>なら</b>、<ruby><rb>上野公園</rb><rt>うえのこうえん</rt></ruby>がいいですよ",
      "Nuansa: 'Kalau itu yang kamu maksud/bicarakan, maka...'",
      "💡 なら = merespons info dari orang lain, bukan sekedar kondisi biasa"
    ]}
  ],
  56: [
    {icon:"🎯", title:"ように — Agar ~/Supaya ~", points:[
      "<b>KK kamus + ように、KK</b>: melakukan KK2 agar tercapai ように",
      "<b>KK ない + ように、KK</b>: melakukan KK2 agar TIDAK terjadi ように",
      "Contoh: <ruby><rb>試合に</rb><rt>しあいに</rt></ruby><ruby><rb>出</rb><rt>で</rt></ruby>られる<b>ように</b>、<ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>練習</rb><rt>れんしゅう</rt></ruby>しています",
      "⚠️ KK sebelum ように = KK non-kehendak (わかる、みえる、きこえる) atau bentuk potensial"
    ]},
    {icon:"📈", title:"ように なりました — Perubahan Kemampuan", points:[
      "Pola: <b>KK potensial + ように なりました</b> = sekarang sudah bisa ~",
      "Contoh: <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>が<ruby><rb>少</rb><rt>すこ</rt></ruby>し<ruby><rb>読</rb><rt>よ</rt></ruby>める<b>ように なりました</b> (Sekarang sudah bisa baca kanji)",
      "Negatif: KK なく + なりました = sekarang tidak bisa lagi ~",
      "💡 なりました = hasil perubahan sudah tercapai (bandingkan して います di Bab 57)"
    ]}
  ],
  57: [
    {icon:"🏃", title:"ように して います — Sedang Membiasakan Diri", points:[
      "Pola: <b>KK kamus/ない + ように して います</b> = berusaha membiasakan ~",
      "Contoh: できるだけ11<ruby><rb>時</rb><rt>じ</rt></ruby>までに<ruby><rb>寝</rb><rt>ね</rt></ruby>る<b>ように して います</b>",
      "Bandingkan: ように <b>なりました</b> (hasil tercapai) vs ように <b>して います</b> (usaha berlangsung)",
      "Sering dengan: できるだけ (sebisa mungkin), <ruby><rb>毎日</rb><rt>まいにち</rt></ruby> (setiap hari), <ruby><rb>必ず</rb><rt>かならず</rt></ruby> (pasti)"
    ]},
    {icon:"🙏", title:"ように して ください — Permintaan Sopan", points:[
      "<b>ように して ください</b> = mohon usahakan agar ~ (lebih sopan dari てください)",
      "Cocok untuk meminta perubahan KEBIASAAN, bukan tindakan sekali",
      "Contoh: <ruby><rb>面接</rb><rt>めんせつ</rt></ruby>のとき<ruby><rb>丁寧</rb><rt>ていねい</rt></ruby>な<ruby><rb>言葉</rb><rt>ことば</rt></ruby>で<ruby><rb>話</rb><rt>はな</rt></ruby>す<b>ように して ください</b>",
      "Tingkat sopan: てください < ように して ください < ていただけませんか"
    ]}
  ],
  58: [
    {icon:"📐", title:"<ruby><rb>受身形</rb><rt>うけみけい</rt></ruby> (Pasif) — Konjugasi", points:[
      "<b>Grup I</b>: ます→あ+れます. かきます→かか<b>れます</b> | よみます→よま<b>れます</b>",
      "<b>Grup II</b>: ます→られます. たべます→たべ<b>られます</b>",
      "<b>Grup III</b>: きます→こ<b>られます</b> | します→<b>されます</b>",
      "⚠️ Bentuk sama dengan potensial (Grup II)! Konteks yang membedakan"
    ]},
    {icon:"😤", title:"Pasif Jepang = Gangguan/Dampak Negatif", points:[
      "Berbeda dari pasif Indonesia — pasif Jepang sering bermakna 'terganggu/terdampak'",
      "<ruby><rb>弟</rb><rt>おとうと</rt></ruby>にパソコンを<ruby><rb>壊</rb><rt>こわ</rt></ruby><b>されました</b> (Komputer saya dirusak adik [saya terganggu!])",
      "<ruby><rb>雨</rb><rt>あめ</rt></ruby>に<ruby><rb>降</rb><rt>ふ</rt></ruby><b>られました</b> (Kehujanan [saya terdampak negatif!])",
      "💡 Pelaku ditandai dengan partikel <b>に</b>: ～に KK pasif"
    ]}
  ],
  59: [
    {icon:"📰", title:"Pasif Impersonal — Tanpa Pelaku", points:[
      "Digunakan saat pelaku tidak penting/tidak diketahui — lebih netral & objektif",
      "この<ruby><rb>本</rb><rt>ほん</rt></ruby>は100<ruby><rb>年</rb><rt>ねん</rt></ruby><ruby><rb>前</rb><rt>まえ</rt></ruby>に<ruby><rb>書</rb><rt>か</rt></ruby>か<b>れました</b> (Buku ini ditulis 100 tahun lalu)",
      "<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>は<ruby><rb>中国</rb><rt>ちゅうごく</rt></ruby>や<ruby><rb>日本</rb><rt>にほん</rt></ruby>で<ruby><rb>使</rb><rt>つか</rt></ruby>わ<b>れています</b> (Kanji digunakan di China dan Jepang)",
      "Sering untuk: sejarah, berita, deskripsi umum, karya seni"
    ]},
    {icon:"✍️", title:"によって vs に — Pelaku dalam Pasif", points:[
      "<b>に</b>: pelaku tindakan langsung (orang/hewan). <ruby><rb>先生</rb><rt>せんせい</rt></ruby><b>に</b><ruby><rb>叱</rb><rt>しか</rt></ruby>られた",
      "<b>によって</b>: pencipta/penemu/pembuat (formal). <ruby><rb>宮沢賢治</rb><rt>みやざわけんじ</rt></ruby><b>によって</b><ruby><rb>書</rb><rt>か</rt></ruby>かれた",
      "によって untuk: karya seni, penemuan, ciptaan, dokumen resmi",
      "💡 によって lebih formal dari に — pilih sesuai konteks"
    ]}
  ],
  60: [
    {icon:"📝", title:"の sebagai Nominalizer — KK → KB", points:[
      "<b>KK + の</b> = mengubah kata kerja menjadi kata benda",
      "<ruby><rb>音楽</rb><rt>おんがく</rt></ruby>を<ruby><rb>聞</rb><rt>き</rt></ruby>く<b>の</b>が<ruby><rb>好き</rb><rt>す</rt></ruby>です (Suka mendengarkan musik)",
      "<ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>漢字</rb><rt>かんじ</rt></ruby>を<ruby><rb>覚</rb><rt>おぼ</rt></ruby>える<b>の</b>は<ruby><rb>大変</rb><rt>たいへん</rt></ruby>です (Menghapal kanji tiap hari itu berat)",
      "💡 の berfungsi sama dengan こと, tapi lebih natural dalam percakapan"
    ]},
    {icon:"⚠️", title:"のは vs のが — Aturan Penting!", points:[
      "<b>のは</b> + KS deskriptif: たのしい、むずかしい、おもしろい、たいへん",
      "<b>のが</b> + KS preferensi/kemampuan: すき、きらい、じょうず、へた、はやい、おそい",
      "Contoh: <ruby><rb>料理</rb><rt>りょうり</rt></ruby>を<ruby><rb>作</rb><rt>つく</rt></ruby>る<b>のが</b><ruby><rb>上手</rb><rt>じょうず</rt></ruby>です (Pandai memasak) — pakai が",
      "Contoh: <ruby><rb>料理</rb><rt>りょうり</rt></ruby>を<ruby><rb>作</rb><rt>つく</rt></ruby>る<b>のは</b><ruby><rb>楽</rb><rt>たの</rt></ruby>しいです (Memasak itu menyenangkan) — pakai は"
    ]}
  ],
  61: [
    {icon:"💡", title:"のを — Nominalizer sebagai Objek", points:[
      "Pola: <b>KK bentuk biasa + のを</b> + わすれました/しっています/みました",
      "<ruby><rb>電気</rb><rt>でんき</rt></ruby>を<ruby><rb>消</rb><rt>け</rt></ruby>す<b>のを</b><ruby><rb>忘</rb><rt>わす</rt></ruby>れました (Lupa mematikan lampu)",
      "<ruby><rb>赤ちゃん</rb><rt>あかちゃん</rt></ruby>が<ruby><rb>生</rb><rt>う</rt></ruby>まれた<b>のを</b><ruby><rb>知</rb><rt>し</rt></ruby>っていますか (Tahu bahwa bayi sudah lahir?)",
      "⚠️ のを<ruby><rb>忘</rb><rt>わす</rt></ruby>れました (lupa MELAKUKAN) ≠ KBを<ruby><rb>忘</rb><rt>わす</rt></ruby>れました (lupa MEMBAWA benda)"
    ]},
    {icon:"🔑", title:"Pola の yang Sudah Dipelajari — Ringkasan", points:[
      "<b>のは</b> (Bab 60): KK menjadi topik → ...のは<ruby><rb>楽</rb><rt>たの</rt></ruby>しいです",
      "<b>のが</b> (Bab 60): KK menjadi objek KS → ...のが<ruby><rb>好き</rb><rt>す</rt></ruby>です",
      "<b>のを</b> (Bab 61): KK menjadi objek KK → ...のを<ruby><rb>忘</rb><rt>わす</rt></ruby>れました",
      "Semua ini menggunakan の untuk mengubah KALIMAT menjadi KATA BENDA"
    ]}
  ],
  62: [
    {icon:"😢", title:"～て、～ untuk Sebab & Akibat", points:[
      "Pola: <b>KK て / KS い くて / KS な で / KB で</b> → akibat emosi/keadaan",
      "<ruby><rb>結婚</rb><rt>けっこん</rt></ruby>すると<ruby><rb>聞</rb><rt>き</rt></ruby>い<b>て</b>、びっくりしました (Kaget mendengar menikah)",
      "<ruby><rb>合格</rb><rt>ごうかく</rt></ruby>できなく<b>て</b>、がっかりしました (Kecewa karena tidak lulus)",
      "⚠️ Bagian akhir HARUS non-kehendak (emosi, keadaan) — bukan perintah/ajakan"
    ]},
    {icon:"🌊", title:"KB で — Penyebab Bencana/Fenomena", points:[
      "Partikel <b>で</b> setelah KB = penyebab fenomena alam/kecelakaan",
      "<ruby><rb>地震</rb><rt>じしん</rt></ruby><b>で</b>ビルが<ruby><rb>倒</rb><rt>たお</rt></ruby>れました (Karena gempa, gedung runtuh)",
      "<ruby><rb>台風</rb><rt>たいふう</rt></ruby><b>で</b><ruby><rb>電車</rb><rt>でんしゃ</rt></ruby>が<ruby><rb>止</rb><rt>と</rt></ruby>まりました (Karena topan, kereta berhenti)",
      "Kata benda penyebab umum: <ruby><rb>地震</rb><rt>じしん</rt></ruby>、<ruby><rb>台風</rb><rt>たいふう</rt></ruby>、<ruby><rb>火事</rb><rt>かじ</rt></ruby>、<ruby><rb>事故</rb><rt>じこ</rt></ruby>、<ruby><rb>病気</rb><rt>びょうき</rt></ruby>、<ruby><rb>大</rb><rt>おお</rt></ruby><ruby><rb>雨</rb><rt>あめ</rt></ruby>"
    ]}
  ],
  63: [
    {icon:"🎀", title:"ので vs から — Tingkat Kesopanan", points:[
      "<b>ので</b>: lebih sopan & halus, cocok untuk meminta izin/penjelasan formal",
      "<b>から</b>: lebih langsung & subjektif, cocok untuk percakapan biasa",
      "Minta izin: <ruby><rb>漢字</rb><rt>かんじ</rt></ruby>がわからない<b>ので</b>、ひらがなで<ruby><rb>書</rb><rt>か</rt></ruby>いていただけませんか",
      "💡 Gunakan ので saat berbicara dengan atasan atau orang yang tidak akrab"
    ]},
    {icon:"📝", title:"Konjugasi Sebelum ので", points:[
      "<b>KK</b>: bentuk biasa. <ruby><rb>飲</rb><rt>の</rt></ruby>む<b>ので</b> / <ruby><rb>飲</rb><rt>の</rt></ruby>んだ<b>ので</b>",
      "<b>KS い</b>: bentuk biasa. <ruby><rb>忙</rb><rt>いそが</rt></ruby>しい<b>ので</b>",
      "<b>KS な</b>: tambah <b>な</b>. <ruby><rb>静</rb><rt>しず</rt></ruby>か<b>なので</b>",
      "<b>KB</b>: tambah <b>な</b>. <ruby><rb>休み</rb><rt>やすみ</rt></ruby><b>なので</b>"
    ]}
  ],
  64: [
    {icon:"❓", title:"Interogatif か vs かどうか", points:[
      "<b>ADA kata tanya</b> (<ruby><rb>何</rb><rt>なん</rt></ruby>、いつ、どこ、だれ): <ruby><rb>何時</rb><rt>なんじ</rt></ruby>に<ruby><rb>出発</rb><rt>しゅっぱつ</rt></ruby>する<b>か</b>、<ruby><rb>教</rb><rt>おし</rt></ruby>えてください",
      "<b>TIDAK ADA kata tanya</b> (ya/tidak): <ruby><rb>間違い</rb><rt>まちがい</rt></ruby>がない<b>かどうか</b>、<ruby><rb>確</rb><rt>たし</rt></ruby>かめてください",
      "Keduanya pakai bentuk biasa sebelum か / かどうか",
      "💡 Jika pertanyaannya bisa dijawab ya/tidak → pakai かどうか"
    ]},
    {icon:"🔍", title:"てみます — Mencoba Melakukan", points:[
      "Pola: <b>KK て + みます</b> = mencoba ~ (sesuatu yang belum pernah dicoba)",
      "この<ruby><rb>靴</rb><rt>くつ</rt></ruby>、はいて<b>みても</b>いいですか (Boleh coba pakai sepatu ini?)",
      "インターネットで<ruby><rb>調べて</rb><rt>しらべて</rt></ruby><b>みましょう</b> (Coba cari di internet)",
      "てみたいです = ingin mencoba: <ruby><rb>日本</rb><rt>にほん</rt></ruby>のお<ruby><rb>祭り</rb><rt>まつり</rt></ruby>に<ruby><rb>参加</rb><rt>さんか</rt></ruby>して<b>みたいです</b>"
    ]}
  ],
  65: [
    {icon:"🎁", title:"Hierarki Memberi-Menerima (Hormat)", points:[
      "<b>いただきます</b> (←もらいます): saya MENERIMA dari orang status TINGGI",
      "<b>くださいます</b> (←くれます): orang status TINGGI MEMBERI ke saya",
      "<b>やります</b> (←あげます): saya MEMBERI ke orang status RENDAH/hewan/tanaman",
      "⚠️ Jangan gunakan あげます untuk memberi ke atasan! Gunakan さしあげます"
    ]},
    {icon:"🔄", title:"Partikel yang Berbeda — いただきます vs くださいます", points:[
      "<b>いただきます</b>: pemberi ditandai <b>に</b>. <ruby><rb>先生</rb><rt>せんせい</rt></ruby><b>に</b><ruby><rb>本</rb><rt>ほん</rt></ruby>をいただきました",
      "<b>くださいます</b>: pemberi ditandai <b>が</b>. <ruby><rb>先生</rb><rt>せんせい</rt></ruby><b>が</b><ruby><rb>本</rb><rt>ほん</rt></ruby>をくださいました",
      "Bentuk て: <ruby><rb>先生</rb><rt>せんせい</rt></ruby>に<ruby><rb>教</rb><rt>おし</rt></ruby>えて<b>いただきました</b> = <ruby><rb>先生</rb><rt>せんせい</rt></ruby>が<ruby><rb>教</rb><rt>おし</rt></ruby>えて<b>くださいました</b>",
      "💡 Makna sama, tapi sudut pandang berbeda (siapa subjek kalimat)"
    ]}
  ],
  66: [
    {icon:"🤝", title:"て いただきます vs て くださいます (Tindakan)", points:[
      "<b>KK て いただきます</b>: saya menerima tindakan dari orang status lebih tinggi",
      "<b>KK て くださいます</b>: orang status lebih tinggi melakukan untuk saya",
      "<ruby><rb>先生</rb><rt>せんせい</rt></ruby>に<ruby><rb>推薦状</rb><rt>すいせんじょう</rt></ruby>を<ruby><rb>書</rb><rt>か</rt></ruby>いて<b>いただきました</b> (Saya minta guru menulis surat rekomendasi)",
      "<ruby><rb>先生</rb><rt>せんせい</rt></ruby>が<ruby><rb>推薦状</rb><rt>すいせんじょう</rt></ruby>を<ruby><rb>書</rb><rt>か</rt></ruby>いて<b>くださいました</b> (Guru menulis surat rekomendasi untuk saya)"
    ]},
    {icon:"🙏", title:"て いただけませんか — Permintaan Paling Sopan", points:[
      "Pola: <b>KK て いただけませんか</b> = Bisakah Anda ~ (sangat sopan)",
      "Tingkat sopan: てください < てくださいませんか < て<b>いただけませんか</b>",
      "Contoh: もう<ruby><rb>少</rb><rt>すこ</rt></ruby>しゆっくり<ruby><rb>話</rb><rt>はな</rt></ruby>して<b>いただけませんか</b>",
      "Gunakan saat berbicara dengan atasan, guru, atau orang tidak dikenal"
    ]}
  ],
  67: [
    {icon:"🎯", title:"ために vs ように — Perbedaan Kunci", points:[
      "<b>ために</b>: tujuan SADAR, subjek sama, KK kehendak. やせる<b>ために</b><ruby><rb>運動</rb><rt>うんどう</rt></ruby>します",
      "<b>ように</b>: tujuan TIDAK LANGSUNG, KK non-kehendak/potensial/negatif",
      "ために + tindakan langsung menuju tujuan",
      "ように + usaha agar keadaan tertentu tercapai/terjaga"
    ]},
    {icon:"📖", title:"KB の ために — Demi/Untuk ~", points:[
      "Pola: <b>KB の + ために</b> = untuk kepentingan KB",
      "<ruby><rb>健康</rb><rt>けんこう</rt></ruby><b>のために</b><ruby><rb>毎日</rb><rt>まいにち</rt></ruby><ruby><rb>運動</rb><rt>うんどう</rt></ruby>しています (Demi kesehatan, olahraga tiap hari)",
      "<ruby><rb>子供たち</rb><rt>こどもたち</rt></ruby><b>のために</b>お<ruby><rb>金</rb><rt>かね</rt></ruby>を<ruby><rb>貯金</rb><rt>ちょきん</rt></ruby>しています (Demi anak-anak, menabung)",
      "なぜ<ruby><rb>日本語</rb><rt>にほんご</rt></ruby>を<ruby><rb>勉強</rb><rt>べんきょう</rt></ruby>していますか → <ruby><rb>仕事</rb><rt>しごと</rt></ruby><b>のために</b>... (untuk pekerjaan)"
    ]}
  ],
  68: [
    {icon:"🔧", title:"のに (untuk) — Fungsi/Tujuan Penggunaan", points:[
      "Pola: <b>KK kamus + のに</b> + つかいます/いいです/べんりです/やくにたちます",
      "この<ruby><rb>道具</rb><rt>どうぐ</rt></ruby>はたまごを<ruby><rb>切</rb><rt>き</rt></ruby>る<b>のに</b><ruby><rb>使</rb><rt>つか</rt></ruby>います (Alat ini untuk memotong telur)",
      "LINEは<ruby><rb>友</rb><rt>とも</rt></ruby>だちに<ruby><rb>連絡</rb><rt>れんらく</rt></ruby>する<b>のに</b><ruby><rb>便利</rb><rt>べんり</rt></ruby>です (LINE berguna untuk menghubungi teman)",
      "⚠️ のに di sini = 'untuk tujuan' — BUKAN 'padahal' (itu Bab 71!)"
    ]},
    {icon:"👀", title:"KS そうです — Kesan Visual (Kelihatannya)", points:[
      "Pola: <b>KS い (buang い) + そうです</b> / <b>KS な (buang な) + そうです</b>",
      "おいし<b>そうです</b> (Kelihatannya enak) | しずか<b>そうです</b> (Kelihatannya tenang)",
      "⚠️ Pengecualian: いい→<b>よさそう</b> | ない→<b>なさそう</b>",
      "Sebelum KB: そう<b>な</b>+KB. おいしそう<b>な</b>ケーキ (kue yang kelihatan enak)"
    ]}
  ],
  69: [
    {icon:"⚡", title:"すぎます — Terlalu Berlebihan", points:[
      "<b>KK stem</b> + すぎます: <ruby><rb>食</rb><rt>た</rt></ruby>べ<b>すぎます</b> (makan terlalu banyak)",
      "<b>KS い (buang い)</b> + すぎます: <ruby><rb>高</rb><rt>たか</rt></ruby><b>すぎます</b> (terlalu mahal)",
      "<b>KS な (buang な)</b> + すぎます: <ruby><rb>静</rb><rt>しず</rt></ruby>か<b>すぎます</b> (terlalu sepi)",
      "すぎます berkonjugasi seperti KK: すぎて、すぎない、すぎた"
    ]},
    {icon:"📏", title:"やすい vs にくい — Mudah vs Sulit", points:[
      "<b>KK stem + やすい</b> = mudah dilakukan. <ruby><rb>歩</rb><rt>ある</rt></ruby>き<b>やすい</b> (mudah dipakai jalan)",
      "<b>KK stem + にくい</b> = sulit dilakukan. <ruby><rb>食</rb><rt>た</rt></ruby>べ<b>にくい</b> (sulit dimakan)",
      "Berkonjugasi sebagai KS い: やすくて、やすくない、やすかった",
      "💡 Juga untuk kecenderungan: <ruby><rb>滑</rb><rt>すべ</rt></ruby>り<b>やすい</b> (mudah tergelincir/rawan licin)"
    ]}
  ],
  70: [
    {icon:"⏰", title:"KK そうです — Sepertinya Akan Terjadi", points:[
      "Pola: <b>KK stem-ます + そうです</b> = sepertinya akan ~ (prediksi dekat)",
      "<ruby><rb>荷物が</rb><rt>にもつが</rt></ruby><ruby><rb>落</rb><rt>お</rt></ruby>ち<b>そうです</b> (Barang sepertinya akan jatuh)",
      "ガソリンがなくなり<b>そうです</b> (Bensin sepertinya akan habis)",
      "Sering dengan: <ruby><rb>今にも</rb><rt>いまにも</rt></ruby> (kapan saja). <ruby><rb>今にも</rb><rt>いまにも</rt></ruby><ruby><rb>雨が</rb><rt>あめが</rt></ruby><ruby><rb>降</rb><rt>ふ</rt></ruby>り<b>そうです</b>"
    ]},
    {icon:"🔄", title:"3 Jenis そうです — Bedakan!", points:[
      "<b>KS そうです</b> (Bab 68): kesan visual. おいし<b>そう</b> (kelihatannya enak)",
      "<b>KK そうです</b> (Bab 70): prediksi. <ruby><rb>落</rb><rt>お</rt></ruby>ち<b>そう</b> (sepertinya akan jatuh)",
      "<b>bentuk biasa + そうです</b> (Bab 73): kabar. <ruby><rb>雨</rb><rt>あめ</rt></ruby>だ<b>そうです</b> (katanya hujan)",
      "⚠️ Tiga pola ini SANGAT BERBEDA meski sama-sama pakai そうです!"
    ]},
    {icon:"🎨", title:"KB を KS く/に します — Mengubah Sengaja", points:[
      "<b>KS い</b>: KB を KS く します. <ruby><rb>髪</rb><rt>かみ</rt></ruby>を<ruby><rb>短</rb><rt>みじか</rt></ruby><b>く</b>します (Potong rambut pendek)",
      "<b>KS な</b>: KB を KS に します. <ruby><rb>部屋</rb><rt>へや</rt></ruby>をきれい<b>に</b>します (Bersihkan kamar)",
      "Bandingkan: KS く/に <b>なります</b> (berubah sendiri) vs <b>します</b> (diubah sengaja)",
      "Contoh: <ruby><rb>暖</rb><rt>あたた</rt></ruby>かく<b>なりました</b> (Jadi hangat [alam]) vs <ruby><rb>部屋</rb><rt>へや</rt></ruby>を<ruby><rb>暖</rb><rt>あたた</rt></ruby>かく<b>します</b> (Hangatkan kamar [saya])"
    ]}
  ],
  71: [
    {icon:"😤", title:"のに (padahal) — Kontras & Kekecewaan", points:[
      "Pola: <b>[bentuk biasa] + のに、～</b> = padahal ~, tapi ~ (berlawanan harapan)",
      "30<ruby><rb>分</rb><rt>ふん</rt></ruby>も<ruby><rb>待</rb><rt>ま</rt></ruby>った<b>のに</b>、タクシーが<ruby><rb>来</rb><rt>き</rt></ruby>ませんでした (Padahal sudah tunggu 30 menit...)",
      "この<ruby><rb>店</rb><rt>みせ</rt></ruby>は<ruby><rb>高</rb><rt>たか</rt></ruby>い<b>のに</b>、おいしくないです (Padahal mahal, tapi tidak enak)",
      "💡 のに selalu mengandung nuansa KECEWA atau TERKEJUT"
    ]},
    {icon:"⚠️", title:"のに (padahal) vs のに (untuk) — Jangan Tertukar!", points:[
      "<b>のに (padahal)</b> Bab 71: kontras/kekecewaan. <ruby><rb>高</rb><rt>たか</rt></ruby>い<b>のに</b>おいしくない",
      "<b>のに (untuk)</b> Bab 68: tujuan/fungsi. <ruby><rb>切</rb><rt>き</rt></ruby>る<b>のに</b><ruby><rb>使</rb><rt>つか</rt></ruby>います",
      "Cara bedakan: のに (padahal) → klausa penuh sebelumnya. のに (untuk) → diikuti つかう/いい/べんり",
      "KS な/KB sebelum のに (padahal): tambah <b>な</b>. <ruby><rb>必要</rb><rt>ひつよう</rt></ruby><b>なのに</b><ruby><rb>忘</rb><rt>わす</rt></ruby>れた"
    ]}
  ],
  72: [
    {icon:"⏱️", title:"ところです — 3 Momen Waktu", points:[
      "<b>KK kamus + ところです</b>: BARU AKAN mulai. これから<ruby><rb>食べる</rb><rt>たべる</rt></ruby><b>ところです</b>",
      "<b>KK ている + ところです</b>: SEDANG berlangsung. <ruby><rb>今</rb><rt>いま</rt></ruby><ruby><rb>調べて</rb><rt>しらべて</rt></ruby>いる<b>ところです</b>",
      "<b>KK た + ところです</b>: BARU SAJA selesai. たった<ruby><rb>今</rb><rt>いま</rt></ruby><ruby><rb>浴びた</rb><rt>あびた</rt></ruby><b>ところです</b>",
      "ところです menekankan MOMEN TEPAT saat tindakan berlangsung"
    ]},
    {icon:"🕐", title:"Kata Keterangan yang Cocok", points:[
      "KK kamus ところ: <b>これから</b>、（ちょうど）<ruby><rb>今</rb><rt>いま</rt></ruby>から",
      "KK ている ところ: <b><ruby><rb>今</rb><rt>いま</rt></ruby></b>",
      "KK た ところ: <b>たった<ruby><rb>今</rb><rt>いま</rt></ruby></b>、ちょうど、さっき",
      "Bandingkan: たところです (baru saja, objektif) vs たばかりです (Bab 74, subjektif)"
    ]}
  ],
  73: [
    {icon:"📢", title:"bentuk biasa + そうです — Kabar/Informasi", points:[
      "Pola: <b>[bentuk biasa] + そうです</b> = katanya ~ / saya dengar ~",
      "<ruby><rb>明日</rb><rt>あした</rt></ruby>テストがある<b>そうです</b> (Katanya besok ada ujian)",
      "Sumber: <b>～によると</b>、～そうです. <ruby><rb>天気予報</rb><rt>てんきよほう</rt></ruby>によると、<ruby><rb>明日</rb><rt>あした</rt></ruby>は<ruby><rb>寒</rb><rt>さむ</rt></ruby>くなるそうです",
      "⚠️ INI BERBEDA dari KS そうです (kesan) dan KK そうです (prediksi)!"
    ]},
    {icon:"🔍", title:"ようです — Kesimpulan dari Pengamatan", points:[
      "Pola: <b>[bentuk biasa] + ようです</b> = tampaknya ~ / sepertinya ~",
      "KS な/KB: + <b>な/の</b> sebelum ようです. <ruby><rb>留守</rb><rt>るす</rt></ruby><b>の</b>ようです | <ruby><rb>静</rb><rt>しず</rt></ruby>か<b>な</b>ようです",
      "Sering dengan <b>どうも</b>: どうも<ruby><rb>風邪を</rb><rt>かぜを</rt></ruby>ひいた<b>ようです</b> (Sepertinya kena flu)",
      "ようです = kesimpulan dari BUKTI yang diamati (suara, penglihatan, situasi)"
    ]}
  ],
  74: [
    {icon:"⏱️", title:"たばかりです vs たところです — Bedakan!", points:[
      "<b>たばかりです</b>: perasaan SUBJEKTIF 'baru saja' — bisa 1 menit atau 1 bulan lalu!",
      "<b>たところです</b> (Bab 72): secara OBJEKTIF baru saja terjadi (hitungan detik/menit)",
      "Contoh: <ruby><rb>先月</rb><rt>せんげつ</rt></ruby><ruby><rb>卒業した</rb><rt>そつぎょうした</rt></ruby><b>ばかりです</b> (Baru saja lulus bulan lalu [terasa baru])",
      "<ruby><rb>買った</rb><rt>かった</rt></ruby>ばかり<b>なのに</b>、もう<ruby><rb>壊</rb><rt>こわ</rt></ruby>れた (Padahal baru saja beli, sudah rusak)"
    ]},
    {icon:"✅", title:"はずです — Seharusnya / Pasti ~", points:[
      "Pola: <b>[bentuk biasa] + はずです</b> = seharusnya ~ (berdasarkan alasan logis)",
      "<ruby><rb>日曜日</rb><rt>にちようび</rt></ruby>ですから、<ruby><rb>銀行</rb><rt>ぎんこう</rt></ruby>は<ruby><rb>休み</rb><rt>やすみ</rt></ruby>の<b>はずです</b> (Hari Minggu, bank seharusnya tutup)",
      "KS な/KB: + <b>な/の</b> sebelum はず. <ruby><rb>元気</rb><rt>げんき</rt></ruby>な<b>はず</b> | <ruby><rb>休み</rb><rt>やすみ</rt></ruby>の<b>はず</b>",
      "Negatif: ～ないはずです = seharusnya tidak ~. <ruby><rb>問題</rb><rt>もんだい</rt></ruby>はないはずです"
    ]}
  ],
  75: [
    {icon:"⚡", title:"<ruby><rb>命令形</rb><rt>めいれいけい</rt></ruby> (Perintah) — Konjugasi Cepat", points:[
      "<b>Grup I</b>: ます→baris え. のめ、かけ、はしれ、まて",
      "<b>Grup II</b>: ます→ろ. たべろ、みろ、ねろ、やめろ",
      "<b>Grup III</b>: きます→<b>こい</b> | します→<b>しろ</b>",
      "Kapan dipakai: darurat (<ruby><rb>逃</rb><rt>に</rt></ruby>げろ!), olahraga (<ruby><rb>走</rb><rt>はし</rt></ruby>れ!), tanda/rambu"
    ]},
    {icon:"🚫", title:"<ruby><rb>禁止形</rb><rt>きんしけい</rt></ruby> (Larangan) — Sangat Sederhana", points:[
      "SEMUA grup: <b>KK kamus + な</b>. のむな、みるな、するな、くるな",
      "Sangat kasar — hanya untuk situasi darurat atau tanda/rambu",
      "Di tanda: <ruby><rb>立入禁止</rb><rt>たちいりきんし</rt></ruby> (dilarang masuk) | <ruby><rb>使用禁止</rb><rt>しようきんし</rt></ruby> (dilarang pakai)",
      "💡 Untuk larangan sopan, gunakan ～ないでください"
    ]},
    {icon:"📖", title:"という<ruby><rb>意味</rb><rt>いみ</rt></ruby>です — Mendefinisikan Makna", points:[
      "<b>X は Y という<ruby><rb>意味</rb><rt>いみ</rt></ruby>です</b> = X berarti Y",
      "このマークは<ruby><rb>駐</rb><rt>ちゅう</rt></ruby><ruby><rb>車</rb><rt>しゃ</rt></ruby><ruby><rb>禁</rb><rt>きん</rt></ruby><ruby><rb>止</rb><rt>し</rt></ruby><b>という<ruby><rb>意味</rb><rt>いみ</rt></ruby>です</b> (Tanda ini berarti dilarang parkir)",
      "Pertanyaan: <b>どういう<ruby><rb>意味</rb><rt>いみ</rt></ruby>ですか</b> = Artinya apa?",
      "💡 という juga bisa untuk nama: あの<ruby><rb>人</rb><rt>ひと</rt></ruby>は<ruby><rb>田中</rb><rt>たなか</rt></ruby><b>という</b><ruby><rb>人</rb><rt>ひと</rt></ruby>です (Orang bernama Tanaka)"
    ]}
  ],
  76: [
    {icon:"📐", title:"<ruby><rb>使役形</rb><rt>しえきけい</rt></ruby> (Kausatif) — Konjugasi", points:[
      "<b>Grup I</b>: ます→あ+せます. かきます→かか<b>せます</b> | よみます→よま<b>せます</b>",
      "<b>Grup II</b>: ます→させます. たべます→たべ<b>させます</b>",
      "<b>Grup III</b>: きます→こ<b>させます</b> | します→<b>させます</b>",
      "Kausatif terkonjugasi sebagai KK Grup II"
    ]},
    {icon:"👨‍👧", title:"Makna Kausatif: Menyuruh vs Mengizinkan", points:[
      "<b>Menyuruh</b>: <ruby><rb>先生</rb><rt>せんせい</rt></ruby>は<ruby><rb>学生</rb><rt>がくせい</rt></ruby>に<ruby><rb>本</rb><rt>ほん</rt></ruby>を<ruby><rb>読</rb><rt>よ</rt></ruby>ま<b>せました</b> (Guru menyuruh murid baca buku)",
      "<b>Mengizinkan</b>: <ruby><rb>子ども</rb><rt>こども</rt></ruby>に<ruby><rb>好き</rb><rt>す</rt></ruby>なことをさ<b>せています</b> (Membiarkan anak lakukan yang disukai)",
      "Partikel: KK intransitif → orang <b>を</b>. KK transitif → orang <b>に</b>",
      "Orang tua/atasan → menyuruh/mengizinkan → bawahan/anak"
    ]},
    {icon:"🙏", title:"させて いただけませんか — Izin Paling Sopan", points:[
      "Pola: <b>KK kausatif て + いただけませんか</b> = bolehkah saya ~ (super sopan)",
      "<ruby><rb>休</rb><rt>やす</rt></ruby>ませて<b>いただけませんか</b> (Bolehkah saya izin tidak masuk?)",
      "<ruby><rb>車</rb><rt>くるま</rt></ruby>を<ruby><rb>止め</rb><rt>と</rt></ruby>させて<b>いただけませんか</b> (Bolehkah saya parkir di sini?)",
      "Ini adalah CARA PALING SOPAN meminta izin dalam bahasa Jepang sehari-hari"
    ]}
  ],
  77: [
    {icon:"👑", title:"<ruby><rb>尊敬語</rb><rt>そんけいご</rt></ruby> — Menghormati Pelaku Tindakan", points:[
      "Konjugasi SAMA dengan pasif: Gr I: ～あれます | Gr II: ～られます | Gr III: こられます/されます",
      "Contoh: <ruby><rb>社長</rb><rt>しゃちょう</rt></ruby>は9<ruby><rb>時半</rb><rt>じはん</rt></ruby>に<ruby><rb>来</rb><rt>き</rt></ruby><b>られます</b> (Direktur akan datang jam 9:30)",
      "Lebih sopan: <b>お + KK stem + になります</b>. <ruby><rb>先生</rb><rt>せんせい</rt></ruby>がお<ruby><rb>帰り</rb><rt>かえり</rt></ruby>になります",
      "⚠️ Gr III dan KK 1 suku kata (みる、ねる) TIDAK bisa pakai お～になります"
    ]},
    {icon:"🎩", title:"Ungkapan Khusus Bahasa Hormat", points:[
      "いきます/きます/います → <b>いらっしゃいます</b>",
      "たべます/のみます → <b>めしあがります</b>",
      "いいます → <b>おっしゃいます</b> | しっています → <b>ごぞんじです</b>",
      "みます → <b>ごらんになります</b> | します → <b>なさいます</b>"
    ]},
    {icon:"🌸", title:"お/ご — Awalan Hormat", points:[
      "<b>お</b>: untuk kata asli Jepang. おなまえ、おしごと、おくに、おへや",
      "<b>ご</b>: untuk kata asal Cina. ごかぞく、ごじゅうしょ、ごりょうしん",
      "Juga KS: おいそがしい、おわかい / ごねっしん、ごていねい",
      "お～ください: おはいりください、おまちください (permintaan sopan)"
    ]}
  ],
  78: [
    {icon:"🙇", title:"<ruby><rb>謙譲語</rb><rt>けんじょうご</rt></ruby> — Merendahkan Diri Sendiri", points:[
      "Pola: <b>お + KK stem + します</b> = saya melakukan ~ (merendah ke lawan bicara)",
      "お<ruby><rb>荷物</rb><rt>にもつ</rt></ruby>をお<ruby><rb>持ち</rb><rt>も</rt></ruby><b>します</b> (Saya akan membawakan barang Anda)",
      "お<ruby><rb>名前</rb><rt>なまえ</rt></ruby>をお<ruby><rb>聞</rb><rt>き</rt></ruby>き<b>してもよろしいですか</b> (Bolehkah saya bertanya nama Anda?)",
      "Gr III: ご + KB + します. ご<ruby><rb>案内</rb><rt>あんない</rt></ruby><b>します</b>、ご<ruby><rb>連絡</rb><rt>れんらく</rt></ruby><b>します</b>"
    ]},
    {icon:"📋", title:"Ungkapan Khusus Bahasa Merendah", points:[
      "いきます/きます → <b>まいります</b>",
      "います → <b>おります</b> | いいます → <b>もうします</b>",
      "たべます/のみます → <b>いただきます</b>",
      "みます → <b>はいけんします</b> | しっています → <b>ぞんじています</b>"
    ]},
    {icon:"⚖️", title:"<ruby><rb>尊敬語</rb><rt>そんけいご</rt></ruby> vs <ruby><rb>謙譲語</rb><rt>けんじょうご</rt></ruby> — Ringkasan Final", points:[
      "<b><ruby><rb>尊敬語</rb><rt>そんけいご</rt></ruby></b> (Bab 77): meninggikan ORANG LAIN. Subjek = orang yang dihormati",
      "<b><ruby><rb>謙譲語</rb><rt>けんじょうご</rt></ruby></b> (Bab 78): merendahkan DIRI SENDIRI. Subjek = saya/pihak saya",
      "<ruby><rb>先生</rb><rt>せんせい</rt></ruby>がいらっしゃいます (<ruby><rb>尊敬</rb><rt>そんけい</rt></ruby>) vs <ruby><rb>私</rb><rt>わたし</rt></ruby>がまいります (<ruby><rb>謙譲</rb><rt>けんじょう</rt></ruby>)",
      "💡 Keduanya menunjukkan HORMAT — tapi dari arah yang berbeda!"
    ]}
  ]
};


// ========== MODE LUPA ==========
function refreshForgetBanner() {
  const banner = document.getElementById('forgetBanner');
  const subEl  = document.getElementById('forgetBannerSub');
  if (!banner || !subEl) return;

  const stats = getForgetStats();
  if (stats.total === 0) {
    banner.style.display = 'none';
    return;
  }
  banner.style.display = 'flex';

  let subText = `${stats.total} kata pernah dilupakan`;
  if (stats.struggling > 0) subText += ` · ${stats.struggling} kata sering banget terlupa (≥3×)`;
  subEl.textContent = subText;
}

function startForgetMode(threshold) {
  threshold = threshold || 1;
  const pool = getForgetPool(threshold);
  if (!pool.length) {
    alert('Belum ada kata yang pernah ditandai "Belum Hafal". Mulai belajar dulu!');
    return;
  }

  const virtualBab = {
    num: 'LUPA', title: '🧠 Mode Lupa', sub: `${pool.length} kata yang sering terlupa`,
    kotoba: pool, bunpou: []
  };
  currentBab = virtualBab;
  document.getElementById('studyTitle').textContent = '🧠 Mode Lupa';
  document.getElementById('studySub').textContent = `${pool.length} kata — diurutkan dari yang paling sering terlupa`;
  fcCards = shuffle(pool);
  fcIndex = 0; fcHafal = []; fcBelum = []; fcSeen = []; fcStreak = 0;
  fcSessionBab = 'LUPA';
  setStudyTabsVisible(false);
  showScr('studyScr');
  switchTab(2);
}


function setStudyTabsVisible(visible) {
  const tabs = document.getElementById('studyTabs');
  if (tabs) tabs.style.display = visible ? '' : 'none';
}

function startCross() {
  const babsForStart = crossBabs.length ? BABS.filter(b => crossBabs.includes(b.num)) : BABS;
  let allWords = babsForStart.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})));
  if (crossCoreOnly) allWords = allWords.filter(k=>k.lv==='core');
  if (crossCats.length) allWords = allWords.filter(k => crossCats.includes(k.cat));
  if (!allWords.length) { alert('Tidak ada kata yang cocok dengan filter yang dipilih!'); return; }

  const virtualBab = {
    num: 'X', title: 'Flashcard Lintas Bab', sub: crossBabs.join(', '),
    kotoba: allWords, bunpou: []
  };
  currentBab = virtualBab;
  document.getElementById('studyTitle').textContent = 'Flashcard Lintas Bab';
  const babLabel = crossBabs.length ? `Bab ${crossBabs.join(', ')}` : 'Semua Bab';
  document.getElementById('studySub').textContent = crossCats.length ? `${babLabel} · Kategori: ${crossCats.join(', ')}` : babLabel;
  setStudyTabsVisible(false);
  showScr('studyScr');
  switchTab(2);
}


// ========== KEYBOARD SHORTCUTS ==========
// Hanya aktif saat tab Flashcard sedang ditampilkan & bukan sedang mengetik di input.
function isTypingInForm(target) {
  if (!target) return false;
  const tag = (target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
  if (target.isContentEditable) return true;
  return false;
}
function isFlashcardActive() {
  const studyScr = document.getElementById('studyScr');
  if (!studyScr || !studyScr.classList.contains('active')) return false;
  const tab2 = document.getElementById('tab2');
  return !!(tab2 && tab2.classList.contains('active'));
}
document.addEventListener('keydown', (e) => {
  if (isTypingInForm(e.target)) return;

  // Esc: kembali ke layar sebelumnya / beranda
  if (e.key === 'Escape') {
    const studyScr = document.getElementById('studyScr');
    const crossScr = document.getElementById('crossScr');
    const kamusScr = document.getElementById('kamusScr');
    const rsumScr  = document.getElementById('rangkumanScr');
    if (studyScr && studyScr.classList.contains('active')) { goHome(); e.preventDefault(); return; }
    if (crossScr && crossScr.classList.contains('active')) { showScr('homeScr'); e.preventDefault(); return; }
    if (kamusScr && kamusScr.classList.contains('active')) { showScr('homeScr'); e.preventDefault(); return; }
    if (rsumScr  && rsumScr.classList.contains('active'))  { showScr('homeScr'); e.preventDefault(); return; }
    return;
  }

  if (!isFlashcardActive()) return;
  // Modifier dipakai user untuk shortcut browser → jangan ganggu
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  switch (e.key) {
    case ' ':
    case 'Spacebar':
      e.preventDefault();
      if (typeof flipCard === 'function') flipCard();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      if (typeof prevCard === 'function') prevCard();
      break;
    case 'ArrowRight':
      e.preventDefault();
      if (typeof nextCard === 'function') nextCard();
      break;
    case 'h': case 'H': case '1':
      e.preventDefault();
      if (typeof markHafal === 'function') markHafal();
      break;
    case 'b': case 'B': case '2':
      e.preventDefault();
      if (typeof markBelum === 'function') markBelum();
      break;
    case 's': case 'S':
      e.preventDefault();
      if (typeof shuffleFC === 'function') shuffleFC();
      break;
  }
}, { passive: false });


// ========== INIT (enhanced) ==========
// renderHome(); — now handled by initApp()
initApp();
