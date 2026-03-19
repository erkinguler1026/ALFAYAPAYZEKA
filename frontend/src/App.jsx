import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- SAYFA BİLEŞENLERİ (PAGES) ---
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

/**
 * App Bileşeni — Uygulamanın Kök Bileşeni
 *
 * Versiyon: V1.3.0 | Tarih: Mart 2026
 *
 * Bu bileşen uygulamanın ana "Router" (Yönlendirme) yapısını barındırır:
 * - 'react-router-dom' (v7) kullanılarak URL bazlı sayfa geçişleri yönetilir.
 * - <ToastContainer /> ile uygulama genelindeki anlık bildirimler (başarı/hata
 *   uyarıları) sağ alt köşede gösterilir.
 * - Tüm sayfalar (<Home>, <About>, <Portfolio>, <Pricing>, <Contact>) ortak
 *   <Layout /> bileşeni (Navbar + Footer) içine nested route olarak yerleştirilir.
 *
 * Routing Yapısı:
 *   / → Layout (Navbar + Footer)
 *     ├── index → Home
 *     ├── /about → About
 *     ├── /portfolio → Portfolio
 *     ├── /pricing → Pricing
 *     └── /contact → Contact
 */
const App = () => {
  React.useEffect(() => {
    // Versiyon numarası Hero bölümündeki sürüm etiketiyle senkronize tutulmalıdır.
    console.log("Alfa Yapay Zeka — App Initialized V1.3.0");
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" theme="dark" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
