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
import { createReport, getAndIncrementReport } from './utils/db.js';
import FreePentestEngine from './utils/freePentestEngine.js';
import { generateFullAudit } from './utils/fullPentestEngine.js';
import { generateFullPentestReport } from './utils/realFullPentestEngine.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Adaptive Port: Live (Cloudflare) uses 8080, Local uses 5000 (overrides .env in prod)
const PORT = process.env.NODE_ENV === 'production' ? 8080 : (process.env.PORT || 5000);
const ENV_LABEL = process.env.NODE_ENV === 'production' ? 'PROD (8080)' : 'DEV (5000)';

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

// Rate Limiter — Full Pentest V2.0 (Geliştirme aşamasında esnetildi: 2dk'da 10 istek)
const fullPentestLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,  // 2 dakika
  max: 10,                   // maks 10 istek (test sürecinde esneklik için)
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Hız sınırına takıldınız. Lütfen 2 dakika içinde çok fazla tarama yapmayın.' }
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
    // Send Email to Admin (Standard System Log)
    const adminMailOptions = {
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
    await transporter.sendMail(adminMailOptions);

    // B2C Magic Link Flow if it's a Snap Report
    if (type === 'snap-report' && website) {
      // --- GERÇEK ANALİZ BAŞLIYOR ---
      console.log(`[ALFA-SCAN] Deep analysis starting for: ${website}`);
      const scanner = new FreePentestEngine(website);
      const scanResults = await scanner.performFullScan();
      console.log(`[ALFA-SCAN] Analysis completed. Final Score: ${scanResults.score}`);

      const tokenId = await createReport(website, email, scanResults);
      // Dynamic Magic Link: Use Referer to determine host or default to production
      const host = req.headers.referer ? new URL(req.headers.referer).origin : 'https://www.alfayapayzeka.com';
      const magicLink = `${host}/scorecard?token=${tokenId}`;
      
      const userMailOptions = {
        from: `"Alfa Yapay Zeka" <${process.env.CONTACT_SENDER}>`,
        to: email, // Sending to the client who filled the form
        subject: 'GİZLİ: Web Güvenlik ve Sistem Analiz Raporunuz Hazır',
        html: `
          <div style="font-family: monospace; background-color: #020b14; color: #fff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #22d3ee;">ALFA YAPAY ZEKA SİBER GÜVENLİK BİRİMİ</h2>
            <p>Sayın ${name},</p>
            <p><strong>${website}</strong> altyapısı üzerinde gerçekleştirilen temel inceleme sonuçlanmıştır.</p>
            <p style="color: #ef4444; border: 1px solid #ef4444; padding: 10px; font-weight: bold;">
              DİKKAT: Üst düzey gizlilik protokolü gereği aşağıdaki şifreli bağlantı SADECE 3 KEZ açılabilir. Her oturum süresi güvenlik sebebiyle 10 DAKİKA ile sınırlandırılmıştır.
            </p>
            <br/>
            <a href="${magicLink}" style="display: inline-block; padding: 12px 24px; background-color: #06b6d4; color: #020b14; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 4px;">
              GİZLİ RAPORU GÖRÜNTÜLE
            </a>
            <br/><br/>
            <p style="color: #64748b; font-size: 11px;">Raporu inceledikten sonra 'PDF Çıktısı Al' butonunu kullanarak yerel kopyanızı arşivlemeniz önemle tavsiye edilir.</p>
            <p style="color: #64748b; font-size: 11px;">E. Güler | Güvenlik Takımı Yöneticisi</p>
          </div>
        `
      };
      await transporter.sendMail(userMailOptions);
    }

    res.json({ status: 'Success', message: 'Talebiniz başarıyla iletildi! Gizli rapor bağlantısı E-posta adresinize gönderilecektir.' });
  } catch (error) {
    console.error('--- EMAIL SYSTEM ERROR DETAILED ---');
    console.error('Code:', error.code);
    console.error('Response:', error.response);
    console.error('Stack:', error.stack);
    console.error('------------------------------------');
    res.status(500).json({ 
      status: 'Error', 
      message: 'E-posta sistemi hatası: ' + (error.message || 'Bilinmeyen hata'),
      debug: error.code
    });
  }
});

