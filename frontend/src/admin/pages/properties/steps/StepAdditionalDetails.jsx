import FormField from '../../../components/FormField';
import ButtonGroup from '../../../components/ButtonGroup';
import { PARKING_CHARGE_OPTIONS, PAINTING_OPTIONS, FACING_OPTIONS, YES_NO_OPTIONS } from '../../../utils/propertyOptions';

const MAX_DESC = 2000;

export default function StepAdditionalDetails({ draft, setField, setAddressField, errors }) {
  const addr = draft.address || {};

  return (
    <div className="admin-card">
      <h3 className="admin-card-title">Additional Property Details</h3>

      <FormField label="Parking Charges">
        <ButtonGroup options={PARKING_CHARGE_OPTIONS} value={draft.parkingCharges} onChange={(v) => setField('parkingCharges', v)} />
      </FormField>
      {draft.parkingCharges === 'Separate' && (
        <FormField label="Parking Charges Amount">
          <div className="admin-input-prefix" style={{ maxWidth: 220 }}>
            <span>₹</span>
            <input type="number" min="0" value={draft.parkingChargesAmount}
              onChange={(e) => setField('parkingChargesAmount', e.target.value)} />
          </div>
        </FormField>
      )}

      <FormField label="Painting Charges">
        <ButtonGroup options={PAINTING_OPTIONS} value={draft.paintingCharges} onChange={(v) => setField('paintingCharges', v)} />
      </FormField>
      {draft.paintingCharges === 'Custom' && (
        <FormField label="Custom Painting Charge">
          <div className="admin-input-prefix" style={{ maxWidth: 220 }}>
            <span>₹</span>
            <input type="number" min="0" value={draft.paintingChargesAmount}
              onChange={(e) => setField('paintingChargesAmount', e.target.value)} />
          </div>
        </FormField>
      )}

      <FormField label="Facing">
        <ButtonGroup options={FACING_OPTIONS} value={draft.facing} onChange={(v) => setField('facing', v)} />
      </FormField>

      <FormField label="Address" error={errors.address}>
        <div className="admin-form-grid">
          <input className="admin-input" placeholder="House / Flat Number" value={addr.flat}
            onChange={(e) => setAddressField('flat', e.target.value)} style={{ marginBottom: 12 }} />
          <input className="admin-input" placeholder="Building / Society" value={addr.building}
            onChange={(e) => setAddressField('building', e.target.value)} style={{ marginBottom: 12 }} />
        </div>
        <input className="admin-input" placeholder="Street / Area" value={addr.street}
          onChange={(e) => setAddressField('street', e.target.value)} style={{ marginBottom: 12 }} />
        <div className="admin-form-grid-3">
          <input className="admin-input" placeholder="Locality" value={addr.locality}
            onChange={(e) => setAddressField('locality', e.target.value)} style={{ marginBottom: 12 }} />
          <input className="admin-input" placeholder="City" value={addr.city}
            onChange={(e) => setAddressField('city', e.target.value)} style={{ marginBottom: 12 }} />
          <input className="admin-input" placeholder="State" value={addr.state}
            onChange={(e) => setAddressField('state', e.target.value)} style={{ marginBottom: 12 }} />
        </div>
        <input className="admin-input" placeholder="Pincode" value={addr.pincode}
          onChange={(e) => setAddressField('pincode', e.target.value)} style={{ maxWidth: 200 }} />
      </FormField>

      <FormField label="Servant Room">
        <ButtonGroup options={YES_NO_OPTIONS} value={draft.servantRoom} onChange={(v) => setField('servantRoom', v)} />
      </FormField>

      <FormField label="Property Description">
        <textarea
          className="admin-textarea"
          rows={6}
          maxLength={MAX_DESC}
          value={draft.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Describe the property, its neighbourhood and what makes it stand out..."
        />
        <div className="admin-char-count">{(draft.description || '').length} / {MAX_DESC} characters</div>
      </FormField>
    </div>
  );
}
