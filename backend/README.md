# ALFAYAPAYZEKA — Backend

Node.js + Express tabanlı **Alfa Yapay Zeka Ajansı** API katmanıdır.
İletişim formundan gelen mesajları Brevo SMTP aracılığıyla e-posta olarak iletir.

## 🚀 Kurulum & Çalıştırma

```bash
# Bağımlılıkları kur
npm install

# Geliştirme sunucusu (nodemon ile otomatik yeniden başlatma)
npm run dev

# Production başlatma
npm start
```

> Sunucu varsayılan olarak **http://localhost:5000** adresinde çalışır.

## ⚙️ Ortam Değişkenleri (.env)

| Değişken | Açıklama |
|---|---|
| `PORT` | Sunucu portu (varsayılan: 5000) |
| `BREVO_SMTP_USER` | Brevo SMTP kullanıcı adı (e-posta) |
| `BREVO_SMTP_KEY` | Brevo SMTP API anahtarı |
| `CONTACT_SENDER` | Formdan gönderen e-posta adresi |
| `CONTACT_RECEIVER` | Formun iletileceği hedef e-posta |

## 📡 API Endpoint'leri

### `GET /api/health`
Sunucunun çalışır durumda olduğunu doğrular.

**Yanıt:**
```json
{ "status": "OK", "message": "AI Agency Backend is running" }
```

---

### `POST /api/contact`
İletişim formundan gelen veriyi Brevo SMTP ile e-posta olarak gönderir.

**Gövde (JSON):**
```json
{
  "name": "Ad Soyad veya Firma",
  "email": "kullanici@example.com",
  "message": "Mesaj içeriği"
}
```

**Başarı Yanıtı (200):**
```json
{ "status": "Success", "message": "Mesajınız başarıyla iletildi!" }
```

**Hata Yanıtı (400 — eksik alan):**
```json
{ "status": "Error", "message": "Lütfen tüm alanları doldurun." }
```

## 🛠️ Teknoloji Yığını

| Paket | Kullanım |
|---|---|
| express | HTTP sunucu çerçevesi |
| cors | Cross-origin izinleri |
| morgan | HTTP istek loglama |
| dotenv | .env yükleme |
| nodemailer | SMTP e-posta gönderimi |
| bcryptjs | (Henüz kullanılmıyor — auth için hazır) |
| nodemon | Geliştirme otomatik yeniden başlatma |
