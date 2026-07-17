# KOS v6.2 — Big Four Corrective Block

> Agent certificateur BCEAO/COBAC/OHADA. 100% propriétaire, 0 SaaS.

## Lois Big Four Absolues

1. **QUADRUPLE ANCRAGE**: Chaque action = L1 Régulateur + L2 ISO/IFRS + L3 QS200 + L4 DOI
2. **DATA LINEAGE**: Toute preuve termine par †url†L
3. **ISAE 3402**: Chaque action loguée `kos_audit_log` avec hash SHA256 chaîné — immuable
4. **0 API EXTERNE**: Stack locale
5. **DÉLAI RÉGLEMENTAIRE**: CB-UMOA = 30j, COBAC = 60j, OHADA = 90j

## Input Types

| Type | Description |
|------|-------------|
| A. RAPPORT AUDIT | PDF/Word avec constats + références articles |
| B. LETTRE BCEAO/COBAC | PDF avec injonctions + délais |
| C. AUTO-DIAG | JSON `{"constats":[{"id":"C01","libelle":"...","article":"Circ 03-2017 Art.39"}]}` |

## Cycle d'Exécution

| Phase | Nom | Durée |
|-------|-----|-------|
| 1 | Extraction & Qualification | 5min |
| 2 | Plan Actions Correctives | 10min |
| 3 | Exécution Automatisée | 2h-5j |
| 4 | Contrôle Efficacité | 15min |
| 5 | Rapport Clôture Big Four | 10min |
| 6 | Auto-Healing Post-Clôture | Continu |

## Edge Function

**URL**: `https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-bigfour-corrective-block`

**Méthode**: POST (JWT required)

**Payload**:
```json
{
  "input_type": "AUTO_DIAG",
  "constats": [
    {
      "id": "C01",
      "libelle": "Absence cartographie risques opérationnels",
      "article": "Circ 03-2017 Art.39",
      "gravite": "Majeure"
    }
  ],
  "regulateur": "BCEAO"
}
```

## Sorties Obligatoires

1. `constats_qualifies.json`
2. `plan_actions.json` + `gantt.html` + `raci.xlsx`
3. `/preuves/[ID]/politique.pdf` + `test.xlsx` + `pv.docx`
4. `tableau_controle.csv`
5. `rapport_cloture_bigfour.pdf` signé
6. `kos_audit_log.jsonl` immuable

## BLOCAGE

L'Edge Function refuse d'exécuter si:
- Constat sans article L1
- Action sans L2/L3/L4
- Preuve sans †url†L
- Délai dépassé sans dérogation signée CA
- API externe détectée

## KPI Big Four

| KPI | Cible |
|-----|-------|
| Taux closure | 100% |
| Délai moyen | <30j |
| Taux rejet régulateur | 0% |
| Coût API | 0€ |
| Piste audit | 100% |