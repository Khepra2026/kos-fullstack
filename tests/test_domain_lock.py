import pytest
import requests
import os
# Note: In production CI, uncomment when FastAPI backend is available:
# from fastapi.testclient import TestClient
# from backend.main import app
# from backend.engines.domain_lock import DomainLock, Domain

BASE_URL = os.getenv("TEST_API_URL", "http://localhost:8001")
KOS_EDGE_FUNCTION_URL = os.getenv(
    "KOS_EDGE_FUNCTION_URL",
    "https://khepraexperts.com/api/rag-universal-v8"
)

# ─── Domain Enum (mirrored from backend/engines/domain_lock.py) ───
from enum import Enum

class Domain(str, Enum):
    AGREMENT = "Agrément"
    GOUVERNANCE = "Gouvernance"
    LCB_FT = "LCB-FT"
    CONTROLE_INTERNE = "Contrôle interne"
    RISQUES = "Risques"
    FINANCE = "Finance"
    ESG = "ESG"
    GENERAL = "Général"

# ─── Axe 1 : Matrice de tests domaine = 100% coverage obligatoire ───
DOMAIN_TEST_CASES = [
    # Format: (query, expected_domain, keywords_that_must_appear_in_response)
    ("agrement microfinance", Domain.AGREMENT, ["dossier d'agrément", "capital minimum", "BCEAO"]),
    ("agréer un SFD", Domain.AGREMENT, ["autorisation", "conditions d'exercice"]),
    ("licence établissement de crédit", Domain.AGREMENT, ["agrément", "BCEAO"]),
    ("dossier d'agrément EMF", Domain.AGREMENT, ["microfinance", "établissement"]),
    ("comités spécialisés", Domain.GOUVERNANCE, ["comité d'audit", "conseil d'administration"]),
    ("conseil d'administration", Domain.GOUVERNANCE, ["administrateur", "organe délibérant"]),
    ("commissaire aux comptes", Domain.GOUVERNANCE, ["mandat", "assemblée générale"]),
    ("administrateur indépendant", Domain.GOUVERNANCE, ["conseil", "gouvernance"]),
    ("lcb-ft", Domain.LCB_FT, ["blanchiment", "déclaration de soupçon"]),
    ("lutte anti blanchiment", Domain.LCB_FT, ["KYC", "gel des avoirs"]),
    ("déclaration de soupçon", Domain.LCB_FT, ["TRACFIN", "GAFI"]),
    ("gel des avoirs terroristes", Domain.LCB_FT, ["financement", "terrorisme"]),
    ("contrôle interne", Domain.CONTROLE_INTERNE, ["3 lignes", "COSO"]),
    ("lignes de défense", Domain.CONTROLE_INTERNE, ["contrôle", "audit"]),
    ("cartographie des risques", Domain.RISQUES, ["appétit", "Bâle"]),
    ("risque opérationnel", Domain.RISQUES, ["provision", "scoring"]),
]


# ═══════════════════════════════════════════════════════════════════════
# UNIT TESTS — Axe 1 : DomainLock.detect()
# ═══════════════════════════════════════════════════════════════════════

@pytest.mark.parametrize("query,expected_domain,required_keywords", DOMAIN_TEST_CASES)
def test_domain_detection_unit(query, expected_domain, required_keywords):
    """
    Axe 1 : Test unitaire — la détection de domaine doit être correcte
    à 100% pour toutes les queries de la matrice.
    """
    from backend.engines.domain_lock import DomainLock

    detected = DomainLock.detect(query)
    assert detected == expected_domain, \
        f"Query '{query}' détectée comme {detected}, attendu {expected_domain}"


