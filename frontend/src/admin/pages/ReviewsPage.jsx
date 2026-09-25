import { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../../hooks/useToast';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import EmptyState from '../components/EmptyState';
import { IconCheck, IconClose, IconTrash, IconStar } from '../components/icons';

export default function ReviewsPage() {
  const { reviews, updateReview, deleteReview } = useAdminData();
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState('All');
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = statusFilter === 'All' ? reviews : reviews.filter((r) => r.status === statusFilter.toLowerCase());

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Reviews</h1>
          <p>{reviews.length} total · approved reviews appear on the property detail page and in the homepage's "What Our Clients Say" section.</p>
        </div>
        <div className="admin-page-actions">
          <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-table-wrap"><EmptyState icon={IconStar} title="No reviews found" subtitle="Reviews submitted for properties will appear here for moderation." /></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reviewer</th>
                <th>Property</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="admin-table-title">{r.reviewerName}</td>
                  <td>{r.propertyTitle}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#2F6F62', fontWeight: 700 }}>
                      <IconStar width={13} height={13} filled /> {r.rating}
                    </span>
                  </td>
                  <td style={{ maxWidth: 320 }}>{r.reviewText}</td>
                  <td>{r.date}</td>
                  <td><span className={'admin-badge admin-badge-' + r.status}>{r.status}</span></td>
                  <td>
                    <div className="admin-row-actions">
                      {r.status !== 'approved' && (
                        <button className="admin-btn admin-btn-icon admin-btn-sm" title="Approve"
                          onClick={() => { updateReview(r.id, { status: 'approved' }); showToast('Review approved.'); }}>
                          <IconCheck width={14} height={14} style={{ color: '#2F6F62' }} />
                        </button>
                      )}
                      {r.status !== 'rejected' && (
                        <button className="admin-btn admin-btn-icon admin-btn-sm" title="Reject"
                          onClick={() => { updateReview(r.id, { status: 'rejected' }); showToast('Review rejected.'); }}>
                          <IconClose width={14} height={14} style={{ color: '#C0453A' }} />
                        </button>
                      )}
                      <button className="admin-btn admin-btn-icon admin-btn-sm" title="Delete" onClick={() => setPendingDelete(r)}>
                        <IconTrash width={14} height={14} style={{ color: '#C0453A' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pendingDelete && (
        <ConfirmDeleteModal
          title="Delete Review?"
          itemName={pendingDelete.reviewerName + "'s review"}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => { deleteReview(pendingDelete.id); showToast('Review deleted.'); setPendingDelete(null); }}
        />
      )}
    </div>
  );
}
