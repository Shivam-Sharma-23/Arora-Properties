import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { seedAll } from '../../data/seedAdminContent';
import siteContent from '../../data/siteContent.json';
import { generateId } from '../utils/id';
import { formatPriceLabel } from '../utils/formatPrice';
import { syncContentToGitHub } from '../utils/syncClient';
import { useToast } from '../../hooks/useToast';

const STORAGE_KEY = 'arora-admin-data';

function parseCount(value) {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : n;
}

export function deriveAmenities(property) {
  const list = [];
  (property.highlights?.amenitiesWellness || []).forEach((h) => list.push(h.label));
  (property.highlights?.propertyFeatures || []).forEach((h) => list.push(h.label));
  if (parseCount(property.coveredParking) > 0 || parseCount(property.openParking) > 0) list.push('Parking');
  (property.highlights?.securityFeatures || []).forEach((h) => {
    if (/security/i.test(h.label)) list.push('Security');
  });
  return Array.from(new Set(list));
}

export function derivePublicProperty(property) {
  const sortedPhotos = [...(property.photos || [])].sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0));
  const images = sortedPhotos.length ? sortedPhotos.map((p) => p.url) : [];
  return {
    ...property,
    bathrooms: parseCount(property.bathrooms),
    balconies: parseCount(property.balconies),
    yearBuilt: property.yearBuilt || (property.age !== '' && property.age != null ? new Date().getFullYear() - Number(property.age) : null),
    areaNum: property.buildupArea,
    area: (property.buildupArea ? Number(property.buildupArea).toLocaleString('en-IN') : '0') + ' sq.ft',
    images: images.length ? images : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80'],
    amenities: deriveAmenities(property),
    petFriendly: property.petFriendly === true || property.petFriendly === 'Yes',
  };
}

