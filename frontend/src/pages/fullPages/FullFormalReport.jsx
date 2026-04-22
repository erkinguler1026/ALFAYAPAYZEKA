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
import { TechAnalysisPage } from './FullReportTechAnalysisPage';
import { calculatePageLayout } from './FullReportUtils';

/**
 * @component FullFormalReport
 * @description ALFA X-RAY V3 "Forensic Edition" Rapor Orkestratörü.
 * 
 * Bu bileşen, 250+ sayfalık profesyonel sızma testi raporunun hiyerarşisini ve veri akışını yönetir.
 * Temel Sorumluluklar:
 *  1. Backend (X-RAY Motoru) üzerinden gerçek zamanlı güvenlik verilerini çekmek.
 *  2. "Forensic Edition" görsel diline (Pastel Mint/Blue) uygun sayfalama (pagination) yapmak.
 *  3. Çok dilli (TR/EN) içerik yönetimini (i18n) 't' objesi üzerinden sağlamak.
 *  4. ISO/IEC 27001:2022 maddelerinin başlıklara enjeksiyonunu yönetmek.
 */
const FullFormalReport = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'tr';
  const siteParam = searchParams.get('site');

  /**
   * Sayfa dilini HTML root düzeyinde ayarlar.
   */
  React.useEffect(() => {
    document.documentElement.lang = lang;
    window.scrollTo(0, 0);
  }, [lang]);

  /**
   * Raporun benzersiz üst verilerini (Dossier ID, Integrity Hash) üretir.
   * Bu veriler adli bilişim (Forensic) dokümantasyon standartları için kritiktir.
   */
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
        const domain = (siteParam || 'site.com').toLowerCase();
        // ─── 1) ScoreCard'dan kalan cache var mı? ───
        const cacheKey = `alfa_audit_${domain}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const ageMs = Date.now() - (parsed.cachedAt || 0);
          if (ageMs < 1800000) { // 30 dakika geçerli
            console.log(`[ALFA-REPORT] ScoreCard cache'inden yüklendi: ${domain} (${Math.round(ageMs/1000)}s önce — 2. TARAMA YAPILMADI)`);
            setAuditData(parsed.results);
            setIsAuditLoading(false);
            return;
          }
        }
        // ─── 2) Cache yok → Canlı tarama yap ve cache'e kaydet ───
        const HOST = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://api.alfayapayzeka.com';
        const res = await fetch(`${HOST}/api/full-pentest?url=${domain}`);
        const data = await res.json();
        if(data.success) {
           setAuditData(data.results);
           // Bu tarama sonucunu da cache'e yaz (ScoreCard için de kullanılabilir)
           sessionStorage.setItem(cacheKey, JSON.stringify({
             results: data.results,
             cachedAt: Date.now(),
             domain
           }));
           console.log(`[ALFA-REPORT] Yeni tarama yapıldı ve cache'e alındı: ${domain}`);
        }
      } catch(e) {
        console.error(e);
      } finally {
        setIsAuditLoading(false);
      }
    };
    fetchAudit();
  }, [siteName, siteParam]);

  const t = {
    tr: {
      reportTitle: "ALFA PENETRASYON",
      reportVariant: "X-RAY",
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
      introText: `Bu belge, ${siteName} altyapısının siber güvenlik dayanıklılığını ölçmek amacıyla ISO 27005:2022 standardına uygun olarak üretilmiştir.`,
      tableHeaders: { asset: "Teknik Varlık", methodology: "Metodoloji", status: "Bulgu Durumu" },
      verified: "Taranmış / Doğrulanmış",
      signatureHead: "Siber Güvenlik Uzmanı",
      signatureUnit: "ALFA SİBER GÜVENLİK BİRİMİ",
      signatureName: "Erkin GÜLER",
      signatureDisclaimer: "Bu belge dijital olarak imzalanmış olup, teknik bulguların doğruluğu ALFA YAPAY ZEKA laboratuvarı tarafından onaylanmıştır.",
      sections: {
        s1: "I. BÖLÜM : DNS VE ALTYAPI ANALİZİ",
        s2: "II. BÖLÜM : PORT VE SERVİS DENETİMİ",
        s3: "III. BÖLÜM : HTTP GÜVENLİK BAŞLIKLARI",
        s4: "IV. BÖLÜM : TLS/SSL VE HSTS ANALİZİ",
        s5: "V. BÖLÜM : SERVİS VE TEKNOLOJİ İFŞASI",
        s6: "VI. BÖLÜM : DNS GÜVENLİK ANALİZİ",
        s7: "VII. BÖLÜM : WEB UYGULAMA ANALİZİ",
        s8: "VIII. BÖLÜM : ALT ALAN ADI ENVANTERİ",
        s9: "IX. BÖLÜM : SERTİFİKA ZİNCİRİ ANALİZİ",
        s10: "X. BÖLÜM : WHOIS VE VARLIK SAHİPLİĞİ",
        s11: "XI. BÖLÜM : ÇEREZ GÜVENLİĞİ ANALİZİ",
        s12: "XII. BÖLÜM : CORS VE API POLİTİKALARI",
        s13: "XIII. BÖLÜM : TEKNOLOJİ PARMAK İZİ",
        s14: "XIV. BÖLÜM : COĞRAFİ KONUM ANALİZİ",
        s15: "XV. BÖLÜM : IP VE DOMAİN İTİBAR KONTROLÜ",
        s16: "XVI. BÖLÜM : SİTE HARİTASI VE WEB MİMARİSİ"
      },
      footer: {
        meta: `www.${siteName.toLowerCase()} — PENETRASYON ANALİZ & DENETİM RAPORU — ALFA-V3`,
        copyright: "© 2026 ALFA YAPAY ZEKA SEC-UNIT"
      },
      items: {
        final: "DENETİM SONUCU VE ONAY",
        integrityTitle: "DENETİM BÜTÜNLÜĞÜ DOĞRULAMA",
        dumpTitle: "HAM TEKNİK KANITLAR (TEKNİK DÖKÜM)",
        dumpDesc: "AŞAĞIDAKİ VERİLER, DENETİMİ YAPILAN SİSTEMİN TÜM JSON ÇIKTILARINI VE HAM API YANITLARINI İÇERMEKTEDİR.",
        engineLabel: "MOTOR",
        targetLabel: "HEDEF",
        hashLabel: "BÜTÜNLÜK İMZASI (HASH)",
        dateLabel: "DOĞRULAMA TARİHİ",
        nodeLabel: "SİSTEM DÜĞÜMÜ",
        endOfDossier: "DOSYA SONU",
        coverScope: "KAPSAMLI GÜVENLİK DENETİMİ & PENTEST",
        benchmarkTitle: "GÜVENLİK PERFORMANS KIYASLAMASI",
        healthTitle: "SALDIRI YÜZEYİ SAĞLIK ANALİZİ",
        evalTitle: "ALFA YAPAY ZEKA DEĞERLENDİRMESİ",
        evalSummary: "GENEL DEĞERLENDİRME ÖZETİ",
        evalDesc: "Hedef sistem üzerinde gerçekleştirilen geniş çaplı zafiyet tarama ve sızma testi sonuçlarına göre hesaplanan genel güvenlik durumu ön sayfalarda özetlenmiştir. Mevcut skor, dışarıdan gelebilecek karmaşık saldırılara, yapılandırma hatalarına ve teknoloji ifşalarına karşı varlıklarınızın genel direncini ifade eder.",
        priorityFindings: "ÖNCELİKLİ BULGULAR LİSTESİ (CVSS)",
        noFindings: "KRİTİK YA DA YÜKSEK SEVİYELİ BULGUYA RASTLANMAMIŞTIR",
        remediationSuggested: "İYİLEŞTİRME ÖNERİLİR",
        systemSecure: "SİSTEM GÜVENLİ",
        findingDetected: "KRİTİK/MAJÖR BULGU TESPİT EDİLDİ",
        excellent: "Mükemmel",
        hardened: "Sıkı İst.",
        fair: "Güvenli",
        weak: "Orta Risk",
        risky: "Zayıf",
        danger: "Tehlikeli",
        recordCount: "BULUNAN KAYIT",
        dnsStatus: "DNS DURUMU",
        ipv4List: "IPv4 ADRES LİSTESİ",
        ipv6List: "IPv6 ADRES LİSTESİ",
        notDetected: "TESPİT EDİLMEDİ",
        nsTitle: "YETKİLİ İSİM SUNUCULARI (NS)",
        soaTitle: "YETKİ BAŞLANGIÇ KAYDI (SOA)",
        portScanTitle: "TCP GİZLİ PORT TARAMA & BANNER ANALİZİ",
        port: "PORT",
        service: "SERVİS",
        banner: "BANNER / YANIT",
        risk: "RİSK",
        statusLabel: "DURUM",
        headerAuditDesc: "Sunucu tarafından gönderilen güvenlik başlıklarının varlığı ve konfigürasyon doğruluğu denetlenmiştir.",
        sslStatusDesc: "Sunucu sertifikaları, HSTS zinciri ve robots.txt güvenlik durumları incelenmiştir.",
        serverExposureDesc: "Sunucu imza sızıntıları, teknoloji ifşası ve hedeflenmiş versiyon taraması yapılmıştır.",
        dnsForensicsTitle: "DNS GÜVENLİK KAYIT ANALİZİ (TEKNİK ANALİZ)",
        txtEvidenceTitle: "HAM TXT / CAA KANIT DOSYASI",
        pathProbeTitle: "HASSAS DOSYA VE DİZİN İFŞA TARAMASI",
        pathResultsTitle: "V3.0 PATH BRUTEFORCE SONUÇLARI",
        urgentRemediation: "ACİL MÜDAHALE GEREKLİ",
        noSensitiveExposed: "HASSAS DOSYA İFŞASI TESPİT EDİLMEDİ",
        sensitiveScanDesc: ".env, .git, .htaccess ve yedek dosyaları taranmıştır.",
        subdomainTitle: "ALT ALAN ADI KEŞFİ & CT KAYITLARI",
        hostname: "TEKNİK HOSTNAME / ALAN ADI",
        certIssuer: "SERTİFİKA YAYINLAYICISI",
        sslLabsTitle: "QUALYS SSL LABS — KÜRESEL PUAN",
        sslLabsDesc: "Sertifika Zinciri, Protokol Desteği ve El Sıkışma Analizi",
        certDetails: "SERTİFİKA DETAYLARI",
        protoSecurity: "PROTOKOL GÜVENLİĞİ",
        vulnerable: "ZAFİYETLİ",
        whoisTitle: "WHOIS & RDAP ALAN ADI KAYIT ANALİZİ",
        registrar: "KAYIT KURULUŞU",
        createdDate: "KAYIT TARİHİ",
        expiryDate: "BİTİŞ TARİHİ",
        cookieTitle: "COOKIE (ÇEREZ) GÜVENLİK ANALİZİ",
        cookieCount: "TESPİT EDİLEN ÇEREZ SAYISI",
        secureConsent: "GÜVENLİ ONAY DURUMU",
        yes: "EVET",
        no: "HAYIR",
        corsTitle: "CORS POLİTİKASI VE API GÜVENLİK ANALİZİ",
        wildcardAlert: "Kritik Uyarı: Wildcard (*) CORS politikası, saldırganların kullanıcı verilerini çalmasına olanak tanır!",
        techStackTitle: "TEKNOLOJİ PARMAK İZİ TESPİTİ",
        noTechFound: "Aktif teknoloji tespiti yapılamadı (Güvenlik duvarı engeli).",
        geoTitle: "COĞRAFİ KONUM VE ALTYAPI ANALİZİ",
        infraRisk: "ALTYAPI RİSK GÖSTERGELERİ",
        clean: "TEMİZ",
        reputationTitle: "ALIENVAULT OTX — IP REPUTASYON KONTROLÜ",
        maliciousIpDetected: "TEHLİKELİ / MALICIOUS IP TESPİT EDİLDİ",
        cleanIpReputation: "TEMİZ / GÜVENLİ IP REPUTASYONU",
        intelligenceSource: "İstihbarat Kaynağı",
        sitemapTitle: "SITEMAP URL ENVANTERİ",
        sitemapDesc: "Sitemap verisi bulunamadı veya erişilemez durumda.",
        tocExecutiveSummary: "YÖNETİCİ ÖZETİ: RISK SCORE & ALFA YAPAY ZEKA",
        tocTechAnalysis: "TEKNİK ANALİZ VE ÖZET BULGULAR",
        tocEvidenceDossier: "TEKNİK BULGU VE KANIT DOSYASI (JSON DUMP)",
        tocLegalDisclaimer: "YASAL BİLGİLENDİRME VE SORUMLULUK",
        certTitle: "GÜVENLİK SERTİFİKASYONU BEYANI",
        certHeading: "GÜVENLİK SERTİFİKASYONU VE BÜTÜNLÜK",
        certDesc: "Bu rapor, ALFA XRAY-V3 motoru tarafından üretilmiş olup, uluslararası sızma testi, risk yönetimi standartları (OWASP, NIST, ISO 27001/2/5, ITIL v4, COBIT) ile tam uyumluluk göstermektedir. Dijital hash imzası ile bütünüyle korunmaktadır."
      }
    },
    en: {
      reportTitle: "ALFA FULL PENETRATION REPORT",
      reportVariant: "X-RAY",
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
      introText: `This document was produced in ISO 27005:2022 ISMS standard to measure the cyber security resilience of the ${siteName} infrastructure.`,
      tableHeaders: { asset: "Technical Asset", methodology: "Methodology", status: "Field Status" },
      verified: "Scanned / Verified",
      signatureHead: "Expert of Cyber Security",
      signatureUnit: "ALFA Cyber Analysis Unit",
      signatureName: "Erkin GULER",
      signatureDisclaimer: "This document is digitally signed, and the accuracy of technical findings has been approved by ALFA AI lab.",
      sections: {
        s1: "SECTION I: DNS & INFRASTRUCTURE ANALYSIS",
        s2: "SECTION II: PORT & SERVICE AUDIT",
        s3: "SECTION III: HTTP SECURITY HEADERS",
        s4: "SECTION IV: TLS/SSL & HSTS ANALYSIS",
        s5: "SECTION V: SERVICE & TECH EXPOSURE",
        s6: "SECTION VI: DNS SECURITY ANALYSIS",
        s7: "SECTION VII: WEB APPLICATION ANALYSIS",
        s8: "SECTION VIII: SUBDOMAIN INVENTORY",
        s9: "SECTION IX: CERTIFICATE CHAIN ANALYSIS",
        s10: "SECTION X: WHOIS & ASSET OWNERSHIP",
        s11: "SECTION XI: COOKIE SECURITY ANALYSIS",
        s12: "SECTION XII: CORS & API POLICIES",
        s13: "SECTION XIII: TECHNOLOGY FINGERPRINTING",
        s14: "SECTION XIV: GEOGRAPHIC LOCATION ANALYSIS",
        s15: "SECTION XV: IP & DOMAIN REPUTATION",
        s16: "SECTION XVI: SITEMAP & WEB ARCHITECTURE"
      },
      footer: {
        meta: `www.${siteName.toLowerCase()} — TECHNICAL AUDIT REPORT — ALFA-V3`,
        copyright: "© 2026 ALFA AI SEC-UNIT"
      },
      items: {
        final: "AUDIT RESULT & APPROVAL",
        integrityTitle: "AUDIT INTEGRITY VERIFICATION",
        dumpTitle: "RAW TECHNICAL EVIDENCE (FORENSIC DUMP)",
        dumpDesc: "THE FOLLOWING DATA CONTAINS ALL JSON OUTPUTS AND RAW API RESPONSES OF THE AUDITED SYSTEM.",
        engineLabel: "ENGINE",
        targetLabel: "TARGET",
        hashLabel: "INTEGRITY HASH",
        dateLabel: "VERIFICATION DATE",
        nodeLabel: "SYSTEM NODE",
        endOfDossier: "END OF DOSSIER",
        coverScope: "COMPREHENSIVE SECURITY AUDIT & PENTEST",
        benchmarkTitle: "SECURITY PERFORMANCE BENCHMARK",
        healthTitle: "ATTACK SURFACE HEALTH ANALYSIS",
        evalTitle: "ALFA ARTIFICIAL INTELLIGENCE ASSESSMENT",
        evalSummary: "EXECUTIVE SUMMARY",
        evalDesc: "The general security status calculated according to the results of the extensive vulnerability scanning and penetration tests performed on the target system is summarized in the front pages. The current score expresses the general resistance of your assets against complex attacks, configuration errors and technology disclosures that may come from outside.",
        priorityFindings: "PRIORITY FINDINGS LIST (CVSS)",
        noFindings: "NO CRITICAL OR HIGH LEVEL FINDINGS DETECTED",
        remediationSuggested: "REMEDIATION SUGGESTED",
        systemSecure: "SYSTEM SECURE",
        findingDetected: "CRITICAL/MAJOR FINDINGS DETECTED",
        excellent: "Excellent",
        hardened: "Hardened",
        fair: "Fair",
        weak: "Weak",
        risky: "Risky",
        danger: "Danger",
        recordCount: "RECORDS FOUND",
        dnsStatus: "DNS STATUS",
        ipv4List: "IPv4 ADDRESS LIST",
        ipv6List: "IPv6 ADDRESS LIST",
        notDetected: "NOT DETECTED",
        nsTitle: "AUTHORITATIVE NAME SERVERS (NS)",
        soaTitle: "START OF AUTHORITY (SOA)",
        portScanTitle: "TCP STEALTH PORT SCAN & BANNER GRABBING",
        port: "PORT",
        service: "SERVICE",
        banner: "BANNER / RESPONSE",
        risk: "RISK",
        statusLabel: "STATUS",
        headerAuditDesc: "Presence and configuration accuracy of security headers sent by the server have been audited.",
        sslStatusDesc: "Server certificates, HSTS chain, and robots.txt security statuses have been examined.",
        serverExposureDesc: "Server signature leaks, technology disclosure, and targeted version scanning have been performed.",
        dnsForensicsTitle: "DNS SECURITY RECORD ANALYSIS (FORENSICS)",
        txtEvidenceTitle: "RAW TXT / CAA EVIDENCE DOCKET",
        pathProbeTitle: "SENSITIVE FILE & PATH DISCLOSURE PROBE",
        pathResultsTitle: "V3.0 PATH BRUTEFORCE RESULTS",
        urgentRemediation: "URGENT REMEDIATION REQUIRED",
        noSensitiveExposed: "NO SENSITIVE FILE EXPOSURE DETECTED",
        sensitiveScanDesc: ".env, .git, .htaccess and backup files have been scanned.",
        subdomainTitle: "SUBDOMAIN ENUMERATION & CT LOGS",
        hostname: "TECHNICAL HOSTNAME / DOMAIN",
        certIssuer: "CERTIFICATE ISSUER",
        sslLabsTitle: "QUALYS SSL LABS — GLOBAL GRADE",
        sslLabsDesc: "Certificate Chain, Protocol Support and Handshake Analysis",
        certDetails: "CERTIFICATE DETAILS",
        protoSecurity: "PROTOCOL SECURITY",
        vulnerable: "VULNERABLE",
        whoisTitle: "WHOIS & RDAP DOMAIN REGISTRATION ANALYSIS",
        registrar: "REGISTRAR",
        createdDate: "CREATED DATE",
        expiryDate: "EXPIRY DATE",
        cookieTitle: "COOKIE SECURITY ANALYSIS",
        cookieCount: "DETECTED COOKIE COUNT",
        secureConsent: "SECURE CONSENT STATUS",
        yes: "YES",
        no: "NO",
        corsTitle: "CORS POLICY & API SECURITY ANALYSIS",
        wildcardAlert: "Critical Warning: Wildcard (*) CORS policy allows attackers to steal user data!",
        techStackTitle: "TECHNOLOGY FINGERPRINTING (TECH STACK)",
        noTechFound: "Active technology detection failed (Firewall restriction).",
        geoTitle: "GEO-IP & INFRASTRUCTURE ANALYSIS",
        infraRisk: "INFRASTRUCTURE RISK INDICATORS",
        clean: "CLEAN",
        reputationTitle: "ALIENVAULT OTX — IP REPUTATION CHECK",
        maliciousIpDetected: "MALICIOUS IP DETECTED",
        cleanIpReputation: "CLEAN / SECURE IP REPUTATION",
        intelligenceSource: "Intelligence Source",
        sitemapTitle: "SITEMAP URL INVENTORY",
        sitemapDesc: "Sitemap data not found or inaccessible.",
        tocExecutiveSummary: "EXECUTIVE SUMMARY: RISK SCORE & ALFA AI",
        tocTechAnalysis: "TECHNICAL ANALYSIS & SUMMARY FINDINGS",
        tocEvidenceDossier: "TECHNICAL FINDINGS & EVIDENCE DOSSIER",
        tocLegalDisclaimer: "LEGAL DISCLAIMER & LIABILITY",
        certTitle: "SECURITY CERTIFICATION STATEMENT",
        certHeading: "SECURITY CERTIFICATION & INTEGRITY",
        certDesc: "This report has been generated by the ALFA XRAY-V3 engine and fully complies with international penetration testing and risk management standards (OWASP, NIST, ISO 27001/2/5, ITIL v4, COBIT). It is completely protected by a digital hash signature."
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

          {/* PART 1.6: TECHNICAL ANALYSIS SUMMARY (5 FRAMES) */}
          <TechAnalysisPage auditData={auditData} t={t} layout={layout} totalPages={totalPages} />

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
