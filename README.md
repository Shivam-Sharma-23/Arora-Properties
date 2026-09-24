# Arora Properties

A real-estate listing web app built with React + Vite, migrated from an original static HTML mockup and extended with a full admin CMS.

## Features

- **Public site**: home page with hero/search, property listings with search/filter/sort, property detail pages with a photo gallery, favorites (persisted locally), agent/location/testimonial/FAQ/blog sections, WhatsApp contact links, and schedule-visit / contact-agent forms.
- **Admin panel** (`/admin`): a dashboard, full property management (multi-step add/edit wizard with photos, highlights, and review step), homepage content management (hero, popular locations, experts), FAQ and blog CMS, and review moderation. Admin edits apply immediately to the public site.

See [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) for details on what was ported, what was simplified, and known limitations.

## Project Structure

- `frontend/` — the React + Vite app (public site and `/admin` CMS UI)
- `netlify/functions/` — Netlify Functions (admin login + content-save API)

Both are deployed together as a single Netlify site.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The public site runs at the printed local URL; the admin panel is at `/admin` (development-only password gate — see `MIGRATION_NOTES.md` for the password).

## Tech Stack

- React 19 + Vite
- React Router
- Plain CSS (no UI framework) — component-colocated stylesheets plus shared design tokens
- Netlify Functions + the GitHub API — admin saves commit content and uploaded images straight into this repo (`frontend/src/data/siteContent.json`, `frontend/public/uploads/`), which triggers a Netlify redeploy. See "Admin persistence" below.

## Admin persistence

Publishing an edit in `/admin` (Hero, Locations, Experts, FAQs, Reviews, and Publish/Delete for Properties & Blog)
POSTs to a Netlify Function (`netlify/functions/save-content.js`), which commits the updated content plus any newly
uploaded images to this GitHub repo in a single commit, using the Git Data API (`netlify/functions/_github.js`).
That push triggers Netlify's normal auto-deploy, so the change is live for every visitor after the build finishes
(roughly 1-2 minutes) — not just in the browser that made the edit. Draft properties/blog posts stay local
(`localStorage`) until published, matching the existing draft/publish workflow.

Admin sign-in is verified server-side by `netlify/functions/admin-login.js` against the `ADMIN_PASSWORD`
environment variable, returning a short-lived signed token (`TOKEN_SECRET`) required by `save-content`. Required
Netlify environment variables: `GITHUB_TOKEN` (a fine-grained PAT scoped to this repo, Contents: Read & Write),
`GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`, `ADMIN_PASSWORD`, `TOKEN_SECRET`.

Run `netlify dev` (not just `vite dev`) from the repo root to exercise the functions end-to-end; without it, admin
login falls back to a local-only password (see `AdminGuard.jsx`) and publishing will fail until a real login succeeds.

**Known limitation**: Netlify Functions run on AWS Lambda under the hood, which enforces a hard ~6MB payload limit
per synchronous request. `save-content` accepts up to 20 images at up to 8MB each (base64-encoded, ~33% larger than
the raw file), so publishing a property with several real photos at once can exceed that limit and silently fail to
persist. If this becomes a recurring problem, the fix is to move `save-content`'s upload handling off Netlify
Functions (e.g. a small dedicated server, or uploading images directly from the browser to storage and only sending
the resulting URLs through this function).

## Scripts

Run from `frontend/`:

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
