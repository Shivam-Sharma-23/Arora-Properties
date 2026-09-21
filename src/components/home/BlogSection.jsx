import { useAdminData } from '../../admin/context/AdminDataContext';
import './BlogSection.css';

export default function BlogSection() {
  const { blogs } = useAdminData();
  const published = blogs.filter((b) => b.status === 'published');

  return (
    <section id="blog" className="resource-section">
      <h2 style={{ fontSize: 'clamp(24px,3.2vw,32px)' }}>From the Blog</h2>
      <p>Notes on markets, design and moving well.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {published.map((post) => (
          <div className="blog-card" key={post.id}>
            <p className="blog-meta">{post.publishDate} · {post.category}</p>
            <h3>{post.title}</h3>
            <p className="blog-excerpt">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
