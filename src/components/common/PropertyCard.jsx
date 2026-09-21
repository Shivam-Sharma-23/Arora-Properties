import { useNavigate } from 'react-router-dom';
import SafeImage from './SafeImage';
import { waLink } from '../../data/constants';
import './PropertyCard.css';

export default function PropertyCard({ property, favorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleView = () => navigate('/property/' + property.id);
  const handleFavClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(property.id);
  };
  const stop = (e) => e.stopPropagation();
  const whatsappLink = waLink('Hi Arora Properties, I am interested in ' + property.title + ' (' + property.location + ').');

  return (
    <div className="pc-card" onClick={handleView}>
      <div className="pc-image-wrap">
        <SafeImage
          src={property.images ? property.images[0] : property.image}
          alt={property.imgAlt || (property.title + ' exterior')}
          style={{}}
          className="pc-image"
        />
        <div className="pc-badge">{property.type}</div>
        {property.listingLabel && <div className="pc-label">{property.listingLabel}</div>}
        <button className="pc-fav-btn" onClick={handleFavClick} aria-label="Toggle favorite" title="Save to favorites">
          {favorite ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#2F6F62" stroke="#2F6F62" strokeWidth="1.5">
              <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </button>
      </div>
      <div className="pc-body">
        <div className="pc-top-row">
          <span className="pc-price">{property.priceLabel}</span>
          <span className="pc-rating">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="#2F6F62" stroke="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {property.rating}
          </span>
        </div>
        <div>
          <h3 className="pc-title">{property.title}</h3>
          <p className="pc-location">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#6B7280" strokeWidth="2">
              <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {property.location}
          </p>
        </div>
        <div className="pc-stats">
          <span className="pc-stat">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3F4753" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
              <path d="M3 20h18" />
              <path d="M7 10V7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
            </svg>
            {property.bedrooms} Beds
          </span>
          <span className="pc-stat">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3F4753" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
              <path d="M4 12V6a2 2 0 0 1 2-2h1" />
              <path d="M9 19v2M15 19v2" />
            </svg>
            {property.bathrooms} Baths
          </span>
          <span className="pc-stat">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#3F4753" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            {property.area}
          </span>
        </div>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={stop} className="pc-whatsapp">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff">
            <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.45 1.27 4.91L2 22l5.25-1.38A9.94 9.94 0 0 0 12.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10zm5.87 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.66-.79-3.07-1.27-5.05-4.36-5.2-4.56-.15-.2-1.25-1.66-1.25-3.17 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.23.57.35.08.13.08.73-.17 1.43z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
