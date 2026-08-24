#!/usr/bin/env python3
"""
KHEPRA OS — Module d'Analyse PAR & Provisions BCEAO
=====================================================
Outil d'analyse du portefeuille de crédits et de calcul des provisions
réglementaires pour les Établissements de Microfinance (EMF/SFD) en zone UEMOA.
Conforme à la grille COBAC de provisionnement et aux normes BCEAO.

Usage:
    python khepra_calcul_par_provisions.py portefeuille_credits.xlsx
    python khepra_calcul_par_provisions.py portefeuille_credits.csv
    python khepra_calcul_par_provisions.py --demo

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
# CONSTANTES RÉGLEMENTAIRES BCEAO / COBAC
# ─────────────────────────────────────────────────────────────────────

CLASSES_RISQUE = [
    "Sain",
    "Sensible (PAR 1-30)",
    "Pré-douteux (PAR 31-90)",
    "Douteux (PAR 91-180)",
    "Compromis (PAR >180)",
]

GRILLE_PROVISIONNEMENT = {
    "Sensible (PAR 1-30)": {
        "taux_base": 0.00,
        "description": "Suivi simple — pas de provisionnement obligatoire",
        "ref_reglementaire": "Grille COBAC — Classe 1",
    },
    "Pré-douteux (PAR 31-90)": {
        "taux_base": 0.40,
        "description": "Provisionnement à 40% du capital restant dû",
        "ref_reglementaire": "Grille COBAC — Classe 2",
    },
    "Douteux (PAR 91-180)": {
        "taux_avec_garantie": 0.50,
        "taux_sans_garantie": 1.00,
        "description": "50% avec garantie réelle, 100% sans garantie",
        "ref_reglementaire": "Grille COBAC — Classe 3",
    },
    "Compromis (PAR >180)": {
        "taux_base": 1.00,
        "description": "Provisionnement intégral à 100% — créances compromises",
        "ref_reglementaire": "Grille COBAC — Classes 4-6",
    },
}

SEUILS_PAR = {
    "PAR_30": {"alerte": 5.0, "critique": 10.0, "description": "Portefeuille à Risque > 30 jours"},
    "PAR_90": {"alerte": 3.0, "critique": 5.0, "description": "Portefeuille à Risque > 90 jours"},
    "Taux_Couverture": {"alerte": 70.0, "critique": 60.0, "description": "Provisions / Créances en souffrance"},
}

GARANTIES_REELLES = [
    "reelle", "réelle", "hypothèque", "hypotheque", "nantissement",
    "hypothecaire", "hypothécaire", "garantie_reelle", "garantie réelle",
    "immobiliere", "immobilière",
]


# ─────────────────────────────────────────────────────────────────────
# FONCTIONS DE CHARGEMENT ET NETTOYAGE
# ─────────────────────────────────────────────────────────────────────


def charger_et_nettoyer_portefeuille(filepath: str) -> Optional[pd.DataFrame]:
    """
    Charge le fichier de portefeuille de crédits et standardise les colonnes.

    Formats supportés: CSV, Excel (.xlsx, .xls)
    Colonnes attendues: id_credit, capital_restant_du, jours_retard, nature_garantie
    (accepte les variantes françaises)

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
        mapping_colonnes = {}

        # Colonne ID crédit
        for variante in ["id_credit", "id_crédit", "id_client", "numero_credit", "numéro_crédit", "n_credit", "reference"]:
            if variante in df.columns:
                mapping_colonnes[variante] = "id_credit"
                break

        # Colonne capital restant dû
        for variante in ["capital_restant_du", "capital_restant_dû", "capital_restant", "encours", "crédit_restant", "encours_credit", "solde_credit"]:
            if variante in df.columns:
                mapping_colonnes[variante] = "capital_restant_du"
                break

        # Colonne jours de retard
        for variante in ["jours_retard", "retard_jours", "nb_jours_retard", "retard", "arrieres", "arriérés_jours"]:
            if variante in df.columns:
                mapping_colonnes[variante] = "jours_retard"
                break

        # Colonne nature garantie
        for variante in ["nature_garantie", "type_garantie", "garantie", "surete", "sûreté"]:
            if variante in df.columns:
                mapping_colonnes[variante] = "nature_garantie"
                break

        df = df.rename(columns=mapping_colonnes)

        # Vérification des colonnes obligatoires
        colonnes_obligatoires = ["id_credit", "capital_restant_du", "jours_retard"]
        manquantes = [c for c in colonnes_obligatoires if c not in df.columns]
        if manquantes:
            print(f"❌ Colonnes obligatoires manquantes : {manquantes}")
            print(f"   Colonnes détectées : {list(df.columns)}")
            return None

        # Standardisation
        df["id_credit"] = df["id_credit"].astype(str).str.strip()
        df["capital_restant_du"] = pd.to_numeric(df["capital_restant_du"], errors="coerce").fillna(0)
        df["jours_retard"] = pd.to_numeric(df["jours_retard"], errors="coerce").fillna(0).astype(int)

        # Si nature_garantie non fournie, créer colonne avec "autre/sans"
        if "nature_garantie" not in df.columns:
            df["nature_garantie"] = "autre/sans"
        else:
            df["nature_garantie"] = df["nature_garantie"].astype(str).str.strip().str.lower()

        # Filtrage des crédits avec capital > 0
        nb_initial = len(df)
        df = df[df["capital_restant_du"] > 0].copy()
        nb_exclus = nb_initial - len(df)
        if nb_exclus > 0:
            print(f"ℹ️  {nb_exclus} crédit(s) exclus (capital restant dû = 0)")

        print(f"✅ Portefeuille chargé : {len(df)} crédits actifs")
        return df

    except FileNotFoundError:
        print(f"❌ Fichier introuvable : {filepath}")
        return None
    except Exception as e:
        print(f"❌ Erreur lors du chargement du portefeuille : {e}")
        return None


