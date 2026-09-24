import { PHOTO_CATEGORIES } from '../../../utils/propertyOptions';
import { IconCheck, IconImage } from '../../../components/icons';
import EmptyState from '../../../components/EmptyState';

export default function StepPhotoVerification({ draft, setField }) {
  const photos = draft.photos || [];

  const assign = (photoId, category) => {
    setField('photos', photos.map((p) => (p.id === photoId ? { ...p, category } : p)));
  };

  if (photos.length === 0) {
    return (
      <div className="admin-card">
        <h3 className="admin-card-title">Photo Verification</h3>
        <EmptyState icon={IconImage} title="No photos uploaded yet" subtitle="Go back to the Photos step to upload images before assigning them to rooms." />
      </div>
    );
  }

  return (
    <div className="admin-card">
      <h3 className="admin-card-title">Photo Verification</h3>
      <p className="admin-card-subtitle">Tag each uploaded photo with the area it shows. Click a thumbnail to assign it to that category.</p>

      {PHOTO_CATEGORIES.map((category) => {
        const assigned = photos.filter((p) => p.category === category);
        return (
          <div key={category} className="admin-verify-category">
            <h4>{category} {assigned.length > 0 && <span style={{ color: '#8A8F98', fontWeight: 500 }}>({assigned.length} tagged)</span>}</h4>
            <div className="admin-verify-photo-picker">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={'admin-verify-photo-option' + (photo.category === category ? ' selected' : '')}
                  onClick={() => assign(photo.id, category)}
                  title="Assign to this category"
                >
                  <img src={photo.url} alt="" />
                  {photo.category === category && (
                    <span className="check"><IconCheck width={10} height={10} style={{ color: '#fff' }} /></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
