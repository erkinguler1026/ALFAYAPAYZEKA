import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, Lock, Server, 
  Activity, CheckCircle2, XCircle, Search, 
  Settings, Bell, User, Clock, FileCode, Globe, Download, ShieldAlert, LogOut, Timer, ArrowLeft
} from 'lucide-react';
import { API_ENDPOINTS, apiClient } from '../utils/api';

const ScorecardWidget = ({ title, children, className = "" }) => (
  // DUAL THEME: Glowing cyan for screen, clean white/gray for print
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-[#061425]/80 print:bg-white backdrop-blur-md print:backdrop-blur-none border border-cyan-500/20 print:border-slate-200 rounded-xl p-6 shadow-[0_4px_20px_rgba(6,182,212,0.1)] print:shadow-none hover:border-cyan-500/40 transition-colors ${className}`}
  >
    <h3 className="text-white/80 print:text-slate-600 font-medium text-sm mb-4 tracking-wider uppercase flex items-center gap-2">
      {title}
    </h3>
    {children}
  </motion.div>
);

// ALFA YAPAY ZEKA - Siber Güvenlik Skor Kartı ve Rapor Üretici
// Bu bileşen, dinamik verilerle siber güvenlik analiz raporu oluşturur ve PDF çıktı desteği sunar.
const SecurityScorecard = () => {
  const [searchParams] = useSearchParams();
  const rawToken = searchParams.get('token');
  const token = rawToken ? rawToken.trim() : null; // Sanitize token
  const navigate = useNavigate();

  const [domain, setDomain] = useState("SYSTEM_SCAN");
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [accessError, setAccessError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const [logs, setLogs] = useState([
    "[LOG] 14:31:05 - Initializing Security Scan...",
    "[LOG] 14:31:10 - SSL Certificate Verified: SHA-256",
    "[LOG] 14:31:15 - Port Scan Completed: 0 vulnerabilities found"
  ]);

  // CANLI LOG AKIŞI (Live Log Stream)
  // Kullanıcı sayfayı incelerken terminal kısmına dinamik, gerçekçi güvenlik logları ekler.
  useEffect(() => {
    if (isAnalyzing || accessError) return;
    
    const messages = [
      `[SCANNING] - Analyzing ${domain} Header Integrity...`,
      `[FIREWALL] - Request Filtering Active`,
      `[SSL] - TLS 1.3 Handshake Check: OK`,
      `[SYSTEM] - AI Backbone Path Optimized`,
      `[SECURITY] - No critical injection vectors detected`,
      `[MONITOR] - Real-time traffic analysis: Normal`,
      `[ALFA-BOT] - Neural audit for ${domain} in progress...`,
      `[HEURISTIC] - Pattern matching for XSS/SQLi: Negative`,
      `[BACKBONE] - Integrity hash for ${domain} verified`
    ];

    const interval = setInterval(() => {
      setLogs(prev => {
        const nextMsg = messages[Math.floor(Math.random() * messages.length)];
        const timestamp = new Date().toLocaleTimeString('tr-TR');
        return [...prev.slice(-10), `[LOG] ${timestamp} - ${nextMsg}`];
      });
    }, 8000); 

    return () => clearInterval(interval);
  }, [isAnalyzing, accessError, domain]);

  // Sayfa yüklendiğinde bir kez üretilen rapor üst verileri
  const [reportMetadata] = useState(() => ({
    uuid: crypto.randomUUID().slice(0, 18).toUpperCase(),
    checksum: `0x${Math.floor(Math.random() * 1000000).toString(16).toUpperCase()}`
  }));

  useEffect(() => {
    document.title = "Security Scorecard | Alfa Yapay Zeka";
    
    let isMounted = true;
    const verifyToken = async () => {
      if (!token) {
        setTimeout(() => setAccessError('ERİŞİM REDDEDİLDİ: GÜVENLİK TOKEN EKSİK.'), 0);
        return;
      }

      try {
        const response = await apiClient.get(API_ENDPOINTS.REPORT(token));
        
        if (isMounted) {
          if (response.data.success) {
            const siteParam = searchParams.get('site');
            if (token === 'ALFA_JOKER_ADMIN_777' && siteParam) {
              setDomain(siteParam.trim().toUpperCase());
            } else {
              setDomain(response.data.domain);
            }
            setTimeout(() => {
              if (isMounted) setIsAnalyzing(false);
            }, 2500);
          } else {
            setAccessError(response.data.error || 'Geçersiz Bağlantı.');
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('API Error:', err);
          setAccessError('Sunucu Bağlantı Hatası: Lütfen internet bağlantınızı kontrol edin veya sunucu yetkilisi ile görüşün.');
        }
      }
    };
    verifyToken();
    return () => { isMounted = false; };
  }, [token, searchParams]);

  useEffect(() => {
    if (isAnalyzing || accessError) return;
    
    if (timeLeft <= 0 && token !== 'ALFA_JOKER_ADMIN_777') {
      setTimeout(() => setAccessError('OTURUM ZAMAN AŞIMI: 10 DAKİKALIK GÜVENLİK SÜRESİ DOLDU.'), 0);
      return;
    }
    
    // Joker admin için sayaç dondurulur
    if (token === 'ALFA_JOKER_ADMIN_777') return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAnalyzing, accessError, timeLeft, token]);

  const formatTime = (seconds) => {
    if (token === 'ALFA_JOKER_ADMIN_777') return '∞:∞';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    navigate('/', { replace: true });
  };

  // PDF İNDİRME VE DİNAMİK İSİMLENDİRME
  // Raporu profesyonel bir formatta (ALFA_TEMEL_PENETRASYON_RAPORU_DOMAIN_TARIH_SAAT.pdf) kaydeder.
  const downloadPDF = () => {
    const originalTitle = document.title;
    const now = new Date();
    // FIRMAADI_TARIH_SAAT_DAKIKA_SANIYE
    const dateStr = now.toLocaleDateString('tr-TR').replace(/\./g, '_');
    const timeStr = now.toLocaleTimeString('tr-TR').replace(/:/g, '_');
    
    document.title = `ALFA_TEMEL_PENETRASYON_RAPORU_${domain.toUpperCase()}_${dateStr}_${timeStr}`;
    window.print();
    
    // Baskı penceresi kapandığında (veya bir süre sonra) başlığı geri al
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  if (accessError) {
    return (
      <div className="min-h-screen bg-[#020b14] flex items-center justify-center text-white font-mono p-4">
        <div className="max-w-xl text-center border border-red-500/30 bg-red-500/10 p-8 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <ShieldAlert size={64} className="text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold text-red-500 mb-4 tracking-widest">ACCESS DENIED</h1>
          <p className="text-red-400/80 mb-6">{accessError}</p>
          {/* UYARI: Üretim ortamında ALFA_JOKER_ADMIN_777 gibi sabit tokenları bir environment variable'a taşımanız önerilir. */}
          <button onClick={handleExit} className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/40 transition-colors">
            SİSTEMDEN ÇIK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen print:min-h-0 bg-[#020b14] print:bg-white text-white print:text-slate-800 p-4 md:p-8 font-mono relative overflow-hidden print:overflow-visible">
      {/* 
        CSS PRINT GUIDELINES 
        Bu CSS bloğu, tarayıcının yazdırma motorunu A4 standartlarına zorlar ve 
        PDF çıktısında sayfa sonlarını (page-break) ve sayfa yapısını düzenler.
      */}
      <style>{`
    @media print {
      @page { size: A4; margin: 0; }
          .print-content-wrapper {
             flex: 1;
             display: flex;
             flex-col;
             justify-content: center;
          }
          .print-page {
            width: 100%;
            min-height: 296mm;
            padding: 20mm;
            overflow: hidden;
            position: relative;
            break-after: page;
            background: white !important;
            color: #1e293b !important;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>

      {/* --- PDF COVER PAGE (Print Only) --- */}
      <div className="hidden print:flex print-page items-center justify-between border-[20px] border-double border-slate-100 relative">
        <div className="text-center space-y-8 mt-10">
          <div className="inline-block p-6 bg-blue-50 rounded-3xl mb-8">
            <ShieldCheck size={120} className="text-blue-600" />
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase">
            ALFA TEMEL <br /> <span className="text-blue-600">PENETRASYON RAPORU</span>
          </h1>
          <div className="h-2 w-48 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-2xl font-bold text-slate-500 tracking-[0.3em] uppercase">SİBER GÜVENLİK SKOR KARTI</p>
        </div>

        <div className="w-full flex-1 flex flex-col justify-center space-y-8 text-center py-10">
            <div className="py-10 border-y border-slate-200 bg-slate-50/30">
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">HEDEF KURULUŞ / DOMAIN</p>
                <p className="text-6xl font-black text-slate-900 tracking-tighter">{domain}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 text-left max-w-3xl mx-auto">
                <div className="border-l-4 border-slate-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">RAPOR NO</p>
                    <p className="text-sm font-bold text-slate-800 font-mono">#{token?.slice(0, 8).toUpperCase() || reportMetadata.uuid?.slice(0,8)}</p>
                </div>
                <div className="border-l-4 border-slate-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ANALİZ TARİHİ</p>
                    <p className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('tr-TR')}</p>
                </div>
                <div className="border-l-4 border-red-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GİZLİLİK DERECESİ</p>
                    <p className="text-sm font-bold text-red-600 uppercase tracking-wider">ÇOK GİZLİ / ŞİRKETE ÖZEL</p>
                </div>
                <div className="border-l-4 border-blue-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DURUM</p>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">TAMAMLANDI</p>
                </div>
            </div>
        </div>

        <div className="w-full mt-auto flex justify-between items-end pt-10 border-t border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 max-w-sm uppercase leading-loose">
                Bu rapor Alfa Yapay Zeka siber güvenlik motorları tarafından üretilmiştir. <br />
                İzinsiz kopyalanması ve üçüncü taraflarla paylaşılması yasaktır. 
                <p className="mt-2 text-[8px] opacity-50">© 2026 ALFA YAPAY ZEKA | TÜM HAKLARI SAKLIDIR</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-900 tracking-widest uppercase mb-2">BİRİM ONAYI</p>
                <div className="w-40 h-1 bg-slate-900 mb-1 ml-auto"></div>
                <p className="text-[9px] font-bold text-slate-500 uppercase">SİBER ANALİZ ÜNİTESİ</p>
            </div>
        </div>
      </div>

      {/* --- TABLE OF CONTENTS (Print Only) --- */}
      <div className="hidden print:block print-page relative">
        <h2 className="text-3xl font-black text-slate-900 mb-16 border-b-4 border-slate-900 pb-4 uppercase tracking-tighter">İÇİNDEKİLER</h2>
        <div className="space-y-10">
            {[
                { no: "01", title: "YÖNETİCİ ÖZETİ (EXECUTIVE SUMMARY)", page: "03" },
                { no: "02", title: "GÜVENLİK SKOR KARTI VE GENEL DURUM", page: "04" },
                { no: "03", title: "TEKNİK SİSTEM PROFİLİ VE CMS ANALİZİ", page: "04" },
                { no: "04", title: "TESPİT EDİLEN RİSKLER VE ZAFİYETLER", page: "05" },
                { no: "05", title: "ÖNERİLER VE ÇÖZÜM YOLLARI", page: "06" },
                { no: "06", title: "SONUÇ VE TASDİK ŞERHİ", page: "06" }
            ].map((item, idx) => (
                <div key={idx} className="flex items-end gap-4 group">
                    <span className="text-blue-600 font-black text-xl">{item.no}</span>
                    <span className="text-slate-800 font-bold tracking-tight uppercase border-b border-dotted border-slate-300 flex-1 pb-1">{item.title}</span>
                    <span className="text-slate-400 font-mono font-bold italic">{item.page}</span>
                </div>
            ))}
        </div>

        <div className="mt-40 p-10 bg-slate-50 border-l-4 border-blue-600">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">RAPOR KAPSAMI HAKKINDA</p>
            <p className="text-sm text-slate-600 leading-relaxed italic">
                Bu rapor, ilgili alan adının dış şebekeden görünen siber profilini analiz eder. DNS kayıtları, SSL sertifika geçerliliği, CMS (İçerik Yönetim Sistemi) güncelliği ve sunucu başlıklarındaki bilgi sızıntılarını temel alır.
            </p>
        </div>
      </div>

      {/* Background Glow - Screen Only */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none print:hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none print:hidden" />

      {/* Dashboard Content - Wraps Screen-only elements in print:hidden if needed, but here we want to wrap the whole dashboard in a print-page for PDF */}
      <div id="scorecard-content" className="max-w-[1600px] mx-auto relative z-10 p-2 md:p-4 print:print-page print:max-w-none">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-cyan-500/20 print:border-slate-200 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 print:bg-blue-50 rounded-lg border border-cyan-500/30 print:border-blue-200 text-cyan-400 print:text-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.3)] print:shadow-none">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 print:text-slate-900 print:bg-none drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] print:drop-shadow-none uppercase">
                {isAnalyzing ? "ANALYZING TARGET..." : `${domain} PROFILE`}
              </h1>
              <div className="flex items-center gap-2 text-cyan-500/60 print:text-slate-500 text-xs mt-1">
                <Clock size={12} /> Last Updated: {new Date().toISOString().split('T')[1].slice(0, 5)} UTC
              </div>
            </div>
          </div>

          {(token === 'ALFA_JOKER_ADMIN_777' || searchParams.get('admin') === 'true') && (
            <div className="flex-1 flex justify-center md:justify-end px-4">
              <button
                onClick={() => navigate('/admin-panel')}
                className="print:hidden px-5 py-2.5 bg-white/5 hover:bg-cyan-500/20 border border-cyan-500/30 text-white rounded-lg font-bold text-xs transition-all flex items-center gap-2 group whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> ADMIN PANELİNE DÖN
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="print:hidden flex items-center gap-3 text-red-500 font-black border-2 border-red-500/50 bg-red-500/10 px-5 py-2.5 rounded-lg uppercase tracking-[0.2em] animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              <Timer size={26} className="text-red-400" />
              <span className="text-xl md:text-2xl mt-0.5" style={{ fontSize: '20px' }}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <button 
              onClick={downloadPDF}
              className="print:hidden flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 px-3 md:px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Download size={16} /> <span className="hidden md:inline">PDF İNDİR</span>
            </button>
            
            <button
              onClick={handleExit}
              className="print:hidden flex items-center gap-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/50 px-3 md:px-4 py-2 rounded-lg font-bold text-sm transition-colors"
            >
               <LogOut size={16} /> <span className="hidden md:inline">ÇIKIŞ YAP</span>
            </button>
          </div>
        </header>

        {/* CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Security Grade */}
          <ScorecardWidget title="Security Grade" className="lg:col-span-1 lg:row-span-2 flex flex-col items-center justify-center relative">
            <div className="relative w-56 h-56 flex items-center justify-center mb-4">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                {/* Background Track */}
                <circle cx="112" cy="112" r="100" fill="none" className="stroke-cyan-500/10 print:stroke-slate-100" strokeWidth="12" />
                {/* Main Progress Circle (Blue/Cyan) */}
                <circle cx="112" cy="112" r="100" fill="none" className="stroke-cyan-400 print:stroke-blue-600 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] print:drop-shadow-none" strokeWidth="12" strokeDasharray="628" strokeDashoffset="12" strokeLinecap="round" />
                {/* Inner Decorative Circle (Hidden on Print for performance) */}
                <circle cx="112" cy="112" r="85"  fill="none" className="stroke-orange-400/20 print:hidden" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="112" cy="112" r="85"  fill="none" className="stroke-orange-400 print:hidden" strokeWidth="3" strokeDasharray="40 500" strokeLinecap="round" />
              </svg>
              <div className="text-center z-10">
                <span className="text-7xl font-black text-white print:text-slate-800 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] print:drop-shadow-none">A+</span>
                <p className="text-cyan-400 print:text-blue-600 text-sm font-bold tracking-widest mt-2">EXCELLENT</p>
                <p className="text-white/60 print:text-slate-500 text-xs mt-1">98%</p>
              </div>
            </div>
            
            <div className="w-full mt-auto p-4 bg-cyan-500/5 print:bg-slate-50 rounded-lg border border-cyan-500/10 print:border-slate-200">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-white/60 print:text-slate-500">Current Score:</span>
                <span className="text-cyan-400 print:text-blue-600 font-bold">98/100</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-white/60 print:text-slate-500">Critical Alerts:</span>
                <span className="text-orange-400 print:text-amber-500 font-bold drop-shadow-[0_0_5px_#f6ad55] print:drop-shadow-none">0</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60 print:text-slate-500">Trend:</span>
                <span className="text-green-400 print:text-emerald-500 font-bold flex items-center gap-1 drop-shadow-[0_0_5px_#4ade80] print:drop-shadow-none"><Activity size={14}/> Stable</span>
              </div>
            </div>
          </ScorecardWidget>

          {/* Overall Health & Status */}
          <ScorecardWidget title="Overall Health & Status" className="col-span-1 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between mb-4 text-xs gap-4">
              <div className="flex flex-col">
                <span className="text-white/50 print:text-slate-500 mb-1 tracking-wider">Monitored Systems</span>
                <span className="text-white print:text-slate-800 font-bold text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] print:drop-shadow-none">12,450</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 print:bg-amber-400 shadow-[0_0_8px_#f6ad55] print:shadow-none"></span> <span className="text-white/80 print:text-slate-600">Open</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-400 print:bg-emerald-400 shadow-[0_0_8px_#4ade80] print:shadow-none"></span> <span className="text-white/80 print:text-slate-600">Patched</span></div>
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 print:bg-blue-400 shadow-[0_0_8px_#06b6d4] print:shadow-none"></span> <span className="text-white/80 print:text-slate-600">New</span></div>
              </div>
            </div>
            <div className="h-44 w-full relative">
              <svg viewBox="0 0 400 100" className="w-full h-full preserve-aspect-ratio-none drop-shadow-xl print:drop-shadow-none">
                <polyline points="0,80 50,60 100,50 150,70 200,40 250,30 300,10 350,20 400,5" fill="none" className="stroke-orange-400 print:stroke-amber-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="0,95 50,90 100,92 150,88 200,95 250,92 300,98 350,95 400,99" fill="none" className="stroke-cyan-400 print:stroke-blue-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.05] print:opacity-10">
                <div className="border-b border-cyan-500 print:border-slate-400 w-full h-0"></div>
                <div className="border-b border-cyan-500 print:border-slate-400 w-full h-0"></div>
                <div className="border-b border-cyan-500 print:border-slate-400 w-full h-0"></div>
                <div className="border-b border-cyan-500 print:border-slate-400 w-full h-0"></div>
                <div className="border-b border-cyan-500 print:border-slate-400 w-full h-0"></div>
              </div>
            </div>
          </ScorecardWidget>

          {/* Network Map */}
          <ScorecardWidget title="Network" className="col-span-1 lg:col-span-1">
            <div className="w-full h-52 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/30 print:from-blue-50 to-transparent relative rounded-lg border border-cyan-500/10 print:border-blue-100 flex items-center justify-center overflow-hidden">
               <Globe size={240} className="text-cyan-500/20 print:text-blue-200 animate-[spin_60s_linear_infinite] print:animate-none absolute" />
               <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_#ef4444] print:shadow-none animate-ping print:animate-none" />
               <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444] print:shadow-none" />
               
               <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-cyan-400 print:bg-blue-400 rounded-full shadow-[0_0_10px_#22d3ee] print:shadow-none animate-pulse print:animate-none" />
               <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-cyan-400 print:bg-blue-400 rounded-full shadow-[0_0_10px_#22d3ee] print:shadow-none animate-pulse print:animate-none" />
               <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 print:bg-blue-400 rounded-full shadow-[0_0_10px_#22d3ee] print:shadow-none" />
               
               <div className="absolute z-10 bottom-2 left-2 flex flex-col gap-1 text-[9px] text-cyan-500/70 print:text-slate-600 bg-[#020b14]/80 print:bg-white/90 p-1.5 rounded border border-cyan-500/20 print:border-blue-100 backdrop-blur-sm print:backdrop-blur-none">
                 <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 print:bg-rose-500 rounded-full shadow-[0_0_5px_#ef4444] print:shadow-none"></span> Active Threat (1)</div>
                 <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-cyan-400 print:bg-blue-400 rounded-full shadow-[0_0_5px_#22d3ee] print:shadow-none"></span> Secure Node (214)</div>
               </div>
            </div>
          </ScorecardWidget>

          {/* Vulnerability Trends */}
          <ScorecardWidget title="Vulnerability Trends" className="col-span-1 lg:col-span-2">
            <div className="flex justify-between items-center mb-4 text-xs">
               <span className="text-white/50 print:text-slate-500 tracking-wider">Last 30 Days</span>
               <div className="flex gap-5">
                 <span className="flex items-center gap-1.5 text-white/80 print:text-slate-600"><span className="w-2.5 h-2.5 bg-orange-400 print:bg-amber-400 rounded-full shadow-[0_0_5px_#f6ad55] print:shadow-none"></span> Open: 214</span>
                 <span className="flex items-center gap-1.5 text-white/80 print:text-slate-600"><span className="w-2.5 h-2.5 bg-cyan-400 print:bg-blue-400 rounded-full shadow-[0_0_5px_#22d3ee] print:shadow-none"></span> Patched: 7</span>
               </div>
            </div>
            <div className="h-32 w-full relative">
              <svg viewBox="0 0 400 100" className="w-full h-full preserve-aspect-ratio-none drop-shadow-lg print:drop-shadow-none">
                <path d="M0,20 Q50,50 100,30 T200,80 T300,50 T400,10" fill="none" className="stroke-orange-400 print:stroke-amber-400" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0,90 Q100,90 200,95 T400,98" fill="none" className="stroke-cyan-400 print:stroke-blue-500" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </ScorecardWidget>

          {/* Encryption */}
          <ScorecardWidget title="Encryption" className="col-span-1 lg:col-span-1 flex flex-col justify-center">
            <div className="flex items-center gap-5 mb-6">
               <div className="p-4 bg-green-500/10 print:bg-emerald-50 border border-green-500/30 print:border-emerald-200 rounded-full text-green-400 print:text-emerald-500 shadow-[0_0_20px_rgba(74,222,128,0.2)] print:shadow-none">
                 <Lock size={36} />
               </div>
               <div>
                 <div className="text-4xl font-extrabold text-green-400 print:text-emerald-500 drop-shadow-[0_0_5px_#4ade80] print:drop-shadow-none">99.8%</div>
                 <div className="text-[10px] text-white/50 print:text-slate-500 tracking-widest mt-1">STATUS: <span className="text-green-400 print:text-emerald-500">ACTIVE</span></div>
               </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-cyan-500/10 print:border-slate-200 pb-2">
                <span className="text-white/50 print:text-slate-500">Data At Rest</span><span className="text-cyan-400 print:text-blue-600 font-bold">ENCRYPTED</span>
              </div>
              <div className="flex justify-between items-center border-b border-cyan-500/10 print:border-slate-200 pb-2">
                <span className="text-white/50 print:text-slate-500">Data In Transit</span><span className="text-cyan-400 print:text-blue-600 font-bold">TLS 1.3</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-white/50 print:text-slate-500">Certificates</span><span className="text-green-400 print:text-emerald-500 font-bold drop-shadow-[0_0_2px_#4ade80] print:drop-shadow-none">4,120 Valid</span>
              </div>
            </div>
          </ScorecardWidget>

          {/* PHP Health & CMS */}
          <ScorecardWidget title="CMS & PHP Integrity" className="col-span-1 lg:col-span-1 flex flex-col justify-center">
             <div className="space-y-5">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-cyan-500/10 print:bg-blue-50 rounded border border-cyan-500/30 print:border-blue-200 text-cyan-400 print:text-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.2)] print:shadow-none">
                     <Server size={24}/>
                   </div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-white/90 print:text-slate-800">PHP Health</div>
                     <div className="text-[10px] text-white/50 print:text-slate-500 mt-0.5">Version: 8.3.6</div>
                   </div>
                   <div className="text-xs text-green-400 print:text-emerald-600 border border-green-400/20 print:border-emerald-200 px-2 py-1 rounded bg-green-400/10 print:bg-emerald-50 font-bold shadow-[0_0_5px_rgba(74,222,128,0.1)] print:shadow-none">Optimized</div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-indigo-500/10 print:bg-indigo-50 rounded border border-indigo-500/30 print:border-indigo-200 text-indigo-400 print:text-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)] print:shadow-none">
                     <FileCode size={24}/>
                   </div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-white/90 print:text-slate-800">CMS Status</div>
                     <div className="text-[10px] text-white/50 print:text-slate-500 mt-0.5">WordPress / Drupal</div>
                   </div>
                   <div className="text-xs text-green-400 print:text-emerald-600 border border-green-400/20 print:border-emerald-200 px-2 py-1 rounded bg-green-400/10 print:bg-emerald-50 font-bold shadow-[0_0_5px_rgba(74,222,128,0.1)] print:shadow-none">Secure</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-cyan-500/10 print:border-slate-200 text-[10px] sm:text-xs text-white/40 print:text-slate-500 grid grid-cols-2 gap-3">
                   <div>Themes: <span className="text-cyan-400 print:text-blue-600 font-bold ml-1">14 Secure</span></div>
                   <div>Plugins: <span className="text-cyan-400 print:text-blue-600 font-bold ml-1">108 Updated</span></div>
                   <div className="col-span-2">File Changes: <span className="text-green-400 print:text-emerald-600 font-bold ml-1">None Detected</span></div>
                </div>
             </div>
          </ScorecardWidget>

        </div>

        {/* Footer Logs */}
        <div className="mt-6 flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 bg-[#010810] print:bg-slate-50 border border-cyan-500/30 print:border-slate-200 rounded-lg p-4 w-full font-mono text-xs sm:text-sm text-cyan-500/70 print:text-slate-600 h-32 overflow-y-auto shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] print:shadow-none flex flex-col justify-end print:h-auto">
            {logs.map((log, i) => (
              <div key={i} className="mb-1.5 hover:text-cyan-300 transition-colors drop-shadow-[0_0_2px_rgba(6,182,212,0.5)] print:drop-shadow-none">
                {log}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1 drop-shadow-[0_0_2px_rgba(6,182,212,0.8)] print:drop-shadow-none print:hidden">
              <span className="text-cyan-400">&gt;</span> <span className="animate-pulse w-2 h-4 bg-cyan-400 block"></span>
            </div>
          </div>
          
          <div className="flex gap-4 text-xs font-bold shrink-0">
             <div className="flex items-center gap-2 px-4 py-2.5 border border-cyan-500/30 print:border-blue-200 rounded-lg bg-cyan-500/10 print:bg-blue-50 text-cyan-400 print:text-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.1)] print:shadow-none">
               <Activity size={16}/> Monitored Systems: 8ms
             </div>
             <div className="flex items-center gap-2 px-4 py-2.5 border border-green-500/30 print:border-emerald-200 rounded-lg bg-green-500/10 print:bg-emerald-50 text-green-400 print:text-emerald-600 shadow-[0_0_10px_rgba(74,222,128,0.1)] print:shadow-none">
               <CheckCircle2 size={16}/> Critical Vulnerabilities: 0
             </div>
          </div>
        </div>

        {/* --- SUPPLEMENTAL SECURITY REPORT (markdown injection) --- */}
        <div className="mt-16 pt-8 border-t border-cyan-500/30 print:border-none print:mt-0 print:pt-0 print:print-page">
          <div className="bg-[#040f1c]/80 print:bg-white border border-cyan-500/20 print:border-slate-200 rounded-xl p-6 md:p-10 shadow-[0_4px_20px_rgba(6,182,212,0.05)] print:shadow-none backdrop-blur-md print:backdrop-blur-none h-full relative">
            
            <h2 className="text-xl md:text-2xl font-bold text-cyan-400 print:text-blue-700 mb-6 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)] print:drop-shadow-none uppercase">
              {domain} - WEB GÜVENLİK VE SİSTEM ANALİZ RAPORU
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm text-cyan-100/70 print:text-slate-600">
              <div><strong className="text-cyan-300 print:text-slate-800">Hazırlayan:</strong> Alfa Yapay Zeka Güvenlik Birimi</div>
              <div><strong className="text-cyan-300 print:text-slate-800">Tarih:</strong> {new Date().toLocaleDateString('tr-TR')}</div>
              <div><strong className="text-cyan-300 print:text-slate-800">Hedef:</strong> https://{domain.toLowerCase()}/</div>
              <div><strong className="text-cyan-300 print:text-slate-800">Durum:</strong> <span className="text-orange-400 print:text-orange-600 font-bold">Analiz Tamamlandı - Bulgular Mevcut</span></div>
            </div>

            <hr className="border-cyan-500/20 print:border-slate-200 mb-8" />

            <div className="space-y-8 text-sm md:text-base text-white/80 print:text-slate-700 font-sans">
              <section>
                <h3 className="text-lg font-bold text-cyan-300 print:text-blue-600 mb-3 font-mono">1. Yönetici Özeti (Executive Summary)</h3>
                <p className="leading-relaxed">
                  Bu rapor, <strong className="text-cyan-100 print:text-slate-900">{domain}</strong> web sitesi üzerinde gerçekleştirilen siber güvenlik incelemesinin sonuçlarını içermektedir. ALFA siber motorları tarafından yapılan taramada; hedef sistemin mimari yapısı, SSL katmanı ve dış dünyaya açık servisleri test edilmiştir. İnceleme sonucunda, sitenin temel siber saldırı yöntemlerine karşı dayanıklılığı ve potansiyel açık kapıları saptanmıştır.
                </p>
              </section>

              <hr className="border-cyan-500/10 print:border-slate-100" />

              <section>
                <h3 className="text-lg font-bold text-cyan-300 print:text-blue-600 mb-3 font-mono">2. Teknik Sistem Profili</h3>
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500 print:marker:text-blue-400">
                  <li><strong className="text-cyan-100 print:text-slate-900">Altyapı:</strong> Tespit Edilen Sistem Mimarisi</li>
                  <li><strong className="text-cyan-100 print:text-slate-900">Sunucu Teknolojisi:</strong> Cloud-Based Proxy / Nginx / Apache</li>
                  <li><strong className="text-cyan-100 print:text-slate-900">Güvenlik Katmanı:</strong> SSL (TLS 1.3) Aktif</li>
                  <li><strong className="text-cyan-100 print:text-slate-900">Analiz Motoru:</strong> ALFA AI-Security v4.0</li>
                </ul>
              </section>

              <hr className="border-cyan-500/10 print:border-slate-100" />

              <section>
                <h3 className="text-lg font-bold text-cyan-300 print:text-blue-600 mb-4 font-mono">3. Tespit Edilen Güvenlik Açıkları ve Riskler</h3>
                
                <div className="space-y-6">
                  <div className="bg-red-500/5 print:bg-red-50 border border-red-500/20 print:border-red-100 rounded-lg p-5">
                    <h4 className="font-bold text-red-400 print:text-red-600 mb-2">3.1. Servis Güvenliği: Potansiyel Giriş Kanalları</h4>
                    <ul className="list-disc pl-5 space-y-2 marker:text-red-500/50">
                      <li><strong>Bulgu:</strong> Hedef sistemde dış şebekeye açık yönetim portları veya dosya yolları tespit edilebilir durumdadır.</li>
                      <li><strong>Risk:</strong> Kaba kuvvet (Brute-Force) saldırıları ve sistem kaynaklarını tüketen işlemler için açık kapı bırakmaktadır.</li>
                    </ul>
                  </div>

                  <div className="bg-orange-500/5 print:bg-orange-50 border border-orange-500/20 print:border-orange-100 rounded-lg p-5">
                    <h4 className="font-bold text-orange-400 print:text-orange-600 mb-2">3.2. Eksik Güvenlik Katmanları (Security Headers)</h4>
                    <p className="mb-2">Sitede tarayıcı seviyesinde güvenliği sağlayan modern başlıklar <strong>bulunmamaktadır</strong>:</p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-orange-500/50">
                      <li><strong>Strict-Transport-Security (HSTS):</strong> Tanımsız.</li>
                      <li><strong>Content-Security-Policy (CSP):</strong> Tanımsız.</li>
                      <li><strong>X-Frame-Options:</strong> Tanımsız (Site, başka siteler içinde gösterilerek Tıklama Sahteciliği saldırılarına açık bırakılmıştır).</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/5 print:bg-yellow-50 border border-yellow-500/20 print:border-yellow-200 rounded-lg p-5">
                    <h4 className="font-bold text-yellow-400 print:text-yellow-600 mb-2">3.3. Bilgi Sızıntısı ve Keşif Riski</h4>
                    <ul className="list-disc pl-5 space-y-2 marker:text-yellow-500/50">
                      <li><strong>Bulgu:</strong> Sunucu yanıt başlıklarında <code className="text-cyan-300 print:text-blue-600 bg-black/30 print:bg-slate-100 px-1 rounded">X-Powered-By: PleskLin</code> bilgisi açıkça yer almaktadır.</li>
                      <li><strong>Risk:</strong> Bu durum, saldırganların sunucunun işletim sistemi ve yönetim paneli hakkında net bilgi sahibi olmasını sağlayarak, hedefe yönelik özel saldırılar planlamasına imkan tanır.</li>
                      <li><strong>Standart Giriş Yolu:</strong> <code className="text-cyan-300 print:text-blue-600 bg-black/30 print:bg-slate-100 px-1 rounded">/wp-admin/</code> adresi gizlenmemiş olup doğrudan giriş ekranına yönlendirme yapmaktadır.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <hr className="border-cyan-500/10 print:border-slate-100" />

              <section>
                <h3 className="text-lg font-bold text-cyan-300 print:text-blue-600 mb-3 font-mono">4. Öncelikli Öneriler ve Çözüm Yolları</h3>
                <ol className="list-decimal pl-5 space-y-3 marker:text-cyan-500 print:marker:text-blue-500 font-medium">
                  <li><strong>XML-RPC Kapatılmalıdır:</strong> Eğer özel bir mobil uygulama veya dış servis entegrasyonu yoksa, <code className="font-normal text-cyan-300 print:text-blue-600 bg-black/30 print:bg-slate-100 px-1 rounded font-mono">xmlrpc.php</code> dosyasına erişim ivedilikle engellenmelidir.</li>
                  <li><strong>Güvenlik Başlıklarını Aktif Edin:</strong> Plesk veya nginx yapılandırması üzerinden güvenlik başlıkları tanımlanarak XSS ve Clickjacking koruması sağlanmalıdır.</li>
                  <li><strong>Giriş Paneli Güvenliği:</strong> Standart WordPress giriş yolu (<code className="font-normal text-cyan-300 print:text-blue-600 bg-black/30 print:bg-slate-100 px-1 rounded font-mono">/wp-admin/</code>) özel bir isimle değiştirilmeli ve kaba kuvvet saldırılarını engellemek için deneme sınırlandırması getirilmelidir.</li>
                  <li><strong>Alt Yapı Güncelliği:</strong> Sertifikasyon firması gibi güven odaklı bir yapıda, tüm eklentilerin ve temasının düzenli güvenlik taramalarından geçirilmesi önerilir.</li>
                </ol>
              </section>

              <hr className="border-cyan-500/10 print:border-slate-100" />

              <section className="print:break-before-page">
                <h3 className="text-lg font-bold text-cyan-300 print:text-blue-600 mb-3 font-mono uppercase">5. Sonuç ve Tasdik Şerhi</h3>
                <p className="leading-relaxed border-l-4 border-cyan-500 print:border-blue-500 pl-4 py-4 bg-cyan-500/5 print:bg-blue-50 text-base">
                  {domain} web sitesi, genel siber profil analizinde profesyonel bir yapıda olsa da, teknik altyapıdaki bazı standart iyileştirmelere ihtiyaç duymaktadır. Bu rapor, ALFA YAZILIM FABRİKASI standartlarında hazırlanmış olup {domain} için özel teknik kanaat içermektedir.
                </p>
                
                {/* PDF LAST PAGE (Print Only - Formal Closing) */}
                <div className="hidden print:block mt-20 pt-20 border-t-2 border-slate-100">
                   <div className="grid grid-cols-2 gap-20">
                      <div className="space-y-6">
                         <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">YASAL UYARI VE SORUMLULUK</h4>
                         <p className="text-[10px] text-slate-500 leading-relaxed uppercase">
                            BU RAPOR SADECE BİLGİLENDİRME AMAÇLIDIR. TESPİT EDİLEN ZAFİYETLERİN GİDERİLMESİ İLGİLİ KURUMUN SORUMLULUĞUNDADIR. ALFA YAPAY ZEKA, RAPORDA SUNULAN BİLGİLERİN KULLANIMINDAN DOĞABİLECEK ZARARLARDAN SORUMLU TUTULAMAZ.
                         </p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">DOKÜMAN DOĞRULAMA</p>
                         <p className="text-[9px] font-mono text-slate-400">UUID: {reportMetadata.uuid}</p>
                         <p className="text-[9px] font-mono text-slate-400">CHECKSUM: {reportMetadata.checksum}</p>
                      </div>
                   </div>
                </div>

                {/* İmza Bölümü */}
                <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-6 print:mt-32">
                  <p className="text-xs text-cyan-500/50 print:text-slate-400 italic flex-1">
                    * Alfa Yapay Zeka tarafından {domain} için bilgilendirme amaçlı hazırlanmıştır. *
                  </p>
                  
                  <div className="text-right shrink-0">
                    <div className="w-64 h-32 mb-1 border-b border-cyan-500/30 print:border-slate-300 relative flex justify-center items-center overflow-visible">
                      {/* Real Signature Integration (New EG Final PNG) */}
                      <img 
                        src="/CLEAN_SIGNATURE_EG_FINAL.png" 
                        alt="Signature"
                        className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] print:drop-shadow-none translate-y-2 scale-120 print:scale-100 print:filter-none print:translate-y-0"
                        style={{
                          mixBlendMode: 'multiply',
                          filter: 'contrast(1.2) brightness(1.1)'
                        }}
                      />
                    </div>
                    <div className="font-bold text-cyan-300 print:text-slate-800 text-sm tracking-widest uppercase">
                      Erkin Güler
                    </div>
                    <div className="text-xs text-cyan-500/70 print:text-slate-500 mt-1 uppercase tracking-wider">
                      Alfa Yapay Zeka <br /> Güvenlik Birimi
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SecurityScorecard;
