import { Navigate, useLocation } from 'react-router-dom';

// Development-only route guard. This does NOT provide real security — the
// password lives in client-side source and the "session" is a plain
// sessionStorage flag. It exists only to gate the admin UI during local
// development/demo. Replace with real backend-issued auth before deploying.
export const DEV_ADMIN_PASSWORD = 'arora-admin';
const SESSION_KEY = 'arora-admin-authed';

export function isAdminAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function setAdminAuthed(value) {
  if (value) sessionStorage.setItem(SESSION_KEY, 'true');
  else sessionStorage.removeItem(SESSION_KEY);
}

export default function AdminGuard({ children }) {
  const location = useLocation();
  if (!isAdminAuthed()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}
