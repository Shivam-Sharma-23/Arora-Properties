import PhotoManager from '../../../components/PhotoManager';

export default function StepPhotos({ draft, setField, errors }) {
  return (
    <div className="admin-card">
      <h3 className="admin-card-title">Upload Property Photos</h3>
      <p className="admin-card-subtitle">
        The photo marked "Cover" becomes the property's main image across the site. Drag thumbnails to reorder.
      </p>
      <PhotoManager photos={draft.photos} onChange={(photos) => setField('photos', photos)} />
      {errors.photos && <p className="admin-error-text" style={{ marginTop: 14 }}>{errors.photos}</p>}
    </div>
  );
}
