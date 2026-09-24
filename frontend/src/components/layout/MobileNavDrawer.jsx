import { useFavorites } from '../../hooks/useFavorites';
import { useSectionNav } from '../../hooks/useSectionNav';
import './MobileNavDrawer.css';

export default function MobileNavDrawer({ onClose }) {
  const { favorites } = useFavorites();
  const { goBuy, goRent, goSell, goAgents, goLocations, goAbout, goFavorites } = useSectionNav();

  const withClose = (fn) => () => {
    onClose();
    fn();
  };

  return (
    <div className="mnd-backdrop" onClick={onClose}>
      <div className="mnd-panel" onClick={(e) => e.stopPropagation()}>
        <div className="mnd-close-row">
          <button className="mnd-close-btn" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1C2430" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <a className="mnd-link" onClick={withClose(goBuy)}>Buy</a>
        <a className="mnd-link" onClick={withClose(goRent)}>Rent</a>
        <a className="mnd-link" onClick={withClose(goSell)}>Sell</a>
        <a className="mnd-link" onClick={withClose(goAgents)}>Agents</a>
        <a className="mnd-link" onClick={withClose(goLocations)}>Locations</a>
        <a className="mnd-link" onClick={withClose(goAbout)}>About</a>
        <a className="mnd-link" onClick={withClose(goFavorites)}>Favorites ({favorites.length})</a>
        <button className="mnd-cta" onClick={withClose(goSell)}>List Your Property</button>
      </div>
    </div>
  );
}
