-- Nanno purchases, written by the Stripe webhook. One row per Checkout Session.
-- plan: founder (one-time) | monthly | annual (subscriptions)
-- status: paid | active | past_due | canceled | refunded
create table if not exists nano_orders (
  id                 bigserial primary key,
  stripe_session_id  text not null unique,
  stripe_customer_id text,
  subscription_id    text unique,
  payment_intent_id  text unique,
  email              text,
  plan               text not null,
  status             text not null,
  amount_cents       integer,
  currency           text,
  ref_code           text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists nano_orders_email on nano_orders (email);
create index if not exists nano_orders_plan_status on nano_orders (plan, status);
