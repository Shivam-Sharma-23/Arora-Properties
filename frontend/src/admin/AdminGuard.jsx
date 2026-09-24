import { Navigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiBase';

// Local dev fallback password — only used when the backend can't be reached
// at all (e.g. VITE_API_URL misconfigured, or the backend is down/cold-
// starting and the request errors out). It grants access to the admin UI
// but no sync token, so publishing to GitHub will fail until a real login
// succeeds against the backend.
export const DEV_ADMIN_PASSWORD = 'arora-admin';
const SESSION_KEY = 'arora-admin-authed';
const TOKEN_KEY = 'arora-admin-token';

export function isAdminAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function setAdminAuthed(value) {
  if (value) {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } else {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export function getAdminToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

// Logs in against the server-verified /admin-login backend route, which
// checks ADMIN_PASSWORD and returns a short-lived signed token used to
// authorize save-content calls. Falls back to the local dev password only
// when the backend is unreachable/unconfigured.
export async function loginAdmin(password) {
  let response = null;
  try {
    response = await fetch(API_BASE_URL + '/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
  } catch (e) {
    response = null;
  }

  if (response && response.ok) {
    const { token } = await response.json();
    setAdminAuthed(true);
    setAdminToken(token);
    return { ok: true };
  }
  if (response && response.status === 401) {
    return { ok: false, error: 'Incorrect password.' };
  }

  if (password === DEV_ADMIN_PASSWORD) {
    setAdminAuthed(true);
    setAdminToken(null);
    return { ok: true, offline: true };
  }
  return { ok: false, error: 'Incorrect password.' };
}

export default function AdminGuard({ children }) {
  const location = useLocation();
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}
