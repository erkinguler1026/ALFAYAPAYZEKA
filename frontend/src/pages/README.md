# src/pages/ — Ana Sayfa Bileşenleri

> **Versiyon:** V1.4.0 | **Tarih:** Mart 2026

Kullanıcının yönlendirildiği ayrı router görünümlerinin (view) bileşenleridir.

---

## 📄 Sayfa Kataloğu

| Dosya | Route | Erişim | Açıklama |
|---|---|---|---|
| `Home.jsx` | `/` | Herkese açık | Ana landing page — 11 bölüm, Hero + CTA |
| `About.jsx` | `/about` | Herkese açık | Vizyon ve hizmet standartları |
| `Portfolio.jsx` | `/portfolio` | Herkese açık | Proje vitrin sayfası |
| `Pricing.jsx` | `/pricing` | Herkese açık | 4 fiyat paketi, TL toggle |
| `Contact.jsx` | `/contact` | Herkese açık | Kurumsal iletişim formu |
| `Offer.jsx` | `/offer` | Herkese açık | Kampanya teklif sayfası |
| `SnapReport.jsx` | `/snap-report` | Herkese açık | Dijital Zırh 60 kampanya formu (8 güvenlik katmanı) |
| `AIPentest.jsx` | `/ai-pentest` | Herkese açık | AI destekli pentest hizmet tanıtımı |
| `WebRisk.jsx` | `/web-risk-raporu` | Herkese açık | Web risk analiz bilgi sayfası |
| `Legal.jsx` | `/privacy`, `/terms`, `/kvkk`, `/cookie` | Herkese açık | Yasal metinler (çok amaçlı) |
| `ContractView.jsx` | `/sozlesme/:type` | Herkese açık | Dinamik sözleşme görüntüleyici |
| `SecurityScorecard.jsx` | `/scorecard` | Token ile erişim | **ALFA SNAP** rapor görüntüleyici (Magic Link) |
| `AuditReportGenerator.jsx` | `/audit-generator` | Admin + Token | **ALFA FULL** 250-sayfa pentest raporu |
| `AdminDashboard.jsx` | `/admin-panel` | **Yalnızca Local** | Rapor mühendislik paneli |

---

## 🔑 Kritik Sayfa Notları

### `SnapReport.jsx` — Güvenlik Katmanları
8 katmanlı spam/bot koruması:
1. Honeypot (gizli alan)
2. Zamanlama kontrolü (< 5 saniye = bot)
3. Rate limiting (saatte maks 3 deneme)
4. Tekrar eden giriş engeli ("aaaaaa")
5. Ad yapısı kontrolü (en az 2 kelime)
6. Domain çapraz kontrol (email domain === URL domain)
7. Ücretsiz email engeli (gmail, yahoo vb. reddedilir)
8. Güven Skoru UI (canlı animasyonlu progress bar)

### `SecurityScorecard.jsx` — ALFA SNAP Raporu
- Token: `ALFA_JOKER_ADMIN_777` = sonsuz admin erişimi
- Token: UUID = 3 görüntüleme hakkı, 10 dakika oturum
- PDF dosya adı: `ALFA_SNAP_PENETRASYON_RAPORU_DOMAIN_TARIH`

### `AuditReportGenerator.jsx` — ALFA FULL Raporu
- 250 sayfalık simüle edilmiş pentest raporu
- PDF dosya adı: `ALFA_FULL_PENETRASYON_RAPORU_DOMAIN_TARIH`
- Admin paneli veya direkt token ile erişim

### `AdminDashboard.jsx` — Rapor Mühendislik Paneli
- Yalnızca `localhost` ortamında render edilir (`isLocalEnvironment()` kontrolü)
- SNAP REPORT → `/scorecard?token=ALFA_JOKER_ADMIN_777`
- FULL AUDIT → `/audit-generator?site=DOMAIN`

---

© 2026 **ALFA YAPAY ZEKA** — Siber Tehditlere Kapalı, Müşterilere Açık.
