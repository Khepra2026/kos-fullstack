from fastembed import TextEmbedding
_model = None
def get_model():
    global _model
    if _model is None:
        # Modèle multilingue 384 dim supporté par FastEmbed 0.4.1, parfait pour OHADA FR
        _model = TextEmbedding(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2", cache_dir="/tmp/cache")
    return _model

def embed_text(text: str, is_query: bool = False):
    model = get_model()
    vec = list(model.embed([text]))[0]
    return vec.tolist()
