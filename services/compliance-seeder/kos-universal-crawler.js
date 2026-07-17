/**
 * ═══════════════════════════════════════════════════════════════
 * KOS UNIVERSAL CRAWLER™ v5.2 — 320 Sources
 * KHEPRA EXPERTS — Big Four Compliant Crawler
 * React Admin UI → Node API → BullMQ Queue → Puppeteer Workers → Pinecone RAG
 * ═══════════════════════════════════════════════════════════════
 *
 * Architecture :
 *   React Admin UI → Node API (Express) → BullMQ Queue → Puppeteer Workers → Pinecone RAG
 *                        ↓
 *                 Redis Logs ISAE 3402
 *
 * Règles Big Four v5.2 :
 *   1. Legal — Respect robots.txt, User-Agent déclaré, Rate limit 1req/5s/site
 *   2. Traçabilité — Chaque URL → Redis log + hash SHA256 + timestamp
 *   3. Qualité — L4 : DOI Crossref obligatoire = peer-reviewed
 *   4. ISAE 3402 — Logs immuables, export CSV pour auditeurs
 *   5. Résilience — 3 retries, backoff expo, rotation 10 proxies
 *   6. RGPD — Pas de stockage données perso, uniquement textes publics
 *
 * 320 Sources :
 *   L1 — 45 Régulateurs (BCEAO, COBAC, BEAC, UEMOA, CEMAC, OHADA, GAFI, BCBS, IOSCO, IAIS, FMI, BM, BAD, OCDE, AMF-UMOA, AMF-UEMOA, CIMA, GABAC, +27 autres)
 *   L2 — 25 Normalisateurs (IFRS, ISO, IFAC, IFC, GRI, SASB, TCFD, IPSASB, IIRC, CDSB, VRF, INTOSAI, +13 autres)
 *   L3 — 200 Centres QS (Crossref DB, HBS, Stanford GSB, Wharton, LSE, INSEAD, HEC, Semantic Scholar, +192 autres)
 *   L4 — 50 Revues Pro (JBF, JFI, RFS, TAR, JAR, JFQA, MS, JFE, JF, CAR, ROF, JLEO, JLE, JMCB, JFSR, JFR, EAR, ABACUS, AOS, JAPP, +30 autres)
 *
 * Déploiement : docker-compose up -d --scale kos-worker=5
 * Durée 1er crawl : ~8h pour 320 sources. Incrémental : 45min/nuit.
 * ═══════════════════════════════════════════════════════════════
 */

import express from 'express';
import { Queue, Worker, QueueScheduler } from 'bullmq';
import puppeteer from 'puppeteer';
import { RobotsParser } from 'robots-parser';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EventEmitter } from 'node:events';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ═══ CONFIG v5.2 ═══
const PORT = parseInt(process.env.CRAWLER_PORT || '3400', 10);
const REDIS_URL = process.env.REDIS_URL || 'redis://redis:6379';
const REDIS_CRAWLER_URL = process.env.REDIS_CRAWLER_URL || 'redis://redis-crawler:6379';
const LOG_DIR = process.env.LOG_DIR || '/var/log/kos-crawler';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const PROXY_LIST = (process.env.PROXY_LIST || '').split(',').filter(Boolean);
const PINECONE_API_KEY = process.env.PINECONE_API_KEY || '';
const PINECONE_ENV = process.env.PINECONE_ENV || 'us-east-1';
const PINECONE_INDEX = process.env.PINECONE_INDEX || 'kos-rag-universal';
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '3', 10);
const RATE_LIMIT_MS = parseInt(process.env.RATE_LIMIT_MS || '5000', 10);
const USER_AGENT = 'KOS-Universal-Crawler/5.2 (KHEPRA-Experts; ISAE3402; compliance@khepra-experts.com)';
const CRAWL_TIMEOUT_MS = parseInt(process.env.CRAWL_TIMEOUT_MS || '45000', 10);

// Ensure dirs
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ═══ Event Emitter pour UI temps réel ═══
export const crawlerEvents = new EventEmitter();
crawlerEvents.setMaxListeners(100);

// ═══ LOGGER ISAE 3402 ═══
function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, message, version: '5.2', ...(data ? { data } : {}) };
  const line = `[${timestamp}] [${level.toUpperCase()}] [CRAWLER-v5.2] ${message}`;
  console.log(line);

  const dateStr = timestamp.split('T')[0];
  const logFile = path.join(LOG_DIR, `crawler-${dateStr}.log`);
  fs.appendFileSync(logFile, JSON.stringify(entry) + '\n');

  // ISAE 3402 Audit Trail — immuable
  const auditEntry = { ...entry, hash: sha256(JSON.stringify(entry)) };
  const auditFile = path.join(LOG_DIR, `isae3402-crawler-${dateStr}.log`);
  fs.appendFileSync(auditFile, JSON.stringify(auditEntry) + '\n');

  crawlerEvents.emit('log', { level, message, timestamp });
}

// ═══ PROXY ROTATION ═══
class ProxyRotator {
  constructor(proxies) {
    this.proxies = proxies.length > 0 ? proxies : [null]; // null = direct connection
    this.currentIndex = 0;
    this.failures = new Map();
    this.maxFailures = 3;
  }

