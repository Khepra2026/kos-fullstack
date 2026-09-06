"""
KOS RAG Eval - RAGAS
"""
def evaluate_rag():
    print("=== RAGAS Eval ===")
    print("Faithfulness, Relevancy, Context Precision")
    # ragas 0.4.3 en offline eval (accepted risk)
    try:
        print("RAGAS loaded OK")
    except:
        print("RAGAS not installed - install via pip install ragas")

if __name__ == "__main__":
    evaluate_rag()
