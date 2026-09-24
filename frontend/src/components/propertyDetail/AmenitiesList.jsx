export default function AmenitiesList({ amenities }) {
  return (
    <>
      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 20, color: '#1C2430', margin: '0 0 18px' }}>Amenities</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }} data-amenities-grid="true">
        {amenities.map((a) => (
          <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#3F4753', padding: '10px 4px' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2F6F62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {a}
          </div>
        ))}
      </div>
    </>
  );
}
