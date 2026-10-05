# Arora Properties — frontend context

## Backend

This frontend talks to a **separate** Express backend repo, not part of this
project: `D:\New folder (4)\backend` (GitHub: `Shivam-Sharma-23/arora-backend`).

- Live URL (canonical, production): **https://api.aroraproperties.online** —
  deployed on Hostinger (same account/plan as the frontend), as a Node.js app
  under the `api` subdomain, auto-deployed from the GitHub repo's `main`
  branch on every push.
- Fallback/idle copy: **https://arora-backend-nogt.onrender.com** — the
  original Render deployment, left running but not actively maintained since
  the 2026-10 migration to Hostinger (see "Deployment hosts" below). Its env
  vars (`MONGODB_URI` etc.) are stale/out of sync with the live secrets and
  it is not expected to work without manually updating them first.
- Endpoints: `POST /admin-login`, `POST /save-content`, `GET /content`,
  `GET /uploads/:filename`, `GET /health`

## Storage: MongoDB Atlas (not GitHub commits)

Admin saves no longer commit `siteContent.json` / images into this repo.
The backend persists everything in MongoDB Atlas instead:
- Site content (properties, locations, experts, FAQs, blogs, reviews, hero)
  is one document (`_id: "site"`) in the `content` collection, written by
  `POST /save-content` and read back by the public site via `GET /content`.
- Each uploaded image is its own document in the `images` collection
  (binary data + content type), written by the same `save-content` call and
  served publicly at `GET /uploads/<filename>`.

`frontend/src/data/siteContent.json` (the old build-time snapshot) has been
deleted — it's no longer read anywhere. `AdminDataContext` now fetches
`GET /content` on mount and adopts it unless the current local draft
(`localStorage['arora-admin-data']`) is genuinely newer (unsynced edit) — see
"Known gotcha" below, this comparison has bitten a migration once already.

**Image URLs are absolute and host-baked.** `syncClient.js` writes each
uploaded photo's URL as `${API_BASE_URL}/uploads/<name>` — i.e. whichever
backend host was configured as `VITE_API_URL` *at upload time* gets baked
permanently into that photo's stored URL. If the backend's public hostname
ever changes again (another migration, custom domain change, etc.),
existing properties' photos will keep pointing at the *old* host until the
stored `content` document is rewritten. There's a one-time fix script for
exactly this at `D:\New folder (4)\backend\scripts\fix-image-host.mjs`
(string-replaces the old host with the new one across the whole content
document) — update the `OLD_HOST`/`NEW_HOST` constants and MongoDB
connection details if reusing it for a future host change.

### Known gotcha: direct DB edits don't update `_meta.updatedAt`

If you ever hand-edit the `content` document directly (e.g. via Atlas's Data
Explorer, as was done to fix stale image URLs in 2026-10), the document's
`data._meta.updatedAt` timestamp does **not** get touched. Since
`AdminDataContext` only adopts server content when
`server._meta.updatedAt > local._meta.updatedAt`, any browser with an older
cached draft in `localStorage['arora-admin-data']` will keep showing stale
data after a direct DB edit, even though the backend now serves the fix
correctly. Fix: clear that `localStorage` key (DevTools → Application/Storage
→ Local Storage) to force a fresh adopt, or bump `_meta.updatedAt` as part of
the manual edit.

## Legacy — do not extend

`netlify/functions/admin-login.js`, `save-content.js`, `_auth.js`, `_github.js`
at the repo root are dead code: the original GitHub-commit-based
implementation, fully superseded by the Express backend + MongoDB above. Not
called from anywhere in `frontend/src`. Safe to delete; kept for now only as
historical reference.

## CORS

The backend's `ALLOWED_ORIGIN` env var (set in Hostinger's Node.js app
environment variables for `api.aroraproperties.online`, not committed) must
include this frontend's deployed origin(s), comma-separated, or the browser
blocks the fetch calls above. Set to:
`https://aroraproperties.online,https://www.aroraproperties.online`
on the live Hostinger backend (verified 2026-10-06 end-to-end: admin login
and content fetch both work from the live frontend). The idle Render
fallback still carries the older
`https://arora-properties-alpha.vercel.app,https://weblynk-arora-properties.netlify.app,http://localhost:5173,http://localhost:5174`
value from before the Hostinger migration.

## Deployment hosts

**Canonical, as of 2026-10: both frontend and backend run on Hostinger**,
under the `aroraproperties.online` domain (bought and managed there), as the
single production setup for client handoff:
- Frontend — static Vite build, deployed as a Hostinger "Deploy Web App →
  Import Git Repository" site at the root domain
  **https://aroraproperties.online**, auto-redeploying on every push to this
  repo's `main` branch. Build: root dir `frontend`, build command
  `npm install && npm run build`, output dir `dist`. Needs
  `frontend/public/.htaccess` (present) for SPA routing — without it,
  direct navigation to any client-side route (`/admin`, `/properties`, etc.)
  404s on Hostinger's static file server, since there's no rewrite-to-
  `index.html` fallback otherwise (Vercel/Netlify handled this via their own
  config files instead).
- Backend — see "Backend" section above.

**Previous hosts, left running idle as an unmaintained fallback** (not
actively kept in sync — env vars/secrets there are stale):
- Vercel: **https://arora-properties-alpha.vercel.app** (frontend)
- Netlify: **https://weblynk-arora-properties.netlify.app** (frontend) — was
  non-functional as of 2026-10-04 due to exhausted free-tier build-minute
  credits, unrelated to this migration.
- Render: **https://arora-backend-nogt.onrender.com** (backend) — see
  "Backend" section above.

`netlify.toml` / `vercel.json` are still in the repo for these fallback
deployments; no need to remove them.

## Credentials

Backend secrets (`ADMIN_PASSWORD`, `TOKEN_SECRET`, `MONGODB_URI`, etc.) live
only in Hostinger's Node.js app environment variables (for the canonical
backend) and, as a stale historical copy, the backend repo's gitignored
`.env.render` / Render's dashboard (fallback deployment) — never duplicate
them here. The frontend only ever needs the backend's base URL
(`VITE_API_URL`), which is not secret, set to `https://api.aroraproperties.online`
in the frontend's Hostinger environment variables (requires a rebuild to
take effect — Vite bakes `VITE_*` vars in at build time, not runtime).
