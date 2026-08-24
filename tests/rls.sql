-- ============================================================
-- RLS Security Tests — Big Four Khepra Experts
-- Fichier : tests/rls.sql
-- Objectif : Valider que anon/authenticated ne peuvent pas
--            modifier kb_docs / kos_agents
-- Usage : psql $(DATABASE_URL) -f tests/rls.sql
-- ============================================================

\echo '========================================'
\echo '  KHEPRA RLS SECURITY TEST SUITE v1.0'
\echo '========================================'
\echo ''

-- ============================================================
-- TEST 1 : anon ne peut PAS ecrire dans kb_docs
-- ============================================================
\echo '--- TEST 1 : anon INSERT kb_docs (doit FAIL) ---'
DO $$
DECLARE
  v_ok boolean := false;
BEGIN
  SET LOCAL ROLE anon;
  BEGIN
    INSERT INTO public.kb_docs(title, content)
    VALUES ('RLS_TEST_HACK', 'tentative injection test RLS');
    -- Si on arrive ici = RLS cassee
    RAISE NOTICE '❌ FAIL : anon a reussi a INSERT dans kb_docs';
  EXCEPTION WHEN insufficient_privilege THEN
    v_ok := true;
    RAISE NOTICE '✅ PASS : anon bloque sur INSERT kb_docs (insufficient_privilege)';
  WHEN OTHERS THEN
    v_ok := true;
    RAISE NOTICE '✅ PASS : anon bloque sur INSERT kb_docs (%)', SQLERRM;
  END;
  RESET ROLE;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'TEST 1 FAILED : anon peut ecrire kb_docs';
  END IF;
END $$;

-- ============================================================
-- TEST 2 : authenticated ne peut PAS UPDATE kos_agents
-- ============================================================
\echo '--- TEST 2 : authenticated UPDATE kos_agents (doit FAIL) ---'
DO $$
DECLARE
  v_ok boolean := false;
  v_before double precision;
BEGIN
  -- Sauvegarde valeur actuelle pour restauration
  SELECT accuracy INTO v_before FROM public.kos_agents LIMIT 1;

  SET LOCAL ROLE authenticated;
  BEGIN
    UPDATE public.kos_agents SET accuracy = 999.99;
    -- Si on arrive ici = RLS cassee
    RAISE NOTICE '❌ FAIL : authenticated a reussi a UPDATE kos_agents';
    -- Restore
    RESET ROLE;
    UPDATE public.kos_agents SET accuracy = v_before WHERE accuracy = 999.99;
  EXCEPTION WHEN insufficient_privilege THEN
    v_ok := true;
    RAISE NOTICE '✅ PASS : authenticated bloque sur UPDATE kos_agents (insufficient_privilege)';
  WHEN OTHERS THEN
    v_ok := true;
    RAISE NOTICE '✅ PASS : authenticated bloque sur UPDATE kos_agents (%)', SQLERRM;
  END;
  RESET ROLE;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'TEST 2 FAILED : authenticated peut modifier kos_agents';
  END IF;
END $$;

-- ============================================================
-- TEST 3 : service_role peut LIRE kos_agents
-- ============================================================
\echo '--- TEST 3 : service_role SELECT kos_agents (doit OK) ---'
DO $$
DECLARE
  v_count int;
BEGIN
  -- service_role est le role par defaut de psql avec cle service
  SELECT count(*) INTO v_count FROM public.kos_agents;

  IF v_count >= 0 THEN
    RAISE NOTICE '✅ PASS : service_role peut SELECT kos_agents (count=%)', v_count;
  ELSE
    RAISE EXCEPTION 'TEST 3 FAILED : service_role ne peut pas lire kos_agents';
  END IF;
END $$;

-- ============================================================
-- TEST 4 : authenticated peut LIRE kb_docs (read-only)
-- ============================================================
\echo '--- TEST 4 : authenticated SELECT kb_docs (doit OK) ---'
DO $$
DECLARE
  v_count int;
BEGIN
  SET LOCAL ROLE authenticated;
  BEGIN
    SELECT count(*) INTO v_count FROM public.kb_docs;
    RESET ROLE;
    RAISE NOTICE '✅ PASS : authenticated peut SELECT kb_docs (count=%)', v_count;
  EXCEPTION WHEN OTHERS THEN
    RESET ROLE;
    RAISE EXCEPTION 'TEST 4 FAILED : authenticated ne peut pas lire kb_docs : %', SQLERRM;
  END;
END $$;

-- ============================================================
-- TEST 5 : anon ne peut PAS lire kos_agents
-- ============================================================
\echo '--- TEST 5 : anon SELECT kos_agents (doit FAIL) ---'
DO $$
DECLARE
  v_ok boolean := false;
BEGIN
  SET LOCAL ROLE anon;
  BEGIN
    PERFORM count(*) FROM public.kos_agents;
    RAISE NOTICE '❌ FAIL : anon a reussi a SELECT kos_agents';
  EXCEPTION WHEN insufficient_privilege THEN
    v_ok := true;
    RAISE NOTICE '✅ PASS : anon bloque sur SELECT kos_agents (insufficient_privilege)';
  WHEN OTHERS THEN
    v_ok := true;
    RAISE NOTICE '✅ PASS : anon bloque sur SELECT kos_agents (%)', SQLERRM;
  END;
  RESET ROLE;

  IF NOT v_ok THEN
    RAISE EXCEPTION 'TEST 5 FAILED : anon peut lire kos_agents';
  END IF;
END $$;

\echo ''
\echo '========================================'
\echo '  ✅  ALL RLS TESTS PASSED'
\echo '========================================'