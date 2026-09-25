import { useEffect, useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { useSectionNav } from '../../hooks/useSectionNav';
import './Navbar.css';

export default function Navbar({ onToggleMobileNav }) {
  const [scrolled, setScrolled] = useState(false);
  const { favorites } = useFavorites();
  const { goHome, goBuy, goRent, goSell, goAgents, goAbout, goFavorites } = useSectionNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={'navbar' + (scrolled ? ' scrolled' : '')}>
      <div className="navbar-inner">
        <button className="navbar-logo" onClick={goHome} aria-label="Arora Properties home">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
          </svg>
          <span>Arora Properties</span>
        </button>

        <nav className="navbar-links" data-desktop-nav="true">
          <a className="navbar-link" onClick={goBuy}>Buy</a>
          <a className="navbar-link" onClick={goRent}>Rent</a>
          <a className="navbar-link" onClick={goSell}>Sell</a>
          <a className="navbar-link" onClick={goAgents}>Agents</a>
          <a className="navbar-link" onClick={goAbout}>About</a>
        </nav>

        <div className="navbar-actions" data-desktop-actions="true">
          <button className="navbar-fav-btn" onClick={goFavorites} aria-label="Favorites" title="Your favorites">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.9a5.5 5.5 0 0 0-7.78 0L12 6l-1.02-1.1a5.5 5.5 0 0 0-7.78 7.78l1.02 1.02L12 21.5l7.78-7.8 1.02-1.02a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favorites.length > 0 && <span className="navbar-fav-badge">{favorites.length}</span>}
          </button>
          <button className="navbar-cta" onClick={goSell}>List Your Property</button>
        </div>

        <button className="navbar-mobile-toggle" onClick={onToggleMobileNav} aria-label="Menu" data-mobile-toggle="true">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
