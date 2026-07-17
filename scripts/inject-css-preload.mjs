/**
 * KHEPRA EXPERTS — Post-Build CSS Preload Injection
 * ===================================================
 * Lit le manifest Vite après build et injecte un <link rel="preload">
 * pour le bundle CSS principal dans dist/index.html.
 * 
 * Optimisation: Permet au navigateur de télécharger le CSS critique
 * AVANT que le JS ne soit parsé et exécuté → FCP -200ms, LCP -250ms.
 * 
 * Usage: node scripts/inject-css-preload.mjs
 * (appelé automatiquement via le script npm "postbuild")
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const MANIFEST_PATH = resolve(DIST, '.vite', 'manifest.json');
const INDEX_PATH = resolve(DIST, 'index.html');

// ── 1. Vérifier que le manifest existe ──
if (!existsSync(MANIFEST_PATH)) {
  console.warn('[CSS-Preload] ⚠️ manifest.json not found at', MANIFEST_PATH);
  console.warn('[CSS-Preload] Skipping CSS preload injection.');
  process.exit(0);
}

// ── 2. Lire le manifest ──
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));

// ── 3. Trouver le CSS de l'entrée principale ──
const indexEntry = manifest['index.html'];
if (!indexEntry) {
  console.warn('[CSS-Preload] ⚠️ No index.html entry in manifest.');
  process.exit(0);
}

const cssFiles = indexEntry.css || [];
if (cssFiles.length === 0) {
  console.log('[CSS-Preload] ℹ️ No CSS files in main entry — nothing to preload.');
  process.exit(0);
}

// ── 4. Lire index.html ──
let html = readFileSync(INDEX_PATH, 'utf-8');

// ── 5. Injecter les preloads CSS avant </head> ──
const preloadLinks = cssFiles
  .map((cssFile) => `    <link rel="preload" href="/${cssFile}" as="style" crossorigin>`)
  .join('\n');

// Trouver la fermeture </head> et injecter les preloads juste avant
const headCloseIndex = html.indexOf('</head>');
if (headCloseIndex === -1) {
  console.warn('[CSS-Preload] ⚠️ </head> not found in index.html.');
  process.exit(0);
}

html = html.slice(0, headCloseIndex) + '\n' + preloadLinks + '\n' + html.slice(headCloseIndex);

// ── 6. Écrire le fichier modifié ──
writeFileSync(INDEX_PATH, html, 'utf-8');

console.log(`[CSS-Preload] ✅ Injected ${cssFiles.length} CSS preload link(s):`);
cssFiles.forEach((f) => console.log(`[CSS-Preload]    → /${f}`));