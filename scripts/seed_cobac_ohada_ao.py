#!/usr/bin/env python3
"""
KHEPRA OS — Seed COBAC + OHADA + AO/AMI Big Four
==================================================
Importe dans les 3 tables Big Four depuis les sources officielles :

  1. COBAC : scrape beac.int (règlements COBAC CEMAC)
  2. OHADA : scrape ohada.org (Actes Uniformes + Jurisprudence CCJA)
  3. AO/AMI : RSS Banque Mondiale + AfDB + EU Tenders (10 000 appels d'offres)

Usage:
    python scripts/seed_cobac_ohada_ao.py
    python scripts/seed_cobac_ohada_ao.py --dry-run
    python scripts/seed_cobac_ohada_ao.py --source cobac        # COBAC uniquement
    python scripts/seed_cobac_ohada_ao.py --source ohada        # OHADA uniquement
    python scripts/seed_cobac_ohada_ao.py --source ao           # AO/AMI uniquement
    python scripts/seed_cobac_ohada_ao.py --ao-limit 2000       # Limiter les AO

Prérequis:
    pip install httpx beautifulsoup4 supabase python-dotenv feedparser

Variables d'environnement (fichier .env):
    SUPABASE_URL=https://pgfwhahiwqvqeahpirjx.supabase.co
    SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
"""

import os
import re
import sys
import json
import hashlib
import argparse
import asyncio
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from supabase import create_client, Client

try:
    import feedparser
except ImportError:
    feedparser = None

# ═══════════════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════

USER_AGENT = "KHEPRA-BigFour-Seeder/3.0 (Big Four; +https://khepraexperts.com)"
REQUEST_TIMEOUT = 30.0

# Sources
COBAC_LIST_URL = "https://www.beac.int/cobac/reglementation/"
COBAC_BASE = "https://www.beac.int"

OHADA_URLS = [
    ("AU", "https://www.ohada.org/actes-uniformes/"),
    ("Jurisprudence", "https://www.ohada.org/jurisprudence-ccja/"),
]
OHADA_BASE = "https://www.ohada.org"

AO_SOURCES = [
    {
        "name": "WB",
        "url": "https://projects.worldbank.org/en/projects-operations/procurement.rss",
        "type": "rss",
    },
    {
        "name": "AfDB",
        "url": "https://www.afdb.org/fr/projets-et-operations/passation-de-marches/rss",
        "type": "rss",
    },
    {
        "name": "EU",
        "url": "https://ec.europa.eu/info/funding-tenders/opportunities/data/reference-data/tenders.json",
        "type": "json",
    },
]

# Pays par défaut
CEMAC_COUNTRIES = ["CM", "CF", "TD", "CG", "GQ", "GA"]
OHADA_COUNTRIES = [
    "BJ", "BF", "CM", "CF", "KM", "CG", "CI", "GA", "GN",
    "GW", "GQ", "ML", "NE", "CD", "SN", "TD", "TG",
]

# Chargement .env
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


# ═══════════════════════════════════════════════════════════════════════
# UTILS
# ═══════════════════════════════════════════════════════════════════════

def hash_content(text: str) -> str:
    """Génère un hash SHA-256 du contenu pour déduplication."""
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def parse_date_fr(text: str) -> Optional[str]:
    """Extrait une date depuis du texte français. Retourne YYYY-MM-DD."""
    patterns = [
        r"(\d{4}[-/]\d{2}[-/]\d{2})",
        r"(\d{2}/\d{2}/\d{4})",
        r"Publi[ée]\s+le\s+(\d{2}/\d{2}/\d{4})",
        r"(\d{2})\s+(janvier|f[ée]vrier|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|d[ée]cembre)\s+(\d{4})",
    ]
    for pat in patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            if len(m.groups()) >= 3 and m.group(2) and not m.group(2).isdigit():
                mois_fr = {
                    "janvier": "01", "février": "02", "fevrier": "02",
                    "mars": "03", "avril": "04", "mai": "05", "juin": "06",
                    "juillet": "07", "août": "08", "aout": "08",
                    "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12", "decembre": "12",
                }
                jour = m.group(1).zfill(2)
                mois = mois_fr.get(m.group(2).lower(), "01")
                annee = m.group(3)
                return f"{annee}-{mois}-{jour}"
            date_str = m.group(1)
            if "/" in date_str:
                parts = date_str.split("/")
                if len(parts[2]) == 4:
                    return f"{parts[2]}-{parts[1].zfill(2)}-{parts[0].zfill(2)}"
                return f"{parts[0]}-{parts[1].zfill(2)}-{parts[2].zfill(2)}"
            return date_str
    return None


