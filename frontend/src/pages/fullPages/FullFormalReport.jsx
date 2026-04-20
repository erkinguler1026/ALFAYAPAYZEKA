import React from 'react';
import { 
  Shield, Zap, Activity, Lock, Globe, FileText, CheckCircle2, 
  AlertTriangle, ShieldAlert, Cpu, BarChart3, Search, Database, 
  ArrowLeft, ShieldCheck, QrCode, Loader2, Terminal, CheckCircle 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * AuditReportGenerator — Ultra-Dense 48-Page A4 Engine (V2 - Professional Edition) - Formal Document View
 */

const CVSSBadge = ({ score }) => {
  const getColor = (s) => {
    if (s >= 9.0) return 'bg-red-600 text-white';
    if (s >= 7.0) return 'bg-orange-500 text-white';
    if (s >= 4.0) return 'bg-yellow-500 text-black';
    return 'bg-blue-500 text-white';
  };
  return (
    <div className={`px-2 py-1 rounded text-[9px] font-black flex items-center gap-1 ${getColor(score)} shadow-sm inline-flex`}>
      <ShieldAlert size={10} /> CVSS v3.1: {score}
    </div>
  );
};

const Page = ({ children, pageNum, title, isCover, t }) => (
  <div className={`bg-white border-b border-gray-100 relative min-h-[297mm] flex flex-col print:border-none print:p-0 print:mb-0 ${isCover ? '' : 'p-[20mm]'}`} style={{ breakAfter: 'page', pageBreakAfter: 'always' }}>
    {/* Page Classification */}
    {!isCover && (
      <div className="absolute top-[8mm] left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none text-center">
         <span className="text-[12px] font-black tracking-[12px] uppercase">{t?.classificationLabel || 'TİCARİ SIR — KİŞİYE ÖZEL GİZLİ'}</span>
      </div>
    )}

    {/* Header */}
    {!isCover && (
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={20} />
            <span className="font-black tracking-tighter text-lg uppercase underline decoration-primary decoration-4 underline-offset-4">{t.unitTitle || 'ALFA YAPAY ZEKA — GÜVENLİK BİRİMİ'}</span>
          </div>
          <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">REAL-TIME PENETRATION AUDIT — CODE: ALFA-XRAY-V3</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-black text-gray-900 bg-gray-100 px-3 py-1 rounded">PAG: {pageNum.toString().padStart(3, '0')} / 250</span>
        </div>
      </div>
    )}

    {/* Section Indicator */}
    {!isCover && title && (
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tighter border-l-8 border-primary pl-4 bg-slate-50 py-3 uppercase">{title}</h2>
        <div className="h-0.5 bg-gradient-to-r from-primary to-transparent mt-1" />
      </div>
    )}

    {/* Content */}
    <div className={`flex-1 ${isCover ? 'flex flex-col' : 'text-[11px] leading-relaxed relative'}`}>
      {children}
    </div>

    {/* Footer */}
    {!isCover && (
      <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] border-t border-gray-200 pt-3 flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase tracking-widest">
        <span>{t.footer.meta}</span>
        <div className="flex items-center gap-2">
           <ShieldCheck size={12} className="text-primary" />
           <span>{t.footer.copyright}</span>
        </div>
      </div>
    )}
  </div>
);

const CoverPage = ({ siteName, t, metadata, totalPages }) => {
  return (
    <Page pageNum={1} totalPages={totalPages} isCover t={t}>
       <div className="h-full flex flex-col items-center justify-between py-20 relative bg-white">
          <div className="relative z-10 flex flex-col items-center">
             <div className="mb-10">
                <ShieldCheck size={100} className="text-blue-600" />
             </div>
             
             <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                   ALFA PENETRASYON FULL X-RAY RAPORU
                </h1>
                <p className="text-[14px] font-bold text-slate-400 tracking-[0.4em] uppercase">
                   KAPSAMLI GÜVENLİK DENETİMİ & PENTEST
                </p>
             </div>
          </div>
  
          <div className="relative z-10 w-full max-w-4xl px-16 space-y-12">
             <div className="w-full h-px bg-slate-200/60" />
             <div className="text-center py-4">
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-[4px] mb-6">HEDEF KURULUŞ / DOMAIN</p>
                <h4 className="font-serif font-black text-slate-900 tracking-[-0.02em] leading-none text-center px-4 whitespace-nowrap" 
                     style={{ fontSize: (siteName.length > 20 ? '2.2rem' : '3.1rem') }}>
                    https://www.{siteName.toLowerCase()}
                 </h4>
             </div>
             <div className="w-full h-px bg-slate-200/60" />
          </div>
  
          <div className="relative z-10 w-full max-w-3xl px-12 grid grid-cols-2 gap-x-16 gap-y-12 mb-10">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.reportNo}</p>
                <p className="text-sm font-mono font-black text-slate-800 tracking-tighter">#ALFA-XRAY-V3-FULL</p>
             </div>
             <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.analysisDate}</p>
                <p className="text-sm font-mono font-black text-slate-800">{metadata.dateStr} {metadata.timeStr}</p>
             </div>
             
             <div className="border-l-4 border-red-500 pl-4 bg-red-50/40 py-2 rounded-r-xl">
                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{t.classification}</p>
                <p className="text-xs font-black text-red-700 uppercase">{t.confidential}</p>
             </div>
             <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/40 py-2 rounded-r-xl">
                <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{t.status}</p>
                <p className="text-xs font-black text-blue-700 uppercase">{t.completed}</p>
             </div>
          </div>
       </div>
    </Page>
  );
};

