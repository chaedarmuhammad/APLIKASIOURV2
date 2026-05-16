#!/usr/bin/env node
// ========== BUILD SCRIPT ==========
// Minifies CSS and JS for production deployment.
// No external dependencies required — uses Node.js built-in modules only.
//
// Usage: node build.js
// Output: dist/ folder with minified files ready for deployment.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// Files to process
const JS_FILES = [
  'data-n5.js',
  'data-n4.js',
  'data.js',
  'src/utils.js',
  'src/bab-colors.js',
  'src/storage.js',
  'src/srs.js',
  'src/version.js',
  'src/export-import.js',
  'src/navigation.js',
  'src/ui-study.js',
  'src/ui-kamus.js',
  'src/ui-rangkuman.js',
  'app.js',
  'sw.js'
];

const CSS_FILES = [
  'style.css'
];

const COPY_FILES = [
  'index.html',
  'manifest.webmanifest',
  'icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// ── Simple JS minifier (no dependencies) ──
function minifyJS(code) {
  // Remove single-line comments (but not URLs with //)
  code = code.replace(/(?<![:"'])\/\/(?![\/\*]).*$/gm, '');
  // Remove multi-line comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove leading/trailing whitespace per line
  code = code.replace(/^\s+/gm, '');
  code = code.replace(/\s+$/gm, '');
  // Collapse multiple newlines
  code = code.replace(/\n{2,}/g, '\n');
  // Remove empty lines
  code = code.replace(/^\s*\n/gm, '');
  return code.trim();
}

// ── Simple CSS minifier (no dependencies) ──
function minifyCSS(code) {
  // Remove comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove whitespace around special chars
  code = code.replace(/\s*([{}:;,>~+])\s*/g, '$1');
  // Collapse whitespace
  code = code.replace(/\s{2,}/g, ' ');
  // Remove leading whitespace per line
  code = code.replace(/^\s+/gm, '');
  // Remove newlines
  code = code.replace(/\n/g, '');
  // Remove trailing semicolons before }
  code = code.replace(/;}/g, '}');
  return code.trim();
}

// ── Update HTML for production ──
function processHTML(html) {
  // Update script paths for flat dist structure
  html = html.replace(/src="src\//g, 'src="');
  // Add cache-busting version query
  const version = Date.now().toString(36);
  html = html.replace(/(src|href)="([^"]+\.(js|css))"/g, function(match, attr, file, ext) {
    if (file.startsWith('http')) return match;
    return `${attr}="${file}?v=${version}"`;
  });
  return html;
}

// ── Build Process ──
console.log('🔨 Building N5→N4 Flashcard for production...\n');

// Create dist directory structure
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

let totalOriginal = 0;
let totalMinified = 0;

// Process JS files
console.log('📦 Minifying JavaScript:');
JS_FILES.forEach(file => {
  const src = path.join(ROOT, file);
  if (!fs.existsSync(src)) {
    console.log(`   ⚠️  ${file} — skipped (not found)`);
    return;
  }
  const code = fs.readFileSync(src, 'utf-8');
  const minified = minifyJS(code);
  const destName = file.replace('src/', '');
  const dest = path.join(DIST, destName);
  
  // Create subdirectories if needed
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  fs.writeFileSync(dest, minified);
  const savings = ((1 - minified.length / code.length) * 100).toFixed(1);
  totalOriginal += code.length;
  totalMinified += minified.length;
  console.log(`   ✅ ${file} → ${destName} (${savings}% smaller)`);
});

// Process CSS files
console.log('\n🎨 Minifying CSS:');
CSS_FILES.forEach(file => {
  const src = path.join(ROOT, file);
  if (!fs.existsSync(src)) {
    console.log(`   ⚠️  ${file} — skipped (not found)`);
    return;
  }
  const code = fs.readFileSync(src, 'utf-8');
  const minified = minifyCSS(code);
  const dest = path.join(DIST, file);
  fs.writeFileSync(dest, minified);
  const savings = ((1 - minified.length / code.length) * 100).toFixed(1);
  totalOriginal += code.length;
  totalMinified += minified.length;
  console.log(`   ✅ ${file} (${savings}% smaller)`);
});

// Copy and process other files
console.log('\n📋 Processing static files:');
COPY_FILES.forEach(file => {
  const src = path.join(ROOT, file);
  if (!fs.existsSync(src)) {
    console.log(`   ⚠️  ${file} — skipped (not found)`);
    return;
  }
  
  const dest = path.join(DIST, file);
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  if (file === 'index.html') {
    const html = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, processHTML(html));
    console.log(`   ✅ ${file} (processed for production)`);
  } else {
    fs.copyFileSync(src, dest);
    console.log(`   ✅ ${file} (copied)`);
  }
});

// Summary
const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✨ Build complete!`);
console.log(`   Original: ${(totalOriginal / 1024).toFixed(1)} KB`);
console.log(`   Minified: ${(totalMinified / 1024).toFixed(1)} KB`);
console.log(`   Savings:  ${totalSavings}%`);
console.log(`   Output:   ${DIST}/`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
