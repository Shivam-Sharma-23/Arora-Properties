import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchMode } from '../../hooks/useSearchMode';
import { useAdminData } from '../../admin/context/AdminDataContext';
import './SearchCard.css';

export default function SearchCard() {
  const navigate = useNavigate();
  const { buyRent, setBuyRent } = useSearchMode();
  const { hero } = useAdminData();
  const [heroLocation, setHeroLocation] = useState('');
  const [heroType, setHeroType] = useState('Any');
  const [heroPrice, setHeroPrice] = useState('Any');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (heroType !== 'Any') params.set('type', heroType);
    if (heroPrice !== 'Any') {
      const priceMax = buyRent === 'rent' ? parseInt(heroPrice, 10) : parseInt(heroPrice, 10) * 10000000;
      params.set('priceMax', String(priceMax));
    }
    if (heroLocation) params.set('q', heroLocation);
    navigate('/properties?' + params.toString());
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="search-card-wrap">
      <div className="search-card">
        <div className="search-tabs">
          <button className={'search-tab' + (buyRent === 'buy' ? ' active' : '')} onClick={() => { setBuyRent('buy'); setHeroPrice('Any'); }}>Buy</button>
          <button className={'search-tab' + (buyRent === 'rent' ? ' active' : '')} onClick={() => { setBuyRent('rent'); setHeroPrice('Any'); }}>Rent</button>
        </div>
        <div className="search-fields" data-search-grid="true">
          <div className="search-field">
            <label>Location</label>
            <input value={heroLocation} onChange={(e) => setHeroLocation(e.target.value)} placeholder={hero.searchPlaceholder} />
          </div>
          <div className="search-field">
            <label>Property Type</label>
            <select value={heroType} onChange={(e) => setHeroType(e.target.value)}>
              <option value="Any">Any type</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>
          <div className="search-field">
            <label>Price Range</label>
            <select value={heroPrice} onChange={(e) => setHeroPrice(e.target.value)}>
              <option value="Any">Any budget</option>
              {buyRent === 'rent' ? (
                <>
                  <option value="25000">Under ₹25,000</option>
                  <option value="50000">Under ₹50,000</option>
                  <option value="100000">Under ₹1,00,000</option>
                  <option value="200000">Under ₹2,00,000</option>
                </>
              ) : (
                <>
                  <option value="2">Under ₹2 Cr</option>
                  <option value="4">Under ₹4 Cr</option>
                  <option value="7">Under ₹7 Cr</option>
                </>
              )}
            </select>
          </div>
          <button className="search-submit" onClick={handleSearch}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Search Properties
          </button>
        </div>
      </div>
    </div>
  );
}
