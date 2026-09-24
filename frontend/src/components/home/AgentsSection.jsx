import { useAdminData } from '../../admin/context/AdminDataContext';
import { useToast } from '../../hooks/useToast';
import SafeImage from '../common/SafeImage';
import './AgentsSection.css';

export default function AgentsSection() {
  const { showToast } = useToast();
  const { experts } = useAdminData();

  return (
    <section id="agents-section" className="agents-section">
      <div className="agents-inner">
        <div className="section-header">
          <h2>Our Experts</h2>
          <p>Experienced advisors ready to guide your next move.</p>
        </div>
        <div className="grid-4" data-grid-4="true" style={{ gap: 24 }}>
          {experts.map((agent) => (
            <div className="agent-card" key={agent.id}>
              <SafeImage src={agent.photo} alt={'Portrait of ' + agent.name} className="agent-avatar" style={{ width: 84, height: 84 }} />
              <h3>{agent.name}</h3>
              <p className="agent-role">{agent.role}</p>
              <p className="agent-meta">{agent.location} · {agent.listings} listings</p>
              <div className="agent-rating">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="#2F6F62" stroke="none">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {agent.rating}
              </div>
              <button
                className="agent-contact-btn"
                onClick={() => showToast('Request sent to ' + agent.name + '. They will reach out shortly.')}
              >
                Contact
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
