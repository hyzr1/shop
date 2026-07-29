-- Create default theme for any existing site that doesn't have one
insert into public.themes (site_id, settings, custom_css)
select s.id, '{
  "colors": {"schemes": {
    "scheme_1": {"background":"#ffffff","text":"#111111","accent":"#111111","button":"#111111","button_text":"#ffffff"},
    "scheme_2": {"background":"#111111","text":"#ffffff","accent":"#ffffff","button":"#ffffff","button_text":"#111111"}
  }},
  "typography": {"heading_font":{"family":"Inter","weight":600},"body_font":{"family":"Inter","weight":400},"heading_scale":1,"body_scale":1},
  "spacing": {"section_padding":"medium","container_width":1280},
  "buttons": {"radius":"md","weight":"medium"}
}'::jsonb, ''
from public.sites s
where not exists (select 1 from public.themes t where t.site_id = s.id);

-- Seed a home page for any site that doesn't have one yet.
-- (Originally this read from sites.content for legacy headline text, but that column
-- was never applied to this project — old per-site text was never captured. We use
-- sites.name as a reasonable default; users can edit the headline in the editor.)
insert into public.pages (site_id, slug, page_type, title, sections)
select
  s.id, 'home', 'home', 'Home',
  jsonb_build_array(
    jsonb_build_object(
      'id', 'sec_h',
      'type', 'header',
      'settings', '{}'::jsonb,
      'blocks', '[]'::jsonb,
      'disabled', false
    ),
    jsonb_build_object(
      'id', 'sec_b',
      'type', 'image-banner',
      'settings', jsonb_build_object('height', 'large', 'content_alignment', 'bottom-center', 'overlay_opacity', 40),
      'blocks', jsonb_build_array(
        jsonb_build_object('id', 'b_h', 'type', 'heading',    'settings', jsonb_build_object('text', coalesce(s.name, 'Welcome'), 'size', 'xl')),
        jsonb_build_object('id', 'b_s', 'type', 'subheading', 'settings', jsonb_build_object('text', '')),
        jsonb_build_object('id', 'b_c', 'type', 'button',     'settings', jsonb_build_object('label', 'Shop now', 'link', '/products', 'style', 'primary'))
      ),
      'disabled', false
    ),
    jsonb_build_object(
      'id', 'sec_f',
      'type', 'footer',
      'settings', jsonb_build_object('copyright', '© ' || coalesce(s.name, 'Your store')),
      'blocks', '[]'::jsonb,
      'disabled', false
    )
  )
from public.sites s
where not exists (select 1 from public.pages p where p.site_id = s.id and p.slug = 'home');

-- Seed the other required pages (empty) for any site that doesn't have them
insert into public.pages (site_id, slug, page_type, title, sections)
select s.id, slug, page_type, title, '[]'::jsonb
from public.sites s,
  (values
    ('product', 'product', 'Product template'),
    ('collection', 'collection', 'Collection template'),
    ('collection_list', 'collection_list', 'Collections'),
    ('cart', 'cart', 'Cart'),
    ('search', 'search', 'Search')
  ) as t(slug, page_type, title)
where not exists (select 1 from public.pages p where p.site_id = s.id and p.slug = t.slug);
