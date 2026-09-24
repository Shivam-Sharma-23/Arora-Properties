export default function DashboardCard({ label, value }) {
  return (
    <div className="admin-stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
