-- ===================================================
-- KOS BIG FOUR AUDIT LOG RLS FIX
-- ===================================================

alter table public.kos_audit_log enable row level security;


drop policy if exists "audit_read_service" 
on public.kos_audit_log;


create policy "audit_read_service"
on public.kos_audit_log
for select
to anon, authenticated
using (true);


drop policy if exists "audit_insert_service"
on public.kos_audit_log;


create policy "audit_insert_service"
on public.kos_audit_log
for insert
to anon, authenticated
with check (true);