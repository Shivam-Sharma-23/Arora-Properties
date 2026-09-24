import { useSearchMode } from '../../hooks/useSearchMode';
import './SearchFilterBar.css';

export default function SearchFilterBar({ searchQuery, onSearchQueryChange, filters, onFilterChange }) {
  const { buyRent, setBuyRent } = useSearchMode();

  const noop = (e) => e && e.preventDefault && e.preventDefault();

  return (
    <div className="pf-bar">
      <div className="pf-tabs">
        <button className={'pf-tab' + (buyRent === 'buy' ? ' active' : '')} onClick={() => setBuyRent('buy')}>Buy</button>
        <button className={'pf-tab' + (buyRent === 'rent' ? ' active' : '')} onClick={() => setBuyRent('rent')}>Rent</button>
      </div>
      <div className="pf-fields" data-search-grid-5="true">
        <div className="pf-field">
          <label>Location</label>
          <input value={searchQuery} onChange={(e) => onSearchQueryChange(e.target.value)} placeholder="City, locality" />
        </div>
        <div className="pf-field">
          <label>Property Type</label>
          <select value={filters.type} onChange={(e) => onFilterChange({ type: e.target.value })}>
            <option value="Any">Any type</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>
        <div className="pf-field">
          <label>Budget</label>
          <select value={filters.priceMax} onChange={(e) => onFilterChange({ priceMax: parseInt(e.target.value, 10) })}>
            <option value="70000000">Any budget</option>
            <option value="2000000">Under ₹20L</option>
            <option value="20000000">Under ₹2 Cr</option>
            <option value="40000000">Under ₹4 Cr</option>
            <option value="70000000">Under ₹7 Cr</option>
          </select>
        </div>
        <div className="pf-field">
          <label>Bedrooms</label>
          <select value={filters.bedrooms} onChange={(e) => onFilterChange({ bedrooms: e.target.value })}>
            <option value="Any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
        <button className="pf-search-btn" onClick={noop}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
}
