import { useAdminData, derivePublicProperty } from '../admin/context/AdminDataContext';
import { useFavorites } from '../hooks/useFavorites';
import { useSectionNav } from '../hooks/useSectionNav';
import PropertyCard from '../components/common/PropertyCard';

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { goProperties } = useSectionNav();
  const { properties } = useAdminData();
  const favoriteProperties = properties
    .filter((p) => p.status === 'published' && favorites.includes(p.id))
    .map(derivePublicProperty);

  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '60px 32px 100px' }}>
      <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
        <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.6vw,38px)', color: '#1C2430', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Your Favorites
        </h1>
        <p style={{ fontSize: 16, color: '#6B7280', margin: 0 }}>Properties you've saved for later.</p>
      </div>

      {favoriteProperties.length > 0 ? (
        <div className="grid-3" data-grid-3="true" style={{ gap: 26 }}>
          {favoriteProperties.map((p) => (
            <PropertyCard key={p.id} property={p} favorite={isFavorite(p.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#DDD8CC" strokeWidth="1.5" style={{ margin: '0 auto 20px', display: 'block' }}>
            <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#1C2430', margin: '0 0 6px' }}>Your favorite homes will appear here.</p>
          <p style={{ fontSize: 14.5, color: '#8A8F98', margin: '0 0 24px' }}>Tap the heart icon on any listing to save it.</p>
          <button
            onClick={goProperties}
            style={{ background: '#1C2430', color: '#fff', border: 'none', padding: '13px 26px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Browse Properties
          </button>
        </div>
      )}
    </div>
  );
}
