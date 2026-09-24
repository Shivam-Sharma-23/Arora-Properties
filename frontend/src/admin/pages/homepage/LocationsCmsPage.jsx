import { useRef, useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import Modal from '../../components/Modal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import FormField from '../../components/FormField';
import EmptyState from '../../components/EmptyState';
import { IconPlusCircle, IconEdit, IconTrash, IconArrowUp, IconArrowDown, IconMapPin, IconUpload } from '../../components/icons';
import { registerImageFile } from '../../utils/pendingImages';

const EMPTY = { name: '', count: '', image: '', location: '' };

function LocationModal({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial);
  const fileRef = useRef(null);

  const handleImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setForm((f) => ({ ...f, image: registerImageFile(file) }));
  };

  return (
    <Modal onClose={onCancel}>
      <h3>{initial.id ? 'Edit Location' : 'Add Location'}</h3>
      <div className="admin-image-thumb" style={{ width: '100%', aspectRatio: '16/9', marginBottom: 14 }}>
        {form.image ? <img src={form.image} alt="" /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8A8F98' }}>No image</div>}
      </div>
      <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" style={{ marginBottom: 16 }} onClick={() => fileRef.current?.click()}>
        <IconUpload width={13} height={13} /> Upload / Replace Image
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files[0])} />

      <FormField label="Location Name">
        <input className="admin-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Noida Sector 62" />
      </FormField>
      <FormField label="Number of Properties">
        <input type="number" min="0" className="admin-input" value={form.count} onChange={(e) => setForm((f) => ({ ...f, count: Number(e.target.value) }))} />
      </FormField>
      <FormField label="Location">
        <input className="admin-input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Noida, Uttar Pradesh" />
      </FormField>

      <div className="admin-modal-actions">
        <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(form)} disabled={!form.name.trim()}>Save</button>
      </div>
    </Modal>
  );
}

export default function LocationsCmsPage() {
  const { locations, addLocation, updateLocation, deleteLocation, reorderLocation } = useAdminData();
  const { showToast } = useToast();
  const [modalState, setModalState] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      updateLocation(form.id, form);
      showToast('Location updated.');
    } else {
      addLocation(form);
      showToast('Location added.');
    }
    setModalState(null);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Popular Locations</h1>
          <p>Manage the location cards shown on the homepage.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary" onClick={() => setModalState({ ...EMPTY, name: '' })}>
            <IconPlusCircle width={16} height={16} /> Add Location
          </button>
        </div>
      </div>

      {locations.length === 0 ? (
        <div className="admin-card"><EmptyState icon={IconMapPin} title="No locations yet" subtitle="Add a location to feature it on the homepage." actionLabel="+ Add Location" onAction={() => setModalState({ ...EMPTY })} /></div>
      ) : (
        <div className="grid-3" style={{ gap: 20 }}>
          {locations.map((loc, i) => (
            <div className="admin-card" key={loc.id} style={{ padding: 0, overflow: 'hidden' }}>
              <div className="admin-image-thumb" style={{ width: '100%', aspectRatio: '4/3', borderRadius: 0, border: 'none' }}>
                <img src={loc.image} alt={loc.name} />
              </div>
              <div style={{ padding: 18 }}>
                <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 16, fontWeight: 700, color: '#1C2430', margin: '0 0 4px' }}>{loc.name}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 2px' }}>{loc.count} properties</p>
                <p style={{ fontSize: 12.5, color: '#8A8F98', margin: '0 0 14px' }}>{loc.location}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setModalState(loc)}><IconEdit width={13} height={13} /> Edit</button>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" onClick={() => setPendingDelete(loc)}><IconTrash width={13} height={13} style={{ color: '#C0453A' }} /></button>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" disabled={i === 0} onClick={() => reorderLocation(loc.id, -1)}><IconArrowUp width={13} height={13} /></button>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" disabled={i === locations.length - 1} onClick={() => reorderLocation(loc.id, 1)}><IconArrowDown width={13} height={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalState && <LocationModal initial={modalState} onCancel={() => setModalState(null)} onSave={handleSave} />}
      {pendingDelete && (
        <ConfirmDeleteModal
          title="Delete Location?"
          itemName={pendingDelete.name}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => { deleteLocation(pendingDelete.id); showToast('Location deleted.'); setPendingDelete(null); }}
        />
      )}
    </div>
  );
}
