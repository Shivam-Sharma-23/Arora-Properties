import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import EmptyState from '../../components/EmptyState';
import { IconPlusCircle, IconEdit, IconTrash, IconFileText } from '../../components/icons';

export default function BlogCmsPage() {
  const { blogs, deleteBlog } = useAdminData();
  const { showToast } = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Blog</h1>
          <p>{blogs.length} posts · manage drafts and published articles.</p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/blog/new" className="admin-btn admin-btn-primary"><IconPlusCircle width={16} height={16} /> New Post</Link>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="admin-table-wrap"><EmptyState icon={IconFileText} title="No blog posts yet" subtitle="Create your first post to publish it on the site." actionLabel="+ New Post" onAction={() => {}} /></div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Publish Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id}>
                  <td className="admin-table-title">{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.publishDate || 'Not available'}</td>
                  <td><span className={'admin-badge admin-badge-' + b.status}>{b.status}</span></td>
                  <td>
                    <div className="admin-row-actions">
                      <Link className="admin-btn admin-btn-icon admin-btn-sm" to={'/admin/blog/' + b.id + '/edit'}><IconEdit width={14} height={14} /></Link>
                      <button className="admin-btn admin-btn-icon admin-btn-sm" onClick={() => setPendingDelete(b)}><IconTrash width={14} height={14} style={{ color: '#C0453A' }} /></button>
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
          title="Delete Blog Post?"
          itemName={pendingDelete.title}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => { deleteBlog(pendingDelete.id); showToast('Blog post deleted.'); setPendingDelete(null); }}
        />
      )}
    </div>
  );
}
