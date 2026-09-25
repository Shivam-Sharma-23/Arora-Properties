import { useAdminData } from '../../admin/context/AdminDataContext';
import { waLink } from '../../data/constants';
import SafeImage from '../common/SafeImage';
import './AgentsSection.css';

export default function AgentsSection() {
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
              <p className="agent-role" style={{ marginBottom: 16 }}>{agent.role}</p>
              <a
                className="agent-contact-btn"
                href={waLink('Hi Arora Properties, I would like to get in touch with ' + agent.name + '.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
