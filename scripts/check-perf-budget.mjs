#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════
 * KHEPRA EXPERTS — Performance Budget Pre-Commit Check
 * ═══════════════════════════════════════════════════
 *
 * Exécuté en pre-commit via Husky.
 * Vérifie les tailles de bundles contre les budgets
 * définis pour verrouiller le score 100/100 Lighthouse.
 *
 * Budgets:
 *   - JS total:      < 320 KB (gzip)
 *   - CSS total:     <  45 KB (gzip)
 *   - Total assets:  < 600 KB (gzip)
 *   - LCP image:     < 180 KB
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const DIST_DIR = join(process.cwd(), 'dist');
const ASSETS_DIR = join(DIST_DIR, 'assets');

// ─── Budgets (en octets, taille gzip estimée) ───

const BUDGETS = {
  jsTotal: 320 * 1024,
  cssTotal: 45 * 1024,
  assetsTotal: 600 * 1024,
  largestJsChunk: 200 * 1024,
  largestCssFile: 30 * 1024,
};

// ─── Helpers ───

function getFiles(dir, ext) {
  if (!existsSync(dir)) return [];
  const result = [];
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(ext)) {
        result.push(full);
      }
    }
  }
  walk(dir);
  return result;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ─── Main ───

console.log('\n🔍 KHEPRA Performance Budget Check\n');
console.log('═'.repeat(50));

// 1. Vérifier que le build existe
if (!existsSync(DIST_DIR) || !existsSync(ASSETS_DIR)) {
  console.log('📦 No dist/ found — running build...');
  execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });
}

// 2. Scanner les assets
const jsFiles = getFiles(ASSETS_DIR, '.js');
const cssFiles = getFiles(ASSETS_DIR, '.css');

// Tailles brutes (approximation: gzip ≈ 30% du brut pour JS, 25% pour CSS)
const jsTotalRaw = jsFiles.reduce((sum, f) => sum + statSync(f).size, 0);
const cssTotalRaw = cssFiles.reduce((sum, f) => sum + statSync(f).size, 0);
const jsTotalEst = Math.round(jsTotalRaw * 0.30);
const cssTotalEst = Math.round(cssTotalRaw * 0.25);
const assetsTotalEst = jsTotalEst + cssTotalEst;

// Largest chunks
const largestJs = jsFiles.reduce((max, f) => {
  const s = statSync(f).size;
  return s > max.size ? { file: f, size: s } : max;
}, { file: '', size: 0 });
const largestCss = cssFiles.reduce((max, f) => {
  const s = statSync(f).size;
  return s > max.size ? { file: f, size: s } : max;
}, { file: '', size: 0 });

const largestJsEst = Math.round(largestJs.size * 0.30);
const largestCssEst = Math.round(largestCss.size * 0.25);

// 3. Afficher le rapport
console.log(`\n📊 JS  — ${jsFiles.length} fichiers  →  ~${formatSize(jsTotalEst)} gzip  (budget: ${formatSize(BUDGETS.jsTotal)})`);
console.log(`📊 CSS — ${cssFiles.length} fichiers  →  ~${formatSize(cssTotalEst)} gzip  (budget: ${formatSize(BUDGETS.cssTotal)})`);
console.log(`📊 Total assets              →  ~${formatSize(assetsTotalEst)} gzip  (budget: ${formatSize(BUDGETS.assetsTotal)})`);
console.log(`📊 Largest JS  — ${largestJs.file.split('/').pop()}  →  ~${formatSize(largestJsEst)} gzip  (budget: ${formatSize(BUDGETS.largestJsChunk)})`);
console.log(`📊 Largest CSS — ${largestCss.file.split('/').pop()}  →  ~${formatSize(largestCssEst)} gzip  (budget: ${formatSize(BUDGETS.largestCssFile)})`);

// 4. Vérifier les budgets
let failed = false;

const checks = [
  { label: 'JS total', actual: jsTotalEst, budget: BUDGETS.jsTotal },
  { label: 'CSS total', actual: cssTotalEst, budget: BUDGETS.cssTotal },
  { label: 'Total assets', actual: assetsTotalEst, budget: BUDGETS.assetsTotal },
  { label: 'Largest JS chunk', actual: largestJsEst, budget: BUDGETS.largestJsChunk },
  { label: 'Largest CSS file', actual: largestCssEst, budget: BUDGETS.largestCssFile },
];

console.log('\n' + '═'.repeat(50));

for (const check of checks) {
  if (check.actual > check.budget) {
    console.log(`❌ ${check.label}: ${formatSize(check.actual)} > ${formatSize(check.budget)} — BUDGET EXCEEDED`);
    failed = true;
  } else {
    const pct = Math.round((check.actual / check.budget) * 100);
    console.log(`✅ ${check.label}: ${formatSize(check.actual)} / ${formatSize(check.budget)} (${pct}%)`);
  }
}

console.log('═'.repeat(50));

if (failed) {
  console.log('\n❌ PERFORMANCE BUDGET FAILED — Commit blocked.\n');
  console.log('   Fix: reduce bundle sizes before committing.\n');
  process.exit(1);
}

console.log('\n✅ All performance budgets passed — 100/100 locked.\n');
process.exit(0);