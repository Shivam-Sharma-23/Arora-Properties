import { useState } from 'react';
import { useAdminData } from '../../admin/context/AdminDataContext';
import { useToast } from '../../hooks/useToast';
import { validateReviewForm } from '../../utils/validators';

const EMPTY_FORM = { name: '', rating: 0, text: '' };
const FIELD_LABEL_STYLE = { fontSize: 13, fontWeight: 600, color: '#1C2430', display: 'block', marginBottom: 6 };
const ERROR_STYLE = { fontSize: 12.5, color: '#C0453A', margin: '6px 0 0' };

function Star({ filled, onClick, onMouseEnter, size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size}
      fill={filled ? '#2F6F62' : 'none'} stroke="#2F6F62" strokeWidth="1.5"
      onClick={onClick} onMouseEnter={onMouseEnter}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function WriteReviewForm({ property }) {
  const { addReview } = useAdminData();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateReviewForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    addReview({
      propertyId: property.id,
      propertyTitle: property.title,
      reviewerName: form.name.trim(),
      rating: form.rating,
      reviewText: form.text.trim(),
      date: new Date().toISOString().slice(0, 10),
    });
    setForm(EMPTY_FORM);
    setErrors({});
    setOpen(false);
    showToast('Thanks for your review — it will appear once approved.');
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{ marginTop: 18, background: '#F4F1EA', border: 'none', borderRadius: 100, padding: '12px 22px', fontSize: 14, fontWeight: 700, color: '#1C2430', cursor: 'pointer' }}
      >
        Write a Review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 18, background: '#F4F1EA', borderRadius: 16, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={FIELD_LABEL_STYLE}>Your Name</label>
        <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
        {errors.name && <p style={ERROR_STYLE}>{errors.name}</p>}
      </div>
      <div>
        <label style={FIELD_LABEL_STYLE}>Rating</label>
        <div style={{ display: 'flex', gap: 4 }} onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              filled={n <= (hoverRating || form.rating)}
              onMouseEnter={() => setHoverRating(n)}
              onClick={() => setForm((p) => ({ ...p, rating: n }))}
            />
          ))}
        </div>
        {errors.rating && <p style={ERROR_STYLE}>{errors.rating}</p>}
      </div>
      <div>
        <label style={FIELD_LABEL_STYLE}>Your Review</label>
        <textarea
          value={form.text}
          onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
          placeholder="Share your experience with this property"
          rows={3}
          style={{ resize: 'vertical' }}
        />
        {errors.text && <p style={ERROR_STYLE}>{errors.text}</p>}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          type="submit"
          style={{ background: '#1C2430', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setForm(EMPTY_FORM); setErrors({}); }}
          style={{ background: 'transparent', border: 'none', padding: '12px 10px', fontSize: 14, fontWeight: 600, color: '#6B7280', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function PropertyReviews({ reviews, property }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 20, color: '#1C2430', margin: '0 0 18px' }}>
        Resident Reviews
      </h3>
      {reviews && reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {reviews.map((r) => (
            <div key={r.id} style={{ background: '#F4F1EA', borderRadius: 16, padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1C2430' }}>{r.reviewerName}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: '#2F6F62' }}>
                  <Star filled size={13} />
                  {r.rating}
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#3F4753', lineHeight: 1.6, margin: 0 }}>{r.reviewText}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>No reviews yet — be the first to share your experience.</p>
      )}
      <WriteReviewForm property={property} />
    </div>
  );
}
