# 🛡️ ALFA YAPAY ZEKA — Kurumsal Siber Güvenlik ve AI Ajansı Web Portalı

> **Sürüm:** V1.4.0 | **Tarih:** Mart 2026 | **Durum:** 🟢 Aktif / Production
>
> **Son Güncelleme:** 31.03.2026 — Admin şifresi onay modalı, ALFA SNAP & ALFA FULL rapor isimlendirmesi, `.com.tr` domain parse düzeltmesi, cursor-pointer iyileştirmeleri.

**ALFA YAPAY ZEKA**, kurumsal işletmelere yönelik yapay zeka tabanlı siber güvenlik hizmetleri sunan profesyonel bir web platformudur. Müşteri iletişiminden otomatik güvenlik raporu üretimine kadar tüm iş akışlarını kapsar.

---

## 🗂️ Proje Mimarisi

```
ALFAYAPAYZEKA/
├── frontend/          → React + Vite SPA (Port 5173)
│   └── src/
│       ├── pages/     → Sayfa bileşenleri (routing hedefleri)
│       ├── components/→ Paylaşılan UI bileşenleri
│       ├── utils/     → API istemcisi ve yardımcı fonksiyonlar
│       ├── store/     → Redux Toolkit durum yönetimi
│       └── data/      → Sözleşme ve statik içerik verileri
└── backend/           → Node.js + Express REST API (Port 5000)
    ├── index.js       → Ana sunucu ve endpoint tanımları
    └── utils/
        ├── db.js      → JSON tabanlı rapor veritabanı (token yönetimi)
        └── auditFrame.js → Audit rapor çerçeve verisi
```

---

## 🚀 Özellikler

| Özellik | Açıklama |
|---|---|
| 🏠 **Ana Sayfa** | Hero, özellikler, CTA ve "Dijital Zırh 60" kampanya bölümleri |
| 📋 **Snap Report Formu** | Müşteri bilgilerini alır, e-posta bildirimi gönderir |
| 🔒 **Admin Şifreli Giriş** | `eg941965` şifre modalı; onay sonrası `/admin-panel` yönlendirir |
| 📊 **Security Scorecard** | Token tabanlı güvenlik skor kartı (ALFA SNAP PDF çıktısı) |
| 📄 **Full Audit Generator** | 250 sayfalık profesyonel pentest raporu (ALFA FULL PDF) |
| 📨 **E-posta Sistemi** | Brevo SMTP (local) + Web3Forms (production) çift-kanal desteği |
| ⚖️ **Sözleşme Sistemi** | PDF uyumlu hukuki metinler (`/sozlesme/:type`) |
| 🎨 **Matrix Arayüz** | Canvas tabanlı Matrix animasyonu, Glassmorphism, Dark Mode |

---

## 🗺️ Sayfa Haritası (Routing)

| URL | Bileşen | Erişim |
|---|---|---|
| `/` | `Home.jsx` | Herkese açık |
| `/offer` | `Offer.jsx` | Herkese açık (Kampanya) |
| `/ai-pentest` | `AIPentest.jsx` | Herkese açık |
| `/pricing` | `Pricing.jsx` | Herkese açık |
| `/portfolio` | `Portfolio.jsx` | Herkese açık |
| `/about` | `About.jsx` | Herkese açık |
| `/contact` | `Contact.jsx` | Herkese açık |
| `/snap-report` | `SnapReport.jsx` | Herkese açık (Kampanya formu) |
| `/scorecard` | `SecurityScorecard.jsx` | Token ile erişim (Magic Link) |
| `/audit-generator` | `AuditReportGenerator.jsx` | Admin + Token |
| `/admin-panel` | `AdminDashboard.jsx` | **Yalnızca Local** |
| `/sozlesme/:type` | `ContractView.jsx` | Herkese açık |
| `/privacy`, `/terms`, `/kvkk`, `/cookie` | `Legal.jsx` | Herkese açık |

---

## ⚡ Hızlı Başlatma (Local Geliştirme)

İki ayrı terminal açın:

