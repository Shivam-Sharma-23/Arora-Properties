import { useEffect, useState } from 'react';
import { useAdminData } from '../../admin/context/AdminDataContext';
import './Testimonials.css';

export default function Testimonials() {
  const { reviews } = useAdminData();
  const [index, setIndex] = useState(0);

  const featured = reviews
    .filter((r) => r.status === 'approved')
    .sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  useEffect(() => {
    if (featured.length < 2) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const safeIndex = index % featured.length;
  const testimonial = featured[safeIndex];
  const stars = [0, 1, 2, 3, 4].filter((i) => i < Math.round(testimonial.rating));

  return (
    <section className="testimonials-section">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-card">
        <div className="testimonial-stars">
          {stars.map((i) => (
            <svg key={i} viewBox="0 0 24 24" width="18" height="18" fill="#2F6F62" stroke="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="testimonial-quote">"{testimonial.reviewText}"</p>
        <p className="testimonial-name">{testimonial.reviewerName}</p>
        <p className="testimonial-location">{testimonial.propertyTitle}</p>
        {featured.length > 1 && (
          <div className="testimonial-dots">
            {featured.map((t, i) => (
              <button
                key={t.id}
                className={'testimonial-dot' + (i === safeIndex ? ' active' : '')}
                aria-label="Show testimonial"
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
