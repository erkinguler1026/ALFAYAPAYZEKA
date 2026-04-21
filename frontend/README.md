# ALFAYAPAYZEKA — Frontend

> **Sürüm:** V1.7.0 "Forensic Edition" | **Tarih:** Nisan 2026 | **Durum:** 🟢 Aktif / Production

React + Vite + Tailwind CSS v4 ile inşa edilmiş **Alfa Yapay Zeka Ajansı** web sitesinin frontend katmanıdır. V1.7.0 sürümü ile birlikte "Forensic Minimalism" tasarım dili ve dinamik Teknik Analiz (X-RAY V3) katmanı entegre edilmiştir.

---

## 🚀 Kurulum & Çalıştırma

```bash
# Bağımlılıkları kur
npm install

# Geliştirme sunucusunu başlat (http://localhost:5173)
npm run dev

# Production build (dist/ klasörüne çıktı alır)
npm run build
```

---

## ⚙️ Ortam Değişkenleri (.env)

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API adresi | `http://localhost:5000` |

---

## 🗂️ Tam Sayfa & Route Haritası

| Route | Bileşen | Erişim | Açıklama |
|---|---|---|---|
| `/` | `Home.jsx` | Herkese açık | Ana sayfa — 11 bölüm, Hero + CTA |
| `/about` | `About.jsx` | Herkese açık | Vizyon ve hizmet standartları |
| `/portfolio` | `Portfolio.jsx` | Herkese açık | Proje vitrin sayfası |
| `/pricing` | `Pricing.jsx` | Herkese açık | 4 fiyat paketi |
| `/contact` | `Contact.jsx` | Herkese açık | İletişim formu |
| `/offer` | `Offer.jsx` | Herkese açık | Kampanya teklif sayfası |
| `/snap-report` | `SnapReport.jsx` | Herkese açık | Dijital Zırh 60 kampanya formu |
| `/ai-pentest` | `AIPentest.jsx` | Herkese açık | AI destekli pentest tanıtım |
| `/web-risk-raporu` | `WebRisk.jsx` | Herkese açık | Web risk analiz bilgi sayfası |
| `/scorecard` | `SnapScoreCard.jsx` | Token ile erişim | ALFA SNAP (Hızlı) rapor |
| `/full-scorecard` | `FullScoreCard.jsx` | Admin / Token | ALFA FULL (X-RAY V3) Skor Kartı |
| `/formal-report` | `FullFormalReport.jsx` | Admin / Token | 250 Sayfalık Resmi Pentest Raporu |
| `/audit-generator` | `AuditReportGenerator.jsx` | Admin + Token | Rapor üretim ve konfigürasyon |
| `/admin-panel` | `AdminDashboard.jsx` | **Yalnızca Local** | Rapor mühendislik paneli |
| `/sozlesme/:type` | `ContractView.jsx` | Herkese açık | Sözleşme görüntüleyici |
| `/privacy`, `/terms`, `/kvkk`, `/cookie` | `Legal.jsx` | Herkese açık | Yasal metinler |

---

## 🧩 Bileşenler (src/components/)

| Bileşen | Açıklama |
|---|---|
| `Header.jsx` | Navbar, mobil menü, Admin butonu (yalnızca localhost'ta görünür) |
| `Footer.jsx` | Site haritası, yasal bağlantılar, telif hakkı |
| `Layout.jsx` | Header + Outlet + Footer sarmalayıcısı |
| `AdminPasswordModal.jsx` | Şifre doğrulama modalı — `eg941965` onayı ile `/admin-panel` yönlendirir |
| `MatrixRain.jsx` | Canvas tabanlı Matrix yağmur animasyonu |
| `CampaignCountdown.jsx` | Kampanya bitiş geri sayım sayacı |
| `CampaignModal.jsx` | "Dijital Zırh 60" kampanya açılır popup |

---

## 🔧 Yardımcı Modüller (src/utils/)

### `api.js` — Merkezi API İstemcisi
- **`isLocalEnvironment()`** — `localhost` / `127.0.0.1` tespiti
- **`submitContactForm(data)`** — Local: Backend SMTP | Production: Web3Forms
- **`apiClient`** — HTML yanıt tespiti + otomatik port fallback (8080)
- **`API_ENDPOINTS`** — Tüm API adreslerinin merkezi deposu

---

## 🗃️ State Yönetimi (src/store/)

| Dosya | Açıklama |
|---|---|
| `store/index.js` | Redux Toolkit store yapılandırması — V1.7.0 |
| `store/slices/uiSlice.js` | Mobil menü açılış/kapanış ve UI durum yönetimi |

---

## 📊 Rapor Sistemi (V3.0)

| Rapor Türü | Bileşen | PDF Dosya Adı Formatı |
|---|---|---|
| **ALFA SNAP** | `SnapScoreCard.jsx` | `ALFA_SNAP_PENETRASYON_RAPORU_DOMAIN_TARIH` |
| **ALFA FULL** | `FullFormalReport.jsx` | `ALFA_FULL_PENETRASYON_RAPORU_DOMAIN_TARIH` |

---

## 🛠️ Teknoloji Yığını

| Paket | Versiyon | Kullanım |
|---|---|---|
| React | 19 | UI bileşen kütüphanesi |
| Redux Toolkit | 2 | Merkezi state yönetimi |
| React Redux | 9 | React-Redux bağlantısı |
| React Router DOM | 7 | URL yönlendirme |
| Vite | 6+ | Build & dev sunucusu |
| Tailwind CSS | 4 | Utility-first CSS |
| Framer Motion | 11+ | Animasyonlar |
| Lucide React | 0.500+ | İkonlar |
| Axios | 1.x | HTTP istekleri |
| React Toastify | 11+ | Bildirim sistemi |

---

## 📁 Dizin Yapısı

```
frontend/
├── public/                 # Statik dosyalar
├── src/
│   ├── assets/             # Görseller
│   ├── components/         # Ortak bileşenler
│   ├── pages/              # Sayfa bileşenleri
│   │   ├── freePages/      # Ücretsiz servisler (Snap)
│   │   ├── fullPages/      # Profesyonel denetim (Full)
│   │   │   ├── FullFormalReport.jsx
│   │   │   ├── FullScoreCard.jsx
│   │   │   └── FullReportTechAnalysisPage.jsx
│   │   └── AdminDashboard.jsx
│   ├── store/              # Redux Toolkit
│   ├── utils/              # API ve Yardımcılar
│   ├── App.jsx             # Router
│   ├── main.jsx            # Giriş
│   └── index.css           # Global CSS
├── .env                    # Değişkenler
└── vite.config.js          # Vite Config
```ice.js
│   ├── utils/
│   │   └── api.js          # Merkezi API istemcisi
│   ├── App.jsx             # Router ve global yapı
│   ├── main.jsx            # Provider ve giriş noktası
│   └── index.css           # Tailwind + global stiller
├── .env                    # API URL gibi çevre değişkenleri
├── vite.config.js          # Vite yapılandırması
└── tailwind.config.js      # Tailwind eklenti ayarları
```

---

© 2026 **ALFA YAPAY ZEKA** — Siber Tehditlere Kapalı, Müşterilere Açık.
