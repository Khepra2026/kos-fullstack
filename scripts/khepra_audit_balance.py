#!/usr/bin/env python3
"""
KHEPRA OS — Module d'Audit de Balance Comptable BCEAO
=====================================================
Outil d'analyse prudentielle automatisée pour les Établissements de Microfinance (EMF/SFD)
conforme au Plan Comptable des Établissements de Microfinance (PCEMF) et aux ratios
prudentiels de la BCEAO (Règlement EMF-2010/02).

Usage:
    python khepra_audit_balance.py balance_comptable.xlsx
    python khepra_audit_balance.py balance_comptable.csv
    python khepra_audit_balance.py --demo

Auteur: KHEPRA EXPERTS — Regulatory & Financial Services BU
Version: 1.0.0 — 07 Juin 2026
Licence: Propriétaire KHEPRA EXPERTS
"""

import sys
import json
import argparse
from pathlib import Path
from datetime import datetime
from typing import Optional

import pandas as pd
import numpy as np


# ─────────────────────────────────────────────────────────────────────
# CONSTANTES RÉGLEMENTAIRES BCEAO
# ─────────────────────────────────────────────────────────────────────

SEUILS_PRUDENTIELS = {
    "R1_Couverture_Emplois_Stables": {
        "nom": "Couverture des Emplois Stables par les Ressources Stables",
        "norme": ">= 100%",
        "seuil_min": 100.0,
        "ref_reglementaire": "Règlement EMF-2010/02 — Art. 12",
    },
    "R2_Ratio_Liquidite": {
        "nom": "Ratio de Liquidité (Actifs CT / Passifs CT)",
        "norme": ">= 100%",
        "seuil_min": 100.0,
        "ref_reglementaire": "Règlement EMF-2010/02 — Art. 14",
    },
    "R3_Capitalisation_Sur_Credits": {
        "nom": "Norme de Capitalisation (Fonds Propres / Encours Crédits)",
        "norme": ">= 15%",
        "seuil_min": 15.0,
        "ref_reglementaire": "Règlement EMF-2010/02 — Art. 10",
    },
    "R4_Division_Risques": {
        "nom": "Norme de Division des Risques (Plus Gros Engagement / Fonds Propres)",
        "norme": "<= 25%",
        "seuil_max": 25.0,
        "ref_reglementaire": "Règlement EMF-2010/02 — Art. 16",
    },
    "R5_Couverture_Provisions": {
        "nom": "Taux de Couverture des Créances en Souffrance",
        "norme": ">= 60%",
        "seuil_min": 60.0,
        "ref_reglementaire": "Règlement EMF-2010/02 — Art. 18",
    },
}

CLASSES_COMPTABLES_PCEMF = {
    "classe_1": ("10", "11", "12", "13", "14", "15", "16", "17", "18", "19"),
    "classe_2": ("20", "21", "22", "23", "24", "25", "26", "27", "28", "29"),
    "classe_3": ("30", "31", "32", "33", "34", "35", "36", "37", "38", "39"),
    "classe_4": ("40", "41", "42", "43", "44", "45", "46", "47", "48", "49"),
    "classe_5": ("50", "51", "52", "53", "54", "55", "56", "57", "58", "59"),
}


# ─────────────────────────────────────────────────────────────────────
# FONCTIONS DE CHARGEMENT ET NETTOYAGE
# ─────────────────────────────────────────────────────────────────────


