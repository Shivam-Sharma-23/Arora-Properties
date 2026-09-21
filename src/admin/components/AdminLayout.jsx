import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { IconMenu } from './icons';
import Toast from '../../components/common/Toast';

const TITLES = [
  { match: /^\/admin\/properties\/add/, title: 'Add Property' },
  { match: /^\/admin\/properties\/.+\/edit/, title: 'Edit Property' },
  { match: /^\/admin\/properties/, title: 'Properties' },
  { match: /^\/admin\/homepage\/hero/, title: 'Hero Section' },
  { match: /^\/admin\/homepage\/locations/, title: 'Popular Locations' },
  { match: /^\/admin\/homepage\/experts/, title: 'Our Experts' },
  { match: /^\/admin\/faqs/, title: 'FAQs' },
  { match: /^\/admin\/blog/, title: 'Blog' },
  { match: /^\/admin\/reviews/, title: 'Reviews' },
  { match: /^\/admin\/settings/, title: 'Settings' },
  { match: /^\/admin$/, title: 'Dashboard' },
];

function usePageTitle() {
  const location = useLocation();
  const found = TITLES.find((t) => t.match.test(location.pathname));
  return found ? found.title : 'Admin';
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = usePageTitle();

  return (
    <div className="admin-shell">
      <AdminSidebar />

      {mobileOpen && (
        <div className="admin-mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="admin-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="admin-main">
        <div className="admin-topbar">
          <button className="admin-topbar-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <IconMenu />
          </button>
          <span className="admin-topbar-title">{title}</span>
        </div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
      <Toast />
    </div>
  );
}