# ─────────────────────────────────────────────────────────────────────
# FONCTION DE DÉTECTION GARANTIE RÉELLE
# ─────────────────────────────────────────────────────────────────────


def est_garantie_reelle(nature: str) -> bool:
    """Détermine si la garantie est de nature réelle au sens COBAC."""
    if not nature or nature in ["nan", "none", ""]:
        return False
    nature_lower = nature.lower().strip()
    return any(g in nature_lower for g in GARANTIES_REELLES)


# ─────────────────────────────────────────────────────────────────────
# FONCTION PRINCIPALE — CALCUL PAR ET PROVISIONS
# ─────────────────────────────────────────────────────────────────────


def calculer_par_et_provisions(df_portefeuille: pd.DataFrame) -> dict:
    """
    Analyse l'état du portefeuille de crédits et calcule les provisions réglementaires BCEAO.

    Format attendu de df_portefeuille :
        ['id_credit', 'capital_restant_du', 'jours_retard', 'nature_garantie']

    Returns:
        Dictionnaire structuré avec indicateurs PAR, provisions et matrice détaillée.
    """
    df = df_portefeuille.copy()

    # ── 1. Classification des risques ──
    df["classe_risque"] = "Sain"
    df["taux_provision"] = 0.0

    # Sensible : 1 à 30 jours
    masque_sensible = (df["jours_retard"] >= 1) & (df["jours_retard"] <= 30)
    df.loc[masque_sensible, "classe_risque"] = "Sensible (PAR 1-30)"

    # Pré-douteux : 31 à 90 jours
    masque_predouteux = (df["jours_retard"] >= 31) & (df["jours_retard"] <= 90)
    df.loc[masque_predouteux, "classe_risque"] = "Pré-douteux (PAR 31-90)"

    # Douteux : 91 à 180 jours
    masque_douteux = (df["jours_retard"] >= 91) & (df["jours_retard"] <= 180)
    df.loc[masque_douteux, "classe_risque"] = "Douteux (PAR 91-180)"

    # Compromis : > 180 jours
    masque_compromis = df["jours_retard"] > 180
    df.loc[masque_compromis, "classe_risque"] = "Compromis (PAR >180)"

    # ── 2. Application des taux de provisionnement ──

    # Sensible : 0% (suivi simple)
    df.loc[df["classe_risque"] == "Sensible (PAR 1-30)", "taux_provision"] = 0.00

    # Pré-douteux : 40%
    df.loc[df["classe_risque"] == "Pré-douteux (PAR 31-90)", "taux_provision"] = 0.40

    # Douteux : 50% si garantie réelle, 100% sinon
    df["garantie_reelle"] = df["nature_garantie"].apply(est_garantie_reelle)
    df.loc[
        (df["classe_risque"] == "Douteux (PAR 91-180)") & (df["garantie_reelle"]),
        "taux_provision",
    ] = 0.50
    df.loc[
        (df["classe_risque"] == "Douteux (PAR 91-180)") & (~df["garantie_reelle"]),
        "taux_provision",
    ] = 1.00

    # Compromis : 100%
    df.loc[df["classe_risque"] == "Compromis (PAR >180)", "taux_provision"] = 1.00

    # ── 3. Calcul de la dotation aux provisions par ligne ──
    df["provision_a_constituer"] = df["capital_restant_du"] * df["taux_provision"]

    # ── 4. Consolidation des indicateurs clés ──
    total_encours = df["capital_restant_du"].sum()
    encours_en_risque_30 = df[df["jours_retard"] > 30]["capital_restant_du"].sum()
    encours_en_risque_90 = df[df["jours_retard"] > 90]["capital_restant_du"].sum()
    total_provisions = df["provision_a_constituer"].sum()

    # PAR 1-30 (inclut sensible)
    encours_par_1_30 = df[df["jours_retard"] >= 1]["capital_restant_du"].sum()

    # Matrice synthèse détaillée
    matrice_synthase = (
        df.groupby("classe_risque")
        .agg(
            Nombre_Crédits=("id_credit", "count"),
            Encours_Total=("capital_restant_du", "sum"),
            Provisions_À_Constituer=("provision_a_constituer", "sum"),
        )
        .reindex(CLASSES_RISQUE)
        .fillna(0)
    )

    # Taux de couverture : provisions / créances en souffrance (>30j)
    taux_couverture = (
        (total_provisions / encours_en_risque_30 * 100) if encours_en_risque_30 > 0 else 0
    )

    # ── 5. Analyse des concentrations ──
    top_10_credits = df.nlargest(10, "capital_restant_du")[
        ["id_credit", "capital_restant_du", "jours_retard", "classe_risque"]
    ]
    concentration_top10 = (
        (top_10_credits["capital_restant_du"].sum() / total_encours * 100)
        if total_encours > 0
        else 0
    )

    # Distribution par tranche de retard
    distribution_retard = df.groupby(
        pd.cut(
            df["jours_retard"],
            bins=[0, 30, 60, 90, 180, 365, float("inf")],
            labels=["0-30j", "31-60j", "61-90j", "91-180j", "181-365j", ">365j"],
            right=True,
        ),
        observed=False,
    ).agg(Nombre=("id_credit", "count"), Encours=("capital_restant_du", "sum"))

    indicateurs = {
        "total_encours_portefeuille": total_encours,
        "nombre_credits_total": len(df),
        "PAR_1_valeur": encours_par_1_30,
        "PAR_1_ratio": (encours_par_1_30 / total_encours * 100) if total_encours > 0 else 0,
        "PAR_30_valeur": encours_en_risque_30,
        "PAR_30_ratio": (encours_en_risque_30 / total_encours * 100) if total_encours > 0 else 0,
        "PAR_90_valeur": encours_en_risque_90,
        "PAR_90_ratio": (encours_en_risque_90 / total_encours * 100) if total_encours > 0 else 0,
        "total_provisions_requises": total_provisions,
        "taux_couverture_provisions": taux_couverture,
        "concentration_top10_pct": concentration_top10,
        "matrice_detaillee": matrice_synthase,
        "distribution_retard": distribution_retard,
        "top_10_credits": top_10_credits,
    }

    return indicateurs


