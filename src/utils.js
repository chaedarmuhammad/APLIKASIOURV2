// ========== UTILITIES MODULE ==========
// Shared utility functions used across the application.
//
// SECURITY NOTE on innerHTML usage:
// This app uses innerHTML extensively to render Japanese text with furigana (<ruby> tags).
// The data source is TRUSTED (bundled static data files, not user input).
// The escapeHtml() function below should be used for:
//   - Any user-generated content (search input display, imported file names, etc.)
//   - Dynamic data from external sources
// It should NOT be used for data.js content because that would break <ruby> rendering.

'use strict';

/**
 * Escape HTML special characters to prevent XSS.
 * Use ONLY for user-provided strings (search queries, file names, etc).
 * Do NOT use for trusted data that contains intentional HTML (<ruby> tags).
 * @param {string|null|undefined} s - String to escape
 * @returns {string} HTML-safe string
 */
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

/**
 * Sanitize a string that may contain trusted HTML (like ruby tags from data.js)
 * but strip any dangerous elements (script, iframe, event handlers).
 * Used as a safety layer for data that should contain only formatting HTML.
 * @param {string} html - HTML string from trusted data source
 * @returns {string} Sanitized HTML (keeps ruby, b, i, br, table, span, small, etc.)
 */
function sanitizeTrustedHtml(html) {
  if (!html) return '';
  // Remove script tags and event handlers as defense-in-depth
  return String(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>.*?<\/iframe>/gi, '')
    .replace(/\bon\w+\s*=\s*(['"])[^'"]*\1/gi, '')
    .replace(/\bon\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript\s*:/gi, '');
}

/**
 * Show a toast notification to the user.
 * @param {string} msg - Message text
 * @param {string} [type] - 'error', 'success', or 'info' (default)
 */
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

/**
 * Safe execution wrapper with error handling.
 * @param {Function} fn - Function to execute
 * @param {string} [fallbackMsg] - Optional toast message on error
 * @returns {*} Return value of fn, or null on error
 */
function safeExec(fn, fallbackMsg) {
  try {
    return fn();
  } catch (e) {
    console.error('SafeExec error:', e);
    if (fallbackMsg) {
      showToast(fallbackMsg, 'error');
    }
    return null;
  }
}
