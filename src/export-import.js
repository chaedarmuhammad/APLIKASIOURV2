// ========== EXPORT / IMPORT MODULE ==========
// Handles data export, import with deep validation, and reset functionality.
// Depends on: utils.js (showToast, escapeHtml), storage.js (lsGet, lsSet)

'use strict';

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
    a.download = `n5n4-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const status = document.getElementById('dataManagerStatus');
    status.className = 'data-manager-status success';
    status.textContent = '\u2705 Progres berhasil diekspor!';
    showToast('Progres berhasil diekspor!', 'success');
  } catch (e) {
    const status = document.getElementById('dataManagerStatus');
    status.className = 'data-manager-status error';
    status.textContent = '\u274C Gagal mengekspor: ' + e.message;
  }
}

function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);

      // Validate structure
      if (!data.appName || data.appName !== 'N5N4-Flashcard') {
        throw new Error('File ini bukan file ekspor yang valid.');
      }

      // Deep validation for progress data
      if (data.progress && typeof data.progress === 'object') {
        const validatedProgress = {};
        for (const [key, val] of Object.entries(data.progress)) {
          const numKey = Number(key);
          if (!Number.isFinite(numKey) || numKey < 1 || numKey > 200) continue;
          const numVal = Number(val);
          if (!Number.isFinite(numVal) || numVal < 0 || numVal > 100) continue;
          validatedProgress[numKey] = numVal;
        }
        progress = validatedProgress;
        lsSet('n5prog', progress);
      }

      // Deep validation for stars data
      if (data.stars && typeof data.stars === 'object') {
        const validatedStars = {};
        for (const [key, val] of Object.entries(data.stars)) {
          if (typeof key !== 'string' || key.length > 100) continue;
          validatedStars[key] = !!val;
        }
        stars = validatedStars;
        lsSet('n5stars', stars);
      }

      // Deep validation for SRS data
      if (data.srs && typeof data.srs === 'object') {
        const validatedSrs = {};
        for (const [key, card] of Object.entries(data.srs)) {
          if (typeof key !== 'string' || key.length > 200) continue;
          if (typeof card !== 'object' || card === null) continue;
          const validated = {};
          validated.ef = (typeof card.ef === 'number' && card.ef >= 1.3 && card.ef <= 5) ? card.ef : 2.5;
          validated.interval = (typeof card.interval === 'number' && card.interval >= 0 && card.interval <= 365) ? card.interval : 0;
          validated.repetition = (typeof card.repetition === 'number' && card.repetition >= 0 && card.repetition <= 50) ? card.repetition : 0;
          validated.due = (typeof card.due === 'number' && card.due >= 0) ? card.due : 0;
          validated.lapses = (typeof card.lapses === 'number' && card.lapses >= 0 && card.lapses <= 9999) ? card.lapses : 0;
          validated.count = validated.lapses;
          validated.box = (typeof card.box === 'number' && card.box >= 0 && card.box <= 5) ? card.box : Math.min(5, validated.repetition);
          validatedSrs[key] = validated;
        }
        srs = validatedSrs;
        lsSet('n5srs', srs);
      }

      const status = document.getElementById('dataManagerStatus');
      status.className = 'data-manager-status success';
      status.textContent = '\u2705 Progres berhasil diimpor! Tanggal ekspor: ' + (data.exportDate || 'N/A');
      showToast('Progres berhasil diimpor!', 'success');

      // Re-render home to show updated progress
      safeExec(() => renderHome());
      safeExec(() => refreshForgetBanner());
    } catch (err) {
      const status = document.getElementById('dataManagerStatus');
      status.className = 'data-manager-status error';
      status.textContent = '\u274C Gagal mengimpor: ' + err.message;
      showToast('Gagal mengimpor file', 'error');
    }
  };
  reader.readAsText(file);
  // Reset input so same file can be selected again
  event.target.value = '';
}

function confirmResetProgress() {
  if (!confirm('\u26A0\uFE0F PERINGATAN: Semua progres belajar akan dihapus permanen!\n\nSudah ekspor backup?\nKlik OK untuk menghapus semua data.')) return;
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
    status.textContent = '\u2705 Semua data telah dihapus.';
    showToast('Semua data berhasil direset', 'success');
    safeExec(() => renderHome());
    safeExec(() => refreshForgetBanner());
  } catch (e) {
    showToast('Gagal mereset data', 'error');
  }
}
