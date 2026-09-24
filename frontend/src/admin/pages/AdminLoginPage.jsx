import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEV_ADMIN_PASSWORD, loginAdmin } from '../AdminGuard';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await loginAdmin(password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error || 'Incorrect password.');
      return;
    }
    navigate(location.state?.from || '/admin', { replace: true });
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Admin Sign In</h1>
        <p className="subtitle">Arora Properties CMS</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-field">
            <label>Admin Password</label>
            <input
              className={'admin-input' + (error ? ' has-error' : '')}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              autoFocus
            />
            {error && <p className="admin-error-text">{error}</p>}
          </div>
          <button type="submit" className="admin-btn admin-btn-dark" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="admin-login-note">
          Local dev fallback (only used if the login service is unreachable): <code>{DEV_ADMIN_PASSWORD}</code>
        </p>
      </div>
    </div>
  );
}
