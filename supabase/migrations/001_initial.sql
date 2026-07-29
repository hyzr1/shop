-- Enable extensions
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  full_name text,
  avatar_url text,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text check (subscription_status in ('trialing', 'active', 'canceled', 'past_due', 'unpaid')) default 'trialing',
  trial_ends_at timestamptz default (now() + interval '30 days'),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Sites table
create table public.sites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  subdomain text unique not null,
  description text,
  template text default 'default',
  status text check (status in ('active', 'suspended', 'pending')) default 'active',
  custom_domain text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Plugins table (marketplace)
create table public.plugins (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  category text,
  is_free boolean default true,
  price_monthly integer default 0,
  author text default 'Hyzr',
  version text default '1.0.0',
  active boolean default true,
  created_at timestamptz default now()
);

-- Site plugins (installed plugins per site)
create table public.site_plugins (
  id uuid default uuid_generate_v4() primary key,
  site_id uuid references public.sites(id) on delete cascade not null,
  plugin_id uuid references public.plugins(id) on delete cascade not null,
  enabled boolean default true,
  settings jsonb default '{}',
  installed_at timestamptz default now(),
  unique(site_id, plugin_id)
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.site_plugins enable row level security;
alter table public.plugins enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can view own sites" on public.sites for select using (auth.uid() = user_id);
create policy "Users can insert own sites" on public.sites for insert with check (auth.uid() = user_id);
create policy "Users can update own sites" on public.sites for update using (auth.uid() = user_id);
create policy "Users can delete own sites" on public.sites for delete using (auth.uid() = user_id);

create policy "Anyone can view plugins" on public.plugins for select using (true);

create policy "Users can view own site plugins" on public.site_plugins for select using (
  exists (select 1 from public.sites where id = site_id and user_id = auth.uid())
);
create policy "Users can manage own site plugins" on public.site_plugins for all using (
  exists (select 1 from public.sites where id = site_id and user_id = auth.uid())
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed plugins
insert into public.plugins (name, slug, description, icon, category, is_free) values
  ('Analytics', 'analytics', 'Track visitors, page views, and conversions', '📊', 'Analytics', true),
  ('SEO Tools', 'seo-tools', 'Optimize your site for search engines', '🔍', 'Marketing', true),
  ('Contact Form', 'contact-form', 'Add a contact form to your site', '📬', 'Communication', true),
  ('Live Chat', 'live-chat', 'Real-time chat with your visitors', '💬', 'Communication', false),
  ('Email Marketing', 'email-marketing', 'Send newsletters and campaigns', '📧', 'Marketing', false),
  ('E-commerce', 'ecommerce', 'Sell products directly from your site', '🛒', 'Commerce', false),
  ('Booking System', 'booking', 'Accept appointments and reservations', '📅', 'Commerce', false),
  ('Blog', 'blog', 'Add a blog to your site', '✍️', 'Content', true),
  ('Image Gallery', 'gallery', 'Beautiful image galleries and lightboxes', '🖼️', 'Content', true),
  ('Social Feed', 'social-feed', 'Display your social media feeds', '📱', 'Social', true),
  ('Password Protection', 'password-protect', 'Protect pages with a password', '🔒', 'Security', true),
  ('Custom Code', 'custom-code', 'Add custom HTML, CSS, and JavaScript', '💻', 'Developer', true);
