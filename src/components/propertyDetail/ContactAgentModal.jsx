import { useToast } from '../../hooks/useToast';
import { waLink } from '../../data/constants';
import SafeImage from '../common/SafeImage';
import './ContactAgentModal.css';

export default function ContactAgentModal({ agent, property, onClose }) {
  const { showToast } = useToast();

  const handleSend = () => {
    onClose();
    showToast('Your message has been sent to the agent.');
  };

  const whatsappLink = waLink('Hi Arora Properties, I am interested in ' + property.title + ' (' + property.location + ').');

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <SafeImage src={agent.photo} alt={'Portrait of ' + agent.name} style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px' }} />
        <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 19, color: '#1C2430', margin: '0 0 4px' }}>{agent.name}</h3>
        <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 24px' }}>{agent.role} · {agent.location}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="tel:+919667417207" className="contact-call-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
            </svg>
            Call Agent
          </a>
          <button className="contact-message-btn" onClick={handleSend}>
            Send a Message
          </button>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-whatsapp-btn">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff">
              <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.45 1.27 4.91L2 22l5.25-1.38A9.94 9.94 0 0 0 12.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10zm5.87 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.66-.79-3.07-1.27-5.05-4.36-5.2-4.56-.15-.2-1.25-1.66-1.25-3.17 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.23.57.35.08.13.08.73-.17 1.43z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
