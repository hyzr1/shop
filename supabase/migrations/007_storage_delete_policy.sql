create policy "Owner deletes site-assets" on storage.objects for delete
  using (bucket_id = 'site-assets' and exists (
    select 1 from public.sites where id::text = split_part(name, '/', 1) and user_id = auth.uid()
  ));

create policy "Owner updates site-assets" on storage.objects for update
  using (bucket_id = 'site-assets' and exists (
    select 1 from public.sites where id::text = split_part(name, '/', 1) and user_id = auth.uid()
  ));
