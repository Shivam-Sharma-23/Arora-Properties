import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import './styles/grid.css';
import './styles/responsive.css';
import './admin/styles/admin.css';
import { ToastProvider } from './hooks/useToast';
import { FavoritesProvider } from './hooks/useFavorites';
import { SearchModeProvider } from './hooks/useSearchMode';
import { AdminDataProvider } from './admin/context/AdminDataContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AdminDataProvider>
          <FavoritesProvider>
            <SearchModeProvider>
              <App />
            </SearchModeProvider>
          </FavoritesProvider>
        </AdminDataProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