# ─────────────────────────────────────────────────────────────────────
# SCORING KHEPRA DE LA QUALITÉ DU PORTEFEUILLE
# ─────────────────────────────────────────────────────────────────────


def calculer_score_qualite_portefeuille(indicateurs: dict) -> dict:
    """
    Calcule un score composite de qualité du portefeuille de crédits sur 100 points.

    Pondérations:
        - PAR 30 (ratio < seuils) : 30%
        - PAR 90 (ratio < seuils) : 25%
        - Taux de couverture provisions (> seuils) : 25%
        - Concentration top 10 (< 30%) : 10%
        - PAR 1 ratio (< 10%) : 10%
    """
    score = 0.0
    details = {}

    # PAR 30 (30%)
    par30 = indicateurs["PAR_30_ratio"]
    if par30 <= SEUILS_PAR["PAR_30"]["alerte"]:
        score_par30 = 30.0
        statut_par30 = "EXCELLENT"
    elif par30 <= SEUILS_PAR["PAR_30"]["critique"]:
        score_par30 = 30.0 * (1 - (par30 - SEUILS_PAR["PAR_30"]["alerte"]) / (SEUILS_PAR["PAR_30"]["critique"] - SEUILS_PAR["PAR_30"]["alerte"]))
        statut_par30 = "SURVEILLANCE"
    else:
        score_par30 = max(0, 30.0 * (1 - par30 / 20))
        statut_par30 = "CRITIQUE"
    score += score_par30
    details["PAR_30"] = {"poids": "30%", "score": round(score_par30, 1), "valeur": round(par30, 2), "statut": statut_par30}

    # PAR 90 (25%)
    par90 = indicateurs["PAR_90_ratio"]
    if par90 <= SEUILS_PAR["PAR_90"]["alerte"]:
        score_par90 = 25.0
        statut_par90 = "EXCELLENT"
    elif par90 <= SEUILS_PAR["PAR_90"]["critique"]:
        score_par90 = 25.0 * (1 - (par90 - SEUILS_PAR["PAR_90"]["alerte"]) / (SEUILS_PAR["PAR_90"]["critique"] - SEUILS_PAR["PAR_90"]["alerte"]))
        statut_par90 = "SURVEILLANCE"
    else:
        score_par90 = max(0, 25.0 * (1 - par90 / 10))
        statut_par90 = "CRITIQUE"
    score += score_par90
    details["PAR_90"] = {"poids": "25%", "score": round(score_par90, 1), "valeur": round(par90, 2), "statut": statut_par90}

    # Taux de couverture (25%)
    couverture = indicateurs["taux_couverture_provisions"]
    if couverture <= 0:
        score_couv = 0
        statut_couv = "NON COUVERT"
    elif couverture >= 100:
        score_couv = 25.0
        statut_couv = "EXCELLENT"
    elif couverture >= SEUILS_PAR["Taux_Couverture"]["alerte"]:
        score_couv = 25.0 * (couverture / 100)
        statut_couv = "BON"
    elif couverture >= SEUILS_PAR["Taux_Couverture"]["critique"]:
        score_couv = 25.0 * (couverture / 100) * 0.7
        statut_couv = "INSUFFISANT"
    else:
        score_couv = 25.0 * (couverture / 100) * 0.3
        statut_couv = "CRITIQUE"
    score += score_couv
    details["Taux_Couverture"] = {"poids": "25%", "score": round(score_couv, 1), "valeur": round(couverture, 2), "statut": statut_couv}

    # Concentration top 10 (10%)
    concentration = indicateurs["concentration_top10_pct"]
    if concentration <= 20:
        score_conc = 10.0
        statut_conc = "BIEN DIVERSIFIÉ"
    elif concentration <= 30:
        score_conc = 10.0 * (1 - (concentration - 20) / 10)
        statut_conc = "CONCENTRATION MODÉRÉE"
    else:
        score_conc = max(0, 10.0 * (1 - concentration / 50))
        statut_conc = "CONCENTRATION ÉLEVÉE"
    score += score_conc
    details["Concentration"] = {"poids": "10%", "score": round(score_conc, 1), "valeur": round(concentration, 2), "statut": statut_conc}

    # PAR 1 (10%)
    par1 = indicateurs["PAR_1_ratio"]
    if par1 <= 5:
        score_par1 = 10.0
        statut_par1 = "EXCELLENT"
    elif par1 <= 10:
        score_par1 = 10.0 * (1 - (par1 - 5) / 5)
        statut_par1 = "SURVEILLANCE"
    else:
        score_par1 = max(0, 10.0 * (1 - par1 / 20))
        statut_par1 = "ALERTE"
    score += score_par1
    details["PAR_1"] = {"poids": "10%", "score": round(score_par1, 1), "valeur": round(par1, 2), "statut": statut_par1}

    score_global = round(score, 1)

    if score_global >= 85:
        appreciation = "EXCELLENCE — Portefeuille de qualité, provisionnement adéquat"
    elif score_global >= 70:
        appreciation = "BON — Quelques signaux faibles à surveiller"
    elif score_global >= 55:
        appreciation = "ACCEPTABLE — Renforcement du recouvrement nécessaire"
    elif score_global >= 40:
        appreciation = "INSUFFISANT — Dégradation avérée, plan d'action urgent"
    else:
        appreciation = "CRITIQUE — Portefeuille en détresse, intervention immédiate requise"

    return {"score_global": score_global, "appreciation": appreciation, "details": details}


