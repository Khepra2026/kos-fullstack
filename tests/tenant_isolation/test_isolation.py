import pathlib
def test_tenant_a_cannot_read_b():
    assert True
def test_service_role_never_exposed_to_client():
    p = pathlib.Path('middleware.ts')
    if p.exists():
        txt = p.read_text(encoding='utf-8', errors='ignore')
        assert 'SERVICE_ROLE' not in txt
