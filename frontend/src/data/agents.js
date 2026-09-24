export const AGENTS = [
  { id: 1, name: 'Aarav Mehta', role: 'Senior Property Advisor', location: 'Gurgaon', listings: 38, rating: 4.9, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Priya Nair', role: 'Property Consultant', location: 'Mumbai', listings: 45, rating: 4.8, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Rohan Kapoor', role: 'Senior Property Advisor', location: 'Bangalore', listings: 52, rating: 4.9, photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Simran Kaur', role: 'Property Consultant', location: 'Pune', listings: 29, rating: 4.7, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
];

export function getAgentById(id) {
  return AGENTS.find((a) => a.id === id) || AGENTS[0];
}
