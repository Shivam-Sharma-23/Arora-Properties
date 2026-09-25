import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData, derivePublicProperty } from '../admin/context/AdminDataContext';
import { useFavorites } from '../hooks/useFavorites';
import Gallery from '../components/propertyDetail/Gallery';
import GalleryLightbox from '../components/propertyDetail/GalleryLightbox';
import PropertyStats from '../components/propertyDetail/PropertyStats';
import AmenitiesList from '../components/propertyDetail/AmenitiesList';
import AgentInquiryCard from '../components/propertyDetail/AgentInquiryCard';
import ScheduleVisitModal from '../components/propertyDetail/ScheduleVisitModal';
import ContactAgentModal from '../components/propertyDetail/ContactAgentModal';
import PropertyReviews from '../components/propertyDetail/PropertyReviews';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { properties, experts, reviews } = useAdminData();

  const publishedProperties = properties.filter((p) => p.status === 'published');
  const rawProperty = publishedProperties.find((p) => String(p.id) === String(id)) || publishedProperties[0];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    setGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  if (!rawProperty) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '100px 32px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 26, color: '#1C2430', margin: '0 0 10px' }}>Property not found</p>
        <p style={{ fontSize: 15, color: '#6B7280', margin: '0 0 20px' }}>This listing may have been removed or unpublished.</p>
        <button onClick={() => navigate('/properties')} className="admin-btn admin-btn-dark">Back to Properties</button>
      </div>
    );
  }

  const property = derivePublicProperty(rawProperty);
  const agent = experts.find((a) => a.id === property.agentId) || experts[0];
  const propertyReviews = reviews
    .filter((r) => r.status === 'approved' && String(r.propertyId) === String(property.id))
    .sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const favorite = isFavorite(property.id);
  const stars = [0, 1, 2, 3, 4].filter((i) => i < Math.round(property.rating));

  const nextImage = () => setGalleryIndex((i) => (i + 1) % property.images.length);
  const prevImage = () => setGalleryIndex((i) => (i - 1 + property.images.length) % property.images.length);

  return (
    <div style={{ maxWidth: 1320, margin: '0 auto', padding: '32px 32px 100px' }}>
      <a
        onClick={() => navigate('/properties')}
        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#6B7280', marginBottom: 20 }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to properties
      </a>

      <Gallery
        images={property.images}
        galleryIndex={galleryIndex}
        title={property.title}
        onOpen={() => setGalleryOpen(true)}
        onSelectIndex={setGalleryIndex}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }} data-detail-layout="true">
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 6 }}>
            <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.4vw,36px)', color: '#1C2430', margin: 0, letterSpacing: '-0.01em' }}>
              {property.title}
            </h1>
            <button
              onClick={() => toggleFavorite(property.id)}
              style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: '#F4F1EA', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {favorite ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#2F6F62" stroke="#2F6F62" strokeWidth="1.5">
                  <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              )}
            </button>
          </div>
          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 24, color: '#2F6F62', margin: '0 0 12px' }}>{property.priceLabel}</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: '#6B7280', margin: '0 0 16px' }}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#6B7280" strokeWidth="2">
              <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {property.location}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            {stars.map((i) => (
              <svg key={i} viewBox="0 0 24 24" width="15" height="15" fill="#2F6F62" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1C2430', marginLeft: 4 }}>{property.rating}</span>
          </div>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#3F4753', margin: '0 0 32px', paddingBottom: 32, borderBottom: '1px solid #F1EEE8' }}>
            {property.description}
          </p>

          <PropertyStats property={property} />
          <AmenitiesList amenities={property.amenities} />
          <PropertyReviews reviews={propertyReviews} property={property} />
        </div>

        <AgentInquiryCard agent={agent} onSchedule={() => setScheduleOpen(true)} onContact={() => setContactOpen(true)} />
      </div>

      {galleryOpen && (
        <GalleryLightbox
          images={property.images}
          galleryIndex={galleryIndex}
          title={property.title}
          onClose={() => setGalleryOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
          onSelectIndex={setGalleryIndex}
        />
      )}

      {scheduleOpen && <ScheduleVisitModal property={property} onClose={() => setScheduleOpen(false)} />}
      {contactOpen && <ContactAgentModal agent={agent} property={property} onClose={() => setContactOpen(false)} />}
    </div>
  );
}