### Terminal 1 — Backend API
```bash
cd backend
npm install
npm run dev
# ✅ Beklenen: [ALFA-SERVER] Running in DEV (5000) mode
```

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
# ✅ Beklenen: VITE ready → http://localhost:5173
```

> **Admin Paneline Erişim:** Local ortamda Header'daki kırmızı `● ADMIN` butonuna tıklayın.  
> Üretim ortamında bu buton **otomatik olarak gizlenir**.

---

## 🔐 İş Akışı: Snap Report → Magic Link → PDF

```
Müşteri → /snap-report formu doldurur
    ↓
Backend → Brevo SMTP ile admin'e bildirim gönderir
    ↓
Backend → Müşteri e-postasına "Magic Link" gönderir
         (Token UUID, 3 görüntüleme hakkı)
    ↓
Müşteri → /scorecard?token=UUID linkini açar
    ↓
Scorecard → PDF İndir butonu ile raporu kaydeder
```

> **Production'da:** Web3Forms üzerinden yönlendirme yapılır.  
> **Local'de:** Doğrudan Brevo SMTP kullanılır (backend .env gerektirir).

---

## 🔧 Ortam Değişkenleri

### `backend/.env`
```env
PORT=5000
BREVO_SMTP_USER=kullanici@brevo.com
BREVO_SMTP_KEY=xsmtp-api-key-buraya
CONTACT_SENDER=noreply@alfayapayzeka.com
CONTACT_RECEIVER=info@alfayapayzeka.com
```

### `frontend/.env`
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🛠️ Teknoloji Yığını

### Frontend
| Paket | Sürüm | Kullanım |
|---|---|---|
| React | v19 | UI bileşen kütüphanesi |
| Vite | v6+ | Geliştirme sunucusu ve build aracı |
| React Router DOM | v7 | İstemci tarafı yönlendirme |
| Redux Toolkit | v2 | Global durum yönetimi (UI, menü) |
| Framer Motion | v11 | Animasyon ve geçiş sistemi |
| Tailwind CSS | v4 | Utility-first CSS |
| Lucide React | — | İkon kütüphanesi |
| Axios | — | HTTP istemcisi |
| React Toastify | — | Bildirim sistemi |

### Backend
| Paket | Kullanım |
|---|---|
| Express.js | HTTP sunucu çerçevesi |
| Nodemailer | Brevo SMTP e-posta gönderimi |
| CORS | Cross-origin izinleri |
| Morgan | HTTP istek loglama |
| Dotenv | Ortam değişkeni yönetimi |
| Nodemon | Geliştirme otomatik yeniden başlatma |

---

## 📋 Geliştirici Notları

- **ADMIN Butonu:** `isLocalEnvironment()` fonksiyonu (`utils/api.js`) `localhost` kontrolü yapar.  
  Production'da ADMIN butonu hiçbir zaman render edilmez.
- **Admin Giriş Modalı:** `AdminPasswordModal.jsx` — şifre onaylanmış ise `sessionStorage.admin_auth = 'true'` seti ile `/admin-panel` yönlendirilir.
- **Domain Parse:** `com.tr` ve `gov.tr` gibi çok parçalı TLD'ler için `getCleanDomain()` fonksiyonu  
  `new URL().hostname` ile güvenli parse eder. `.replace('.COM', '')` türü string manipülasyonlardan kaçınılmalıdır.
- **Rapor İsimlendirme:** Snap Report PDF'i `ALFA_SNAP_PENETRASYON_RAPORU_DOMAIN_TARIH` formatında, Full Audit PDF'i `ALFA_FULL_PENETRASYON_RAPORU_DOMAIN_TARIH` formatında kaydedilir.
- **Rapor Token Sistemi:** `backend/data/reports.json` dosyasında saklanır.  
  Her token maksimum **3 görüntüleme** hakkına sahiptir.
- **Admin Backdoor Token:** `ALFA_JOKER_ADMIN_777` — Admin paneli için sonsuz erişim sağlayan sabit token (production env variable'a taşınması önerilir).

---

## 🌐 Deployment

| Platform | Branch | URL |
|---|---|---|
| Vercel (Frontend) | `main` | `https://www.alfayapayzeka.com` |
| Backend | Ayrı servis (Cloudflare/VPS) | Port 8080 (production) |

> Her `git push main` sonrasında Vercel otomatik deploy tetiklenir (~1-2 dakika).

---

© 2026 **ALFA YAPAY ZEKA** — Siber Tehditlere Kapalı, Müşterilere Açık.