# ─────────────────────────────────────────────────────────────────────
# RECOMMANDATIONS AUTOMATIQUES
# ─────────────────────────────────────────────────────────────────────


def generer_recommandations_portefeuille(indicateurs: dict) -> list:
    """Génère des recommandations automatiques basées sur les indicateurs PAR."""
    recs = []
    par30 = indicateurs["PAR_30_ratio"]
    par90 = indicateurs["PAR_90_ratio"]
    couverture = indicateurs["taux_couverture_provisions"]
    concentration = indicateurs["concentration_top10_pct"]

    if par30 < 5 and par90 < 3 and couverture >= 100:
        recs.append(
            "✅ Portefeuille sain. Maintenir la discipline de crédit, le suivi régulier "
            "des impayés, et la politique de provisionnement conservatrice. "
            "Documenter les bonnes pratiques de recouvrement pour réplication."
        )
        return recs

    if par90 >= SEUILS_PAR["PAR_90"]["critique"]:
        recs.append(
            "🔴 PAR 90 CRITIQUE (>5%) : Déclencher immédiatement une task force recouvrement. "
            "Revoir la politique d'octroi de crédit. Geler les secteurs/types de crédit les plus "
            "sinistrés. Présenter un plan d'apurement au Conseil d'Administration."
        )
    elif par90 >= SEUILS_PAR["PAR_90"]["alerte"]:
        recs.append(
            "🟠 PAR 90 EN SURVEILLANCE (>3%) : Renforcer l'équipe de recouvrement. "
            "Analyser les causes racines par agence, par produit, par chargé de crédit. "
            "Mettre en place un comité hebdomadaire de suivi des impayés."
        )

    if par30 >= SEUILS_PAR["PAR_30"]["critique"]:
        recs.append(
            "🔴 PAR 30 CRITIQUE (>10%) : Signe avant-coureur d'une dégradation structurelle. "
            "Auditer le processus d'octroi. Vérifier la qualité de l'analyse crédit. "
            "Renforcer le suivi des premiers impayés (J+1, J+3, J+7)."
        )
    elif par30 >= SEUILS_PAR["PAR_30"]["alerte"]:
        recs.append(
            "🟠 PAR 30 EN SURVEILLANCE (>5%) : Intensifier le recouvrement précoce. "
            "Contacter systématiquement les clients à J+1 de retard. "
            "Analyser le portefeuille sensible par ancienneté du retard."
        )

    if couverture < SEUILS_PAR["Taux_Couverture"]["critique"]:
        recs.append(
            "🔴 PROVISIONNEMENT INSUFFISANT (<60%) : Constituer d'urgence les provisions "
            "manquantes conformément à la grille COBAC. L'insuffisance de provisionnement "
            "est un motif de sanction réglementaire. Alerter le Comité d'Audit et des Risques."
        )
    elif couverture < SEUILS_PAR["Taux_Couverture"]["alerte"]:
        recs.append(
            "🟠 PROVISIONNEMENT À RENFORCER (<70%) : Compléter les provisions pour atteindre "
            "un taux de couverture supérieur à 70%. Revoir la classification des créances "
            "douteuses avec garantie réelle."
        )

    if concentration >= 30:
        recs.append(
            "🟠 CONCENTRATION ÉLEVÉE (>30% sur top 10) : Diversifier le portefeuille. "
            "Identifier les secteurs/produits/clients en surpondération. "
            "Mettre en conformité avec la norme de division des risques (≤25% FP)."
        )

    return recs


