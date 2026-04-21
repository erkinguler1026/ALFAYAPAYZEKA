# ⚛️ ALFA YAPAY ZEKA — Frontend (React / Vite SPA)

> **Sürüm:** V1.4.0 | **Framework:** React v19 + Vite v6 | **Port:** 5173 (dev)
>
> **Son Güncelleme:** 31.03.2026 — Admin şifreli giriş (şifre onay modalı), ALFA SNAP & ALFA FULL PDF isimlendirmesi, domain parse düzeltmesi.

ALFA YAPAY ZEKA platformunun tam istemci-tarafı uygulamasıdır. Dark mode Glassmorphism tasarım sistemi, Matrix animasyonu, dinamik PDF rapor üretimi ve e-posta entegrasyonunu barındırır.

---

## 🚀 Kurulum ve Çalıştırma

```bash
npm install
npm run dev      # Geliştirme sunucusu → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Build önizleme
```

---

## 📂 Klasör Yapısı

```
src/
├── App.jsx              # Uygulama kökü — Route tanımları
├── main.jsx             # React DOM, Redux Provider, Router
├── index.css            # Global CSS, Tailwind direktifleri, özel değişkenler
├── App.css              # App düzeyinde ek stiller
│
├── pages/               # Routing hedefi sayfalar
│   ├── Home.jsx         # Ana sayfa (Hero, Özellikler, Kampanya CTA)
│   ├── Offer.jsx        # "Dijital Zırh 60" kampanya sayfası
│   ├── SnapReport.jsx   # Snap Report başvuru formu (B2C lead-gen)
│   ├── SnapScoreCard.jsx  # Token tabanlı güvenlik skor kartı + PDF
│   ├── AuditReportGenerator.jsx # 250 sayfalık Full Audit rapor motoru
│   ├── AdminDashboard.jsx      # Admin panel (yalnızca local)
│   ├── AIPentest.jsx    # AI-PENTEST hizmet tanıtım sayfası
│   ├── Pricing.jsx      # Fiyatlandırma tablosu
│   ├── Portfolio.jsx    # Müşteri/proje portföyü
│   ├── About.jsx        # Hakkımızda
│   ├── Contact.jsx      # Genel iletişim formu
│   ├── Legal.jsx        # KVKK / Gizlilik / Şartlar (çok amaçlı)
│   ├── ContractView.jsx # Hizmet sözleşmesi görüntüleyici (/sozlesme/:type)
│   └── WebRisk.jsx      # Web Risk analiz bilgi sayfası
│
├── components/          # Paylaşılan yeniden kullanılabilir bileşenler
│   ├── Header.jsx       # Navigasyon barı (Desktop + Mobile drawer)
│   ├── Footer.jsx       # Site alt bilgisi
│   ├── Layout.jsx       # Header + Outlet + Footer sarmalayıcı
│   ├── MatrixRain.jsx   # Canvas tabanlı Matrix animasyonu
│   ├── CampaignModal.jsx     # Kampanya açılır penceresi
│   ├── CampaignCountdown.jsx # Geri sayım sayacı (deadline)
│   └── AdminPasswordModal.jsx # Admin şifre doğrulama modalı (eg941965 şifre onayı → /admin-panel)
│
├── utils/
│   └── api.js           # Merkezi API istemcisi, ortam tespiti, Web3Forms
│
├── store/               # Redux Toolkit durum yönetimi
│   └── slices/
│       └── uiSlice.js   # Mobil menü ve UI durumu
│
└── data/
    └── contracts.js     # Tüm hukuki sözleşme metinleri (merkezi)
```

---

## 🗺️ Sayfa Bileşenleri Referansı

### Ana Sayfalar

| Bileşen | Route | Açıklama |
|---|---|---|
| `Home.jsx` | `/` | Hero, AI özellikleri, kampanya CTA, müşteri logoları |
| `Offer.jsx` | `/offer` | "Dijital Zırh 60" kampanya detayı ve Snap Report yönlendirmesi |
| `SnapReport.jsx` | `/snap-report` | Müşteri lead-gen formu; submission → Brevo/Web3Forms → Magic Link |
| `AIPentest.jsx` | `/ai-pentest` | AI destekli pentest hizmet açıklama sayfası |
| `Pricing.jsx` | `/pricing` | Paket karşılaştırma ve fiyat tabloları |
| `Portfolio.jsx` | `/portfolio` | Referans müşteri ve proje gösterimi |
| `About.jsx` | `/about` | Şirket ve ekip tanıtımı |
| `Contact.jsx` | `/contact` | Genel iletişim formu (Web3Forms entegrasyonu) |

### Rapor Sistemi

