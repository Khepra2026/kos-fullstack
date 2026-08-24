import logging

class ZeroHallucinationGuardrail:
    def __init__(self, threshold: float = 0.88):
        self.threshold = threshold
        self.fallback_message = "Information non suffisamment vérifiée. Source primaire introuvable ou score de similarité insuffisant."

    def validate_response(self, sources: list, similarity_score: float) -> tuple[bool, str]:
        if not sources or similarity_score < self.threshold:
            logging.warning(f"Grounding validation failed. Score: {similarity_score}")
            return False, self.fallback_message
        return True, "Grounding validated successfully with primary sources."