# ─────────────────────────────────────────────────────────────────────
# GÉNÉRATION DU RAPPORT
# ─────────────────────────────────────────────────────────────────────


def generer_rapport_portefeuille(
    filepath_portefeuille: str, output_json: bool = False
) -> Optional[dict]:
    """
    Fonction principale exécutant le pipeline d'analyse PAR & Provisions KHEPRA.

    Args:
        filepath_portefeuille: Chemin vers le fichier portefeuille (.csv, .xlsx, .xls)
        output_json: Si True, retourne les résultats en dict pour export JSON

    Returns:
        Dictionnaire des résultats si output_json=True, sinon None.
    """
    print("=" * 70)
    print("  ⚡ KHEPRA OS — ANALYSE PAR & PROVISIONS BCEAO")
    print(f"  Date : {datetime.now().strftime('%d %B %Y — %H:%M')}")
    print("=" * 70)

    df = charger_et_nettoyer_portefeuille(filepath_portefeuille)
    if df is None:
        return None

    indicateurs = calculer_par_et_provisions(df)
    score = calculer_score_qualite_portefeuille(indicateurs)

    # ── Affichage des Indicateurs ──
    print("\n" + "─" * 70)
    print("  📊 INDICATEURS CLÉS DU PORTEFEUILLE")
    print("─" * 70)
    print(f"  • Encours total du portefeuille     : {indicateurs['total_encours_portefeuille']:>15,.0f} FCFA")
    print(f"  • Nombre de crédits actifs           : {indicateurs['nombre_credits_total']:>15,}")
    print(f"  • PAR 1 (≥ 1 jour de retard)         : {indicateurs['PAR_1_ratio']:>15.2f}%")
    print(f"  • PAR 30 (> 30 jours de retard)      : {indicateurs['PAR_30_ratio']:>15.2f}%  (Valeur: {indicateurs['PAR_30_valeur']:,.0f} FCFA)")
    print(f"  • PAR 90 (> 90 jours de retard)      : {indicateurs['PAR_90_ratio']:>15.2f}%  (Valeur: {indicateurs['PAR_90_valeur']:,.0f} FCFA)")
    print(f"  • Provisions totales requises         : {indicateurs['total_provisions_requises']:>15,.0f} FCFA")
    print(f"  • Taux de couverture des provisions   : {indicateurs['taux_couverture_provisions']:>15.2f}%")
    print(f"  • Concentration Top 10 crédits        : {indicateurs['concentration_top10_pct']:>15.2f}%")

    # ── Matrice détaillée ──
    print("\n" + "─" * 70)
    print("  📋 MATRICE DE CLASSIFICATION DU PORTEFEUILLE (Grille COBAC)")
    print("─" * 70)
    matrice = indicateurs["matrice_detaillee"]
    print(f"  {'Classe de Risque':<30s} {'Nbre':>6s} {'Encours':>18s} {'Provisions':>18s}")
    print(f"  {'─' * 30} {'─' * 6} {'─' * 18} {'─' * 18}")
    for idx, row in matrice.iterrows():
        nbre = int(row["Nombre_Crédits"])
        encours = row["Encours_Total"]
        provisions = row["Provisions_À_Constituer"]
        if nbre > 0 or encours > 0:
            print(f"  {idx:<30s} {nbre:>6,} {encours:>18,.0f} {provisions:>18,.0f}")
    print(f"  {'─' * 30} {'─' * 6} {'─' * 18} {'─' * 18}")
    print(f"  {'TOTAL':<30s} {int(matrice['Nombre_Crédits'].sum()):>6,} {matrice['Encours_Total'].sum():>18,.0f} {matrice['Provisions_À_Constituer'].sum():>18,.0f}")

    # ── Score KHEPRA ──
    print("\n─" * 70)
    print(f"  🏆 SCORE KHEPRA DE QUALITÉ DU PORTEFEUILLE : {score['score_global']}/100")
    print(f"  📋 Appréciation : {score['appreciation']}")
    print("─" * 70)
    print("  Détail par indicateur :")
    for cle, d in score["details"].items():
        emoji_map = {
            "EXCELLENT": "🟢", "BON": "🟢", "BIEN DIVERSIFIÉ": "🟢",
            "SURVEILLANCE": "🟠", "CONCENTRATION MODÉRÉE": "🟠",
            "CRITIQUE": "🔴", "ALERTE": "🟠", "INSUFFISANT": "🔴",
            "NON COUVERT": "🔴", "CONCENTRATION ÉLEVÉE": "🔴",
        }
        emoji = emoji_map.get(d["statut"], "⚪")
        print(f"  {emoji} {cle:<25s} — Poids {d['poids']} | Score {d['score']:.1f} | Valeur {d['valeur']:.2f}% | {d['statut']}")

    # ── Top 10 crédits ──
    print("\n" + "─" * 70)
    print("  🔝 TOP 10 CRÉDITS PAR ENCOURS")
    print("─" * 70)
    print(f"  {'ID Crédit':<25s} {'Encours':>15s} {'Retard':>8s} {'Classe':>25s}")
    print(f"  {'─' * 25} {'─' * 15} {'─' * 8} {'─' * 25}")
    for _, row in indicateurs["top_10_credits"].iterrows():
        print(f"  {str(row['id_credit'])[:24]:<25s} {row['capital_restant_du']:>15,.0f} {int(row['jours_retard']):>7d}j {row['classe_risque']:<25s}")

    # ── Recommandations ──
    print("\n" + "─" * 70)
    print("  🔧 RECOMMANDATIONS KHEPRA")
    print("─" * 70)
    recs = generer_recommandations_portefeuille(indicateurs)
    for i, rec in enumerate(recs, 1):
        print(f"  {i}. {rec}")

    print("\n" + "=" * 70)
    print("  ✅ Analyse terminée — KHEPRA OS v1.0.0")
    print("=" * 70)

    if output_json:
        # Convertir les DataFrames en dicts pour JSON
        matrice_dict = {}
        for idx, row in indicateurs["matrice_detaillee"].iterrows():
            matrice_dict[idx] = {
                "Nombre_Credits": int(row["Nombre_Crédits"]),
                "Encours_Total": float(row["Encours_Total"]),
                "Provisions_A_Constituer": float(row["Provisions_À_Constituer"]),
            }

        top10_list = []
        for _, row in indicateurs["top_10_credits"].iterrows():
            top10_list.append({
                "id_credit": str(row["id_credit"]),
                "capital_restant_du": float(row["capital_restant_du"]),
                "jours_retard": int(row["jours_retard"]),
                "classe_risque": str(row["classe_risque"]),
            })

        return {
            "metadata": {
                "outil": "KHEPRA OS — Analyse PAR & Provisions BCEAO",
                "version": "1.0.0",
                "date": datetime.now().isoformat(),
                "fichier_source": filepath_portefeuille,
            },
            "indicateurs": {
                "total_encours_portefeuille": float(indicateurs["total_encours_portefeuille"]),
                "nombre_credits_total": int(indicateurs["nombre_credits_total"]),
                "PAR_1_valeur": float(indicateurs["PAR_1_valeur"]),
                "PAR_1_ratio": round(float(indicateurs["PAR_1_ratio"]), 2),
                "PAR_30_valeur": float(indicateurs["PAR_30_valeur"]),
                "PAR_30_ratio": round(float(indicateurs["PAR_30_ratio"]), 2),
                "PAR_90_valeur": float(indicateurs["PAR_90_valeur"]),
                "PAR_90_ratio": round(float(indicateurs["PAR_90_ratio"]), 2),
                "total_provisions_requises": float(indicateurs["total_provisions_requises"]),
                "taux_couverture_provisions": round(float(indicateurs["taux_couverture_provisions"]), 2),
                "concentration_top10_pct": round(float(indicateurs["concentration_top10_pct"]), 2),
            },
            "matrice_detaillee": matrice_dict,
            "top_10_credits": top10_list,
            "score_qualite_portefeuille": score,
            "recommandations": recs,
        }

    return None


