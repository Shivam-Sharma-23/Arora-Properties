import { useRef, useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import FormField from '../../components/FormField';
import { IconUpload, IconTrash } from '../../components/icons';
import { registerImageFile } from '../../utils/pendingImages';

export default function HeroCmsPage() {
  const { hero, updateHero } = useAdminData();
  const { showToast } = useToast();
  const [form, setForm] = useState(hero);
  const fileRef = useRef(null);

  const handleImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setForm((f) => ({ ...f, image: registerImageFile(file) }));
  };

  const handleSave = () => {
    updateHero(form);
    showToast('Hero section updated. The public homepage now reflects these changes.');
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Hero Section</h1>
          <p>Edit the homepage hero — updates apply immediately to the public site.</p>
        </div>
      </div>

      <div className="admin-two-col">
        <div className="admin-card">
          <h3 className="admin-card-title">Hero Text</h3>
          <FormField label="Hero Heading">
            <input className="admin-input" value={form.heading} onChange={(e) => setForm((f) => ({ ...f, heading: e.target.value }))} />
          </FormField>
          <FormField label="Hero Subtitle">
            <textarea className="admin-textarea" rows={3} value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
          </FormField>
          <FormField label="Search Placeholder">
            <input className="admin-input" value={form.searchPlaceholder}
              onChange={(e) => setForm((f) => ({ ...f, searchPlaceholder: e.target.value }))} />
          </FormField>
          <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save Changes</button>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title">Hero Image</h3>
          <div className="admin-image-thumb" style={{ width: '100%', aspectRatio: '16/9', marginBottom: 14 }}>
            <img src={form.image} alt="Hero preview" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="admin-btn admin-btn-secondary" onClick={() => fileRef.current?.click()}>
              <IconUpload width={14} height={14} /> Replace Image
            </button>
            <button className="admin-btn admin-btn-icon" onClick={() => setForm((f) => ({ ...f, image: '' }))} title="Remove image">
              <IconTrash width={14} height={14} style={{ color: '#C0453A' }} />
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files[0])} />
        </div>
      </div>
    </div>
  );
}
