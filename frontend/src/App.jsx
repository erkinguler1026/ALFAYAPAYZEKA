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
 * App Bileşeni
 * 
 * Bu bileşen uygulamanın ana "Router" (Yönlendirme) yapısını barındırır.
 * - 'react-router-dom' kullanılarak sayfa geçişleri yönetilir.
 * - <ToastContainer /> ile sistem genelindeki bildirimler (başarı/hata mesajları) gösterilir.
 * - Tüm sayfalar <Layout /> bileşeni (Header ve Footer barındıran sarmalayıcı) içinde render edilir.
 */
const App = () => {
  React.useEffect(() => {
    console.log("AI Web Studio App Initialized - V1.0.5");
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
