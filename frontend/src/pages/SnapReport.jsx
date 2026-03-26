import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, BarChart3, Zap, CheckCircle2, XCircle,
  Send, ShieldCheck, Flame, Info, Lock, ShieldOff
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import MatrixRain from '../components/MatrixRain';
import CampaignCountdown from '../components/CampaignCountdown';

/**
 * SnapReport Sayfası — Dijital Zırh 60 Kampanyası
 * Güvenlik Katmanları:
 *   1. Honeypot (gizli alan) — bot tuzağı
 *   2. Zamanlama kontrolü   — çok hızlı gönderim = bot
 *   3. Rate limiting        — saatte maks 3 deneme
 *   4. Tekrar eden girdi    — "aaaaaa" gibi anlamsız input engeli
 *   5. Ad yapısı kontrolü   — en az 2 kelime (ad + soyad)
 *   6. Domain çapraz kont.  — email domain === URL domain
 *   7. Ücretsiz email engel — gmail, yahoo vb. reddedilir
 *   8. Güven Skoru (UI)     — canlı animasyonlu progress bar
 */

// ── Regex & Sabitler ──────────────────────────────────────────────────────────
const SAFE_TEXT_RE = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s.\-&,()]+$/;
const EMAIL_RE     = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE     = /^[0-9+\s\-()]{7,15}$/;
const URL_RE       = /^https?:\/\/.+\..+/;
const RATE_KEY     = 'snap_attempts';
const MIN_FILL_SEC = 5; // saniyeden kısa doldurulursa bot sayılır
const MAX_ATTEMPTS = 3; // saatte maks deneme

const FREE_EMAIL_DOMAINS = [
  'gmail.com','yahoo.com','yahoo.com.tr','hotmail.com','hotmail.com.tr',
  'outlook.com','outlook.com.tr','live.com','icloud.com','me.com',
  'mac.com','yandex.com','yandex.ru','protonmail.com','proton.me',
  'zoho.com','aol.com','mail.com','gmx.com','gmx.net',
  'windowslive.com','msn.com','mynet.com','ttnet.com.tr',
];

// ── Yardımcı fonksiyonlar ─────────────────────────────────────────────────────
const sanitizeText  = (v) => v.replace(/<|>|"|'|`|;|{|}|\\|\/\*|\*\//g, '');
const onlyDigits    = (v) => v.replace(/[^0-9+\s\-()]/g, '');
const getEmailDomain = (email) => { const p = email.split('@'); return p.length === 2 ? p[1].toLowerCase().trim() : ''; };
const getUrlDomain   = (url)   => { try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase(); } catch { return ''; } };
const isFreeEmail    = (email) => FREE_EMAIL_DOMAINS.includes(getEmailDomain(email));
const isRepetitive   = (v)     => v.length >= 4 && new Set(v.replace(/\s/g, '')).size <= 2;
const hasFullName    = (v)     => v.trim().split(/\s+/).length >= 2;

// Rate limiting (localStorage)
const getAttempts = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(RATE_KEY) || '[]');
    const hour = Date.now() - 3600_000;
    return raw.filter(t => t > hour);
  } catch { return []; }
};
const addAttempt = () => {
  const attempts = [...getAttempts(), Date.now()];
  localStorage.setItem(RATE_KEY, JSON.stringify(attempts));
};

