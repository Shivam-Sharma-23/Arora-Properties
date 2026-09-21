import { useSectionNav } from '../../hooks/useSectionNav';
import './Footer.css';

export default function Footer() {
  const { goBuy, goRent, goProperties, goLocations, goAbout, goAgents, goPropertyGuide, goFaqs, goBlog, preventDefault } = useSectionNav();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid" data-footer-grid="true">
          <div>
            <div className="footer-brand-row">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2F6F62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
              </svg>
              <span>Arora Properties</span>
            </div>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: '0 0 6px', maxWidth: 280 }}>
              Specialized in: Rental Properties. Since 1991.
            </p>
            <p style={{ fontSize: 13.5, color: '#8A8F98', lineHeight: 1.6, margin: 0, maxWidth: 300 }}>
              Office: 327, Ground Floor, Gagan Vihar, Main Road, Opp. D.A.V. School, Mausam Vihar, New Delhi-110051
            </p>
            <p style={{ fontSize: 13.5, color: '#8A8F98', lineHeight: 1.6, margin: '6px 0 0' }}>Office: 9667417207</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <div className="footer-col-links">
              <a onClick={goBuy}>Buy</a>
              <a onClick={goRent}>Rent</a>
              <a onClick={goProperties}>Properties</a>
              <a onClick={goLocations}>Locations</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-col-links">
              <a onClick={goAbout}>About</a>
              <a onClick={goAgents}>Agents</a>
              <a onClick={preventDefault}>Careers</a>
              <a onClick={preventDefault}>Contact</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <div className="footer-col-links">
              <a onClick={goPropertyGuide}>Property Guide</a>
              <a onClick={goFaqs}>FAQs</a>
              <a onClick={goBlog}>Blog</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Social</h4>
            <div className="footer-col-links">
              <a onClick={preventDefault}>Instagram</a>
              <a onClick={preventDefault}>Facebook</a>
              <a onClick={preventDefault}>LinkedIn</a>
              <a onClick={preventDefault}>YouTube</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Arora Properties. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a onClick={preventDefault}>Privacy Policy</a>
            <a onClick={preventDefault}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
