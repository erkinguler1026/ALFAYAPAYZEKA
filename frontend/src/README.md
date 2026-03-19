# src/ — Frontend Kaynak Kodları

React uygulamasının tüm kaynak dosyalarını barındıran ana dizin.

## 📁 Dizin & Dosya Açıklamaları

```
src/
├── App.jsx         # Kök bileşen — React Router yapısı + ToastContainer
├── main.jsx        # Giriş noktası — DOM'a mount, StrictMode + BrowserRouter
├── index.css       # Tailwind v4 import + CSS değişkenleri + özel sınıflar
├── assets/         # Statik varlıklar (logo, görseller)
├── components/     # Paylaşılan bileşenler (Layout.jsx)
└── pages/          # Sayfa bileşenleri (Home, About, Portfolio, Pricing, Contact)
```

## 🎨 Stil Sistemi (index.css)

| CSS Değişkeni | Değer | Kullanım |
|---|---|---|
| `--primary` | `#6366f1` | Ana mor-indigo renk |
| `--secondary` | `#a855f7` | İkincil mor |
| `--accent` | `#22d3ee` | Turkuaz vurgu |
| `--background` | `#0a0a0c` | Koyu arka plan |

| Özel Sınıf | Açıklama |
|---|---|
| `.bg-mesh` | Fixed radial gradient arka plan |
| `.glass-morphism` | Cam efekti (backdrop-blur) kartlar |
| `.premium-card` | Yarı şeffaf kenarlıklı kart |
| `.text-gradient` | Beyaz → şeffaf beyaz degradesi metin |
| `.pricing-card.popular` | Öne çıkan fiyat kartı stili |
| `.symmetric-frame` | Kare aspect-ratio çerçeve |

## 🔄 Routing Akışı

```
BrowserRouter (main.jsx)
  └── App.jsx
        └── Routes
              └── "/" → Layout.jsx (Navbar + Footer)
                    ├── index → Home.jsx
                    ├── /about → About.jsx
                    ├── /portfolio → Portfolio.jsx
                    ├── /pricing → Pricing.jsx
                    └── /contact → Contact.jsx
```
