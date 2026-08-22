alter table public.kos_documents enable row level security;
drop policy if exists "read all" on public.kos_documents;
create policy "tenant_isolation" on public.kos_documents for select using (tenant_id = auth.uid()::text);
create policy "tenant_insert" on public.kos_documents for insert with check (tenant_id = auth.uid()::text);
