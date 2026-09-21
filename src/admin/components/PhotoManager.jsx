import { useRef, useState } from 'react';
import { IconUpload, IconTrash, IconCheck } from './icons';
import { generateId } from '../utils/id';

const MAX_SIZE = 8 * 1024 * 1024;

export default function PhotoManager({ photos, onChange, maxPhotos = 20 }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const dragIndexRef = useRef(null);
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    if (photos.length + files.length > maxPhotos) {
      setError('You can upload up to ' + maxPhotos + ' photos.');
      return;
    }
    const accepted = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed.');
        continue;
      }
      if (file.size > MAX_SIZE) {
        setError('"' + file.name + '" is larger than 8MB.');
        continue;
      }
      accepted.push({ id: generateId('photo'), url: URL.createObjectURL(file), category: 'Other', isCover: false });
    }
    if (!accepted.length) return;
    setError('');
    const next = [...photos, ...accepted];
    if (!next.some((p) => p.isCover) && next.length) next[0].isCover = true;
    onChange(next);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const setCover = (id) => {
    onChange(photos.map((p) => ({ ...p, isCover: p.id === id })));
  };

  const removePhoto = (id) => {
    const next = photos.filter((p) => p.id !== id);
    if (next.length && !next.some((p) => p.isCover)) next[0].isCover = true;
    onChange(next);
  };

  const onThumbDragStart = (index) => () => { dragIndexRef.current = index; };
  const onThumbDragOver = (e) => e.preventDefault();
  const onThumbDrop = (index) => (e) => {
    e.preventDefault();
    const from = dragIndexRef.current;
    if (from === null || from === index) return;
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(index, 0, moved);
    dragIndexRef.current = null;
    onChange(next);
  };

  return (
    <div>
      <div
        className={'admin-dropzone' + (dragging ? ' dragging' : '')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <IconUpload width={28} height={28} style={{ margin: '0 auto', display: 'block', color: '#2F6F62' }} />
        <p><strong>+ Add Photos</strong> — drag and drop, or click to browse</p>
        <p style={{ fontSize: 12 }}>JPG/PNG, up to 8MB each · up to {maxPhotos} photos</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
        />
      </div>
      {error && <p className="admin-error-text" style={{ marginTop: 10 }}>{error}</p>}

      {photos.length > 0 && (
        <div className="admin-image-grid">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={'admin-image-thumb' + (photo.isCover ? ' is-cover' : '')}
              draggable
              onDragStart={onThumbDragStart(index)}
              onDragOver={onThumbDragOver}
              onDrop={onThumbDrop(index)}
              title="Drag to reorder"
            >
              <img src={photo.url} alt="" />
              {photo.isCover && <span className="admin-image-cover-badge">Cover</span>}
              <div className="admin-image-controls">
                <button type="button" className="set-cover-btn" onClick={() => setCover(photo.id)} title="Set as cover">
                  {photo.isCover ? <IconCheck width={12} height={12} /> : 'COVER'}
                </button>
                <button type="button" onClick={() => removePhoto(photo.id)} title="Remove photo">
                  <IconTrash width={13} height={13} style={{ color: '#C0453A' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
