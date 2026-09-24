import SafeImage from '../common/SafeImage';

export default function Gallery({ images, galleryIndex, title, onOpen, onSelectIndex }) {
  const idx = galleryIndex % images.length;
  const mainImage = images[idx];
  const sideImages = [0, 1].map((off) => {
    const i = (idx + 1 + off) % images.length;
    return { src: images[i], index: i };
  });

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, height: 460, marginBottom: 36, borderRadius: 20, overflow: 'hidden' }}
      data-gallery-grid="true"
    >
      <div onClick={onOpen} style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
        <SafeImage src={mainImage} alt={title + ' main view'} style={{}} />
        <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(28,36,48,0.75)', color: '#fff', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
          View all photos
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12 }}>
        {sideImages.map((img) => (
          <div key={img.index} onClick={() => onSelectIndex(img.index)} style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
            <SafeImage src={img.src} alt={title + ' view'} style={{}} />
          </div>
        ))}
      </div>
    </div>
  );
}
