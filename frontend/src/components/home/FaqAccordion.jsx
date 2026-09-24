import { useState } from 'react';
import { useAdminData } from '../../admin/context/AdminDataContext';
import './FaqAccordion.css';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const { faqs } = useAdminData();
  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faqs" className="resource-section">
      <h2 style={{ fontSize: 'clamp(24px,3.2vw,32px)' }}>Frequently Asked Questions</h2>
      <p>Answers to what buyers and renters ask us most.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sortedFaqs.map((faq, i) => (
          <div className="faq-item" key={faq.id}>
            <button className="faq-question" onClick={() => toggle(i)}>
              {faq.question}
              <svg
                className={'faq-icon' + (openIndex === i ? ' open' : '')}
                viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openIndex === i && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
