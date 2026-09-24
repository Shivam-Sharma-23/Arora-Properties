// URL of the backend (Express server on Render in production). Configure via
// the VITE_API_URL env var; falls back to the local backend dev server.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');
