# GATE 5 - RLS TENANT ISOLATION - Test local + SQL Supabase
Write-Host "=== GATE 5 RLS TENANT ISOLATION ===" -ForegroundColor Yellow
Write-Host "Supabase: pgfwhahiwqvqeahpirjx.supabase.co" -ForegroundColor Cyan

$sql = @"
-- Colle ce SQL dans https://supabase.com/dashboard/project/pgfwhahiwqvqeahpirjx/sql

-- 1. Clean
drop table if exists kos_test_tenants cascade;

-- 2. Create
create table kos_test_tenants (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  data text not null,
  created_at timestamptz default now()
);

-- 3. Enable RLS
alter table kos_test_tenants enable row level security;

-- 4. Policies
drop policy if exists "tenant_isolation_select" on kos_test_tenants;
create policy "tenant_isolation_select" on kos_test_tenants for select using (tenant_id = current_setting('app.tenant_id', true));

drop policy if exists "tenant_isolation_insert" on kos_test_tenants;
create policy "tenant_isolation_insert" on kos_test_tenants for insert with check (tenant_id = current_setting('app.tenant_id', true));

-- 5. Test data
insert into kos_test_tenants(tenant_id,data) values ('TENANT_A','secret compta BAD - Tenant A'),('TENANT_B','secret audit COBAC - Tenant B');

-- 6. Test isolation
set app.tenant_id = 'TENANT_A';
select 'TEST TENANT_A doit voir 1 ligne' as test, count(*) as cnt from kos_test_tenants;

set app.tenant_id = 'TENANT_B';
select 'TEST TENANT_B doit voir 1 ligne' as test, count(*) as cnt from kos_test_tenants;

set app.tenant_id = 'TENANT_C';
select 'TEST TENANT_C doit voir 0 ligne' as test, count(*) as cnt from kos_test_tenants;

-- 7. Cleanup test si OK
-- drop table kos_test_tenants;

"@

$sql | Set-Content evidence\GATE5-DB\GATE5-FULL-RLS.sql -Encoding utf8
Write-Host "SQL généré: evidence\GATE5-DB\GATE5-FULL-RLS.sql" -ForegroundColor Green
Write-Host "→ Va sur Supabase SQL Editor et colle le fichier" -ForegroundColor White
Write-Host "→ Screenshot le résultat des 3 SELECT (1,1,0) = preuve P0" -ForegroundColor White
