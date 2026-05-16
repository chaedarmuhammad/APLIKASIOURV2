// ========== NAVIGATION MODULE ==========
// Handles screen switching, tab navigation, home rendering, and scroll state.
// Depends on: storage.js (lsGet, lsSet), srs.js (getForgetStats)

'use strict';

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
      catch (e) { console.error('[Rangkuman] Render error:', e); rangkumanRendered = false; }
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
  document.querySelectorAll('#studyTabs .tab-btn').forEach((b, i) => b.classList.toggle('active', i === n));
  document.querySelectorAll('#studyScr .tab-content').forEach((c, i) => c.classList.toggle('active', i === n));
  if (n === 2) {
    const babKey = currentBab ? currentBab.num : null;
    if (fcCards.length === 0 || fcSessionBab !== babKey) {
      fcSessionBab = babKey;
      initFlashcard();
    } else {
      renderFC();
    }
  }
}

// ── Home Level Tab ──
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
  const avg = Math.round(babs.reduce((s, b) => s + (progress[b.num] || 0), 0) / babs.length);
  const color = homeTabLevel === 'n5' ? '#34d399' : homeTabLevel === 'n4' ? '#c084fc' : 'var(--accent2)';
  info.innerHTML = `<span style="color:${color}">${done}/${babs.length} bab selesai</span> \u00B7 rata-rata <b>${avg}%</b>`;
}

// ── Home Rendering ──
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
      document.getElementById('resumeText').textContent = `Lanjutkan Bab ${b.num} \u2014 ${b.title} \u2192`;
    }
  }
  // Cross bab selector
  const sel = document.getElementById('crossBabSel');
  sel.innerHTML = '';
  BABS.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'cross-bab-btn' + (crossBabs.includes(b.num) ? ' sel' : '');
    btn.textContent = b.num;
    btn.onclick = () => {
      if (crossBabs.includes(b.num)) crossBabs = crossBabs.filter(x => x !== b.num);
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
      homeForgetBtn.textContent = `\uD83E\uDDE0 Ulang yang Terlupa (${stats.total})`;
    } else {
      homeForgetBtn.style.display = 'none';
    }
  }
}

function resumeStudy() {
  const lastBab = parseInt(lsGet('n5lastbab', 0));
  if (lastBab) openBab(lastBab);
}
