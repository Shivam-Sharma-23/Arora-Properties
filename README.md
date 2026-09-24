# Arora Properties

A real-estate listing web app built with React + Vite, migrated from an original static HTML mockup and extended with a full admin CMS.

## Features

- **Public site**: home page with hero/search, property listings with search/filter/sort, property detail pages with a photo gallery, favorites (persisted locally), agent/location/testimonial/FAQ/blog sections, WhatsApp contact links, and schedule-visit / contact-agent forms.
- **Admin panel** (`/admin`): a dashboard, full property management (multi-step add/edit wizard with photos, highlights, and review step), homepage content management (hero, popular locations, experts), FAQ and blog CMS, and review moderation. Admin edits apply immediately to the public site.

See [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) for details on what was ported, what was simplified, and known limitations. See [`CLAUDE.md`](./CLAUDE.md) for how this frontend talks to its backend.

## Project Structure

- `frontend/` — the React + Vite app (public site and `/admin` CMS UI). Deployed to Netlify.
- The admin login and content-publish API is a **separate** Express backend repo (`arora-backend`), deployed to
  Render. See [`CLAUDE.md`](./CLAUDE.md) for its URL and endpoints.
- `netlify/functions/` — the original implementation of that same API, now legacy/superseded (kept for reference,
  not actively used by the frontend). See [`CLAUDE.md`](./CLAUDE.md) before touching these.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The public site runs at the printed local URL; the admin panel is at `/admin`. Admin login/publish calls the backend
at `VITE_API_URL` (see `frontend/.env.example`) — defaults to `http://localhost:4000`, i.e. the `arora-backend` repo
running locally via its own `npm run dev`. If the backend isn't running/reachable, admin login falls back to a
local-only password — see `frontend/src/admin/AdminGuard.jsx` for that fallback value. Note the deployed backend is
on Render's free tier, which spins down when idle — the first request after a while can take 20-50s (cold start).

## Tech Stack

- React 19 + Vite
- React Router
- Plain CSS (no UI framework) — component-colocated stylesheets plus shared design tokens
- A separate Express backend + the GitHub API — admin saves commit content and uploaded images straight into this
  repo (`frontend/src/data/siteContent.json`, `frontend/public/uploads/`), which triggers a Netlify redeploy of the
  frontend. See [`CLAUDE.md`](./CLAUDE.md) for the backend's location, endpoints, and required env vars.

## Scripts

Run from `frontend/`:

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