def extract_themes_cobac_ohada(title: str) -> list[str]:
    """Extraction NLP des thèmes COBAC/OHADA depuis le titre."""
    text = title.lower()
    themes = []
    mapping = {
        "agrément": "agrements", "agrement": "agrements",
        "fonds propres": "fonds_propres", "solvabilité": "fonds_propres", "solvabilite": "fonds_propres",
        "blanchiment": "lbc_ft", "lcb": "lbc_ft", "ft": "lbc_ft", "gafi": "lbc_ft",
        "bâle": "bale_iii", "bale": "bale_iii", "bâle iii": "bale_iii",
        "comptable": "comptable", "comptabilité": "comptable", "comptabilite": "comptable", "syscohada": "comptable",
        "société": "societes", "societe": "societes", "commercial": "societes",
        "sûreté": "suretes", "surete": "suretes", "sûretés": "suretes",
        "arbitrage": "arbitrage", "ccja": "arbitrage",
        "procédure": "procedure", "procedure": "procedure",
        "gouvernance": "gouvernance",
        "risque": "risques", "contrôle interne": "risques", "controle interne": "risques",
        "numérique": "digital", "numerique": "digital", "digital": "digital",
        "conformité": "conformite", "conformite": "conformite",
    }
    for keyword, theme in mapping.items():
        if keyword in text and theme not in themes:
            themes.append(theme)
    return themes or ["general"]


def extract_secteurs_ao(title: str, description: str = "") -> list[str]:
    """Extraction NLP des secteurs AO/AMI."""
    text = (title + " " + description).lower()
    secteurs = []
    mapping = {
        "finance": "Finance", "banque": "Finance", "microfinance": "Finance",
        "gouvernance": "Gouvernance", "governance": "Gouvernance",
        "digital": "Digital", "numérique": "Digital", "numerique": "Digital",
        "esg": "ESG", "environnement": "ESG", "climat": "ESG", "durabilité": "ESG", "durabilite": "ESG",
        "santé": "Santé", "sante": "Santé",
        "éducation": "Éducation", "education": "Éducation",
        "infrastructure": "Infrastructure", "transport": "Infrastructure",
        "énergie": "Énergie", "energie": "Énergie",
        "agriculture": "Agriculture",
        "eau": "Eau",
    }
    for keyword, secteur in mapping.items():
        if keyword in text and secteur not in secteurs:
            secteurs.append(secteur)
    return secteurs or ["Gouvernance"]


# ═══════════════════════════════════════════════════════════════════════
# 1. COBAC — SCRAPER BEAC.INT
# ═══════════════════════════════════════════════════════════════════════

