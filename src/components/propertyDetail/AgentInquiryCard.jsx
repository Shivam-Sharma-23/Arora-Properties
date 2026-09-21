import SafeImage from '../common/SafeImage';
import './AgentInquiryCard.css';

export default function AgentInquiryCard({ agent, onSchedule, onContact }) {
  return (
    <aside style={{ background: '#FFFFFF', border: '1px solid #E7E3DC', borderRadius: 20, padding: 26, position: 'sticky', top: 96 }}>
      <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 18, color: '#1C2430', margin: '0 0 6px' }}>
        Interested in this property?
      </h3>
      <p style={{ fontSize: 13.5, color: '#6B7280', margin: '0 0 20px' }}>Schedule a visit or reach out directly.</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22, paddingBottom: 22, borderBottom: '1px solid #F1EEE8' }}>
        <SafeImage src={agent.photo} alt={'Portrait of ' + agent.name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1C2430', margin: 0 }}>{agent.name}</p>
          <p style={{ fontSize: 12.5, color: '#8A8F98', margin: '2px 0 0' }}>{agent.role}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          className="inquiry-schedule-btn"
          onClick={onSchedule}
          style={{ background: '#1C2430', color: '#fff', border: 'none', padding: 14, borderRadius: 100, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', transition: 'background .2s ease' }}
        >
          Schedule a Visit
        </button>
        <button
          className="inquiry-contact-btn"
          onClick={onContact}
          style={{ background: '#FFFFFF', color: '#1C2430', border: '1.5px solid #1C2430', padding: 14, borderRadius: 100, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', transition: 'all .2s ease' }}
        >
          Contact Agent
        </button>
      </div>
    </aside>
  );
}
