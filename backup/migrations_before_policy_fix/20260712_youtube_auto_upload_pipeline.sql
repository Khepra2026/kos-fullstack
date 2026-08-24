-- ═══════════════════════════════════════════════════════════════
-- Migration: YouTube Auto-Upload Pipeline
-- Crée les tables yt_upload_queue et yt_tokens
-- À exécuter dans Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Table file d'attente upload YouTube
create table if not exists public.yt_upload_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  video_title text not null,
  video_description text,
  video_tags text[],
  video_url text not null,
  thumbnail_url text,
  status text default 'draft',
  yt_video_id text,
  error_msg text,
  scheduled_at timestamptz,
  created_at timestamptz default now(),
  published_at timestamptz
);

-- Table tokens YouTube
create table if not exists public.yt_tokens (
  user_id uuid primary key references auth.users,
  refresh_token text not null,
  channel_id text not null,
  channel_title text,
  expires_at timestamptz,
  updated_at timestamptz default now()
);

-- RLS
alter table public.yt_upload_queue enable row level security;
alter table public.yt_tokens enable row level security;

-- Policies yt_upload_queue
drop policy if exists "Users CRUD own queue" on public.yt_upload_queue;
create policy "Users CRUD own queue" on public.yt_upload_queue
  for all using (auth.uid() = user_id);

-- Policies yt_tokens
drop policy if exists "Users read own token" on public.yt_tokens;
create policy "Users read own token" on public.yt_tokens
  for select using (auth.uid() = user_id);

drop policy if exists "Users upsert own token" on public.yt_tokens;
create policy "Users upsert own token" on public.yt_tokens
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users update own token" on public.yt_tokens;
create policy "Users update own token" on public.yt_tokens
  for update using (auth.uid() = user_id);

-- Index pour le worker (trouver le plus ancien queued)
create index if not exists idx_yt_upload_queue_status_created
  on public.yt_upload_queue (status, created_at);