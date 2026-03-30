# 🖥️ ALFA YAPAY ZEKA — Backend API Sunucusu

> **Sürüm:** V1.4.0 | **Platform:** Node.js + Express | **Port:** 5000 (dev) / 8080 (prod)
>
> **Son Güncelleme:** 31.03.2026 — Magic Link host tespiti iyileştirildi, Adaptive Port stratejisi belgenlendi.

ALFA YAPAY ZEKA platformunun sunucu tarafı katmanıdır. İletişim formlarından gelen müşteri taleplerini e-posta ile iletir, Snap Report için güvenli Magic Link (token) oluşturur ve token tabanlı rapor erişim kontrolü sağlar.

---

## 🚀 Kurulum ve Çalıştırma

```bash
# 1. Bağımlılıkları kur
npm install

# 2. .env dosyasını oluştur (aşağıdaki tabloya bak)
cp .env.example .env  # veya manuel olarak oluştur

# 3. Geliştirme sunucusunu başlat (nodemon ile otomatik yeniden başlatma)
npm run dev

# 4. Production başlatma
npm start
```

> ✅ `[ALFA-SERVER] Running in DEV (5000) mode` mesajını görürseniz başarılı.

---

## ⚙️ Ortam Değişkenleri (`.env`)

| Değişken | Açıklama | Örnek |
|---|---|---|
| `PORT` | Sunucu portu | `5000` |
| `BREVO_SMTP_USER` | Brevo SMTP kullanıcı adı (e-posta adresi) | `user@brevo.com` |
| `BREVO_SMTP_KEY` | Brevo SMTP API/şifre anahtarı | `xsmtp-...` |
| `CONTACT_SENDER` | Gönderen e-posta adresi (from) | `noreply@alfayapayzeka.com` |
| `CONTACT_RECEIVER` | Admin bildirim adresi (to) | `info@alfayapayzeka.com` |

> ⚠️ `.env` dosyası `.gitignore` ile versiyon kontrolünden hariç tutulmuştur. Asla commit etmeyin.

---

## 📡 API Endpoint Referansı

### `GET /api/health`
Sunucunun ayakta ve erişilebilir olduğunu doğrular.

**Yanıt (200 OK):**
```json
{ "status": "OK", "message": "AI Agency Backend is running" }
```

---

### `POST /api/contact`
İletişim formu, Snap Report talebi ve diğer müşteri formlarını işler.  
Brevo SMTP üzerinden admin'e bildirim maili gönderir.  
Tip `snap-report` ise müşteri e-postasına **Magic Link** de gönderilir.

**Gövde (JSON):**
```json
{
  "name":    "Erkin Güler",
  "email":   "erkin@firma.com",
  "phone":   "05324663076",
  "company": "ABC Kalite",
  "website": "https://www.abckalite.com",
  "subject": "Snap Report Talebi",
  "type":    "snap-report",
  "message": "Web güvenlik analizi istiyorum."
}
```

| Alan | Zorunlu | Açıklama |
|---|---|---|
| `name` | ✅ | Ad soyad veya yetkili kişi |
| `email` | ✅ | İletişim ve Magic Link gönderim adresi |
| `phone` | ❌ | Telefon numarası |
| `company` | ❌ | Şirket unvanı |
| `website` | ❌ (Snap için ✅) | Analiz edilecek domain |
| `subject` | ❌ | E-posta konusu (otomatik oluşturulur) |
| `type` | ❌ | `snap-report` \| `contact` \| `genel` |
| `message` | ❌ | Ek mesaj metni |

**Başarı Yanıtı (200):**
```json
{ "status": "Success", "message": "Talebiniz başarıyla iletildi! Gizli rapor bağlantısı E-posta adresinize gönderilecektir." }
```

**Hata Yanıtı (400 — eksik alan):**
```json
{ "status": "Error", "message": "Lütfen isim ve e-posta alanlarını doldurun." }
```

**Hata Yanıtı (500 — SMTP hatası):**
```json
{ "status": "Error", "message": "E-posta sistemi hatası: ...", "debug": "ECONNREFUSED" }
```

---

### `GET /api/report/:token`
Token ile rapor erişim doğrulaması yapar. Her token maksimum **3 görüntüleme** hakkına sahiptir.

**Özel Token:**
```
ALFA_JOKER_ADMIN_777  →  Sonsuz erişim (Admin backdoor)
```

**Başarı Yanıtı (200):**
```json
{ "success": true, "domain": "abckalite.com", "clicksLeft": 2 }
```

**Hata — Bulunamadı (404):**
```json
{ "success": false, "error": "RAPOR BULUNAMADI VEYA SİLİNMİŞ." }
```

**Hata — Limit Aşıldı (403):**
```json
{ "success": false, "error": "ERİŞİM REDDEDİLDİ. MAKSİMUM GÖRÜNTÜLEME LİMİTİ (3) AŞILDI." }
```

---

## 🗄️ Token Veritabanı (`data/reports.json`)

Raporlar JSON dosyasında saklanır (üretim için hafif, serverless uyumlu çözüm).  
Dosya yoksa otomatik oluşturulur.

**Kayıt Şeması:**
```json
{
  "id":        "550e8400-e29b-41d4-a716-446655440000",
  "domain":    "abckalite.com",
  "email":     "erkin@abckalite.com",
  "clicks":    1,
  "maxClicks": 3,
  "createdAt": 1743375600000
}
```

---

## 📧 E-posta İş Akışı

```
POST /api/contact (type: "snap-report")
    │
    ├─► Admin Maili (Brevo SMTP)
    │     Konu: "Snap Report Talebi: [name]"
    │     İçerik: Form verileri (name, email, phone, company, website)
    │
    └─► Müşteri Maili (Brevo SMTP)
          Konu: "GİZLİ: Web Güvenlik Raporunuz Hazır"
          İçerik: Magic Link butonu (3 kez açılabilir)
```

---

## 🛠️ Teknoloji Yığını

| Paket | Sürüm | Kullanım |
|---|---|---|
| `express` | ^4.x | HTTP sunucu çerçevesi, route yönetimi |
| `cors` | ^2.x | Frontend cross-origin isteklerine izin verir |
| `morgan` | ^1.x | HTTP istek loglama (`dev` formatı) |
| `dotenv` | ^16.x | `.env` değişken yükleyici |
| `nodemailer` | ^6.x | Brevo SMTP üzerinden e-posta gönderimi |
| `bcryptjs` | ^2.x | *(Henüz aktif değil — ilerideki auth için hazır)* |
| `nodemon` | ^3.x | Geliştirme otomatik yeniden başlatma |

---

## 🌐 Port Stratejisi

| Ortam | Port | Açıklama |
|---|---|---|
| `development` | `5000` | `.env` PORT değeri veya varsayılan |
| `production` | `8080` | Cloudflare uyumlu sabit port |

> Port seçimi `process.env.NODE_ENV` değerine göre `index.js` içinde otomatik yapılır.

---

## 📋 Geliştirici Notları

- **Magic Link Host Tespiti:** `req.headers.referer` üzerinden istemci origin'i otomatik tespit edilir.  
  Referer yoksa `https://www.alfayapayzeka.com` varsayılan olarak kullanılır.
- **bcryptjs:** Şu an import edilmiyor. İleride kullanıcı oturum sistemi eklenirse buraya entegre edilecek.
- **CORS:** Tüm origin'lere açık (`app.use(cors())`). Production'da kısıtlanabilir.

---

© 2026 **ALFA YAPAY ZEKA** — Siber Tehditlere Kapalı, Müşterilere Açık.
