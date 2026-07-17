-- ----------------------------------------------------------------------------
-- 11. RLS sur circular_page_map
-- ----------------------------------------------------------------------------

ALTER TABLE public.circular_page_map ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read circular_page_map" ON public.circular_page_map;
CREATE POLICY "Allow public read circular_page_map"
  ON public.circular_page_map
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow admin manage circular_page_map" ON public.circular_page_map;
CREATE POLICY "Allow admin manage circular_page_map"
  ON public.circular_page_map
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );