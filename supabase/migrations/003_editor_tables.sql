-- Themes: one row per site, global tokens + site-wide CSS
create table public.themes (
  id          uuid default uuid_generate_v4() primary key,
  site_id     uuid references public.sites(id) on delete cascade not null unique,
  settings    jsonb default '{}'::jsonb not null,
  custom_css  text default '' not null,
  updated_at  timestamptz default now()
);

-- Pages: one row per page per site
create table public.pages (
  id              uuid default uuid_generate_v4() primary key,
  site_id         uuid references public.sites(id) on delete cascade not null,
  slug            text not null,
  page_type       text not null check (page_type in (
    'home','page','product','collection','collection_list','cart',
    'search','blog','article','not_found','password'
  )),
  title           text default '' not null,
  sections        jsonb default '[]'::jsonb not null,
  draft_sections  jsonb,
  published_at    timestamptz,
  updated_at      timestamptz default now(),
  unique (site_id, slug)
);

-- Assets: uploaded images/files per site
create table public.assets (
  id          uuid default uuid_generate_v4() primary key,
  site_id     uuid references public.sites(id) on delete cascade not null,
  url         text not null,
  alt         text default '',
  width       int,
  height      int,
  bytes       int,
  mime_type   text,
  created_at  timestamptz default now()
);

-- Indexes
create index pages_site_id_page_type_idx on public.pages (site_id, page_type);
create index assets_site_id_created_at_idx on public.assets (site_id, created_at desc);

-- RLS
alter table public.themes enable row level security;
alter table public.pages enable row level security;
alter table public.assets enable row level security;

-- Owner read/write
create policy "Owner manages themes" on public.themes for all using (
  exists (select 1 from public.sites where id = site_id and user_id = auth.uid())
);
create policy "Owner manages pages" on public.pages for all using (
  exists (select 1 from public.sites where id = site_id and user_id = auth.uid())
);
create policy "Owner manages assets" on public.assets for all using (
  exists (select 1 from public.sites where id = site_id and user_id = auth.uid())
);

-- Public read for renderer (publishing session will use this)
create policy "Anyone reads themes" on public.themes for select using (true);
create policy "Anyone reads pages" on public.pages for select using (true);
create policy "Anyone reads assets" on public.assets for select using (true);
