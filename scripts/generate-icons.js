#!/usr/bin/env node
// ========== PNG Icon Generator ==========
// Generates minimal PNG icons for PWA manifest.
// Creates solid colored icons with the app branding.
// No external dependencies — uses raw PNG encoding.
//
// Usage: node scripts/generate-icons.js
// Output: icons/icon-192.png, icons/icon-512.png

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ICONS_DIR = path.join(__dirname, '..', 'icons');

/**
 * Generate a minimal PNG file with a gradient background and text.
 * @param {number} size - Width/height in pixels
 * @returns {Buffer} PNG file buffer
 */
function generatePNG(size) {
  // Create raw pixel data (RGBA)
  const pixels = Buffer.alloc(size * size * 4);
  
  // Fill with gradient background matching the app theme
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      
      // Diagonal gradient from #1a1230 to #0f1a2e
      const t = (x + y) / (size * 2);
      const r = Math.round(26 * (1 - t) + 15 * t);
      const g = Math.round(18 * (1 - t) + 26 * t);
      const b = Math.round(48 * (1 - t) + 46 * t);
      
      // Rounded corners (radius = 15% of size)
      const radius = Math.round(size * 0.15);
      const inCorner = isInRoundedCorner(x, y, size, radius);
      
      if (inCorner) {
        // Transparent corner (dark background)
        pixels[i] = 15;     // R
        pixels[i + 1] = 15; // G
        pixels[i + 2] = 20; // B
        pixels[i + 3] = 255; // A (opaque dark)
      } else {
        pixels[i] = r;
        pixels[i + 1] = g;
        pixels[i + 2] = b;
        pixels[i + 3] = 255;
        
        // Draw a centered accent circle/glow
        const cx = size / 2, cy = size * 0.38;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const glowRadius = size * 0.25;
        if (dist < glowRadius) {
          const intensity = 1 - (dist / glowRadius);
          // Purple glow (#7c6af7)
          pixels[i] = Math.min(255, r + Math.round(124 * intensity * 0.3));
          pixels[i + 1] = Math.min(255, g + Math.round(106 * intensity * 0.3));
          pixels[i + 2] = Math.min(255, b + Math.round(247 * intensity * 0.3));
        }
        
        // Draw bottom accent bar
        if (y > size * 0.72 && y < size * 0.78) {
          const barProgress = x / size;
          if (barProgress > 0.2 && barProgress < 0.8) {
            // Gradient bar from #7c6af7 to #c084fc
            const bt = (barProgress - 0.2) / 0.6;
            pixels[i] = Math.round(124 * (1 - bt) + 192 * bt);
            pixels[i + 1] = Math.round(106 * (1 - bt) + 132 * bt);
            pixels[i + 2] = Math.round(247 * (1 - bt) + 252 * bt);
          }
        }
      }
    }
  }
  
  // Encode as PNG
  return encodePNG(pixels, size, size);
}

function isInRoundedCorner(x, y, size, radius) {
  // Check if pixel is outside the rounded rectangle
  // Top-left
  if (x < radius && y < radius) {
    return Math.sqrt((radius - x) ** 2 + (radius - y) ** 2) > radius;
  }
  // Top-right
  if (x >= size - radius && y < radius) {
    return Math.sqrt((x - (size - radius)) ** 2 + (radius - y) ** 2) > radius;
  }
  // Bottom-left
  if (x < radius && y >= size - radius) {
    return Math.sqrt((radius - x) ** 2 + (y - (size - radius)) ** 2) > radius;
  }
  // Bottom-right
  if (x >= size - radius && y >= size - radius) {
    return Math.sqrt((x - (size - radius)) ** 2 + (y - (size - radius)) ** 2) > radius;
  }
  return false;
}

/**
 * Encode raw RGBA pixels as PNG.
 * Minimal PNG encoder — no dependencies.
 */
function encodePNG(pixels, width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  
  // IDAT chunk — raw pixel data with filter bytes
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // No filter
    pixels.copy(rawData, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }
  
  const compressed = zlib.deflateSync(rawData, { level: 9 });
  
  // Build chunks
  const chunks = [
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ];
  
  return Buffer.concat(chunks);
}

function makeChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc >>> 0, 0);
  
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ── Generate Icons ──
console.log('🎨 Generating PNG icons...\n');

if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

const sizes = [192, 512];
sizes.forEach(size => {
  const png = generatePNG(size);
  const filePath = path.join(ICONS_DIR, `icon-${size}.png`);
  fs.writeFileSync(filePath, png);
  console.log(`   ✅ icon-${size}.png (${(png.length / 1024).toFixed(1)} KB)`);
});

console.log('\n✨ Icons generated successfully!');
