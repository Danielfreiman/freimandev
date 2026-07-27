-- Rodar somente se o schema.sql anterior já tiver sido executado.
-- Em instalações novas, basta rodar o schema.sql atualizado.

alter table contracts
  drop constraint if exists contracts_upfront_percent_check;

update contracts set upfront_percent = 50;

alter table contracts
  add constraint contracts_upfront_percent_check check (upfront_percent = 50);

insert into storage.buckets (id, name, public)
values ('admin-documents', 'admin-documents', false)
on conflict (id) do update set public = false;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_documents_select'
  ) then
    create policy "admin_documents_select"
      on storage.objects for select to authenticated
      using (bucket_id = 'admin-documents');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_documents_insert'
  ) then
    create policy "admin_documents_insert"
      on storage.objects for insert to authenticated
      with check (bucket_id = 'admin-documents');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_documents_update'
  ) then
    create policy "admin_documents_update"
      on storage.objects for update to authenticated
      using (bucket_id = 'admin-documents')
      with check (bucket_id = 'admin-documents');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_documents_delete'
  ) then
    create policy "admin_documents_delete"
      on storage.objects for delete to authenticated
      using (bucket_id = 'admin-documents');
  end if;
end
$$;
