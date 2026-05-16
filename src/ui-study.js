// ========== STUDY UI MODULE ==========
// Handles Bunpou rendering, Kotoba list, and Flashcard system.
// Depends on: utils.js (escapeHtml), storage.js (lsSet), srs.js (sm2RecordHafal, sm2RecordBelum, wordKey, forgetCount, getForgetStats)

'use strict';

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

