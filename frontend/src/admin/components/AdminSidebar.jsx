import { NavLink } from 'react-router-dom';
import {
  IconDashboard, IconBuilding, IconPlusCircle, IconList, IconHome,
  IconMapPin, IconUsers, IconHelp, IconFileText, IconStar, IconSettings, IconLogOut,
} from './icons';
import { setAdminAuthed } from '../AdminGuard';

const NAV = [
  { section: null, items: [{ to: '/admin', end: true, icon: IconDashboard, label: 'Dashboard' }] },
  {
    section: 'Properties',
    items: [
      { to: '/admin/properties', end: true, icon: IconList, label: 'All Properties' },
      { to: '/admin/properties/add', icon: IconPlusCircle, label: 'Add Property' },
    ],
  },
  {
    section: 'Homepage',
    items: [
      { to: '/admin/homepage/hero', icon: IconHome, label: 'Hero Section' },
      { to: '/admin/homepage/locations', icon: IconMapPin, label: 'Popular Locations' },
      { to: '/admin/homepage/experts', icon: IconUsers, label: 'Our Experts' },
    ],
  },
  {
    section: 'Content',
    items: [
      { to: '/admin/faqs', icon: IconHelp, label: 'FAQs' },
      { to: '/admin/blog', icon: IconFileText, label: 'Blog' },
    ],
  },
  {
    section: null,
    items: [
      { to: '/admin/reviews', icon: IconStar, label: 'Reviews' },
      { to: '/admin/settings', icon: IconSettings, label: 'Settings' },
    ],
  },
];

export default function AdminSidebar({ onNavigate }) {
  const handleLogout = () => {
    setAdminAuthed(false);
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
        </svg>
        <div>
          <span>Arora Properties</span>
          <small>Admin Panel</small>
        </div>
      </div>
      <nav className="admin-nav">
        {NAV.map((group, i) => (
          <div key={i}>
            {group.section && <div className="admin-nav-section">{group.section}</div>}
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) => 'admin-nav-link' + (item.sub ? ' sub' : '') + (isActive ? ' active' : '')}
              >
                <item.icon width={17} height={17} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="admin-sidebar-footer">
        <a className="admin-view-site-link" href="/" target="_blank" rel="noreferrer">↗ View public site</a>
        <button className="admin-logout-btn" onClick={handleLogout}>
          <IconLogOut width={14} height={14} style={{ marginRight: 6, verticalAlign: -2 }} />
          Log out
        </button>
      </div>
    </div>
  );
}
