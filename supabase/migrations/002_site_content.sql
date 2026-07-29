-- Editable site content + per-site accent color
alter table public.sites add column if not exists content jsonb default '{}'::jsonb;
alter table public.sites add column if not exists accent text;
