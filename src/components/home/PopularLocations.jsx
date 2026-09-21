import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../../admin/context/AdminDataContext';
import './PopularLocations.css';

export default function PopularLocations() {
  const navigate = useNavigate();
  const { locations } = useAdminData();

  const filterByLocation = (name) => {
    navigate('/properties?q=' + encodeURIComponent(name));
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <section id="locations-section" className="locations-section">
      <div className="section-header">
        <h2>Popular Locations</h2>
        <p>Explore homes across India's most sought-after cities.</p>
      </div>
      <div className="grid-3" data-grid-3="true" style={{ gap: 24 }}>
        {locations.map((loc) => (
          <div className="location-card" key={loc.id} onClick={() => filterByLocation(loc.name)}>
            <img src={loc.image} alt={loc.name + ' skyline'} loading="lazy" />
            <div className="location-card-overlay" />
            <div className="location-card-content">
              <div>
                <h3>{loc.name}</h3>
                <p>{loc.count} properties</p>
              </div>
              <div className="location-arrow">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1C2430" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
