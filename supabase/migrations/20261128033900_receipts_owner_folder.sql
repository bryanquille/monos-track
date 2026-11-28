-- Restrict receipt uploads to the user's own folder.
-- Upload paths are now `${user.id}/${filename}`, so the first path segment must
-- match the authenticated user. Reads/deletes remain scoped by `owner`.

drop policy if exists "Usuarios pueden subir comprobantes" on storage.objects;
create policy "Usuarios pueden subir comprobantes"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'receipts'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