def charger_et_nettoyer_balance(filepath: str) -> Optional[pd.DataFrame]:
    """
    Charge la balance comptable et standardise les colonnes.

    Formats supportés: CSV, Excel (.xlsx, .xls)
    Colonnes attendues: Numéro_Compte, Intitulé, Débit, Crédit, Solde
    (accepte les variantes: compte, intitule, debit, credit, solde)

    Returns:
        DataFrame standardisé ou None en cas d'erreur.
    """
    try:
        suffix = Path(filepath).suffix.lower()
        if suffix == ".csv":
            df = pd.read_csv(filepath, sep=None, engine="python")
        elif suffix in (".xlsx", ".xls"):
            df = pd.read_excel(filepath)
        else:
            print(f"❌ Format non supporté : {suffix}. Utilisez .csv, .xlsx ou .xls")
            return None

        # Nettoyage des noms de colonnes
        df.columns = df.columns.str.strip().str.lower()

        # Détection et standardisation des colonnes obligatoires
        colonnes_requises = {
            "compte": ["compte", "numéro_compte", "numero_compte", "n°_compte", "n_compte"],
            "solde": ["solde", "solde_net", "solde_comptable"],
        }
        colonnes_optionnelles = {
            "intitule": ["intitulé", "intitule", "libellé", "libelle", "designation", "désignation"],
            "debit": ["débit", "debit", "mouvement_débit", "mouvement_debit"],
            "credit": ["crédit", "credit", "mouvement_crédit", "mouvement_credit"],
        }

        mapping = {}

        for col_standard, variantes in {**colonnes_requises, **colonnes_optionnelles}.items():
            for variante in variantes:
                if variante in df.columns:
                    mapping[variante] = col_standard
                    break

        df = df.rename(columns=mapping)

        if "compte" not in df.columns:
            print("❌ Colonne 'compte' introuvable. Colonnes détectées :", list(df.columns))
            return None
        if "solde" not in df.columns:
            print("❌ Colonne 'solde' introuvable. Colonnes détectées :", list(df.columns))
            return None

        # Standardisation
        df["compte"] = df["compte"].astype(str).str.strip().str.replace(r"[^\d]", "", regex=True)
        df["solde"] = pd.to_numeric(df["solde"], errors="coerce").fillna(0)

        if "debit" in df.columns:
            df["debit"] = pd.to_numeric(df["debit"], errors="coerce").fillna(0)
        if "credit" in df.columns:
            df["credit"] = pd.to_numeric(df["credit"], errors="coerce").fillna(0)

        print(f"✅ Balance chargée : {len(df)} lignes, {len(df.columns)} colonnes")
        return df

    except FileNotFoundError:
        print(f"❌ Fichier introuvable : {filepath}")
        return None
    except Exception as e:
        print(f"❌ Erreur lors du chargement de la balance : {e}")
        return None


# ─────────────────────────────────────────────────────────────────────
# CALCUL DES AGRÉGATS PRUDENTIELS
# ─────────────────────────────────────────────────────────────────────


def _somme_comptes(df: pd.DataFrame, prefixes: tuple) -> float:
    """Calcule la somme des soldes pour les comptes commençant par les préfixes donnés."""
    masque = df["compte"].apply(lambda x: any(x.startswith(p) for p in prefixes))
    return df.loc[masque, "solde"].sum()


def _somme_abs_comptes(df: pd.DataFrame, prefixes: tuple) -> float:
    """Calcule la somme des valeurs absolues des soldes."""
    masque = df["compte"].apply(lambda x: any(x.startswith(p) for p in prefixes))
    return df.loc[masque, "solde"].abs().sum()


