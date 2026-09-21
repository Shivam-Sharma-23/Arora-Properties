import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PROPERTIES } from '../../data/properties';
import { AGENTS } from '../../data/agents';
import { LOCATIONS } from '../../data/locations';
import { FAQ_ITEMS } from '../../data/faqItems';
import { BLOG_POSTS } from '../../data/blogPosts';
import { generateId } from '../utils/id';
import { formatPriceLabel } from '../utils/formatPrice';

const STORAGE_KEY = 'arora-admin-data';
const SEED_DATE = '2026-01-15T09:00:00.000Z';

const AMENITY_LOOKUP = {
  pool: 'Swimming Pool',
  gym: 'Gym',
  garden: 'Garden',
  security: 'Security',
  parking: 'Parking',
};

function emptyHighlights() {
  return {
    locationConnectivity: [],
    amenitiesWellness: [],
    propertyFeatures: [],
    securityFeatures: [],
  };
}

function seedHighlightsFromAmenities(amenities = []) {
  const h = emptyHighlights();
  amenities.forEach((a) => {
    if (a === 'Swimming Pool' || a === 'Gym' || a === 'Garden') {
      h.amenitiesWellness.push({ id: generateId('hl'), label: a });
    } else if (a === 'Security') {
      h.securityFeatures.push({ id: generateId('hl'), label: '24x7 Security' });
    } else if (a === 'Parking') {
      // represented via parking fields instead
    } else {
      h.propertyFeatures.push({ id: generateId('hl'), label: a });
    }
  });
  return h;
}

function seedProperties() {
  return PROPERTIES.map((p) => ({
    id: p.id,
    title: p.title,
    type: p.type,
    buyRent: p.buyRent,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    rating: p.rating,
    featured: !!p.featured,
    agentId: p.agentId,

    buildupArea: p.areaNum,
    carpetArea: Math.round(p.areaNum * 0.85),
    age: Math.max(0, 2026 - p.yearBuilt),
    yearBuilt: p.yearBuilt,
    balconies: 1,
    furnishingType: 'Semi Furnished',
    coveredParking: p.amenities.includes('Parking') ? 1 : 0,
    openParking: 0,

    tenantPreference: 'Family',
    bachelorPreference: null,
    petFriendly: !!p.petFriendly,

    availableFrom: '',
    price: p.price,
    priceLabel: p.priceLabel,
    maintenanceCharges: 'Included in Rent',
    maintenanceAmount: null,
    securityDeposit: '2 Months',
    securityDepositCustom: null,
    lockInPeriod: 'None',
    lockInCustom: null,
    brokerage: 'None',
    brokerageCustom: null,
    brokerageNegotiable: 'No',
    carpetAreaConfirmed: true,

    parkingCharges: 'Included in Rent',
    parkingChargesAmount: null,
    paintingCharges: 'None',
    paintingChargesAmount: null,
    facing: 'North',
    address: { flat: '', building: '', street: '', locality: '', city: p.location, state: '', pincode: '' },
    servantRoom: 'No',
    description: p.description,

    photos: p.images.map((url, i) => ({
      id: generateId('photo'),
      url,
      category: i === 0 ? 'Exterior' : 'Other',
      isCover: i === 0,
    })),
    photoVerification: {},

    highlights: seedHighlightsFromAmenities(p.amenities),

    status: 'published',
    createdAt: SEED_DATE,
    updatedAt: SEED_DATE,
  }));
}

function seedExperts() {
  return AGENTS.map((a) => ({ ...a, managedProperties: a.listings }));
}

function seedLocations() {
  return LOCATIONS.map((l) => ({ id: generateId('loc'), ...l }));
}

function seedFaqs() {
  return FAQ_ITEMS.map((f, i) => ({ id: generateId('faq'), order: i, ...f }));
}

function seedBlogs() {
  return BLOG_POSTS.map((b, i) => ({
    id: generateId('blog'),
    title: b.title,
    author: 'Arora Editorial Team',
    category: b.category,
    coverImage: '',
    excerpt: b.excerpt,
    content: b.excerpt,
    publishDate: b.date,
    status: 'published',
    order: i,
  }));
}

function seedReviews() {
  return [
    {
      id: generateId('rev'),
      propertyId: 1,
      propertyTitle: 'Modern Glass Villa',
      reviewerName: 'Nikhil Bansal',
      rating: 5,
      reviewText: 'The villa exceeded expectations — exactly as photographed, and the agent was very responsive throughout.',
      date: '2026-02-02',
      status: 'approved',
    },
    {
      id: generateId('rev'),
      propertyId: 3,
      propertyTitle: 'Palm Heights',
      reviewerName: 'Sana Qureshi',
      rating: 4,
      reviewText: 'Great location and view. Would have liked a slightly faster response on maintenance queries.',
      date: '2026-03-11',
      status: 'pending',
    },
  ];
}

function seedHero() {
  return {
    heading: 'Find a home that fits your life.',
    subtitle: "Explore carefully selected properties in the world's most desirable locations.",
    searchPlaceholder: 'City, locality',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
  };
}

