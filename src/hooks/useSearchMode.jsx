import { createContext, useContext, useMemo, useState } from 'react';

const SearchModeContext = createContext(null);

export function SearchModeProvider({ children }) {
  const [buyRent, setBuyRent] = useState('buy');
  const value = useMemo(() => ({ buyRent, setBuyRent }), [buyRent]);
  return <SearchModeContext.Provider value={value}>{children}</SearchModeContext.Provider>;
}

export function useSearchMode() {
  const ctx = useContext(SearchModeContext);
  if (!ctx) throw new Error('useSearchMode must be used within a SearchModeProvider');
  return ctx;
}
