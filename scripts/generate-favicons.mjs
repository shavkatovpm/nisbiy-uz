// One-off favicon generator.
// Run: node scripts/generate-favicons.mjs
// Requires: npm i --no-save sharp png-to-ico

import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

// Plain logo (transparent bg) — for favicon, browser tab, Google search
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <circle cx="16" cy="7" r="3" fill="#0a0a0a"/>
  <rect x="6" y="14" width="20" height="4" rx="2" fill="#0f766e"/>
  <circle cx="16" cy="25" r="3" fill="#0a0a0a"/>
</svg>`;

// App icon (paper bg + rounded square) — for Apple touch icon + Android maskable
const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#fafaf9"/>
  <circle cx="90" cy="50" r="16" fill="#0a0a0a"/>
  <rect x="34" y="82" width="112" height="22" rx="11" fill="#0f766e"/>
  <circle cx="90" cy="136" r="16" fill="#0a0a0a"/>
</svg>`;

// Maskable icon (logo with safe-zone padding) — for Android adaptive icons
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#fafaf9"/>
  <circle cx="256" cy="160" r="32" fill="#0a0a0a"/>
  <rect x="144" y="240" width="224" height="32" rx="16" fill="#0f766e"/>
  <circle cx="256" cy="352" r="32" fill="#0a0a0a"/>
</svg>`;

mkdirSync(PUBLIC, { recursive: true });

const writePng = async (svg, size, name) => {
  const out = join(PUBLIC, name);
  await sharp(Buffer.from(svg))
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out);
  console.log(`  ✓ ${name}  (${size}×${size})`);
};

console.log('Generating favicons…');

// Browser tab + Google search PNG fallbacks (transparent)
await writePng(logoSvg, 16, 'favicon-16.png');
await writePng(logoSvg, 32, 'favicon-32.png');
await writePng(logoSvg, 48, 'favicon-48.png');
await writePng(logoSvg, 96, 'favicon-96.png');
await writePng(logoSvg, 192, 'favicon-192.png');
await writePng(logoSvg, 512, 'favicon-512.png');

// Apple touch icon (iOS home screen)
await writePng(appIconSvg, 180, 'apple-touch-icon.png');

// Android maskable + 512 with bg (PWA)
await writePng(maskableSvg, 512, 'icon-512-maskable.png');
await writePng(appIconSvg, 512, 'icon-512.png');

// .ico (multi-res: 16/32/48)
const ico = await pngToIco([
  join(PUBLIC, 'favicon-16.png'),
  join(PUBLIC, 'favicon-32.png'),
  join(PUBLIC, 'favicon-48.png'),
]);
writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
console.log('  ✓ favicon.ico (16/32/48 multi-res)');

console.log('\nDone.');
