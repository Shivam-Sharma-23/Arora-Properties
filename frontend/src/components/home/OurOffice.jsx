import { OFFICE_IMAGES } from '../../data/officeImages';
import './OurOffice.css';

export default function OurOffice() {
  return (
    <section id="our-office" className="office-section">
      <div className="section-header">
        <h2>Inside our World</h2>
        <p>From the first conversation to the final decision, our team works to turn your property goals into reality.</p>
      </div>
      <div className="grid-3" data-grid-3="true" style={{ gap: 24 }}>
        {OFFICE_IMAGES.map((img) => (
          <div className="office-photo" key={img.id}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
