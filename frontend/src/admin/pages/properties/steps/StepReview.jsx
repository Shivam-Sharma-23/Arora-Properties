import { formatPriceLabel } from '../../../utils/formatPrice';

function Row({ label, value }) {
  return (
    <div className="admin-review-row">
      <span className="label">{label}</span>
      <span className="value">{value ?? 'Not available'}</span>
    </div>
  );
}

export default function StepReview({ draft, goToStep, experts }) {
  const agent = experts.find((a) => a.id === draft.agentId);
  const addr = draft.address || {};
  const formattedAddress = [addr.flat, addr.building, addr.street, addr.locality, addr.city, addr.state, addr.pincode]
    .filter(Boolean).join(', ') || draft.location || 'Not available';

  return (
    <>
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="admin-card-title">Property Details</h3>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => goToStep(0)}>Edit</button>
        </div>
        <Row label="Title" value={draft.title} />
        <Row label="Type" value={draft.type} />
        <Row label="Listing For" value={draft.buyRent === 'rent' ? 'Rent' : 'Sale'} />
        <Row label="Bedrooms" value={draft.bedrooms} />
        <Row label="Buildup Area" value={draft.buildupArea ? draft.buildupArea + ' sq.ft' : null} />
        <Row label="Carpet Area" value={draft.carpetArea ? draft.carpetArea + ' sq.ft' : null} />
        <Row label="Bathrooms" value={draft.bathrooms} />
        <Row label="Balconies" value={draft.balconies} />
        <Row label="Furnished" value={draft.furnishingType} />
        <Row label="Parking" value={draft.coveredParking + ' Covered / ' + draft.openParking + ' Open'} />
        <Row label="Assigned Agent" value={agent ? agent.name : 'Not available'} />
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="admin-card-title">Rent Details</h3>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => goToStep(0)}>Edit</button>
        </div>
        <Row label={draft.buyRent === 'rent' ? 'Monthly Rent' : 'Price'} value={draft.price ? formatPriceLabel(draft.price, draft.buyRent) : null} />
        <Row label="Maintenance" value={draft.maintenanceCharges === 'Separate' ? '₹' + draft.maintenanceAmount : draft.maintenanceCharges} />
        <Row label="Security Deposit" value={draft.securityDeposit === 'Custom' ? '₹' + draft.securityDepositCustom : draft.securityDeposit} />
        <Row label="Lock-in Period" value={draft.lockInPeriod === 'Custom' ? draft.lockInCustom + ' months' : draft.lockInPeriod} />
        <Row label="Brokerage" value={draft.brokerage === 'Custom' ? draft.brokerageCustom : draft.brokerage} />
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="admin-card-title">Additional Details</h3>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => goToStep(1)}>Edit</button>
        </div>
        <Row label="Facing" value={draft.facing} />
        <Row label="Address" value={formattedAddress} />
        <Row label="Servant Room" value={draft.servantRoom} />
        <Row label="Description" value={draft.description ? draft.description.slice(0, 140) + (draft.description.length > 140 ? '…' : '') : null} />
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="admin-card-title">Photos</h3>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => goToStep(2)}>Edit</button>
        </div>
        {draft.photos.length === 0 ? (
          <p style={{ fontSize: 13.5, color: '#8A8F98' }}>No photos uploaded.</p>
        ) : (
          <div className="admin-image-grid">
            {draft.photos.map((p) => (
              <div key={p.id} className={'admin-image-thumb' + (p.isCover ? ' is-cover' : '')}>
                <img src={p.url} alt="" />
                {p.isCover && <span className="admin-image-cover-badge">Cover</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="admin-card-title">Highlights</h3>
          <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => goToStep(4)}>Edit</button>
        </div>
        <div className="admin-two-col">
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2430', margin: '0 0 6px' }}>Location &amp; Connectivity</p>
            {draft.highlights.locationConnectivity.length === 0 ? <p style={{ fontSize: 13, color: '#8A8F98' }}>None</p> : (
              <ul className="admin-review-list">
                {draft.highlights.locationConnectivity.map((h) => <li key={h.id}>{h.label} {h.distance && '— ' + h.distance}</li>)}
              </ul>
            )}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2430', margin: '0 0 6px' }}>Amenities</p>
            {draft.highlights.amenitiesWellness.length === 0 ? <p style={{ fontSize: 13, color: '#8A8F98' }}>None</p> : (
              <ul className="admin-review-list">
                {draft.highlights.amenitiesWellness.map((h) => <li key={h.id}>{h.label}</li>)}
              </ul>
            )}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2430', margin: '10px 0 6px' }}>Property Features</p>
            {draft.highlights.propertyFeatures.length === 0 ? <p style={{ fontSize: 13, color: '#8A8F98' }}>None</p> : (
              <ul className="admin-review-list">
                {draft.highlights.propertyFeatures.map((h) => <li key={h.id}>{h.label}</li>)}
              </ul>
            )}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#1C2430', margin: '10px 0 6px' }}>Security</p>
            {draft.highlights.securityFeatures.length === 0 ? <p style={{ fontSize: 13, color: '#8A8F98' }}>None</p> : (
              <ul className="admin-review-list">
                {draft.highlights.securityFeatures.map((h) => <li key={h.id}>{h.label}</li>)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
