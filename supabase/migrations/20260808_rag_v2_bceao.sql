create extension if not exists vector;
create table if not exists public.kos_documents (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  title text,
  content text not null,
  embedding vector(1536),
  evidence_id text not null default ('EV-'|| floor(random()*1000000)::text),
  metadata jsonb default '{}',
  created_at timestamptz default now()
);
create index if not exists idx_kos_docs_emb on public.kos_documents using hnsw (embedding vector_cosine_ops);
create or replace function public.match_documents(query_embedding vector(1536), match_count int default 5, filter_source text default null)
returns table(id uuid, content text, source text, title text, evidence_id text, similarity float)
language sql stable as $$
  select id, content, source, title, evidence_id, 1 - (embedding <=> query_embedding) as similarity
  from public.kos_documents
  where (filter_source is null or source ilike '%'||filter_source||'%')
  order by embedding <=> query_embedding limit match_count;
$$;
alter table public.kos_documents enable row level security;
drop policy if exists "read all" on public.kos_documents;
create policy "read all" on public.kos_documents for select using (true);
