import FilterFields from './FilterFields';

export default function FilterDrawerMobile({ filters, onFilterChange, onReset, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 250, background: 'rgba(28,36,48,0.4)' }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, maxHeight: '82vh', overflowY: 'auto', background: '#FFFFFF', borderRadius: '24px 24px 0 0', padding: 26, animation: 'havenly-fade-up .25s ease both' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 18, color: '#1C2430', margin: 0 }}>Filters</h3>
          <button onClick={onReset} style={{ background: 'none', border: 'none', color: '#2F6F62', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', padding: 0 }}>
            Reset Filters
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <FilterFields filters={filters} onFilterChange={onFilterChange} checkboxSize={17} fontSize={15} />
          <button
            onClick={onClose}
            style={{ background: '#1C2430', color: '#fff', border: 'none', padding: 14, borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
