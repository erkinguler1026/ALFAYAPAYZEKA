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
import Offer from './pages/Offer';
import Legal from './pages/Legal';
import WebRisk from './pages/WebRisk';
import AIPentest from './pages/AIPentest';
import ContractView from './pages/ContractView';

/**
 * App Bileşeni — Uygulamanın Kök Bileşeni (V1.4.0)
 *
 * Açıklama: Uygulamanın ana yönlendirme (routing) ve bağlam (context) yapısını kurar.
 * Versiyon: V1.4.0 | Tarih: Mart 2026
 *
 * Teknik Detaylar:
 *   - React Router v7 ile dinamik sayfa geçişleri.
 *   - Redux Toolkit üzerinden merkezi UI ve İş Mantığı senkronizasyonu.
 *   - Toastify ile global bildirim yönetimi.
 *   - AI-PENTEST ve Sözleşme Sistemi rotaları.
 *
 * © 2026 ALFA YAPAY ZEKA — Siber Tehditlere Kapalı, Müşterilere Açık.
 */
const App = () => {
  React.useEffect(() => {
    console.log("ALFA YAPAY ZEKA — Sistem Başlatıldı V1.4.0 — Redux & Router Aktif.");
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
          <Route path="offer" element={<Offer />} />
          <Route path="privacy" element={<Legal />} />
          <Route path="terms" element={<Legal />} />
          <Route path="kvkk" element={<Legal />} />
          <Route path="cookie" element={<Legal />} />
          <Route path="web-risk-raporu" element={<WebRisk />} />
          <Route path="ai-pentest" element={<AIPentest />} />
        </Route>
        <Route path="sozlesme/:type" element={<ContractView />} />
      </Routes>
    </>
  );
};

export default App;
