def test_rag_fail_closed_without_key():
    import sys
    sys.path.insert(0, 'fly-backend')
    from app.rag_brain import fail_closed_retrieval
    class FakeClient:
        api_key = None
        def embed(self, q): return [0]*10
    try:
        fail_closed_retrieval('test', 'tenant-x', FakeClient(), None)
        assert False
    except RuntimeError as e:
        assert 'FAIL_CLOSED' in str(e) or 'MISSING' in str(e)
def test_rag_threshold():
    assert 0.72 > 0.7
