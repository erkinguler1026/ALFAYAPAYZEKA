/**
 * backend/utils/db.js — JSON Tabanlı Rapor Token Veritabanı
 *
 * Versiyon: V1.4.0 | Tarih: Mart 2026
 *
 * Açıklama:
 *   Snap Report başvuruları için token sistemi yöneticisidir.
 *   Kalıcı bir veritabanı (PostgreSQL, MongoDB vb.) yerine hafif ve
 *   serverless uyumlu bir JSON dosyası (`data/reports.json`) kullanır.
 *   Vercel ve benzeri platformlarda dosya sistemi writable olmadığı için
 *   bu sistem yalnızca local/VPS ortamlarda kalıcı çalışır.
 *
 * Token Yaşam Döngüsü:
 *   1. Müşteri Snap Report formunu doldurur.
 *   2. Backend `createReport()` ile UUID token oluşturur ve JSON'a kaydeder.
 *   3. Müşteriye Magic Link e-postası gönderilir (token içerir).
 *   4. Müşteri linke tıkladığında `getAndIncrementReport()` token doğrular.
 *   5. Maksimum 3 görüntüleme hakkı aşıldığında erişim reddedilir.
 *
 * Kayıt Şeması:
 *   {
 *     id:        string  — UUID v4 token (Magic Link'teki değer)
 *     domain:    string  — Analiz edilen web sitesi domain'i
 *     email:     string  — Token sahibi müşteri e-postası
 *     clicks:    number  — Mevcut görüntüleme sayısı (0'dan başlar)
 *     maxClicks: number  — İzin verilen maksimum görüntüleme (varsayılan: 3)
 *     createdAt: number  — Oluşturma zaman damgası (Unix ms)
 *   }
 *
 * Bağımlılıklar:
 *   - fs/promises : Asenkron dosya okuma/yazma
 *   - path        : Platform bağımsız dosya yolu oluşturma
 *   - crypto      : UUID v4 token üretimi
 */
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DB_FILE = path.join(process.cwd(), 'data', 'reports.json');

// Ensure DB directory and file exist
const initDB = async () => {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify([]));
  }
};

export const getReports = async () => {
  await initDB();
  const data = await fs.readFile(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

export const saveReports = async (reports) => {
  await fs.writeFile(DB_FILE, JSON.stringify(reports, null, 2));
};

export const createReport = async (domain, email, scanResults = null) => {
  const reports = await getReports();
  const id = crypto.randomUUID();
  const newReport = {
    id,
    domain,
    email,
    clicks: 0,
    maxClicks: 3,
    createdAt: Date.now(),
    scanResults // Gerçek analiz verileri burada saklanır
  };
  reports.push(newReport);
  await saveReports(reports);
  return id;
};

export const getAndIncrementReport = async (id) => {
  const reports = await getReports();
  const reportIndex = reports.findIndex(r => r.id === id);
  if (reportIndex === -1) return null;
  
  const report = reports[reportIndex];
  if (report.clicks >= report.maxClicks) {
    return { error: 'ACCESS_DENIED_EXPIRED' };
  }
  
  // Increment clicks
  reports[reportIndex].clicks += 1;
  await saveReports(reports);
  
  return reports[reportIndex];
};
