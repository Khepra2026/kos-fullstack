#!/usr/bin/env python3
"""
KHEPRA OS — Seed BCEAO Circulars
================================
Importe les circulaires BCEAO depuis la page officielle des réglementations
dans la table public.circulars (Base Supabase KHEPRA).

Usage:
    python scripts/seed_bceao_circulaires.py
    python scripts/seed_bceao_circulaires.py --dry-run
    python scripts/seed_bceao_circulaires.py --pages 5  # Limiter à N pages

Prérequis:
    pip install httpx beautifulsoup4 supabase python-dotenv

Variables d'environnement (fichier .env):
    SUPABASE_URL=https://pgfwhahiwqvqeahpirjx.supabase.co
    SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
"""

import os
import re
import sys
import json
import argparse
import asyncio
from datetime import datetime
from pathlib import Path
from typing import Optional

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from supabase import create_client, Client


# ═══════════════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════

BASE_URL = "https://www.bceao.int"
LIST_URL = f"{BASE_URL}/fr/reglementations"
MAX_PAGES_DEFAULT = 15  # Nombre max de pages à scraper (sécurité)
USER_AGENT = "KHEPRA-Regulatory-Seeder/2.0 (Big Four; +https://khepraexperts.com)"

# Chargement .env depuis la racine du projet
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


# ═══════════════════════════════════════════════════════════════════════
# NLP — EXTRACTION DE THÈMES
# ═══════════════════════════════════════════════════════════════════════

def extract_themes(title: str, summary: str = "") -> list[str]:
    """
    Extraction NLP légère de thèmes à partir du titre et du résumé.
    Déaccentuation Unicode pour matcher sans les accents.
    """
    text = (title + " " + summary).lower()

    # Déaccentuation
    import unicodedata
    text_normalized = unicodedata.normalize('NFD', text)
    text_normalized = ''.join(c for c in text_normalized if unicodedata.category(c) != 'Mn')

    themes = []

    mapping = {
        "controle interne": "controle_interne",
        "controle permanent": "controle_interne",
        "3 lignes de defense": "controle_interne",
        "trois lignes de defense": "controle_interne",
        "gouvernance": "gouvernance",
        "conseil administration": "gouvernance",
        "administrateur": "gouvernance",
        "comite audit": "gouvernance",
        "comite risque": "gouvernance",
        "blanchiment": "lbc_ft",
        "financement terrorisme": "lbc_ft",
        "lcb": "lbc_ft",
        "lbc/ft": "lbc_ft",
        "gafi": "lbc_ft",
        "prudentiel": "prudentiel",
        "ratio": "prudentiel",
        "solvabilite": "prudentiel",
        "fonds propres": "prudentiel",
        "microfinance": "microfinance",
        "sfd": "microfinance",
        "emf": "microfinance",
        "systeme financier decentralise": "microfinance",
        "paiement": "paiement",
        "monnaie electronique": "paiement",
        "mobile money": "paiement",
        "digital": "transformation_digitale",
        "numerique": "transformation_digitale",
        "fintech": "transformation_digitale",
        "xbrl": "transformation_digitale",
        "esg": "esg",
        "durabilite": "esg",
        "climat": "esg",
        "continuite activite": "continuite_activite",
        "pca": "continuite_activite",
        "resilience": "continuite_activite",
        "relation exterieure": "relation_exterieure",
        "correspondant bancaire": "relation_exterieure",
        "comptabilite": "comptabilite",
        "plan comptable": "comptabilite",
        "ifrs": "comptabilite",
        "credit": "credit",
        "financement": "credit",
        "taux": "credit",
        "reporting": "reporting",
        "declaration": "reporting",
        "ppr": "ppr",
        "plan preventif": "ppr",
        "redressement": "ppr",
    }

    for keyword, theme in mapping.items():
        if keyword in text_normalized:
            if theme not in themes:
                themes.append(theme)

    return themes or ["general"]


# ═══════════════════════════════════════════════════════════════════════
# PARSING BCEAO
# ═══════════════════════════════════════════════════════════════════════

