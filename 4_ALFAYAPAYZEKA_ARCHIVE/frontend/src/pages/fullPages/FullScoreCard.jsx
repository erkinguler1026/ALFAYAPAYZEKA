import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, AlertTriangle, Lock, 
  Database, FileText, ChevronRight, Globe, Server, Shield
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

const FullScoreCard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'tr';
  const siteParam = searchParams.get('site') || 'target.com';
  const isAdmin = searchParams.get('admin') === 'true';

  const [domain] = useState(siteParam.toLowerCase());
  const [isLoading, setIsLoading] = useState(true);
  const [auditData, setAuditData] = useState(null);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}_${hours}_${minutes}_`;
    
    document.title = `ALFA_FULL_REPORT_${domain.toLowerCase()}_${formattedDate}`;
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

  // DİNAMİK ÖZET MOTORU (Gerçek Veri Tabanlı Özet Üretici)
  const getDynamicDescription = (catId, data, currentLang) => {
    if (!data) return "";
    const isTr = currentLang === 'tr';

    switch (catId) {
      case 'service': {
        const hasCrit = data.sensitiveData?.hasCritical;
        if (hasCrit) {
          return isTr 
            ? `Kritik yapılandırma dosyaları (.env, .git) dışa açık durumda tespit edildi. Bu durum veritabanı şifreleri ve API anahtarlarının sızmasına neden olabilir. Dizin listeleme özellikleri üzerinden hassas sistem dosyalarına doğrudan erişim sağlandığı dökümante edilmiştir.`
            : `Critical configuration files (.env, .git) were detected as publicly exposed. This could lead to leaks of database passwords and API keys. Direct access to sensitive system files through directory listing has been documented.`;
        }
        return isTr
          ? `Derinlemesine yapılan dizin taraması sonucunda kritik yapılandırma dosyalarına (.env, .git/config) doğrudan erişim saptanmadı. Sistem, hassas dizin yollarını yetkisiz erişime karşı korumalı (403/Forbidden) olarak yapılandırmıştır.`
          : `Deep directory scanning conducted on the target did not reveal direct access to critical configuration files (.env, .git/config). The system has configured sensitive directory paths as protected against unauthorized access.`;
      }

      case 'headers': {
        const missing = (data.findings || []).filter(f => ['hsts', 'csp', 'x-frame-options'].includes(f.id));
        if (missing.length > 0) {
          const names = missing.map(m => m.id.toUpperCase()).join(', ');
          return isTr
            ? `Yapılan HTTP başlık analizinde ${names} gibi modern savunma katmanlarının eksik olduğu tespit edildi. Bu durum, tarayıcı tabanlı XSS ve Clickjacking saldırılarına karşı koruma derinliğini zayıflatmaktadır.`
            : `HTTP header analysis revealed that modern defense layers such as ${names} are missing. This weakens the defense-in-depth against browser-based XSS and Clickjacking attacks.`;
        }
        return isTr
          ? `HTTP güvenlik başlıkları (HSTS, CSP, X-Frame) endüstri standartlarına uygun olarak yapılandırılmış. Sunucu, modern tarayıcı saldırılarına karşı aktif bir koruma kalkanı sağlamaktadır.`
          : `HTTP security headers (HSTS, CSP, X-Frame) are configured in accordance with industry standards. The server provides an active defense shield against modern browser attacks.`;
      }

      case 'network': {
        const openPorts = data.network?.ports || [];
        if (openPorts.length > 0) {
          const portStr = openPorts.map(p => p.port).join(', ');
          return isTr
            ? `${data.ipAddress} adresi üzerinde ${openPorts.length} adet açık servis (Port: ${portStr}) tespit edildi. Bu servislerin internete açık olması, kaba kuvvet ve servis sömürü saldırılarına zemin hazırlamaktadır.`
            : `${openPorts.length} open services (Ports: ${portStr}) were detected on ${data.ipAddress}. These services being exposed to the internet creates a surface for brute-force and service exploitation attacks.`;
        }
        return isTr
          ? `Yapılan TCP port taramasında dış şebekeye açık herhangi bir kritik servis girişi tespit edilmedi. Ağ izolasyonu ve firewall kuralları, yetkisiz erişim denemelerini etkili bir şekilde engellemektedir.`
          : `TCP port scanning did not detect any critical service entry points exposed to the external network. Network isolation and firewall rules effectively block unauthorized access attempts.`;
      }

      case 'domain': {
        const ssl = data.sslGrade?.grade || 'N/A';
        const isp = data.ipGeo?.isp || 'Bilinmiyor';
        return isTr
          ? `Sertifikasyon analizinde ${ssl} seviyesinde güvenlik skoru saptandı. Sunucu altyapısı ${isp} üzerinden hizmet vermekte olup, DNS katmanındaki güvenlik kayıtları (SPF/DMARC) ve WHOIS verileri potansiyel sızıntı vektörü olarak değerlendirilmiştir.`
          : `Certification analysis revealed a ${ssl} grade security score. The infrastructure is served via ${isp}, and DNS security records (SPF/DMARC) along with WHOIS data have been evaluated as potential leak vectors.`;
      }

      case 'patching': {
        const techs = (data.technologies || []).map(t => t.name).slice(0, 3).join(', ');
        return isTr
          ? `Sistem üzerinde ${techs} gibi teknolojilerin aktif olduğu saptandı. Sunucu yanıt başlıklarında versiyon bilgilerinin ifşa edilmesi, bilinen zafiyetlerin (CVE) hedefli olarak aranmasını kolaylaştırmaktadır.`
          : `Technologies such as ${techs} were detected active on the system. Disclosure of version information in server response headers facilitates targeted searches for known vulnerabilities (CVE).`;
      }
      default: return "";
    }
  };

  // TEKNİK ANALİZ VERİSİ (3.x Yapısı)
  const forensicCategories = useMemo(() => {
    if (!auditData) return [];
    const langLabel = lang === 'tr' ? 'tr' : 'en';
    const data = [
      {
        id: 'service',
        index: 'S4',
        name: lang === 'tr' ? 'BÖLÜM IV: HASSAS DOSYA ANALİZİ (S4)' : 'SECTION IV: SENSITIVE FILE AUDIT (S4)',
        iso: 'A.8.9',
        health: auditData.categoricalHealth?.service ?? 100,
        isoTitle: {
          tr: 'ISO 27001:2022 A.8.9 Konfigürasyon Yönetimi standardı',
          en: 'ISO 27001:2022 A.8.9 Configuration Management standard'
        }[langLabel],
        desc: getDynamicDescription('service', auditData, langLabel)
      },
      {
        id: 'headers',
        index: 'S3',
        name: lang === 'tr' ? 'BÖLÜM III: GÜVENLİK BAŞLIKLARI (S3)' : 'SECTION III: SECURITY HEADERS (S3)',
        iso: 'A.8.26',
        health: auditData.categoricalHealth?.headers ?? 100,
        isoTitle: {
          tr: 'ISO 27001:2022 A.8.26 Uygulama Güvenliği gereksinimleri',
          en: 'ISO 27001:2022 A.8.26 Application Security requirements'
        }[langLabel],
        desc: getDynamicDescription('headers', auditData, langLabel)
      },
      {
        id: 'network',
        index: 'S2',
        name: lang === 'tr' ? 'BÖLÜM II: AĞ VE PORT GÜVENLİĞİ (S2)' : 'SECTION II: NETWORK & PORT SECURITY (S2)',
        iso: 'A.8.20',
        health: auditData.categoricalHealth?.network ?? 100,
        isoTitle: {
          tr: 'ISO 27001:2022 A.8.20 Ağ Güvenliği kontrolü',
          en: 'ISO 27001:2022 A.8.20 Network Security control'
        }[langLabel],
        desc: getDynamicDescription('network', auditData, langLabel)
      },
      {
        id: 'domain',
        index: 'S6',
        name: lang === 'tr' ? 'BÖLÜM VI: SSL LABS GÜVENLİK (S6)' : 'SECTION VI: SSL LABS SECURITY (S6)',
        iso: 'A.5.7',
        health: auditData.categoricalHealth?.domain ?? 100,
        isoTitle: {
          tr: 'ISO 27001:2022 A.5.7 Tehdit İstihbaratı metodolojisi',
          en: 'ISO 27001:2022 A.5.7 Threat Intelligence methodology'
        }[langLabel],
        desc: getDynamicDescription('domain', auditData, langLabel)
      },
      {
        id: 'patching',
        index: 'S10',
        name: lang === 'tr' ? 'BÖLÜM X: YAZILIM VE YAMA (S10)' : 'SECTION X: SOFTWARE PATCHING (S10)',
        iso: 'A.8.8',
        health: auditData.categoricalHealth?.patching ?? 100,
        isoTitle: {
          tr: 'ISO 27001:2022 A.8.8 Teknik Zafiyetlerin Yönetimi standartları',
          en: 'ISO 27001:2022 A.8.8 Technical Vulnerability Management standards'
        }[langLabel],
        desc: getDynamicDescription('patching', auditData, langLabel)
      }
    ];

    return data.map(item => ({
      ...item,
      color: item.health >= 80 ? 'text-emerald-400' : (item.health >= 50 ? 'text-amber-400' : 'text-rose-500'),
      status: item.health >= 80 ? (lang === 'tr' ? 'GÜVENLİ' : 'SECURE') : (item.health >= 50 ? (lang === 'tr' ? 'RİSKLİ' : 'RISKY') : (lang === 'tr' ? 'KRİTİK' : 'CRITICAL'))
    }));
  }, [auditData, lang]);

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
      grade: "GÜVENLİK DERECESİ",
      infra: "ALTYAPI SAĞLIK ANALİZİ",
      summary: "ALFA-AI BİLGİLENDİRME ÖZETİ",
      risks: "TEKNİK ANALİZ VE BULGULAR",
      formalBtn: "250 SAYFA FORMAL RAPORU AÇ",
      adminBtn: "ANALİZ SAYFASI",
      lastUpdate: "Son Güncelleme"
    },
    en: {
      title: "FULL X-RAY SECURITY SCORECARD",
      grade: "SECURITY GRADE",
      infra: "INFRASTRUCTURE HEALTH ANALYSIS",
      summary: "ALFA-AI INFORMATIVE SUMMARY",
      risks: "TECHNICAL ANALYSIS & FINDINGS",
      formalBtn: "OPEN 250-PAGE FORMAL REPORT",
      adminBtn: "ANALYSIS PAGE",
      lastUpdate: "Last Update"
    }
  }[lang];

  const derivedScorePercent = Math.round(auditData.overallScore * 10);
  const aiStatusText = derivedScorePercent >= 80 ? "PENETRATION TEST STATUS: STABLE" : derivedScorePercent >= 50 ? "PENETRATION TEST STATUS: MODERATE RISK" : "PENETRATION TEST STATUS: CRITICAL RISK";
  
  const displayFindings = auditData.findings?.filter(f => {
    const s = f.severity?.toUpperCase();
    return s === 'CRITICAL' || s === 'HIGH' || s === 'MEDIUM';
  }) || [];

  const aiSummaryText = lang === 'en' 
    ? `"Based on full penetration test analysis, the target system achieved a security score of ${auditData.overallScore}/10. ${displayFindings.length > 0 ? 'Various vulnerabilities were identified and mapped to international standards.' : 'No critical vulnerabilities detected.'}"`
    : `"Hedef sistem üzerinde gerçekleştirilen full penetration test analiz neticesinde, sistem güvenlik skoru 10 üzerinden ${auditData.overallScore} olarak hesaplanmıştır. ${displayFindings.length > 0 ? 'Tespit edilen zafiyetler ISO 27001:2022 BGYS standardıyla eşleştirilmiştir.' : 'Kritik seviye zafiyet tespit edilmemiştir, altyapı ALFA Güvenlik Birimi & ISO 27001:2022 BGYS standardıyla uyumludur.'}"`;

  return (
    <div className="min-h-screen bg-gray-100 text-slate-800 p-6 md:p-12 font-mono relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="flex flex-col lg:flex-row items-center justify-between mb-12 border-b border-gray-300 pb-8 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
              <ShieldCheck size={36} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3">
                 <span className="text-emerald-600">FULL X-RAY</span> SCORECARD
              </h1>
              <p className="text-slate-500 text-sm mt-1 tracking-widest font-bold">
                <span className="uppercase">TARGET:</span> <span className="text-emerald-600 underline lowercase">{formattedUrl}</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate(`/full-formal-report?site=${domain}&lang=${lang}&admin=true`)} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-md flex items-center gap-2 group">
              <FileText size={16} /> {t.formalBtn}
            </button>
            {isAdmin && (
              <button onClick={() => navigate(`/full-technical-audit?site=${domain}&lang=${lang}&admin=true`)} className="px-8 py-3 bg-white border border-gray-300 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 group">
                <Activity size={16} /> {t.adminBtn}
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-8">
            <ScorecardWidget title={t.grade}>
              <div className="flex flex-col items-center">
                <div className="w-full text-left pl-2 mb-2">
                  <p className="text-[10px] text-slate-400 font-bold lowercase opacity-70 tracking-tight">{formattedUrl}</p>
                </div>
                <div className="w-full max-w-2xl px-4 py-6 border-b border-slate-100 mb-6">
                  <div className="flex justify-between items-start w-full relative">
                    {[
                      { g: 'A+', label: lang === 'tr' ? 'MÜKEMMEL' : 'EXCELLENT' },
                      { g: 'A', label: lang === 'tr' ? 'ÇOK İYİ' : 'GOOD' },
                      { g: 'B', label: lang === 'tr' ? 'GÜVENLİ' : 'FAIR' },
                      { g: 'C', label: lang === 'tr' ? 'ORTA RİSK' : 'WEAK' },
                      { g: 'D', label: lang === 'tr' ? 'ZAYIF' : 'RISKY' },
                      { g: 'F', label: lang === 'tr' ? 'TEHLİKELİ' : 'DANGER' }
                    ].map((item) => {
                      const isCurrentGrade = auditData.grade === item.g;
                      return (
                        <div key={item.g} className="flex flex-col items-center">
                          <span className={`text-[10px] font-black mb-1 ${isCurrentGrade ? 'text-orange-500' : 'text-slate-300'}`}>{item.g}</span>
                          <span className={`text-[7px] font-bold mb-3 tracking-tighter transition-colors ${isCurrentGrade ? 'text-orange-500' : 'text-slate-300/40'}`}>{item.label}</span>
                          {isCurrentGrade && (
                            <div className="absolute -bottom-2 w-10 h-1 bg-orange-500 rounded-full" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col items-center py-6">
                <div className="relative">
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-[140px] font-black leading-none ${derivedScorePercent >= 80 ? 'text-emerald-500' : derivedScorePercent >= 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                    {auditData.grade}
                  </motion.div>
                  <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] rounded border shadow-sm ${derivedScorePercent >= 80 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-gray-200 text-rose-800 border-gray-300'}`}>
                    {derivedScorePercent >= 80 ? 'ALFA CERTIFIED' : 'ACTION REQUIRED'}
                  </div>
                </div>
                <div className="mt-16 w-full space-y-4 px-4">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>SECURITY ARMOR LEVEL</span>
                    <span className="text-slate-600 font-bold">{derivedScorePercent}/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full border border-gray-300">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${derivedScorePercent}%` }} className={`h-full ${derivedScorePercent >= 80 ? 'bg-emerald-500' : derivedScorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                  </div>
                </div>
                </div>
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={t.summary}>
              <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-xl">
                 <p className="text-xs text-slate-600 leading-relaxed italic">{aiSummaryText}</p>
                 <div className="mt-6 flex items-center justify-between text-xs font-black uppercase tracking-widest border-t border-emerald-100 pt-4">
                   <span className={derivedScorePercent >= 80 ? 'text-emerald-600' : derivedScorePercent >= 50 ? 'text-amber-600' : 'text-rose-600'}>{aiStatusText}</span>
                   {derivedScorePercent >= 80 ? <ShieldCheck size={22} className="text-emerald-500"/> : <AlertTriangle size={22} className={derivedScorePercent >= 50 ? 'text-amber-500' : 'text-rose-500'}/>}
                 </div>
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={lang === 'tr' ? 'HEDEF BİLGİLERİ' : 'TARGET INFORMATION'}>
              <div className="flex flex-col gap-5 text-left bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="flex flex-col gap-1 border-b border-gray-200 border-dashed pb-3">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">TARGET DOMAIN</span>
                  <span className="font-black text-slate-800 text-xs break-all">{domain ? `https://www.${domain.replace(/^https?:\/\/(www\.)?/, '')}` : 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-gray-200 border-dashed pb-3">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">RESOLVED IP</span>
                  <span className="font-black text-slate-800 text-xs">{auditData.ipGeo?.ip || 'N/A'}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-gray-200 border-dashed pb-3">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">INFRASTRUCTURE</span>
                  <span className="font-black text-slate-800 text-xs">{auditData.ipGeo?.isp || auditData.ipGeo?.org || 'Protected'}</span>
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">SERVER LOCATION</span>
                  <span className="font-black text-slate-800 text-xs">{auditData.ipGeo?.country || 'Unknown'} / {auditData.ipGeo?.asn || 'Hidden'}</span>
                </div>
              </div>
            </ScorecardWidget>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <ScorecardWidget title={t.infra}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
                {forensicCategories.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="42" strokeWidth="6" fill="transparent" stroke="currentColor" className="text-gray-200" />
                        <motion.circle cx="50" cy="50" r="42" strokeWidth="8" stroke="currentColor" strokeLinecap="round" fill="transparent" initial={{ pathLength: 0 }} animate={{ pathLength: item.health / 100 }} transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }} className={item.color} />
                      </svg>
                      <span className="absolute text-xs font-black text-slate-700">%{item.health}</span>
                    </div>
                    <div className="mt-4 flex flex-col items-center leading-tight">
                       <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">
                         {item.index}
                       </span>
                       <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter text-center">
                         {item.name}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScorecardWidget>

            <ScorecardWidget title={t.risks}>
               <div className="space-y-6">
                  {forensicCategories.map((cat, idx) => {
                    const catFindings = displayFindings.filter(f => {
                      const fCat = (f.category || '').toUpperCase();
                      const cName = cat.name.split(' ')[0].toUpperCase();
                      const fId = (f.id || '').toLowerCase();
                      const cId = cat.id.toLowerCase();
                      return fCat.includes(cName) || fId.includes(cId);
                    });
                    
                    return (
                      <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:border-emerald-300 transition-all border-l-4" style={{ borderLeftColor: cat.health >= 80 ? '#10b981' : (cat.health >= 50 ? '#f59e0b' : '#f43f5e') }}>
                        <div className="bg-gray-50/50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs border border-blue-200 shadow-sm">{cat.index}</span>
                            <h3 className="font-black text-sm text-slate-800 tracking-tight">{cat.name}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                             <div className="flex items-center gap-1">
                               <span className="bg-gray-200 px-2 py-0.5 rounded text-slate-600">ISO 27001:2022</span>
                               <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-800">{cat.iso}</span>
                             </div>
                             <span className={`px-2 py-0.5 rounded font-bold ${cat.color} bg-white border border-gray-100 shadow-sm`}>{cat.status}</span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                           <p className={`text-[16px] font-medium leading-relaxed mb-4 ${cat.health >= 80 ? 'text-emerald-800' : (cat.health >= 50 ? 'text-amber-800' : 'text-rose-800')}`}>
                             {cat.desc}
                           </p>
                           
                           <div className="pt-4 border-t border-gray-100">
                             <span className="text-[13px] italic text-slate-400 font-normal block leading-tight">
                               Reference: {cat.isoTitle}
                             </span>
                           </div>

                          <div className="grid grid-cols-1 gap-4">
                            {catFindings.length > 0 ? catFindings.map((risk, ridx) => (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ridx * 0.1 }}
                                key={ridx} 
                                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all group"
                              >
                                <div className={`mt-1 ${risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                  {risk.severity === 'CRITICAL' || risk.severity === 'HIGH' ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-xs font-black text-slate-800 tracking-tight">{risk.title}</h4>
                                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{risk.desc || risk.description}</p>
                                </div>
                              </motion.div>
                            )) : (
                              <div className={`flex items-center gap-3 p-4 rounded-xl border ${cat.health >= 80 ? 'bg-emerald-50/30 border-emerald-100/50 text-emerald-700' : (cat.health >= 50 ? 'bg-amber-50/30 border-amber-100/50 text-amber-700' : 'bg-rose-50/30 border-rose-100/50 text-rose-700')}`}>
                                 {cat.health >= 80 ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
                                 <span className="text-[10px] font-bold uppercase tracking-widest">
                                   {cat.health >= 80 
                                     ? (lang === 'tr' ? 'BU KATEGORİDE KRİTİK BİR RİSK TESPİT EDİLMEDİ' : 'NO CRITICAL RISKS DETECTED IN THIS CATEGORY')
                                     : (lang === 'tr' ? 'YÜKSEK POTANSİYELLİ RİSK VE YAPILANDIRMA EKSİKLİĞİ' : 'SPECIFIC CONFIGURATION RISKS & VULNERABILITIES DETECTED')}
                                 </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </ScorecardWidget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScoreCard;
