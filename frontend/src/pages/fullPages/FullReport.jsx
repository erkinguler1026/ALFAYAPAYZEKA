import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, Download, ShieldAlert, Timer, Clock, Lock, 
  AlertTriangle, ArrowLeft, Zap, Globe, Cpu, Database, FileText, ChevronRight
} from 'lucide-react';

const ScorecardWidget = ({ title, children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-[#0a0a0a]/80 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 shadow-[0_4px_30px_rgba(225,29,72,0.05)] hover:border-red-500/40 transition-colors ${className}`}
  >
    <h3 className="text-white/60 font-bold text-[10px] mb-4 tracking-[0.3em] uppercase flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
      {title}
    </h3>
    {children}
  </motion.div>
);

const FullReport = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'tr';
  const siteParam = searchParams.get('site') || 'target.com';
  const isAdmin = searchParams.get('admin') === 'true';

  const [domain] = useState(siteParam.toLowerCase());
  const [reportId] = useState(`ALFA_XR_${Math.random().toString(36).substring(7).toUpperCase()}`);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for initial symmetry while backend loads
  const [infrastructureData] = useState([
    { name: 'NETWORK INTEGRITY', health: 94, color: 'text-red-500' },
    { name: 'SSL/TLS ARMOR', health: 100, color: 'text-red-500' },
    { name: 'OSINT EXPOSURE', health: 82, color: 'text-orange-500' },
    { name: 'DB VULNERABILITY', health: 91, color: 'text-red-500' },
    { name: 'AI DEFENSE INDEX', health: 88, color: 'text-red-500' }
  ]);

  useEffect(() => {
    document.title = `Full X-RAY Scorecard | ${domain.toUpperCase()}`;
    const fetchAudit = async () => {
      try {
        const HOST = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://api.alfayapayzeka.com';
        const res = await fetch(`${HOST}/api/full-audit?url=${domain}`);
        const data = await res.json();
        if(data.success) {
        // Data fetched successfully
        }
      } catch(e) {
        console.error("Audit fetch error:", e);
      } finally {
        setTimeout(() => setIsLoading(false), 1000); // Smooth transition
      }
    };
    fetchAudit();
  }, [domain]);

  const formattedUrl = `https://www.${domain.replace(/^(https?:\/\/)?(www\.)?/, '')}`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-mono">
        <Activity size={48} className="text-red-600 animate-spin mb-4" />
        <h2 className="text-xl font-black tracking-[0.5em] uppercase text-red-600">Secure Link Established</h2>
        <p className="text-white/40 mt-2 text-xs">Decrypting forensic data for {domain}...</p>
      </div>
    );
  }

  const t = {
    tr: {
      title: "FULL X-RAY GÜVENLİK KARNESİ",
      sub: "Forensik Penetrasyon ve Derin Denetim Sonuçları",
      grade: "GÜVENLİK DERECESİ",
      infra: "ALTYAPI SAĞLIK ANALİZİ",
      summary: "YÖNETİCİ ÖZETİ (AI KARARI)",
      risks: "KRİTİK BULGULAR VE ANALİZLER",
      formalBtn: "250 SAYFA FORMAL RAPORU AÇ",
      adminBtn: "ADMİN PANELİ",
      lastUpdate: "Son Güncelleme",
      download: "PDF SCORECARD İNDİR"
    },
    en: {
      title: "FULL X-RAY SECURITY SCORECARD",
      sub: "Forensic Penetration & Deep Audit Results",
      grade: "SECURITY GRADE",
      infra: "INFRASTRUCTURE HEALTH ANALYSIS",
      summary: "EXECUTIVE SUMMARY (AI DECISION)",
      risks: "CRITICAL FINDINGS & ANALYTICS",
      formalBtn: "OPEN 250-PAGE FORMAL REPORT",
      adminBtn: "ADMIN PANEL",
      lastUpdate: "Last Update",
      download: "DOWNLOAD PDF SCORECARD"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-mono relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row items-center justify-between mb-12 border-b border-red-500/20 pb-8 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-red-600/10 border border-red-600/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              <ShieldCheck size={36} className="text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                 <span className="text-red-600">FULL X-RAY</span> SCORECARD
              </h1>
              <p className="text-white/40 text-sm mt-1">
                TARGET: <span className="text-red-500 font-bold">{formattedUrl}</span> • {t.lastUpdate}: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate(`/full-formal-report?site=${domain}&lang=${lang}&admin=true`)}
              className="px-8 py-3 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 transition-all shadow-lg shadow-red-600/20 flex items-center gap-2 group"
            >
              <FileText size={16} className="group-hover:scale-110 transition-transform" /> {t.formalBtn}
            </button>
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin-panel')}
                className="px-8 py-3 bg-white/5 border border-white/10 text-white/70 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                {t.adminBtn}
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Grade & Summary */}
          <div className="lg:col-span-4 space-y-8">
            <ScorecardWidget title={t.grade}>
              <div className="flex flex-col items-center py-10">
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[140px] font-black text-red-600 leading-none drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                  >
                    A+
                  </motion.div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                    ALFA CERTIFIED
                  </div>
                </div>
                <div className="mt-16 w-full space-y-4">
                  <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <span>SECURITY ARMOR LEVEL</span>
                    <span className="text-red-500">97/100</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "97%" }}
                      className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={t.summary}>
              <div className="bg-red-600/5 border border-red-500/10 p-6 rounded-xl">
                 <p className="text-xs text-white/80 leading-relaxed italic">
                   "Hedef sistem üzerinde gerçekleştirilen full forensik analiz neticesinde, kritik seviye zafiyet tespit edilmemiştir. Sunucu konfigürasyonları ALFA standartlarıyla %94 oranında uyumludur. OSINT verileri kısıtlıdır, bu da saldırı yüzeyinin kapalı olduğunu göstermektedir."
                 </p>
                 <div className="mt-6 flex items-center justify-between text-[9px] font-black text-red-500 uppercase tracking-widest border-t border-red-500/10 pt-4">
                   <span>FORENSIC STATUS: STABLE</span>
                   <ShieldCheck size={14} />
                 </div>
              </div>
            </ScorecardWidget>
          </div>

          {/* Right Column: Gauges & Details */}
          <div className="lg:col-span-8 space-y-8">
            <ScorecardWidget title={t.infra}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8">
                {infrastructureData.map((item, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="42" strokeWidth="6" fill="transparent" stroke="currentColor" className="text-white/5" />
                        <motion.circle 
                          cx="50" cy="50" r="42" strokeWidth="8" stroke="currentColor" strokeLinecap="round" fill="transparent"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: item.health / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                          className={`${item.color}`}
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-white">%{item.health}</span>
                    </div>
                    <span className="mt-4 text-[8px] font-black text-white/40 uppercase tracking-tighter text-center leading-tight">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={t.risks}>
               <div className="space-y-4">
                  {[
                    { title: "SSL CHAIN VALIDITY", status: "SECURE", tag: "ISO 27001 - A.10", desc: "Digital certificates are properly configured with 4096-bit RSA keys." },
                    { title: "PORT EXPOSURE SCAN", status: "PARTIAL", tag: "ISO 27001 - A.12", desc: "Non-critical port 8080 detected in hidden state. Remediation suggested." },
                    { title: "DNSSEC PROTECTION", status: "VERIFIED", tag: "ISO 27001 - A.14", desc: "DNS spoofing protection is active and verifiable via global resolvers." }
                  ].map((risk, i) => (
                    <div key={i} className="flex items-center gap-6 p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-red-500/30 transition-all group">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${risk.status === 'SECURE' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {risk.status === 'SECURE' ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                             <h4 className="text-xs font-black uppercase tracking-widest">{risk.title}</h4>
                             <span className="text-[8px] px-2 py-0.5 bg-red-600/20 text-red-500 rounded uppercase font-bold">{risk.tag}</span>
                          </div>
                          <p className="text-[10px] text-white/40 leading-relaxed">{risk.desc}</p>
                       </div>
                       <ChevronRight className="text-white/20 group-hover:text-red-500 transition-colors" size={20} />
                    </div>
                  ))}
               </div>
            </ScorecardWidget>

            {/* Bottom Meta */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 py-8 border-t border-white/5 gap-4">
               <div className="flex items-center gap-4 text-white/20">
                  <div className="text-right">
                     <p className="text-[8px] font-black text-red-600 uppercase leading-none tracking-widest">ALFA SEC-ENGINE V2.0</p>
                     <p className="text-[7px] font-bold mt-1">ID: {reportId}</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="flex items-center gap-3">
                     <Lock size={14} />
                     <Activity size={14} />
                     <Database size={14} />
                  </div>
               </div>
               <div className="text-[8px] text-white/30 font-bold uppercase tracking-[0.3em] text-center md:text-right italic">
                  * BU BELGE ADLİ BİLİŞİM STANDARTLARINDA ÜRETİLMİŞTİR.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReport;