def parse_circular_number(raw_text: str) -> Optional[str]:
    """
    Extrait et normalise un numéro de circulaire BCEAO.
    Patterns supportés:
      - Avis N° 002-03-2026
      - Circulaire 01-2017/CB/C
      - Décision N° D-2026-001
      - Instruction N° 008-05-2018
      - N° 03-2017/CB/C
    """
    patterns = [
        r'(?:Avis|Circulaire|Décision|Decision|Instruction|Note)\s*(?:N[°º]?\s*)?(\d{2,4}[-/]\d{2,4}[-/][A-Z\d/]+)',
        r'N[°º]?\s*(\d{2,4}[-/]\d{2,4}[-/][A-Z\d/]+)',
        r'(\d{2,4}[-/]\d{2,4}[-/][A-Z]{1,3}(?:/[A-Z]{1,3})*)',
        r'(?:N[°º]?\s*)?(\d{2,4}[-/]\d{2,4})',
    ]

    for pattern in patterns:
        match = re.search(pattern, raw_text, re.IGNORECASE)
        if match:
            num = match.group(1).strip()
            # Normalisation : uniformiser les séparateurs
            num = re.sub(r'\s+', '', num)
            return num

    return None


def parse_date(raw_text: str) -> Optional[str]:
    """
    Extrait une date depuis du texte.
    Formats supportés: YYYY-MM-DD, DD/MM/YYYY, Publié le DD/MM/YYYY
    """
    patterns = [
        r'(\d{4}[-/]\d{2}[-/]\d{2})',
        r'(\d{2}/\d{2}/\d{4})',
        r'Publi[ée]\s+le\s+(\d{2}/\d{2}/\d{4})',
    ]

    for pattern in patterns:
        match = re.search(pattern, raw_text)
        if match:
            date_str = match.group(1)
            # Normaliser en YYYY-MM-DD
            if '/' in date_str:
                parts = date_str.split('/')
                if len(parts[2]) == 4:  # DD/MM/YYYY
                    return f"{parts[2]}-{parts[1]}-{parts[0]}"
                else:  # YYYY/MM/DD
                    return f"{parts[0]}-{parts[1]}-{parts[2]}"
            return date_str

    return None


async def scrape_page(client: httpx.AsyncClient, url: str) -> list[dict]:
    """
    Scrape une page de réglementations BCEAO.
    Structure BCEAO réelle:
      - <div class="itemReg views-row"> contient chaque texte
      - <span class="theme"> type (Avis, Décision, Instruction)
      - <span class="desc"> description avec numéro
      - <span class="date"> date de publication
      - <a> lien vers le PDF
    """
    items = []

    try:
        resp = await client.get(url, follow_redirects=True)
        resp.raise_for_status()
    except Exception as e:
        print(f"  ⚠️  Erreur HTTP {url}: {e}")
        return items

    soup = BeautifulSoup(resp.text, 'html.parser')

    # Stratégie 1: Structure .itemReg.views-row
    rows = soup.select('.itemReg, .views-row, article.reglement, div.regulation-item')

    # Stratégie 2: Fallback — parser les tableaux
    if not rows:
        rows = soup.select('table.views-table tbody tr, table.reglementation tbody tr')

    # Stratégie 3: Fallback — parser les liens avec texte réglementaire
    if not rows:
        rows = soup.select('a[href*="pdf"], a[href*="circulaire"], a[href*="reglement"], a[href*="decision"], a[href*="instruction"]')

    for row in rows:
        try:
            # Extraire le type
            type_el = row.select_one('.theme, .type, .category, td:first-child')
            doc_type = type_el.get_text(strip=True) if type_el else ""

            # Extraire la description et le numéro
            desc_el = row.select_one('.desc, .description, .title, td:nth-child(2), h3, h4')
            desc_text = desc_el.get_text(strip=True) if desc_el else ""

            # Extraire le lien PDF
            link_el = row.select_one('a[href]')
            pdf_url = ""
            if link_el:
                href = link_el.get('href', '')
                if href.startswith('http'):
                    pdf_url = href
                elif href.startswith('/'):
                    pdf_url = BASE_URL + href

            # Extraire la date
            date_el = row.select_one('.date, .pub-date, time, td:last-child')
            date_text = date_el.get_text(strip=True) if date_el else ""

            # Texte complet pour extraction
            full_text = f"{doc_type} {desc_text} {date_text}"

            # Extraction numéro
            numero = parse_circular_number(full_text)
            if not numero:
                # Essayer dans le lien
                if link_el:
                    link_text = link_el.get_text(strip=True)
                    numero = parse_circular_number(link_text)

            # Extraction date
            date_pub = parse_date(date_text) or parse_date(full_text)

            # Titre
            title = desc_text or doc_type or (link_el.get_text(strip=True) if link_el else "")

            if title and len(title) > 5:  # Éviter les entrées vides
                items.append({
                    "doc_type": doc_type,
                    "title": title[:500],
                    "circular_number": numero,
                    "date_issued": date_pub or "2010-01-01",
                    "official_url": pdf_url,
                    "full_text": full_text[:2000],
                })

        except Exception as e:
            print(f"  ⚠️  Erreur parsing ligne: {e}")
            continue

    return items