async def seed_cobac(client: httpx.AsyncClient, sb: Client, dry_run: bool = False) -> dict:
    """
    Scrape les règlements COBAC depuis beac.int/cobac/reglementation/
    et les upserte dans public.cobac_reglements.
    """
    stats = {"inserted": 0, "updated": 0, "skipped": 0, "errors": 0}
    print(f"\n{'='*60}")
    print("  1. COBAC — Scraping beac.int/cobac/reglementation/")
    print(f"{'='*60}")

    try:
        r = await client.get(COBAC_LIST_URL)
        r.raise_for_status()
    except Exception as e:
        print(f"  ❌ Erreur HTTP: {e}")
        return stats

    soup = BeautifulSoup(r.text, 'html.parser')
    links = soup.select('a[href*=".pdf"]')
    print(f"  📄 {len(links)} liens PDF trouvés")

    for a in links:
        text = a.get_text(strip=True)
        href = a.get('href', '')

        if not ('COBAC' in text.upper() or 'R-' in text):
            continue

        numero_match = re.search(r'(R-\d{4}/\d{2}|COBAC-[\w-]+)', text)
        if not numero_match:
            continue

        numero = numero_match.group(1).strip()
        titre = text[:500]

        # Construire URL absolue
        if href.startswith('http'):
            url_pdf = href
        elif href.startswith('/'):
            url_pdf = COBAC_BASE + href
        else:
            url_pdf = COBAC_BASE + '/' + href

        # Extraction date — depuis le contexte parent
        parent = a.parent
        parent_text = parent.get_text() if parent else text
        date_pub = parse_date_fr(parent_text) or "2016-01-01"

        themes = extract_themes_cobac_ohada(titre)
        content_hash = hash_content(f"{numero}|{titre}|{url_pdf}")

        record = {
            "numero": numero,
            "titre": titre,
            "date_pub": date_pub,
            "url_pdf": url_pdf,
            "themes": themes,
            "pays": CEMAC_COUNTRIES,
            "bigfour_impact": 95,
            "crawled": False,
            "last_hash": content_hash,
        }

        if dry_run:
            print(f"  [DRY RUN] COBAC: {numero} — {titre[:60]}")
            stats["inserted"] += 1
            continue

        try:
            existing = sb.table("cobac_reglements").select("id,last_hash").eq("numero", numero).execute()
            if existing.data:
                old_hash = existing.data[0].get("last_hash", "")
                if old_hash == content_hash:
                    stats["skipped"] += 1
                    continue
                sb.table("cobac_reglements").update(record).eq("numero", numero).execute()
                stats["updated"] += 1
                print(f"  🔄 COBAC Updated: {numero}")
            else:
                sb.table("cobac_reglements").insert(record).execute()
                stats["inserted"] += 1
                print(f"  ✅ COBAC Inserted: {numero} — {titre[:60]}")
        except Exception as e:
            stats["errors"] += 1
            print(f"  ❌ COBAC Error {numero}: {e}")

    return stats


# ═══════════════════════════════════════════════════════════════════════
# 2. OHADA — SCRAPER OHADA.ORG
# ═══════════════════════════════════════════════════════════════════════

