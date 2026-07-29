# Shopify-style Editor — Runbook

This is what you need to do to bring the new editor online when you come back.

## 1. Apply Supabase migrations (one-time, ~5 minutes)

Open https://supabase.com/dashboard/project/qpnaksscgsmtdrmnnkng/sql/new and run these files **in order**, one at a time:

1. `supabase/migrations/003_editor_tables.sql` — creates `themes`, `pages`, `assets` tables + RLS
2. `supabase/migrations/004_storage_bucket.sql` — creates `site-assets` Storage bucket + insert/select policies
3. `supabase/migrations/007_storage_delete_policy.sql` — adds update/delete policies (so you can replace/remove images)
4. `supabase/migrations/005_migrate_legacy_content.sql` — backfills existing sites with the new `themes` + `pages` rows (idempotent — safe to re-run)

**STOP here.** Test the editor (see step 2). Only after confirming existing sites work, run:

5. `supabase/migrations/006_drop_legacy_content.sql` — drops the deprecated `sites.content` column

Step 5 is destructive. Skip it for now if any uncertainty.

## 2. Open the editor

After migrations 003-005 are applied:

```bash
npm run dev
```

Then in the dashboard, click on any site → **Editor tab** → **Open editor**. URL is `http://localhost:3000/edit/<site-id>`.

What you should see:
- Full-screen takeover (no dashboard sidebar)
- Section tree on the left (Header / Template / Footer groups)
- Live preview in the middle (iframe)
- Settings panel on the right
- Topbar with Draft badge, page dropdown (Home / Product / Collection / Collection list / Cart / Search), undo/redo, device toggle, Theme button, Save, Publish

## 3. What works

- Click a section in the tree → settings appear on the right
- Edit a text/color/image field → preview updates within 100ms
- Drag sections to reorder
- Add a section via the **+ Add section** button (bottom of Template group) → modal opens with grid of all 17 section types
- Hide / duplicate / delete a section via the **⋯** menu
- Click a section in the preview → tree selects it on the left
- Switch pages via the dropdown (Home / Product / etc.)
- Switch device (desktop / tablet / mobile)
- Autosave fires ~1.5s after the last edit → status shows "Saved just now"
- **Cmd/Ctrl+Z** undo, **Cmd/Ctrl+Shift+Z** (or Cmd+Y) redo, **Cmd/Ctrl+S** force save
- Open the **Theme** sheet → edit colors, fonts → save → preview updates
- Open an `image` field in any section's settings → asset picker → upload or pick existing

## 4. What's intentionally NOT live in v1

- **Publish button** → shows alert "Publishing ships in the next update." This is by design — publishing + subdomain routing is the next session per your scope decision.
- **404 / password / blog / article pages** → page_type enum reserves them but no editor pages exist yet
- **Custom domains** → next session along with publishing

## 5. What was deferred (real but out-of-scope items)

These are gaps vs. the spec that the editor still works without. Each is a small follow-up:

| Spec § | Gap | Fix size |
|---|---|---|
| §4.2 | "+ Add section" appears only at bottom of Template group, not between every section | small |
| §4.2 | ⋯ menu missing "move to top / move to bottom" actions | small |
| §4.5 | Back-to-dashboard button doesn't confirm unsaved changes | tiny |
| §5.2 | Renderer doesn't validate sections JSON against zod before render | small |
| §3.1 | `announcement-bar` has dismiss toggle in schema but component doesn't render dismiss button | tiny |
| §3.1 | `header` `menu-link` blocks support flat links only (no nested sub-menus) | medium |
| §3.5 | `font` field hardcodes weight=400 | tiny |
| §5.1 | Theme panel doesn't surface the site-wide `custom_css` field (it's in the DB and schema) | tiny |
| §6.1 | No `beforeunload` save — last edit may be lost if user closes the tab within 1.5s | tiny |

## 6. Security / runtime caveats (read before adding more users)

- **`custom-html` section** uses `dangerouslySetInnerHTML`. For a single-tenant editor where you only edit your own site this is fine, but if you ever ship "duplicate a template from another user" or share templates publicly, you need to sanitize this input (DOMPurify) and add a strict CSP to the preview iframe.
- **`featured-product` / `featured-collection`** show stub products. When you have a real `products` table, swap implementations in `src/lib/stub-commerce.ts` only.
- **Concurrent editing** (two browser tabs on the same page) will trigger a 409 in autosave; the topbar shows a red "Page updated elsewhere — refresh" banner. There's no merge UI; one of the two edit sessions has to refresh and lose its draft.

## 7. Pulse template (currently the only ported one)

Picking any template (Atlas, Olea, Aurora, etc.) in the Create-site modal currently falls back to Pulse content with default colors. To port more templates, each one needs a `src/lib/templates/<id>/template.json` file plus a registry entry — ~1 hour each.

## 8. Useful files for future work

- `src/sections/registry.ts` — central section registry. Add a new section here.
- `src/sections/types.ts` — TS types
- `src/sections/schema.ts` — zod schemas (DB validation)
- `src/lib/editor/store.ts` — Zustand store with zundo
- `src/lib/stub-commerce.ts` — fake product/collection/cart data (swap for real DB later)
- `src/lib/templates/pulse/template.json` — example template JSON to model new templates on
- `docs/superpowers/specs/2026-06-19-shopify-style-editor-design.md` — full design spec
- `docs/superpowers/plans/2026-06-19-shopify-style-editor.md` — full task-by-task implementation plan
