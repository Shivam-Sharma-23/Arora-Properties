# Arora Properties

A real-estate listing web app built with React + Vite, migrated from an original static HTML mockup and extended with a full admin CMS.

## Features

- **Public site**: home page with hero/search, property listings with search/filter/sort, property detail pages with a photo gallery, favorites (persisted locally), agent/location/testimonial/FAQ/blog sections, WhatsApp contact links, and schedule-visit / contact-agent forms.
- **Admin panel** (`/admin`): a dashboard, full property management (multi-step add/edit wizard with photos, highlights, and review step), homepage content management (hero, popular locations, experts), FAQ and blog CMS, and review moderation. Admin edits apply immediately to the public site.

See [`MIGRATION_NOTES.md`](./MIGRATION_NOTES.md) for details on what was ported, what was simplified, and known limitations.

## Project Structure

- `frontend/` — the React + Vite app (public site and `/admin` CMS UI). Deployed to **Netlify**.
- `backend/` — a standalone Express server (admin login + content-save API). Deployed to **Render**.

The two are independently deployed services that talk to each other over HTTP: the frontend calls the backend at
whatever URL `VITE_API_URL` points to, and the backend allows cross-origin requests only from the frontend origin(s)
listed in `ALLOWED_ORIGIN`.

## Getting Started

Run both from the repo root, in two terminals:

```bash
# Terminal 1 — backend (http://localhost:4000)
cd backend
npm install
cp .env.example .env   # fill in ADMIN_PASSWORD / TOKEN_SECRET at minimum
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:4000 by default
npm run dev
```

The public site runs at the printed local URL; the admin panel is at `/admin`. If the backend isn't running/reachable,
admin login falls back to a local-only password — see `frontend/src/admin/AdminGuard.jsx` for that fallback value.

## Tech Stack

- **Frontend**: React 19 + Vite, React Router, plain CSS (no UI framework) — component-colocated stylesheets plus
  shared design tokens.
- **Backend**: Express (Node) + the GitHub API — admin saves commit content and uploaded images straight into this
  repo (`frontend/src/data/siteContent.json`, `frontend/public/uploads/`), which triggers a Netlify redeploy of the
  frontend. See "Admin persistence" below.

## Admin persistence

Publishing an edit in `/admin` (Hero, Locations, Experts, FAQs, Reviews, and Publish/Delete for Properties & Blog)
POSTs to the backend's `/save-content` route (`backend/routes/saveContent.js`), which commits the updated content
plus any newly uploaded images to this GitHub repo in a single commit, using the Git Data API
(`backend/lib/github.js`). That push triggers Netlify's normal auto-deploy of the frontend, so the change is live
for every visitor after the build finishes (roughly 1-2 minutes) — not just in the browser that made the edit. Draft
properties/blog posts stay local (`localStorage`) until published, matching the existing draft/publish workflow.

Admin sign-in is verified server-side by `/admin-login` (`backend/routes/adminLogin.js`) against the
`ADMIN_PASSWORD` environment variable, returning a short-lived signed token (`TOKEN_SECRET`) required by
`save-content`.

### Backend environment variables (set on Render)

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Password checked by `/admin-login`. |
| `TOKEN_SECRET` | Secret used to sign/verify the admin session token. |
| `GITHUB_TOKEN` | Fine-grained PAT scoped to this repo, Contents: Read & Write. |
| `GITHUB_OWNER` | GitHub username/org that owns this repo. |
| `GITHUB_REPO` | This repo's name. |
| `GITHUB_BRANCH` | Branch to commit to (defaults to `main`). |
| `ALLOWED_ORIGIN` | Comma-separated list of frontend origins allowed to call the API, e.g. your Netlify URL. |
| `PORT` | Set automatically by Render; only needed locally (defaults to `4000`). |

### Frontend environment variables (set on Netlify)

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the deployed backend, e.g. `https://arora-properties-api.onrender.com`. |

## Scripts

Backend (run from `backend/`):

- `npm run dev` — start the server with auto-restart on changes
- `npm start` — start the server (production)

Frontend (run from `frontend/`):

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
