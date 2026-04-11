import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Zap, FileText, ArrowRight, Shield, 
  Search, Cpu, BarChart3, Lock, AlertCircle, ArrowLeft,
  ScanSearch, Loader2, CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import MatrixRain from '../components/MatrixRain';
import { isLocalEnvironment } from '../utils/api';

/**
 * AdminDashboard (V2.0 - X-RAY Integrated)
 * ───────────────────────────────────────
 * Profesyonel penetrasyon testi tetikleme merkezi.
 * Artık realFullPentestEngine.js (X-RAY V2) ile tam entegre.
 */
const AdminDashboard = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lang, setLang] = useState('tr');
  const navigate = useNavigate();

  const randomProgress = 87;
  const isValid = /^https?:\/\/.+\..+/.test(targetUrl);

  const t = {
    tr: {
      backToHome: "Ana Sayfaya Dön",
      safePortal: "Güvenli Admin Portalı",
      title: "ALFA RAPOR MÜHENDİSLİĞİ",
      subtitle: "Analiz edilecek firmanın domain adresini girin. Sistem otomatik olarak ALFA X-RAY V2.0 Adli Bilişim motorunu tetikleyecektir.",
      urlLabel: "Hedef Web Sitesi (URL)",
      urlPlaceholder: "https://www.firma-adi.com",
      urlHint: "* Sadece tam protokol içeren URL adresleri kabul edilir (http/https).",
      processing: "X-RAY Motoru Başlatılıyor...",
      snapTitle: "Snap Report",
      snapSub: "2 Sayfa • Özet Analiz",
      fullTitle: "Full X-RAY Audit",
      fullSub: "250 Sayfa • Adli Bilişim & Forensics",
      xrayBadge: "FULL X-RAY PENTEST ENGINE V2.0",
      xrayTitle: "GERÇEK RÖNTGEN ANALİZİ",
      xrayDesc: "7 Bölüm · Gerçek Port Tarama · SSL/TLS Logları · OSINT · 250+ Sayfa Gerçek Veri.",
      stats: [
        { label: "Analiz Motoru", val: "X-RAY V2.0" },
        { label: "Veri Kaynağı", val: "Real-Time APIs" },
        { label: "Sertifikasyon", val: "ISO-27001" },
        { label: "Sürüm", val: "V2.1.0" }
      ]
    },
    en: {
      backToHome: "Back to Home",
      safePortal: "Secure Admin Portal",
      title: "ALFA REPORT ENGINEERING",
      subtitle: "Enter the firm's domain. The system will automatically trigger the ALFA X-RAY V2.0 Forensic Audit engine.",
      urlLabel: "Target Website (URL)",
      urlPlaceholder: "https://www.company-name.com",
      urlHint: "* Only URLs including protocol (http/https) are accepted.",
      processing: "Starting X-RAY Engine...",
      snapTitle: "Snap Report",
      snapSub: "2 Pages • Summary Analysis",
      fullTitle: "Full X-RAY Audit",
      fullSub: "250 Pages • Forensic Audit",
      xrayBadge: "FULL X-RAY PENTEST ENGINE V2.0",
      xrayTitle: "REAL X-RAY ANALYSIS",
      xrayDesc: "7 Sections · Real Port Scan · SSL/TLS Logs · OSINT · 250+ Pages Real Data.",
      stats: [
        { label: "Analysis Engine", val: "X-RAY V2.0" },
        { label: "Data Source", val: "Real-Time APIs" },
        { label: "Certification", val: "ISO-27001" },
        { label: "Version", val: "V2.1.0" }
      ]
    }
  }[lang];

  useEffect(() => {
    if (isLocalEnvironment()) return;
    const isAuth = sessionStorage.getItem('admin_auth');
    if (isAuth !== 'true') navigate('/');
  }, [navigate]);

  const getCleanDomain = (url) => {
    try {
      const cleanUrl = url.trim().replace(/\/$/, "");
      const hostname = new URL(cleanUrl).hostname.replace(/^www\./, '').toLowerCase();
      return hostname || cleanUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
    } catch {
      return url.trim().replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
    }
  };

  const handleSnapReport = () => {
    if (!isValid) return;
    setIsProcessing(true);
    const domain = getCleanDomain(targetUrl);
    setTimeout(() => {
      navigate(`/scorecard?token=ALFA_JOKER_ADMIN_777&site=${domain}&admin=true&lang=${lang}`);
    }, 1500);
  };

  const handleFullAudit = () => {
    if (!isValid) return;
    setIsProcessing(true);
    const domain = getCleanDomain(targetUrl);
    setTimeout(() => {
      // Orijinal 250 sayfalık AuditReportGenerator $(\"ASIL\") bileşenine dönülüyor
      navigate(`/full-pentest-print?site=${domain}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      <MatrixRain opacity={0.15} color="#00ff41" fontSize={14} speed={0.8} />
      {/* Red/Green dynamic glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
          
          {/* Top Nav */}
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
              <ArrowLeft size={16} /> {t.backToHome}
            </Link>
            <div className="flex items-center gap-6">
                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 self-center shadow-inner">
                  {['tr', 'en'].map(l => (
                    <button 
                      key={l} 
                      onClick={() => setLang(l)} 
                      className={`px-8 py-2.5 text-[12px] font-black rounded-xl transition-all duration-500 uppercase tracking-[0.2em] relative overflow-hidden ${
                        lang === l 
                          ? 'bg-primary/90 text-white shadow-[0_0_30px_rgba(0,255,65,0.3)] border border-white/20 translate-y-[-1px]' 
                          : 'text-white/20 hover:text-white/40 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {lang === l && (
                        <motion.div 
                          layoutId="activeGlow"
                          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"
                        />
                      )}
                      {l}
                    </button>
                  ))}
                </div>
               <div className="text-[10px] font-mono text-primary/40">ADMIN_SESSION: ACTIVE</div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              <Lock size={12} /> {t.safePortal}
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              ALFA <span className="text-primary">{t.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
          </div>

          {/* Main Card (X-RAY Integration) */}
          <div className="premium-card p-8 md:p-12 rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl space-y-10 relative overflow-hidden">
            
            {/* Form Section */}
            <div className="space-y-4 relative z-10">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4 flex items-center gap-2">
                <Globe size={12} /> {t.urlLabel}
              </label>
              <div className="relative group">
                <input
                  type="url"
                  placeholder={t.urlPlaceholder}
                  value={targetUrl}
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter' && isValid) {
                      // Enter ile Snap Report tetiklenir (varsayılan)
                      handleSnapReport(); 
                    }
                  }}
                  onChange={(e) => setTargetUrl(e.target.value.trim())}
                  className={`w-full bg-white/5 border-2 rounded-3xl px-8 py-6 text-xl font-mono transition-all outline-none ${targetUrl && !isValid ? 'border-red-500/50 text-red-400' : isValid ? 'border-primary/50 text-primary shadow-[0_0_20px_rgba(0,255,65,0.1)]' : 'border-white/10 group-hover:border-white/20'}`}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  {isValid ? <Shield className="text-primary animate-pulse" size={24} /> : targetUrl ? <AlertCircle className="text-red-500" size={24} /> : <Search className="text-white/20" size={24} />}
                </div>
              </div>
              <p className="text-[10px] text-white/20 ml-4 italic font-medium">{t.urlHint}</p>
            </div>

            <AnimatePresence>
              {isProcessing && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                  <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-primary">
                    <span>{t.processing}</span>
                    <span>%{randomProgress}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div className="h-full bg-primary shadow-[0_0_10px_#00ff41]" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-4 relative z-10">
              
              {/* SNAP REPORT BUTTON */}
              <button 
                disabled={!isValid || isProcessing} 
                onClick={handleSnapReport} 
                className="group relative h-48 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed clickable"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 flex flex-col items-start text-left h-full">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary mb-auto group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1">{t.snapTitle}</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">{t.snapSub}</p>
                  </div>
                  <ArrowRight className="absolute bottom-8 right-8 text-white/20 group-hover:text-primary group-hover:translate-x-2 transition-all" size={24} />
                </div>
              </button>

              {/* FULL X-RAY SCAN BUTTON (Premium Style) */}
              <button 
                disabled={!isValid || isProcessing} 
                onClick={handleFullAudit} 
                className="group relative h-48 rounded-[32px] overflow-hidden border border-red-500/20 bg-red-950/20 hover:border-red-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[inset_0_0_30px_rgba(239,68,68,0.05)] clickable"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-8 flex flex-col items-start text-left h-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[8px] font-black uppercase tracking-widest mb-auto">
                    <ScanSearch size={10} className="animate-pulse" /> {t.xrayBadge}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1 text-white group-hover:text-red-400 transition-colors">
                      {t.fullTitle}
                    </h3>
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest leading-tight">
                      {t.fullSub}
                    </p>
                  </div>
                  
                  <div className="w-full mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                       CORE ANALYZER: REAL-TIME
                     </span>
                     <ArrowRight className="text-red-500 group-hover:translate-x-2 transition-transform" size={20} />
                  </div>
                </div>

                {/* Corner glow */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-red-500/10 blur-2xl rounded-full" />
              </button>
            </div>

            {/* X-RAY Info Banner */}
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4 relative z-10 group">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-black text-white/80 uppercase tracking-wider">{t.xrayTitle}</h4>
                <p className="text-[10px] text-white/40 font-medium">{t.xrayDesc}</p>
              </div>
              <CheckCircle2 size={16} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>

          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.stats.map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">{stat.label}</div>
                <div className="text-[11px] font-bold text-white/80 tracking-wide">{stat.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
