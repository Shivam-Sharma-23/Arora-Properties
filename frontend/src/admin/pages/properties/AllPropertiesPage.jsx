import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import EmptyState from '../../components/EmptyState';
import SafeImage from '../../../components/common/SafeImage';
import { IconSearch, IconEdit, IconTrash, IconEye, IconPlusCircle, IconBuilding } from '../../components/icons';

const PAGE_SIZE = 8;

export default function AllPropertiesPage() {
  const { properties, deleteProperty } = useAdminData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);

  const types = useMemo(() => Array.from(new Set(properties.map((p) => p.type))), [properties]);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || (p.location || '').toLowerCase().includes(q));
    }
    if (statusFilter !== 'All') list = list.filter((p) => p.status === statusFilter.toLowerCase());
    if (typeFilter !== 'All') list = list.filter((p) => p.type === typeFilter);

    if (sortBy === 'newest') list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (sortBy === 'oldest') list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (sortBy === 'price-asc') list.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === 'price-desc') list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortBy === 'title') list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [properties, query, statusFilter, typeFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDeleteConfirm = () => {
    deleteProperty(pendingDelete.id);
    showToast('Property deleted.');
    setPendingDelete(null);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Properties</h1>
          <p>{properties.length} total listings</p>
        </div>
        <div className="admin-page-actions">
          <Link to="/admin/properties/add" className="admin-btn admin-btn-primary">
            <IconPlusCircle width={16} height={16} /> Add Property
          </Link>
        </div>
      </div>

      <div className="admin-table-toolbar">
        <div className="admin-input-prefix" style={{ maxWidth: 280 }}>
          <span><IconSearch width={15} height={15} /></span>
          <input placeholder="Search by title or location" value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        </div>
        <select className="admin-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option>All</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select className="admin-select" value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}>
          <option>All</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select className="admin-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-table-wrap">
          <EmptyState
            icon={IconBuilding}
            title="No properties found"
            subtitle={properties.length === 0 ? 'Add your first property to get started.' : 'Try adjusting your search or filters.'}
            actionLabel={properties.length === 0 ? '+ Add Property' : undefined}
            onAction={properties.length === 0 ? () => navigate('/admin/properties/add') : undefined}
          />
        </div>
      ) : (
        <>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Beds/Baths</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <SafeImage src={p.photos?.[0]?.url} alt="" style={{ width: 56, height: 44, borderRadius: 8 }} />
                        <span className="admin-table-title">{p.title}</span>
                      </div>
                    </td>
                    <td>{p.location || 'Not available'}</td>
                    <td>{p.type}</td>
                    <td>{p.priceLabel}</td>
                    <td>{p.bedrooms} bd / {p.bathrooms} ba</td>
                    <td><span className={'admin-badge admin-badge-' + p.status}>{p.status}</span></td>
                    <td>{new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="admin-btn admin-btn-icon admin-btn-sm" title="View on site"
                          onClick={() => window.open('/property/' + p.id, '_blank')}>
                          <IconEye width={14} height={14} />
                        </button>
                        <Link className="admin-btn admin-btn-icon admin-btn-sm" title="Edit" to={'/admin/properties/' + p.id + '/edit'}>
                          <IconEdit width={14} height={14} />
                        </Link>
                        <button className="admin-btn admin-btn-icon admin-btn-sm" title="Delete" onClick={() => setPendingDelete(p)}>
                          <IconTrash width={14} height={14} style={{ color: '#C0453A' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="admin-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} className={n === page ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>
              ))}
            </div>
          )}
        </>
      )}

      {pendingDelete && (
        <ConfirmDeleteModal
          title="Delete Property?"
          itemName={pendingDelete.title}
          onCancel={() => setPendingDelete(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
