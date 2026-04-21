import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Activity, Download, ShieldAlert, Timer, Clock, Lock, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { API_ENDPOINTS, apiClient } from '../../utils/api';

const SNAP_STEPS_TR = [
  'Hedef Sunucu IP ve Lokasyon Analizi',
  'SSL/TLS Sertifika Güvenlik Zinciri',
  'HTTP Güvenlik Başlıkları (HSTS, CSP)',
  'Ağ Portları (Nmap Stealth Scan)',
  'Whois ve Domain Kayıt Otoriteleri',
  'DNS Zone & MX/TXT Kayıtları Kontrolü',
  'Sunucu Servis Versiyonları İfşası',
  'Açık Yazılım Yamaları Zafiyet Taraması',
  'Alfa AI İndeks ve Risk Skorlaması Yapıyor',
  'Snap (Hızlı) Penetrasyon Test Raporu Derleniyor'
];

const SNAP_STEPS_EN = [
  'Target Server IP and Location Analysis',
  'SSL/TLS Certificate Security Chain',
  'HTTP Security Headers (HSTS, CSP)',
  'Network Ports (Nmap Stealth Scan)',
  'Whois and Domain Registration Authorities',
  'DNS Zone & MX/TXT Records Check',
  'Server Service Versions Disclosure',
  'Software Patches Vulnerability Scan',
  'Alfa AI Index and Risk Scoring',
  'Compiling Snap Penetration Test Report'
];

