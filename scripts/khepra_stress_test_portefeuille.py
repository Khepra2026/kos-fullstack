#!/usr/bin/env python3
"""
KHEPRA OS — Module de Stress Test Portefeuille BCEAO
=====================================================
Outil de simulation de chocs sur le portefeuille de crédits pour les EMF/SFD
en zone UEMOA. Conforme aux exigences des Plans Préventifs de Redressement (PPR)
de la COBAC (Circulaire N° 001-2020/CB/C) et aux stress tests BCEAO.

Scénarios supportés :
    • Détérioration du PAR (migration de crédits sains → sensible → douteux)
    • Hausse des taux d'intérêt (renchérissement du refinancement)
    • Crise sectorielle (défaillance d'un secteur concentré)
    • Choc combiné (scénario catastrophe)
    • Scénario personnalisé

Usage:
    python khepra_stress_test_portefeuille.py portefeuille.csv --scenario tous
    python khepra_stress_test_portefeuille.py --demo
    python khepra_stress_test_portefeuille.py portefeuille.csv --scenario par --intensite 2

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
# CONSTANTES DES SCÉNARIOS DE STRESS
# ─────────────────────────────────────────────────────────────────────

SCENARIOS = {
    "par_leger": {
        "nom": "Détérioration légère du PAR",
        "description": "Migration progressive : 5% des crédits sains → sensibles, 2% sensibles → pré-douteux",
        "intensite": 1,
        "migration_sain_vers_sensible": 0.05,
        "migration_sensible_vers_predouteux": 0.02,
        "migration_predouteux_vers_douteux": 0.10,
        "hausse_taux_refinancement": 0.00,
        "defaillance_sectorielle_pct": 0.00,
        "impact_garanties": 0.00,
    },
    "par_modere": {
        "nom": "Détérioration modérée du PAR",
        "description": "Choc de crédit : 10% des sains → sensibles, 5% → pré-douteux, 15% pré-douteux → douteux",
        "intensite": 2,
        "migration_sain_vers_sensible": 0.10,
        "migration_sensible_vers_predouteux": 0.05,
        "migration_predouteux_vers_douteux": 0.15,
        "hausse_taux_refinancement": 0.00,
        "defaillance_sectorielle_pct": 0.00,
        "impact_garanties": 0.00,
    },
    "par_severe": {
        "nom": "Détérioration sévère du PAR",
        "description": "Crise de crédit : 20% des sains → sensibles, 10% → pré-douteux, 25% pré-douteux → douteux",
        "intensite": 3,
        "migration_sain_vers_sensible": 0.20,
        "migration_sensible_vers_predouteux": 0.10,
        "migration_predouteux_vers_douteux": 0.25,
        "hausse_taux_refinancement": 0.00,
        "defaillance_sectorielle_pct": 0.00,
        "impact_garanties": 0.00,
    },
    "taux_hausse_moderee": {
        "nom": "Hausse modérée des taux",
        "description": "Renchérissement du refinancement : +200bps sur les emprunts, impact sur la marge nette",
        "intensite": 2,
        "migration_sain_vers_sensible": 0.02,
        "migration_sensible_vers_predouteux": 0.01,
        "migration_predouteux_vers_douteux": 0.05,
        "hausse_taux_refinancement": 0.02,
        "defaillance_sectorielle_pct": 0.00,
        "impact_garanties": 0.00,
    },
    "taux_hausse_severe": {
        "nom": "Hausse sévère des taux",
        "description": "Crise de liquidité : +500bps sur les emprunts, pression sur la capacité de remboursement",
        "intensite": 3,
        "migration_sain_vers_sensible": 0.05,
        "migration_sensible_vers_predouteux": 0.03,
        "migration_predouteux_vers_douteux": 0.10,
        "hausse_taux_refinancement": 0.05,
        "defaillance_sectorielle_pct": 0.00,
        "impact_garanties": 0.00,
    },
    "crise_sectorielle": {
        "nom": "Crise sectorielle",
        "description": "Défaillance d'un secteur représentant 15% du portefeuille, migration directe vers douteux/compromis",
        "intensite": 3,
        "migration_sain_vers_sensible": 0.02,
        "migration_sensible_vers_predouteux": 0.02,
        "migration_predouteux_vers_douteux": 0.05,
        "hausse_taux_refinancement": 0.01,
        "defaillance_sectorielle_pct": 0.15,
        "impact_garanties": 0.30,
    },
    "combine": {
        "nom": "Choc combiné (worst case)",
        "description": "Scénario catastrophe : dégradation PAR + hausse taux + crise sectorielle simultanées",
        "intensite": 4,
        "migration_sain_vers_sensible": 0.15,
        "migration_sensible_vers_predouteux": 0.08,
        "migration_predouteux_vers_douteux": 0.20,
        "hausse_taux_refinancement": 0.04,
        "defaillance_sectorielle_pct": 0.10,
        "impact_garanties": 0.20,
    },
}

GRILLE_PROVISIONNEMENT = {
    "Sensible (PAR 1-30)": 0.00,
    "Pré-douteux (PAR 31-90)": 0.40,
    "Douteux (PAR 91-180) sans garantie": 1.00,
    "Douteux (PAR 91-180) avec garantie": 0.50,
    "Compromis (PAR >180)": 1.00,
}

GARANTIES_REELLES = [
    "reelle", "réelle", "hypothèque", "hypotheque", "nantissement",
    "hypothecaire", "hypothécaire", "garantie_reelle", "garantie réelle",
    "immobiliere", "immobilière",
]


# ─────────────────────────────────────────────────────────────────────
# FONCTIONS DE CHARGEMENT
# ─────────────────────────────────────────────────────────────────────


def charger_portefeuille(filepath: str) -> Optional[pd.DataFrame]:
    """Charge le fichier de portefeuille et standardise les colonnes."""
    try:
        suffix = Path(filepath).suffix.lower()
        if suffix == ".csv":
            df = pd.read_csv(filepath, sep=None, engine="python")
        elif suffix in (".xlsx", ".xls"):
            df = pd.read_excel(filepath)
        else:
            print(f"❌ Format non supporté : {suffix}")
            return None

        df.columns = df.columns.str.strip().str.lower()

        # Mapping des colonnes
        mapping = {}
        for variante in ["id_credit", "id_crédit", "id_client", "numero_credit", "numéro_crédit", "reference"]:
            if variante in df.columns:
                mapping[variante] = "id_credit"
                break
        for variante in ["capital_restant_du", "capital_restant_dû", "encours", "encours_credit", "solde_credit"]:
            if variante in df.columns:
                mapping[variante] = "capital_restant_du"
                break
        for variante in ["jours_retard", "retard_jours", "nb_jours_retard", "retard", "arrieres"]:
            if variante in df.columns:
                mapping[variante] = "jours_retard"
                break
        for variante in ["nature_garantie", "type_garantie", "garantie", "surete"]:
            if variante in df.columns:
                mapping[variante] = "nature_garantie"
                break
        for variante in ["secteur", "secteur_activite", "secteur_économique", "industrie"]:
            if variante in df.columns:
                mapping[variante] = "secteur"
                break

        df = df.rename(columns=mapping)

        if "id_credit" not in df.columns or "capital_restant_du" not in df.columns or "jours_retard" not in df.columns:
            print("❌ Colonnes obligatoires manquantes (id_credit, capital_restant_du, jours_retard)")
            return None

        df["capital_restant_du"] = pd.to_numeric(df["capital_restant_du"], errors="coerce").fillna(0)
        df["jours_retard"] = pd.to_numeric(df["jours_retard"], errors="coerce").fillna(0).astype(int)

        if "nature_garantie" not in df.columns:
            df["nature_garantie"] = "autre/sans"
        else:
            df["nature_garantie"] = df["nature_garantie"].astype(str).str.strip().str.lower()

        if "secteur" not in df.columns:
            df["secteur"] = "Non spécifié"

        df = df[df["capital_restant_du"] > 0].copy()
        print(f"✅ Portefeuille chargé : {len(df)} crédits actifs")
        return df

    except Exception as e:
        print(f"❌ Erreur : {e}")
        return None


# ─────────────────────────────────────────────────────────────────────
# CLASSIFICATION DU PORTEFEUILLE
# ─────────────────────────────────────────────────────────────────────


def classifier_portefeuille(df: pd.DataFrame) -> pd.DataFrame:
    """Classifie le portefeuille selon la grille COBAC."""
    df = df.copy()
    df["classe_risque"] = "Sain"

    df.loc[(df["jours_retard"] >= 1) & (df["jours_retard"] <= 30), "classe_risque"] = "Sensible (PAR 1-30)"
    df.loc[(df["jours_retard"] >= 31) & (df["jours_retard"] <= 90), "classe_risque"] = "Pré-douteux (PAR 31-90)"
    df.loc[(df["jours_retard"] >= 91) & (df["jours_retard"] <= 180), "classe_risque"] = "Douteux (PAR 91-180)"
    df.loc[df["jours_retard"] > 180, "classe_risque"] = "Compromis (PAR >180)"

    return df


def est_garantie_reelle(nature: str) -> bool:
    if not nature or nature in ["nan", "none", ""]:
        return False
    return any(g in nature.lower().strip() for g in GARANTIES_REELLES)


def calculer_provisions(df: pd.DataFrame) -> pd.DataFrame:
    """Calcule les provisions réglementaires par ligne."""
    df = df.copy()
    df["garantie_reelle"] = df["nature_garantie"].apply(est_garantie_reelle)
    df["taux_provision"] = 0.0

    df.loc[df["classe_risque"] == "Sensible (PAR 1-30)", "taux_provision"] = 0.00
    df.loc[df["classe_risque"] == "Pré-douteux (PAR 31-90)", "taux_provision"] = 0.40
    df.loc[
        (df["classe_risque"] == "Douteux (PAR 91-180)") & (df["garantie_reelle"]),
        "taux_provision",
    ] = 0.50
    df.loc[
        (df["classe_risque"] == "Douteux (PAR 91-180)") & (~df["garantie_reelle"]),
        "taux_provision",
    ] = 1.00
    df.loc[df["classe_risque"] == "Compromis (PAR >180)", "taux_provision"] = 1.00

    df["provision"] = df["capital_restant_du"] * df["taux_provision"]
    return df


# ─────────────────────────────────────────────────────────────────────
# APPLICATION DES SCÉNARIOS DE STRESS
# ─────────────────────────────────────────────────────────────────────


def appliquer_scenario_par(df: pd.DataFrame, scenario: dict) -> pd.DataFrame:
    """
    Applique un scénario de stress PAR : migration probabiliste des crédits
    vers des classes de risque supérieures.
    """
    df = df.copy()
    np.random.seed(42)

    # Sauvegarde état initial
    df["classe_initiale"] = df["classe_risque"]
    df["capital_initial"] = df["capital_restant_du"]

    # Migration sain → sensible
    masque_sain = df["classe_risque"] == "Sain"
    nb_sain = masque_sain.sum()
    if nb_sain > 0:
        nb_migration = int(nb_sain * scenario["migration_sain_vers_sensible"])
        indices_migration = np.random.choice(df[masque_sain].index, size=min(nb_migration, nb_sain), replace=False)
        df.loc[indices_migration, "classe_risque"] = "Sensible (PAR 1-30)"
        df.loc[indices_migration, "jours_retard"] = np.random.randint(1, 31, size=len(indices_migration))

    # Migration sensible → pré-douteux
    masque_sensible = df["classe_risque"] == "Sensible (PAR 1-30)"
    nb_sensible = masque_sensible.sum()
    if nb_sensible > 0:
        nb_migration = int(nb_sensible * scenario["migration_sensible_vers_predouteux"])
        indices_migration = np.random.choice(df[masque_sensible].index, size=min(nb_migration, nb_sensible), replace=False)
        df.loc[indices_migration, "classe_risque"] = "Pré-douteux (PAR 31-90)"
        df.loc[indices_migration, "jours_retard"] = np.random.randint(31, 91, size=len(indices_migration))

    # Migration pré-douteux → douteux
    masque_predouteux = df["classe_risque"] == "Pré-douteux (PAR 31-90)"
    nb_predouteux = masque_predouteux.sum()
    if nb_predouteux > 0:
        nb_migration = int(nb_predouteux * scenario["migration_predouteux_vers_douteux"])
        indices_migration = np.random.choice(df[masque_predouteux].index, size=min(nb_migration, nb_predouteux), replace=False)
        df.loc[indices_migration, "classe_risque"] = "Douteux (PAR 91-180)"
        df.loc[indices_migration, "jours_retard"] = np.random.randint(91, 181, size=len(indices_migration))

    return df


def appliquer_crise_sectorielle(df: pd.DataFrame, scenario: dict) -> pd.DataFrame:
    """
    Simule une crise sectorielle : une fraction du portefeuille (secteur spécifique
    ou aléatoire) bascule directement en créances douteuses/compromises.
    """
    df = df.copy()

    pct_defaillance = scenario.get("defaillance_sectorielle_pct", 0)
    if pct_defaillance <= 0:
        return df

    # Identifier le secteur le plus concentré
    secteurs = df.groupby("secteur")["capital_restant_du"].sum().sort_values(ascending=False)
    if len(secteurs) == 0:
        return df

    secteur_crise = secteurs.index[0]
    encours_secteur = secteurs.iloc[0]
    encours_total = df["capital_restant_du"].sum()

    # Fraction du secteur qui tombe en défaut
    fraction_defaut = min(pct_defaillance * encours_total / max(encours_secteur, 1), 1.0)

    masque_secteur = df["secteur"] == secteur_crise
    nb_secteur = masque_secteur.sum()
    if nb_secteur > 0:
        nb_defaillance = int(nb_secteur * fraction_defaut)
        indices_defaillance = np.random.choice(
            df[masque_secteur].index, size=min(nb_defaillance, nb_secteur), replace=False
        )
        # 60% en douteux, 40% en compromis
        split = int(len(indices_defaillance) * 0.6)
        df.loc[indices_defaillance[:split], "classe_risque"] = "Douteux (PAR 91-180)"
        df.loc[indices_defaillance[:split], "jours_retard"] = np.random.randint(91, 181, size=split)
        if len(indices_defaillance) > split:
            df.loc[indices_defaillance[split:], "classe_risque"] = "Compromis (PAR >180)"
            df.loc[indices_defaillance[split:], "jours_retard"] = np.random.randint(181, 400, size=len(indices_defaillance) - split)

    return df


def appliquer_scenario(
    df: pd.DataFrame,
    scenario: dict,
    fonds_propres: float,
    encours_emprunts: float,
    marge_nette: float,
) -> dict:
    """
    Applique un scénario de stress complet et retourne les impacts.
    """
    df_stress = df.copy()

    # 1. Stress PAR (migration des crédits)
    df_stress = appliquer_scenario_par(df_stress, scenario)

    # 2. Crise sectorielle
    df_stress = appliquer_crise_sectorielle(df_stress, scenario)

    # 3. Recalcul des provisions après stress
    df_stress = calculer_provisions(df_stress)

    # ── Indicateurs avant stress ──
    df_avant = calculer_provisions(classifier_portefeuille(df))
    encours_avant = df_avant["capital_restant_du"].sum()
    provisions_avant = df_avant["provision"].sum()
    par30_avant = df_avant[df_avant["jours_retard"] > 30]["capital_restant_du"].sum()
    par90_avant = df_avant[df_avant["jours_retard"] > 90]["capital_restant_du"].sum()

    # ── Indicateurs après stress ──
    encours_apres = df_stress["capital_restant_du"].sum()
    provisions_apres = df_stress["provision"].sum()
    par30_apres = df_stress[df_stress["jours_retard"] > 30]["capital_restant_du"].sum()
    par90_apres = df_stress[df_stress["jours_retard"] > 90]["capital_restant_du"].sum()

    # ── Matrice après stress ──
    classes = ["Sain", "Sensible (PAR 1-30)", "Pré-douteux (PAR 31-90)", "Douteux (PAR 91-180)", "Compromis (PAR >180)"]
    matrice_apres = df_stress.groupby("classe_risque").agg(
        Nombre=("id_credit", "count"),
        Encours=("capital_restant_du", "sum"),
        Provisions=("provision", "sum"),
    ).reindex(classes).fillna(0)

    # ── Impact sur les provisions ──
    hausse_provisions = provisions_apres - provisions_avant
    hausse_provisions_pct = (hausse_provisions / max(provisions_avant, 1)) * 100

    # ── Impact sur les fonds propres (la hausse des provisions passe en charge) ──
    fp_apres_stress = fonds_propres - hausse_provisions
    erosion_fp_pct = (hausse_provisions / max(fonds_propres, 1)) * 100

    # ── Impact du choc de taux sur la marge nette ──
    hausse_taux = scenario.get("hausse_taux_refinancement", 0)
    surcout_refinancement = encours_emprunts * hausse_taux
    impact_marge_nette = surcout_refinancement

    # ── Ratio de capitalisation après stress ──
    ratio_capitalisation_avant = (fonds_propres / max(encours_avant, 1)) * 100
    ratio_capitalisation_apres = (fp_apres_stress / max(encours_apres, 1)) * 100

    # ── Résultat net impacté ──
    resultat_net_impact = marge_nette - hausse_provisions - surcout_refinancement

    # ── Seuil de rupture ──
    seuil_rupture = fp_apres_stress <= 0

    return {
        "scenario": scenario["nom"],
        "intensite": scenario["intensite"],
        "avant_stress": {
            "encours_total": encours_avant,
            "provisions": provisions_avant,
            "PAR_30_pct": (par30_avant / max(encours_avant, 1)) * 100,
            "PAR_90_pct": (par90_avant / max(encours_avant, 1)) * 100,
            "ratio_capitalisation": ratio_capitalisation_avant,
            "fonds_propres": fonds_propres,
            "marge_nette": marge_nette,
        },
        "apres_stress": {
            "encours_total": encours_apres,
            "provisions": provisions_apres,
            "PAR_30_pct": (par30_apres / max(encours_apres, 1)) * 100,
            "PAR_90_pct": (par90_apres / max(encours_apres, 1)) * 100,
            "ratio_capitalisation": ratio_capitalisation_apres,
            "fonds_propres": fp_apres_stress,
        },
        "impacts": {
            "hausse_provisions_fcfa": hausse_provisions,
            "hausse_provisions_pct": hausse_provisions_pct,
            "erosion_fonds_propres_pct": erosion_fp_pct,
            "surcout_refinancement": surcout_refinancement,
            "impact_marge_nette": impact_marge_nette,
            "resultat_net_impacte": resultat_net_impact,
        },
        "seuil_rupture_atteint": seuil_rupture,
        "matrice_apres_stress": matrice_apres,
    }


# ─────────────────────────────────────────────────────────────────────
# SCORING DE RÉSILIENCE
# ─────────────────────────────────────────────────────────────────────


def calculer_score_resilience(resultats_scenarios: list) -> dict:
    """
    Calcule un score de résilience du portefeuille sur 100 points
    basé sur la capacité à absorber les chocs.
    """
    if not resultats_scenarios:
        return {"score_global": 100, "appreciation": "Non évalué — Aucun scénario exécuté"}

    score = 100.0
    penalites = []

    for r in resultats_scenarios:
        impacts = r["impacts"]
        intensite = r["intensite"]
        poids = intensite / 4  # Normalisation

        # Pénalité si seuil de rupture atteint
        if r["seuil_rupture_atteint"]:
            penalites.append({
                "scenario": r["scenario"],
                "raison": "Rupture — Fonds propres négatifs",
                "penalite": 30 * poids,
            })
            continue

        # Pénalité sur érosion des fonds propres
        erosion = impacts["erosion_fonds_propres_pct"]
        if erosion > 50:
            penalites.append({"scenario": r["scenario"], "raison": f"Érosion FP > 50% ({erosion:.1f}%)", "penalite": 25 * poids})
        elif erosion > 30:
            penalites.append({"scenario": r["scenario"], "raison": f"Érosion FP > 30% ({erosion:.1f}%)", "penalite": 15 * poids})
        elif erosion > 15:
            penalites.append({"scenario": r["scenario"], "raison": f"Érosion FP > 15% ({erosion:.1f}%)", "penalite": 8 * poids})

        # Pénalité sur PAR 90 post-stress
        par90_post = r["apres_stress"]["PAR_90_pct"]
        if par90_post > 15:
            penalites.append({"scenario": r["scenario"], "raison": f"PAR 90 post-stress > 15% ({par90_post:.1f}%)", "penalite": 15 * poids})
        elif par90_post > 10:
            penalites.append({"scenario": r["scenario"], "raison": f"PAR 90 post-stress > 10% ({par90_post:.1f}%)", "penalite": 10 * poids})
        elif par90_post > 5:
            penalites.append({"scenario": r["scenario"], "raison": f"PAR 90 post-stress > 5% ({par90_post:.1f}%)", "penalite": 5 * poids})

        # Pénalité sur ratio de capitalisation post-stress
        ratio_cap = r["apres_stress"]["ratio_capitalisation"]
        if ratio_cap < 5:
            penalites.append({"scenario": r["scenario"], "raison": f"Ratio capitalisation < 5% ({ratio_cap:.1f}%)", "penalite": 15 * poids})
        elif ratio_cap < 10:
            penalites.append({"scenario": r["scenario"], "raison": f"Ratio capitalisation < 10% ({ratio_cap:.1f}%)", "penalite": 8 * poids})

    # Application des pénalités
    for p in penalites:
        score -= p["penalite"]

    score = max(0, min(100, round(score, 1)))

    if score >= 80:
        appreciation = "EXCELLENTE — L'IMF résiste bien aux chocs simulés. Fonds propres solides, portefeuille diversifié."
    elif score >= 65:
        appreciation = "BONNE — Résilience correcte mais des vulnérabilités apparaissent sous choc sévère."
    elif score >= 50:
        appreciation = "MODÉRÉE — Des mesures de renforcement sont nécessaires (capital, diversification, provisionnement)."
    elif score >= 35:
        appreciation = "FAIBLE — L'IMF est vulnérable. Un PPR (Plan Préventif de Redressement) doit être activé."
    else:
        appreciation = "CRITIQUE — L'IMF ne résiste à aucun choc significatif. Intervention urgente requise."

    return {
        "score_global": score,
        "appreciation": appreciation,
        "penalites": penalites,
    }


# ─────────────────────────────────────────────────────────────────────
# RECOMMANDATIONS POST STRESS TEST
# ─────────────────────────────────────────────────────────────────────


def generer_recommandations_stress(resultats: list, score_resilience: dict) -> list:
    """Génère des recommandations basées sur les résultats du stress test."""
    recs = []

    if score_resilience["score_global"] >= 80:
        recs.append(
            "✅ Bonne résilience globale. Maintenir le niveau de fonds propres et la politique "
            "de provisionnement conservatrice. Actualiser le stress test annuellement."
        )
        return recs

    # Identifier les scénarios les plus impactants
    scenarios_critiques = [r for r in resultats if r["seuil_rupture_atteint"]]
    if scenarios_critiques:
        noms = [r["scenario"] for r in scenarios_critiques]
        recs.append(
            f"🔴 RUPTURE DÉTECTÉE sous : {', '.join(noms)}. "
            "L'IMF doit renforcer d'urgence ses fonds propres (augmentation de capital, "
            "incorporation de réserves, attraction d'investisseurs). Présenter un PPR "
            "actualisé à la BCEAO intégrant ces scénarios de stress."
        )

    # Érosion FP > 30%
    erosions_fortes = [r for r in resultats if r["impacts"]["erosion_fonds_propres_pct"] > 30]
    if erosions_fortes:
        recs.append(
            "🟠 ÉROSION SIGNIFICATIVE DES FONDS PROPRES : Renforcer le coussin de capital. "
            "Envisager une réduction temporaire de la distribution de dividendes. "
            "Plafonner la croissance du portefeuille de crédit."
        )

    # PAR 90 post-stress > 10%
    par90_eleves = [r for r in resultats if r["apres_stress"]["PAR_90_pct"] > 10]
    if par90_eleves:
        recs.append(
            "🟠 PAR 90 POST-STRESS ÉLEVÉ : Renforcer la politique de recouvrement et "
            "la sélectivité à l'octroi. Diversifier le portefeuille par secteur et par produit. "
            "Mettre en place des systèmes d'alerte précoce (early warning signals)."
        )

    # Ratio de capitalisation < 10% post-stress
    capitalisation_faible = [r for r in resultats if r["apres_stress"]["ratio_capitalisation"] < 10]
    if capitalisation_faible:
        recs.append(
            "🟠 RATIO DE CAPITALISATION SOUS LE SEUIL POST-STRESS : Plan de recapitalisation "
            "nécessaire. Explorer les options : augmentation de capital, dette subordonnée, "
            "cession d'actifs non stratégiques."
        )

    # Impact combiné taux + PAR
    impacts_taux = [r for r in resultats if r["impacts"]["surcout_refinancement"] > 0]
    if impacts_taux and erosions_fortes:
        recs.append(
            "🟠 DOUBLE CHOC TAUX + CRÉDIT : L'IMF est vulnérable à une hausse combinée "
            "des taux et du PAR. Sécuriser des lignes de refinancement à taux fixe. "
            "Réduire la dépendance aux emprunts à taux variable."
        )

    return recs


# ─────────────────────────────────────────────────────────────────────
# RAPPORT PRINCIPAL
# ─────────────────────────────────────────────────────────────────────


def executer_stress_test(
    filepath: str,
    scenarios_noms: list,
    fonds_propres: float,
    encours_emprunts: float,
    marge_nette: float,
    output_json: bool = False,
) -> Optional[dict]:
    """
    Exécute le pipeline complet de stress test.
    """
    print("=" * 70)
    print("  ⚡ KHEPRA OS — STRESS TEST PORTEFEUILLE BCEAO")
    print(f"  Date : {datetime.now().strftime('%d %B %Y — %H:%M')}")
    print("=" * 70)

    df = charger_portefeuille(filepath)
    if df is None:
        return None

    # Classification et provisions initiales
    df = classifier_portefeuille(df)

    print(f"\n  📊 DONNÉES D'ENTRÉE")
    print(f"  • Fonds Propres Nets      : {fonds_propres:>15,.0f} FCFA")
    print(f"  • Encours Emprunts         : {encours_emprunts:>15,.0f} FCFA")
    print(f"  • Marge Nette Annuelle     : {marge_nette:>15,.0f} FCFA")

    resultats = []
    for nom_scenario in scenarios_noms:
        if nom_scenario not in SCENARIOS:
            print(f"  ⚠️  Scénario inconnu : {nom_scenario}")
            continue

        scenario = SCENARIOS[nom_scenario]
        resultat = appliquer_scenario(df, scenario, fonds_propres, encours_emprunts, marge_nette)
        resultats.append(resultat)

    # Score de résilience
    score = calculer_score_resilience(resultats)

    # Affichage
    print(f"\n{'─' * 70}")
    print(f"  📋 RÉSULTATS PAR SCÉNARIO")
    print(f"{'─' * 70}")

    for r in resultats:
        emoji = "🔴" if r["seuil_rupture_atteint"] else "🟢"
        print(f"\n  {emoji} {r['scenario']} (Intensité {r['intensite']}/4)")
        print(f"  {'─' * 60}")

        avant = r["avant_stress"]
        apres = r["apres_stress"]
        impacts = r["impacts"]

        print(f"  {'Indicateur':<35s} {'Avant':>15s} {'Après':>15s} {'Variation':>15s}")
        print(f"  {'─' * 35} {'─' * 15} {'─' * 15} {'─' * 15}")

        def fmt_var(avant_val, apres_val):
            diff = apres_val - avant_val
            if isinstance(avant_val, (int, float)) and avant_val > 1000:
                return f"{diff:+,.0f}"
            return f"{diff:+.2f}"

        indicateurs = [
            ("PAR 30 (%)", f"{avant['PAR_30_pct']:.2f}%", f"{apres['PAR_30_pct']:.2f}%",
             f"{apres['PAR_30_pct'] - avant['PAR_30_pct']:+.2f}pp"),
            ("PAR 90 (%)", f"{avant['PAR_90_pct']:.2f}%", f"{apres['PAR_90_pct']:.2f}%",
             f"{apres['PAR_90_pct'] - avant['PAR_90_pct']:+.2f}pp"),
            ("Provisions (FCFA)", f"{avant['provisions']:,.0f}", f"{apres['provisions']:,.0f}",
             f"{impacts['hausse_provisions_fcfa']:+,.0f}"),
            ("Ratio Capitalisation (%)", f"{avant['ratio_capitalisation']:.2f}%", f"{apres['ratio_capitalisation']:.2f}%",
             f"{apres['ratio_capitalisation'] - avant['ratio_capitalisation']:+.2f}pp"),
            ("Érosion Fonds Propres (%)", "—", f"{impacts['erosion_fonds_propres_pct']:.2f}%", "—"),
            ("Surcoût Refinancement (FCFA)", "—", f"{impacts['surcout_refinancement']:,.0f}", "—"),
            ("Résultat Net Impacté (FCFA)", f"{avant['marge_nette']:,.0f}", f"{impacts['resultat_net_impacte']:,.0f}",
             f"{impacts['resultat_net_impacte'] - avant['marge_nette']:+,.0f}"),
        ]

        for label, val_avant, val_apres, var in indicateurs:
            print(f"  {label:<35s} {str(val_avant):>15s} {str(val_apres):>15s} {str(var):>15s}")

        if r["seuil_rupture_atteint"]:
            print(f"\n  ⚠️  SEUIL DE RUPTURE ATTEINT — Fonds propres négatifs après stress !")

    # Score de résilience
    print(f"\n{'─' * 70}")
    print(f"  🏆 SCORE DE RÉSILIENCE KHEPRA : {score['score_global']}/100")
    print(f"  📋 Appréciation : {score['appreciation']}")
    print(f"{'─' * 70}")

    if score["penalites"]:
        print("  Pénalités appliquées :")
        for p in score["penalites"]:
            print(f"  • {p['scenario']} — {p['raison']} (Pénalité: -{p['penalite']:.1f})")

    # Recommandations
    recs = generer_recommandations_stress(resultats, score)
    print(f"\n{'─' * 70}")
    print("  🔧 RECOMMANDATIONS POST-STRESS TEST")
    print(f"{'─' * 70}")
    for i, rec in enumerate(recs, 1):
        print(f"  {i}. {rec}")

    print(f"\n{'=' * 70}")
    print("  ✅ Stress test terminé — KHEPRA OS v1.0.0")
    print("=" * 70)

    if output_json:
        return {
            "metadata": {
                "outil": "KHEPRA OS — Stress Test Portefeuille BCEAO",
                "version": "1.0.0",
                "date": datetime.now().isoformat(),
                "fichier_source": filepath,
                "fonds_propres": fonds_propres,
                "encours_emprunts": encours_emprunts,
                "marge_nette": marge_nette,
            },
            "scenarios_executes": scenarios_noms,
            "resultats": [
                {
                    "scenario": r["scenario"],
                    "intensite": r["intensite"],
                    "avant_stress": r["avant_stress"],
                    "apres_stress": r["apres_stress"],
                    "impacts": r["impacts"],
                    "seuil_rupture_atteint": r["seuil_rupture_atteint"],
                }
                for r in resultats
            ],
            "score_resilience": score,
            "recommandations": recs,
        }

    return None


# ─────────────────────────────────────────────────────────────────────
# DONNÉES DE DÉMONSTRATION
# ─────────────────────────────────────────────────────────────────────


def generer_portefeuille_demo() -> pd.DataFrame:
    """Génère un portefeuille de crédits fictif pour démonstration."""
    np.random.seed(42)
    nb_credits = 2500

    montants_moyens = np.random.choice(
        [150_000, 500_000, 1_200_000, 3_500_000, 8_000_000],
        size=nb_credits,
        p=[0.35, 0.30, 0.20, 0.12, 0.03],
    )
    capital = np.random.normal(montants_moyens, montants_moyens * 0.3)
    capital = np.maximum(capital, 50_000).astype(int)

    categories = np.random.choice(
        ["sain", "sensible", "predouteux", "douteux", "compromis"],
        size=nb_credits,
        p=[0.85, 0.08, 0.04, 0.02, 0.01],
    )

    jours_retard = np.zeros(nb_credits, dtype=int)
    for i, cat in enumerate(categories):
        if cat == "sensible":
            jours_retard[i] = np.random.randint(1, 31)
        elif cat == "predouteux":
            jours_retard[i] = np.random.randint(31, 91)
        elif cat == "douteux":
            jours_retard[i] = np.random.randint(91, 181)
        elif cat == "compromis":
            jours_retard[i] = np.random.randint(181, 400)

    secteurs_pool = ["Commerce", "Agriculture", "Services", "Transport", "Artisanat", "Éducation", "Santé"]
    secteurs = np.random.choice(secteurs_pool, size=nb_credits, p=[0.30, 0.20, 0.25, 0.10, 0.08, 0.04, 0.03])

    natures_garantie = np.random.choice(["reelle", "autre/sans"], size=nb_credits, p=[0.35, 0.65])

    data = []
    for i in range(nb_credits):
        data.append({
            "id_credit": f"CRD-{2026:04d}-{i + 1:05d}",
            "capital_restant_du": int(capital[i]),
            "jours_retard": int(jours_retard[i]),
            "nature_garantie": natures_garantie[i],
            "secteur": secteurs[i],
        })

    return pd.DataFrame(data)


# ─────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(
        description="KHEPRA OS — Stress Test Portefeuille BCEAO pour EMF/SFD",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemples:
  python khepra_stress_test_portefeuille.py portefeuille.csv --scenario tous
  python khepra_stress_test_portefeuille.py portefeuille.csv --scenario par_modere,combine
  python khepra_stress_test_portefeuille.py --demo
  python khepra_stress_test_portefeuille.py portefeuille.csv --scenario tous --fp 800000000 --emprunts 300000000 --marge 120000000
        """,
    )
    parser.add_argument("fichier", nargs="?", help="Chemin vers le fichier portefeuille (.csv, .xlsx, .xls)")
    parser.add_argument("--demo", action="store_true", help="Lancer avec des données de démonstration")
    parser.add_argument("--scenario", default="tous", help="Scénarios à exécuter (séparés par des virgules, ou 'tous')")
    parser.add_argument("--fp", type=float, default=500_000_000, help="Fonds Propres Nets (FCFA)")
    parser.add_argument("--emprunts", type=float, default=200_000_000, help="Encours des emprunts (FCFA)")
    parser.add_argument("--marge", type=float, default=80_000_000, help="Marge nette annuelle (FCFA)")
    parser.add_argument("--json", metavar="FICHIER", help="Exporter les résultats au format JSON")

    args = parser.parse_args()

    # Déterminer les scénarios
    if args.scenario == "tous":
        scenarios_noms = list(SCENARIOS.keys())
    else:
        scenarios_noms = [s.strip() for s in args.scenario.split(",")]

    if args.demo:
        print("🧪 Mode démonstration — Données fictives (2 500 crédits)\n")
        df = generer_portefeuille_demo()
        df = classifier_portefeuille(df)

        fp = args.fp
        emprunts = args.emprunts
        marge = args.marge

        print(f"  📊 DONNÉES D'ENTRÉE (DÉMO)")
        print(f"  • Fonds Propres Nets      : {fp:>15,.0f} FCFA")
        print(f"  • Encours Emprunts         : {emprunts:>15,.0f} FCFA")
        print(f"  • Marge Nette Annuelle     : {marge:>15,.0f} FCFA")
        print(f"  • Encours Crédits          : {df['capital_restant_du'].sum():>15,.0f} FCFA")

        resultats = []
        for nom_scenario in scenarios_noms:
            if nom_scenario not in SCENARIOS:
                print(f"  ⚠️  Scénario inconnu : {nom_scenario}")
                continue
            scenario = SCENARIOS[nom_scenario]
            resultat = appliquer_scenario(df, scenario, fp, emprunts, marge)
            resultats.append(resultat)

        score = calculer_score_resilience(resultats)

        print(f"\n{'─' * 70}")
        print(f"  📋 RÉSULTATS PAR SCÉNARIO (DÉMO)")
        print(f"{'─' * 70}")

        for r in resultats:
            emoji = "🔴" if r["seuil_rupture_atteint"] else "🟢"
            impacts = r["impacts"]
            print(f"  {emoji} {r['scenario']} (Intensité {r['intensite']}/4)")
            print(f"       PAR 30 : {r['avant_stress']['PAR_30_pct']:.1f}% → {r['apres_stress']['PAR_30_pct']:.1f}%")
            print(f"       PAR 90 : {r['avant_stress']['PAR_90_pct']:.1f}% → {r['apres_stress']['PAR_90_pct']:.1f}%")
            print(f"       Provisions : {r['avant_stress']['provisions']:,.0f} → {r['apres_stress']['provisions']:,.0f} FCFA (+{impacts['hausse_provisions_pct']:.1f}%)")
            print(f"       Fonds Propres : {r['avant_stress']['fonds_propres']:,.0f} → {r['apres_stress']['fonds_propres']:,.0f} FCFA (-{impacts['erosion_fonds_propres_pct']:.1f}%)")
            print(f"       Ratio Capitalisation : {r['avant_stress']['ratio_capitalisation']:.1f}% → {r['apres_stress']['ratio_capitalisation']:.1f}%")
            print()

        print(f"{'─' * 70}")
        print(f"  🏆 SCORE DE RÉSILIENCE KHEPRA : {score['score_global']}/100")
        print(f"  📋 {score['appreciation']}")
        print(f"{'─' * 70}")

        recs = generer_recommandations_stress(resultats, score)
        print("\n🔧 RECOMMANDATIONS :")
        for i, rec in enumerate(recs, 1):
            print(f"  {i}. {rec}")

        if args.json:
            resultat_json = {
                "metadata": {
                    "outil": "KHEPRA OS — Stress Test Portefeuille BCEAO",
                    "version": "1.0.0",
                    "date": datetime.now().isoformat(),
                    "mode": "demo",
                },
                "resultats": [
                    {
                        "scenario": r["scenario"],
                        "intensite": r["intensite"],
                        "impacts": r["impacts"],
                        "seuil_rupture_atteint": r["seuil_rupture_atteint"],
                    }
                    for r in resultats
                ],
                "score_resilience": score,
                "recommandations": recs,
            }
            with open(args.json, "w", encoding="utf-8") as f:
                json.dump(resultat_json, f, ensure_ascii=False, indent=2)
            print(f"\n✅ Résultats exportés → {args.json}")
        return

    if not args.fichier:
        parser.print_help()
        print("\n❌ Veuillez spécifier un fichier ou utiliser --demo")
        sys.exit(1)

    resultat = executer_stress_test(
        args.fichier, scenarios_noms, args.fp, args.emprunts, args.marge, output_json=bool(args.json)
    )

    if args.json and resultat:
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(resultat, f, ensure_ascii=False, indent=2)
        print(f"\n✅ Résultats exportés → {args.json}")


if __name__ == "__main__":
    main()