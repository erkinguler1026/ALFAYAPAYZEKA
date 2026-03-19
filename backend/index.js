/**
 * backend/index.js — Node.js/Express API Sunucusu
 *
 * Versiyon: 1.0.0 | Port: 5000 (varsayılan)
 *
 * Bağımlılıklar:
 *   - express   : HTTP sunucu çerçevesi; route tanımları ve middleware yönetimi.
 *   - cors       : Frontend'den (localhost:5173) gelen cross-origin isteklere izin verir.
 *   - morgan     : Her HTTP isteğini 'dev' formatında konsola loglar (geşmiş yok olur).
 *   - dotenv     : .env dosyasındaki BREVO_SMTP_USER, BREVO_SMTP_KEY,
 *                  CONTACT_SENDER, CONTACT_RECEIVER değişkenlerini process.env'e yükler.
 *   - nodemailer : E-posta gönderimi için Brevo SMTP rölesi kullanır.
 *
 * NOT: 'bcryptjs' package.json'da mevcut ama henüz kullanılmıyor.
 *      İleride kullanıcı kimlik doğrulama (auth) eklenirse buraya import edilecek.
 *
 * Endpoint'ler:
 *   GET  /api/health  → Sunucunun ayakta olduğunu doğrular.
 *   POST /api/contact → İletişim formundan gelen veriyi Brevo SMTP ile e-posta olarak gönderir.
 */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Agency Backend is running' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ status: 'Error', message: 'Lütfen tüm alanları doldurun.' });
  }

  console.log(`New Inquiry: ${name} (${email}) - ${message}`);
  
  try {
    const mailOptions = {
      from: `"${name}" <${process.env.CONTACT_SENDER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `Web Sitesi İletişim Formu: ${name}`,
      text: `Ad Source: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`,
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p><strong>Mesaj:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ status: 'Success', message: 'Mesajınız başarıyla iletildi! En kısa sürede size döneceğiz.' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ status: 'Error', message: 'Mesaj gönderilirken bir hata oluştu.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
