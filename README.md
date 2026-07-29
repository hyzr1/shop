# Hyzr Shop

A visual storefront builder for creating and managing multi-page ecommerce sites from reusable, schema-driven sections.

The project combines a polished SaaS dashboard with a three-panel page editor, live iframe preview, reusable templates, Supabase persistence, and Stripe billing flows.

Part of the Hyzr product family. Repository: `shop`. Reserved address: `shop.hyzr.ai`.

## Highlights

- Drag-and-drop section and block ordering with `dnd-kit`
- Schema-driven settings panels instead of one-off editor forms
- Live storefront preview isolated inside an iframe
- Undo and redo history with Zustand and Zundo
- Draft autosave with concurrent-save protection
- Asset upload and storage policies scoped by site ownership
- Complete home, product, collection, cart, search, and content pages
- Three distinct template systems: Pulse, Olea, and Atlas
- Protected dashboard routes with Supabase authentication
- Stripe checkout, customer portal, and webhook endpoints
- Responsive marketing site, onboarding, dashboard, and editor

## Architecture

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Editor state | Zustand with temporal undo/redo |
| Validation | Zod section and page schemas |
| Drag and drop | dnd-kit |
| Authentication and data | Supabase SSR |
| Storage | Supabase Storage with ownership policies |
| Billing | Stripe Checkout, portal, and webhooks |
| Testing | Vitest, Testing Library, Happy DOM |
| Styling and motion | Tailwind CSS 4, Motion, GSAP |

## How the editor works

Each storefront is represented as ordered pages containing ordered sections. A central registry connects every section type to:

- its React renderer;
- editable settings;
- allowed block types;
- defaults and validation rules.

The editor modifies a draft page in local state, sends selection and hover events to the preview frame, and persists draft sections to Supabase. Publishing promotes the draft into the live page data.

That registry-based design lets new sections participate in rendering, editing, validation, duplication, ordering, and persistence without adding custom editor logic for each template.

## Run locally

Requirements: Node.js 22+, npm, a Supabase project, and optionally Stripe.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Apply the SQL migrations in `supabase/migrations/` to your Supabase project before using the authenticated dashboard or editor.

### Environment variables

The Supabase variables are required for authenticated application routes. Stripe variables are only required for billing flows.

See [`.env.example`](.env.example) for the complete list. Never commit `.env.local`.

## Validation

```bash
npm run lint
npm test
npm run build
```

## Repository map

```text
src/app/                 marketing, auth, dashboard, editor, and API routes
src/components/          shared product and marketing components
src/lib/editor/          editor state, history, messaging, and persistence
src/sections/            registry, schemas, renderers, templates, and wrappers
supabase/migrations/     database, storage, and ownership policies
tests/                   component and editor behavior tests
docs/EDITOR_RUNBOOK.md   editor behavior and maintenance guide
```

## Status

The core page-builder workflow, templates, persistence, asset management, and billing endpoints are implemented. The next release work is deployment hardening, broader browser coverage, and end-to-end publishing tests.

---

A project by [Kaylem](https://github.com/hyzr1).
