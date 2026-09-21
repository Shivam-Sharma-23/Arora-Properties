import FormField from '../../../components/FormField';
import ButtonGroup from '../../../components/ButtonGroup';
import {
  PROPERTY_TYPES, BATHROOM_OPTIONS, BALCONY_OPTIONS, FURNISHING_OPTIONS, PARKING_OPTIONS,
  TENANT_OPTIONS, BACHELOR_OPTIONS, YES_NO_OPTIONS, MAINTENANCE_OPTIONS, DEPOSIT_OPTIONS,
  LOCKIN_OPTIONS, BROKERAGE_OPTIONS,
} from '../../../utils/propertyOptions';

export default function StepPropertyDetails({ draft, setField, errors, experts }) {
  return (
    <>
      <div className="admin-card">
        <h3 className="admin-card-title">Listing Basics</h3>
        <p className="admin-card-subtitle">Identity fields used across the public site.</p>

        <div className="admin-form-grid">
          <FormField label="Property Title" error={errors.title}>
            <input className={'admin-input' + (errors.title ? ' has-error' : '')} value={draft.title}
              onChange={(e) => setField('title', e.target.value)} placeholder="e.g. Garden View Residence" />
          </FormField>
          <FormField label="Property Type">
            <select className="admin-select" value={draft.type} onChange={(e) => setField('type', e.target.value)}>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>
        </div>

        <div className="admin-form-grid">
          <FormField label="Listing For">
            <ButtonGroup options={[{ value: 'rent', label: 'Rent' }, { value: 'buy', label: 'Sale' }]}
              value={draft.buyRent} onChange={(v) => setField('buyRent', v)} />
          </FormField>
          <FormField label="Bedrooms">
            <ButtonGroup options={['1', '2', '3', '4', '5']} value={String(draft.bedrooms)}
              onChange={(v) => setField('bedrooms', Number(v))} />
          </FormField>
        </div>

        <div className="admin-form-grid">
          <FormField label="City / Location (short)" hint="Shown on property cards, e.g. 'Gurgaon, Haryana'">
            <input className="admin-input" value={draft.location} onChange={(e) => setField('location', e.target.value)} placeholder="City, State" />
          </FormField>
          <FormField label="Assign Agent / Expert">
            <select className="admin-select" value={draft.agentId || ''} onChange={(e) => setField('agentId', Number(e.target.value))}>
              <option value="">Select an expert</option>
              {experts.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </FormField>
        </div>

        <FormField label="Feature on Homepage">
          <ButtonGroup options={[{ value: true, label: 'Featured' }, { value: false, label: 'Not Featured' }]}
            value={draft.featured} onChange={(v) => setField('featured', v === 'true' || v === true)} />
        </FormField>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Basic Details</h3>

        <div className="admin-form-grid">
          <FormField label="Buildup Area" error={errors.buildupArea}>
            <div className="admin-input-prefix">
              <input type="number" min="0" value={draft.buildupArea}
                onChange={(e) => setField('buildupArea', e.target.value)} placeholder="1450" />
              <span>sq.ft</span>
            </div>
          </FormField>
          <FormField label="Carpet Area">
            <div className="admin-input-prefix">
              <input type="number" min="0" value={draft.carpetArea}
                onChange={(e) => setField('carpetArea', e.target.value)} placeholder="1250" />
              <span>sq.ft</span>
            </div>
          </FormField>
        </div>

        <FormField label="Age of Property">
          <div className="admin-input-prefix" style={{ maxWidth: 200 }}>
            <input type="number" min="0" value={draft.age} onChange={(e) => setField('age', e.target.value)} placeholder="2" />
            <span>years</span>
          </div>
        </FormField>

        <FormField label="Number of Bathrooms">
          <ButtonGroup options={BATHROOM_OPTIONS} value={draft.bathrooms} onChange={(v) => setField('bathrooms', v)} />
        </FormField>
        <FormField label="Number of Balconies">
          <ButtonGroup options={BALCONY_OPTIONS} value={draft.balconies} onChange={(v) => setField('balconies', v)} />
        </FormField>
        <FormField label="Furnishing Type" error={errors.furnishingType}>
          <ButtonGroup options={FURNISHING_OPTIONS} value={draft.furnishingType} onChange={(v) => setField('furnishingType', v)} />
        </FormField>
        <div className="admin-form-grid">
          <FormField label="Covered Parking">
            <ButtonGroup options={PARKING_OPTIONS} value={draft.coveredParking} onChange={(v) => setField('coveredParking', v)} />
          </FormField>
          <FormField label="Open Parking">
            <ButtonGroup options={PARKING_OPTIONS} value={draft.openParking} onChange={(v) => setField('openParking', v)} />
          </FormField>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Tenant Preferences</h3>

        <FormField label="Preferred Tenant Type">
          <ButtonGroup options={TENANT_OPTIONS} value={draft.tenantPreference}
            onChange={(v) => setField('tenantPreference', v)} />
        </FormField>

        {draft.tenantPreference === 'Bachelors' && (
          <FormField label="Bachelor Preference" error={errors.bachelorPreference}>
            <ButtonGroup options={BACHELOR_OPTIONS} value={draft.bachelorPreference}
              onChange={(v) => setField('bachelorPreference', v)} />
          </FormField>
        )}

        <FormField label="Pet Friendly">
          <ButtonGroup options={YES_NO_OPTIONS} value={draft.petFriendly} onChange={(v) => setField('petFriendly', v)} />
        </FormField>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Rent &amp; Availability</h3>

        <div className="admin-form-grid">
          <FormField label="Available From">
            <input type="date" className="admin-input" value={draft.availableFrom}
              onChange={(e) => setField('availableFrom', e.target.value)} />
          </FormField>
          <FormField label={draft.buyRent === 'rent' ? 'Monthly Rent' : 'Price'} error={errors.price}>
            <div className="admin-input-prefix">
              <span>₹</span>
              <input type="number" min="0" value={draft.price}
                onChange={(e) => setField('price', e.target.value)} placeholder="35000" />
            </div>
          </FormField>
        </div>

        <FormField label="Maintenance Charges">
          <ButtonGroup options={MAINTENANCE_OPTIONS} value={draft.maintenanceCharges}
            onChange={(v) => setField('maintenanceCharges', v)} />
        </FormField>
        {draft.maintenanceCharges === 'Separate' && (
          <FormField label="Maintenance Amount" error={errors.maintenanceAmount}>
            <div className="admin-input-prefix" style={{ maxWidth: 220 }}>
              <span>₹</span>
              <input type="number" min="0" value={draft.maintenanceAmount}
                onChange={(e) => setField('maintenanceAmount', e.target.value)} placeholder="2500" />
            </div>
          </FormField>
        )}

        <FormField label="Security Deposit">
          <ButtonGroup options={DEPOSIT_OPTIONS} value={draft.securityDeposit}
            onChange={(v) => setField('securityDeposit', v)} />
        </FormField>
        {draft.securityDeposit === 'Custom' && (
          <FormField label="Custom Security Deposit" error={errors.securityDepositCustom}>
            <div className="admin-input-prefix" style={{ maxWidth: 220 }}>
              <span>₹</span>
              <input type="number" min="0" value={draft.securityDepositCustom}
                onChange={(e) => setField('securityDepositCustom', e.target.value)} />
            </div>
          </FormField>
        )}

        <FormField label="Lock-in Period">
          <ButtonGroup options={LOCKIN_OPTIONS} value={draft.lockInPeriod} onChange={(v) => setField('lockInPeriod', v)} />
        </FormField>
        {draft.lockInPeriod === 'Custom' && (
          <FormField label="Custom Lock-in Period" error={errors.lockInCustom}>
            <div className="admin-input-prefix" style={{ maxWidth: 220 }}>
              <input type="number" min="0" value={draft.lockInCustom}
                onChange={(e) => setField('lockInCustom', e.target.value)} />
              <span>months</span>
            </div>
          </FormField>
        )}

        <FormField label="Brokerage">
          <ButtonGroup options={BROKERAGE_OPTIONS} value={draft.brokerage} onChange={(v) => setField('brokerage', v)} />
        </FormField>
        {draft.brokerage === 'Custom' && (
          <FormField label="Custom Brokerage" error={errors.brokerageCustom}>
            <input className="admin-input" style={{ maxWidth: 220 }} value={draft.brokerageCustom}
              onChange={(e) => setField('brokerageCustom', e.target.value)} placeholder="e.g. Half month rent" />
          </FormField>
        )}
        <FormField label="Brokerage Negotiable">
          <ButtonGroup options={YES_NO_OPTIONS} value={draft.brokerageNegotiable} onChange={(v) => setField('brokerageNegotiable', v)} />
        </FormField>
      </div>
    </>
  );
}