def calculer_agregats_prudentiels(df: pd.DataFrame) -> dict:
    """
    Extrait et calcule les agrégats financiers basés sur le PCEMF.

    Returns:
        Dictionnaire des agrégats avec valeurs en FCFA.
    """
    agregats = {}

    # 1. Fonds Propres Nets — Classe 1 (hors provisions et dettes)
    #    10: Capital/Dotations, 11: Réserves, 12: Report à nouveau, 13: Résultat
    fp = _somme_comptes(df, ("10", "11", "12", "13"))
    #    14: Subventions
    fp += _somme_comptes(df, ("14",))
    agregats["fonds_propres_nets"] = fp

    # 2. Encours de Crédits Bruts — Classe 2 (hors provisions 29)
    credits_bruts = _somme_comptes(df, ("20", "21", "22", "23", "24", "25", "26", "27", "28"))
    agregats["encours_credits_bruts"] = credits_bruts

    # 3. Provisions pour Créances en Souffrance — Comptes 29xx
    provisions = _somme_abs_comptes(df, ("29",))
    agregats["provisions_credits"] = provisions

    # 4. Créances en Souffrance Brutes (estimation: comptes 25xx + 26xx)
    creances_souffrance = _somme_comptes(df, ("25", "26"))
    agregats["creances_souffrance_brutes"] = creances_souffrance

    # 5. Encours des Dépôts — Comptes 16xx (Dépôts) et 17xx (Dettes CT)
    depots = _somme_abs_comptes(df, ("16", "17"))
    agregats["total_depots"] = depots

    # 6. Actifs Liquides — Classe 5 (Caisse, Banques, CCP, Placements CT)
    liquidites = _somme_comptes(df, ("50", "51", "52", "53", "54", "55", "56", "57", "58"))
    agregats["actifs_liquides"] = liquidites

    # 7. Total Actif
    total_actif = _somme_comptes(df, CLASSES_COMPTABLES_PCEMF["classe_1"])
    total_actif += _somme_comptes(df, CLASSES_COMPTABLES_PCEMF["classe_2"])
    total_actif += _somme_comptes(df, CLASSES_COMPTABLES_PCEMF["classe_3"])
    total_actif += _somme_comptes(df, CLASSES_COMPTABLES_PCEMF["classe_4"])
    total_actif += _somme_comptes(df, CLASSES_COMPTABLES_PCEMF["classe_5"])
    agregats["total_actif"] = total_actif

    # 8. Engagements Court Terme (Dépôts à vue + Dettes CT estimées)
    agregats["engagements_ct"] = agregats["total_depots"] * 0.70

    # 9. Plus Gros Engagement Individuel (estimation: 25% max du portefeuille si non fourni)
    agregats["plus_gros_engagement"] = agregats["encours_credits_bruts"] * 0.08

    return agregats


# ─────────────────────────────────────────────────────────────────────
# ÉVALUATION DES RATIOS PRUDENTIELS BCEAO
# ─────────────────────────────────────────────────────────────────────


def evaluer_ratios_bceao(agregats: dict) -> dict:
    """
    Calcule les ratios prudentiels officiels et applique les seuils réglementaires BCEAO.

    Returns:
        Dictionnaire structuré avec valeur, norme, seuil, statut et référence.
    """
    ratios = {}
    epsilon = 1  # Évite la division par zéro

    # R1 — Couverture des Emplois Stables
    ratios["R1_Couverture_Emplois_Stables"] = {
        "nom": SEUILS_PRUDENTIELS["R1_Couverture_Emplois_Stables"]["nom"],
        "valeur": round(
            (agregats["fonds_propres_nets"] / (agregats["encours_credits_bruts"] + epsilon)) * 100,
            2,
        ),
        "norme": SEUILS_PRUDENTIELS["R1_Couverture_Emplois_Stables"]["norme"],
        "seuil": SEUILS_PRUDENTIELS["R1_Couverture_Emplois_Stables"]["seuil_min"],
        "ref": SEUILS_PRUDENTIELS["R1_Couverture_Emplois_Stables"]["ref_reglementaire"],
    }

    # R2 — Ratio de Liquidité
    ratios["R2_Ratio_Liquidite"] = {
        "nom": SEUILS_PRUDENTIELS["R2_Ratio_Liquidite"]["nom"],
        "valeur": round(
            (agregats["actifs_liquides"] / (agregats["engagements_ct"] + epsilon)) * 100,
            2,
        ),
        "norme": SEUILS_PRUDENTIELS["R2_Ratio_Liquidite"]["norme"],
        "seuil": SEUILS_PRUDENTIELS["R2_Ratio_Liquidite"]["seuil_min"],
        "ref": SEUILS_PRUDENTIELS["R2_Ratio_Liquidite"]["ref_reglementaire"],
    }

    # R3 — Capitalisation
    ratios["R3_Capitalisation_Sur_Credits"] = {
        "nom": SEUILS_PRUDENTIELS["R3_Capitalisation_Sur_Credits"]["nom"],
        "valeur": round(
            (agregats["fonds_propres_nets"] / (agregats["encours_credits_bruts"] + epsilon)) * 100,
            2,
        ),
        "norme": SEUILS_PRUDENTIELS["R3_Capitalisation_Sur_Credits"]["norme"],
        "seuil": SEUILS_PRUDENTIELS["R3_Capitalisation_Sur_Credits"]["seuil_min"],
        "ref": SEUILS_PRUDENTIELS["R3_Capitalisation_Sur_Credits"]["ref_reglementaire"],
    }

    # R4 — Division des Risques
    ratios["R4_Division_Risques"] = {
        "nom": SEUILS_PRUDENTIELS["R4_Division_Risques"]["nom"],
        "valeur": round(
            (agregats["plus_gros_engagement"] / (agregats["fonds_propres_nets"] + epsilon)) * 100,
            2,
        ),
        "norme": SEUILS_PRUDENTIELS["R4_Division_Risques"]["norme"],
        "seuil": SEUILS_PRUDENTIELS["R4_Division_Risques"]["seuil_max"],
        "ref": SEUILS_PRUDENTIELS["R4_Division_Risques"]["ref_reglementaire"],
    }

    # R5 — Couverture des Provisions
    ratios["R5_Couverture_Provisions"] = {
        "nom": SEUILS_PRUDENTIELS["R5_Couverture_Provisions"]["nom"],
        "valeur": round(
            (agregats["provisions_credits"] / (agregats["creances_souffrance_brutes"] + epsilon))
            * 100,
            2,
        ),
        "norme": SEUILS_PRUDENTIELS["R5_Couverture_Provisions"]["norme"],
        "seuil": SEUILS_PRUDENTIELS["R5_Couverture_Provisions"]["seuil_min"],
        "ref": SEUILS_PRUDENTIELS["R5_Couverture_Provisions"]["ref_reglementaire"],
    }

    # Évaluation automatique des statuts
    for k, v in ratios.items():
        if "seuil_min" in SEUILS_PRUDENTIELS.get(k, {}):
            seuil = SEUILS_PRUDENTIELS[k]["seuil_min"]
            v["statut"] = "CONFORME" if v["valeur"] >= seuil else "NON-CONFORME"
        elif "seuil_max" in SEUILS_PRUDENTIELS.get(k, {}):
            seuil = SEUILS_PRUDENTIELS[k]["seuil_max"]
            v["statut"] = "CONFORME" if v["valeur"] <= seuil else "NON-CONFORME"
        else:
            v["statut"] = "NON ÉVALUÉ"

    return ratios


