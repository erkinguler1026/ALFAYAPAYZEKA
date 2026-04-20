import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ArrowLeft, FileText } from 'lucide-react';

// Modular Page Imports
import { CoverPage } from './FullReportCoverPage';
import { TableOfContents } from './FullReportTOCPage';
import { StandartPages } from './FullReportStandartPage';
import { NextGenPages } from './FullReportNextGenPage';
import { LastPages } from './FullReportLastPage';
import { SummaryPage } from './FullReportSummaryPage';
import { calculatePageLayout } from './FullReportUtils';

/**
 * FullFormalReport — Modular Orchestrator (V3 - Forensic Edition)
 */
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

  // PDF Dosya Adı ve Sayfa Başlığı Senkronizasyonu
  React.useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}_`;
    const originalTitle = document.title;
    document.title = `ALFA_FULL_REPORT_${siteName.toLowerCase()}_${formattedDate}`;
    return () => { document.title = originalTitle; };
  }, [siteName]);
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
      reportSuffix: "SİBER GÜVENLİK RAPORU",
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
      introText: `Bu belge, ${siteName} altyapısının siber güvenlik dayanıklılığını ölçmek amacıyla ISO27001:2022 BGYS standardına uygun olarak üretilmiştir.`,
      tableHeaders: { asset: "Teknik Varlık", methodology: "Metodoloji", status: "Bulgu Durumu" },
      verified: "Taranmış / Doğrulanmış",
      signatureHead: "Siber Güvenlik Uzmanı",
      signatureUnit: "ALFA SİBER GÜVENLİK BİRİMİ",
      signatureName: "Erkin GÜLER",
      signatureDisclaimer: "Bu belge dijital olarak imzalanmış olup, teknik bulguların doğruluğu ALFA YAPAY ZEKA laboratuvarı tarafından onaylanmıştır.",
      sections: {
        s1: "I BÖLÜM : IP ÇÖZÜMLEME VE AĞ İSTİHBARATI (ISO 27001:2022 A.8.20)",
        s2: "II BÖLÜM : PORT TARAMA VE SERVİS ANALİZİ (ISO 27001:2022 A.8.21)",
        s3: "III BÖLÜM : HTTP GÜVENLİK BAŞLIKLARI (ISO 27001:2022 A.8.26)",
        s4: "IV BÖLÜM : SSL/TLS VE HTTPS ANALİZİ (ISO 27001:2022 A.8.24)",
        s5: "V BÖLÜM : SUNUCU BİLGİ İFŞASI (SERVER EXPOSURE) (ISO 27001:2022 A.8.8)",
        s6: "VI BÖLÜM : DNS E-POSTA GÜVENLİĞİ (SPF / DMARC) (ISO 27001:2022 A.8.21)",
        s7: "VII BÖLÜM : HASSAS DOSYA VE YOL TARAMASI (ISO 27001:2022 A.8.26)",
        s8: "VIII BÖLÜM : SUBDOMAIN / ALT ALAN ADI KEŞFİ (ISO 27001:2022 A.8.20)",
        s9: "IX BÖLÜM : SSL LABS GÜVENLİK DERECESİ (ISO 27001:2022 A.8.24)",
        s10: "X BÖLÜM : WHOIS VE RDAP SAHİPLİK BİLGİSİ (ISO 27001:2022 A.5.9)",
        s11: "XI BÖLÜM : ÇEREZ (COOKIE) GÜVENLİK ANALİZİ (ISO 27001:2022 A.8.26)",
        s12: "XII BÖLÜM : CORS POLİTİKASI VE API GÜVENLİĞİ (ISO 27001:2022 A.8.26)",
        s13: "XIII BÖLÜM : TEKNOLOJİ PARMAK İZİ TESPİTİ (ISO 27001:2022 A.8.8)",
        s14: "XIV BÖLÜM : GEO-IP KONUM VE ISP ANALİZİ (ISO 27001:2022 A.5.7)",
        s15: "XV BÖLÜM : IP VE DOMAIN İTİBAR KONTROLÜ (ISO 27001:2022 A.5.7)",
        s16: "XVI BÖLÜM : SİTE HARİTASI VE WEB MİMARİSİ (ISO 27001:2022 A.5.9)"
      },
      footer: {
        meta: `www.${siteName.toLowerCase()} — PENETRASYON ANALİZ & DENETİM RAPORU — ALFA-V3`,
        copyright: "© 2026 ALFA YAPAY ZEKA SEC-UNIT"
      },
      items: {
        final: "DENETİM SONUCU VE ONAY"
      }
    },
    en: {
      reportTitle: "ALFA FULL PENETRATION REPORT",
      reportVariant: "REAL X-RAY",
      reportSuffix: "CYBER SECURITY REPORT",
      pentestAudit: "Penetration Analysis & International Audit",
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
      footerNote: "Note: Report generated with real-time analysis data.",
      introText: `This document was produced in ISO27001:2022 ISMS standard to measure the cyber security resilience of the ${siteName} infrastructure.`,
      tableHeaders: { asset: "Technical Asset", methodology: "Methodology", status: "Field Status" },
      verified: "Scanned / Verified",
      signatureHead: "Expert of Cyber Security",
      signatureUnit: "ALFA Cyber Analysis Unit",
      signatureName: "Erkin GULER",
      signatureDisclaimer: "This document is digitally signed, and the accuracy of technical findings has been approved by ALFA AI lab.",
      sections: {
        s1: "I SECTION : IP RESOLUTION & NETWORK OSINT (ISO 27001:2022 A.8.20)",
        s2: "II SECTION : PORT SCAN & SERVICE ANALYSIS (ISO 27001:2022 A.8.21)",
        s3: "III SECTION : HTTP SECURITY HEADERS (ISO 27001:2022 A.8.26)",
        s4: "IV SECTION : SSL/TLS & HTTPS STATUS (ISO 27001:2022 A.8.24)",
        s5: "V SECTION : SERVER INFORMATION EXPOSURE (ISO 27001:2022 A.8.8)",
        s6: "VI SECTION : DNS EMAIL SECURITY (SPF / DMARC) (ISO 27001:2022 A.8.21)",
        s7: "VII SECTION : SENSITIVE FILE & PATH PROBE (ISO 27001:2022 A.8.26)",
        s8: "VIII SECTION : SUBDOMAIN DISCOVERY (ISO 27001:2022 A.8.20)",
        s9: "IX SECTION : QUALYS SSL LABS GRADE (ISO 27001:2022 A.8.24)",
        s10: "X SECTION : WHOIS & RDAP OWNERSHIP (ISO 27001:2022 A.5.9)",
        s11: "XI SECTION : COOKIE SECURITY ANALYSIS (ISO 27001:2022 A.8.26)",
        s12: "XII SECTION : CORS POLICY & API SECURITY (ISO 27001:2022 A.8.26)",
        s13: "XIII SECTION : TECHNOLOGY FINGERPRINTING (ISO 27001:2022 A.8.8)",
        s14: "XIV SECTION : GEO-IP & ISP ANALYSIS (ISO 27001:2022 A.5.7)",
        s15: "XV SECTION : IP & DOMAIN REPUTATION (ISO 27001:2022 A.5.7)",
        s16: "XVI SECTION : SITEMAP & WEB ARCHITECTURE (ISO 27001:2022 A.5.9)"
      },
      footer: {
        meta: `www.${siteName.toLowerCase()} — TECHNICAL AUDIT REPORT — ALFA-V3`,
        copyright: "© 2026 ALFA AI SEC-UNIT"
      },
      items: {
        final: "AUDIT RESULT & APPROVAL"
      }
    }
  }[lang];

  if (isAuditLoading || !auditData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] font-mono">
        <Loader2 size={60} className="text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-black text-slate-800 tracking-[0.2em] uppercase">VERİLER DERLENİYOR</h2>
        <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">PENTEST SONUÇLARI POTANSİYEL 250 SAYFAYA YAYILIYOR...</p>
      </div>
    );
  }

  // Gerçek veriyle sayfa düzenini hesapla
  const layout = calculatePageLayout(auditData);
  const totalPages = layout.total;

  return (
    <div className="bg-gray-200 min-h-screen py-12 print:py-0 font-sans print:bg-white text-black text-left overflow-x-hidden transition-all">
      {/* Tarayıcı Header/Footer yazılarını (Tarih, URL vb.) gizlemek için Print CSS */}
      <style>
        {`
          @media print {
            @page { margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact; }
            header, footer { display: none !important; }
          }
        `}
      </style>

      <div className="max-w-[210mm] mx-auto shadow-[0_50px_100px_rgba(0,0,0,0.15)] bg-white print:shadow-none">

          {/* PART 1: FIRST IMPRESSIONS */}
          <CoverPage siteName={siteName} t={t} metadata={metadata} totalPages={totalPages} />
          <TableOfContents t={t} layout={layout} />

          {/* PART 1.5: EXECUTIVE SUMMARY */}
          <SummaryPage auditData={auditData} layout={layout} t={t} totalPages={totalPages} />

          {/* PART 2: STANDART FORENSIC (S1-S6) */}
          <StandartPages auditData={auditData} t={t} layout={layout} totalPages={totalPages} />

          {/* PART 3: NEXT-GEN ANALYTICS (S7-S12) */}
          <NextGenPages auditData={auditData} t={t} layout={layout} totalPages={totalPages} />

          {/* PART 4: FINALIZATION & SIGNATURE */}
          <LastPages auditData={auditData} t={t} layout={layout} totalPages={totalPages} siteName={siteName} metadata={metadata} />

        </div>

      {/* Floating Controls */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4 print:hidden z-50 animate-in fade-in slide-in-from-bottom-5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-[#D2B48C]/30 hover:bg-[#D2B48C]/50 text-[#5D4037] rounded-full font-bold shadow-xl transition-all hover:scale-105 active:scale-95 group border border-[#5D4037]/20"
          >
            <FileText size={20} className="text-[#5D4037]" />
            <span className="uppercase tracking-widest text-xs">PDF RAPORU OLUŞTUR (CTRL+P)</span>
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
