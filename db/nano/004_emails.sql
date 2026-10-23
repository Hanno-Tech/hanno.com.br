-- Nanno e-mails: one row per (address, kind) sent, so retries and broadcasts never repeat.
-- kind: waitlist_welcome | presale_open | beta_download | purchase_<plan>
create table if not exists nano_email_log (
  email    text not null,
  kind     text not null,
  sent_at  timestamptz not null default now(),
  primary key (email, kind)
);

alter table nano_waitlist add column if not exists unsubscribed_at timestamptz;

alter table nano_orders add column if not exists locale text
