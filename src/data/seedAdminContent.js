import { PROPERTIES } from './properties.js';
import { AGENTS } from './agents.js';
import { LOCATIONS } from './locations.js';
import { FAQ_ITEMS } from './faqItems.js';
import { BLOG_POSTS } from './blogPosts.js';
import { generateId } from '../admin/utils/id.js';

const SEED_DATE = '2026-01-15T09:00:00.000Z';

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

export function seedAll() {
  return {
    properties: seedProperties(),
    locations: seedLocations(),
    experts: seedExperts(),
    faqs: seedFaqs(),
    blogs: seedBlogs(),
    reviews: seedReviews(),
    hero: seedHero(),
    _meta: { updatedAt: SEED_DATE },
  };
}
