import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, AlertTriangle, Globe, Server,
  Network, Mail, Lock, FileText, Loader2, CheckCircle,
  XCircle, Info, Cpu, Map, Tag, Database, Activity,
  ExternalLink, Calendar, Wifi, Eye, Key, Cookie
} from 'lucide-react';
import { apiClient } from '../utils/api';

/* ─────────────────────────────────────────────
   YARDIMCI FONKSİYONLAR
───────────────────────────────────────────── */

const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, (i + 1) * size)
  );

const fmtDate = (isoStr) => {
  if (!isoStr) return '—';
  try { return new Date(isoStr).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }); }
  catch { return isoStr; }
};

/* ─────────────────────────────────────────────
   YENİDEN KULLANILABILIR BİLEŞENLER
───────────────────────────────────────────── */

const SeverityBadge = ({ sev }) => {
  const map = {
    OK: 'bg-emerald-600 text-white', INFO: 'bg-sky-600 text-white',
    LOW: 'bg-yellow-500 text-black', MEDIUM: 'bg-orange-500 text-white',
    HIGH: 'bg-red-600 text-white', CRITICAL: 'bg-red-900 text-white',
    NORMAL: 'bg-slate-500 text-white',
  };
  return (
    <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${map[sev] || 'bg-slate-400 text-white'}`}>
      {sev}
    </span>
  );
};

const RiskBadge = ({ risk }) => {
  const map = {
    OK: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    INFO: 'bg-sky-100 text-sky-800 border-sky-300',
    MEDIUM: 'bg-orange-100 text-orange-800 border-orange-300',
    HIGH: 'bg-red-100 text-red-800 border-red-300',
    CRITICAL: 'bg-red-200 text-red-900 border-red-400',
    UNKNOWN: 'bg-slate-100 text-slate-600 border-slate-300',
  };
  return (
    <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border ${map[risk] || map.UNKNOWN}`}>
      {risk}
    </span>
  );
};