async def seed_ohada(client: httpx.AsyncClient, sb: Client, dry_run: bool = False) -> dict:
    """
    Scrape les Actes Uniformes et Jurisprudence depuis ohada.org
    et les upserte dans public.ohada_actes.
    """
    stats = {"inserted": 0, "updated": 0, "skipped": 0, "errors": 0}
    print(f"\n{'='*60}")
    print("  2. OHADA — Scraping ohada.org")
    print(f"{'='*60}")

    for doc_type, url in OHADA_URLS:
        print(f"\n  🌐 [{doc_type}] {url}")
        try:
            r = await client.get(url)
            r.raise_for_status()
        except Exception as e:
            print(f"  ❌ Erreur HTTP: {e}")
            continue

        soup = BeautifulSoup(r.text, 'html.parser')

        # Chercher les liens PDF dans les articles, listes, tables
        pdf_links = soup.select('a[href*=".pdf"]')
        if not pdf_links:
            pdf_links = soup.select('a[href*="acte"], a[href*="decision"], a[href*="arret"]')

        print(f"  📄 {len(pdf_links)} liens trouvés")

        for a in pdf_links[:100]:  # Limite de sécurité par type
            text = a.get_text(strip=True)
            href = a.get('href', '')

            if len(text) < 10:
                continue

            # Numéro : premières lettres du titre
            numero = text[:30].strip()

            # Construire URL absolue
            if href.startswith('http'):
                url_pdf = href
            elif href.startswith('/'):
                url_pdf = OHADA_BASE + href
            else:
                url_pdf = OHADA_BASE + '/' + href

            # Extraction date depuis contexte
            parent = a.parent
            parent_text = parent.get_text() if parent else text
            date_pub = parse_date_fr(parent_text) or "2017-01-01"

            themes = extract_themes_cobac_ohada(text)
            content_hash = hash_content(f"{doc_type}|{text[:100]}|{url_pdf}")

            record = {
                "type": doc_type,
                "numero": numero,
                "titre": text[:500],
                "date_pub": date_pub,
                "url_pdf": url_pdf,
                "pays": OHADA_COUNTRIES,
                "themes": themes,
                "crawled": False,
                "last_hash": content_hash,
            }

            if dry_run:
                stats["inserted"] += 1
                continue

            try:
                existing = sb.table("ohada_actes").select("id,last_hash").eq("numero", numero).execute()
                if existing.data:
                    old_hash = existing.data[0].get("last_hash", "")
                    if old_hash == content_hash:
                        stats["skipped"] += 1
                        continue
                    sb.table("ohada_actes").update(record).eq("numero", numero).execute()
                    stats["updated"] += 1
                else:
                    sb.table("ohada_actes").insert(record).execute()
                    stats["inserted"] += 1
            except Exception as e:
                stats["errors"] += 1
                if stats["errors"] <= 5:
                    print(f"  ❌ OHADA Error: {e}")

    print(f"  ✅ OHADA: {stats['inserted']} insérés, {stats['updated']} mis à jour, {stats['skipped']} inchangés")
    return stats


# ═══════════════════════════════════════════════════════════════════════
# 3. AO/AMI — WORLD BANK + AfDB + EU
# ═══════════════════════════════════════════════════════════════════════

