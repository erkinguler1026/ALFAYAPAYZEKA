# Backend Klasörü
Bu klasör Node.js, Express ve Nodemailer temelli sunucu kodlarını barındırır.
Özellikle frontend üzerinden (iletişim formu vb.) gelen talepleri karşılamakla yükümlüdür.

## Başlatma Komutları
- `npm run dev` veya `node index.js`: API sunucusunu ayağa kaldırır (Genellikle port 5000).

## Özellikler
- `/api/contact` adresi üzerinden gelen verileri Brevo SMTP servisi aracılığıyla hedef e-posta adresine iletir.
- CORS ve Morgan kullanılarak gelen istekler güvenli bir şekilde denetlenir ve loglanır.