// The bundled siteContent.json is committed by admin saves and rebuilt into
// the app on every deploy, so it's always today's published truth. A local
// draft only wins over it if it's genuinely newer than the last deploy
// (i.e. it hasn't made it into a commit/redeploy yet).
function loadInitial() {
  const bundled = siteContent && siteContent.properties ? siteContent : seedAll();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.properties) {
        const bundledAt = bundled._meta?.updatedAt || '';
        const localAt = parsed._meta?.updatedAt || '';
        return localAt > bundledAt ? parsed : bundled;
      }
    }
  } catch (e) {
    /* fall through to bundled */
  }
  return bundled;
}

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [data, setData] = useState(loadInitial);
  const dataRef = useRef(data);
  const { showToast } = useToast();

  useEffect(() => {
    dataRef.current = data;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* storage full or unavailable — edits stay in-memory for this session */
    }
  }, [data]);

  // Applies `next` immediately (optimistic, stamped so it wins over the
  // bundled siteContent.json until a real deploy catches up — otherwise an
  // edit that fails to sync would silently disappear on the next reload),
  // and — when `publish` is true — pushes it to GitHub via the save-content
  // function so it becomes the real, shared, permanent state after
  // Netlify's next auto-deploy.
  const commit = useCallback((next, { publish }) => {
    const stampedNext = { ...next, _meta: { updatedAt: new Date().toISOString() } };
    setData(stampedNext);
    if (!publish) return;
    syncContentToGitHub(stampedNext).then((result) => {
      if (result.synced) {
        setData((d) => (d === stampedNext ? result.data : d));
      } else {
        showToast('⚠ Saved locally, but publishing to GitHub failed: ' + result.error);
      }
    });
  }, [showToast]);

  // ---- Properties ----
  const addProperty = useCallback((property) => {
    const now = new Date().toISOString();
    const id = property.id || (Math.max(0, ...dataRef.current.properties.map((p) => Number(p.id) || 0)) + 1);
    const priceLabel = formatPriceLabel(property.price, property.buyRent);
    const record = { ...property, id, priceLabel, createdAt: now, updatedAt: now };
    const next = { ...dataRef.current, properties: [record, ...dataRef.current.properties] };
    commit(next, { publish: record.status === 'published' });
    return record;
  }, [commit]);

  const updateProperty = useCallback((id, patch) => {
    let publish = false;
    const properties = dataRef.current.properties.map((p) => {
      if (p.id !== id) return p;
      const merged = { ...p, ...patch, updatedAt: new Date().toISOString() };
      merged.priceLabel = formatPriceLabel(merged.price, merged.buyRent);
      publish = merged.status === 'published';
      return merged;
    });
    commit({ ...dataRef.current, properties }, { publish });
  }, [commit]);

  const deleteProperty = useCallback((id) => {
    const properties = dataRef.current.properties.filter((p) => p.id !== id);
    commit({ ...dataRef.current, properties }, { publish: true });
  }, [commit]);

  const getProperty = useCallback((id) => data.properties.find((p) => String(p.id) === String(id)), [data.properties]);

  // ---- Locations ----
  const addLocation = useCallback((loc) => {
    const record = { id: generateId('loc'), ...loc };
    commit({ ...dataRef.current, locations: [...dataRef.current.locations, record] }, { publish: true });
  }, [commit]);
  const updateLocation = useCallback((id, patch) => {
    const locations = dataRef.current.locations.map((l) => (l.id === id ? { ...l, ...patch } : l));
    commit({ ...dataRef.current, locations }, { publish: true });
  }, [commit]);
  const deleteLocation = useCallback((id) => {
    const locations = dataRef.current.locations.filter((l) => l.id !== id);
    commit({ ...dataRef.current, locations }, { publish: true });
  }, [commit]);
  const reorderLocation = useCallback((id, direction) => {
    const list = [...dataRef.current.locations];
    const idx = list.findIndex((l) => l.id === id);
    const swapWith = idx + direction;
    if (idx < 0 || swapWith < 0 || swapWith >= list.length) return;
    [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
    commit({ ...dataRef.current, locations: list }, { publish: true });
  }, [commit]);

  // ---- Experts ----
  const addExpert = useCallback((expert) => {
    const record = { id: Math.max(0, ...dataRef.current.experts.map((e) => Number(e.id) || 0)) + 1, ...expert };
    commit({ ...dataRef.current, experts: [...dataRef.current.experts, record] }, { publish: true });
  }, [commit]);
  const updateExpert = useCallback((id, patch) => {
    const experts = dataRef.current.experts.map((e) => (e.id === id ? { ...e, ...patch } : e));
    commit({ ...dataRef.current, experts }, { publish: true });
  }, [commit]);
  const deleteExpert = useCallback((id) => {
    const experts = dataRef.current.experts.filter((e) => e.id !== id);
    commit({ ...dataRef.current, experts }, { publish: true });
  }, [commit]);
  const reorderExpert = useCallback((id, direction) => {
    const list = [...dataRef.current.experts];
    const idx = list.findIndex((e) => e.id === id);
    const swapWith = idx + direction;
    if (idx < 0 || swapWith < 0 || swapWith >= list.length) return;
    [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
    commit({ ...dataRef.current, experts: list }, { publish: true });
  }, [commit]);

  // ---- FAQs ----
  const addFaq = useCallback((faq) => {
    const record = { id: generateId('faq'), order: dataRef.current.faqs.length, ...faq };
    commit({ ...dataRef.current, faqs: [...dataRef.current.faqs, record] }, { publish: true });
  }, [commit]);
  const updateFaq = useCallback((id, patch) => {
    const faqs = dataRef.current.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f));
    commit({ ...dataRef.current, faqs }, { publish: true });
  }, [commit]);
  const deleteFaq = useCallback((id) => {
    const faqs = dataRef.current.faqs.filter((f) => f.id !== id);
    commit({ ...dataRef.current, faqs }, { publish: true });
  }, [commit]);
  const reorderFaq = useCallback((id, direction) => {
    const list = [...dataRef.current.faqs].sort((a, b) => a.order - b.order);
    const idx = list.findIndex((f) => f.id === id);
    const swapWith = idx + direction;
    if (idx < 0 || swapWith < 0 || swapWith >= list.length) return;
    [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
    list.forEach((f, i) => { f.order = i; });
    commit({ ...dataRef.current, faqs: list }, { publish: true });
  }, [commit]);

  // ---- Blogs ----
  const addBlog = useCallback((blog) => {
    const record = { id: generateId('blog'), order: dataRef.current.blogs.length, ...blog };
    commit({ ...dataRef.current, blogs: [record, ...dataRef.current.blogs] }, { publish: record.status === 'published' });
    return record;
  }, [commit]);
  const updateBlog = useCallback((id, patch) => {
    let publish = false;
    const blogs = dataRef.current.blogs.map((b) => {
      if (b.id !== id) return b;
      const merged = { ...b, ...patch };
      publish = merged.status === 'published';
      return merged;
    });
    commit({ ...dataRef.current, blogs }, { publish });
  }, [commit]);
  const deleteBlog = useCallback((id) => {
    const blogs = dataRef.current.blogs.filter((b) => b.id !== id);
    commit({ ...dataRef.current, blogs }, { publish: true });
  }, [commit]);

  // ---- Reviews ----
  const updateReview = useCallback((id, patch) => {
    const reviews = dataRef.current.reviews.map((r) => (r.id === id ? { ...r, ...patch } : r));
    commit({ ...dataRef.current, reviews }, { publish: true });
  }, [commit]);
  const deleteReview = useCallback((id) => {
    const reviews = dataRef.current.reviews.filter((r) => r.id !== id);
    commit({ ...dataRef.current, reviews }, { publish: true });
  }, [commit]);

  // ---- Hero ----
  const updateHero = useCallback((patch) => {
    commit({ ...dataRef.current, hero: { ...dataRef.current.hero, ...patch } }, { publish: true });
  }, [commit]);

  const resetAllData = useCallback(() => {
    setData(seedAll());
  }, []);

  const value = useMemo(() => ({
    ...data,
    addProperty, updateProperty, deleteProperty, getProperty,
    addLocation, updateLocation, deleteLocation, reorderLocation,
    addExpert, updateExpert, deleteExpert, reorderExpert,
    addFaq, updateFaq, deleteFaq, reorderFaq,
    addBlog, updateBlog, deleteBlog,
    updateReview, deleteReview,
    updateHero,
    resetAllData,
  }), [data, addProperty, updateProperty, deleteProperty, getProperty,
    addLocation, updateLocation, deleteLocation, reorderLocation,
    addExpert, updateExpert, deleteExpert, reorderExpert,
    addFaq, updateFaq, deleteFaq, reorderFaq,
    addBlog, updateBlog, deleteBlog,
    updateReview, deleteReview,
    updateHero, resetAllData]);

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
}