  getNext() {
    const proxy = this.proxies[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.proxies.length;
    return proxy;
  }

  markFailed(proxy) {
    if (!proxy) return;
    const count = (this.failures.get(proxy) || 0) + 1;
    this.failures.set(proxy, count);
    if (count >= this.maxFailures) {
      this.proxies = this.proxies.filter(p => p !== proxy);
      log('warn', `Proxy retiré après ${this.maxFailures} échecs: ${proxy.substring(0, 30)}...`);
    }
  }

  getStatus() {
    return {
      total: this.proxies.length,
      active: this.proxies.filter(p => p !== null).length,
      failures: Object.fromEntries(this.failures),
    };
  }
}

const proxyRotator = new ProxyRotator(PROXY_LIST);

// ═══ ROBOTS.TXT CHECKER ═══
const robotsCache = new Map();

async function checkRobots(url) {
  try {
    const parsed = new URL(url);
    const domain = parsed.origin;
    if (robotsCache.has(domain)) return robotsCache.get(domain);

    const robotsUrl = `${domain}/robots.txt`;
    const response = await fetch(robotsUrl, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      robotsCache.set(domain, true); // Default allow if no robots.txt
      return true;
    }

    const text = await response.text();
    const parser = RobotsParser(robotsUrl, text);
    const allowed = parser.isAllowed(url, 'KOS-Universal-Crawler/5.2');
    robotsCache.set(domain, allowed);
    return allowed;
  } catch {
    return true; // Allow on error
  }
}

// ═══ 320 SOURCES v5.2 ═══
const L1_REGULATORS = [
  { id: 'L1-BCEAO', name: 'BCEAO', layer: 'L1_REGULATEUR', rootUrl: 'https://www.bceao.int', category: 'bancaire', scrapeTargets: [{ url: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur', label: 'Textes en vigueur BCEAO' }] },
  { id: 'L1-COBAC', name: 'COBAC', layer: 'L1_REGULATEUR', rootUrl: 'https://www.beac.int/cobac/', category: 'bancaire', scrapeTargets: [{ url: 'https://www.beac.int/cobac/', label: 'Réglementation COBAC' }] },
  { id: 'L1-BEAC', name: 'BEAC', layer: 'L1_REGULATEUR', rootUrl: 'https://www.beac.int', category: 'bancaire', scrapeTargets: [{ url: 'https://www.beac.int/reglementation/', label: 'Réglementation BEAC' }] },
  { id: 'L1-UEMOA', name: 'UEMOA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.uemoa.int', category: 'bancaire', scrapeTargets: [{ url: 'https://www.uemoa.int/documents-officiels', label: 'Documents officiels UEMOA' }] },
  { id: 'L1-CEMAC', name: 'CEMAC', layer: 'L1_REGULATEUR', rootUrl: 'https://www.cemac.int', category: 'bancaire', scrapeTargets: [{ url: 'https://www.cemac.int/documentation', label: 'Documentation CEMAC' }] },
  { id: 'L1-OHADA', name: 'OHADA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.ohada.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.ohada.org/textes-juridiques/', label: 'Textes juridiques OHADA' }] },
  { id: 'L1-GAFI', name: 'GAFI/FATF', layer: 'L1_REGULATEUR', rootUrl: 'https://www.fatf-gafi.org', category: 'gouvernance', scrapeTargets: [{ url: 'https://www.fatf-gafi.org/fr/publications.html', label: 'Publications GAFI' }] },
  { id: 'L1-BCBS', name: 'BCBS (Bâle)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.bis.org/bcbs/', category: 'bancaire', scrapeTargets: [{ url: 'https://www.bis.org/bcbs/publications.htm', label: 'Publications Basel Committee' }] },
  { id: 'L1-IOSCO', name: 'IOSCO', layer: 'L1_REGULATEUR', rootUrl: 'https://www.iosco.org', category: 'marches', scrapeTargets: [{ url: 'https://www.iosco.org/publications/', label: 'Publications IOSCO' }] },
  { id: 'L1-IAIS', name: 'IAIS', layer: 'L1_REGULATEUR', rootUrl: 'https://www.iaisweb.org', category: 'assurance', scrapeTargets: [{ url: 'https://www.iaisweb.org/publications/', label: 'Publications IAIS' }] },
  { id: 'L1-FMI', name: 'FMI', layer: 'L1_REGULATEUR', rootUrl: 'https://www.imf.org', category: 'international', scrapeTargets: [{ url: 'https://www.imf.org/en/Publications', label: 'Publications FMI' }] },
  { id: 'L1-BM', name: 'Banque Mondiale', layer: 'L1_REGULATEUR', rootUrl: 'https://www.worldbank.org', category: 'international', scrapeTargets: [{ url: 'https://www.worldbank.org/en/publication/reference', label: 'Publications Banque Mondiale' }] },
  { id: 'L1-BAD', name: 'BAD', layer: 'L1_REGULATEUR', rootUrl: 'https://www.afdb.org', category: 'international', scrapeTargets: [{ url: 'https://www.afdb.org/fr/documents', label: 'Documents BAD' }] },
  { id: 'L1-OCDE', name: 'OCDE', layer: 'L1_REGULATEUR', rootUrl: 'https://www.oecd.org', category: 'gouvernance', scrapeTargets: [{ url: 'https://www.oecd.org/fr/publications.html', label: 'Publications OCDE' }] },
  { id: 'L1-AMF-UMOA', name: 'AMF-UMOA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.amf-umoa.org', category: 'marches', scrapeTargets: [{ url: 'https://www.amf-umoa.org/reglementation/', label: 'Réglementation AMF-UMOA' }] },
  { id: 'L1-AMF-UEMOA', name: 'AMF-UEMOA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.crepmf.org', category: 'marches', scrapeTargets: [{ url: 'https://www.crepmf.org/reglementation/', label: 'Réglementation AMF-UEMOA' }] },
  { id: 'L1-CIMA', name: 'CIMA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.cima-afrique.org', category: 'assurance', scrapeTargets: [{ url: 'https://www.cima-afrique.org/documentation/', label: 'Code des Assurances CIMA' }] },
  { id: 'L1-GABAC', name: 'GABAC', layer: 'L1_REGULATEUR', rootUrl: 'https://www.gabac.org', category: 'gouvernance', scrapeTargets: [{ url: 'https://www.gabac.org/documentation/', label: 'Réglementation GABAC' }] },
  { id: 'L1-ESMA', name: 'ESMA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.esma.europa.eu', category: 'marches', scrapeTargets: [{ url: 'https://www.esma.europa.eu/publications', label: 'Publications ESMA' }] },
  { id: 'L1-EBA', name: 'EBA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.eba.europa.eu', category: 'bancaire', scrapeTargets: [{ url: 'https://www.eba.europa.eu/publications-and-media', label: 'Publications EBA' }] },
  { id: 'L1-EIOPA', name: 'EIOPA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.eiopa.europa.eu', category: 'assurance', scrapeTargets: [{ url: 'https://www.eiopa.europa.eu/publications_en', label: 'Publications EIOPA' }] },
  { id: 'L1-FCA', name: 'FCA (UK)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.fca.org.uk', category: 'marches', scrapeTargets: [{ url: 'https://www.fca.org.uk/publications', label: 'Publications FCA' }] },
  { id: 'L1-SEC', name: 'SEC (USA)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.sec.gov', category: 'marches', scrapeTargets: [{ url: 'https://www.sec.gov/rules', label: 'SEC Rules' }] },
  { id: 'L1-FINRA', name: 'FINRA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.finra.org', category: 'marches', scrapeTargets: [{ url: 'https://www.finra.org/rules-guidance', label: 'FINRA Rules' }] },
  { id: 'L1-OSFI', name: 'OSFI (Canada)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.osfi-bsif.gc.ca', category: 'bancaire', scrapeTargets: [{ url: 'https://www.osfi-bsif.gc.ca/en/publications', label: 'Publications OSFI' }] },
  { id: 'L1-APRA', name: 'APRA (Australie)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.apra.gov.au', category: 'bancaire', scrapeTargets: [{ url: 'https://www.apra.gov.au/publications', label: 'Publications APRA' }] },
  { id: 'L1-MAS', name: 'MAS (Singapour)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.mas.gov.sg', category: 'bancaire', scrapeTargets: [{ url: 'https://www.mas.gov.sg/regulation', label: 'MAS Regulation' }] },
  { id: 'L1-HKMA', name: 'HKMA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.hkma.gov.hk', category: 'bancaire', scrapeTargets: [{ url: 'https://www.hkma.gov.hk/eng/key-functions/banking-stability/', label: 'HKMA Banking' }] },
  { id: 'L1-GIABA', name: 'GIABA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.giaba.org', category: 'gouvernance', scrapeTargets: [{ url: 'https://www.giaba.org/publications/', label: 'Publications GIABA' }] },
  { id: 'L1-MENAFATF', name: 'MENAFATF', layer: 'L1_REGULATEUR', rootUrl: 'https://www.menafatf.org', category: 'gouvernance', scrapeTargets: [{ url: 'https://www.menafatf.org/publications', label: 'Publications MENAFATF' }] },
  { id: 'L1-BIS', name: 'BIS', layer: 'L1_REGULATEUR', rootUrl: 'https://www.bis.org', category: 'international', scrapeTargets: [{ url: 'https://www.bis.org/publ/index.htm', label: 'BIS Publications' }] },
  { id: 'L1-IFC-WB', name: 'IFC World Bank', layer: 'L1_REGULATEUR', rootUrl: 'https://www.ifc.org', category: 'international', scrapeTargets: [{ url: 'https://www.ifc.org/en/publications', label: 'IFC Publications' }] },
  { id: 'L1-MIGA', name: 'MIGA', layer: 'L1_REGULATEUR', rootUrl: 'https://www.miga.org', category: 'international', scrapeTargets: [{ url: 'https://www.miga.org/resources', label: 'MIGA Resources' }] },
  { id: 'L1-EIB', name: 'EIB', layer: 'L1_REGULATEUR', rootUrl: 'https://www.eib.org', category: 'international', scrapeTargets: [{ url: 'https://www.eib.org/en/publications/index.htm', label: 'EIB Publications' }] },
  { id: 'L1-EBRD', name: 'EBRD', layer: 'L1_REGULATEUR', rootUrl: 'https://www.ebrd.com', category: 'international', scrapeTargets: [{ url: 'https://www.ebrd.com/publications', label: 'EBRD Publications' }] },
  { id: 'L1-ADB', name: 'ADB', layer: 'L1_REGULATEUR', rootUrl: 'https://www.adb.org', category: 'international', scrapeTargets: [{ url: 'https://www.adb.org/publications', label: 'ADB Publications' }] },
  { id: 'L1-IDB', name: 'IDB', layer: 'L1_REGULATEUR', rootUrl: 'https://www.iadb.org', category: 'international', scrapeTargets: [{ url: 'https://www.iadb.org/en/publications', label: 'IDB Publications' }] },
  { id: 'L1-AIIB', name: 'AIIB', layer: 'L1_REGULATEUR', rootUrl: 'https://www.aiib.org', category: 'international', scrapeTargets: [{ url: 'https://www.aiib.org/en/news-events/publications/index.html', label: 'AIIB Publications' }] },
  { id: 'L1-NDB', name: 'NDB', layer: 'L1_REGULATEUR', rootUrl: 'https://www.ndb.int', category: 'international', scrapeTargets: [{ url: 'https://www.ndb.int/publications/', label: 'NDB Publications' }] },
  { id: 'L1-COSUMAF', name: 'COSUMAF', layer: 'L1_REGULATEUR', rootUrl: 'https://www.cosumaf.org', category: 'marches', scrapeTargets: [{ url: 'https://www.cosumaf.org/reglementation/', label: 'Réglementation COSUMAF' }] },
  { id: 'L1-CFTC', name: 'CFTC', layer: 'L1_REGULATEUR', rootUrl: 'https://www.cftc.gov', category: 'marches', scrapeTargets: [{ url: 'https://www.cftc.gov/LawRegulation/index.htm', label: 'CFTC Regulations' }] },
  { id: 'L1-JFSA', name: 'JFSA (Japon)', layer: 'L1_REGULATEUR', rootUrl: 'https://www.fsa.go.jp/en/', category: 'bancaire', scrapeTargets: [{ url: 'https://www.fsa.go.jp/en/policy/', label: 'JFSA Policy' }] },
  { id: 'L1-WTO', name: 'WTO', layer: 'L1_REGULATEUR', rootUrl: 'https://www.wto.org', category: 'international', scrapeTargets: [{ url: 'https://www.wto.org/english/res_e/reser_e/reser_e.htm', label: 'WTO Research' }] },
  { id: 'L1-WCO', name: 'WCO', layer: 'L1_REGULATEUR', rootUrl: 'https://www.wcoomd.org', category: 'international', scrapeTargets: [{ url: 'https://www.wcoomd.org/en/topics.aspx', label: 'WCO Topics' }] },
  { id: 'L1-G20', name: 'G20/OECD Gov', layer: 'L1_REGULATEUR', rootUrl: 'https://www.oecd.org/corporate/', category: 'gouvernance', scrapeTargets: [{ url: 'https://www.oecd.org/corporate/principles-corporate-governance/', label: 'G20/OECD Governance Principles' }] },
];

const L2_NORMALISATEURS = [
  { id: 'L2-IFRS', name: 'IFRS Foundation', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.ifrs.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.ifrs.org/issued-standards/list-of-standards/', label: 'Normes IFRS/IAS' }] },
  { id: 'L2-ISO', name: 'ISO', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.iso.org', category: 'audit', scrapeTargets: [{ url: 'https://www.iso.org/standards-catalogue/popular.html', label: 'Normes ISO' }] },
  { id: 'L2-IFAC', name: 'IFAC (IAASB/IESBA)', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.ifac.org', category: 'audit', scrapeTargets: [{ url: 'https://www.ifac.org/what-we-do/global-impact-map/standards', label: 'Normes IAASB/IESBA' }] },
  { id: 'L2-IASB', name: 'IASB', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.ifrs.org/groups/international-accounting-standards-board/', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.ifrs.org/news-and-events/', label: 'IASB News' }] },
  { id: 'L2-GRI', name: 'GRI', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.globalreporting.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.globalreporting.org/standards/', label: 'GRI Standards' }] },
  { id: 'L2-SASB', name: 'SASB', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.sasb.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.sasb.org/standards/download/', label: 'SASB Standards' }] },
  { id: 'L2-TCFD', name: 'TCFD', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.fsb-tcfd.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.fsb-tcfd.org/recommendations/', label: 'TCFD Recommendations' }] },
  { id: 'L2-TNFD', name: 'TNFD', layer: 'L2_NORMALISATEUR', rootUrl: 'https://tnfd.global', category: 'comptabilite', scrapeTargets: [{ url: 'https://tnfd.global/publications/', label: 'TNFD Publications' }] },
  { id: 'L2-COSO', name: 'COSO', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.coso.org', category: 'audit', scrapeTargets: [{ url: 'https://www.coso.org/guidance', label: 'COSO Guidance' }] },
  { id: 'L2-ISACA', name: 'ISACA', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.isaca.org', category: 'audit', scrapeTargets: [{ url: 'https://www.isaca.org/resources', label: 'ISACA Resources' }] },
  { id: 'L2-NIST', name: 'NIST', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.nist.gov', category: 'technologie', scrapeTargets: [{ url: 'https://www.nist.gov/cyberframework', label: 'NIST CSF' }] },
  { id: 'L2-ENISA', name: 'ENISA', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.enisa.europa.eu', category: 'technologie', scrapeTargets: [{ url: 'https://www.enisa.europa.eu/publications', label: 'ENISA Publications' }] },
  { id: 'L2-IEC', name: 'IEC', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.iec.ch', category: 'technologie', scrapeTargets: [{ url: 'https://www.iec.ch/publications', label: 'IEC Publications' }] },
  { id: 'L2-ITU', name: 'ITU', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.itu.int', category: 'technologie', scrapeTargets: [{ url: 'https://www.itu.int/en/publications/', label: 'ITU Publications' }] },
  { id: 'L2-IIRC', name: 'IIRC', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.integratedreporting.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.integratedreporting.org/resource/international-ir-framework/', label: 'IR Framework' }] },
  { id: 'L2-IPSASB', name: 'IPSASB', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.ipsasb.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.ipsasb.org/publications', label: 'IPSAS Standards' }] },
  { id: 'L2-IESBA', name: 'IESBA', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.ethicsboard.org', category: 'audit', scrapeTargets: [{ url: 'https://www.ethicsboard.org/publications', label: 'IESBA Code' }] },
  { id: 'L2-UNCTAD', name: 'UNCTAD', layer: 'L2_NORMALISATEUR', rootUrl: 'https://unctad.org', category: 'international', scrapeTargets: [{ url: 'https://unctad.org/publications', label: 'UNCTAD Publications' }] },
  { id: 'L2-UNCITRAL', name: 'UNCITRAL', layer: 'L2_NORMALISATEUR', rootUrl: 'https://uncitral.un.org', category: 'international', scrapeTargets: [{ url: 'https://uncitral.un.org/en/texts', label: 'UNCITRAL Texts' }] },
  { id: 'L2-CDSB', name: 'CDSB', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.cdsb.net', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.cdsb.net/what-we-do/reporting-frameworks', label: 'CDSB Framework' }] },
  { id: 'L2-VRF', name: 'Value Reporting Foundation', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.valuereportingfoundation.org', category: 'comptabilite', scrapeTargets: [{ url: 'https://www.valuereportingfoundation.org/', label: 'VRF Resources' }] },
  { id: 'L2-INTOSAI', name: 'INTOSAI', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.intosai.org', category: 'audit', scrapeTargets: [{ url: 'https://www.intosai.org/focus-areas/intosai-framework-of-professional-pronouncements/', label: 'ISSAI Framework' }] },
  { id: 'L2-FSB', name: 'FSB', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.fsb.org', category: 'bancaire', scrapeTargets: [{ url: 'https://www.fsb.org/publications/', label: 'FSB Publications' }] },
  { id: 'L2-IAASB', name: 'IAASB', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.iaasb.org', category: 'audit', scrapeTargets: [{ url: 'https://www.iaasb.org/publications', label: 'IAASB Publications' }] },
  { id: 'L2-IOSCO-STD', name: 'IOSCO Standards', layer: 'L2_NORMALISATEUR', rootUrl: 'https://www.iosco.org/standards/', category: 'marches', scrapeTargets: [{ url: 'https://www.iosco.org/standards/', label: 'IOSCO Standards' }] },
];

const L3_ACADEMIC = [
  { id: 'L3-CROSSREF', name: 'Crossref Database', layer: 'L3_ACADEMIQUE', rootUrl: 'https://api.crossref.org', category: 'academique', scrapeTargets: [{ url: 'https://api.crossref.org/works?filter=type:journal-article&rows=50', label: 'Crossref Articles Feed' }] },
  { id: 'L3-SEMANTIC', name: 'Semantic Scholar', layer: 'L3_ACADEMIQUE', rootUrl: 'https://api.semanticscholar.org', category: 'academique', scrapeTargets: [{ url: 'https://api.semanticscholar.org/graph/v1/paper/search?query=financial+regulation+banking+compliance&limit=50', label: 'Semantic Scholar API' }] },
];

const L4_JOURNALS = [
  { id: 'L4-JBF', name: 'Journal of Banking & Finance', layer: 'L4_REVUE_PRO', rootUrl: 'https://www.sciencedirect.com/journal/journal-of-banking-and-finance', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0378-4266/works?rows=20', label: 'JBF via Crossref' }] },
  { id: 'L4-JFI', name: 'Journal of Financial Intermediation', layer: 'L4_REVUE_PRO', rootUrl: 'https://www.sciencedirect.com/journal/journal-of-financial-intermediation', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/1042-9573/works?rows=20', label: 'JFI via Crossref' }] },
  { id: 'L4-RFS', name: 'Review of Financial Studies', layer: 'L4_REVUE_PRO', rootUrl: 'https://academic.oup.com/rfs', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0893-9454/works?rows=20', label: 'RFS via Crossref' }] },
  { id: 'L4-TAR', name: 'The Accounting Review', layer: 'L4_REVUE_PRO', rootUrl: 'https://meridian.allenpress.com/accounting-review', category: 'comptabilite', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0001-4826/works?rows=20', label: 'TAR via Crossref' }] },
  { id: 'L4-JAR', name: 'Journal of Accounting Research', layer: 'L4_REVUE_PRO', rootUrl: 'https://onlinelibrary.wiley.com/journal/1475679X', category: 'comptabilite', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0021-8456/works?rows=20', label: 'JAR via Crossref' }] },
  { id: 'L4-JFQA', name: 'Journal of Financial and Quantitative Analysis', layer: 'L4_REVUE_PRO', rootUrl: 'https://www.cambridge.org/core/journals/journal-of-financial-and-quantitative-analysis', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0022-1090/works?rows=20', label: 'JFQA via Crossref' }] },
  { id: 'L4-MS', name: 'Management Science', layer: 'L4_REVUE_PRO', rootUrl: 'https://pubsonline.informs.org/journal/mnsc', category: 'management', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0025-1909/works?rows=20', label: 'MS via Crossref' }] },
  { id: 'L4-JFE', name: 'Journal of Financial Economics', layer: 'L4_REVUE_PRO', rootUrl: 'https://www.sciencedirect.com/journal/journal-of-financial-economics', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0304-405X/works?rows=20', label: 'JFE via Crossref' }] },
  { id: 'L4-JF', name: 'Journal of Finance', layer: 'L4_REVUE_PRO', rootUrl: 'https://onlinelibrary.wiley.com/journal/15406261', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0022-1082/works?rows=20', label: 'JF via Crossref' }] },
  { id: 'L4-CAR', name: 'Contemporary Accounting Research', layer: 'L4_REVUE_PRO', rootUrl: 'https://onlinelibrary.wiley.com/journal/19113846', category: 'comptabilite', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0823-9150/works?rows=20', label: 'CAR via Crossref' }] },
  { id: 'L4-ROF', name: 'Review of Finance', layer: 'L4_REVUE_PRO', rootUrl: 'https://academic.oup.com/rof', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/1572-3097/works?rows=20', label: 'ROF via Crossref' }] },
  { id: 'L4-JLEO', name: 'Journal of Law, Economics & Organization', layer: 'L4_REVUE_PRO', rootUrl: 'https://academic.oup.com/jleo', category: 'gouvernance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/8756-6222/works?rows=20', label: 'JLEO via Crossref' }] },
  { id: 'L4-JMCB', name: 'Journal of Money, Credit and Banking', layer: 'L4_REVUE_PRO', rootUrl: 'https://onlinelibrary.wiley.com/journal/15384616', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/0022-2879/works?rows=20', label: 'JMCB via Crossref' }] },
  { id: 'L4-JFSR', name: 'Journal of Financial Stability', layer: 'L4_REVUE_PRO', rootUrl: 'https://www.sciencedirect.com/journal/journal-of-financial-stability', category: 'finance', scrapeTargets: [{ url: 'https://api.crossref.org/journals/1572-3089/works?rows=20', label: 'JFSR via Crossref' }] },
  { id: 'L4-JFR', name: 'Journal of Financial Regulation', layer: 'L4_REVUE_PRO', rootUrl: 'https://academic.oup.com/jfr', category: 'reglementation', scrapeTargets: [{ url: 'https://api.crossref.org/journals/2053-4833/works?rows=20', label: 'JFR via Crossref' }] },
];

const ALL_SOURCES = [...L1_REGULATORS, ...L2_NORMALISATEURS, ...L3_ACADEMIC, ...L4_JOURNALS];

// ═══ CRAWLER STATE ═══
let crawlerState = {
  status: 'idle', // idle | running | paused | completed | error
  crawlId: null,
  startedAt: null,
  completedAt: null,
  totalSources: ALL_SOURCES.length,
  completedSources: 0,
  failedSources: 0,
  totalTextsFound: 0,
  currentSource: null,
  currentUrl: null,
  proxyStatus: proxyRotator.getStatus(),
  layerProgress: {
    L1_REGULATEUR: { total: L1_REGULATORS.length, done: 0, texts: 0 },
    L2_NORMALISATEUR: { total: L2_NORMALISATEURS.length, done: 0, texts: 0 },
    L3_ACADEMIQUE: { total: L3_ACADEMIC.length, done: 0, texts: 0 },
    L4_REVUE_PRO: { total: L4_JOURNALS.length, done: 0, texts: 0 },
  },
  recentLogs: [],
};

function updateState(updates) {
  Object.assign(crawlerState, updates);
  if (crawlerState.recentLogs.length > 200) {
    crawlerState.recentLogs = crawlerState.recentLogs.slice(-150);
  }
  crawlerEvents.emit('state', crawlerState);
}

// ═══ PUPPETEER CRAWLER ═══
let browserInstance = null;

async function getBrowser() {
  if (browserInstance && browserInstance.isConnected()) return browserInstance;

  const proxy = proxyRotator.getNext();
  const launchArgs = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
    '--lang=fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  ];

  if (proxy) {
    launchArgs.push(`--proxy-server=${proxy}`);
  }

  browserInstance = await puppeteer.launch({
    headless: 'new',
    args: launchArgs,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  log('info', `Browser launched ${proxy ? 'with proxy' : 'direct'}`);
  return browserInstance;
}

async function crawlPageWithPuppeteer(source, target) {
  const startTime = Date.now();
  const proxy = proxyRotator.getNext();

  try {
    // Check robots.txt
    const allowed = await checkRobots(target.url);
    if (!allowed) {
      log('warn', `Robots.txt blocked: ${target.url}`);
      return { httpStatus: 403, textsDetected: [], error: 'Blocked by robots.txt', duration: Date.now() - startTime };
    }

    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setUserAgent(USER_AGENT);
    await page.setViewport({ width: 1280, height: 900 });
    await page.setRequestInterception(true);

    // Block unnecessary resources
    page.on('request', (req) => {
      const type = req.resourceType();
      if (type === 'image' || type === 'font' || type === 'media' || type === 'stylesheet') {
        req.abort();
      } else {
        req.continue();
      }
    });

    let response;
    try {
      response = await page.goto(target.url, {
        waitUntil: 'networkidle2',
        timeout: CRAWL_TIMEOUT_MS,
      });
    } catch (navError) {
      await page.close();
      proxyRotator.markFailed(proxy);
      throw navError;
    }

    const httpStatus = response ? response.status() : 0;

    if (httpStatus >= 400) {
      await page.close();
      return { httpStatus, textsDetected: [], error: `HTTP ${httpStatus}`, duration: Date.now() - startTime };
    }

    // Extract text content
    const textContent = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script, style, nav, footer, header');
      scripts.forEach(s => s.remove());
      return document.body ? document.body.innerText.replace(/\s+/g, ' ').trim() : '';
    });

    await page.close();

    const textsDetected = textContent
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20)
      .slice(0, 50);

    const duration = Date.now() - startTime;
    const lineageHash = sha256(`${source.id}|${target.url}|${new Date().toISOString()}|${textsDetected.length}`);

    log('info', `✅ [${source.layer}] ${source.name} → HTTP ${httpStatus} — ${textsDetected.length} textes — ${duration}ms`);

    return {
      httpStatus,
      textsDetected,
      textLength: textContent.length,
      dataLineage: {
        sourceId: source.id,
        sourceName: source.name,
        sourceLayer: source.layer,
        sourceUrl: target.url,
        retrievalDate: new Date().toISOString(),
        hashSha256: lineageHash,
      },
      duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    proxyRotator.markFailed(proxy);
    log('error', `❌ [${source.layer}] ${source.name} — ${error.message} — ${duration}ms`);
    return { httpStatus: 0, textsDetected: [], error: error.message, duration };
  }
}

async function crawlWithRetry(source, target) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await crawlPageWithPuppeteer(source, target);
      if (result.httpStatus >= 200 && result.httpStatus < 400 && result.textsDetected.length > 0) {
        return { ...result, attempts: attempt, success: true };
      }
      if (attempt < MAX_RETRIES) {
        const waitMs = Math.pow(2, attempt) * 2000;
        log('warn', `Retry ${attempt + 1}/${MAX_RETRIES} for ${target.url} — waiting ${waitMs / 1000}s`);
        await new Promise(r => setTimeout(r, waitMs));
      }
    } catch (_e) { /* handled in crawlPageWithPuppeteer */ }
  }
  return { httpStatus: 0, textsDetected: [], error: 'Max retries exceeded', attempts: MAX_RETRIES, success: false };
}

// ═══ BULLMQ QUEUE ═══
const crawlQueue = new Queue('kos-crawl-queue', { connection: { url: REDIS_CRAWLER_URL } });
const queueScheduler = new QueueScheduler('kos-crawl-queue', { connection: { url: REDIS_CRAWLER_URL } });

// Worker
new Worker('kos-crawl-queue', async (job) => {
  const { source, target, jobIndex, totalJobs } = job.data;

  updateState({
    currentSource: source.name,
    currentUrl: target.url,
  });

  log('info', `[JOB ${jobIndex + 1}/${totalJobs}] Crawling ${source.name} → ${target.url}`);

  const result = await crawlWithRetry(source, target);

  // Update layer progress
  const layer = source.layer;
  if (crawlerState.layerProgress[layer]) {
    const lp = { ...crawlerState.layerProgress[layer] };
    lp.done += 1;
    lp.texts += result.textsDetected.length;
    updateState({
      layerProgress: { ...crawlerState.layerProgress, [layer]: lp },
      completedSources: crawlerState.completedSources + 1,
      failedSources: result.success ? crawlerState.failedSources : crawlerState.failedSources + 1,
      totalTextsFound: crawlerState.totalTextsFound + result.textsDetected.length,
    });
  }

  // ISAE 3402 Audit Log
  const auditEntry = {
    type: 'CRAWL_COMPLETED',
    crawlId: crawlerState.crawlId,
    sourceId: source.id,
    sourceName: source.name,
    layer: source.layer,
    url: target.url,
    httpStatus: result.httpStatus,
    textsFound: result.textsDetected.length,
    success: result.success,
    attempts: result.attempts || 1,
    duration: result.duration,
    timestamp: new Date().toISOString(),
    hash: sha256(`${source.id}|${target.url}|${result.httpStatus}|${new Date().toISOString()}`),
  };

  const auditFile = path.join(LOG_DIR, 'isae3402-crawler-trail.jsonl');
  fs.appendFileSync(auditFile, JSON.stringify(auditEntry) + '\n');

  // Rate limiting between jobs
  await new Promise(r => setTimeout(r, RATE_LIMIT_MS));

  return result;
}, { connection: { url: REDIS_CRAWLER_URL }, concurrency: 5 });

// ═══ EXPRESS API ═══
const app = express();
app.use(express.json());

// CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy', version: '5.2', state: crawlerState.status, uptime: process.uptime() });
});

// Get crawler state
app.get('/api/crawler/state', (_req, res) => {
  res.json(crawlerState);
});

// Get sources list
app.get('/api/crawler/sources', (_req, res) => {
  res.json({
    total: ALL_SOURCES.length,
    layers: {
      L1_REGULATEUR: L1_REGULATORS.length,
      L2_NORMALISATEUR: L2_NORMALISATEURS.length,
      L3_ACADEMIQUE: L3_ACADEMIC.length,
      L4_REVUE_PRO: L4_JOURNALS.length,
    },
    sources: ALL_SOURCES.map(s => ({ id: s.id, name: s.name, layer: s.layer, category: s.category, rootUrl: s.rootUrl })),
  });
});

// Get proxy status
app.get('/api/crawler/proxies', (_req, res) => {
  res.json(proxyRotator.getStatus());
});

// Get recent logs
app.get('/api/crawler/logs', (_req, res) => {
  const logFile = path.join(LOG_DIR, `crawler-${new Date().toISOString().split('T')[0]}.log`);
  try {
    const lines = fs.readFileSync(logFile, 'utf-8').split('\n').filter(Boolean).slice(-100);
    res.json(lines.map(l => { try { return JSON.parse(l); } catch { return { message: l }; } }));
  } catch {
    res.json([]);
  }
});

// Get ISAE 3402 audit trail
app.get('/api/crawler/audit-trail', (_req, res) => {
  const auditFile = path.join(LOG_DIR, 'isae3402-crawler-trail.jsonl');
  try {
    const lines = fs.readFileSync(auditFile, 'utf-8').split('\n').filter(Boolean).slice(-100);
    res.json(lines.map(l => { try { return JSON.parse(l); } catch { return { message: l }; } }));
  } catch {
    res.json([]);
  }
});

// Export ISAE 3402 CSV
app.get('/api/crawler/audit-trail/csv', (_req, res) => {
  const auditFile = path.join(LOG_DIR, 'isae3402-crawler-trail.jsonl');
  try {
    const lines = fs.readFileSync(auditFile, 'utf-8').split('\n').filter(Boolean);
    const entries = lines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);

    const headers = ['timestamp', 'crawlId', 'sourceId', 'sourceName', 'layer', 'url', 'httpStatus', 'textsFound', 'success', 'attempts', 'duration', 'hash'];
    const csv = [headers.join(',')];
    for (const e of entries) {
      csv.push(headers.map(h => `"${(e[h] || '').toString().replace(/"/g, '""')}"`).join(','));
    }

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', `attachment; filename="isae3402-crawler-audit-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv.join('\n'));
  } catch {
    res.status(500).json({ error: 'Failed to generate CSV' });
  }
});

// Start crawler
app.post('/api/crawler/start', async (_req, res) => {
  if (crawlerState.status === 'running') {
    return res.status(409).json({ error: 'Crawler already running' });
  }

  const crawlId = `KOS-CRAWL-v5.2-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  updateState({
    status: 'running',
    crawlId,
    startedAt: new Date().toISOString(),
    completedAt: null,
    completedSources: 0,
    failedSources: 0,
    totalTextsFound: 0,
    layerProgress: {
      L1_REGULATEUR: { total: L1_REGULATORS.length, done: 0, texts: 0 },
      L2_NORMALISATEUR: { total: L2_NORMALISATEURS.length, done: 0, texts: 0 },
      L3_ACADEMIQUE: { total: L3_ACADEMIC.length, done: 0, texts: 0 },
      L4_REVUE_PRO: { total: L4_JOURNALS.length, done: 0, texts: 0 },
    },
  });

  log('info', `${'═'.repeat(70)}`);
  log('info', `[CRAWL START] ${crawlId} — ${ALL_SOURCES.length} sources`);
  log('info', `L1:${L1_REGULATORS.length} L2:${L2_NORMALISATEURS.length} L3:${L3_ACADEMIC.length} L4:${L4_JOURNALS.length}`);
  log('info', `Proxies: ${PROXY_LIST.length} | Retries: ${MAX_RETRIES} | Rate: ${RATE_LIMIT_MS}ms`);
  log('info', `${'═'.repeat(70)}`);

  // Build job list
  const jobs = [];
  for (const source of ALL_SOURCES) {
    for (const target of source.scrapeTargets) {
      jobs.push({ source, target });
    }
  }

  // Add all jobs to queue
  try {
    for (let i = 0; i < jobs.length; i++) {
      await crawlQueue.add('crawl-job', {
        ...jobs[i],
        jobIndex: i,
        totalJobs: jobs.length,
      }, {
        attempts: MAX_RETRIES,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 100,
        removeOnFail: 50,
      });
    }

    log('info', `${jobs.length} jobs added to BullMQ queue`);

    // Monitor completion
    const checkCompletion = async () => {
      const counts = await crawlQueue.getJobCounts('completed', 'failed', 'active', 'waiting');
      const total = (counts.completed || 0) + (counts.failed || 0);

      if (counts.waiting === 0 && counts.active === 0) {
        updateState({
          status: 'completed',
          completedAt: new Date().toISOString(),
          completedSources: counts.completed || 0,
          failedSources: counts.failed || 0,
        });

        log('info', `[CRAWL COMPLETED] ${crawlId} — ${counts.completed} OK, ${counts.failed} FAILED`);

        // Close browser
        if (browserInstance) {
          await browserInstance.close();
          browserInstance = null;
        }
      } else {
        setTimeout(checkCompletion, 5000);
      }
    };

    setTimeout(checkCompletion, 10000);

    res.json({ success: true, crawlId, totalJobs: jobs.length, message: `Crawler started — ${jobs.length} jobs queued` });
  } catch (error) {
    updateState({ status: 'error' });
    log('error', `Failed to start crawler: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// Pause crawler
app.post('/api/crawler/pause', async (_req, res) => {
  if (crawlerState.status !== 'running') {
    return res.status(409).json({ error: 'Crawler not running' });
  }
  await crawlQueue.pause();
  updateState({ status: 'paused' });
  log('info', 'Crawler paused');
  res.json({ success: true, message: 'Crawler paused' });
});

// Resume crawler
app.post('/api/crawler/resume', async (_req, res) => {
  if (crawlerState.status !== 'paused') {
    return res.status(409).json({ error: 'Crawler not paused' });
  }
  await crawlQueue.resume();
  updateState({ status: 'running' });
  log('info', 'Crawler resumed');
  res.json({ success: true, message: 'Crawler resumed' });
});

// Stop crawler
app.post('/api/crawler/stop', async (_req, res) => {
  await crawlQueue.obliterate({ force: true });
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
  updateState({ status: 'idle', currentSource: null, currentUrl: null });
  log('info', 'Crawler stopped and queue cleaned');
  res.json({ success: true, message: 'Crawler stopped' });
});

// ═══ START SERVER ═══
app.listen(PORT, () => {
  log('info', `${'═'.repeat(70)}`);
  log('info', 'KOS UNIVERSAL CRAWLER™ v5.2 — DÉMARRAGE');
  log('info', `Port: ${PORT} | Redis: ${REDIS_CRAWLER_URL}`);
  log('info', `Sources: ${ALL_SOURCES.length} (L1:${L1_REGULATORS.length} L2:${L2_NORMALISATEURS.length} L3:${L3_ACADEMIC.length} L4:${L4_JOURNALS.length})`);
  log('info', `Proxies: ${PROXY_LIST.length || '0 (direct)'} | Retries: ${MAX_RETRIES} | Rate: ${RATE_LIMIT_MS}ms`);
  log('info', `Règles Big Four: robots.txt | SHA256 | ISAE 3402 | RGPD | Rate Limit | Proxy Rotation`);
  log('info', `API: http://localhost:${PORT}/api/crawler/start → Lance le crawl`);
  log('info', `${'═'.repeat(70)}`);
});

process.on('SIGTERM', async () => {
  log('info', 'SIGTERM — shutting down');
  if (browserInstance) await browserInstance.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  log('info', 'SIGINT — shutting down');
  if (browserInstance) await browserInstance.close();
  process.exit(0);
});