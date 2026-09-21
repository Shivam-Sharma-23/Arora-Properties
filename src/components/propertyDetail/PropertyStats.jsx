const TILE_STYLE = { textAlign: 'center', background: '#F4F1EA', borderRadius: 16, padding: '18px 8px' };
const ICON_STYLE = { margin: '0 auto 8px', display: 'block' };
const VALUE_STYLE = { fontWeight: 700, fontSize: 16, color: '#1C2430' };
const LABEL_STYLE = { fontSize: 12, color: '#8A8F98' };

export default function PropertyStats({ property }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 40 }} data-stats-grid="true">
      <div style={TILE_STYLE}>
        <svg style={ICON_STYLE} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
          <path d="M3 20h18" />
          <path d="M7 10V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
        </svg>
        <div style={VALUE_STYLE}>{property.bedrooms}</div>
        <div style={LABEL_STYLE}>Beds</div>
      </div>
      <div style={TILE_STYLE}>
        <svg style={ICON_STYLE} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
          <path d="M4 12V6a2 2 0 0 1 2-2h1" />
          <path d="M9 19v2M15 19v2" />
        </svg>
        <div style={VALUE_STYLE}>{property.bathrooms}</div>
        <div style={LABEL_STYLE}>Baths</div>
      </div>
      <div style={TILE_STYLE}>
        <svg style={ICON_STYLE} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
        <div style={VALUE_STYLE}>{property.area}</div>
        <div style={LABEL_STYLE}>Area</div>
      </div>
      <div style={TILE_STYLE}>
        <svg style={ICON_STYLE} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17h14M6 17l1.5-6h9L18 17M9 11V7h6v4" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
        </svg>
        <div style={VALUE_STYLE}>2</div>
        <div style={LABEL_STYLE}>Parking</div>
      </div>
      <div style={TILE_STYLE}>
        <svg style={ICON_STYLE} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M9 4v16" />
        </svg>
        <div style={VALUE_STYLE}>{property.yearBuilt || 'Not available'}</div>
        <div style={LABEL_STYLE}>Built</div>
      </div>
    </div>
  );
}
