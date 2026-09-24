// URL of the backend (separate Express app on Render — see CLAUDE.md).
// Configure via the VITE_API_URL env var; falls back to the local backend
// dev server. Note: the Render free tier spins down when idle, so the first
// request after a while can take 20-50s (cold start) — this is normal.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');
