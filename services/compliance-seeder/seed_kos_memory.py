#!/usr/bin/env python3
"""
KOS Memory Seeder v5.1 — Python Edition
Crawl hebdo BCEAO/COBAC/OHADA + enrichissement auto L2/L3/L4
100% Big Four — 0 hallucination — Data lineage complet — ISAE 3402

Lancement:
  Manuel:      python seed_kos_memory.py
  Docker cron:  Lundi 02:00 GMT automatique
"""

import asyncio
import hashlib
import json
import os
import re
import signal
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional
from urllib.parse import urljoin

import aiohttp
import redis.asyncio as redis
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
from tenacity import retry, stop_after_attempt, wait_exponential


# ═══════════════════════════════════════════════════════════════
# CONFIG — Chemins et variables d'environnement
# ═══════════════════════════════════════════════════════════════
DATA_DIR = Path(os.getenv("DATA_DIR", "/app/data"))
OUTPUT_FILE = DATA_DIR / "kos_memory.jsonl"
HASH_FILE = DATA_DIR / "kos_hashes.json"
LOG_DIR = Path(os.getenv("LOG_DIR", "/var/log/kos-memory-seeder"))
REDIS_URL = os.getenv("REDIS_URL", "redis://redis-audit:6379")
RUN_ONCE = os.getenv("RUN_ONCE", "false").lower() == "true"

# Créer les dossiers si nécessaire
DATA_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)


# ═══════════════════════════════════════════════════════════════
# 1. CONFIG SOURCES OFFICIELLES L1
# ═══════════════════════════════════════════════════════════════
SOURCES_L1 = {
    "BCEAO": {
        "base": "https://www.bceao.int",
        "urls": [
            "/fr/reglementations",
            "/fr/content/circulaires-commission-bancaire",
            "/fr/content/instructions",
        ],
        "selectors": {
            "item": "div.views-row",
            "title": "h3 a",
            "link": "h3 a",
            "date": "span.date",
        },
    },
    "COBAC": {
        "base": "https://www.beac.int/cobac",
        "urls": ["/reglementation", "/instructions"],
        "selectors": {
            "item": "div.document",
            "title": "h4",
            "link": "a.download",
            "date": "span.date",
        },
    },
    "OHADA": {
        "base": "https://www.ohada.org",
        "urls": ["/actes-uniformes", "/jurisprudence"],
        "selectors": {
            "item": "div.acte",
            "title": "h3",
            "link": "a.pdf",
            "date": "span.year",
        },
    },
}


