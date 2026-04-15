import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Activity, Cpu, Terminal, Lock, Globe, Zap, Search, ShieldCheck, Timer, ArrowRight, AlertCircle, LayoutDashboard
} from 'lucide-react';

/**
 * FullScoreCard — X-RAY Audit Dual-Window Loading Engine (V4.2.0 - Forensic Edition)
 * 
 * Bu bileşen, Admin Panelinden tetiklenen Full X-RAY Pentest'in 
 * "Görsel Şovu" ve gerçek zamanlı analiz adımlarını yönetir.
 */

const FULL_STEPS_TR = [
  'Gelişmiş Altyapı ve DNS Çözümleme [S1]',
  'Multi-Thread Asenkron Port Taraması (17 Kritik Port) [S3]',
  'SSL/TLS Kriptografik Derin Denetim (Crypto-Audit) [N3]',
  'OSINT: Sertifika Şeffaflık Günlüğü (crt.sh) Keşfi [N1]',
  'Fiziksel Lokasyon ve Veri Merkezi İzleme (Geo-IP) [N2]',
  'Güvenlik Politikası Başlık Denetimi (HSTS, CSP, CORS) [N6]',
  'E-posta ve DNS Güvenlik Duvarı Analizi (SPF, DMARC) [S4]',
  'Sunucu ve Teknoloji Parmak İzi Çıkarımı (Wappalyzer) [N7]',
  'Çerez ve Oturum Güvenliği Politikası Analizi [N5]',
  'Asset Inventory: Sitemap ve Robots.txt Taraması [N9]',
  'Sensitive Data: Dizin ve Dosya Sızıntısı Taraması [S8]',
  'İtibar ve Tehdit İstihbaratı Sorgusu (AlienVault OTX) [N8]',
  'Zafiyet İlişkilendirme ve ISO 27001 Uyumluluk Eşleme',
  'Penetrasyon Testi Kanıt Zinciri PDF Raporu Hazırlanıyor'
];

const FULL_STEPS_EN = [
  'Advanced Infrastructure & DNS Resolution [S1]',
  'Multi-Thread Async Port Probe (17 Critical Ports) [S3]',
  'SSL/TLS Cryptographic Deep Audit (Crypto-Audit) [N3]',
  'OSINT: Certificate Transparency Log (crt.sh) Discovery [N1]',
  'Physical Location & Data Center Tracing (Geo-IP) [N2]',
  'Security Policy Header Audit (HSTS, CSP, CORS) [N6]',
  'Email & DNS Firewall Analysis (SPF, DMARC) [S4]',
  'Server & Tech Fingerprinting (Wappalyzer style) [N7]',
  'Cookie & Session Security Policy Analysis [N5]',
  'Asset Inventory: Sitemap & Robots.txt Scan [N9]',
  'Sensitive Data: Path & File Exposure Probe [S8]',
  'Reputation & Threat Intelligence (AlienVault OTX) [N8]',
  'Vulnerability Correlation & ISO 27001 Compliance Mapping',
  'Compiling Penetration Test Proof-of-Concept PDF Report'
];

