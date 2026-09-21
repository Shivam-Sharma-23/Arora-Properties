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
          All content is currently stored in this browser's <code>localStorage</code> — there is no backend yet.
          Data is read and written through a single context (<code>AdminDataContext</code>), so it can later be
          swapped for real API calls without changing any page components.
        </p>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Development Access</h3>
        <p style={{ fontSize: 13.5, color: '#6B7280' }}>
          The admin panel is protected by a development-only password gate (not real authentication).
          Current password: <code>{DEV_ADMIN_PASSWORD}</code>
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
