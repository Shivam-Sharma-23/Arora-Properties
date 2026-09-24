import { useEffect } from 'react';
import SafeImage from '../common/SafeImage';

export default function GalleryLightbox({ images, galleryIndex, title, onClose, onNext, onPrev, onSelectIndex }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  const idx = galleryIndex % images.length;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 350, background: 'rgba(10,14,18,0.96)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        onClick={onClose}
        aria-label="Close gallery"
        style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <button
        onClick={onPrev}
        aria-label="Previous photo"
        style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <SafeImage
        src={images[idx]}
        alt={title + ' full view'}
        style={{ maxWidth: '86%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 8, width: 'auto', height: 'auto' }}
      />
      <button
        onClick={onNext}
        aria-label="Next photo"
        style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => onSelectIndex(i)}
            style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)' }}
          />
        ))}
      </div>
    </div>
  );
}
