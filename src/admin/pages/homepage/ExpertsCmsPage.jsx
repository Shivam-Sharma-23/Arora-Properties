import { useRef, useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import Modal from '../../components/Modal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import FormField from '../../components/FormField';
import EmptyState from '../../components/EmptyState';
import { IconPlusCircle, IconEdit, IconTrash, IconArrowUp, IconArrowDown, IconUsers, IconUpload, IconStar } from '../../components/icons';
import { registerImageFile } from '../../utils/pendingImages';

function RatingInput({ value, onChange }) {
  return (
    <div className="admin-rating-input">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <IconStar width={20} height={20} filled={n <= Math.round(value)} style={{ color: n <= Math.round(value) ? '#2F6F62' : '#DDD8CC' }} />
        </button>
      ))}
      <span style={{ marginLeft: 6, fontSize: 13, color: '#6B7280', alignSelf: 'center' }}>{value}</span>
    </div>
  );
}

const EMPTY = { name: '', role: '', location: '', rating: 4.5, managedProperties: 0, photo: '' };

function ExpertModal({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial);
  const fileRef = useRef(null);

  const handleImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setForm((f) => ({ ...f, photo: registerImageFile(file) }));
  };

  return (
    <Modal onClose={onCancel}>
      <h3>{initial.id ? 'Edit Expert' : 'Add Expert'}</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
        <div className="admin-image-thumb" style={{ width: 72, height: 72, borderRadius: '50%' }}>
          {form.photo ? <img src={form.photo} alt="" /> : null}
        </div>
        <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => fileRef.current?.click()}>
          <IconUpload width={13} height={13} /> Upload Photo
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files[0])} />
      </div>

      <FormField label="Name">
        <input className="admin-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      </FormField>
      <div className="admin-form-grid">
        <FormField label="Designation">
          <input className="admin-input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="Senior Property Advisor" />
        </FormField>
        <FormField label="Location">
          <input className="admin-input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
        </FormField>
      </div>
      <FormField label="Rating">
        <RatingInput value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
      </FormField>
      <FormField label="Properties Managed">
        <input type="number" min="0" className="admin-input" value={form.managedProperties}
          onChange={(e) => setForm((f) => ({ ...f, managedProperties: Number(e.target.value), listings: Number(e.target.value) }))} />
      </FormField>

      <div className="admin-modal-actions">
        <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="admin-btn admin-btn-primary" onClick={() => onSave(form)} disabled={!form.name.trim()}>Save</button>
      </div>
    </Modal>
  );
}

export default function ExpertsCmsPage() {
  const { experts, addExpert, updateExpert, deleteExpert, reorderExpert } = useAdminData();
  const { showToast } = useToast();
  const [modalState, setModalState] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      updateExpert(form.id, form);
      showToast('Expert updated.');
    } else {
      addExpert({ ...form, listings: form.managedProperties, photo: form.photo || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' });
      showToast('Expert added.');
    }
    setModalState(null);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Our Experts</h1>
          <p>Manage the agents shown in the homepage "Our Experts" section.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary" onClick={() => setModalState({ ...EMPTY })}>
            <IconPlusCircle width={16} height={16} /> Add Expert
          </button>
        </div>
      </div>

      {experts.length === 0 ? (
        <div className="admin-card"><EmptyState icon={IconUsers} title="No experts yet" subtitle="Add an expert to feature them on the homepage." actionLabel="+ Add Expert" onAction={() => setModalState({ ...EMPTY })} /></div>
      ) : (
        <div className="grid-4" style={{ gap: 18 }}>
          {experts.map((e, i) => (
            <div className="admin-card" key={e.id} style={{ textAlign: 'center' }}>
              <div className="admin-image-thumb" style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 12px' }}>
                <img src={e.photo} alt={e.name} />
              </div>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15.5, fontWeight: 700, color: '#1C2430', margin: '0 0 3px' }}>{e.name}</h3>
              <p style={{ fontSize: 12.5, color: '#6B7280', margin: '0 0 2px' }}>{e.role}</p>
              <p style={{ fontSize: 12, color: '#8A8F98', margin: '0 0 10px' }}>{e.location} · ★ {e.rating} · {e.managedProperties ?? e.listings} listings</p>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setModalState({ ...e, managedProperties: e.managedProperties ?? e.listings })}><IconEdit width={13} height={13} /> Edit</button>
                <button className="admin-btn admin-btn-icon admin-btn-sm" onClick={() => setPendingDelete(e)}><IconTrash width={13} height={13} style={{ color: '#C0453A' }} /></button>
                <button className="admin-btn admin-btn-icon admin-btn-sm" disabled={i === 0} onClick={() => reorderExpert(e.id, -1)}><IconArrowUp width={13} height={13} /></button>
                <button className="admin-btn admin-btn-icon admin-btn-sm" disabled={i === experts.length - 1} onClick={() => reorderExpert(e.id, 1)}><IconArrowDown width={13} height={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalState && <ExpertModal initial={modalState} onCancel={() => setModalState(null)} onSave={handleSave} />}
      {pendingDelete && (
        <ConfirmDeleteModal
          title="Delete Expert?"
          itemName={pendingDelete.name}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => { deleteExpert(pendingDelete.id); showToast('Expert deleted.'); setPendingDelete(null); }}
        />
      )}
    </div>
  );
}
