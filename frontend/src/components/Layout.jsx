import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout Bileşeni — Global Uygulama Çatısı (V1.4.0)
 * 
 * Açıklama: Tüm sayfalar için ortak olan Header, Footer ve mizanpaj (Padding/Margin)
 * yapılarını barındırır.
 * 
 * Özellikler:
 *   - Global Navbar (Header) ve Alt Bilgi (Footer) entegrasyonu.
 *   - Outlet üzerinden dinamik sayfa içeriği gösterimi.
 *   - Sayfa yüklenince otomatik "Scroll to Top" davranışı.
 * 
 * © 2026 ALFA YAPAY ZEKA — Siber Tehditlere Kapalı, Müşterilere Açık.
 *   2. <Outlet>: React Router'ın o anki URL'ye göre içeri yerleştirdiği
 *               dinamik sayfa bileşeni (Home, About, Portfolio vb.).
 *   3. Footer  : Altta yer alan site künyesi ve bağlantılar bölümü.
 *
 * Arka plan:
 *   - `.bg-mesh` sınıfı: index.css'te tanımlı radial gradient arka plan.
 *   - Header `fixed` konumlama ile scroll'da üstte kalır.
 *   - `<main>` alanına `pt-24` ile header yüksekliği kadar boşluk verilir.
 */
const Layout = () => {
  return (
    <div className="min-h-screen relative selection:bg-primary/30 bg-[#0a0a0c]">
      {/* Premium Background Mesh */}
      <div className="bg-mesh" />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10 pt-24">
        <Outlet />
      </main>

      {/* Premium Footer (PIXEL PERFECT TO 3097) */}
      <Footer />
    </div>
  );
};

export default Layout;
