export default function PropertyReviews({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 20, color: '#1C2430', margin: '0 0 18px' }}>
        Resident Reviews
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {reviews.map((r) => (
          <div key={r.id} style={{ background: '#F4F1EA', borderRadius: 16, padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1C2430' }}>{r.reviewerName}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#2F6F62' }}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="#2F6F62" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {r.rating}
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#3F4753', lineHeight: 1.6, margin: 0 }}>{r.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