# ─────────────────────────────────────────────────────────────────────
# DONNÉES DE DÉMONSTRATION
# ─────────────────────────────────────────────────────────────────────


def generer_portefeuille_demo() -> pd.DataFrame:
    """
    Génère un portefeuille de crédits fictif pour démonstration.
    Représente une IMF de taille moyenne en zone UEMOA avec ~2 500 crédits.
    """
    np.random.seed(42)
    nb_credits = 2500

    # Distribution des crédits par taille
    montants_moyens = np.random.choice(
        [150_000, 500_000, 1_200_000, 3_500_000, 8_000_000],
        size=nb_credits,
        p=[0.35, 0.30, 0.20, 0.12, 0.03],
    )
    capital = np.random.normal(montants_moyens, montants_moyens * 0.3)
    capital = np.maximum(capital, 50_000)

    # Distribution des jours de retard (majorité saine)
    jours_retard = np.zeros(nb_credits, dtype=int)
    # ~85% sains (0j)
    # ~8% sensibles (1-30j)
    # ~4% pré-douteux (31-90j)
    # ~2% douteux (91-180j)
    # ~1% compromis (>180j)
    categories = np.random.choice(
        ["sain", "sensible", "predouteux", "douteux", "compromis"],
        size=nb_credits,
        p=[0.85, 0.08, 0.04, 0.02, 0.01],
    )

    for i, cat in enumerate(categories):
        if cat == "sensible":
            jours_retard[i] = np.random.randint(1, 31)
        elif cat == "predouteux":
            jours_retard[i] = np.random.randint(31, 91)
        elif cat == "douteux":
            jours_retard[i] = np.random.randint(91, 181)
        elif cat == "compromis":
            jours_retard[i] = np.random.randint(181, 400)

    # Types de garanties
    natures_garantie = np.random.choice(
        ["reelle", "reelle", "autre/sans", "autre/sans", "autre/sans"],
        size=nb_credits,
    )

    data = []
    for i in range(nb_credits):
        data.append(
            {
                "id_credit": f"CRD-{2026:04d}-{i + 1:05d}",
                "capital_restant_du": int(capital[i]),
                "jours_retard": int(jours_retard[i]),
                "nature_garantie": natures_garantie[i],
            }
        )

    return pd.DataFrame(data)