@pytest.mark.parametrize("query,expected_domain,required_keywords", DOMAIN_TEST_CASES)
def test_domain_lock_end_to_end(query, expected_domain, required_keywords):
    """
    Axe 1+3+5+6 : Test E2E — La query doit ressortir avec le bon domaine
    dans toutes les couches (backend → memo → sources → topic).
    """
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)
    resp = client.post("/ask-kos", json={"query": query})

    # 1. Status 200 — pas de 422 Domain mismatch
    assert resp.status_code == 200, f"API rejetée: {resp.text}"
    data = resp.json()

    # 2. Domain-Lock : le backend confirme le domaine
    assert data["domain_locked"] == expected_domain.value, \
        f"Domain-Lock cassé: attendu {expected_domain.value}, reçu {data['domain_locked']}"

    # 3. Axe 5 : Le topic du mémo contient le domaine
    memo_topic = data["memo"]["topic"].lower()
    assert expected_domain.value.lower() in memo_topic, \
        f"Memo topic '{memo_topic}' ne contient pas '{expected_domain.value}'"

    # 4. Axe 6 : Evidence Chain — 80% des sources matchent le domaine
    sources = data["memo"]["sources"]
    assert len(sources) > 0, "Aucune source retournée"
    domain_match = [s for s in sources if s.get("domaine") == expected_domain.value]
    ratio = len(domain_match) / len(sources)
    assert ratio >= 0.8, \
        f"Seulement {ratio*100:.0f}% des sources sont '{expected_domain.value}'. Hallucination."

    # 5. Axe 9 : Les mots-clés obligatoires sont dans la réponse
    response_text = str(data["memo"]).lower()
    for kw in required_keywords:
        assert kw.lower() in response_text, \
            f"Mot-clé obligatoire '{kw}' absent de la réponse pour domaine {expected_domain.value}"


# ═══════════════════════════════════════════════════════════════════════
# ANTI-REGRESSION — Axe 6 : les anciens bugs ne reviennent pas
# ═══════════════════════════════════════════════════════════════════════

@pytest.mark.parametrize("query,wrong_domain", [
    ("agrement microfinance", "LCB-FT"),
    ("comités spécialisés", "LCB-FT"),
    ("agréer un SFD", "Gouvernance"),
    ("dossier d'agrément EMF", "LCB-FT"),
    ("licence établissement de crédit", "Gouvernance"),
])
def test_anti_regression_hallucination(query, wrong_domain):
    """
    Test CRITIQUE : vérifie que les anciens bugs de confusion
    de domaine ne reviennent JAMAIS.
    """
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)
    resp = client.post("/ask-kos", json={"query": query})
    data = resp.json()

    # Le domaine ne doit JAMAIS être le mauvais
    assert data["domain_locked"] != wrong_domain, \
        f"RÉGRESSION CRITIQUE: '{query}' est retombé en '{wrong_domain}'"

    # Le topic ne doit pas mentionner le mauvais domaine
    assert wrong_domain.lower() not in data["memo"]["topic"].lower(), \
        f"RÉGRESSION CRITIQUE: le topic mentionne '{wrong_domain}' pour '{query}'"


# ═══════════════════════════════════════════════════════════════════════
# EVIDENCE CHAIN — Axe 6 : rejet cross-domaine
# ═══════════════════════════════════════════════════════════════════════

def test_evidence_chain_rejects_cross_domain():
    """
    Axe 6 : Si on force des evidences LCB-FT sur une query Agrément,
    la validation doit rejeter avec une exception Domain mismatch.
    """
    from backend.engines.domain_lock import DomainLock, Domain

    evidences_lcbft = [
        {"domaine": "LCB-FT", "title": "BCEAO Instruction 004-2020 LCB-FT"},
        {"domaine": "LCB-FT", "title": "FATF Recommendation 40"},
        {"domaine": "LCB-FT", "title": "GIABA Annual Report 2023"},
    ]

    with pytest.raises(Exception) as exc:
        DomainLock.validate_response(Domain.AGREMENT, evidences_lcbft, "Topic Agrément")

    assert "Domain mismatch" in str(exc.value), \
        f"L'exception devrait contenir 'Domain mismatch', reçu: {exc.value}"


def test_evidence_chain_passes_with_valid_sources():
    """
    Axe 6 : Avec 100% des sources dans le bon domaine, la validation
    doit passer sans erreur.
    """
    from backend.engines.domain_lock import DomainLock, Domain

    evidences_agrement = [
        {"domaine": "Agrément", "title": "BCEAO Instruction 004-2010"},
        {"domaine": "Agrément", "title": "COBAC R-2017/02"},
        {"domaine": "Agrément", "title": "OHADA Acte Uniforme"},
        {"domaine": "Agrément", "title": "Instruction BCEAO 001-2017"},
        {"domaine": "Agrément", "title": "Instruction BCEAO 002-2017"},
    ]

    # Ne doit pas lever d'exception
    result = DomainLock.validate_response(
        Domain.AGREMENT, evidences_agrement, "Intelligence Réglementaire — Agrément"
    )
    assert result is True, "La validation devrait retourner True"