| Bileşen | Route | Açıklama |
|---|---|---|
| `SnapScoreCard.jsx` | `/scorecard?token=...` | Magic Link doğrulama, Snap Report görüntüleme, PDF çıktısı |
| `AuditReportGenerator.jsx` | `/audit-generator?site=...` | 250 sayfalık Full Audit rapor motoru, baskı optimizasyonu |
| `AdminDashboard.jsx` | `/admin-panel` | Domain URL girişi, Snap/Full rapor seçimi (**Yalnızca Local**) |

### Destek Sayfaları

| Bileşen | Route | Açıklama |
|---|---|---|
| `Legal.jsx` | `/privacy`, `/terms`, `/kvkk`, `/cookie` | Tek bileşen, route'a göre içerik değişir |
| `ContractView.jsx` | `/sozlesme/:type` | Hizmet türüne göre sözleşme metni |
| `WebRisk.jsx` | `/web-risk-raporu` | Web risk farkındalık sayfası |

---

## 🧩 Bileşen Referansı

### `MatrixRain.jsx`
Canvas tabanlı Matrix karakter yağmuru animasyonu. `requestAnimationFrame` ile çalışır, `ResizeObserver` ile responsive'dir.

**Props:**
```jsx
<MatrixRain
  opacity={0.15}      // 0.0 – 1.0 (varsayılan: 0.18)
  color="#00ff41"     // CSS renk kodu (varsayılan: Matrix yeşil)
  fontSize={14}       // Karakter boyutu piksel (varsayılan: 14)
  speed={0.8}         // Hız çarpanı (varsayılan: 1 = ~50ms interval)
/>
```

### `Header.jsx`
Masaüstü ve mobil navigasyon. Redux `uiSlice` üzerinden mobil menü durumu yönetilir.

- **Desktop:** Yatay nav linkleri + "Başlayın" CTA butonu
- **Mobile:** Hamburger butonu → tam ekran drawer menü (AnimatePresence)
- **Admin Butonu:** Yalnızca `isLocalEnvironment() === true` iken render edilir

### `CampaignModal.jsx` / `CampaignCountdown.jsx`
"Dijital Zırh 60" kampanyasının açılır modal ve geri sayım bileşenleri.  
Countdown hedef tarih sabit olarak tanımlanmıştır.

---

## 🔌 API Katmanı (`utils/api.js`)

```js
import { submitContactForm, isLocalEnvironment, apiClient } from './utils/api';
```

### `isLocalEnvironment()`
`window.location.hostname === 'localhost'` kontrolü. Admin butonu görünürlüğü ve  
form gönderimi yönlendirmesi bu fonksiyona dayanır.

### `submitContactForm(data)`
Ortama göre otomatik yönlendirme:
- **Local:** Backend `/api/contact` (Brevo SMTP)  
- **Production:** Web3Forms API (serverless, ücretsiz)

### `apiClient`
Axios tabanlı akıllı istemci. API isteği HTML döndürürse (proxy sorunu)  
otomatik olarak doğrudan port fallback ile yeniden dener.

---

## 🎨 Tasarım Sistemi

Tasarım değişkenleri `index.css` içinde CSS custom properties olarak tanımlanmıştır:

```css
:root {
  --color-primary: #00ff41;   /* Matrix yeşil — ana vurgu rengi */
  --color-accent:  #ff2222;   /* Kırmızı — uyarı/tehdit rengi */
  --bg-dark:       #050505;   /* Ana arka plan */
}
```

**Tailwind Sınıfları:**
- `text-primary` → `--color-primary`
- `bg-primary` → `--color-primary`
- `border-primary` → `--color-primary`

---

## 📋 Önemli Geliştirici Notları

- **Admin Güvenliği:** `isLocalEnvironment()` production'da admin rotasını gizler.  
  Ancak URL doğrudan girilirse erişilebilir — ek auth için `sessionStorage` kontrolü mevcuttur.
- **Domain Parse:** `com.tr` gibi çok parçalı TLD'ler için `new URL().hostname` kullanın.  
  `.replace('.COM', '').COM` gibi string manipülasyonlarından kaçının.
- **PDF Çıktısı:** `window.print()` ile tetiklenir. `document.title` PDF dosya adını belirler.  
  Print CSS sınıfları `print:hidden` / `print:block` olarak uygulanmıştır.
- **Framer Motion Gecikmeleri:** Bileşen hiyerarşisindeki animasyon `delay` değerleri  
  sistematik olarak kurgulanmıştır. Sıralama değiştirilirse `delay` değerlerini gözden geçirin.

---

© 2026 **ALFA YAPAY ZEKA** — Siber Tehditlere Kapalı, Müşterilere Açık.
