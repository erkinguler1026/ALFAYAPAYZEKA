# src/components/ — Paylaşılan Bileşenler

> **Versiyon:** V1.4.0 | **Tarih:** Mart 2026

Bu dizin, uygulamanın birden fazla sayfasında kullanılan tekrar kullanılabilir React bileşenlerini içerir.

---

## 🧩 Bileşen Kataloğu

### `Layout.jsx` — Ana Şablon
React Router `Outlet` sarmalayıcısı. Tüm sayfalarda tutarlı Header + Footer sağlar.
- Tüm rota geçişlerinde kalıcı olarak render edilir.

### `Header.jsx` — Üst Gezinti Barı
- Masaüstü yatay menü + mobil hamburger menüsü (Redux `uiSlice` kontrolü).
- Aktif link vurgulaması (`NavLink` ile).
- **Admin Butonu:** `isLocalEnvironment()` kontrolü ile yalnızca `localhost`'ta görünür.
  - Tıklandığında `AdminPasswordModal` açılır.
  - Şifre (`eg941965`) onaylanırsa `sessionStorage.admin_auth = 'true'` set edilir, `/admin-panel`'e yönlendirilir.

### `Footer.jsx` — Alt Bilgi
- Logo, site haritası bağlantıları, telif hakkı ve yasal linkler.
- Glassmorphism tasarım (backdrop-blur).

### `AdminPasswordModal.jsx` — Yönetici Şifre Doğrulama
- Şifre: `eg941965` (kullanıcı tarafından belirlendi).
- Başarılı girişte: `sessionStorage.admin_auth = 'true'` → `/admin-panel` yönlendirme.
- Başarısız girişte: Kırmızı hata efekti (1 saniyelik reset).
- Toast bildirimi: `react-toastify` kullanır.

### `MatrixRain.jsx` — Matrix Yağmur Animasyonu
- `<canvas>` tabanlı Matrix yağmur efekti.
- Props: `opacity`, `color`, `fontSize`, `speed` — tüm sayfalarda özelleştirilebilir.

### `CampaignCountdown.jsx` — Kampanya Geri Sayım
- "Dijital Zırh 60" kampanyasının bitiş tarihine göre canlı geri sayım.
- Kampanya bitiş: `31 Mayıs 2026` (bileşen içinde sabit).

### `CampaignModal.jsx` — Kampanya Popup
- Ana sayfa kampanya banner'ına tıklandığında açılan detay modalı.
- `window` event (`open-campaign-modal`) ile tetiklenir.

---

© 2026 **ALFA YAPAY ZEKA** — Siber Tehditlere Kapalı, Müşterilere Açık.
