import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEV_ADMIN_PASSWORD, setAdminAuthed } from '../AdminGuard';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== DEV_ADMIN_PASSWORD) {
      setError('Incorrect password.');
      return;
    }
    setAdminAuthed(true);
    navigate(location.state?.from || '/admin', { replace: true });
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Admin Sign In</h1>
        <p className="subtitle">Arora Properties CMS — development access</p>
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
          <button type="submit" className="admin-btn admin-btn-dark" style={{ width: '100%' }}>Sign In</button>
        </form>
        <p className="admin-login-note">
          Development-only gate — password: <code>{DEV_ADMIN_PASSWORD}</code>. Not real authentication; replace with backend-issued auth before production.
        </p>
      </div>
    </div>
  );
}
