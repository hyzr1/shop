-- Drop the legacy sites.content column. Apply ONLY after 005 has been
-- applied and existing sites have been spot-checked in the new editor.
alter table public.sites drop column if exists content;
