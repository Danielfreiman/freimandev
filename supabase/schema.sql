-- ============================================================
-- Freiman Dev — Admin Schema
-- Rodar no SQL Editor do Supabase (uma única execução)
-- ============================================================

-- Extensões
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUM types
-- ============================================================

create type project_status as enum (
  'lead',          -- proposta ainda não enviada
  'proposal_sent', -- orçamento enviado
  'contracted',    -- contrato assinado
  'in_progress',   -- em execução
  'delivered',     -- entregue
  'cancelled'      -- cancelado
);

create type payment_type as enum ('entrada', 'parcela', 'final');
create type payment_status as enum ('pendente', 'pago', 'atrasado', 'cancelado');
create type document_type as enum ('orcamento', 'contrato', 'entregavel');
create type contract_status as enum ('rascunho', 'enviado', 'assinado', 'cancelado');

-- ============================================================
-- CLIENTS
-- ============================================================

create table clients (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  company     text,
  email       text,
  phone       text,
  notes       text,
  logo_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ============================================================
-- PROJECTS
-- ============================================================

create table projects (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid not null references clients(id) on delete cascade,
  name          text not null,
  status        project_status not null default 'lead',
  total_value   numeric(12,2) not null default 0,
  paid_value    numeric(12,2) not null default 0,
  start_date    date,
  due_date      date,
  delivered_at  date,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_projects_client on projects(client_id);
create index idx_projects_status on projects(status);

-- ============================================================
-- BUDGET ITEMS (linhas do orçamento)
-- ============================================================

create table budget_items (
  id            uuid primary key default uuid_generate_v4(),
  project_id    uuid not null references projects(id) on delete cascade,
  description   text not null,
  quantity      numeric(8,2) not null default 1,
  unit_price    numeric(12,2) not null default 0,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index idx_budget_project on budget_items(project_id);

-- ============================================================
-- CONTRACTS
-- ============================================================

create table contracts (
  id              uuid primary key default uuid_generate_v4(),
  project_id      uuid not null references projects(id) on delete cascade,
  status          contract_status not null default 'rascunho',
  clauses         jsonb not null default '[]'::jsonb,
  upfront_percent int not null default 50 check (upfront_percent = 50),
  signed_at       date,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_contracts_project on contracts(project_id);

-- ============================================================
-- PAYMENTS
-- ============================================================

create table payments (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references projects(id) on delete cascade,
  amount      numeric(12,2) not null,
  type        payment_type not null,
  status      payment_status not null default 'pendente',
  due_date    date,
  paid_at     date,
  notes       text,
  created_at  timestamptz not null default now()
);

create index idx_payments_project on payments(project_id);
create index idx_payments_status on payments(status);

-- ============================================================
-- DELIVERABLES
-- ============================================================

create table deliverables (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references projects(id) on delete cascade,
  title       text not null,
  description text,
  items       jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index idx_deliverables_project on deliverables(project_id);

-- ============================================================
-- DOCUMENTS (PDFs gerados)
-- ============================================================

create table documents (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references projects(id) on delete cascade,
  type        document_type not null,
  file_url    text,
  file_name   text,
  created_at  timestamptz not null default now()
);

create index idx_documents_project on documents(project_id);

-- ============================================================
-- UPDATED_AT trigger (reutilizável)
-- ============================================================

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_clients_updated    before update on clients      for each row execute function set_updated_at();
create trigger trg_projects_updated   before update on projects     for each row execute function set_updated_at();
create trigger trg_contracts_updated  before update on contracts    for each row execute function set_updated_at();
create trigger trg_deliverables_upd   before update on deliverables for each row execute function set_updated_at();

-- ============================================================
-- Sync paid_value no projects quando payments mudam
-- ============================================================

create or replace function sync_paid_value()
returns trigger as $$
begin
  update projects
  set paid_value = coalesce((
    select sum(amount) from payments
    where project_id = coalesce(new.project_id, old.project_id)
      and status = 'pago'
  ), 0)
  where id = coalesce(new.project_id, old.project_id);
  return null;
end;
$$ language plpgsql;

create trigger trg_payments_sync
  after insert or update or delete on payments
  for each row execute function sync_paid_value();

-- ============================================================
-- ROW LEVEL SECURITY
-- Apenas usuários autenticados podem acessar tudo (admin single-user)
-- ============================================================

alter table clients      enable row level security;
alter table projects     enable row level security;
alter table budget_items enable row level security;
alter table contracts    enable row level security;
alter table payments     enable row level security;
alter table deliverables enable row level security;
alter table documents    enable row level security;

create policy "auth_only" on clients      for all using (auth.role() = 'authenticated');
create policy "auth_only" on projects     for all using (auth.role() = 'authenticated');
create policy "auth_only" on budget_items for all using (auth.role() = 'authenticated');
create policy "auth_only" on contracts    for all using (auth.role() = 'authenticated');
create policy "auth_only" on payments     for all using (auth.role() = 'authenticated');
create policy "auth_only" on deliverables for all using (auth.role() = 'authenticated');
create policy "auth_only" on documents    for all using (auth.role() = 'authenticated');

-- Bucket privado para propostas, contratos e entregáveis.
-- Os arquivos são abertos no admin por URLs assinadas de curta duração.
insert into storage.buckets (id, name, public)
values ('admin-documents', 'admin-documents', false)
on conflict (id) do update set public = false;

create policy "admin_documents_select"
on storage.objects for select
to authenticated
using (bucket_id = 'admin-documents');

create policy "admin_documents_insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'admin-documents');

create policy "admin_documents_update"
on storage.objects for update
to authenticated
using (bucket_id = 'admin-documents')
with check (bucket_id = 'admin-documents');

create policy "admin_documents_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'admin-documents');

-- ============================================================
-- VIEW: resumo financeiro por projeto
-- ============================================================

create or replace view project_financial_summary as
select
  p.id as project_id,
  p.name as project_name,
  c.name as client_name,
  p.status,
  p.total_value,
  p.paid_value,
  p.total_value - p.paid_value as remaining,
  p.start_date,
  p.due_date,
  count(pay.id) filter (where pay.status = 'pendente') as pending_payments,
  count(pay.id) filter (where pay.status = 'atrasado') as overdue_payments
from projects p
join clients c on c.id = p.client_id
left join payments pay on pay.project_id = p.id
group by p.id, p.name, c.name, p.status, p.total_value, p.paid_value, p.start_date, p.due_date;
