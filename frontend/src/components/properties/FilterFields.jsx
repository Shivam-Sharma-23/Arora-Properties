const AMENITY_TOGGLES = [
  { key: 'parking', label: 'Parking' },
  { key: 'pool', label: 'Swimming Pool' },
  { key: 'garden', label: 'Garden' },
  { key: 'petFriendly', label: 'Pet Friendly' },
  { key: 'newConstruction', label: 'New Construction' },
];

export default function FilterFields({ filters, onFilterChange, checkboxSize = 16, fontSize = 14 }) {
  return (
    <>
      <div>
        <label style={{ fontSize: 12, fontWeight: 700, color: '#1C2430', textTransform: 'uppercase', letterSpacing: '.03em', display: 'block', marginBottom: 10 }}>
          Bathrooms
        </label>
        <select
          value={filters.bathrooms}
          onChange={(e) => onFilterChange({ bathrooms: e.target.value })}
          style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #E7E3DC', borderRadius: 10, padding: '9px 12px', fontSize: 14, color: '#1C2430', outline: 'none' }}
        >
          <option value="Any">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {AMENITY_TOGGLES.map((t) => (
          <label key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize, color: '#3F4753', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={filters[t.key]}
              onChange={() => onFilterChange({ [t.key]: !filters[t.key] })}
              style={{ width: checkboxSize, height: checkboxSize, accentColor: '#2F6F62' }}
            />
            {t.label}
          </label>
        ))}
      </div>
    </>
  );
}