// ── Bileşen ───────────────────────────────────────────────────────────────────
const SnapReport = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', company: '', isAuthorized: false });
  const [honeypot, setHoneypot]   = useState('');   // bot tuzağı
  const [errors,   setErrors]     = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formLoadTime = useRef(Date.now());

  useEffect(() => {
    document.title = 'Ücretsiz Snap Report | Dijital Zırh 60 Kampanyası | Alfa Yapay Zeka';
    window.scrollTo(0, 0);
    formLoadTime.current = Date.now();
  }, []);

  // ── Canlı alan durumları (valid / invalid / '') ────────────────────────────
  const fieldStatus = useMemo(() => {
    const s = {};
    // name
    if (formData.name.length >= 4) {
      s.name = (SAFE_TEXT_RE.test(formData.name) && hasFullName(formData.name) && !isRepetitive(formData.name)) ? 'valid' : 'invalid';
    } else s.name = '';
    // email
    if (formData.email.length >= 5) {
      s.email = (EMAIL_RE.test(formData.email) && !isFreeEmail(formData.email)) ? 'valid' : 'invalid';
    } else s.email = '';
    // phone
    if (formData.phone.length >= 7) {
      s.phone = PHONE_RE.test(formData.phone) ? 'valid' : 'invalid';
    } else s.phone = '';
    // website
    if (formData.website.length >= 8) {
      s.website = URL_RE.test(formData.website) ? 'valid' : 'invalid';
    } else s.website = '';
    // company
    if (formData.company.length >= 2) {
      s.company = (SAFE_TEXT_RE.test(formData.company) && !isRepetitive(formData.company)) ? 'valid' : 'invalid';
    } else s.company = '';
    return s;
  }, [formData]);

  // Domain çapraz kontrol (sessiz buton disable)
  const emailDomain    = getEmailDomain(formData.email);
  const urlDomain      = getUrlDomain(formData.website);
  const domainMismatch = !!(emailDomain && urlDomain && emailDomain !== urlDomain);

  // Güven Skoru (0-100)
  const securityScore = useMemo(() => {
    const weights = { name: 20, email: 20, phone: 15, website: 25, company: 20 };
    let score = 0;
    Object.entries(weights).forEach(([k, w]) => { if (fieldStatus[k] === 'valid') score += w; });
    if (domainMismatch) score = Math.max(0, score - 25);
    if (formData.isAuthorized) score = Math.min(100, score + 5);
    return score;
  }, [fieldStatus, domainMismatch, formData.isAuthorized]);

  const scoreColor = securityScore >= 80 ? '#22c55e' : securityScore >= 50 ? '#f59e0b' : '#ef4444';
  const scoreLabel = securityScore >= 80 ? 'Güvenilir' : securityScore >= 50 ? 'Kontrol Ediliyor' : 'Yetersiz';
  const ScoreIcon  = securityScore >= 80 ? ShieldCheck : securityScore >= 50 ? ShieldAlert : ShieldOff;

  // ── Doğrulama ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!formData.name.trim())                 e.name    = 'Ad Soyad zorunludur.';
    else if (!hasFullName(formData.name))      e.name    = 'Lütfen ad ve soyadınızı giriniz.';
    else if (!SAFE_TEXT_RE.test(formData.name)) e.name   = 'Geçersiz karakter kullanıldı.';
    else if (isRepetitive(formData.name))      e.name    = 'Geçerli bir ad soyadı giriniz.';
    else if (formData.name.length > 30)        e.name    = 'En fazla 30 karakter.';

    if (!formData.email.trim())                e.email   = 'E-posta zorunludur.';
    else if (!EMAIL_RE.test(formData.email))   e.email   = 'Geçerli bir e-posta adresi girin.';
    else if (isFreeEmail(formData.email))      e.email   = 'Lütfen kurumsal e-posta adresinizi girin.';

    if (!formData.phone.trim())                e.phone   = 'Telefon zorunludur.';
    else if (!PHONE_RE.test(formData.phone))   e.phone   = 'Geçerli telefon numarası girin (ör: 0555 123 45 67).';

    if (!formData.website.trim())              e.website = 'Web sitesi zorunludur.';
    else if (!URL_RE.test(formData.website))   e.website = 'Geçerli bir URL girin (https://...).';
    else if (domainMismatch)                   e.website = 'E-posta domaini URL domainiyle eşleşmelidir.';

    if (!formData.company.trim())              e.company = 'Şirket unvanı zorunludur.';
    else if (formData.company.length > 30)     e.company = 'En fazla 30 karakter.';
    else if (!SAFE_TEXT_RE.test(formData.company)) e.company = 'Geçersiz karakter.';
    else if (isRepetitive(formData.company))   e.company = 'Geçerli bir şirket adı giriniz.';

    if (!formData.isAuthorized)                e.auth    = 'Lütfen yetkili olduğunuzu onaylayın.';
    return e;
  };

  // ── Gönder ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot
    if (honeypot) return;

    // 2. Zamanlama
    const elapsed = (Date.now() - formLoadTime.current) / 1000;
    if (elapsed < MIN_FILL_SEC) return;

    // 3. Rate limiting
    const attempts = getAttempts();
    if (attempts.length >= MAX_ATTEMPTS) {
      toast.error('Çok fazla deneme. Lütfen bir saat sonra tekrar deneyin.');
      return;
    }

    // 4. Alan doğrulama
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.warn('Lütfen formdaki hataları düzeltin.');
      return;
    }

    setErrors({});
    addAttempt();
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/contact`, {
        ...formData,
        subject: 'KAMPANYA: SNAP REPORT Talebi (Dijital Zırh 60)',
        type: 'snap-report'
      });
      toast.success('Snap Report talebiniz alındı! Raporunuz 24-48 saat içinde e-postanıza gönderilecektir.');
      setFormData({ name: '', email: '', phone: '', website: '', company: '', isAuthorized: false });
    } catch {
      toast.error('Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Alan durumu ikonu ─────────────────────────────────────────────────────
  const FieldIcon = ({ field }) => {
    const st = fieldStatus[field];
    if (!st) return null;
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key={st}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
        >
          {st === 'valid'
            ? <CheckCircle2 size={18} className="text-green-500" />
            : <XCircle     size={18} className="text-red-400" />
          }
        </motion.span>
      </AnimatePresence>
    );
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border rounded-2xl px-6 pr-12 py-4 text-white focus:outline-none transition-all ${
      errors[field] ? 'border-red-500' :
      fieldStatus[field] === 'valid' ? 'border-green-500/50' :
      'border-white/10 focus:border-red-500/50'
    }`;

  const isButtonDisabled = isSubmitting || domainMismatch || securityScore < 40;

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <div className="pb-20 px-6 min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Matrix Rain */}
      <MatrixRain opacity={0.10} color="#ff2222" fontSize={13} speed={0.7} />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Sol Kolon */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest">
              <Flame size={14} className="animate-pulse" /> Dijital Zırh 60 Kampanyası
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter uppercase whitespace-pre-line">
              Sitenizin <br />
              <span className="text-red-500">Güvenlik Karnesini</span> <br />
              Ücretsiz Alın.
            </h1>
            <p className="text-xl text-white/50 font-light leading-relaxed max-w-xl">
              Normal değeri <strong className="text-white">19.999 TL + KDV</strong> olan kurumsal{' '}
              <strong className="text-white">"ALFA Web-Risk Check-Up"</strong> hizmetimiz, 60 gün boyunca sınırlı sayıda işletme için{' '}
              <span className="text-white font-bold ml-1">2 Sayfalık Ücretsiz Snap Report</span> olarak sunuluyor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              {[
                { title: "Altyapı Skoru",  desc: "Sunucu ve framework açıklarınızın A-F arası derecelendirmesi.", icon: <ShieldCheck size={20}/> },
                { title: "3 Kritik Zafiyet",desc: "Hackerların en kolay sızabileceği acil 3 güvenlik deliği.",    icon: <ShieldAlert size={20}/> },
                { title: "Acil Eylem Planı",desc: "Bugün yapmanız gereken teknik düzeltme önerileri.",            icon: <Zap size={20}/> },
                { title: "Özel İndirim",   desc: "Tam kapsamlı Web-Risk paketine geçişte sürpriz kampanya.",      icon: <BarChart3 size={20}/> }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-red-500/20 transition-all group">
                  <div className="p-3 h-fit bg-red-500/10 rounded-xl text-red-500 mb-4 group-hover:scale-110 transition-transform w-fit">{item.icon}</div>
                  <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex items-start gap-4">
              <Info className="text-primary flex-shrink-0" size={24} />
              <p className="text-sm text-white/60">
                <strong>Şartlar:</strong> Bu kampanya sadece kurumsal işletmeler için geçerlidir.
                Analiz edilecek domainin mülkiyet ispatı veya şirket yetkilisi onayı gerekmektedir.
              </p>
            </div>
          </motion.div>

          {/* Sağ Kolon: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-8 md:p-12 rounded-[40px] border border-white/10 shadow-2xl relative lg:sticky lg:top-32"
          >
            {/* Rozet */}
            <div className="absolute -top-6 -right-6 p-6 bg-red-600 text-white rounded-3xl font-black text-xl shadow-xl rotate-12 flex flex-col items-center">
              <span className="text-xs uppercase opacity-80">Kampanya</span>
              ÜCRETSİZ
            </div>

            {/* Başlık */}
            <div className="mb-4">
              <h3 className="text-3xl font-bold mb-1">Snap Report Başvurusu</h3>
              <p className="text-white/40 text-sm">Lütfen analiz edilecek domain bilgilerini giriniz.</p>
            </div>

            {/* Campaign Countdown Timer (Formun Hemen Üstünde) */}
            <CampaignCountdown />

            {/* ── Güven Skoru Barı ── */}
            <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40">
                  <Lock size={11} /> Güven Skoru
                </div>
                <div className="flex items-center gap-1.5" style={{ color: scoreColor }}>
                  <ScoreIcon size={13} />
                  <span className="text-[11px] font-black uppercase tracking-wider">{scoreLabel}</span>
                  <span className="text-[11px] font-mono ml-1">{securityScore}%</span>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: scoreColor }}
                  animate={{ width: `${securityScore}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Honeypot — botlar için gizli alan */}
              <input
                type="text"
                name="address"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
                aria-hidden="true"
              />

              {/* Ad Soyad */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Ad Soyad (Yetkili)</label>
                <div className="relative">
                  <input
                    type="text" maxLength={30} value={formData.name}
                    onChange={(e) => { const v = sanitizeText(e.target.value); if (v.length <= 30) setFormData({...formData, name: v}); if (errors.name) setErrors({...errors, name: ''}); }}
                    className={inputClass('name')}
                    placeholder="Ahmet Yılmaz"
                  />
                  <FieldIcon field="name" />
                </div>
                {errors.name && <p className="text-red-400 text-[11px] ml-4">{errors.name}</p>}
                <p className="text-white/20 text-[10px] ml-4 text-right">{formData.name.length}/30</p>
              </div>

              {/* E-posta */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Kurumsal E-posta</label>
                <div className="relative">
                  <input
                    type="email" value={formData.email}
                    onChange={(e) => { setFormData({...formData, email: e.target.value.trim()}); if (errors.email) setErrors({...errors, email: ''}); }}
                    className={inputClass('email')}
                    placeholder="yetkili@firma.com"
                  />
                  <FieldIcon field="email" />
                </div>
                {errors.email && <p className="text-red-400 text-[11px] ml-4">{errors.email}</p>}
              </div>

              {/* Telefon */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Telefon Numarası</label>
                <div className="relative">
                  <input
                    type="tel" value={formData.phone}
                    onChange={(e) => { const v = onlyDigits(e.target.value); if (v.length <= 15) setFormData({...formData, phone: v}); if (errors.phone) setErrors({...errors, phone: ''}); }}
                    className={inputClass('phone')}
                    placeholder="0555 123 45 67"
                  />
                  <FieldIcon field="phone" />
                </div>
                {errors.phone && <p className="text-red-400 text-[11px] ml-4">{errors.phone}</p>}
              </div>

              {/* Web Sitesi */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Web Sitesi (Domain)</label>
                <div className="relative">
                  <input
                    type="url" value={formData.website}
                    onChange={(e) => { setFormData({...formData, website: e.target.value.trim()}); if (errors.website) setErrors({...errors, website: ''}); }}
                    className={inputClass('website')}
                    placeholder="https://www.siteniz.com"
                  />
                  <FieldIcon field="website" />
                </div>
                {errors.website && <p className="text-red-400 text-[11px] ml-4">{errors.website}</p>}
              </div>

              {/* Şirket */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Şirket Unvanı</label>
                <div className="relative">
                  <input
                    type="text" maxLength={30} value={formData.company}
                    onChange={(e) => { const v = sanitizeText(e.target.value); if (v.length <= 30) setFormData({...formData, company: v}); if (errors.company) setErrors({...errors, company: ''}); }}
                    className={inputClass('company')}
                    placeholder="ABC Teknoloji A.Ş."
                  />
                  <FieldIcon field="company" />
                </div>
                {errors.company && <p className="text-red-400 text-[11px] ml-4">{errors.company}</p>}
                <p className="text-white/20 text-[10px] ml-4 text-right">{formData.company.length}/30</p>
              </div>

              {/* Yetki Onayı */}
              <div className={`flex items-start gap-4 px-2 py-4 rounded-2xl bg-white/5 border ${errors.auth ? 'border-red-500/40' : 'border-white/5'}`}>
                <input
                  type="checkbox" id="isAuthorized" checked={formData.isAuthorized}
                  onChange={(e) => { setFormData({...formData, isAuthorized: e.target.checked}); if (errors.auth) setErrors({...errors, auth: ''}); }}
                  className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-red-500 focus:ring-red-500 accent-red-600 cursor-pointer"
                />
                <label htmlFor="isAuthorized" className="text-xs text-white/50 leading-relaxed cursor-pointer select-none">
                  Söz konusu domain için <span className="text-white font-bold">yetkili kişi</span> olduğumu ve
                  ücretsiz teknik analiz yapılmasını onayladığımı beyan ederim.
                </label>
              </div>
              {errors.auth && <p className="text-red-400 text-[11px] ml-4">{errors.auth}</p>}

              {/* Gönder Butonu */}
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full py-6 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'SNAP REPORT TALEBİ OLUŞTUR'} <Send size={20} />
              </button>

              <div className="flex flex-col items-center gap-3 pt-4">
                <p className="text-[9px] text-white/20 text-center uppercase tracking-widest font-bold">
                  * 60 GÜN GEÇERLİ "DİJİTAL ZIRH 60" KAMPANYA KAPSAMINDADIR.
                </p>
                <div className="flex gap-4">
                  <Link to="/kvkk"  className="text-[10px] text-white/40 hover:text-white underline">KVKK</Link>
                  <Link to="/terms" className="text-[10px] text-white/40 hover:text-white underline">Şartlar</Link>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SnapReport;
