# Arora Properties — frontend context

## Backend

This frontend talks to a **separate** Express backend repo, not part of this
project: `D:\New folder (4)\backend` (GitHub: `Shivam-Sharma-23/arora-backend`).

- Live URL: **https://arora-backend-nogt.onrender.com**
- Endpoints: `POST /admin-login`, `POST /save-content`, `GET /health`
- Free-tier Render service — spins down when idle, first request after a
  while can take 20-50s to respond (cold start).

## Legacy duplicate — do not extend

`netlify/functions/admin-login.js`, `save-content.js`, `_auth.js`, `_github.js`
at the repo root are the **original** implementation of the same two
endpoints, now superseded by the Render backend above (same logic, ported
1:1 into `routes/adminLogin.js` / `routes/saveContent.js` / `lib/auth.js` /
`lib/github.js` in the backend repo). They still exist here but should be
treated as legacy — new work goes in the backend repo, not here.

## Frontend call sites that need to point at the Render backend

Currently both of these call **relative** `/.netlify/functions/...` paths,
which only work when deployed on Netlify (or via `netlify dev`) — they will
404 on plain `vite dev` or once the Netlify functions are retired:

- `frontend/src/admin/AdminGuard.jsx` — `loginAdmin()` fetches
  `/.netlify/functions/admin-login`
- `frontend/src/admin/utils/syncClient.js` — `syncContentToGitHub()` fetches
  `/.netlify/functions/save-content`

To switch these to the Render backend, point them at an absolute base URL
(e.g. via a `VITE_API_URL` env var read through `import.meta.env.VITE_API_URL`,
defaulting to `https://arora-backend-nogt.onrender.com` in production and
`http://localhost:4000` for local dev against the backend running with
`npm run dev` there) instead of the `/.netlify/functions/...` relative paths.
Vite only exposes env vars prefixed `VITE_` to client code.

## CORS

The backend's `ALLOWED_ORIGIN` env var (set on Render, not committed) must
include this frontend's deployed origin(s), comma-separated, or the browser
will block the fetch calls above. It currently defaults to localhost dev
ports only — update it on Render once the Netlify site's real URL is known
(the site isn't linked yet: no site ID in `.netlify/state.json`).

## Credentials

Backend secrets (`ADMIN_PASSWORD`, `GITHUB_TOKEN`, `TOKEN_SECRET`, etc.) live
only in the backend repo's gitignored `.env.render` / Render's dashboard —
never duplicate them here. The frontend only ever needs the backend's base
URL, which is not secret.
