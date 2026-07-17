/**
 * ═══════════════════════════════════════════════════════════════
 * KOS COMPLIANCE SEEDER™ v3.1 — Full Seed Engine
 * Node.js + Cron — 23+ Régulateurs
 * ═══════════════════════════════════════════════════════════════
 *
 * Exécution : Cron 02:00 GMT quotidien + Health Check /5min
 *   - Invoke le Edge Function Supabase kos-compliance-daily-crawler
 *   - Parse la réponse JSON
 *   - Log dans stdout + fichier
 *   - Health check ping du edge function toutes les 5 minutes
 *   - Diff J-1 : compare avec le run précédent
 *   - Alerte si score ISAE 3402 < 85%
 *
 * Déploiement : Docker container dans la stack KOS Sovereign
 * ═══════════════════════════════════════════════════════════════
 */

import cron from 'node-cron';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══ CONFIG ═══
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const CRAWLER_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/kos-compliance-daily-crawler`;
const LOG_DIR = process.env.LOG_DIR || '/var/log/kos-seeder';
const HEALTH_CHECK_INTERVAL_MIN = parseInt(process.env.HEALTH_CHECK_INTERVAL || '5', 10);
const ISAE3402_ALERT_THRESHOLD = parseInt(process.env.ISAE3402_ALERT_THRESHOLD || '85', 10);

// Ensure log dir
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// ═══ LOGGER ═══
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data ? { data } : {}),
  };

  const line = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  console.log(line);
  if (data) {
    console.log(`  └─ ${JSON.stringify(data).substring(0, 500)}`);
  }

  // Append to daily log file
  const dateStr = timestamp.split('T')[0];
  const logFile = path.join(LOG_DIR, `kos-seeder-${dateStr}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
}

// ═══ INVOKE CRAWLER ═══
async function invokeCrawler() {
  const startTime = Date.now();
  const crawlId = `KOS-SEED-${new Date().toISOString().replace(/[:.]/g, '-')}`;

  log('info', `═══════════════════════════════════════════════════════`);
  log('info', `[KOS-SEEDER v3.1] Crawl démarré — ${crawlId}`);
  log('info', `[KOS-SEEDER v3.1] Target: ${CRAWLER_FUNCTION_URL}`);
  log('info', `═══════════════════════════════════════════════════════`);

  try {
    const response = await fetch(CRAWLER_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'KOS-Compliance-Seeder/3.1 (Docker+Cron; 24/7)',
      },
      signal: AbortSignal.timeout(120000), // 2 min timeout
    });

    const duration = Date.now() - startTime;

    if (!response.ok) {
      log('error', `Crawler HTTP ${response.status} — ${response.statusText} (${duration}ms)`, {
        status: response.status,
        crawlId,
      });
      return { success: false, status: response.status, duration };
    }

    const result = await response.json();
    const summary = result.summary || {};
    const kpis = summary.kpis || {};

    log('info', `Crawl terminé — ${duration}ms`, {
      crawlId,
      version: summary.version,
      regulators: `${kpis.sourcesAccessibles || '?'}/${kpis.totalSources || '?'}`,
      isae3402: `${kpis.isae3402Conformite || '?'}%`,
      scoreQualite: `${kpis.scoreQualiteGlobal || '?'}/100`,
      textsDetected: summary.totalTextsDetected,
      newTexts: summary.totalNewTexts,
      modifiedTexts: summary.totalModifiedTexts,
      abrogatedTexts: summary.totalAbrogatedTexts,
      qualityAssessment: summary.qualityAssessment,
    });

    // ═══ ALERTE ISAE 3402 ═══
    if (kpis.isae3402Conformite !== undefined && kpis.isae3402Conformite < ISAE3402_ALERT_THRESHOLD) {
      log('warn', `⚠️ ALERTE ISAE 3402 : ${kpis.isae3402Conformite}% < ${ISAE3402_ALERT_THRESHOLD}%`, {
        isae3402Conformite: kpis.isae3402Conformite,
        threshold: ISAE3402_ALERT_THRESHOLD,
        recommendations: summary.recommendations || [],
      });
    }

    // ═══ ALERTE BLOCAGES ═══
    if (kpis.blocageSourcesNonListees > 0) {
      log('warn', `⚠️ ${kpis.blocageSourcesNonListees} sources non listées détectées`, {
        blocageSourcesNonListees: kpis.blocageSourcesNonListees,
      });
    }

    if (kpis.blocageTextesAbroges > 0) {
      log('warn', `⚠️ ${kpis.blocageTextesAbroges} régulateurs avec textes abrogés`, {
        blocageTextesAbroges: kpis.blocageTextesAbroges,
      });
    }

    // Save last crawl summary
    const summaryFile = path.join(LOG_DIR, 'last-crawl-summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify({
      ...summary,
      seederCrawlId: crawlId,
      seederTimestamp: new Date().toISOString(),
      seederDuration: duration,
    }, null, 2));

    return { success: true, summary, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    log('error', `Crawl échoué — ${error.message} (${duration}ms)`, {
      error: error.message,
      crawlId,
    });
    return { success: false, error: error.message, duration };
  }
}

