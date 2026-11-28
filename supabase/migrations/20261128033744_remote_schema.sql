-- Baseline schema for Monos Track
-- Source: schema dumped from the remote project (public schema)
-- Contains: public.movements table + RLS policies + grants

create table if not exists public.movements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id),
  movement_type text not null,
  amount numeric not null,
  category text not null,
  movement_date date not null,
  payment_method text not null,
  description text,
  receipt_path text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint movements_movement_type_check
    check (movement_type in ('income', 'expense'))
);

alter table public.movements enable row level security;

create policy "Los usuarios pueden ver sus propios movimientos"
  on public.movements for select
  using (auth.uid() = user_id);

create policy "Los usuarios pueden insertar sus propios movimientos"
  on public.movements for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios pueden actualizar sus propios movimientos"
  on public.movements for update
  using (auth.uid() = user_id);

create policy "Los usuarios pueden eliminar sus propios movimientos"
  on public.movements for delete
  using (auth.uid() = user_id);

grant usage on schema public to anon, authenticated, service_role;
grant references, trigger, truncate, maintain on table public.movements to anon;
grant all on table public.movements to authenticated;
grant references, trigger, truncate, maintain on table public.movements to service_role;