const FindingRow = ({ item, detail, severity }) => (
  <div className="flex items-start gap-2 py-1.5 border-b border-slate-100 last:border-0">
    <div className="w-3 mt-0.5 shrink-0">
      {severity === 'OK' || severity === 'NORMAL'
        ? <CheckCircle size={10} className="text-emerald-500" />
        : severity === 'INFO'
        ? <Info size={10} className="text-sky-500" />
        : <XCircle size={10} className="text-red-500" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 mb-0.5">
        <span className="text-[9px] font-black text-slate-800 uppercase tracking-wide">{item}</span>
        <SeverityBadge sev={severity} />
      </div>
      <p className="text-[8px] text-slate-500 font-medium leading-snug">{detail}</p>
    </div>
  </div>
);

const InfoRow = ({ label, value, highlight }) => (
  <div className="flex items-baseline justify-between py-1 border-b border-slate-50 last:border-0 gap-2">
    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wide shrink-0">{label}</span>
    <span className={`text-[9px] font-bold text-right truncate max-w-[60%] ${highlight ? 'text-slate-900' : 'text-slate-600'}`}>
      {value || '—'}
    </span>
  </div>
);

const PageHeader = ({ pageNum, section, icon: Icon }) => (
  <div className="flex items-center justify-between mb-4 border-b-2 border-slate-900 pb-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={14} className="text-slate-700" />}
      <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">{section}</h2>
    </div>
    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
      ALFA X-RAY V2.0 | {pageNum}
    </span>
  </div>
);

const PageFooter = ({ reportId, domain }) => (
  <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-center text-[7px] font-bold text-slate-300 uppercase tracking-[0.2em]">
    <span>ALFA YAPAY ZEKA SİBER GÜVENLİK BİRİMİ</span>
    <span>#{reportId?.substring(0, 12)}</span>
    <span>GİZLİ — {domain}</span>
  </div>
);

/* ─────────────────────────────────────────────
   YENİ FORENSİK BİLEŞENLER (V2.1)
───────────────────────────────────────────── */

const LogAppendixPage = ({ sectionKey, title, logs, chunkIdx, totalChunks, reportId }) => (
  <div className="a4-page bg-[#0a0f14] text-[#a0aec0] font-['IBM_Plex_Mono']">
    <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-1">
      <div className="flex items-center gap-2">
        <Activity size={10} className="text-emerald-500" />
        <h3 className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">
          EK-A: FORENSİK AUDIT LOGS — {title}
        </h3>
      </div>
      <span className="text-[6px] font-bold text-slate-600">PARÇA: {chunkIdx + 1}/{totalChunks}</span>
    </div>

    <div className="flex-1 overflow-hidden">
      {logs.map((log, i) => (
        <div key={i} className="text-[6.5px] leading-[1.4] whitespace-pre-wrap font-mono mb-0.5">
          <span className="text-emerald-600/50 mr-2">{(chunkIdx * 45 + i + 1).toString().padStart(4, '0')}</span>
          <span className={log.includes('CRITICAL') ? 'text-red-400 font-bold' : log.includes('ALERT') ? 'text-amber-400' : 'text-slate-400'}>
            {log}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center text-[6px] font-bold text-slate-600 uppercase tracking-widest">
      <span>ALFA X-RAY FORENSIC ENGINE</span>
      <span>#{reportId?.substring(0, 8)}</span>
      <span>PAGE_ID: {sectionKey}_L{chunkIdx}</span>
    </div>
  </div>
);

const RemediationSheet = ({ finding, reportId, domain, pageNum }) => {
  const getRemediation = (item) => {
    const data = {
      'HSTS': {
        impact: 'MİTM (Man-in-the-Middle) ve SSL Strip saldırılarına açık kapı bırakır.',
        rootCause: 'Sunucu yanıtlarında Strict-Transport-Security başlığının eksik veya hatalı yapılandırılmış olması.',
        steps: [
          'Web sunucusu konfigürasyonuna (Nginx/Apache) HSTS başlığını ekleyin.',
          'Nginx için: add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
          'Tüm alt domainlerin HTTPS üzerinden hizmet verdiğinden emin olun.',
          'HSTS preload listesine başvuru yapın.'
        ]
      },
      'CSP': {
        impact: 'XSS (Cross-Site Scripting) ve Data Injection saldırı riski.',
        rootCause: 'Tarayıcının hangi kaynaklardan içerik yükleyebileceğini belirleyen politikanın eksikliği.',
        steps: [
          'Content-Security-Policy başlığını tanımlayın.',
          'Örnek: default-src \'self\'; script-src \'self\' https://trusted.com;',
          'Inline script kullanımını (unsafe-inline) minimize edin.',
          'Raporlama modu (report-uri) ile ihlalleri izleyin.'
        ]
      },
      'SPF': {
        impact: 'Domain üzerinden sahte e-posta (Email Spoofing) gönderilebilir.',
        rootCause: 'DNS kayıtlarında hangi sunucuların mail göndermeye yetkili olduğunun tanımlanmaması.',
        steps: [
          'DNS TXT kaydı olarak v=spf1 ip4:xxx.xxx.xxx.xxx include:_spf.google.com ~all ekleyin.',
          'Yalnızca kullandığınız IP ve servisleri yetkilendirin.'
        ]
      },
      'DMARC': {
        impact: 'SPF/DKIM ihlallerinde tarayıcı/sunucu davranışı belirsizdir, phishing riskini artırır.',
        rootCause: 'E-posta doğrulama sonuçlarının nasıl işleneceğine dair bir politika (p=reject/quarantine) olmaması.',
        steps: [
          'v=DMARC1; p=quarantine; rua=mailto:security@domain.com kaydı ekleyin.',
          'İzleme sürecinden sonra p=reject moduna geçin.'
        ]
      }
    };
    return data[Object.keys(data).find(k => item.includes(k))] || {
      impact: 'Tespit edilen yapılandırma hatası, saldırganların hedef sistem üzerinde bilgi toplamasına veya yetkisiz işlem yapmasına neden olabilir.',
      rootCause: 'Eski yazılım sürümleri, yanlış yapılandırılmış sunucu ayarları veya eksik güvenlik politikaları.',
      steps: ['İlgili bileşeni güncelleyin.', 'Güvenlik kılavuzlarını (Hardening guides) takip edin.', 'Yetkisiz erişim kontrollerini sıkılaştırın.']
    };
  };

  const rem = getRemediation(finding.item);

  return (
    <div className="a4-page border-t-[12px] border-slate-900 shadow-none border border-slate-200">
      <PageHeader pageNum={pageNum} section="Teknik İyileştirme Planı (Remediation)" icon={Key} />
      
      <div className="flex-1 space-y-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">BULGU TANIMI</p>
              <h3 className="text-[10px] font-black text-slate-900 uppercase">{finding.item}</h3>
            </div>
            <SeverityBadge sev={finding.severity} />
          </div>
          <p className="text-[9px] text-slate-600 font-bold">{finding.detail}</p>
        </div>

        <div className="space-y-4">
          <section>
            <h4 className="text-[9px] font-black text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase tracking-widest">I. GÜVENLİK ETKİSİ (IMPACT)</h4>
            <p className="text-[9px] text-slate-600 leading-relaxed font-medium">{rem.impact}</p>
          </section>

          <section>
            <h4 className="text-[9px] font-black text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase tracking-widest">II. KÖK NEDEN ANALİZİ (ROOT CAUSE)</h4>
            <p className="text-[9px] text-slate-600 leading-relaxed font-medium">{rem.rootCause}</p>
          </section>

          <section>
            <h4 className="text-[9px] font-black text-slate-900 border-b border-slate-200 pb-1 mb-2 uppercase tracking-widest">III. ÇÖZÜM ADIMLARI (STEPS)</h4>
            <div className="space-y-2">
              {rem.steps.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-slate-300 font-black text-[10px]">{i + 1}.</span>
                  <p className="text-[9px] text-slate-700 font-bold bg-slate-50 p-2 rounded w-full border border-slate-100">{s}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-auto p-4 border border-emerald-200 bg-emerald-50 rounded-xl">
          <p className="text-[8px] font-black text-emerald-700 uppercase mb-1 flex items-center gap-1">
            <CheckCircle size={10} /> ÇÖZÜM SONRASI DOĞRULAMA
          </p>
          <p className="text-[8px] text-emerald-600 leading-relaxed italic">
            Bu adımların uygulanmasının ardından "ALFA X-RAY" tarayıcısını tekrar çalıştırarak bulgunun "OK" durumuna geçtiğini teyit ediniz.
          </p>
        </div>
      </div>
      <PageFooter reportId={reportId} domain={domain} />
    </div>
  );
};

const RawDataAppendix = ({ title, data, reportId, domain, pageId }) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const dataChunks = chunkArray(jsonStr.split('\n'), 55);

  return dataChunks.map((chunk, idx) => (
    <div key={`${pageId}-${idx}`} className="a4-page bg-slate-50 text-slate-800 font-mono border border-slate-200">
      <PageHeader pageNum={`EK-RAW-${idx + 1}`} section={`Ham Veri Forensiği — ${title}`} icon={Database} />
      <div className="flex-1 overflow-hidden p-4 bg-white border border-slate-200 rounded shadow-inner">
        <pre className="text-[7.5px] leading-tight text-slate-500">
          {chunk.join('\n')}
        </pre>
      </div>
      <div className="mt-2 text-[6px] text-slate-400 text-center uppercase tracking-widest">
        DUMP_ID: {pageId} | CHUNK: {idx + 1}/{dataChunks.length}
      </div>
      <PageFooter reportId={reportId} domain={domain} />
    </div>
  ));
};

const SecurityGlossary = ({ reportId, domain }) => {
  const terms = [
    { t: 'HSTS (HTTP Strict Transport Security)', d: 'Web sitelerinin yalnızca HTTPS üzerinden erişilmesini zorunlu kılan bir güvenlik mekanizmasıdır. MİTM saldırılarını engeller.' },
    { t: 'SPF (Sender Policy Framework)', d: 'Domain adına e-posta göndermeye yetkili IP adreslerini belirten DNS kaydıdır. Spoofing saldırılarını önler.' },
    { t: 'CSP (Content Security Policy)', d: 'XSS ve veri enjeksiyonu saldırılarını azaltmak için kullanılan bir güvenlik katmanıdır. Kaynak kısıtlaması yapar.' },
    { t: 'DKIM (DomainKeys Identified Mail)', d: 'E-postaların yolda değiştirilmediğini kanıtlayan dijital bir imzadır.' },
    { t: 'DMARC', d: 'SPF ve DKIM sonuçlarını birleştirerek sahte e-postalara karşı nihai bir politika belirler.' },
    { t: 'CORS (Cross-Origin Resource Sharing)', d: 'Tarayıcıların farklı kökenlerden kaynak paylaşımını nasıl yöneteceğini belirleyen sistemdir.' },
    { t: 'SSL/TLS Cipher Suite', d: 'Bağlantı şifreleme sırasında kullanılan algoritmalar setidir. Zayıf suite\'ler veri gizliliğini riske atar.' },
    { t: 'ASN (Autonomous System Number)', d: 'İnternet üzerindeki her bir otonom sistemi tanımlayan benzersiz numaradır.' },
    { t: 'Clickjacking (X-Frame-Options)', d: 'Bir web sayfasının görünmez bir çerçeve içine yerleştirilerek kullanıcının yanıltılması saldırısıdır.' },
    { t: 'Subdomain Enumeration', d: 'Bir domainin altında bulunan tüm alt alan adlarının tespit edilmesi sürecidir.' }
  ];

  const termChunks = chunkArray(terms, 5);

  return termChunks.map((chunk, idx) => (
    <div key={`glossary-${idx}`} className="a4-page shadow-none border border-slate-100">
      <PageHeader pageNum={`G-${idx + 1}`} section="Siber Güvenlik Terimler Sözlüğü" icon={Info} />
      <div className="flex-1 space-y-8">
        {chunk.map((item, i) => (
          <div key={i} className="border-l-4 border-slate-900 pl-4 py-1">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-wide mb-1">{item.t}</h4>
            <p className="text-[9px] text-slate-600 leading-relaxed font-medium">{item.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 italic text-[8px] text-slate-400 border-t border-slate-50">
        * Bu sözlük, raporun daha iyi anlaşılması için teknik referans amacıyla eklenmiştir.
      </div>
      <PageFooter reportId={reportId} domain={domain} />
    </div>
  ));
};

/* ─────────────────────────────────────────────
   ANA BİLEŞEN — FullReportPrint V2.0
───────────────────────────────────────────── */

const SCAN_STEPS = [
  'DNS & IP Çözümleniyor...',
  'Port Taraması Yapılıyor...',
  'HTTP Başlıkları Analiz Ediliyor...',
  'Subdomain Enumeration (crt.sh)...',
  'SSL Labs Sorgulanıyor...',
  'WHOIS / RDAP Alınıyor...',
  'Teknoloji Tespiti Yapılıyor...',
  'IP İtibar Kontrol Ediliyor...',
  'Sitemap Ayrıştırılıyor...',
  'Rapor Derleniyor...',
];


const FullReportPrint = () => {
  const [searchParams] = useSearchParams();
  const siteParam = searchParams.get('site') || 'hedef.com';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);
  const [report, setReport]       = useState(null);
  const [loadStep, setLoadStep]   = useState(0);


  useEffect(() => {
    const originalTitle = document.title;
    const ts = new Date().toISOString().replace(/[:T]/g, '_').split('.')[0];
    document.title = `ALFA_FULL_PENTEST_${siteParam.toUpperCase()}_${ts}`;
    return () => { document.title = originalTitle; };
  }, [siteParam]);

  useEffect(() => {
    let stepInterval;
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        stepInterval = setInterval(() => {
          setLoadStep(s => Math.min(s + 1, SCAN_STEPS.length - 1));
        }, 3500);

        const res = await apiClient.get(`/api/full-pentest?url=${encodeURIComponent(siteParam)}`);
        clearInterval(stepInterval);
        if (res.data.success) {
          setReport(res.data.results);
        } else {
          setError('Rapor verisi alınamadı.');
        }
      } catch (err) {
        clearInterval(stepInterval);
        setError(`Bağlantı hatası: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReport();
    return () => clearInterval(stepInterval);
  }, [siteParam]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-mono gap-5">
        <Loader2 className="animate-spin text-slate-800" size={48} />
        <p className="text-slate-600 font-black text-xs uppercase tracking-[0.4em] animate-pulse">
          X-RAY V2.0 TARAMA YÜRÜTÜLÜYOR
        </p>
        <p className="text-slate-400 text-[10px] font-bold">{siteParam}</p>
        <div className="mt-2 flex flex-col items-center gap-1">
          {SCAN_STEPS.map((s, i) => (
            <p key={i} className={`text-[9px] font-bold tracking-wide transition-all ${i === loadStep ? 'text-slate-800 scale-105' : i < loadStep ? 'text-emerald-500 line-through' : 'text-slate-200'}`}>
              {i < loadStep ? '✓' : i === loadStep ? '→' : '○'} {s}
            </p>
          ))}
        </div>
        <p className="text-slate-300 text-[9px] mt-2">Bu tarama 30-60 saniye sürebilir — lütfen bekleyin</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-mono gap-4">
        <ShieldAlert size={48} className="text-red-500" />
        <p className="text-red-600 font-black text-xs uppercase tracking-widest">RAPOR OLUŞTURULAMADI</p>
        <p className="text-slate-400 text-[10px]">{error}</p>
      </div>
    );
  }

  /* ── Veri çekme ── */
  const { sections: s, disclaimer, reportId, target, ipAddress, grade, overallScore, scanDurationSec,
    ipGeo, whoisData, subdomainData, sslGrade, cookies, corsData,
    technologies, ipReputation, sitemapData, toolMethodology, isHTTPS } = report;

  const domain = target?.toUpperCase() || siteParam.toUpperCase();

  const gradeColor = () => {
    if (['A+', 'A'].includes(grade)) return 'text-emerald-500';
    if (grade === 'B') return 'text-yellow-500';
    if (grade === 'C') return 'text-orange-500';
    return 'text-red-600';
  };

  const subs      = subdomainData?.subdomains || [];
  const subdChunks = chunkArray(subs, 14);

  /* ── Compliance mapping (gerçek bulgulara dayalı) ── */
  const complianceItems = [
    {
      standard: 'OWASP A05:2021',
      control: 'Güvenlik Yapılandırma Hatası',
      ref: 'Security Misconfiguration',
      relatedFindings: s?.s3?.findings?.filter(f => f.severity !== 'OK').map(f => f.item) || [],
      status: s?.s3?.findings?.some(f => f.severity !== 'OK') ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'OWASP A02:2021',
      control: 'Şifreleme Hataları',
      ref: 'Cryptographic Failures',
      relatedFindings: s?.s4?.findings?.filter(f => f.severity !== 'OK').map(f => f.item) || [],
      status: s?.s4?.findings?.some(f => f.severity === 'HIGH' || f.severity === 'CRITICAL') ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'ISO 27001 A.14.1.2',
      control: 'Güvenli Uygulama Mimarisi',
      ref: 'Securing application services',
      relatedFindings: cookies?.filter(c => c.overallRisk !== 'OK').map(c => `${c.name} cookie`) || [],
      status: cookies?.some(c => c.overallRisk === 'HIGH' || c.overallRisk === 'CRITICAL') ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'ISO 27001 A.13.2.3',
      control: 'E-posta Güvenlik Politikası',
      ref: 'Electronic messaging security',
      relatedFindings: s?.s6?.findings?.filter(f => f.severity !== 'OK').map(f => f.item) || [],
      status: s?.s6?.findings?.some(f => f.severity === 'HIGH') ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'KVKK Madde 12',
      control: 'Kişisel Veri Güvenliği Tedbirleri',
      ref: 'Teknik ve İdari Önlemler',
      relatedFindings: [
        ...(s?.s3?.findings?.filter(f => f.severity !== 'OK').map(f => f.item) || []),
        ...(cookies?.filter(c => c.overallRisk !== 'OK').map(c => `Cookie: ${c.name}`) || []),
      ],
      status: (s?.s3?.findings?.some(f => f.severity === 'HIGH') || cookies?.some(c => c.overallRisk === 'HIGH')) ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'OWASP A07:2021',
      control: 'Kimlik Doğrulama & Oturum Yönetimi',
      ref: 'Identification and Authentication Failures',
      relatedFindings: corsData?.overallRisk !== 'OK' ? ['CORS politikası riski'] : [],
      status: corsData?.overallRisk === 'CRITICAL' ? 'KRİTİK UYUMSUZ' : corsData?.overallRisk === 'HIGH' ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'ISO 27001 A.12.6.1',
      control: 'Teknik Açık Yönetimi',
      ref: 'Management of technical vulnerabilities',
      relatedFindings: s?.s5?.findings?.filter(f => f.severity !== 'OK').map(f => f.item) || [],
      status: s?.s5?.findings?.some(f => f.severity === 'HIGH') ? 'UYUMSUZ' : 'UYUMLU',
    },
    {
      standard: 'GDPR Art. 32',
      control: 'İşleme Güvenliği',
      ref: 'Security of processing (encryption)',
      relatedFindings: !isHTTPS ? ['HTTPS zorunlu değil'] : [],
      status: !isHTTPS ? 'UYUMSUZ' : 'UYUMLU',
    },
  ];

  /* ═══════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════ */
  return (
    <div className="bg-slate-200 min-h-screen py-8 print:py-0 font-mono">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
        @media print {
          @page { size: 210mm 297mm; margin: 0; }
          body { background: white; }
          .a4-page { width: 210mm; height: 297mm; margin: 0; border: none; box-shadow: none; break-after: page; overflow: hidden; }
          .no-print { display: none !important; }
        }
        .a4-page {
          width: 210mm; height: 297mm; background: white;
          margin: 0 auto 16px auto; padding: 12mm 15mm;
          display: flex; flex-direction: column; position: relative;
          box-shadow: 0 4px 32px rgba(0,0,0,0.15); overflow: hidden;
          font-family: 'IBM Plex Mono', monospace;
        }
      `}</style>

      {/* ── PRINT BUTTON ── */}
      <div className="no-print flex justify-center mb-4 gap-3 flex-wrap">
        <button onClick={() => window.print()}
          className="px-6 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-slate-700 transition">
          🖨️ PDF Çıktısı Al (Ctrl+P)
        </button>
        <span className="text-slate-500 text-[10px] self-center font-bold">
          Toplam Sayfa: {20 + subdChunks.length} | Motor: ALFA-XRAY-V2.0
        </span>
      </div>

      {/* ═══════════════════════════════════════
          SAYFA 1 — KAPAK
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <div className="w-full h-full border-[8px] border-double border-slate-800 flex flex-col items-center justify-between p-10">
          <div className="text-center space-y-3 w-full">
            <ShieldCheck size={64} className="text-slate-800 mx-auto" />
            <div className="inline-block px-3 py-1 border border-red-600 text-red-600 text-[8px] font-black uppercase tracking-[0.4em]">
              GİZLİDİR — SADECE YETKİLİ KULLANICILARA AÇIKTIR
            </div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
              ALFA YAPAY ZEKA<br/>
              <span className="text-xl">SİBER GÜVENLİK BİRİMİ</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 tracking-[0.5em] uppercase">
              Gerçek X-RAY Penetrasyon Test Raporu — V2.0
            </p>
          </div>

          <div className="w-full text-center space-y-4">
            <div className="py-6 border-y-2 border-slate-800">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">HEDEF KURULUŞ / DOMAIN</p>
              <p className="text-3xl font-black text-slate-900 lowercase">www.{target}</p>
              <p className="text-[9px] font-bold text-slate-400 mt-1">IP: {ipAddress}</p>
            </div>
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto text-left">
              <div><p className="text-[7px] font-black text-slate-400 uppercase">Rapor No</p><p className="text-[8px] font-bold text-slate-700">#{reportId?.substring(0, 8)}</p></div>
              <div><p className="text-[7px] font-black text-slate-400 uppercase">Tarih</p><p className="text-[8px] font-bold text-slate-700">{new Date().toLocaleDateString('tr-TR')}</p></div>
              <div><p className="text-[7px] font-black text-slate-400 uppercase">Süre</p><p className="text-[8px] font-bold text-slate-700">{scanDurationSec}s</p></div>
              <div><p className="text-[7px] font-black text-slate-400 uppercase">Motor</p><p className="text-[8px] font-bold text-slate-700">XRAY-V2.0</p></div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[8px] font-black text-slate-300 tracking-[0.35em] uppercase">
              ALFA YAPAY ZEKA — ALFA-XRAY FULL PENTEST ENGINE V2.0
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SAYFA 2 — YÖNETİCİ ÖZETİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum="2" section="Yönetici Özeti (Executive Summary)" icon={FileText} />

        <div className="flex gap-4 mb-4">
          <div className={`text-[80px] font-black leading-none ${gradeColor()} shrink-0`}>{grade}</div>
          <div className="flex-1 space-y-1 pt-2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Genel Güvenlik Skoru</p>
            <p className="text-3xl font-black text-slate-900">{overallScore} <span className="text-sm text-slate-400">/ 10.0</span></p>
            <p className="text-[8px] text-slate-400 font-bold">Tarama: {scanDurationSec}s · {new Date().toLocaleDateString('tr-TR')} · Motor: ALFA-XRAY-V2.0</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {[
                { k: 'Subdomain', v: `${subs.length} tespit edildi` },
                { k: 'Açık Port', v: `${s?.s2?.openPorts?.length || 0} / 17` },
                { k: 'HTTP Bulgu', v: `${s?.s3?.findings?.filter(f => f.severity !== 'OK').length || 0} eksik başlık` },
                { k: 'SSL Labs', v: sslGrade?.grade || 'N/A' },
                { k: 'Teknoloji', v: `${technologies?.length || 0} tespit` },
                { k: 'Cookie Risk', v: cookies?.some(c => c.overallRisk === 'HIGH' || c.overallRisk === 'CRITICAL') ? 'RİSKLİ' : 'NORMAL' },
              ].map((kv, i) => (
                <span key={i} className="text-[7px] font-black px-2 py-0.5 bg-slate-100 rounded-full text-slate-600 uppercase">
                  {kv.k}: {kv.v}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Kritik bulgular özeti */}
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">KRİTİK BULGULAR</p>
            {[
              ...( s?.s3?.findings?.filter(f => ['HIGH','CRITICAL'].includes(f.severity)) || []),
              ...( s?.s5?.findings?.filter(f => ['HIGH','CRITICAL'].includes(f.severity)) || []),
              ...( s?.s6?.findings?.filter(f => ['HIGH','CRITICAL'].includes(f.severity)) || []),
              ...( cookies?.filter(c => c.overallRisk === 'CRITICAL').map(c => ({ item: `Cookie: ${c.name}`, severity: 'CRITICAL' })) || []),
            ].slice(0,6).map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 py-0.5">
                <XCircle size={8} className="text-red-500 shrink-0" />
                <span className="text-[8px] font-bold text-slate-700 truncate">{f.item}</span>
              </div>
            ))}
            {!( s?.s3?.findings?.some(f => ['HIGH','CRITICAL'].includes(f.severity))) && (
              <div className="flex items-center gap-1.5"><CheckCircle size={8} className="text-emerald-500" /><span className="text-[8px] text-emerald-600 font-bold">Kritik açık tespit edilmedi</span></div>
            )}
          </div>

          {/* Güçlü yönler */}
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">GÜÇLÜ YÖNLER</p>
            {[
              ...( s?.s3?.findings?.filter(f => f.severity === 'OK') || []),
              ...( s?.s4?.findings?.filter(f => f.severity === 'OK') || []),
              ...( s?.s5?.findings?.filter(f => f.severity === 'OK') || []),
            ].slice(0,6).map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 py-0.5">
                <CheckCircle size={8} className="text-emerald-500 shrink-0" />
                <span className="text-[8px] font-bold text-slate-700 truncate">{f.item}</span>
              </div>
            ))}
          </div>

          {/* Öneriler */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl col-span-2">
            <p className="text-[8px] font-black text-amber-700 uppercase tracking-[0.2em] mb-2">⚡ ACİL ÖNERİLER</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {[
                !isHTTPS && 'HTTPS zorunlu hale getirilmeli',
                s?.s3?.findings?.find(f => f.item.includes('HSTS') && f.severity !== 'OK') && 'HSTS başlığı aktif edilmeli',
                s?.s3?.findings?.find(f => f.item.includes('CSP') && f.severity !== 'OK') && 'Content-Security-Policy tanımlanmalı',
                s?.s6?.findings?.find(f => f.item.includes('SPF') && f.severity !== 'OK') && 'SPF kaydı oluşturulmalı',
                s?.s6?.findings?.find(f => f.item.includes('DMARC') && f.severity !== 'OK') && 'DMARC politikası tanımlanmalı',
                cookies?.find(c => !c.httpOnly) && 'Cookie HttpOnly flag eksikliği giderilmeli',
                corsData?.overallRisk === 'CRITICAL' && 'CORS politikası acilen düzeltilmeli',
                s?.s2?.openPorts?.some(p => p.risk === 'CRITICAL') && 'Kritik portlar kapatılmalı / güvenlik duvarı ile korunmalı',
              ].filter(Boolean).slice(0, 8).map((r, i) => (
                <div key={i} className="flex items-start gap-1 py-0.5">
                  <span className="text-amber-600 text-[9px] shrink-0">›</span>
                  <span className="text-[8px] text-amber-700 font-bold leading-tight">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SAYFA 3 — GENEL SKOR & GRADE
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum="3" section="Genel Güvenlik Skoru & Attack Surface" icon={ShieldCheck} />

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="flex justify-between w-full max-w-md px-2">
            {[
              { g: 'A+', l: 'MÜKEMMEL' }, { g: 'A', l: 'ÇOK İYİ' },
              { g: 'B', l: 'GÜVENLİ' },  { g: 'C', l: 'ORTA' },
              { g: 'D', l: 'ZAYIF' },     { g: 'F', l: 'KRİTİK' }
            ].map(item => (
              <div key={item.g} className="flex flex-col items-center">
                <span className={`text-sm font-black mb-0.5 ${grade === item.g ? gradeColor() : 'text-slate-200'}`}>{item.g}</span>
                <span className={`text-[6px] font-bold whitespace-nowrap ${grade === item.g ? gradeColor() : 'text-slate-200'}`}>{item.l}</span>
                {grade === item.g && <div className="w-6 h-0.5 bg-current rounded-full mt-1" />}
              </div>
            ))}
          </div>

          <div className={`text-[140px] font-black leading-none ${gradeColor()}`}>{grade}</div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Genel Güvenlik Skoru: {overallScore} / 10.0</p>
        </div>

        <div className="mt-3 p-4 bg-slate-50 rounded-xl">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] text-center mb-4">ATTACK SURFACE HEALTH ANALİZİ</p>
          <div className="flex justify-around items-end">
            {[
              { label: 'WEB HEADERS', val: 100 - (s?.s3?.findings?.filter(f => f.severity !== 'OK').length * 15 || 0) },
              { label: 'SSL/HTTPS',   val: 100 - (s?.s4?.findings?.filter(f => f.severity === 'HIGH').length * 25 || 0) },
              { label: 'SERVER',      val: 100 - (s?.s5?.findings?.filter(f => f.severity === 'HIGH').length * 30 || 0) },
              { label: 'DNS/MAIL',    val: 100 - (s?.s6?.findings?.filter(f => f.severity === 'HIGH').length * 25 || 0) },
              { label: 'PORTLAR',     val: 100 - (s?.s2?.openPorts?.filter(p => p.risk !== 'LOW').length * 15 || 0) },
              { label: 'COOKIE',      val: 100 - (cookies?.filter(c => c.overallRisk !== 'OK').length * 20 || 0) },
            ].map((item, i) => {
              const h = Math.max(10, Math.min(100, item.val));
              const col = h >= 80 ? 'text-emerald-500' : h >= 50 ? 'text-orange-500' : 'text-red-500';
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative w-14 h-14 mb-2">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="12" fill="transparent" />
                      <motion.circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent"
                        className={col} strokeLinecap="round" strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * h / 100) }}
                        transition={{ duration: 1.4, delay: i * 0.12 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black">%{h}</div>
                  </div>
                  <span className="text-[6px] font-black text-slate-600 uppercase">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SAYFA 4 — IP GEOLOCATION & ALTYAPI
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum="4" section="IP Coğrafya & Altyapı Analizi" icon={Map} />

        <div className="grid grid-cols-2 gap-4 flex-1">
          {/* IP Geo Bilgileri */}
          <div className="space-y-3">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">IP Geolocation — ip-api.com</p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <InfoRow label="IP Adresi"       value={ipGeo?.ip || ipAddress}          highlight />
              <InfoRow label="Ülke"             value={ipGeo?.country ? `${ipGeo.country} (${ipGeo.countryCode})` : '—'} />
              <InfoRow label="Bölge / Şehir"   value={ipGeo?.city ? `${ipGeo.city}, ${ipGeo.region}` : '—'} />
              <InfoRow label="Posta Kodu"       value={ipGeo?.zip} />
              <InfoRow label="Saat Dilimi"      value={ipGeo?.timezone} />
              <InfoRow label="ISP"              value={ipGeo?.isp} />
              <InfoRow label="Organizasyon"     value={ipGeo?.org} />
              <InfoRow label="ASN"              value={ipGeo?.asn} />
              <InfoRow label="Koordinat"        value={ipGeo?.lat ? `${ipGeo.lat}° N, ${ipGeo.lon}° E` : '—'} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Hosting IP', val: ipGeo?.isHosting ? 'EVET' : 'HAYIR', risk: ipGeo?.isHosting ? 'INFO' : 'OK' },
                { label: 'Proxy/VPN',   val: ipGeo?.isProxy  ? 'EVET' : 'HAYIR', risk: ipGeo?.isProxy  ? 'HIGH' : 'OK' },
                { label: 'Mobil IP',    val: ipGeo?.isMobile ? 'EVET' : 'HAYIR', risk: 'INFO' },
              ].map((item, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded-lg text-center">
                  <p className="text-[7px] font-black text-slate-400 uppercase mb-1">{item.label}</p>
                  <RiskBadge risk={item.risk} />
                  <p className="text-[8px] font-black text-slate-700 mt-1">{item.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DNS Kayıtları */}
          <div className="space-y-3">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">DNS Temel Kayıtlar</p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <InfoRow label="Domain"       value={target}         highlight />
              <InfoRow label="A Kaydı (IP)" value={ipAddress} />
              <InfoRow label="IP Çözümü"    value={report.ipResolved ? 'GERÇEK DNS (Canlı)' : 'SİMÜLE (Erişim Yok)'} />
              <InfoRow label="HTTP Status"  value={report.statusCode ? `${report.statusCode} ${report.statusCode === 200 ? 'OK' : ''}` : '—'} />
              <InfoRow label="Final URL"    value={report.finalUrl?.substring(0, 45)} />
              <InfoRow label="HTTPS"        value={isHTTPS ? '✓ Aktif' : '✗ Pasif'} />
            </div>

            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mt-3">MX Kayıtları (Mail Sunucu)</p>
            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              {s?.s6?.details?.mxRecords?.length > 0
                ? s.s6.details.mxRecords.map((mx, i) => (
                    <div key={i} className="flex items-center gap-2 py-0.5">
                      <Mail size={8} className="text-slate-400 shrink-0" />
                      <span className="text-[8px] font-bold text-slate-700">{mx}</span>
                    </div>
                  ))
                : <p className="text-[8px] text-red-600 font-bold">MX kaydı tespit edilmedi</p>
              }
            </div>
          </div>
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SAYFA 5 — WHOIS / RDAP
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum="5" section="Domain WHOIS & RDAP Kayıt Analizi" icon={Globe} />

        {whoisData?.success ? (
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Kayıt Bilgileri — rdap.org</p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                <InfoRow label="Domain Adı"      value={whoisData.domainName}      highlight />
                <InfoRow label="Unicode Adı"     value={whoisData.unicodeName} />
                <InfoRow label="Registrar"       value={whoisData.registrar} />
                <InfoRow label="Registrant Org"  value={whoisData.registrantOrg} />
                <InfoRow label="Kayıt Tarihi"    value={fmtDate(whoisData.createdDate)} />
                <InfoRow label="Güncelleme"      value={fmtDate(whoisData.updatedDate)} />
                <InfoRow label="Bitiş Tarihi"    value={fmtDate(whoisData.expiryDate)} />
              </div>

              {/* Bitiş tarihi uyarısı */}
              {whoisData.expiryDate && (() => {
                const daysLeft = Math.floor((new Date(whoisData.expiryDate) - Date.now()) / 86400000);
                return daysLeft < 90 ? (
                  <div className={`p-2 rounded-lg border ${daysLeft < 30 ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'}`}>
                    <p className={`text-[8px] font-black uppercase ${daysLeft < 30 ? 'text-red-700' : 'text-amber-700'}`}>
                      ⚠️ Domain {daysLeft} gün içinde sona eriyor!
                    </p>
                  </div>
                ) : null;
              })()}
            </div>

            <div className="space-y-3">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Nameserverlar</p>
              <div className="p-3 bg-slate-50 rounded-xl">
                {whoisData.nameservers?.length > 0
                  ? whoisData.nameservers.map((ns, i) => (
                      <div key={i} className="flex items-center gap-2 py-0.5">
                        <Server size={8} className="text-slate-400" />
                        <span className="text-[8px] font-bold text-slate-700">{ns}</span>
                      </div>
                    ))
                  : <p className="text-[8px] text-slate-400">Nameserver bilgisi alınamadı</p>
                }
              </div>

              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Domain Durumu</p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                {whoisData.status?.length > 0
                  ? whoisData.status.map((st, i) => (
                      <div key={i} className="flex items-center gap-2 py-0.5">
                        <CheckCircle size={8} className="text-emerald-500" />
                        <span className="text-[8px] font-bold text-slate-700">{st}</span>
                      </div>
                    ))
                  : <p className="text-[8px] text-slate-400">Durum bilgisi yok</p>
                }
              </div>

              {whoisData.notices?.length > 0 && (
                <>
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Notlar</p>
                  <div className="p-3 bg-amber-50 rounded-xl">
                    {whoisData.notices.map((n, i) => (
                      <p key={i} className="text-[8px] text-amber-700 font-bold py-0.5">{n}</p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-slate-50 rounded-xl">
              <Info size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[10px] font-black text-slate-400 uppercase">RDAP Sorgusu Başarısız</p>
              <p className="text-[8px] text-slate-300 mt-1">Domain: {target}</p>
            </div>
          </div>
        )}

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SAYFA 6+ — SUBDOMAIN ENUMERATION (DİNAMİK)
      ═══════════════════════════════════════ */}
      {subdChunks.length > 0 ? subdChunks.map((chunk, chunkIdx) => (
        <div key={`sub-${chunkIdx}`} className="a4-page">
          <PageHeader
            pageNum={`${6 + chunkIdx} — Subdomain ${chunkIdx + 1}/${subdChunks.length}`}
            section={`Subdomain Enumeration — crt.sh (${subs.length} Kayıt)`}
            icon={Network}
          />
          {chunkIdx === 0 && (
            <div className="mb-2 p-2 bg-sky-50 border border-sky-200 rounded-lg flex items-center gap-2">
              <Info size={10} className="text-sky-600 shrink-0" />
              <p className="text-[8px] text-sky-700 font-bold">
                Kaynak: crt.sh Certificate Transparency API — {subdomainData?.total || subs.length} benzersiz subdomain tespit edildi, {subs.length} tanesi raporlanıyor.
              </p>
            </div>
          )}
          <div className="flex-1 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-[7px] font-black uppercase px-2 py-2">#</th>
                  <th className="text-[7px] font-black uppercase px-2 py-2">Subdomain</th>
                  <th className="text-[7px] font-black uppercase px-2 py-2">SSL Issuer</th>
                  <th className="text-[7px] font-black uppercase px-2 py-2">Sertifika Bitiş</th>
                  <th className="text-[7px] font-black uppercase px-2 py-2">CT Log Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {chunk.map((sub, i) => {
                  const globalIdx = chunkIdx * 14 + i;
                  const isExpired = sub.notAfter && new Date(sub.notAfter) < new Date();
                  return (
                    <tr key={i} className={globalIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="text-[7px] font-black text-slate-400 px-2 py-1">{globalIdx + 1}</td>
                      <td className="text-[8px] font-bold text-slate-800 px-2 py-1 max-w-0">
                        <span className="block truncate">{sub.subdomain}</span>
                      </td>
                      <td className="text-[7px] text-slate-500 px-2 py-1 max-w-0">
                        <span className="block truncate">{sub.issuer?.replace(/^CN=|,.*$/g, '').substring(0, 25) || '—'}</span>
                      </td>
                      <td className={`text-[7px] font-bold px-2 py-1 ${isExpired ? 'text-red-600' : 'text-slate-600'}`}>
                        {sub.notAfter ? new Date(sub.notAfter).toLocaleDateString('tr-TR') : '—'}
                        {isExpired && ' ⚠️'}
                      </td>
                      <td className="text-[7px] text-slate-400 px-2 py-1">
                        {sub.loggedAt ? new Date(sub.loggedAt).toLocaleDateString('tr-TR') : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <PageFooter reportId={reportId} domain={domain} />
        </div>
      )) : (
        <div className="a4-page">
          <PageHeader pageNum="6" section="Subdomain Enumeration — crt.sh" icon={Network} />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-emerald-50 rounded-xl">
              <CheckCircle size={32} className="text-emerald-400 mx-auto mb-3" />
              <p className="text-[10px] font-black text-emerald-700 uppercase">Subdomain Tespit Edilmedi</p>
              <p className="text-[8px] text-emerald-500 mt-1">crt.sh sertifika loglarında {target} için kayıt bulunamadı.</p>
            </div>
          </div>
          <PageFooter reportId={reportId} domain={domain} />
        </div>
      )}

      {/* ═══════════════════════════════════════
          AĞIRLAMA SAYFA — AĞ & PORT ANALİZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${6 + subdChunks.length}`} section="Domain & Ağ Analizi — TCP Port Tarama" icon={Network} />

        <div className="mb-3 p-3 bg-slate-50 rounded-lg grid grid-cols-3 gap-3">
          <div><p className="text-[7px] font-black text-slate-400 uppercase">Domain</p><p className="text-[9px] font-bold text-slate-800">{target}</p></div>
          <div><p className="text-[7px] font-black text-slate-400 uppercase">IP Adresi</p><p className="text-[9px] font-bold text-slate-800">{ipAddress}</p></div>
          <div><p className="text-[7px] font-black text-slate-400 uppercase">DNS Çözüm</p><p className="text-[9px] font-bold text-slate-800">{report.ipResolved ? 'GERÇEK' : 'SİMÜLE'}</p></div>
        </div>

        <div className="flex-1">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s?.s2?.title} — Açık Port Listesi</p>
          {s?.s2?.openPorts?.length === 0 ? (
            <div className="p-3 bg-emerald-50 rounded-lg flex items-center gap-2">
              <CheckCircle size={12} className="text-emerald-500" />
              <p className="text-[9px] font-bold text-emerald-700">17 kritik portta açık port tespit edilmedi — ağ güvenli görünüyor.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    {['Port', 'Servis', 'Risk Seviyesi', 'Durum', 'Açıklama'].map(h => (
                      <th key={h} className="text-[7px] font-black uppercase tracking-wide px-3 py-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.s2.openPorts.map((p, i) => {
                    const desc = {
                      21: 'FTP — şifresiz veri transferi', 22: 'SSH — uzak yönetim',
                      23: 'Telnet — şifresiz protokol', 25: 'SMTP — mail relay',
                      445: 'SMB — ağ paylaşımı saldırı yüzeyi', 3306: 'MySQL — veritabanı',
                      3389: 'RDP — uzak masaüstü', 6379: 'Redis — şifresiz', 27017: 'MongoDB — şifresiz',
                    }[p.port] || 'Standart servis';
                    return (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="text-[9px] font-black text-slate-800 px-3 py-1.5">{p.port}</td>
                        <td className="text-[9px] font-bold text-slate-600 px-3 py-1.5">{p.service}</td>
                        <td className="px-3 py-1.5"><SeverityBadge sev={p.risk} /></td>
                        <td className="text-[8px] font-black text-emerald-600 px-3 py-1.5">AÇIK</td>
                        <td className="text-[7px] text-slate-400 px-3 py-1.5">{desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-3 p-2 bg-slate-50 rounded-lg flex items-center justify-between">
          <p className="text-[8px] font-black text-slate-500 uppercase">Toplam Taranan: 17 port | Ping: {s?.s2?.pingLatency}</p>
          <p className="text-[8px] font-black text-slate-500 uppercase">Açık: {s?.s2?.openPorts?.length} | Kapalı: {17 - (s?.s2?.openPorts?.length || 0)}</p>
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          WEB GÜVENLİK BAŞLIKLARI & SSL
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${7 + subdChunks.length}`} section="Web Güvenlik Başlıkları & SSL/TLS" icon={Lock} />
        <div className="mb-4">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s?.s3?.title}</p>
          <div className="space-y-0.5">{s?.s3?.findings?.map((f, i) => <FindingRow key={i} {...f} />)}</div>
        </div>
        <div className="flex-1">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s?.s4?.title}</p>
          <div className="space-y-0.5">{s?.s4?.findings?.map((f, i) => <FindingRow key={i} {...f} />)}</div>
        </div>
        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SSL LABS DERİN ANALİZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${8 + subdChunks.length}`} section="SSL Labs Derin TLS Analizi" icon={Lock} />

        {sslGrade?.grade && sslGrade.grade !== 'N/A' && sslGrade.grade !== 'ANALIZ_DEVAM' ? (
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className={`text-[60px] font-black leading-none ${
                  sslGrade.grade.startsWith('A') ? 'text-emerald-500' :
                  sslGrade.grade === 'B' ? 'text-yellow-500' :
                  sslGrade.grade === 'C' ? 'text-orange-500' : 'text-red-600'
                }`}>{sslGrade.grade}</div>
                <div>
                  <p className="text-[8px] font-black text-slate-500 uppercase">SSL Labs Grade</p>
                  <p className="text-[8px] font-bold text-slate-600">{sslGrade.statusMessage}</p>
                  <p className="text-[7px] text-slate-400">{sslGrade.ipAddress}</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Sertifika Detayları</p>
                <InfoRow label="Issuer"       value={sslGrade.cert?.issuer?.substring(0, 40)} />
                <InfoRow label="Konu"         value={sslGrade.cert?.subject?.substring(0, 35)} />
                <InfoRow label="Başlangıç"    value={fmtDate(sslGrade.cert?.notBefore)} />
                <InfoRow label="Bitiş"        value={fmtDate(sslGrade.cert?.notAfter)} highlight />
                <InfoRow label="Kalan Gün"    value={sslGrade.cert?.daysUntilExpiry != null
                  ? `${sslGrade.cert.daysUntilExpiry} gün ${sslGrade.cert.daysUntilExpiry < 30 ? '⚠️ UYARI' : ''}` : '—'} />
                <InfoRow label="Anahtar Uzun." value={sslGrade.cert?.keyStrength ? `${sslGrade.cert.keyStrength} bit` : '—'} />
                <InfoRow label="İmza Alg."    value={sslGrade.cert?.sigAlg} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">TLS Protokolleri</p>
                {sslGrade.protocols?.length > 0
                  ? sslGrade.protocols.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 py-0.5">
                        <CheckCircle size={8} className="text-emerald-500" />
                        <span className="text-[8px] font-bold text-slate-700">{p}</span>
                      </div>
                    ))
                  : <p className="text-[8px] text-slate-400">Protokol verisi yok</p>
                }
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Bilinen Zafiyetler</p>
                {Object.entries(sslGrade.vulnerabilities || {}).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-0.5">
                    <span className="text-[8px] font-bold text-slate-600 uppercase">{k}</span>
                    {v
                      ? <span className="text-[7px] font-black text-red-600 bg-red-100 px-1.5 py-0.5 rounded">ZAFIYETLI</span>
                      : <span className="text-[7px] font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">KORUNAKLI</span>
                    }
                  </div>
                ))}
              </div>
              {sslGrade.cert?.altNames?.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">SAN (Subject Alt Names)</p>
                  {sslGrade.cert.altNames.slice(0, 8).map((n, i) => (
                    <p key={i} className="text-[7px] font-bold text-slate-600">{n}</p>
                  ))}
                  {sslGrade.cert.altNames.length > 8 && (
                    <p className="text-[7px] text-slate-400">+{sslGrade.cert.altNames.length - 8} daha...</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-slate-50 rounded-xl max-w-sm">
              <Lock size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[10px] font-black text-slate-500 uppercase">
                {sslGrade?.grade === 'ANALIZ_DEVAM' ? 'SSL Labs Analizi Devam Ediyor' : 'SSL Labs Verisi Mevcut Değil'}
              </p>
              <p className="text-[8px] text-slate-400 mt-2 leading-relaxed">
                Önbellek bulunamadı. Hızlı SSL raporu için:<br/>
                <strong>ssllabs.com/ssltest/</strong> adresinde test yapın,<br/>
                ardından bu raporu tekrar oluşturun.
              </p>
            </div>
          </div>
        )}

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          COOKİE GÜVENLİK ANALİZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${9 + subdChunks.length}`} section="Cookie Güvenlik Analizi" icon={Cookie} />

        {cookies && cookies.length > 0 ? (
          <div className="flex-1 space-y-3">
            <div className="p-2 bg-slate-50 rounded-lg flex items-center justify-between">
              <p className="text-[8px] font-black text-slate-500 uppercase">Tespit Edilen Cookie Sayısı: {cookies.length}</p>
              <p className="text-[8px] font-black text-slate-500 uppercase">
                Riskli: {cookies.filter(c => c.overallRisk !== 'OK').length} | Güvenli: {cookies.filter(c => c.overallRisk === 'OK').length}
              </p>
            </div>
            {cookies.slice(0, 5).map((c, i) => (
              <div key={i} className={`p-3 rounded-xl border-l-4 ${
                c.overallRisk === 'CRITICAL' ? 'border-red-600 bg-red-50' :
                c.overallRisk === 'HIGH'     ? 'border-orange-500 bg-orange-50' :
                c.overallRisk === 'MEDIUM'   ? 'border-yellow-400 bg-yellow-50' :
                'border-emerald-500 bg-emerald-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-slate-800 uppercase">{c.name}</p>
                  <RiskBadge risk={c.overallRisk} />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[
                    { k: 'HttpOnly', v: c.httpOnly, ok: c.httpOnly },
                    { k: 'Secure',   v: c.secure,   ok: c.secure   },
                    { k: 'SameSite', v: c.sameSite, ok: c.sameSite && c.sameSite !== 'Tanımsız' },
                    { k: 'Path',     v: c.path,     ok: true },
                  ].map((attr, j) => (
                    <div key={j} className="text-center">
                      <p className="text-[6px] font-black text-slate-400 uppercase">{attr.k}</p>
                      <p className={`text-[8px] font-black ${attr.ok ? 'text-emerald-700' : 'text-red-700'}`}>
                        {typeof attr.v === 'boolean' ? (attr.v ? '✓' : '✗') : (attr.v || '—')}
                      </p>
                    </div>
                  ))}
                </div>
                {c.issues?.length > 0 && (
                  <div className="space-y-0.5">
                    {c.issues.map((iss, j) => (
                      <p key={j} className="text-[7px] text-slate-600 font-bold">
                        <span className="text-red-500">›</span> [{iss.severity}] {iss.fix}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-emerald-50 rounded-xl">
              <CheckCircle size={32} className="text-emerald-400 mx-auto mb-3" />
              <p className="text-[10px] font-black text-emerald-700 uppercase">Set-Cookie Başlığı Tespit Edilmedi</p>
              <p className="text-[8px] text-emerald-500 mt-1">Sunucu HTTP yanıtında oturum çerezi döndürmiyor.</p>
            </div>
          </div>
        )}

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          CORS POLİTİKA ANALİZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${10 + subdChunks.length}`} section="CORS Politika Analizi" icon={Wifi} />

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl space-y-0.5">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">CORS Başlık Değerleri</p>
              <InfoRow label="Access-Control-Allow-Origin"      value={corsData?.allowOrigin      || 'Tanımsız'} highlight />
              <InfoRow label="Access-Control-Allow-Credentials" value={corsData?.allowCredentials  ? 'TRUE ⚠️' : 'false'} />
              <InfoRow label="Access-Control-Allow-Methods"     value={corsData?.allowMethods      || '—'} />
              <InfoRow label="Access-Control-Allow-Headers"     value={corsData?.allowHeaders?.substring(0, 40) || '—'} />
              <InfoRow label="Access-Control-Max-Age"           value={corsData?.maxAge            || '—'} />
              <InfoRow label="OPTIONS Yanıt Kodu"               value={corsData?.statusCode?.toString() || '—'} />
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">CORS Risk Değerlendirmesi</p>
              <div className={`p-4 rounded-xl border-2 text-center mb-3 ${
                corsData?.overallRisk === 'CRITICAL' ? 'border-red-600 bg-red-50'  :
                corsData?.overallRisk === 'HIGH'     ? 'border-orange-500 bg-orange-50' :
                corsData?.overallRisk === 'OK'       ? 'border-emerald-500 bg-emerald-50' :
                'border-slate-300 bg-slate-50'
              }`}>
                <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Genel Risk</p>
                <RiskBadge risk={corsData?.overallRisk || 'UNKNOWN'} />
              </div>
              {corsData?.findings?.map((f, i) => (
                <div key={i} className={`p-2 rounded-lg mb-2 ${
                  f.severity === 'CRITICAL' ? 'bg-red-50 border border-red-200' :
                  f.severity === 'HIGH'     ? 'bg-orange-50 border border-orange-200' :
                  'bg-slate-50 border border-slate-200'
                }`}>
                  <p className="text-[8px] font-black text-slate-800 mb-0.5">{f.issue}</p>
                  <p className="text-[7px] text-slate-600">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CORS Açıklaması */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-[8px] font-black text-amber-800 uppercase mb-1">CORS Nedir? — Teknik Açıklama</p>
            <p className="text-[7.5px] text-amber-700 leading-relaxed">
              Cross-Origin Resource Sharing (CORS), tarayıcıların farklı originlerden gelen API isteklerini kısıtlayan güvenlik mekanizmasıdır.
              Yanlış yapılandırılmış CORS politikaları; kimlik doğrulamalı isteklerin yetkisiz kaynaklardan yapılmasına,
              kullanıcı verilerinin çalınmasına ve CSRF saldırılarına zemin hazırlar.
              Wildcard (*) origin kullanımı credentials:true ile birleştiğinde kritik güvenlik açığı oluşturur.
            </p>
          </div>
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          TEKNOLOJİ PARMAK İZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${11 + subdChunks.length}`} section="Teknoloji Parmak İzi Analizi" icon={Cpu} />

        {technologies && technologies.length > 0 ? (
          <div className="flex-1 space-y-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              <p className="text-[8px] font-black text-slate-500 uppercase">
                Toplam {technologies.length} teknoloji tespit edildi — Kaynak: HTTP response headers + HTML body analizi
              </p>
            </div>

            {/* Kategori bazlı grupla */}
            {(() => {
              const groups = {};
              technologies.forEach(t => {
                if (!groups[t.category]) groups[t.category] = [];
                groups[t.category].push(t);
              });
              return Object.entries(groups).map(([cat, items]) => (
                <div key={cat}>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((tech, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 rounded-lg border border-slate-200">
                        <Tag size={8} className="text-slate-500" />
                        <span className="text-[8px] font-black text-slate-800">{tech.name}</span>
                        <span className="text-[6px] font-bold text-slate-400 ml-0.5">via {tech.source?.split(' ')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}

            {/* Risk notu */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-[8px] font-black text-amber-800 uppercase mb-1">⚠️ Teknoloji İfşası Riski</p>
              <p className="text-[7.5px] text-amber-700 leading-relaxed">
                Tespit edilen teknolojilerin (özellikle CMS versiyonları, framework sürümleri) kamuya açık olması,
                saldırganların hedefli CVE aramasını kolaylaştırır. Server, X-Powered-By ve HTML yorumları
                mümkün olduğunca gizlenmelidir.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-emerald-50 rounded-xl">
              <CheckCircle size={32} className="text-emerald-400 mx-auto mb-3" />
              <p className="text-[10px] font-black text-emerald-700 uppercase">Teknoloji Tespit Edilemedi</p>
              <p className="text-[8px] text-emerald-500 mt-1">Sunucu teknolojisi bilgisi gizlenmiş veya erişilemiyor.</p>
            </div>
          </div>
        )}

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          IP İTİBAR ANALİZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${12 + subdChunks.length}`} section="IP İtibar & Tehdit İstihbaratı Analizi" icon={Eye} />

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">AlienVault OTX — {target}</p>
              <div className="space-y-0.5">
                <InfoRow label="Tehdit Raporu Sayısı" value={ipReputation?.pulseCount?.toString()} highlight />
                <InfoRow label="Zararlı Yazılım Sayısı" value={ipReputation?.malwareCount?.toString()} />
                <InfoRow label="URL Tespit Sayısı"    value={ipReputation?.urlCount?.toString()} />
                <InfoRow label="Pasif DNS Kaydı"      value={ipReputation?.passiveDnsCount?.toString()} />
                <InfoRow label="İtibar Skoru"          value={ipReputation?.reputation?.toString()} />
                <InfoRow label="Ülke"                  value={ipReputation?.countryCode} />
                <InfoRow label="ASN (OTX)"             value={ipReputation?.asn} />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 text-center"
              style={{ borderColor: ipReputation?.isMalicious ? '#dc2626' : '#10b981',
                backgroundColor: ipReputation?.isMalicious ? '#fef2f2' : '#f0fdf4' }}>
              {ipReputation?.isMalicious
                ? <><ShieldAlert size={48} className="text-red-500 mb-3" />
                    <p className="text-[10px] font-black text-red-700 uppercase tracking-wide">KÖTÜ AMAÇLI AKTİVİTE TESPİT EDİLDİ</p>
                    <p className="text-[8px] text-red-500 mt-1">{ipReputation.pulseCount} tehdit raporu mevcut</p></>
                : <><ShieldCheck size={48} className="text-emerald-500 mb-3" />
                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wide">TEMİZ İTİBAR</p>
                    <p className="text-[8px] text-emerald-500 mt-1">AlienVault OTX'te aktif tehdit kaydı yok</p></>
              }
              {!ipReputation?.success && (
                <p className="text-[8px] text-slate-400 mt-2">OTX API yanıt vermedi — manuel kontrol önerilir</p>
              )}
            </div>
          </div>

          {ipReputation?.tags?.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">OTX Tehdit Etiketleri</p>
              <div className="flex flex-wrap gap-1.5">
                {ipReputation.tags.map((tag, i) => (
                  <span key={i} className="text-[7px] font-black px-2 py-0.5 bg-red-100 text-red-700 rounded-full uppercase">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl">
            <p className="text-[8px] font-black text-sky-800 uppercase mb-1">ℹ️ Tehdit İstihbaratı Hakkında</p>
            <p className="text-[7.5px] text-sky-700 leading-relaxed">
              AlienVault OTX (Open Threat Exchange), dünya genelinde 100.000+ güvenlik uzmanının paylaştığı
              tehdit verilerini içeren açık kaynaklı bir istihbarat platformudur. Bir domain veya IP adresinin
              bu veritabanında kayıtlı olması, geçmişte zararlı faaliyet yürütüldüğünü gösterir.
            </p>
          </div>
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SİTEMAP ANALİZİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${13 + subdChunks.length}`} section="Sitemap & URL Mimarisi Analizi" icon={FileText} />

        {sitemapData?.found ? (
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              {[
                { k: 'Toplam URL', v: sitemapData.urlCount },
                { k: 'Sitemap Yolu', v: sitemapData.sitemapPath },
                { k: 'Tip', v: sitemapData.isIndex ? 'Sitemap Index' : 'Tekil Sitemap' },
                { k: 'Medya', v: [sitemapData.hasImages && 'Resim', sitemapData.hasNews && 'Haber', sitemapData.hasVideo && 'Video'].filter(Boolean).join(', ') || 'Yok' },
              ].map((kv, i) => (
                <div key={i} className="p-2 bg-slate-50 rounded-lg text-center">
                  <p className="text-[7px] font-black text-slate-400 uppercase">{kv.k}</p>
                  <p className="text-[9px] font-black text-slate-800 mt-0.5">{kv.v}</p>
                </div>
              ))}
            </div>

            {sitemapData.categories?.length > 0 && (
              <div>
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">URL Kategorileri (İlk Yol Segmentine Göre)</p>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="text-[7px] font-black uppercase px-3 py-2">Yol</th>
                        <th className="text-[7px] font-black uppercase px-3 py-2">URL Sayısı</th>
                        <th className="text-[7px] font-black uppercase px-3 py-2">Oran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sitemapData.categories.slice(0,10).map((cat, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="text-[9px] font-bold text-slate-800 px-3 py-1.5">/{cat.path}</td>
                          <td className="text-[9px] font-bold text-slate-600 px-3 py-1.5">{cat.count}</td>
                          <td className="text-[8px] text-slate-400 px-3 py-1.5">
                            %{Math.round((cat.count / sitemapData.urlCount) * 100)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Örnek URL'ler (İlk 15)</p>
              <div className="p-2 bg-slate-50 rounded-lg space-y-0.5">
                {sitemapData.urls?.slice(0, 15).map((url, i) => (
                  <p key={i} className="text-[7px] font-mono text-slate-600 truncate">{url}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-8 bg-slate-50 rounded-xl">
              <FileText size={32} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[10px] font-black text-slate-400 uppercase">Sitemap Bulunamadı</p>
              <p className="text-[8px] text-slate-300 mt-1">sitemap.xml, sitemap_index.xml, wp-sitemap.xml kontrol edildi.</p>
              <p className="text-[8px] text-amber-600 font-bold mt-2">ℹ️ Sitemap eksikliği SEO ve tarama görünürlüğünü olumsuz etkiler.</p>
            </div>
          </div>
        )}

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          SUNUCU & KRİTİK BULGULAR
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${14 + subdChunks.length}`} section="Kritik Bulgular & Server Exposure" icon={ShieldAlert} />

        <div className="mb-3">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s?.s5?.title}</p>
          <div className="space-y-0.5">{s?.s5?.findings?.map((f, i) => <FindingRow key={i} {...f} />)}</div>
        </div>

        <div className="mb-3">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s?.s6?.title}</p>
          <div className="space-y-0.5">{s?.s6?.findings?.map((f, i) => <FindingRow key={i} {...f} />)}</div>
        </div>

        <div className="flex-1">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">GENEL DEĞERLENDİRME — KRİTİK BULGULAR</p>
          {(() => {
            const kritikBulgular = [
              ...( s?.s3?.findings?.filter(f => ['HIGH','CRITICAL','MEDIUM'].includes(f.severity)) || []),
              ...( s?.s5?.findings?.filter(f => ['HIGH','CRITICAL'].includes(f.severity)) || []),
              ...( s?.s6?.findings?.filter(f => ['HIGH','CRITICAL'].includes(f.severity)) || []),
            ].slice(0, 5);
            return kritikBulgular.length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-500" />
                <div>
                  <p className="text-[10px] font-black text-emerald-700">KRİTİK ZAFİYET TESPİT EDİLMEDİ</p>
                  <p className="text-[8px] text-emerald-600">Sistem güvenlik başlıkları ve DNS yapılandırması kabul edilebilir düzeyde.</p>
                </div>
              </div>
            ) : (
              <div className={`grid gap-2 ${kritikBulgular.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {kritikBulgular.map((f, idx) => {
                  const isDanger = ['HIGH','CRITICAL'].includes(f.severity);
                  return (
                    <div key={idx} className={`p-3 bg-slate-50 border rounded-lg ${idx === 0 ? 'col-span-2 border-l-8' : 'border-t-4'} ${isDanger ? 'border-red-500' : 'border-orange-400'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-[9px] font-black uppercase ${isDanger ? 'text-red-700' : 'text-orange-700'}`}>{f.item}</p>
                        <SeverityBadge sev={f.severity} />
                      </div>
                      <p className="text-[8px] text-slate-600 italic leading-snug">{f.detail}</p>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          KVKK & ISO-27001 UYUM HARİTASI
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${15 + subdChunks.length}`} section="KVKK & ISO-27001 & OWASP Uyum Haritası" icon={Key} />

        <p className="text-[8px] text-slate-500 italic mb-3">
          Aşağıdaki uyum haritası, gerçek tarama bulgularına dayanmaktadır. Her madde, sistemde tespit edilen
          somut güvenlik açıklarıyla ilişkilendirilmiştir.
        </p>

        <div className="flex-1 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="text-[7px] font-black uppercase px-2 py-2">Standart</th>
                <th className="text-[7px] font-black uppercase px-2 py-2">Kontrol</th>
                <th className="text-[7px] font-black uppercase px-2 py-2">İlgili Bulgular</th>
                <th className="text-[7px] font-black uppercase px-2 py-2 text-center">Durum</th>
              </tr>
            </thead>
            <tbody>
              {complianceItems.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="text-[7px] font-black text-slate-700 px-2 py-1.5 whitespace-nowrap">{item.standard}</td>
                  <td className="text-[7px] font-bold text-slate-600 px-2 py-1.5">
                    <span className="block">{item.control}</span>
                    <span className="text-[6px] text-slate-300">{item.ref}</span>
                  </td>
                  <td className="text-[7px] text-slate-500 px-2 py-1.5">
                    {item.relatedFindings.length > 0
                      ? item.relatedFindings.slice(0, 2).join(', ')
                      : <span className="text-emerald-500">Aktif ihlal yok</span>
                    }
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <span className={`text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                      item.status.includes('KRİTİK') ? 'bg-red-200 text-red-900' :
                      item.status === 'UYUMSUZ'       ? 'bg-red-100 text-red-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            { k: 'Uyumlu', v: complianceItems.filter(i => i.status === 'UYUMLU').length, color: 'text-emerald-600 bg-emerald-50' },
            { k: 'Uyumsuz', v: complianceItems.filter(i => i.status === 'UYUMSUZ').length, color: 'text-red-600 bg-red-50' },
            { k: 'Kritik Uyumsuz', v: complianceItems.filter(i => i.status.includes('KRİTİK')).length, color: 'text-red-900 bg-red-100' },
          ].map((kv, i) => (
            <div key={i} className={`p-2 rounded-lg ${kv.color}`}>
              <p className="text-[7px] font-black uppercase">{kv.k}</p>
              <p className="text-xl font-black">{kv.v}</p>
            </div>
          ))}
        </div>

        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          YASAL SORUMLULUK REDDİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${16 + subdChunks.length}`} section="Yasal Sorumluluk Reddi & Bilgilendirme" icon={FileText} />
        <div className="flex-1 space-y-3">
          <div className="p-3 bg-amber-50 border border-amber-400 rounded-lg flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[9px] font-black text-amber-800 uppercase tracking-wide mb-1">ÖNEMLİ — BU RAPORU OKUMADAN ÖNCE</p>
              <p className="text-[8px] text-amber-700 leading-relaxed">
                Bu raporda yer alan tüm teknik analizler; yalnızca bilgilendirme ve savunma farkındalığı yaratmak amacıyla hazırlanmıştır.
                Hiçbir başlık altında gerçek saldırı, zarar verme veya yetkisiz erişim eylemi gerçekleştirilmemiştir.
              </p>
            </div>
          </div>
          {disclaimer?.clauses?.map((clause, i) => (
            <div key={i} className="border-l-2 border-slate-300 pl-3">
              <p className="text-[8px] font-black text-slate-800 uppercase tracking-wide mb-0.5">{clause.heading}</p>
              <p className="text-[7.5px] text-slate-600 leading-relaxed">{clause.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t-2 border-slate-800 flex items-end justify-between">
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Hazırlanma Tarihi</p>
            <p className="text-[9px] font-bold text-slate-700">{new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Hazırlayan Birim</p>
            <p className="text-[9px] font-bold text-slate-700">ALFA YAPAY ZEKA SİBER ANALİZ BİRİMİ</p>
            <p className="text-[7px] font-bold text-slate-400">ERKİN GÜLER | GÜVENLİK DANIŞMANI</p>
          </div>
        </div>
        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          ARAÇ METODOLOJİSİ
      ═══════════════════════════════════════ */}
      <div className="a4-page">
        <PageHeader pageNum={`${17 + subdChunks.length}`} section="Araç Metodolojisi & Kapsam Açıklamaları" icon={FileText} />
        <p className="text-[8px] text-slate-500 italic leading-relaxed mb-4">
          Bu bölüm; endüstri standardı 8 pentest aracının bu raporda neden kullanıldığını, kısmen uygulandığını
          veya kapsam dışında bırakıldığını belgelemektedir.
        </p>
        <div className="flex-1 grid grid-cols-2 gap-2 auto-rows-min">
          {(toolMethodology || []).map((tool) => {
            const isUsed    = tool.statusClass === 'USED';
            const isPartial = tool.statusClass === 'PARTIAL';
            const isOut     = tool.statusClass === 'OUT_OF_SCOPE';

            const borderCol = isUsed    ? 'border-l-4 border-emerald-500'
                            : isPartial ? 'border-l-4 border-amber-400'
                            : isOut     ? 'border-l-4 border-red-500'
                            :             'border-l-4 border-slate-400';

            const badgeBg   = isUsed    ? 'bg-emerald-100 text-emerald-800'
                            : isPartial ? 'bg-amber-100 text-amber-800'
                            : isOut     ? 'bg-red-100 text-red-800'
                            :             'bg-slate-100 text-slate-600';

            return (
              <div key={tool.id} className={`p-2.5 bg-slate-50 rounded-lg ${borderCol}`}>
                <div className="flex items-center justify-between mb-1 gap-1">
                  <p className="text-[8px] font-black text-slate-800 leading-tight">{tool.icon} {tool.name}</p>
                  <span className={`text-[6px] font-black px-1.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wide ${badgeBg}`}>
                    {tool.status}
                  </span>
                </div>
                <p className="text-[7px] text-slate-600 leading-snug">{tool.paragraph}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-4 text-[7px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Kullanıldı</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Kısmen</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Kapsam Dışı</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400 inline-block" /> Uygulanamaz</span>
        </div>
        <PageFooter reportId={reportId} domain={domain} />
      </div>

      {/* ═══════════════════════════════════════
          DİNAMİK SAYFALAR: TEKNİK İYİLEŞTİRME (REMEDIATION)
      ═══════════════════════════════════════ */}
      {(() => {
        let currentP = 19 + subdChunks.length;
        const allFindings = [
          ...(s?.s3?.findings?.filter(f => f.severity !== 'OK' && f.severity !== 'NORMAL' && f.severity !== 'INFO') || []),
          ...(s?.s4?.findings?.filter(f => f.severity !== 'OK' && f.severity !== 'NORMAL' && f.severity !== 'INFO') || []),
          ...(s?.s5?.findings?.filter(f => f.severity !== 'OK' && f.severity !== 'NORMAL' && f.severity !== 'INFO') || []),
          ...(s?.s6?.findings?.filter(f => f.severity !== 'OK' && f.severity !== 'NORMAL' && f.severity !== 'INFO') || []),
        ];
        return allFindings.map((f, i) => (
          <RemediationSheet 
            key={`rem-${i}`} 
            finding={f} 
            reportId={reportId} 
            domain={domain} 
            pageNum={currentP + i} 
          />
        ));
      })()}

      {/* ═══════════════════════════════════════
          DİNAMİK SAYFALAR: EK-A: FORENSİK AUDIT LOGLARI
      ═══════════════════════════════════════ */}
      {Object.entries(s || {}).map(([key, section]) => {
        if (!section.logs) return null;
        const logChunks = chunkArray(section.logs, 45);
        return logChunks.map((chunk, idx) => (
          <LogAppendixPage 
            key={`log-${key}-${idx}`}
            sectionKey={key}
            title={section.title}
            logs={chunk}
            chunkIdx={idx}
            totalChunks={logChunks.length}
            reportId={reportId}
            domain={domain}
          />
        ));
      })}

      {/* ═══════════════════════════════════════
          DİNAMİK SAYFALAR: EK-B: HAM VERİ FORENSİĞİ (RAW DUMPS)
      ═══════════════════════════════════════ */}
      <RawDataAppendix title="HTTP Yanıt Başlıkları" data={report?.fullDetails?.headers || {}} reportId={reportId} domain={domain} pageId="HTTP_HEADERS" />
      <RawDataAppendix title="DNS Kayıt Seti" data={report?.fullDetails?.dns || {}} reportId={reportId} domain={domain} pageId="DNS_RECORDS" />
      <RawDataAppendix title="WHOIS RDAP Yanıtı" data={report?.whoisData || {}} reportId={reportId} domain={domain} pageId="WHOIS_RAW" />
      <RawDataAppendix title="SSL Labs Uç Nokta Detayları" data={report?.fullDetails?.sslLabs || {}} reportId={reportId} domain={domain} pageId="SSL_LABS_RAW" />
      <RawDataAppendix title="Cookie Yapılandırma Matrisi" data={report?.cookies || []} reportId={reportId} domain={domain} pageId="COOKIES_RAW" />
      <RawDataAppendix title="CORS Politika Yanıtları" data={report?.corsData || {}} reportId={reportId} domain={domain} pageId="CORS_RAW" />

      {/* ═══════════════════════════════════════
          DİNAMİK SAYFALAR: EK-C: GÜVENLİK SÖZLÜĞÜ
      ═══════════════════════════════════════ */}
      <SecurityGlossary reportId={reportId} domain={domain} />

      {/* ═══════════════════════════════════════
          RİSK ENVANTERİ & İMZA (EK-SON)
      ═══════════════════════════════════════ */}

      <div className="a4-page">
        <PageHeader pageNum="EK-SON" section="Risk Envanteri & Onay" icon={ShieldCheck} />

        <div className="mb-5">
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{s?.s7?.title}</p>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="text-[7px] font-black uppercase px-3 py-2">Varlık</th>
                  <th className="text-[7px] font-black uppercase px-3 py-2">Tür</th>
                  <th className="text-[7px] font-black uppercase px-3 py-2">Durum</th>
                </tr>
              </thead>
              <tbody>
                {s?.s7?.inventory?.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="text-[9px] font-bold text-slate-800 px-3 py-1.5">{item.asset}</td>
                    <td className="text-[8px] text-slate-500 px-3 py-1.5">{item.type}</td>
                    <td className="px-3 py-1.5">
                      <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase ${
                        item.status.includes('Güvenli') || item.status === 'Analiz Edildi' || item.status === 'Çözümlendi'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status.includes('Zafiyet') ? 'bg-red-100 text-red-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <ShieldCheck size={60} className="text-slate-800" />
          <h2 className="text-2xl font-black text-slate-900 border-y-2 border-slate-900 py-3 px-8 uppercase tracking-tighter text-center">BİRİM ONAYI</h2>
          <p className="text-[9px] italic text-slate-500 px-12 text-center leading-relaxed max-w-sm">
            "Bu belge ALFA YAPAY ZEKA Penetrasyon Test Birimi tarafından dijital olarak
            doğrulanmış ve müşteri talebi kapsamında hazırlanmıştır."
          </p>
        </div>

        <div className="flex flex-col items-center mb-4">
          <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="İmza" className="h-28 object-contain mix-blend-multiply mb-2" />
          <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">ERKİN GÜLER</p>
          <p className="text-[9px] font-black text-slate-500 tracking-[0.2em] uppercase">Siber Güvenlik Danışmanı · ALFA Siber Analiz Birimi</p>
        </div>

        <div className="w-full pt-4 border-t-2 border-slate-800 flex justify-between items-center">
          <div>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Rapor ID</p>
            <p className="text-[8px] font-bold text-slate-700">#{reportId?.substring(0, 16)}</p>
          </div>
          <div className="w-12 h-12 border border-slate-200 rounded p-0.5">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`https://verify.alfayapayzeka.com/${reportId}`)}`}
              alt="QR" className="w-full h-full opacity-40"
            />
          </div>
          <div className="text-right">
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Scan Süresi</p>
            <p className="text-[8px] font-bold text-slate-700">{scanDurationSec}s · {new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FullReportPrint;
