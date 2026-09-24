import FilterFields from './FilterFields';

export default function FilterSidebar({ filters, onFilterChange, onReset, onApply }) {
  return (
    <aside
      style={{ width: 280, flexShrink: 0, background: '#FFFFFF', border: '1px solid #E7E3DC', borderRadius: 20, padding: 26 }}
      data-filter-sidebar="true"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 17, color: '#1C2430', margin: 0 }}>Filters</h3>
        <button onClick={onReset} style={{ background: 'none', border: 'none', color: '#2F6F62', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0 }}>
          Reset Filters
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <FilterFields filters={filters} onFilterChange={onFilterChange} checkboxSize={16} fontSize={14} />
        <button
          onClick={onApply}
          style={{ background: '#1C2430', color: '#fff', border: 'none', padding: 12, borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