def test_evidence_chain_edge_case_80_percent():
    """
    Axe 6 : Exactement 80% de match = doit passer (limite acceptable).
    4/5 = 80%.
    """
    from backend.engines.domain_lock import DomainLock, Domain

    evidences_mixed = [
        {"domaine": "Agrément", "title": "BCEAO Agr."},
        {"domaine": "Agrément", "title": "COBAC Agr."},
        {"domaine": "Agrément", "title": "OHADA Agr."},
        {"domaine": "Agrément", "title": "UEMOA Agr."},
        {"domaine": "Gouvernance", "title": "Gouv. (hors domaine)"},
    ]

    result = DomainLock.validate_response(
        Domain.AGREMENT, evidences_mixed, "Intelligence Réglementaire — Agrément"
    )
    assert result is True, "80% doit passer la validation"


# ═══════════════════════════════════════════════════════════════════════
# KPI TESTS — Axe 9 : Métriques de qualité
# ═══════════════════════════════════════════════════════════════════════

def test_kpi_domain_match_100_percent():
    """
    Axe 9 : Le KPI domainMatch doit être à 1.0 (100%) pour
    une query bien ciblée.
    """
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)
    resp = client.post("/ask-kos", json={"query": "agrement microfinance"})
    data = resp.json()
    kpi = data["kpi"]

    assert kpi["domainMatch"] == 1.0, \
        f"KPI Domain Match = {kpi['domainMatch']}, attendu 1.0 (100%)"
    assert kpi["jurisdictionMatch"] == 1.0, \
        f"KPI Jurisdiction Match = {kpi['jurisdictionMatch']}, attendu 1.0"
    assert kpi["confidence"] >= 0.95, \
        f"Confidence = {kpi['confidence']}, attendu >= 0.95"


def test_kpi_all_domains_meet_threshold():
    """
    Axe 9 : Pour TOUS les domains de la matrice, les KPIs doivent
    être au-dessus des seuils Big Four.
    """
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)

    for query, expected_domain, _ in DOMAIN_TEST_CASES:
        resp = client.post("/ask-kos", json={"query": query})
        if resp.status_code == 200:
            kpi = resp.json()["kpi"]
            assert kpi["confidence"] >= 0.90, \
                f"Confidence={kpi['confidence']} < 0.90 pour '{query}' ({expected_domain.value})"
            assert kpi["domainMatch"] >= 0.80, \
                f"domainMatch={kpi['domainMatch']} < 0.80 pour '{query}' ({expected_domain.value})"


# ═══════════════════════════════════════════════════════════════════════
# EDGE CASES — queries ambiguës, vides, hors domaine
# ═══════════════════════════════════════════════════════════════════════

def test_empty_query_fallback_to_general():
    """
    Une query vide doit tomber dans le domaine GENERAL sans erreur.
    """
    from backend.engines.domain_lock import DomainLock, Domain

    detected = DomainLock.detect("")
    assert detected == Domain.GENERAL, \
        f"Query vide détectée comme {detected}, attendu GENERAL"


def test_unknown_query_fallback_to_general():
    """
    Une query sans mot-clé reconnu doit tomber dans GENERAL.
    """
    from backend.engines.domain_lock import DomainLock, Domain

    detected = DomainLock.detect("bonjour comment ça va")
    assert detected == Domain.GENERAL, \
        f"Query inconnue détectée comme {detected}, attendu GENERAL"


def test_mixed_domains_uses_first_match():
    """
    Si une query contient des mots-clés de plusieurs domaines,
    le premier matché dans l'ordre de priorité doit l'emporter.
    Agrément > LCB-FT car testé en premier.
    """
    from backend.engines.domain_lock import DomainLock, Domain

    detected = DomainLock.detect("agrement et lcb-ft")
    assert detected == Domain.AGREMENT, \
        f"Query mixte détectée comme {detected}, attendu AGREMENT (priorité)"


def test_domain_lock_response_structure():
    """
    Vérifie que la réponse API contient tous les champs obligatoires
    du contrat Domain-Lock.
    """
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)
    resp = client.post("/ask-kos", json={"query": "agrement microfinance"})
    data = resp.json()

    # Contrat Domain-Lock v8 : champs obligatoires
    required_fields = [
        "query_domain",
        "domain_locked",
        "domain_validation",
        "memo",
        "kpi",
    ]
    for field in required_fields:
        assert field in data, f"Champ obligatoire '{field}' absent de la réponse"

    # domain_validation doit avoir les sous-champs
    validation = data["domain_validation"]
    assert "verdict" in validation, "domain_validation.verdict manquant"
    assert "match_ratio" in validation, "domain_validation.match_ratio manquant"
    assert validation["verdict"] in ("PASS", "WARNING", "FAIL"), \
        f"Verdict invalide: {validation['verdict']}"