# ─────────────────────────────────────────────────────────────────────
# SCORING KHEPRA DE LA SANTÉ PRUDENTIELLE
# ─────────────────────────────────────────────────────────────────────


def calculer_score_khepra(ratios: dict) -> dict:
    """
    Calcule un score composite de santé prudentielle sur 100 points.

    Pondérations:
        - R1 Couverture Emplois Stables : 25%
        - R2 Ratio Liquidité : 25%
        - R3 Capitalisation : 25%
        - R4 Division Risques : 15%
        - R5 Couverture Provisions : 10%
    """
    ponderation = {
        "R1_Couverture_Emplois_Stables": 0.25,
        "R2_Ratio_Liquidite": 0.25,
        "R3_Capitalisation_Sur_Credits": 0.25,
        "R4_Division_Risques": 0.15,
        "R5_Couverture_Provisions": 0.10,
    }

    score = 0.0
    details = {}

    for cle, poids in ponderation.items():
        if cle not in ratios:
            continue
        valeur = ratios[cle]["valeur"]
        statut = ratios[cle]["statut"]

        if statut == "CONFORME":
            score_ratio = poids * 100
        else:
            # Score dégressif selon l'écart au seuil
            if "seuil_min" in SEUILS_PRUDENTIELS.get(cle, {}):
                seuil = SEUILS_PRUDENTIELS[cle]["seuil_min"]
                proportion = min(valeur / max(seuil, 1), 1.0)
                score_ratio = poids * proportion * 100
            elif "seuil_max" in SEUILS_PRUDENTIELS.get(cle, {}):
                seuil = SEUILS_PRUDENTIELS[cle]["seuil_max"]
                proportion = min(max(seuil, 1) / max(valeur, 1), 1.0)
                score_ratio = poids * proportion * 100
            else:
                score_ratio = 0

        score += score_ratio
        details[cle] = {
            "poids": f"{poids * 100:.0f}%",
            "score": round(score_ratio, 1),
            "valeur": valeur,
            "statut": statut,
        }

    score_global = round(score, 1)

    if score_global >= 85:
        appreciation = "EXCELLENCE — Santé prudentielle robuste"
    elif score_global >= 70:
        appreciation = "BON — Quelques axes d'amélioration"
    elif score_global >= 55:
        appreciation = "ACCEPTABLE — Surveillance renforcée requise"
    elif score_global >= 40:
        appreciation = "INSUFFISANT — Plan de redressement nécessaire"
    else:
        appreciation = "CRITIQUE — Intervention urgente requise"

    return {"score_global": score_global, "appreciation": appreciation, "details": details}


