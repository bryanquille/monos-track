-- Storage bucket for movement receipts and its access policies

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receipts', 'receipts', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Usuarios pueden ver sus propios comprobantes" on storage.objects;
create policy "Usuarios pueden ver sus propios comprobantes"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'receipts' and auth.uid() = owner);

drop policy if exists "Usuarios pueden subir comprobantes" on storage.objects;
create policy "Usuarios pueden subir comprobantes"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'receipts');

drop policy if exists "Usuarios pueden eliminar sus propios comprobantes" on storage.objects;
create policy "Usuarios pueden eliminar sus propios comprobantes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'receipts' and auth.uid() = owner);
