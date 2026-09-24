import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { validateScheduleForm } from '../../utils/validators';
import './ScheduleVisitModal.css';

const EMPTY_FORM = { name: '', email: '', phone: '', date: '', time: '', message: '' };
const FIELD_LABEL_STYLE = { fontSize: 13, fontWeight: 600, color: '#1C2430', display: 'block', marginBottom: 6 };
const ERROR_STYLE = { fontSize: 12.5, color: '#C0453A', margin: '6px 0 0' };

export default function ScheduleVisitModal({ property, onClose }) {
  const { showToast } = useToast();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateScheduleForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
    showToast('Your visit request has been submitted.');
  };

  return (
    <div className="schedule-modal-backdrop" onClick={onClose}>
      <div className="schedule-modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 21, color: '#1C2430', margin: 0 }}>Schedule a Visit</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: '#F4F1EA', border: 'none', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 24px' }}>{property.title} · {property.location}</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={FIELD_LABEL_STYLE}>Name</label>
            <input value={form.name} onChange={setField('name')} placeholder="Your full name" />
            {errors.name && <p style={ERROR_STYLE}>{errors.name}</p>}
          </div>
          <div>
            <label style={FIELD_LABEL_STYLE}>Email</label>
            <input value={form.email} onChange={setField('email')} placeholder="you@email.com" />
            {errors.email && <p style={ERROR_STYLE}>{errors.email}</p>}
          </div>
          <div>
            <label style={FIELD_LABEL_STYLE}>Phone</label>
            <input value={form.phone} onChange={setField('phone')} placeholder="+91 98765 43210" />
            {errors.phone && <p style={ERROR_STYLE}>{errors.phone}</p>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={FIELD_LABEL_STYLE}>Preferred Date</label>
              <input type="date" value={form.date} onChange={setField('date')} />
              {errors.date && <p style={ERROR_STYLE}>{errors.date}</p>}
            </div>
            <div>
              <label style={FIELD_LABEL_STYLE}>Preferred Time</label>
              <input type="time" value={form.time} onChange={setField('time')} />
              {errors.time && <p style={ERROR_STYLE}>{errors.time}</p>}
            </div>
          </div>
          <div>
            <label style={FIELD_LABEL_STYLE}>Message (optional)</label>
            <textarea value={form.message} onChange={setField('message')} placeholder="Anything you'd like the agent to know" rows={3} style={{ resize: 'vertical' }} />
          </div>
          <button
            type="submit"
            className="schedule-submit"
            style={{ background: '#1C2430', color: '#fff', border: 'none', padding: 14, borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 6 }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
