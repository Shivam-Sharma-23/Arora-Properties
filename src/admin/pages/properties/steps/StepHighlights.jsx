import { useState } from 'react';
import { generateId } from '../../../utils/id';
import { IconClose, IconPlusCircle } from '../../../components/icons';

const SUGGESTIONS = {
  amenitiesWellness: ['Gym', 'Swimming Pool', 'Park', 'Clubhouse', 'Jogging Track', 'Yoga Area'],
  propertyFeatures: ['Modular Kitchen', 'Balcony', 'Natural Light', 'Power Backup', 'Servant Room', 'Lift'],
  securityFeatures: ['24x7 Security', 'CCTV', 'Gated Community', 'Security Guard', 'Video Door Phone', 'Fire Safety'],
};

function TagCategory({ title, description, items, onAdd, onRemove, suggestions }) {
  const [text, setText] = useState('');

  const submit = () => {
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText('');
  };

  return (
    <div style={{ marginBottom: 26 }}>
      <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14.5, fontWeight: 700, color: '#1C2430', margin: '0 0 4px' }}>{title}</h4>
      {description && <p style={{ fontSize: 12.5, color: '#8A8F98', margin: '0 0 10px' }}>{description}</p>}

      <div className="admin-tag-list">
        {items.length === 0 && <span style={{ fontSize: 13, color: '#8A8F98' }}>None added yet.</span>}
        {items.map((item) => (
          <span className="admin-tag" key={item.id}>
            {item.label}
            <button type="button" onClick={() => onRemove(item.id)}><IconClose width={12} height={12} /></button>
          </span>
        ))}
      </div>

      <div className="admin-add-inline">
        <input
          className="admin-input"
          placeholder={'Add a custom entry...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
        />
        <button type="button" className="admin-btn admin-btn-secondary" onClick={submit}>
          <IconPlusCircle width={15} height={15} /> Add
        </button>
      </div>

      {suggestions && (
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {suggestions.filter((s) => !items.some((i) => i.label === s)).map((s) => (
            <button key={s} type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => onAdd(s)}>
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StepHighlights({ draft, setField }) {
  const highlights = draft.highlights;

  const setHighlights = (patch) => setField('highlights', { ...highlights, ...patch });

  const addSimple = (key) => (label) => {
    setHighlights({ [key]: [...highlights[key], { id: generateId('hl'), label }] });
  };
  const removeSimple = (key) => (id) => {
    setHighlights({ [key]: highlights[key].filter((i) => i.id !== id) });
  };

  const addConnectivity = () => {
    setHighlights({
      locationConnectivity: [...highlights.locationConnectivity, { id: generateId('hl'), label: '', distance: '' }],
    });
  };
  const updateConnectivity = (id, field, value) => {
    setHighlights({
      locationConnectivity: highlights.locationConnectivity.map((h) => (h.id === id ? { ...h, [field]: value } : h)),
    });
  };
  const removeConnectivity = (id) => {
    setHighlights({ locationConnectivity: highlights.locationConnectivity.filter((h) => h.id !== id) });
  };

  return (
    <div className="admin-card">
      <h3 className="admin-card-title">Property Highlights</h3>

      <div style={{ marginBottom: 26 }}>
        <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14.5, fontWeight: 700, color: '#1C2430', margin: '0 0 10px' }}>
          Location &amp; Connectivity
        </h4>
        {highlights.locationConnectivity.map((h) => (
          <div className="admin-highlight-row" key={h.id}>
            <input className="admin-input" placeholder="e.g. Metro station nearby" value={h.label}
              onChange={(e) => updateConnectivity(h.id, 'label', e.target.value)} />
            <input className="admin-input distance-input" placeholder="0.8 km" value={h.distance}
              onChange={(e) => updateConnectivity(h.id, 'distance', e.target.value)} />
            <button type="button" className="admin-btn admin-btn-icon" onClick={() => removeConnectivity(h.id)}>
              <IconClose width={14} height={14} />
            </button>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={addConnectivity}>
          <IconPlusCircle width={14} height={14} /> Add Highlight
        </button>
      </div>

      <TagCategory
        title="Amenities & Wellness"
        items={highlights.amenitiesWellness}
        onAdd={addSimple('amenitiesWellness')}
        onRemove={removeSimple('amenitiesWellness')}
        suggestions={SUGGESTIONS.amenitiesWellness}
      />
      <TagCategory
        title="Property Features"
        items={highlights.propertyFeatures}
        onAdd={addSimple('propertyFeatures')}
        onRemove={removeSimple('propertyFeatures')}
        suggestions={SUGGESTIONS.propertyFeatures}
      />
      <TagCategory
        title="Security Features"
        items={highlights.securityFeatures}
        onAdd={addSimple('securityFeatures')}
        onRemove={removeSimple('securityFeatures')}
        suggestions={SUGGESTIONS.securityFeatures}
      />
    </div>
  );
}
