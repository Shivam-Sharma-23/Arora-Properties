import { useAdminData } from '../../admin/context/AdminDataContext';
import './Hero.css';

export default function Hero() {
  const { hero } = useAdminData();

  return (
    <section className="hero">
      <img className="hero-bg" src={hero.image} alt={hero.heading} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-text">
          <h1>{hero.heading}</h1>
          <p>{hero.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
