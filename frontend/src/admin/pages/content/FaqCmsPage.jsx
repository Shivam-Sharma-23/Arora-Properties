import { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import EmptyState from '../../components/EmptyState';
import { IconPlusCircle, IconEdit, IconTrash, IconArrowUp, IconArrowDown, IconHelp } from '../../components/icons';

export default function FaqCmsPage() {
  const { faqs, addFaq, updateFaq, deleteFaq, reorderFaq } = useAdminData();
  const { showToast } = useToast();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ question: '', answer: '' });
  const [adding, setAdding] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const sorted = [...faqs].sort((a, b) => a.order - b.order);

  const startEdit = (faq) => { setEditingId(faq.id); setDraft({ question: faq.question, answer: faq.answer }); setAdding(false); };
  const startAdd = () => { setAdding(true); setEditingId(null); setDraft({ question: '', answer: '' }); };
  const cancel = () => { setEditingId(null); setAdding(false); };

  const save = () => {
    if (!draft.question.trim() || !draft.answer.trim()) return;
    if (adding) {
      addFaq(draft);
      showToast('FAQ added.');
    } else {
      updateFaq(editingId, draft);
      showToast('FAQ updated.');
    }
    cancel();
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>FAQs</h1>
          <p>Manage the questions shown in the homepage FAQ accordion.</p>
        </div>
        <div className="admin-page-actions">
          <button className="admin-btn admin-btn-primary" onClick={startAdd}><IconPlusCircle width={16} height={16} /> Add FAQ</button>
        </div>
      </div>

      {adding && (
        <div className="admin-card">
          <h3 className="admin-card-title">New FAQ</h3>
          <div className="admin-form-field">
            <label>Question</label>
            <input className="admin-input" value={draft.question} onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))} />
          </div>
          <div className="admin-form-field">
            <label>Answer</label>
            <textarea className="admin-textarea" rows={3} value={draft.answer} onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="admin-btn admin-btn-secondary" onClick={cancel}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={save}>Save</button>
          </div>
        </div>
      )}

      {sorted.length === 0 && !adding ? (
        <div className="admin-card"><EmptyState icon={IconHelp} title="No FAQs yet" subtitle="Add a question to get started." actionLabel="+ Add FAQ" onAction={startAdd} /></div>
      ) : (
        sorted.map((faq, i) => (
          <div className="admin-card" key={faq.id}>
            {editingId === faq.id ? (
              <>
                <div className="admin-form-field">
                  <label>Question</label>
                  <input className="admin-input" value={draft.question} onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))} />
                </div>
                <div className="admin-form-field">
                  <label>Answer</label>
                  <textarea className="admin-textarea" rows={3} value={draft.answer} onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="admin-btn admin-btn-secondary" onClick={cancel}>Cancel</button>
                  <button className="admin-btn admin-btn-primary" onClick={save}>Save</button>
                </div>
              </>
            ) : (
              <div data-faq-row="true" style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 15, fontWeight: 700, color: '#1C2430', margin: '0 0 6px' }}>{faq.question}</h3>
                  <p style={{ fontSize: 13.5, color: '#6B7280', margin: 0 }}>{faq.answer}</p>
                </div>
                <div className="admin-row-actions" style={{ flexShrink: 0 }}>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" disabled={i === 0} onClick={() => reorderFaq(faq.id, -1)}><IconArrowUp width={13} height={13} /></button>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" disabled={i === sorted.length - 1} onClick={() => reorderFaq(faq.id, 1)}><IconArrowDown width={13} height={13} /></button>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" onClick={() => startEdit(faq)}><IconEdit width={13} height={13} /></button>
                  <button className="admin-btn admin-btn-icon admin-btn-sm" onClick={() => setPendingDelete(faq)}><IconTrash width={13} height={13} style={{ color: '#C0453A' }} /></button>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {pendingDelete && (
        <ConfirmDeleteModal
          title="Delete FAQ?"
          itemName={pendingDelete.question}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => { deleteFaq(pendingDelete.id); showToast('FAQ deleted.'); setPendingDelete(null); }}
        />
      )}
    </div>
  );
}
