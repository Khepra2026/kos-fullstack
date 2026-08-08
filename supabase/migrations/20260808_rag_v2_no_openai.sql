create table if not exists public.kos_documents (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  title text,
  content text not null,
  evidence_id text default ('EV-'|| floor(random()*1000000)::text),
  metadata jsonb default '{}',
  created_at timestamptz default now()
);
alter table public.kos_documents enable row level security;
drop policy if exists "read all" on public.kos_documents;
create policy "read all" on public.kos_documents for select using (true);
create index if not exists idx_kos_docs_content on public.kos_documents using gin(to_tsvector('french', content));