# ─────────────────────────────────────────────────────────────────────
# GÉNÉRATION DU RAPPORT
# ─────────────────────────────────────────────────────────────────────


def generer_rapport_readdy(
    filepath_balance: str, output_json: bool = False
) -> Optional[dict]:
    """
    Fonction principale exécutant le pipeline d'analyse prudentielle KHEPRA.

    Args:
        filepath_balance: Chemin vers la balance comptable (.csv, .xlsx, .xls)
        output_json: Si True, retourne les résultats en dict pour export JSON

    Returns:
        Dictionnaire des résultats si output_json=True, sinon None.
    """
    print("=" * 70)
    print("  ⚡ KHEPRA OS — AUDIT DE BALANCE COMPTABLE BCEAO")
    print(f"  Date : {datetime.now().strftime('%d %B %Y — %H:%M')}")
    print("=" * 70)

    df = charger_et_nettoyer_balance(filepath_balance)
    if df is None:
        return None

    agregats = calculer_agregats_prudentiels(df)
    ratios = evaluer_ratios_bceao(agregats)
    score = calculer_score_khepra(ratios)

    # ── Affichage des Agrégats ──
    print("\n" + "─" * 70)
    print("  📊 AGRÉGATS FINANCIERS EXTRAITS (PCEMF)")
    print("─" * 70)
    for k, v in agregats.items():
        print(f"  • {k.replace('_', ' ').title():40s} : {v:>15,.0f} FCFA")

    # ── Affichage des Ratios ──
    print("\n" + "─" * 70)
    print("  ⚖️  CONTRÔLE DES RATIOS PRUDENTIELS BCEAO")
    print("─" * 70)
    for cle, r in ratios.items():
        emoji = "🟢" if r["statut"] == "CONFORME" else "🔴"
        print(f"  {emoji} {r['nom']}")
        print(f"       Valeur : {r['valeur']:.2f}% | Norme : {r['norme']} | {r['statut']}")
        print(f"       Réf    : {r['ref']}")
        print()

    # ── Score KHEPRA ──
    print("─" * 70)
    print(f"  🏆 SCORE KHEPRA DE SANTÉ PRUDENTIELLE : {score['score_global']}/100")
    print(f"  📋 Appréciation : {score['appreciation']}")
    print("─" * 70)
    print("  Détail par ratio :")
    for cle, d in score["details"].items():
        emoji = "🟢" if d["statut"] == "CONFORME" else "🔴"
        print(
            f"  {emoji} {cle} — Poids {d['poids']} | Score {d['score']:.1f} "
            f"| Valeur {d['valeur']:.2f}% | {d['statut']}"
        )

    # ── Recommandations automatiques ──
    print("\n" + "─" * 70)
    print("  🔧 RECOMMANDATIONS KHEPRA")
    print("─" * 70)
    recommandations = generer_recommandations(ratios, agregats)
    for i, rec in enumerate(recommandations, 1):
        print(f"  {i}. {rec}")

    print("\n" + "=" * 70)
    print("  ✅ Audit terminé — KHEPRA OS v1.0.0")
    print("=" * 70)

    if output_json:
        return {
            "metadata": {
                "outil": "KHEPRA OS — Audit Balance BCEAO",
                "version": "1.0.0",
                "date": datetime.now().isoformat(),
                "fichier_source": filepath_balance,
            },
            "agregats": agregats,
            "ratios": ratios,
            "score_khepra": score,
            "recommandations": recommandations,
        }

    return None


