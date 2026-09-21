import { useSectionNav } from '../hooks/useSectionNav';

export default function NotFoundPage() {
  const { goHome } = useSectionNav();

  return (
    <div style={{ textAlign: 'center', padding: '120px 20px' }}>
      <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,40px)', color: '#1C2430', margin: '0 0 14px' }}>
        Page not found
      </p>
      <p style={{ fontSize: 16, color: '#6B7280', margin: '0 0 24px' }}>The page you're looking for doesn't exist.</p>
      <button
        onClick={goHome}
        style={{ background: '#1C2430', color: '#fff', border: 'none', padding: '13px 26px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
      >
        Back to Home
      </button>
    </div>
  );
}
