-- Nanno desktop accounts: e-mail login codes and per-device tokens.
-- Purchases stay in nano_orders and are matched to the account by e-mail.
create table if not exists nano_login_codes (
  email       text primary key,
  code_hash   text not null,
  attempts    integer not null default 0,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);

create table if not exists nano_devices (
  id          bigserial primary key,
  token_hash  text not null unique,
  email       text not null,
  created_at  timestamptz not null default now(),
  last_seen   timestamptz not null default now()
);

create index if not exists nano_devices_email on nano_devices (email)