def generer_recommandations(ratios: dict, agregats: dict) -> list:
    """Génère des recommandations automatiques basées sur les non-conformités."""
    recommandations = []

    non_conformes = {k: v for k, v in ratios.items() if v["statut"] == "NON-CONFORME"}

    if not non_conformes:
        recommandations.append(
            "✅ Tous les ratios sont conformes. Maintenir le dispositif de pilotage prudentiel "
            "et anticiper les évolutions réglementaires BCEAO."
        )
        return recommandations

    if "R3_Capitalisation_Sur_Credits" in non_conformes:
        recommandations.append(
            "🔴 SOUS-CAPITALISATION : Renforcer les fonds propres par augmentation de capital, "
            "incorporation de réserves, ou attraction d'investisseurs. Envisager une réduction "
            "temporaire de la croissance du portefeuille de crédit."
        )

    if "R1_Couverture_Emplois_Stables" in non_conformes:
        recommandations.append(
            "🔴 EMPLOIS STABLES NON COUVERTS : Rééquilibrer la structure de financement — "
            "augmenter les ressources stables (capital, emprunts LT) ou réduire les emplois "
            "stables (crédits LT). Présenter un Plan Préventif de Redressement (PPR) à la BCEAO."
        )

    if "R2_Ratio_Liquidite" in non_conformes:
        recommandations.append(
            "🔴 TENSION DE LIQUIDITÉ : Renforcer la trésorerie — négocier des lignes de "
            "refinancement, réduire les engagements à vue, sécuriser des dépôts stables. "
            "Mettre en place un tableau de bord de liquidité quotidien."
        )

    if "R4_Division_Risques" in non_conformes:
        recommandations.append(
            "🔴 CONCENTRATION EXCESSIVE : Diversifier le portefeuille de crédit. Identifier "
            "les gros engagements et établir un plan de réduction progressive. Mettre en "
            "conformité avec le seuil de 25% des fonds propres."
        )

    if "R5_Couverture_Provisions" in non_conformes:
        recommandations.append(
            "🔴 PROVISIONNEMENT INSUFFISANT : Renforcer les provisions sur créances en "
            "souffrance conformément à la grille COBAC (Classes 0-6). Documenter les "
            "méthodes de calcul des provisions et les faire valider par le CAR."
        )

    return recommandations


# ─────────────────────────────────────────────────────────────────────
# DONNÉES DE DÉMONSTRATION
# ─────────────────────────────────────────────────────────────────────


def generer_balance_demo() -> pd.DataFrame:
    """
    Génère une balance comptable fictive pour démonstration.
    Représente un EMF de taille moyenne en zone UEMOA.
    """
    np.random.seed(42)

    comptes_demo = [
        # Classe 1 — Capitaux Propres et Dettes
        ("10", "Capital social", 0, 0, 500_000_000),
        ("11", "Réserves légales", 0, 0, 85_000_000),
        ("12", "Report à nouveau créditeur", 0, 0, 12_500_000),
        ("13", "Résultat net de l'exercice", 0, 0, 42_300_000),
        ("16", "Dépôts à vue", 0, 0, -320_000_000),
        ("17", "Dettes à court terme", 0, 0, -85_000_000),
        ("18", "Emprunts à long terme", 0, 0, -150_000_000),
        ("19", "Provisions pour risques", 0, 0, -18_000_000),
        # Classe 2 — Créances
        ("20", "Crédits court terme", 0, 0, 450_000_000),
        ("21", "Crédits moyen terme", 0, 0, 280_000_000),
        ("22", "Crédits long terme", 0, 0, 120_000_000),
        ("25", "Créances douteuses", 0, 0, 38_000_000),
        ("26", "Créances contentieuses", 0, 0, 12_000_000),
        ("29", "Provisions pour dépréciation créances", 0, 0, -28_000_000),
        # Classe 3 — Stocks
        ("31", "Stocks de fournitures", 0, 0, 3_500_000),
        # Classe 4 — Tiers
        ("40", "Fournisseurs", 0, 0, -5_200_000),
        ("41", "Clients", 0, 0, 8_300_000),
        ("42", "Personnel — avances", 0, 0, 1_200_000),
        ("44", "État — impôts à payer", 0, 0, -6_800_000),
        ("45", "Organismes sociaux", 0, 0, -3_400_000),
        # Classe 5 — Trésorerie
        ("50", "Caisse", 0, 0, 25_000_000),
        ("51", "Banques — comptes courants", 0, 0, 95_000_000),
        ("52", "CCP", 0, 0, 5_500_000),
        ("55", "Placements à court terme", 0, 0, 30_000_000),
        ("58", "Virements internes", 0, 0, 0),
    ]

    data = []
    for compte, intitule, debit, credit, solde in comptes_demo:
        data.append(
            {
                "compte": compte,
                "intitule": intitule,
                "debit": debit,
                "credit": credit,
                "solde": solde,
            }
        )

    return pd.DataFrame(data)


