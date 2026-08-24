#!/usr/bin/env python3
"""
KOS-VALIDATE v5.3
Contrôle 4 Yeux Big Four : Supprime toute best practice sans quadruple ancrage L1-L4
Piste d'audit ISAE 3402 + Rapport de conformité

Intégré dans le pipeline KOS Memory Seeder :
  Lundi 02:00 GMT → seed_kos_memory.py (crawl + enrich)
  Lundi 03:00 GMT → kos_validate.py   (contrôle 4 yeux)
"""

import json
import hashlib
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Tuple

import redis


# ═══════════════════════════════════════════════════════════════
# CONFIG — Chemins Docker-friendly
# ═══════════════════════════════════════════════════════════════
DATA_DIR = Path(os.getenv("DATA_DIR", "/app/data"))
REDIS_URL = os.getenv("REDIS_URL", "redis://redis-audit:6379")
INPUT_FILE = DATA_DIR / "kos_memory.jsonl"
OUTPUT_CLEAN = DATA_DIR / "kos_memory_clean.jsonl"
OUTPUT_REJECTED = DATA_DIR / "kos_memory_rejected.jsonl"
REPORT_FILE = DATA_DIR / "kos_validate_report.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)


# ═══════════════════════════════════════════════════════════════
# PATTERNS BIG FOUR — Validation des 4 ancrages obligatoires
# ═══════════════════════════════════════════════════════════════
PATTERNS = {
    "L1": (
        r"†https?://(www\.)?("
        r"bceao\.int|beac\.int|cobac|uemoa\.int|cemac\.int|"
        r"ohada\.org|bis\.org|fatf-gafi\.org|iosco\.org|"
        r"iaisweb\.org|imf\.org|worldbank\.org|afdb\.org|"
        r"oecd\.org|esma\.europa\.eu|eba\.europa\.eu|"
        r"eiopa\.europa\.eu|fca\.org\.uk|sec\.gov|"
        r"finra\.org|osfi-bsif\.gc\.ca|apra\.gov\.au|"
        r"mas\.gov\.sg|hkma\.gov\.hk|"
        r"amf-umoa\.org|crepmf\.org|cima\.org|gabac\.org"
        r")"
        r"[^†]*†L"
    ),
    "L2": (
        r"("
        r"ISO \d+:\d+|IFRS \d+|BCBS|COSO|ISAE \d+|"
        r"ISA \d+|GRI \d+|SASB|TCFD|TNFD|NIST|IEC \d+|"
        r"ITU|IIRC|IPSASB|IESBA|UNCTAD|UNCITRAL|"
        r"OECD BEPS|GAFI Rec\.\d+|Basel (I|II|III)"
        r"|"
        r"†https?://(www\.)?(iso\.org|ifrs\.org|ifac\.org|"
        r"globalreporting\.org|sasb\.org|fsb-tcfd\.org|"
        r"tnfd\.global)[^†]*†L"
        r")"
    ),
    "L3": (
        r"†https?://(www\.)?("
        r"hls\.harvard\.edu|wharton\.upenn\.edu|hec\.edu|"
        r"lse\.ac\.uk|insead\.edu|ox\.ac\.uk|cam\.ac\.uk|"
        r"gsb\.stanford\.edu|mit\.edu|sloan\.mit\.edu|"
        r"columbia\.edu|chicagobooth\.edu|kellogg\.northwestern\.edu|"
        r"fuqua\.duke\.edu|tuck\.dartmouth\.edu|haas\.berkeley\.edu|"
        r"anderson\.ucla\.edu|marshall\.usc\.edu|yale\.edu|"
        r"stern\.nyu\.edu|cornell\.edu|ross\.umich\.edu|"
        r"api\.crossref\.org"
        r")"
        r"[^†]*†L"
    ),
    "L4": (
        r"†https?://doi\.org/10\.\d{4,}/[^†]+†L"
    ),
}

# Champs obligatoires Big Four
REQUIRED_FIELDS = ["date", "zone", "exigence", "solution", "source", "kpi"]


