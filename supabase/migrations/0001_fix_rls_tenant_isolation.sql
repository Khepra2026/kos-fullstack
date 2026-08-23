-- FIX BIG FOUR RLS
create or replace function current_tenant_id() returns uuid language sql stable as $$ select nullif(current_setting('app.tenant_id', true), '')::uuid $$;
alter table public.documents enable row level security;
drop policy if exists "allow_all" on public.documents;
create policy "tenant_isolation_select" on public.documents for select using (tenant_id = current_tenant_id());
create policy "tenant_isolation_insert" on public.documents for insert with check (tenant_id = current_tenant_id());
create policy "tenant_isolation_update" on public.documents for update using (tenant_id = current_tenant_id()) with check (tenant_id = current_tenant_id());
create policy "tenant_isolation_delete" on public.documents for delete using (tenant_id = current_tenant_id());
