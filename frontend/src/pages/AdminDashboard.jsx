import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Zap, FileText, ArrowRight, Shield, 
  Search, Cpu, BarChart3, Lock, AlertCircle, ArrowLeft
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import MatrixRain from '../components/MatrixRain';

/**
 * AdminDashboard — Rapor Oluşturma ve Yönetim Paneli
 * 
 * Özellikler:
 *   - PENTEST hedefi için URL girişi.
 *   - SNAP REPORT (2 Sayfa) oluşturma tetikleyici.
 *   - FULL AUDIT REPORT (48 Sayfa) oluşturma tetikleyici.
 *   - Matrix temalı, yüksek teknolojili arayüz.
 */
const AdminDashboard = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Sabit bir ilerleme değeri (Linter uyarısını engellemek için Math.random yerine sabit değer kullanıyoruz)
  const randomProgress = 87;

  // URL doğrulaması render sırasında hesaplanır (impure değil, targetUrl'e bağlıdır)
  const isValid = /^https?:\/\/.+\..+/.test(targetUrl);

  // Oturum kontrolü
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth');
    if (isAuth !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const getCleanDomain = (url) => {
    try {
      // Remove trailing slashes and common artifacts
      const cleanUrl = url.trim().replace(/\/$/, "");
      const hostname = new URL(cleanUrl).hostname.replace(/^www\./, '').toLowerCase();
      return hostname || cleanUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
    } catch {
      return url.trim().replace(/^https?:\/\/(www\.)?/, '').split('/')[0].toLowerCase();
    }
  };

  // SNAP REPORT TETİKLEYİCİ
  // URL doğrulaması sonrası 2 sayfalık özet rapor ekranına yönlendirir.
  const handleSnapReport = () => {
    if (!isValid) return;
    setIsProcessing(true);
    const domain = getCleanDomain(targetUrl);
    setTimeout(() => {
      navigate(`/scorecard?token=ALFA_JOKER_ADMIN_777&site=${domain}&admin=true`);
    }, 1500);
  };

  // FULL AUDIT TETİKLEYİCİ
  // Daha kapsamlı (48 sayfa hedefli) forensic analiz jeneratörüne yönlendirir.
  const handleFullAudit = () => {
    if (!isValid) return;
    setIsProcessing(true);
    const domain = getCleanDomain(targetUrl);
    setTimeout(() => {
      navigate(`/audit-generator?site=${domain}&admin=true`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Matrix Background */}
      <MatrixRain opacity={0.15} color="#00ff41" fontSize={14} speed={0.8} />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Top Navigation Row */}
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Ana Sayfaya Dön
            </Link>
            <div className="flex items-center gap-4">
               {/* Sessiz Oturum Bilgisi */}
               <div className="text-[10px] font-mono text-primary/40">ADMIN_SESSION: ACTIVE</div>
            </div>
          </div>

          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              <Lock size={12} /> Güvenli Admin Portalı
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              ALFA <span className="text-primary">RAPOR MÜHENDİSLİĞİ</span>
            </h1>
            <p className="text-white/40 max-w-2xl mx-auto font-medium">
              Analiz edilecek firmanın domain adresini girin ve oluşturmak istediğiniz rapor tipini seçin. 
              Sistem otomatik olarak tüm tarama motorlarını devreye alacaktır.
            </p>
          </div>

          {/* Form Section */}
          <div className="premium-card p-8 md:p-12 rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4 flex items-center gap-2">
                <Globe size={12} /> Hedef Web Sitesi (URL)
              </label>
              <div className="relative group">
                <input
                  type="url"
                  placeholder="https://www.firma-adi.com"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value.trim())}
                  className={`w-full bg-white/5 border-2 rounded-3xl px-8 py-6 text-xl font-mono transition-all outline-none ${
                    targetUrl && !isValid 
                      ? 'border-red-500/50 text-red-400' 
                      : isValid 
                        ? 'border-primary/50 text-primary shadow-[0_0_20px_rgba(0,255,65,0.1)]' 
                        : 'border-white/10 group-hover:border-white/20'
                  }`}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  {isValid ? (
                    <Shield className="text-primary animate-pulse" size={24} />
                  ) : targetUrl ? (
                    <AlertCircle className="text-red-500" size={24} />
                  ) : (
                    <Search className="text-white/20" size={24} />
                  )}
                </div>
              </div>
              <p className="text-[10px] text-white/20 ml-4 italic font-medium">
                * Sadece tam protokol içeren URL adresleri kabul edilir (http/https).
              </p>
            </div>

            {/* Processing State */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-primary">
                    <span>Motorlar Başlatılıyor...</span>
                    <span>%{randomProgress}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="h-full bg-primary shadow-[0_0_10px_#00ff41]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {/* SNAP REPORT */}
              <button
                disabled={!isValid || isProcessing}
                onClick={handleSnapReport}
                className="group relative h-44 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 flex flex-col items-start text-left h-full">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary mb-auto group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1">Snap Report</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">2 Sayfa • Özet Analiz</p>
                  </div>
                  <ArrowRight className="absolute bottom-8 right-8 text-white/20 group-hover:text-primary group-hover:translate-x-2 transition-all" size={24} />
                </div>
              </button>

              {/* FULL AUDIT */}
              <button
                disabled={!isValid || isProcessing}
                onClick={handleFullAudit}
                className="group relative h-44 rounded-[32px] overflow-hidden border border-white/10 bg-white/5 hover:border-red-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 flex flex-col items-start text-left h-full">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-500 mb-auto group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-1">Full Audit</h3>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">48 Sayfa • Adli Bilişim</p>
                  </div>
                  <ArrowRight className="absolute bottom-8 right-8 text-white/20 group-hover:text-red-500 group-hover:translate-x-2 transition-all" size={24} />
                </div>
              </button>
            </div>
          </div>

          {/* Quick Stats / Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Analiz Motoru", val: "L3 DeepScan", icon: <Cpu size={14}/> },
              { label: "Veri Kaynağı", val: "Forensic DB", icon: <BarChart3 size={14}/> },
              { label: "Sertifikasyon", val: "ISO-27001", icon: <Shield size={14}/> },
              { label: "Sürüm", val: "V1.4.0", icon: <Lock size={14}/> },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-white/20 mb-2">{stat.icon}</div>
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
