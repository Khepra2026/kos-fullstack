#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# QDRANT INIT — Initialisation des 5 Collections Vectorielles KOS
# KHEPRA EXPERTS — Infrastructure Souveraine Big Four
# Usage : bash qdrant-init.sh
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

QDRANT_URL="${QDRANT_URL:-http://localhost:6333}"
QDRANT_TIMEOUT="${QDRANT_TIMEOUT:-30}"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  QDRANT — Initialisation 5 Collections Vectorielles KOS  ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════
# Vérification Qdrant
# ═══════════════════════════════════════════════════════════════
echo -e "${YELLOW}[CHECK]${NC} Vérification connexion Qdrant à ${QDRANT_URL}..."

if ! curl -sf --max-time "$QDRANT_TIMEOUT" "${QDRANT_URL}/health" > /dev/null 2>&1; then
  echo -e "${RED}[ERREUR]${NC} Qdrant injoignable à ${QDRANT_URL}"
  echo -e "  Vérifiez que le conteneur est démarré : docker ps | grep qdrant"
  exit 1
fi

echo -e "  ${GREEN}✓${NC} Qdrant est accessible."

# ═══════════════════════════════════════════════════════════════
# Définition des 5 Collections
# ═══════════════════════════════════════════════════════════════
declare -A COLLECTIONS

# Collection 1 : Connaissances Réglementaires (BCEAO, COBAC, OHADA, GAFI)
COLLECTIONS["kos_regulatory_knowledge"]='{
  "vectors": {
    "size": 384,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default_segment_number": 4
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 200
  },
  "quantization_config": {
    "scalar": {
      "type": "int8",
      "quantile": 0.99,
      "always_ram": true
    }
  }
}'

# Collection 2 : Mémoire Stratégique KHEPRA (learnings, décisions)
COLLECTIONS["kos_strategic_memory"]='{
  "vectors": {
    "size": 384,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default_segment_number": 2
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 200
  },
  "quantization_config": {
    "scalar": {
      "type": "int8",
      "quantile": 0.99,
      "always_ram": true
    }
  }
}'

# Collection 3 : Audit Intelligence (rapports, findings, recommendations)
COLLECTIONS["kos_audit_intelligence"]='{
  "vectors": {
    "size": 384,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default_segment_number": 2
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 200
  }
}'

# Collection 4 : Business Knowledge (méthodologies, best practices, templates)
COLLECTIONS["kos_business_knowledge"]='{
  "vectors": {
    "size": 384,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default_segment_number": 3
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 200
  },
  "quantization_config": {
    "scalar": {
      "type": "int8",
      "quantile": 0.99,
      "always_ram": true
    }
  }
}'

# Collection 5 : Auto-Expansion Logs (croissance organique, métriques)
COLLECTIONS["kos_auto_expansion"]='{
  "vectors": {
    "size": 384,
    "distance": "Cosine"
  },
  "optimizers_config": {
    "default_segment_number": 2
  },
  "hnsw_config": {
    "m": 16,
    "ef_construct": 200
  }
}'

# ═══════════════════════════════════════════════════════════════
# Création des collections
# ═══════════════════════════════════════════════════════════════
COLLECTION_NAMES=(
  "kos_regulatory_knowledge"
  "kos_strategic_memory"
  "kos_audit_intelligence"
  "kos_business_knowledge"
  "kos_auto_expansion"
)

COLLECTION_LABELS=(
  "Connaissances Réglementaires (BCEAO/COBAC/OHADA/GAFI)"
  "Mémoire Stratégique KHEPRA"
  "Audit Intelligence (Rapports & Findings)"
  "Business Knowledge (Méthodologies & Templates)"
  "Auto-Expansion Logs (Croissance Organique)"
)

CREATED=0
SKIPPED=0
FAILED=0

for i in "${!COLLECTION_NAMES[@]}"; do
  NAME="${COLLECTION_NAMES[$i]}"
  LABEL="${COLLECTION_LABELS[$i]}"
  CONFIG="${COLLECTIONS[$NAME]}"

  echo ""
  echo -e "${BOLD}[$((i+1))/5]${NC} ${CYAN}${LABEL}${NC}"
  echo -e "       Collection : ${BOLD}${NAME}${NC}"

  # Vérifier si la collection existe déjà
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$QDRANT_TIMEOUT" \
    "${QDRANT_URL}/collections/${NAME}" 2>/dev/null || echo "000")

  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "       ${YELLOW}⚠${NC}  Collection déjà existante — ignorée."
    ((SKIPPED++)) || true
    continue
  fi

  # Créer la collection
  echo -ne "       Création en cours..."
  
  RESPONSE=$(curl -s --max-time "$QDRANT_TIMEOUT" \
    -X PUT "${QDRANT_URL}/collections/${NAME}" \
    -H "Content-Type: application/json" \
    -d "$CONFIG" 2>/dev/null || echo '{"error":"timeout"}')

  if echo "$RESPONSE" | grep -q '"status":"ok"\|"result":true'; then
    echo -e "\r       ${GREEN}✓${NC} Collection créée avec succès."
    ((CREATED++)) || true

    # Créer les index de payload pour accélérer les filtres
    echo -ne "       Indexation payload..."
    
    curl -s --max-time "$QDRANT_TIMEOUT" \
      -X PUT "${QDRANT_URL}/collections/${NAME}/index" \
      -H "Content-Type: application/json" \
      -d '{"field_name": "source","field_schema": "keyword"}' > /dev/null 2>&1 || true
    
    curl -s --max-time "$QDRANT_TIMEOUT" \
      -X PUT "${QDRANT_URL}/collections/${NAME}/index" \
      -H "Content-Type: application/json" \
      -d '{"field_name": "timestamp","field_schema": "integer"}' > /dev/null 2>&1 || true
    
    curl -s --max-time "$QDRANT_TIMEOUT" \
      -X PUT "${QDRANT_URL}/collections/${NAME}/index" \
      -H "Content-Type: application/json" \
      -d '{"field_name": "confidence","field_schema": "float"}' > /dev/null 2>&1 || true

    echo -e "\r       ${GREEN}✓${NC} Index payload créés (source, timestamp, confidence)."
  else
    echo -e "\r       ${RED}✗${NC} Échec création."
    echo "       Réponse : $RESPONSE"
    ((FAILED++)) || true
  fi
done

# ═══════════════════════════════════════════════════════════════
# Résumé
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}✓ Créées  :${NC} ${CREATED}"
echo -e "  ${YELLOW}⚠ Ignorées:${NC} ${SKIPPED} (déjà existantes)"
echo -e "  ${RED}✗ Échecs  :${NC} ${FAILED}"
echo -e "${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo ""

if [ "$FAILED" -gt 0 ]; then
  echo -e "${RED}[WARNING]${NC} Certaines collections n'ont pas pu être créées."
  echo -e "  Vérifiez les logs Qdrant : docker logs kos-qdrant-vector"
  exit 1
fi

echo -e "${GREEN}${BOLD}✅ QDRANT — 5 Collections vectorielles prêtes.${NC}"
echo ""
echo -e "${CYAN}Vérification rapide :${NC}"
echo -e "  curl ${QDRANT_URL}/collections | python3 -m json.tool"
echo ""