// Yeni Endpoint: Rapora Token ile Erişim Kontrolü
app.get('/api/report/:token', async (req, res) => {
  try {
    // --- JOKER ADMIN BACKDOOR ---
    if (req.params.token === 'ALFA_JOKER_ADMIN_777') {
      const site = req.query.site;
      let scanResults;
      if (site) {
        console.log(`[JOKER MODE] Live scanning requested for: ${site}`);
        const scanner = new FreePentestEngine(site);
        scanResults = await scanner.performFullScan();
        console.log(`[JOKER MODE] Scan completed for ${site}. Score: ${scanResults.score}`);
      } else {
        scanResults = {
          score: 88,
          grade: 'A',
          categories: {
            service: { name: "SERVİS GÜVENLİĞİ", health: 100, status: 'GÜVENLİ', findings: [] },
            headers: { name: "GÜVENLİK BAŞLIKLARI", health: 75, status: 'ORTA', findings: ["CSP başlığı eksik."] },
            network: { name: "AĞ PORT GÜVENLİĞİ", health: 100, status: 'GÜVENLİ', findings: [] },
            domain: { name: "DOMAIN & WHOIS", health: 90, status: 'GÜVENLİ', findings: ["WHOIS gizlilik koruması aktif."] },
            patching: { name: "YAZILIM & YAMA", health: 70, status: 'BİLGİ SIZINTISI', findings: ["Server bilgisi sızıyor (Nginx)"] }
          }
        };
      }
      return res.json({ 
        success: true, 
        domain: site || 'ALFA YÖNETIM_PANELI', 
        clicksLeft: 999,
        scanResults
      });
    }

    const report = await getAndIncrementReport(req.params.token);
    if (!report) {
      return res.status(404).json({ success: false, error: 'RAPOR BULUNAMADI VEYA SİLİNMİŞ.' });
    }
    if (report.error === 'ACCESS_DENIED_EXPIRED') {
      return res.status(403).json({ success: false, error: 'ERİŞİM REDDEDİLDİ. MAKSİMUM GÖRÜNTÜLEME LİMİTİ (3) AŞILDI.' });
    }
    
    res.json({ 
      success: true, 
      domain: report.domain, 
      clicksLeft: report.maxClicks - report.clicks,
      scanResults: report.scanResults // Gerçek bulgular artık dönülüyor
    });
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({ success: false, error: 'Sunucu hatası.' });
  }
});

// ══════════════════════════════════════════════════
// ALFA X-RAY FULL PENTEST ENDPOINT — realFullPentestEngine.js
// Kullanım: GET /api/full-pentest?url=hedef.com
// ══════════════════════════════════════════════════
app.get('/api/full-pentest', fullPentestLimiter, async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ success: false, error: 'Target URL gerekli. ?url=hedef.com' });
    }
    console.log(`[FULL-PENTEST] X-RAY tarama başlıyor: ${targetUrl}`);
    const results = await generateFullPentestReport(targetUrl);
    console.log(`[FULL-PENTEST] Tamamlandı: ${targetUrl} | Skor: ${results.overallScore} | Süre: ${results.scanDurationSec}s`);
    res.json({ success: true, results });
  } catch (error) {
    console.error('[FULL-PENTEST] Hata:', error);
    res.status(500).json({ success: false, error: 'Full Pentest raporu oluşturulamadı: ' + error.message });
  }
});

// YENİ V8.1 FULL PENTEST ENDPOINT — Şimdi X-RAY V2 Motoruyla Güçlendirildi
app.get('/api/full-audit', async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ success: false, error: 'Target URL is required.' });
    }

    console.log(`[FULL-AUDIT] Starting high-fidelity X-RAY V2 audit: ${targetUrl}`);
    const results = await generateFullPentestReport(targetUrl);
    console.log(`[FULL-AUDIT] Audit completed for: ${targetUrl}. Score: ${results.overallScore}`);
    
    res.json({ success: true, results });
  } catch (error) {
    console.error('[FULL-AUDIT] Error:', error);
    res.status(500).json({ success: false, error: 'Audit generation failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`[ALFA-SERVER] Running in ${ENV_LABEL} mode`);
  console.log(`[ALFA-SERVER] Listening on port ${PORT}`);
});
