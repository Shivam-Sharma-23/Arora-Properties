import { waLink } from '../../data/constants';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const link = waLink('Hi Arora Properties, I would like to know more about your listings.');

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp" className="whatsapp-float">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff">
        <path d="M12.04 2c-5.5 0-10 4.5-10 10 0 1.77.46 3.45 1.27 4.91L2 22l5.25-1.38A9.94 9.94 0 0 0 12.04 22c5.5 0 10-4.5 10-10s-4.5-10-10-10zm5.87 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.66-.79-3.07-1.27-5.05-4.36-5.2-4.56-.15-.2-1.25-1.66-1.25-3.17 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.76.83 2.06.98.3.15.5.23.57.35.08.13.08.73-.17 1.43z" />
      </svg>
    </a>
  );
}
