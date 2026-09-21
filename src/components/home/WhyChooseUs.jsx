import './WhyChooseUs.css';

const FEATURES = [
  {
    title: 'Verified Properties',
    body: 'Every listing is carefully reviewed.',
    icon: (
      <>
        <path d="M12 2 4 5v6c0 5.2 3.4 9.5 8 11 4.6-1.5 8-5.8 8-11V5z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Trusted Agents',
    body: 'Connect with experienced property professionals.',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
      </>
    ),
  },
  {
    title: 'Smart Search',
    body: 'Find homes based on what actually matters to you.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    title: 'Personalized Experience',
    body: 'Save properties and receive recommendations.',
    icon: <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="why-choose-section">
      <div className="section-header">
        <h2>Why Choose Arora</h2>
        <p>A platform built around trust, clarity and genuine expertise.</p>
      </div>
      <div className="grid-4" data-grid-4="true" style={{ gap: 24 }}>
        {FEATURES.map((f) => (
          <div className="why-choose-card" key={f.title}>
            <div className="why-choose-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {f.icon}
              </svg>
            </div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