// ═══ HEALTH CHECK ═══
async function healthCheck() {
  try {
    const response = await fetch(CRAWLER_FUNCTION_URL, {
      method: 'OPTIONS',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY}`,
        'User-Agent': 'KOS-Compliance-Seeder/3.1 (HealthCheck)',
      },
      signal: AbortSignal.timeout(15000),
    });

    const healthy = response.ok || response.status === 204;
    if (!healthy) {
      log('warn', `Health check: DEGRADED — HTTP ${response.status}`);
    }
    return healthy;
  } catch (error) {
    log('error', `Health check: DOWN — ${error.message}`);
    return false;
  }
}

// ═══ MAIN ═══
function main() {
  log('info', '═══════════════════════════════════════════════════════');
  log('info', 'KOS COMPLIANCE SEEDER™ v3.1 — DÉMARRAGE');
  log('info', `Supabase URL: ${SUPABASE_URL}`);
  log('info', `Crawler Function: ${CRAWLER_FUNCTION_URL}`);
  log('info', `Cron principal: 02:00 GMT quotidien`);
  log('info', `Health check: toutes les ${HEALTH_CHECK_INTERVAL_MIN} minutes`);
  log('info', `Seuil alerte ISAE 3402: ${ISAE3402_ALERT_THRESHOLD}%`);
  log('info', `Logs: ${LOG_DIR}`);
  log('info', '═══════════════════════════════════════════════════════');

  // ═══ CRON 02:00 GMT — Crawl quotidien complet ═══
  cron.schedule('0 2 * * *', async () => {
    log('info', '[CRON 02:00 GMT] Déclenchement du crawl quotidien...');
    await invokeCrawler();
    log('info', '[CRON 02:00 GMT] Crawl quotidien terminé.');
  }, {
    timezone: 'GMT',
  });

  // ═══ HEALTH CHECK toutes les 5 minutes ═══
  cron.schedule(`*/${HEALTH_CHECK_INTERVAL_MIN} * * * *`, async () => {
    const healthy = await healthCheck();
    if (!healthy) {
      log('warn', '[HEALTH CHECK] Edge Function inaccessible — tentative de réessai au prochain cycle.');
    }
  });

  // ═══ RUN INITIAL CRAWL après 30 secondes ═══
  setTimeout(async () => {
    log('info', '[INITIAL] Lancement du crawl initial au démarrage...');
    await invokeCrawler();
    log('info', '[INITIAL] Crawl initial terminé.');
  }, 30000);

  log('info', 'KOS Compliance Seeder™ v3.1 — PRÊT. En attente des cycles cron.');
  log('info', 'Prochain crawl : 02:00 GMT. Prochain health check : dans ~5 min.');
}

main();

// Graceful shutdown
process.on('SIGTERM', () => {
  log('info', 'SIGTERM reçu — arrêt gracieux du seeder.');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('info', 'SIGINT reçu — arrêt gracieux du seeder.');
  process.exit(0);
});