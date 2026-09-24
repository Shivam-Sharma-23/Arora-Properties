export default function Modal({ children, onClose, wide = false }) {
  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className={'admin-modal' + (wide ? ' wide' : '')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
