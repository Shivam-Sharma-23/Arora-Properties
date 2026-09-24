export default function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="admin-button-group">
      {options.map((opt) => {
        const optValue = typeof opt === 'object' ? opt.value : opt;
        const optLabel = typeof opt === 'object' ? opt.label : opt;
        return (
          <button
            key={optValue}
            type="button"
            className={String(value) === String(optValue) ? 'active' : ''}
            onClick={() => onChange(optValue)}
          >
            {optLabel}
          </button>
        );
      })}
    </div>
  );
}
