import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdminData, derivePublicProperty } from '../admin/context/AdminDataContext';
import { DEFAULT_FILTERS } from '../data/filters';
import { useFavorites } from '../hooks/useFavorites';
import { useSearchMode } from '../hooks/useSearchMode';
import { filterProperties } from '../utils/filterProperties';
import SearchFilterBar from '../components/properties/SearchFilterBar';
import FilterSidebar from '../components/properties/FilterSidebar';
import FilterDrawerMobile from '../components/properties/FilterDrawerMobile';
import PropertySkeletonGrid from '../components/properties/PropertySkeletonGrid';
import PropertyGrid from '../components/properties/PropertyGrid';
import MapView from '../components/properties/MapView';

export default function PropertiesPage() {
  const [searchParams] = useSearchParams();
  const { buyRent } = useSearchMode();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { properties } = useAdminData();
  const publicProperties = properties.filter((p) => p.status === 'published').map(derivePublicProperty);

  const [filters, setFilters] = useState(() => ({
    ...DEFAULT_FILTERS,
    ...(searchParams.get('type') ? { type: searchParams.get('type') } : {}),
    ...(searchParams.get('priceMax') ? { priceMax: parseInt(searchParams.get('priceMax'), 10) } : {}),
  }));
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (patch) => setFilters((prev) => ({ ...prev, ...patch }));
  const handleReset = () => {
    setFilters({ ...DEFAULT_FILTERS });
    setSearchQuery('');
  };

  const filteredList = filterProperties(publicProperties, { buyRent, filters, searchQuery, sortBy });

  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 32px 100px' }}>
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }} data-properties-layout="true">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onApply={() => setFiltersOpen(false)}
        />

        <button
          onClick={() => setFiltersOpen(true)}
          style={{ display: 'none', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E7E3DC', borderRadius: 100, padding: '12px 20px', fontSize: 14, fontWeight: 600, color: '#1C2430', cursor: 'pointer', marginBottom: 16 }}
          data-filter-mobile-btn="true"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          Filters
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 15, color: '#3F4753', margin: 0, fontWeight: 500 }}>{filteredList.length} properties found</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid #E7E3DC', borderRadius: 100, padding: 3 }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{ padding: '8px 18px', border: 'none', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .15s ease', background: viewMode === 'grid' ? '#1C2430' : 'transparent', color: viewMode === 'grid' ? '#fff' : '#6B7280' }}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  style={{ padding: '8px 18px', border: 'none', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .15s ease', background: viewMode === 'map' ? '#1C2430' : 'transparent', color: viewMode === 'map' ? '#fff' : '#6B7280' }}
                >
                  Map
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ border: '1px solid #E7E3DC', borderRadius: 100, padding: '9px 16px', fontSize: 13.5, color: '#1C2430', fontWeight: 500, outline: 'none', background: '#FFFFFF' }}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <PropertySkeletonGrid />
          ) : viewMode === 'grid' ? (
            <PropertyGrid properties={filteredList} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} onReset={handleReset} />
          ) : (
            <MapView properties={filteredList} />
          )}
        </div>
      </div>

      {filtersOpen && (
        <FilterDrawerMobile
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onClose={() => setFiltersOpen(false)}
        />
      )}
    </div>
  );
}