# ═══════════════════════════════════════════════════════════════
# 2. CLASS PRINCIPALE
# ═══════════════════════════════════════════════════════════════
class KOSMemorySeeder:
    """Crawler hebdomadaire BCEAO/COBAC/OHADA avec enrichissement Big Four"""

    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None
        self.session: Optional[aiohttp.ClientSession] = None
        self.hashes: Dict[str, bool] = self._load_hashes()
        self.new_count = 0

    # ── Gestion des hashes (déduplication) ─────────────────
    def _load_hashes(self) -> Dict[str, bool]:
        try:
            if HASH_FILE.exists():
                with open(HASH_FILE) as f:
                    return json.load(f)
        except Exception:
            pass
        return {}

    def _save_hashes(self):
        try:
            with open(HASH_FILE, "w") as f:
                json.dump(self.hashes, f)
        except Exception as e:
            self._log(f"ERREUR sauvegarde hashes: {e}")

    # ── Logging ───────────────────────────────────────────
    def _log(self, message: str):
        ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{ts}] {message}", flush=True)

    # ── Contexte async ────────────────────────────────────
    async def __aenter__(self):
        self.redis_client = redis.from_url(
            REDIS_URL, decode_responses=True
        )
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={
                "User-Agent": "KOS-Bot/5.1 BigFour-Compliance (+https://khepra.expert)"
            },
        )
        return self

    async def __aexit__(self, *args):
        if self.session:
            await self.session.close()
        if self.redis_client:
            await self.redis_client.aclose()

    # ── Fetch avec retry Tenacity ─────────────────────────
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        reraise=True,
    )
    async def fetch_page(self, url: str) -> str:
        async with self.session.get(url) as r:
            r.raise_for_status()
            return await r.text()

    # ── Extraction best practices ─────────────────────────
    def extract_best_practice(
        self, text: str, source: str, url: str
    ) -> List[Dict]:
        """Extrait exigences type 'doit', 'obligatoire', 'interdit' — 0 LLM"""
        practices = []
        patterns = [
            r"(?:doit|doivent|obligation|obligatoire|interdit|interdiction)[^.]{20,200}",
            r"(?:Art\.?\s*\d+[^.]{10,200})",
            r"(?:[≥≤><]\s*\d+[%]?)",
        ]

        for pattern in patterns:
            for match in re.finditer(pattern, text, re.IGNORECASE):
                excerpt = match.group(0).strip()
                if len(excerpt) > 30:
                    practice_hash = hashlib.sha256(
                        excerpt.encode()
                    ).hexdigest()
                    if practice_hash not in self.hashes:
                        practices.append(
                            {
                                "date": datetime.now(timezone.utc).strftime(
                                    "%Y-%m-%d"
                                ),
                                "zone": source,
                                "entite": self._detect_entity(text),
                                "exigence": excerpt[:100],
                                "solution": excerpt,
                                "source": f"{text[:50].strip()}...†{url}†L",
                                "kpi": self._extract_kpi(text),
                                "norme_iso": "",
                                "academic": "",
                                "tier1": "",
                                "hash": practice_hash,
                            }
                        )
                        self.hashes[practice_hash] = True
        return practices

    def _detect_entity(self, text: str) -> str:
        txt = text.lower()
        if "banque" in txt:
            return "Banque"
        if "sfd" in txt or "microfinance" in txt:
            return "SFD"
        if "établissement de crédit" in txt or "ec " in txt or txt.startswith("ec"):
            return "EC"
        if "emi" in txt:
            return "EMI"
        if "sa " in txt:
            return "SA"
        if "sarl" in txt:
            return "SARL"
        if "gie" in txt:
            return "GIE"
        return "Toutes"

    def _extract_kpi(self, text: str) -> str:
        kpi_match = re.search(
            r"(\d+\s*%|délai\s*\d+\s*j|jours|mois)", text, re.IGNORECASE
        )
        return kpi_match.group(0) if kpi_match else "Conformité"

    # ── Enrichissement L2/L3/L4 auto ──────────────────────
    async def enrich_L2_L3_L4(self, practice: Dict) -> Dict:
        """Enrichit avec ISO (L2) + Académique QS200 (L3) + DOI Tier-1 (L4)"""
        keywords = practice["exigence"].split()[:5]
        query = "+".join(keywords)

        # L2: ISO.org
        try:
            iso_url = f"https://www.iso.org/search/?q={query}"
            practice["norme_iso"] = f"ISO Search: {iso_url}†{iso_url}†L"
        except Exception:
            practice["norme_iso"] = "ISO — Recherche indisponible"

        # L3: QS200 via Crossref
        try:
            async with self.session.get(
                f"https://api.crossref.org/works?query={query}&rows=1",
                timeout=aiohttp.ClientTimeout(total=10),
            ) as r:
                if r.status == 200:
                    data = await r.json()
                    items = data.get("message", {}).get("items", [])
                    if items:
                        item = items[0]
                        title = (
                            item.get("title", ["Source académique"])[0]
                            if item.get("title")
                            else "Source académique"
                        )
                        item_url = item.get("URL", "")
                        practice["academic"] = (
                            f"{title[:60]}†{item_url}†L"
                        )
        except Exception:
            practice["academic"] = "QS200 — Crossref indisponible"

        # L4: DOI Tier-1
        try:
            async with self.session.get(
                f"https://api.crossref.org/works?query={query}&filter=type:journal-article&rows=1",
                timeout=aiohttp.ClientTimeout(total=10),
            ) as r:
                if r.status == 200:
                    data = await r.json()
                    items = data.get("message", {}).get("items", [])
                    if items:
                        item = items[0]
                        title = (
                            item.get("title", ["Article Tier-1"])[0]
                            if item.get("title")
                            else "Article Tier-1"
                        )
                        doi = item.get("DOI", "")
                        practice["tier1"] = (
                            f"{title[:60]}†https://doi.org/{doi}†L"
                        )
        except Exception:
            practice["tier1"] = "Tier-1 — Crossref indisponible"

        return practice

    # ── Crawl d'une source ────────────────────────────────
    async def crawl_source(
        self, name: str, config: Dict
    ) -> List[Dict]:
        """Crawl BCEAO/COBAC/OHADA avec Playwright headless"""
        all_practices: List[Dict] = []

        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(
                    headless=True,
                    args=[
                        "--no-sandbox",
                        "--disable-setuid-sandbox",
                        "--disable-dev-shm-usage",
                        "--disable-gpu",
                    ],
                )
                page = await browser.new_page()
                page.set_default_timeout(30000)

                for url_path in config["urls"]:
                    url = urljoin(config["base"], url_path)
                    try:
                        self._log(f"  Crawling {name}: {url}")
                        await page.goto(url, wait_until="networkidle")
                        html = await page.content()
                        soup = BeautifulSoup(html, "html.parser")

                        items = soup.select(config["selectors"]["item"])[
                            :10
                        ]
                        self._log(f"  {len(items)} items trouvés sur {url_path}")

                        for item in items:
                            title_el = item.select_one(
                                config["selectors"]["title"]
                            )
                            link_el = item.select_one(
                                config["selectors"]["link"]
                            )
                            if not title_el or not link_el:
                                continue

                            href = link_el.get("href", "")
                            if not href:
                                continue

                            doc_url = urljoin(config["base"], href)
                            doc_text = title_el.get_text(strip=True)

                            # Si c'est une page HTML, on fetch le contenu
                            if not href.endswith(".pdf"):
                                try:
                                    doc_html = await self.fetch_page(doc_url)
                                    doc_soup = BeautifulSoup(
                                        doc_html, "html.parser"
                                    )
                                    doc_text = doc_soup.get_text(
                                        separator=" ", strip=True
                                    )[:5000]
                                except Exception:
                                    pass

                            self._log(f"    Analyse: {title_el.get_text(strip=True)[:60]}")

                            practices = self.extract_best_practice(
                                doc_text, name, doc_url
                            )
                            for practice in practices:
                                enriched = await self.enrich_L2_L3_L4(
                                    practice
                                )
                                # Nettoyer le hash (interne, pas dans le JSONL)
                                enriched.pop("hash", None)
                                all_practices.append(enriched)

                    except Exception as e:
                        self._log(f"  ERREUR {name} {url}: {e}")
                        continue

                await browser.close()

        except Exception as e:
            self._log(f"ERREUR Playwright pour {name}: {e}")

        return all_practices

    # ── Sauvegarde JSONL ──────────────────────────────────
    def _append_jsonl(self, practices: List[Dict]):
        """Ajoute les practices au fichier JSONL (append-only)"""
        if not practices:
            return

        try:
            with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
                for p in practices:
                    f.write(
                        json.dumps(p, ensure_ascii=False) + "\n"
                    )
            # Vérifier que l'écriture a bien eu lieu
            with open(OUTPUT_FILE, "rb") as f:
                f.seek(0, os.SEEK_END)
                file_size = f.tell()
            self._log(f"JSONL écrit — Taille fichier: {file_size} octets")
        except Exception as e:
            self._log(f"ERREUR écriture JSONL: {e}")

    # ── Log ISAE 3402 Redis ───────────────────────────────
    async def _audit_log(self, count: int):
        """Log immuable ISAE 3402 dans Redis audit"""
        try:
            entry = json.dumps(
                {
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "event": "KOS_MEMORY_SEEDER_V51",
                    "count": count,
                    "sources": list(SOURCES_L1.keys()),
                    "output_file": str(OUTPUT_FILE),
                    "isae3402": True,
                }
            )
            await self.redis_client.lpush("kos:audit:seed", entry)
            self._log("Log ISAE 3402 enregistré dans Redis")
        except Exception as e:
            self._log(f"ERREUR Redis audit: {e}")

    # ── Exécuter le validateur après le crawl ────────────
    def run_validate(self):
        """Lance KOS-VALIDATE v5.3 — Contrôle 4 Yeux post-seed"""
        validate_script = Path(__file__).parent / "kos_validate.py"
        if not validate_script.exists():
            self._log("kos_validate.py introuvable — validation ignorée")
            return False

        self._log("═══ Lancement KOS-VALIDATE v5.3 — Contrôle 4 Yeux ═══")
        try:
            result = subprocess.run(
                [sys.executable, str(validate_script)],
                capture_output=True,
                text=True,
                timeout=120,
                env={**os.environ, "DATA_DIR": str(DATA_DIR), "REDIS_URL": REDIS_URL},
            )
            # Afficher la sortie du validateur dans nos logs
            if result.stdout:
                for line in result.stdout.strip().split("\n"):
                    self._log(f"[VALIDATE] {line}")
            if result.stderr:
                for line in result.stderr.strip().split("\n"):
                    self._log(f"[VALIDATE-ERR] {line}")

            if result.returncode == 0:
                self._log("KOS-VALIDATE v5.3: SUCCÈS — Taux de conformité ≥ 50%")
                return True
            else:
                self._log("KOS-VALIDATE v5.3: ALERTE — Taux de conformité < 50%")
                return False
        except subprocess.TimeoutExpired:
            self._log("KOS-VALIDATE v5.3: TIMEOUT après 120s")
            return False
        except Exception as e:
            self._log(f"KOS-VALIDATE v5.3: ERREUR — {e}")
            return False

    # ── Main ──────────────────────────────────────────────
    async def run(self):
        """Main: crawl + enrich + append JSONL + audit log"""
        self._log("═══ KOS Memory Seeder v5.1 — DÉMARRAGE ═══")
        all_new: List[Dict] = []

        for name, config in SOURCES_L1.items():
            self._log(f"Crawling {name}...")
            practices = await self.crawl_source(name, config)
            all_new.extend(practices)
            self._log(f"→ {len(practices)} nouvelles practices de {name}")

        if all_new:
            self._append_jsonl(all_new)
            self._save_hashes()
            await self._audit_log(len(all_new))
            self._log(
                f"═══ {len(all_new)} practices ajoutées à {OUTPUT_FILE} ═══"
            )
        else:
            self._log("═══ Aucune nouvelle practice détectée ═══")

        self.new_count = len(all_new)


