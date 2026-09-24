# Arora Properties — frontend context

## Backend

This frontend talks to a **separate** Express backend repo, not part of this
project: `D:\New folder (4)\backend` (GitHub: `Shivam-Sharma-23/arora-backend`).

- Live URL: **https://arora-backend-nogt.onrender.com**
- Endpoints: `POST /admin-login`, `POST /save-content`, `GET /content`,
  `GET /uploads/:filename`, `GET /health`
- Free-tier Render service — spins down when idle, first request after a
  while can take 20-50s to respond (cold start).

## Storage: MongoDB Atlas (not GitHub commits)

Admin saves no longer commit `siteContent.json` / images into this repo.
The backend persists everything in MongoDB Atlas instead:
- Site content (properties, locations, experts, FAQs, blogs, reviews, hero)
  is one document in the `content` collection, written by `POST
  /save-content` and read back by the public site via `GET /content`.
- Each uploaded image is its own document in the `images` collection
  (binary data + content type), written by the same `save-content` call and
  served publicly at `GET /uploads/<filename>`.

`frontend/src/data/siteContent.json` (the old build-time snapshot) has been
deleted — it's no longer read anywhere. `AdminDataContext` now fetches
`GET /content` on mount and adopts it unless the current local draft
(`localStorage['arora-admin-data']`) is genuinely newer (unsynced edit).
Image URLs written by `syncClient.js` are now absolute
(`${API_BASE_URL}/uploads/<name>`), not repo-relative `/uploads/<name>`.

## Legacy — do not extend

`netlify/functions/admin-login.js`, `save-content.js`, `_auth.js`, `_github.js`
at the repo root are dead code: the original GitHub-commit-based
implementation, fully superseded by the Render backend + MongoDB above. Not
called from anywhere in `frontend/src`. Safe to delete; kept for now only as
historical reference.

## CORS

The backend's `ALLOWED_ORIGIN` env var (set on Render, not committed) must
include this frontend's deployed origin(s), comma-separated, or the browser
blocks the fetch calls above. Currently set to
`https://weblynk-arora-properties.netlify.app,http://localhost:5173,http://localhost:5174`
in the backend's local `.env.render` reference file — confirm the same
value is actually saved on Render's dashboard.

## Credentials

Backend secrets (`ADMIN_PASSWORD`, `TOKEN_SECRET`, `MONGODB_URI`, etc.) live
only in the backend repo's gitignored `.env.render` / Render's dashboard —
never duplicate them here. The frontend only ever needs the backend's base
URL (`VITE_API_URL`), which is not secret.
