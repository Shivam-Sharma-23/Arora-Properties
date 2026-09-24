import { Link } from 'react-router-dom';
import { useAdminData } from '../context/AdminDataContext';
import DashboardCard from '../components/DashboardCard';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return days + ' days ago';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function DashboardPage() {
  const { properties, locations, experts, faqs, blogs, reviews } = useAdminData();

  const published = properties.filter((p) => p.status === 'published').length;
  const draft = properties.filter((p) => p.status === 'draft').length;

  const recentProperties = [...properties].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const recentBlogs = [...blogs].slice(0, 5);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your real-estate content and listings.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <DashboardCard label="Total Properties" value={properties.length} />
        <DashboardCard label="Active Properties" value={published} />
        <DashboardCard label="Draft Properties" value={draft} />
        <DashboardCard label="Total Locations" value={locations.length} />
        <DashboardCard label="Total Experts" value={experts.length} />
        <DashboardCard label="Total FAQs" value={faqs.length} />
        <DashboardCard label="Total Blog Posts" value={blogs.length} />
        <DashboardCard label="Total Reviews" value={reviews.length} />
      </div>

      <div className="admin-two-col">
        <div className="admin-card">
          <h3 className="admin-card-title">Recent Properties</h3>
          {recentProperties.length === 0 ? <p style={{ fontSize: 13.5, color: '#8A8F98' }}>No properties yet.</p> : recentProperties.map((p) => (
            <div className="admin-activity-item" key={p.id}>
              <div>
                <div className="primary">{p.title}</div>
                <div className="secondary">{p.location}</div>
              </div>
              <span className={'admin-badge admin-badge-' + p.status}>{p.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <Link to="/admin/properties" className="admin-btn admin-btn-ghost admin-btn-sm">View all properties →</Link>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">Recent Reviews</h3>
          {recentReviews.length === 0 ? <p style={{ fontSize: 13.5, color: '#8A8F98' }}>No reviews yet.</p> : recentReviews.map((r) => (
            <div className="admin-activity-item" key={r.id}>
              <div>
                <div className="primary">{r.reviewerName}</div>
                <div className="secondary">{r.propertyTitle} · {timeAgo(r.date)}</div>
              </div>
              <span className={'admin-badge admin-badge-' + r.status}>{r.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <Link to="/admin/reviews" className="admin-btn admin-btn-ghost admin-btn-sm">Manage reviews →</Link>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Recent Blog Posts</h3>
        {recentBlogs.length === 0 ? <p style={{ fontSize: 13.5, color: '#8A8F98' }}>No blog posts yet.</p> : recentBlogs.map((b) => (
          <div className="admin-activity-item" key={b.id}>
            <div>
              <div className="primary">{b.title}</div>
              <div className="secondary">{b.author} · {b.publishDate}</div>
            </div>
            <span className={'admin-badge admin-badge-' + b.status}>{b.status}</span>
          </div>
        ))}
        <div style={{ marginTop: 14 }}>
          <Link to="/admin/blog" className="admin-btn admin-btn-ghost admin-btn-sm">Manage blog →</Link>
        </div>
      </div>
    </div>
  );
}