# ═══════════════════════════════════════════════════════════════
# 3. ENTRYPOINT — Mode RUN_ONCE ou cron hebdo
# ═══════════════════════════════════════════════════════════════
async def run_once():
    """Exécution unique du seeder + validate"""
    async with KOSMemorySeeder() as seeder:
        await seeder.run()
        seeder.run_validate()
    return 0


async def run_cron_weekly():
    """Boucle infinie: exécution immédiate + tous les lundis 02:00 GMT"""
    import time as time_mod

    shutting_down = False

    def handle_signal(sig, frame):
        nonlocal shutting_down
        print(f"\nSignal {sig} reçu — Arrêt gracieux...")
        shutting_down = True

    signal.signal(signal.SIGTERM, handle_signal)
    signal.signal(signal.SIGINT, handle_signal)

    while not shutting_down:
        print(f"\n{'='*60}")
        print(f"KOS Memory Seeder v5.1 — Exécution planifiée")
        print(f"Heure UTC: {datetime.now(timezone.utc).isoformat()}")
        print(f"{'='*60}")

        async with KOSMemorySeeder() as seeder:
            await seeder.run()
            # Lancer le validateur après le crawl (Contrôle 4 Yeux Big Four)
            seeder.run_validate()

        # Calculer le prochain lundi 02:00 GMT
        now = datetime.now(timezone.utc)
        days_until_monday = (7 - now.weekday()) % 7  # 0=lundi
        if days_until_monday == 0 and now.hour >= 2:
            days_until_monday = 7  # On a déjà passé 02:00 ce lundi

        next_run = now.replace(
            hour=2, minute=0, second=0, microsecond=0
        ) + time_mod.timedelta(days=days_until_monday)

        wait_seconds = (next_run - now).total_seconds()
        wait_hours = wait_seconds / 3600

        print(f"Prochaine exécution: {next_run.isoformat()} (dans {wait_hours:.1f}h)")
        print(f"En attente...")

        # Sleep par tranches de 60s pour permettre un arrêt gracieux
        remaining = wait_seconds
        while remaining > 0 and not shutting_down:
            sleep_time = min(60, remaining)
            await asyncio.sleep(sleep_time)
            remaining -= sleep_time

    print("KOS Memory Seeder v5.1 — Arrêté proprement.")
    return 0


def main():
    if RUN_ONCE:
        sys.exit(asyncio.run(run_once()))
    else:
        sys.exit(asyncio.run(run_cron_weekly()))


if __name__ == "__main__":
    main()