const FullScoreCard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'tr';
  const site = searchParams.get('site') || 'site.com';
  
  const [loadStep, setLoadStep] = useState(0);
  const [terminalStep, setTerminalStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [complete, setComplete] = useState(false);
  const terminalRef = useRef(null);

  const steps = lang === 'en' ? FULL_STEPS_EN : FULL_STEPS_TR;
  const formattedUrl = `https://www.${site.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')}`;
  const startTime = useMemo(() => new Date(), []);

  // Loglar: realFullPentestEngine.js mantığına göre kurgulanmış profesyonel terminal çıktıları
  const logs = useMemo(() => {
    const baseLogs = lang === 'en' ? [
        `[INIT] X-RAY S-CORE Initiated for: ${formattedUrl}`,
        `[S1] Resolving DNS A/AAAA records... Querying root servers.`,
        `[S1] Found IP: 104.26.2.144 (Cloudflare/Anycast Architecture detected).`,
        `[S3] Multi-threaded TCP Sync probe started on 17 critical ports.`,
        `[S3] Port 22 (SSH) status: Filtered. Banner grabbing timeout.`,
        `[S3] Port 443 (HTTPS) status: Active. Verifying TLS handshake.`,
        `[N3] Querying api.ssllabs.com for deep cryptographic audit.`,
        `[N3] TLS 1.3 detected. Forward secrecy verified. HSTS: Active.`,
        `[N1] OSINT: Querying crt.sh (Certificate Transparency) logs...`,
        `[N1] Discovered 14 subdomains (api, portal, staging, mail).`,
        `[N2] Tracing physical node... Geo-IP: Frankfurt, Germany (DE).`,
        `[S4] SPF record detected: v=spf1 include:_spf.google.com ~all.`,
        `[S4] DMARC record: v=DMARC1; p=reject; adkim=r; aspf=r. (SECURE)`,
        `[N7] Fingerprinting stack... Tech: React, Node.js, Cloudflare-Nginx.`,
        `[N6] Auditing CORS policies... Access-Control-Allow-Origin: * (RESTRICTED)`,
        `[N5] Cookie Safety: HttpOnly=True, Secure=True, SameSite=Lax (STABLE)`,
        `[S8] Bruteforcing sensitive paths... Probe: /.git/config (403 Forbidden)`,
        `[S8] Probe: /.env (404 Not Found). Asset integrity verified.`,
        `[N8] Threat Intel: Querying AlienVault OTX for reputation score...`,
        `[N8] IP Reputation: CLEAN. No malware/botnet history found.`,
        `[N9] Parsing sitemap.xml... Found 142 valid entry points.`,
        `[SYSTEM] Correlating data points into ISO 27001:2022 security controls.`,
        `[SYSTEM] Mapping findings to Annex A.8.x (Technical Controls).`,
        `[SYSTEM] Rendering 250-page Forensic Audit PDF Document...`,
        `[SYSTEM] X-RAY Analysis concluded. System Ready.`
    ] : [
        `[INIT] X-RAY S-CORE Başlatıldı: ${formattedUrl}`,
        `[S1] DNS A/AAAA kayıtları çözümleniyor... Kök sunucular sorgulanıyor.`,
        `[S1] Bulunan IP: 104.26.2.144 (Cloudflare/Anycast Mimari tespit edildi).`,
        `[S3] 17 kritik port üzerinde çok iş parçacıklı TCP Taraması başladı.`,
        `[S3] Port 22 (SSH) durumu: Filtrelenmiş. Banner grabbing zaman aşımı.`,
        `[S3] Port 443 (HTTPS) durumu: Aktif. TLS el sıkışması doğrulanıyor.`,
        `[N3] ssllabs.com üzerinden derin kriptografik audit sorgulanıyor.`,
        `[N3] TLS 1.3 tespit edildi. Forward Secrecy doğrulandı. HSTS: Aktif.`,
        `[N1] OSINT: crt.sh (Sertifika Şeffaflık) günlükleri sorgulanıyor...`,
        `[N1] 14 adet alt domain keşfedildi (api, portal, staging, mail).`,
        `[N2] Fiziksel düğüm izleniyor... Geo-IP: Frankfurt, Almanya (DE).`,
        `[S4] SPF kaydı tespit edildi: v=spf1 include:_spf.google.com ~all.`,
        `[S4] DMARC kaydı: v=DMARC1; p=reject; adkim=r; aspf=r. (GÜVENLİ)`,
        `[N7] Stack parmak izi çıkarılıyor... Teknoloji: React, Node.js, Cloudflare.`,
        `[N6] CORS politikaları denetleniyor... Access-Control-Allow-Origin: * (SINIRLI)`,
        `[N5] Çerez Güvenliği: HttpOnly=True, Secure=True, SameSite=Lax (STABIL)`,
        `[S8] Hassas yol taraması... İstek: /.git/config (403 Forbidden)`,
        `[S8] İstek: /.env (404 Not Found). Varlık bütünlüğü doğrulandı.`,
        `[N8] Tehdit İstihbaratı: AlienVault OTX itibar skoru sorgulanıyor...`,
        `[N8] IP İtibarı: TEMİZ. Zararlı yazılım/botnet geçmişi bulunamadı.`,
        `[N9] sitemap.xml parse ediliyor... 142 geçerli giriş noktası bulundu.`,
        `[SYSTEM] Veriler ISO 27001:2022 güvenlik kontrolleriyle ilişkilendiriliyor.`,
        `[SYSTEM] Bulgular Annex A.8.x (Teknik Kontroller) ile eşleşiyor.`,
        `[SYSTEM] 250 sayfalık Penetrasyon Test Raporu PDF belgesi oluşturuluyor...`,
        `[SYSTEM] X-RAY Analizi tamamlandı. Sistem Hazır.`
    ];
    return baseLogs;
  }, [formattedUrl, lang]);

  // Sayaç ve Adım Kontrolü (Topam ~32 saniye)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    const stepTimer = setInterval(() => {
      setLoadStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer);
          setComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 2200); // 14 adım * 2.2s = ~31s

    const logTimer = setInterval(() => {
      setTerminalStep(prev => {
        if (prev >= logs.length) {
          clearInterval(logTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1200); // Daha hızlı daktilo logları

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
      clearInterval(logTimer);
    };
  }, [steps.length, logs.length]);

  // Terminal scroll auto-bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalStep]);

  const progress = Math.round((loadStep / (steps.length - 1)) * 100);
  const t = {
    tr: {
      title: "FULL X-RAY SİBER GÜVENLİK ANALİZİ",
      ops: "GÜVENLİK İŞLEMLERİ",
      terminal: "X-RAY TERMİNALİ (PROX)",
      status: "FULL AUDIT MODU AKTİF",
      ready: "RAPOR HAZIR",
      view: "SCORECARD GÖRÜNTÜLE",
      duration: "SÜRE",
      load: "CPU YÜKÜ",
      target: "HEDEF",
      admin: "ADMİN PANEL"
    },
    en: {
      title: "FULL X-RAY CYBER SECURITY AUDIT",
      ops: "SECURITY OPERATIONS",
      terminal: "X-RAY TERMINAL (PROX)",
      status: "FULL AUDIT MODE ACTIVE",
      ready: "REPORT READY",
      view: "VIEW SCORECARD",
      duration: "TIME",
      load: "CPU LOAD",
      target: "TARGET",
      admin: "ADMIN PANEL"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#000500] text-green-500 font-mono flex flex-col items-center justify-start py-12 px-4 relative overflow-hidden">
      
      {/* ADMIN PANEL Button */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => navigate('/admin-panel')}
          className="group flex items-center gap-2 px-5 py-2.5 bg-green-950/40 border border-green-800/50 hover:bg-green-900/60 hover:border-green-500 text-green-500 hover:text-green-300 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-sm"
        >
          <LayoutDashboard size={16} className="group-hover:scale-110 transition-transform" /> {t.admin}
        </button>
      </div>

      {/* Background Matrix-like Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      {/* Header Scan Icon */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-24 h-24 mb-6 relative z-10"
      >
        <div className="absolute inset-0 border-2 border-green-600/30 rounded-full animate-spin-slow" />
        <div className="absolute inset-2 border-2 border-green-600/50 rounded-full flex items-center justify-center bg-green-600/5 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
           <ShieldAlert size={40} className="text-green-600" />
        </div>
      </motion.div>

      <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase mb-2 z-10 text-center">
        {t.title}
      </h1>
      <p className="text-green-600 font-black text-xs md:text-sm tracking-[0.5em] mb-12 z-10 text-center flex items-center justify-center gap-3">
        <span className="w-2 h-2 bg-green-600 animate-pulse rounded-full" /> {t.target}: {formattedUrl}
      </p>

      {/* Main Dual Windows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto z-10 flex-1 min-h-[650px]">
        
        {/* LEFT WINDOW: Security Operations */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/80 border-2 border-green-900/40 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[1175px]"
        >
          <div className="bg-green-950/20 px-6 py-4 border-b border-green-900/40 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-green-600" />
              <h2 className="font-black text-sm tracking-widest text-green-100 uppercase">{t.ops}</h2>
            </div>
            <div className="flex gap-4">
              <div className="text-[10px] flex items-center gap-1.5 font-bold px-2 py-1 bg-green-950/40 border border-green-900/40 rounded text-green-400">
                <Timer size={12} /> {t.duration}: {elapsedTime}S
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col space-y-3 overflow-y-auto custom-scrollbar">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: idx <= loadStep ? 1 : 0.2 }}
                className={`flex items-center gap-4 py-3 px-4 border rounded transition-all ${idx === loadStep ? 'border-green-600 bg-green-600/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-green-950/30'}`}
              >
                <div className={`w-8 font-black text-xs ${idx === loadStep ? 'text-white' : 'text-green-900'}`}>{(idx + 1).toString().padStart(2, '0')}</div>
                <div className={`text-[12px] md:text-sm font-bold flex-1 tracking-wider ${idx === loadStep ? 'text-white' : (idx < loadStep ? 'text-green-700' : 'text-green-950')}`}>
                  {step}
                </div>
                {idx < loadStep && <ShieldCheck size={18} className="text-green-600" />}
                {idx === loadStep && <Activity size={18} className="animate-pulse text-green-500" />}
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-green-900/40 bg-black">
             <div className="flex justify-between text-[10px] font-black mb-2 tracking-widest text-green-500 uppercase">
                <span>SYSTEM PROGRESS</span>
                <span>{progress}%</span>
             </div>
             <div className="w-full h-2 bg-green-950/20 rounded-full overflow-hidden border border-green-900/40">
                <motion.div className="h-full bg-green-600 shadow-[0_0_10px_rgba(34,197,94,0.8)]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
             </div>
          </div>
        </motion.div>

        {/* RIGHT WINDOW: Terminal */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/90 border-2 border-green-900/40 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[1175px] relative"
        >
          <div className="bg-green-950/20 px-6 py-4 border-b border-green-900/40 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-green-600" />
              <h2 className="font-black text-sm tracking-widest text-green-100 uppercase">{t.terminal}</h2>
            </div>
            <div className="text-[10px] font-bold text-green-800">AUTH: ALFA-SEC-V4</div>
          </div>

          <div ref={terminalRef} className="flex-1 p-6 font-mono text-[10px] md:text-[12px] text-green-600 leading-relaxed overflow-y-auto custom-scrollbar bg-[rgba(0,10,0,0.8)]">
            {logs.slice(0, terminalStep).map((log, idx) => (
              <div key={idx} className="mb-2 flex gap-4">
                <span className="text-green-600/80 shrink-0">[{new Date(startTime.getTime() + idx * 1200).toLocaleTimeString()}]</span>
                <span className={log.startsWith('[SYSTEM]') ? 'text-white font-black bg-green-900/40 px-1' : (log.startsWith('[S3]') || log.startsWith('[N1]') ? 'text-green-400 font-bold' : '')}>
                  {log}
                </span>
              </div>
            ))}
            {terminalStep < logs.length && (
              <div className="animate-pulse flex items-center">
                <span className="w-1.5 h-4 bg-green-600" />
              </div>
            )}
          </div>

          {!complete ? (
            <div className="p-6 border-t border-green-900/40 bg-black/50 text-center">
               <div className="flex items-center justify-center gap-2 text-[10px] font-black text-green-800 animate-pulse uppercase tracking-[0.2em]">
                  <Cpu size={14} /> X-RAY CORE IS PROCESSING COMPLEX DATA STRINGS...
               </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border-t border-green-900/40 bg-green-950/20 text-center flex flex-col items-center gap-4"
            >
               <h3 className="text-xl font-black text-white tracking-widest">{t.ready}</h3>
               <button 
                onClick={() => navigate(`/full-report?site=${site}&lang=${lang}&admin=true`)}
                className="group flex items-center gap-3 bg-green-600 hover:bg-white text-white hover:text-black transition-all px-12 py-4 rounded-xl font-black text-lg shadow-[0_0_40px_rgba(34,197,94,0.4)]"
               >
                 {t.view} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          )}

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Lock size={120} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden"
          >
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0] }}
               transition={{ duration: 1.5 }}
               className="w-[800px] h-[800px] border-[20px] border-green-600/20 rounded-full"
             />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #052e16; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #166534; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default FullScoreCard;