# ═══════════════════════════════════════════════════════════════════════
# EDGE FUNCTION INTEGRATION — Test via URL HTTP (quand le backend est up)
# ═══════════════════════════════════════════════════════════════════════

@pytest.mark.integration
@pytest.mark.skipif(
    not os.getenv("RUN_INTEGRATION_TESTS"),
    reason="Intégration désactivée. Mettre RUN_INTEGRATION_TESTS=1 pour activer."
)
def test_edge_function_domain_lock_live():
    """
    Test d'intégration : appelle l'edge function v8 en production
    et vérifie que le Domain-Lock fonctionne de bout en bout.
    """
    resp = requests.post(
        KOS_EDGE_FUNCTION_URL,
        json={"query": "agrement microfinance"},
        headers={"Content-Type": "application/json"},
        timeout=30,
    )
    assert resp.status_code == 200, f"Edge function returned {resp.status_code}: {resp.text}"
    data = resp.json()

    assert data.get("domain_locked") == "Agrément", \
        f"Domain-Lock live échoué: {data.get('domain_locked')}"
    assert data.get("domain_validation", {}).get("verdict") == "PASS", \
        f"Validation live échouée: {data.get('domain_validation')}"


@pytest.mark.integration
@pytest.mark.skipif(
    not os.getenv("RUN_INTEGRATION_TESTS"),
    reason="Intégration désactivée. Mettre RUN_INTEGRATION_TESTS=1 pour activer."
)
@pytest.mark.parametrize("query,wrong_domain", [
    ("agrement microfinance", "LCB-FT"),
    ("comités spécialisés", "LCB-FT"),
])
def test_edge_function_anti_regression_live(query, wrong_domain):
    """
    Test d'intégration anti-régression : l'edge function v8
    ne doit JAMAIS retourner le mauvais domaine.
    """
    resp = requests.post(
        KOS_EDGE_FUNCTION_URL,
        json={"query": query},
        headers={"Content-Type": "application/json"},
        timeout=30,
    )
    assert resp.status_code == 200, f"Edge function returned {resp.status_code}"
    data = resp.json()

    assert data.get("domain_locked") != wrong_domain, \
        f"RÉGRESSION LIVE: '{query}' → '{data.get('domain_locked')}' (ne doit pas être '{wrong_domain}')"


# ═══════════════════════════════════════════════════════════════════════
# PERFORMANCE — tests de latence
# ═══════════════════════════════════════════════════════════════════════

def test_detect_performance():
    """
    DomainLock.detect() doit s'exécuter en < 1ms (pas de regex catastrophique).
    """
    import time
    from backend.engines.domain_lock import DomainLock

    queries = [tc[0] for tc in DOMAIN_TEST_CASES] * 10  # 160 queries

    start = time.perf_counter()
    for q in queries:
        DomainLock.detect(q)
    elapsed_ms = (time.perf_counter() - start) * 1000

    avg_ms = elapsed_ms / len(queries)
    assert avg_ms < 1.0, \
        f"DomainLock.detect() trop lent: {avg_ms:.3f}ms/query (seuil: <1ms)"


# ═══════════════════════════════════════════════════════════════════════
# CONTRACT — Schema de réponse complet
# ═══════════════════════════════════════════════════════════════════════

def test_response_schema_memo_structure():
    """
    Vérifie la structure complète du memo dans la réponse.
    """
    from fastapi.testclient import TestClient
    from backend.main import app

    client = TestClient(app)
    resp = client.post("/ask-kos", json={"query": "comités spécialisés"})
    data = resp.json()
    memo = data["memo"]

    required_memo_fields = [
        "topic", "jurisdictions", "sources_count",
        "executive_summary", "obligations", "sources",
    ]
    for field in required_memo_fields:
        assert field in memo, f"Champ memo '{field}' manquant"

    assert isinstance(memo["sources"], list), "memo.sources doit être une liste"
    assert isinstance(memo["obligations"], list), "memo.obligations doit être une liste"
    assert len(memo["obligations"]) >= 3, \
        f"Au moins 3 obligations attendues, reçu {len(memo['obligations'])}"