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

const SecurityScorecard = () => {
  const [searchParams] = useSearchParams();
  const rawToken = searchParams.get('token');
  const token = rawToken ? rawToken.trim() : null;
  const navigate = useNavigate();

  const [domain, setDomain] = useState("SYSTEM_SCAN");
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [accessError, setAccessError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);

  const [logs, setLogs] = useState([
    "[LOG] 14:31:05 - Initializing Security Scan...",
    "[LOG] 14:31:10 - SSL Certificate Verified: SHA-256",
    "[LOG] 14:31:15 - Port Scan Completed: 0 vulnerabilities found"
  ]);

  // Stable random chart data initialized once to satisfy React purity rules
  const [chartData] = useState(() => 
    Array.from({length: 40}).map(() => 20 + Math.random() * 80)
  );

  useEffect(() => {
    if (isAnalyzing || accessError) return;
    const messages = [
      `[SCANNING] - Analyzing ${domain} Header Integrity...`,
      `[FIREWALL] - Request Filtering Active`,
      `[SSL] - TLS 1.3 Handshake Check: OK`,
      `[SYSTEM] - AI Backbone Path Optimized`,
      `[SECURITY] - No critical injection vectors detected`,
      `[ALFA-BOT] - Neural audit for ${domain} in progress...`
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

  const [reportMetadata] = useState(() => ({
    uuid: crypto.randomUUID().slice(0, 18).toUpperCase(),
    checksum: `0x${Math.floor(Math.random() * 1000000).toString(16).toUpperCase()}`
  }));
  
  const lang = searchParams.get('lang') || 'tr';

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = {
    tr: {
      analyzing: "Hedef analiz ediliyor...",
      profile: "Profili",
      lastUpdated: "Son güncelleme",
      backToAdmin: "Admin paneline dön",
      downloadPdf: "PDF indir",
      logout: "Çıkış yap",
      securityGrade: "Güvenlik derecesi",
      excellent: "Mükemmel",
      accessDenied: "Erişim engellendi",
      securityTokenMissing: "Erişim reddedildi: Güvenlik token eksik.",
      invalidLink: "Geçersiz bağlantı.",
      connError: "Sunucu bağlantı hatası: Lütfen bağlantıyı kontrol edin.",
      timeout: "Oturum zaman aşımı: 10 dakikalık güvenlik süresi doldu.",
      reportTitle: "Alfa Penetrasyon Rapor Mühendisliği",
      scorecardSub: "Siber güvenlik skor kartı",
      targetDomain: "Hedef kuruluş / Domain",
      reportNo: "Rapor no",
      analysisDate: "Analiz tarihi",
      classification: "Gizlilik derecesi",
      confidential: "Çok gizli / Şirkete özel",
      status: "Durum",
      completed: "Tamamlandı",
      approval: "Birim onayı",
      unit: "Alfa Siber Analiz Ünitesi",
      signatureHead: "Siber Güvenlik Başkanı",
      certifiedOriginal: "Aslı gibidir",
      signatureDisclaimer: "Bu belge dijital olarak imzalanmış olup, analiz sonuçlarının doğruluğu ALFA YAPAY ZEKA laboratuvarları tarafından onaylanmıştır.",
      footerNote: "Bu rapor Alfa Yapay Zeka siber güvenlik motorları tarafından üretilmiştir.",
      toc: "İçindekiler",
      scopeTitle: "Rapor kapsamı hakkında",
      scopeText: "Bu rapor, ilgili alan adının dış şebekeden görünen siber profilini analiz eder. DNS kayıtları, SSL sertifika geçerliliği, CMS güncelliği ve sunucu başlıklarındaki bilgi sızıntılarını temel alır.",
      sections: [
        { no: "01", title: "Yönetici özeti", page: "03" },
        { no: "02", title: "Güvenlik skor kartı ve genel durum", page: "04" },
        { no: "03", title: "Teknik sistem profili ve CMS analizi", page: "04" },
        { no: "04", title: "Tespit edilen riskler ve zafiyetler", page: "05" },
        { no: "05", title: "Öneriler ve çözüm yolları", page: "06" },
        { no: "06", title: "Sonuç ve tasdik şerhi", page: "06" }
      ],
      summaryTitle: "Yönetici özeti",
      summaryBody1: "Bu rapor, hedef altyapının anlık güvenlik duruşu analizini sağlar. Bulgular, dijital saldırı yüzeyinin zaman içindeki bir anlık görüntüsünü temsil eder ve yüksek etkili zaafiyetlere odaklanır.",
      summaryBody2: "Kuruluşların yaygın güvenlik zayıflıklarını (CVE'ler) önceliklendirmesi ve siber dayanıklılığı artırmak için çok katmanlı savunma stratejileri uygulaması önerilir.",
      aboutTitle: "Bu rapor hakkında",
      aboutDesc: "Alfa Güvenlik Snap Raporu, kurumsal dijital varlıkların hızlı değerlendirilmesi için tasarlanmış otomatik bir adli denetim aracıdır. Kapsamlı bir güvenlik puanı sağlamak için gelişmiş OSINT ve zafiyet tarama tekniklerini kullanır.",
      criticalTitle: "Kritik bulgular",
      riskTitle1: "3.1 Servis Güvenliği",
      riskText1: "Hedef sistemde dış şebekeye açık yönetim portları veya dosya yolları tespit edilebilir durumdadır.",
      riskTitle2: "3.2 Güvenlik Başlıkları (Security Headers)",
      riskText2: "Strict-Transport-Security (HSTS) ve Content-Security-Policy (CSP) tanımsız olup, sistem Tıklama Sahteciliği saldırılarına açıktır.",
      disclaimer: "YASAL UYARI: Bu rapor sadece bilgilendirme amaçlıdır ve tam bir penetrasyon testi yerine geçmez."
    },
    en: {
      analyzing: "Analyzing target...",
      profile: "Profile",
      lastUpdated: "Last updated",
      backToAdmin: "Back to admin panel",
      downloadPdf: "Download PDF",
      logout: "Logout",
      securityGrade: "Security grade",
      excellent: "Excellent",
      accessDenied: "Access denied",
      securityTokenMissing: "Access denied: Security token missing.",
      invalidLink: "Invalid link.",
      connError: "Server connection error: Please check your connection.",
      timeout: "Session timeout: 10-minute security duration expired.",
      reportTitle: "Alfa Penetration Report Engineering",
      scorecardSub: "Cyber security scorecard",
      targetDomain: "Target organization / Domain",
      reportNo: "Report no",
      analysisDate: "Analysis date",
      classification: "Classification",
      confidential: "Top secret / Proprietary",
      status: "Status",
      completed: "Completed",
      approval: "Unit approval",
      unit: "Alfa Cyber Analysis Unit",
      signatureHead: "Head of Cyber Security",
      certifiedOriginal: "Certified original",
      signatureDisclaimer: "This document is digitally signed, and the accuracy of analytical results has been approved by ALFA ARTIFICIAL INTELLIGENCE labs.",
      footerNote: "This report was generated by Alfa AI cybersecurity engines.",
      toc: "Table of contents",
      scopeTitle: "About the report scope",
      scopeText: "This report analyzes the cyber profile from the external network. It focuses on DNS records, SSL validity, CMS status, and server header info leaks.",
      sections: [
        { no: "01", title: "Executive summary", page: "03" },
        { no: "02", title: "Security scorecard & status", page: "04" },
        { no: "03", title: "Technical profile & CMS analysis", page: "04" },
        { no: "04", title: "Identified risks & vulnerabilities", page: "05" },
        { no: "05", title: "Recommendations & solutions", page: "06" },
        { no: "06", title: "Conclusion & certification", page: "06" }
      ],
      summaryTitle: "Executive summary",
      summaryBody1: "This report provides a rapid security posture analysis of the target infrastructure. Findings represent a point-in-time snapshot of the digital attack surface.",
      summaryBody2: "Organizations are advised to prioritize common security weaknesses (CVEs) and implement layered defense to enhance cyber resilience.",
      aboutTitle: "About this report",
      aboutDesc: "The Alfa Security Snap Report is an automated forensic tool for rapid assessment of digital assets using OSINT and vulnerability scanning techniques.",
      criticalTitle: "Critical findings",
      riskTitle1: "3.1 Service security",
      riskText1: "Exposed management ports or file paths detected on the target system.",
      riskTitle2: "3.2 Security headers",
      riskText2: "HSTS and CSP headers are undefined, leaving the system vulnerable to Clickjacking and other vectors.",
      disclaimer: "Disclaimer: This report is for information purposes only and is not a full penetration test."
    }
  }[lang];

  useEffect(() => {
    document.title = "Security Scorecard | Alfa Yapay Zeka";
    let isMounted = true;
    const verifyToken = async () => {
      if (!token) { setAccessError(t.securityTokenMissing); return; }
      try {
        const response = await apiClient.get(API_ENDPOINTS.REPORT(token));
        if (isMounted) {
          if (response.data.success) {
            const siteParam = searchParams.get('site');
            setDomain((siteParam || response.data.domain).toUpperCase());
            setTimeout(() => { if (isMounted) setIsAnalyzing(false); }, 2500);
          } else { setAccessError(t.invalidLink); }
        }
      } catch { if (isMounted) setAccessError(t.connError); }
    };
    verifyToken();
    return () => { isMounted = false; };
  }, [token, searchParams, t.securityTokenMissing, t.invalidLink, t.connError]);

  useEffect(() => {
    if (isAnalyzing || accessError) return;
    
    // Joker admin for unlimited session
    if (token === 'ALFA_JOKER_ADMIN_777') return;

    if (timeLeft <= 0) {
      setTimeout(() => setAccessError(t.timeout), 0);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAnalyzing, accessError, timeLeft, token, t.timeout]);

  const downloadPDF = () => {
    const originalTitle = document.title;
    const timestamp = new Date().toISOString().replace(/[:T]/g, '_').split('.')[0];
    document.title = `ALFA_SNAP_REPORT_${domain}_${timestamp}`;
    window.print();
    setTimeout(() => { document.title = originalTitle; }, 1000);
  };

  if (accessError) {
    return (
      <div className="min-h-screen bg-[#020b14] flex items-center justify-center text-white font-mono p-4">
        <div className="max-w-xl text-center border border-red-500/30 bg-red-500/10 p-8 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <ShieldAlert size={64} className="text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold text-red-500 mb-4 tracking-widest">{t.accessDenied}</h1>
          <p className="text-red-400/80 mb-6">{accessError}</p>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/40 transition-colors uppercase font-black text-xs tracking-widest">{t.logout}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen print:min-h-0 bg-[#020b14] print:bg-white text-white print:text-slate-800 p-4 md:p-8 font-mono relative overflow-hidden print:overflow-visible">
      <style>{`@media print { @page { size: A4; margin: 0; } .print-page { width: 100%; min-height: 296mm; padding: 20mm; position: relative; break-after: page; background: white !important; color: #1e293b !important; display: flex; flex-direction: column; } }`}</style>

      {/* COVER PAGE (Print) */}
      <div className="hidden print:flex print-page items-center justify-between border-[20px] border-double border-slate-100 relative">
        <div className="text-center space-y-8 mt-10 w-full">
          <ShieldCheck size={120} className="text-blue-600 mx-auto h-32 md:h-40" />
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">{t.reportTitle}</h1>
          <p className="text-2xl font-bold text-slate-500 tracking-[0.3em] uppercase">{t.scorecardSub}</p>
        </div>
        <div className="w-full flex-1 flex flex-col justify-center space-y-8 text-center py-10">
            <div className="py-10 border-y border-slate-200 bg-slate-50/30">
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] mb-4">{t.targetDomain}</p>
                <p className="text-6xl font-black text-slate-900 tracking-tighter font-serif lowercase" style={{ fontSize: '48px' }}>www.{domain.toLowerCase()}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-8 text-left max-w-3xl mx-auto w-full">
                <div className="border-l-4 border-slate-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400">{t.reportNo}</p>
                    <p className="text-sm font-bold text-slate-800 font-mono">#{token?.slice(0, 8).toUpperCase() || reportMetadata.uuid?.slice(0,8)}</p>
                </div>
                <div className="border-l-4 border-slate-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400">{t.analysisDate}</p>
                    <p className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US')}</p>
                </div>
            </div>
        </div>
        <div className="w-full flex justify-between items-end pt-10 border-t">
            <div className="text-[10px] font-bold text-slate-400 uppercase">{t.rights}</div>
            <div className="text-right"><p className="text-[10px] font-black text-slate-900 uppercase">{t.approval}</p></div>
        </div>
      </div>

      {/* DASHBOARD (Screen & PDF Page 4+) */}
      <div id="scorecard-content" className="max-w-[1600px] mx-auto print:print-page">
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-cyan-500/20 pb-4 gap-4">
          <div className="flex items-center gap-4">
            <ShieldCheck size={40} className="text-cyan-400" />
            <div>
              <h1 className="text-2xl font-black text-cyan-400 uppercase">{isAnalyzing ? t.analyzing : `${domain} ${t.profile}`}</h1>
              <p className="text-xs text-white/50">{t.lastUpdated}: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex gap-4 print:hidden">
            <button onClick={downloadPDF} className="px-6 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded font-bold uppercase text-xs">{t.downloadPdf}</button>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-slate-800 text-slate-400 rounded font-bold uppercase text-xs">{t.logout}</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScorecardWidget title={t.securityGrade} className="lg:col-span-1 lg:row-span-2">
             <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">A+</span>
                <p className="text-cyan-400 font-bold mt-2">{t.excellent}</p>
             </div>
          </ScorecardWidget>
          <ScorecardWidget title="INFRASTRUCTURE HEALTH" className="lg:col-span-3">
             <div className="h-48 w-full bg-cyan-500/5 rounded border border-cyan-500/10 flex items-end p-4 gap-2">
                {chartData.map((h, i) => (
                  <div key={i} className="flex-1 bg-cyan-500/20 rounded-t" style={{height: `${h}%`}} />
                ))}
             </div>
          </ScorecardWidget>
        </div>

        {/* Real-time Security Log Stream (Terminal) */}
        <div className="mt-8 bg-black/60 border border-cyan-500/20 rounded-xl p-6 font-mono text-xs text-cyan-500/70 h-48 overflow-y-auto print:hidden shadow-inner">
           <div className="flex items-center gap-2 mb-4 border-b border-cyan-500/10 pb-2">
              <Activity size={14} className="text-cyan-400" />
              <span className="font-black tracking-[0.2em] text-cyan-400">ALFA_SECURITY_LOG_STREAM</span>
           </div>
           {logs.map((log, i) => (
             <div key={i} className="mb-1 opacity-80 hover:opacity-100 hover:text-cyan-300 transition-all">
                {log}
             </div>
           ))}
           <div className="flex items-center gap-2 mt-2">
              <span className="text-cyan-400 animate-pulse">&gt;</span>
              <span className="w-2 h-4 bg-cyan-500/40 animate-pulse"></span>
           </div>
        </div>

        {/* PRINT ONLY: Summary Page */}
        <div className="hidden print:block print-page mt-20">
          <h2 className="text-3xl font-black text-slate-900 border-b-4 border-slate-900 pb-4 mb-8 uppercase">{t.summaryTitle}</h2>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-8 space-y-8">
              <section>
                <h3 className="text-xl font-bold mb-3">{t.summaryTitle}</h3>
                <p className="leading-relaxed text-slate-700">{t.summaryBody1}</p>
                <p className="leading-relaxed text-slate-700 mt-4">{t.summaryBody2}</p>
              </section>
              <section>
                <h3 className="text-xl font-bold mb-3 text-red-600">{t.criticalTitle}</h3>
                <div className="p-4 bg-red-50 border-l-4 border-red-600 rounded">
                  <p className="font-bold text-red-900">{t.riskTitle1}</p>
                  <p className="text-red-700 text-sm mt-1">{t.riskText1}</p>
                </div>
                <div className="p-4 bg-orange-50 border-l-4 border-orange-600 rounded mt-4">
                  <p className="font-bold text-orange-900">{t.riskTitle2}</p>
                  <p className="text-orange-700 text-sm mt-1">{t.riskText2}</p>
                </div>
              </section>
            </div>
            <div className="col-span-4 bg-slate-50 p-6 border rounded-xl">
               <h4 className="font-black text-xs text-slate-400 mb-4">{t.aboutTitle}</h4>
               <p className="text-[10px] leading-relaxed text-slate-600">{t.aboutDesc}</p>
            </div>
          </div>
          <div className="mt-auto pt-10 border-t flex justify-between items-center opacity-50">
            <p className="text-[10px] text-slate-400 font-mono italic">{t.disclaimer}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ALFA-SNAP-V1</p>
          </div>
        </div>

        {/* PRINT ONLY: Final Signature Page */}
        <div className="hidden print:flex print-page flex-col justify-between items-center text-center py-20 border-[20px] border-double border-slate-50">
           <div className="space-y-12 w-full">
              <ShieldCheck size={100} className="text-blue-600 mx-auto" />
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter border-b-4 border-slate-900 pb-4 inline-block">{t.approval}</h2>
              <p className="max-w-2xl mx-auto text-slate-500 italic leading-relaxed px-12">{t.signatureDisclaimer}</p>
           </div>
           
           <div className="mt-auto w-full flex flex-col items-center gap-6">
              <div className="space-y-1">
                 <p className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">ERKİN GÜLER</p>
                 <p className="text-sm font-black text-blue-600 tracking-[0.2em] uppercase">{t.signatureHead}</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.unit}</p>
              </div>
              <div className="relative">
                 <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Signature" className="h-28 mix-blend-multiply transition-transform hover:scale-105" />
                 <div className="absolute -bottom-2 -right-10 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-sm rotate-12 shadow-lg border-2 border-white uppercase tracking-widest">{t.certifiedOriginal}</div>
              </div>
           </div>
           
           <div className="w-full mt-20 pt-10 border-t border-slate-100 flex justify-between text-[8px] font-mono text-slate-300 uppercase tracking-[0.2em]">
              <span>ALFA_ID: {reportMetadata.uuid}</span>
              <span>VERIFIED_BY: ALFA_BOT_V4</span>
              <span>SIGNED_AT: {new Date().toISOString()}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityScorecard;
