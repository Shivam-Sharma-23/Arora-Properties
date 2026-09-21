import './PropertySkeletonGrid.css';

export default function PropertySkeletonGrid() {
  return (
    <div className="grid-3" data-grid-3="true" style={{ gap: 26 }}>
      {[0, 1, 2, 3, 4, 5].map((s) => (
        <div className="skeleton-card" key={s}>
          <div className="skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton-line" style={{ height: 16, width: '60%' }} />
            <div className="skeleton-line" style={{ height: 12, width: '80%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
