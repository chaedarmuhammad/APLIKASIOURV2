// ========== N5→N4 日本語 Flashcard — Main Application ==========
// 
// ARCHITECTURE (v2.1.0):
// ┌─────────────────────────────────────────────────────┐
// │  index.html                                         │
// │  ├── data-n5.js     → BABS (Bab 1-35)              │
// │  ├── data-n4.js     → BABS_N4 (Bab 36-78)          │
// │  ├── data.js        → Merges BABS + BABS_N4         │
// │  ├── src/utils.js   → escapeHtml, sanitize, toast   │
// │  ├── src/storage.js → localStorage + IndexedDB      │
// │  ├── src/srs.js     → SM-2 spaced repetition        │
// │  ├── src/version.js → Versioning & update check     │
// │  └── app.js         → UI, rendering, navigation     │
// └─────────────────────────────────────────────────────┘
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

// ========== EXPORT / IMPORT PROGRESS ==========
function showDataManager() {
  document.getElementById('dataManagerModal').style.display = 'flex';
  document.getElementById('dataManagerStatus').className = 'data-manager-status';
  document.getElementById('dataManagerStatus').textContent = '';
}

function hideDataManager() {
  document.getElementById('dataManagerModal').style.display = 'none';
}

function exportProgress() {
  try {
    const data = {
      version: 2,
      exportDate: new Date().toISOString(),
      appName: 'N5N4-Flashcard',
      progress: lsGet('n5prog', {}),
      stars: lsGet('n5stars', {}),
      srs: lsGet('n5srs', {}),
      settings: {
        fcDir: fcDir || 'jp2id',
        crossCoreOnly: crossCoreOnly || false
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `n5n4-progress-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    const status = document.getElementById('dataManagerStatus');
    status.className = 'data-manager-status success';
    status.textContent = '✅ Progres berhasil diekspor!';
    showToast('Progres berhasil diekspor!', 'success');
  } catch(e) {
    const status = document.getElementById('dataManagerStatus');
    status.className = 'data-manager-status error';
    status.textContent = '❌ Gagal mengekspor: ' + e.message;
  }
}

function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      
      // Validate structure
      if (!data.appName || data.appName !== 'N5N4-Flashcard') {
        throw new Error('File ini bukan file ekspor yang valid.');
      }
      
      // Merge or replace
      if (data.progress && typeof data.progress === 'object') {
        progress = data.progress;
        lsSet('n5prog', progress);
      }
      if (data.stars && typeof data.stars === 'object') {
        stars = data.stars;
        lsSet('n5stars', stars);
      }
      if (data.srs && typeof data.srs === 'object') {
        srs = data.srs;
        lsSet('n5srs', srs);
      }
      
      const status = document.getElementById('dataManagerStatus');
      status.className = 'data-manager-status success';
      status.textContent = '✅ Progres berhasil diimpor! Tanggal ekspor: ' + (data.exportDate || 'N/A');
      showToast('Progres berhasil diimpor!', 'success');
      
      // Re-render home to show updated progress
      safeExec(() => renderHome());
      safeExec(() => refreshForgetBanner());
    } catch(err) {
      const status = document.getElementById('dataManagerStatus');
      status.className = 'data-manager-status error';
      status.textContent = '❌ Gagal mengimpor: ' + err.message;
      showToast('Gagal mengimpor file', 'error');
    }
  };
  reader.readAsText(file);
  // Reset input so same file can be selected again
  event.target.value = '';
}

function confirmResetProgress() {
  if (!confirm('⚠️ PERINGATAN: Semua progres belajar akan dihapus permanen!\n\nSudah ekspor backup?\nKlik OK untuk menghapus semua data.')) return;
  if (!confirm('Yakin? Tindakan ini TIDAK BISA dibatalkan.')) return;
  
  try {
    localStorage.removeItem('n5prog');
    localStorage.removeItem('n5stars');
    localStorage.removeItem('n5srs');
    localStorage.removeItem('n5forget');
    progress = {};
    stars = {};
    srs = {};
    
    const status = document.getElementById('dataManagerStatus');
    status.className = 'data-manager-status success';
    status.textContent = '✅ Semua data telah dihapus.';
    showToast('Semua data berhasil direset', 'success');
    safeExec(() => renderHome());
    safeExec(() => refreshForgetBanner());
  } catch(e) {
    showToast('Gagal mereset data', 'error');
  }
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

// ========== NAVIGATION ==========
let _homeScrollY = 0;

function showScr(id) {
  // Simpan posisi scroll beranda sebelum pindah layar
  const currentActive = document.querySelector('.scr.active');
  if (currentActive && currentActive.id === 'homeScr') {
    _homeScrollY = window.scrollY;
  }
  document.querySelectorAll('.scr').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  // Kembali ke beranda → restore posisi; layar lain → scroll ke atas
  if (id === 'homeScr') {
    requestAnimationFrame(() => window.scrollTo(0, _homeScrollY));
  } else if (id === 'rangkumanScr' && _rsumNavState) {
    // Jangan scroll ke 0 jika kembali dari bab — akan di-handle oleh goBackToRangkuman
  } else {
    window.scrollTo(0, 0);
  }
  if (id === 'crossScr') { renderCrossCategories(); refreshForgetBanner(); }
  if (id === 'kamusScr') initKamus();
  if (id === 'rangkumanScr') { 
    if (!rangkumanRendered) { 
      try { renderRangkuman(); rangkumanRendered = true; } 
      catch(e) { console.error('[Rangkuman] Render error:', e); rangkumanRendered = false; }
    } 
  }
}

function goHome() {
  const savedY = _homeScrollY;
  // Sembunyikan banner rangkuman & reset state
  const banner = document.getElementById('backToRangkumanBanner');
  if (banner) banner.classList.remove('visible');
  _rsumNavState = null;
  showScr('homeScr');
  renderHome();
  refreshForgetBanner();
  // renderHome() rebuild DOM, pastikan scroll diaplikasikan setelah render
  requestAnimationFrame(() => window.scrollTo(0, savedY));
}

function switchTab(n) {
  if (currentBab) lsSet('n5tab_' + currentBab.num, n);
  currentTab = n;
  document.querySelectorAll('#studyTabs .tab-btn').forEach((b,i) => b.classList.toggle('active', i===n));
  document.querySelectorAll('#studyScr .tab-content').forEach((c,i) => c.classList.toggle('active', i===n));
  if (n===2) {
    const babKey = currentBab ? currentBab.num : null;
    if (fcCards.length === 0 || fcSessionBab !== babKey) {
      fcSessionBab = babKey;
      initFlashcard();
    } else {
      renderFC();
    }
  }
}

// ========== HOME LEVEL TAB ==========
let homeTabLevel = 'all';

function switchHomeTab(level, btn) {
  homeTabLevel = level;
  document.querySelectorAll('#homeLevelTabs .tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const sN5 = document.getElementById('sectionN5');
  const sN4 = document.getElementById('sectionN4');
  sN5.style.display = (level === 'n4') ? 'none' : '';
  sN4.style.display = (level === 'n5') ? 'none' : '';
  updateHomeTabInfo();
}

function updateHomeTabInfo() {
  const info = document.getElementById('homeTabInfo');
  if (!info) return;
  const babs = homeTabLevel === 'n5' ? BABS.filter(b => b.num <= 35)
             : homeTabLevel === 'n4' ? BABS.filter(b => b.num >= 36)
             : BABS;
  const done = babs.filter(b => (progress[b.num] || 0) >= 100).length;
  const avg  = Math.round(babs.reduce((s, b) => s + (progress[b.num] || 0), 0) / babs.length);
  const color = homeTabLevel === 'n5' ? '#34d399' : homeTabLevel === 'n4' ? '#c084fc' : 'var(--accent2)';
  info.innerHTML = `<span style="color:${color}">${done}/${babs.length} bab selesai</span> · rata-rata <b>${avg}%</b>`;
}

// ========== RENDER HOME ==========
function makeCard(bab) {
  const prog = progress[bab.num] || 0;
  const card = document.createElement('div');
  card.className = `bab-card ${bab.color}`;
  card.onclick = () => openBab(bab.num);
  card.innerHTML = `
    <div class="bab-num">Bab ${bab.num}</div>
    <div class="bab-title">${bab.title}</div>
    <div class="bab-sub">${bab.sub}</div>
    <div class="bab-count">${bab.kotoba.length} kotoba</div>
    <div class="bab-progress-bar"><div class="bab-progress-fill" style="width:${prog}%"></div></div>
  `;
  return card;
}

function renderHome() {
  const gridN5 = document.getElementById('babGridN5');
  const gridN4 = document.getElementById('babGridN4');
  gridN5.innerHTML = '';
  gridN4.innerHTML = '';
  BABS.filter(b => b.num <= 35).forEach(bab => gridN5.appendChild(makeCard(bab)));
  BABS.filter(b => b.num >= 36).forEach(bab => gridN4.appendChild(makeCard(bab)));
  // Restore tab visibility
  switchHomeTab(homeTabLevel, null);
  // Resume banner
  const lastBab = lsGet('n5lastbab', 0);
  if (lastBab) {
    const b = BABS.find(x => x.num == lastBab);
    if (b) {
      document.getElementById('resumeBanner').style.display = 'flex';
      document.getElementById('resumeText').textContent = `Lanjutkan Bab ${b.num} — ${b.title} →`;
    }
  }
  // Cross bab selector
  const sel = document.getElementById('crossBabSel');
  sel.innerHTML = '';
  BABS.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'cross-bab-btn' + (crossBabs.includes(b.num)?' sel':'');
    btn.textContent = b.num;
    btn.onclick = () => {
      if (crossBabs.includes(b.num)) crossBabs = crossBabs.filter(x=>x!==b.num);
      else crossBabs.push(b.num);
      btn.classList.toggle('sel');
      renderCrossCategories();
    };
    sel.appendChild(btn);
  });
  // Forget button on home
  const homeForgetBtn = document.getElementById('homeForgeBtnWrap');
  if (homeForgetBtn) {
    const stats = getForgetStats();
    if (stats.total > 0) {
      homeForgetBtn.style.display = '';
      homeForgetBtn.textContent = `🧠 Ulang yang Terlupa (${stats.total})`;
    } else {
      homeForgetBtn.style.display = 'none';
    }
  }
}

function resumeStudy() {
  const lastBab = parseInt(lsGet('n5lastbab', 0));
  if (lastBab) openBab(lastBab);
}

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
    var tabNames = ['Pola', 'Konjugasi', 'Partikel', 'Bentuk VV', 'Kata Sifat', 'Transitif & Intransitif', 'Ragam', 'Angka', 'Lainnya'];
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
            if (savedState.tabIdx === 3 && savedState.clickedBab) {
              var chips = document.querySelectorAll('#rsum-tab-3 .rsum-bab-chip.clickable');
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

// ========== BUNPOU ==========
function renderBunpou() {
  const c = document.getElementById('tab0');
  let html = '';
  currentBab.bunpou.forEach(sec => {
    let tableHtml = '';
    if (sec.table) {
      tableHtml = '<table class="conj-table"><thead><tr><th>Bentuk ます</th><th>Bentuk て</th></tr></thead><tbody>';
      sec.table.forEach(row => {
        tableHtml += `<tr><td>${row[0]}</td><td class="conj-red">${row[1]}</td></tr>`;
      });
      tableHtml += '</tbody></table>';
    }
    let reibunHtml = (sec.reibun||[]).map(r => `
      <div class="reibun">
        <div class="reibun-jp">${r.jp}</div>
        ${r.rom?`<div class="reibun-rom">${r.rom}</div>`:''}
        <div class="reibun-id">${r.id}</div>
      </div>`).join('');
    let noteHtml = sec.note ? `<div class="note-box note-${sec.note.type}">${sec.note.text}</div>` : '';
    html += `
      <div class="bunpou-section">
        <div class="bunpou-label ${sec.tag}">文法${sec.tag} — ${sec.label}</div>
        <div class="bunpou-body">
          <div class="bunpou-pattern">${sec.pattern}</div>
          <div class="bunpou-desc">${sec.desc}</div>
          ${tableHtml}${reibunHtml}${noteHtml}
        </div>
      </div>`;
  });

  // Tips & Trik section
  const tips = BAB_TIPS[currentBab.num] || [];
  if (tips.length) {
    html += `<div style="margin-top:20px;margin-bottom:4px;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent2)">💎 Catatan Penting & Tips Menghafal</div>`;
    tips.forEach(t => {
      const pointsHtml = (t.points||[]).map(p =>
        `<li style="margin-bottom:5px;line-height:1.7">${p}</li>`
      ).join('');
      html += `<div class="note-box note-amber" style="margin-bottom:10px">
        <div style="font-weight:700;margin-bottom:8px">${t.icon} ${t.title}</div>
        <ul style="font-size:0.83rem;padding-left:18px;margin:0;list-style:none;">
          ${(t.points||[]).map(p => `<li style="margin-bottom:6px;line-height:1.7;padding-left:4px;border-left:2px solid rgba(251,191,36,0.4)">${p}</li>`).join('')}
        </ul>
      </div>`;
    });
  }

  html += `<button class="btn-next-tab" onclick="switchTab(1)">Lanjut ke Daftar Kotoba →</button>`;
  c.innerHTML = html;
}

// ========== KOTOBA ==========
let koFilter = 'semua', koLevel = 'semua', koSearch = '';

// Fungsi terpisah untuk update search tanpa re-render input
function updateKotobaSearch(val) {
  koSearch = val;
  renderKotobaList();
}

function buildKotobaRowsHtml() {
  let words = currentBab.kotoba.filter(k => {
    let okCat = koFilter==='semua' || k.cat===koFilter;
    let okLv = koLevel==='semua' || k.lv===koLevel;
    let okSrch = !koSearch || k.jp.replace(/<[^>]+>/g,'').toLowerCase().includes(koSearch.toLowerCase())
                           || k.id.toLowerCase().includes(koSearch.toLowerCase())
                           || k.rom.toLowerCase().includes(koSearch.toLowerCase());
    return okCat && okLv && okSrch;
  });
  return words.map(k => {
    const starKey = `${currentBab.num}_${k.rom}`;
    const starred = stars[starKey] ? '⭐' : '☆';
    const grpBadge = k.grp
      ? `<span class="kotoba-grp grp-${escapeHtml(k.grp)}">${k.cat === 'Kata Kerja' ? 'Gol.'+escapeHtml(k.grp) : 'KS-'+escapeHtml(k.grp)}</span>`
      : '';
    return `<div class="kotoba-row${k.lv==='core'?' kotoba-lv-core':''}">
      <div>
        <div class="kotoba-jp">${k.jp}</div>
        <div class="kotoba-rom">${escapeHtml(k.rom)}</div>
      </div>
      <div class="kotoba-id">${escapeHtml(k.id)}</div>
      <div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;justify-content:flex-end">
        ${grpBadge}
        <div class="kotoba-cat">${escapeHtml(k.cat)}</div>
      </div>
      <button class="kotoba-star" onclick="toggleStar('${escapeHtml(starKey)}',this)">${starred}</button>
    </div>`;
  }).join('');
}

// Hanya update list tanpa re-render input (fix: input tidak kehilangan fokus)
function renderKotobaList() {
  const list = document.getElementById('kotobaList');
  if (list) list.innerHTML = buildKotobaRowsHtml();
}

function renderKotoba(filter, level, search) {
  if (filter !== undefined) koFilter = filter;
  if (level !== undefined) koLevel = level;
  if (search !== undefined) koSearch = search;
  const c = document.getElementById('tab1');
  const cats = ['semua', ...new Set(currentBab.kotoba.map(k=>k.cat))];
  let fhtml = cats.map(cat => `<button class="filter-btn${koFilter===cat?' active':''}" onclick="renderKotoba('${cat}')">${cat==='semua'?'Semua':cat}</button>`).join('');
  fhtml += `<button class="filter-btn${koLevel==='core'?' active':''}" onclick="renderKotoba(undefined,'core')">Inti</button>`;
  fhtml += `<button class="filter-btn${koLevel==='semua'?' active':''}" onclick="renderKotoba(undefined,'semua')">Semua Level</button>`;

  c.innerHTML = `
    <div class="kotoba-filters">${fhtml}</div>
    <input class="search-bar" id="kotobaSearchInput" placeholder="Cari kata..." value="${escapeHtml(koSearch)}" oninput="updateKotobaSearch(this.value)">
    <div class="kotoba-list" id="kotobaList">${buildKotobaRowsHtml()}</div>
    <button class="btn-next-tab" onclick="switchTab(2)" style="margin-top:16px">Lanjut ke Flashcard →</button>
  `;
}

function toggleStar(key, btn) {
  stars[key] = !stars[key];
  lsSet('n5stars', stars);
  btn.textContent = stars[key] ? '⭐' : '☆';
}

// ========== FLASHCARD ==========
// Strategi render: mount sekali (static skeleton + event handler),
// lalu update granular (textContent / classList / dataset). Hindari
// `innerHTML = ...` setiap flip/next supaya tidak rebuild DOM, tidak
// kehilangan focus/animasi, dan jauh lebih ringan di HP low-end.
function initFlashcard(overrideCards) {
  let source = overrideCards || currentBab.kotoba;
  if (fcStarOnly) source = source.filter(k => stars[`${currentBab.num}_${k.rom}`]);
  fcCards = [...source];
  fcIndex = 0; fcHafal = []; fcBelum = []; fcSeen = []; fcStreak = 0;
  renderFC();
}

// Bangun skeleton FC ke dalam #tab2. Hanya dipanggil sekali per sesi
// (atau saat sebelumnya menampilkan halaman result/empty).
function mountFCSkeleton() {
  const c = document.getElementById('tab2');
  c.innerHTML = `
    <div class="fc-controls" id="fcControls">
      <button class="fc-toggle" data-fc-dir="jp2id" onclick="setFCDir('jp2id')">JP→ID</button>
      <button class="fc-toggle" data-fc-dir="id2jp" onclick="setFCDir('id2jp')">ID→JP</button>
      <button class="fc-shuffle" onclick="shuffleFC()">🔀 Acak</button>
      <button class="fc-star-filter" id="fcStarBtn" onclick="toggleFCStars()">⭐</button>
      <button class="fc-shuffle" onclick="selesaikanFlashcard()" style="color:var(--amber);border-color:var(--amber)">🔄 Mulai Ulang</button>
      <span class="streak-badge" id="fcStreak" style="display:none">🔥 0</span>
    </div>
    <div class="fc-progress" id="fcProgress">
      <span id="fcProgIdx">1 / 1</span>
      <span id="fcProgHafal" style="margin-left:8px;color:var(--green);font-size:0.75rem">✓0</span>
      <span id="fcProgBelum" style="margin-left:4px;color:var(--red);font-size:0.75rem">✗0</span>
      <span id="fcProgBab" style="margin-left:8px;color:var(--accent2);font-size:0.72rem;display:none"></span>
    </div>
    <div class="fc-bar"><div class="fc-bar-fill" id="fcBar" style="width:0%"></div></div>
    <div class="card-scene">
      <div class="card-3d" id="card3d" onclick="flipCard()">
        <div class="card-face card-front" style="position:relative">
          <div class="fc-forget-badge" id="fcForgetBadge" style="display:none"></div>
          <div class="card-hint" id="fcHintFront">Bahasa Jepang — ketuk untuk balik</div>
          <div class="card-word" id="fcWordFront"></div>
          <div class="card-rom" id="fcRomFront"></div>
          <div class="card-cat-tag" id="fcCatFront"></div>
        </div>
        <div class="card-face card-back">
          <div class="card-hint">Terjemahan</div>
          <div class="card-rom" id="fcRomBackTop"></div>
          <div class="card-word" id="fcWordBack"></div>
          <div class="card-rom" id="fcRomBack"></div>
          <div class="card-cat-tag" id="fcCatBack"></div>
        </div>
      </div>
    </div>
    <div class="fc-nav-row">
      <button class="btn-nav-prev" id="fcPrev" onclick="prevCard()">← Sebelumnya</button>
      <button class="btn-nav-next" id="fcNext" onclick="nextCard()">Selanjutnya →</button>
    </div>
    <div class="fc-actions">
      <button class="btn-hafal" onclick="markHafal()">✓ Hafal</button>
      <button class="btn-belum" onclick="markBelum()">✗ Belum</button>
    </div>
    <button class="btn-selesai" id="fcSeeResult" style="display:none" onclick="renderFCResult()">🎯 Lihat Hasil</button>
    <button class="btn-selesai" id="fcBackCross" style="display:none;background:var(--surface2);color:var(--text2);border:1px solid var(--border);margin-top:6px" onclick="showScr('crossScr')">← Kembali ke Lintas Bab</button>
    <button class="btn-selesai" id="fcBackCrossX" style="display:none;background:var(--surface2);color:var(--text2);border:1px solid var(--border);margin-top:6px" onclick="resetAndBackToCross()">← Kembali & Ganti Kategori</button>
  `;
  c.dataset.view = 'fc';
}

function renderFC() {
  const c = document.getElementById('tab2');
  if (!fcCards.length) {
    c.innerHTML = '<p style="text-align:center;color:var(--text2);padding:40px">Tidak ada kartu</p>';
    c.dataset.view = 'empty';
    return;
  }
  if (fcIndex >= fcCards.length) { renderFCResult(); return; }

  // Mount skeleton kalau belum ada / view berbeda
  if (c.dataset.view !== 'fc') mountFCSkeleton();

  const card = fcCards[fcIndex];
  const front = fcDir === 'jp2id' ? card.jp : card.id;
  const back  = fcDir === 'jp2id' ? card.id : card.jp;
  const pct = Math.round((fcIndex / fcCards.length) * 100);
  const forgetCnt = forgetCount[wordKey(card)] || 0;
  const isForgetMode = currentBab && currentBab.num === 'LUPA';
  const isCrossMode  = currentBab && currentBab.num === 'X';

  // 1) Direction toggle aktif/non-aktif
  c.querySelectorAll('#fcControls [data-fc-dir]').forEach(b => {
    b.classList.toggle('active', b.dataset.fcDir === fcDir);
  });
  document.getElementById('fcStarBtn').classList.toggle('active', !!fcStarOnly);

  // 2) Streak badge
  const stk = document.getElementById('fcStreak');
  if (fcStreak >= 3) { stk.style.display = ''; stk.textContent = `🔥 ${fcStreak}`; }
  else stk.style.display = 'none';

  // 3) Progress
  document.getElementById('fcProgIdx').textContent  = `${fcIndex+1} / ${fcCards.length}`;
  document.getElementById('fcProgHafal').textContent = `✓${fcHafal.length}`;
  document.getElementById('fcProgBelum').textContent = `✗${fcBelum.length}`;
  const babEl = document.getElementById('fcProgBab');
  if (card.babNum && card.babNum !== 'x') {
    babEl.style.display = '';
    babEl.textContent = `Bab ${card.babNum}`;
  } else {
    babEl.style.display = 'none';
  }
  document.getElementById('fcBar').style.width = pct + '%';

  // 4) Forget badge (gunakan textContent — aman dari XSS)
  const fb = document.getElementById('fcForgetBadge');
  if (forgetCnt >= 1) {
    fb.style.display = '';
    fb.textContent = `${forgetCnt >= 3 ? '🔥' : '⚠️'} Terlupa ${forgetCnt}×`;
  } else {
    fb.style.display = 'none';
  }

  // 5) Card faces — jp boleh innerHTML (mengandung <ruby>); id/rom pakai textContent
  document.getElementById('fcHintFront').textContent =
    fcDir === 'jp2id' ? 'Bahasa Jepang — ketuk untuk balik' : 'Bahasa Indonesia — ketuk untuk balik';
  setCardWord(document.getElementById('fcWordFront'), front, fcDir === 'jp2id');
  setCardWord(document.getElementById('fcWordBack'),  back,  fcDir === 'id2jp');

  const romFront = document.getElementById('fcRomFront');
  if (fcDir === 'jp2id' && card.rom) { romFront.style.display = ''; romFront.textContent = card.rom; }
  else romFront.style.display = 'none';

  // Back: ID→JP → rom di atas; JP→ID → rom di bawah
  const romBackTop = document.getElementById('fcRomBackTop');
  const romBack    = document.getElementById('fcRomBack');
  if (fcDir === 'id2jp' && card.rom) { romBackTop.style.display = ''; romBackTop.textContent = card.rom; }
  else romBackTop.style.display = 'none';
  if (fcDir === 'jp2id') { romBack.style.display = 'none'; romBack.textContent = ''; }
  else { romBack.style.display = ''; romBack.textContent = card.rom || ''; }

  // 6) Category tag (pakai textContent — data dari kita, tapi tetap aman by default)
  setCatTag(document.getElementById('fcCatFront'), card);
  setCatTag(document.getElementById('fcCatBack'),  card);

  // 7) Nav buttons
  document.getElementById('fcPrev').disabled = (fcIndex === 0);
  document.getElementById('fcNext').disabled = (fcIndex >= fcCards.length - 1);

  // 8) Tombol-tombol kondisional bawah
  document.getElementById('fcSeeResult').style.display =
    ((fcHafal.length + fcBelum.length) >= fcCards.length) ? '' : 'none';
  document.getElementById('fcBackCross').style.display  = isForgetMode ? '' : 'none';
  document.getElementById('fcBackCrossX').style.display = isCrossMode  ? '' : 'none';

  // 9) Reset flip state untuk kartu baru
  fcFlipped = false;
  document.getElementById('card3d').classList.remove('flipped');
}

// jp boleh berisi <ruby>; selain itu pakai textContent supaya tahan XSS
function setCardWord(el, value, isJapanese) {
  if (isJapanese) el.innerHTML = value || '';
  else el.textContent = value || '';
}

function setCatTag(el, card) {
  // Kategori + (opsional) golongan KK / KS-i/na
  el.textContent = card.cat || '';
  if (card.grp) {
    const sub = document.createElement('span');
    sub.style.opacity = '0.9';
    sub.style.fontWeight = '700';
    sub.style.marginLeft = '6px';
    sub.textContent = card.cat === 'Kata Kerja' ? `Gol.${card.grp}` : `KS-${card.grp}`;
    el.appendChild(sub);
  }
}

function flipCard() {
  fcFlipped = !fcFlipped;
  const el = document.getElementById('card3d');
  if (el) el.classList.toggle('flipped', fcFlipped);
}

function markHafal() {
  if (!fcCards[fcIndex]) return;
  const card = fcCards[fcIndex];
  // Track as hafal (replace if already tracked)
  fcHafal = fcHafal.filter(k => k !== card);
  fcBelum = fcBelum.filter(k => k !== card);
  fcHafal.push(card);
  fcStreak++;
  sm2RecordHafal(card);
  updateProgress();
  if (fcIndex < fcCards.length - 1) {
    fcIndex++;
  } else {
    renderFCResult(); return;
  }
  fcFlipped = false;
  renderFC();
}

function markBelum() {
  if (!fcCards[fcIndex]) return;
  const card = fcCards[fcIndex];
  fcHafal = fcHafal.filter(k => k !== card);
  fcBelum = fcBelum.filter(k => k !== card);
  fcBelum.push(card);
  fcStreak = 0;
  sm2RecordBelum(card);
  if (fcIndex < fcCards.length - 1) {
    fcIndex++;
  } else {
    renderFCResult(); return;
  }
  fcFlipped = false;
  renderFC();
}

function prevCard() {
  if (fcIndex <= 0) return;
  fcIndex--;
  fcFlipped = false;
  renderFC();
}

function nextCard() {
  if (fcIndex >= fcCards.length - 1) return;
  fcIndex++;
  fcFlipped = false;
  renderFC();
}

function shuffleFC() {
  for (let i=fcCards.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [fcCards[i],fcCards[j]]=[fcCards[j],fcCards[i]];
  }
  fcIndex=0; fcSeen=[]; fcHafal=[]; fcBelum=[]; fcStreak=0;
  // Pindah dari result/empty → fc lagi
  const c = document.getElementById('tab2');
  if (c) c.dataset.view = '';
  renderFC();
}

function selesaikanFlashcard() {
  const c = document.getElementById('tab2');
  if (c) c.dataset.view = '';
  initFlashcard();
}

function setFCDir(d) { fcDir=d; renderFC(); }
function toggleFCStars() {
  fcStarOnly = !fcStarOnly;
  const c = document.getElementById('tab2');
  if (c) c.dataset.view = '';
  initFlashcard();
}

function renderFCResult() {
  const c = document.getElementById('tab2');
  // jp boleh berisi <ruby>; id di-escape untuk amankan dari XSS
  const renderRow = (k, withBadge) => {
    const cnt = forgetCount[wordKey(k)] || 0;
    const badge = (withBadge && cnt >= 2)
      ? ` <span class="forget-chip${cnt>=3?' high':''}">Terlupa ${cnt}×</span>`
      : '';
    return `<div class="result-word">${k.jp || ''} — ${escapeHtml(k.id)}${badge}</div>`;
  };
  const hafalList = fcHafal.map(k => renderRow(k, false)).join('');
  const belumList = fcBelum.map(k => renderRow(k, true)).join('');
  const isForgetMode = currentBab && currentBab.num === 'LUPA';
  const isCrossMode  = currentBab && currentBab.num === 'X';

  const stats = getForgetStats();
  const forgetSummary = stats.total > 0
    ? `<div style="margin:12px 0;padding:10px 14px;background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.25);border-radius:10px;font-size:0.8rem;color:var(--text2)">
        🧠 Total kata yang pernah terlupa: <b style="color:#f87171">${stats.total}</b>
        ${stats.struggling > 0 ? ` · Sering banget lupa (≥3×): <b style="color:#ef4444">${stats.struggling}</b>` : ''}
        ${stats.due > 0 ? ` · Siap di-review sekarang: <b style="color:#fbbf24">${stats.due}</b>` : ''}
       </div>`
    : '';

  c.innerHTML = `
    <div class="fc-result">
      <h2>${isForgetMode ? '🧠 Sesi Lupa Selesai!' : '🎉 Sesi Selesai!'}</h2>
      <div class="fc-result-stat">Total ${fcCards.length} kartu</div>
      ${forgetSummary}
      <div class="result-list">
        <div class="result-list-title" style="color:var(--green)">✅ Sudah Hafal (${fcHafal.length})</div>
        ${hafalList || '<div class="result-word" style="color:var(--text2)">—</div>'}
      </div>
      <div class="result-list">
        <div class="result-list-title" style="color:var(--red)">❌ Belum Hafal (${fcBelum.length})</div>
        ${belumList || '<div class="result-word" style="color:var(--text2)">—</div>'}
      </div>
      <div class="result-btns">
        <button class="btn-result btn-result-all" onclick="initFlashcard()">🔁 Ulangi Semua</button>
        ${fcBelum.length?`<button class="btn-result btn-result-miss" onclick="repeatMiss()">⚡ Ulangi yang Belum Hafal</button>`:''}
        ${!isForgetMode && stats.total > 0 ? `<button class="btn-result" style="background:rgba(248,113,113,0.2);color:#f87171;border:1px solid rgba(248,113,113,0.3)" onclick="startForgetMode()">🧠 Latih Semua yang Terlupa (${stats.total})</button>` : ''}
        ${isForgetMode ? `<button class="btn-result" style="background:rgba(248,113,113,0.2);color:#f87171;border:1px solid rgba(248,113,113,0.3)" onclick="startForgetMode()">🔁 Ulangi Mode Lupa</button>` : ''}
        ${(isCrossMode || isForgetMode) ? `<button class="btn-result btn-result-home" onclick="showScr('crossScr')">← Kembali ke Lintas Bab</button>` : ''}
        <button class="btn-result btn-result-home" onclick="goHome()">🏠 Kembali ke Beranda</button>
      </div>
    </div>`;
  c.dataset.view = 'result';
}

function repeatMiss() {
  const miss = [...fcBelum];
  fcCards = miss; fcIndex=0; fcHafal=[]; fcBelum=[]; fcSeen=[]; fcStreak=0;
  const c = document.getElementById('tab2');
  if (c) c.dataset.view = '';
  renderFC();
}

function updateProgress() {
  const pct = Math.round(((fcHafal.length) / (currentBab?.kotoba?.length||1))*100);
  progress[currentBab?.num] = Math.min(100, pct);
  lsSet('n5prog', progress);
}

// ========== RANGKUMAN ==========
const RANGKUMAN_POLA = [
  {bab:1, pola:"KB は KB です", arti:"Identitas / pernyataan (... adalah ...)", ex:{jp:"わたしは がくせいです。", id:"Saya adalah siswa."}, note:"Partikel は (wa) = topik kalimat. Beda dengan は (ha) dalam kata biasa."},
  {bab:1, pola:"KB は KB じゃ ありません", arti:"Negatif identitas (bukan ...)", ex:{jp:"わたしは いしゃじゃ ありません。", id:"Saya bukan dokter."}, note:"じゃ = じゃ ありません. Versi formal: ではありません."},
  {bab:1, pola:"KB は KB ですか", arti:"Pertanyaan identitas (apakah ... adalah ...?)", ex:{jp:"リーさんは がくせいですか。", id:"Apakah Lee seorang siswa?"}},
  {bab:1, pola:"KB₁ の KB₂", arti:"KB₁ memodifikasi/memiliki KB₂ (milik / tentang ...)", ex:{jp:"わたしの ほん", id:"buku saya"}, note:"の bisa = milik, bisa = tentang/jenis. わたしのほん (bukuku) vs にほんごの ほん (buku bahasa Jepang)."},
  {bab:2, pola:"これ/それ/あれ は KB です", arti:"Kata tunjuk benda (ini/itu adalah ...)", ex:{jp:"これは なんですか。", id:"Ini apa?"}, note:"これ=dekat pembicara, それ=dekat pendengar, あれ=jauh dari keduanya."},
  {bab:2, pola:"この/その/あの + KB", arti:"Penerang benda (~ ini / itu / itu yang jauh)", ex:{jp:"この かばんは いくらですか。", id:"Tas ini berapa?"}, note:"この/その/あの selalu diikuti KB. Tidak bisa berdiri sendiri seperti これ/それ/あれ."},
  {bab:2, pola:"KB は だれ の ですか / KB の です", arti:"Kepemilikan — milik siapa? / milik ~", ex:{jp:"このかさは だれのですか。わたしのです。", id:"Payung ini milik siapa? Milik saya."}, note:"の di akhir = menggantikan KB yang sudah diketahui. わたしのです = (payung) milik saya."},
  {bab:3, pola:"KB は ここ/そこ/あそこ です", arti:"Menyatakan lokasi benda (ada di sini/situ/sana)", ex:{jp:"トイレは あそこです。", id:"Toilet ada di sana."}},
  {bab:3, pola:"KB は どこ ですか", arti:"Menanyakan lokasi (di mana ...?)", ex:{jp:"じむしつは どこですか。", id:"Kantor ada di mana?"}},
  {bab:3, pola:"こちら/そちら/あちら", arti:"Kata tunjuk sopan arah/orang (ke sini/ke situ/ke sana)", ex:{jp:"エレベーターは こちらです。", id:"Lift ada ke arah sini."}, note:"Versi sopan dari ここ/そこ/あそこ. Juga untuk memperkenalkan orang: こちらは <ruby>田中<rt>たなか</rt></ruby>さんです."},
  {bab:4, pola:"KB は いくら ですか", arti:"Menanyakan harga (berapa harga ...?)", ex:{jp:"これは いくらですか。", id:"Ini berapa harganya?"}},
  {bab:4, pola:"ぜんぶで いくら ですか", arti:"Total harga semuanya", ex:{jp:"りんごを ３つと みかんを ２つ、ぜんぶで いくらですか。", id:"3 apel dan 2 jeruk, semuanya berapa?"}, note:"ぜんぶで = semuanya/total. で di sini = cara/total, bukan tempat."},
  {bab:5, pola:"なんじ / なんぷん ですか", arti:"Menanyakan waktu (jam berapa? / menit berapa?)", ex:{jp:"いま なんじですか。３じはんです。", id:"Sekarang jam berapa? Jam setengah 4."}, note:"はん = setengah (30 menit). ごぜん=AM, ごご=PM. 3じ15ふん = jam 3 lebih 15 menit."},
  {bab:5, pola:"なんようび ですか", arti:"Menanyakan hari (hari apa?)", ex:{jp:"きょうは なんようびですか。もくようびです。", id:"Hari ini hari apa? Hari Kamis."}, note:"<ruby>月<rt>げつ</rt></ruby><ruby>火<rt>か</rt></ruby><ruby>水<rt>すい</rt></ruby><ruby>木<rt>もく</rt></ruby><ruby>金<rt>きん</rt></ruby><ruby>土<rt>ど</rt></ruby><ruby>日<rt>にち</rt></ruby> = げつ・か・すい・もく・きん・ど・にち。+ようび = hari."},
  {bab:5, pola:"<ruby>毎日<rt>まいにち</rt></ruby>/<ruby>毎週<rt>まいしゅう</rt></ruby>/<ruby>毎月<rt>まいつき</rt></ruby>/<ruby>毎年<rt>まいとし</rt></ruby>", arti:"Frekuensi rutin (setiap hari / minggu / bulan / tahun)", ex:{jp:"まいにち にほんごを べんきょうします。", id:"Setiap hari belajar bahasa Jepang."}, note:"<ruby>毎<rt>まい</rt></ruby>(まい)=setiap. まいにち・まいしゅう・まいつき・まいとし/まいねん。Tidak pakai partikel に sesudahnya."},
  {bab:5, pola:"KB₁ から KB₂ まで", arti:"Rentang waktu/tempat (dari ... sampai ...)", ex:{jp:"９じから ３じまでです。", id:"Dari jam 9 sampai jam 3."}},
  {bab:5, pola:"KB と KB", arti:"Menghubungkan dua benda (... dan ...)", ex:{jp:"どようびと にちようびです。", id:"Sabtu dan Minggu."}, note:"と hanya untuk menghubungkan KB. Untuk menghubungkan kalimat/sifat, gunakan て-form."},
  {bab:6, pola:"KK ます / ません / ました / ませんでした", arti:"4 bentuk dasar kata kerja sopan", ex:{jp:"まいにち しんぶんを よみます。", id:"Saya membaca koran setiap hari."}, note:"Ini 4 bentuk wajib hafal pertama. Berlaku untuk semua grup kata kerja."},
  {bab:6, pola:"なんじに KK ますか", arti:"Menanyakan waktu suatu kegiatan (jam berapa ~?)", ex:{jp:"まいにち なんじに おきますか。７じに おきます。", id:"Setiap hari bangun jam berapa? Jam 7."}, note:"に setelah waktu spesifik = partikel waktu. まいにち/まいあさ tidak pakai に karena bukan waktu spesifik."},
  {bab:6, pola:"どこへ / なにを / だれと KK ますか", arti:"Tanya tujuan / objek / teman kegiatan", ex:{jp:"どこへ いきますか。なにを たべますか。", id:"Mau ke mana? Mau makan apa?"}, note:"どこへ=ke mana, なにを=apa (objek), だれと=dengan siapa, いつ=kapan — kata tanya dasar untuk KK ます."},
  {bab:7, pola:"KB（tempat）へ KK", arti:"Pergerakan menuju tempat (pergi ke ...)", ex:{jp:"にほんへ いきます。", id:"Saya pergi ke Jepang."}, note:"へ (e) = arah tujuan. Bisa diganti に untuk tujuan yang lebih spesifik/pasti."},
  {bab:7, pola:"KB（kendaraan）で KK", arti:"Alat transportasi (dengan/naik ...)", ex:{jp:"でんしゃで いきます。", id:"Pergi dengan kereta."}, note:"で = alat/cara. Sama partikel, beda makna dengan で=lokasi tindakan (Bab 8)."},
  {bab:7, pola:"KB（orang）と KK", arti:"Bersama seseorang (bersama ...)", ex:{jp:"ともだちと いきます。", id:"Pergi bersama teman."}},
  {bab:8, pola:"KB を KK", arti:"Objek langsung kata kerja transitif", ex:{jp:"ごはんを たべます。", id:"Makan nasi."}, note:"を menandai objek yang dikenai tindakan. Hanya untuk kata kerja transitif (yang punya objek)."},
  {bab:8, pola:"KB（tempat）で KK", arti:"Tempat terjadinya tindakan (di ...)", ex:{jp:"こうえんで あそびます。", id:"Bermain di taman."}, note:"⚠️ で=lokasi tindakan (Bab 8) vs に=lokasi keberadaan (Bab 14). こうえんで あそぶ vs こうえんに いる."},
  {bab:9, pola:"KB（orang）に KB を あげます", arti:"Memberi sesuatu kepada seseorang", ex:{jp:"ともだちに ほんを あげました。", id:"Saya memberi buku kepada teman."}, note:"あげます=saya beri ke orang lain. もらいます=saya terima dari orang lain. くれます=orang lain beri ke saya."},
  {bab:9, pola:"KB（orang）に KB を もらいます", arti:"Menerima sesuatu dari seseorang", ex:{jp:"せんせいに はなを もらいました。", id:"Saya menerima bunga dari guru."}},
  {bab:10, pola:"KB（alat）で KK", arti:"Menggunakan alat/cara untuk melakukan sesuatu", ex:{jp:"はしで たべます。", id:"Makan dengan sumpit."}},
  {bab:10, pola:"もう KK ました / まだです", arti:"Sudah melakukan / belum", ex:{jp:"もう たべましたか。まだです。", id:"Sudah makan? Belum."}, note:"もう+ました=sudah. まだ+negatif=belum. まだ berdiri sendiri sebagai jawaban singkat."},
  {bab:10, pola:"KK ませんか / KK ましょう", arti:"Ajakan (maukah ~? / ayo ~!)", ex:{jp:"いっしょに たべませんか。", id:"Mau makan bersama?"}, note:"ませんか=ajakan halus ke lawan bicara. ましょう=ajakan bersama (termasuk diri sendiri)."},
  {bab:11, pola:"KB は KS です", arti:"Kata sifat sebagai predikat (... adalah ...)", ex:{jp:"ふじさんは たかいです。", id:"Gunung Fuji tinggi."}},
  {bab:11, pola:"KS い → くない / KS な → じゃない", arti:"Bentuk negatif kata sifat", ex:{jp:"このへやは きれいじゃないです。", id:"Kamar ini tidak bersih."}, note:"⚠️ い-adj: buang い → tambah くない. な-adj: tambah じゃない langsung. いい → よくない (pengecualian!)."},
  {bab:12, pola:"KS い/な + KB", arti:"Kata sifat memodifikasi kata benda", ex:{jp:"おおきい かばん", id:"tas yang besar"}, note:"い-adj langsung sebelum KB. な-adj tambah な sebelum KB: きれいな へや."},
  {bab:12, pola:"KB は どんな KB ですか", arti:"Menanyakan sifat/karakter (seperti apa ...?)", ex:{jp:"とうきょうは どんな まちですか。", id:"Tokyo kota seperti apa?"}},
  {bab:12, pola:"とても / すごく / ちょっと / あまり〜ない", arti:"Kata keterangan derajat (sangat / sedikit / tidak terlalu)", ex:{jp:"このへやは あまり ひろくないです。", id:"Kamar ini tidak terlalu luas."}, note:"とても/すごく = sangat (positif). ちょっと = sedikit/agak. あまり + negatif = tidak terlalu. ⚠️ あまり selalu dipakai dengan negatif."},
  {bab:13, pola:"KB が すきです / じょうずです / わかります", arti:"Objek kata sifat/kerja tertentu pakai が", ex:{jp:"おんがくが すきです。", id:"Saya suka musik."}, note:"⚠️ Kata tertentu pakai が bukan を: すき、きらい、じょうず、へた、わかる、ある、いる."},
  {bab:13, pola:"〜から、〜", arti:"Menyatakan alasan (karena ~, maka ~)", ex:{jp:"いそがしいから、いけません。", id:"Karena sibuk, tidak bisa pergi."}, note:"から di sini = alasan (karena). Beda dengan から = dari (awal rentang, Bab 5)."},
  {bab:13, pola:"どうして〜ですか / 〜からです", arti:"Tanya alasan dan cara menjawabnya", ex:{jp:"どうして にほんごを べんきょうしますか。しごとで つかうからです。", id:"Mengapa belajar bahasa Jepang? Karena dipakai di pekerjaan."}, note:"どうして/なぜ = mengapa. Jawaban: 〜からです (diakhiri からです, bukan から saja)."},
  {bab:14, pola:"Tempat に KB が あります / います", arti:"Menyatakan keberadaan di suatu tempat", ex:{jp:"つくえの うえに ほんが あります。", id:"Ada buku di atas meja."}, note:"あります=benda mati/tanaman. います=makhluk hidup (orang, hewan). ⚠️ Jangan tertukar!"},
  {bab:14, pola:"KB は Tempat に あります / います", arti:"Menyatakan di mana KB berada", ex:{jp:"ねこは そこに います。", id:"Kucing ada di sana."}},
  {bab:14, pola:"KB₁ の KB₂（posisi）に あります", arti:"Posisi relatif suatu benda", ex:{jp:"ぎんこうの となりに あります。", id:"Ada di sebelah bank."}},
  {bab:14, pola:"KB が なんにん / なんびき いますか", arti:"Menanyakan jumlah makhluk hidup", ex:{jp:"きょうしつに がくせいが なんにん いますか。", id:"Ada berapa orang siswa di kelas?"}, note:"なんにん=berapa orang, なんびき=berapa ekor. Gunakan kata bantu bilangan yang sesuai."},
  {bab:15, pola:"KB + [angka + kata bantu bilangan]", arti:"Menghitung benda dengan satuan yang tepat", ex:{jp:"りんごを みっつ ください。", id:"Tolong beri 3 apel."}, note:"Kata bantu bilangan berbeda per jenis benda: <ruby>本<rt>ほん</rt></ruby>(ほん)=benda panjang, <ruby>枚<rt>まい</rt></ruby>(まい)=benda tipis, <ruby>台<rt>だい</rt></ruby>(だい)=mesin/kendaraan."},
  {bab:15, pola:"Tabel kata bantu bilangan utama", arti:"<ruby>枚<rt>まい</rt></ruby>/<ruby>本<rt>ほん</rt></ruby>/<ruby>冊<rt>さつ</rt></ruby>/<ruby>台<rt>だい</rt></ruby>/<ruby>匹<rt>ひき</rt></ruby>/<ruby>人<rt>にん</rt></ruby>/<ruby>個<rt>こ</rt></ruby>/<ruby>杯<rt>はい</rt></ruby> + cara tanya", ex:{jp:"ノートを ３まい と えんぴつを ２ほん ください。", id:"Tolong 3 lembar buku catatan dan 2 batang pensil."}, note:"<ruby>枚<rt>まい</rt></ruby>(まい)=tipis/lembaran | <ruby>本<rt>ほん</rt></ruby>(ほん)=panjang/batang | <ruby>冊<rt>さつ</rt></ruby>(さつ)=buku | <ruby>台<rt>だい</rt></ruby>(だい)=mesin/kendaraan | <ruby>匹<rt>ひき</rt></ruby>(ひき)=hewan kecil | <ruby>人<rt>にん</rt></ruby>(にん)=orang | <ruby>個<rt>こ</rt></ruby>(こ)=benda kecil bulat | <ruby>杯<rt>はい</rt></ruby>(はい)=gelas/mangkuk | いくつ=berapa (benda umum)"},
  {bab:16, pola:"[Jangka waktu] に 〜<ruby>回<rt>かい</rt></ruby> KK", arti:"Frekuensi (... kali per periode)", ex:{jp:"いっしゅうかんに いっかい いきます。", id:"Pergi sekali seminggu."}},
  {bab:16, pola:"〜から 〜まで 〜で 〜 かかります", arti:"Waktu tempuh perjalanan", ex:{jp:"えきから ここまで あるいて ５ふん かかります。", id:"Dari stasiun ke sini jalan kaki 5 menit."}},
  {bab:16, pola:"〜ごろ / どのくらい かかりますか", arti:"Kira-kira (jam/waktu) / Berapa lama?", ex:{jp:"なんじごろ かえりますか。どのくらい かかりますか。", id:"Kira-kira jam berapa pulang? Kira-kira berapa lama?"}, note:"ごろ=kira-kira (untuk waktu/jam). どのくらい/どれくらい=berapa lama/jauh. かかります=memakan waktu/biaya."},
  {bab:17, pola:"KB₁ は KB₂ より KS です", arti:"Perbandingan (KB1 lebih ... dari KB2)", ex:{jp:"とうきょうは おおさかより おおきいです。", id:"Tokyo lebih besar dari Osaka."}, note:"より=daripada. Posisi: yang lebih [sifat] ditulis di depan より."},
  {bab:17, pola:"KB₁ と KB₂ と どちらが KS ですか", arti:"Pertanyaan perbandingan dua hal", ex:{jp:"バスと でんしゃと どちらが はやいですか。", id:"Bus atau kereta, mana yang lebih cepat?"}},
  {bab:17, pola:"〜の<ruby>中<rt>なか</rt></ruby>で <ruby>何<rt>なに</rt></ruby>/どこ/だれ が いちばん KS ですか", arti:"Superlative (paling ... di antara ...)", ex:{jp:"くだものの なかで なにが いちばん すきですか。", id:"Di antara buah-buahan, mana yang paling suka?"}},
  {bab:18, pola:"KS い → かった / くなかった", arti:"Kata sifat い bentuk lampau", ex:{jp:"きのうは さむかったです。", id:"Kemarin dingin."}, note:"い-adj lampau: buang い → かった (positif) / くなかった (negatif). いい→よかった (pengecualian)."},
  {bab:18, pola:"KS な/KB → でした / じゃなかった", arti:"Kata sifat な/KB bentuk lampau", ex:{jp:"こどもの ときは げんきでした。", id:"Waktu kecil saya sehat."}, note:"な-adj lampau: +でした (positif) / +じゃなかったです (negatif). Berbeda dengan い-adj yang pakai かった!"},
  {bab:18, pola:"KB でした / KB じゃなかったです", arti:"Kata benda bentuk lampau (dulu adalah ~ / bukan ~)", ex:{jp:"むかし ここは はたけでした。", id:"Dulu di sini adalah ladang."}, note:"KB lampau = +でした. KB lampau negatif = +じゃなかったです. Sama polanya dengan KS な."},
  {bab:19, pola:"KB が ほしいです", arti:"Ingin memiliki sesuatu", ex:{jp:"あたらしい くるまが ほしいです。", id:"Saya ingin mobil baru."}, note:"ほしい pakai が, bukan を. たい juga pakai を seperti biasa: すしを たべたい."},
  {bab:19, pola:"KK(ます stem) + たいです", arti:"Ingin melakukan sesuatu", ex:{jp:"にほんへ いきたいです。", id:"Saya ingin pergi ke Jepang."}, note:"たい = KS い → bisa dikonjugasikan: たくない (tidak ingin), たかった (dulu ingin)."},
  {bab:19, pola:"KK たくない です", arti:"Tidak ingin melakukan sesuatu", ex:{jp:"きょうは なにも たべたくないです。", id:"Hari ini tidak ingin makan apa pun."}, note:"たくない = negatif dari たい. Pola KS い negatif biasa (buang い → くない)."},
  {bab:20, pola:"KB（tempat）へ [KK/KB] に いきます", arti:"Tujuan pergi (pergi ke ... untuk ...)", ex:{jp:"デパートへ かいものに いきます。", id:"Pergi ke mal untuk belanja."}},
  {bab:20, pola:"KB へ KK(ます stem) に きます / かえります", arti:"Datang / pulang untuk tujuan tertentu", ex:{jp:"にほんへ にほんごを べんきょうしに きました。", id:"Datang ke Jepang untuk belajar bahasa Jepang."}, note:"Pola に いきます/きます/かえります = tujuan. KK ます stem + に = nominalisasi tujuan. KB (かいもの/りょこう dll) langsung + に juga bisa."},
  {bab:20, pola:"KK(ます stem) + に + いきます/きます/かえります", arti:"Pergi/datang/pulang untuk melakukan ~", ex:{jp:"えいがを みに いきませんか。", id:"Mau pergi nonton film?"}, note:"⚠️ Bentuk: KK ます stem + に (bukan て). たべに いく (pergi makan) vs たべて いく (pergi sambil makan) — beda makna!"},
  {bab:21, pola:"KK て ください", arti:"Permintaan sopan (tolong lakukan ...)", ex:{jp:"ここに なまえを かいて ください。", id:"Tolong tulis nama di sini."}, note:"Pakai bentuk て. Negatif: KK ないで ください (tolong jangan ~)."},
  {bab:21, pola:"KK ます + ましょうか", arti:"Tawaran bantuan (boleh saya ~?)", ex:{jp:"にもつを もちましょうか。", id:"Boleh saya bawakan bawaannya?"}},
  {bab:22, pola:"KK て + も いいですか", arti:"Meminta izin (bolehkah ...?)", ex:{jp:"ここで しゃしんを とっても いいですか。", id:"Bolehkah saya foto di sini?"}, note:"Jawab izin: いいですよ / どうぞ. Menolak: ちょっと… (tidak langsung)."},
  {bab:22, pola:"KK て + は いけません", arti:"Larangan (tidak boleh ...)", ex:{jp:"ここで たばこを すっては いけません。", id:"Tidak boleh merokok di sini."}},
  {bab:22, pola:"KK て も いいです (memberi izin)", arti:"Memberi izin kepada orang lain (boleh ~)", ex:{jp:"ここで すわっても いいですよ。", id:"Boleh duduk di sini kok."}, note:"⚠️ Beda arah: 〜てもいいですか = MEMINTA izin. 〜てもいいです = MEMBERI izin. Intonasi dan konteks menentukan!"},
  {bab:23, pola:"KK て + います", arti:"Sedang ~ / keadaan berlanjut / kebiasaan", ex:{jp:"いま しんぶんを よんで います。", id:"Sekarang sedang membaca koran."}, note:"3 makna: (1) sedang berlangsung, (2) keadaan hasil tindakan (kekkon shite iru=sudah menikah), (3) kebiasaan rutin."},
  {bab:23, pola:"3 makna て います", arti:"(1) Sedang (2) Keadaan hasil (3) Kebiasaan", ex:{jp:"(1)はなしています (2)けっこんしています (3)まいにちはしっています", id:"(1)Sedang bicara (2)Sudah menikah (3)Setiap hari berlari"}, note:"⚠️ (2) = tindakan selesai tapi KEADAAN masih berlanjut. きています=sudah datang (ada di sini). しんでいます=sudah meninggal (keadaan meninggal)."},
  {bab:23, pola:"KK て いません", arti:"Belum / tidak sedang ~", ex:{jp:"まだ たべて いません。", id:"Belum makan."}, note:"て いません = negatif て います. Sering + まだ (belum) untuk keadaan yang belum terjadi."},
  {bab:24, pola:"KK て、KK て、KK", arti:"Rangkaian tindakan berurutan", ex:{jp:"おきて、かおを あらって、ごはんを たべます。", id:"Bangun, cuci muka, lalu makan."}},
  {bab:24, pola:"KK て から、KK", arti:"Setelah melakukan ~ (urutan ketat)", ex:{jp:"シャワーを あびてから、ねます。", id:"Setelah mandi, tidur."}, note:"てから=setelah selesai melakukan (urutan wajib). たあとで=setelah (lebih longgar, bisa pakai た)."},
  {bab:25, pola:"KB は KB が KS です", arti:"Ciri khusus topik (mengenai KB1, KB2-nya KS)", ex:{jp:"ぞうは はなが ながいです。", id:"Gajah, hidungnya panjang."}},
  {bab:25, pola:"KS い + くて / KS な + で + ~", arti:"Menghubungkan dua kata sifat", ex:{jp:"このへやは ひろくて、きれいです。", id:"Kamar ini luas dan bersih."}},
  {bab:26, pola:"KK ないで ください", arti:"Tolong jangan ~ (larangan sopan)", ex:{jp:"ここで はなさないで ください。", id:"Tolong jangan bicara di sini."}},
  {bab:26, pola:"KK なければ なりません", arti:"Harus ~ (kewajiban)", ex:{jp:"くすりを のまなければ なりません。", id:"Harus minum obat."}},
  {bab:26, pola:"KK なくても いいです", arti:"Tidak perlu ~ (tidak wajib)", ex:{jp:"きなくても いいです。", id:"Tidak perlu datang."}},
  {bab:27, pola:"KK(kamus) こと が できます", arti:"Kemampuan (bisa melakukan ~)", ex:{jp:"にほんごで はなす ことが できます。", id:"Bisa berbicara dalam bahasa Jepang."}},
  {bab:27, pola:"<ruby>趣味<rt>しゅみ</rt></ruby>は KK(kamus) こと です", arti:"Mengungkapkan hobi", ex:{jp:"しゅみは えを かく ことです。", id:"Hobi saya menggambar."}},
  {bab:28, pola:"KK た ことが あります", arti:"Pengalaman (pernah ~)", ex:{jp:"にほんへ いった ことが あります。", id:"Saya pernah pergi ke Jepang."}},
  {bab:28, pola:"KK たり、KK たり します", arti:"Beberapa contoh kegiatan (antara lain ~)", ex:{jp:"どようびは えいがを みたり、ほんを よんだり します。", id:"Sabtu antara lain nonton film, baca buku."}},
  {bab:29, pola:"KK(kamus) まえに、KK", arti:"Sebelum melakukan ~ (tindakan belum terjadi)", ex:{jp:"ねる まえに、はを みがきます。", id:"Sebelum tidur, sikat gigi."}},
  {bab:29, pola:"KK た あとで、KK", arti:"Setelah melakukan ~ (tindakan sudah terjadi)", ex:{jp:"ごはんを たべた あとで、さんぽします。", id:"Setelah makan, jalan-jalan."}},
  {bab:29, pola:"KB の まえに / KB の あとで", arti:"Sebelum/setelah KB (bukan kata kerja)", ex:{jp:"しごとの まえに、コーヒーを のみます。", id:"Sebelum kerja, minum kopi."}, note:"まえに/あとで bisa pakai KB langsung (tanpa KK). KK+まえに → KK bentuk kamus. KK+あとで → KK bentuk た."},
  {bab:30, pola:"Ragam bahasa biasa (<ruby>普通体<rt>ふつうたい</rt></ruby>)", arti:"KK/KS tanpa です/ます, dipakai dengan teman/buku harian", ex:{jp:"きょう、どこいく？", id:"Hari ini mau ke mana? (santai)"}},
  {bab:30, pola:"Tabel perubahan ragam biasa", arti:"Semua jenis: KB/KSな/KSい/KK → bentuk biasa", ex:{jp:"がくせいだ/きれいだ/たかい/たべる", id:"(biasa) siswa/cantik/mahal/makan"}, note:"KB: です→だ/じゃない/だった/じゃなかった | KSな: です→だ/じゃない/だった/じゃなかった | KSい: そのまま/くない/かった/くなかった | KK: ます→ない<ruby>形<rt>けい</rt></ruby>/た<ruby>形<rt>けい</rt></ruby>/<ruby>辞書形<rt>じしょけい</rt></ruby>"},
  {bab:30, pola:"〜んです / 〜のです", arti:"Penjelasan/klarifikasi konteks (soalnya ~ / karena ~)", ex:{jp:"どうしたんですか。あたまが いたいんです。", id:"Ada apa? Soalnya kepala saya sakit."}, note:"んです = のです (<ruby>口語<rt>こうご</rt></ruby>). Dipakai saat memberikan atau meminta penjelasan. Bukan sekedar fakta, tapi ada konteks/alasan di baliknya. → Diperluas di Bab 40 (んですが, pengantar permintaan)."},
  {bab:31, pola:"[Bentuk biasa] と <ruby>思<rt>おも</rt></ruby>います", arti:"Menyatakan pendapat/perkiraan (saya pikir ~)", ex:{jp:"あしたは あめだと おもいます。", id:"Saya pikir besok hujan."}},
  {bab:31, pola:"[Bentuk biasa] と <ruby>言<rt>い</rt></ruby>います", arti:"Melaporkan ucapan orang lain (dia berkata ~)", ex:{jp:"やまださんは くると いいました。", id:"Yamada bilang akan datang."}},
  {bab:32, pola:"[KK/KS/KB(biasa)] + KB", arti:"Kata kerja/sifat memodifikasi kata benda (relatif clause)", ex:{jp:"きのう かった ほん", id:"buku yang dibeli kemarin"}},
  {bab:32, pola:"KK て いる + KB", arti:"Orang/benda yang sedang melakukan ~ (memodifikasi KB)", ex:{jp:"むこうで はなして いる ひとは だれですか。", id:"Orang yang sedang bicara di sana itu siapa?"}, note:"て いる = diubah bentuk biasa → て いる + KB. Menggambarkan KB yang sedang dalam kondisi/keadaan tersebut."},
  {bab:33, pola:"KK(kamus/た) + とき、KK", arti:"Ketika ~ (saat akan / setelah melakukan)", ex:{jp:"こどもの とき、よく あそびました。", id:"Waktu kecil, sering bermain."}},
  {bab:33, pola:"KK る とき vs KK た とき", arti:"Perbedaan waktu tindakan utama vs klausa とき", ex:{jp:"にほんへ いく とき、かいます。↔ にほんへ いった とき、かいました。", id:"Sebelum pergi ke Jepang, beli. ↔ Setelah sampai di Jepang, beli."}, note:"⚠️ KKる とき = tindakan di とき BELUM terjadi (mau pergi, tapi belum). KKた とき = tindakan di とき SUDAH terjadi (sudah tiba di Jepang)."},
  {bab:34, pola:"KS い → く / KS な → に / KB → に + なります", arti:"Menjadi ~ (menyatakan perubahan)", ex:{jp:"さむく なりました。", id:"Menjadi dingin."}},
  {bab:34, pola:"KS く/に + します", arti:"Membuat (sesuatu) menjadi ~ (perubahan disengaja)", ex:{jp:"へやを きれいに します。", id:"Membuat kamar menjadi bersih."}, note:"⚠️ なります = berubah sendiri (alami). します = ada yang mengubahnya (disengaja). Bandingkan: さむく なる (jadi dingin) vs さむく する (bikin dingin)."},
  {bab:34, pola:"KS く/に + なりたい", arti:"Ingin menjadi ~", ex:{jp:"にほんごが じょうずに なりたいです。", id:"Ingin menjadi pandai bahasa Jepang."}, note:"なりたい = なります + たい. Menggabungkan konsep なります (bab 34) dengan たい (bab 19)."},
  {bab:35, pola:"くれます", arti:"Orang lain memberikan sesuatu kepada saya", ex:{jp:"ともだちが ほんを くれました。", id:"Teman memberi saya buku."}},
  {bab:35, pola:"KK て + あげます / もらいます / くれます", arti:"Memberi/menerima tindakan (manfaat mengalir)", ex:{jp:"おしえて あげます。", id:"(Saya) mengajari (untuk kamu)."}},
  {bab:35, pola:"Diagram arah あげます/もらいます/くれます", arti:"Siapa yang beri ke siapa?", ex:{jp:"わたし→ひと: あげます | ひと→わたし: くれます | わたし←ひと(もらう): もらいます", id:"Saya→orang: あげます | orang→saya: くれます | saya terima dari orang: もらいます"}, note:"⚠️ くれます = SELALU orang lain yang memberi KE saya/kelompok saya. わたし tidak bisa jadi subjek くれます. Gunakan あげます jika saya yang memberi."},
  {bab:36, pola:"KK kamus + と、〜", arti:"Kalau…, maka…. (kondisi alami/otomatis)", ex:{jp:"このボタンを <ruby>押<rt>お</rt></ruby>すと、おつりが <ruby>出<rt>で</rt></ruby>ます。", id:"Kalau menekan tombol ini, kembalian keluar."}, note:"⚠️ Klausa setelah と TIDAK boleh berisi keinginan (~たい), ajakan (~ましょう), atau permintaan (~てください). Gunakan たら untuk kasus itu."},
  {bab:36, pola:"〜と petunjuk arah", arti:"Kalau jalan/belok/menyeberang…, ada…", ex:{jp:"あの <ruby>交差点<rt>こうさてん</rt></ruby>を まっすぐ <ruby>行<rt>い</rt></ruby>くと、スーパーが あります。", id:"Kalau jalan lurus di persimpangan itu, ada supermarket."}, note:"Digunakan untuk petunjuk arah dan menjelaskan cara kerja alat/mesin."},
  {bab:37, pola:"〜たら、〜 (kondisional)", arti:"Kalau 〜 (kondisi hipotetis)", ex:{jp:"もし 1<ruby>億円<rt>おくえん</rt></ruby> あったら、<ruby>家<rt>いえ</rt></ruby>を <ruby>買<rt>か</rt></ruby>いたいです。", id:"Kalau ada 100 juta yen, ingin beli rumah."}, note:"Bentuk: lampau biasa + ら. Bisa diikuti keinginan (~たい), ajakan (~ましょう), permintaan (~てください). もし + たら = menekankan kondisi hipotetis."},
  {bab:38, pola:"KK たら、〜 (temporal)", arti:"Setelah/Ketika/Saat… (urutan kejadian pasti)", ex:{jp:"<ruby>駅<rt>えき</rt></ruby>に <ruby>着<rt>つ</rt></ruby>いたら、<ruby>電話<rt>でんわ</rt></ruby>して ください。", id:"Setelah tiba di stasiun, tolong telepon."}, note:"Berbeda dari たら kondisional (bab 37): di sini kejadian pada klausa たら PASTI akan terjadi. Menekankan urutan waktu."},
  {bab:39, pola:"〜ても、〜", arti:"Walaupun 〜 (berlawanan harapan)", ex:{jp:"<ruby>高<rt>たか</rt></ruby>くても、この<ruby>車<rt>くるま</rt></ruby>を <ruby>買<rt>か</rt></ruby>います。", id:"Walaupun mahal, akan membeli mobil ini."}, note:"KK bentuk て+も | KS い: ~くても | KS な: ~でも | KB: ~でも. いくら〜ても = bagaimanapun caranya... tetap..."},
  {bab:40, pola:"〜んです", arti:"Alasannya adalah…; Faktanya adalah…", ex:{jp:"A:どうしたんですか。B:<ruby>気分<rt>きぶん</rt></ruby>が <ruby>悪<rt>わる</rt></ruby>いんです。", id:"A: Ada apa? B: Badan saya sedang tidak enak."}, note:"KK/KS い (bentuk biasa) + んです. KS な: だ→な+んです. KB: だ→な+んです. Digunakan untuk menjelaskan alasan, kondisi, atau meminta penjelasan."},
  {bab:41, pola:"〜んですが、〜", arti:"Soalnya ~ (pengantar menuju permintaan/pertanyaan)", ex:{jp:"<ruby>日本語<rt>にほんご</rt></ruby>で メールを <ruby>書<rt>か</rt></ruby>いたんですが、<ruby>見<rt>み</rt></ruby>て いただけませんか。", id:"Saya menulis email dalam bahasa Jepang, bisakah Anda memeriksanya?"}, note:"んですが = んです + が (pengantar). Digunakan untuk menyampaikan latar belakang sebelum permintaan/pertanyaan. Lebih sopan dari langsung bertanya."},
  {bab:41, pola:"〜て いただけませんか", arti:"Bisakah Anda ~? (permintaan sangat sopan)", ex:{jp:"ちょっと <ruby>見<rt>み</rt></ruby>て いただけませんか。", id:"Bisakah Anda sedikit memeriksanya?"}, note:"Lebih sopan dari 〜てください. Pola: KK bentuk て + いただけませんか. Digunakan kepada atasan atau orang yang tidak dikenal."},
  {bab:41, pola:"〜たら いいですか", arti:"Sebaiknya ~? / Bagaimana caranya ~? (meminta saran)", ex:{jp:"どうやって <ruby>行<rt>い</rt></ruby>ったら いいですか。", id:"Bagaimana cara terbaik untuk pergi ke sana?"}, note:"Digunakan untuk meminta saran atau petunjuk cara terbaik. Sering digabung dengan どうやって."},
  {bab:42, pola:"<ruby>可能動詞<rt>かのうどうし</rt></ruby> — KB が KK-potensial", arti:"Bisa melakukan ~ (kemampuan)", ex:{jp:"わたしは <ruby>日本語<rt>にほんご</rt></ruby>が <ruby>話<rt>はな</rt></ruby>せます。", id:"Saya bisa berbicara bahasa Jepang."}, note:"Konjugasi: Grup I: u→eru (のむ→のめる). Grup II: +られる (たべる→たべられる). Grup III: くる→こられる, する→できる. Partikel objek: を→が."},
  {bab:42, pola:"KB/Bilangan しか KK ません", arti:"Hanya ~ saja (eksklusif negatif)", ex:{jp:"ひらがなしか <ruby>読<rt>よ</rt></ruby>めません。", id:"Hanya bisa membaca hiragana."}, note:"しか selalu diikuti bentuk NEGATIF. Nuansa: terbatas/kurang (lebih kuat dari だけ). だけ=hanya (netral), しか+ない=hanya (menyiratkan kurang/terbatas)."},
  {bab:42, pola:"KB₁ は 〜が、KB₂ は 〜 (perbandingan)", arti:"Penggunaan は untuk mengontraskan dua hal", ex:{jp:"ひらがなは <ruby>読<rt>よ</rt></ruby>めますが、カタカナは <ruby>読<rt>よ</rt></ruby>めません。", id:"Bisa membaca hiragana, tapi tidak bisa membaca katakana."}, note:"は tidak hanya topik, tapi bisa mengontraskan. Dua は dalam satu kalimat = perbandingan."},
  {bab:43, pola:"KK1 ます(stem) + ながら + KK2", arti:"Sambil ~ (dua tindakan bersamaan)", ex:{jp:"<ruby>音楽<rt>おんがく</rt></ruby>を <ruby>聞<rt>き</rt></ruby>きながら、<ruby>勉強<rt>べんきょう</rt></ruby>します。", id:"Belajar sambil mendengarkan musik."}, note:"Tindakan utama ada di KK2. ⚠️ ながら=bersamaan, て=berurutan."},
  {bab:43, pola:"KB が <ruby>見<rt>み</rt></ruby>えます / <ruby>聞<rt>き</rt></ruby>こえます", arti:"Terlihat / terdengar (secara alami)", ex:{jp:"<ruby>窓<rt>まど</rt></ruby>から <ruby>富士山<rt>ふじさん</rt></ruby>が <ruby>見<rt>み</rt></ruby>えます。", id:"Gunung Fuji terlihat dari jendela."}, note:"⚠️ <ruby>見<rt>み</rt></ruby>ます=melihat aktif. <ruby>見<rt>み</rt></ruby>えます=terlihat alami. <ruby>聞<rt>き</rt></ruby>きます=mendengar aktif. <ruby>聞<rt>き</rt></ruby>こえます=terdengar alami."},
  {bab:43, pola:"KB が できます (selesai/dibangun)", arti:"Selesai dibuat / dibangun", ex:{jp:"<ruby>家<rt>いえ</rt></ruby>の <ruby>近<rt>ちか</rt></ruby>くに <ruby>映画館<rt>えいがかん</rt></ruby>が できます。", id:"Bioskop akan dibangun dekat rumah."}, note:"Makna khusus: bukan kemampuan, tapi terwujud/selesai dibangun. Berbeda dari できます=bisa (kemampuan)."},
  {bab:44, pola:"KK1 bentuk て/ないで + KK2", arti:"Dengan cara ~ / Tanpa ~ (cara melakukan sesuatu)", ex:{jp:"ソースを つけて <ruby>食<rt>た</rt></ruby>べます。/ ソースを つけないで <ruby>食<rt>た</rt></ruby>べます。", id:"Makan dengan saus. / Makan tanpa saus."}, note:"て = KK1 adalah cara/kondisi melakukan KK2. ないで = tanpa melakukan KK1. ⚠️ ながら=simultan, て/ないで=cara."},
  {bab:45, pola:"<ruby>自動詞<rt>じどうし</rt></ruby> と <ruby>他動詞<rt>たどうし</rt></ruby>", arti:"Kata kerja intransitif (が) vs transitif (を)", ex:{jp:"<ruby>電気<rt>でんき</rt></ruby>を つけます。/ <ruby>電気<rt>でんき</rt></ruby>が つきます。", id:"Menyalakan lampu. (transitif) / Lampu menyala. (intransitif)"}, note:"⚠️ <ruby>自動詞<rt>じどうし</rt></ruby>=perubahan spontan (が), <ruby>他動詞<rt>たどうし</rt></ruby>=ada pelaku (を). Pasangan: つく↔つける, きえる↔けす, あく↔あける, しまる↔しめる, とまる↔とめる."},
  {bab:45, pola:"KK-intransitif て います", arti:"Keadaan yang dihasilkan dari tindakan (kondisi berlanjut)", ex:{jp:"<ruby>教室<rt>きょうしつ</rt></ruby>の エアコンが ついて います。", id:"AC di kelas sedang menyala (dalam kondisi menyala)."}, note:"⚠️ KK-transitif てます=sedang melakukan. KK-intransitif てます=keadaan hasil. ドアをあけています (sedang buka) vs ドアがあいています (pintu kondisi terbuka)."},
  {bab:46, pola:"KK-て + しまいました ① (Penyelesaian)", arti:"Sudah selesai melakukan ~ (tuntas)", ex:{jp:"<ruby>図書館<rt>としょかん</rt></ruby>の <ruby>本<rt>ほん</rt></ruby>を <ruby>読<rt>よ</rt></ruby>んで しまいました。", id:"Sudah selesai membaca buku pinjaman perpustakaan."}, note:"Menekankan tindakan sudah BENAR-BENAR selesai. 〜て しまいます = akan selesai di waktu depan. Informal: ちゃいました / じゃいました."},
  {bab:46, pola:"KK-て + しまいました ② (Penyesalan)", arti:"Tidak sengaja ~ / Terlanjur ~ (disayangkan)", ex:{jp:"どこかで パスポートを <ruby>落<rt>お</rt></ruby>として しまいました。", id:"Tidak sengaja menjatuhkan paspor di suatu tempat."}, note:"Nuansa penyesalan/tidak disengaja. Konteks menentukan makna ①②. Informal: ちゃいました. Contoh penyesalan: <ruby>財布<rt>さいふ</rt></ruby>を なくしちゃいました."},
  {bab:47, pola:"KK-て + おきます", arti:"Melakukan ~ terlebih dahulu (persiapan)", ex:{jp:"<ruby>会議<rt>かいぎ</rt></ruby>の まえに <ruby>資料<rt>しりょう</rt></ruby>を <ruby>読<rt>よ</rt></ruby>んで おいて ください。", id:"Tolong baca dokumen sebelum rapat."}, note:"Digunakan untuk tindakan PERSIAPAN sebelum kejadian mendatang. Informal: ておく → とく. ておいてください → といてください."},
  {bab:48, pola:"KB が KK-transitif て あります", arti:"Sudah ~ (keadaan hasil tindakan sengaja)", ex:{jp:"<ruby>壁<rt>かべ</rt></ruby>に <ruby>時計<rt>とけい</rt></ruby>が <ruby>掛<rt>か</rt></ruby>けて あります。", id:"Jam sudah digantungkan di dinding."}, note:"⚠️ てあります vs ています: てあります=ada pelaku sengaja (transitif+が), ています=keadaan alami (intransitif+が). ポスターが <ruby>貼<rt>は</rt></ruby>ってあります (sengaja ditempel) vs ドアが <ruby>開<rt>あ</rt></ruby>いています (terbuka alami)."},
  {bab:49, pola:"<ruby>意向形<rt>いこうけい</rt></ruby> (Bentuk Maksud)", arti:"Ayo ~ / Mari ~ (ajakan diri sendiri)", ex:{jp:"ちょっと <ruby>休<rt>やす</rt></ruby>まない？ うん、<ruby>休<rt>やす</rt></ruby>もう。", id:"Istirahat sebentar yuk? Iya, ayo istirahat."}, note:"Konjugasi: Gol.I ます→お (のみます→のもう). Gol.II ます→よう (たべます→たべよう). Gol.III: きます→こよう, します→しよう. Bentuk sederhana dari 〜ましょう (bab 10). Ragam biasa pertama kali diperkenalkan di Bab 30."},
  {bab:49, pola:"<ruby>意向形<rt>いこうけい</rt></ruby> + と <ruby>思<rt>おも</rt></ruby>って います", arti:"Saya bermaksud / berniat ~ ", ex:{jp:"<ruby>連休<rt>れんきゅう</rt></ruby>に <ruby>旅行<rt>りょこう</rt></ruby>しようと <ruby>思<rt>おも</rt></ruby>って います。", id:"Saya berniat pergi liburan saat liburan panjang."}, note:"Menyatakan niat/rencana yang MASIH dalam pikiran (belum pasti). Lebih lunak dari つもりです. ⚠️ <ruby>思<rt>おも</rt></ruby>っています (sedang berniat) vs <ruby>思<rt>おも</rt></ruby>います (baru saja berpikir)."},
  {bab:49, pola:"まだ + KK-て いません", arti:"Masih belum ~ (belum dilakukan)", ex:{jp:"<ruby>作文<rt>さくぶん</rt></ruby>は まだ <ruby>書<rt>か</rt></ruby>いて いません。", id:"Karangan masih belum ditulis."}, note:"まだ+negative = belum. もう+positive = sudah. ⚠️ もう <ruby>食<rt>た</rt></ruby>べましたか → まだ <ruby>食<rt>た</rt></ruby>べていません (A: Sudah makan? B: Belum makan)."},
  {bab:50, pola:"KK-kamus + つもりです", arti:"Saya berniat / bertekad untuk ~", ex:{jp:"<ruby>来年<rt>らいねん</rt></ruby> <ruby>車<rt>くるま</rt></ruby>を <ruby>買<rt>か</rt></ruby>う つもりです。", id:"Saya berniat membeli mobil tahun depan."}, note:"Niat pribadi yang sudah cukup PASTI. Negasi: KK-ない + つもりです (tidak berniat). ⚠️ つもり=tekad pribadi, <ruby>予定<rt>よてい</rt></ruby>=jadwal lebih objektif."},
  {bab:50, pola:"KK-kamus + <ruby>予定<rt>よてい</rt></ruby>です / KB の + <ruby>予定<rt>よてい</rt></ruby>です", arti:"Berencana untuk ~ / Dijadwalkan ~", ex:{jp:"<ruby>電車<rt>でんしゃ</rt></ruby>は 12<ruby>時<rt>じ</rt></ruby>に <ruby>着<rt>つ</rt></ruby>く <ruby>予定<rt>よてい</rt></ruby>です。", id:"Kereta dijadwalkan tiba jam 12."}, note:"Rencana yang sudah TERJADWAL/terencana (paling pasti di antara pola niat). KB の <ruby>予定<rt>よてい</rt></ruby>: <ruby>来週<rt>らいしゅう</rt></ruby> <ruby>出張<rt>しゅっちょう</rt></ruby>の <ruby>予定<rt>よてい</rt></ruby>です (Minggu depan ada dinas). ⚠️ つもり<<ruby>予定<rt>よてい</rt></ruby> dalam tingkat kepastian."},
  {bab:51, pola:"KK-た + ほうが いいです", arti:"Sebaiknya lakukan ~ (saran positif)", ex:{jp:"<ruby>早<rt>はや</rt></ruby>く <ruby>寝<rt>ね</rt></ruby>た ほうが いいです。", id:"Sebaiknya segera tidur."}, note:"Pakai KK bentuk た, BUKAN bentuk kamus. ⚠️ <ruby>食<rt>た</rt></ruby>べる ほうがいい (✗) → <ruby>食<rt>た</rt></ruby>べた ほうがいい (✓). Tersirat: akan buruk jika tidak melakukan saran tersebut."},
  {bab:51, pola:"KK-ない + ほうが いいです", arti:"Sebaiknya jangan ~ (saran negatif/larangan halus)", ex:{jp:"<ruby>寝<rt>ね</rt></ruby>る まえに スマホを <ruby>見<rt>み</rt></ruby>ない ほうが いいです。", id:"Sebaiknya jangan lihat HP sebelum tidur."}, note:"Lebih halus dari ないでください. ⚠️ ほうがいいです = saran; てください = perintah langsung. Gunakan ほうがいいです saat menyarankan, bukan memerintah."},
  {bab:52, pola:"[Bentuk biasa] + かも しれません", arti:"Mungkin saja ~ (ketidakpastian ~50%)", ex:{jp:"<ruby>今夜<rt>こんや</rt></ruby> <ruby>雪<rt>ゆき</rt></ruby>が <ruby>降<rt>ふ</rt></ruby>る かも しれません。", id:"Malam ini mungkin saja turun salju."}, note:"KK/KS い = bentuk biasa langsung. KS な/KB: hilangkan だ sebelum かもしれません. ⚠️ きれいだかもしれません (✗) → きれいかもしれません (✓)."},
  {bab:52, pola:"[Bentuk biasa] + でしょう", arti:"Akan ~ / Sudah pasti ~ (perkiraan lebih yakin ~70-80%)", ex:{jp:"<ruby>午後<rt>ごご</rt></ruby>から <ruby>強<rt>つよ</rt></ruby>い <ruby>風<rt>かぜ</rt></ruby>が <ruby>吹<rt>ふ</rt></ruby>く でしょう。", id:"Sore ini angin kencang akan bertiup."}, note:"Lebih yakin dari かもしれません. Sering dipakai dalam siaran cuaca. Bentuk kasual: だろう. KS な/KB: hilangkan だ → きれいでしょう."},
  {bab:53, pola:"[Bentuk biasa] し、[Bentuk biasa] し、それに ~", arti:"Selain itu ~ / Lagi pula ~ (beberapa alasan sekaligus)", ex:{jp:"<ruby>値段<rt>ねだん</rt></ruby>も <ruby>安<rt>やす</rt></ruby>いし、<ruby>味<rt>あじ</rt></ruby>も いいし、いつも この <ruby>店<rt>みせ</rt></ruby>で <ruby>食<rt>た</rt></ruby>べています。", id:"Harganya murah dan rasanya enak, jadi selalu makan di sini."}, note:"し menyebutkan beberapa alasan/fakta sejajar. ⚠️ Beda dengan から (satu sebab langsung). KS な/KB: きれいだし / 学生だし. それに = tambahan poin ketiga yang memperkuat."},
  {bab:54, pola:"KK [bentuk ば] + ~", arti:"Jika (KK) ~, maka ~ (kondisi alami/logis)", ex:{jp:"<ruby>毎日<rt>まいにち</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby>で <ruby>話<rt>はな</rt></ruby>せば、<ruby>上手<rt>じょうず</rt></ruby>に なります。", id:"Kalau berbicara bahasa Jepang setiap hari, akan menjadi mahir."}, note:"Bentuk ば: Grup I (〜う→〜えば): のむ→のめば. Grup II (〜る→〜れば): たべる→たべれば. Grup III: くる→くれば / する→すれば. Negatif: ない→なければ. ⚠️ ば tidak bisa diikuti keinginan/perintah langsung (〜たい, 〜てください)."},
  {bab:55, pola:"KS い [〜ければ] / KS な・KB [〜なら] + ~", arti:"Jika (KS/KB) ~, maka ~ (kondisi dengan kata sifat/benda)", ex:{jp:"<ruby>暑<rt>あつ</rt></ruby>ければ、エアコンを つけてください。", id:"Kalau panas, tolong nyalakan AC."}, note:"KS い: あつい→あつければ. ⚠️ いい→よければ (tidak teratur!). KS な/KB: きれいなら / あめなら. Negatif KS い: あつくなければ. Negatif KS な/KB: きれいじゃなければ."},
  {bab:55, pola:"KB + なら、~", arti:"Kalau memang soal ~ (merespons konteks lawan bicara)", ex:{jp:"<ruby>花見<rt>はなみ</rt></ruby>なら、<ruby>上野公園<rt>うえのこうえん</rt></ruby>が いいですよ。", id:"Kalau hanami, Taman Ueno cocok!"}, note:"KB なら dipakai saat merespons sesuatu yang baru saja dikatakan lawan bicara. ⚠️ Beda dengan ば (kondisi umum) dan たら (kondisi hipotesis/urutan waktu). なら = 'kalau memang itu yang kamu maksud'."},
  {bab:56, pola:"KK kamus/ない + ように、KK", arti:"Agar ~ / Supaya ~ (tujuan)", ex:{jp:"<ruby>感染<rt>かんせん</rt></ruby>しない ように、よく <ruby>手<rt>て</rt></ruby>を <ruby>洗<rt>あら</rt></ruby>いましょう。", id:"Agar tidak tertular, mari rajin cuci tangan."}, note:"KK sebelum ように: pakai bentuk kamus (potensial) untuk tujuan positif, bentuk ない untuk menghindari sesuatu. KK non-kehendak (わかる、みえる、きこえる) selalu pakai bentuk kamus."},
  {bab:56, pola:"KK potensial + ように なりました", arti:"Menjadi bisa ~ (perubahan kemampuan tercapai)", ex:{jp:"<ruby>漢字<rt>かんじ</rt></ruby>が <ruby>少<rt>すこ</rt></ruby>し <ruby>読<rt>よ</rt></ruby>める ように なりました。", id:"Sekarang sudah bisa membaca sedikit kanji."}, note:"Menyatakan perubahan kemampuan yang sudah tercapai. ⚠️ Beda dengan ように して います (Bab 57) yang menyatakan usaha sedang berlangsung, bukan hasil."},
  {bab:57, pola:"KK kamus/ない + ように して います", arti:"Sedang berusaha membiasakan ~ (proses berlangsung)", ex:{jp:"できるだけ 11<ruby>時<rt>じ</rt></ruby>までに <ruby>寝<rt>ね</rt></ruby>る ように して います。", id:"Saya berusaha tidur sebelum jam 11 sebisa mungkin."}, note:"Menyatakan usaha membentuk kebiasaan yang masih berlangsung. ⚠️ ように して います = proses (belum selesai). ように なりました = hasil (sudah tercapai). Keduanya berasal dari ように yang sama."},
  {bab:57, pola:"KK kamus/ない + ように して ください", arti:"Mohon usahakan ~ (permintaan tidak langsung, lebih sopan)", ex:{jp:"<ruby>面接<rt>めんせつ</rt></ruby>のとき、<ruby>丁寧<rt>ていねい</rt></ruby>な <ruby>言葉<rt>ことば</rt></ruby>で <ruby>話<rt>はな</rt></ruby>す ように して ください。", id:"Saat wawancara, mohon usahakan berbicara dengan sopan."}, note:"Lebih sopan dari てください. Cocok untuk meminta perubahan kebiasaan (bukan tindakan tunggal). ⚠️ てください = perintah langsung 1 tindakan. ように して ください = mohon jadikan kebiasaan."},
  {bab:58, pola:"KB1 は KB2 に KK<ruby>受身形<rt>うけみけい</rt></ruby>", arti:"KB1 menerima tindakan dari KB2 (pasif langsung)", ex:{jp:"（わたしは）<ruby>先生<rt>せんせい</rt></ruby>に <ruby>叱<rt>しか</rt></ruby>られました。", id:"Saya dimarahi oleh guru."}, note:"Partikel に = pelaku. Nuansa: KB1 sering merasakan dampak (positif maupun negatif). ⚠️ Pasif kepemilikan: KB1 は KB2 に KB3 を KK pasif → orang 2 melakukan sesuatu pada milik orang 1 (mengganggu)."},
  {bab:58, pola:"KB1 は KB2 に KK pasif", arti:"KB1 menerima tindakan dari KB2 (pasif langsung)", ex:{jp:"（わたしは）<ruby>先生<rt>せんせい</rt></ruby>に <ruby>叱<rt>しか</rt></ruby>られました。", id:"Saya dimarahi oleh guru."}, note:"Partikel に = pelaku. Nuansa: KB1 sering merasakan dampak (positif maupun negatif). ⚠️ Pasif kepemilikan: KB1 は KB2 に KB3 を KK pasif → orang 2 melakukan sesuatu pada milik orang 1 (mengganggu)."},
  {bab:59, pola:"KB が/は KK pasif (tanpa pelaku / dengan によって)", arti:"~ di-KK (pasif impersonal/objektif)", ex:{jp:"インスタントラーメンは 1958<ruby>年<rt>ねん</rt></ruby>に <ruby>発明<rt>はつめい</rt></ruby>されました。", id:"Mie instan ditemukan pada tahun 1958."}, note:"Dipakai saat pelaku tidak penting/tidak diketahui, atau untuk fakta umum/sejarah. Pelaku bisa ditambah dengan によって: ~によって KK pasif. ⚠️ によって (karya/ciptaan) vs に (tindakan langsung)."},
  {bab:60, pola:"KK-kamus のは KS です", arti:"(Melakukan) ~ itu KS (nominalisasi sebagai topik)", ex:{jp:"<ruby>早<rt>はや</rt></ruby>く <ruby>散歩<rt>さんぽ</rt></ruby>する のは <ruby>気持<rt>きも</rt></ruby>ちが いいです。", id:"Berjalan pagi itu terasa menyenangkan."}, note:"の mengubah KK menjadi KB (nominalisasi). KK の は = topik kalimat. KS yang sering mengikuti: むずかしい、たのしい、おもしろい、たいへん. ⚠️ のは (topik) vs のが (objek KS preferensi/kemampuan)."},
  {bab:60, pola:"KK-kamus のが KS です", arti:"(Melakukan) ~ itu KS (nominalisasi sebagai objek KS)", ex:{jp:"<ruby>音楽<rt>おんがく</rt></ruby>を <ruby>聞<rt>き</rt></ruby>く のが <ruby>好<rt>す</rt></ruby>きです。", id:"Saya suka mendengarkan musik."}, note:"KK の が = objek kata sifat preferensi/kemampuan. KS yang mengikuti: すき、きらい、じょうず、へた、はやい、おそい. ⚠️ のが (preferensi/kemampuan) vs のは (penilaian/deskripsi topik)."},
  {bab:61, pola:"KK [bentuk biasa] のを わすれました", arti:"Lupa melakukan ~", ex:{jp:"<ruby>部屋<rt>へや</rt></ruby>の <ruby>電気<rt>でんき</rt></ruby>を <ruby>消<rt>け</rt></ruby>すのを <ruby>忘<rt>わす</rt></ruby>れました。", id:"Saya lupa mematikan lampu kamar."}, note:"の sebagai nominalizer menjadikan KK sebagai objek (ditandai を) dari わすれました / しっています. ⚠️ のを わすれました (lupa melakukan) vs KB を わすれました (lupa membawa benda)."},
  {bab:61, pola:"KK [bentuk biasa] のを しっていますか", arti:"Apakah kamu tahu bahwa ~?", ex:{jp:"<ruby>畑野先生<rt>はたのせんせい</rt></ruby>に <ruby>赤<rt>あか</rt></ruby>ちゃんが <ruby>生<rt>う</rt></ruby>まれたのを <ruby>知<rt>し</rt></ruby>っていますか。", id:"Apakah kamu tahu bahwa Ibu Hatano melahirkan bayi?"}, note:"KK bentuk biasa + のを + しっています = tahu bahwa ~. Negatif: しりません (bukan しっていません)."},
  {bab:62, pola:"KK-て / KS-くて / KS-で、〜", arti:"Karena/ketika ~ (sebab→akibat non-kehendak)", ex:{jp:"<ruby>試験<rt>しけん</rt></ruby>に <ruby>合格<rt>ごうかく</rt></ruby>できなくて、がっかりしました。", id:"Karena tidak lulus ujian, saya kecewa."}, note:"Pola 〜て menyatakan sebab. Bagian akhir = pernyataan non-kehendak (emosi, keadaan). KK → て-form, KS い → くて, KS な/KB → で. ⚠️ Berbeda dari て yang menyatakan urutan tindakan."},
  {bab:62, pola:"KB で〜", arti:"Karena KB (penyebab fenomena/peristiwa)", ex:{jp:"<ruby>地震<rt>じしん</rt></ruby>で ビルが <ruby>倒<rt>たお</rt></ruby>れました。", id:"Karena gempa, gedung runtuh."}, note:"Partikel で setelah kata benda menyatakan penyebab fenomena alam (じしん、たいふう、かじ) atau peristiwa. Berbeda dengan て-form yang memakai kata kerja."},
  {bab:63, pola:"[bentuk biasa] ので、〜", arti:"Karena ~ (alasan sopan)", ex:{jp:"<ruby>漢字<rt>かんじ</rt></ruby>が わからない ので、ひらがなで <ruby>書<rt>か</rt></ruby>いて いただけませんか。", id:"Karena tidak mengerti kanji, bisakah ditulis dengan hiragana?"}, note:"ので menunjukkan sebab dan akibat yang logis. Lebih sopan dari から. KS な/KB + なので. Cocok untuk meminta izin dengan halus. ⚠️ ので (objektif/sopan) vs から (subjektif/langsung)."},
  {bab:64, pola:"interogatif + [bentuk biasa] か、〜", arti:"(menanyakan) kapan/di mana/siapa/apa ~ (pertanyaan terbenam)", ex:{jp:"<ruby>明日<rt>あした</rt></ruby> <ruby>何時<rt>なんじ</rt></ruby>に <ruby>出発<rt>しゅっぱつ</rt></ruby>する か、<ruby>教<rt>おし</rt></ruby>えて ください。", id:"Tolong beritahu jam berapa kita berangkat besok."}, note:"Pertanyaan terbenam dengan kata tanya. Struktur: kata tanya + KK/KS/KB bentuk biasa + か + klausa utama. ⚠️ Tidak pakai tanda tanya (？) di tengah kalimat."},
  {bab:64, pola:"[bentuk biasa] か どうか、〜", arti:"Apakah ~ atau tidak (pertanyaan terbenam ya/tidak)", ex:{jp:"<ruby>間違い<rt>まちがい</rt></ruby>が ない か どうか、もう<ruby>一度<rt>いちど</rt></ruby> よく <ruby>見<rt>み</rt></ruby>て ください。", id:"Tolong periksa apakah ada kesalahan atau tidak."}, note:"Dipakai saat tidak ada kata tanya. KK/KS/KB bentuk biasa + か どうか + klausa utama. ⚠️ か (dengan kata tanya) vs か どうか (tanpa kata tanya/ya-tidak)."},
  {bab:64, pola:"KK [て-form] みます", arti:"Akan mencoba melakukan ~ (untuk pertama kali/coba-coba)", ex:{jp:"いつか <ruby>日本<rt>にほん</rt></ruby>の お<ruby>祭り<rt>まつり</rt></ruby>に <ruby>参加<rt>さんか</rt></ruby>して みたいです。", id:"Suatu saat saya ingin mencoba ikut festival Jepang."}, note:"Menyatakan niat mencoba sesuatu yang belum pernah dilakukan. て-form + みます. みたい = ingin mencoba. みましょう = ayo coba."},
  {bab:65, pola:"KB1 に KB2 を いただきます", arti:"Menerima KB2 dari KB1 (berstatus lebih tinggi)", ex:{jp:"<ruby>先生<rt>せんせい</rt></ruby>に <ruby>本<rt>ほん</rt></ruby>を いただきました。", id:"Saya menerima buku dari guru."}, note:"いただきます = menerima (bentuk sopan dari もらいます). Pemberi berstatus lebih tinggi dari penerima. Partikel に menandai pemberi. ⚠️ いただきます (saya menerima) vs くださいます (mereka memberi kepada saya)."},
  {bab:65, pola:"（わたしに）KB を くださいます", arti:"(Orang status lebih tinggi) memberi KB kepada saya", ex:{jp:"<ruby>社長<rt>しゃちょう</rt></ruby>が （わたしに） お<ruby>土産<rt>みやげ</rt></ruby>を くださいました。", id:"Direktur memberi saya oleh-oleh."}, note:"くださいます = memberi (bentuk sopan dari くれます). Pemberi (が) berstatus lebih tinggi. ⚠️ くださいます (mereka → saya) vs いただきます (saya ← mereka). Partikel berbeda: くださいます pakai が untuk pemberi."},
  {bab:66, pola:"KK [て-form] いただきました", arti:"Saya menerima manfaat dari tindakan orang berstatus lebih tinggi", ex:{jp:"きのう <ruby>部長<rt>ぶちょう</rt></ruby>に ばんごはんを ごちそうして いただきました。", id:"Kemarin saya ditraktir makan malam oleh kepala bagian."}, note:"KK て + いただきます = pembicara menerima manfaat tindakan dari atasan. Lebih sopan dari KK て もらいました. ⚠️ Bedakan: いただきます (menerima benda, Bab 65) vs て いただきます (menerima tindakan, Bab 66)."},
  {bab:66, pola:"KK [て-form] くださいます", arti:"Orang berstatus lebih tinggi melakukan ~ untuk saya", ex:{jp:"<ruby>部長<rt>ぶちょう</rt></ruby>の <ruby>奥さん<rt>おくさん</rt></ruby>が （わたしに）<ruby>茶道<rt>さどう</rt></ruby>を <ruby>教<rt>おし</rt></ruby>えて くださいました。", id:"Istri kepala bagian mengajari saya upacara minum teh."}, note:"KK て + くださいます = orang atasan melakukan sesuatu untuk pembicara. Lebih sopan dari KK て くれました. ⚠️ Urutan sopan: 〜てください < 〜てくださいませんか ≈ 〜ていただけませんか."},
  {bab:67, pola:"KK [bentuk kamus] ために、〜", arti:"Untuk (tujuan melakukan) 〜", ex:{jp:"<ruby>日本<rt>にほん</rt></ruby>の <ruby>社会<rt>しゃかい</rt></ruby>についての <ruby>論文<rt>ろんぶん</rt></ruby>を かく ために <ruby>図書館<rt>としょかん</rt></ruby>で <ruby>本<rt>ほん</rt></ruby>を かりました。", id:"Untuk menulis tesis tentang masyarakat Jepang, saya meminjam buku di perpustakaan."}, note:"ために menyatakan tujuan sadar. Subjek klausa ために = subjek kalimat utama. ⚠️ ために (tujuan/kehendak sadar) vs ように (upaya agar sesuatu terjadi/berubah)."},
  {bab:67, pola:"KB の ために、〜", arti:"Demi/untuk kepentingan KB", ex:{jp:"<ruby>健康<rt>けんこう</rt></ruby>の ために <ruby>毎日<rt>まいにち</rt></ruby> <ruby>運動<rt>うんどう</rt></ruby>して います。", id:"Demi kesehatan, saya berolahraga setiap hari."}, note:"KB の ために = demi kepentingan ~. Dipakai untuk orang, tujuan abstrak, atau benda. ⚠️ Berbeda dari KK ために (Bab 67A) yang membutuhkan kata kerja kamus."},
  {bab:68, pola:"KK [kamus] のに / KB に (+ つかいます/いいです/べんりです)", arti:"Untuk (fungsi/tujuan penggunaan) 〜", ex:{jp:"この <ruby>道具<rt>どうぐ</rt></ruby>は たまごを きる のに つかいます。", id:"Alat ini digunakan untuk memotong telur."}, note:"のに di sini = fungsi/tujuan penggunaan (BUKAN 'meskipun'). Dipakai dengan: つかいます、いいです、べんりです、やくにたちます. KB langsung + に (tanpa の) juga bisa: <ruby>旅行<rt>りょこう</rt></ruby>に いいです."},
  {bab:68, pola:"KS い（〜い）/ KS な（〜な） そうです", arti:"Kelihatannya 〜 (kesan visual)", ex:{jp:"その ラーメン、おいしそうですね。", id:"Ramen itu kelihatannya enak ya."}, note:"Berdasarkan kesan penglihatan/perkiraan. KS い: buang い + そう. KS な: buang な + そう. ⚠️ Pengecualian: いい→よさそう、ない→なさそう. Sebelum KB: そうな+KB. Negatif: 〜くなさそう / 〜じゃなさそう."},
  {bab:69, pola:"KK [stem-ます] / KS い（〜い）/ KS な（〜な） すぎます", arti:"Terlalu banyak 〜 (berlebihan, biasanya tidak diinginkan)", ex:{jp:"おいしかったので、<ruby>食<rt>た</rt></ruby>べすぎて しまいました。", id:"Karena enak, saya makan terlalu banyak."}, note:"Menyatakan tindakan/keadaan berlebihan. KK: stem-ます + すぎ. KS い: buang い + すぎ. KS な: buang な + すぎ. すぎます berkonjugasi seperti KK: すぎて、すぎない、すぎた."},
  {bab:69, pola:"KK [stem-ます] やすいです／にくいです", arti:"Mudah dilakukan / Sulit dilakukan", ex:{jp:"この くつは <ruby>軽<rt>かる</rt></ruby>くて <ruby>歩<rt>ある</rt></ruby>きやすいです。", id:"Sepatu ini ringan dan nyaman untuk berjalan."}, note:"やすい/にくい = kata sifat い → berkonjugasi seperti KS い (やすくて、やすくない). やすい = mudah terjadi/dilakukan. にくい = sulit terjadi/dilakukan."},
  {bab:69, pola:"KB に します", arti:"Memilih / Memutuskan ~", ex:{jp:"A: <ruby>昼ごはん<rt>ひるごはん</rt></ruby>は なに に しますか。B: てんぷら<ruby>定食<rt>ていしょく</rt></ruby>に します。", id:"A: Mau pilih apa? B: Saya pilih set tempura."}, note:"Digunakan saat memilih dari pilihan atau memutuskan. ⚠️ KB に します (memilih/mengubah secara sengaja) vs KB に なります (berubah sendiri/alami)."},
  {bab:70, pola:"KK [stem-ます] そうです", arti:"Sepertinya akan ~ (prediksi pergerakan/perubahan)", ex:{jp:"<ruby>棚<rt>たな</rt></ruby>から <ruby>荷物<rt>にもつ</rt></ruby>が <ruby>今<rt>いま</rt></ruby>にも おちそうです。", id:"Barang di rak sepertinya akan jatuh kapan saja."}, note:"Prediksi bahwa KK kemungkinan akan terjadi berdasarkan situasi. ⚠️ BEDAKAN: KK そうです (Bab 70, prediksi) vs KS そうです (Bab 68, kesan visual). Pengecualian: いい→よさそう、ない→なさそう."},
  {bab:70, pola:"KB1 を KS い（〜く）／KS な（〜に）／KB2 に します", arti:"Mengubah KB1 menjadi ~ (disengaja)", ex:{jp:"ごはんの <ruby>量<rt>りょう</rt></ruby>を <ruby>半分<rt>はんぶん</rt></ruby>に して ください。", id:"Tolong setengahkan porsi nasinya."}, note:"〜く/〜に します = mengubah dengan sengaja. KS い → 〜く します. KS な/KB → 〜に します. ⚠️ 〜に します (sengaja diubah) vs 〜に なります (berubah sendiri)."},
  {bab:71, pola:"[bentuk biasa] のに、〜", arti:"Padahal 〜 (kontras / kecewa / tidak puas)", ex:{jp:"30<ruby>分<rt>ぷん</rt></ruby>も <ruby>待<rt>ま</rt></ruby>った のに、タクシーが <ruby>来<rt>き</rt></ruby>ませんでした。", id:"Padahal sudah menunggu 30 menit, taksinya tidak datang."}, note:"Menyatakan kontras yang mengecewakan/mengejutkan. KS な/KB + な + のに. ⚠️ BEDAKAN: のに (padahal, Bab 71) vs のに (untuk/fungsi, Bab 68) — sangat berbeda!"},
  {bab:72, pola:"KK [kamus] ところです", arti:"Akan segera melakukan 〜 (baru akan dimulai)", ex:{jp:"これから <ruby>昼ごはん<rt>ひるごはん</rt></ruby>を <ruby>食べる<rt>たべる</rt></ruby> ところです。", id:"Saya akan makan siang sekarang."}, note:"Menekankan momen tepat sebelum tindakan dimulai. Sering dengan これから、いまから. ⚠️ ところです (momen) vs つもりです (rencana/niat)."},
  {bab:72, pola:"KK [て いる] ところです", arti:"Sedang dalam proses melakukan 〜", ex:{jp:"<ruby>今<rt>いま</rt></ruby> <ruby>故障<rt>こしょう</rt></ruby>の <ruby>原因<rt>げんいん</rt></ruby>を <ruby>調べて<rt>しらべて</rt></ruby> いる ところです。", id:"Sekarang sedang menyelidiki penyebab kerusakan."}, note:"Menekankan tindakan SEDANG berlangsung saat ini. Sering dengan いま. ⚠️ て いる ところです (proses berlangsung) vs て います (kondisi hasil)."},
  {bab:72, pola:"KK [た] ところです", arti:"Baru saja selesai melakukan 〜", ex:{jp:"たった<ruby>今<rt>いま</rt></ruby> シャワーを <ruby>浴びた<rt>あびた</rt></ruby> ところです。", id:"Baru saja selesai mandi."}, note:"Menekankan momen tepat setelah selesai. Sering dengan たったいま、ちょうど. ⚠️ た ところです (baru saja objektif) vs た ばかりです (Bab 74, baru saja subjektif)."},
  {bab:73, pola:"[bentuk biasa] そうです", arti:"Katanya / Saya dengar 〜 (info dari sumber lain)", ex:{jp:"あした <ruby>日本語<rt>にほんご</rt></ruby>の テストが ある そうです。", id:"Katanya besok ada ujian bahasa Jepang."}, note:"Menyampaikan informasi dari orang lain. Sumber bisa disebut: 〜によると、〜そうです. ⚠️ BEDAKAN 3 そうです: [biasa]そうです (Bab 73, kabar) vs KSそうです (Bab 68, kesan visual) vs KKそうです (Bab 70, prediksi)."},
  {bab:73, pola:"[bentuk biasa] ようです", arti:"Tampaknya / Sepertinya 〜 (kesimpulan dari pengamatan)", ex:{jp:"どうも <ruby>風邪<rt>かぜ</rt></ruby>を <ruby>引いた<rt>ひいた</rt></ruby> ようです。", id:"Sepertinya terkena flu."}, note:"Kesimpulan dari pengamatan langsung. KS な + な + ようです. KB + の + ようです. どうも ようです = ketidakpastian lebih kuat. ⚠️ ようです (pengamatan langsung) vs そうです (info dari luar)."},
  {bab:74, pola:"KK [た] ばかりです", arti:"Baru saja ~ (perasaan subjektif bahwa waktu singkat)", ex:{jp:"さっき <ruby>昼ごはん<rt>ひるごはん</rt></ruby>を <ruby>食べた<rt>たべた</rt></ruby> ばかりです。", id:"Baru saja makan siang tadi."}, note:"Subjektif — pembicara merasa waktunya singkat. Bisa + なのに, だそうです, dll. ⚠️ た ばかり (subjektif, Bab 74) vs た ところ (objektif, faktual, Bab 72)."},
  {bab:74, pola:"[bentuk biasa] はずです", arti:"Seharusnya 〜 (kesimpulan logis berdasarkan alasan)", ex:{jp:"<ruby>今日<rt>きょう</rt></ruby>は <ruby>日曜日<rt>にちようび</rt></ruby>ですから、<ruby>銀行<rt>ぎんこう</rt></ruby>は <ruby>休み<rt>やすみ</rt></ruby>の はずです。", id:"Karena hari ini Minggu, bank seharusnya libur."}, note:"Pembicara yakin berdasarkan logika/bukti. KS な + な + はずです. KB + の + はずです. Negatif: 〜ないはずです. ⚠️ はずです (logis/yakin) vs ようです (pengamatan/tidak yakin)."},
  {bab:75, pola:"命令形: KK [bentuk perintah]", arti:"Lakukan ~ ! (perintah langsung)", ex:{jp:"<ruby>早<rt>はや</rt></ruby>く <ruby>寝<rt>ね</rt></ruby>ろ。ここで <ruby>止<rt>と</rt></ruby>まれ。", id:"Cepat tidur! Berhenti di sini!"}, note:"Grup I: ～e (のめ、まて、かけ). Grup II: ～ろ (やめろ、みろ、ねろ). Grup III: こい、しろ. Digunakan dalam situasi darurat, tanda, olahraga. Kasar — hindari dalam percakapan formal."},
  {bab:75, pola:"禁止形: KK [kamus] な", arti:"Jangan ~ ! (larangan langsung)", ex:{jp:"エレベーターを <ruby>使<rt>つか</rt></ruby>うな。<ruby>危<rt>あぶ</rt></ruby>ないから、そこに <ruby>入<rt>はい</rt></ruby>るな。", id:"Jangan pakai lift! Jangan masuk ke sana!"}, note:"Semua grup: KK kamus + な. Lebih kasar dari 〜ないでください. Dipakai pada tanda larangan, situasi darurat, atau ucapan kasar."},
  {bab:75, pola:"X は Y という 意味です", arti:"X berarti Y (definisi/penjelasan arti)", ex:{jp:"この マークは ここに <ruby>車<rt>くるま</rt></ruby>を <ruby>止める<rt>とめる</rt></ruby>な という <ruby>意味<rt>いみ</rt></ruby>です。", id:"Tanda ini berarti 'dilarang parkir di sini'."}, note:"Mendefinisikan kata, tanda, atau ungkapan. Tanya: どういう 意味ですか? という = penanda kutipan/definisi isi."},
  {bab:76, pola:"使役動詞: KB は KB を/に KK [kausatif]", arti:"Menyuruh / mengizinkan seseorang melakukan ~", ex:{jp:"<ruby>先生<rt>せんせい</rt></ruby>は <ruby>学生<rt>がくせい</rt></ruby>に <ruby>本<rt>ほん</rt></ruby>を <ruby>読<rt>よ</rt></ruby>ませました。", id:"Guru menyuruh murid membaca buku."}, note:"Kausatif = keharusan (menyuruh) atau izin. Atasan→bawahan. Grup I: ～あせます. Grup II: ～させます. Grup III: こさせます・させます. Terkonjugasi sebagai Grup II."},
  {bab:76, pola:"KK [kausatif + て] いただけませんか", arti:"Mohon izinkan saya untuk ~ (meminta izin sangat sopan)", ex:{jp:"<ruby>明日<rt>あした</rt></ruby>、<ruby>休<rt>やす</rt></ruby>ませて いただけませんか。", id:"Bolehkah saya izin tidak masuk besok?"}, note:"Cara meminta izin paling sopan. KK kausatif + て + いただけませんか. ⚠️ Berbeda dari 〜てください (permintaan biasa) dan 〜ていただけませんか (meminta orang lain melakukan sesuatu untuk kita)."},
  {bab:77, pola:"尊敬語: KK [～られます]", arti:"Menghormati pelaku tindakan (bentuk hormat reguler)", ex:{jp:"<ruby>社長<rt>しゃちょう</rt></ruby>は 9<ruby>時<rt>じ</rt></ruby><ruby>半<rt>はん</rt></ruby>に <ruby>来られます<rt>こられます</rt></ruby>。", id:"Direktur akan datang jam setengah sepuluh."}, note:"Bentuk sama dengan pasif. Grup I/II: ～られます. Grup III: こられます・されます. Digunakan saat pelaku = orang yang lebih tinggi statusnya. ⚠️ Bentuk lebih sopan: お〜に なります."},
  {bab:77, pola:"お(KK stem-ます) に なります", arti:"Bentuk hormat lebih tinggi dari ～られます", ex:{jp:"<ruby>先生<rt>せんせい</rt></ruby>が お<ruby>帰り<rt>かえり</rt></ruby>に なります。", id:"Guru akan pulang."}, note:"Lebih sopan dari 尊敬語 biasa. Grup III dan KK satu suku kata (みます、ねます、います) TIDAK bisa pakai bentuk ini. Contoh: おかえりになります、おわかりになりますか."},
  {bab:77, pola:"お/ご(KK stem-ます) ください", arti:"Silakan / Mohon ~ (permintaan sopan)", ex:{jp:"どうぞ お<ruby>入り<rt>はいり</rt></ruby> ください。しばらく お<ruby>待ち<rt>まち</rt></ruby> ください。", id:"Silakan masuk. Mohon tunggu sebentar."}, note:"Setara dengan 〜てください tapi lebih sopan. Grup I/II: お + stem-ます + ください. Grup III: ご + KB + ください. Contoh: ごちゅうい ください (mohon perhatikan)."},
  {bab:78, pola:"謙譲語: お(KK stem-ます) します / ご(KB) します", arti:"Merendahkan tindakan diri sendiri untuk menghormati lawan bicara", ex:{jp:"<ruby>今月<rt>こんげつ</rt></ruby>の スケジュールを お<ruby>送り<rt>おく</rt></ruby>りします。", id:"Saya akan mengirimkan jadwal bulan ini."}, note:"Pembicara merendahkan tindakannya sendiri. Grup I/II: お + stem-ます + します. Grup III: ご + KB + します. ⚠️ Jangan campur: 尊敬語 (memuliakan orang lain) vs 謙譲語 (merendahkan diri sendiri)."},
  {bab:78, pola:"Ungkapan khusus 謙譲語", arti:"Kata kerja khusus untuk merendahkan diri", ex:{jp:"わたしは <ruby>鈴木<rt>すずき</rt></ruby>と <ruby>申します<rt>もうします</rt></ruby>。<ruby>明日<rt>あした</rt></ruby> お<ruby>宅<rt>たく</rt></ruby>に <ruby>伺います<rt>うかがいます</rt></ruby>。", id:"Nama saya Suzuki. Besok saya akan berkunjung ke rumah Anda."}, note:"いきます/きます→まいります. います→おります. たべます/のみます/もらいます→いただきます. いいます→もうします. しっています→ぞんじております. みます→はいけんします. します→いたします. きます/いきます→うかがいます. あいます→おめにかかります."},
];

// ── CARA PAKAI: Konjugasi bentuk baru → tambah grup baru {grup, warna, label, contoh:[], aturan:[]}.
//    Konjugasi dalam grup yang sudah ada → tambah baris di contoh[] dan aturan[].
//    warna: gunakan kelas CSS rsum-conj-[nama] yang sudah ada atau tambah CSS baru.
//    Kolom tabel: masu | te | nai | kamus | catatan ──
const RANGKUMAN_KONJUGASI = [
  {grup:"⚠️", warna:"rsum-conj-III", label:"Kata Kerja Khusus (あります・います)",
   contoh: [
    {masu:"あります", te:"あって", nai:"ない ⚠️", kamus:"ある", catatan:"ない = tiada (bukan あらない!)"},
    {masu:"います", te:"いて", nai:"いない", kamus:"いる", catatan:"Grup II tapi sering keliru"},
   ],
   aturan:[
    "ある: bentuk ない-nya adalah <b>ない</b> (bukan あらない) — pengecualian mutlak",
    "いる: konjugasi Grup II normal, tapi maknanya 'ada (makhluk hidup)'",
    "Keduanya = keberadaan: ある=benda mati, いる=makhluk hidup",
   ]
  },
  {grup:"I", warna:"rsum-conj-I", label:"Godan (う<ruby>動詞<rt>どうし</rt></ruby>)",
   contoh: [
    {masu:"かきます", te:"かいて", nai:"かかない", kamus:"かく", catatan:"き→いて"},
    {masu:"のみます", te:"のんで", nai:"のまない", kamus:"のむ", catatan:"み→んで"},
    {masu:"いきます", te:"いって ⚠️", nai:"いかない", kamus:"いく", catatan:"pengecualian!"},
   ],
   aturan:[
    "い/ち/り → <b>って</b>",
    "み/び/に → <b>んで</b>",
    "き → <b>いて</b> (kecuali いく→いって)",
    "ぎ → <b>いで</b>",
    "し → <b>して</b>",
    "Bentuk ない: ubah bunyi i→a (か・さ・た・な・ば・ま・ら・わ)",
   ]
  },
  {grup:"II", warna:"rsum-conj-II", label:"Ichidan (る<ruby>動詞<rt>どうし</rt></ruby>)",
   contoh: [
    {masu:"たべます", te:"たべて", nai:"たべない", kamus:"たべる", catatan:""},
    {masu:"みます", te:"みて", nai:"みない", kamus:"みる", catatan:""},
    {masu:"おきます", te:"おきて", nai:"おきない", kamus:"おきる", catatan:""},
   ],
   aturan:[
    "Semua: buang <b>ます</b>, tambah <b>て</b>",
    "Bentuk ない: buang ます, tambah <b>ない</b>",
    "Bentuk kamus: buang ます, tambah <b>る</b>",
   ]
  },
  {grup:"III", warna:"rsum-conj-III", label:"Tidak Beraturan",
   contoh: [
    {masu:"します", te:"して", nai:"しない", kamus:"する", catatan:""},
    {masu:"きます", te:"きて", nai:"こない", kamus:"くる", catatan:""},
   ],
   aturan:[
    "Hanya dua kata kerja: <b>します</b> dan <b>きます</b>",
    "Bentuk ない: します→<b>しない</b> | きます→<b>こない</b>",
   ]
  },
  {grup:"たら", warna:"rsum-conj-tara", label:"Bentuk たら (dari lampau biasa + ら)",
   contoh: [
    {masu:"のみます", pos:"のんだら", neg:"のまなかったら", taPlus:"—", taMinus:"—", kamus:"のむ", catatan:"Grp I: た→たら"},
    {masu:"たべます", pos:"たべたら", neg:"たべなかったら", taPlus:"—", taMinus:"—", kamus:"たべる", catatan:"Grp II: た→たら"},
    {masu:"きます", pos:"きたら", neg:"こなかったら", taPlus:"—", taMinus:"—", kamus:"くる", catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
    {masu:"します", pos:"したら", neg:"しなかったら", taPlus:"—", taMinus:"—", kamus:"する", catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
    {masu:"あついです", pos:"あつかったら", neg:"あつくなかったら", taPlus:"—", taMinus:"—", kamus:"あつい", catatan:"KS い: かった→かったら"},
    {masu:"きれいです", pos:"きれいだったら", neg:"きれいじゃなかったら", taPlus:"—", taMinus:"—", kamus:"きれいだ", catatan:"KS な: だったら"},
    {masu:"あめです", pos:"あめだったら", neg:"あめじゃなかったら", taPlus:"—", taMinus:"—", kamus:"あめだ", catatan:"KB: だったら"},
   ],
   aturan:[
    "Ambil bentuk <b>lampau biasa</b> (た/だ) lalu tambahkan <b>ら</b>",
    "KK I: のむ → のんだ → <b>のんだら</b>",
    "KK II: たべる → たべた → <b>たべたら</b>",
    "KK III: する → した → <b>したら</b> | くる → きた → <b>きたら</b>",
    "KS い: あつい → あつかった → <b>あつかったら</b>",
    "KS な: きれいだ → きれいだった → <b>きれいだったら</b>",
    "KB: あめだ → あめだった → <b>あめだったら</b>",
    "Negatif たら: ない→なかった → <b>なかったら</b>",
    "⚠️ たら tidak memiliki bentuk lampau — hanya digunakan di klausa syarat",
   ]
  },
  {grup:"ても", warna:"rsum-conj-temo", label:"Bentuk ても / でも (Walaupun ~)",
   contoh: [
    {masu:"のみます", pos:"のんでも", neg:"のまなくても", taPlus:"のんでも (lampau konteks)", taMinus:"のまなくても", kamus:"のむ", catatan:"Grp I: て→ても"},
    {masu:"たべます", pos:"たべても", neg:"たべなくても", taPlus:"たべても (lampau konteks)", taMinus:"たべなくても", kamus:"たべる", catatan:"Grp II: て→ても"},
    {masu:"きます", pos:"きても", neg:"こなくても", taPlus:"きても (lampau konteks)", taMinus:"こなくても", kamus:"くる", catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
    {masu:"あついです", pos:"あつくても", neg:"あつくなくても", taPlus:"あつかっても", taMinus:"あつくなかっても", kamus:"あつい", catatan:"KS い: く→くても"},
    {masu:"きれいです", pos:"きれいでも", neg:"きれいじゃなくても", taPlus:"きれいだっても", taMinus:"きれいじゃなかっても", kamus:"きれいだ", catatan:"KS な: で→でも"},
    {masu:"あめです", pos:"あめでも", neg:"あめじゃなくても", taPlus:"あめだっても", taMinus:"あめじゃなかっても", kamus:"あめだ", catatan:"KB: で→でも"},
   ],
   aturan:[
    "KK: ikuti aturan bentuk <b>て</b> lalu tambah <b>も</b>",
    "KK I: のむ → のんで → <b>のんでも</b>",
    "KK II: たべる → たべて → <b>たべても</b>",
    "KK III: する → して → <b>しても</b> | くる → きて → <b>きても</b>",
    "KS い: buang い → tambah <b>くても</b> (あつい → あつ<b>くても</b>)",
    "KS な: tambah <b>でも</b> langsung (きれい → きれい<b>でも</b>)",
    "KB: tambah <b>でも</b> langsung (にちようび → にちようび<b>でも</b>)",
    "Negatif ても: ない→なくて → <b>なくても</b>",
    "⚠️ ても tidak berubah bentuk lampau — waktu ditentukan klausa utama",
   ]
  },
  {grup:"<ruby>可能<rt>かのう</rt></ruby>", warna:"rsum-conj-kano", label:"Bentuk Potensial <ruby>可能形<rt>かのうけい</rt></ruby> (bisa ~)",
   contoh: [
    {masu:"のみます",   pos:"のめます",       neg:"のめません",       taPlus:"のめました",       taMinus:"のめませんでした",       kamus:"のめる",     catatan:"Grp I: む→め (u→eru)"},
    {masu:"かきます",   pos:"かけます",       neg:"かけません",       taPlus:"かけました",       taMinus:"かけませんでした",       kamus:"かける",     catatan:"Grp I: く→け"},
    {masu:"はなします", pos:"はなせます",     neg:"はなせません",     taPlus:"はなせました",     taMinus:"はなせませんでした",     kamus:"はなせる",   catatan:"Grp I: す→せ"},
    {masu:"かいます",   pos:"かえます",       neg:"かえません",       taPlus:"かえました",       taMinus:"かえませんでした",       kamus:"かえる",     catatan:"Grp I: う→え"},
    {masu:"たべます",   pos:"たべられます",   neg:"たべられません",   taPlus:"たべられました",   taMinus:"たべられませんでした",   kamus:"たべられる",   catatan:"Grp II: +られる"},
    {masu:"みます",     pos:"みられます",     neg:"みられません",     taPlus:"みられました",     taMinus:"みられませんでした",     kamus:"みられる",     catatan:"Grp II: +られる"},
    {masu:"きます",     pos:"こられます",     neg:"こられません",     taPlus:"こられました",     taMinus:"こられませんでした",     kamus:"こられる",     catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
    {masu:"します",     pos:"できます",       neg:"できません",       taPlus:"できました",       taMinus:"できませんでした",       kamus:"できる",     catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
   ],
   aturan:[
    "Grup I (Godan): ganti bunyi akhir <b>u → eru</b> (なに<ruby>行<rt>ぎょう</rt></ruby>→え<ruby>行<rt>ぎょう</rt></ruby>+る)",
    "  のむ → の<b>める</b> | かく → か<b>ける</b> | いく → い<b>ける</b>",
    "  はなす → はな<b>せる</b> | かう → か<b>える</b> | まつ → ま<b>てる</b>",
    "Grup II (Ichidan): buang る, tambah <b>られる</b>",
    "  たべる → たべ<b>られる</b> | みる → み<b>られる</b>",
    "Grup III: <b>する → できる</b> | <b>くる → こられる</b>",
    "⚠️ Partikel objek: <b>を → が</b> saat bentuk potensial",
    "  すしを たべます → すし<b>が</b> たべられます",
    "⚠️ Potensial terkonjugasi seperti KK Grup II (ます/ません/ました/ませんでした)",
   ]
  },
  {grup:"ながら", warna:"rsum-conj-nagara", label:"Bentuk ながら (sambil ~)",
   contoh: [
    {masu:"のみます",   pos:"のみながら",   neg:"—", taPlus:"—", taMinus:"—",   kamus:"のむ",   catatan:"Grp I: ます stem + ながら"},
    {masu:"かきます",   pos:"かきながら",   neg:"—", taPlus:"—", taMinus:"—",   kamus:"かく",   catatan:"Grp I: ます stem + ながら"},
    {masu:"たべます",   pos:"たべながら",   neg:"—", taPlus:"—", taMinus:"—",   kamus:"たべる", catatan:"Grp II: ます stem + ながら"},
    {masu:"みます",     pos:"みながら",     neg:"—", taPlus:"—", taMinus:"—",   kamus:"みる",   catatan:"Grp II: ます stem + ながら"},
    {masu:"します",     pos:"しながら",     neg:"—", taPlus:"—", taMinus:"—",   kamus:"する",   catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
    {masu:"きます",     pos:"きながら",     neg:"—", taPlus:"—", taMinus:"—",   kamus:"くる",   catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
   ],
   aturan:[
    "Ambil <b>ます-stem</b> (bentuk ます tanpa ます), lalu tambahkan <b>ながら</b>",
    "  のみます → のみ → <b>のみながら</b>",
    "  たべます → たべ → <b>たべながら</b>",
    "  します → し → <b>しながら</b>",
    "  きます → き → <b>きながら</b>",
    "⚠️ Tindakan UTAMA ada di KK2 (bukan KK1+ながら)",
    "  おんがくを <b>きき</b>ながら、べんきょうします → belajar sambil dengar musik",
    "⚠️ ながら = bersamaan. て = berurutan. Berbeda!",
    "⚠️ ながら tidak memiliki bentuk negatif/lampau — waktu ditentukan KK utama",
   ]
  },
  {grup:"<ruby>受身<rt>うけみ</rt></ruby>", warna:"rsum-conj-ukemi", label:"Bentuk Pasif <ruby>受身形<rt>うけみけい</rt></ruby> (menerima tindakan ~)",
   contoh: [
    {masu:"かきます",   pos:"かかれます",   neg:"かかれません",   taPlus:"かかれました",   taMinus:"かかれませんでした",   kamus:"かかれる",   catatan:"Grp I: く→か + れる"},
    {masu:"のみます",   pos:"のまれます",   neg:"のまれません",   taPlus:"のまれました",   taMinus:"のまれませんでした",   kamus:"のまれる",   catatan:"Grp I: む→ま + れる"},
    {masu:"よびます",   pos:"よばれます",   neg:"よばれません",   taPlus:"よばれました",   taMinus:"よばれませんでした",   kamus:"よばれる",   catatan:"Grp I: ぶ→ば + れる"},
    {masu:"とります",   pos:"とられます",   neg:"とられません",   taPlus:"とられました",   taMinus:"とられませんでした",   kamus:"とられる",   catatan:"Grp I: る→ら + れる"},
    {masu:"たべます",   pos:"たべられます", neg:"たべられません", taPlus:"たべられました", taMinus:"たべられませんでした", kamus:"たべられる", catatan:"Grp II: る→られる"},
    {masu:"ほめます",   pos:"ほめられます", neg:"ほめられません", taPlus:"ほめられました", taMinus:"ほめられませんでした", kamus:"ほめられる", catatan:"Grp II: る→られる"},
    {masu:"きます",     pos:"こられます",   neg:"こられません",   taPlus:"こられました",   taMinus:"こられませんでした",   kamus:"こられる",   catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
    {masu:"します",     pos:"されます",     neg:"されません",     taPlus:"されました",     taMinus:"されませんでした",     kamus:"される",     catatan:"Grp III (<ruby>不規則<rt>ふきそく</rt></ruby>)"},
   ],
   aturan:[
    "Grup I (Godan): ganti bunyi akhir <b>u → a + れる</b>",
    "  かく → か<b>かれる</b> | のむ → の<b>まれる</b> | よぶ → よ<b>ばれる</b>",
    "  とる → と<b>られる</b> | はなす → はな<b>される</b>",
    "Grup II (Ichidan): buang る, tambah <b>られる</b>",
    "  たべる → たべ<b>られる</b> | みる → み<b>られる</b>",
    "Grup III: <b>する → される</b> | <b>くる → こられる</b>",
    "⚠️ Pasif terkonjugasi seperti KK Grup II (ます→ません→ました→ませんでした)",
    "⚠️ Gr II potensial vs pasif: たべられます = 'bisa makan' ATAU 'dimakan' — konteks menentukan!",
   ]
  },
  {grup:"使役", warna:"rsum-conj-shieki", label:"<ruby>使役形<rt>しえきけい</rt></ruby> (Kausatif — menyuruh/izinkan)",
   contoh: [
     {masu:"かきます", pos:"かかせます", neg:"かかせません", taPlus:"かかせました", taMinus:"かかせませんでした", kamus:"かかせる", catatan:"Gr.I: i→a+せる"},
     {masu:"よみます", pos:"よませます", neg:"よませません", taPlus:"よませました", taMinus:"よませませんでした", kamus:"よませる", catatan:"Gr.I: i→a+せる"},
     {masu:"はなします", pos:"はなさせます", neg:"はなさせません", taPlus:"はなさせました", taMinus:"はなさせませんでした", kamus:"はなさせる", catatan:"Gr.I: し→さ+せる"},
     {masu:"たべます", pos:"たべさせます", neg:"たべさせません", taPlus:"たべさせました", taMinus:"たべさせませんでした", kamus:"たべさせる", catatan:"Gr.II: +させる"},
     {masu:"みます", pos:"みさせます", neg:"みさせません", taPlus:"みさせました", taMinus:"みさせませんでした", kamus:"みさせる", catatan:"Gr.II: +させる"},
     {masu:"きます", pos:"こさせます", neg:"こさせません", taPlus:"こさせました", taMinus:"こさせませんでした", kamus:"こさせる", catatan:"Gr.III: <ruby>不規則<rt>ふきそく</rt></ruby>"},
     {masu:"します", pos:"させます", neg:"させません", taPlus:"させました", taMinus:"させませんでした", kamus:"させる", catatan:"Gr.III: <ruby>不規則<rt>ふきそく</rt></ruby>"},
   ],
   aturan: [
     "Gr.I: ます stem → ubah bunyi akhir i→a, tambah せます (よみ→よま+せます)",
     "Gr.II: ます stem + させます (たべ→たべさせます)",
     "Gr.III: きます→こさせます / します→させます",
     "Kausatif terkonjugasi sebagai KK Grup II (ます→ません→ました→ませんでした)",
   ]
  },
  {grup:"使役受身", warna:"rsum-conj-shieki", label:"<ruby>使役受身形<rt>しえきうけみけい</rt></ruby> (Kausatif-Pasif — dipaksa/disuruh melakukan ~)",
   contoh: [
     {masu:"かきます", pos:"かかせられます", neg:"かかせられません", taPlus:"かかせられました", taMinus:"かかせられませんでした", kamus:"かかせられる", catatan:"Gr.I: a+せられる"},
     {masu:"のみます", pos:"のまされます", neg:"のまされません", taPlus:"のまされました", taMinus:"のまされませんでした", kamus:"のまされる", catatan:"Gr.I: 短縮形 a+される"},
     {masu:"まちます", pos:"またされます", neg:"またされません", taPlus:"またされました", taMinus:"またされませんでした", kamus:"またされる", catatan:"Gr.I: 短縮形 a+される"},
     {masu:"たべます", pos:"たべさせられます", neg:"たべさせられません", taPlus:"たべさせられました", taMinus:"たべさせられませんでした", kamus:"たべさせられる", catatan:"Gr.II: +させられる"},
     {masu:"きます", pos:"こさせられます", neg:"こさせられません", taPlus:"こさせられました", taMinus:"こさせられませんでした", kamus:"こさせられる", catatan:"Gr.III"},
     {masu:"します", pos:"させられます", neg:"させられません", taPlus:"させられました", taMinus:"させられませんでした", kamus:"させられる", catatan:"Gr.III"},
   ],
   aturan: [
     "Gabungan: 使役 + 受身 = '<b>dipaksa/disuruh</b> melakukan ~' (sudut pandang orang yang disuruh)",
     "Gr.I: 使役せる → pasifkan → <b>〜あせられる</b>. Versi pendek: <b>〜あされる</b>",
     "  のむ → のませる → <b>のまされる</b> (pendek) / のませられる (panjang)",
     "  かく → かかせる → <b>かかされる</b> (pendek) / かかせられる (panjang)",
     "Gr.II: 使役させる → pasifkan → <b>〜させられる</b> (tidak ada versi pendek)",
     "  たべる → たべさせる → <b>たべさせられる</b>",
     "Gr.III: する→<b>させられる</b> | くる→<b>こさせられる</b>",
     "⚠️ Sudut pandang: 使役=atasan menyuruh. 使役受身=bawahan MERASA disuruh/dipaksa.",
     "⚠️ Contoh: <ruby>先生<rt>せんせい</rt></ruby>に <ruby>本<rt>ほん</rt></ruby>を <ruby>読<rt>よ</rt></ruby>ま<b>された</b> (saya disuruh guru membaca buku)",
   ]
  },
  {grup:"命令・禁止", warna:"rsum-conj-meirei", label:"<ruby>命令形<rt>めいれいけい</rt></ruby>・<ruby>禁止形<rt>きんしけい</rt></ruby> (Perintah & Larangan)",
   contoh: [
     {masu:"のみます", pos:"のめ", neg:"のむな", taPlus:"—", taMinus:"—", kamus:"のむ", catatan:"Gr.I: i→e / kamus+な"},
     {masu:"かきます", pos:"かけ", neg:"かくな", taPlus:"—", taMinus:"—", kamus:"かく", catatan:"Gr.I: i→e / kamus+な"},
     {masu:"まちます", pos:"まて", neg:"まつな", taPlus:"—", taMinus:"—", kamus:"まつ", catatan:"Gr.I: i→e / kamus+な"},
     {masu:"たべます", pos:"たべろ", neg:"たべるな", taPlus:"—", taMinus:"—", kamus:"たべる", catatan:"Gr.II: +ろ / kamus+な"},
     {masu:"みます", pos:"みろ", neg:"みるな", taPlus:"—", taMinus:"—", kamus:"みる", catatan:"Gr.II: +ろ / kamus+な"},
     {masu:"きます", pos:"こい", neg:"くるな", taPlus:"—", taMinus:"—", kamus:"くる", catatan:"Gr.III: <ruby>不規則<rt>ふきそく</rt></ruby>"},
     {masu:"します", pos:"しろ", neg:"するな", taPlus:"—", taMinus:"—", kamus:"する", catatan:"Gr.III: <ruby>不規則<rt>ふきそく</rt></ruby>"},
   ],
   aturan: [
     "<ruby>命令形<rt>めいれいけい</rt></ruby> Gr.I: ます stem → ubah bunyi akhir i-row → e-row (のみ→のめ, かき→かけ)",
     "<ruby>命令形<rt>めいれいけい</rt></ruby> Gr.II: ます stem + ろ (たべ→たべろ, み→みろ)",
     "<ruby>命令形<rt>めいれいけい</rt></ruby> Gr.III: きます→こい / します→しろ",
     "<ruby>禁止形<rt>きんしけい</rt></ruby> SEMUA: KK bentuk kamus + な (のむな, たべるな, するな, くるな)",
     "⚠️ Sangat kasar! Hanya untuk darurat, olahraga, atau tanda.",
     "⚠️ 命令形・禁止形 tidak memiliki bentuk lampau — hanya digunakan saat ini/langsung",
   ]
  },
  {grup:"尊敬", warna:"rsum-conj-sonkei", label:"<ruby>尊敬語<rt>そんけいご</rt></ruby> (Bahasa Hormat — meninggikan orang lain)",
   contoh: [
     {masu:"<ruby>聞<rt>き</rt></ruby>きます", pos:"<ruby>聞<rt>き</rt></ruby>かれます", neg:"<ruby>聞<rt>き</rt></ruby>かれません", taPlus:"<ruby>聞<rt>き</rt></ruby>かれました", taMinus:"<ruby>聞<rt>き</rt></ruby>かれませんでした", kamus:"<ruby>聞<rt>き</rt></ruby>かれる", catatan:"Gr.I: pasif=尊敬"},
     {masu:"<ruby>読<rt>よ</rt></ruby>みます", pos:"<ruby>読<rt>よ</rt></ruby>まれます", neg:"<ruby>読<rt>よ</rt></ruby>まれません", taPlus:"<ruby>読<rt>よ</rt></ruby>まれました", taMinus:"<ruby>読<rt>よ</rt></ruby>まれませんでした", kamus:"<ruby>読<rt>よ</rt></ruby>まれる", catatan:"Gr.I: pasif=尊敬"},
     {masu:"<ruby>書<rt>か</rt></ruby>きます", pos:"<ruby>書<rt>か</rt></ruby>かれます", neg:"<ruby>書<rt>か</rt></ruby>かれません", taPlus:"<ruby>書<rt>か</rt></ruby>かれました", taMinus:"<ruby>書<rt>か</rt></ruby>かれませんでした", kamus:"<ruby>書<rt>か</rt></ruby>かれる", catatan:"Gr.I: pasif=尊敬"},
     {masu:"<ruby>食<rt>た</rt></ruby>べます", pos:"<ruby>食<rt>た</rt></ruby>べられます", neg:"<ruby>食<rt>た</rt></ruby>べられません", taPlus:"<ruby>食<rt>た</rt></ruby>べられました", taMinus:"<ruby>食<rt>た</rt></ruby>べられませんでした", kamus:"<ruby>食<rt>た</rt></ruby>べられる", catatan:"Gr.II: +られます"},
     {masu:"きます", pos:"こられます", neg:"こられません", taPlus:"こられました", taMinus:"こられませんでした", kamus:"こられる", catatan:"Gr.III: <ruby>不規則<rt>ふきそく</rt></ruby>"},
     {masu:"します", pos:"されます", neg:"されません", taPlus:"されました", taMinus:"されませんでした", kamus:"される", catatan:"Gr.III: <ruby>不規則<rt>ふきそく</rt></ruby>"},
   ],
   aturan:[
     "Bentuk sama dengan <ruby>受身形<rt>うけみけい</rt></ruby> (pasif) — konteks menentukan makna",
     "Gr.I: ～あれます (<ruby>聞<rt>き</rt></ruby>きます→<ruby>聞<rt>き</rt></ruby>かれます)",
     "Gr.II: ～られます (<ruby>食<rt>た</rt></ruby>べます→<ruby>食<rt>た</rt></ruby>べられます)",
     "Gr.III: きます→こられます / します→されます",
     "Lebih sopan: お＋KK stem＋になります (お<ruby>帰<rt>かえ</rt></ruby>りになります)",
     "<ruby>特別<rt>とくべつ</rt></ruby>: いらっしゃいます / めしあがります / おっしゃいます / ごぞんじです / ごらんになります",
     "⚠️ Konjugasi: ます→ません→ました→ませんでした (seperti Grup II biasa)",
   ]
  },
  {grup:"謙譲", warna:"rsum-conj-kenjou", label:"<ruby>謙譲語<rt>けんじょうご</rt></ruby> (Bahasa Merendah — merendahkan diri sendiri)",
   contoh: [
     {masu:"<ruby>送<rt>おく</rt></ruby>ります", pos:"お<ruby>送<rt>おく</rt></ruby>りします", neg:"お<ruby>送<rt>おく</rt></ruby>りしません", taPlus:"お<ruby>送<rt>おく</rt></ruby>りしました", taMinus:"お<ruby>送<rt>おく</rt></ruby>りしませんでした", kamus:"お<ruby>送<rt>おく</rt></ruby>りする", catatan:"Gr.I: お～します"},
     {masu:"<ruby>持<rt>も</rt></ruby>ちます", pos:"お<ruby>持<rt>も</rt></ruby>ちします", neg:"お<ruby>持<rt>も</rt></ruby>ちしません", taPlus:"お<ruby>持<rt>も</rt></ruby>ちしました", taMinus:"お<ruby>持<rt>も</rt></ruby>ちしませんでした", kamus:"お<ruby>持<rt>も</rt></ruby>ちする", catatan:"Gr.I: お～します"},
     {masu:"<ruby>見<rt>み</rt></ruby>せます", pos:"お<ruby>見<rt>み</rt></ruby>せします", neg:"お<ruby>見<rt>み</rt></ruby>せしません", taPlus:"お<ruby>見<rt>み</rt></ruby>せしました", taMinus:"お<ruby>見<rt>み</rt></ruby>せしませんでした", kamus:"お<ruby>見<rt>み</rt></ruby>せする", catatan:"Gr.II: お～します"},
     {masu:"<ruby>案内<rt>あんない</rt></ruby>します", pos:"ご<ruby>案内<rt>あんない</rt></ruby>します", neg:"ご<ruby>案内<rt>あんない</rt></ruby>しません", taPlus:"ご<ruby>案内<rt>あんない</rt></ruby>しました", taMinus:"ご<ruby>案内<rt>あんない</rt></ruby>しませんでした", kamus:"ご<ruby>案内<rt>あんない</rt></ruby>する", catatan:"Gr.III: ご～します"},
     {masu:"いきます/きます", pos:"まいります", neg:"まいりません", taPlus:"まいりました", taMinus:"まいりませんでした", kamus:"まいる", catatan:"<ruby>特別<rt>とくべつ</rt></ruby>"},
     {masu:"います", pos:"おります", neg:"おりません", taPlus:"おりました", taMinus:"おりませんでした", kamus:"おる", catatan:"<ruby>特別<rt>とくべつ</rt></ruby>"},
     {masu:"いいます", pos:"もうします", neg:"もうしません", taPlus:"もうしました", taMinus:"もうしませんでした", kamus:"もうす", catatan:"<ruby>特別<rt>とくべつ</rt></ruby>"},
   ],
   aturan:[
     "Gr.I & II: お＋KK ます stem＋します (お<ruby>送<rt>おく</rt></ruby>りします、お<ruby>持<rt>も</rt></ruby>ちします)",
     "Gr.III: ご＋KB＋します (ご<ruby>案内<rt>あんない</rt></ruby>します、ご<ruby>連絡<rt>れんらく</rt></ruby>します)",
     "<ruby>特別<rt>とくべつ</rt></ruby>: まいります / おります / もうします / いただきます / はいけんします / いたします / うかがいます / おめにかかります",
     "⚠️ <ruby>尊敬語<rt>そんけいご</rt></ruby>: <ruby>主語<rt>しゅご</rt></ruby>=<ruby>相手<rt>あいて</rt></ruby>（meninggikan orang lain）",
     "⚠️ <ruby>謙譲語<rt>けんじょうご</rt></ruby>: <ruby>主語<rt>しゅご</rt></ruby>=<ruby>自分<rt>じぶん</rt></ruby>（merendahkan diri sendiri）",
     "⚠️ Konjugasi: します→しません→しました→しませんでした",
   ]
  },
];

// ── RANGKUMAN DATA: Bentuk VV per pola ──
// ── CARA PAKAI SAAT TAMBAH BAB BARU:
//    1. Identifikasi bentuk konjugasi yang dipakai pola baru:
//       て形  → tambah di grup "〜て<ruby>形<rt>けい</rt></ruby>"  (てしまう, ておく, てある, ていません, dll.)
//       た形  → tambah di grup "〜た<ruby>形<rt>けい</rt></ruby>"  (たことがある, たり〜たり, dll.)
//       ない形 → tambah di grup "〜ない<ruby>形<rt>けい</rt></ruby>" (なければならない, dll.)
//       <ruby>辞書形<rt>じしょけい</rt></ruby> → tambah di grup "<ruby>辞書形<rt>じしょけい</rt></ruby>"  (つもりです, 予定です, まえに, dll.)
//       <ruby>意向形<rt>いこうけい</rt></ruby> → tambah di grup "<ruby>意向形<rt>いこうけい</rt></ruby>"  (〜と思っています, dll.)
//       <ruby>普通体<rt>ふつうたい</rt></ruby> → tambah di grup "<ruby>普通体<rt>ふつうたい</rt></ruby>"  (と思います, んです, dll.)
//       たら形 → tambah di grup "〜たら<ruby>形<rt>けい</rt></ruby>"
//       ても形 → tambah di grup "〜ても<ruby>形<rt>けい</rt></ruby>"
//       ます形 → tambah di grup "〜ます<ruby>形<rt>けい</rt></ruby>" (ながら, たい, に行く, dll.)
//       <ruby>可能形<rt>かのうけい</rt></ruby> → tambah di grup "<ruby>可能形<rt>かのうけい</rt></ruby>"
//    2. Format entri: {form:"...", pola:"...", arti:"...", bab:NN, contoh:"..."}
//    3. Render otomatis — tidak perlu ubah HTML. ──
const RANGKUMAN_BENTUKVV = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. BENTUK MASU (〜ます<ruby>形<rt>けい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "〜ます<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-masu", label: "Bentuk ます — Sopan / Kini / Mendatang",
    desc: "Bentuk dasar kata kerja ragam sopan. Dipakai untuk pernyataan, pertanyaan, ajakan, dan tujuan.",
    pola: [
      {form:"KK<b>ます</b>", pola:"KK ます", arti:"Melakukan ~ (sopan, kini/mendatang)", bab:6, contoh:"たべます → makan"},
      {form:"KK<b>ません</b>", pola:"KK ません", arti:"Tidak melakukan ~ (negatif sopan)", bab:6, contoh:"たべません → tidak makan"},
      {form:"KK<b>ました</b>", pola:"KK ました", arti:"Sudah melakukan ~ (lampau positif)", bab:6, contoh:"たべました → sudah makan"},
      {form:"KK<b>ませんでした</b>", pola:"KK ませんでした", arti:"Tidak melakukan ~ (lampau negatif)", bab:6, contoh:"たべませんでした → tidak makan (dulu)"},
      {form:"KK<b>ませんか</b>", pola:"KK ませんか", arti:"Maukah ~? (ajakan halus ke lawan bicara)", bab:10, contoh:"たべませんか → mau makan?"},
      {form:"KK(ますstem)<b>たい</b>です", pola:"KK(ます) + たいです", arti:"Ingin melakukan ~", bab:19, contoh:"たべ<b>たい</b>です → ingin makan"},
      {form:"KK(ますstem)<b>に</b> いきます", pola:"KB へ KK(ます) に いきます", arti:"Pergi/datang/pulang untuk ~ (tujuan)", bab:20, contoh:"かい<b>に</b> いきます → pergi untuk membeli"},
      {form:"KK(ますstem)<b>ながら</b> KK2", pola:"KK1 ますながら KK2", arti:"Sambil ~ (dua tindakan bersamaan, KK2 = utama)", bab:43, contoh:"おんがくを きき<b>ながら</b> べんきょうします → belajar sambil dengar musik"},
      {form:"KK(ますstem) + <b>そうです</b>", pola:"KK(ます) そうです", arti:"Sepertinya akan ~ (prediksi dekat, kesan visual)", bab:70, contoh:"にもつが おちそうです → barang sepertinya akan jatuh"},
      {form:"KK(ますstem) + <b>すぎます</b>", pola:"KK(ます) すぎます", arti:"Terlalu banyak ~ (berlebihan)", bab:69, contoh:"たべすぎました → makan terlalu banyak"},
      {form:"KK(ますstem) + <b>やすいです</b>", pola:"KK(ます) やすいです", arti:"Mudah ~ / Gampang ~ (kemudahan)", bab:69, contoh:"このペンは かきやすいです → pena ini mudah ditulis"},
      {form:"KK(ますstem) + <b>にくいです</b>", pola:"KK(ます) にくいです", arti:"Sulit ~ / Susah ~ (kesulitan)", bab:69, contoh:"このにくは たべにくいです → daging ini sulit dimakan"},
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. BENTUK POTENSIAL (<ruby>可能形<rt>かのうけい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "<ruby>可能形<rt>かのうけい</rt></ruby>",
    chip: "vv-kanoudoshi", label: "Bentuk Potensial — bisa 〜",
    desc: "Menyatakan kemampuan 'bisa melakukan ~'. Dibentuk berbeda per grup. Partikel objek umumnya berubah を → が.",
    pola: [
      {form:"Grup I: bunyi akhir <b>u-row → e-row + る</b>", pola:"Ganti bunyi akhir u-row → e-row + る", arti:"Potensial Grup I (Godan)", bab:42, contoh:"のむ→のめる | かく→かける | いく→いける | かう→かえる | はなす→はなせる"},
      {form:"Grup II: buang る + <b>られる</b>", pola:"KK stem + られる", arti:"Potensial Grup II (Ichidan)", bab:42, contoh:"たべる→たべられる | みる→みられる | おきる→おきられる"},
      {form:"Grup III: <b>くる→こられる / する→できる</b>", pola:"Tidak beraturan", arti:"Potensial Grup III", bab:42, contoh:"くる→こられる | する→できる"},
      {form:"KB <b>が</b> KK-potensial", pola:"KB が KK (potensial)", arti:"Partikel objek: を→が (saat potensial)", bab:42, contoh:"にほんご<b>が</b> はなせます → bisa berbicara bahasa Jepang"},
    ],
    note: "⚠️ Potensial = keadaan 'bisa', bukan tindakan aktif → objek pakai が. Contoh: すしを たべます → すしが たべられます."
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. BENTUK TE (〜て<ruby>形<rt>けい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "〜て<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-te", label: "Bentuk て — Penghubung / Permintaan / Kondisi",
    desc: "Bentuk て digunakan untuk menghubungkan tindakan, membuat permintaan, izin, larangan, kondisi berlanjut, cara, dan pemberian tindakan.",
    pola: [
      {form:"KK<b>て</b> ください", pola:"KK て ください", arti:"Tolong lakukan ~ (permintaan sopan)", bab:21, contoh:"たべて ください → tolong makan"},
      {form:"KK<b>て</b> も いいですか", pola:"KK て も いいですか", arti:"Bolehkah ~? (meminta izin)", bab:22, contoh:"たべても いいですか → boleh makan?"},
      {form:"KK<b>て</b> は いけません", pola:"KK て は いけません", arti:"Tidak boleh ~ (larangan)", bab:22, contoh:"たべては いけません → tidak boleh makan"},
      {form:"KK<b>て</b> います", pola:"KK て います", arti:"Sedang ~ / keadaan berlanjut / kebiasaan", bab:23, contoh:"たべて います → sedang makan"},
      {form:"KK<b>て</b>、KK", pola:"KK て、KK て、KK", arti:"Rangkaian tindakan berurutan", bab:24, contoh:"おきて、かおをあらって → bangun lalu cuci muka"},
      {form:"KK<b>て</b> から、KK", pola:"KK て から、KK", arti:"Setelah ~ (urutan ketat, KK1 harus selesai dulu)", bab:24, contoh:"たべてから → setelah makan"},
      {form:"KK<b>て</b> あげます/もらいます/くれます", pola:"KK て あげます / もらいます / くれます", arti:"Memberi/menerima tindakan (manfaat mengalir)", bab:35, contoh:"おしえて あげます → mengajari (untuk orang lain)"},
      {form:"KK<b>て</b> + も、〜", pola:"KK ても、(klausa utama)", arti:"Walaupun ~ (berlawanan harapan)", bab:39, contoh:"たかくても、かいます → walaupun mahal, tetap beli"},
      {form:"KK1 <b>て</b> KK2", pola:"KK1 bentuk て + KK2", arti:"Dengan cara ~ (KK1 = cara/kondisi melakukan KK2)", bab:44, contoh:"ソースをつけて たべます → makan dengan saus"},
      {form:"KK<b>て</b> いただけませんか", pola:"KK て いただけませんか", arti:"Bisakah Anda ~? (permintaan sangat sopan)", bab:41, contoh:"みて いただけませんか → bisakah diperiksa?"},
      {form:"KK<b>て</b> しまいました ①", pola:"KK て しまいました (penyelesaian tuntas)", arti:"Sudah selesai / terlanjur ~ (Bab 46)", bab:46, contoh:"ほんを よんで しまいました → sudah selesai membaca buku | informal: よんじゃいました"},
      {form:"KK<b>て</b> しまいました ②", pola:"KK て しまいました (penyesalan)", arti:"Tidak sengaja ~ / disayangkan ~ (Bab 46)", bab:46, contoh:"さいふを なくして しまいました → tidak sengaja kehilangan dompet | informal: なくしちゃいました"},
      {form:"KK<b>て</b> おきます", pola:"KK て おきます (persiapan)", arti:"Melakukan ~ terlebih dahulu / sebagai persiapan (Bab 47)", bab:47, contoh:"しりょうを よんで おきます → baca dokumen dulu | informal: よんどきます"},
      {form:"KB が KK-tr <b>て</b> あります", pola:"KB が KK-transitif て あります", arti:"Sudah ~ / keadaan hasil tindakan sengaja (Bab 48)", bab:48, contoh:"ポスターが はって あります → poster sudah ditempel"},
      {form:"まだ KK<b>て</b> いません", pola:"まだ + KK て いません", arti:"Masih belum ~ (belum dilakukan) (Bab 49)", bab:49, contoh:"まだ しゅくだいを して いません → PR masih belum dikerjakan"},
      {form:"<ruby>自動詞<rt>じどうし</rt></ruby><b>て</b> います vs <ruby>他動詞<rt>たどうし</rt></ruby><b>て</b> います", pola:"KK intransitif て います ↔ KK transitif て います", arti:"Intrans. て います = kondisi hasil | Trans. て います = sedang dilakukan / sengaja", bab:45, contoh:"まどが あい<b>て</b> います (jendela terbuka) ↔ まどを あけ<b>て</b> います (sedang membuka jendela)"},
      {form:"KK<b>て</b> みます", pola:"KK て みます", arti:"Mencoba ~ (sesuatu yang belum pernah dicoba)", bab:64, contoh:"はいて みても いいですか → boleh coba pakai?"},
      {form:"KK<b>て</b> いただきました", pola:"KK て いただきました", arti:"Menerima tindakan dari orang berstatus lebih tinggi", bab:66, contoh:"せんせいに おしえて いただきました → guru mengajari saya"},
      {form:"KK<b>て</b> くださいました", pola:"KK て くださいました", arti:"Orang berstatus tinggi melakukan ~ untuk saya", bab:66, contoh:"せんせいが おしえて くださいました → guru mengajari saya"},
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. BENTUK TA (〜た<ruby>形<rt>けい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "〜た<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-ta", label: "Bentuk た — Lampau Biasa / Pengalaman / Setelah",
    desc: "Bentuk た = ganti て→た / で→だ. Digunakan untuk lampau ragam biasa, pengalaman, urutan setelah, dan memodifikasi kata benda.",
    pola: [
      {form:"KK<b>た</b> ことが あります", pola:"KK た ことが あります", arti:"Pernah ~ (pengalaman)", bab:28, contoh:"たべた ことが あります → pernah makan"},
      {form:"KK<b>た</b>り、KK<b>た</b>り します", pola:"KK たり、KK たり します", arti:"Antara lain ~ (beberapa contoh kegiatan)", bab:28, contoh:"たべたり のんだり します → makan-minum dll"},
      {form:"KK<b>た</b> あとで、KK", pola:"KK た あとで、KK", arti:"Setelah ~ (tindakan sudah selesai)", bab:29, contoh:"たべた あとで → setelah makan"},
      {form:"KK<b>た</b> とき、KK", pola:"KK た とき、KK", arti:"Ketika sudah ~ (tindakan di とき sudah terjadi)", bab:33, contoh:"たべた とき → ketika (sudah) makan"},
      {form:"[KK<b>た</b>] + KB", pola:"KK た + KB", arti:"Kata kerja lampau memodifikasi kata benda", bab:32, contoh:"たべた ごはん → nasi yang (sudah) dimakan"},
      {form:"KK<b>た</b> + ほうが いいです", pola:"KK-た + ほうが いいです", arti:"Sebaiknya lakukan ~ (saran positif)", bab:51, contoh:"はやく ねた ほうが いいです → sebaiknya segera tidur"},
      {form:"KK<b>た</b> + ばかりです", pola:"KK た ばかりです", arti:"Baru saja selesai ~ (subjektif, perasaan 'baru')", bab:74, contoh:"さっき たべた ばかりです → baru saja makan tadi"},
      {form:"KK<b>た</b> + ところです", pola:"KK た ところです", arti:"Baru saja selesai ~ (objektif, momen tepat)", bab:72, contoh:"たった今 シャワーを あびた ところです → baru saja selesai mandi"},
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. BENTUK NAI (〜ない<ruby>形<rt>けい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "〜ない<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-nai", label: "Bentuk ない — Negatif Biasa / Kewajiban / Larangan",
    desc: "Bentuk negatif ragam biasa. Digunakan untuk kewajiban, larangan halus, 'tidak perlu', dan memodifikasi kata benda.",
    pola: [
      {form:"KK<b>なければ</b> なりません", pola:"KK なければ なりません", arti:"Harus ~ (kewajiban)", bab:26, contoh:"たべなければ なりません → harus makan"},
      {form:"KK<b>なくても</b> いいです", pola:"KK なくても いいです", arti:"Tidak perlu ~ (tidak wajib)", bab:26, contoh:"たべなくても いいです → tidak perlu makan"},
      {form:"KK<b>ないで</b> ください", pola:"KK ないで ください", arti:"Tolong jangan ~ (larangan sopan)", bab:26, contoh:"たべないで ください → tolong jangan makan"},
      {form:"[KK<b>ない</b>] + KB", pola:"KK ない + KB", arti:"Kata kerja negatif memodifikasi kata benda", bab:32, contoh:"たべない ひと → orang yang tidak makan"},
      {form:"KK1 <b>ないで</b> KK2", pola:"KK1 ないで + KK2", arti:"Tanpa melakukan KK1, lakukan KK2", bab:44, contoh:"ソースをつけないで たべます → makan tanpa saus"},
      {form:"KK<b>ない</b> + ように、KK", pola:"KK ない + ように、KK", arti:"Agar tidak ~ (tujuan negatif)", bab:56, contoh:"<ruby>感染<rt>かんせん</rt></ruby>しない ように、<ruby>手<rt>て</rt></ruby>を <ruby>洗<rt>あら</rt></ruby>います → cuci tangan agar tidak tertular"},
      {form:"KK<b>ない</b> + ように して います", pola:"KK ない + ように して います", arti:"Sedang berusaha tidak ~ (kebiasaan negatif)", bab:57, contoh:"エレベーターに <ruby>乗<rt>の</rt></ruby>らない ように して います → berusaha tidak naik lift"},
      {form:"KK<b>ない</b> + ように して ください", pola:"KK ない + ように して ください", arti:"Mohon usahakan tidak ~ (permintaan tidak langsung)", bab:57, contoh:"<ruby>遅<rt>おく</rt></ruby>れない ように して ください → mohon usahakan tidak terlambat"},
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. BENTUK KAMUS (<ruby>辞書形<rt>じしょけい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "<ruby>辞書形<rt>じしょけい</rt></ruby>",
    chip: "vv-kamus", label: "Bentuk Kamus — Dasar / Sebelum / Kondisi",
    desc: "Bentuk dasar kata kerja (kamus). Digunakan sebelum こと、まえに、とき (belum terjadi), kondisi otomatis と, dan ragam biasa.",
    pola: [
      {form:"KK(kamus) こと<b>が できます</b>", pola:"KK(kamus) こと が できます", arti:"Bisa ~ (kemampuan — cara lain dari potensial)", bab:27, contoh:"たべる こと が できます → bisa makan"},
      {form:"KK(kamus) <b>まえに</b>、KK", pola:"KK(kamus) まえに、KK", arti:"Sebelum ~ (tindakan di まえに belum terjadi)", bab:29, contoh:"たべる まえに → sebelum makan"},
      {form:"KK(kamus) <b>とき</b>、KK", pola:"KK(kamus) とき、KK", arti:"Ketika (akan/sedang) ~ (belum selesai)", bab:33, contoh:"たべる とき → ketika (akan) makan"},
      {form:"[KK(kamus)] + KB", pola:"KK(kamus) + KB", arti:"Kata kerja biasa memodifikasi kata benda", bab:32, contoh:"たべる ひと → orang yang makan"},
      {form:"KK(kamus) <b>と</b>、〜", pola:"KK(kamus) と、(klausa utama)", arti:"Kalau ~, maka ~ pasti terjadi (kondisi otomatis/alami)", bab:36, contoh:"このボタンをおすと、おつりがでます → kalau tekan tombol ini, kembalian keluar"},
      {form:"KK(kamus) <b>つもりです</b>", pola:"KK(kamus) + つもりです", arti:"Saya berniat / bertekad ~ (Bab 50)", bab:50, contoh:"らいねん くるまを かう つもりです → berniat beli mobil tahun depan"},
      {form:"KK(kamus) + <b>ように、</b>KK", pola:"KK kamus/ない + ように、KK", arti:"Agar ~ / Supaya ~ (tujuan)", bab:56, contoh:"<ruby>感染<rt>かんせん</rt></ruby>しない ように、よく <ruby>手<rt>て</rt></ruby>を <ruby>洗<rt>あら</rt></ruby>いましょう → agar tidak tertular, cuci tangan"},
      {form:"KK potensial + <b>ように なりました</b>", pola:"KK potensial + ように なりました", arti:"Menjadi bisa ~ (perubahan kemampuan tercapai)", bab:56, contoh:"<ruby>漢字<rt>かんじ</rt></ruby>が <ruby>読<rt>よ</rt></ruby>める ように なりました → sekarang bisa baca kanji"},
      {form:"KK(kamus) + <b>ように して います</b>", pola:"KK kamus/ない + ように して います", arti:"Sedang berusaha membiasakan ~ (proses)", bab:57, contoh:"できるだけ 11じまでに <ruby>寝<rt>ね</rt></ruby>る ように して います → berusaha tidur sebelum jam 11"},
      {form:"KK(kamus) + <b>ように して ください</b>", pola:"KK kamus/ない + ように して ください", arti:"Mohon usahakan ~ (permintaan tidak langsung)", bab:57, contoh:"<ruby>遅<rt>おく</rt></ruby>れない ように して ください → mohon usahakan tidak terlambat"},
      {form:"KK(kamus) + <b>のは</b> KS です", pola:"KK kamus + のは + KS", arti:"(Melakukan) ~ itu KS (nominalisasi topik)", bab:60, contoh:"<ruby>散歩<rt>さんぽ</rt></ruby>する のは <ruby>気持<rt>きも</rt></ruby>ちが いいです → jalan pagi itu menyenangkan"},
      {form:"KK(kamus) + <b>のが</b> KS です", pola:"KK kamus + のが + KS", arti:"(Melakukan) ~ itu KS (nominalisasi objek preferensi)", bab:60, contoh:"<ruby>音楽<rt>おんがく</rt></ruby>を <ruby>聞<rt>き</rt></ruby>く のが すきです → suka mendengarkan musik"},
      {form:"KK(kamus) / KB の <b><ruby>予定<rt>よてい</rt></ruby>です</b>", pola:"KK(kamus) / KB の + <ruby>予定<rt>よてい</rt></ruby>です", arti:"Berencana ~ / dijadwalkan ~ (Bab 50)", bab:50, contoh:"でんしゃは 12じに つく よていです → kereta dijadwalkan tiba jam 12"},
      {form:"KS い <b>く</b> / KS な・KB <b>に</b> + なります", pola:"KS/KB + なります", arti:"Menjadi ~ (perubahan kondisi — い→く, な→に, KB→に)", bab:34, contoh:"さむ<b>く</b>なります → menjadi dingin | しずか<b>に</b>なります → menjadi hening | いしゃ<b>に</b>なります → menjadi dokter"},
      {form:"KK(kamus) + <b>のを</b> わすれました", pola:"KK kamus のを わすれました", arti:"Lupa melakukan ~ (nominalisasi sebagai objek)", bab:61, contoh:"でんきを けす のを わすれました → lupa mematikan lampu"},
      {form:"KK(kamus) + <b>ために</b>、KK", pola:"KK kamus ために、KK", arti:"Untuk/Demi melakukan ~ (tujuan sadar)", bab:67, contoh:"ろんぶんを かく ために、ほんを かりました → untuk menulis tesis, meminjam buku"},
      {form:"KK(kamus) + <b>のに</b> つかいます/いいです", pola:"KK kamus のに + つかいます/いいです/べんりです", arti:"Untuk fungsi/tujuan ~ (kegunaan alat/benda)", bab:68, contoh:"たまごを きる のに つかいます → digunakan untuk memotong telur"},
      {form:"KK(kamus) + <b>ところです</b>", pola:"KK kamus ところです", arti:"Baru akan ~ (tindakan akan segera dimulai)", bab:72, contoh:"これから ひるごはんを たべる ところです → akan makan siang sekarang"},
      {form:"[biasa] + <b>はずです</b>", pola:"[Bentuk biasa] はずです", arti:"Seharusnya ~ (kesimpulan berdasarkan alasan logis)", bab:74, contoh:"にちようびですから、やすみの はずです → karena Minggu, seharusnya libur"},
    ],
    note: "⚠️ KK(kamus)+と: setelah と TIDAK boleh ~たい、~ましょう、~てください. Untuk kondisi yang bisa diikuti keinginan/ajakan → gunakan たら. つもり=niat pribadi, <ruby>予定<rt>よてい</rt></ruby>=jadwal terjadwal (lebih pasti)."
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. BENTUK VOLITIONAL / AJAKAN (<ruby>意向形<rt>いこうけい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "<ruby>意向形<rt>いこうけい</rt></ruby>",
    chip: "vv-ikou", label: "Bentuk Volitional — ayo ~ / mari ~ / mau ~",
    desc: "Menyatakan niat, ajakan bersama, atau tawaran. Ragam sopan: 〜ましょう. Ragam biasa: Grup I →う<ruby>段<rt>だん</rt></ruby>+お<ruby>段<rt>だん</rt></ruby>+う, Grup II →よう, Grup III →しよう/こよう.",
    pola: [
      {form:"KK<b>ましょう</b>", pola:"KK ましょう", arti:"Ayo ~ / Mari ~ (ajakan bersama, sopan)", bab:10, contoh:"たべましょう → ayo makan"},
      {form:"KK<b>ましょうか</b>", pola:"KK ましょうか", arti:"Boleh saya ~? / Bagaimana kalau ~? (tawaran bantuan)", bab:21, contoh:"もちましょうか → boleh saya bawakan?"},
      {form:"Gr.I: bunyi い→<b>お</b> + う", pola:"Godan: ganti bunyi i-row → o-row + う", arti:"Volitional Grup I (biasa)", bab:30, contoh:"のむ→のもう | かく→かこう | いく→いこう | かう→かおう"},
      {form:"Gr.II: buang る + <b>よう</b>", pola:"Ichidan: KK stem + よう", arti:"Volitional Grup II (biasa)", bab:30, contoh:"たべる→たべよう | みる→みよう"},
      {form:"Gr.III: <b>する→しよう / くる→こよう</b>", pola:"Tidak beraturan", arti:"Volitional Grup III (biasa)", bab:30, contoh:"する→しよう | くる→こよう"},
      {form:"<ruby>意向形<rt>いこうけい</rt></ruby> + <b>と<ruby>思<rt>おも</rt></ruby>っています</b>", pola:"<ruby>意向形<rt>いこうけい</rt></ruby> + と <ruby>思<rt>おも</rt></ruby>って います", arti:"Saya bermaksud / berniat ~ (Bab 49)", bab:49, contoh:"りょこうしようと おもっています → berniat pergi liburan"},
      {form:"<ruby>意向形<rt>いこうけい</rt></ruby> + <b>とする</b>", pola:"<ruby>意向形<rt>いこうけい</rt></ruby> + とする / としたとき", arti:"Mencoba ~ / Hendak ~ (usaha yang mungkin gagal/terganggu)", bab:50, contoh:"でかけようとした<b>とき</b>、ともだちが きました → saat hendak keluar, teman datang"},
    ],
    note: "⚠️ ましょう = ragam sopan. 〜よう = ragam biasa (futsukei). 〜ようとする = 'mencoba/hendak' — berbeda dari 〜てみる (mencoba pengalaman baru)."
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. BENTUK BIASA (<ruby>普通体<rt>ふつうたい</rt></ruby> / <ruby>辞書<rt>じしょ</rt></ruby>・た・ない)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "<ruby>普通体<rt>ふつうたい</rt></ruby>",
    chip: "vv-fut", label: "Ragam Biasa — Kutipan / Pendapat / Penjelasan",
    desc: "Ragam biasa (kamus/た/ない) digunakan dalam percakapan santai, kutipan, pendapat, dan klausa pembayang. Bukan bentuk tersendiri, tapi 'mode' semua bentuk tanpa です・ます.",
    pola: [
      {form:"[biasa] <b>と <ruby>思<rt>おも</rt></ruby>います</b>", pola:"[Bentuk biasa] と <ruby>思<rt>おも</rt></ruby>います", arti:"Saya pikir ~ (pendapat/perkiraan)", bab:31, contoh:"あしたは あめだと おもいます → saya pikir besok hujan"},
      {form:"[biasa] <b>と <ruby>言<rt>い</rt></ruby>います</b>", pola:"[Bentuk biasa] と <ruby>言<rt>い</rt></ruby>います", arti:"Dia berkata ~ (melaporkan ucapan orang lain)", bab:31, contoh:"くると いいました → bilang akan datang"},
      {form:"KK た・ない・kamus + <b>KB</b>", pola:"[Bentuk biasa] + KB", arti:"Semua klausa pembayang KB pakai ragam biasa", bab:32, contoh:"たべた ひと / たべない ひと / たべる ひと"},
      {form:"[biasa] <b>んです</b>", pola:"[Bentuk biasa] + んです", arti:"Menjelaskan alasan/kondisi (soalnya ~; faktanya ~)", bab:40, contoh:"きぶんがわるいんです → (alasannya) badan tidak enak | ⚠️ KSな/KB: だ→なんです"},
      {form:"[biasa] <b>んですが</b>、〜", pola:"[Bentuk biasa] + んですが、(permintaan/pertanyaan)", arti:"Soalnya ~ (pengantar sopan sebelum permintaan/saran)", bab:41, contoh:"いきたいんですが、どうしたら いいですか → mau pergi, bagaimana caranya?"},
      {form:"[biasa] + <b>かも しれません</b>", pola:"[Bentuk biasa] + かもしれません", arti:"Mungkin saja ~ (ketidakpastian ~50%)", bab:52, contoh:"ゆきが ふる <b>かも しれません</b> → mungkin saja turun salju"},
      {form:"[biasa] + <b>でしょう</b>", pola:"[Bentuk biasa] + でしょう", arti:"Akan / Pasti ~ (perkiraan lebih yakin ~70-80%)", bab:52, contoh:"つよい かぜが ふく <b>でしょう</b> → angin kencang akan bertiup"},
      {form:"[biasa] <b>し</b>、[biasa] <b>し</b>、それに〜", pola:"[Bentuk biasa] し、[Bentuk biasa] し、それに ~", arti:"Selain itu ~ (beberapa alasan sejajar)", bab:53, contoh:"ねだんも やすい<b>し</b>、あじも いい<b>し</b>、いつも この みせで たべています"},
      {form:"[biasa] + <b>ので</b>、〜", pola:"[Bentuk biasa] ので、〜", arti:"Karena ~ (alasan sopan/halus)", bab:63, contoh:"いそがしい ので、いけません → karena sibuk, tidak bisa pergi"},
      {form:"interogatif + [biasa] <b>か</b>、〜", pola:"interogatif + [bentuk biasa] か、〜", arti:"(Bertanya) kapan/di mana/siapa/apa ~ (pertanyaan terbenam)", bab:64, contoh:"なんじに しゅっぱつするか、おしえてください → tolong beritahu jam berapa berangkat"},
      {form:"[biasa] + <b>かどうか</b>、〜", pola:"[Bentuk biasa] かどうか、〜", arti:"Apakah ~ atau tidak (pertanyaan ya/tidak terbenam)", bab:64, contoh:"まちがいが ないか どうか、たしかめてください → tolong pastikan ada kesalahan atau tidak"},
      {form:"[biasa] + <b>のに</b>、〜", pola:"[Bentuk biasa] のに、〜", arti:"Padahal ~ (kontras/kekecewaan)", bab:71, contoh:"30ぷんも まったのに、きませんでした → padahal sudah tunggu 30 menit, tidak datang"},
      {form:"[biasa] + <b>そうです</b> (<ruby>伝聞<rt>でんぶん</rt></ruby>)", pola:"[Bentuk biasa] そうです (<ruby>伝聞<rt>でんぶん</rt></ruby>)", arti:"Katanya ~ / Saya dengar ~ (informasi dari orang lain)", bab:73, contoh:"あした テストが あるそうです → katanya besok ada ujian"},
      {form:"[biasa] + <b>ようです</b>", pola:"[Bentuk biasa] ようです", arti:"Tampaknya ~ / Sepertinya ~ (kesimpulan dari pengamatan)", bab:73, contoh:"だれか いるようです → sepertinya ada seseorang"},
    ]
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. BENTUK TARA (〜たら<ruby>形<rt>けい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "〜たら<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-tara", label: "Bentuk たら — Kondisi Hipotetis / Urutan Waktu",
    desc: "Dibentuk dari bentuk lampau biasa (た/だ) + ら. Dua fungsi: (1) kondisi hipotetis 'kalau seandainya ~' — bisa diikuti keinginan/ajakan; (2) urutan kejadian 'setelah/ketika ~ terjadi'.",
    pola: [
      {form:"KK(た) + <b>ら</b>、〜たい/〜ましょう", pola:"KK たら、(keinginan/ajakan/permintaan)", arti:"Kalau/Seandainya ~ (kondisi hipotetis)", bab:37, contoh:"もし 1<ruby>億円<rt>おくえん</rt></ruby> あったら、<ruby>家<rt>いえ</rt></ruby>を <ruby>買<rt>か</rt></ruby>いたいです → kalau ada 100jt yen, ingin beli rumah"},
      {form:"<b>もし</b> + KKたら、〜", pola:"もし 〜たら、〜", arti:"Seandainya ~ (menekankan kondisi belum tentu terjadi)", bab:37, contoh:"もし <ruby>雨<rt>あめ</rt></ruby>だったら、タクシーで <ruby>行<rt>い</rt></ruby>きます → seandainya hujan, pergi dengan taksi"},
      {form:"KK(た) + <b>ら</b>、すぐ〜", pola:"KK たら、(urutan kejadian pasti)", arti:"Setelah/Ketika ~ (kejadian pasti terjadi)", bab:38, contoh:"<ruby>駅<rt>えき</rt></ruby>に <ruby>着<rt>つ</rt></ruby>いたら、<ruby>電話<rt>でんわ</rt></ruby>して ください → setelah tiba di stasiun, tolong telepon"},
      {form:"〜<b>たら</b> いいですか", pola:"どうしたら いいですか", arti:"Sebaiknya bagaimana ~? (meminta saran)", bab:41, contoh:"どうやって いったら いいですか → bagaimana cara terbaik pergi ke sana?"},
    ],
    note: "⚠️ Konjugasi: KK I: のむ→のんだ→のんだら | KK II: たべる→たべた→たべたら | KK III: する→した→したら / くる→きた→きたら | KSい: あつかった→あつかったら | KSな/KB: だった→だったら"
  },
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 10. BENTUK TEMO (〜ても<ruby>形<rt>けい</rt></ruby>)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    bentuk: "〜ても<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-temo", label: "Bentuk ても — Walaupun ~ / Konsesif",
    desc: "Menyatakan sesuatu berlawanan harapan. Dibentuk dari て-form + も. KS い: ~くても. KS な/KB: ~でも.",
    pola: [
      {form:"KK<b>ても</b>、〜", pola:"KK ても、(klausa utama)", arti:"Walaupun ~ (tetap terjadi, berlawanan harapan)", bab:39, contoh:"あめが ふっても、いきます → walaupun hujan, tetap pergi"},
      {form:"KK<b>なくても</b>、〜", pola:"KK なくても、〜", arti:"Walaupun tidak ~ (berlawanan harapan, negatif)", bab:39, contoh:"たべなくても、だいじょうぶです → walaupun tidak makan, tidak apa-apa"},
      {form:"KSい → <b>くても</b>、〜", pola:"KS い (~く) + ても", arti:"Walaupun ~ (kata sifat い)", bab:39, contoh:"たかくても、かいます → walaupun mahal, tetap beli"},
      {form:"KSな/KB → <b>でも</b>、〜", pola:"KS な / KB + でも", arti:"Walaupun ~ (kata sifat な / kata benda)", bab:39, contoh:"にちようびでも → walaupun hari minggu"},
      {form:"<b>いくら</b> 〜ても、〜", pola:"いくら 〜ても、〜", arti:"Bagaimanapun/seberapa pun ~ (penekanan)", bab:39, contoh:"いくら かんがえても、わかりません → bagaimanapun dipikir, tidak mengerti"},
    ],
    note: "⚠️ Konjugasi: KK: ikuti て-form lalu +も (のんで→のんでも | たべて→たべても) | KSい: ~い→~くても | KSな/KB: ~だ→~でも"
  },
  {
    bentuk: "〜ば<ruby>形<rt>けい</rt></ruby>",
    chip: "vv-ba", label: "Bentuk ば — Jika ~, maka ~ (Kondisional)",
    desc: "Bentuk kondisional (<ruby>条件形<rt>じょうけんけい</rt></ruby>). Menyatakan 'jika A maka B'. Cocok untuk kondisi alami/logis. ⚠️ Tidak bisa diikuti keinginan/perintah langsung (〜たい, 〜てください). Gunakan たら untuk konteks tersebut.",
    pola: [
      {form:"KKグI: <b>〜う → 〜えば</b>", pola:"Ganti vokal う → え, tambah ば", arti:"Jika ~ (Grup I / Godan)", bab:54, contoh:"のむ→のめば / まつ→まてば / かく→かけば / はなす→はなせば"},
      {form:"KKグII: <b>〜る → 〜れば</b>", pola:"Ganti る → れ, tambah ば", arti:"Jika ~ (Grup II / Ichidan)", bab:54, contoh:"たべる→たべれば / みる→みれば / ねる→ねれば"},
      {form:"KKグIII: <b>くる → くれば / する → すれば</b>", pola:"Tidak beraturan", arti:"Jika ~ (Grup III / Tidak beraturan)", bab:54, contoh:"くる→くれば / する→すれば / べんきょうする→べんきょうすれば"},
      {form:"KK negatif: <b>〜ない → 〜なければ</b>", pola:"KK-ない, ganti ない → なければ", arti:"Jika tidak ~ (kondisional negatif)", bab:54, contoh:"のまない→のまなければ / おきない→おきなければ"},
      {form:"KSい: <b>〜い → 〜ければ</b>", pola:"Ganti い → け, tambah れば", arti:"Jika ~ (kata sifat い)", bab:55, contoh:"あつい→あつければ / さむい→さむければ ⚠️ いい→よければ (tidak teratur!)"},
      {form:"KSな/KB: <b>〜なら</b>", pola:"KS な / KB + なら", arti:"Jika ~ / Kalau memang soal ~ (kata sifat な / kata benda)", bab:55, contoh:"きれいなら / しずかなら / あめなら / ひまなら"},
    ],
    note: "⚠️ Perbandingan kondisional: ば = kondisi alami/logis umum | たら = kondisi hipotesis/urutan waktu (paling fleksibel) | と = kondisi otomatis/selalu (alam, mesin) | なら = merespons konteks lawan bicara"
  },
  {
    bentuk: "<ruby>受身形<rt>うけみけい</rt></ruby>",
    chip: "vv-ukemi", label: "Bentuk <ruby>受身<rt>うけみ</rt></ruby> — Pasif (menerima tindakan)",
    desc: "Bentuk pasif menyatakan bahwa subjek menerima tindakan dari pihak lain. Terkonjugasi seperti KK Grup II. Dipakai untuk: (1) menerima tindakan langsung, (2) menerima tindakan pada milik sendiri, (3) pasif impersonal/fakta umum.",
    pola: [
      {form:"KKグI: <b>〜う → 〜われます</b>", pola:"Ganti vokal う → あ, tambah れます", arti:"Pasif Grup I — Godan", bab:58, contoh:"のむ→のまれます / かく→かかれます / よぶ→よばれます / とる→とられます"},
      {form:"KKグII: <b>〜る → 〜られます</b>", pola:"Ganti る → られます", arti:"Pasif Grup II — Ichidan", bab:58, contoh:"たべる→たべられます / みる→みられます / ほめる→ほめられます"},
      {form:"KKグIII: <b>くる→こられます / する→されます</b>", pola:"Tidak beraturan", arti:"Pasif Grup III — Tidak beraturan", bab:58, contoh:"くる→こられます / する→されます / しょうたいする→しょうたいされます"},
      {form:"KB1 は KB2 <b>に</b> KK<b><ruby>受身<rt>うけみ</rt></ruby></b>", pola:"KB1 は KB2 に + KK <ruby>受身形<rt>うけみけい</rt></ruby>", arti:"Pasif langsung — KB1 menerima tindakan dari KB2", bab:58, contoh:"(わたしは) せんせい<b>に</b> しかられました → saya dimarahi guru"},
      {form:"KB1 は KB2 <b>に</b> KB3 <b>を</b> KK<b><ruby>受身<rt>うけみ</rt></ruby></b>", pola:"KB1 は KB2 に KB3 を + KK <ruby>受身形<rt>うけみけい</rt></ruby>", arti:"Pasif kepemilikan — KB2 melakukan sesuatu pada milik KB1", bab:58, contoh:"(わたしは) おとうと<b>に</b> パソコン<b>を</b> こわされました → komputer saya dirusak adik"},
      {form:"KB <b>が/は</b> KK<b><ruby>受身<rt>うけみ</rt></ruby></b> (tanpa pelaku)", pola:"KB が/は + KK <ruby>受身形<rt>うけみけい</rt></ruby>", arti:"Pasif impersonal — pelaku tidak disebutkan/tidak penting", bab:59, contoh:"インスタントラーメンは 1958ねんに <ruby>発明<rt>はつめい</rt></ruby>されました → mie instan ditemukan 1958"},
      {form:"KB は [<ruby>人名<rt>じんめい</rt></ruby>] <b>によって</b> KK<b><ruby>受身<rt>うけみ</rt></ruby></b>", pola:"KB は + pelaku + によって + KK <ruby>受身形<rt>うけみけい</rt></ruby>", arti:"Pasif formal — oleh ~ (karya/penemuan/ciptaan)", bab:59, contoh:"<ruby>銀河鉄道の夜<rt>ぎんがてつどうのよる</rt></ruby>は <ruby>宮沢賢治<rt>みやざわけんじ</rt></ruby><b>によって</b> かかれました"},
    ],
    note: "⚠️ に (pelaku tindakan langsung, orang/hewan) vs によって (pelaku karya/ciptaan/penemuan, lebih formal). ⚠️ Jangan bingung dengan Gr II potensial: たべられます (bisa makan / dimakan) — konteks menentukan maknanya."
  },
  {
    bentuk: "<ruby>命令形<rt>めいれいけい</rt></ruby>・<ruby>禁止形<rt>きんしけい</rt></ruby>",
    chip: "vv-meirei", label: "Bentuk Perintah & Larangan — Darurat / Tanda",
    desc: "<ruby>命令形<rt>めいれいけい</rt></ruby> = perintah langsung (darurat, olahraga, tanda). <ruby>禁止形<rt>きんしけい</rt></ruby> = larangan keras (KK kamus + な). Digunakan dalam situasi non-sopan.",
    pola: [
      {form:"Gr.I: bunyi i-row → <b>e-row</b>", pola:"Godan: ganti bunyi akhir i → e", arti:"Perintah Grup I", bab:75, contoh:"のむ→のめ | まつ→まて | かく→かけ | はしる→はしれ"},
      {form:"Gr.II: buang る + <b>ろ</b>", pola:"Ichidan: KK stem + ろ", arti:"Perintah Grup II", bab:75, contoh:"たべる→たべろ | みる→みろ | ねる→ねろ | やめる→やめろ"},
      {form:"Gr.III: する→<b>しろ</b> / くる→<b>こい</b>", pola:"Tidak beraturan", arti:"Perintah Grup III", bab:75, contoh:"する→しろ | くる→こい"},
      {form:"KK kamus + <b>な</b>", pola:"KK kamus + な", arti:"Jangan ~ (larangan keras)", bab:75, contoh:"のむな | みるな | するな | くるな — sangat kasar, hanya untuk darurat/tanda"},
    ],
    note: "⚠️ Bentuk perintah dan larangan SANGAT KASAR — hanya dipakai dalam situasi darurat, semangat olahraga, atau tanda/rambu."
  },
  {
    bentuk: "<ruby>使役形<rt>しえきけい</rt></ruby>",
    chip: "vv-shieki", label: "Bentuk Kausatif — Menyuruh / Mengizinkan",
    desc: "Menyuruh atau mengizinkan seseorang melakukan sesuatu. Digunakan oleh yang berstatus lebih tinggi.",
    pola: [
      {form:"Gr.I: bunyi i-row → <b>a-row + せます</b>", pola:"Godan: ganti bunyi akhir → a + せます", arti:"Kausatif Grup I", bab:76, contoh:"よむ→よませます | かく→かかせます | はなす→はなさせます"},
      {form:"Gr.II: buang る + <b>させます</b>", pola:"Ichidan: KK stem + させます", arti:"Kausatif Grup II", bab:76, contoh:"たべる→たべさせます | みる→みさせます"},
      {form:"Gr.III: する→<b>させます</b> / くる→<b>こさせます</b>", pola:"Tidak beraturan", arti:"Kausatif Grup III", bab:76, contoh:"する→させます | くる→こさせます"},
      {form:"KK kausatif + <b>て いただけませんか</b>", pola:"KK kausatif て いただけませんか", arti:"Bolehkah saya ~ (meminta izin sangat sopan)", bab:76, contoh:"やすませて いただけませんか → bolehkah saya izin tidak masuk?"},
    ],
    note: "⚠️ KK intransitif: orang を + kausatif (こどもを いかせます). KK transitif: orang に + kausatif (がくせいに よませます)."
  },
  {
    bentuk: "<ruby>敬語<rt>けいご</rt></ruby>",
    chip: "vv-keigo", label: "Bahasa Hormat & Merendah — <ruby>尊敬語<rt>そんけいご</rt></ruby>・<ruby>謙譲語<rt>けんじょうご</rt></ruby>",
    desc: "<ruby>尊敬語<rt>そんけいご</rt></ruby> = meninggikan pelaku (orang lain). <ruby>謙譲語<rt>けんじょうご</rt></ruby> = merendahkan diri sendiri. Keduanya menunjukkan hormat.",
    pola: [
      {form:"<b><ruby>尊敬語<rt>そんけいご</rt></ruby></b>: KK [〜(ら)れます]", pola:"KK pasif = <ruby>尊敬語<rt>そんけいご</rt></ruby> (bentuk sama dengan pasif)", arti:"(Beliau) melakukan ~ (hormat kepada pelaku)", bab:77, contoh:"しゃちょうは 9じはんに こられます → direktur datang jam 9:30"},
      {form:"<b>お</b>(KK stem)<b>に なります</b>", pola:"お + KK stem + に なります", arti:"(Beliau) melakukan ~ (lebih sopan dari <ruby>尊敬語<rt>そんけいご</rt></ruby> biasa)", bab:77, contoh:"せんせいが おかえりに なります → guru pulang"},
      {form:"<b>お</b>(KK stem)<b>ください</b>", pola:"お + KK stem + ください / ご + KB + ください", arti:"Silakan ~ (permintaan sopan setara てください)", bab:77, contoh:"どうぞ おはいりください → silakan masuk"},
      {form:"<b><ruby>謙譲語<rt>けんじょうご</rt></ruby></b>: お(KK stem)<b>します</b>", pola:"お + KK stem + します / ご + KB + します", arti:"Saya melakukan ~ (merendahkan diri)", bab:78, contoh:"おにもつを おもちします → saya bawakan barang Anda"},
      {form:"Ungkapan khusus <ruby>尊敬語<rt>そんけいご</rt></ruby>", pola:"いらっしゃいます / めしあがります / おっしゃいます / ごぞんじです", arti:"Bentuk khusus hormat", bab:77, contoh:"しゃちょうは かいぎしつに いらっしゃいます → direktur ada di ruang rapat"},
      {form:"Ungkapan khusus <ruby>謙譲語<rt>けんじょうご</rt></ruby>", pola:"まいります / おります / もうします / いただきます / はいけんします", arti:"Bentuk khusus merendah", bab:78, contoh:"わたしが まいります → saya yang akan pergi"},
    ],
    note: "⚠️ <ruby>尊敬語<rt>そんけいご</rt></ruby>: subjek = orang yang dihormati. <ruby>謙譲語<rt>けんじょうご</rt></ruby>: subjek = diri sendiri. Jangan tertukar!"
  },
];

// ── RANGKUMAN DATA: Partikel dengan multi-fungsi ──
// ── CARA PAKAI: Partikel baru → tambah objek baru {part, romaji, color, funcs:[...]}.
//    Fungsi baru pada partikel yang sudah ada → tambah entri di funcs[] partikel tersebut.
//    Format fungsi: {tag, tagcls, desc, ex, tr}
//    tagcls pilihan: tag-all (topik/subjek) | tag-obj (objek) | tag-dir (arah) |
//                    tag-reason (alasan/kondisi) | tag-recv (penerima) | tag-quote (kutipan) ──
const RANGKUMAN_PARTIKEL_V2 = [
  {part:"は", romaji:"wa", color:"#c084fc",
   funcs:[
     {tag:"TOPIK", tagcls:"tag-all", desc:"Menandai topik kalimat (bisa berbeda dengan subjek)", ex:"わたし<b>は</b> がくせいです", ex2:"あした<b>は</b> <ruby>日曜日<rt>にちようび</rt></ruby>です", tr:"Saya (topik) adalah siswa", tr2:"Besok (topiknya) adalah hari Minggu"},
     {tag:"KONTRAS", tagcls:"tag-reason", desc:"Membandingkan atau mengontraskan dua hal", ex:"コーヒー<b>は</b> すきですが、おちゃ<b>は</b> すきじゃない", ex2:"ひらがな<b>は</b> かけますが、カタカナ<b>は</b> かけません", tr:"Kopi suka, tapi teh tidak", tr2:"Hiragana bisa tulis, tapi katakana tidak bisa"},
   ]},
  {part:"が", romaji:"ga", color:"#60a5fa",
   funcs:[
     {tag:"SUBJEK", tagcls:"tag-all", desc:"Menandai subjek baru, penekanan, atau subjek dalam klausa", ex:"<ruby><rb>猫</rb><rt>ねこ</rt></ruby><b>が</b> います", ex2:"だれ<b>が</b> きましたか", tr:"Ada kucing (subjek baru)", tr2:"Siapa yang datang?"},
     {tag:"OBJEK KS", tagcls:"tag-obj", desc:"Objek kata sifat perasaan/kemampuan: すき、きらい、じょうず、わかる", ex:"にほんご<b>が</b> すきです", ex2:"<ruby>漢字<rt>かんじ</rt></ruby><b>が</b> わかります", tr:"Suka bahasa Jepang", tr2:"Mengerti kanji"},
     {tag:"OBJEK KK", tagcls:"tag-obj", desc:"Objek dari ほしい、できる、ある/いる (keberadaan)", ex:"KB<b>が</b> ほしいです", ex2:"じかん<b>が</b> あります", tr:"Ingin (memiliki) ~", tr2:"Ada waktu"},
     {tag:"POTENSIAL", tagcls:"tag-obj", desc:"Objek kata kerja potensial (<ruby>可能形<rt>かのうけい</rt></ruby>). Partikel を berubah menjadi が saat KK menjadi bentuk potensial.", ex:"にほんご<b>が</b> はなせます", ex2:"<ruby>漢字<rt>かんじ</rt></ruby><b>が</b> よめます", tr:"Bisa berbicara bahasa Jepang (Bab 42)", tr2:"Bisa membaca kanji"},
     {tag:"INTRANSITIF", tagcls:"tag-all", desc:"Subjek kata kerja intransitif (<ruby>自動詞<rt>じどうし</rt></ruby>) — perubahan terjadi secara alami tanpa pelaku.", ex:"でんき<b>が</b> つきます", ex2:"ドア<b>が</b> あきました", tr:"Lampu menyala (Bab 45)", tr2:"Pintu terbuka"},
   ]},
  {part:"を", romaji:"o", color:"#f87171",
   funcs:[
     {tag:"OBJEK", tagcls:"tag-obj", desc:"Menandai objek langsung kata kerja transitif", ex:"ごはん<b>を</b> たべます", ex2:"<ruby>本<rt>ほん</rt></ruby><b>を</b> よみます", tr:"Makan nasi", tr2:"Membaca buku"},
     {tag:"LEWAT", tagcls:"tag-dir", desc:"Menandai tempat yang dilewati/dilalui saat bergerak", ex:"こうえん<b>を</b> さんぽします", ex2:"はし<b>を</b> わたります", tr:"Jalan-jalan melewati taman", tr2:"Menyeberangi jembatan"},
     {tag:"TRANSITIF", tagcls:"tag-obj", desc:"Objek kata kerja transitif (<ruby>他動詞<rt>たどうし</rt></ruby>) — tindakan dilakukan oleh pelaku terhadap objek. ⚠️ Saat menjadi potensial, を berubah menjadi が.", ex:"でんき<b>を</b> つけます", ex2:"まど<b>を</b> あけます", tr:"Menyalakan lampu (Bab 45)", tr2:"Membuka jendela"},
   ]},
  {part:"に", romaji:"ni", color:"#2dd4bf",
   funcs:[
     {tag:"LOKASI ADA", tagcls:"tag-loc", desc:"Lokasi keberadaan (ada/berada di) — dipakai dengan あります/います", ex:"つくえの うえ<b>に</b> あります", ex2:"にわ<b>に</b> いぬが います", tr:"Ada di atas meja", tr2:"Ada anjing di halaman"},
     {tag:"WAKTU", tagcls:"tag-time", desc:"Waktu spesifik (jam, hari, bulan, tahun)", ex:"７じ<b>に</b> おきます", ex2:"<ruby>月曜日<rt>げつようび</rt></ruby><b>に</b> テストが あります", tr:"Bangun jam 7", tr2:"Hari Senin ada ujian"},
     {tag:"TUJUAN", tagcls:"tag-dir", desc:"Tujuan pergerakan — dipakai dengan いきます/きます/かえります", ex:"がっこう<b>に</b> いきます", ex2:"うち<b>に</b> かえります", tr:"Pergi ke sekolah", tr2:"Pulang ke rumah"},
     {tag:"PENERIMA", tagcls:"tag-recv", desc:"Penerima dalam memberi/menerima: あげます、もらいます", ex:"ともだち<b>に</b> あげます", ex2:"<ruby>先生<rt>せんせい</rt></ruby><b>に</b> もらいました", tr:"Memberi kepada teman", tr2:"Menerima dari guru"},
     {tag:"FREKUENSI", tagcls:"tag-time", desc:"Satuan frekuensi waktu: 〜に〜<ruby>回<rt>かい</rt></ruby>", ex:"いっしゅうかん<b>に</b> ３<ruby>回<rt>かい</rt></ruby>", ex2:"いちにち<b>に</b> ２かい はを みがきます", tr:"3 kali dalam seminggu", tr2:"2 kali sehari sikat gigi"},
   ]},
  {part:"で", romaji:"de", color:"#34d399",
   funcs:[
     {tag:"TEMPAT", tagcls:"tag-place", desc:"Tempat berlangsungnya tindakan (beda dengan に yang untuk keberadaan)", ex:"こうえん<b>で</b> あそびます", ex2:"としょかん<b>で</b> べんきょうします", tr:"Bermain di taman", tr2:"Belajar di perpustakaan"},
     {tag:"ALAT", tagcls:"tag-tool", desc:"Alat, kendaraan, atau cara melakukan sesuatu", ex:"でんしゃ<b>で</b> いきます", ex2:"はさみ<b>で</b> きります", tr:"Pergi dengan kereta", tr2:"Memotong dengan gunting"},
     {tag:"BAHASA", tagcls:"tag-tool", desc:"Bahasa yang digunakan untuk berkomunikasi", ex:"にほんご<b>で</b> かきます", ex2:"えいご<b>で</b> はなして ください", tr:"Menulis dalam bahasa Jepang", tr2:"Tolong bicara dalam bahasa Inggris"},
     {tag:"BAHAN", tagcls:"tag-tool", desc:"Bahan atau cara yang digunakan", ex:"ぜんぶ<b>で</b> いくら", ex2:"<ruby>木<rt>き</rt></ruby><b>で</b> つくりました", tr:"Semuanya berapa (total)", tr2:"Dibuat dari kayu"},
   ]},
  {part:"へ", romaji:"e", color:"#60a5fa",
   funcs:[
     {tag:"ARAH", tagcls:"tag-dir", desc:"Arah atau tujuan pergerakan (lebih menekankan arah, bisa diganti に)", ex:"がっこう<b>へ</b> いきます", tr:"Pergi ke (arah) sekolah"},
   ]},
  {part:"も", romaji:"mo", color:"#a78bfa",
   funcs:[
     {tag:"JUGA", tagcls:"tag-all", desc:"Inklusif: juga, pun — menggantikan は/が/を", ex:"わたし<b>も</b> がくせいです", tr:"Saya juga siswa"},
     {tag:"NEGATIF TOTAL", tagcls:"tag-reason", desc:"Dengan negatif = 'sama sekali tidak' (どこへも、なにも、だれも)", ex:"どこへ<b>も</b> いきません", tr:"Tidak pergi ke mana-mana"},
   ]},
  {part:"と", romaji:"to", color:"#fbbf24",
   funcs:[
     {tag:"DAN", tagcls:"tag-all", desc:"Menghubungkan dua kata benda secara exhaustive (semuanya)", ex:"すし<b>と</b> さしみ", tr:"Sushi dan sashimi"},
     {tag:"BERSAMA", tagcls:"tag-recv", desc:"Bersama seseorang melakukan sesuatu", ex:"ともだち<b>と</b> いきます", tr:"Pergi bersama teman"},
     {tag:"KUTIPAN", tagcls:"tag-quote", desc:"Menandai kutipan atau isi pikiran (と <ruby>思<rt>おも</rt></ruby>います、と <ruby>言<rt>い</rt></ruby>います)", ex:"いく<b>と</b> おもいます", tr:"Saya pikir (dia) akan pergi"},
     {tag:"KONDISI", tagcls:"tag-reason", desc:"KK bentuk kamus + と = kondisi alami/otomatis, hasil pasti terjadi. Untuk petunjuk arah & cara kerja alat. ⚠️ Tidak bisa diikuti keinginan/ajakan.", ex:"このボタンを おす<b>と</b>、おつりが でます", tr:"Kalau tekan tombol ini, kembalian keluar (Bab 36)"},
   ]},
  {part:"から", romaji:"kara", color:"#fb923c",
   funcs:[
     {tag:"DARI", tagcls:"tag-dir", desc:"Titik awal waktu atau tempat", ex:"９じ<b>から</b> はじまります", tr:"Mulai dari jam 9"},
     {tag:"KARENA", tagcls:"tag-reason", desc:"Menyatakan alasan (ragam biasa sebelum から dalam kalimat kompleks)", ex:"いそがしい<b>から</b> いけません", tr:"Karena sibuk, tidak bisa"},
   ]},
  {part:"まで", romaji:"made", color:"#38bdf8",
   funcs:[
     {tag:"SAMPAI", tagcls:"tag-dir", desc:"Titik akhir waktu atau tempat", ex:"６じ<b>まで</b> はたらきます", tr:"Bekerja sampai jam 6"},
   ]},
  {part:"より", romaji:"yori", color:"#f472b6",
   funcs:[
     {tag:"DARIPADA", tagcls:"tag-all", desc:"Titik pembanding dalam kalimat perbandingan", ex:"これは あれ<b>より</b> たかい", tr:"Ini lebih mahal daripada itu"},
   ]},
  {part:"の", romaji:"no", color:"#c084fc",
   funcs:[
     {tag:"MILIK", tagcls:"tag-all", desc:"Kepemilikan atau hubungan antara dua kata benda", ex:"わたし<b>の</b> ほん", tr:"Buku saya"},
     {tag:"KATEGORI", tagcls:"tag-all", desc:"KB menjelaskan/memodifikasi KB lain", ex:"にほんご<b>の</b> ほん", tr:"Buku bahasa Jepang"},
     {tag:"GANTI KB", tagcls:"tag-all", desc:"Menggantikan kata benda yang sudah disebutkan", ex:"これは わたし<b>の</b> です", tr:"Ini milik saya"},
     {tag:"NOMINALISER", tagcls:"tag-n4", desc:"Mengubah KK/frasa kerja menjadi kata benda (nominalisasi). KK + のは = topik kalimat. KK + のが = objek KS preferensi/kemampuan.", ex:"<ruby>音楽<rt>おんがく</rt></ruby>を <ruby>聞<rt>き</rt></ruby>く<b>のが</b> すきです / <ruby>散歩<rt>さんぽ</rt></ruby>する<b>のは</b> たのしいです", tr:"Suka mendengarkan musik / Berjalan pagi itu menyenangkan.", bab:"Bab 60"},
   ]},
  {part:"ね/よ/な", romaji:"ne/yo/na", color:"#94a3b8",
   funcs:[
     {tag:"KONFIRMASI", tagcls:"tag-all", desc:"ね: mencari persetujuan atau konfirmasi lawan bicara (mirip 'kan?')", ex:"いい てんきです<b>ね</b>", tr:"Cuaca bagus ya (kan?)"},
     {tag:"PENEGASAN", tagcls:"tag-all", desc:"よ: memberi tahu informasi baru atau menegaskan sesuatu (mirip 'lho!')", ex:"もう ９じです<b>よ</b>", tr:"Sudah jam 9 lho!"},
     {tag:"SANTAI", tagcls:"tag-reason", desc:"な: versi santai dari ね, dipakai oleh pria atau dalam ragam biasa", ex:"おいしい<b>な</b>", tr:"Enak ya (santai)"},
   ]},
  {part:"だけ", romaji:"dake", color:"#f59e0b",
   funcs:[
     {tag:"HANYA", tagcls:"tag-all", desc:"Membatasi jumlah/pilihan (hanya ~, cukup ~)", ex:"これ<b>だけ</b> ください", tr:"Ini saja tolong"},
     {tag:"HANYA KK", tagcls:"tag-all", desc:"Dipakai setelah KK bentuk kamus untuk membatasi tindakan", ex:"みる<b>だけ</b>です", tr:"Hanya melihat saja"},
   ]},
  {part:"しか〜ない", romaji:"shika~nai", color:"#ef4444",
   funcs:[
     {tag:"HANYA (NEG)", tagcls:"tag-all", desc:"Eksklusif negatif: hanya ~ saja (selalu dipakai dengan negatif, lebih kuat dari だけ)", ex:"ひゃくえん<b>しか</b> ありません", tr:"Hanya ada 100 yen (dan tidak ada lagi)"},
     {tag:"BEDANYA", tagcls:"tag-reason", desc:"だけ vs しか: だけ=hanya (netral, bisa positif). しか+ない=hanya (menyiratkan kurang/terbatas)", ex:"３つ<b>だけ</b> あります ↔ ３つ<b>しか</b> ありません", tr:"Ada 3 saja ↔ Cuma ada 3 (kurang!)"},
   ]},
  {part:"けど/が", romaji:"kedo/ga", color:"#818cf8",
   funcs:[
     {tag:"TAPI", tagcls:"tag-all", desc:"Menghubungkan dua klausa yang berlawanan (tetapi, meskipun)", ex:"たかい<b>けど</b>、おいしいです", tr:"Mahal, tapi enak"},
     {tag:"INTRO", tagcls:"tag-reason", desc:"Pembukaan sopan sebelum permintaan/pertanyaan (agak/meskipun begitu...)", ex:"すみません<b>が</b>、ちょっと いいですか", tr:"Maaf, boleh sebentar?"},
     {tag:"FORMAL/SANTAI", tagcls:"tag-tool", desc:"が = lebih formal (tulisan). けど/けれど = lebih santai (percakapan)", ex:"きたい<b>が</b>、いけません / きたい<b>けど</b>、いけない", tr:"Ingin datang tapi tidak bisa (formal/santai)"},
   ]},
  {part:"によって", romaji:"ni yotte", color:"#34d399",
   funcs:[
     {tag:"OLEH (pasif)", tagcls:"tag-n4", desc:"Menyatakan pelaku karya, penemuan, atau ciptaan dalam kalimat pasif. Lebih formal dari に.", ex:"<ruby>銀河鉄道の夜<rt>ぎんがてつどうのよる</rt></ruby>は <ruby>宮沢賢治<rt>みやざわけんじ</rt></ruby><b>によって</b> <ruby>書<rt>か</rt></ruby>かれました。", ex2:"この <ruby>建物<rt>たてもの</rt></ruby>は <ruby>有名<rt>ゆうめい</rt></ruby>な <ruby>建築家<rt>けんちくか</rt></ruby><b>によって</b> <ruby>設計<rt>せっけい</rt></ruby>されました。", tr:"Night on the Galactic Railroad ditulis <b>oleh</b> Miyazawa Kenji.", tr2:"Bangunan ini dirancang oleh arsitek terkenal.", bab:"Bab 59"},
     {tag:"CARA/SEBAB", tagcls:"tag-n4", desc:"Menyatakan cara atau sebab dari suatu kejadian.", ex:"<ruby>事故<rt>じこ</rt></ruby>は <ruby>不注意<rt>ふちゅうい</rt></ruby><b>によって</b> <ruby>起<rt>お</rt></ruby>きました。", ex2:"<ruby>地震<rt>じしん</rt></ruby><b>によって</b> たくさんの <ruby>家<rt>いえ</rt></ruby>が <ruby>壊<rt>こわ</rt></ruby>れました。", tr:"Kecelakaan terjadi <b>karena</b> kelalaian.", tr2:"Banyak rumah rusak akibat gempa bumi.", bab:"Bab 59"},
     {tag:"TERGANTUNG", tagcls:"tag-n4", desc:"Menyatakan 'tergantung pada ~'. Sering dalam bentuk によって ちがいます.", ex:"<ruby>人<rt>ひと</rt></ruby><b>によって</b> <ruby>考<rt>かんが</rt></ruby>えが <ruby>違<rt>ちが</rt></ruby>います。", ex2:"<ruby>国<rt>くに</rt></ruby><b>によって</b> <ruby>文化<rt>ぶんか</rt></ruby>が <ruby>違<rt>ちが</rt></ruby>います。", tr:"Pemikiran berbeda-beda <b>tergantung</b> orangnya.", tr2:"Budaya berbeda-beda tergantung negaranya.", bab:"Bab 59"},
   ]},
  {part:"ので", romaji:"node", color:"#4ade80",
   funcs:[
     {tag:"KARENA (SOPAN)", tagcls:"tag-reason", desc:"Menyatakan alasan dengan lebih sopan/objektif dari から. Digunakan dalam situasi formal, dengan atasan, atau tulisan resmi.", ex:"<ruby>体<rt>からだ</rt></ruby>の <ruby>調子<rt>ちょうし</rt></ruby>が <ruby>悪<rt>わる</rt></ruby>い<b>ので</b>、<ruby>休<rt>やす</rt></ruby>みます。", ex2:"<ruby>電車<rt>でんしゃ</rt></ruby>が <ruby>遅<rt>おく</rt></ruby>れた<b>ので</b>、<ruby>遅刻<rt>ちこく</rt></ruby>しました。", tr:"Karena badan tidak enak, saya istirahat.", tr2:"Karena kereta terlambat, saya terlambat.", bab:"Bab 39"},
     {tag:"VS から", tagcls:"tag-reason", desc:"から = subjektif/santai/percakapan. ので = objektif/sopan/formal. ので lebih aman dipakai ke atasan/orang yang baru dikenal.", ex:"いそがしい<b>から</b> いけません (santai) ↔ いそがしい<b>ので</b> いけません (sopan)", ex2:"KS な + <b>な</b>ので / KB + <b>な</b>ので (⚠️ perhatikan な sebelum ので)", tr:"Karena sibuk, tidak bisa (santai ↔ sopan)", tr2:"⚠️ KS な/KB: きれい<b>な</b>ので / <ruby>学生<rt>がくせい</rt></ruby><b>な</b>ので"},
   ]},
  {part:"ば", romaji:"ba", color:"#06b6d4",
   funcs:[
     {tag:"KONDISIONAL", tagcls:"tag-reason", desc:"Kondisi umum/kebiasaan: kalau ~, maka ~. Digunakan untuk kondisi yang hasilnya pasti/alami. Sering untuk nasihat: 〜ばいいです.", ex:"<ruby>春<rt>はる</rt></ruby>に なれ<b>ば</b>、<ruby>桜<rt>さくら</rt></ruby>が <ruby>咲<rt>さ</rt></ruby>きます。", ex2:"<ruby>薬<rt>くすり</rt></ruby>を のめ<b>ば</b>、なおります。", tr:"Kalau jadi musim semi, bunga sakura mekar.", tr2:"Kalau minum obat, akan sembuh.", bab:"Bab 37"},
     {tag:"KONJUGASI", tagcls:"tag-tool", desc:"Grup I: u→e+ば (のむ→のめば). Grup II: buang る→れば (たべる→たべれば). Grup III: くる→くれば, する→すれば. KS い: buang い→ければ (たかい→たかければ). KS な/KB: なら.", ex:"Gol.I: <ruby>行<rt>い</rt></ruby>く→<ruby>行<rt>い</rt></ruby>け<b>ば</b> | Gol.II: <ruby>食<rt>た</rt></ruby>べる→<ruby>食<rt>た</rt></ruby>べれ<b>ば</b> | Gol.III: する→すれ<b>ば</b>", ex2:"KSい: たかい→たかけれ<b>ば</b> | KSな: しずかなら | KB: <ruby>学生<rt>がくせい</rt></ruby>なら", tr:"Konjugasi ば: ubah bunyi akhir u→e, tambah ば", tr2:"KS い: buang い, tambah ければ. KS な/KB: tambah なら"},
     {tag:"SARAN", tagcls:"tag-reason", desc:"〜ば いいです = sebaiknya ~ / bagaimana kalau ~. Sering dipakai untuk memberikan saran atau meminta saran.", ex:"どう すれ<b>ば</b> いいですか。", ex2:"<ruby>先生<rt>せんせい</rt></ruby>に きけ<b>ば</b> いいですよ。", tr:"Sebaiknya bagaimana? / Apa yang harus dilakukan?", tr2:"Tanya saja ke guru.", bab:"Bab 37"},
   ]},
];

let rsumPolaFilter = 'all';
let rsumLevel = 'all'; // 'all' | 'n5' | 'n4'

function rsumSetLevel(level, btn) {
  rsumLevel = level;
  document.querySelectorAll('.rsum-level-pill').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // Re-render semua tab rangkuman
  rangkumanRendered = false;
  rsumPolaFilter = 'all';
  renderRangkuman();
  rangkumanRendered = true;
  switchRsumTab(rsumActiveTab);
}

function rsumLevelRange() {
  if (rsumLevel === 'n5') return [1, 35];
  if (rsumLevel === 'n4') return [36, 78];
  return [1, 9999];
}

function rsumToggleBabGroup(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function rsumSetPolaFilter(f, btn) {
  rsumPolaFilter = f;
  document.querySelectorAll('.rsum-bab-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // rebuild pola section only
  const container = document.getElementById('rsum-pola-list-body');
  if (container) container.innerHTML = buildPolaList();
}

function rsumExpandCollapseAll(expand) {
  const groups = document.querySelectorAll('#rsum-pola-list-body .rsum-bab-group');
  groups.forEach(g => {
    if (expand) g.classList.add('open');
    else g.classList.remove('open');
  });
}

function rsumPartExpandAll(expand) {
  const accs = document.querySelectorAll('#rsum-part-list-body .part-accordion');
  accs.forEach(a => {
    if (expand) a.classList.add('open');
    else a.classList.remove('open');
  });
}

function rsumVVExpandAll(expand) {
  const accs = document.querySelectorAll('#rsum-vv-list-body .vv-accordion');
  accs.forEach(a => {
    if (expand) a.classList.add('open');
    else a.classList.remove('open');
  });
}

function buildPolaList() {
  // Group RANGKUMAN_POLA by bab
  const groups = {};
  RANGKUMAN_POLA.forEach(p => {
    const b = p.bab;
    if (!groups[b]) groups[b] = [];
    groups[b].push(p);
  });

  // Find bab title from BABS data
  const babTitles = {};
  BABS.forEach(b => { babTitles[b.num] = b.title; });

  // Apply level filter (N5/N4/Semua)
  const [lvMin, lvMax] = rsumLevelRange();
  let babNums = Object.keys(groups).map(Number).filter(n => n >= lvMin && n <= lvMax);

  // Apply pola sub-filter (Bab 1-10, dll) — hanya valid saat level = all atau sesuai range
  if (rsumPolaFilter !== 'all') {
    const polRanges = {
      '1-10': [1,10], '11-20': [11,20], '21-35': [21,35], '36-40': [36,40], '41-45': [41,45], '41-50': [41,50], '46-50': [46,50], '51-60': [51,60], '61-65': [61,65], '66-70': [66,70], '71-75': [71,75], '76-78': [76,78]
    };
    const r = polRanges[rsumPolaFilter];
    if (r) babNums = babNums.filter(n => n >= r[0] && n <= r[1]);
  }

  if (babNums.length === 0) return `<div style="padding:32px;text-align:center;color:var(--text2)">Tidak ada pola kalimat di level ini.</div>`;

  return babNums.map(b => {
    const polas = groups[b];
    const title = babTitles[b] || '';
    const polaRows = polas.map(p => {
      const exHtml = p.ex ? `<div class="rsum-pola-ex">${p.ex.jp}<span class="rsum-pola-ex-id">${p.ex.id}</span></div>` : '';
      const noteHtml = p.note ? `<div style="margin-top:5px;font-size:0.72rem;color:var(--amber);line-height:1.5;padding:4px 8px;background:rgba(251,191,36,0.07);border-left:2px solid var(--amber);border-radius:0 5px 5px 0">💡 ${p.note}</div>` : '';
      return `<div class="rsum-pola-item-new">
        <div style="flex:1;min-width:0">
          <div class="rsum-pola-pattern">${p.pola}</div>
          <div class="rsum-pola-desc">${p.arti}</div>
          ${exHtml}
          ${noteHtml}
        </div>
      </div>`;
    }).join('');
    return `<div class="rsum-bab-group" id="rsbg_${b}">
      <div class="rsum-bab-header" onclick="rsumToggleBabGroup('rsbg_${b}')">
        <span class="rsum-bab-num">Bab ${b}</span>
        <span class="rsum-bab-label">${title}</span>
        <span class="rsum-bab-count">${polas.length} pola</span>
        <span class="rsum-bab-chip clickable" onclick="event.stopPropagation();openBabFromRangkuman(${b}, 0, this)" title="Buka pembahasan Bab ${b}">📖 Buka Bab ${b}</span>
        <span class="rsum-bab-chevron">▶</span>
      </div>
      <div class="rsum-bab-body">${polaRows}</div>
    </div>`;
  }).join('');
}

let rsumActiveTab = 0;

function switchRsumTab(idx) {
  rsumActiveTab = idx;
  document.querySelectorAll('#rsumTabs .tab-btn').forEach((b,i) => b.classList.toggle('active', i===idx));
  for (let i=0;i<=8;i++) {
    const el = document.getElementById('rsum-tab-'+i);
    if (el) el.classList.toggle('active', i===idx);
  }
}

function renderRangkuman() {
  const lvLabel = rsumLevel === 'n5' ? 'N5 (Bab 1–35)' : rsumLevel === 'n4' ? 'N4 (Bab 36–78)' : 'Bab 1–78';
  const lvColor = rsumLevel === 'n5' ? '#34d399' : rsumLevel === 'n4' ? '#c084fc' : 'var(--accent2)';

  // ─── Tab 0: Pola Kalimat ───
  // Build sub-filter buttons dynamically based on current level
  const polaSubFilters = rsumLevel === 'n5'
    ? `<button class="rsum-bab-filter-btn active" onclick="rsumSetPolaFilter('all',this)">Semua N5</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('1-10',this)">Bab 1–10</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('11-20',this)">Bab 11–20</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('21-35',this)">Bab 21–35</button>`
    : rsumLevel === 'n4'
    ? `<button class="rsum-bab-filter-btn active" onclick="rsumSetPolaFilter('all',this)">Semua N4</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('36-40',this)">Bab 36–40</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('41-45',this)">Bab 41–45</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('46-50',this)">Bab 46–50</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('51-60',this)">Bab 51–60</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('61-65',this)">Bab 61–65</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('66-70',this)">Bab 66–70</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('71-75',this)">Bab 71–75</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('76-78',this)">Bab 76–78</button>`
    : `<button class="rsum-bab-filter-btn active" onclick="rsumSetPolaFilter('all',this)">Semua Bab</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('1-10',this)">Bab 1–10</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('11-20',this)">Bab 11–20</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('21-35',this)">Bab 21–35</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('36-40',this)">Bab 36–40</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('41-50',this)">Bab 41–50</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('51-60',this)">Bab 51–60</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('61-65',this)">Bab 61–65</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('66-70',this)">Bab 66–70</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('71-75',this)">Bab 71–75</button>
       <button class="rsum-bab-filter-btn" onclick="rsumSetPolaFilter('76-78',this)">Bab 76–78</button>`;
  const tab0 = document.getElementById('rsum-tab-0');
  tab0.innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">📐 Pola Kalimat — <span style="color:${lvColor}">${lvLabel}</span></div>
    <div class="rsum-bab-filter-bar">
      ${polaSubFilters}
      <button class="rsum-bab-filter-btn" onclick="rsumExpandCollapseAll(true)" style="margin-left:auto">⬇ Buka Semua</button>
      <button class="rsum-bab-filter-btn" onclick="rsumExpandCollapseAll(false)">⬆ Tutup Semua</button>
    </div>
    <div id="rsum-pola-list-body">${buildPolaList()}</div>
  </div>`;

  // ─── Tab 2: Partikel ───
  // Klasifikasi berdasarkan bab asal di data:
  //   Fungsi N4-baru: POTENSIAL(B42), INTRANSITIF(B45), TRANSITIF(B45), KONDISI(B36)
  //   Kartu N4-baru: しか〜ない (B42) — kartu partikel ini belum ada di N5
  //   Semua partikel lain = N5, tapi TETAP ditampilkan di mode N4
  //   karena partikel N5 masih aktif dipakai di N4
  // Urutan bab pertama kali partikel dipelajari (sesuai buku Minna no Nihongo):
  const PARTIKEL_FIRST_BAB = {'は':1,'が':1,'の':1,'も':1,'ね/よ/な':1,'を':6,'に':5,'で':6,'へ':6,'から':6,'まで':6,'と':7,'より':16,'だけ':19,'けど/が':28,'しか〜ない':42,'によって':59,'ので':39,'ば':37};
  const N4_FUNC_TAGS = new Set(['POTENSIAL','INTRANSITIF','TRANSITIF','KONDISI']);
  const N4_ONLY_CARDS = new Set(['しか〜ない','ので','ば']);
  // Sort partikel by first bab learned
  const sortedPartikel = [...RANGKUMAN_PARTIKEL_V2].sort((a,b) => (PARTIKEL_FIRST_BAB[a.part]||99) - (PARTIKEL_FIRST_BAB[b.part]||99));
  const partHtml = sortedPartikel.map((p, idx) => {
    const isN4Card = N4_ONLY_CARDS.has(p.part);
    // Mode N5: sembunyikan kartu yang baru muncul di N4
    if (rsumLevel === 'n5' && isN4Card) return '';
    // Filter fungsi: N5 → sembunyikan fungsi N4-baru; N4/Semua → tampilkan semua
    const filteredFuncs = rsumLevel === 'n5'
      ? p.funcs.filter(f => !N4_FUNC_TAGS.has(f.tag))
      : p.funcs;
    if (filteredFuncs.length === 0) return '';
    const funcsHtml = filteredFuncs.map(f => {
      const ex2Html = f.ex2 ? `<div class="rsum-part-func-ex" style="margin-top:4px;opacity:0.85">${f.ex2} <span style="color:var(--text2)">→ ${f.tr2}</span></div>` : '';
      return `<div class="rsum-part-func-row">
        <span class="rsum-part-func-tag ${f.tagcls}">${f.tag}</span>
        <div class="rsum-part-func-info">
          <div class="rsum-part-func-desc">${f.desc}</div>
          <div class="rsum-part-func-ex">${f.ex} <span style="color:var(--text2)">→ ${f.tr}</span></div>
          ${ex2Html}
        </div>
      </div>`;
    }).join('');
    const firstBab = PARTIKEL_FIRST_BAB[p.part] || '?';
    const isOpen = '';
    return `<div class="part-accordion${isOpen}" id="part-acc-${idx}">
      <div class="part-accordion-head" onclick="this.parentElement.classList.toggle('open')">
        <span class="part-accordion-chevron">▶</span>
        <span class="rsum-part-key" style="color:${p.color};font-size:1.1rem">${p.part}</span>
        <span style="font-size:0.78rem;color:var(--text2)">(${p.romaji})</span>
        <span class="part-accordion-bab">Bab ${firstBab}</span>
        <span class="part-accordion-count">${filteredFuncs.length} fungsi</span>
      </div>
      <div class="part-accordion-body">
        <div class="rsum-part-funcs">${funcsHtml}</div>
      </div>
    </div>`;
  }).filter(Boolean).join('');
  const niVsDeBox = `<div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
    <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
      <span class="konj-accordion-chevron">▶</span>
      <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">⚠️ Perbandingan に vs で</span>
    </div>
    <div class="konj-accordion-body">
      <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:340px">
        <thead><tr><th style="color:#2dd4bf">に</th><th style="color:#34d399">で</th></tr></thead>
        <tbody>
          <tr><td><b>Lokasi keberadaan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">こうえんに います</span><br><span style="color:var(--text2);font-size:0.72rem">Ada di taman</span></td>
              <td><b>Lokasi tindakan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">こうえんで あそびます</span><br><span style="color:var(--text2);font-size:0.72rem">Bermain di taman</span></td></tr>
          <tr><td><b>Tujuan pergerakan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">がっこうに いきます</span><br><span style="color:var(--text2);font-size:0.72rem">Pergi ke sekolah</span></td>
              <td><b>Alat / kendaraan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">でんしゃで いきます</span><br><span style="color:var(--text2);font-size:0.72rem">Pergi dengan kereta</span></td></tr>
          <tr><td><b>Waktu spesifik</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">７じに おきます</span><br><span style="color:var(--text2);font-size:0.72rem">Bangun jam 7</span></td>
              <td><b>Bahasa / cara</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">にほんごで かきます</span><br><span style="color:var(--text2);font-size:0.72rem">Menulis dalam bahasa Jepang</span></td></tr>
          <tr><td><b>Penerima (あげる/もらう)</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">ともだちに あげます</span><br><span style="color:var(--text2);font-size:0.72rem">Memberi ke teman</span></td>
              <td><b>Total / bahan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">ぜんぶで いくら</span><br><span style="color:var(--text2);font-size:0.72rem">Semuanya berapa</span></td></tr>
        </tbody>
      </table></div>
      <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 Kunci: に = <b>titik/tujuan</b>. で = <b>arena tindakan atau alat</b>.</div>
    </div>
  </div>`;
  const n4PartInfo = '';
  const waVsGaBox = `<div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(192,132,252,0.3)">
    <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
      <span class="konj-accordion-chevron">▶</span>
      <span style="font-size:0.82rem;font-weight:700;color:#c084fc">⚠️ Perbandingan は vs が</span>
    </div>
    <div class="konj-accordion-body">
      <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:340px">
        <thead><tr><th style="color:#c084fc">は (topik)</th><th style="color:#60a5fa">が (subjek)</th></tr></thead>
        <tbody>
          <tr><td><b>Info lama/diketahui</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">たなかさん<b>は</b> せんせいです</span><br><span style="color:var(--text2);font-size:0.72rem">Tanaka (sudah dikenal) adalah guru</span></td>
              <td><b>Info baru/penekanan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">たなかさん<b>が</b> せんせいです</span><br><span style="color:var(--text2);font-size:0.72rem">Tanaka-lah yang guru (bukan orang lain)</span></td></tr>
          <tr><td><b>Kontras dua hal</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">さかな<b>は</b> すき、にく<b>は</b> きらい</span><br><span style="color:var(--text2);font-size:0.72rem">Ikan suka, daging tidak suka</span></td>
              <td><b>Subjek dalam klausa</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">あめ<b>が</b> ふったら、いきません</span><br><span style="color:var(--text2);font-size:0.72rem">Kalau hujan turun, tidak pergi</span></td></tr>
          <tr><td><b>Topik umum kalimat</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">きょう<b>は</b> いい てんきです</span><br><span style="color:var(--text2);font-size:0.72rem">Hari ini cuacanya bagus</span></td>
              <td><b>Objek すき/ほしい/わかる</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">おんがく<b>が</b> すきです</span><br><span style="color:var(--text2);font-size:0.72rem">Suka musik</span></td></tr>
        </tbody>
      </table></div>
      <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 Kunci: は = topik/konteks. が = info baru/penekanan/subjek klausa.</div>
    </div>
  </div>`;
  const karaVsNodeBox = `<div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(45,212,191,0.3)">
    <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
      <span class="konj-accordion-chevron">▶</span>
      <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">⚠️ Perbandingan から vs ので</span>
    </div>
    <div class="konj-accordion-body">
      <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:340px">
        <thead><tr><th style="color:#fb923c">から (santai)</th><th style="color:#4ade80">ので (sopan)</th></tr></thead>
        <tbody>
          <tr><td><b>Percakapan santai</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">いそがしい<b>から</b>、いけません</span><br><span style="color:var(--text2);font-size:0.72rem">Karena sibuk, tidak bisa pergi</span></td>
              <td><b>Situasi formal / ke atasan</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">いそがしい<b>ので</b>、いけません</span><br><span style="color:var(--text2);font-size:0.72rem">Karena sibuk, tidak bisa pergi (sopan)</span></td></tr>
          <tr><td><b>Subjektif (pendapat pribadi)</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">あぶない<b>から</b>、やめて ください</span><br><span style="color:var(--text2);font-size:0.72rem">Karena berbahaya, tolong berhenti</span></td>
              <td><b>Objektif (fakta)</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>雨<rt>あめ</rt></ruby>が ふっている<b>ので</b>、かさを もって いきます</span><br><span style="color:var(--text2);font-size:0.72rem">Karena sedang hujan, bawa payung</span></td></tr>
          <tr><td><b>Bisa akhiri kalimat</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">すみません、ちょっと いそがしい<b>から</b>…</span><br><span style="color:var(--text2);font-size:0.72rem">Maaf, soalnya agak sibuk…</span></td>
              <td><b>⚠️ KSな/KB + <u>な</u>ので</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">しずか<b>な</b>ので / がくせい<b>な</b>ので</span><br><span style="color:var(--text2);font-size:0.72rem">Perhatikan な sebelum ので!</span></td></tr>
        </tbody>
      </table></div>
      <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 Kunci: から=santai/subjektif. ので=sopan/objektif. Dalam situasi ragu, gunakan ので yang lebih aman.</div>
    </div>
  </div>`;
  const madeVsMadeniBox = `<div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(96,165,250,0.3)">
    <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
      <span class="konj-accordion-chevron">▶</span>
      <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">⚠️ Perbandingan まで vs までに</span>
    </div>
    <div class="konj-accordion-body">
      <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:340px">
        <thead><tr><th style="color:#38bdf8">まで (sampai)</th><th style="color:#60a5fa">までに (sebelum deadline)</th></tr></thead>
        <tbody>
          <tr><td><b>Tindakan berlanjut SAMPAI waktu</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">６じ<b>まで</b> はたらきます</span><br><span style="color:var(--text2);font-size:0.72rem">Bekerja sampai jam 6 (terus-menerus)</span></td>
              <td><b>Tindakan selesai SEBELUM waktu</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">６じ<b>までに</b> かえります</span><br><span style="color:var(--text2);font-size:0.72rem">Pulang sebelum jam 6 (kapan saja sebelumnya)</span></td></tr>
          <tr><td><b>Durasi proses</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>金曜日<rt>きんようび</rt></ruby><b>まで</b> まちます</span><br><span style="color:var(--text2);font-size:0.72rem">Menunggu sampai hari Jumat</span></td>
              <td><b>Batas waktu/deadline</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>金曜日<rt>きんようび</rt></ruby><b>までに</b> だして ください</span><br><span style="color:var(--text2);font-size:0.72rem">Tolong kumpulkan sebelum hari Jumat</span></td></tr>
        </tbody>
      </table></div>
      <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 Kunci: まで=proses berlangsung sampai titik itu. までに=tindakan harus selesai sebelum titik itu (deadline).</div>
    </div>
  </div>`;
  document.getElementById('rsum-tab-2').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🔗 Partikel — <span style="color:${lvColor}">${lvLabel}</span></div>
    ${n4PartInfo}
    ${waVsGaBox}
    ${niVsDeBox}
    ${karaVsNodeBox}
    ${madeVsMadeniBox}
    <div class="rsum-bab-filter-bar" style="margin-bottom:12px">
      <button class="rsum-bab-filter-btn" onclick="rsumPartExpandAll(true)">⬇ Buka Semua</button>
      <button class="rsum-bab-filter-btn" onclick="rsumPartExpandAll(false)">⬆ Tutup Semua</button>
    </div>
    <div id="rsum-part-list-body">${partHtml}</div>
  </div>`;

  // ─── Tab 3: Bentuk VV ───
  const [vvMin, vvMax] = rsumLevelRange();
  // Sort RANGKUMAN_BENTUKVV by first bab (earliest chapter the form is learned)
  const sortedVV = [...RANGKUMAN_BENTUKVV].map(g => {
    const filteredPola = g.pola.filter(r => r.bab >= vvMin && r.bab <= vvMax);
    const minBab = filteredPola.length > 0 ? Math.min(...filteredPola.map(r => r.bab)) : 9999;
    return {...g, filteredPola, minBab};
  }).filter(g => g.filteredPola.length > 0).sort((a,b) => a.minBab - b.minBab);

  let vvIdx = 0;
  const vvHtml = sortedVV.map(g => {
    const rowsHtml = g.filteredPola.map(r => {
      const levelBadge = r.bab >= 36 ? `<span class="rsum-level-badge badge-n4">N4</span>` : `<span class="rsum-level-badge badge-n5">N5</span>`;
      return `
      <tr>
        <td><span class="rsum-vv-chip ${g.chip}">${g.bentuk.split(' ')[0]}</span><div class="rsum-vv-form">${r.form}</div></td>
        <td><div class="rsum-vv-pola">${r.pola}</div></td>
        <td style="font-size:0.77rem;color:var(--text)">${r.arti}</td>
        <td><span class="rsum-bab-chip clickable" onclick="openBabFromRangkuman(${r.bab}, 2, this)" title="Buka pembahasan Bab ${r.bab}">📖 Bab ${r.bab}</span>${rsumLevel==='all'?levelBadge:''}</td>
      </tr>`;
    }).join('');
    const isOpen = '';
    const result = `<div class="vv-accordion${isOpen}" id="vv-acc-${vvIdx}">
      <div class="vv-accordion-head" onclick="this.parentElement.classList.toggle('open')">
        <span class="vv-accordion-chevron">▶</span>
        <span class="rsum-vv-chip ${g.chip}" style="font-size:0.72rem;padding:3px 10px">${g.bentuk}</span>
        <span style="font-size:0.82rem;font-weight:600;color:var(--text)">${g.label}</span>
        <span class="vv-accordion-count">${g.filteredPola.length} pola</span>
      </div>
      <div class="vv-accordion-body">
        <div style="font-size:0.78rem;color:var(--text2);margin-bottom:8px;background:var(--surface2);border-radius:7px;padding:8px 12px;line-height:1.6">${g.desc}</div>
        ${g.note ? `<div style="font-size:0.74rem;color:var(--amber);line-height:1.6;padding:7px 12px;background:rgba(251,191,36,0.07);border-left:3px solid var(--amber);border-radius:0 7px 7px 0;margin-bottom:8px">⚠️ ${g.note}</div>` : ''}
        <div class="tbl-scroll-wrap">
          <table class="rsum-vv-table">
            <thead><tr><th>Bentuk</th><th>Pola Lengkap</th><th>Arti</th><th>Bab</th></tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
    </div>`;
    vvIdx++;
    return result;
  }).join('');
  document.getElementById('rsum-tab-3').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🏃 Pola Bunpou per Bentuk KK — <span style="color:${lvColor}">${lvLabel}</span></div>
    <div class="rsum-vv-intro">
      Tabel ini mengelompokkan pola bunpou berdasarkan <b>bentuk konjugasi kata kerja</b>. Diurutkan sesuai bab pertama kali dipelajari. Pola tanpa entri di level ini disembunyikan otomatis.
    </div>
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">⚠️ Perbandingan 4 Bentuk Kondisional (と / たら / ば / なら)</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
          <thead><tr><th>Bentuk</th><th>Kapan Dipakai</th><th>Contoh</th><th>Catatan</th></tr></thead>
          <tbody>
            <tr><td style="color:#fbbf24;font-weight:700">〜と</td><td style="font-size:0.74rem">Kondisi <b>otomatis/alami</b> — hasil PASTI terjadi. Petunjuk arah, cara kerja alat/mesin.</td><td class="rsum-form" style="font-size:0.74rem">ボタンを おす<b>と</b>、でんきが つきます</td><td style="font-size:0.7rem;color:var(--text2)">❌ Tidak bisa + たい/ましょう/てください</td></tr>
            <tr><td style="color:#f97316;font-weight:700">〜たら</td><td style="font-size:0.74rem">Kondisi <b>hipotetis</b> (seandainya ~) ATAU <b>urutan waktu</b> (setelah ~). Paling fleksibel!</td><td class="rsum-form" style="font-size:0.74rem">あめが ふっ<b>たら</b>、いきません</td><td style="font-size:0.7rem;color:var(--text2)">✅ Bisa + たい/ましょう/てください. Paling aman untuk pemula.</td></tr>
            <tr><td style="color:#06b6d4;font-weight:700">〜ば</td><td style="font-size:0.74rem">Kondisi <b>logis/umum</b> — kalau A, maka B. Saran: 〜ば いいです.</td><td class="rsum-form" style="font-size:0.74rem">くすりを のめ<b>ば</b>、なおります</td><td style="font-size:0.7rem;color:var(--text2)">❌ Tidak bisa + tindakan kemauan langsung. ✅ + いいです</td></tr>
            <tr><td style="color:#c084fc;font-weight:700">〜なら</td><td style="font-size:0.74rem"><b>Merespons</b> konteks/topik lawan bicara — kalau soal ~, maka…</td><td class="rsum-form" style="font-size:0.74rem">にほんへ いく<b>なら</b>、しんかんせんが いいですよ</td><td style="font-size:0.7rem;color:var(--text2)">✅ Untuk saran berdasarkan apa yang lawan bicara katakan</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 Bingung? Gunakan <b>たら</b> — paling fleksibel dan hampir selalu benar untuk pemula!</div>
      </div>
    </div>
    <div class="rsum-bab-filter-bar" style="margin-bottom:12px">
      <button class="rsum-bab-filter-btn" onclick="rsumVVExpandAll(true)">⬇ Buka Semua</button>
      <button class="rsum-bab-filter-btn" onclick="rsumVVExpandAll(false)">⬆ Tutup Semua</button>
    </div>
    <div id="rsum-vv-list-body">${vvHtml || '<div style="padding:32px;text-align:center;color:var(--text2)">Tidak ada entri di level ini.</div>'}</div>
  </div>`;

  // ─── Tab 1: Konjugasi KK ───
  // Grup dasar I/II/III/⚠️ = N5. Grup たら/可能/ても/ながら = N4 (bab 36+)
  const konjN4Groups = ['たら', '可能', 'ても', 'ながら', '受身', '使役', '使役受身', '命令・禁止', '尊敬', '謙譲'];
  const konjBabMap = {
    'I': [14,19,20], 'II': [14,19,20], 'III': [14,19,20], '⚠️': [10,14],
    'たら': [37,38], '可能かのう': [42], 'ても': [39], 'ながら': [43],
    '受身うけみ': [58,59], '使役': [60], '使役受身': [76], '命令・禁止': [61], '尊敬': [65,66], '謙譲': [67,68],
  };
  // Contoh kalimat per grup
  const konjExamples = {
    'I': {jp:'<ruby>友<rt>とも</rt></ruby>だちに <ruby>手紙<rt>てがみ</rt></ruby>を <b><ruby>書<rt>か</rt></ruby>いて</b>、<ruby>送<rt>おく</rt></ruby>りました。', id:'Menulis surat ke teman, lalu mengirimkannya.'},
    'II': {jp:'<ruby>朝<rt>あさ</rt></ruby> <ruby>早<rt>はや</rt></ruby>く <b><ruby>起<rt>お</rt></ruby>きて</b>、ジョギングします。', id:'Bangun pagi-pagi, lalu joging.'},
    'III': {jp:'<ruby>毎日<rt>まいにち</rt></ruby> <ruby>日本語<rt>にほんご</rt></ruby>を <b><ruby>勉強<rt>べんきょう</rt></ruby>して</b>います。', id:'Setiap hari sedang belajar bahasa Jepang.'},
    '⚠️': {jp:'<ruby>冷蔵庫<rt>れいぞうこ</rt></ruby>に <ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>が <b>ない</b>から、<ruby>買<rt>か</rt></ruby>いに <ruby>行<rt>い</rt></ruby>きます。', id:'Karena tidak ada susu di kulkas, pergi beli.'},
    'たら': {jp:'<ruby>雨<rt>あめ</rt></ruby>が <b><ruby>降<rt>ふ</rt></ruby>ったら</b>、うちに います。', id:'Kalau hujan, saya di rumah.'},
    '可能かのう': {jp:'<ruby>日本語<rt>にほんご</rt></ruby>が <b><ruby>話<rt>はな</rt></ruby>せます</b>。', id:'Bisa berbicara bahasa Jepang.'},
    'ても': {jp:'<ruby>雨<rt>あめ</rt></ruby>が <b><ruby>降<rt>ふ</rt></ruby>っても</b>、サッカーを します。', id:'Walaupun hujan, tetap bermain sepak bola.'},
    'ながら': {jp:'<ruby>音楽<rt>おんがく</rt></ruby>を <b><ruby>聞<rt>き</rt></ruby>きながら</b>、<ruby>勉強<rt>べんきょう</rt></ruby>します。', id:'Belajar sambil mendengarkan musik.'},
    '受身うけみ': {jp:'<ruby>電車<rt>でんしゃ</rt></ruby>で <ruby>足<rt>あし</rt></ruby>を <b><ruby>踏<rt>ふ</rt></ruby>まれました</b>。', id:'Kaki saya diinjak di kereta.'},
    '使役': {jp:'<ruby>先生<rt>せんせい</rt></ruby>は <ruby>学生<rt>がくせい</rt></ruby>に <ruby>本<rt>ほん</rt></ruby>を <b><ruby>読<rt>よ</rt></ruby>ませました</b>。', id:'Guru menyuruh murid membaca buku.'},
    '命令・禁止': {jp:'<b><ruby>止<rt>と</rt></ruby>まれ</b>！ ここに <ruby>入<rt>はい</rt></ruby>る<b>な</b>！', id:'Berhenti! Jangan masuk sini!'},
    '尊敬': {jp:'<ruby>先生<rt>せんせい</rt></ruby>は もう <b><ruby>帰<rt>かえ</rt></ruby>られました</b>。<br><ruby>社長<rt>しゃちょう</rt></ruby>は この <ruby>本<rt>ほん</rt></ruby>を <b>お<ruby>読<rt>よ</rt></ruby>みに なりました</b>。<br><ruby>先生<rt>せんせい</rt></ruby>、もう <b>めしあがりました</b>か。', id:'Guru sudah pulang. (〜られます)<br>Direktur sudah membaca buku ini. (お〜になります)<br>Guru, sudah makan? (kata kerja khusus 尊敬)'},
    '謙譲': {jp:'わたしが ご<ruby>案内<rt>あんない</rt></ruby><b>します</b>。<br>わたしは <ruby>鈴木<rt>すずき</rt></ruby>と <b>もうします</b>。<br><ruby>先生<rt>せんせい</rt></ruby>の <ruby>論文<rt>ろんぶん</rt></ruby>を <b>はいけんしました</b>。', id:'Saya yang akan memandu. (ご〜します)<br>Nama saya Suzuki. (もうします = kata khusus いいます)<br>Saya sudah melihat makalah guru. (はいけんします = kata khusus みます)'},
    '使役受身': {jp:'<ruby>子<rt>こ</rt></ruby>どもの <ruby>時<rt>とき</rt></ruby>、<ruby>毎日<rt>まいにち</rt></ruby> <ruby>野菜<rt>やさい</rt></ruby>を <b><ruby>食<rt>た</rt></ruby>べさせられました</b>。<br><ruby>部長<rt>ぶちょう</rt></ruby>に <ruby>日曜日<rt>にちようび</rt></ruby>も <b><ruby>働<rt>はたら</rt></ruby>かされました</b>。', id:'Waktu kecil, setiap hari dipaksa makan sayur.<br>Dipaksa manajer bekerja di hari Minggu juga.'},
  };
  const stripRuby = (s) => s.replace(/<[^>]*>/g,'');
  let konjHtml = '';
  let konjIdx = 0;
  const konjVisibleGroups = RANGKUMAN_KONJUGASI.filter(g => {
    const isN4Group = konjN4Groups.some(k => stripRuby(g.grup).includes(k));
    if (rsumLevel === 'n5' && isN4Group) return false;
    if (rsumLevel === 'n4' && !isN4Group) return false;
    return true;
  });
  const konjQuickNav = '';

  RANGKUMAN_KONJUGASI.forEach(g => {
    const isN4Group = konjN4Groups.some(k => stripRuby(g.grup).includes(k));
    if (rsumLevel === 'n5' && isN4Group) return;
    if (rsumLevel === 'n4' && !isN4Group) return;

    const grupPlain = stripRuby(g.grup);
    const isTara   = grupPlain === 'たら';
    const isTemo   = grupPlain === 'ても';
    const isKano   = grupPlain.includes('可能');
    const isNagara = grupPlain === 'ながら';
    const isUkemi  = grupPlain.includes('受身');
    const isShieki = grupPlain.includes('使役');
    const isMeirei = grupPlain.includes('命令');
    const isSonkei = grupPlain.includes('尊敬');
    const isKenjou = grupPlain.includes('謙譲');
    const isAdvanced = isTara || isTemo || isKano || isNagara || isUkemi || isShieki || isMeirei || isSonkei || isKenjou;

    // Check if all catatan are empty — hide Ket column
    const hasCatatan = g.contoh.some(r => r.catatan && r.catatan.trim() !== '');

    let contentHtml;
    if (isAdvanced) {
      // Tabel lanjutan — hide Ket jika semua kosong
      // Check kolom lampau kosong
      const hasLampauPlus = g.contoh.some(r => r.taPlus && r.taPlus !== '—');
      const hasLampauMinus = g.contoh.some(r => r.taMinus && r.taMinus !== '—');
      let headerHtml = `<th>〜ます</th><th style="color:#60a5fa">✅ Kini +</th><th style="color:#f87171">❌ Kini −</th>`;
      if (hasLampauPlus) headerHtml += `<th style="color:#fbbf24">⏮️ Lampau +</th>`;
      if (hasLampauMinus) headerHtml += `<th style="color:#fb923c">⏮️❌ Lampau −</th>`;
      headerHtml += `<th><span class="rsum-vv-chip vv-kamus" style="font-size:0.62rem">辞</span> Kamus</th>`;
      if (hasCatatan) headerHtml += `<th>Ket.</th>`;
      const rowsHtml = g.contoh.map(r => {
        let row = `<td class="rsum-form">${r.masu}</td><td class="rsum-form"><b style="color:#60a5fa">${r.pos}</b></td><td class="rsum-form" style="color:#f87171"><b>${r.neg}</b></td>`;
        if (hasLampauPlus) row += `<td class="rsum-form" style="color:#fbbf24">${r.taPlus}</td>`;
        if (hasLampauMinus) row += `<td class="rsum-form" style="color:#fb923c">${r.taMinus}</td>`;
        row += `<td class="rsum-form">${r.kamus}</td>`;
        if (hasCatatan) row += `<td style="font-size:0.68rem;color:var(--text2)">${r.catatan}</td>`;
        return `<tr>${row}</tr>`;
      }).join('');
      contentHtml = `<div class="tbl-scroll-wrap"><table class="rsum-table"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
    } else {
      // Konjugasi dasar — hide Ket jika semua kosong
      let headerHtml = `<th>〜ます</th><th><span class="rsum-vv-chip vv-te" style="font-size:0.62rem">て</span> 〜て</th><th><span class="rsum-vv-chip vv-ta" style="font-size:0.62rem">た</span> 〜た</th><th><span class="rsum-vv-chip vv-nai" style="font-size:0.62rem">ない</span> 〜ない</th><th><span class="rsum-vv-chip vv-kamus" style="font-size:0.62rem">辞</span> Kamus</th>`;
      if (hasCatatan) headerHtml += `<th>Ket.</th>`;
      const rowsHtml = g.contoh.map(r => {
        const taForm = r.te.replace(/て$/,'た').replace(/で$/,'だ');
        let row = `<td class="rsum-form">${r.masu.replace(/⚠️/g,'')}${r.masu.includes('⚠️')?'<span style="color:var(--amber);font-size:0.7rem"> ⚠️</span>':''}</td><td class="rsum-form"><b>${r.te}</b></td><td class="rsum-form" style="color:var(--amber)"><b>${taForm}</b></td><td class="rsum-form"><b style="color:var(--red)">${r.nai}</b></td><td class="rsum-form">${r.kamus}</td>`;
        if (hasCatatan) row += `<td style="font-size:0.68rem;color:var(--text2)">${r.catatan}</td>`;
        return `<tr>${row}</tr>`;
      }).join('');
      contentHtml = `<div class="tbl-scroll-wrap"><table class="rsum-table"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table></div>`;
    }

    const aturanHtml = g.aturan.map(a => `<li style="margin-bottom:4px">${a}</li>`).join('');
    const grupKey = stripRuby(g.grup);
    const babNums = konjBabMap[grupKey] || [];
    const babChipsHtml = babNums.map(b => `<span class="rsum-bab-chip clickable" onclick="openBabFromRangkuman(${b}, 0, this)" title="Buka Bab ${b}">📖 Bab ${b}</span>`).join(' ');
    const sectionId = `konj-sec-${grupPlain.replace(/[<>\/\s]/g,'_')}`;
    const isOpen = '';
    // Contoh kalimat
    const exData = konjExamples[grupKey];
    const exHtml = exData ? `<button class="konj-example-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ex-chev').textContent=this.nextElementSibling.classList.contains('open')?'▾':'▸'"><span class="ex-chev">▸</span> Contoh Kalimat</button><div class="konj-example-body"><span style="color:var(--text)">${exData.jp}</span><br><span style="color:var(--text2);font-size:0.76rem;font-family:inherit">${exData.id}</span></div>` : '';

    konjHtml += `
      <div id="${sectionId}" class="konj-accordion${isOpen}" style="scroll-margin-top:110px">
        <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')">
          <span class="konj-accordion-chevron">▶</span>
          <span class="rsum-conj-group ${g.warna}">Grup ${g.grup}</span>
          <span style="font-size:0.82rem;font-weight:600;color:var(--text)">${g.label}</span>
          <span class="konj-accordion-count">${g.contoh.length} kata</span>
        </div>
        <div class="konj-accordion-body">
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">${babChipsHtml}</div>
          <div style="font-size:0.75rem;color:var(--text2);margin-bottom:10px;background:var(--surface2);border-radius:8px;padding:8px 12px">
            <ul style="padding-left:16px;margin:0;line-height:2">${aturanHtml}</ul>
          </div>
          ${contentHtml}
          ${exHtml}
        </div>
      </div>`;
    konjIdx++;
  });
  const konjNotes = '';
  // ── Bentuk Masu (Ragam Sopan) & Bentuk Biasa — as proper accordion tables ──
  const masuBiasaAccordions = `
    <div id="konj-sec-masu" class="konj-accordion" style="scroll-margin-top:110px">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')">
        <span class="konj-accordion-chevron">▶</span>
        <span class="rsum-conj-group rsum-conj-I" style="background:rgba(96,165,250,0.15);color:#60a5fa">🎩 ます</span>
        <span style="font-size:0.82rem;font-weight:600;color:var(--text)"><ruby>丁寧体<rt>ていねいたい</rt></ruby> — Ragam Sopan (Bentuk ます)</span>
        <span class="konj-accordion-count">7 kata</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.75rem;color:var(--text2);margin-bottom:10px;background:var(--surface2);border-radius:8px;padding:8px 12px">
          <ul style="padding-left:16px;margin:0;line-height:2">
            <li>Digunakan saat berbicara dengan orang yang <b>belum akrab</b>, atasan, guru, dan situasi <b>formal</b></li>
            <li>Ciri: kata kerja diakhiri <b>〜ます</b> / kata benda & sifat diakhiri <b>〜です</b></li>
            <li><b>Kini +:</b> 〜ます (たべます = makan)</li>
            <li><b>Kini −:</b> 〜ません (たべません = tidak makan)</li>
            <li><b>Lampau +:</b> 〜ました (たべました = sudah makan)</li>
            <li><b>Lampau −:</b> 〜ませんでした (たべませんでした = tidak makan [lampau])</li>
            <li>⚠️ Bentuk ます = aman dipakai kapan saja, tidak pernah salah/kasar</li>
          </ul>
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-table"><thead><tr>
          <th><span class="rsum-vv-chip vv-kamus" style="font-size:0.62rem">辞</span> Kamus</th>
          <th style="color:#60a5fa">✅ Kini +</th>
          <th style="color:#f87171">❌ Kini −</th>
          <th style="color:#fbbf24">⏮️ Lampau +</th>
          <th style="color:#fb923c">⏮️❌ Lampau −</th>
          <th>Ket.</th>
        </tr></thead><tbody>
          <tr><td class="rsum-form">のむ</td><td class="rsum-form"><b style="color:#60a5fa">のみます</b></td><td class="rsum-form" style="color:#f87171"><b>のみません</b></td><td class="rsum-form" style="color:#fbbf24">のみました</td><td class="rsum-form" style="color:#fb923c">のみませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp I</td></tr>
          <tr><td class="rsum-form">かく</td><td class="rsum-form"><b style="color:#60a5fa">かきます</b></td><td class="rsum-form" style="color:#f87171"><b>かきません</b></td><td class="rsum-form" style="color:#fbbf24">かきました</td><td class="rsum-form" style="color:#fb923c">かきませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp I</td></tr>
          <tr><td class="rsum-form">はなす</td><td class="rsum-form"><b style="color:#60a5fa">はなします</b></td><td class="rsum-form" style="color:#f87171"><b>はなしません</b></td><td class="rsum-form" style="color:#fbbf24">はなしました</td><td class="rsum-form" style="color:#fb923c">はなしませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp I</td></tr>
          <tr><td class="rsum-form">たべる</td><td class="rsum-form"><b style="color:#60a5fa">たべます</b></td><td class="rsum-form" style="color:#f87171"><b>たべません</b></td><td class="rsum-form" style="color:#fbbf24">たべました</td><td class="rsum-form" style="color:#fb923c">たべませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp II</td></tr>
          <tr><td class="rsum-form">みる</td><td class="rsum-form"><b style="color:#60a5fa">みます</b></td><td class="rsum-form" style="color:#f87171"><b>みません</b></td><td class="rsum-form" style="color:#fbbf24">みました</td><td class="rsum-form" style="color:#fb923c">みませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp II</td></tr>
          <tr><td class="rsum-form">する</td><td class="rsum-form"><b style="color:#60a5fa">します</b></td><td class="rsum-form" style="color:#f87171"><b>しません</b></td><td class="rsum-form" style="color:#fbbf24">しました</td><td class="rsum-form" style="color:#fb923c">しませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp III</td></tr>
          <tr><td class="rsum-form">くる</td><td class="rsum-form"><b style="color:#60a5fa">きます</b></td><td class="rsum-form" style="color:#f87171"><b>きません</b></td><td class="rsum-form" style="color:#fbbf24">きました</td><td class="rsum-form" style="color:#fb923c">きませんでした</td><td style="font-size:0.68rem;color:var(--text2)">Grp III</td></tr>
        </tbody></table></div>
        <button class="konj-example-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ex-chev').textContent=this.nextElementSibling.classList.contains('open')?'▾':'▸'"><span class="ex-chev">▸</span> Contoh Kalimat & Penggunaan</button>
        <div class="konj-example-body">
          <div style="margin-bottom:10px">
            <span style="color:var(--text)"><ruby>毎朝<rt>まいあさ</rt></ruby> コーヒーを <b><ruby>飲<rt>の</rt></ruby>みます</b>。</span><br>
            <span style="color:var(--text2);font-size:0.76rem">Setiap pagi minum kopi.</span>
          </div>
          <div style="margin-bottom:10px">
            <span style="color:var(--text)"><ruby>昨日<rt>きのう</rt></ruby> <ruby>映画<rt>えいが</rt></ruby>を <b><ruby>見<rt>み</rt></ruby>ました</b>。</span><br>
            <span style="color:var(--text2);font-size:0.76rem">Kemarin menonton film.</span>
          </div>
          <div style="margin-bottom:10px">
            <span style="color:var(--text)"><ruby>今日<rt>きょう</rt></ruby>は <ruby>学校<rt>がっこう</rt></ruby>に <b><ruby>行<rt>い</rt></ruby>きません</b>。</span><br>
            <span style="color:var(--text2);font-size:0.76rem">Hari ini tidak pergi ke sekolah.</span>
          </div>
          <div class="note-box note-blue" style="margin-top:10px;font-size:0.74rem">
            <b>📌 Kapan pakai:</b> Percakapan formal, dengan guru, atasan, orang yang baru dikenal, presentasi, wawancara.
          </div>
        </div>
      </div>
    </div>
    <div id="konj-sec-biasa" class="konj-accordion" style="scroll-margin-top:110px">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')">
        <span class="konj-accordion-chevron">▶</span>
        <span class="rsum-conj-group rsum-conj-II" style="background:rgba(45,212,191,0.15);color:#2dd4bf">💬 <ruby>普通<rt>ふつう</rt></ruby></span>
        <span style="font-size:0.82rem;font-weight:600;color:var(--text)"><ruby>普通体<rt>ふつうたい</rt></ruby> — Ragam Biasa (Bentuk Kamus/ない/た/なかった)</span>
        <span class="konj-accordion-count">11 kata</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.75rem;color:var(--text2);margin-bottom:10px;background:var(--surface2);border-radius:8px;padding:8px 12px">
          <ul style="padding-left:16px;margin:0;line-height:2">
            <li>Digunakan dengan <b>teman dekat</b>, keluarga, dan di dalam <b>kalimat kompleks</b></li>
            <li>Ciri: kata kerja bentuk kamus (〜る/〜う) / ない / た / なかった</li>
            <li><b>Kini +:</b> bentuk kamus (たべる = makan)</li>
            <li><b>Kini −:</b> 〜ない (たべない = tidak makan)</li>
            <li><b>Lampau +:</b> 〜た (たべた = sudah makan)</li>
            <li><b>Lampau −:</b> 〜なかった (たべなかった = tidak makan [lampau])</li>
            <li>⚠️ Ragam biasa <b>WAJIB</b> dipakai di tengah kalimat kompleks: 〜と<ruby>思<rt>おも</rt></ruby>います、〜から、〜けど、dll.</li>
            <li>⚠️ KB/KS な: だ/じゃない/だった/じゃなかった | KS い: い/くない/かった/くなかった</li>
          </ul>
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-table"><thead><tr>
          <th>〜ます</th>
          <th style="color:#2dd4bf">✅ Kini + (Kamus)</th>
          <th style="color:#f87171">❌ Kini −</th>
          <th style="color:#fbbf24">⏮️ Lampau +</th>
          <th style="color:#fb923c">⏮️❌ Lampau −</th>
          <th>Ket.</th>
        </tr></thead><tbody>
          <tr><td class="rsum-form">のみます</td><td class="rsum-form"><b style="color:#2dd4bf">のむ</b></td><td class="rsum-form" style="color:#f87171"><b>のまない</b></td><td class="rsum-form" style="color:#fbbf24">のんだ</td><td class="rsum-form" style="color:#fb923c">のまなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (む→んだ)</td></tr>
          <tr><td class="rsum-form">かきます</td><td class="rsum-form"><b style="color:#2dd4bf">かく</b></td><td class="rsum-form" style="color:#f87171"><b>かかない</b></td><td class="rsum-form" style="color:#fbbf24">かいた</td><td class="rsum-form" style="color:#fb923c">かかなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (く→いた)</td></tr>
          <tr><td class="rsum-form">はなします</td><td class="rsum-form"><b style="color:#2dd4bf">はなす</b></td><td class="rsum-form" style="color:#f87171"><b>はなさない</b></td><td class="rsum-form" style="color:#fbbf24">はなした</td><td class="rsum-form" style="color:#fb923c">はなさなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (す→した)</td></tr>
          <tr><td class="rsum-form">かいます</td><td class="rsum-form"><b style="color:#2dd4bf">かう</b></td><td class="rsum-form" style="color:#f87171"><b>かわない</b></td><td class="rsum-form" style="color:#fbbf24">かった</td><td class="rsum-form" style="color:#fb923c">かわなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (う→った)</td></tr>
          <tr><td class="rsum-form">まちます</td><td class="rsum-form"><b style="color:#2dd4bf">まつ</b></td><td class="rsum-form" style="color:#f87171"><b>またない</b></td><td class="rsum-form" style="color:#fbbf24">まった</td><td class="rsum-form" style="color:#fb923c">またなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (つ→った)</td></tr>
          <tr><td class="rsum-form">いそぎます</td><td class="rsum-form"><b style="color:#2dd4bf">いそぐ</b></td><td class="rsum-form" style="color:#f87171"><b>いそがない</b></td><td class="rsum-form" style="color:#fbbf24">いそいだ</td><td class="rsum-form" style="color:#fb923c">いそがなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (ぐ→いだ)</td></tr>
          <tr><td class="rsum-form">かえります</td><td class="rsum-form"><b style="color:#2dd4bf">かえる</b></td><td class="rsum-form" style="color:#f87171"><b>かえらない</b></td><td class="rsum-form" style="color:#fbbf24">かえった</td><td class="rsum-form" style="color:#fb923c">かえらなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp I (る→った) ⚠️</td></tr>
          <tr><td class="rsum-form">たべます</td><td class="rsum-form"><b style="color:#2dd4bf">たべる</b></td><td class="rsum-form" style="color:#f87171"><b>たべない</b></td><td class="rsum-form" style="color:#fbbf24">たべた</td><td class="rsum-form" style="color:#fb923c">たべなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp II</td></tr>
          <tr><td class="rsum-form">みます</td><td class="rsum-form"><b style="color:#2dd4bf">みる</b></td><td class="rsum-form" style="color:#f87171"><b>みない</b></td><td class="rsum-form" style="color:#fbbf24">みた</td><td class="rsum-form" style="color:#fb923c">みなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp II</td></tr>
          <tr><td class="rsum-form">します</td><td class="rsum-form"><b style="color:#2dd4bf">する</b></td><td class="rsum-form" style="color:#f87171"><b>しない</b></td><td class="rsum-form" style="color:#fbbf24">した</td><td class="rsum-form" style="color:#fb923c">しなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp III</td></tr>
          <tr><td class="rsum-form">きます</td><td class="rsum-form"><b style="color:#2dd4bf">くる</b></td><td class="rsum-form" style="color:#f87171"><b>こない</b></td><td class="rsum-form" style="color:#fbbf24">きた</td><td class="rsum-form" style="color:#fb923c">こなかった</td><td style="font-size:0.68rem;color:var(--text2)">Grp III</td></tr>
        </tbody></table></div>
        <button class="konj-example-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.ex-chev').textContent=this.nextElementSibling.classList.contains('open')?'▾':'▸'"><span class="ex-chev">▸</span> Contoh Kalimat & Penggunaan</button>
        <div class="konj-example-body">
          <div style="margin-bottom:10px">
            <span style="color:var(--text)">あした <ruby>雨<rt>あめ</rt></ruby>が <b><ruby>降<rt>ふ</rt></ruby>る</b>と<ruby>思<rt>おも</rt></ruby>います。</span><br>
            <span style="color:var(--text2);font-size:0.76rem">Saya pikir besok akan hujan. (ragam biasa di tengah kalimat)</span>
          </div>
          <div style="margin-bottom:10px">
            <span style="color:var(--text)"><ruby>時間<rt>じかん</rt></ruby>が <b>ない</b>から、タクシーで <ruby>行<rt>い</rt></ruby>きます。</span><br>
            <span style="color:var(--text2);font-size:0.76rem">Karena tidak ada waktu, pergi naik taksi. (biasa + から)</span>
          </div>
          <div style="margin-bottom:10px">
            <span style="color:var(--text)"><ruby>昨日<rt>きのう</rt></ruby> <ruby>何<rt>なに</rt></ruby> <b><ruby>食<rt>た</rt></ruby>べた</b>？</span><br>
            <span style="color:var(--text2);font-size:0.76rem">Kemarin makan apa? (percakapan santai antar teman)</span>
          </div>
          <div class="note-box note-teal" style="margin-top:10px;font-size:0.74rem">
            <b>📌 Kapan pakai:</b> Percakapan dengan teman/keluarga, diary, dan WAJIB di dalam klausa: 〜と<ruby>思<rt>おも</rt></ruby>います、〜んです、〜から、〜けど、〜とき、〜まえに.
          </div>
        </div>
      </div>
    </div>`;

  // Note pembeda tab
  const konjTabNote = `<div class="konj-tab-note">
    <span style="font-size:1.1rem;flex-shrink:0">💡</span>
    <span><b>Tab ini = HOW</b> (cara membentuk konjugasi per grup kata kerja).<br>
    Tab <b>Bentuk VV = WHERE</b> (pola apa saja yang menggunakan bentuk itu).</span>
  </div>`;

  const konjCheatSheet = `<div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(124,106,247,0.3)">
    <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(124,106,247,0.04)">
      <span class="konj-accordion-chevron">▶</span>
      <span style="font-size:0.82rem;font-weight:700;color:var(--accent)">📊 Cheat Sheet: Semua Bentuk KK「のむ」dalam 1 Tabel</span>
    </div>
    <div class="konj-accordion-body">
      <div style="font-size:0.74rem;color:var(--text2);margin-bottom:8px">Tabel ini menunjukkan SEMUA bentuk konjugasi untuk kata kerja <b>のむ</b> (Grup I), <b>たべる</b> (Grup II), <b>する</b> dan <b>くる</b> (Grup III).</div>
      <div class="tbl-scroll-wrap"><table class="rsum-table" style="min-width:650px">
        <thead><tr><th>Bentuk</th><th style="color:#38bdf8">のむ (Gr.I)</th><th style="color:#34d399">たべる (Gr.II)</th><th style="color:#fbbf24">する (Gr.III)</th><th style="color:#fbbf24">くる (Gr.III)</th></tr></thead>
        <tbody>
          <tr><td style="font-weight:600">ます</td><td class="rsum-form">のみます</td><td class="rsum-form">たべます</td><td class="rsum-form">します</td><td class="rsum-form">きます</td></tr>
          <tr><td style="font-weight:600">て</td><td class="rsum-form">のんで</td><td class="rsum-form">たべて</td><td class="rsum-form">して</td><td class="rsum-form">きて</td></tr>
          <tr><td style="font-weight:600">ない</td><td class="rsum-form">のまない</td><td class="rsum-form">たべない</td><td class="rsum-form">しない</td><td class="rsum-form">こない</td></tr>
          <tr><td style="font-weight:600"><ruby>辞書<rt>じしょ</rt></ruby></td><td class="rsum-form">のむ</td><td class="rsum-form">たべる</td><td class="rsum-form">する</td><td class="rsum-form">くる</td></tr>
          <tr><td style="font-weight:600">た</td><td class="rsum-form">のんだ</td><td class="rsum-form">たべた</td><td class="rsum-form">した</td><td class="rsum-form">きた</td></tr>
          <tr><td style="font-weight:600"><ruby>意向<rt>いこう</rt></ruby></td><td class="rsum-form">のもう</td><td class="rsum-form">たべよう</td><td class="rsum-form">しよう</td><td class="rsum-form">こよう</td></tr>
          <tr><td style="font-weight:600">たら</td><td class="rsum-form">のんだら</td><td class="rsum-form">たべたら</td><td class="rsum-form">したら</td><td class="rsum-form">きたら</td></tr>
          <tr><td style="font-weight:600">ば</td><td class="rsum-form">のめば</td><td class="rsum-form">たべれば</td><td class="rsum-form">すれば</td><td class="rsum-form">くれば</td></tr>
          <tr><td style="font-weight:600">ても</td><td class="rsum-form">のんでも</td><td class="rsum-form">たべても</td><td class="rsum-form">しても</td><td class="rsum-form">きても</td></tr>
          <tr><td style="font-weight:600"><ruby>可能<rt>かのう</rt></ruby></td><td class="rsum-form">のめる</td><td class="rsum-form">たべられる</td><td class="rsum-form">できる</td><td class="rsum-form">こられる</td></tr>
          <tr><td style="font-weight:600"><ruby>受身<rt>うけみ</rt></ruby></td><td class="rsum-form">のまれる</td><td class="rsum-form">たべられる</td><td class="rsum-form">される</td><td class="rsum-form">こられる</td></tr>
          <tr><td style="font-weight:600"><ruby>使役<rt>しえき</rt></ruby></td><td class="rsum-form">のませる</td><td class="rsum-form">たべさせる</td><td class="rsum-form">させる</td><td class="rsum-form">こさせる</td></tr>
          <tr><td style="font-weight:600"><ruby>使役受身<rt>しえきうけみ</rt></ruby></td><td class="rsum-form">のまされる</td><td class="rsum-form">たべさせられる</td><td class="rsum-form">させられる</td><td class="rsum-form">こさせられる</td></tr>
          <tr><td style="font-weight:600"><ruby>命令<rt>めいれい</rt></ruby></td><td class="rsum-form">のめ</td><td class="rsum-form">たべろ</td><td class="rsum-form">しろ</td><td class="rsum-form">こい</td></tr>
          <tr><td style="font-weight:600"><ruby>禁止<rt>きんし</rt></ruby></td><td class="rsum-form">のむな</td><td class="rsum-form">たべるな</td><td class="rsum-form">するな</td><td class="rsum-form">くるな</td></tr>
        </tbody>
      </table></div>
    </div>
  </div>`;

  document.getElementById('rsum-tab-1').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🔄 Konjugasi Kata Kerja — <span style="color:${lvColor}">${lvLabel}</span></div>
    ${konjTabNote}
    ${konjCheatSheet}
    ${masuBiasaAccordions}
    ${konjQuickNav}
    ${konjHtml}
    ${konjNotes}
  </div>`;

  // ─── Tab 4: Kata Sifat ───
  const adjCell = (label, form) => `<div class="rsum-adj-cell"><div class="rsum-adj-cell-label">${label}</div><div class="rsum-adj-cell-form">${form}</div></div>`;
  const adjSectionLabel = (txt) => `<div style="font-size:0.73rem;font-weight:700;color:var(--accent2);letter-spacing:0.05em;margin:14px 0 8px;padding:4px 10px;background:rgba(192,132,252,0.08);border:1px solid rgba(192,132,252,0.2);border-radius:8px;display:inline-block">${txt}</div>`;

  const adjCheatSheet = `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(124,106,247,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(124,106,247,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--accent)">📌 Ringkasan Rumus Cepat — い & な</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:620px">
          <thead><tr>
            <th style="white-space:nowrap">Jenis</th>
            <th style="color:#60a5fa;white-space:nowrap">✅ Kini +</th>
            <th style="color:#f87171;white-space:nowrap">❌ Kini −</th>
            <th style="color:#fbbf24;white-space:nowrap">⏮️ Lampau +</th>
            <th style="color:#fb923c;white-space:nowrap">⏮️❌ Lampau −</th>
          </tr></thead>
          <tbody>
            <tr style="background:rgba(248,113,113,0.06)">
              <td style="font-size:0.72rem;color:var(--text2)">い sopan</td>
              <td style="font-family:'Noto Sans JP';color:#60a5fa">〜いです</td>
              <td style="font-family:'Noto Sans JP';color:#f87171"><b>〜くないです</b></td>
              <td style="font-family:'Noto Sans JP';color:#fbbf24"><b>〜かったです</b></td>
              <td style="font-family:'Noto Sans JP';color:#fb923c"><b>〜くなかったです</b></td>
            </tr>
            <tr style="background:rgba(248,113,113,0.03)">
              <td style="font-size:0.72rem;color:var(--text2)">い biasa</td>
              <td style="font-family:'Noto Sans JP';color:#60a5fa">〜い</td>
              <td style="font-family:'Noto Sans JP';color:#f87171"><b>〜くない</b></td>
              <td style="font-family:'Noto Sans JP';color:#fbbf24"><b>〜かった</b></td>
              <td style="font-family:'Noto Sans JP';color:#fb923c"><b>〜くなかった</b></td>
            </tr>
            <tr style="background:rgba(192,132,252,0.06)">
              <td style="font-size:0.72rem;color:var(--text2)">な sopan</td>
              <td style="font-family:'Noto Sans JP';color:#c084fc">〜です</td>
              <td style="font-family:'Noto Sans JP';color:#f87171"><b>〜じゃないです</b></td>
              <td style="font-family:'Noto Sans JP';color:#fbbf24"><b>〜でした</b></td>
              <td style="font-family:'Noto Sans JP';color:#fb923c"><b>〜じゃなかったです</b></td>
            </tr>
            <tr style="background:rgba(192,132,252,0.03)">
              <td style="font-size:0.72rem;color:var(--text2)">な biasa</td>
              <td style="font-family:'Noto Sans JP';color:#c084fc">〜だ</td>
              <td style="font-family:'Noto Sans JP';color:#f87171"><b>〜じゃない</b></td>
              <td style="font-family:'Noto Sans JP';color:#fbbf24"><b>〜だった</b></td>
              <td style="font-family:'Noto Sans JP';color:#fb923c"><b>〜じゃなかった</b></td>
            </tr>
          </tbody>
        </table></div>
      </div>
    </div>`;

  const adjHtmlI = `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(248,113,113,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(248,113,113,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#f87171">い<ruby>形容詞<rt>けいようし</rt></ruby> — Kata Sifat い</span>
      </div>
      <div class="konj-accordion-body">
        <div class="rsum-adj-card" style="border:none;margin:0;padding:0">
          ${adjSectionLabel('🎩 Ragam Sopan (〜です)')}
          <div class="rsum-adj-grid">
            ${adjCell('✅ Positif', 'たかい<b>です</b>')}
            ${adjCell('❌ Negatif', 'たか<b>くない</b>です')}
            ${adjCell('⏮️ Lampau +', 'たか<b>かった</b>です')}
            ${adjCell('⏮️❌ Lampau −', 'たか<b>くなかった</b>です')}
          </div>
          ${adjSectionLabel('💬 Ragam Biasa (futsukei)')}
          <div class="rsum-adj-grid">
            ${adjCell('✅ Positif', 'たかい')}
            ${adjCell('❌ Negatif', 'たか<b>くない</b>')}
            ${adjCell('⏮️ Lampau +', 'たか<b>かった</b>')}
            ${adjCell('⏮️❌ Lampau −', 'たか<b>くなかった</b>')}
          </div>
          ${adjSectionLabel('🔧 Bentuk Lain')}
          <div class="rsum-adj-grid">
            ${adjCell('🔗 Sambung', 'たか<b>くて</b>〜')}
            ${adjCell('🔄 Menjadi', 'たか<b>く</b>なります')}
            ${adjCell('🔨 Membuat jadi', 'たか<b>く</b>します')}
            ${adjCell('📝 Penerang KB', 'たかい<b>[KB]</b>')}
            ${adjCell('📈 Terlalu', 'たか<b>すぎます</b>')}
            ${adjCell('👀 Tampak', 'たか<b>そうです</b>')}
          </div>
          ${adjSectionLabel('📚 Contoh Kata Sifat い Lain')}
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">おもしろ<b>い</b> <span style="color:var(--text2);font-size:0.7rem">menarik</span></span>
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">あたらし<b>い</b> <span style="color:var(--text2);font-size:0.7rem">baru</span></span>
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">おおき<b>い</b> <span style="color:var(--text2);font-size:0.7rem">besar</span></span>
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">むずかし<b>い</b> <span style="color:var(--text2);font-size:0.7rem">sulit</span></span>
          </div>
          <div class="rsum-adj-special">⚠️ Pengecualian: <b>いい</b> (bagus) → sebelum akhiran, いい berubah jadi <b>よ</b><br>
            よ<b>くない</b> | よ<b>かった</b> | よ<b>くなかった</b> | よ<b>くて</b> | よ<b>く</b>なります | よ<b>すぎます</b> | よ<b>さそうです</b>
          </div>
        </div>
      </div>
    </div>`;

  const adjHtmlNa = `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">な<ruby>形容詞<rt>けいようし</rt></ruby> — Kata Sifat な</span>
      </div>
      <div class="konj-accordion-body">
        <div class="rsum-adj-card" style="border:none;margin:0;padding:0">
          ${adjSectionLabel('🎩 Ragam Sopan (〜です)')}
          <div class="rsum-adj-grid">
            ${adjCell('✅ Positif', 'きれい<b>です</b>')}
            ${adjCell('❌ Negatif', 'きれい<b>じゃない</b>です')}
            ${adjCell('⏮️ Lampau +', 'きれい<b>でした</b>')}
            ${adjCell('⏮️❌ Lampau −', 'きれい<b>じゃなかった</b>です')}
          </div>
          ${adjSectionLabel('💬 Ragam Biasa (futsukei)')}
          <div class="rsum-adj-grid">
            ${adjCell('✅ Positif', 'きれい<b>だ</b>')}
            ${adjCell('❌ Negatif', 'きれい<b>じゃない</b>')}
            ${adjCell('⏮️ Lampau +', 'きれい<b>だった</b>')}
            ${adjCell('⏮️❌ Lampau −', 'きれい<b>じゃなかった</b>')}
          </div>
          ${adjSectionLabel('🔧 Bentuk Lain')}
          <div class="rsum-adj-grid">
            ${adjCell('🔗 Sambung', 'きれい<b>で</b>〜')}
            ${adjCell('🔄 Menjadi', 'きれい<b>に</b>なります')}
            ${adjCell('🔨 Membuat jadi', 'きれい<b>に</b>します')}
            ${adjCell('📝 Penerang KB', 'きれい<b>な</b>[KB]')}
            ${adjCell('📈 Terlalu', 'きれい<b>すぎます</b>')}
            ${adjCell('👀 Tampak', 'きれい<b>そうです</b>')}
          </div>
          ${adjSectionLabel('📚 Contoh Kata Sifat な Lain')}
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">しずか<b>な</b> <span style="color:var(--text2);font-size:0.7rem">tenang</span></span>
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">べんり<b>な</b> <span style="color:var(--text2);font-size:0.7rem">praktis</span></span>
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">げんき<b>な</b> <span style="color:var(--text2);font-size:0.7rem">sehat</span></span>
            <span style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:0.78rem;font-family:'Noto Sans JP',sans-serif">ひま<b>な</b> <span style="color:var(--text2);font-size:0.7rem">senggang</span></span>
          </div>
          <div class="rsum-adj-special">💡 Negatif formal: <b>じゃない</b> → <b>ではない</b> (lebih formal/tulisan)<br>
            Lampau+ KS な = <b>でした</b> — berbeda dengan KS い yang pakai <b>かった</b>!
          </div>
        </div>
      </div>
    </div>`;

  const adjHtmlExtra = `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">⚠️ Kata Sifat yang Sering Keliru Jenisnya</span>
      </div>
      <div class="konj-accordion-body">
        <div style="line-height:1.8;font-size:0.78rem">
          Kata-kata berikut <b>berakhiran い</b> tapi BUKAN い<ruby>形容詞<rt>けいようし</rt></ruby> — mereka <b>な<ruby>形容詞<rt>けいようし</rt></ruby></b>!<br>
          <span style="font-family:'Noto Sans JP',sans-serif;color:var(--accent2)">きれい（な）</span> = cantik/bersih　|　
          <span style="font-family:'Noto Sans JP',sans-serif;color:var(--accent2)">きらい（な）</span> = benci　|　
          <span style="font-family:'Noto Sans JP',sans-serif;color:var(--accent2)">ゆうめい（な）</span> = terkenal<br>
          <span style="font-family:'Noto Sans JP',sans-serif;color:var(--accent2)">しんせつ（な）</span> = baik hati　|　
          <span style="font-family:'Noto Sans JP',sans-serif;color:var(--accent2)">ていねい（な）</span> = sopan　|　
          <span style="font-family:'Noto Sans JP',sans-serif;color:var(--accent2)">ひま（な）</span> = senggang<br>
          <div style="margin-top:6px;font-size:0.72rem;color:var(--text2)">💡 Cara ingat: jika bentuk negatifnya pakai <b>じゃない</b> (bukan くない), itu は な<ruby>形容詞<rt>けいようし</rt></ruby>！<br>
          きれい → きれいじゃない ✅ (bukan きれくない ❌)</div>
        </div>
      </div>
    </div>

    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">📐 Bentuk N4 Lanjutan: 〜すぎます・〜そうです・〜く/にする</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:500px">
          <thead><tr><th>Bentuk</th><th style="color:#f87171">い<ruby>形容詞<rt>けいようし</rt></ruby> (たかい)</th><th style="color:#c084fc">な<ruby>形容詞<rt>けいようし</rt></ruby> (しずか)</th><th>Arti</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">〜すぎます</td><td class="rsum-form">たか<b>すぎます</b></td><td class="rsum-form">しずか<b>すぎます</b></td><td style="font-size:0.74rem">Terlalu ~ (Bab 69)</td></tr>
            <tr><td style="font-weight:600">〜そうです</td><td class="rsum-form">たか<b>そうです</b></td><td class="rsum-form">しずか<b>そうです</b></td><td style="font-size:0.74rem">Kelihatannya ~ (Bab 68)</td></tr>
            <tr><td style="font-weight:600">〜くする/にする</td><td class="rsum-form">たか<b>くします</b></td><td class="rsum-form">しずか<b>にします</b></td><td style="font-size:0.74rem">Membuat jadi ~ (sengaja)</td></tr>
            <tr><td style="font-weight:600">〜くなる/になる</td><td class="rsum-form">たか<b>くなります</b></td><td class="rsum-form">しずか<b>になります</b></td><td style="font-size:0.74rem">Menjadi ~ (alami)</td></tr>
            <tr><td style="font-weight:600">〜くて/で (<ruby>接続<rt>せつぞく</rt></ruby>)</td><td class="rsum-form">たか<b>くて</b></td><td class="rsum-form">しずか<b>で</b></td><td style="font-size:0.74rem">~ dan ~ (menghubungkan)</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">⚠️ すぎます: buang い/な, langsung + すぎます. そうです: buang い/な, langsung + そうです. ❗ いい→よさそうです (bukan いそう！)</div>
      </div>
    </div>

    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">⚠️ Perbandingan: くて vs から vs ので</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th>Pola</th><th>Contoh</th><th>Nuansa</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600;color:#34d399">くて / で</td><td class="rsum-form" style="font-size:0.76rem">やすくて、おいしいです</td><td style="font-size:0.72rem;color:var(--text2)">Deskripsi sejajar: murah DAN enak (tidak ada hubungan sebab-akibat)</td></tr>
            <tr><td style="font-weight:600;color:#fb923c">から</td><td class="rsum-form" style="font-size:0.76rem">やすいから、かいます</td><td style="font-size:0.72rem;color:var(--text2)">Alasan santai: KARENA murah, beli (subjektif/percakapan)</td></tr>
            <tr><td style="font-weight:600;color:#4ade80">ので</td><td class="rsum-form" style="font-size:0.76rem">やすいので、かいます</td><td style="font-size:0.72rem;color:var(--text2)">Alasan sopan: Karena murah, beli (objektif/formal)</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 くて = deskripsi/sifat. から/ので = alasan → akibat. Jangan pakai くて untuk hubungan sebab-akibat!</div>
      </div>
    </div>`;
  document.getElementById('rsum-tab-4').innerHTML = `<div style="padding:18px 16px 24px">
    <div class="rsum-section-title" style="margin-bottom:16px">✨ KATA SIFAT — い & な ${rsumLevel !== 'all' ? `<span style="color:${lvColor};font-size:0.75rem">(${lvLabel})</span>` : ''}</div>
    ${rsumLevel === 'n4' ? `<div class="note-box note-purple" style="font-size:0.8rem;line-height:1.6;margin-bottom:16px">💡 Pola kata sifat い & な adalah fondasi N5 yang terus dipakai di N4. Pastikan sudah hafal semua bentuk konjugasinya!</div>` : ''}
    ${adjCheatSheet}
    <div style="margin-top:8px"></div>
    ${adjHtmlI}
    <div style="margin-top:8px"></div>
    ${adjHtmlNa}
    <div style="margin-top:12px"></div>
    ${adjHtmlExtra}
  </div>`;

  // ─── Tab 5: 自他動詞 (Transitif/Intransitif) ───
  renderRsumTab5(lvLabel, lvColor);

  // ─── Tab 6: Ragam Sopan vs Biasa ───
  renderRsumTab6(lvLabel, lvColor);

  // ─── Tab 7: Angka & Bilangan ───
  renderRsumTab7(lvLabel, lvColor);

  // ─── Tab 8: Lainnya (Memberi/Menerima, Waktu, Konjungsi) ───
  renderRsumTab8(lvLabel, lvColor);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ========== RANGKUMAN TAB 5: 自他動詞 ==========
function renderRsumTab5(lvLabel, lvColor) {
  const jitaPairs = [
    {intr:'あきます', intrK:'<ruby>開<rt>あ</rt></ruby>きます', trans:'あけます', transK:'<ruby>開<rt>あ</rt></ruby>けます', obj:'ドア/まど', desc:'terbuka ↔ membuka', grpI:'I', grpT:'II'},
    {intr:'しまります', intrK:'<ruby>閉<rt>し</rt></ruby>まります', trans:'しめます', transK:'<ruby>閉<rt>し</rt></ruby>めます', obj:'ドア/まど', desc:'tertutup ↔ menutup', grpI:'I', grpT:'II'},
    {intr:'つきます', intrK:'つきます', trans:'つけます', transK:'つけます', obj:'<ruby>電気<rt>でんき</rt></ruby>', desc:'menyala ↔ menyalakan', grpI:'I', grpT:'II'},
    {intr:'きえます', intrK:'<ruby>消<rt>き</rt></ruby>えます', trans:'けします', transK:'<ruby>消<rt>け</rt></ruby>します', obj:'<ruby>電気<rt>でんき</rt></ruby>', desc:'padam ↔ memadamkan', grpI:'II', grpT:'I'},
    {intr:'とまります', intrK:'<ruby>止<rt>と</rt></ruby>まります', trans:'とめます', transK:'<ruby>止<rt>と</rt></ruby>めます', obj:'くるま/エレベーター', desc:'berhenti ↔ menghentikan', grpI:'I', grpT:'II'},
    {intr:'こわれます', intrK:'<ruby>壊<rt>こわ</rt></ruby>れます', trans:'こわします', transK:'<ruby>壊<rt>こわ</rt></ruby>します', obj:'いす/パソコン', desc:'rusak ↔ merusak', grpI:'II', grpT:'I'},
    {intr:'われます', intrK:'<ruby>割<rt>わ</rt></ruby>れます', trans:'わります', transK:'<ruby>割<rt>わ</rt></ruby>ります', obj:'コップ', desc:'pecah ↔ memecahkan', grpI:'II', grpT:'I'},
    {intr:'おれます', intrK:'<ruby>折<rt>お</rt></ruby>れます', trans:'おります', transK:'<ruby>折<rt>お</rt></ruby>ります', obj:'<ruby>枝<rt>えだ</rt></ruby>', desc:'patah ↔ mematahkan', grpI:'II', grpT:'I'},
    {intr:'やぶれます', intrK:'<ruby>破<rt>やぶ</rt></ruby>れます', trans:'やぶります', transK:'<ruby>破<rt>やぶ</rt></ruby>ります', obj:'<ruby>紙<rt>かみ</rt></ruby>', desc:'sobek ↔ menyobek', grpI:'II', grpT:'I'},
    {intr:'よごれます', intrK:'<ruby>汚<rt>よご</rt></ruby>れます', trans:'よごします', transK:'<ruby>汚<rt>よご</rt></ruby>します', obj:'<ruby>服<rt>ふく</rt></ruby>', desc:'kotor ↔ mengotori', grpI:'II', grpT:'I'},
    {intr:'こみます', intrK:'<ruby>込<rt>こ</rt></ruby>みます', trans:'—', transK:'—', obj:'<ruby>道<rt>みち</rt></ruby>', desc:'macet (tidak ada pasangan transitif)', grpI:'I', grpT:'—'},
    {intr:'すきます', intrK:'<ruby>空<rt>す</rt></ruby>きます', trans:'—', transK:'—', obj:'<ruby>道<rt>みち</rt></ruby>', desc:'lengang (tidak ada pasangan transitif)', grpI:'I', grpT:'—'},
    {intr:'かかります', intrK:'<ruby>掛<rt>か</rt></ruby>かります', trans:'かけます', transK:'<ruby>掛<rt>か</rt></ruby>けます', obj:'かぎ', desc:'terkunci ↔ mengunci', grpI:'I', grpT:'II'},
    {intr:'はいります', intrK:'<ruby>入<rt>はい</rt></ruby>ります', trans:'いれます', transK:'<ruby>入<rt>い</rt></ruby>れます', obj:'もの', desc:'masuk ↔ memasukkan', grpI:'I', grpT:'II'},
    {intr:'でます', intrK:'<ruby>出<rt>で</rt></ruby>ます', trans:'だします', transK:'<ruby>出<rt>だ</rt></ruby>します', obj:'もの', desc:'keluar ↔ mengeluarkan', grpI:'II', grpT:'I'},
    {intr:'おちます', intrK:'<ruby>落<rt>お</rt></ruby>ちます', trans:'おとします', transK:'<ruby>落<rt>お</rt></ruby>とします', obj:'もの', desc:'jatuh ↔ menjatuhkan', grpI:'II', grpT:'I'},
    {intr:'なくなります', intrK:'なくなります', trans:'なくします', transK:'なくします', obj:'もの', desc:'hilang ↔ menghilangkan', grpI:'I', grpT:'I'},
  ];
  const pairRows = jitaPairs.map(p => `<tr>
    <td class="rsum-form"><span style="color:#60a5fa">${p.intrK}</span></td>
    <td style="font-size:0.68rem;color:var(--text2)">${p.grpI}</td>
    <td class="rsum-form"><span style="color:#f87171">${p.transK}</span></td>
    <td style="font-size:0.68rem;color:var(--text2)">${p.grpT}</td>
    <td style="font-size:0.74rem;color:var(--text2)">${p.obj}</td>
    <td style="font-size:0.72rem;color:var(--text2)">${p.desc}</td>
  </tr>`).join('');

  document.getElementById('rsum-tab-5').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🔀 <ruby>自動詞<rt>じどうし</rt></ruby> と <ruby>他動詞<rt>たどうし</rt></ruby> — Kata Kerja Intransitif & Transitif</div>

    <div class="konj-tab-note">
      <span style="font-size:1.1rem;flex-shrink:0">💡</span>
      <span><b><ruby>自動詞<rt>じどうし</rt></ruby> (Intransitif)</b> = perubahan SPONTAN, tidak ada pelaku → partikel <b style="color:#60a5fa">が</b><br>
      <b><ruby>他動詞<rt>たどうし</rt></ruby> (Transitif)</b> = ada PELAKU yang melakukan → partikel <b style="color:#f87171">を</b></span>
    </div>

    <!-- Pola Dasar -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(124,106,247,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(124,106,247,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--accent)">📐 Pola Dasar: が + 自動詞 vs を + 他動詞</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:440px">
          <thead><tr><th style="color:#60a5fa"><ruby>自動詞<rt>じどうし</rt></ruby> (Intransitif)</th><th style="color:#f87171"><ruby>他動詞<rt>たどうし</rt></ruby> (Transitif)</th></tr></thead>
          <tbody>
            <tr><td><b>KB <span style="color:#60a5fa">が</span> KK-intransitif</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>電気<rt>でんき</rt></ruby><b>が</b> つきます</span><br><span style="color:var(--text2);font-size:0.72rem">Lampu menyala (sendiri/otomatis)</span></td>
                <td><b>(Pelaku は) KB <span style="color:#f87171">を</span> KK-transitif</b><br><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>電気<rt>でんき</rt></ruby><b>を</b> つけます</span><br><span style="color:var(--text2);font-size:0.72rem">Menyalakan lampu (ada pelaku)</span></td></tr>
            <tr><td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">ドア<b>が</b> <ruby>開<rt>あ</rt></ruby>きます</span><br><span style="color:var(--text2);font-size:0.72rem">Pintu terbuka (sendiri)</span></td>
                <td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">ドア<b>を</b> <ruby>開<rt>あ</rt></ruby>けます</span><br><span style="color:var(--text2);font-size:0.72rem">Membuka pintu (sengaja)</span></td></tr>
            <tr><td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">まど<b>が</b> <ruby>閉<rt>し</rt></ruby>まります</span><br><span style="color:var(--text2);font-size:0.72rem">Jendela tertutup (oleh angin dll.)</span></td>
                <td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">まど<b>を</b> <ruby>閉<rt>し</rt></ruby>めます</span><br><span style="color:var(--text2);font-size:0.72rem">Menutup jendela (sengaja)</span></td></tr>
          </tbody>
        </table></div>
      </div>
    </div>

    <!-- Perbedaan ています -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(52,211,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(52,211,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--green)">⚠️ Perbedaan ています — Intransitif vs Transitif</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:440px">
          <thead><tr><th style="color:#60a5fa">自動詞 + ています = KEADAAN HASIL</th><th style="color:#f87171">他動詞 + ています = SEDANG MELAKUKAN</th></tr></thead>
          <tbody>
            <tr><td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">ドアが <b><ruby>開<rt>あ</rt></ruby>いています</b></span><br><span style="color:var(--text2);font-size:0.72rem">Pintu dalam kondisi terbuka (HASIL)</span></td>
                <td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">ドアを <b><ruby>開<rt>あ</rt></ruby>けています</b></span><br><span style="color:var(--text2);font-size:0.72rem">Sedang membuka pintu (PROSES)</span></td></tr>
            <tr><td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>電気<rt>でんき</rt></ruby>が <b>ついています</b></span><br><span style="color:var(--text2);font-size:0.72rem">Lampu dalam kondisi menyala</span></td>
                <td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>電気<rt>でんき</rt></ruby>を <b>つけています</b></span><br><span style="color:var(--text2);font-size:0.72rem">Sedang menyalakan lampu</span></td></tr>
            <tr><td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">まどが <b><ruby>閉<rt>し</rt></ruby>まっています</b></span><br><span style="color:var(--text2);font-size:0.72rem">Jendela dalam kondisi tertutup</span></td>
                <td><span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">まどを <b><ruby>閉<rt>し</rt></ruby>めています</b></span><br><span style="color:var(--text2);font-size:0.72rem">Sedang menutup jendela</span></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 <b>Kunci:</b> 自動詞ています = keadaan/kondisi saat ini. 他動詞ています = proses yang sedang berlangsung.</div>
      </div>
    </div>

    <!-- Tabel Pasangan Lengkap -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">📊 Tabel Pasangan 自動詞 ↔ 他動詞 Lengkap</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:600px">
          <thead><tr><th style="color:#60a5fa">自動詞 (Intransitif)</th><th>Gr</th><th style="color:#f87171">他動詞 (Transitif)</th><th>Gr</th><th>Objek</th><th>Arti</th></tr></thead>
          <tbody>${pairRows}</tbody>
        </table></div>
      </div>
    </div>

    <!-- Tips Mengingat -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">🧠 Tips Cara Mengingat Pasangan</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.78rem;line-height:1.8;color:var(--text)">
          <b>Pola umum yang sering muncul:</b><br>
          <table class="rsum-vv-table" style="min-width:400px;margin-top:8px">
            <thead><tr><th>Pola Akhiran</th><th style="color:#60a5fa">自動詞</th><th style="color:#f87171">他動詞</th><th>Contoh</th></tr></thead>
            <tbody>
              <tr><td style="font-weight:600">〜aru ↔ 〜eru</td><td>〜<b>aru</b> (Gr.I)</td><td>〜<b>eru</b> (Gr.II)</td><td>あ<b>かる</b> ↔ あ<b>ける</b></td></tr>
              <tr><td style="font-weight:600">〜u ↔ 〜eru</td><td>〜<b>u</b> (Gr.I)</td><td>〜<b>eru</b> (Gr.II)</td><td>つ<b>く</b> ↔ つ<b>ける</b></td></tr>
              <tr><td style="font-weight:600">〜eru ↔ 〜su</td><td>〜<b>eru</b> (Gr.II)</td><td>〜<b>su</b> (Gr.I)</td><td>こわ<b>れる</b> ↔ こわ<b>す</b></td></tr>
              <tr><td style="font-weight:600">〜eru ↔ 〜ru</td><td>〜<b>reru</b> (Gr.II)</td><td>〜<b>ru</b> (Gr.I)</td><td>わ<b>れる</b> ↔ わ<b>る</b></td></tr>
            </tbody>
          </table>
          <div style="margin-top:12px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0">
            <b style="color:var(--amber)">⚠️ Cara cepat membedakan:</b><br>
            • Jika ada pelaku (orang melakukan) → <b style="color:#f87171">他動詞 + を</b><br>
            • Jika perubahan terjadi sendiri (otomatis/alami) → <b style="color:#60a5fa">自動詞 + が</b><br>
            • Dalam percakapan: "Siapa yang melakukannya?" → Jika jawabannya "tidak ada/tidak penting" → 自動詞
          </div>
        </div>
      </div>
    </div>

    <!-- Situasi Penggunaan -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">🎯 Kapan Pakai yang Mana? (Situasi Nyata)</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.78rem;line-height:1.8;color:var(--text)">
          <div style="display:grid;gap:8px">
            <div style="padding:10px 14px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <b>Situasi:</b> Kamu masuk ruangan, lampunya sudah menyala.<br>
              ✅ <span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif"><ruby>電気<rt>でんき</rt></ruby>が <b>ついています</b>。</span> (Lampu dalam keadaan menyala)<br>
              ❌ <span style="color:var(--red);font-family:'Noto Sans JP',sans-serif;text-decoration:line-through"><ruby>電気<rt>でんき</rt></ruby>を つけています。</span> (= Seseorang sedang menyalakan lampu)
            </div>
            <div style="padding:10px 14px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <b>Situasi:</b> Kamu menyuruh seseorang menutup jendela.<br>
              ✅ <span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">まど<b>を</b> <ruby>閉<rt>し</rt></ruby>めて ください。</span> (Tolong tutup jendela — ada pelaku)<br>
              ❌ <span style="color:var(--red);font-family:'Noto Sans JP',sans-serif;text-decoration:line-through">まどが しまって ください。</span>
            </div>
            <div style="padding:10px 14px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
              <b>Situasi:</b> Kamu melihat gelas pecah di lantai (tidak tahu siapa yang memecahkan).<br>
              ✅ <span style="color:var(--teal);font-family:'Noto Sans JP',sans-serif">コップが <b><ruby>割<rt>わ</rt></ruby>れています</b>。</span> (Gelas dalam keadaan pecah)<br>
              <span style="color:var(--text2)">→ Gunakan 自動詞 karena fokus pada KEADAAN, bukan pelaku.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

// ========== RANGKUMAN TAB 6: Ragam Sopan vs Biasa ==========
function renderRsumTab6(lvLabel, lvColor) {
  document.getElementById('rsum-tab-6').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🗣️ Ragam Sopan (<ruby>敬体<rt>けいたい</rt></ruby>) vs Ragam Biasa (<ruby>常体<rt>じょうたい</rt></ruby>)</div>

    <div class="konj-tab-note">
      <span style="font-size:1.1rem;flex-shrink:0">💡</span>
      <span><b>Ragam Sopan (〜です/〜ます)</b> = untuk situasi formal, dengan orang yang belum akrab, atasan, orang asing.<br>
      <b>Ragam Biasa (futsūkei)</b> = untuk teman dekat, keluarga, dan WAJIB dalam klausa tertentu (と思います, 〜時, 〜前に, dll.)</span>
    </div>

    <!-- Konversi KK -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🏃 Kata Kerja (KK) — Sopan ↔ Biasa</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:520px">
          <thead><tr><th></th><th style="color:#60a5fa">🎩 Ragam Sopan</th><th style="color:#f97316">💬 Ragam Biasa</th><th>Contoh (のむ)</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">✅ Kini +</td><td class="rsum-form">〜ます</td><td class="rsum-form"><b><ruby>辞書形<rt>じしょけい</rt></ruby></b> (bentuk kamus)</td><td class="rsum-form">のみます → <b>のむ</b></td></tr>
            <tr><td style="font-weight:600">❌ Kini −</td><td class="rsum-form">〜ません</td><td class="rsum-form"><b>〜ない</b></td><td class="rsum-form">のみません → <b>のまない</b></td></tr>
            <tr><td style="font-weight:600">⏮️ Lampau +</td><td class="rsum-form">〜ました</td><td class="rsum-form"><b>〜た</b></td><td class="rsum-form">のみました → <b>のんだ</b></td></tr>
            <tr><td style="font-weight:600">⏮️❌ Lampau −</td><td class="rsum-form">〜ませんでした</td><td class="rsum-form"><b>〜なかった</b></td><td class="rsum-form">のみませんでした → <b>のまなかった</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">⚠️ Bentuk biasa KK = yang dipelajari di tab Konjugasi (辞書形, ない形, た形)</div>
      </div>
    </div>

    <!-- Konversi KS い -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(248,113,113,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(248,113,113,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#f87171">✨ Kata Sifat い — Sopan ↔ Biasa</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:480px">
          <thead><tr><th></th><th style="color:#60a5fa">🎩 Ragam Sopan</th><th style="color:#f97316">💬 Ragam Biasa</th><th>Contoh (たかい)</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">✅ Kini +</td><td class="rsum-form">〜いです</td><td class="rsum-form"><b>〜い</b></td><td class="rsum-form">たかいです → <b>たかい</b></td></tr>
            <tr><td style="font-weight:600">❌ Kini −</td><td class="rsum-form">〜くないです</td><td class="rsum-form"><b>〜くない</b></td><td class="rsum-form">たかくないです → <b>たかくない</b></td></tr>
            <tr><td style="font-weight:600">⏮️ Lampau +</td><td class="rsum-form">〜かったです</td><td class="rsum-form"><b>〜かった</b></td><td class="rsum-form">たかかったです → <b>たかかった</b></td></tr>
            <tr><td style="font-weight:600">⏮️❌ Lampau −</td><td class="rsum-form">〜くなかったです</td><td class="rsum-form"><b>〜くなかった</b></td><td class="rsum-form">たかくなかったです → <b>たかくなかった</b></td></tr>
          </tbody>
        </table></div>
      </div>
    </div>

    <!-- Konversi KS な -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">✨ Kata Sifat な — Sopan ↔ Biasa</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:480px">
          <thead><tr><th></th><th style="color:#60a5fa">🎩 Ragam Sopan</th><th style="color:#f97316">💬 Ragam Biasa</th><th>Contoh (しずか)</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">✅ Kini +</td><td class="rsum-form">〜です</td><td class="rsum-form"><b>〜だ</b></td><td class="rsum-form">しずかです → <b>しずかだ</b></td></tr>
            <tr><td style="font-weight:600">❌ Kini −</td><td class="rsum-form">〜じゃないです</td><td class="rsum-form"><b>〜じゃない</b></td><td class="rsum-form">しずかじゃないです → <b>しずかじゃない</b></td></tr>
            <tr><td style="font-weight:600">⏮️ Lampau +</td><td class="rsum-form">〜でした</td><td class="rsum-form"><b>〜だった</b></td><td class="rsum-form">しずかでした → <b>しずかだった</b></td></tr>
            <tr><td style="font-weight:600">⏮️❌ Lampau −</td><td class="rsum-form">〜じゃなかったです</td><td class="rsum-form"><b>〜じゃなかった</b></td><td class="rsum-form">しずかじゃなかったです → <b>しずかじゃなかった</b></td></tr>
          </tbody>
        </table></div>
      </div>
    </div>

    <!-- Konversi KB -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(52,211,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(52,211,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--green)">📦 Kata Benda (KB) — Sopan ↔ Biasa</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:480px">
          <thead><tr><th></th><th style="color:#60a5fa">🎩 Ragam Sopan</th><th style="color:#f97316">💬 Ragam Biasa</th><th>Contoh (がくせい)</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600">✅ Kini +</td><td class="rsum-form">〜です</td><td class="rsum-form"><b>〜だ</b></td><td class="rsum-form">がくせいです → <b>がくせいだ</b></td></tr>
            <tr><td style="font-weight:600">❌ Kini −</td><td class="rsum-form">〜じゃありません</td><td class="rsum-form"><b>〜じゃない</b></td><td class="rsum-form">がくせいじゃありません → <b>がくせいじゃない</b></td></tr>
            <tr><td style="font-weight:600">⏮️ Lampau +</td><td class="rsum-form">〜でした</td><td class="rsum-form"><b>〜だった</b></td><td class="rsum-form">がくせいでした → <b>がくせいだった</b></td></tr>
            <tr><td style="font-weight:600">⏮️❌ Lampau −</td><td class="rsum-form">〜じゃありませんでした</td><td class="rsum-form"><b>〜じゃなかった</b></td><td class="rsum-form">がくせいじゃありませんでした → <b>がくせいじゃなかった</b></td></tr>
          </tbody>
        </table></div>
      </div>
    </div>

    <!-- Kapan WAJIB Pakai Ragam Biasa -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">⚠️ Kapan WAJIB Pakai Ragam Biasa (dalam kalimat sopan)</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.78rem;line-height:1.8;color:var(--text)">
          Walaupun kalimat utama sopan (〜ます), bagian KLAUSA di tengah kalimat harus ragam biasa:
          <div class="tbl-scroll-wrap" style="margin-top:8px"><table class="rsum-vv-table" style="min-width:500px">
            <thead><tr><th>Pola</th><th>Contoh</th><th>Keterangan</th></tr></thead>
            <tbody>
              <tr><td style="font-weight:600">〜と <ruby>思<rt>おも</rt></ruby>います</td><td class="rsum-form"><b>あした あめが ふる</b>と おもいます</td><td style="font-size:0.72rem;color:var(--text2)">Saya pikir besok hujan</td></tr>
              <tr><td style="font-weight:600">〜と <ruby>言<rt>い</rt></ruby>いました</td><td class="rsum-form"><b>いかない</b>と いいました</td><td style="font-size:0.72rem;color:var(--text2)">Dia bilang tidak pergi</td></tr>
              <tr><td style="font-weight:600">〜<ruby>時<rt>とき</rt></ruby></td><td class="rsum-form"><b>わかい</b> とき、よく うんどうしました</td><td style="font-size:0.72rem;color:var(--text2)">Waktu muda, sering olahraga</td></tr>
              <tr><td style="font-weight:600">〜前に</td><td class="rsum-form"><b>ねる</b> まえに、はを みがきます</td><td style="font-size:0.72rem;color:var(--text2)">Sebelum tidur, sikat gigi</td></tr>
              <tr><td style="font-weight:600">〜後で</td><td class="rsum-form"><b>たべた</b> あとで、さんぽします</td><td style="font-size:0.72rem;color:var(--text2)">Setelah makan, jalan-jalan</td></tr>
              <tr><td style="font-weight:600">〜でしょう？</td><td class="rsum-form">あした <b>いい てんきだ</b> でしょう？</td><td style="font-size:0.72rem;color:var(--text2)">Besok cuaca bagus kan?</td></tr>
              <tr><td style="font-weight:600">〜たら</td><td class="rsum-form"><b>やすかったら</b>、かいます</td><td style="font-size:0.72rem;color:var(--text2)">Kalau murah, beli</td></tr>
              <tr><td style="font-weight:600">〜ても</td><td class="rsum-form"><b>あめが ふっても</b>、いきます</td><td style="font-size:0.72rem;color:var(--text2)">Walaupun hujan, pergi</td></tr>
              <tr><td style="font-weight:600">〜ので</td><td class="rsum-form"><b>いそがしい</b>ので、いけません</td><td style="font-size:0.72rem;color:var(--text2)">Karena sibuk, tidak bisa</td></tr>
              <tr><td style="font-weight:600">〜のは/のが</td><td class="rsum-form"><b>およぐ</b>のが すきです</td><td style="font-size:0.72rem;color:var(--text2)">Suka berenang</td></tr>
            </tbody>
          </table></div>
          <div style="margin-top:10px;padding:10px 14px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0">
            <b style="color:var(--amber)">⚠️ Pengecualian KB/KSな dalam klausa:</b><br>
            • Sebelum と思います: がくせい<b>だ</b>と おもいます (KB + <b>だ</b>)<br>
            • Sebelum 時: しずか<b>な</b> とき (KSな + <b>な</b>)<br>
            • Sebelum ので: がくせい<b>な</b>ので (KB/KSな + <b>な</b>ので)
          </div>
        </div>
      </div>
    </div>

    <!-- Perbedaan Nuansa -->
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:16px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">🎯 Perbedaan Nuansa & Kapan Digunakan</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:400px">
          <thead><tr><th style="color:#60a5fa">🎩 Ragam Sopan</th><th style="color:#f97316">💬 Ragam Biasa</th></tr></thead>
          <tbody>
            <tr><td>Orang yang baru dikenal</td><td>Teman dekat / keluarga</td></tr>
            <tr><td>Atasan / guru / senior</td><td>Teman sebaya / junior</td></tr>
            <tr><td>Situasi formal / kerja</td><td>Santai / SNS / diary</td></tr>
            <tr><td>Berbicara di depan umum</td><td>Monolog / berbicara sendiri</td></tr>
            <tr><td>Percakapan dengan orang asing</td><td>Menulis artikel informal</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:8px;font-size:0.72rem;color:var(--text2)">💡 Di JLPT/ujian: soal mendengarkan sering pakai ragam biasa. Soal membaca sering pakai ragam sopan. Pahami keduanya!</div>
      </div>
    </div>
  </div>`;
}

function toggleCoreOnly() {
  crossCoreOnly = !crossCoreOnly;
  document.getElementById('coreOnlySw').classList.toggle('on', crossCoreOnly);
  renderCrossCategories();
}

const ALL_CATS = ['Kata Benda','Kata Kerja','Ekspresi','Kata Sifat','Kata Keterangan','Kata Tanya','Angka','Kata Tunjuk','Posisi','Konjungsi','Partikel'];

function renderCrossCategories() {
  const babsToScan = crossBabs.length
    ? BABS.filter(b => crossBabs.includes(b.num))
    : BABS;
  let pool = babsToScan.flatMap(b => b.kotoba);
  if (crossCoreOnly) pool = pool.filter(k => k.lv === 'core');

  // Count per category
  const counts = {};
  ALL_CATS.forEach(c => counts[c] = 0);
  pool.forEach(k => { if (counts[k.cat] !== undefined) counts[k.cat]++; });

  // Remove selected cats that no longer exist in current pool
  crossCats = crossCats.filter(c => counts[c] > 0);

  const wrap = document.getElementById('crossCatBtns');
  if (!wrap) return;
  wrap.innerHTML = '';
  ALL_CATS.forEach(cat => {
    if (counts[cat] === 0) return;
    const btn = document.createElement('button');
    btn.className = 'cross-cat-btn' + (crossCats.includes(cat) ? ' sel' : '');
    btn.innerHTML = `${cat} <span style="opacity:0.7">(${counts[cat]})</span>`;
    btn.onclick = () => {
      if (crossCats.includes(cat)) {
        crossCats = crossCats.filter(x => x !== cat);
        btn.classList.remove('sel');
      } else {
        crossCats.push(cat);
        btn.classList.add('sel');
      }
      updateCrossCount();
    };
    wrap.appendChild(btn);
  });
  updateCrossCount();
}

function updateCrossCount() {
  const babsToScan = crossBabs.length
    ? BABS.filter(b => crossBabs.includes(b.num))
    : BABS;
  let pool = babsToScan.flatMap(b => b.kotoba);
  if (crossCoreOnly) pool = pool.filter(k => k.lv === 'core');
  if (crossCats.length) pool = pool.filter(k => crossCats.includes(k.cat));
  const el = document.getElementById('crossCatCount');
  if (el) el.textContent = crossCats.length
    ? `${pool.length} kata dipilih dari kategori: ${crossCats.join(', ')}`
    : `${pool.length} kata (semua kategori)`;
}

function resetAndBackToCross() {
  fcCards = []; fcSessionBab = null;
  fcIndex = 0; fcHafal = []; fcBelum = []; fcSeen = []; fcStreak = 0;
  crossCats = [];
  showScr('crossScr');
  renderCrossCategories();
  refreshForgetBanner();
}

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

// ========== GLOBAL SEARCH ==========
// ========== KAMUS KATEGORI ==========

let kamusActiveCat = 'Kata Kerja';
let kamusCoreOnly = false;
// Track which sub-sections are open (by key)
let kamusOpenSections = {};

const KAMUS_CATS = [
  { key: 'Kata Kerja',      icon: '🏃', label: 'Kata Kerja' },
  { key: 'Kata Sifat',      icon: '✨', label: 'Kata Sifat' },
  { key: 'Kata Benda',      icon: '📦', label: 'Kata Benda' },
  { key: 'Ekspresi',        icon: '💬', label: 'Ekspresi' },
  { key: 'Kata Keterangan', icon: '🔄', label: 'Keterangan' },
  { key: 'Kata Tanya',      icon: '❓', label: 'Kata Tanya' },
  { key: 'Partikel',        icon: '🔗', label: 'Partikel' },
  { key: 'Konjungsi',       icon: '➕', label: 'Konjungsi' },
  { key: 'Kata Tunjuk',     icon: '👉', label: 'Kata Tunjuk' },
  { key: 'Posisi',          icon: '📍', label: 'Posisi' },
  { key: 'Angka',           icon: '🔢', label: 'Angka' },
];

// Sub-category definitions per main category
const KAMUS_SUBCAT = {
  'Kata Kerja': [
    {
      key: 'I', label: 'Golongan I — う動詞', icon: '①',
      color: '#38bdf8', badgeCls: 'grp-I',
      hint: [
        { ex: '<b>書き</b>ます' },{ ex: '<b>書き</b>ません' },{ ex: '<b>書き</b>ました' },{ ex: '<b>書いて</b>' },
      ],
      desc: 'Kata kerja yang berakhiran suara う sebelum ます. Pola て<ruby><rb>形</rb><rt>けい</rt></ruby>: く→いて, ぐ→いで, む/ぬ/ぶ→んで, つ/う/る→って, す→して.'
    },
    {
      key: 'II', label: 'Golongan II — る動詞', icon: '②',
      color: '#34d399', badgeCls: 'grp-II',
      hint: [
        { ex: '<b>食べ</b>ます' },{ ex: '<b>食べ</b>ません' },{ ex: '<b>食べ</b>ました' },{ ex: '<b>食べて</b>' },
      ],
      desc: 'Kata kerja berakhiran え/い sebelum ます. て<ruby><rb>形</rb><rt>けい</rt></ruby> dibentuk langsung dengan + て.'
    },
    {
      key: 'III', label: 'Golongan III — <ruby>不規則<rt>ふきそく</rt></ruby><ruby>動詞<rt>どうし</rt></ruby>', icon: '③',
      color: '#fbbf24', badgeCls: 'grp-III',
      hint: [
        { ex: '<b>します</b> / <b>しません</b> / <b>して</b>' },{ ex: '<b>きます</b> / <b>きません</b> / <b>きて</b>' },
      ],
      desc: 'Hanya dua kata kerja tidak beraturan: します dan きます.'
    },
    {
      key: null, label: 'Ekspresi Berverba', icon: '💡',
      color: '#9090b0', badgeCls: '', desc: ''
    },
  ],
  'Kata Sifat': [
    {
      key: 'い', label: 'Kata Sifat い — い形容詞', icon: 'い',
      color: '#f87171', badgeCls: 'grp-i',
      hint: [
        { ex: '<b>おおき</b>い' },{ ex: '<b>おおきく</b>ない' },{ ex: '<b>おおきか</b>った' },{ ex: '<b>おおきく</b> なる' },
      ],
      desc: 'Berakhiran い. Negatif: ~くない. Lampau: ~かった. Lampau negatif: ~くなかった. Memodifikasi KK: ~く.'
    },
    {
      key: 'な', label: 'Kata Sifat な — な形容詞', icon: 'な',
      color: '#c084fc', badgeCls: 'grp-na',
      hint: [
        { ex: '<b>きれい</b>な' },{ ex: '<b>きれい</b>じゃない' },{ ex: '<b>きれい</b>でした' },{ ex: '<b>きれいに</b> なる' },
      ],
      desc: 'Memerlukan な saat memodifikasi kata benda. Negatif: ~じゃない. Lampau: ~でした. Memodifikasi KK: ~に.'
    },
    {
      key: null, label: 'Lainnya', icon: '—',
      color: '#9090b0', badgeCls: '', desc: ''
    },
  ],
  'Kata Benda': [
    { key: '__orang__',       label: 'Orang, Profesi & Keluarga',          icon: '👤', color: '#38bdf8' },
    { key: '__tubuh__',       label: 'Anggota Tubuh',                       icon: '🫀', color: '#f87171' },
    { key: '__waktu__',       label: 'Waktu & Kalender',                    icon: '📅', color: '#fbbf24' },
    { key: '__tempat__',      label: 'Tempat, Gedung & Kota',               icon: '🗺️', color: '#34d399' },
    { key: '__transport__',   label: 'Transportasi & Perjalanan',           icon: '🚆', color: '#2dd4bf' },
    { key: '__benda__',       label: 'Benda & Peralatan Sehari-hari',       icon: '🔧', color: '#f472b6' },
    { key: '__pakaian__',     label: 'Pakaian & Aksesori',                  icon: '👕', color: '#c084fc' },
    { key: '__makanan__',     label: 'Makanan & Minuman',                   icon: '🍱', color: '#fb923c' },
    { key: '__alam__',        label: 'Alam, Cuaca & Hewan',                 icon: '🌿', color: '#a78bfa' },
    { key: '__bahasa__',      label: 'Bahasa, Pendidikan & Komunikasi',     icon: '📖', color: '#22d3ee' },
    { key: '__aktivitas__',   label: 'Aktivitas, Hobi & Acara',             icon: '🎭', color: '#818cf8' },
    { key: '__kesehatan__',   label: 'Kesehatan & Medis',                   icon: '🏥', color: '#4ade80' },
  ],
  'Ekspresi': [
    { key: '__eks_salam__',   label: 'Salam, Sapaan & Ungkapan Sopan', icon: '👋', color: '#38bdf8' },
    { key: '__eks_respon__',  label: 'Respon & Konfirmasi',             icon: '✅', color: '#34d399' },
    { key: '__eks_suffix__',  label: 'Akhiran & Pola Bilangan',         icon: '🔢', color: '#fbbf24' },
    { key: '__eks_kondisi__', label: 'Kondisi Tubuh & Kesehatan',       icon: '🏥', color: '#f87171' },
    { key: '__eks_situasi__', label: 'Situasi & Percakapan Umum',       icon: '💬', color: '#c084fc' },
    { key: '__eks_kegiatan__',label: 'Kegiatan & Tindakan',             icon: '🏃', color: '#60a5fa' },
  ],
  'Kata Keterangan': [
    { key: '__ket_frek__',    label: 'Frekuensi',                       icon: '🔁', color: '#38bdf8' },
    { key: '__ket_derajat__', label: 'Derajat & Intensitas',            icon: '📈', color: '#f87171' },
    { key: '__ket_waktu__',   label: 'Waktu & Urutan',                  icon: '⏱️', color: '#fbbf24' },
    { key: '__ket_cara__',    label: 'Cara & Kondisi',                  icon: '⚙️', color: '#34d399' },
    { key: '__ket_kepastian__',label: 'Kepastian & Kemungkinan',        icon: '🎯', color: '#a78bfa' },
  ],
  'Kata Tanya': [
    { key: '__orang_tanya__', label: 'Menanyakan Orang',             icon: '👤', color: '#38bdf8' },
    { key: '__benda_tanya__', label: 'Menanyakan Benda & Hal',       icon: '❓', color: '#34d399' },
    { key: '__tempat_tanya__',label: 'Menanyakan Tempat',            icon: '📍', color: '#fbbf24' },
    { key: '__waktu_tanya__', label: 'Menanyakan Waktu & Tanggal',   icon: '📅', color: '#fb923c' },
    { key: '__jumlah_tanya__',label: 'Menanyakan Jumlah & Harga',    icon: '🔢', color: '#a78bfa' },
    { key: '__cara_tanya__',  label: 'Menanyakan Cara & Keadaan',    icon: '⚙️', color: '#c084fc' },
  ],
  'Angka': [
    { key: '__satuan__',  label: 'Satuan Dasar (hyaku, sen, man)',   icon: '💯', color: '#38bdf8' },
    { key: '__bulan__',   label: 'Nama Bulan (～月)',                icon: '📅', color: '#34d399' },
    { key: '__tanggal__', label: 'Tanggal (～日)',                   icon: '🗓️', color: '#fbbf24' },
    { key: '__hitung__',  label: 'Kata Bantu Bilangan',              icon: '🔢', color: '#f472b6' },
    { key: '__lain_ang__',label: 'Lainnya',                          icon: '🔣', color: '#60a5fa' },
  ],
  'Kata Tunjuk': [
    { key: '__benda_tj__', label: 'Menunjuk Benda (これ/それ/あれ)',  icon: '📦', color: '#38bdf8' },
    { key: '__ktbenda_tj__',label: 'Menunjuk Kata Benda (この/その/あの)', icon: '🏷️', color: '#34d399' },
    { key: '__tempat_tj__', label: 'Menunjuk Tempat (ここ/そこ/あそこ)', icon: '📍', color: '#fbbf24' },
  ],
  'Posisi': [
    { key: '__vertikal__', label: 'Vertikal (atas/bawah)',           icon: '↕️', color: '#38bdf8' },
    { key: '__horizontal__',label: 'Horizontal (depan/belakang/kanan/kiri)', icon: '↔️', color: '#34d399' },
    { key: '__relasi__',   label: 'Relasi & Jarak',                  icon: '🔍', color: '#fbbf24' },
  ],
  'Konjungsi': [
    { key: '__tambah__',   label: 'Penambahan & Urutan',             icon: '➕', color: '#38bdf8' },
    { key: '__kontras__',  label: 'Kontras & Pertentangan',          icon: '⚡', color: '#f87171' },
    { key: '__sebab__',    label: 'Sebab & Akibat',                  icon: '💡', color: '#fbbf24' },
  ],
  'Partikel': [
    { key: '__all_part__', label: 'Semua Partikel',                  icon: '🔗', color: '#7c6af7' },
  ],
};

// ---- KB sub-categorizer: lookup-table per romaji, fallback regex ----
const _KB_LOOKUP = (function() {
  const T = {};
  const add = (cat, list) => list.forEach(r => { T[r] = cat; });

  // ── ORANG, PROFESI & KELUARGA ──
  add('__orang__', [
    'watashi','anata','minasan','ano hito','namae',
    'boku',
    'isha','kaishain','gakusei','ginkōin','kenkyūsha','shain','sensei','yakuzaishi','kanja',
    'haisha',
    'tomodachi','kazoku','kare','kanojo',
    'chichi','haha','otōsan','okāsan',
    'ani','ane','otōto','imōto',
    'ryōshin','ojīsan','obāsan',
    'otōto san','imōto san','otoko no hito','onna no hito',
    'otoko no ko','onna no ko','kyōdai','onīsan','onēsan',
    'kodomo','okosan','otto','tsuma','goshujin','okusan',
    'hosuto famirī','gokazoku',
    'toshi ue','toshi shita',
  ]);

  // ── ANGGOTA TUBUH ──
  add('__tubuh__', [
    'karada','atama','kao','me','mimi','kuchi',
    'kubi','yubi','tsume','onaka','senaka','ashi',
    'nodo',
  ]);

  // ── WAKTU & KALENDER ──
  add('__waktu__', [
    'asa','hiru','yoru','gozen','gogo','ima',
    'ototoi','kinō','kyō','ashita','asatte','kesa','konban',
    'maiasa','maiban','mainichi',
    'senshū','konshū','raishū',
    'sengetsu','kongetsu','raigetsu',
    'kyonen','kotoshi','rainen',
    'getsuyōbi','kayōbi','suiyōbi','mokuyōbi','kinyōbi','doyōbi','nichiyōbi',
    'shūmatsu','jikan','yasumi','hiruyasumi',
    'tanjōbi','oshōgatsu','haha no hi','kurisumasu',
  ]);

  // ── TEMPAT, GEDUNG & KOTA ──
  add('__tempat__', [
    'uchi','mise','kaisha','kanpanī','gakkō','daigaku','byōin',
    'resutoran','hoteru','sūpā','kōen','konbini',
    'kyōshitsu','shokudō','uketsuke','robī','heya','toire',
    'kaidan','erebētā','esukarētā','uriba','depāto','ginkō',
    'yūbinkyoku','toshokan','bijutsukan','biyōin','ryō','jimusho',
    'jimu shitsu','kissaten','izakaya','onsen','pūru',
    'shiyakusho','taishikan','nihongo gakkō','hanaya',
    'otera','kinkakuji',
    'machi','tokoro','biru',
    'indoneshia','nihon','kankoku','chūgoku','igirisu','furansu',
    'shingapōru','burajiru','amerika','firipin','betonamu','myānmā',
    'taiwan','gaikoku','sekai',
    'ōsaka','hiroshima','kyōto','hokkaidō','akihabara','shibuya',
    'shinjuku','ikebukuro','ueno','shinbashi','nagano ken','nyū yōku',
    'jakarta','fukuoka',
    'ken','(o)kuni','(go)shusshin',
    'yama','umi','eberesuto','fuji san',
  ]);

  // ── TRANSPORTASI & PERJALANAN ──
  add('__transport__', [
    'densha','hikōki','fune','basu','takushī','jitensha',
    'chikatetsu','shinkansen','baiku','jidōsha','eki','kūkō',
    'noriba','jei āru','pasupōto','biza','chizu','jūsho','michi','shingō',
    'kōtsū','rasshu','sūtsukēsu','chiketto','kippu','nimotsu',
    'shītoberto',
  ]);

  // ── PAKAIAN & AKSESORI ──
  add('__pakaian__', [
    'kutsu','nekutai','shatsu','tī shatsu','kōto','sūtsu',
    'sētā','bōshi','megane','saifu','kaban','kasa','kimono','saizu','fuku',
    'kutsushita','tebukuro','hankachi','yubiwa','zubon','yōfuku','taoru',
  ]);

  // ── MAKANAN & MINUMAN ──
  add('__makanan__', [
    'gohan','asagohan','hirugohan','bangohan','pan',
    'niku','sakana','yasai','kudamono','tamago','shio','satō',
    'mizu','ocha','kōcha','jūsu','bīru','kēki','wain',
    'bentō','(o)bentō','hanbāgā','kukkī','chokoreeto','kōhī','gyūnyū','miruku',
    'gyūdon','aisukurīmu','tenpura','nihonshu','yakisoba','okonomiyaki',
    '(o)sake','tabemono','nomimono','ryōri','nihon ryōri','okinawa no ryōri',
    'hashi','supūn','fōku','naifu','osara',
    'ringo','mikan',
    '(go)chūmon','(o)kashi',
  ]);

  // ── ALAM, CUACA & HEWAN ──
  add('__alam__', [
    'hare','ame','yuki','kumori','tenki','kisetsu',
    'haru','natsu','aki','fuyu',
    'jishin',
    'dōbutsu','zō','uma','inu','neko',
    'ki','midori','eda',
  ]);

  // ── BAHASA, PENDIDIKAN & KOMUNIKASI ──
  add('__bahasa__', [
    'nihongo','eigo','taigo','gaikokugo',
    'kanji','hiragana','katakana','kotoba','bunpō',
    'yomikata','hatsuon','imi',
    'hon','jisho','shinbun','zasshi','nōto','meishi','kādo',
    'shiken','tesuto','shukudai','tegami','mēru','mēru adoresu',
    'shashin','eiga','ongaku','dī bī dī','shī dī','repōto','sakubun',
    'shiryō','pen','senmon','bangō annai','denwa bangō','denwa',
    'nyūsu','supīchi','iken','anaunsu','nikki',
    'shōgakkō','chūgakkō','kōkō','ai-tī','uta','e','ji',
    'horā eiga',"ren'ai eiga",'rekishi',
    'rekishi','kurashikku','kurasu','jugyō',
    'igaku',
  ]);

  // ── AKTIVITAS, HOBI & ACARA ──
  add('__aktivitas__', [
    'ryokō','pātī','omatsuri','sakkā','tenisu',
    'basukettobōru','sukī','yoga','sumō','tsuri','gādeningu',
    '(o)hanami','keiken','kaigi','yakusoku','purezento','omiyage',
    'shumi','arubaito','risō','konsāto','karaoke','dansu','yakyū',
    'kabuki','ikebana','piano','gitā','gakki','supōtsu','kaimono',
    'junbi','yōji','benkyō','(o)mimai',
  ]);

  // ── KESEHATAN & MEDIS ──
  add('__kesehatan__', [
    'kaze','netsu','kusuri','byōki',
    '(kenkō) hokenshō','ofuro','shawā','chōshi','guai',
  ]);

  // ── BENDA & PERALATAN SEHARI-HARI (sisa yang tidak masuk kategori lain) ──
  add('__benda__', [
    'enpitsu','bōrupen','shāpu penshiru','kagi','tokei',
    'terebi','kamera','keitai denwa','pasokon','tsukue','isu',
    'hasami','hotchikisu','serotēpu','keshigomu','tsumekiri',
    'hako','doa','mado','suicchi','reizōko','tēburu','beddo',
    'tana','denchi','mono','ē tī emu','kopī ki','jidōhanbaiki',
    'denshi renji','eakon','denkiseihin','botan','kikai','oto',
    'fūtō','kitte','hagaki','jūminhyō','sābisu','chippu',
    'okane','genkin','komakai okane','kurejittokādo','nedan','yachin',
    'seikatsu','(o)shigoto','mondai','kotae','hajime','owari',
    'keizai','tabako','jinkō',
  ]);

  return T;
})();

function kbSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  const id  = word.id.toLowerCase().trim();

  // 1. Exact lookup
  if (_KB_LOOKUP[rom]) return _KB_LOOKUP[rom];

  // 2. Disambiguasi kata ambigu berdasarkan id
  if (rom === 'hana')  return id.includes('hidung') ? '__tubuh__' : '__alam__';
  if (rom === 'kami')  return id.includes('rambut') ? '__tubuh__' : '__benda__';
  if (rom === 'te')    return id.includes('tangan') ? '__tubuh__' : '__benda__';
  if (rom === 'ha')    return id.includes('gigi') ? '__tubuh__' : '__alam__';

  // 3. Partial match romaji untuk nama kota/stasiun/prefektur
  if (/eki$|eki /.test(rom)) return '__transport__';
  if (/ken$/.test(rom))       return '__tempat__';

  // 4. Fallback berbasis id (Indonesia)
  if (/\btubuh\b|kepala|rambut|wajah|muka|\bmata\b|telinga|hidung|\bmulut\b|\bgigi\b|(?<!sarung )\btangan\b|(?<!kaus )\bkaki\b|perut|\bbadan\b|tenggorokan/.test(id)) return '__tubuh__';
  if (/(?<!ilmu ke)dokter|apoteker|guru|siswa|mahasiswa|pegawai|karyawan|peneliti|pasien|(?<!kerumunan |jumlah besar; |menjenguk )orang\b|wanita|pria|\banak\b|kakak|adik|\bayah\b|\bibu\b|teman|keluarga|saudara|kakek|nenek|istri|suami|\bsaya\b|\banda\b/.test(id)) return '__orang__';
  if (/\bpagi\b|\bsiang\b|\bmalam\b|hari ini|kemarin|besok|sekarang|senin|selasa|rabu|kamis|jumat|sabtu|\bminggu\b|akhir pekan|ulang tahun|setiap/.test(id)) return '__waktu__';
  if (/kereta|pesawat|kapal|\bbus\b|taksi|sepeda|bandara|paspor|koper|transportasi/.test(id)) return '__transport__';
  if (/sekolah|universitas|kantor|rumah sakit|perpustakaan|museum|gedung kesenian|negara|negeri|kota|kuil|luar negeri/.test(id)) return '__tempat__';
  if (/sepatu|dasi|kemeja|\bkaus\b|jaket|sweter|topi\b|kacamata|dompet|\btas\b|payung|pakaian|kimono|kaus kaki|sarung tangan|saputangan|celana|cincin|handuk/.test(id)) return '__pakaian__';
  if (/\bnasi\b|\broti\b|daging\b|\bikan\b|telur\b|susu\b|kopi\b|\bteh\b|\bbir\b|\bjus\b|\bair\b|\bkue\b|makanan|minuman|masakan|sarapan|makan siang|makan malam/.test(id)) return '__makanan__';
  if (/hujan|salju|cerah|berawan|cuaca|gempa|hewan|binatang|anjing|kucing|pohon|bunga|musim semi|musim panas|musim gugur|musim dingin/.test(id)) return '__alam__';
  if (/\bsakit\b|demam|\bflu\b|\bobat\b|asuransi|shower|bak mandi|kondisi/.test(id)) return '__kesehatan__';
  if (/bahasa|tata bahasa|ujian|sejarah|\bfilm\b|\bmusik\b|\blagu\b|koran|berita|pidato|pendapat|pengucapan|arti\b|pelajaran|silabus/.test(id)) return '__bahasa__';
  if (/wisata|festival|olahraga|konser|hobi|\brapat\b|janji\b|hadiah|pengalaman|\bbelajar\b|memancing|berkebun|berkebun/.test(id)) return '__aktivitas__';

  return '__benda__';
}

// ---- Ekspresi sub-categorizer (lookup-table) ----
const _EKS_LOOKUP = (function() {
  const T = {};
  const add = (cat, list) => list.forEach(r => { T[r] = cat; });

  // Salam, Sapaan & Ungkapan Sopan
  add('__eks_salam__', [
    'hajimemashite','dōzo, yoroshiku onegai shimasu','shitsurei desu ga',
    '(dōmo) arigatō gozaimasu','anō','dōzo',
    '(dōmo) arigatō gozaimashita','omedetō gozaimasu',
    'moshi moshi','onegai shimasu','odaiji ni','okage sama de',
  ]);

  // Respon & Konfirmasi
  add('__eks_respon__', [
    'hai','iie','chigaimasu','sō desu','sō desu ka','sō desu ne',
    'kashikomarimashita','daijōbu','yokatta desu ne','zannen desu',
    'taihen desu ne','ii desu ne','suteki desu ne','genki desu',
    'un','uun','dō shitara ii desu ka',
  ]);

  // Akhiran & Pola Bilangan
  add('__eks_suffix__', [
    '~san','~jin','~sai','~kai','~go','~en',
    '~ji','~fun','~jikanme','~jikan','~shūkan','~kagetsu','~nen',
    '~kai','~no hō ga','~senchi','~mētoru','~gurai','~kata',
    'mō~','~kun','~kedo','~nengō','~made ni','~dake',
    '~o misete kudasai','~kara kimashita','~wa ikaga desu ka',
    '~no toki','~ni tsuite','han',
  ]);

  // Kondisi Tubuh & Kesehatan
  add('__eks_kondisi__', [
    'kaze o hikimasu','~ga itai desu','netsu ga arimasu',
    'seki ga demasu','shokuyoku ga arimasen','kimochi ga warui desu',
    'atama ga itai desu','onaka ga itai desu',
    'se ga takai','se ga hikui','chōshi ga ii','chōshi ga warui',
    'onaka ga sukimashita','onaka ga ippai desu',
  ]);

  // Kegiatan & Tindakan
  add('__eks_kegiatan__', [
    'aruite','omochi kaeri','piano no renshū',
    'ha o migakimasu','te o araimasu','ki o tsukemasu',
    'tanoshiku narimasu','jōzu ni narimasu','shōgakkō ni hairu',
    'issho ni','minna de',
  ]);

  // Situasi & Percakapan Umum — semua sisanya
  add('__eks_situasi__', [
    'onamae wa?','sochira','hitori de','tsugi no',
    'nani mo~nai','nanika','kore kara','dochira no goshusshin desu ka',
    'okaikei','betsubetsu ni','hajimete','doko ka',
    'kondo','dō shimashita ka','ni san nichi','shikashi',
    'kono aida','~nengō','zenbu','jibun de',
    "kin'en",'desu kara',
    'hoka ni','boku',
  ]);

  return T;
})();

function ekspresiSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_EKS_LOOKUP[rom]) return _EKS_LOOKUP[rom];

  const id = word.id.toLowerCase();

  // Fallback berbasis id
  if (/perkenalkan|salam kenal|terima kasih|permisi|halo|selamat|maaf|tolong\b|semoga lekas/.test(id)) return '__eks_salam__';
  if (/iya\b|tidak\b|bukan|betul|tepat|mengerti|begitu ya|baik ya|bagus ya|syukur|sayang sekali|tidak apa-apa/.test(id)) return '__eks_respon__';
  if (/akhiran|imbuhan|~ |〜|kata bantu|bahasa ~|lantai ~|pukul ~|jam ~|menit|yen|sentimeter|meter|kali\b|minggu|bulan|tahun|setengah|hanya|sekitar ~|cara ~|sampai dengan|ketika ~|apakah anda|mengenai ~/.test(id)) return '__eks_suffix__';
  if (/sakit|demam|batuk|lapar|kenyang|nafsu makan|merasa sakit|sakit kepala|sakit perut|tinggi|pendek|masuk angin|dalam kondisi/.test(id)) return '__eks_kondisi__';
  if (/berjalan|gosok|cuci|bawa pulang|latihan|bersama|hati-hati|menjadi mahir|menjadi menyenangkan|masuk sekolah/.test(id)) return '__eks_kegiatan__';
  return '__eks_situasi__';
}

// ---- Kata Keterangan sub-categorizer (lookup-table) ----
const _KET_LOOKUP = (function() {
  const T = {};
  const add = (cat, list) => list.forEach(r => { T[r] = cat; });

  // Frekuensi
  add('__ket_frek__', [
    'itsumo','tokidoki','yoku','zenzen','nakanaka',
    'ichido','ichido mo',
  ]);

  // Derajat & Intensitas
  add('__ket_derajat__', [
    'totemo','amari','takusan','sukoshi','ichiban ~',
    'zutto','mō sukoshi','sonna ni','zehi','hontō ni',
  ]);

  // Waktu & Urutan
  add('__ket_waktu__', [
    'mō','mada','saikin','sugu','mata','ato de',
    'mazu','tsugi ni','mō sugu','dandan',
  ]);

  // Cara & Kondisi
  add('__ket_cara__', [
    'daitai','hayaku','toku ni','yukkuri','massugu',
  ]);

  // Kepastian & Kemungkinan
  add('__ket_kepastian__', [
    'tabun','kitto','mochiron',
  ]);

  return T;
})();

function keteranganSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_KET_LOOKUP[rom]) return _KET_LOOKUP[rom];

  const id = word.id.toLowerCase();
  if (/selalu|kadang|sering|jarang|tidak pernah|sekali\b|tiap|setiap|biasanya|pernah/.test(id)) return '__ket_frek__';
  if (/sangat|terlalu|paling\b|jauh lebih|sedikit lagi|sungguh|benar-benar|sama sekali|tidak terlalu/.test(id)) return '__ket_derajat__';
  if (/sudah|belum|nanti|segera|langsung|kemudian|pertama-tama|selanjutnya|lagi\b|akhir-akhir|bertahap/.test(id)) return '__ket_waktu__';
  if (/pelan|cepat|lurus|kira-kira|terutama|khususnya/.test(id)) return '__ket_cara__';
  if (/mungkin|pasti|yakin|tentu saja/.test(id)) return '__ket_kepastian__';
  return '__ket_cara__';
}

// ---- Kata Tanya sub-categorizer (lookup-table) ----
const _TANYA_LOOKUP = {
  // Orang
  'dare':'__orang_tanya__','nan sai':'__orang_tanya__','oikutsu':'__orang_tanya__',
  // Benda & Hal
  'nan':'__benda_tanya__','nani':'__benda_tanya__','donna ~':'__benda_tanya__',
  'dore':'__benda_tanya__','dono~':'__benda_tanya__',
  // Tempat
  'doko':'__tempat_tanya__','dochira':'__tempat_tanya__',
  // Waktu & Tanggal
  'nan yōbi':'__waktu_tanya__','nanji':'__waktu_tanya__','nanpun':'__waktu_tanya__',
  'itsu':'__waktu_tanya__','nangatu':'__waktu_tanya__','nanichi':'__waktu_tanya__',
  // Jumlah & Harga
  'ikura':'__jumlah_tanya__','ikutsu':'__jumlah_tanya__',
  'dono gurai':'__jumlah_tanya__','nan gai':'__jumlah_tanya__',
  // Cara & Keadaan
  'dō':'__cara_tanya__','dōshite':'__cara_tanya__','dō yatte':'__cara_tanya__',
};
function kataTanyaSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_TANYA_LOOKUP[rom]) return _TANYA_LOOKUP[rom];
  const id = word.id.toLowerCase();
  if (/siapa|nama/.test(id)) return '__orang_tanya__';
  if (/di mana|sebelah mana/.test(id)) return '__tempat_tanya__';
  if (/kapan|hari apa|jam berapa|berapa menit|bulan apa|tanggal|berapa hari/.test(id)) return '__waktu_tanya__';
  if (/berapa|harga|banyak|lama|lantai berapa/.test(id)) return '__jumlah_tanya__';
  if (/bagaimana|cara|keadaan|kenapa/.test(id)) return '__cara_tanya__';
  return '__benda_tanya__';
}

// ---- Angka sub-categorizer (lookup-table) ----
const _ANGKA_LOOKUP = {
  // Satuan dasar
  'hyaku':'__satuan__','sen':'__satuan__','man':'__satuan__',
  // Nama Bulan
  'ichigatsu':'__bulan__','nigatsu':'__bulan__','sangatsu':'__bulan__',
  'shigatsu':'__bulan__','gogatsu':'__bulan__','rokugatsu':'__bulan__',
  'shichigatsu':'__bulan__','hachigatsu':'__bulan__','kugatsu':'__bulan__',
  'juugatsu':'__bulan__','juuichigatsu':'__bulan__','juunigatsu':'__bulan__',
  // Tanggal
  'tsuitachi':'__tanggal__','futsuka':'__tanggal__','mikka':'__tanggal__',
  'yokka':'__tanggal__','itsuka':'__tanggal__','muika':'__tanggal__',
  'nanoka':'__tanggal__','youka':'__tanggal__','kokonoka':'__tanggal__',
  'tooka':'__tanggal__','juuyokka':'__tanggal__','hatsuka':'__tanggal__',
  'nijuuyokka':'__tanggal__',
  // Kata bantu bilangan & menghitung
  'hitotsu':'__hitung__','futatsu':'__hitung__','mittsu':'__hitung__',
  'yottsu':'__hitung__','itsutsu':'__hitung__','muttsu':'__hitung__',
  'nanatsu':'__hitung__','yattsu':'__hitung__','kokonotsu':'__hitung__',
  'tō':'__hitung__','hitori':'__hitung__','futari':'__hitung__',
  '~nin':'__hitung__','~dai':'__hitung__','~mai':'__hitung__',
};
function angkaSubCat(word) {
  const rom = word.rom.toLowerCase().trim();
  if (_ANGKA_LOOKUP[rom]) return _ANGKA_LOOKUP[rom];
  const id = word.id.toLowerCase();
  if (/januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember/.test(id)) return '__bulan__';
  if (/tanggal/.test(id)) return '__tanggal__';
  if (/seratus|seribu|sepuluh ribu/.test(id)) return '__satuan__';
  if (/buah|orang|lembar|unit|ekor|batang|pasang|kata bantu/.test(id)) return '__hitung__';
  return '__lain_ang__';
}

// ---- Kata Tunjuk sub-categorizer ----
function kataTunjukSubCat(word) {
  const jp = word.jp.replace(/<[^>]+>/g,'');
  const id = word.id.toLowerCase();
  // これ/それ/あれ — standalone pronouns
  if (/ini \(dekat pembicara\)|itu \(dekat lawan|itu \(jauh/.test(id) && !/~ ini|~ itu|di sini|di situ|di sana|sebelah/.test(id)) return '__benda_tj__';
  // この/その/あの — modifiers
  if (/~ ini|~ itu/.test(id)) return '__ktbenda_tj__';
  // ここ/そこ/あそこ/こちら/そちら/あちら
  if (/di sini|di situ|di sana|sebelah sini|sebelah situ|sebelah sana/.test(id)) return '__tempat_tj__';
  return '__benda_tj__';
}

// ---- Posisi sub-categorizer ----
function posisiSubCat(word) {
  const id = word.id.toLowerCase();
  if (/atas|bawah/.test(id)) return '__vertikal__';
  if (/depan|belakang|kanan|kiri|dalam|luar/.test(id)) return '__horizontal__';
  return '__relasi__';
}

// ---- Konjungsi sub-categorizer ----
function konjungsiSubCat(word) {
  const id = word.id.toLowerCase();
  if (/karena|sebab/.test(id)) return '__sebab__';
  if (/tetapi|tapi|namun/.test(id)) return '__kontras__';
  return '__tambah__';
}
function dedupeWords(words) {
  const seen = new Set();
  return words.filter(k => {
    const key = k.jp.replace(/<[^>]+>/g,'').trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---- Smart Thematic Sort ----
// Groups words by semantic clusters: antonyms, countries, animals, seasons, etc.
// Words in the same cluster are placed together for easier learning.

const _THEMATIC_GROUPS = (function() {
  // Each entry: [groupId, romaji...]
  // Words in the same group get the same groupId and are sorted together.
  const G = {};
  let gid = 0;
  function grp(...roms) {
    const id = gid++;
    roms.forEach(r => { const k=r.toLowerCase(); if(G[k]===undefined) G[k]=id; });
  }

  // ── KATA SIFAT: Pasangan antonim ──
  grp('ōkii','chiisai');                           // besar/kecil
  grp('takai','hikui','yasui');                    // tinggi/rendah/murah
  grp('nagai','mijikai');                          // panjang/pendek
  grp('hiroi','semai');                            // luas/sempit
  grp('omoi','karui');                             // berat/ringan
  grp('atarashii','furui');                        // baru/lama
  grp('ii (yoi)','warui');                         // bagus/buruk
  grp('hayai','osoi');                             // cepat/lambat
  grp('atsui/atsui','samui','tsumetai');           // panas/dingin
  grp('atatakai','suzushii');                      // hangat/sejuk
  grp('akai','aoi','kiiroi','shiroi','kuroi','chairoi'); // warna
  grp('oishii','mazui');                           // enak/tidak enak
  grp('nigiyaka (na)','shizuka (na)');             // ramai/sunyi
  grp('tanoshii','tsumaranai');                    // menyenangkan/membosankan
  grp('muzukashii','yasashii');                    // sulit/mudah
  grp('omoshiroi','tsumaranai');                   // menarik/membosankan
  grp('kirei (na)','kitanai');                     // cantik/kotor
  grp('genki (na)','isogashii','hima (na)');       // sehat/sibuk/senggang
  grp('jōzu (na)','heta (na)');                    // pandai/tidak pandai
  grp('suki (na)','kirai (na)');                   // suka/tidak suka
  grp('tōi','chikai');                             // jauh/dekat
  grp('akarui','kurai');                           // terang/gelap
  grp('hansamu (na)','shinsetsu (na)');            // tampan/baik hati

  // ── KATA BENDA: Negara & wilayah (urut abjad romaji) ──
  grp('nihon','indoneshia','kankoku','chūgoku','igirisu','furansu',
      'shingapōru','burajiru','amerika','firipin','betonamu','myānmā',
      'taiwan','gaikoku','sekai');

  // ── Hewan ──
  grp('dōbutsu','inu','neko','uma','zō');

  // ── Musim (semi → panas → gugur → dingin) ──
  grp('haru','natsu','aki','fuyu');

  // ── Cuaca ──
  grp('tenki','hare','ame','yuki','kumori');

  // ── Anggota keluarga (generasi tua → muda) ──
  grp('kazoku','ryōshin','ojīsan','obāsan',
      'chichi','otōsan','haha','okāsan',
      'ani','onīsan','ane','onēsan',
      'otto','tsuma','goshujin','okusan',
      'otōto','otōto san','imōto','imōto san',
      'kodomo','okosan','gokazoku');

  // ── Anggota tubuh (atas → bawah) ──
  grp('atama','kao','me','mimi','hana','kuchi','ha','kubi',
      'karada','te','yubi','onaka','senaka','ashi','tsume');

  // ── Alat kebersihan/perawatan ──
  grp('tsumekiri','hasami','hotchikisu','serotēpu','keshigomu');

  // ── Makanan pokok ──
  grp('gohan','pan','niku','sakana','yasai','kudamono','tamago');
  // ── Minuman ──
  grp('mizu','ocha','kōcha','kōhī','jūsu','gyūnyū','miruku','bīru','wain');
  // ── Waktu makan ──
  grp('asagohan','hirugohan','bangohan');

  // ── Hari dalam seminggu (Senin → Minggu) ──
  grp('getsuyōbi','kayōbi','suiyōbi','mokuyōbi','kinyōbi','doyōbi','nichiyōbi','shūmatsu');

  // ── Waktu relatif: hari (kemarin lusa → lusa) ──
  grp('ototoi','kinō','kyō','ashita','asatte');
  // ── Waktu relatif: minggu ──
  grp('senshū','konshū','raishū');
  // ── Waktu relatif: bulan ──
  grp('sengetsu','kongetsu','raigetsu');
  // ── Waktu relatif: tahun ──
  grp('kyonen','kotoshi','rainen');
  // ── Bagian hari ──
  grp('asa','gozen','hiru','gogo','yoru','kesa','konban');

  // ── Transportasi ──
  grp('densha','chikatetsu','shinkansen','basu','takushī',
      'jitensha','baiku','jidōsha','hikōki','fune');

  // ── Profesi ──
  grp('sensei','gakusei','isha','kaishain','ginkōin',
      'kenkyūsha','shain','yakuzaishi','kanja');

  // ── Olahraga & hobi ──
  grp('sakkā','tenisu','basukettobōru','yakyū','sukī','yoga','sumō','tsuri','gādeningu');

  // ── Alat tulis ──
  grp('enpitsu','bōrupen','pen','keshigomu','hasami','hotchikisu','serotēpu');

  // ── Pakaian & Aksesori ──
  grp('shatsu','tī shatsu','sūtsu','kōto','sētā','fuku','kutsu','kutsushita','bōshi','nekutai','kimono');

  // ── Posisi: vertikal ──
  grp('ue','shita');
  // ── Posisi: horizontal ──
  grp('mae','ushiro','migi','hidari','naka','soto');

  // ── Kata Kerja: pasangan tematik ──
  grp('ikimasu','kimasu','kaerimasu');     // pergi/datang/pulang
  grp('tabemasu','nomimasu');              // makan/minum
  grp('mimasu','kikimasu');               // melihat/mendengar
  grp('yomimasu','kakimasu');             // membaca/menulis
  grp('kaimasu','urimasu');               // membeli/menjual
  grp('akemasu','shimemasu');             // membuka/menutup
  grp('tsukemasu','keshimasu');           // menyalakan/mematikan
  grp('iremasu','dashimasu');             // memasukkan/mengeluarkan
  grp('agemasu','moraimasu','kuremasu');  // memberi/menerima
  grp('kashimasu','karimasu');            // meminjamkan/meminjam
  grp('hairimasu','demasu');              // masuk/keluar
  grp('norimasu','orimasu');              // naik/turun
  grp('imasu','arimasu');                 // ada (hidup/benda)
  grp('nemasu','okimasu');                // tidur/bangun
  grp('kimasu','nugimasu');               // memakai/melepas
  grp('oshiemasu','naraimasu');           // mengajar/belajar dari

  // ── Kata Kerja N4: Pasangan Transitif/Intransitif ──
  grp('akemasu','akimasu');               // membuka (tr) / terbuka (intr)
  grp('shimemasu','shimarimasu');         // menutup (tr) / tertutup (intr)
  grp('tsukemasu','tsukimasu');           // menyalakan (tr) / menyala (intr)
  grp('keshimasu','kiemasu');             // mematikan (tr) / padam (intr)
  grp('iremasu','hairimasu');             // memasukkan (tr) / masuk (intr)
  grp('dashimasu','demasu');              // mengeluarkan (tr) / keluar (intr)
  grp('hajimemasu','hajimarimasu');       // memulai (tr) / dimulai (intr)
  grp('owarimasu','owaru');              // mengakhiri/berakhir
  grp('naraemasu','narabimasu');         // menyusun (tr) / berbaris (intr)
  grp('tomemasu','tomarimasu');           // menghentikan (tr) / berhenti (intr)
  grp('atsumemasu','atsumarimasu');       // mengumpulkan (tr) / berkumpul (intr)
  grp('kaemasu','kawarimasu');            // mengubah (tr) / berubah (intr)
  grp('kowaremasu','kowashimasu');        // rusak (intr) / merusak (tr)
  grp('yogoremasu','yogoshimasu');        // kotor (intr) / mengotori (tr)
  grp('ochimasu','otoshimasu');           // jatuh (intr) / menjatuhkan (tr)
  grp('oremasu','orimasu');              // patah (intr) / mematahkan (tr)
  grp('waremasu','warimasu');            // pecah (intr) / memecahkan (tr)
  grp('kiremasu','kirimasu');            // terputus (intr) / memotong (tr)
  grp('nakunarimasu','nakushimasu');      // hilang (intr) / menghilangkan (tr)
  grp('taremasu','tarashimasu');          // menggantung
  grp('nuremasu','nurashimasu');          // basah (intr) / membasahi (tr)
  grp('yakemasu','yakimasu');             // terbakar (intr) / membakar (tr)
  grp('ugokimasu','ugokashimasu');        // bergerak (intr) / menggerakkan (tr)

  // ── Kata Kerja N4: Emosi & Perasaan ──
  grp('yorokobimasu','kanashimimasu');   // bergembira / bersedih
  grp('bikkuri shimasu','anshin shimasu'); // terkejut / lega
  grp('gakkari shimasu','yorokobimasu');  // kecewa / gembira
  grp('okoru','shikaru');                // marah / memarahi
  grp('waraimasu','nakimasu');           // tertawa / menangis
  grp('ureshii','kanashii');             // senang / sedih
  grp('hazukashii','hokori');            // malu / bangga

  // ── Kata Kerja N4: Komunikasi & Bicara ──
  grp('hanashimasu','iimasu');           // berbicara / berkata
  grp('kotaemasu','kikimasu');           // menjawab / bertanya
  grp('tsutaemasu','shirasemasu');       // menyampaikan / memberitahu
  grp('sōdan shimasu','setsumai shimasu'); // berkonsultasi / menjelaskan
  grp('homemasu','shikaru');             // memuji / memarahi
  grp('yobimasu','kotaemasu');           // memanggil / menjawab
  grp('tanomu','hikiukeru');             // meminta / menerima tugas

  // ── Kata Kerja N4: Gerakan Badan ──
  grp('tatsu','suwaru');                 // berdiri / duduk
  grp('arukimasu','hashirimasu');        // berjalan / berlari
  grp('tomarimasu','ugokimasu');         // berhenti / bergerak
  grp('agarimasu','sagarimasu');         // naik / turun
  grp('furimasu','tomaru');              // bergetar / berhenti
  grp('magarimasu','massugu ikimasu');   // berbelok / jalan lurus
  grp('wataru','tooru');                 // menyeberang / melewati

  // ── Kata Kerja N4: Kerja & Aktivitas ──
  grp('hatarakimasu','yasumimasu');       // bekerja / istirahat
  grp('tsutomemasu','yamemasu');          // bekerja di / berhenti
  grp('hajimemasu','owarimasu');          // memulai / mengakhiri
  grp('tsuzukemasu','yamemasu');          // melanjutkan / berhenti
  grp('ganbarimasu','akiramemasu');       // berusaha / menyerah
  grp('shippai shimasu','seikō shimasu'); // gagal / berhasil
  grp('susumiemasu','okuremasu');         // maju / terlambat

  // ── Kata Kerja N4: Rumah Sakit & Kesehatan ──
  grp('nyūin shimasu','taiin shimasu');   // masuk RS / keluar RS
  grp('nakunarimasu','umaremasu');        // meninggal / lahir
  grp('byōki ni narimasu','naorimasu');   // jatuh sakit / sembuh

  // ── Kata Kerja N4: Belajar & Pendidikan ──
  grp('oboeru','wasureru');              // mengingat / melupa
  grp('shirabemasu','mitukemasu');        // menyelidiki / menemukan
  grp('kangaemasu','kimemasu');           // berpikir / memutuskan
  grp('shitsumon shimasu','kotaemasu');   // bertanya / menjawab
  grp('goukaku shimasu','shippai shimasu'); // lulus / gagal

  // ── Kata Kerja N4: Memakai Pakaian (bagian tubuh) ──
  grp('kimasu','hakimasu','kaburimasu','kakemasu'); // baju/celana/topi/kacamata
  grp('kimasu','nugimasu');              // memakai / melepas (sudah ada di atas, diperkuat)

  // ── Kata Kerja N4: Membuat & Memperbaiki ──
  grp('tsukurimasu','naoshimasu');        // membuat / memperbaiki
  grp('kumitatemasu','barasimasu');       // merakit / membongkar
  grp('hatsumei shimasu','hakken shimasu'); // menciptakan / menemukan
  grp('sekkei shimasu','kensetsu shimasu'); // merancang / membangun

  // ── Kata Kerja N4: Perdagangan & Ekspor/Impor ──
  grp('yushutsu shimasu','yunyū shimasu'); // mengekspor / mengimpor
  grp('okuru','ukeru');                   // mengirim / menerima
  grp('todokemasu','uketorimasu');        // mengantarkan / menerima

  // ── Kata Kerja N4: Saklar & Perangkat ──
  grp('(dengen o) iremasu','(dengen o) kirimasu'); // menyalakan/mematikan daya
  grp('(kagi o) kakemasu','(kagi o) akemasu');     // mengunci / membuka kunci

  // ── Kata Kerja N4: Rumah Tangga ──
  grp('sentaku shimasu','sōji shimasu','ryōri shimasu'); // mencuci/membersihkan/memasak
  grp('katazukemasu','chirakashimasu');   // merapikan / mengacaukan
  grp('seiri shimasu','junbi shimasu');    // memilah / mempersiapkan

  // ── Kata Kerja N4: Sosial & Hubungan ──
  grp('au','wakareru');                   // bertemu / berpisah
  grp('kenka shimasu','nakanaori shimasu'); // bertengkar / berbaikan
  grp('kekkon shimasu','rikon shimasu');   // menikah / bercerai
  grp('sewa o shimasu','sodatemasu');      // mengurus / merawat

  // ── Kata Kerja N4: Cuaca & Alam ──
  grp('furimasu','yamuimasu');            // hujan turun / berhenti (hujan)
  grp('funka shimasu','jishin');          // meletus / gempa

  // ── Kata Kerja N4: Keuangan ──
  grp('haraimasu','azukemasu');           // membayar / menyimpan
  grp('oroshimasu','furikomomasu');       // menarik uang / mentransfer
  grp('tamemasu','tsukaimasu');           // menabung / menggunakan

  // ── Kata Benda N4: Bencana ──
  grp('jishin','taifū','kaji','jiko','tsunami','kaminari');

  // ── Kata Benda N4: Perasaan ──
  grp('kimochi','kibun','shimpai','anshin');

  // ── Kata Benda N4: Sekolah ──
  grp('shōgakkō','chūgakkō','kōkō','daigaku');

  // ── Kata Keterangan: frekuensi (selalu → tidak pernah) ──
  grp('itsumo','yoku','tokidoki','amari','zenzen');
  // ── Jumlah ──
  grp('takusan','sukoshi');
  // ── Sudah/belum ──
  grp('mō','mada');

  // ── Kata Sifat tambahan: pasangan & kluster ──
  grp('suki (na)','kirai (na)');                   // suka/tidak suka
  grp('jōzu (na)','heta (na)');                    // pandai/tidak pandai
  grp('genki (na)','hima (na)','isogashii');       // sehat/senggang/sibuk
  grp('ōi','sukunai');                             // banyak/sedikit
  grp('amai','karai','suppai','nigai');            // rasa: manis/pedas/asam/pahit
  grp('futoi','hosoi');                            // gemuk/tipis(kurus)
  grp('tsuyoi','yowai');                           // kuat/lemah
  grp('ureshii','sabishii');                       // senang/kesepian
  grp('hansamu (na)','kawaii','suteki (na)','kirei (na)'); // penampilan positif
  grp('shinsetsu (na)','taisetsu (na)');           // baik hati/penting
  grp('benri (na)','fuben na');                    // praktis/tidak praktis
  grp('ii (yoi)','warui');                         // bagus/buruk
  grp('shizuka (na)','nigiyaka (na)');             // sunyi/ramai
  grp('kantan (na)','muzukashii','yasashii');      // mudah/sulit
  grp('daijōbu (na)','abunai');                    // aman/berbahaya
  grp('wakai','toshi ue');                         // muda/lebih tua
  grp('atama ga ii','yōmei (na)');                // pintar/terkenal
  grp('nemui','hoshii');                           // mengantuk/menginginkan
  grp('sugoi','onaji');                            // menakjubkan/sama
  grp('taihen (na)','muzukashii');                 // berat/sulit - sudah ada muzukashii, taihen bergabung
  grp('yūmei (na)','suteki (na)');                 // terkenal/indah
  grp('iroiro (na)','onaji');                       // berbagai macam/sama
  grp('muda na','fuben na');                        // sia-sia/tidak praktis

  // ── Kata Kerja: Pergerakan & Perpindahan ──
  grp('arukimasu','hashirimasu','oyogimasu');       // berjalan/berlari/berenang
  grp('tachimasu','suwarimasu');                    // berdiri/duduk
  grp('isogimasu','machimasu');                     // terburu-buru/menunggu
  grp('motte ikimasu','motte kimasu');             // membawa pergi/membawa datang
  grp('tsurete ikimasu','tsurete kimasu');          // mengajak pergi/mengajak datang
  grp('dekakemasu','modorimasu','kaette kimasu');   // berangkat/kembali/pulang kembali
  grp('shuppatsu shimasu','tōchaku shimasu');       // berangkat/tiba
  grp('mukaimasu','(eki ni) tsukimasu');            // menuju/tiba
  grp('tōrimasu','(hashi o) watarimasu');          // lewat/menyeberang
  grp('(michi o) arukimasu','(michi o) hashirimasu'); // berjalan di jalan/berlari di jalan
  grp('(yama ni) noborimasu','(hoteru ni) tomarimasu'); // mendaki/menginap
  grp('norimasu','orimasu','norikaemasu');          // naik/turun/ganti kendaraan
  grp('(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu'); // naik kereta/turun/pindah

  // ── Kata Kerja: Memegang & Membawa ──
  grp('mochimasu','hakobimasu');                   // membawa/mengangkut
  grp('torimasu','watashimasu');                   // mengambil/menyerahkan
  grp('hiroimasu','otoshimasu');                   // memungut/menjatuhkan

  // ── Kata Kerja: Melihat & Mendengar ──
  grp('miemasu','kikoemasu');                      // terlihat/terdengar
  grp('misemasu','(sensei ni) kikimasu');           // menunjukkan/bertanya

  // ── Kata Kerja: Berbicara & Komunikasi ──
  grp('hanashimasu','iimasu','kotaemasu');          // berbicara/berkata/menjawab
  grp('denwa shimasu','(denwa o) kakemasu','renraku shimasu'); // menelepon/menghubungi
  grp('setsumei shimasu','shōkai shimasu','annai shimasu'); // menjelaskan/memperkenalkan/memandu
  grp('tanomimasu','sasoimasu','shōtai shimasu');   // meminta/mengundang/mengundang (formal)
  grp('yobimasu','okoshimasu');                    // memanggil/membangunkan
  grp('shikarimasu','chūi shimasu','homemasu');     // memarahi/memperingatkan/memuji

  // ── Kata Kerja: Membeli & Bayar ──
  grp('kaimasu','haraimasu','kaeshimasu');          // membeli/membayar/mengembalikan
  grp('chokin shimasu','okane');                    // menabung

  // ── Kata Kerja: Belajar & Pendidikan ──
  grp('benkyō shimasu','naraimasu','oshiemasu');    // belajar/belajar dari/mengajar
  grp('oboemasu','wasuremasu','omoidashimasu');     // menghafal/lupa/mengingat kembali
  grp('shirabemasu','sagashimasu','mitsukemasu');   // menyelidiki/mencari/menemukan
  grp('shitsumon shimasu','(shitsumon ni) kotaemasu'); // bertanya/menjawab
  grp('yoshū shimasu','fukushū shimasu','fukushū o shimasu'); // persiapan/ulangan/meninjau
  grp('renshū shimasu','undō shimasu');            // berlatih/berolahraga
  grp('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu'); // masuk univ/lulus
  grp('(daigaku ni) hairimasu','(daigaku o) demasu'); // masuk/lulus
  grp('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu'); // ikut ujian/lulus/gagal
  grp('ryūgaku shimasu','shūshoku shimasu');       // belajar di LN/bekerja

  // ── Kata Kerja: Kerja & Rutinitas ──
  grp('hatarakimasu','yasumimasu','(kaisha o) yasumimasu'); // bekerja/istirahat/libur
  grp('shutchō shimasu','zangyō shimasu');         // perjalanan bisnis/lembur
  grp('kyūkei shimasu','sanpo shimasu');           // istirahat/jalan santai
  grp('sanka shimasu','(kaigi ni) shusseki shimasu'); // berpartisipasi/menghadiri
  grp('mōshikomimasu','yoyaku shimasu','kyanseru shimasu'); // mendaftar/reservasi/batal
  grp('okonaimasu','junbi shimasu','yōi shimasu'); // menyelenggarakan/mempersiapkan

  // ── Kata Kerja: Membuat & Memperbaiki ──
  grp('tsukurimasu','naoshimasu','kowashimasu');    // membuat/memperbaiki/merusak
  grp('tatemasu','sekkei shimasu');                 // membangun/merancang
  grp('hatsumei shimasu','hakken shimasu');         // menciptakan/menemukan

  // ── Kata Kerja: Membersihkan & Rumah Tangga ──
  grp('sentaku shimasu','sōji shimasu','katazukemasu'); // cuci/bersihkan/rapikan
  grp('araimasu','migakimasu','fukimasu');          // mencuci/menyikat/mengelap
  grp('sutemasu','shimaimasu');                     // membuang/menyimpan
  grp('harimasu','kakemasu','kazarimasu','narabemasu'); // tempel/gantung/hias/tata
  grp('uemasu','sodatemasu');                      // menanam/merawat

  // ── Kata Kerja: Memakai Pakaian ──
  grp('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu'); // baju/sepatu/topi/kacamata
  grp('nugimasu','(kasa o) sashimasu','shītoberto o shimasu'); // melepas/payung/seat belt

  // ── Kata Kerja: Memasak & Makanan ──
  grp('yakimasu','mazemasu','wakashimasu','hiyashimasu'); // panggang/campur/didihkan/dinginkan
  grp('kawakashimasu','kawakimasu');                // mengeringkan/kering
  grp('tsutsumimasu','kirimasu');                  // membungkus/memotong

  // ── Kata Kerja: Kesehatan & Rumah Sakit ──
  grp('nyūin shimasu','taiin shimasu');             // masuk RS/keluar RS
  grp('(byōki ga) naorimasu','(kaze o) hikimasu'); // sembuh/terkena flu
  grp('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu'); // minum obat/mandi
  grp('kansen shimasu','(byōki o) utsushimasu');   // terjangkit/menularkan
  grp('futorimasu','yasemasu');                    // gemuk/kurus
  grp('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu'); // demam berlanjut/tekanan naik

  // ── Kata Kerja: Emosi & Perasaan ──
  grp('waraimasu','nakimasu','nemurimasu');         // tertawa/menangis/tidur
  grp('yorokobimasu','komarimasu');                // senang/kesulitan
  grp('bikkuri shimasu','anshin shimasu','gakkari shimasu'); // terkejut/lega/kecewa
  grp('shinpai shimasu','gaman shimasu','kinchō shimasu'); // khawatir/sabar/gugup
  grp('tanoshimimasu','akiramemasu');              // menikmati/menyerah
  grp('enryo shimasu','ōen shimasu');              // sungkan/mendukung

  // ── Kata Kerja: Pintu/Saklar/Mesin (Transitif & Intransitif) ──
  grp('(doa ga) akimasu','(doa ga) shimarimasu');  // pintu terbuka/tertutup
  grp('(denki ga) tsukimasu','(denki ga) kiemasu'); // lampu nyala/padam
  grp('(dengen o) iremasu','(dengen o) kirimasu'); // menyalakan/mematikan daya
  grp('(kagi o) kakemasu','(kagi ga) kakarimasu'); // mengunci/terkunci
  grp('(erebētā ga) tomarimasu','(tokei ga) ugokimasu'); // lift berhenti/jam bergerak

  // ── Kata Kerja: Kerusakan (Intransitif) ──
  grp('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu'); // rusak/pecah/patah
  grp('(kami ga) yaburemasu','(fuku ga) yogoremasu'); // sobek/kotor
  grp('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu'); // putus/lepas/jatuh
  grp('(gasorin ga) nakunarimasu','taoremasu');     // habis/roboh

  // ── Kata Kerja: Kerusakan (Penyebab/Transitif) ──
  grp('kowashimasu','yogoshimasu','warimasu','otoshimasu'); // merusak/mengotori/memecah/menjatuhkan
  grp('machigaemasu','nakushimasu');               // salah/kehilangan
  grp('modoshimasu','matomemasu');                 // mengembalikan/mengumpulkan

  // ── Kata Kerja: Cuaca & Alam ──
  grp('(ame ga) furimasu','(ame ga) yamimasu');    // hujan turun/berhenti
  grp('haremasu','kumorimasu','(kaze ga) fukimasu'); // cerah/mendung/angin bertiup
  grp('(hana ga) sakimasu','(iro ga) kawarimasu'); // bunga mekar/warna berubah
  grp('funka shimasu','teiden shimasu');            // meletus/pemadaman listrik

  // ── Kata Kerja: Naik/Turun (Angka, Harga, Jumlah) ──
  grp('(nedan ga) agarimasu','(nedan ga) sagarimasu'); // harga naik/turun
  grp('(yushutsu ga) fuemasu','(yushutsu ga) herimasu'); // ekspor naik/turun
  grp('agarimasu','sagarimasu');                   // naik/turun

  // ── Kata Kerja: Perdagangan & Bisnis ──
  grp('yushutsu shimasu','yunyū shimasu','hon\'yaku shimasu'); // ekspor/impor/terjemah
  grp('seikō shimasu','shippai shimasu');           // berhasil/gagal
  grp('umaku ikimasu','ganbarimasu');              // berjalan baik/berjuang

  // ── Kata Kerja: Sosial & Hubungan ──
  grp('kekkon shimasu','rikon shimasu','saikon shimasu'); // nikah/cerai/nikah lagi
  grp('kon\'yaku shimasu','shiriai masu');          // bertunangan/berkenalan
  grp('(tomodachi ni) aimasu','wakaremasu');        // bertemu/berpisah
  grp('kenka shimasu','ayamarimasu');              // bertengkar/meminta maaf
  grp('tetsudaimasu','sewa o shimasu');             // membantu/mengurus

  // ── Kata Kerja: Kehormatan (Sonkeigo) ──
  grp('irasshaimasu','meshiagarimasu','osshaimasu','goran ni narimasu','nasaimasu'); // hormat
  // ── Kata Kerja: Kerendahan (Kenjougo) ──
  grp('mairimasu','orimasu','mōshimasu','haiken shimasu','itashimasu','ukagaimasu','ome ni kakarimasu'); // rendah

  // ── Kata Kerja: Memberi & Menerima ──
  grp('agemasu','moraimasu','kuremasu');            // memberi/menerima/diberi
  grp('itadakimasu','kudasaimasu','yarimasu');      // menerima(hormat)/memberi(hormat)/memberi(ke bawahan)
  grp('gochisō shimasu','shinsetsu ni shimasu');    // mentraktir/baik hati
  grp('todokemasu','(nimotsu ga) todokimasu');     // mengantarkan/barang tiba
  grp('okurimasu','(hito o) okurimasu');           // mengirim/mengantarkan orang

  // ── Kata Kerja: Melakukan & Mengerjakan ──
  grp('shimasu','yarimasu','okonaimasu');           // melakukan
  grp('tsukaimasu','kopī shimasu');                // menggunakan/memfotokopi
  grp('erabimasu','kimemasu','kangaemasu');         // memilih/memutuskan/berpikir
  grp('omoimasu','shinjimasu','rikai shimasu');     // berpikir/meyakini/memahami

  // ── Kata Kerja: Waktu & Jadwal ──
  grp('ma ni aimasu','okuremasu','chikoku shimasu'); // tepat waktu/terlambat
  grp('sugoshimasu','(shichiji o) sugimasu');       // menghabiskan waktu/lewat jam
  grp('tsuzukemasu','nokorimasu');                 // melanjutkan/tersisa

  // ── Kata Kerja: Lalu lintas & Jalan ──
  grp('(migi e) magarimasu','(michi ga) komimasu','(michi ga) sukimasu'); // belok/macet/sepi
  grp('(jiko ni) aimasu','(wasuremono ni) ki ga tsukimasu'); // kecelakaan/menyadari

  // ── Kata Kerja: Hidup & Mati ──
  grp('umaremasu','nakunarimasu','shinimasu','nagaiki shimasu'); // lahir/meninggal/panjang umur
  grp('sumimasu','sunde imasu','hikkoshi shimasu'); // tinggal/pindahan
  grp('narimasu','(toshi o) torimasu');            // menjadi/menua

  // ── Kata Kerja: Bermain & Hiburan ──
  grp('asobimasu','odorimasu','utaimasu');          // bermain/menari/menyanyi
  grp('hikimasu','shashin o torimasu');             // main alat musik/foto
  grp('jogingu shimasu','pūru de oyogimasu','oyogimasu'); // joging/berenang
  grp('kaimono shimasu','shokuji shimasu');         // belanja/makan

  // ── Kata Kerja: Merokok & Kebiasaan ──
  grp('suimasu','ase o kakimasu');                 // merokok/berkeringat
  grp('(shūkan ni) naremasu','kayoimasu');          // terbiasa/bolak-balik

  // ── Kata Kerja: Mengukur & Menghitung ──
  grp('kazoemasu','hakarimasu','tashikamemasu');    // menghitung/mengukur/memastikan
  grp('chekku shimasu','memo shimasu');             // mengecek/menulis memo

  // ── Kata Kerja: Rekaman & Digital ──
  grp('rokuon shimasu','mēru ni tenpu shimasu');    // rekam suara/lampirkan email
  grp('risaikuru shimasu','seiri shimasu');         // daur ulang/memilah

  // ── Kata Kerja: Lain-lain Pasangan ──
  grp('koboshimasu','nugimasu');                    // menumpahkan/melepas
  grp('suberimasu','fumimasu');                    // tergelincir/menginjak
  grp('uchimasu','kamimasu');                      // memukul/menggigit
  grp('mamorimasu','nigemasu','sawagimasu');        // menjaga/melarikan diri/keributan
  grp('tsutaemasu','shirasemasu','todokemasu');     // menyampaikan/memberitahu/mengantar
  grp('(denwa ga) kakarimasu','(maru o) tsukemasu'); // dapat telepon/menandai
  grp('(shiai ni) demasu','(takarakuji ni) atarimasu'); // ikut pertandingan/menang lotre

  // ── Kata Kerja: Mabuk & Basah ──  
  grp('yoimasu','nuremasu');                       // mabuk/basah
  grp('(jiko ga) okimasu','(biru ga) taoremasu');  // kecelakaan terjadi/bangunan runtuh
  grp('(niku ga) yakemasu','(gomi ga) moemasu');   // dipanggang/terbakar
  grp('(hito ga) atsumarimasu','(seki o) hazushimasu'); // berkumpul/meninggalkan meja

  // ── Kata Kerja: Kemampuan & Kondisi ──
  grp('dekimasu','wakarimasu','shirimasu');         // bisa/mengerti/tahu
  grp('shitte imasu','tsukaremashita');            // tahu(sekarang)/lelah
  grp('tarimasu','irimasu');                       // cukup/memerlukan
  grp('chigaimasu','aimasu');                      // berbeda/cocok
  grp('yaku ni tachimasu','tasukarimasu');          // bermanfaat/terbantu

  // ── Kata Kerja: Dorong & Tarik ──
  grp('oshimasu','hikimasu','mawashimasu');         // dorong/tarik/putar

  // ── Kata Kerja: Cuaca Sebagai Aksi ──
  grp('oiwai shimasu','sutoresu o kaishō shimasu'); // merayakan/hilangkan stres
  grp('jitsugen shimasu','sono mama ni shimasu');   // mewujudkan/membiarkan

  // ── Kata Kerja: Memulai & Mengakhiri ──
  grp('hajimemasu','owarimasu','tsuzukemasu');      // mulai/akhiri/lanjut
  grp('(shiki ga) hajimarimasu','me ga samemasu'); // upacara dimulai/bangun tidur

  // ── Kata Kerja: Sōtai & Waktu Kerja ──
  grp('sōtai shimasu','chikoku shimasu','zangyō shimasu'); // pulang awal/terlambat/lembur

  // ── Kata Kerja: Kontekstual (dengan keterangan objek) ──
  grp('(tomodachi ni) aimasu','(hito o) okurimasu'); // bertemu teman/mengantar orang
  grp('(denwa o) kakemasu','(jūsho o) oshiemasu'); // menelepon/memberitahu alamat
  grp('(kissaten ni) hairimasu','(kissaten o) demasu'); // masuk kafe/keluar kafe
  grp('(kuruma o) tomemasu','mukaemasu');           // memarkir/menjemput
  grp('(repōto o) dashimasu','(kyōshitsu o) hirakimasu'); // serahkan laporan/buka kelas
  grp('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu','(sōsu o) tsukemasu','(kasa o) sashimasu'); // semua memakai
  grp('biza o torimasu','(biza ga) irimasu');      // ambil visa/butuh visa
  grp('(sensei ni) kikimasu','(shitsumon ni) kotaemasu'); // bertanya ke guru/menjawab
  grp('(kōhī o) iremasu','(doa ni) sawarimasu');   // buat kopi/sentuh pintu
  grp('(michi o) arukimasu','(michi o) hashirimasu','(michi ga) komimasu','(michi ga) sukimasu'); // jalan kaki/berlari/macet/sepi
  grp('(hashi o) watarimasu','(migi e) magarimasu'); // menyeberang/belok
  grp('(eki ni) tsukimasu','(toshi o) torimasu');  // tiba stasiun/menua
  grp('(yasumi o) torimasu','(takarakuji ni) atarimasu'); // ambil cuti/menang lotre
  grp('(ame ga) furimasu','(ame ga) yamimasu','(kaze ga) fukimasu'); // hujan/berhenti/angin
  grp('(byōki ga) naorimasu','(koshō ga) naorimasu','(kaze o) hikimasu'); // sembuh/perbaiki/flu
  grp('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu','(byōki o) utsushimasu'); // demam/tekanan/menular
  grp('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu'); // minum obat/mandi
  grp('(doa ga) akimasu','(doa ga) shimarimasu');  // pintu buka/tutup
  grp('(denki ga) tsukimasu','(denki ga) kiemasu'); // lampu nyala/mati
  grp('(dengen o) iremasu','(dengen o) kirimasu'); // saklar on/off
  grp('(kagi o) kakemasu','(kagi ga) kakarimasu'); // kunci/terkunci
  grp('(erebētā ga) tomarimasu','(tokei ga) ugokimasu'); // lift berhenti/jam jalan
  grp('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu'); // rusak/pecah/patah
  grp('(kami ga) yaburemasu','(fuku ga) yogoremasu'); // sobek/kotor
  grp('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu'); // putus/lepas/jatuh
  grp('(gasorin ga) nakunarimasu','taoremasu');     // habis/roboh
  grp('(wasuremono ni) ki ga tsukimasu','ki o tsukemasu'); // menyadari/hati-hati
  grp('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu'); // ujian/lulus/gagal
  grp('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu'); // masuk/lulus univ
  grp('(daigaku ni) hairimasu','(daigaku o) demasu'); // masuk/keluar univ
  grp('(kaigi ni) shusseki shimasu','(shiai ni) demasu'); // hadiri rapat/ikut pertandingan
  grp('(hana ga) sakimasu','(iro ga) kawarimasu'); // mekar/berubah warna
  grp('(nedan ga) agarimasu','(nedan ga) sagarimasu'); // harga naik/turun
  grp('(yushutsu ga) fuemasu','(yushutsu ga) herimasu'); // ekspor naik/turun
  grp('(denwa ga) kakarimasu','(maru o) tsukemasu'); // dapat telepon/menandai
  grp('(shichiji o) sugimasu','(shūkan ni) naremasu'); // lewat jam/terbiasa
  grp('(uso o) tsukimasu','(otsuri ga) demasu');   // bohong/kembalian keluar
  grp('(biru ga) taoremasu','(niku ga) yakemasu','(gomi ga) moemasu'); // runtuh/panggang/bakar
  grp('(jiko ga) okimasu','(jiko ni) aimasu');     // kecelakaan terjadi/mengalami
  grp('(hito ga) atsumarimasu','(seki o) hazushimasu'); // berkumpul/tinggalkan meja
  grp('(koe/oto/aji) ga shimasu','(nimotsu ga) todokimasu'); // terdengar/barang tiba
  grp('(jishin o) mochimasu','(sekinin o) mochimasu'); // percaya diri/tanggung jawab
  grp('(kaisha o) yasumimasu','kakarimasu');        // libur kerja/memakan waktu
  grp('(shiki ga) hajimarimasu','me ga samemasu'); // upacara mulai/bangun tidur

  // ── Kata Kerja: Tambahan yang belum masuk ──
  grp('kenkyū shimasu','shirabemasu');             // meneliti/menyelidiki
  grp('unten shimasu','(yama ni) noborimasu','(hoteru ni) tomarimasu'); // menyetir/mendaki/menginap
  grp('kayoimasu','(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu'); // pulang pergi/naik/turun/ganti
  grp('mukaemasu','(shawā o) abimasu');            // menjemput/mandi
  grp('(enpitsu o) kezurimasu','torikaemasu');      // meraut/menukar
  grp('sagemasu','chōsetsu shimasu');              // menurunkan/menyesuaikan
  grp('uremasu','wakaremasu');                     // terjual/berpisah
  grp('nagemasu','(seki o) hazushimasu');           // melempar/tinggalkan meja
  grp("kon'yaku shimasu",'shiriai masu');           // bertunangan/berkenalan
  grp("hon'yaku shimasu",'kenkyū shimasu');         // menerjemahkan/meneliti
  grp('jiritsu o tasukemasu','sodatemasu');         // dukung kemandirian/merawat
  grp('(kasa o) sashimasu','shītoberto o shimasu'); // payung/seat belt

  return G;
})();

// Canonical order for thematic groups (secondary sort within same group)
const _GROUP_ORDER = (function() {
  const O = {};
  let pos = 0;
  function seq(...roms) { roms.forEach(r => { O[r.toLowerCase()] = pos++; }); }

  // Warna: merah → biru → kuning → putih → hitam → coklat
  seq('akai','aoi','kiiroi','shiroi','kuroi','chairoi');
  // Musim: semi → panas → gugur → dingin
  seq('haru','natsu','aki','fuyu');
  // Cuaca: cerah → hujan → salju → mendung
  seq('tenki','hare','ame','yuki','kumori');
  // Hari: Senin → Minggu → akhir pekan
  seq('getsuyōbi','kayōbi','suiyōbi','mokuyōbi','kinyōbi','doyōbi','nichiyōbi','shūmatsu');
  // Keluarga: generasi tua → muda
  seq('kazoku','ryōshin','ojīsan','obāsan',
      'chichi','otōsan','haha','okāsan',
      'ani','onīsan','ane','onēsan',
      'otto','tsuma','goshujin','okusan',
      'otōto','otōto san','imōto','imōto san',
      'kodomo','okosan','gokazoku');
  // Tubuh: atas → bawah
  seq('atama','kao','me','mimi','hana','kuchi','ha','kubi',
      'karada','te','yubi','onaka','senaka','ashi','tsume');
  // Alat tulis & peralatan kecil
  seq('tsumekiri');
  // Waktu relatif: lampau → sekarang → depan
  seq('ototoi','kinō','kyō','ashita','asatte');
  seq('senshū','konshū','raishū');
  seq('sengetsu','kongetsu','raigetsu');
  seq('kyonen','kotoshi','rainen');
  // Bagian hari: pagi → malam
  seq('asa','gozen','hiru','gogo','yoru','kesa','konban');
  // Waktu makan: pagi → siang → malam
  seq('asagohan','hirugohan','bangohan');
  // Transportasi: kereta → bus → taksi → sepeda → dll
  seq('densha','chikatetsu','shinkansen','basu','takushī',
      'jitensha','baiku','jidōsha','hikōki','fune');
  // Kata kerja tematik
  seq('ikimasu','kimasu','kaerimasu');         // pergi/datang/pulang
  seq('tabemasu','nomimasu');                  // makan/minum
  seq('mimasu','kikimasu');                    // melihat/mendengar
  seq('yomimasu','kakimasu');                  // membaca/menulis
  seq('kaimasu','urimasu');                    // membeli/menjual
  seq('akemasu','shimemasu');                  // membuka/menutup
  seq('tsukemasu','keshimasu');                // nyala/mati
  seq('iremasu','dashimasu');                  // memasukkan/mengeluarkan
  seq('agemasu','moraimasu','kuremasu');        // memberi/menerima
  seq('kashimasu','karimasu');                 // meminjamkan/meminjam
  seq('hairimasu','demasu');                   // masuk/keluar
  seq('norimasu','orimasu');                   // naik/turun
  seq('imasu','arimasu');                      // ada
  seq('nemasu','okimasu');                     // tidur/bangun
  seq('kimasu','nugimasu');                    // pakai/lepas
  seq('oshiemasu','naraimasu');                // mengajar/belajar

  // ── Kata Kerja N4: Transitif/Intransitif ──
  seq('akemasu','akimasu');
  seq('shimemasu','shimarimasu');
  seq('tsukemasu','tsukimasu');
  seq('keshimasu','kiemasu');
  seq('iremasu','hairimasu');
  seq('dashimasu','demasu');
  seq('hajimemasu','hajimarimasu');
  seq('owarimasu','owaru');
  seq('tomemasu','tomarimasu');
  seq('atsumemasu','atsumarimasu');
  seq('kaemasu','kawarimasu');
  seq('kowaremasu','kowashimasu');
  seq('yogoremasu','yogoshimasu');
  seq('ochimasu','otoshimasu');
  seq('oremasu','orimasu');
  seq('waremasu','warimasu');
  seq('kiremasu','kirimasu');
  seq('nakunarimasu','nakushimasu');
  seq('nuremasu','nurashimasu');
  seq('yakemasu','yakimasu');
  seq('ugokimasu','ugokashimasu');

  // ── Kata Kerja N4: Emosi ──
  seq('bikkuri shimasu','anshin shimasu');
  seq('gakkari shimasu','yorokobimasu');
  seq('waraimasu','nakimasu');
  seq('ureshii','kanashii');

  // ── Kata Kerja N4: Komunikasi ──
  seq('hanashimasu','iimasu');
  seq('kotaemasu','kikimasu');
  seq('tsutaemasu','shirasemasu');
  seq('homemasu','shikaru');
  seq('yobimasu','kotaemasu');

  // ── Kata Kerja N4: Gerakan Badan ──
  seq('tatsu','suwaru');
  seq('arukimasu','hashirimasu');
  seq('agarimasu','sagarimasu');
  seq('magarimasu','massugu ikimasu');
  seq('wataru','tooru');

  // ── Kata Kerja N4: Kerja & Aktivitas ──
  seq('hatarakimasu','yasumimasu');
  seq('tsutomemasu','yamemasu');
  seq('hajimemasu','owarimasu');
  seq('tsuzukemasu','yamemasu');
  seq('ganbarimasu','akiramemasu');
  seq('shippai shimasu','seikō shimasu');

  // ── Kata Kerja N4: Rumah Sakit ──
  seq('nyūin shimasu','taiin shimasu');
  seq('nakunarimasu','umaremasu');

  // ── Kata Kerja N4: Belajar ──
  seq('oboeru','wasureru');
  seq('shirabemasu','mitukemasu');
  seq('kangaemasu','kimemasu');

  // ── Kata Kerja N4: Pakaian ──
  seq('kimasu','hakimasu','kaburimasu','kakemasu');

  // ── Kata Kerja N4: Membuat ──
  seq('tsukurimasu','naoshimasu');
  seq('hatsumei shimasu','hakken shimasu');
  seq('sekkei shimasu','kensetsu shimasu');

  // ── Kata Kerja N4: Perdagangan ──
  seq('yushutsu shimasu','yunyū shimasu');
  seq('okuru','ukeru');
  seq('todokemasu','uketorimasu');

  // ── Kata Kerja N4: Saklar ──
  seq('(dengen o) iremasu','(dengen o) kirimasu');
  seq('(kagi o) kakemasu','(kagi o) akemasu');

  // ── Kata Kerja N4: Rumah Tangga ──
  seq('sentaku shimasu','sōji shimasu','ryōri shimasu');
  seq('katazukemasu','chirakashimasu');
  seq('seiri shimasu','junbi shimasu');

  // ── Kata Kerja N4: Sosial ──
  seq('au','wakareru');
  seq('kenka shimasu','nakanaori shimasu');
  seq('kekkon shimasu','rikon shimasu');
  seq('sewa o shimasu','sodatemasu');

  // ── Kata Kerja N4: Keuangan ──
  seq('haraimasu','azukemasu');
  seq('oroshimasu','furikomomasu');
  seq('tamemasu','tsukaimasu');

  // ── Kata Benda N4: Bencana ──
  seq('jishin','taifū','kaji','jiko','tsunami','kaminari');

  // ── Kata Benda N4: Sekolah ──
  seq('shōgakkō','chūgakkō','kōkō','daigaku');

  // Frekuensi: selalu → tidak pernah
  seq('itsumo','yoku','tokidoki','amari','zenzen');
  // Jumlah: banyak/sedikit
  seq('takusan','sukoshi');
  // Sudah/belum
  seq('mō','mada');
  // Minuman: air → teh → kopi → jus → susu → bir → wine
  seq('mizu','ocha','kōcha','kōhī','jūsu','gyūnyū','miruku','bīru','wain');
  // Kata sifat antonim
  seq('ōkii','chiisai');
  seq('takai','hikui','yasui');
  seq('atarashii','furui');
  seq('hayai','osoi');
  seq('atsui/atsui','samui','tsumetai');
  seq('atatakai','suzushii');
  seq('muzukashii','yasashii');
  seq('tanoshii','tsumaranai');
  seq('suki (na)','kirai (na)');
  seq('jōzu (na)','heta (na)');
  seq('genki (na)','isogashii','hima (na)');
  seq('ii (yoi)','warui');
  // Posisi: atas/bawah, depan/belakang, kanan/kiri, dalam/luar
  seq('ue','shita','mae','ushiro','migi','hidari','naka','soto');
  // Negara: Jepang terlebih dahulu, lalu Asia, lalu lainnya
  seq('nihon','kankoku','chūgoku','taiwan','firipin','betonamu','myānmā',
      'indoneshia','shingapōru','igirisu','furansu','burajiru','amerika',
      'gaikoku','sekai');
  // Kata Sifat tambahan
  seq('suki (na)','kirai (na)');
  seq('jōzu (na)','heta (na)');
  seq('genki (na)','hima (na)','isogashii');
  seq('ōi','sukunai');
  seq('amai','karai','suppai','nigai');
  seq('futoi','hosoi');
  seq('tsuyoi','yowai');
  seq('ureshii','sabishii');
  seq('hansamu (na)','kawaii','suteki (na)','kirei (na)');
  seq('ii (yoi)','warui');
  seq('shizuka (na)','nigiyaka (na)');
  seq('kantan (na)','muzukashii','yasashii');
  seq('benri (na)','fuben na');

  // ── Kata Kerja Tambahan: Pergerakan & Perpindahan ──
  seq('arukimasu','hashirimasu','oyogimasu');
  seq('tachimasu','suwarimasu');
  seq('isogimasu','machimasu');
  seq('motte ikimasu','motte kimasu');
  seq('tsurete ikimasu','tsurete kimasu');
  seq('dekakemasu','modorimasu','kaette kimasu');
  seq('shuppatsu shimasu','tōchaku shimasu');
  seq('mukaimasu','(eki ni) tsukimasu');
  seq('tōrimasu','(hashi o) watarimasu');
  seq('(michi o) arukimasu','(michi o) hashirimasu');
  seq('(yama ni) noborimasu','(hoteru ni) tomarimasu');
  seq('norimasu','orimasu','norikaemasu');
  seq('(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu');

  // ── Memegang & Membawa ──
  seq('mochimasu','hakobimasu');
  seq('torimasu','watashimasu');
  seq('hiroimasu','otoshimasu');

  // ── Melihat & Mendengar ──
  seq('miemasu','kikoemasu');
  seq('misemasu','(sensei ni) kikimasu');

  // ── Berbicara & Komunikasi ──
  seq('hanashimasu','iimasu','kotaemasu');
  seq('denwa shimasu','(denwa o) kakemasu','renraku shimasu');
  seq('setsumei shimasu','shōkai shimasu','annai shimasu');
  seq('tanomimasu','sasoimasu','shōtai shimasu');
  seq('yobimasu','okoshimasu');
  seq('shikarimasu','chūi shimasu','homemasu');

  // ── Membeli & Bayar ──
  seq('kaimasu','haraimasu','kaeshimasu');

  // ── Belajar & Pendidikan ──
  seq('benkyō shimasu','naraimasu','oshiemasu');
  seq('oboemasu','wasuremasu','omoidashimasu');
  seq('shirabemasu','sagashimasu','mitsukemasu');
  seq('shitsumon shimasu','(shitsumon ni) kotaemasu');
  seq('yoshū shimasu','fukushū shimasu','fukushū o shimasu');
  seq('renshū shimasu','undō shimasu');
  seq('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu');
  seq('(daigaku ni) hairimasu','(daigaku o) demasu');
  seq('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu');
  seq('ryūgaku shimasu','shūshoku shimasu');

  // ── Kerja & Rutinitas ──
  seq('hatarakimasu','yasumimasu','(kaisha o) yasumimasu');
  seq('shutchō shimasu','zangyō shimasu');
  seq('kyūkei shimasu','sanpo shimasu');
  seq('sanka shimasu','(kaigi ni) shusseki shimasu');
  seq('mōshikomimasu','yoyaku shimasu','kyanseru shimasu');
  seq('okonaimasu','junbi shimasu','yōi shimasu');

  // ── Membuat & Memperbaiki ──
  seq('tsukurimasu','naoshimasu','kowashimasu');
  seq('tatemasu','sekkei shimasu');
  seq('hatsumei shimasu','hakken shimasu');

  // ── Membersihkan & Rumah Tangga ──
  seq('sentaku shimasu','sōji shimasu','katazukemasu');
  seq('araimasu','migakimasu','fukimasu');
  seq('sutemasu','shimaimasu');
  seq('harimasu','kakemasu','kazarimasu','narabemasu');
  seq('uemasu','sodatemasu');

  // ── Memakai Pakaian ──
  seq('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu');
  seq('nugimasu','(kasa o) sashimasu','shītoberto o shimasu');

  // ── Memasak & Makanan ──
  seq('yakimasu','mazemasu','wakashimasu','hiyashimasu');
  seq('kawakashimasu','kawakimasu');
  seq('tsutsumimasu','kirimasu');

  // ── Kesehatan & Rumah Sakit ──
  seq('nyūin shimasu','taiin shimasu');
  seq('(byōki ga) naorimasu','(kaze o) hikimasu');
  seq('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu');
  seq('kansen shimasu','(byōki o) utsushimasu');
  seq('futorimasu','yasemasu');
  seq('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu');

  // ── Emosi & Perasaan ──
  seq('waraimasu','nakimasu','nemurimasu');
  seq('yorokobimasu','komarimasu');
  seq('bikkuri shimasu','anshin shimasu','gakkari shimasu');
  seq('shinpai shimasu','gaman shimasu','kinchō shimasu');
  seq('tanoshimimasu','akiramemasu');
  seq('enryo shimasu','ōen shimasu');

  // ── Pintu/Saklar/Mesin ──
  seq('(doa ga) akimasu','(doa ga) shimarimasu');
  seq('(denki ga) tsukimasu','(denki ga) kiemasu');
  seq('(dengen o) iremasu','(dengen o) kirimasu');
  seq('(kagi o) kakemasu','(kagi ga) kakarimasu');
  seq('(erebētā ga) tomarimasu','(tokei ga) ugokimasu');

  // ── Kerusakan (Intransitif) ──
  seq('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu');
  seq('(kami ga) yaburemasu','(fuku ga) yogoremasu');
  seq('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu');
  seq('(gasorin ga) nakunarimasu','taoremasu');

  // ── Kerusakan (Transitif) ──
  seq('kowashimasu','yogoshimasu','warimasu','otoshimasu');
  seq('machigaemasu','nakushimasu');
  seq('modoshimasu','matomemasu');

  // ── Cuaca & Alam ──
  seq('(ame ga) furimasu','(ame ga) yamimasu');
  seq('haremasu','kumorimasu','(kaze ga) fukimasu');
  seq('(hana ga) sakimasu','(iro ga) kawarimasu');
  seq('funka shimasu','teiden shimasu');

  // ── Naik/Turun (Angka) ──
  seq('(nedan ga) agarimasu','(nedan ga) sagarimasu');
  seq('(yushutsu ga) fuemasu','(yushutsu ga) herimasu');

  // ── Perdagangan & Bisnis ──
  seq('yushutsu shimasu','yunyū shimasu','hon\'yaku shimasu');
  seq('seikō shimasu','shippai shimasu');
  seq('umaku ikimasu','ganbarimasu');

  // ── Sosial & Hubungan ──
  seq('kekkon shimasu','rikon shimasu','saikon shimasu');
  seq('kon\'yaku shimasu','shiriai masu');
  seq('(tomodachi ni) aimasu','wakaremasu');
  seq('kenka shimasu','ayamarimasu');
  seq('tetsudaimasu','sewa o shimasu');

  // ── Kehormatan (Sonkeigo) ──
  seq('irasshaimasu','meshiagarimasu','osshaimasu','goran ni narimasu','nasaimasu');
  // ── Kerendahan (Kenjougo) ──
  seq('mairimasu','orimasu','mōshimasu','haiken shimasu','itashimasu','ukagaimasu','ome ni kakarimasu');

  // ── Memberi & Menerima ──
  seq('itadakimasu','kudasaimasu','yarimasu');
  seq('gochisō shimasu','shinsetsu ni shimasu');
  seq('todokemasu','(nimotsu ga) todokimasu');
  seq('okurimasu','(hito o) okurimasu');

  // ── Melakukan & Mengerjakan ──
  seq('shimasu','yarimasu','okonaimasu');
  seq('tsukaimasu','kopī shimasu');
  seq('erabimasu','kimemasu','kangaemasu');
  seq('omoimasu','shinjimasu','rikai shimasu');

  // ── Waktu & Jadwal ──
  seq('ma ni aimasu','okuremasu','chikoku shimasu');
  seq('sugoshimasu','(shichiji o) sugimasu');
  seq('tsuzukemasu','nokorimasu');

  // ── Lalu lintas ──
  seq('(migi e) magarimasu','(michi ga) komimasu','(michi ga) sukimasu');
  seq('(jiko ni) aimasu','(wasuremono ni) ki ga tsukimasu');

  // ── Hidup & Mati ──
  seq('umaremasu','nakunarimasu','shinimasu','nagaiki shimasu');
  seq('sumimasu','sunde imasu','hikkoshi shimasu');
  seq('narimasu','(toshi o) torimasu');

  // ── Bermain & Hiburan ──
  seq('asobimasu','odorimasu','utaimasu');
  seq('hikimasu','shashin o torimasu');
  seq('jogingu shimasu','pūru de oyogimasu','oyogimasu');
  seq('kaimono shimasu','shokuji shimasu');

  // ── Mengukur & Menghitung ──
  seq('kazoemasu','hakarimasu','tashikamemasu');
  seq('chekku shimasu','memo shimasu');

  // ── Rekaman & Digital ──
  seq('rokuon shimasu','mēru ni tenpu shimasu');
  seq('risaikuru shimasu','seiri shimasu');

  // ── Kemampuan & Kondisi ──
  seq('dekimasu','wakarimasu','shirimasu');
  seq('shitte imasu','tsukaremashita');
  seq('tarimasu','irimasu');
  seq('chigaimasu','aimasu');
  seq('yaku ni tachimasu','tasukarimasu');

  // ── Dorong & Tarik ──
  seq('oshimasu','hikimasu','mawashimasu');

  // ── Sōtai & Waktu Kerja ──
  seq('sōtai shimasu','chikoku shimasu','zangyō shimasu');

  // ── Kontekstual (dengan keterangan objek) ──
  seq('(tomodachi ni) aimasu','(hito o) okurimasu');
  seq('(denwa o) kakemasu','(jūsho o) oshiemasu');
  seq('(kissaten ni) hairimasu','(kissaten o) demasu');
  seq('(kuruma o) tomemasu','mukaemasu');
  seq('(repōto o) dashimasu','(kyōshitsu o) hirakimasu');
  seq('(shatsu o) kimasu','(kutsu o) hakimasu','(bōshi o) kaburimasu','(megane o) kakemasu','(sōsu o) tsukemasu','(kasa o) sashimasu');
  seq('biza o torimasu','(biza ga) irimasu');
  seq('(sensei ni) kikimasu','(shitsumon ni) kotaemasu');
  seq('(kōhī o) iremasu','(doa ni) sawarimasu');
  seq('(michi o) arukimasu','(michi o) hashirimasu','(michi ga) komimasu','(michi ga) sukimasu');
  seq('(hashi o) watarimasu','(migi e) magarimasu');
  seq('(eki ni) tsukimasu','(toshi o) torimasu');
  seq('(yasumi o) torimasu','(takarakuji ni) atarimasu');
  seq('(ame ga) furimasu','(ame ga) yamimasu','(kaze ga) fukimasu');
  seq('(byōki ga) naorimasu','(koshō ga) naorimasu','(kaze o) hikimasu');
  seq('(netsu ga) tsuzukimasu','(ketsuatsu ga) agarimasu','(byōki o) utsushimasu');
  seq('(kusuri o) nomimasu','(shawā o) abimasu','(ofuro ni) hairimasu');
  seq('(doa ga) akimasu','(doa ga) shimarimasu');
  seq('(denki ga) tsukimasu','(denki ga) kiemasu');
  seq('(dengen o) iremasu','(dengen o) kirimasu');
  seq('(kagi o) kakemasu','(kagi ga) kakarimasu');
  seq('(erebētā ga) tomarimasu','(tokei ga) ugokimasu');
  seq('(isu ga) kowaremasu','(koppu ga) waremasu','(ki ga) oremasu');
  seq('(kami ga) yaburemasu','(fuku ga) yogoremasu');
  seq('(himo ga) kiremasu','(botan ga) toremasu','(nimotsu ga) ochimasu');
  seq('(gasorin ga) nakunarimasu','taoremasu');
  seq('(wasuremono ni) ki ga tsukimasu','ki o tsukemasu');
  seq('(shiken o) ukemasu','(shiken ni) gōkaku shimasu','(shiken ni) ochimasu');
  seq('(daigaku ni) nyūgaku shimasu','(daigaku o) sotsugyō shimasu');
  seq('(daigaku ni) hairimasu','(daigaku o) demasu');
  seq('(kaigi ni) shusseki shimasu','(shiai ni) demasu');
  seq('(hana ga) sakimasu','(iro ga) kawarimasu');
  seq('(nedan ga) agarimasu','(nedan ga) sagarimasu');
  seq('(yushutsu ga) fuemasu','(yushutsu ga) herimasu');
  seq('(denwa ga) kakarimasu','(maru o) tsukemasu');
  seq('(shichiji o) sugimasu','(shūkan ni) naremasu');
  seq('(uso o) tsukimasu','(otsuri ga) demasu');
  seq('(biru ga) taoremasu','(niku ga) yakemasu','(gomi ga) moemasu');
  seq('(jiko ga) okimasu','(jiko ni) aimasu');
  seq('(hito ga) atsumarimasu','(seki o) hazushimasu');
  seq('(koe/oto/aji) ga shimasu','(nimotsu ga) todokimasu');
  seq('(jishin o) mochimasu','(sekinin o) mochimasu');
  seq('(kaisha o) yasumimasu','kakarimasu');
  seq('(shiki ga) hajimarimasu','me ga samemasu');

  // ── Tambahan ──
  seq('kenkyū shimasu','shirabemasu');
  seq('unten shimasu','(yama ni) noborimasu','(hoteru ni) tomarimasu');
  seq('kayoimasu','(densha ni) norimasu','(densha o) orimasu','(densha ni) norikaemasu');
  seq('mukaemasu','(shawā o) abimasu');
  seq('(enpitsu o) kezurimasu','torikaemasu');
  seq('sagemasu','chōsetsu shimasu');
  seq('uremasu','wakaremasu');
  seq('nagemasu','(seki o) hazushimasu');
  seq("kon'yaku shimasu",'shiriai masu');
  seq("hon'yaku shimasu",'kenkyū shimasu');
  seq('jiritsu o tasukemasu','sodatemasu');
  seq('(kasa o) sashimasu','shītoberto o shimasu');

  return O;
})();

function sortByRom(words) {
  const arr = [...words];

  // Assign group id per word
  arr.forEach(w => {
    const rom = w.rom.toLowerCase().trim();
    w._gid = _THEMATIC_GROUPS[rom] !== undefined ? _THEMATIC_GROUPS[rom] : -1;
    w._gorder = _GROUP_ORDER[rom] !== undefined ? _GROUP_ORDER[rom] : 99999;
  });

  // Build group-anchor map: for each group, find the first romaji alphabetically
  // so the whole group can be placed at the right alphabetical slot.
  const groupAnchor = {};
  arr.forEach(w => {
    if (w._gid < 0) return;
    const rom = w.rom.toLowerCase();
    if (groupAnchor[w._gid] === undefined || rom < groupAnchor[w._gid]) {
      groupAnchor[w._gid] = rom;
    }
  });

  arr.sort((a, b) => {
    const ag = a._gid, bg = b._gid;
    if (ag === bg && ag >= 0) {
      // Same thematic group: use canonical order, then romaji
      if (a._gorder !== b._gorder) return a._gorder - b._gorder;
      return a.rom.localeCompare(b.rom);
    }
    // Different groups: sort by anchor romaji of the group (or own romaji if ungrouped)
    const aKey = ag >= 0 ? groupAnchor[ag] : a.rom.toLowerCase();
    const bKey = bg >= 0 ? groupAnchor[bg] : b.rom.toLowerCase();
    if (aKey !== bKey) return aKey.localeCompare(bKey);
    // Same anchor (different groups, shouldn't happen often): group before ungrouped
    if (ag >= 0 && bg < 0) return -1;
    if (ag < 0 && bg >= 0) return 1;
    return a.rom.localeCompare(b.rom);
  });

  return arr;
}

function toggleKamusCore() {
  kamusCoreOnly = !kamusCoreOnly;
  const el = document.getElementById('kamusCoreToggle');
  if (el) el.classList.toggle('on', kamusCoreOnly);
  renderKamusBody();
}

function initKamus() {
  // Cache subCat sekali (single source of truth, alih-alih dispatch tiap render)
  precomputeSubCats();
  kamusOpenSections = {}; // reset
  const allWords = BABS.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})));
  const catCounts = {};
  KAMUS_CATS.forEach(c => catCounts[c.key] = 0);
  allWords.forEach(k => { if (catCounts[k.cat] !== undefined) catCounts[k.cat]++; });

  document.getElementById('kamusCatTabs').innerHTML = KAMUS_CATS.map(c => `
    <button class="kamus-cat-tab${kamusActiveCat===c.key?' active':''}"
      onclick="setKamusCat('${c.key}')">
      ${c.icon} ${c.label} <span style="opacity:0.6">(${catCounts[c.key]})</span>
    </button>`).join('');

  const coreEl = document.getElementById('kamusCoreToggle');
  if (coreEl) coreEl.classList.toggle('on', kamusCoreOnly);

  renderKamusBody();
}

// Precompute subCat sekali. Mapping cat → resolver. Hasilnya disimpan di
// k._sub (per object) supaya pencarian per render hanya butuh O(1) lookup.
let _subCatsComputed = false;
const SUBCAT_RESOLVERS = {
  'Kata Benda':      kbSubCat,
  'Ekspresi':        ekspresiSubCat,
  'Kata Keterangan': keteranganSubCat,
  'Kata Tanya':      kataTanyaSubCat,
  'Angka':           angkaSubCat,
  'Kata Tunjuk':     kataTunjukSubCat,
  'Posisi':          posisiSubCat,
  'Konjungsi':       konjungsiSubCat,
};
function precomputeSubCats() {
  if (_subCatsComputed) return;
  BABS.forEach(b => {
    b.kotoba.forEach(k => {
      const fn = SUBCAT_RESOLVERS[k.cat];
      if (fn) {
        try { k._sub = fn(k); } catch(_) { k._sub = null; }
      }
    });
  });
  _subCatsComputed = true;
}

function setKamusCat(cat) {
  kamusActiveCat = cat;
  kamusOpenSections = {};
  document.getElementById('kamusSearch').value = '';
  document.querySelectorAll('.kamus-cat-tab').forEach((btn, i) => {
    btn.classList.toggle('active', KAMUS_CATS[i]?.key === cat);
  });
  renderKamusBody();
}

function toggleKamusSection(key) {
  kamusOpenSections[key] = !kamusOpenSections[key];
  const el = document.getElementById('ksec_' + key);
  if (el) el.classList.toggle('open', kamusOpenSections[key]);
}

function renderKamusBody() {
  const q       = (document.getElementById('kamusSearch')?.value || '').toLowerCase().trim();
  const bodyEl  = document.getElementById('kamusBody');
  const statEl  = document.getElementById('kamusStatBar');
  const subEl   = document.getElementById('kamusSubtitle');

  // ── MODE PENCARIAN LINTAS KATEGORI ──
  if (q) {
    let allPool = BABS.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})));
    if (kamusCoreOnly) allPool = allPool.filter(k => k.lv === 'core');
    allPool = dedupeWords(allPool);

    const matches = allPool.filter(k => {
      const jp = k.jp.replace(/<[^>]+>/g,'').toLowerCase();
      return jp.includes(q) || k.id.toLowerCase().includes(q)
        || k.rom.toLowerCase().includes(q) || (k.furigana||'').toLowerCase().includes(q);
    });

    if (subEl) subEl.textContent = `🔍 Hasil pencarian "${q}" — ${matches.length} kata ditemukan`;
    statEl.innerHTML = `
      <span class="kamus-stat-chip">📊 ${matches.length} kata</span>
      <span class="kamus-stat-chip" style="color:var(--amber);border-color:var(--amber)">🔍 "${escapeHtml(q)}"</span>
      ${kamusCoreOnly ? `<span class="kamus-stat-chip" style="color:var(--green);border-color:var(--green)">✅ Hanya inti</span>` : ''}`;

    if (!matches.length) {
      bodyEl.innerHTML = `<div class="kamus-empty">😕 Tidak ada kata ditemukan untuk "<b>${escapeHtml(q)}</b>".<br><span style="font-size:0.8rem">Coba kata lain atau cek ejaan.</span></div>`;
      return;
    }

    // Kelompokkan hasil per kategori
    const byCat = {};
    matches.forEach(k => {
      if (!byCat[k.cat]) byCat[k.cat] = [];
      byCat[k.cat].push(k);
    });

    // Tampilkan per kategori sesuai urutan KAMUS_CATS, plus kategori lain yang ada
    const catOrder = KAMUS_CATS.map(c => c.key);
    const sortedCats = Object.keys(byCat).sort((a, b) => {
      const ai = catOrder.indexOf(a), bi = catOrder.indexOf(b);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });

    let html = '';
    sortedCats.forEach(cat => {
      const catObj = KAMUS_CATS.find(c => c.key === cat);
      const words  = byCat[cat];
      const secKey = 'search_' + cat;
      const isOpen = kamusOpenSections[secKey] !== false; // default open saat search
      kamusOpenSections[secKey] = isOpen;
      html += `
        <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${secKey}">
          <div class="kamus-sub-header" onclick="toggleKamusSection('${secKey}')">
            <span class="kamus-sub-icon">${catObj?.icon||'📝'}</span>
            <span class="kamus-sub-title" style="color:var(--accent2)">${cat}</span>
            <span class="kamus-sub-count">${words.length}</span>
            <span class="kamus-sub-chevron">▶</span>
          </div>
          <div class="kamus-sub-body">
            <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
          </div>
        </div>`;
    });
    bodyEl.innerHTML = html;
    return;
  }

  // ── MODE NORMAL (per kategori aktif) ──
  let pool = BABS.flatMap(b => b.kotoba.map(k => ({...k, babNum: b.num})))
               .filter(k => k.cat === kamusActiveCat);
  if (kamusCoreOnly) pool = pool.filter(k => k.lv === 'core');
  pool = dedupeWords(pool);

  const catObj = KAMUS_CATS.find(c => c.key === kamusActiveCat);
  if (subEl) subEl.textContent = `${catObj?.icon||''} ${kamusActiveCat} — ${pool.length} kata${kamusCoreOnly?' (hanya inti)':''}`;

  statEl.innerHTML = `
    <span class="kamus-stat-chip">📊 ${pool.length} kata</span>
    <span class="kamus-stat-chip">📖 Bab 1–${BABS[BABS.length-1].num}</span>
    ${kamusCoreOnly ? `<span class="kamus-stat-chip" style="color:var(--green);border-color:var(--green)">✅ Hanya inti</span>` : ''}`;

  if (!pool.length) {
    bodyEl.innerHTML = `<div class="kamus-empty">😕 Tidak ada kata ditemukan.</div>`;
    return;
  }

  const subDefs = KAMUS_SUBCAT[kamusActiveCat];
  let html = '';

  if (!subDefs) {
    html = buildFlatSection('flat', pool, q);
  } else if (kamusActiveCat === 'Kata Kerja') {
    subDefs.forEach(sub => {
      const words = sortByRom(sub.key !== null ? pool.filter(k => k.grp === sub.key) : pool.filter(k => !k.grp));
      if (!words.length) return;
      html += buildKKSection(sub, words, q);
    });
  } else if (kamusActiveCat === 'Kata Sifat') {
    subDefs.forEach(sub => {
      const words = sortByRom(sub.key !== null ? pool.filter(k => k.grp === sub.key) : pool.filter(k => !k.grp));
      if (!words.length) return;
      html += buildKSSection(sub, words, q);
    });
  } else if (kamusActiveCat === 'Kata Benda') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || kbSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Ekspresi') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || ekspresiSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Kata Keterangan') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || keteranganSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Kata Tanya') {
    subDefs.forEach(sub => {
      const words = sortByRom(pool.filter(k => (k._sub || kataTanyaSubCat(k)) === sub.key));
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Angka') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || angkaSubCat(k)) === sub.key); // preserve original order for angka
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Kata Tunjuk') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || kataTunjukSubCat(k)) === sub.key);
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Posisi') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || posisiSubCat(k)) === sub.key);
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Konjungsi') {
    subDefs.forEach(sub => {
      const words = pool.filter(k => (k._sub || konjungsiSubCat(k)) === sub.key);
      if (!words.length) return;
      html += buildGenSection(sub.key, sub.label, sub.icon, sub.color, words, q);
    });
  } else if (kamusActiveCat === 'Partikel') {
    html = buildFlatSection('flat_partikel', pool, q);
  } else {
    html = buildFlatSection('flat_' + kamusActiveCat, pool, q);
  }

  bodyEl.innerHTML = html || `<div class="kamus-empty">Tidak ada kata di kategori ini.</div>`;
}

function buildKKSection(sub, words, q) {
  const isOpen = !!kamusOpenSections[sub.key ?? 'null'];
  const hintHtml = sub.hint ? `<div class="kamus-conj-hint">${sub.hint.map(h =>
    `<span class="kamus-conj-chip">${h.ex}</span>`).join('')}</div>` : '';
  const descHtml = sub.desc ? `<div style="font-size:0.74rem;color:var(--text2);margin-bottom:10px;line-height:1.6">${sub.desc}</div>` : '';
  const badgeHtml = sub.badgeCls ? `<span class="kotoba-grp ${sub.badgeCls}" style="font-size:0.7rem">${sub.key||'?'}</span>` : '';
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${sub.key??'null'}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${sub.key??'null'}')">
      <span class="kamus-sub-icon" style="color:${sub.color}">${sub.icon}</span>
      ${badgeHtml}
      <span class="kamus-sub-title" style="color:${sub.color}">${sub.label}</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      ${hintHtml}${descHtml}
      <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
    </div>
  </div>`;
}

function buildKSSection(sub, words, q) {
  const isOpen = !!kamusOpenSections[sub.key ?? 'ks_null'];
  const hintHtml = sub.hint ? `<div class="kamus-conj-hint">${sub.hint.map(h =>
    `<span class="kamus-conj-chip">${h.ex}</span>`).join('')}</div>` : '';
  const descHtml = sub.desc ? `<div style="font-size:0.74rem;color:var(--text2);margin-bottom:10px;line-height:1.6">${sub.desc}</div>` : '';
  const badgeHtml = sub.badgeCls ? `<span class="kotoba-grp ${sub.badgeCls}" style="font-size:0.7rem">${sub.key||'?'}</span>` : '';
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${sub.key??'ks_null'}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${sub.key??'ks_null'}')">
      <span class="kamus-sub-icon" style="color:${sub.color}">${sub.icon}</span>
      ${badgeHtml}
      <span class="kamus-sub-title" style="color:${sub.color}">${sub.label}</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      ${hintHtml}${descHtml}
      <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
    </div>
  </div>`;
}

function buildGenSection(secKey, label, icon, color, words, q) {
  const isOpen = !!kamusOpenSections[secKey];
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${secKey}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${secKey}')">
      <span class="kamus-sub-icon">${icon}</span>
      <span class="kamus-sub-title" style="color:${color}">${label}</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      <div class="kotoba-list">${groupedKamusRows(words, q)}</div>
    </div>
  </div>`;
}

function buildFlatSection(secKey, words, q) {
  const isOpen = !!kamusOpenSections[secKey];
  const sorted = sortByRom(words);
  return `
  <div class="kamus-sub-section${isOpen?' open':''}" id="ksec_${secKey}">
    <div class="kamus-sub-header" onclick="toggleKamusSection('${secKey}')">
      <span class="kamus-sub-title" style="color:var(--accent2)">Semua Kata</span>
      <span class="kamus-sub-count">${words.length}</span>
      <span class="kamus-sub-chevron">▶</span>
    </div>
    <div class="kamus-sub-body">
      <div class="kotoba-list">${groupedKamusRows(sorted, q)}</div>
    </div>
  </div>`;
}

function highlight(text, q) {
  // Escape teks dulu, baru inject <mark>. Mencegah XSS dari query
  // yang masuk ke innerHTML, dan dari teks yang berisi karakter HTML.
  const safeText = escapeHtml(text);
  if (!q) return safeText;
  const safeQ = escapeHtml(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safeText.replace(new RegExp(`(${safeQ})`, 'gi'),
    '<mark style="background:rgba(124,106,247,0.35);color:inherit;border-radius:2px">$1</mark>');
}

// Render rows with subtle thematic dividers between groups
function groupedKamusRows(words, q) {
  let html = '';
  let prevGid = undefined;
  words.forEach(w => {
    const gid = w._gid !== undefined ? w._gid : -1;
    if (prevGid !== undefined && gid !== prevGid && gid >= 0 && prevGid >= 0) {
      // Different group: add thin divider
      html += '<div class="kamus-group-sep"></div>';
    }
    html += kamusRow(w, q);
    prevGid = gid;
  });
  return html;
}

function kamusRow(k, q) {
  const grpBadge = k.grp ? `<span class="kotoba-grp grp-${escapeHtml(k.grp)}" style="font-size:0.66rem;flex-shrink:0">${escapeHtml(k.grp)}</span>` : '';
  const idText   = highlight(k.id, q);
  return `<div class="kamus-row">
    <div style="flex-shrink:0">
      <div class="kamus-row-jp">${k.jp}</div>
      <div class="kamus-row-rom">${highlight(k.rom, q)}</div>
    </div>
    <div class="kamus-row-id">${idText}</div>
    ${grpBadge}
    <span class="kamus-row-bab">Bab ${escapeHtml(k.babNum)}</span>
  </div>`;
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

// ========== EXPORT / IMPORT PROGRESS ==========
// ========== PWA: SERVICE WORKER ==========
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // file:// protokol tidak didukung — skip dgn aman
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('SW register gagal:', err);
      });
    }
  });
}


// ========== RANGKUMAN TAB 7: Angka & Bilangan ==========
function renderRsumTab7(lvLabel, lvColor) {
  const counterSection = buildCounterSection();
  const numberSection = buildNumberSection();
  const jamSection = buildJamSection();
  const menitSection = buildMenitSection();
  const tanggalSection = buildTanggalSection();
  const bulanSection = buildBulanSection();
  const tahunSection = buildTahunSection();
  const hargaSection = buildHargaSection();
  const umurSection = buildUmurSection();
  const durasiJamSection = buildDurasiJamSection();
  const durasiMingguSection = buildDurasiMingguSection();
  const durasiHariSection = buildDurasiHariSection();
  const youbiSection = buildYoubiSection();

  document.getElementById('rsum-tab-7').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">🔢 <ruby>数<rt>かず</rt></ruby>・<ruby>助数詞<rt>じょすうし</rt></ruby> — Angka & Bilangan</div>
    <div style="font-size:0.78rem;color:var(--text2);margin-bottom:18px;padding:8px 12px;background:var(--surface2);border-radius:8px;line-height:1.6">
      Kumpulan lengkap cara membaca angka, waktu, tanggal, harga, umur, dan kata bantu bilangan (<ruby>助数詞<rt>じょすうし</rt></ruby>) dalam <ruby>日本語<rt>にほんご</rt></ruby>.
    </div>

    <!-- GROUP: Bilangan Dasar -->
    <div style="margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(251,191,36,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:var(--amber);letter-spacing:0.08em;text-transform:uppercase">
      📊 Bilangan Dasar
    </div>
    ${numberSection}

    <!-- GROUP: Waktu -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(96,165,250,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#60a5fa;letter-spacing:0.08em;text-transform:uppercase">
      🕐 Waktu & Durasi
    </div>
    ${jamSection}
    ${menitSection}
    ${durasiJamSection}

    <!-- GROUP: Kalender -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(251,146,60,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#fb923c;letter-spacing:0.08em;text-transform:uppercase">
      📅 Kalender & Tanggal
    </div>
    ${youbiSection}
    ${tanggalSection}
    ${durasiHariSection}
    ${durasiMingguSection}
    ${bulanSection}
    ${tahunSection}

    <!-- GROUP: Kuantitas -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(34,197,94,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#22c55e;letter-spacing:0.08em;text-transform:uppercase">
      💰 Kuantitas & Satuan
    </div>
    ${umurSection}
    ${hargaSection}
    ${counterSection}
  </div>`;
}

// ========== RANGKUMAN TAB 8: Lainnya ==========
function renderRsumTab8(lvLabel, lvColor) {
  const agemoSection = buildAgemoSection();
  const waktuSection = buildWaktuSection();
  const konjungsiSection = buildKonjungsiSection();

  document.getElementById('rsum-tab-8').innerHTML = `<div style="padding:16px 14px 20px">
    <div class="rsum-section-title">📚 Lainnya — Rangkuman Tambahan</div>
    <div style="font-size:0.78rem;color:var(--text2);margin-bottom:18px;padding:8px 12px;background:var(--surface2);border-radius:8px;line-height:1.6">
      Kumpulan materi penting lainnya: <b>Verba Memberi/Menerima</b>, <b>Ekspresi Waktu</b>, dan <b><ruby>接続詞<rt>せつぞくし</rt></ruby></b>.
    </div>

    <!-- GROUP: Tata Bahasa -->
    <div style="margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(192,132,252,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#c084fc;letter-spacing:0.08em;text-transform:uppercase">
      🎁 Verba & Ekspresi
    </div>
    ${agemoSection}
    ${waktuSection}

    <!-- GROUP: Konjungsi -->
    <div style="margin-top:20px;margin-bottom:8px;padding:6px 12px;background:linear-gradient(90deg,rgba(96,165,250,0.12),transparent);border-radius:8px;font-size:0.72rem;font-weight:700;color:#60a5fa;letter-spacing:0.08em;text-transform:uppercase">
      🔗 Kata Penghubung
    </div>
    ${konjungsiSection}
  </div>`;
}


// ── Angka / Bilangan Dasar ──
function buildNumberSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>数字<rt>すうじ</rt></ruby> — Angka / Bilangan</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(251,191,36,0.15);color:var(--amber);font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.75rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          Bilangan dasar. Angka 4, 7, 9 punya dua cara baca.
        </div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">0</td><td class="rsum-form">ゼロ / れい</td><td style="font-weight:700;color:var(--accent2)">10</td><td class="rsum-form">じゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">1</td><td class="rsum-form">いち</td><td style="font-weight:700;color:var(--accent2)">20</td><td class="rsum-form">にじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2</td><td class="rsum-form">に</td><td style="font-weight:700;color:var(--accent2)">30</td><td class="rsum-form">さんじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3</td><td class="rsum-form">さん</td><td style="font-weight:700;color:var(--accent2)">40</td><td class="rsum-form">よんじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4</td><td class="rsum-form"><b>よん</b> / し</td><td style="font-weight:700;color:var(--accent2)">50</td><td class="rsum-form">ごじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5</td><td class="rsum-form">ご</td><td style="font-weight:700;color:var(--accent2)">60</td><td class="rsum-form">ろくじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6</td><td class="rsum-form">ろく</td><td style="font-weight:700;color:var(--accent2)">70</td><td class="rsum-form">ななじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">7</td><td class="rsum-form"><b>なな</b> / しち</td><td style="font-weight:700;color:var(--accent2)">80</td><td class="rsum-form">はちじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">8</td><td class="rsum-form">はち</td><td style="font-weight:700;color:var(--accent2)">90</td><td class="rsum-form">きゅうじゅう</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">9</td><td class="rsum-form"><b>きゅう</b> / く</td><td style="font-weight:700;color:var(--accent2)">100</td><td class="rsum-form">ひゃく</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📊 <ruby>大<rt>おお</rt></ruby>きい <ruby>数<rt>かず</rt></ruby> (Bilangan Besar)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>数字<rt>すうじ</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">100</td><td class="rsum-form">ひゃく</td><td style="font-weight:700;color:var(--accent2)">600</td><td class="rsum-form"><b>ろっぴゃく</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">200</td><td class="rsum-form">にひゃく</td><td style="font-weight:700;color:var(--accent2)">700</td><td class="rsum-form">ななひゃく</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">300</td><td class="rsum-form"><b>さんびゃく</b></td><td style="font-weight:700;color:var(--accent2)">800</td><td class="rsum-form"><b>はっぴゃく</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">400</td><td class="rsum-form">よんひゃく</td><td style="font-weight:700;color:var(--accent2)">900</td><td class="rsum-form">きゅうひゃく</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">500</td><td class="rsum-form">ごひゃく</td><td style="font-weight:700;color:var(--accent2)">1000</td><td class="rsum-form">せん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3000</td><td class="rsum-form"><b>さんぜん</b></td><td style="font-weight:700;color:var(--accent2)">8000</td><td class="rsum-form"><b>はっせん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">10,000</td><td class="rsum-form">いちまん</td><td style="font-weight:700;color:var(--accent2)">100,000</td><td class="rsum-form">じゅうまん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--amber)">⚠️ 音変化:</b> 百: 300=<b>さんびゃく</b>, 600=<b>ろっぴゃく</b>, 800=<b>はっぴゃく</b> | 千: 3000=<b>さんぜん</b>, 8000=<b>はっせん</b>
        </div>
      </div>
    </div>`;
}


// ── Jam (時) ──
function buildJamSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🕐 〜<ruby>時<rt>じ</rt></ruby> — Jam</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(96,165,250,0.15);color:#60a5fa;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Jam</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Jam</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">いちじ</td><td style="font-weight:700;color:var(--accent2)">7<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form"><b>しちじ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">にじ</td><td style="font-weight:700;color:var(--accent2)">8<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">はちじ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">さんじ</td><td style="font-weight:700;color:var(--accent2)">9<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form"><b>くじ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form"><b>よじ</b></td><td style="font-weight:700;color:var(--accent2)">10<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">じゅうじ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">ごじ</td><td style="font-weight:700;color:var(--accent2)">11<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">じゅういちじ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">ろくじ</td><td style="font-weight:700;color:var(--accent2)">12<ruby>時<rt>じ</rt></ruby></td><td class="rsum-form">じゅうにじ</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#60a5fa">⚠️</b> 4時=<b>よじ</b> | 7時=<b>しちじ</b> | 9時=<b>くじ</b> | <ruby>午前<rt>ごぜん</rt></ruby>=AM, <ruby>午後<rt>ごご</rt></ruby>=PM | なんじ=jam berapa?
        </div>
      </div>
    </div>`;
}


// ── Menit (分) ──
function buildMenitSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(52,211,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(52,211,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--green)">⏱️ 〜<ruby>分<rt>ふん</rt></ruby> — Menit</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(52,211,153,0.15);color:var(--green);font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>分<rt>ふん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>いっぷん</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>ろっぷん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">にふん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">ななふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>さんぷん</b></td><td style="font-weight:700;color:var(--accent2)">8<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>はっぷん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">よんぷん</td><td style="font-weight:700;color:var(--accent2)">9<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">きゅうふん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>分<rt>ふん</rt></ruby></td><td class="rsum-form">ごふん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>分<rt>ぷん</rt></ruby></td><td class="rsum-form"><b>じゅっぷん</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(52,211,153,0.08);border-left:3px solid var(--green);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--green)">💡</b> <b>ぷん</b>: 1,3,4,6,8,10 | <b>ふん</b>: 2,5,7,9 | 30分=<b>はん</b> | なんぷん=berapa menit?
        </div>
      </div>
    </div>`;
}


// ── Durasi Jam (〜時間) ──
function buildDurasiJamSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(139,92,246,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(139,92,246,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#8b5cf6">⏳ 〜<ruby>時間<rt>じかん</rt></ruby> — Durasi Jam</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(139,92,246,0.15);color:#8b5cf6;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">〜<ruby>時<rt>じ</rt></ruby> = jam berapa (waktu) vs 〜<ruby>時間<rt>じかん</rt></ruby> = berapa jam (durasi)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">いちじかん</td><td style="font-weight:700;color:var(--accent2)">6<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">ろくじかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">にじかん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form"><b>ななじかん</b> / しちじかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">さんじかん</td><td style="font-weight:700;color:var(--accent2)">8<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">はちじかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form"><b>よじかん</b></td><td style="font-weight:700;color:var(--accent2)">9<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form"><b>くじかん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">ごじかん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>時間<rt>じかん</rt></ruby></td><td class="rsum-form">じゅうじかん</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(139,92,246,0.08);border-left:3px solid #8b5cf6;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#8b5cf6">⚠️</b> 4時間=<b>よじかん</b> | 9時間=<b>くじかん</b> | 〜時間半=+30分 | <ruby>何時間<rt>なんじかん</rt></ruby>=berapa jam?
        </div>
      </div>
    </div>`;
}


// ── Hari dalam Seminggu (曜日) ──
function buildYoubiSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(168,85,247,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(168,85,247,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#a855f7">📅 <ruby>曜日<rt>ようび</rt></ruby> — Hari dalam Seminggu</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>曜日<rt>ようび</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th>Arti</th><th><ruby>漢字<rt>かんじ</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>月曜日<rt>げつようび</rt></ruby></td><td class="rsum-form">げつようび</td><td style="font-size:0.72rem">Senin</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>月<rt>つき</rt></ruby>=Moon</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>火曜日<rt>かようび</rt></ruby></td><td class="rsum-form">かようび</td><td style="font-size:0.72rem">Selasa</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>火<rt>ひ</rt></ruby>=Fire</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>水曜日<rt>すいようび</rt></ruby></td><td class="rsum-form">すいようび</td><td style="font-size:0.72rem">Rabu</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>水<rt>みず</rt></ruby>=Water</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>木曜日<rt>もくようび</rt></ruby></td><td class="rsum-form">もくようび</td><td style="font-size:0.72rem">Kamis</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>木<rt>き</rt></ruby>=Wood</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>金曜日<rt>きんようび</rt></ruby></td><td class="rsum-form">きんようび</td><td style="font-size:0.72rem">Jumat</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>金<rt>かね</rt></ruby>=Gold</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>土曜日<rt>どようび</rt></ruby></td><td class="rsum-form">どようび</td><td style="font-size:0.72rem">Sabtu</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>土<rt>つち</rt></ruby>=Earth</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)"><ruby>日曜日<rt>にちようび</rt></ruby></td><td class="rsum-form">にちようび</td><td style="font-size:0.72rem">Minggu</td><td style="font-size:0.7rem;color:var(--text2)"><ruby>日<rt>ひ</rt></ruby>=Sun</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(168,85,247,0.08);border-left:3px solid #a855f7;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#a855f7">💡</b> <ruby>何曜日<rt>なんようび</rt></ruby>=hari apa? | <ruby>週末<rt>しゅうまつ</rt></ruby>=weekend | <ruby>平日<rt>へいじつ</rt></ruby>=weekday
        </div>
      </div>
    </div>`;
}


// ── Tanggal (日) ──
function buildTanggalSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,146,60,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,146,60,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#fb923c">📆 〜<ruby>日<rt>にち</rt></ruby> — Tanggal</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(251,146,60,0.15);color:#fb923c;font-weight:700">⚠️ 不規則</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">Tanggal 1-10 = cara baca <ruby>和語<rt>わご</rt></ruby> (tidak beraturan). 11+ = <ruby>漢語<rt>かんご</rt></ruby>.</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:520px">
          <thead><tr><th><ruby>日<rt>にち</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>日<rt>にち</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>日<rt>にち</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ついたち</b></td><td style="font-weight:700;color:var(--accent2)">11<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅういちにち</td><td style="font-weight:700;color:var(--accent2)">21<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅういちにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ふつか</b></td><td style="font-weight:700;color:var(--accent2)">12<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうににち</td><td style="font-weight:700;color:var(--accent2)">22<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうににち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>みっか</b></td><td style="font-weight:700;color:var(--accent2)">13<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうさんにち</td><td style="font-weight:700;color:var(--accent2)">23<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうさんにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>よっか</b></td><td style="font-weight:700;color:var(--accent2)">14<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>じゅうよっか</b></td><td style="font-weight:700;color:var(--accent2)">24<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>にじゅうよっか</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>いつか</b></td><td style="font-weight:700;color:var(--accent2)">15<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうごにち</td><td style="font-weight:700;color:var(--accent2)">25<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうごにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>むいか</b></td><td style="font-weight:700;color:var(--accent2)">16<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうろくにち</td><td style="font-weight:700;color:var(--accent2)">26<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうろくにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">7<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>なのか</b></td><td style="font-weight:700;color:var(--accent2)">17<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうしちにち</td><td style="font-weight:700;color:var(--accent2)">27<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうしちにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">8<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ようか</b></td><td style="font-weight:700;color:var(--accent2)">18<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうはちにち</td><td style="font-weight:700;color:var(--accent2)">28<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうはちにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">9<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>ここのか</b></td><td style="font-weight:700;color:var(--accent2)">19<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">じゅうくにち</td><td style="font-weight:700;color:var(--accent2)">29<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">にじゅうくにち</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">10<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>とおか</b></td><td style="font-weight:700;color:var(--accent2)">20<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>はつか</b></td><td style="font-weight:700;color:var(--accent2)">30<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form">さんじゅうにち</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,146,60,0.08);border-left:3px solid #fb923c;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#fb923c">⚠️</b> 14日=<b>じゅうよっか</b> | 20日=<b>はつか</b> | 24日=<b>にじゅうよっか</b> | <ruby>何日<rt>なんにち</rt></ruby>=tanggal berapa?
        </div>
      </div>
    </div>`;
}


// ── Durasi Hari (〜日間) ──
function buildDurasiHariSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,146,60,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,146,60,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#f97316">📆 〜<ruby>日間<rt>にちかん</rt></ruby> — Durasi Hari</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">〜<ruby>日<rt>にち</rt></ruby> = tanggal vs 〜<ruby>日間<rt>にちかん</rt></ruby> = durasi (berapa hari)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>日<rt>にち</rt></ruby></td><td class="rsum-form"><b>いちにち</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">むいかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>ふつかかん</b></td><td style="font-weight:700;color:var(--accent2)">7<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">なのかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>みっかかん</b></td><td style="font-weight:700;color:var(--accent2)">8<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">ようかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>よっかかん</b></td><td style="font-weight:700;color:var(--accent2)">9<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">ここのかかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form"><b>いつかかん</b></td><td style="font-weight:700;color:var(--accent2)">10<ruby>日間<rt>にちかん</rt></ruby></td><td class="rsum-form">とおかかん</td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,146,60,0.08);border-left:3px solid #f97316;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#f97316">⚠️</b> 1日=<b>いちにち</b> (bukan ついたち!) | 2-10日間=baca tanggal+かん | 11+: じゅういちにちかん dst.
        </div>
      </div>
    </div>`;
}


// ── Durasi Minggu (〜週間) ──
function buildDurasiMingguSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(236,72,153,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(236,72,153,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#ec4899">📅 〜<ruby>週間<rt>しゅうかん</rt></ruby> — Durasi Minggu</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(236,72,153,0.15);color:#ec4899;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form"><b>いっしゅうかん</b></td><td style="font-weight:700;color:var(--accent2)">6<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">ろくしゅうかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">にしゅうかん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">ななしゅうかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">さんしゅうかん</td><td style="font-weight:700;color:var(--accent2)">8<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form"><b>はっしゅうかん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">よんしゅうかん</td><td style="font-weight:700;color:var(--accent2)">9<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">きゅうしゅうかん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form">ごしゅうかん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>週間<rt>しゅうかん</rt></ruby></td><td class="rsum-form"><b>じゅっしゅうかん</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(236,72,153,0.08);border-left:3px solid #ec4899;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#ec4899">⚠️</b> 1週間=<b>いっしゅうかん</b>(っ!) | 8週間=<b>はっしゅうかん</b> | 10週間=<b>じゅっしゅうかん</b>
        </div>
      </div>
    </div>`;
}


// ── Bulan (月) ──
function buildBulanSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">🗓️ 〜<ruby>月<rt>がつ</rt></ruby> — Bulan & Durasi Bulan</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(45,212,191,0.15);color:var(--teal);font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:8px">Angka + がつ. Perhatikan 4月, 7月, 9月.</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>月<rt>がつ</rt></ruby></th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th><ruby>月<rt>がつ</rt></ruby></th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">いちがつ</td><td style="font-weight:700;color:var(--accent2)">7<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form"><b>しちがつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">にがつ</td><td style="font-weight:700;color:var(--accent2)">8<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">はちがつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">さんがつ</td><td style="font-weight:700;color:var(--accent2)">9<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form"><b>くがつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form"><b>しがつ</b></td><td style="font-weight:700;color:var(--accent2)">10<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">じゅうがつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">ごがつ</td><td style="font-weight:700;color:var(--accent2)">11<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">じゅういちがつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">ろくがつ</td><td style="font-weight:700;color:var(--accent2)">12<ruby>月<rt>がつ</rt></ruby></td><td class="rsum-form">じゅうにがつ</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 〜か<ruby>月<rt>げつ</rt></ruby> (Durasi bulan)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>いっかげつ</b></td><td style="font-weight:700;color:var(--accent2)">6か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>ろっかげつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">にかげつ</td><td style="font-weight:700;color:var(--accent2)">7か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">ななかげつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">さんかげつ</td><td style="font-weight:700;color:var(--accent2)">8か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>はっかげつ</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">よんかげつ</td><td style="font-weight:700;color:var(--accent2)">9か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">きゅうかげつ</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form">ごかげつ</td><td style="font-weight:700;color:var(--accent2)">10か<ruby>月<rt>げつ</rt></ruby></td><td class="rsum-form"><b>じゅっかげつ</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--teal)">⚠️</b> 4月=<b>しがつ</b> | 7月=<b>しちがつ</b> | 9月=<b>くがつ</b> | Durasi: 1=<b>いっかげつ</b>, 6=<b>ろっかげつ</b>, 8=<b>はっかげつ</b>, 10=<b>じゅっかげつ</b>
        </div>
      </div>
    </div>`;
}


// ── Tahun (〜年) ──
function buildTahunSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(234,179,8,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(234,179,8,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#eab308">📅 〜<ruby>年<rt>ねん</rt></ruby> — Tahun & Durasi</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(234,179,8,0.15);color:#eab308;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📆 Cara baca tahun</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>年<rt>ねん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>年<rt>ねん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">2000<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんねん</td><td style="font-weight:700;color:var(--accent2)">2020<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんにじゅうねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2010<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんじゅうねん</td><td style="font-weight:700;color:var(--accent2)">2024<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんにじゅう<b>よ</b>ねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">1999<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">せんきゅうひゃくきゅうじゅうきゅうねん</td><td style="font-weight:700;color:var(--accent2)">2025<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にせんにじゅうごねん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 〜<ruby>年間<rt>ねんかん</rt></ruby> (Durasi tahun)</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th><th>Durasi</th><th><ruby>日本語<rt>にほんご</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">いちねん</td><td style="font-weight:700;color:var(--accent2)">6<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">ろくねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">にねん</td><td style="font-weight:700;color:var(--accent2)">7<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form"><b>しちねん</b> / ななねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">さんねん</td><td style="font-weight:700;color:var(--accent2)">8<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">はちねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form"><b>よねん</b></td><td style="font-weight:700;color:var(--accent2)">9<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form"><b>くねん</b> / きゅうねん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">ごねん</td><td style="font-weight:700;color:var(--accent2)">10<ruby>年<rt>ねん</rt></ruby></td><td class="rsum-form">じゅうねん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(234,179,8,0.08);border-left:3px solid #eab308;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#eab308">⚠️</b> 4年=<b>よねん</b> | 7年=<b>しちねん</b> | 9年=<b>くねん</b> | <ruby>去年<rt>きょねん</rt></ruby>=lalu, <ruby>今年<rt>ことし</rt></ruby>=ini, <ruby>来年<rt>らいねん</rt></ruby>=depan
        </div>
      </div>
    </div>`;
}


// ── Umur (〜歳) ──
function buildUmurSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(244,63,94,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(244,63,94,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#f43f5e">🎂 〜<ruby>歳<rt>さい</rt></ruby> — Umur</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(244,63,94,0.15);color:#f43f5e;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>歳<rt>さい</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>歳<rt>さい</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">1<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>いっさい</b></td><td style="font-weight:700;color:var(--accent2)">7<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">ななさい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">2<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">にさい</td><td style="font-weight:700;color:var(--accent2)">8<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>はっさい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">3<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">さんさい</td><td style="font-weight:700;color:var(--accent2)">9<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">きゅうさい</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">4<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">よんさい</td><td style="font-weight:700;color:var(--accent2)">10<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>じゅっさい</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">5<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">ごさい</td><td style="font-weight:700;color:var(--accent2)">20<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>はたち</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">6<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form">ろくさい</td><td style="font-weight:700;color:var(--accent2)">?<ruby>歳<rt>さい</rt></ruby></td><td class="rsum-form"><b>なんさい / おいくつ</b></td></tr>
          </tbody>
        </table></div>
        <div style="margin-top:10px;padding:8px 12px;background:rgba(244,63,94,0.08);border-left:3px solid #f43f5e;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#f43f5e">⚠️</b> 1歳=<b>いっさい</b> | 8歳=<b>はっさい</b> | 10歳=<b>じゅっさい</b> | 20歳=<b>はたち</b>(khusus!) | おいくつ=sopan
        </div>
      </div>
    </div>`;
}


// ── Harga / Uang (〜円) ──
function buildHargaSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(34,197,94,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(34,197,94,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#22c55e">💴 〜<ruby>円<rt>えん</rt></ruby> — Harga / Uang</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(34,197,94,0.15);color:#22c55e;font-weight:700">⚠️ 音変化</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th><ruby>値段<rt>ねだん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th><th><ruby>値段<rt>ねだん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:var(--accent2)">100<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">ひゃくえん</td><td style="font-weight:700;color:var(--accent2)">1,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">せんえん</td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">300<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>さんびゃくえん</b></td><td style="font-weight:700;color:var(--accent2)">3,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>さんぜんえん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">600<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>ろっぴゃくえん</b></td><td style="font-weight:700;color:var(--accent2)">8,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>はっせんえん</b></td></tr>
            <tr><td style="font-weight:700;color:var(--accent2)">800<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>はっぴゃくえん</b></td><td style="font-weight:700;color:var(--accent2)">10,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">いちまんえん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:12px;font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">📋 Contoh harga sehari-hari</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:380px">
          <thead><tr><th><ruby>物<rt>もの</rt></ruby></th><th><ruby>値段<rt>ねだん</rt></ruby></th><th><ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-size:0.74rem">コーヒー</td><td style="font-weight:700;color:var(--accent2)">350<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>さんびゃく</b>ごじゅうえん</td></tr>
            <tr><td style="font-size:0.74rem">おべんとう</td><td style="font-weight:700;color:var(--accent2)">680<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form"><b>ろっぴゃく</b>はちじゅうえん</td></tr>
            <tr><td style="font-size:0.74rem"><ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>切符<rt>きっぷ</rt></ruby></td><td style="font-weight:700;color:var(--accent2)">1,800<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">せん<b>はっぴゃく</b>えん</td></tr>
            <tr><td style="font-size:0.74rem">スマホ</td><td style="font-weight:700;color:var(--accent2)">83,000<ruby>円<rt>えん</rt></ruby></td><td class="rsum-form">はちまん<b>さんぜん</b>えん</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(34,197,94,0.08);border-left:3px solid #22c55e;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#22c55e">💡</b> <b>いくら</b>=berapa? | 300=<b>さんびゃく</b>, 600=<b>ろっぴゃく</b>, 800=<b>はっぴゃく</b> | 3000=<b>さんぜん</b>, 8000=<b>はっせん</b>
        </div>
      </div>
    </div>`;
}


// ── Counter / Kata Bantu Bilangan ── [REDESIGNED: per-counter cards]
function buildCounterSection() {
  const counters = [
    { name:'〜つ', use:'Benda umum', color:'#a78bfa', vals:['ひとつ','ふたつ','みっつ','よっつ','いつつ','むっつ','ななつ','やっつ','ここのつ','とお'], bold:[0,1,2,3,4,5,6,7,8,9] },
    { name:'〜人', ruby:'にん', use:'Orang', color:'#60a5fa', vals:['<b>ひとり</b>','<b>ふたり</b>','さんにん','<b>よにん</b>','ごにん','ろくにん','<b>しちにん</b>','はちにん','<b>くにん</b>','じゅうにん'], bold:[0,1,3,6,8] },
    { name:'〜枚', ruby:'まい', use:'Benda tipis/datar', color:'#34d399', vals:['いちまい','にまい','さんまい','よんまい','ごまい','ろくまい','ななまい','はちまい','きゅうまい','じゅうまい'], bold:[] },
    { name:'〜本', ruby:'ほん', use:'Benda panjang', color:'#fbbf24', vals:['<b>いっぽん</b>','にほん','<b>さんぼん</b>','よんほん','ごほん','<b>ろっぽん</b>','ななほん','<b>はっぽん</b>','きゅうほん','<b>じゅっぽん</b>'], bold:[0,2,5,7,9], rendaku:true },
    { name:'〜匹', ruby:'ひき', use:'Hewan kecil', color:'#fb923c', vals:['<b>いっぴき</b>','にひき','<b>さんびき</b>','よんひき','ごひき','<b>ろっぴき</b>','ななひき','<b>はっぴき</b>','きゅうひき','<b>じゅっぴき</b>'], bold:[0,2,5,7,9], rendaku:true },
    { name:'〜台', ruby:'だい', use:'Mesin/kendaraan', color:'#8b5cf6', vals:['いちだい','にだい','さんだい','よんだい','ごだい','ろくだい','ななだい','はちだい','きゅうだい','じゅうだい'], bold:[] },
    { name:'〜冊', ruby:'さつ', use:'Buku/majalah', color:'#ec4899', vals:['<b>いっさつ</b>','にさつ','さんさつ','よんさつ','ごさつ','ろくさつ','ななさつ','<b>はっさつ</b>','きゅうさつ','<b>じゅっさつ</b>'], bold:[0,7,9], rendaku:true },
    { name:'〜杯', ruby:'はい', use:'Gelas/cangkir', color:'#14b8a6', vals:['<b>いっぱい</b>','にはい','<b>さんばい</b>','よんはい','ごはい','<b>ろっぱい</b>','ななはい','<b>はっぱい</b>','きゅうはい','<b>じゅっぱい</b>'], bold:[0,2,5,7,9], rendaku:true },
    { name:'〜回', ruby:'かい', use:'Frekuensi', color:'#f43f5e', vals:['<b>いっかい</b>','にかい','さんかい','よんかい','ごかい','<b>ろっかい</b>','ななかい','<b>はっかい</b>','きゅうかい','<b>じゅっかい</b>'], bold:[0,5,7,9], rendaku:true },
    { name:'〜階', ruby:'かい', use:'Lantai', color:'#6366f1', vals:['<b>いっかい</b>','にかい','<b>さんがい</b>','よんかい','ごかい','<b>ろっかい</b>','ななかい','<b>はっかい</b>','きゅうかい','<b>じゅっかい</b>'], bold:[0,2,5,7,9], rendaku:true },
  ];

  let cards = '';
  counters.forEach(c => {
    const hasRendaku = c.rendaku ? `<span style="margin-left:6px;font-size:0.58rem;padding:1px 6px;border-radius:8px;background:rgba(251,191,36,0.15);color:var(--amber);font-weight:700">音変化</span>` : '';
    const rubyPart = c.ruby ? `<ruby>${c.name.replace('〜','')}<rt>${c.ruby}</rt></ruby>` : c.name.replace('〜','');
    cards += `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;margin-bottom:8px;border-left:3px solid ${c.color}">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
          <span style="font-weight:700;color:${c.color};font-size:0.8rem">〜${rubyPart}</span>
          <span style="font-size:0.68rem;color:var(--text2)">${c.use}</span>
          ${hasRendaku}
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;font-size:0.7rem;font-family:'Noto Sans JP',sans-serif">
          ${c.vals.map((v,i) => `<div style="text-align:center;padding:4px 2px;background:var(--surface2);border-radius:6px;line-height:1.4"><span style="font-size:0.58rem;color:var(--text2);display:block">${i+1}</span>${v}</div>`).join('')}
        </div>
      </div>`;
  });

  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(251,191,36,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(251,191,36,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--amber)">🔢 <ruby>助数詞<rt>じょすうし</rt></ruby> — Kata Bantu Bilangan (Counter)</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(251,191,36,0.15);color:var(--amber);font-weight:700">10 jenis</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          Counter berbeda tergantung bentuk/jenis benda. Yang <b>tebal</b> = bentuk yang berubah (rendaku).
        </div>
        ${cards}
        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--amber)">⚠️ Pola rendaku:</b> 〜ほん→<b>ぽん/ぼん</b> | 〜ひき→<b>ぴき/びき</b> | 〜はい→<b>ぱい/ばい</b> (pada angka 1,3,6,8,10)
        </div>
      </div>
    </div>`;
}


// ── Verba Memberi/Menerima (あげもらいくれ) ──
function buildAgemoSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(192,132,252,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(192,132,252,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#c084fc">🎁 あげます・もらいます・くれます</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          3 verba memberi/menerima. Dibedakan berdasarkan <b>siapa memberi ke siapa</b>.
        </div>

        <!-- 3 cards for each verb -->
        <div style="display:grid;gap:8px;margin-bottom:12px">
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;border-left:3px solid #34d399">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-weight:700;color:#34d399;font-size:0.82rem">あげます</span>
              <span style="font-size:0.68rem;color:var(--text2)">Memberi (ke orang lain)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text2);line-height:1.5">
              <ruby>私<rt>わたし</rt></ruby>/<ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> | 〜<b>に</b> あげます<br>
              <span style="font-family:'Noto Sans JP',sans-serif;color:var(--text)"><ruby>友<rt>とも</rt></ruby>だち<b>に</b> <ruby>花<rt>はな</rt></ruby>を <b>あげます</b></span>
            </div>
          </div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;border-left:3px solid #60a5fa">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-weight:700;color:#60a5fa;font-size:0.82rem">もらいます</span>
              <span style="font-size:0.68rem;color:var(--text2)">Menerima (dari orang lain)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text2);line-height:1.5">
              <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>私<rt>わたし</rt></ruby> | 〜<b>に/から</b> もらいます<br>
              <span style="font-family:'Noto Sans JP',sans-serif;color:var(--text)"><ruby>先生<rt>せんせい</rt></ruby><b>に</b> <ruby>本<rt>ほん</rt></ruby>を <b>もらいました</b></span>
            </div>
          </div>
          <div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;border-left:3px solid #f87171">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-weight:700;color:#f87171;font-size:0.82rem">くれます</span>
              <span style="font-size:0.68rem;color:var(--text2)">Memberi (ke saya)</span>
            </div>
            <div style="font-size:0.72rem;color:var(--text2);line-height:1.5">
              <ruby>他<rt>ほか</rt></ruby>の<ruby>人<rt>ひと</rt></ruby> → <ruby>私<rt>わたし</rt></ruby> | 〜<b>が</b> くれます<br>
              <span style="font-family:'Noto Sans JP',sans-serif;color:var(--text)"><ruby>友<rt>とも</rt></ruby>だち<b>が</b> ケーキを <b>くれました</b></span>
            </div>
          </div>
        </div>

        <div style="font-size:0.76rem;font-weight:700;color:var(--accent2);margin-bottom:8px">🔧 〜て + あげます/もらいます/くれます</div>
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:420px">
          <thead><tr><th>パターン</th><th>Arti</th><th><ruby>例文<rt>れいぶん</rt></ruby></th></tr></thead>
          <tbody>
            <tr><td style="font-weight:600;color:#34d399">KKて+あげます</td><td style="font-size:0.72rem">Melakukan utk orang lain</td><td class="rsum-form" style="font-size:0.74rem"><ruby>教<rt>おし</rt></ruby>えて<b>あげます</b></td></tr>
            <tr><td style="font-weight:600;color:#60a5fa">KKて+もらいます</td><td style="font-size:0.72rem">Minta/terima bantuan</td><td class="rsum-form" style="font-size:0.74rem"><ruby>手伝<rt>てつだ</rt></ruby>って<b>もらいます</b></td></tr>
            <tr><td style="font-weight:600;color:#f87171">KKて+くれます</td><td style="font-size:0.72rem">Orang lain melakukan utk saya</td><td class="rsum-form" style="font-size:0.74rem"><ruby>作<rt>つく</rt></ruby>って<b>くれました</b></td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(192,132,252,0.08);border-left:3px solid #c084fc;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#c084fc">💡</b> あげる=barang pergi DARI saya | もらう=saya MENERIMA | くれる=orang lain MEMBERI ke saya (<ruby>感謝<rt>かんしゃ</rt></ruby>)
        </div>
      </div>
    </div>`;
}


// ── Ekspresi Waktu ──
function buildWaktuSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(45,212,191,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(45,212,191,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:var(--teal)">⏰ <ruby>時間<rt>じかん</rt></ruby>の<ruby>表現<rt>ひょうげん</rt></ruby> — Ekspresi Waktu</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(45,212,191,0.15);color:var(--teal);font-weight:700">6 pola</span>
      </div>
      <div class="konj-accordion-body">
        <div class="tbl-scroll-wrap"><table class="rsum-vv-table" style="min-width:480px">
          <thead><tr><th>パターン</th><th><ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby></th><th><ruby>例文<rt>れいぶん</rt></ruby></th><th>Arti</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:700;color:#fbbf24">〜<ruby>前<rt>まえ</rt></ruby>に</td><td style="font-size:0.7rem">KK辞書形+まえに</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>寝<rt>ね</rt></ruby>る</b>まえに、<ruby>歯<rt>は</rt></ruby>を<ruby>磨<rt>みが</rt></ruby>きます</td><td style="font-size:0.7rem;color:var(--text2)">Sebelum~</td></tr>
            <tr><td style="font-weight:700;color:#fb923c">〜た<ruby>後<rt>あと</rt></ruby>で</td><td style="font-size:0.7rem">KKた形+あとで</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>食<rt>た</rt></ruby>べた</b>あとで、コーヒーを<ruby>飲<rt>の</rt></ruby>みます</td><td style="font-size:0.7rem;color:var(--text2)">Setelah~ (longgar)</td></tr>
            <tr><td style="font-weight:700;color:#34d399">〜てから</td><td style="font-size:0.7rem">KKて形+から</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>浴<rt>あ</rt></ruby>びてから</b>、<ruby>寝<rt>ね</rt></ruby>ます</td><td style="font-size:0.7rem;color:var(--text2)">Setelah~ (ketat)</td></tr>
            <tr><td style="font-weight:700;color:#60a5fa">〜<ruby>間<rt>あいだ</rt></ruby>に</td><td style="font-size:0.7rem">KK辞書形+あいだに</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>留守<rt>るす</rt></ruby>のあいだに</b>、<ruby>友<rt>とも</rt></ruby>だちが<ruby>来<rt>き</rt></ruby>ました</td><td style="font-size:0.7rem;color:var(--text2)">Selama~</td></tr>
            <tr><td style="font-weight:700;color:#a78bfa">〜ながら</td><td style="font-size:0.7rem">KKます形+ながら</td><td class="rsum-form" style="font-size:0.72rem"><ruby>音楽<rt>おんがく</rt></ruby>を<b><ruby>聞<rt>き</rt></ruby>きながら</b>、<ruby>勉強<rt>べんきょう</rt></ruby>します</td><td style="font-size:0.7rem;color:var(--text2)">Sambil~</td></tr>
            <tr><td style="font-weight:700;color:#f472b6">〜<ruby>時<rt>とき</rt></ruby></td><td style="font-size:0.7rem">KK/KS/KB+とき</td><td class="rsum-form" style="font-size:0.72rem"><b><ruby>若<rt>わか</rt></ruby>い</b>とき、よく<ruby>運動<rt>うんどう</rt></ruby>しました</td><td style="font-size:0.7rem;color:var(--text2)">Waktu~</td></tr>
          </tbody>
        </table></div>

        <div style="margin-top:10px;padding:8px 12px;background:rgba(251,191,36,0.08);border-left:3px solid var(--amber);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--amber)">⚠️ あとで vs てから:</b> あとで=jeda boleh lama | てから=langsung setelahnya
        </div>
        <div style="margin-top:6px;padding:8px 12px;background:rgba(45,212,191,0.08);border-left:3px solid var(--teal);border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:var(--teal)">💡 Kapan pakai に?</b> Waktu spesifik (7時<b>に</b>, 月曜日<b>に</b>) = pakai. Relatif (きょう, あした, まいにち) = tidak pakai.
        </div>
      </div>
    </div>`;
}


// ── Kata Penghubung / Konjungsi ──
function buildKonjungsiSection() {
  return `
    <div class="konj-accordion" style="scroll-margin-top:110px;margin-bottom:12px;border-color:rgba(96,165,250,0.3)">
      <div class="konj-accordion-head" onclick="this.parentElement.classList.toggle('open')" style="background:rgba(96,165,250,0.04)">
        <span class="konj-accordion-chevron">▶</span>
        <span style="font-size:0.82rem;font-weight:700;color:#60a5fa">🔗 <ruby>接続詞<rt>せつぞくし</rt></ruby> — Kata Penghubung</span>
        <span style="margin-left:auto;font-size:0.6rem;padding:2px 8px;border-radius:10px;background:rgba(96,165,250,0.15);color:#60a5fa;font-weight:700">14 kata</span>
      </div>
      <div class="konj-accordion-body">
        <div style="font-size:0.72rem;color:var(--text2);margin-bottom:10px;line-height:1.5">
          <ruby>接続詞<rt>せつぞくし</rt></ruby> = kata penghubung antar kalimat. N5〜N4.
        </div>

        <!-- Kategori: Tambahan/Urutan -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--green);letter-spacing:0.06em;padding:4px 8px;background:rgba(52,211,153,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>追加<rt>ついか</rt></ruby>・<ruby>順番<rt>じゅんばん</rt></ruby> (TAMBAHAN / URUTAN)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">そして</span>
            <span style="color:var(--text2);font-size:0.7rem">Dan kemudian; lalu</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">それから</span>
            <span style="color:var(--text2);font-size:0.7rem">Setelah itu; kemudian</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">それに</span>
            <span style="color:var(--text2);font-size:0.7rem">Selain itu; lagipula</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <!-- Kategori: Pertentangan -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--red);letter-spacing:0.06em;padding:4px 8px;background:rgba(248,113,113,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>対比<rt>たいひ</rt></ruby>・<ruby>逆接<rt>ぎゃくせつ</rt></ruby> (PERTENTANGAN)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">でも</span>
            <span style="color:var(--text2);font-size:0.7rem">Tapi; namun (santai)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">しかし</span>
            <span style="color:var(--text2);font-size:0.7rem">Akan tetapi (formal)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">けれども</span>
            <span style="color:var(--text2);font-size:0.7rem">Meskipun (agak formal)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <!-- Kategori: Alasan -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--amber);letter-spacing:0.06em;padding:4px 8px;background:rgba(251,191,36,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>理由<rt>りゆう</rt></ruby>・<ruby>原因<rt>げんいん</rt></ruby> (ALASAN / SEBAB)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">だから</span>
            <span style="color:var(--text2);font-size:0.7rem">Oleh karena itu; makanya</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">ですから</span>
            <span style="color:var(--text2);font-size:0.7rem">Oleh karena itu (sopan)</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">それで</span>
            <span style="color:var(--text2);font-size:0.7rem">Lalu (karena itu); jadi</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">すると</span>
            <span style="color:var(--text2);font-size:0.7rem">Lalu (tiba-tiba); maka</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">そうすると</span>
            <span style="color:var(--text2);font-size:0.7rem">Kalau begitu; maka</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <!-- Kategori: Ganti Topik -->
        <div style="font-size:0.68rem;font-weight:700;color:var(--accent);letter-spacing:0.06em;padding:4px 8px;background:rgba(124,106,247,0.06);border-radius:6px;margin-bottom:6px">
          <ruby>話題転換<rt>わだいてんかん</rt></ruby>・その<ruby>他<rt>た</rt></ruby> (GANTI TOPIK / LAINNYA)
        </div>
        <div style="display:grid;gap:4px;margin-bottom:12px">
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">ところで</span>
            <span style="color:var(--text2);font-size:0.7rem">Ngomong-ngomong</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">では/じゃ</span>
            <span style="color:var(--text2);font-size:0.7rem">Kalau begitu; nah</span>
            <span style="font-size:0.62rem;color:var(--text2)">N5</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">つまり</span>
            <span style="color:var(--text2);font-size:0.7rem">Dengan kata lain; intinya</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:6px 10px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:0.74rem">
            <span style="font-weight:600;font-family:'Noto Sans JP',sans-serif;min-width:60px">たとえば</span>
            <span style="color:var(--text2);font-size:0.7rem">Misalnya; contohnya</span>
            <span style="font-size:0.62rem;color:var(--text2)">N4</span>
          </div>
        </div>

        <div style="padding:8px 12px;background:rgba(96,165,250,0.08);border-left:3px solid #60a5fa;border-radius:0 8px 8px 0;font-size:0.72rem;line-height:1.6">
          <b style="color:#60a5fa">💡 Tips:</b> でも=santai vs しかし=formal | だから=santai vs ですから=sopan | すると=tak terduga vs そうすると=logis
        </div>
      </div>
    </div>`;
}

// ========== INIT (enhanced) ==========
// renderHome(); — now handled by initApp()
initApp();
