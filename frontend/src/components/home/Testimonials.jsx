import { useEffect, useState } from 'react';
import { TESTIMONIALS } from '../../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[index];
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
        <p className="testimonial-quote">"{testimonial.text}"</p>
        <p className="testimonial-name">{testimonial.name}</p>
        <p className="testimonial-location">{testimonial.location}</p>
        <div className="testimonial-dots">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              className={'testimonial-dot' + (i === index ? ' active' : '')}
              aria-label="Show testimonial"
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
