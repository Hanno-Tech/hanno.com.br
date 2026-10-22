-- Nano waitlist with referrals. Each referral moves the referrer up REF_BUMP spots
-- (see lib/nano/waitlist.ts); 3 referrals unlock the "Referral Cat" skin.
create table if not exists nano_waitlist (
  id          bigserial primary key,
  email       text not null unique,
  ref_code    text not null unique,
  referred_by text references nano_waitlist (ref_code),
  locale      text,
  source      text,
  created_at  timestamptz not null default now()
);

create index if not exists nano_waitlist_referred_by on nano_waitlist (referred_by);
