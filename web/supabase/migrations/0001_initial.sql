-- Enable required extensions
create extension if not exists "pgcrypto";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'admin')),
  created_at timestamptz default now()
);

-- Restaurants (single per user for MVP)
create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  google_maps_url text,
  google_place_id text unique,
  phone text,
  city text,
  categories text[],
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Subscription usage (Free vs Starter)
create table if not exists public.subscription_usage (
  restaurant_id uuid primary key references public.restaurants(id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'starter')),
  sms_limit int not null default 50,
  sms_used int not null default 0,
  renewed_at timestamptz default date_trunc('month', now()),
  updated_at timestamptz default now()
);

-- Customers
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  name text,
  phone text not null,
  email text,
  created_at timestamptz default now()
);

-- SMS review requests
create table if not exists public.review_requests (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  phone text not null,
  email text,
  message text,
  link_token text not null unique,
  status text not null default 'pending' check (status in ('pending', 'sent', 'delivered', 'clicked', 'blocked')),
  sent_at timestamptz,
  delivered_at timestamptz,
  clicked_at timestamptz,
  created_at timestamptz default now()
);

-- Reviews (Google Places primary, Apify fallback)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  source text not null default 'google' check (source in ('google', 'apify')),
  source_id text not null,
  reviewer_name text,
  rating int not null check (rating between 1 and 5),
  body text,
  review_date timestamptz,
  ai_reply text,
  ai_reply_created_at timestamptz,
  created_at timestamptz default now(),
  unique (restaurant_id, source, source_id)
);

-- Posted replies (reuse AI suggestion)
create table if not exists public.review_replies (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  reply text not null,
  posted_at timestamptz default now(),
  unique (review_id)
);

-- Sync logs
create table if not exists public.review_sync_logs (
  id bigserial primary key,
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  source text not null,
  status text not null check (status in ('success', 'partial', 'failed')),
  message text,
  created_at timestamptz default now()
);

-- Landing contact form
create table if not exists public.contact_messages (
  id bigserial primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Marketing leads (landing form)
create table if not exists public.marketing_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  restaurant text,
  country text,
  covers_per_month text,
  message text,
  opted_in boolean default false,
  ip_address text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  created_at timestamptz default now()
);

-- Helper indexes
create index if not exists idx_reviews_restaurant_date on public.reviews (restaurant_id, review_date desc);
create index if not exists idx_customers_restaurant_phone on public.customers (restaurant_id, phone);
