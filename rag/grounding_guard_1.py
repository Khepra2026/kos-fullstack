
# KOS RAG Anti-hallucination guard - Big Four requirement
# Si pas de preuve suffisante => refuser d'inventer
from typing import List, Dict

def validate_grounded_answer(question: str, retrieved: List[Dict], answer: str, min_score=0.75) -> Dict:
    if not retrieved:
        return {"allowed": False, "reason": "Aucune source réglementaire trouvée", "action": "REFUSE_AND_ASK_CLARIFICATION"}
    # Vérif citations
    citations = [d for d in retrieved if d.get("score",0) >= min_score]
    if len(citations) == 0:
        return {"allowed": False, "reason": "Score retrieval insuffisant", "action": "REFUSE"}
    # Vérif chaque citation a hash, version, date, provenance
    for c in citations:
        if not all(k in c for k in ["hash","version","date","source_url","doc_id"]):
            return {"allowed": False, "reason": f"Citation incomplète {c.get('doc_id')}", "action": "REFUSE"}
    # Si OK, autoriser mais forcer citations
    return {"allowed": True, "citations": citations, "grounded_rate": len(citations)/len(retrieved)}
