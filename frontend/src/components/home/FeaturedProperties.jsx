import { useAdminData, derivePublicProperty } from '../../admin/context/AdminDataContext';
import { useFavorites } from '../../hooks/useFavorites';
import { useSectionNav } from '../../hooks/useSectionNav';
import PropertyCard from '../common/PropertyCard';
import './FeaturedProperties.css';

export default function FeaturedProperties() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { goProperties } = useSectionNav();
  const { properties } = useAdminData();
  const featured = properties.filter((p) => p.status === 'published' && p.featured).slice(0, 6).map(derivePublicProperty);

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2>Featured Properties</h2>
        <p>Handpicked homes worth taking a closer look at.</p>
      </div>
      <div className="grid-3" data-grid-3="true" style={{ gap: 28 }}>
        {featured.map((p) => (
          <PropertyCard key={p.id} property={p} favorite={isFavorite(p.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
      <div className="featured-cta-row">
        <button className="outline-btn" onClick={goProperties}>View All Properties</button>
      </div>
    </section>
  );
}
