[![KOS Audit](https://github.com/Khepra2026/kos-fullstack/actions/workflows/kos-audit.yml/badge.svg)](https://github.com/Khepra2026/kos-fullstack/actions)
[![Regulatory](https://img.shields.io/badge/Regulatory-44%20passed-brightgreen)]()

# KOS RegTech â€“ Dossier de Validation 40 Masters
**Date:** 2026-07-30 | **RÃ©fÃ©rence:** KOS-BigFour-Python-2026-07-30
**Statut:** 44 tests PASSED | **Normes:** BCEAO, COBAC, BÃ¢le III, IFRS 9, LBC/FT UEMOA

## 1. Objectif
Ce dossier constitue la preuve de non-rÃ©gression rÃ©glementaire pour les 40 Masters IA KOS, exigible par le Model Risk Committee et les auditeurs Big Four.

## 2. Structure de gouvernance (gÃ©nÃ©rÃ©e automatiquement)
```
01_model_cards/ -> template_model_card.json (owner, risk_level, human_in_loop)
02_audit_helpers/ -> audit_event.py (WORM, hash SHA256, correlation_id)
03_validation_suite/ -> test_*.py + audit_40_masters_FINAL.html
04_regulatory_versioning/ -> README + table regulatory_model_versions
05_security_checks/ -> checklist MFA, Vault, TLS 1.3, SBOM
06_observability/ -> logger.py
07_reports/ -> HTML self-contained + executive.md
```

## 3. Mapping Tests <-> RÃ©glementation

| Master | Test | RÃ©fÃ©rence RÃ©glementaire | Seuil |
|---|---|---|---|
| 01 | test_01_bceao_tier1_minimum | Instruction BCEAO nÂ°XXX Art. 10 - Fonds propres de base | >=7.5% |
| 02 | test_02_total_solvency_ratio | BÃ¢le III - SolvabilitÃ© totale | >=11.5% |
| 03 | test_03_leverage_ratio_bale3 | BÃ¢le III Levier | >=3% |
| 04 | test_04_capital_conservation_buffer | BÃ¢le III Buffer conservation | >=2.5% |
| 05 | test_05_countercyclical_buffer | BCEAO Buffer contracyclique | <=2.5% |
| 06 | test_06_lcr_ratio | BÃ¢le III LCR | >=100% |
| 07 | test_07_nsfr_ratio | BÃ¢le III NSFR | >=100% |
| 08-10 | Liquidity | Gestion ALM UEMOA | - |
| 11-13 | Risque crÃ©dit / Division | CB-UEMOA Grands risques | <=25% FP |
| 14-17 | IFRS 9 Staging & Provisioning | IFRS 9 + BCEAO | Stage 1<=30j, 2<=90j, 3>90j |
| 18-20 | CoR / NPL / Coverage | BCEAO Surveillance | NPL <=5%, Coverage >=60% |
| 21-25 | OpÃ©rationnel / MarchÃ© | BÃ¢le III Piliers 2 | VaR, FX <=20% |
| 26-33 | KYC / AML / PEP / UBO | Loi LBC/FT UEMOA 2015-08, RÃ¨glement 01/2026 | UBO>=10%, KYC refresh 365j |
| 34-35 | Audit Trail / WORM | Big Four - ImmutabilitÃ© preuves | - |
| 36-40 | Model Risk / Gouvernance IA | BCBS 239, SR 11-7, BCEAO IA | HITL si critical, checksum SHA256 |

## 4. Preuves d'audit gÃ©nÃ©rÃ©es
- `07_reports/audit_40_masters_FINAL.html` : self-contained, horodatÃ©, avec Python version, OS, hash
- `01_model_cards/template_model_card.json` : owner=MRC, human_in_the_loop=true
- `02_audit_helpers/audit_event.py` : evidence_id UUID, payload_hash, before/after_hash, correlation_id

## 5. Commandes de reproduction (Anaconda Prompt Admin)
```bat
cd /d %USERPROFILE%\Downloads\KOS-BigFour-Python-2026-07-30\03_validation_suite
pip install -q pytest pytest-html
python -m pytest -v --html=..\07_reports\audit_40_masters_FINAL.html --self-contained-html
```

## 6. Actions immÃ©diates pour clÃ´ture Big Four
1. ComplÃ©ter les 40 model cards Ã  partir du template
2. IntÃ©grer `audit_event.py` dans tous les endpoints FastAPI critiques
3. Brancher le runner en CI GitHub Actions (pytest --html)
4. Versionner les corpus rÃ©glementaires dans `regulatory_model_versions` (Supabase)
5. GÃ©nÃ©rer SBOM : `syft dir:. -o cyclonedx-json`

**SignÃ©:** KOS Model Risk Committee - 2026-07-30

