export function filterProperties(properties, { buyRent, filters, searchQuery, sortBy }) {
  let list = properties.filter((p) => p.buyRent === buyRent);
  if (filters.type !== 'Any') list = list.filter((p) => p.type === filters.type);
  if (filters.bedrooms !== 'Any') list = list.filter((p) => p.bedrooms >= parseInt(filters.bedrooms, 10));
  if (filters.bathrooms !== 'Any') list = list.filter((p) => p.bathrooms >= parseInt(filters.bathrooms, 10));
  list = list.filter((p) => p.price <= filters.priceMax);
  if (filters.newConstruction) list = list.filter((p) => p.yearBuilt >= 2023);
  if (filters.parking) list = list.filter((p) => p.amenities.includes('Parking'));
  if (filters.pool) list = list.filter((p) => p.amenities.includes('Swimming Pool'));
  if (filters.garden) list = list.filter((p) => p.amenities.includes('Garden'));
  if (filters.petFriendly) list = list.filter((p) => p.petFriendly);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter((p) => p.location.toLowerCase().includes(q));
  }
  list = list.slice();
  if (sortBy === 'newest') list.sort((a, b) => b.yearBuilt - a.yearBuilt);
  else if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
  return list;
}
