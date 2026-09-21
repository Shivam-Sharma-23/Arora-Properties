import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminGuard from './admin/AdminGuard';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminLayout from './admin/components/AdminLayout';
import DashboardPage from './admin/pages/DashboardPage';
import AllPropertiesPage from './admin/pages/properties/AllPropertiesPage';
import PropertyFormPage from './admin/pages/properties/PropertyFormPage';
import HeroCmsPage from './admin/pages/homepage/HeroCmsPage';
import LocationsCmsPage from './admin/pages/homepage/LocationsCmsPage';
import ExpertsCmsPage from './admin/pages/homepage/ExpertsCmsPage';
import FaqCmsPage from './admin/pages/content/FaqCmsPage';
import BlogCmsPage from './admin/pages/content/BlogCmsPage';
import BlogEditorPage from './admin/pages/content/BlogEditorPage';
import ReviewsPage from './admin/pages/ReviewsPage';
import SettingsPage from './admin/pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route index element={<DashboardPage />} />
        <Route path="properties" element={<AllPropertiesPage />} />
        <Route path="properties/add" element={<PropertyFormPage />} />
        <Route path="properties/:id/edit" element={<PropertyFormPage />} />
        <Route path="homepage/hero" element={<HeroCmsPage />} />
        <Route path="homepage/locations" element={<LocationsCmsPage />} />
        <Route path="homepage/experts" element={<ExpertsCmsPage />} />
        <Route path="faqs" element={<FaqCmsPage />} />
        <Route path="blog" element={<BlogCmsPage />} />
        <Route path="blog/new" element={<BlogEditorPage />} />
        <Route path="blog/:id/edit" element={<BlogEditorPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
