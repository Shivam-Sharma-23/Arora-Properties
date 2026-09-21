import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useToast } from './useToast';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'havenly-favorites';

export function FavoritesProvider({ children }) {
  const { showToast } = useToast();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch (e) {
      /* ignore malformed storage */
    }
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const has = prev.includes(id);
      const next = has ? prev.filter((f) => f !== id) : prev.concat([id]);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        /* ignore quota errors */
      }
      showToast(has ? 'Removed from your favorites' : 'Added to your favorites');
      return next;
    });
  }, [showToast]);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