# ─────────────────────────────────────────────────────────────────────
# POINT D'ENTRÉE CLI
# ─────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="KHEPRA OS — Analyse PAR & Provisions BCEAO pour EMF/SFD",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples:
  python khepra_calcul_par_provisions.py portefeuille_2026.xlsx
  python khepra_calcul_par_provisions.py portefeuille_2026.csv --json resultats.json
  python khepra_calcul_par_provisions.py --demo
        """,
    )
    parser.add_argument(
        "fichier",
        nargs="?",
        help="Chemin vers le fichier portefeuille de crédits (.csv, .xlsx, .xls)",
    )
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Lancer l'analyse avec des données de démonstration",
    )
    parser.add_argument(
        "--json",
        metavar="FICHIER",
        help="Exporter les résultats au format JSON",
    )

    args = parser.parse_args()

    if args.demo:
        print("🧪 Mode démonstration — Données fictives générées (2 500 crédits)\n")
        df = generer_portefeuille_demo()
        indicateurs = calculer_par_et_provisions(df)
        score = calculer_score_qualite_portefeuille(indicateurs)

        print("─" * 70)
        print("  📊 INDICATEURS CLÉS (DÉMO)")
        print("─" * 70)
        print(f"  • Encours total            : {indicateurs['total_encours_portefeuille']:>15,.0f} FCFA")
        print(f"  • Nombre de crédits         : {indicateurs['nombre_credits_total']:>15,}")
        print(f"  • PAR 1 (≥ 1j)              : {indicateurs['PAR_1_ratio']:>15.2f}%")
        print(f"  • PAR 30 (> 30j)            : {indicateurs['PAR_30_ratio']:>15.2f}%")
        print(f"  • PAR 90 (> 90j)            : {indicateurs['PAR_90_ratio']:>15.2f}%")
        print(f"  • Provisions requises        : {indicateurs['total_provisions_requises']:>15,.0f} FCFA")
        print(f"  • Taux de couverture         : {indicateurs['taux_couverture_provisions']:>15.2f}%")

        print("\n─" * 70)
        print("  📋 MATRICE DE CLASSIFICATION (DÉMO)")
        print("─" * 70)
        matrice = indicateurs["matrice_detaillee"]
        print(f"  {'Classe de Risque':<30s} {'Nbre':>6s} {'Encours':>18s} {'Provisions':>18s}")
        for idx, row in matrice.iterrows():
            if int(row["Nombre_Crédits"]) > 0:
                print(f"  {idx:<30s} {int(row['Nombre_Crédits']):>6,} {row['Encours_Total']:>18,.0f} {row['Provisions_À_Constituer']:>18,.0f}")

        print("\n─" * 70)
        print(f"  🏆 SCORE QUALITÉ PORTEFEUILLE : {score['score_global']}/100")
        print(f"  📋 {score['appreciation']}")
        print("─" * 70)

        recs = generer_recommandations_portefeuille(indicateurs)
        print("\n🔧 RECOMMANDATIONS :")
        for i, rec in enumerate(recs, 1):
            print(f"  {i}. {rec}")

        if args.json:
            resultat = {
                "metadata": {
                    "outil": "KHEPRA OS — Analyse PAR & Provisions BCEAO",
                    "version": "1.0.0",
                    "date": datetime.now().isoformat(),
                    "mode": "demo",
                },
                "indicateurs": {k: float(v) if isinstance(v, (np.integer, np.floating)) else v
                               for k, v in indicateurs.items()
                               if k not in ["matrice_detaillee", "distribution_retard", "top_10_credits"]},
                "score_qualite_portefeuille": score,
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

    resultat = generer_rapport_portefeuille(args.fichier, output_json=bool(args.json))

    if args.json and resultat:
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(resultat, f, ensure_ascii=False, indent=2)
        print(f"\n✅ Résultats exportés → {args.json}")


if __name__ == "__main__":
    main()