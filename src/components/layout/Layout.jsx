import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MobileNavDrawer from './MobileNavDrawer';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import Toast from '../common/Toast';

export default function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF9F5', display: 'flex', flexDirection: 'column' }}>
      <Navbar onToggleMobileNav={() => setMobileNavOpen((v) => !v)} />
      {mobileNavOpen && <MobileNavDrawer onClose={() => setMobileNavOpen(false)} />}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toast />
    </div>
  );
}
