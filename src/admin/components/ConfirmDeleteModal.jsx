import Modal from './Modal';
import { IconAlertTriangle } from './icons';

export default function ConfirmDeleteModal({ title = 'Delete item?', itemName, onCancel, onConfirm }) {
  return (
    <Modal onClose={onCancel}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FBEAE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <IconAlertTriangle width={20} height={20} style={{ color: '#C0453A' }} />
        </div>
        <div>
          <h3>{title}</h3>
          <p>
            Are you sure you want to delete{itemName ? <> "<strong>{itemName}</strong>"</> : ' this item'}?<br />
            This action cannot be easily undone.
          </p>
        </div>
      </div>
      <div className="admin-modal-actions">
        <button className="admin-btn admin-btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="admin-btn admin-btn-danger" onClick={onConfirm}>Delete</button>
      </div>
    </Modal>
  );
}
