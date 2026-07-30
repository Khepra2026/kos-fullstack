# -*- coding: utf-8 -*-
"""
Audit helper KOS - Big Four compliant
"""
import hashlib
import json
from datetime import datetime, timezone
from typing import Any, Dict, Optional
import uuid

def compute_hash(data: Any) -> str:
    payload = json.dumps(data, sort_keys=True, default=str).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()

def build_audit_event(
    actor_id: str,
    actor_type: str,
    action: str,
    resource_type: Optional[str] = None,
    resource_id: Optional[str] = None,
    payload: Optional[Dict] = None,
    before: Optional[Dict] = None,
    after: Optional[Dict] = None,
    correlation_id: Optional[str] = None,
) -> Dict:
    """Genere un evenement d'audit conforme Big Four / inspection."""
    event = {
        "evidence_id": str(uuid.uuid4()),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "actor_id": actor_id,
        "actor_type": actor_type,
        "action": action,
        "resource_type": resource_type,
        "resource_id": resource_id,
        "payload_hash": compute_hash(payload) if payload else None,
        "before_hash": compute_hash(before) if before else None,
        "after_hash": compute_hash(after) if after else None,
        "result_hash": compute_hash(after) if after else None,
        "correlation_id": correlation_id or str(uuid.uuid4()),
    }
    return event

# Exemple FastAPI:
# from supabase import create_client
# event = build_audit_event(actor_id="...", actor_type="user", action="calculate_solvency_ratio")
# supabase.table("audit_log").insert(event).execute()