async def scrape_all_pages(client: httpx.AsyncClient, max_pages: int = MAX_PAGES_DEFAULT) -> list[dict]:
    """
    Scrape toutes les pages de réglementations BCEAO avec pagination.
    Détecte automatiquement le nombre de pages via ?page=N.
    """
    all_items = []

    for page_num in range(max_pages):
        url = LIST_URL if page_num == 0 else f"{LIST_URL}?page={page_num}"
        print(f"  📄 Scraping page {page_num + 1}: {url}")

        items = await scrape_page(client, url)

        if not items and page_num > 1:
            print(f"  ⏹️  Plus de résultats — arrêt après {page_num} pages")
            break

        all_items.extend(items)
        print(f"     → {len(items)} textes trouvés sur cette page")

        # Rate limiting — respecter le serveur
        if page_num < max_pages - 1:
            await asyncio.sleep(0.8)

    return all_items


# ═══════════════════════════════════════════════════════════════════════
# UPSERT SUPABASE
# ═══════════════════════════════════════════════════════════════════════

def upsert_circulars(sb: Client, items: list[dict], dry_run: bool = False) -> dict:
    """
    Upsert les circulaires dans la table public.circulars.
    Utilise circular_number comme clé de conflit.

    Returns:
        dict avec inserted, updated, skipped, errors
    """
    stats = {"inserted": 0, "updated": 0, "skipped": 0, "errors": 0}

    # Récupérer le regulator_id BCEAO
    try:
        result = sb.table("regulators").select("id").eq("code", "BCEAO").limit(1).execute()
        regulator_id = result.data[0]["id"] if result.data else None
    except Exception as e:
        print(f"  ⚠️  Impossible de récupérer regulator_id BCEAO: {e}")
        regulator_id = None

    for item in items:
        circular_number = item.get("circular_number")
        if not circular_number:
            stats["skipped"] += 1
            continue

        title = item.get("title", "").strip()
        if len(title) < 10:
            stats["skipped"] += 1
            continue

        themes = extract_themes(title, item.get("full_text", ""))

        record = {
            "reference": title[:200],
            "title": title,
            "circular_number": circular_number,
            "date_issued": item.get("date_issued", "2010-01-01"),
            "official_url": item.get("official_url", ""),
            "source_authority": "BCEAO",
            "regulator_id": regulator_id,
            "status": "in_force",
            "summary": item.get("full_text", "")[:1000],
            "keywords": themes,
            "domain": item.get("doc_type", "").lower(),
            "confidence_score": 85,
            "validation_status": "draft",
            "metadata": json.dumps({
                "source": "bceao.int",
                "scraper": "seed_bceao_circulaires.py",
                "scraped_at": datetime.now().isoformat(),
                "doc_type": item.get("doc_type", ""),
            }),
        }

        if dry_run:
            print(f"  [DRY RUN] Upsert: {circular_number} — {title[:80]}")
            stats["inserted"] += 1
            continue

        try:
            # Upsert: si le circular_number existe déjà, on met à jour
            existing = sb.table("circulars").select("id").eq("circular_number", circular_number).execute()
            if existing.data:
                sb.table("circulars").update(record).eq("circular_number", circular_number).execute()
                stats["updated"] += 1
                print(f"  🔄 Updated: {circular_number}")
            else:
                sb.table("circulars").insert(record).execute()
                stats["inserted"] += 1
                print(f"  ✅ Inserted: {circular_number} — {title[:60]}")

        except Exception as e:
            stats["errors"] += 1
            print(f"  ❌ Error {circular_number}: {e}")

    return stats


# ═══════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════

