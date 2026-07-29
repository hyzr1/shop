-- 004_storage_bucket.sql
insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true) on conflict do nothing;

create policy "Owner uploads to site-assets" on storage.objects for insert
  with check (bucket_id = 'site-assets' and exists (
    select 1 from public.sites where id::text = split_part(name, '/', 1) and user_id = auth.uid()
  ));

create policy "Anyone reads site-assets" on storage.objects for select using (bucket_id = 'site-assets');