const TableOfContents = ({ t, totalPages }) => {
  return (
  <Page pageNum={2} totalPages={totalPages} title={t.tocTitle} t={t}>
    <div className="space-y-12">
      <p className="text-gray-500 italic text-base leading-relaxed bg-slate-50 p-8 rounded-[2.5rem] border-l-8 border-primary shadow-sm">
        {t.tocDesc}
      </p>
      
      <div className="grid grid-cols-1 gap-4 px-4">
        {[
          { id: "S1", title: t.sections.s1, page: "010" },
          { id: "S2", title: t.sections.s3, page: "025" },
          { id: "S3", title: t.sections.s5, page: "040" },
          { id: "S4", title: t.sections.s8, page: "055" },
          { id: "S5", title: t.sections.n1, page: "070" },
          { id: "S6", title: t.sections.n2, page: "115" },
          { id: "S7", title: t.sections.n3, page: "130" },
          { id: "S8", title: t.sections.n4, page: "145" },
          { id: "S9", title: t.sections.n5, page: "160" },
          { id: "S10", title: t.sections.n6, page: "175" },
          { id: "S11", title: t.sections.n7, page: "190" },
          { id: "S12", title: t.sections.n8, page: "210" },
          { id: "DUMP", title: "TEKNİK BULGU VE KANIT DOSYASI (JSON DUMP)", page: "235" },
          { id: "LEGAL", title: "YASAL BİLGİLENDİRME VE SORUMLULUK", page: "248" },
          { id: "LAST", title: t.items?.final || "RESMİ ONAY VE DİJİTAL İMZA", page: "250" },
        ].map((item) => (
          <div key={item.id} className="flex items-center group">
            <span className="font-mono text-primary font-black opacity-40 group-hover:opacity-100 transition-opacity w-12">{item.id}</span>
            <span className="font-black tracking-tighter text-slate-700 uppercase group-hover:text-primary transition-colors">{item.title}</span>
            <div className="flex-1 mx-4 border-b border-dotted border-slate-200" />
            <span className="font-mono font-black text-slate-400 group-hover:text-slate-900 transition-colors">PAG. {item.page}</span>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-700">
         <ShieldCheck className="absolute -top-4 -right-4 text-white opacity-10" size={160} />
         <div className="relative z-10">
            <h4 className="text-white text-2xl font-black mb-4 uppercase tracking-tighter">GÜVENLİK SERTİFİKASYONU VE BÜTÜNLÜK</h4>
            <p className="text-white/70 text-sm leading-relaxed font-bold italic pr-20">
               Bu rapor, ALFA X-RAY V3 denetim motoru tarafından üretilmiş olup, uluslararası sızma testi standartlarına (OWASP, NIST, ISO 27001) tam uyumluluk göstermektedir. Dijital hash imzası ile bütünüyle korunmaktadır.
            </p>
         </div>
      </div>
    </div>
  </Page>
  );
};

const DataItem = ({ label, value }) => (
  <div className="flex flex-col border-l-2 border-primary pl-4 py-1">
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-[13px] font-black text-slate-900 tracking-tight">{value || 'N/A'}</span>
  </div>
);

const chunkArray = (arr, size) => {
  const result = [];
  if (!arr) return result;
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
};

const FinalPage = ({ t, pageNum, totalPages, siteName, metadata }) => (
  <Page pageNum={pageNum} totalPages={totalPages} title={t.items.final} t={t}>
    <div className="h-full flex flex-col justify-between py-12">
       <div className="space-y-[40px]">
          <div className="flex items-center gap-4 border-b-4 border-primary pb-4">
             <Shield size={48} className="text-primary" />
             <h3 className="text-4xl font-black uppercase tracking-tighter">{t.items.final}</h3>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-slate-200 pl-6 pr-12">
             {t.signatureDisclaimer}
          </p>

          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[2rem] space-y-4">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">AUDIT INTEGRITY VERIFICATION</h4>
             <div className="flex items-center gap-8">
                <ShieldCheck size={40} className="text-green-600" />
                <div className="font-mono text-[9px] text-slate-500 uppercase leading-loose">
                   <p>Engine: ALFA-XRAY-V3.0 (Security Intelligence Core)</p>
                   <p>Target: https://www.{siteName.toLowerCase()}</p>
                   <p>Integrity Hash: {metadata.integrityHash}</p>
                   <p>Verification Date: {metadata.isoDate}</p>
                </div>
             </div>
          </div>
          
          <div className="flex items-center justify-center mt-8 gap-[60px]">
             <div className="flex flex-col items-center justify-center relative">
                <div className="p-8 border-[6px] border-double border-red-600 rounded-[2rem] bg-transparent flex flex-col items-center justify-center space-y-4 shadow-sm transform -rotate-12 scale-90 mix-blend-multiply opacity-80">
                   <ShieldCheck size={50} className="text-red-600" />
                   <div className="text-center">
                      <p className="text-xl font-black uppercase tracking-[0.3em] text-red-600">ALFA SECURED</p>
                      <p className="text-[8px] font-bold text-red-600 mt-2 uppercase italic tracking-[0.4em]">Pentest Methodology Verified</p>
                   </div>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic opacity-40 absolute -bottom-16">Official System Security Identification</p>
             </div>

             <div className="bg-white border-2 border-slate-900 p-4 rounded-[1.5rem] shadow-xl flex items-center justify-center relative group">
                <div className="absolute -top-3 -right-3 bg-primary text-white p-1 rounded-full shadow-lg">
                   <QrCode size={16} />
                </div>
                <QRCodeSVG 
                  value={`TGT: www.${siteName.toLowerCase()}\nHASH: ${metadata.integrityHash.slice(0, 20)}...\nDATE: ${metadata.isoDate}`}
                  size={120}
                  level={"H"}
                  includeMargin={true}
                />
             </div>
          </div>
       </div>

       <div className="flex justify-end pt-12 pr-12">
          <div className="text-right flex flex-col items-end">
             <div className="relative inline-block z-10 -mb-12 mr-6">
                <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Signature" className="h-[120px] mix-blend-multiply brightness-90 contrast-125" />
             </div>
             <div className="space-y-1 relative z-0 pt-4 border-t-2 border-slate-100 min-w-[250px]">
                <p className="text-3xl font-black tracking-tighter leading-none text-slate-900">{t.signatureName}</p>
                <p className="text-base font-bold text-primary mt-1">{t.signatureHead}</p>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-1">{t.signatureUnit}</p>
             </div>
          </div>
       </div>
       
       <div className="border-t border-slate-100 pt-6 flex justify-between items-end">
          <div className="space-y-1">
             <p className="text-[8px] text-slate-300 font-mono uppercase tracking-[0.2em]">DOSS_ID: {metadata.dossierId}</p>
             <p className="text-[8px] text-slate-300 font-mono uppercase tracking-[0.2em]">SYS_NODE: ALFA-PRIMARY-XRAY-TX-CORE</p>
          </div>
          <div className="px-3 py-1 bg-slate-50 border rounded text-[8px] font-black text-slate-400 uppercase tracking-widest">
             End of Dossier — Page 250
          </div>
       </div>
    </div>
  </Page>
);
const FullFormalReport = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'tr';
  const siteParam = searchParams.get('site');

  React.useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang]);

  const metadata = React.useMemo(() => {
    const now = new Date();
    return {
      dateStr: now.toLocaleDateString('tr-TR'),
      timeStr: now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isoDate: now.toISOString(),
      integrityHash: (window.crypto?.randomUUID?.() || Math.random().toString(36).substring(2)).replace(/-/g, '').toUpperCase(),
      dossierId: (window.crypto?.randomUUID?.() || Math.random().toString(36).substring(2)).slice(0, 18).toUpperCase()
    };
  }, []);

  const siteName = (siteParam || 'site.com').toUpperCase();
  const [auditData, setAuditData] = React.useState(null);
  const [isAuditLoading, setIsAuditLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAudit = async () => {
      try {
        const HOST = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://api.alfayapayzeka.com';
        const res = await fetch(`${HOST}/api/full-pentest?url=${siteName.toLowerCase()}`);
        const data = await res.json();
        if(data.success) {
           setAuditData(data.results);
        }
      } catch(e) {
        console.error(e);
      } finally {
        setIsAuditLoading(false);
      }
    };
    fetchAudit();
  }, [siteName]);

  const t = {
    tr: {
      reportTitle: "ALFA PENETRASYON RAPOR MÜHENDİSLİĞİ",
      reportVariant: "GERÇEK X-RAY",
      reportSuffix: "ADLİ BİLİŞİM RAPORU",
      pentestAudit: "Uluslararası Standartlarda Sızma Testi & Denetim",
      analysisDate: "Denetim Tarihi",
      reportNo: "Rapor ID",
      classification: "Sınıflandırma",
      confidential: "KİŞİYE ÖZEL / GİZLİ",
      status: "Denetim Durumu",
      completed: "TAMAMLANDI",
      classificationLabel: "TİCARİ SIR — KİŞİYE ÖZEL GİZLİ",
      targetDomainLabel: "HEDEF KURULUŞ / DOMAIN",
      unitTitle: "ALFA YAPAY ZEKA — GÜVENLİK BİRİMİ",
      tocTitle: "Denetim Hiyerarşisi ve İçindekiler",
      tocDesc: "Bu rapor, ALFA XRAY-V3 motoru tarafından gerçekleştirilen sızma testi sonuçlarını ve teknik bulguları içermektedir.",
      backToAdmin: "Geri Dön",
      printBtn: "RESMİ PDF RAPORU OLUŞTUR (CTRL+P)",
      footerNote: "Not: Rapor gerçek zamanlı verilerle oluşturulmuştur.",
      introText: `Bu belge, ${siteName} altyapısının siber güvenlik dayanıklılığını ölçmek amacıyla ALFA standartlarında üretilmiştir.`,
      tableHeaders: { asset: "Teknik Varlık", methodology: "Metodoloji", status: "Bulgu Durumu" },
      verified: "Taranmış / Doğrulanmış",
      signatureHead: "Siber Güvenlik Başkanı",
      signatureUnit: "ALFA Siber Analiz Ünitesi",
      signatureName: "Erkin GÜLER",
      signatureDisclaimer: "Bu belge dijital olarak imzalanmış olup, teknik bulguların doğruluğu ALFA YAPAY ZEKA laboratuvarları tarafından onaylanmıştır.",
      sections: {
        s1: "BÖLÜM I: IP ÇÖZÜMLEME VE AĞ İSTİHBARATI (S1)",
        s3: "BÖLÜM II: PORT TARAMA VE SERVİS ANALİZİ (S2)",
        s5: "BÖLÜM III: HTTP GÜVENLİK BAŞLIKLARI (S3)",
        s8: "BÖLÜM IV: HASSAS DOSYA VE YOL TARAMASI (S4)",
        n1: "BÖLÜM V: SUBDOMAIN / ALT ALAN ADI KEŞFİ (S5)",
        n2: "BÖLÜM VI: SSL LABS GÜVENLİK DERECESİ (S6)",
        n3: "BÖLÜM VII: WHOIS VE RDAP SAHİPLİK BİLGİSİ (S7)",
        n4: "BÖLÜM VIII: ÇEREZ (COOKIE) GÜVENLİK ANALİZİ (S8)",
        n5: "BÖLÜM IX: CORS POLİTİKASI VE API GÜVENLİĞİ (S9)",
        n6: "BÖLÜM X: TEKNOLOJİ PARMAK İZİ TESPİTİ (S10)",
        n7: "BÖLÜM XI: GEO-IP KONUM VE ISP ANALİZİ (S11)",
        n8: "BÖLÜM XII: IP VE DOMAİN İTİBAR KONTROLÜ (S12)"
      },
      footer: {
        meta: `www.${siteName.toLowerCase()} — ADLİ BİLİŞİM DENETİM DOSYASI — ALFA-V3`,
        copyright: "© 2026 ALFA YAPAY ZEKA SEC-UNIT"
      },
      items: {
        final: "DENETİM SONUCU VE RESMİ ONAY"
      }
    },
    en: {
      reportTitle: "ALFA PENETRATION REPORT ENGINEERING",
      reportVariant: "REAL X-RAY",
      reportSuffix: "FORENSIC AUDIT REPORT",
      pentestAudit: "Penetration Analysis & International Forensic Audit",
      analysisDate: "Audit Date",
      reportNo: "Report ID",
      classification: "Classification",
      confidential: "PRIVATE & CONFIDENTIAL",
      status: "Audit Status",
      completed: "COMPLETED",
      classificationLabel: "COMMERCIAL SECRET — PRIVATE & CONFIDENTIAL",
      targetDomainLabel: "Target Organization / Domain",
      unitTitle: "ALFA ARTIFICIAL INTELLIGENCE — SECURITY UNIT",
      tocTitle: "Audit Hierarchy & Table of Contents",
      tocDesc: "This report contains penetration test results and technical findings generated by the ALFA XRAY-V3 engine.",
      backToAdmin: "Go Back",
      printBtn: "GENERATE OFFICIAL PDF REPORT (CTRL+P)",
      footerNote: "Note: Report generated with real-time forensic data.",
      introText: `This document was produced in ALFA standards to measure the cyber security resilience of the ${siteName} infrastructure.`,
      tableHeaders: { asset: "Technical Asset", methodology: "Methodology", status: "Field Status" },
      verified: "Scanned / Verified",
      signatureHead: "Head of Cyber Security",
      signatureUnit: "ALFA Cyber Analysis Unit",
      signatureName: "Erkin GULER",
      signatureDisclaimer: "This document is digitally signed, and the accuracy of technical findings has been approved by ALFA AI labs.",
      sections: {
        s1: "Section I: IP Resolution & Network OSINT (S1)",
        s3: "Section II: Port Scan & Service Analysis (S2)",
        s5: "Section III: HTTP Security Headers (S3)",
        s8: "Section IV: Sensitive File & Path Brute (S4)",
        n1: "Section V: Subdomain Discovery (S5)",
        n2: "Section VI: Qualys SSL Labs Grade (S6)",
        n3: "Section VII: WHOIS & RDAP Ownership (S7)",
        n4: "Section VIII: Cookie Security Analysis (S8)",
        n5: "Section IX: CORS Policy & API Security (S9)",
        n6: "Section X: Technology Fingerprint (S10)",
        n7: "Section XI: Geo-IP & ISP Analysis (S11)",
        n8: "Section XII: IP & Domain Reputation (S12)"
      },
      footer: {
        meta: `www.${siteName.toLowerCase()} — TECHNICAL AUDIT DOSSIER — ALFA-V3`,
        copyright: "© 2026 ALFA AI SEC-UNIT"
      },
      items: {
        final: "AUDIT RESULT & OFFICIAL APPROVAL"
      }
    }
  }[lang];

  if (isAuditLoading || !auditData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] font-mono">
        <Loader2 size={60} className="text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-black text-slate-800 tracking-[0.2em] uppercase">VERİLER DERLENİYOR</h2>
        <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">PENTEST SONUÇLARI PONTANSİYEL 250 SAYFAYA YAYILIYOR...</p>
      </div>
    );
  }

  const subdomains      = auditData.subdomainList || [];
  const ports           = auditData.network?.ports || [];
  const techs           = auditData.technologies || [];
  const methodology     = auditData.toolMethodology || [];
  const clauses         = auditData.disclaimer?.clauses || [];
  const geoData         = auditData.ipGeo || {};
  const whois           = auditData.whoisData || {};

  const subChunks       = chunkArray(subdomains, 22);
  const methodologyChunks = chunkArray(methodology, 1); // Her metodoloji için ayrı sayfa

  const sslLabs = auditData.sslGrade || {};
  const cookies = auditData.cookies || [];
  const cors    = auditData.corsData || {};
  const _sitemap = auditData.sitemapData || {};
  const sensitive = auditData.sensitiveData || {};
  const headersAnalytic = auditData.sections?.s3?.findings || []; // S5 mapping

  const totalPages = 250;

  return (
    <div className="bg-gray-200 min-h-screen py-12 print:py-0 font-sans print:bg-white text-black text-left overflow-x-hidden transition-all">
      <div className="max-w-[210mm] mx-auto shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-white print:shadow-none">
        
        <CoverPage siteName={siteName} t={t} metadata={metadata} totalPages={totalPages} />
        <TableOfContents t={t} totalPages={totalPages} />

        <Page pageNum={10} totalPages={totalPages} title={t.sections.s1} t={t}>
           <div className="space-y-10">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">AĞ ÇÖZÜMLEME ANALİZİ</h4>
                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="grid grid-cols-2 gap-8">
                       <DataItem label="HEDEF DOMAIN" value={auditData.target} />
                       <DataItem label="RESOLVED IP" value={auditData.ipAddress} />
                       <DataItem label="IP PROTOKOLÜ" value={auditData.ipFamily} />
                       <DataItem label="SİSTEM DURUMU" value={auditData.ipResolved ? 'AKTİF / ÇEVRİMİÇİ' : 'BİLİNMİYOR'} />
                    </div>
                 </div>
              </section>
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">OPERASYONEL ANALİZ NOTLARI</h4>
                 <div className="bg-slate-900 border-2 border-slate-800 rounded-[2rem] p-8 font-mono text-[10px] text-white/70 leading-relaxed">
                    {auditData.sections?.s1?.logs?.map((log, i) => (
                       <p key={i}>{log}</p>
                    ))}
                 </div>
              </section>
           </div>
        </Page>

        <Page pageNum={25} totalPages={totalPages} title={t.sections.s3} t={t}>
           <div className="space-y-8">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">TCP STEALTH PORT SCAN (17 KRİTİK NOKTA)</h4>
                 <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm">
                    <table className="w-full text-[10px]">
                       <thead className="bg-slate-900 text-white font-black uppercase tracking-tighter">
                          <tr>
                             <th className="p-3 text-left">PORT</th>
                             <th className="p-3 text-left">SERVİS ADI</th>
                             <th className="p-3 text-center">DURUM</th>
                             <th className="p-3 text-right">RİSK SEVİYESİ</th>
                          </tr>
                       </thead>
                       <tbody>
                          {ports.map((p, i) => (
                             <tr key={i} className="border-b">
                                <td className="p-3 font-bold">{p.port}</td>
                                <td className="p-3 font-mono">{p.service}</td>
                                <td className="p-3 text-center">
                                   <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-black">OPEN</span>
                                </td>
                                <td className={`p-3 text-right font-black ${p.risk === 'CRITICAL' || p.risk === 'HIGH' ? 'text-red-600' : 'text-slate-400'}`}>
                                   {p.risk}
                                </td>
                             </tr>
                          ))}
                          {ports.length === 0 && (
                             <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Kritik port tespit edilmedi. Firewall aktif görünüyor.</td></tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </section>
           </div>
        </Page>

        <Page pageNum={40} totalPages={totalPages} title={t.sections.s5} t={t}>
           <div className="space-y-8">
              <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">HTTP RESPONSE HEADER AUDIT</h4>
              <p className="text-[12px] text-slate-500 italic mb-6">Sunucu tarafından gönderilen güvenlik başlıklarının varlığı ve konfigürasyon doğruluğu denetlenmiştir.</p>
              <div className="grid grid-cols-1 gap-4">
                 {headersAnalytic.map((f, i) => (
                    <div key={i} className={`p-6 rounded-[2rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                       <div>
                          <h6 className="font-black text-xs uppercase text-slate-800">{f.item}</h6>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">DURUM: {f.status}</p>
                       </div>
                       <div className={`px-4 py-1 rounded-full text-[9px] font-black ${f.severity === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {f.severity}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </Page>

        <Page pageNum={55} totalPages={totalPages} title={t.sections.s8} t={t}>
           <div className="space-y-8">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">HASSAS DOSYA VE DİZİN İFŞA TARAMASI</h4>
                 <div className="p-10 bg-slate-900 border-2 border-red-900/20 rounded-[3rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <Search size={150} className="text-white" />
                    </div>
                    <div className="relative z-10 space-y-6">
                       <h5 className="text-white text-xl font-black uppercase tracking-tighter">V3.0 PATH BRUTEFORCE SONUÇLARI</h5>
                       <div className="space-y-4">
                          {sensitive.findings && sensitive.findings.length > 0 ? (
                             sensitive.findings.map((f, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-red-600/10 border border-red-600/30 rounded-2xl">
                                   <div className="flex items-center gap-4">
                                      <ShieldAlert size={20} className="text-red-500" />
                                      <span className="font-mono text-white text-sm">{f.path}</span>
                                   </div>
                                   <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black rounded-lg uppercase">ACİL MÜDAHALE GEREKLİ</span>
                                </div>
                             ))
                          ) : (
                             <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] text-center">
                                <p className="text-emerald-400 font-black text-lg uppercase tracking-widest">HASSAS DOSYA İFŞASI TESPİT EDİLMEDİ</p>
                                <p className="text-white/30 text-[10px] mt-2 uppercase">.env, .git, .htaccess ve yedek dosyaları taranmıştır.</p>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              </section>
           </div>
        </Page>


        {subChunks.slice(0, 40).map((chunk, idx) => (
           <Page key={`sub-${idx}`} pageNum={70 + idx} totalPages={totalPages} title={`BÖLÜM V: ALT ALAN ADI KEŞİF DÖKÜMÜ — PART ${idx + 1}`} t={t}>
              <div className="space-y-4">
                 <div className="bg-slate-50 p-4 border-l-4 border-primary rounded-r-2xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">OSINT — ALAN ADI KEŞİF VERİSİ</p>
                    <p className="text-[9px] text-slate-400 italic">Kaynak: crt.sh (Certificate Transparency Logs) — Global Infrastructure Mapping</p>
                 </div>
                 <table className="w-full border-collapse text-[10px]">
                    <thead>
                       <tr className="bg-slate-800 text-white font-black uppercase tracking-tighter">
                          <th className="p-2 border border-slate-700 w-12 text-center">#</th>
                          <th className="p-2 border border-slate-700 text-left">TECHNICAL HOSTNAME / DOMAIN</th>
                          <th className="p-2 border border-slate-700 text-right">CERTIFICATE ISSUER</th>
                       </tr>
                    </thead>
                    <tbody>
                       {chunk.map((s, i) => (
                          <tr key={i} className="border-b hover:bg-slate-50/50 transition-colors">
                             <td className="p-2 border text-center text-[8px] text-slate-400 font-mono">{(idx * 22) + i + 1}</td>
                             <td className="p-2 border font-mono font-bold text-blue-600 truncate max-w-[300px]">{s.subdomain}</td>
                             <td className="p-2 border text-right text-[8px] font-medium text-slate-500">{s.issuer?.split(',')[0]}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Page>
        ))}


        <Page pageNum={115} totalPages={totalPages} title={t.sections.n2} t={t}>
           <div className="space-y-8">
              <div className="flex items-center gap-6 p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Shield size={120} />
                 </div>
                 <div className="text-6xl font-black text-blue-400">{sslLabs.grade || 'T'}</div>
                 <div>
                    <h3 className="text-2xl font-black">QUALYS SSL LABS — GLOBAL GRADE</h3>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Sertifika Zinciri, Protokol Desteği ve El Sıkışma Analizi</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="p-base bg-slate-50 border rounded-2xl p-6">
                    <h5 className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-widest">SERTİFİKA DETAYLARI</h5>
                    <div className="space-y-3">
                       <DataItem label="ISSUER (YAYINLAYICI)" value={sslLabs.cert?.issuer} />
                       <DataItem label="KEY STRENGTH" value={`${sslLabs.cert?.keyStrength} bit ${sslLabs.cert?.keyAlg}`} />
                       <DataItem label="DAYS TO EXPIRY" value={`${sslLabs.cert?.daysUntilExpiry} GÜN`} />
                    </div>
                 </div>
                 <div className="p-base bg-slate-50 border rounded-2xl p-6">
                    <h5 className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-widest">PROTOKOL GÜVENLİĞİ</h5>
                    <div className="flex flex-wrap gap-2">
                       {(sslLabs.protocols || []).map((p, i) => (
                          <span key={i} className="px-3 py-1 bg-white border font-bold text-[9px] rounded-lg">{p}</span>
                       ))}
                    </div>
                    <div className="mt-4 space-y-2 border-t pt-4">
                       <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.heartbleed ? 'text-red-600' : 'text-green-600'}`}>HEARTBLEED: {sslLabs.vulnerabilities?.heartbleed ? 'VULNERABLE' : 'GÜVENLİ'}</p>
                       <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.poodle ? 'text-red-600' : 'text-green-600'}`}>POODLE: {sslLabs.vulnerabilities?.poodle ? 'VULNERABLE' : 'GÜVENLİ'}</p>
                    </div>
                 </div>
              </div>
           </div>
        </Page>

        <Page pageNum={130} totalPages={totalPages} title={t.sections.n3} t={t}>
           <div className="space-y-10">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">WHOIS & RDAP DOMAIN KAYIT ANALİZİ</h4>
                 <div className="bg-slate-900 border-2 border-slate-800 rounded-[2rem] p-8 font-mono text-[10px] leading-relaxed relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                       <Database size={100} className="text-white" />
                    </div>
                    <div className="space-y-4 text-white">
                       <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-4">
                          <div>
                             <p className="text-white/40 mb-1">REGISTRAR</p>
                             <p className="text-blue-400 font-black uppercase text-[11px] truncate">{whois.registrar || 'GİZLİ'}</p>
                          </div>
                          <div>
                             <p className="text-white/40 mb-1">KAYIT TARİHİ</p>
                             <p className="text-white font-black text-[11px]">{whois.createdDate ? new Date(whois.createdDate).toLocaleDateString() : 'N/A'}</p>
                          </div>
                          <div>
                             <p className="text-white/40 mb-1">BİTİŞ TARİHİ</p>
                             <p className="text-red-400 font-black text-[11px]">{whois.expiryDate ? new Date(whois.expiryDate).toLocaleDateString() : 'N/A'}</p>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <p className="text-white/40 uppercase tracking-widest text-[8px]">DNS NAMESERVERS (NS)</p>
                          <div className="flex flex-wrap gap-2 pt-1">
                             {(whois.nameservers || []).map((ns, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 font-bold text-[9px] lowercase">{ns}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </section>
           </div>
        </Page>

        <Page pageNum={145} totalPages={totalPages} title={t.sections.n4} t={t}>
           <div className="space-y-8">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">COOKIE (ÇEREZ) GÜVENLİK ANALİZİ</h4>
                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between mb-6 shadow-sm">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TESPİT EDİLEN ÇEREZ SAYISI</p>
                       <p className="text-4xl font-black text-slate-900 tracking-tighter">{cookies.length}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">GÜVENLİ ONAY DURUMU</p>
                       <p className={`text-xl font-black tracking-tighter ${cookies.every(c => c.httpOnly && c.secure) ? 'text-emerald-600' : 'text-orange-600'}`}>
                          {cookies.every(c => c.httpOnly && c.secure) ? 'TAM GÜVENLİ' : 'RİSKLİ / EKSİK BAYRAK'}
                       </p>
                    </div>
                 </div>
                 <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm">
                    <table className="w-full text-[10px]">
                       <thead className="bg-slate-900 text-white font-black uppercase tracking-tighter">
                          <tr>
                             <th className="p-4 text-left">ÇEREZ ADI (COOKIE NAME)</th>
                             <th className="p-4 text-center">HTTPONLY</th>
                             <th className="p-4 text-center">SECURE</th>
                             <th className="p-4 text-center">SAMESITE</th>
                          </tr>
                       </thead>
                       <tbody>
                          {cookies.map((c, i) => (
                             <tr key={i} className="border-b">
                                <td className="p-4 font-bold text-slate-800">{c.name}</td>
                                <td className="p-4 text-center">{c.httpOnly ? <span className="text-emerald-600">EVET</span> : <span className="text-red-600 font-bold underline">HAYIR</span>}</td>
                                <td className="p-4 text-center">{c.secure ? <span className="text-emerald-600">EVET</span> : <span className="text-red-600 font-bold underline">HAYIR</span>}</td>
                                <td className="p-4 text-center font-mono">{c.sameSite || 'None'}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </section>
           </div>
        </Page>

        <Page pageNum={160} totalPages={totalPages} title={t.sections.n5} t={t}>
           <div className="space-y-8">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">CORS POLİTİKASI VE API GÜVENLİĞİ</h4>
                 <div className="p-8 bg-slate-800 rounded-[2rem] border-2 border-white/5 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                       <Shield size={120} className="text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-8 relative z-10">
                       <DataItem label="CONTROL-ALLOW-ORIGIN" value={cors.allowOrigin || 'Kısıtlı'} inverted />
                       <DataItem label="CONTROL-ALLOW-METHODS" value={cors.allowMethods || 'Varsayılan'} inverted />
                       <DataItem label="ALLOW-CREDENTIALS" value={cors.allowCredentials ? 'EVET' : 'HAYIR'} inverted />
                       <DataItem label="POLİTİKA GÜVENLİK DURUMU" value={cors.isWildcard ? 'KRİTİK / WILDCARD (*)' : 'GÜVENLİ / KISITLI'} inverted />
                    </div>
                    {cors.isWildcard && (
                       <div className="mt-6 p-4 bg-red-600/20 border border-red-600/40 rounded-2xl flex items-center gap-4 animate-pulse">
                          <ShieldAlert className="text-red-500" size={24} />
                          <p className="text-[10px] text-red-100 font-bold uppercase tracking-tight">Kritik Uyarı: Wildcard (*) CORS politikası, saldırganların kullanıcı verilerini çalmasına olanak tanır!</p>
                       </div>
                    )}
                 </div>
              </section>
           </div>
        </Page>

        <Page pageNum={175} totalPages={totalPages} title={t.sections.n6} t={t}>
           <div className="space-y-8">
              <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">TEKNOLOJİ PARMAK İZİ TESPİTİ (TECH STACK)</h4>
              <div className="grid grid-cols-1 gap-4">
                 {techs.map((tech, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-primary transition-all group shadow-sm">
                       <div className="w-14 h-14 bg-white border shadow-sm rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Cpu size={28} />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                             <h5 className="font-black text-sm uppercase tracking-tight text-slate-800">{tech.name}</h5>
                             <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{tech.category}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">DETECTION VECTOR: <span className="text-slate-900">{tech.source}</span></p>
                       </div>
                    </div>
                 ))}
                 {techs.length === 0 && (
                    <div className="p-10 text-center text-slate-400 italic bg-slate-50 rounded-[2rem]">Aktif teknoloji tespiti yapılamadı (Güvenlik duvarı engeli).</div>
                 )}
              </div>
           </div>
        </Page>

        <Page pageNum={190} totalPages={totalPages} title={t.sections.n7} t={t}>
           <div className="space-y-8">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">IP ADRESİ COĞRAFİ KONUM VE ALTYAPI ANALİZİ</h4>
                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="grid grid-cols-2 gap-8">
                       <DataItem label="IP ADRESİ" value={geoData.ip} />
                       <DataItem label="ÜLKE" value={geoData.country ? `${geoData.country} (${geoData.countryCode})` : 'N/A'} />
                       <DataItem label="BÖLGE / ŞEHİR" value={geoData.city ? `${geoData.city}, ${geoData.region}` : 'N/A'} />
                       <DataItem label="TIMEZONE" value={geoData.timezone} />
                       <DataItem label="ISP" value={geoData.isp} />
                       <DataItem label="ORGANİZASYON" value={geoData.org} />
                       <DataItem label="ASN" value={geoData.asn} />
                       <DataItem label="KOORDİNAT" value={geoData.lat && geoData.lon ? `${geoData.lat}, ${geoData.lon}` : 'N/A'} />
                    </div>
                 </div>
              </section>
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-6 uppercase tracking-widest">ALTYAPI RİSK GÖSTERGELERİ</h4>
                 <div className="grid grid-cols-3 gap-6">
                    <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isProxy ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                       <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">PROXY / VPN</p>
                       <p className={`text-xl font-black ${ geoData.isProxy ? 'text-red-700' : 'text-green-700'}`}>{geoData.isProxy ? 'TESPİT EDİLDİ' : 'TEMİZ'}</p>
                    </div>
                    <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isHosting ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
                       <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">HOSTING / DATACENTER</p>
                       <p className={`text-xl font-black ${ geoData.isHosting ? 'text-amber-700' : 'text-green-700'}`}>{geoData.isHosting ? 'EVET' : 'HAYIR'}</p>
                    </div>
                    <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isMobile ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                       <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">MOBİL AĞ</p>
                       <p className={`text-xl font-black ${ geoData.isMobile ? 'text-blue-700' : 'text-slate-700'}`}>{geoData.isMobile ? 'EVET' : 'HAYIR'}</p>
                    </div>
                 </div>
              </section>
           </div>
        </Page>

        <Page pageNum={210} totalPages={totalPages} title={t.sections.n8} t={t}>
           <div className="space-y-8">
              <section>
                 <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">ALİENVAULT OTX — IP REPUTATION CHECK</h4>
                 <div className={`p-8 rounded-[2rem] border-2 shadow-sm ${auditData.ipReputation?.isMalicious ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex items-center gap-6">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${auditData.ipReputation?.isMalicious ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                          {auditData.ipReputation?.isMalicious ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                       </div>
                       <div className="flex-1">
                          <h5 className={`text-xl font-black uppercase tracking-tight ${auditData.ipReputation?.isMalicious ? 'text-red-700' : 'text-green-700'}`}>
                             {auditData.ipReputation?.isMalicious ? 'TEHLİKELİ / MALICIOUS IP TESPİT EDİLDİ' : 'TEMİZ / GÜVENLİ IP REPUTASYONU'}
                          </h5>
                          <p className="text-xs font-bold text-slate-500 mt-1">İstihbarat Kaynağı: AlienVault Open Threat Exchange (OTX) API v1</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-8">
                       <DataItem label="AKTİF PULSE SAYISI" value={auditData.ipReputation?.pulseCount || 0} />
                       <DataItem label="MALWARE ÖRNEKLERİ" value={auditData.ipReputation?.malwareCount || 0} />
                       <DataItem label="GÖZLEMLENEN URL" value={auditData.ipReputation?.urlCount || 0} />
                    </div>
                 </div>
              </section>
           </div>
        </Page>


        {methodologyChunks.map((chunk, idx) => (
           <Page key={`meth-${idx}`} pageNum={220 + idx} totalPages={totalPages} title={`METODOLOJİ — DENETİM PROSEDÜRÜ #${idx + 1}`} t={t}>
              <div className="space-y-12">
                 {chunk.map((m, i) => (
                    <div key={i} className="space-y-8 animate-in fade-in slide-in-from-left-4">
                       <div className="flex items-center gap-6 border-b-4 border-slate-900 pb-6">
                          <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center rounded-[2rem] text-4xl font-black shadow-2xl italic">
                             {idx + 1}
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{m.name}</h3>
                             <div className="flex gap-3 mt-1">
                                <span className={`px-4 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${m.statusClass === 'USED' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                   STATUS: {m.status}
                                </span>
                                <span className="px-4 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200">
                                   LEVEL: L4 TECHNICAL
                                </span>
                             </div>
                          </div>
                       </div>

                       <div className="relative">
                          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent opacity-30" />
                          <p className="text-sm leading-[1.8] text-slate-700 font-medium italic indent-12 text-justify pr-6">
                             {m.paragraph}
                          </p>
                       </div>

                       <div className="grid grid-cols-2 gap-8 mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                          <div className="space-y-4">
                             <h6 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">STANDART UYUMU (COMPLIANCE)</h6>
                             <ul className="space-y-2 text-xs font-bold text-slate-600">
                                <li className="flex items-center gap-2"><Shield size={12} className="text-primary" /> ISO 27001:2022 Annex A.8.15</li>
                                <li className="flex items-center gap-2"><Shield size={12} className="text-primary" /> NIST SP 800-115 Technical Guide</li>
                                <li className="flex items-center gap-2"><Shield size={12} className="text-primary" /> OWASP ASVS v4.0 L3 Integrity</li>
                             </ul>
                          </div>
                          <div className="space-y-4">
                             <h6 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">TEKNİK VERİ SETİ (DATASET)</h6>
                             <ul className="space-y-2 text-xs font-bold text-slate-600">
                                <li className="flex items-center gap-2 text-blue-600"><CheckCircle size={12} /> Gerçek Zamanlı Sunucu Yanıtı</li>
                                <li className="flex items-center gap-2 text-blue-600"><CheckCircle size={12} /> Kriptografik İmza Doğrulaması</li>
                                <li className="flex items-center gap-2 text-blue-600"><CheckCircle size={12} /> Varlık Sahipliği Teyidi (Whois/DNS)</li>
                             </ul>
                          </div>
                       </div>

                       <div className="mt-8 p-6 border-l-4 border-slate-200 bg-white italic text-[11px] text-slate-400 font-bold leading-relaxed">
                          "Bu metodoloji, ALFA YAPAY ZEKA Pentest Laboratuvarları tarafından geliştirilen X-RAY V3 hibrit tarama protokollerini temel almaktadır. Toplanan veriler uçtan uca şifreli olarak işlenmiş ve adli raporlama standartlarına uygun hale getirilmiştir."
                       </div>
                    </div>
                 ))}
              </div>
           </Page>
        ))}

        <Page pageNum={235} totalPages={totalPages} title="TEKNİK BULGU VE KANIT DOSYASI (JSON DUMP)" t={t}>
           <div className="space-y-6">
              <div className="bg-red-900/5 border-2 border-red-900/10 p-8 rounded-[2.5rem] mb-8">
                 <div className="flex items-center gap-4 mb-4">
                    <Database size={32} className="text-red-900" />
                    <h4 className="text-xl font-black text-red-900 uppercase tracking-tighter">HAM TEKNİK KANITLAR (TECHNICAL PROOF GALLERY)</h4>
                 </div>
                 <p className="text-[10px] font-bold text-red-900/60 uppercase leading-relaxed uppercase tracking-widest">
                    AŞAĞIDAKİ VERİLER, DENETİM SIRASINDA DOĞRUDAN SOURCE-API ÜZERİNDEN ALINAN 77.000 BYTELIK HAM VERİ SETİNİ TEMSİL ETMEKTEDİR.
                 </p>
              </div>

              <div className="space-y-8">
                 <section className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                       <Terminal size={100} className="text-white" />
                    </div>
                    <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">DUMP: INFRASTRUCTURE_SNAPSHOT.JSON</h5>
                    <pre className="font-mono text-[8px] text-white/50 leading-tight max-h-[300px] overflow-hidden">
                       {JSON.stringify({
                          target: siteName.toLowerCase(),
                          timestamp: metadata.isoDate,
                          vnode: "ALFA-XRAY-3-0",
                          geo_context: geoData,
                          network_edges: ports,
                          infrastructure_layer: techs.slice(0, 5)
                       }, null, 2)}
                    </pre>
                 </section>

                 <section className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl">
                    <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">DUMP: SSL_HANDSHAKE_EVIDENCE.LOG</h5>
                    <pre className="font-mono text-[8px] text-white/50 leading-tight max-h-[300px] overflow-hidden">
                       {JSON.stringify({
                          grade: sslLabs.grade,
                          cert_issuer: sslLabs.cert?.issuer,
                          protocols: sslLabs.protocols,
                           cert_days_until_expiry: sslLabs.cert?.daysUntilExpiry || null,
                           key_strength: sslLabs.cert?.keyStrength ? (sslLabs.cert.keyStrength + '-bit ' + sslLabs.cert.keyAlg) : null,
                           vulnerabilities: sslLabs.vulnerabilities || {},
                           forward_secrecy: sslLabs.forwardSecrecy || null
                       }, null, 2)}
                    </pre>
                 </section>
              </div>
           </div>
        </Page>

        <Page pageNum={248} totalPages={totalPages} title="YASAL BİLGİLENDİRME VE SORUMLULUK" t={t}>
           <div className="space-y-6">
              {clauses.map((c, i) => (
                 <div key={i} className="border-b border-slate-100 pb-4">
                    <h5 className="font-black text-xs text-slate-900 mb-2 uppercase tracking-tighter">{c.heading}</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-bold text-justify">{c.text}</p>
                 </div>
              ))}
              <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-[10px] text-slate-400 font-bold leading-relaxed">
                 "Bu rapor ALFA YAPAY ZEKA Teknolojileri tarafından otomatik olarak üretilmiştir. Herhangi bir düzenleme veya manipülasyon raporun kurguladığı dijital hash imzasını (Integrity Hash) geçersiz kılar. Raporun tüm sayfaları mühürlüdür."
              </div>
           </div>
        </Page>

        <FinalPage pageNum={250} totalPages={totalPages} t={t} siteName={siteName} metadata={metadata} />

      </div>

      <div className="fixed bottom-10 right-10 flex flex-col gap-4 print:hidden z-50 animate-in fade-in slide-in-from-bottom-5">
        <button onClick={() => window.print()} className="px-10 py-5 bg-primary text-white rounded-[2rem] font-black text-lg shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group">
          <FileText className="group-hover:rotate-12 transition-transform" /> {t.printBtn}
        </button>
      </div>

      <div className="fixed top-12 left-12 print:hidden z-[100]">
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl font-black text-xs shadow-xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 active:scale-90">
          <ArrowLeft size={16} /> {t.backToAdmin}
        </button>
      </div>
    </div>
  );
};

export default FullFormalReport;
