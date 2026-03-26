/**
 * backend/index.js — Node.js/Express API Sunucusu (V1.4.0)
 *
 * Versiyon: V1.4.0 | Port: 5000 (varsayılan)
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
  const { name, email, message, website, company, phone, subject, type } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ status: 'Error', message: 'Lütfen isim ve e-posta alanlarını doldurun.' });
  }

  const finalSubject = subject || `Web Sitesi İletişim Formu: ${name}`;
  const displayMessage = message || (type === 'snap-report' ? 'Snap Report (Hızlı Risk Analizi) talebi oluşturuldu.' : 'İletişim formu dolduruldu.');
  
  console.log(`New Inquiry [${type || 'contact'}]: ${name} (${email})`);
  
  try {
    const mailOptions = {
      from: `"${name}" <${process.env.CONTACT_SENDER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: finalSubject,
      text: `Ad Soyad: ${name}\nEmail: ${email}\nTelefon: ${phone || '-'}\nŞirket: ${company || '-'}\nWebsite: ${website || '-'}\nTip: ${type || 'Genel'}\n\nMesaj:\n${displayMessage}`,
      html: `
        <h3>Yeni İletişim Formu / Talep</h3>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || '-'}</p>
        <p><strong>Şirket:</strong> ${company || '-'}</p>
        <p><strong>Website:</strong> ${website || '-'}</p>
        <p><strong>Talep Tipi:</strong> ${type || 'Genel'}</p>
        <hr/>
        <p><strong>Mesaj/Detay:</strong></p>
        <p>${displayMessage}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ status: 'Success', message: 'Talebiniz başarıyla iletildi! En kısa sürede size döneceğiz.' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ status: 'Error', message: 'Mesaj gönderilirken bir hata oluştu.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
