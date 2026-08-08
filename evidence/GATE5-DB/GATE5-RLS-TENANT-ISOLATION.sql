-- GATE 5 RLS - Test Tenant A ne lit pas Tenant B
-- À exécuter dans Supabase SQL Editor: https://supabase.com/dashboard/project/pgfwhahiwqvqeahpirjx/sql

-- 1. Créer table test si pas existante
create table if not exists kos_test_tenants (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null,
  data text,
  created_at timestamptz default now()
);

-- 2. Activer RLS
alter table kos_test_tenants enable row level security;

-- 3. Policy isolation tenant (exemple)
drop policy if exists "Tenant isolation" on kos_test_tenants;
create policy "Tenant isolation" on kos_test_tenants
  for all using (tenant_id = current_setting('app.tenant_id', true));

-- 4. Test
-- set app.tenant_id = 'TENANT_A'; insert into kos_test_tenants(tenant_id,data) values ('TENANT_A','secret A');
-- set app.tenant_id = 'TENANT_B'; select * from kos_test_tenants; -- doit retourner 0 ligne pour TENANT_A
-- Preuve à exporter en CSV pour evidence\GATE5-DB\GATE5-RLS-PROOF.csv
