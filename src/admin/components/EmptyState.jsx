import { IconImage } from './icons';

export default function EmptyState({ icon: Icon = IconImage, title, subtitle, actionLabel, onAction }) {
  return (
    <div className="admin-empty-state">
      <Icon width={40} height={40} />
      <p className="title">{title}</p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {actionLabel && onAction && (
        <button className="admin-btn admin-btn-primary" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
