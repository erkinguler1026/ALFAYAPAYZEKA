import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, AlertTriangle, Lock, 
  Database, FileText, ChevronRight
} from 'lucide-react';

const ScorecardWidget = ({ title, children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-emerald-400/40 transition-colors ${className}`}
  >
    <h3 className="text-slate-500 font-black text-sm mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
  const [auditData, setAuditData] = useState(null);

  useEffect(() => {
    document.title = `Full X-RAY Scorecard | ${domain.toUpperCase()}`;
    const fetchAudit = async () => {
      try {
        const HOST = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://api.alfayapayzeka.com';
        const res = await fetch(`${HOST}/api/full-audit?url=${domain}`);
        const data = await res.json();
        if(data.success && data.results) {
          setAuditData(data.results);
        }
      } catch(e) {
        console.error("Audit fetch error:", e);
      } finally {
        setTimeout(() => setIsLoading(false), 1000); 
      }
    };
    fetchAudit();
  }, [domain]);

  const formattedUrl = `https://www.${domain.replace(/^(https?:\/\/)?(www\.)?/, '')}`;

  // GERÇEK VERİ HESAPLAMALARI
  const infrastructureData = useMemo(() => {
    if (!auditData) return [];

    const openPortsObj = auditData?.network?.ports || [];
    const criticalPorts = openPortsObj.filter(p => p.risk === 'CRITICAL' || p.risk === 'HIGH').length;
    let netScore = auditData.probeStatus?.network ? 100 : 70;
    netScore = Math.max(10, netScore - (criticalPorts * 15));

    let sslScore = 50; 
    const grade = auditData?.sslGrade?.grade || 'C';
    if (grade.includes('A')) sslScore = 100;
    else if (grade.includes('B')) sslScore = 80;
    else if (grade.includes('C')) sslScore = 60;
    else if (grade.includes('T')) sslScore = 90;

    const subCount = auditData?.subdomainData?.total || 0;
    let osintScore = 100;
    if (subCount > 50) osintScore = 85;
    if (subCount > 150) osintScore = 70;
    if (subCount > 300) osintScore = 50;

    let dbScore = 100;
    if (auditData?.findings?.some(f => f.id === 'open_database')) dbScore -= 50;
    if (auditData?.findings?.some(f => f.id === 'technology_exposure')) dbScore -= 20;

    const aiIndex = Math.round((auditData?.overallScore || 0) * 10);

    // Pastel renk paleti kullanıyoruz (emerald ve amber)
    return [
      { name: 'NETWORK INTEGRITY', iso: 'A.8.20', health: netScore, color: netScore > 80 ? 'text-emerald-400' : 'text-amber-400' },
      { name: 'SSL/TLS ARMOR', iso: 'A.8.24', health: sslScore, color: sslScore > 80 ? 'text-emerald-400' : 'text-amber-400' },
      { name: 'OSINT EXPOSURE', iso: 'A.5.7', health: osintScore, color: osintScore > 80 ? 'text-emerald-400' : 'text-amber-400' },
      { name: 'SERVER CONFIG', iso: 'A.8.8', health: Math.max(10, dbScore), color: dbScore > 80 ? 'text-emerald-400' : 'text-amber-400' },
      { name: 'AI DEFENSE INDEX', iso: 'A.5.1', health: aiIndex, color: aiIndex > 80 ? 'text-emerald-400' : 'text-amber-400' }
    ];
  }, [auditData]);

  if (isLoading || !auditData) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-slate-800 font-mono">
        <Activity size={48} className="text-emerald-500 animate-spin mb-4" />
        <h2 className="text-xl font-black tracking-[0.5em] uppercase text-emerald-600">Secure Link Established</h2>
        <p className="text-slate-500 mt-2 text-xs">Decrypting penetration test data for {domain}...</p>
      </div>
    );
  }

  const t = {
    tr: {
      title: "FULL X-RAY GÜVENLİK KARNESİ",
      sub: "Penetrasyon Testi ve Derin Denetim Sonuçları",
      grade: "GÜVENLİK DERECESİ",
      infra: "ALTYAPI SAĞLIK ANALİZİ",
      summary: "AL BİLGİLENDİRME ÖZETİ",
      risks: "KRİTİK BULGULAR VE ANALİZLER",
      formalBtn: "250 SAYFA FORMAL RAPORU AÇ",
      adminBtn: "ANALİZ SAYFASI",
      lastUpdate: "Son Güncelleme",
      download: "PDF SCORECARD İNDİR"
    },
    en: {
      title: "FULL X-RAY SECURITY SCORECARD",
      sub: "Penetration Test & Deep Audit Results",
      grade: "SECURITY GRADE",
      infra: "INFRASTRUCTURE HEALTH ANALYSIS",
      summary: "AL INFORMATIVE SUMMARY",
      risks: "CRITICAL FINDINGS & ANALYTICS",
      formalBtn: "OPEN 250-PAGE FORMAL REPORT",
      adminBtn: "ANALYSIS PAGE",
      lastUpdate: "Last Update",
      download: "DOWNLOAD PDF SCORECARD"
    }
  }[lang];

  const derivedScorePercent = Math.round(auditData.overallScore * 10);
  const aiStatusText = derivedScorePercent >= 80 ? "PENETRATION TEST STATUS: STABLE" : derivedScorePercent >= 50 ? "PENETRATION TEST STATUS: MODERATE RISK" : "PENETRATION TEST STATUS: CRITICAL RISK";
  const displayFindings = auditData.findings?.filter(f => f.severity === 'CRITICAL' || f.severity === 'HIGH' || f.severity === 'MEDIUM') || [];

  const aiSummaryText = lang === 'en' 
    ? `"Based on full penetration test analysis, the target system achieved a security score of ${auditData.overallScore}/10. ${displayFindings.length > 0 ? 'Various vulnerabilities were identified and mapped to international standards.' : 'No critical vulnerabilities detected.'}"`
    : `"Hedef sistem üzerinde gerçekleştirilen full penetration test analiz neticesinde, sistem güvenlik skoru 10 üzerinden ${auditData.overallScore} olarak hesaplanmıştır. ${displayFindings.length > 0 ? 'Tespit edilen zafiyetler ISO27001:2022 BGYS standardıyla eşleştirilmiştir.' : 'Kritik seviye zafiyet tespit edilmemiştir, altyapı ALFA Güvenlik Birimi & ISO27001:2022 BGYS standardıyla uyumludur.'}"`;


  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 p-6 md:p-12 font-mono relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row items-center justify-between mb-12 border-b border-gray-300 pb-8 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
              <ShieldCheck size={36} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3">
                 <span className="text-emerald-600">FULL X-RAY</span> SCORECARD
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                TARGET: <span className="text-emerald-600 font-bold">{formattedUrl}</span> • {t.lastUpdate}: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate(`/full-formal-report?site=${domain}&lang=${lang}&admin=true`)}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-md flex items-center gap-2 group"
            >
              <FileText size={16} className="group-hover:scale-110 transition-transform" /> {t.formalBtn}
            </button>
            {isAdmin && (
              <button 
                onClick={() => navigate(`/full-scorecard?site=${domain}&lang=${lang}&admin=true`)}
                className="px-8 py-3 bg-white border border-gray-300 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 group"
              >
                <Activity size={16} className="group-hover:text-emerald-500 transition-colors" /> {t.adminBtn}
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
                    className={`text-[140px] font-black leading-none drop-shadow-sm ${derivedScorePercent >= 80 ? 'text-emerald-500' : derivedScorePercent >= 50 ? 'text-amber-500' : 'text-rose-500'}`}
                  >
                    {auditData.grade}
                  </motion.div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-slate-800 text-white font-black text-[10px] uppercase tracking-[0.3em] whitespace-nowrap rounded">
                    {derivedScorePercent >= 80 ? 'ALFA CERTIFIED' : 'ACTION REQUIRED'}
                  </div>
                </div>
                <div className="mt-16 w-full space-y-4">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>SECURITY ARMOR LEVEL</span>
                    <span className="text-slate-600 font-bold">{derivedScorePercent}/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${derivedScorePercent}%` }}
                      className={`h-full ${derivedScorePercent >= 80 ? 'bg-emerald-500' : derivedScorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                    />
                  </div>
                </div>
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={t.summary}>
              <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-xl">
                 <p className="text-xs text-slate-600 leading-relaxed italic">
                   {aiSummaryText}
                 </p>
                 <div className="mt-6 flex items-center justify-between text-xs font-black uppercase tracking-widest border-t border-emerald-100 pt-4">
                   <span className={`${derivedScorePercent >= 80 ? 'text-emerald-600' : derivedScorePercent >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{aiStatusText}</span>
                   {derivedScorePercent >= 80 ? <ShieldCheck size={22} className="text-emerald-500"/> : <AlertTriangle size={22} className={derivedScorePercent >= 50 ? 'text-amber-500' : 'text-rose-500'}/>}
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
                        <circle cx="50" cy="50" r="42" strokeWidth="6" fill="transparent" stroke="currentColor" className="text-gray-200" />
                        <motion.circle 
                          cx="50" cy="50" r="42" strokeWidth="8" stroke="currentColor" strokeLinecap="round" fill="transparent"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: item.health / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                          className={`${item.color}`}
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-slate-700">%{item.health}</span>
                    </div>
                    <span className="mt-4 text-xs font-black text-slate-500 uppercase tracking-tighter text-center leading-tight">
                      {item.name}
                    </span>
                    <div className="mt-1.5 flex flex-col items-center text-xs font-black text-rose-600 uppercase tracking-widest text-center border-t border-gray-100 pt-1.5 w-full leading-tight">
                      <span>ISO27001:2022</span>
                      <span>EK-{item.iso}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={t.risks}>
               <div className="space-y-4">
                  {displayFindings.length > 0 ? displayFindings.map((risk, i) => (
                    <div key={i} className="flex items-center gap-6 p-5 bg-gray-50 border border-gray-200 rounded-2xl hover:border-emerald-300 transition-all group">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? <AlertTriangle size={20} /> : <ShieldCheck size={20} />}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                             <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{risk.title || risk.id}</h4>
                             <span className={`text-[8px] px-2 py-0.5 rounded uppercase font-bold ${risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{risk.category || 'VULNERABILITY'}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed">{risk.desc || risk.description}</p>
                       </div>
                       <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
                    </div>
                  )) : (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-400 w-full">
                       <ShieldCheck size={56} className="mb-4 text-emerald-400/50" />
                       <p className="text-sm font-bold uppercase tracking-widest text-emerald-500/70">Tebrikler! Kritik Tespit Bulunmadı.</p>
                       <p className="text-[10px] mt-2 max-w-md text-center text-slate-400">Hedef sistem güvenlik analizinden yüksek skor ile geçmiştir. Herhangi bir yapılandırma veya sızıntı hatası tespit edilmemiştir.</p>

                       {/* Dynamic Technical Details Container */}
                       <div className="mt-8 w-full max-w-md mx-auto flex flex-col gap-4 text-left text-xs bg-slate-50 p-6 rounded-xl border border-slate-100">
                         <div className="flex justify-between items-center border-b border-gray-200 border-dashed pb-3">
                           <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">TARGET DOMAIN</span>
                           <span className="font-black text-slate-700">{domain ? `https://www.${domain.replace('www.', '')}` : 'N/A'}</span>
                         </div>
                         <div className="flex justify-between items-center border-b border-gray-200 border-dashed pb-3">
                           <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">DOMAIN OWNER (WHOIS)</span>
                           <span className="font-black text-slate-700 truncate max-w-[200px] text-right">{auditData.whoisData?.registrantOrg || 'Gizli (Whois Protection)'}</span>
                         </div>
                         <div className="flex justify-between items-center border-b border-gray-200 border-dashed pb-3">
                           <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">RESOLVED IP</span>
                           <span className="font-black text-slate-700">{auditData.ipGeo?.ip || 'N/A'}</span>
                         </div>
                         <div className="flex justify-between items-center border-b border-gray-200 border-dashed pb-3">
                           <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">INFRASTRUCTURE</span>
                           <span className="font-black text-slate-700 truncate max-w-[200px] text-right">{auditData.ipGeo?.isp || auditData.ipGeo?.org || 'Protected Network'}</span>
                         </div>
                         <div className="flex justify-between items-center pt-1">
                           <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">SERVER LOCATION</span>
                           <span className="font-black text-slate-700">{auditData.ipGeo?.country || 'Unknown'} / ASN: {auditData.ipGeo?.asn || 'Hidden'}</span>
                         </div>
                       </div>
                    </div>
                  )}
               </div>
            </ScorecardWidget>

            {/* Bottom Meta */}
            <div className="flex flex-col md:flex-row justify-between items-center px-4 py-8 border-t border-gray-200 gap-4">
               <div className="flex items-center gap-4 text-slate-400">
                  <div className="text-right">
                     <p className="text-xs font-black text-emerald-600 uppercase leading-none tracking-widest">ALFA SEC-ENGINE V2.0</p>
                     <p className="text-[11px] font-bold mt-2 text-slate-500">ID: {reportId}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300" />
                  <div className="flex items-center gap-3 text-slate-400">
                     <Lock size={18} />
                     <Activity size={18} />
                     <Database size={18} />
                  </div>
               </div>
               <div className="text-xs text-slate-400 font-bold uppercase tracking-widest text-center md:text-right italic">
                  * BU BELGE PENETRASYON TESTİ STANDARTLARINDA ÜRETİLMİŞTİR.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullReport;
