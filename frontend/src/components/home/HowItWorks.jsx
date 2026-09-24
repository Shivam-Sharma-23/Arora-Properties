import './HowItWorks.css';

const STEPS = [
  { number: '01', title: 'Search', body: 'Explore properties based on your preferences.' },
  { number: '02', title: 'Shortlist', body: 'Save your favorite properties.' },
  { number: '03', title: 'Move In', body: 'Schedule a visit and connect with an agent.' },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works-inner">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps from search to move-in.</p>
        </div>
        <div className="grid-3" data-grid-3="true" style={{ gap: 32 }}>
          {STEPS.map((s) => (
            <div className="how-step" key={s.number}>
              <div className="step-number">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