# ─────────────────────────────────────────────────────────────────────
# POINT D'ENTRÉE CLI
# ─────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="KHEPRA OS — Audit de Balance Comptable BCEAO pour EMF/SFD",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples:
  python khepra_audit_balance.py balance_2026.xlsx
  python khepra_audit_balance.py balance_2026.csv --json resultats.json
  python khepra_audit_balance.py --demo
        """,
    )
    parser.add_argument(
        "fichier",
        nargs="?",
        help="Chemin vers la balance comptable (.csv, .xlsx, .xls)",
    )
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Lancer l'audit avec des données de démonstration",
    )
    parser.add_argument(
        "--json",
        metavar="FICHIER",
        help="Exporter les résultats au format JSON",
    )

    args = parser.parse_args()

    if args.demo:
        print("🧪 Mode démonstration — Données fictives générées\n")
        df = generer_balance_demo()
        agregats = calculer_agregats_prudentiels(df)
        ratios = evaluer_ratios_bceao(agregats)
        score = calculer_score_khepra(ratios)

        print("─" * 70)
        print("  📊 AGRÉGATS FINANCIERS (DÉMO)")
        print("─" * 70)
        for k, v in agregats.items():
            print(f"  • {k.replace('_', ' ').title():40s} : {v:>15,.0f} FCFA")

        print("\n" + "─" * 70)
        print("  ⚖️  RATIOS PRUDENTIELS BCEAO (DÉMO)")
        print("─" * 70)
        for cle, r in ratios.items():
            emoji = "🟢" if r["statut"] == "CONFORME" else "🔴"
            print(f"  {emoji} {r['nom']}")
            print(f"       Valeur : {r['valeur']:.2f}% | Norme : {r['norme']} | {r['statut']}")

        print("\n─" * 70)
        print(f"  🏆 SCORE KHEPRA : {score['score_global']}/100 — {score['appreciation']}")
        print("─" * 70)

        # Afficher recommandations
        recs = generer_recommandations(ratios, agregats)
        print("\n🔧 RECOMMANDATIONS :")
        for i, rec in enumerate(recs, 1):
            print(f"  {i}. {rec}")

        if args.json:
            resultat = {
                "metadata": {
                    "outil": "KHEPRA OS — Audit Balance BCEAO",
                    "version": "1.0.0",
                    "date": datetime.now().isoformat(),
                    "mode": "demo",
                },
                "agregats": {k: int(v) for k, v in agregats.items()},
                "ratios": ratios,
                "score_khepra": score,
                "recommandations": recs,
            }
            with open(args.json, "w", encoding="utf-8") as f:
                json.dump(resultat, f, ensure_ascii=False, indent=2)
            print(f"\n✅ Résultats exportés → {args.json}")
        return

    if not args.fichier:
        parser.print_help()
        print("\n❌ Veuillez spécifier un fichier ou utiliser --demo")
        sys.exit(1)

    resultat = generer_rapport_readdy(args.fichier, output_json=bool(args.json))

    if args.json and resultat:
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(resultat, f, ensure_ascii=False, indent=2)
        print(f"\n✅ Résultats exportés → {args.json}")


if __name__ == "__main__":
    main()