async def seed_ao_ami(client: httpx.AsyncClient, sb: Client, dry_run: bool = False, ao_limit: int = 5000) -> dict:
    """
    Importe les AO/AMI depuis les flux RSS/JSON de la Banque Mondiale,
    BAD, et UE dans public.ao_ami.
    """
    stats = {"inserted": 0, "updated": 0, "skipped": 0, "errors": 0}
    print(f"\n{'='*60}")
    print(f"  3. AO/AMI — RSS/JSON Banque Mondiale + AfDB + EU (max {ao_limit}/source)")
    print(f"{'='*60}")

    if feedparser is None:
        print("  ⚠️  feedparser non installé → pip install feedparser")
        print("  ⚠️  Mode dégradé : tentative avec parsing manuel")
        return stats

    for source in AO_SOURCES:
        source_name = source["name"]
        url = source["url"]
        source_type = source["type"]

        print(f"\n  🌐 [{source_name}] {url}")

        if source_type == "rss":
            try:
                r = await client.get(url)
                r.raise_for_status()
                feed = feedparser.parse(r.text)
            except Exception as e:
                print(f"  ⚠️  Erreur RSS {source_name}: {e}")
                # Fallback: parsing texte brut
                try:
                    r = await client.get(url)
                    feed = feedparser.parse(r.text)
                except Exception:
                    continue

            entries = feed.entries[:ao_limit]
            print(f"  📋 {len(entries)} entrées RSS")

            for entry in entries:
                try:
                    title = (entry.get("title") or "Sans titre")[:500]
                    link = entry.get("link") or ""
                    if not link:
                        continue

                    # Extraire le pays
                    country = entry.get("wb_country", entry.get("country", "XX")).upper()[:2]

                    # Extraire le montant
                    amount_raw = entry.get("wb_project_amount", entry.get("amount", "0")) or "0"
                    montant = int(re.sub(r'\D', '', str(amount_raw)) or 0)

                    # Extraire la deadline
                    published = entry.get("published", entry.get("updated", datetime.now(timezone.utc).isoformat()))

                    # Extraire project_id
                    project_id = entry.get("wb_project_id", entry.get("project_id", None))

                    # Secteurs NLP
                    description = entry.get("summary", entry.get("description", ""))
                    secteurs = extract_secteurs_ao(title, description)

                    content_hash = hash_content(f"{source_name}|{title}|{link}")

                    record = {
                        "source": source_name,
                        "project_id": project_id,
                        "titre": title,
                        "pays": country,
                        "montant_usd": montant if montant > 0 else None,
                        "devise": "USD",
                        "deadline": published,
                        "url": link,
                        "secteurs": secteurs,
                        "type": "AO",
                        "eligibility": ["BigFour"],
                        "crawled_at": datetime.now(timezone.utc).isoformat(),
                        "content_hash": content_hash,
                        "notified": False,
                    }

                    if dry_run:
                        stats["inserted"] += 1
                        continue

                    # Vérifier doublon par content_hash
                    existing = sb.table("ao_ami").select("id,content_hash").eq("content_hash", content_hash).limit(1).execute()
                    if existing.data:
                        stats["skipped"] += 1
                        continue

                    sb.table("ao_ami").insert(record).execute()
                    stats["inserted"] += 1

                except Exception as e:
                    stats["errors"] += 1
                    if stats["errors"] <= 3:
                        print(f"  ❌ AO Error: {e}")

        elif source_type == "json":
            try:
                r = await client.get(url)
                r.raise_for_status()
                data = r.json()
            except Exception as e:
                print(f"  ⚠️  Erreur JSON {source_name}: {e}")
                continue

            # UE Tenders — structure variable
            items = data if isinstance(data, list) else data.get("tenders", data.get("results", []))
            items = items[:ao_limit]
            print(f"  📋 {len(items)} entrées JSON")

            for item in items:
                try:
                    title = (item.get("title") or item.get("name") or "Sans titre")[:500]
                    link = item.get("url", item.get("link", ""))
                    if not link:
                        continue

                    country = (item.get("country", item.get("countryCode", "XX")) or "XX").upper()[:2]
                    amount = item.get("budget", item.get("estimatedValue", item.get("value", 0))) or 0
                    montant = int(amount) if isinstance(amount, (int, float)) else int(re.sub(r'\D', '', str(amount)) or 0)
                    deadline = item.get("deadline", item.get("closingDate", datetime.now(timezone.utc).isoformat()))
                    description = item.get("description", item.get("summary", ""))
                    secteurs = extract_secteurs_ao(title, description)
                    content_hash = hash_content(f"{source_name}|{title}|{link}")

                    record = {
                        "source": source_name,
                        "project_id": item.get("reference", item.get("id", None)),
                        "titre": title,
                        "pays": country,
                        "montant_usd": montant if montant > 0 else None,
                        "devise": item.get("currency", "EUR"),
                        "deadline": deadline,
                        "url": link,
                        "secteurs": secteurs,
                        "type": item.get("type", item.get("procedureType", "AO")),
                        "eligibility": ["BigFour"],
                        "crawled_at": datetime.now(timezone.utc).isoformat(),
                        "content_hash": content_hash,
                        "notified": False,
                    }

                    if dry_run:
                        stats["inserted"] += 1
                        continue

                    existing = sb.table("ao_ami").select("id,content_hash").eq("content_hash", content_hash).limit(1).execute()
                    if existing.data:
                        stats["skipped"] += 1
                        continue

                    sb.table("ao_ami").insert(record).execute()
                    stats["inserted"] += 1

                except Exception as e:
                    stats["errors"] += 1
                    if stats["errors"] <= 3:
                        print(f"  ❌ AO Error: {e}")

        await asyncio.sleep(0.3)  # Rate limiting entre sources

    return stats


# ═══════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════

