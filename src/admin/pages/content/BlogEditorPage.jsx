import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import FormField from '../../components/FormField';
import { IconUpload } from '../../components/icons';

const MAX_CONTENT = 8000;

function emptyBlog() {
  return {
    title: '', author: 'Arora Editorial Team', category: 'Guide', coverImage: '',
    excerpt: '', content: '', publishDate: new Date().toISOString().slice(0, 10), status: 'draft',
  };
}

export default function BlogEditorPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { blogs, addBlog, updateBlog } = useAdminData();
  const { showToast } = useToast();
  const existing = isEdit ? blogs.find((b) => b.id === id) : null;

  const [form, setForm] = useState(existing || emptyBlog());
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const handleImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setForm((f) => ({ ...f, coverImage: URL.createObjectURL(file) }));
  };

  const persist = (status) => {
    if (!form.title.trim()) { setError('Blog title is required.'); return; }
    const record = { ...form, status };
    if (isEdit) updateBlog(existing.id, record);
    else addBlog(record);
    showToast(status === 'published' ? '✓ Blog post published successfully' : 'Draft saved.');
    navigate('/admin/blog');
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h1>
          <p>Write and publish articles to the public Blog section.</p>
        </div>
      </div>

      <div className="admin-card">
        <FormField label="Blog Title" error={error}>
          <input className={'admin-input' + (error ? ' has-error' : '')} value={form.title}
            onChange={(e) => { setForm((f) => ({ ...f, title: e.target.value })); setError(''); }} />
        </FormField>

        <div className="admin-form-grid">
          <FormField label="Author">
            <input className="admin-input" value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
          </FormField>
          <FormField label="Category">
            <input className="admin-input" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
          </FormField>
        </div>

        <FormField label="Cover Image">
          {form.coverImage && (
            <div className="admin-image-thumb" style={{ width: 240, aspectRatio: '16/9', marginBottom: 10 }}>
              <img src={form.coverImage} alt="" />
            </div>
          )}
          <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => fileRef.current?.click()}>
            <IconUpload width={13} height={13} /> Upload Cover Image
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files[0])} />
        </FormField>

        <FormField label="Short Description">
          <textarea className="admin-textarea" rows={2} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
        </FormField>

        <FormField label="Content">
          <textarea className="admin-textarea" rows={12} maxLength={MAX_CONTENT} value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            placeholder="Write the full article here. Use blank lines to separate paragraphs." />
          <div className="admin-char-count">{form.content.length} / {MAX_CONTENT} characters</div>
        </FormField>

        <FormField label="Publish Date">
          <input type="date" className="admin-input" style={{ maxWidth: 220 }} value={form.publishDate}
            onChange={(e) => setForm((f) => ({ ...f, publishDate: e.target.value }))} />
        </FormField>
      </div>

      <div className="admin-wizard-actions">
        <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin/blog')}>← Back</button>
        <div className="admin-wizard-actions-right">
          <button className="admin-btn admin-btn-secondary" onClick={() => persist('draft')}>Save Draft</button>
          <button className="admin-btn admin-btn-primary" onClick={() => persist('published')}>Publish</button>
        </div>
      </div>
    </div>
  );
}