async def main():
    parser = argparse.ArgumentParser(
        description="KHEPRA OS — Seed BCEAO Circulars from bceao.int",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples:
  python scripts/seed_bceao_circulaires.py
  python scripts/seed_bceao_circulaires.py --dry-run
  python scripts/seed_bceao_circulaires.py --pages 3
  python scripts/seed_bceao_circulaires.py --no-supabase  # Scrape only, no DB write
        """,
    )
    parser.add_argument("--dry-run", action="store_true", help="Simuler sans écrire dans la DB")
    parser.add_argument("--pages", type=int, default=MAX_PAGES_DEFAULT, help=f"Nombre max de pages (défaut: {MAX_PAGES_DEFAULT})")
    parser.add_argument("--no-supabase", action="store_true", help="Scraper uniquement, pas d'upsert DB")
    args = parser.parse_args()

    print("=" * 70)
    print("  ⚡ KHEPRA OS — BCEAO Circulars Seeder v2.0")
    print(f"  Date : {datetime.now().strftime('%d %B %Y — %H:%M')}")
    print("  Source : https://www.bceao.int/fr/reglementations")
    print("=" * 70)

    # ═══ ÉTAPE 1 : Scraping ═══
    print("\n📡 ÉTAPE 1 : Scraping BCEAO...")
    async with httpx.AsyncClient(
        headers={"User-Agent": USER_AGENT},
        timeout=30.0,
        follow_redirects=True,
    ) as client:
        items = await scrape_all_pages(client, max_pages=args.pages)

    print(f"\n📊 Total : {len(items)} textes réglementaires trouvés sur {args.pages} pages")

    if not items:
        print("⚠️  Aucun texte trouvé. Vérifie la connexion ou la structure du site BCEAO.")
        return

    # Aperçu
    print("\n📋 APERÇU (5 premiers) :")
    for i, item in enumerate(items[:5]):
        themes = extract_themes(item["title"], item.get("full_text", ""))
        print(f"  {i+1}. [{item.get('doc_type', '?')}] {item['title'][:80]}")
        print(f"     N°: {item.get('circular_number', 'N/A')} | Date: {item.get('date_issued', 'N/A')}")
        print(f"     Thèmes: {', '.join(themes)}")
        print()

    if args.no_supabase or args.dry_run:
        if args.dry_run:
            print(f"\n🔍 DRY RUN — Aurait upserté {len(items)} circulaires")
        return

    # ═══ ÉTAPE 2 : Vérification Supabase ═══
    print("🔌 ÉTAPE 2 : Connexion Supabase...")
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ Variables SUPABASE_URL et SUPABASE_KEY requises dans .env")
        print("   Crée un fichier .env avec:")
        print("   SUPABASE_URL=https://pgfwhahiwqvqeahpirjx.supabase.co")
        print("   SUPABASE_KEY=...")
        sys.exit(1)

    sb = create_client(SUPABASE_URL, SUPABASE_KEY)
    print(f"   ✅ Connecté à {SUPABASE_URL}")

    # ═══ ÉTAPE 3 : Upsert ═══
    print("\n💾 ÉTAPE 3 : Upsert dans public.circulars...")
    stats = upsert_circulars(sb, items)

    # ═══ RÉSUMÉ ═══
    print("\n" + "=" * 70)
    print("  📊 RÉSUMÉ DU SEED BCEAO")
    print("=" * 70)
    print(f"  • Total scrapé    : {len(items)}")
    print(f"  • Insérés (nouveau) : {stats['inserted']}")
    print(f"  • Mis à jour        : {stats['updated']}")
    print(f"  • Ignorés (pas de N°): {stats['skipped']}")
    print(f"  • Erreurs           : {stats['errors']}")
    print("=" * 70)

    if stats["inserted"] > 0 or stats["updated"] > 0:
        print("\n💡 PROCHAINES ÉTAPES :")
        print("  1. Vérifier les données :")
        print("     SELECT circular_number, title FROM public.circulars WHERE source_authority='BCEAO';")
        print()
        print("  2. Générer les mappings SEO/GEO (5 pages par circulaire) :")
        print("     SELECT generate_circular_page_map('BCEAO');")
        print()
        print("  3. Marquer comme crawled (déclenche génération kb_pages + webhooks) :")
        print("     UPDATE public.circulars SET crawled = true WHERE source_authority='BCEAO';")
        print()
        print("  4. Tester le pipeline end-to-end :")
        print("     SELECT test_bigfour_sla();")


if __name__ == "__main__":
    asyncio.run(main())