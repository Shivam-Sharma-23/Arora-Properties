import { useNavigate } from 'react-router-dom';

export default function MapView({ properties }) {
  const navigate = useNavigate();
  const markers = properties.slice(0, 8).map((p, i) => ({
    x: 15 + (i * 11) % 70,
    y: 18 + ((i * 7) % 6) * 12,
    priceLabel: p.priceLabel,
    title: p.title,
    id: p.id,
  }));

  return (
    <div style={{ position: 'relative', height: 560, borderRadius: 20, overflow: 'hidden', background: '#EAEFE8', border: '1px solid #E7E3DC' }}>
      <svg viewBox="0 0 800 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="800" height="600" fill="#EAEFE8" />
        <path d="M0 120 L800 90" stroke="#D6DED2" strokeWidth="18" fill="none" />
        <path d="M0 340 L800 380" stroke="#D6DED2" strokeWidth="14" fill="none" />
        <path d="M120 0 L160 600" stroke="#D6DED2" strokeWidth="14" fill="none" />
        <path d="M560 0 L620 600" stroke="#D6DED2" strokeWidth="10" fill="none" />
      </svg>
      {markers.map((m) => (
        <div
          key={m.id}
          onClick={() => navigate('/property/' + m.id)}
          title={m.title}
          style={{ position: 'absolute', left: m.x + '%', top: m.y + '%', transform: 'translate(-50%,-100%)', cursor: 'pointer' }}
        >
          <div style={{ background: '#1C2430', color: '#fff', padding: '6px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 6px 16px rgba(0,0,0,0.2)' }}>
            {m.priceLabel}
          </div>
          <div style={{ width: 10, height: 10, background: '#1C2430', transform: 'rotate(45deg)', margin: '-5px auto 0' }} />
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(255,255,255,0.9)', padding: '8px 14px', borderRadius: 10, fontSize: 12, color: '#6B7280' }}>
        Illustrative map view
      </div>
    </div>
  );
}
