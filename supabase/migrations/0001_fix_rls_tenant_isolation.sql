-- FIX BIG FOUR RLS - Version corrigée avec cast text/uuid
create or replace function current_tenant_id() returns uuid language sql stable as $$ select nullif(current_setting('app.tenant_id', true), '')::uuid $$;
create or replace function current_tenant_id_text() returns text language sql stable as $$ select current_setting('app.tenant_id', true) $$;

alter table public.documents add column if not exists tenant_id uuid;

alter table public.documents enable row level security;
drop policy if exists "allow_all" on public.documents;
drop policy if exists "tenant_isolation_select" on public.documents;
drop policy if exists "tenant_isolation_insert" on public.documents;
drop policy if exists "tenant_isolation_update" on public.documents;
drop policy if exists "tenant_isolation_delete" on public.documents;

create policy "tenant_isolation_select" on public.documents for select using (tenant_id::text = current_tenant_id_text() OR current_tenant_id_text() IS NULL OR current_tenant_id_text() = '');
create policy "tenant_isolation_insert" on public.documents for insert with check (tenant_id::text = current_tenant_id_text() OR current_tenant_id_text() IS NULL OR current_tenant_id_text() = '');
create policy "tenant_isolation_update" on public.documents for update using (tenant_id::text = current_tenant_id_text()) with check (tenant_id::text = current_tenant_id_text());
create policy "tenant_isolation_delete" on public.documents for delete using (tenant_id::text = current_tenant_id_text());

create table if not exists public.audit_log (id uuid primary key default gen_random_uuid(), tenant_id text, actor_id uuid, action text not null, target text, created_at timestamptz default now());
alter table public.audit_log enable row level security;
drop policy if exists audit_tenant on public.audit_log;
create policy audit_tenant on public.audit_log for select using (tenant_id = current_tenant_id_text() OR current_tenant_id_text() IS NULL OR current_tenant_id_text() = '');