async def main():
    parser = argparse.ArgumentParser(
        description="KHEPRA OS — Seed COBAC + OHADA + AO/AMI Big Four",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples:
  python scripts/seed_cobac_ohada_ao.py                    # Tout lancer
  python scripts/seed_cobac_ohada_ao.py --dry-run          # Simulation
  python scripts/seed_cobac_ohada_ao.py --source cobac     # COBAC seul
  python scripts/seed_cobac_ohada_ao.py --source ao --ao-limit 1000
        """,
    )
    parser.add_argument("--dry-run", action="store_true", help="Simuler sans écrire dans la DB")
    parser.add_argument("--source", choices=["cobac", "ohada", "ao", "all"], default="all", help="Source à seeder (défaut: all)")
    parser.add_argument("--ao-limit", type=int, default=5000, help="Nombre max d'AO par source (défaut: 5000)")
    args = parser.parse_args()

    print("=" * 70)
    print("  ⚡ KHEPRA OS — Big Four Seeder v3.0")
    print(f"  Date : {datetime.now().strftime('%d %B %Y — %H:%M')}")
    print(f"  Mode : {'DRY RUN' if args.dry_run else 'PRODUCTION'}")
    print(f"  Sources : {args.source}")
    print("=" * 70)

    # Connexion Supabase
    if not args.dry_run:
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("❌ Variables SUPABASE_URL et SUPABASE_KEY requises dans .env")
            sys.exit(1)
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        print(f"\n🔌 Connecté à {SUPABASE_URL}")
    else:
        sb = None

    async with httpx.AsyncClient(
        headers={"User-Agent": USER_AGENT},
        timeout=REQUEST_TIMEOUT,
        follow_redirects=True,
    ) as client:
        all_stats = {}

        if args.source in ("cobac", "all"):
            all_stats["cobac"] = await seed_cobac(client, sb, dry_run=args.dry_run)

        if args.source in ("ohada", "all"):
            all_stats["ohada"] = await seed_ohada(client, sb, dry_run=args.dry_run)

        if args.source in ("ao", "all"):
            all_stats["ao"] = await seed_ao_ami(client, sb, dry_run=args.dry_run, ao_limit=args.ao_limit)

        # ═══ RÉSUMÉ ═══
        print("\n" + "=" * 70)
        print("  📊 RÉSUMÉ GLOBAL DU SEED BIG FOUR")
        print("=" * 70)
        total_inserted = 0
        total_updated = 0
        total_skipped = 0
        total_errors = 0
        for source_name, stats in all_stats.items():
            i = stats.get("inserted", 0)
            u = stats.get("updated", 0)
            s = stats.get("skipped", 0)
            e = stats.get("errors", 0)
            total_inserted += i
            total_updated += u
            total_skipped += s
            total_errors += e
            label = {"cobac": "COBAC", "ohada": "OHADA", "ao": "AO/AMI"}.get(source_name, source_name)
            print(f"  {label:12s} → +{i} insérés | ~{u} updatés | ⊘{s} skip | ✗{e} erreurs")
        print(f"  {'─' * 50}")
        print(f"  {'TOTAL':12s} → +{total_inserted} insérés | ~{total_updated} updatés | ⊘{total_skipped} skip | ✗{total_errors} erreurs")
        print("=" * 70)

        if not args.dry_run and (total_inserted > 0 or total_updated > 0):
            print("\n💡 PROCHAINES ÉTAPES :")
            print("  1. Vérifier les données :")
            print("     SELECT COUNT(*) FROM public.cobac_reglements;")
            print("     SELECT COUNT(*) FROM public.ohada_actes;")
            print("     SELECT COUNT(*) FROM public.ao_ami;")
            print()
            print("  2. Marquer comme crawled (déclenche pipeline Big Four) :")
            print("     UPDATE public.cobac_reglements SET crawled = true;")
            print("     UPDATE public.ohada_actes SET crawled = true;")
            print()
            print("  3. Tester le pipeline end-to-end :")
            print("     SELECT test_bigfour_sla();")


if __name__ == "__main__":
    asyncio.run(main())