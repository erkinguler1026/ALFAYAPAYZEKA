# src/components/ — Paylaşılan Bileşenler

Bu dizin, uygulamanın birden fazla safyasında veya genel şablonunda kullanılan tekrar kullanılabilir React bileşenlerini içerir.

## 🧩 Layout.jsx (Ana Şablon)

`Layout` bileşeni, React Router `Outlet` bileşenini sarmalayarak tüm sayfalarda tutarlı bir üst bilgi (Navbar) ve alt bilgi (Footer) sunar.

### Özellikler:
- **Responsive Navbar**: Mobil hamburger menüsü (`isOpen` state'i) ve masaüstü yan yana linkler içerir.
- **Aktif Link Takibi**: Helper bileşen `NavLink` kullanılarak, kullanıcının bulunduğu sayfaya göre linklerin stili (mor/mavi gradient vurgu) otomatik ayarlanır.
- **Glassmorphism Footer**: Alt bilgide logo, iletişim bağlantıları ve telif hakkı mesajı cam efekti ile (backdrop-blur) sunulur. Ayrıca sayfanın en altında mor-siyah dikey bir gradient geçişi (`bg-gradient-to-b from-transparent to-[#0a0a0c] via-purple-900/10`) uygulanmıştır.
- **Dinamik Yönlendirme Kontrolü**: `Link` (react-router-dom) kullanılarak sayfalar arası tek sayfa uygulaması (SPA) deneyimi kesintisiz sağlanır.