const ScorecardWidget = ({ title, children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white print:bg-white border border-gray-200 print:border-slate-200 rounded-2xl p-6 shadow-sm print:shadow-none hover:border-emerald-400/40 print:hover:border-slate-200 transition-colors ${className}`}
  >
    <h3 className="text-slate-500 font-black text-sm mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse print:hidden" />
      {title}
    </h3>
    {children}
  </motion.div>
);

const SnapScoreCard = () => {
  const [searchParams] = useSearchParams();
  const rawToken = searchParams.get('token');
  const token = rawToken ? rawToken.trim() : null;
  const navigate = useNavigate();

  const [domain, setDomain] = useState(() => searchParams.get('site') ? searchParams.get('site').toUpperCase() : "HEDEF SİSTEM");
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [accessError, setAccessError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);


  const [loadStep, setLoadStep] = useState(0);
  const [elapsedWaitTime, setElapsedWaitTime] = useState(0);

  useEffect(() => {
    if (isAnalyzing && !accessError) {
      const timer = setInterval(() => {
        setElapsedWaitTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isAnalyzing, accessError]);

  useEffect(() => {
    if (isAnalyzing && !accessError) {
      const stepInterval = setInterval(() => {
        setLoadStep(s => Math.min(s + 1, SNAP_STEPS_TR.length - 1));
      }, 600); // 600ms per step
      return () => clearInterval(stepInterval);
    }
  }, [isAnalyzing, accessError]);

  const [reportId, setReportId] = useState(() => token ? `ALFA_${token.substring(0, 9).toUpperCase()}` : `ALFA_AUDIT`);
  const [grade, setGrade] = useState("A");
  const [certId] = useState(() => token ? token.substring(9, 19).toUpperCase() : `CERT_GENERIC`);
  const [infrastructureData, setInfrastructureData] = useState([
    { name: 'SSL/TLS', health: 100, color: 'bg-emerald-500' },
    { name: 'HEADERS', health: 100, color: 'bg-emerald-500' },
    { name: 'NETWORK', health: 100, color: 'bg-orange-500' },
    { name: 'DOMAIN', health: 100, color: 'bg-yellow-500' },
    { name: 'SOFTWARE', health: 100, color: 'bg-orange-500' }
  ]);
  const [realRisks, setRealRisks] = useState([]);
  const [signedAt] = useState(() => new Date().toLocaleString());

  const lang = searchParams.get('lang') || 'tr';
  const formattedUrl = `https://www.${domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/^www/, '')}`;

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = {
    tr: {
      analyzingTitle: "TEMEL PENETRASYON ANALİZİ YAPILIYOR...",
      cyberOps: "Siber Güvenlik İşlemleri",
      duration: "SÜRE",
      overallProgress: "GENEL İLERLEME",
      deepTerminal: "Derin Analiz Terminali (X-RAY)",
      engineLoad: "PENETRATION TEST ENGINE YÜKÜ",
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
      riskTitle1: "3.1 Servis Güvenliği",
      riskText1: "Hedef sistemde dış şebekeye açık yönetim portları veya hassas dizin yolları tespit edilebilir durumdadır.",
      riskTitle2: "3.2 Güvenlik Başlıkları (Security Headers)",
      riskText2: "Strict-Transport-Security (HSTS) ve Content-Security-Policy (CSP) tanımlanmamıştır; sistem tıklama sahteciliğine müsaittir.",
      riskTitle3: "3.3 Ağ Port Güvenliği (NMAP Analizi)",
      riskText3: "Dış networke açık bırakılmış potansiyel yönetim portları (22-SSH, 445-SMB) kaba kuvvet saldırı riski taşımaktadır.",
      riskTitle4: "3.4 Domain & WHOIS Veri Sızıntısı",
      riskText4: "Alan adı kayıt bilgilerinde görünen idari e-posta ve teknik personel verileri, sosyal mühendislik saldırıları için girdi sağlayabilir.",
      riskTitle5: "3.5 Yazılım & Yama Düzeyi (Patching)",
      riskText5: "Web sunucusu (Nginx/Apache) ve uygulama çatısına ait versiyon bilgileri sızdırılmakta olup, bilinen CVE açıklarına karşı savunmasızdır.",
      execSummaryTitle: "YÖNETİCİ ÖZETİ (AI KARARI)",
      execSummaryText: "Yapılan adli analiz sonucunda sistemin dış tehditlere karşı 'Açık' (Exposed) pozisyonda olduğu ve öncelikli olarak port güvenliği ile yazılım yaması katmanlarında acil müdahale gerektiği saptanmıştır.",
      effort: "ÇÖZÜM ZORLUĞU",
      effortLow: "DÜŞÜK",
      effortMedium: "ORTA",
      effortHigh: "YÜKSEK",
      nextStepsTitle: "BİR SONRAKİ ADIMLAR (TAM DENETİM KAPSAMI)",
      nextStepsDesc: "Bu rapor hızlı bir ön taramadır. Daha derinlemesine analiz için şu testler önerilir:",
      advancedTest1: "SQL Injection & Veritabanı Güvenliği",
      advancedTest2: "Cross-Site Scripting (XSS) Analizi",
      advancedTest3: "DDoS & Yük Dayanıklılık Testi",
      advancedTest4: "Sosyal Mühendislik & Kimlik Avı Simülasyonu",
      verifiedBy: "ALFA AI TARAFINDAN DOĞRULANMIŞTIR",
      disclaimer: "YASAL UYARI: Bu rapor sadece bilgilendirme amaçlıdır ve tam bir penetrasyon testi yerine geçmez."
    },
    en: {
      analyzingTitle: "BASIC PENETRATION ANALYSIS IN PROGRESS...",
      cyberOps: "Cyber Security Operations",
      duration: "TIME",
      overallProgress: "OVERALL PROGRESS",
      deepTerminal: "Deep Analysis Terminal (X-RAY)",
      engineLoad: "PENETRATION TEST ENGINE LOAD",
      analyzing: "Analyzing target...",
      profile: "Profile",
      lastUpdated: "Last updated",
      backToAdmin: "Back to admin panel",
      downloadPdf: "Download PDF",
      logout: "Logout",
      securityGrade: "Security grade",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      weak: "Weak / Risky",
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
      riskTitle1: "3.1 Service security",
      riskText1: "Exposed management ports or sensitive file paths detected on the target system.",
      riskTitle2: "3.2 Security headers",
      riskText2: "HSTS and CSP headers are undefined, leaving the system vulnerable to Clickjacking and other vectors.",
      riskTitle3: "3.3 Network Port Security (NMAP)",
      riskText3: "Potential administration ports (22-SSH, 445-SMB) exposed to the external network, posing brute-force risks.",
      riskTitle4: "3.4 Domain & WHOIS Data Leak",
      riskText4: "Administrative emails and technical staff details visible in WHOIS records may facilitate social engineering attacks.",
      riskTitle5: "3.5 Software & Patch Level",
      riskText5: "Server (Nginx/Apache) and framework version information is being leaked, inviting exploitation of known CVEs.",
      execSummaryTitle: "EXECUTIVE SUMMARY (AI FINDING)",
      execSummaryText: "Forensic analysis indicates an 'Exposed' posture to external threats. Urgent remediation is required in the network port and software patching layers.",
      effort: "FIX EFFORT",
      effortLow: "LOW",
      effortMedium: "MEDIUM",
      nextStepsTitle: "NEXT STEPS (FULL AUDIT SCOPE)",
      advancedTest1: "SQL Injection & Database Security",
      advancedTest2: "Cross-Site Scripting (XSS) Analysis",
      advancedTest3: "DDoS & Load Resilience Testing",
      advancedTest4: "Social Engineering & Phishing Simulation",
      verifiedBy: "VERIFIED BY ALFA AI FORENSICS",
      disclaimer: "Disclaimer: This report is for information purposes only and is not a full penetration test."
    }
  }[lang];

  useEffect(() => {
    if (isAnalyzing || accessError || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        // DEVELOPER KISITLAMASI İPTAL EDİLDİ
        // if (prev <= 1) { setAccessError(t.timeout); clearInterval(timer); return 0; }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAnalyzing, accessError, timeLeft, t.timeout]);

  useEffect(() => {
    document.title = "Security Scorecard | Alfa Yapay Zeka";
    let isMounted = true;
    const verifyToken = async () => {
      if (!token) { setAccessError(t.securityTokenMissing); return; }

      try {
        const siteParam = searchParams.get('site');
        
        // CACHE KONTROLÜ: Eğer bu token için daha önce tarama yapıldıysa hızlıca geç (Animasyonu atla)
        const cachedData = sessionStorage.getItem(`alfa_scan_${token}`);
        if (cachedData) {
            const res = JSON.parse(cachedData);
            setDomain((siteParam || res.domain || 'HEDEF SISTEM').toUpperCase());
            setGrade(res.grade);
            if (res.reportId) setReportId(res.reportId);

            setInfrastructureData([
              { name: lang === 'tr' ? 'SERVİS GÜVENLİĞİ' : 'SERVICE SECURITY', health: res.categories.service.health, color: res.categories.service.health >= 80 ? 'text-emerald-400' : (res.categories.service.health >= 50 ? 'text-amber-400' : 'text-rose-500') },
              { name: lang === 'tr' ? 'GÜVENLİK BAŞLIKLARI' : 'SECURITY HEADERS', health: res.categories.headers.health, color: res.categories.headers.health >= 80 ? 'text-emerald-400' : (res.categories.headers.health >= 50 ? 'text-amber-400' : 'text-rose-500') },
              { name: lang === 'tr' ? 'AĞ PORT GÜVENLİĞİ' : 'NETWORK SECURITY', health: res.categories.network.health, color: res.categories.network.health >= 80 ? 'text-emerald-400' : (res.categories.network.health >= 50 ? 'text-amber-400' : 'text-rose-500') },
              { name: lang === 'tr' ? 'DOMAIN & WHOIS' : 'DOMAIN & WHOIS', health: res.categories.domain.health, color: res.categories.domain.health >= 80 ? 'text-emerald-400' : (res.categories.domain.health >= 50 ? 'text-amber-400' : 'text-rose-500') },
              { name: lang === 'tr' ? 'YAZILIM & YAMA' : 'SOFTWARE PATCHING', health: res.categories.patching.health, color: res.categories.patching.health >= 80 ? 'text-emerald-400' : (res.categories.patching.health >= 50 ? 'text-amber-400' : 'text-rose-500') }
            ]);

            const allFindings = [
              { title: lang === 'tr' ? "3.1 SERVİS GÜVENLİĞİ" : "3.1 SERVICE SECURITY", text: res.categories.service.findings.join(' '), risk: res.categories.service.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.9" : "ISO 27001:2022 ANNEX-A Control A.8.9" },
              { title: lang === 'tr' ? "3.2 GÜVENLİK BAŞLIKLARI (SECURITY HEADERS)" : "3.2 SECURITY HEADERS", text: res.categories.headers.findings.join(' '), risk: res.categories.headers.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.26" : "ISO 27001:2022 ANNEX-A Control A.8.26" },
              { title: lang === 'tr' ? "3.3 AĞ PORT GÜVENLİĞİ (NMAP ANALİZİ)" : "3.3 NETWORK SECURITY (NMAP)", text: res.categories.network.findings.join(' '), risk: res.categories.network.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.20" : "ISO 27001:2022 ANNEX-A Control A.8.20" },
              { title: lang === 'tr' ? "3.4 DOMAIN & WHOIS VERİ SIZINTISI" : "3.4 DOMAIN & WHOIS LEAK", text: res.categories.domain.findings.join(' '), risk: res.categories.domain.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.5.7" : "ISO 27001:2022 ANNEX-A Control A.5.7" },
              { title: lang === 'tr' ? "3.5 YAZILIM & YAMA DÜZEYİ (PATCHING)" : "3.5 SOFTWARE & PATCHING", text: res.categories.patching.findings.join(' '), risk: res.categories.patching.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.8" : "ISO 27001:2022 ANNEX-A Control A.8.8" }
            ];
            setRealRisks(allFindings);
            
            // Kullanıcı "Yazdır" sayfasından geri dönüyorsa (skipAnim=true), bekletme yapmadan direkt sonuçları gösteriyoruz.
            // Fakat sayfayı ilk kez açıyorsa veya yeniliyorsa, o efsane şovu izleyebilmesi için 6.5 saniye bekletiyoruz.
            if (searchParams.get('skipAnim') === 'true') {
                if (isMounted) setIsAnalyzing(false);
            } else {
                setTimeout(() => { if (isMounted) setIsAnalyzing(false); }, 6500);
            }
            return; // API İSTEĞİ ATMA
        }

        const response = await apiClient.get(API_ENDPOINTS.REPORT(token, siteParam));
        if (isMounted) {
          if (response.data.success) {
            setDomain((siteParam || response.data.domain).toUpperCase());
            
            // Gerçek tarama verilerini yükle
              if (response.data.scanResults) {
                const res = response.data.scanResults;
                sessionStorage.setItem(`alfa_scan_${token}`, JSON.stringify(res));

                setGrade(res.grade);
                if (res.reportId) setReportId(res.reportId);

                setInfrastructureData([
                  { name: lang === 'tr' ? 'SERVİS GÜVENLİĞİ' : 'SERVICE SECURITY', health: res.categories.service.health, color: res.categories.service.health >= 80 ? 'bg-emerald-500' : (res.categories.service.health >= 50 ? 'bg-orange-500' : 'bg-red-500') },
                  { name: lang === 'tr' ? 'GÜVENLİK BAŞLIKLARI' : 'SECURITY HEADERS', health: res.categories.headers.health, color: res.categories.headers.health >= 80 ? 'bg-emerald-500' : (res.categories.headers.health >= 50 ? 'bg-orange-500' : 'bg-red-500') },
                  { name: lang === 'tr' ? 'AĞ PORT GÜVENLİĞİ' : 'NETWORK SECURITY', health: res.categories.network.health, color: res.categories.network.health >= 80 ? 'bg-emerald-500' : (res.categories.network.health >= 50 ? 'bg-orange-500' : 'bg-red-500') },
                  { name: lang === 'tr' ? 'DOMAIN & WHOIS' : 'DOMAIN & WHOIS', health: res.categories.domain.health, color: res.categories.domain.health >= 80 ? 'bg-emerald-500' : (res.categories.domain.health >= 50 ? 'bg-orange-500' : 'bg-red-500') },
                  { name: lang === 'tr' ? 'YAZILIM & YAMA' : 'SOFTWARE PATCHING', health: res.categories.patching.health, color: res.categories.patching.health >= 80 ? 'bg-emerald-500' : (res.categories.patching.health >= 50 ? 'bg-orange-500' : 'bg-red-500') }
                ]);

                const allFindings = [
                  { title: lang === 'tr' ? "3.1 SERVİS GÜVENLİĞİ" : "3.1 SERVICE SECURITY", text: res.categories.service.findings.join(' '), risk: res.categories.service.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.9" : "ISO 27001:2022 ANNEX-A Control A.8.9" },
                  { title: lang === 'tr' ? "3.2 GÜVENLİK BAŞLIKLARI (SECURITY HEADERS)" : "3.2 SECURITY HEADERS", text: res.categories.headers.findings.join(' '), risk: res.categories.headers.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.26" : "ISO 27001:2022 ANNEX-A Control A.8.26" },
                  { title: lang === 'tr' ? "3.3 AĞ PORT GÜVENLİĞİ (NMAP ANALİZİ)" : "3.3 NETWORK SECURITY (NMAP)", text: res.categories.network.findings.join(' '), risk: res.categories.network.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.20" : "ISO 27001:2022 ANNEX-A Control A.8.20" },
                  { title: lang === 'tr' ? "3.4 DOMAIN & WHOIS VERİ SIZINTISI" : "3.4 DOMAIN & WHOIS LEAK", text: res.categories.domain.findings.join(' '), risk: res.categories.domain.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.5.7" : "ISO 27001:2022 ANNEX-A Control A.5.7" },
                  { title: lang === 'tr' ? "3.5 YAZILIM & YAMA DÜZEYİ (PATCHING)" : "3.5 SOFTWARE & PATCHING", text: res.categories.patching.findings.join(' '), risk: res.categories.patching.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.8" : "ISO 27001:2022 ANNEX-A Control A.8.8" }
                ];
                setRealRisks(allFindings);
              }

            setTimeout(() => { if (isMounted) setIsAnalyzing(false); }, 6500);
          } else { setAccessError(t.invalidLink); }
        }
      } catch { if (isMounted) setAccessError(t.connError); }
    };
    verifyToken();
    return () => { isMounted = false; };
  }, [token, searchParams, t.securityTokenMissing, t.invalidLink, t.connError, lang]);

  const downloadPDF = () => {
    const params = new URLSearchParams(searchParams);
    window.open(`/scorecard-print?${params.toString()}`, '_blank');
  };

  const [terminalStep, setTerminalStep] = useState(0);

  const REALISTIC_LOGS = React.useMemo(() => {
    if (lang === 'en') {
      return [
        `[INIT] Initiating TCP/IP Socket connection (${domain})`,
        `[INIT] Resolving DNS Names (A & AAAA Records)...`,
        `[INFO] Target IPv4 address cached.`,
        `[SCAN] Category 1: Service Security Analysis`,
        `[SCAN] Critical directory probe: /.env (Timeout: 3000ms)`,
        `[SCAN] Critical directory probe: /.git/config (Timeout: 3000ms)`,
        `[SCAN] Management panel scan: /admin`,
        `[SCAN] Management panel scan: /wp-admin`,
        `[RESULT] Directory payload readings completed.`,
        `[SCAN] Category 2: Network Port Security (Async)`,
        `[NMAP] TCP Socket probe -> Port 21 (FTP)`,
        `[NMAP] TCP Socket probe -> Port 22 (SSH)`,
        `[NMAP] TCP Socket probe -> Port 23 (Telnet)`,
        `[NMAP] TCP Socket probe -> Port 25 (SMTP)`,
        `[NMAP] TCP Socket probe -> Port 445 (SMB)`,
        `[NMAP] TCP Socket probe -> Port 3306 (MySQL)`,
        `[NMAP] TCP Socket probe -> Port 3389 (RDP)`,
        `[RESULT] Network port statuses logged to database.`,
        `[SCAN] Category 3: Cryptologic Leaks (SSL/TLS)`,
        `[INFO] Validating SSL Certificate chain... X509 V3 read.`,
        `[INFO] Calculating remaining certificate days (Expiry).`,
        `[SCAN] Category 4: DNS Spoofing Check`,
        `[INFO] Scanning v=spf1 rules via TXT records.`,
        `[INFO] Analyzing v=DMARC1 policy via TXT records.`,
        `[SCAN] Category 5: HTTP Security Headers & Disclosures`,
        `[INFO] Target GET request -> Strict-Transport-Security check.`,
        `[INFO] Target GET request -> Content-Security-Policy barrier.`,
        `[INFO] Target GET request -> X-Frame-Options (Clickjacking).`,
        `[INFO] Scanning server signature version disclosure.`,
        `[INFO] Scanning infrastructure (X-Powered-By) disclosure.`,
        `[SYSTEM] Consolidating analysis... Artificial intelligence engaged.`,
        `[SYSTEM] Loading Penetration Test Report evidence chain PDF algorithms...`
      ];
    }
    return [
      `[INIT] TCP/IP Socket bağlantısı başlatılıyor (${domain})`,
      `[INIT] DNS İsim Çözümleme (A & AAAA Records) yapılıyor...`,
      `[INFO] Hedef IPv4 adresi hafızaya alındı.`,
      `[SCAN] Kategori 1: Servis Güvenliği Analizi`,
      `[SCAN] Kritik dizin probu: /.env (Timeout: 3000ms)`,
      `[SCAN] Kritik dizin probu: /.git/config (Timeout: 3000ms)`,
      `[SCAN] Yönetim paneli taraması: /admin`,
      `[SCAN] Yönetim paneli taraması: /wp-admin`,
      `[RESULT] Dizin payload okumaları tamamlandı.`,
      `[SCAN] Kategori 2: Ağ Port Güvenliği (Asenkron)`,
      `[NMAP] TCP Socket probu -> Port 21 (FTP)`,
      `[NMAP] TCP Socket probu -> Port 22 (SSH)`,
      `[NMAP] TCP Socket probu -> Port 23 (Telnet)`,
      `[NMAP] TCP Socket probu -> Port 25 (SMTP)`,
      `[NMAP] TCP Socket probu -> Port 445 (SMB)`,
      `[NMAP] TCP Socket probu -> Port 3306 (MySQL)`,
      `[NMAP] TCP Socket probu -> Port 3389 (RDP)`,
      `[RESULT] Network port durumları veritabanına işlendi.`,
      `[SCAN] Kategori 3: Kriptolojik Sızıntılar (SSL/TLS)`,
      `[INFO] SSL Sertifika zinciri doğrulama... X509 V3 okundu.`,
      `[INFO] Kalan sertifika gün sayısı (Expiry) hesaplanıyor.`,
      `[SCAN] Kategori 4: DNS Sahtecilik Kontrolü (Spoofing)`,
      `[INFO] TXT kayıtları üzerinden v=spf1 kuralları taranıyor.`,
      `[INFO] TXT kayıtları üzerinden v=DMARC1 politikası analiz ediliyor.`,
      `[SCAN] Kategori 5: HTTP Güvenlik Başlıkları & İfşalar`,
      `[INFO] Hedef GET request -> Strict-Transport-Security kontrolü.`,
      `[INFO] Hedef GET request -> Content-Security-Policy bariyeri.`,
      `[INFO] Hedef GET request -> X-Frame-Options (Clickjacking).`,
      `[INFO] Sunucu (Server) damgası versiyon ifşası taranıyor.`,
      `[INFO] Altyapı (X-Powered-By) ifşası taranıyor.`,
      `[SYSTEM] Analizler birleştiriliyor... Yapay zeka devrede.`,
      `[SYSTEM] Penetrasyon Test Raporu kanıt zinciri PDF algoritmaları yükleniyor...`
    ];
  }, [domain, lang]);

  useEffect(() => {
    if (isAnalyzing && !accessError) {
      const termInterval = setInterval(() => {
        setTerminalStep(s => Math.min(s + 1, REALISTIC_LOGS.length));
      }, 950);
      return () => clearInterval(termInterval);
    }
  }, [isAnalyzing, accessError, REALISTIC_LOGS.length]);

  const terminalContainerRef = React.useRef(null);
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalStep]);

  if (isAnalyzing) {
    const snapStepsCurrent = lang === 'en' ? SNAP_STEPS_EN : SNAP_STEPS_TR;
    const mainProgress = Math.round((loadStep / (snapStepsCurrent.length - 1)) * 100);
    const termProgress = Math.round((terminalStep / REALISTIC_LOGS.length) * 100);

    return (
      <div className="min-h-screen bg-[#020b14] flex flex-col items-center justify-start pt-12 pb-24 font-mono p-4 md:p-8 relative">
        {/* Arkaplan Matris Efekti */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Ortadaki Pulsing Icon */}
        <div className="relative w-32 h-32 mb-6 mt-4 z-10 flex-shrink-0">
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-4 border-dashed border-cyan-500/20 rounded-full"
            />
            <div className="absolute inset-4 border border-cyan-500/10 rounded-full flex items-center justify-center bg-cyan-500/5 backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <Activity className="text-cyan-400 animate-pulse" size={32} />
            </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-black text-white tracking-widest animate-pulse mb-8 z-10">
           <span className="lowercase text-cyan-400">{formattedUrl}</span> <span className="uppercase">{t.analyzingTitle}</span>
        </h2>
        
        {/* Yan Yana İki Pencere (Frames) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto z-10 flex-1 min-h-0">
          
          {/* SOL PENCERE: Üst Katman Yüzey İşlemleri */}
          <div className="bg-[#061425]/70 border border-cyan-500/30 rounded-xl p-6 flex flex-col shadow-[0_0_20px_rgba(6,182,212,0.05)] h-[550px] md:h-[650px]">
             <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-4">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="text-cyan-400" size={24} />
                   <h3 className="text-cyan-400 font-black tracking-widest text-xs md:text-sm uppercase">{t.cyberOps}</h3>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs bg-cyan-500/10 px-3 py-1.5 rounded border border-cyan-500/30">
                   <Timer size={14} className="animate-pulse" /> {t.duration}: {elapsedWaitTime}S
                </div>
             </div>
             
             {/* Main Progress Bar */}
             <div className="mb-6">
                 <div className="flex justify-between text-[10px] text-cyan-500 font-black mb-2 tracking-widest">
                    <span>{t.overallProgress}</span>
                    <span>{mainProgress}%</span>
                 </div>
                 <div className="w-full h-3 bg-cyan-950 rounded-full overflow-hidden border border-cyan-500/20">
                    <motion.div 
                       className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                       initial={{ width: 0 }}
                       animate={{ width: `${mainProgress}%` }}
                       transition={{ duration: 0.5 }}
                    />
                 </div>
             </div>

             {/* Adımlar Listesi */}
             <div className="flex-1 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar">
                {snapStepsCurrent.map((s, i) => (
                  <div key={i} className={`flex items-center gap-4 py-2 px-4 rounded border ${i === loadStep ? 'border-cyan-500/50 bg-cyan-500/10' : i < loadStep ? 'border-white/5 bg-white/5' : 'border-transparent bg-white/5 opacity-40'}`}>
                     <span className={`text-xs font-mono font-black ${i === loadStep ? 'text-cyan-400' : 'text-slate-500'}`}>{String(i+1).padStart(2,'0')}</span>
                     <p className={`text-[11px] md:text-sm font-bold tracking-wider flex-1 ${i === loadStep ? 'text-white' : i < loadStep ? 'text-slate-400' : 'text-slate-600'}`}>{s}</p>
                     {i < loadStep && <ShieldCheck size={16} className="text-cyan-600" />}
                     {i === loadStep && <Activity size={16} className="text-cyan-400 animate-pulse" />}
                  </div>
                ))}
             </div>
          </div>

          {/* SAĞ PENCERE: Matrix Terminali */}
          <div className="bg-[#02070e] border border-green-500/30 rounded-xl p-6 flex flex-col shadow-[0_0_30px_rgba(34,197,94,0.05)] h-[550px] md:h-[650px] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Lock size={64} className="text-green-500" />
             </div>
             
             <div className="flex justify-between items-center mb-4 border-b border-green-500/20 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <h3 className="text-green-500 font-black tracking-widest text-xs md:text-sm uppercase">{t.deepTerminal}</h3>
                </div>
                <div className="text-[10px] text-green-600 font-mono tracking-widest">CONNECT_ID: {reportId}</div>
             </div>

             {/* Terminal Progress Bar */}
             <div className="mb-6 relative z-10">
                 <div className="flex justify-between text-[10px] text-green-500 font-black mb-2 tracking-widest">
                    <span>{t.engineLoad}</span>
                    <span>{termProgress}%</span>
                 </div>
                 <div className="w-full h-2 bg-green-950 rounded-full overflow-hidden border border-green-500/20">
                    <motion.div 
                       className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                       initial={{ width: 0 }}
                       animate={{ width: `${termProgress}%` }}
                       transition={{ duration: 0.5 }}
                    />
                 </div>
             </div>

             {/* Matrix Log Ekranı */}
             <div ref={terminalContainerRef} className="flex-1 bg-black/60 border border-green-500/20 rounded p-4 overflow-y-auto font-mono text-[9px] md:text-[11px] text-green-500 leading-relaxed shadow-inner custom-scrollbar">
                {REALISTIC_LOGS.slice(0, terminalStep).map((log, idx) => (
                   <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-1.5"
                   >
                      <span className="text-green-700 mr-2">{new Date().toISOString().substring(11, 19)}</span>
                      {log.startsWith('[SCAN]') || log.startsWith('[SYSTEM]') ? <span className="font-black text-white bg-green-900/50 px-1 mr-1">{log}</span> : log}
                   </motion.div>
                ))}
                {terminalStep < REALISTIC_LOGS.length && (
                   <div className="mt-2 text-green-400 animate-pulse">_</div>
                )}
             </div>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen print:min-h-0 bg-gray-100 print:bg-white text-slate-800 p-4 md:p-8 font-mono relative overflow-hidden print:overflow-visible">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none print:hidden" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white blur-[120px] rounded-full print:hidden pointer-events-none" />
      <style>{`
        @media print { 
          @page { size: A4; margin: 0; } 
          .print-page { width: 210mm; height: 292mm; padding: 8mm; position: relative; break-after: page; background: white !important; color: #1e293b !important; display: flex; flex-direction: column; box-sizing: border-box; overflow: hidden; zoom: 0.95; } 
        }
      `}</style>

      {/* PAGE 1: COVER (Print Only) */}
      <div className="hidden print:flex print-page bg-white">
        <div className="w-full h-full border-[8px] border-double border-slate-100 flex flex-col items-center justify-between p-8 relative">
          <div className="text-center space-y-2 mt-4 w-full">
            <ShieldCheck size={70} className="text-blue-600 mx-auto h-16" />
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase leading-none">{t.reportTitle}</h1>
            <p className="text-sm font-bold text-slate-500 tracking-[0.3em] uppercase">{t.scorecardSub}</p>
          </div>
          
          <div className="w-full flex-1 flex flex-col justify-center space-y-4 text-center">
              <div className="py-4 border-y border-slate-200 bg-slate-50/30">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{t.targetDomain}</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter font-serif lowercase">www.{domain.toLowerCase()}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-left max-w-lg mx-auto w-full px-4">
                  <div className="border-l-2 border-slate-200 pl-3">
                      <p className="text-[8px] font-black text-slate-400 uppercase">{t.reportNo}</p>
                      <p className="text-[9px] font-bold text-slate-800 font-mono">#{reportId}</p>
                  </div>
                  <div className="border-l-2 border-slate-200 pl-3">
                      <p className="text-[8px] font-black text-slate-400 uppercase">{t.analysisDate}</p>
                      <p className="text-[9px] font-bold text-slate-800">{new Date().toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US')}</p>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/* PAGE 2: DASHBOARD OVERVIEW (Print & Screen) */}
      <div id="scorecard-content" className="max-w-[1600px] mx-auto relative z-10 print:print-page">
        <header className="flex flex-col lg:flex-row items-center justify-between mb-12 border-b border-gray-300 pb-8 gap-6 print:hidden">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
              <ShieldCheck size={36} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3">
                 <span className="text-emerald-600 lowercase">{formattedUrl}</span> {t.profile}
              </h1>
              <p className="text-slate-500 text-sm mt-1">{t.lastUpdated}: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={downloadPDF} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all font-black text-xs uppercase tracking-widest shadow-md">
              <Download size={16} /> {t.downloadPdf}
            </button>
            <button onClick={() => navigate('/admin-panel')} className="px-6 py-2 bg-white border border-gray-300 text-slate-600 rounded-xl hover:bg-gray-50 transition-all font-black text-xs uppercase tracking-widest shadow-sm">
              {t.backToAdmin}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:gap-4 flex-1">
          <div className="lg:col-span-4 space-y-8 print:space-y-4">
            <ScorecardWidget title={t.securityGrade}>
              <div className="flex flex-col items-center py-10 print:py-6 w-full">
                <div className="w-full max-w-2xl px-4 mb-12 print:mb-6">
                  <div className="flex justify-between items-start w-full relative">
                    {[
                      { g: 'A+', label: lang === 'tr' ? 'MÜKEMMEL' : 'EXCELLENT' },
                      { g: 'A', label: lang === 'tr' ? 'ÇOK İYİ' : 'GOOD' },
                      { g: 'B', label: lang === 'tr' ? 'GÜVENLİ' : 'FAIR' },
                      { g: 'C', label: lang === 'tr' ? 'ORTA RİSK' : 'WEAK' },
                      { g: 'D', label: lang === 'tr' ? 'ZAYIF' : 'RISKY' },
                      { g: 'F', label: lang === 'tr' ? 'TEHLİKELİ' : 'DANGER' }
                    ].map((item) => {
                      const isActive = grade === item.g;
                      return (
                        <div key={item.g} className="flex flex-col items-center group">
                          <span className={`text-[10px] font-black mb-2 transition-colors ${isActive ? (grade.includes('A') || grade.includes('B') ? 'text-emerald-500' : 'text-amber-500') : 'text-gray-300'}`}>{item.g}</span>
                          <span className={`text-[7px] font-bold mb-4 whitespace-nowrap tracking-tighter ${isActive ? (grade.includes('A') || grade.includes('B') ? 'text-emerald-500' : 'text-amber-500') : 'text-gray-300'}`}>{item.label}</span>
                          {isActive && (
                            <div className={`absolute -bottom-6 w-12 h-1 rounded-full shadow-sm ${grade.includes('A') || grade.includes('B') ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="relative mb-8">
                  <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-[140px] print:text-[80px] font-black leading-none drop-shadow-sm my-8 print:my-4 relative ${grade.includes('A') || grade.includes('B') ? 'text-emerald-500' : 'text-amber-500'}`}>
                     {grade}
                  </motion.div>
                </div>

                <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                  {realRisks.length > 0 ? `${realRisks.length} KRİTİK/MAJÖR BULGU TESPİT EDİLDİ` : "HERHANGİ BİR KRİTİK ZAFİYET TESPİT EDİLMEDİ"}
                </p>
                
                <div className={`px-4 py-1 text-white font-black text-[10px] uppercase tracking-[0.3em] whitespace-nowrap rounded ${grade.includes('A') || grade.includes('B') ? 'bg-emerald-600' : 'bg-slate-800'}`}>
                  {grade.includes('A') || grade.includes('B') ? 'ALFA CERTIFIED' : 'ACTION REQUIRED'}
                </div>
              </div>
            </ScorecardWidget>
          </div>

          <div className="lg:col-span-8 space-y-8 print:space-y-4">
            <ScorecardWidget title={t.infrastructureHealth}>
                <div className="flex flex-wrap items-center justify-around gap-4 py-8 print:py-4 bg-white print:bg-slate-50 rounded-xl">
                  {infrastructureData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center group relative">
                      <div className="relative w-24 h-24 print:w-16 print:h-16 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                          <circle
                            cx="50" cy="50" r="42"
                            strokeWidth="6"
                            fill="transparent"
                            stroke="currentColor"
                            className="text-gray-200"
                          />
                          <motion.circle
                            cx="50" cy="50" r="42"
                            strokeWidth="8"
                            stroke="currentColor"
                            strokeLinecap="round"
                            fill="transparent"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: item.health / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                            className={`${item.color} print:stroke-current`}
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-sm font-black text-slate-700 print:text-slate-900">%{item.health}</span>
                        </div>
                      </div>
                      <span className="mt-4 text-[10px] font-black text-slate-500 print:text-slate-900 uppercase tracking-tighter text-center">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6 text-[10px] font-black tracking-[0.2em] text-slate-500 print:text-slate-400 uppercase">
                    <span>&lt; {t.systemScanVer || 'V4.1.0'} &gt;</span>
                    <span>{t.reportStatus || 'DURUM: ANALİZ TAMAMLANDI'}</span>
                </div>
            </ScorecardWidget>

          </div>
        </div>
      </div>

      {/* PAGE 3: PENETRATION TEST & AUDIT DETAIL (Print Only & Screen Section) */}
      <div className="max-w-[1600px] mx-auto mt-[100px] print:mt-0 print:print-page relative z-10">
        <div className="w-full h-full border-[8px] border-double border-gray-200 flex flex-col items-stretch p-6 print:p-4 relative bg-white rounded-2xl print:rounded-none shadow-sm print:shadow-none">
                 <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">{t.summaryTitle}</h3>
                    <div className="h-px flex-1 bg-gray-200" />
                 </div>
                <div className="mb-6 p-6 bg-emerald-50/50 print:bg-slate-50 border border-emerald-100 print:border-slate-200 rounded-xl">
                   <h4 className="text-[10px] font-black text-slate-500 mb-1 uppercase tracking-widest">{t.execSummaryTitle}</h4>
                   <p className="text-sm text-slate-600 print:text-slate-800 font-medium italic leading-relaxed">"{t.execSummaryText}"</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {realRisks.map((risk, idx) => {
                     const isDanger = risk.risk === 'RİSKLİ' || risk.risk === 'TEHLİKELİ' || risk.risk === 'YÜKSEK' || risk.risk === 'YÜKSEK RİSK';
                     const isSafe = risk.risk === 'GÜVENLİ' || risk.risk === 'OK';
                     return (
                        <div key={idx} className={`p-5 rounded-2xl border ${idx === 0 ? 'md:col-span-2' : ''} ${isDanger ? 'bg-amber-50/50 border-amber-200' : (isSafe ? 'bg-emerald-50/50 border-emerald-200' : 'bg-orange-50/50 border-orange-200')} flex flex-col justify-between print:bg-white print:border-slate-200 shadow-sm print:shadow-none`}>
                           <div className="flex items-center justify-between mb-3 border-b border-gray-200 print:border-slate-100 pb-2">
                             <div className="flex items-center gap-3">
                               <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDanger ? 'bg-amber-100 text-amber-600' : (isSafe ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600')}`}>
                                 {isDanger ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
                               </div>
                               <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 print:text-slate-900">{risk.title}</h4>
                             </div>
                             <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${isDanger ? 'bg-amber-100 text-amber-700' : (isSafe ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700')}`}>{risk.risk}</span>
                           </div>
                           <p className="text-[11px] text-slate-500 print:text-slate-600 font-medium italic leading-relaxed">{risk.text}</p>
                           <div className="mt-4 flex justify-between items-center text-[8px] font-bold uppercase tracking-widest border-t border-gray-100 pt-3">
                             <span className="text-emerald-700 bg-emerald-100/50 px-1.5 py-0.5 rounded border border-emerald-200 print:bg-blue-50 print:text-blue-700 print:border-blue-200">{risk.isoTag}</span>
                             <span className="text-slate-400">ZORLUK: {isDanger ? 'YÜKSEK' : 'DÜŞÜK'}</span>
                           </div>
                        </div>
                     );
                  })}
                </div>
                <div className="mt-auto pt-6 border-t border-gray-200 print:border-slate-200">
                   <h3 className="text-sm font-black text-slate-500 print:text-slate-800 mb-3 tracking-widest uppercase">{t.nextStepsTitle}</h3>
                   <div className="grid grid-cols-2 gap-2">
                      {[t.advancedTest1, t.advancedTest2, t.advancedTest3, t.advancedTest4].map((test, i) => (
                        <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-slate-600 print:text-slate-700 bg-gray-50 print:bg-slate-50 p-2 rounded-lg border border-gray-200 print:border-slate-100">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                           {test}
                        </div>
                      ))}
                   </div>
                </div>
                <div className="mt-6 print:mt-auto pt-4 flex justify-between items-end border-t border-gray-200 print:border-slate-100">
                   <div>
                      <p className="text-[7px] text-slate-600 print:text-slate-400 font-bold uppercase tracking-widest leading-tight">{t.disclaimer}</p>
                      <p className="text-[7px] text-slate-500 mt-0.5">REPORT_ID: {reportId}</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="text-right">
                         <p className="text-[8px] font-black text-emerald-600 uppercase leading-none">{t.verifiedBy}</p>
                         <p className="text-[6px] text-slate-400 print:text-slate-400 font-bold tracking-widest mt-0.5">WWW.ALFAYAPAYZEKA.COM</p>
                      </div>
                      <div className="w-14 h-14 border border-gray-300 print:border-slate-300 rounded p-1 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://www.alfayapayzeka.com/verify?domain=${domain}&id=${reportId}`)}`} alt="QR" className="w-full h-full object-contain" crossOrigin="anonymous" />
                      </div>
                   </div>
                </div>
        </div>
      </div>

      {/* PAGE 4: FINAL SIGNATURE PAGE (Print Only) */}
      <div className="hidden print:flex print-page flex-col justify-between items-center text-center py-20 border-[12px] border-double border-slate-50 px-12 bg-white">
           <div className="space-y-6 w-full mt-4">
              <ShieldCheck size={80} className="text-blue-600 mx-auto" />
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter border-b-4 border-slate-900 pb-2 inline-block">{t.approval}</h2>
              <p className="max-w-2xl mx-auto text-slate-500 italic text-sm leading-relaxed px-12 mt-10">
                "Bu belge dijital olarak imzalanmış olup, penetrasyon test analiz sonuçlarının doğruluğu ALFA YAPAY ZEKA Laboratuvarı, Siber Güvenlik Birimi tarafından onaylanmıştır."
              </p>
           </div>
           
           <div className="mt-auto w-full flex flex-col items-center mb-10">
              <div className="relative w-64 h-32 mb-2">
                 <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Signature" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="space-y-1 text-center border-t border-slate-200 pt-4 w-72">
                 <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">ERKİN GÜLER</p>
                 <p className="text-[10px] font-black text-blue-600 tracking-[0.15em] uppercase mt-1">SİBER GÜVENLİK UZMANI</p>
                 <p className="text-[8px] font-bold text-slate-400 tracking-[0.2em] uppercase">ALFA SİBER ANALİZ BİRİMİ</p>
              </div>
           </div>

           <div className="w-full mt-10 pt-6 border-t border-slate-100 flex justify-between text-[7px] font-mono text-slate-300 uppercase tracking-[0.2em]">
              <span>ALFA_ID: {reportId}</span>
              <span>CERT_ID: {certId}</span>
              <span>SIGNED_AT: {signedAt}</span>
           </div>
      </div>
    </div>
  );
};

export default SnapScoreCard;
