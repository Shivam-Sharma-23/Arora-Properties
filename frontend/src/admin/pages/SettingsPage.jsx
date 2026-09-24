import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../../hooks/useToast';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { DEV_ADMIN_PASSWORD } from '../AdminGuard';

export default function SettingsPage() {
  const { resetAllData } = useAdminData();
  const { showToast } = useToast();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Settings</h1>
          <p>Admin panel configuration and data management.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Persistence</h3>
        <p style={{ fontSize: 13.5, color: '#6B7280' }}>
          Publishing a change (Hero, Locations, Experts, FAQs, Reviews, and Publish/Delete for Properties &amp; Blog)
          commits it straight to the GitHub repo via a Netlify Function, which triggers a redeploy — live for
          everyone in roughly 1-2 minutes. Draft properties/blog posts stay local to this browser until published.
        </p>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Admin Access</h3>
        <p style={{ fontSize: 13.5, color: '#6B7280' }}>
          Sign-in is verified server-side by the <code>admin-login</code> Netlify Function against the
          <code> ADMIN_PASSWORD</code> environment variable. Local dev fallback (used only if that function is
          unreachable, e.g. <code>vite dev</code> without <code>netlify dev</code>): <code>{DEV_ADMIN_PASSWORD}</code>
        </p>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Reset Demo Data</h3>
        <p style={{ fontSize: 13.5, color: '#6B7280' }}>
          Restores properties, locations, experts, FAQs, blog posts and reviews to their original seed values.
          Any edits you've made will be lost.
        </p>
        <button className="admin-btn admin-btn-danger" onClick={() => setConfirmReset(true)}>Reset All Data</button>
      </div>

      {confirmReset && (
        <ConfirmDeleteModal
          title="Reset all admin data?"
          itemName={null}
          onCancel={() => setConfirmReset(false)}
          onConfirm={() => { resetAllData(); showToast('All data reset to seed values.'); setConfirmReset(false); }}
        />
      )}
    </div>
  );
}
