import { useState } from 'react';
import { useSectionNav } from '../../hooks/useSectionNav';
import { EMAIL_RE } from '../../utils/validators';
import './FinalCtaNewsletter.css';

export default function FinalCtaNewsletter() {
  const { goProperties, goSell } = useSectionNav();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return;
    setDone(true);
  };

  return (
    <section className="final-cta">
      <div className="final-cta-inner">
        <h2>Your next chapter starts here.</h2>
        <p>Discover homes that match your lifestyle.</p>
        <div className="final-cta-buttons">
          <button className="final-cta-primary" onClick={goProperties}>Explore Properties</button>
          <button className="final-cta-secondary" onClick={goSell}>Talk to an Agent</button>
        </div>
        <div className="newsletter-block">
          <p>Get the latest property opportunities in your inbox.</p>
          {done ? (
            <p className="newsletter-success">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#7ED9B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              You're subscribed. Watch your inbox.
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
