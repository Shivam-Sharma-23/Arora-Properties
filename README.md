# Arora Properties

A real-estate listing web app built with React + Vite, migrated from an original static HTML mockup and extended with a full admin CMS.

## Features

- **Public site**: home page with hero/search, property listings with search/filter/sort, property detail pages with a photo gallery, favorites (persisted locally), agent/location/testimonial/FAQ/blog sections, WhatsApp contact links, and schedule-visit / contact-agent forms.
- **Admin panel** (`/admin`): a dashboard, full property management (multi-step add/edit wizard with photos, highlights, and review step), homepage content management (hero, popular locations, experts), FAQ and blog CMS, and review moderation. Admin edits apply immediately to the public site.

See [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) for details on what was ported, what was simplified, and known limitations.

## Getting Started

```bash
npm install
npm run dev
```

The public site runs at the printed local URL; the admin panel is at `/admin` (development-only password gate — see `MIGRATION_NOTES.md` for the password).

## Tech Stack

- React 19 + Vite
- React Router
- Plain CSS (no UI framework) — component-colocated stylesheets plus shared design tokens
- Netlify Functions + the GitHub API — admin saves commit content and uploaded images straight into this repo (`src/data/siteContent.json`, `public/uploads/`), which triggers a Netlify redeploy. See "Admin persistence" below.

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

Run `netlify dev` (not just `vite dev`) locally to exercise the functions end-to-end; without it, admin login falls
back to a local-only password (see `AdminGuard.jsx`) and publishing will fail until a real login succeeds.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