# ═══════════════════════════════════════════════════════════════
# CLASSE PRINCIPALE
# ═══════════════════════════════════════════════════════════════
class KOSValidator:
    """Contrôle 4 Yeux Big Four — Validation L1-L4 + Data Lineage + Fraîcheur"""

    def __init__(self):
        self.redis_client: redis.Redis = redis.from_url(
            REDIS_URL, decode_responses=True
        )
        self.stats: Dict = {
            "total": 0,
            "valid": 0,
            "rejected": 0,
            "reasons": {},
        }
        self.valid_lines: List[str] = []
        self.rejected_lines: List[Dict] = []

    # ── Logging ───────────────────────────────────────────
    def _log(self, message: str):
        ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{ts}] {message}", flush=True)

    # ── Validation d'une ligne ────────────────────────────
    def validate_line(self, line: str, line_num: int) -> Tuple[bool, List[str]]:
        """Contrôle 4 Yeux : retourne (is_valid, missing_layers)"""
        # Étape 0: JSON valide ?
        try:
            data = json.loads(line.strip())
        except json.JSONDecodeError:
            return False, ["JSON_INVALID"]

        # Étape 1: Champs obligatoires Big Four
        missing = []
        for field in REQUIRED_FIELDS:
            if field not in data or not data[field]:
                missing.append(f"MISSING_{field.upper()}")

        # Étape 2: Concaténer tous les champs pour recherche ancrages
        full_text = json.dumps(data, ensure_ascii=False)

        # Étape 3: Contrôle L1-L4 par regex
        for layer, pattern in PATTERNS.items():
            if not re.search(pattern, full_text, re.IGNORECASE):
                missing.append(f"MISSING_{layer}")

        # Étape 4: Contrôle data lineage (†url†L dans source)
        source_val = data.get("source", "")
        if "†" not in source_val or "†L" not in source_val:
            missing.append("NO_DATA_LINEAGE")

        # Étape 5: Contrôle fraîcheur académique (< 5 ans pour L3/L4)
        academic_text = data.get("academic", "") + data.get("tier1", "")
        if academic_text.strip():
            date_match = re.search(r"(\d{4})", academic_text)
            if date_match and int(date_match.group(1)) < datetime.now().year - 5:
                missing.append("OBSOLETE_ACADEMIC")

        return len(missing) == 0, missing

    # ── Hash SHA256 d'un fichier ──────────────────────────
    def _hash_file(self, filepath: Path) -> str:
        if not filepath.exists():
            return ""
        sha256 = hashlib.sha256()
        with open(filepath, "rb") as f:
            for chunk in iter(lambda: f.read(4096), b""):
                sha256.update(chunk)
        return sha256.hexdigest()

    # ── Log ISAE 3402 Redis ──────────────────────────────
    def _audit_log(self, report: Dict):
        """Log immuable ISAE 3402 dans Redis audit"""
        try:
            self.redis_client.lpush(
                "kos:audit:validate",
                json.dumps(report, ensure_ascii=False),
            )
            self._log("Log ISAE 3402 enregistré dans Redis audit")
        except Exception as e:
            self._log(f"ERREUR Redis audit: {e}")

    # ── Main ──────────────────────────────────────────────
    def run(self) -> Dict:
        """Exécute le contrôle 4 Yeux complet"""
        self._log("═══ KOS-VALIDATE v5.3 — Contrôle 4 Yeux Big Four ═══")

        if not INPUT_FILE.exists():
            self._log(f"ERREUR: {INPUT_FILE} introuvable — rien à valider")
            return self.stats

        self._log(f"Fichier d'entrée: {INPUT_FILE} ({INPUT_FILE.stat().st_size} octets)")

        with open(INPUT_FILE, "r", encoding="utf-8") as f:
            for line_num, line in enumerate(f, 1):
                if not line.strip():
                    continue
                self.stats["total"] += 1
                is_valid, reasons = self.validate_line(line, line_num)

                if is_valid:
                    self.stats["valid"] += 1
                    self.valid_lines.append(line)
                else:
                    self.stats["rejected"] += 1
                    self.rejected_lines.append(
                        {
                            "line_num": line_num,
                            "reasons": reasons,
                            "data_preview": line.strip()[:200],
                        }
                    )
                    for reason in reasons:
                        self.stats["reasons"][reason] = (
                            self.stats["reasons"].get(reason, 0) + 1
                        )

        # Écriture des fichiers de sortie
        with open(OUTPUT_CLEAN, "w", encoding="utf-8") as f:
            for line in self.valid_lines:
                f.write(line)

        with open(OUTPUT_REJECTED, "w", encoding="utf-8") as f:
            for item in self.rejected_lines:
                f.write(json.dumps(item, ensure_ascii=False) + "\n")

        # Rapport ISAE 3402
        compliance_rate = (
            round(self.stats["valid"] / self.stats["total"] * 100, 2)
            if self.stats["total"]
            else 0
        )

        report = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "validator_version": "5.3",
            "input_file": str(INPUT_FILE),
            "output_clean": str(OUTPUT_CLEAN),
            "output_rejected": str(OUTPUT_REJECTED),
            "report_file": str(REPORT_FILE),
            "stats": self.stats,
            "compliance_rate": compliance_rate,
            "sha256_clean": self._hash_file(OUTPUT_CLEAN),
            "sha256_rejected": self._hash_file(OUTPUT_REJECTED),
            "isae3402": True,
            "bigfour_4eyes": True,
        }

        with open(REPORT_FILE, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        # Log audit immuable
        self._audit_log(report)

        # Résumé
        self._log("═══ RÉSULTATS ═══")
        self._log(
            f"Total: {self.stats['total']} | "
            f"Valides: {self.stats['valid']} | "
            f"Rejetées: {self.stats['rejected']}"
        )
        self._log(f"Taux de conformité: {compliance_rate}%")

        if self.stats["reasons"]:
            self._log("Motifs de rejet:")
            for reason, count in sorted(
                self.stats["reasons"].items(), key=lambda x: -x[1]
            ):
                self._log(f"  {reason}: {count}")

        self._log(f"Rapport: {REPORT_FILE}")
        self._log("═══ KOS-VALIDATE v5.3 — TERMINÉ ═══")

        return report


# ═══════════════════════════════════════════════════════════════
# FONCTION IMPORTABLE — Appelée par seed_kos_memory.py après crawl
# ═══════════════════════════════════════════════════════════════
def run_validate() -> Dict:
    """Fonction standalone importable par le pipeline KOS"""
    validator = KOSValidator()
    return validator.run()


# ═══════════════════════════════════════════════════════════════
# ENTRYPOINT
# ═══════════════════════════════════════════════════════════════
def main():
    report = run_validate()
    # Sortie avec code d'erreur si taux de conformité < 50%
    if report.get("compliance_rate", 0) < 50:
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()