function seedAll() {
  return {
    properties: seedProperties(),
    locations: seedLocations(),
    experts: seedExperts(),
    faqs: seedFaqs(),
    blogs: seedBlogs(),
    reviews: seedReviews(),
    hero: seedHero(),
  };
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.properties) return parsed;
    }
  } catch (e) {
    /* fall through to seed */
  }
  return seedAll();
}

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

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [data, setData] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* storage full or unavailable — edits stay in-memory for this session */
    }
  }, [data]);

  // ---- Properties ----
  const addProperty = useCallback((property) => {
    const now = new Date().toISOString();
    const id = property.id || (Math.max(0, ...data.properties.map((p) => Number(p.id) || 0)) + 1);
    const priceLabel = formatPriceLabel(property.price, property.buyRent);
    const record = { ...property, id, priceLabel, createdAt: now, updatedAt: now };
    setData((d) => ({ ...d, properties: [record, ...d.properties] }));
    return record;
  }, [data.properties]);

  const updateProperty = useCallback((id, patch) => {
    setData((d) => ({
      ...d,
      properties: d.properties.map((p) => {
        if (p.id !== id) return p;
        const merged = { ...p, ...patch, updatedAt: new Date().toISOString() };
        merged.priceLabel = formatPriceLabel(merged.price, merged.buyRent);
        return merged;
      }),
    }));
  }, []);

  const deleteProperty = useCallback((id) => {
    setData((d) => ({ ...d, properties: d.properties.filter((p) => p.id !== id) }));
  }, []);

  const getProperty = useCallback((id) => data.properties.find((p) => String(p.id) === String(id)), [data.properties]);

  // ---- Locations ----
  const addLocation = useCallback((loc) => {
    const record = { id: generateId('loc'), ...loc };
    setData((d) => ({ ...d, locations: [...d.locations, record] }));
  }, []);
  const updateLocation = useCallback((id, patch) => {
    setData((d) => ({ ...d, locations: d.locations.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  }, []);
  const deleteLocation = useCallback((id) => {
    setData((d) => ({ ...d, locations: d.locations.filter((l) => l.id !== id) }));
  }, []);
  const reorderLocation = useCallback((id, direction) => {
    setData((d) => {
      const list = [...d.locations];
      const idx = list.findIndex((l) => l.id === id);
      const swapWith = idx + direction;
      if (idx < 0 || swapWith < 0 || swapWith >= list.length) return d;
      [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
      return { ...d, locations: list };
    });
  }, []);

  // ---- Experts ----
  const addExpert = useCallback((expert) => {
    const record = { id: Math.max(0, ...data.experts.map((e) => Number(e.id) || 0)) + 1, ...expert };
    setData((d) => ({ ...d, experts: [...d.experts, record] }));
  }, [data.experts]);
  const updateExpert = useCallback((id, patch) => {
    setData((d) => ({ ...d, experts: d.experts.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  }, []);
  const deleteExpert = useCallback((id) => {
    setData((d) => ({ ...d, experts: d.experts.filter((e) => e.id !== id) }));
  }, []);
  const reorderExpert = useCallback((id, direction) => {
    setData((d) => {
      const list = [...d.experts];
      const idx = list.findIndex((e) => e.id === id);
      const swapWith = idx + direction;
      if (idx < 0 || swapWith < 0 || swapWith >= list.length) return d;
      [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
      return { ...d, experts: list };
    });
  }, []);

  // ---- FAQs ----
  const addFaq = useCallback((faq) => {
    setData((d) => ({ ...d, faqs: [...d.faqs, { id: generateId('faq'), order: d.faqs.length, ...faq }] }));
  }, []);
  const updateFaq = useCallback((id, patch) => {
    setData((d) => ({ ...d, faqs: d.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
  }, []);
  const deleteFaq = useCallback((id) => {
    setData((d) => ({ ...d, faqs: d.faqs.filter((f) => f.id !== id) }));
  }, []);
  const reorderFaq = useCallback((id, direction) => {
    setData((d) => {
      const list = [...d.faqs].sort((a, b) => a.order - b.order);
      const idx = list.findIndex((f) => f.id === id);
      const swapWith = idx + direction;
      if (idx < 0 || swapWith < 0 || swapWith >= list.length) return d;
      [list[idx], list[swapWith]] = [list[swapWith], list[idx]];
      list.forEach((f, i) => { f.order = i; });
      return { ...d, faqs: list };
    });
  }, []);

  // ---- Blogs ----
  const addBlog = useCallback((blog) => {
    const record = { id: generateId('blog'), order: data.blogs.length, ...blog };
    setData((d) => ({ ...d, blogs: [record, ...d.blogs] }));
    return record;
  }, [data.blogs]);
  const updateBlog = useCallback((id, patch) => {
    setData((d) => ({ ...d, blogs: d.blogs.map((b) => (b.id === id ? { ...b, ...patch } : b)) }));
  }, []);
  const deleteBlog = useCallback((id) => {
    setData((d) => ({ ...d, blogs: d.blogs.filter((b) => b.id !== id) }));
  }, []);

  // ---- Reviews ----
  const updateReview = useCallback((id, patch) => {
    setData((d) => ({ ...d, reviews: d.reviews.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
  }, []);
  const deleteReview = useCallback((id) => {
    setData((d) => ({ ...d, reviews: d.reviews.filter((r) => r.id !== id) }));
  }, []);

  // ---- Hero ----
  const updateHero = useCallback((patch) => {
    setData((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
  }, []);

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
