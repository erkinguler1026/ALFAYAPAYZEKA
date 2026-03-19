# ALFAYAPAYZEKA — Frontend

React + Vite + Tailwind CSS v4 ile inşa edilmiş **Alfa Yapay Zeka Ajansı** web sitesinin frontend katmanıdır.

## 🚀 Kurulum & Çalıştırma

```bash
# Bağımlılıkları kur
npm install

# Geliştirme sunucusunu başlat (http://localhost:5173)
npm run dev

# Production build
npm run build
```

## ⚙️ Ortam Değişkenleri (.env)

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API adresi | `http://localhost:5000` |

## 🗂️ Sayfa Yapısı

| Route | Bileşen | Açıklama |
|---|---|---|
| `/` | `Home.jsx` | Ana sayfa (Landing Page), 11 bölüm |
| `/about` | `About.jsx` | Vizyon ve hizmet standartları |
| `/portfolio` | `Portfolio.jsx` | Proje vitrin sayfası |
| `/pricing` | `Pricing.jsx` | 4 fiyat paketi, TL/USD toggle |
| `/contact` | `Contact.jsx` | İletişim formu (POST /api/contact) |

## 🛠️ Teknoloji Yığını

| Paket | Versiyon | Kullanım |
|---|---|---|
| React | 19 | UI bileşen kütüphanesi |
| Redux Toolkit | 2 | Merkezi state yönetimi |
| React Redux | 9 | React-Redux bağlantısı |
| React Router DOM | 7 | URL yönlendirme |
| Vite | 8 | Build & dev sunucusu |
| Tailwind CSS | 4 | Utility-first CSS |
| Framer Motion | 12 | Animasyonlar |
| Lucide React | 0.577 | İkonlar |
| Axios | 1.13 | HTTP istekleri |
| React Toastify | 11 | Bildirim sistemi |

## 📁 Dizin Yapısı

```
frontend/
├── public/            # Statik dosyalar
├── src/
│   ├── assets/        # Görseller
│   ├── components/    # Ortak bileşenler (Header, Footer, Layout)
│   ├── pages/         # Sayfa bileşenleri (Home, About, Portfolio vb.)
│   ├── store/         # Redux Toolkit (Store ve Slices)
│   ├── App.jsx        # Router ve global yapı
│   ├── main.jsx       # Provider ve giriş noktası
│   └── index.css      # Tailwind + global stiller
├── .env               # API URL gibi çevre değişkenleri
├── vite.config.js     # Vite yapılandırması
└── tailwind.config.js # Tailwind eklenti ayarları
```
