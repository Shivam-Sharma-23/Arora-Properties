import PropertyCard from '../common/PropertyCard';

export default function PropertyGrid({ properties, isFavorite, onToggleFavorite, onReset }) {
  if (properties.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', background: '#FFFFFF', border: '1px solid #E7E3DC', borderRadius: 20 }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: '#1C2430', margin: '0 0 8px' }}>No properties match your filters</p>
        <p style={{ fontSize: 14.5, color: '#6B7280', margin: '0 0 20px' }}>Try adjusting your filters or search a different location.</p>
        <button
          onClick={onReset}
          style={{ background: '#1C2430', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid-3" data-grid-3="true" style={{ gap: 26 }}>
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} favorite={isFavorite(p.id)} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}
