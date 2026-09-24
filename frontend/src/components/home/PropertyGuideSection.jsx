import { GUIDE_ITEMS } from '../../data/guideItems';
import './PropertyGuideSection.css';

export default function PropertyGuideSection() {
  return (
    <section id="property-guide" className="resource-section">
      <h2 style={{ fontSize: 'clamp(26px,3.6vw,36px)' }}>Property Guide</h2>
      <p>A short primer for buying, renting or listing with confidence.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {GUIDE_ITEMS.map((g) => (
          <div className="guide-card" key={g.title}>
            <h3>{g.title}</h3>
            <p>{g.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
