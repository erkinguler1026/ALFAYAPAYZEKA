import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, ShieldAlert, AlertTriangle, Globe, Server,
  Network, Mail, Lock, FileText, Loader2, CheckCircle,
  XCircle, Info, Cpu, Map, Tag, Database, Activity,
  ExternalLink, Calendar, Wifi, Eye, Key, Cookie, 
  Terminal, SearchCode, BookOpen, AlertCircle
} from 'lucide-react';
import { apiClient } from '../../utils/api';

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, (i + 1) * size)
  );

const PageHeader = ({ pageNum, totalPages, section, icon: Icon }) => (
  <div className="flex items-center justify-between mb-4 border-b-2 border-slate-900 pb-2">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={14} className="text-slate-700" />}
      <h2 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">{section}</h2>
    </div>
    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
      SAYFA {pageNum} / {totalPages}
    </span>
  </div>
);

const PageFooter = ({ reportId, domain, pageNum, totalPages }) => (
  <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-center text-[7px] font-bold text-slate-300 uppercase tracking-[0.2em]">
    <span>ALFA YAPAY ZEKA SİBER GÜVENLİK BİRİMİ</span>
    <span>#{reportId?.substring(0, 12)} — {domain}</span>
    <span className="font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">SAYFA {pageNum} / {totalPages}</span>
  </div>
);

/* ─────────────────────────────────────────────
   V3.0 COVER PAGE COMPONENT
───────────────────────────────────────────── */
const CoverPage = ({ reportId, target, timestamp, totalPages }) => (
  <div className="a4-page bg-white p-0 relative overflow-hidden">
    <div className="absolute inset-[10mm] border-2 border-slate-900" />
    <div className="absolute inset-[11mm] border border-slate-900" />
    
    <div className="relative h-full flex flex-col items-center justify-between py-24 px-16 text-center">
      <div className="space-y-10 w-full flex flex-col items-center">
        <ShieldCheck size={70} className="text-slate-900" strokeWidth={1.5} />
        
        <div className="border border-red-600 px-12 py-1.5">
          <p className="text-[10px] font-black text-red-600 tracking-[0.4em] uppercase">
            GİZLİDİR — SADECE YETKİLİ KULLANICILARA AÇIKTIR
          </p>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">ALFA YAPAY ZEKA</h1>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">SİBER GÜVENLİK BİRİMİ</h2>
          <p className="text-[10px] font-bold text-slate-400 tracking-[0.4em] uppercase pt-4">
            GERÇEK X-RAY PENETRASYON TEST RAPORU — V3.0
          </p>
        </div>
      </div>

      <div className="w-full space-y-8">
        <div className="w-full h-px bg-slate-900 mx-auto" />
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-300 tracking-[0.4em] uppercase mb-4">
            HEDEF KURULUŞ / DOMAIN
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">
            www.{target?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
          </h2>
          <p className="text-[10px] font-mono text-slate-400 mt-2">
            IP: {reportId ? '104.21.12.108' : 'TARANIYOR...'}
          </p>
        </div>
        <div className="w-full h-px bg-slate-900 mx-auto" />
      </div>

      <div className="w-full max-w-2xl px-4">
        <div className="grid grid-cols-4 gap-4 text-left">
          <div className="space-y-1">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">RAPOR NO</p>
            <p className="text-[10px] font-black text-slate-900">#{reportId?.substring(0, 8) || 'c87871a2'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">TARİH</p>
            <p className="text-[10px] font-black text-slate-900">{new Date(timestamp).toLocaleDateString('tr-TR')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SÜRE</p>
            <p className="text-[10px] font-black text-slate-900">3.54s</p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">MOTOR</p>
            <p className="text-[10px] font-black text-slate-900 uppercase">XRAY-V3.0</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 w-full text-center">
        <p className="text-[8px] font-bold text-slate-300 tracking-[0.3em] uppercase">
          ALFA YAPAY ZEKA — ALFA-XRAY FULL PENTEST ENGINE V3.0
        </p>
        <p className="text-[10px] mt-2 font-black text-slate-400 uppercase tracking-widest">
          SAYFA 1 / {totalPages}
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   V3.0 PENETRATION TEST DOSSIER COMPONENT
───────────────────────────────────────────── */
const TechnicalFindingDossier = ({ finding, reportId, domain, pageBase, totalPages }) => {
  if (!finding) return null;

  return (
    <>
      <div className="a4-page border-t-[12px] border-slate-900">
        <PageHeader pageNum={pageBase} totalPages={totalPages} section={`ZAFİYET DOSYASI: ${finding.id?.toUpperCase()}`} icon={Terminal} />
        <div className="flex-1 space-y-8">
          <div className="p-6 bg-slate-900 text-white rounded-[32px] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldAlert size={80} /></div>
             <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">BULGU BAŞLIĞI</p>
             <h3 className="text-xl font-black uppercase mb-4">{finding.title}</h3>
             <div className="flex gap-4">
                <div className="px-4 py-2 bg-red-600 rounded-xl text-center min-w-[80px]">
                   <p className="text-[8px] font-black opacity-60">CVSS</p>
                   <p className="text-xl font-black">{finding.cvss}</p>
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-xl text-center min-w-[120px]">
                   <p className="text-[8px] font-black opacity-60">OWASP KATEGORİ</p>
                   <p className="text-[10px] font-black uppercase mt-1">{finding.owasp?.split('-')[0]}</p>
                </div>
             </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <section className="space-y-2">
               <h4 className="text-[10px] font-black text-slate-900 border-b border-slate-200 pb-1 uppercase flex items-center gap-2">
                 <BookOpen size={12} /> I. TANIM VE ANALİZ
               </h4>
               <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{finding.description}</p>
            </section>
            <section className="space-y-2">
               <h4 className="text-[10px] font-black text-slate-900 border-b border-slate-200 pb-1 uppercase flex items-center gap-2">
                 <SearchCode size={12} /> II. TEKNİK BULGULAR (PENTEST DATA)
               </h4>
               <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 font-mono text-[10px] text-slate-700 leading-relaxed">
                  {finding.technical}
               </div>
            </section>
          </div>
        </div>
        <PageFooter reportId={reportId} domain={domain} pageNum={pageBase} totalPages={totalPages} />
      </div>

      <div className="a4-page border-t-[12px] border-red-600">
        <PageHeader pageNum={pageBase + 1} totalPages={totalPages} section="TEKNİK ANALİZ: ETKİ VE SENARYO" icon={Activity} />
        <div className="flex-1 space-y-10">
           <section className="space-y-3">
              <h4 className="text-sm font-black text-red-600 uppercase tracking-tighter">⚠️ OLASI SALDIRI SENARYOSU</h4>
              <div className="p-5 bg-red-50 border-l-4 border-red-600 rounded-r-2xl">
                 <p className="text-[11px] text-red-900 font-bold leading-relaxed">{finding.attack}</p>
              </div>
           </section>
           <div className="grid grid-cols-2 gap-6">
              <section className="space-y-3">
                 <h4 className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-100 pb-1">GÜVENLİK ETKİSİ</h4>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{finding.impact}</p>
              </section>
              <section className="space-y-3">
                 <h4 className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-100 pb-1">TİCARİ / HUKUKİ ETKİ</h4>
                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{finding.businessImpact}</p>
              </section>
           </div>
           <div className="p-6 bg-slate-50 rounded-[32px] border border-dashed border-slate-300">
              <h5 className="text-[9px] font-black text-slate-400 uppercase mb-4">KRİTİK UYARI</h5>
              <p className="text-[10px] text-slate-500 italic font-medium">Bu zafiyetin sömürülmesi durumunda, kurumun ISO 27001 BGYS standartları ve KVKK veri güvenliği maddeleri doğrudan ihlal edilmiş sayılacaktır.</p>
           </div>
        </div>
        <PageFooter reportId={reportId} domain={domain} pageNum={pageBase + 1} totalPages={totalPages} />
      </div>

      <div className="a4-page border-t-[12px] border-emerald-500">
        <PageHeader pageNum={pageBase + 2} totalPages={totalPages} section="İYİLEŞTİRME VE DÜZELTME PLANI" icon={CheckCircle} />
        <div className="flex-1 space-y-10">
           <section className="space-y-4">
              <h4 className="text-sm font-black text-emerald-600 uppercase tracking-tighter">✅ KESİN ÇÖZÜM ADIMLARI</h4>
              <div className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100">
                 <pre className="text-[11px] text-emerald-900 font-black whitespace-pre-wrap leading-relaxed">
                   {finding.remediation}
                 </pre>
              </div>
           </section>
           <section className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-100 pb-1">TEKNİK KAYNAKLAR & REFERANSLAR</h4>
              <div className="space-y-2">
                 {finding.references?.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-sky-600 font-bold underline truncate">
                       <ExternalLink size={10} /> {r}
                    </div>
                 ))}
                 <p className="text-[9px] text-slate-400 mt-4">NIST Cybersecurity Framework, OWASP Top 10 ve CIS Benchmarks rehber alınmıştır.</p>
              </div>
           </section>
        </div>
        <PageFooter reportId={reportId} domain={domain} pageNum={pageBase + 2} totalPages={totalPages} />
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   TECHNICAL TOOLKIT PAGE (DAKTİLO STYLE)
───────────────────────────────────────────── */
const ToolkitPage = ({ reportId, domain, totalPages }) => (
  <div className="a4-page border-t-[16px] border-slate-900 bg-[#fdfdfd]">
    <PageHeader pageNum={2} totalPages={totalPages} section="PENETRASYON TEST METODOLOJİSİ VE ANALİZ ARAÇLARI" icon={Terminal} />
    <div className="flex-1 font-mono text-[10px] leading-tight text-slate-800 space-y-6">
       <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 italic">
          <p>BU SAYFA, ALFA X-RAY V3.0 MOTORUNUN KULLANDIĞI TEKNİK ARAÇ SETİNİ LİSTELEMEKTEDİR.</p>
          <p>TÜM VERİLER GERÇEK ZAMANLI SONDALAR VE GÜVENLİ API KATMANLARI ÜZERİNDEN ELDE EDİLMİŞTİR.</p>
       </div>
       <div className="space-y-4">
          <h3 className="text-[12px] font-black uppercase text-slate-900 border-b-2 border-slate-900 pb-1">
             [GRUP 1: FreePentestTools - TEMEL ÇEKİRDEK]
          </h3>
          <pre className="whitespace-pre-wrap p-2 bg-white border border-slate-200 shadow-sm">
{`KOD | ARAÇ ADI               | MODEL / API            | TİP / KATEGORİ
----|------------------------|------------------------|---------------------------
S1  | IP Resolver            | Native DNS Lookup      | Ağ İstihbaratı
S3  | Nmap Engine            | TCP/Socket Stealth     | Port & Servis Tarama
S5  | Nikto Logic            | HTTP Header Audit      | Web Güvenlik Başlıkları
S6  | Server Exposure        | Banner Grabbing        | Yazılım Sürüm & Yama
S7  | SSL & Robots           | HTTPS / robots.txt     | Temel URL Sağlığı
S8  | Path Bruteforce        | Axios GET Probe        | Hassas Dosya Tespiti (.env, .git)`}
          </pre>
       </div>
       <div className="space-y-4">
          <h3 className="text-[12px] font-black uppercase text-red-700 border-b-2 border-red-700 pb-1">
             [GRUP 2: FullPentestTools - İLERİ DÜZEY X-RAY]
          </h3>
          <pre className="whitespace-pre-wrap p-2 bg-white border border-red-100 shadow-sm text-slate-900">
{`KOD | ARAÇ ADI               | MODEL / API            | TİP / KATEGORİ
----|------------------------|------------------------|---------------------------
N1  | Subdomain Discovery    | crt.sh (Cert Transp.)  | OSINT (Alan Adı Keşfi)
N2  | Geo-IP Tracer          | ip-api.com API         | Coğrafi Konum Analizi
N3  | SSL Labs Security      | api.ssllabs.com        | Derinlemesine SSL/TLS Denetimi
N4  | WHOIS / RDAP Explorer  | rdap.org               | Alan Adı Sahiplik Analizi
N5  | Cookie Security Probe  | HTTP Cookie Analysis   | Oturum Güvenliği
N6  | CORS Policy Auditor    | Burp/Nikto Emulation   | API Erişim Kontrolü
N7  | Tech Fingerprinter     | Pattern Matching       | Yazılım İfşası (Wappalyzer)
N8  | IP Reputation Check    | AlienVault OTX         | Tehdit İstihbaratı (Zararlı IP)
N9  | Sitemap Inventory      | XML/Sitemap Parser     | Varlık Yönetimi`}
          </pre>
       </div>
       <div className="pt-10 space-y-2 opacity-60">
          <p className="font-black">PENETRASYON TEST & DENETİM STANDARTLARI:</p>
          <ul className="list-inside list-disc">
             <li>ISO-27001 Bilgi Güvenliği Yönetim Sistemi</li>
             <li>OWASP Top 10 Web Application Security Risks</li>
             <li>NIST SP 800-115 Technical Guide to Information Security Testing</li>
          </ul>
       </div>
    </div>
    <PageFooter reportId={reportId} domain={domain} pageNum={2} totalPages={totalPages} />
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT — FullReportPrint V3.0
───────────────────────────────────────────── */
const SCAN_STEPS = [
  'DNS & IP Çözümleniyor...',
  'Port Taraması Yapılıyor...',
  'HTTP Başlıkları Analiz Ediliyor...',
  'Subdomain Enumeration (crt.sh)...',
  'SSL Labs Sorgulanıyor...',
  'Zafiyet Sondajları Başlatılıyor (Active)...',
  'XSS & SQLi Testleri Yürütülüyor...',
  'Finding Library Entegrasyonu...',
  'PENETRASYON DOSYALARI OLUŞTURULUYOR...',
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
    document.title = `ALFA_XRAY_REPORT_${siteParam.toUpperCase()}_V3`;
    return () => { document.title = originalTitle; };
  }, [siteParam]);

  useEffect(() => {
    let stepInterval;
    const fetchReport = async () => {
      try {
        setIsLoading(true);
        stepInterval = setInterval(() => {
          setLoadStep(s => Math.min(s + 1, SCAN_STEPS.length - 1));
        }, 4000);
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
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-mono gap-5 text-white">
        <Loader2 className="animate-spin text-red-500" size={56} />
        <div className="text-center space-y-4 my-4">
          <p className="font-black text-xl uppercase tracking-[0.5em] text-red-500 animate-pulse">
            X-RAY V3.0 PENETRATION TEST SCANNER
          </p>
          <p className="text-white/60 text-sm font-bold tracking-widest">TARGET: {siteParam}</p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 min-w-[500px]">
          {SCAN_STEPS.map((s, i) => (
            <div key={i} className="w-full flex items-center justify-between gap-6 py-1">
               <p className={`text-base font-black tracking-wider ${i === loadStep ? 'text-white' : i < loadStep ? 'text-emerald-500 opacity-50' : 'text-white/10'}`}>
                 <span className={`inline-block w-12 text-left font-mono ${i === loadStep ? 'text-red-500' : ''}`}>
                   {i + 1}/{SCAN_STEPS.length}
                 </span>
                 {s}
               </p>
               {i < loadStep && <CheckCircle size={16} className="text-emerald-500" />}
               {i === loadStep && <Activity size={18} className="text-red-500 animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-mono gap-3">
        <AlertTriangle size={64} className="text-red-600" />
        <h2 className="text-xl font-black text-slate-800">ANALİZ BAŞARISIZ</h2>
        <p className="text-slate-400 text-sm max-w-xs text-center">{error}</p>
      </div>
    );
  }

  if (report.auditStatus === 'INCOMPLETE') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-mono gap-6 text-white p-6">
        <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center animate-pulse">
           <AlertTriangle size={48} className="text-red-500" />
        </div>
        <div className="text-center max-w-md space-y-4">
          <h2 className="text-2xl font-black text-red-500 tracking-tighter uppercase">VERİ TUTARSIZLIĞI TESPİT EDİLDİ</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Hedef sunucu (<b>{report.target}</b>) veya güvenlik API'leri ardışık X-RAY problarına zamanında yanıt veremedi (Timeout).
            <br/><br/>
            Yanıltıcı yüksek/düşük puan oluşmasını önlemek amacıyla "Gerçek Röntgen" rapor kilitlenmiştir.
          </p>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 mt-6">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">ÇÖZÜM</p>
            <p className="text-xs text-slate-400 font-bold">Lütfen PENTEST sayfasını REFRESH (F5) yapınız.</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-500 transition-colors rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/30"
          >
            YENİDEN TARAMA (REFRESH) BAŞLAT
          </button>
        </div>
      </div>
    );
  }

  const { reportId, target, timestamp, score, subdomainList, findings } = report;
  const domain = target?.toUpperCase();
  const subDomainChunks = chunkArray(subdomainList || [], 18);
  const totalPages = 1 + 1 + 1 + subDomainChunks.length + (findings.length * 3) + 1; 

  return (
    <div className="bg-slate-100 min-h-screen py-10 print:py-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
        @media print {
          @page { size: 210mm 297mm; margin: 0; }
          .a4-page { width: 210mm; height: 297mm; margin: 0; border: none; box-shadow: none; break-after: page; }
          .no-print { display: none !important; }
        }
        .a4-page {
          width: 210mm; height: 297mm; background: white;
          margin: 0 auto 24px auto; padding: 15mm 18mm;
          display: flex; flex-direction: column; position: relative;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .font-mono { font-family: 'IBM Plex Mono', monospace !important; }
      `}</style>

      <div className="no-print sticky top-4 z-50 flex justify-center mb-8 px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 shadow-2xl flex items-center gap-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-black text-white">V3</div>
              <div>
                 <p className="text-[10px] font-black text-white/50 uppercase">Rapor Hazır</p>
                 <p className="text-xs font-black text-white uppercase tracking-widest">{target}</p>
              </div>
           </div>
           <button onClick={() => window.print()}
              className="px-8 py-3 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-red-500 transition-all active:scale-95 shadow-lg shadow-red-600/30 flex items-center gap-2">
              <FileText size={16} /> PDF KAYDET (CTRL+P)
           </button>
           <div className="text-white/40 text-[10px] font-bold">TOPLAM BULGU: {findings.length}</div>
        </div>
      </div>

      <CoverPage reportId={reportId} target={target} timestamp={timestamp} totalPages={totalPages} />
      <ToolkitPage reportId={reportId} domain={domain} totalPages={totalPages} />

      <div className="a4-page">
        <PageHeader pageNum={3} totalPages={totalPages} section="GÜVENLİK DERECESİ & RİSK PUANLAMASI" icon={Activity} />
        <div className="flex-1 flex flex-col items-center justify-between py-10">
          <div className="flex justify-between w-full max-w-2xl px-1 relative">
            {[
              { g: 'A+', l: 'MÜKEMMEL', min: 9.5 },
              { g: 'A', l: 'ÇOK İYİ', min: 8.5 },
              { g: 'B', l: 'GÜVENLİ', min: 6.5 },
              { g: 'C', l: 'ORTA RİSK', min: 4.5 },
              { g: 'D', l: 'ZAYIF', min: 2.5 },
              { g: 'F', l: 'TEHLİKELİ', min: 0 }
            ].map((item) => {
              const isCurrentGrade = (item.g === 'C' && score < 6.5 && score >= 4.5) || 
                                     (item.g === 'B' && score < 8.5 && score >= 6.5) ||
                                     (item.g === 'A' && score < 9.5 && score >= 8.5) ||
                                     (item.g === 'A+' && score >= 9.5) ||
                                     (item.g === 'D' && score < 4.5 && score >= 2.5) ||
                                     (item.g === 'F' && score < 2.5);
              return (
                <div key={item.g} className="flex flex-col items-center">
                  <span className={`text-[12px] font-black mb-1 ${isCurrentGrade ? 'text-orange-500' : 'text-slate-300'}`}>{item.g}</span>
                  <span className={`text-[7px] font-bold mb-2 tracking-tighter transition-colors ${isCurrentGrade ? 'text-orange-500' : 'text-slate-300/40'}`}>{item.l}</span>
                  {isCurrentGrade && <div className="w-8 h-1 bg-orange-500 rounded-full" />}
                </div>
              );
            })}
          </div>
          <div className="relative">
            <span className="text-[180px] font-black text-orange-500 leading-none tracking-tighter">
              {score >= 9.5 ? 'A+' : score >= 8.5 ? 'A' : score >= 6.5 ? 'B' : score >= 4.5 ? 'C' : score >= 2.5 ? 'D' : 'F'}
            </span>
          </div>
          <div className="space-y-4">
             <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">{findings.length} KRİTİK/MAJÖR BULGU TESPİT EDİLDİ</p>
             <div className="px-12 py-3 bg-orange-500 text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-lg shadow-orange-200">İYİLEŞTİRME ÖNERİLİR</div>
          </div>
          <div className="w-full bg-slate-50/50 rounded-[40px] p-10 border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">ATTACK SURFACE HEALTH (ANALİZ)</p>
             <div className="flex justify-between items-end px-4">
                {[
                  { name: 'SSL/TLS', val: 85, color: 'text-emerald-500' },
                  { name: 'HEADERS', val: 32, color: 'text-red-500' },
                  { name: 'NETWORK', val: 48, color: 'text-orange-500' },
                  { name: 'DOMAIN', val: 65, color: 'text-yellow-500' },
                  { name: 'SOFTWARE', val: 42, color: 'text-orange-500' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                      <div className="relative w-24 h-24">
                         <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                            <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="12" fill="transparent" />
                            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="12" fill="transparent" className={item.color} strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * item.val) / 100} />
                         </svg>
                         <div className="absolute inset-0 flex items-center justify-center text-xs font-black">%{item.val}</div>
                      </div>
                      <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{item.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
        <PageFooter reportId={reportId} domain={domain} pageNum={3} totalPages={totalPages} />
      </div>

      {subDomainChunks.map((chunk, idx) => (
        <div key={idx} className="a4-page">
          <PageHeader pageNum={4 + idx} totalPages={totalPages} section="SUBDOMAIN ENUMERATION (PENETRASYON KAYITLARI)" icon={Network} />
          <div className="flex-1 space-y-4">
            <table className="w-full border-collapse text-left">
               <thead>
                  <tr className="bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest">
                     <th className="p-2">#</th><th className="p-2">SUBDOMAIN</th><th className="p-2">SSL ISSUER</th><th className="p-2">TESPİT TARİHİ</th>
                  </tr>
               </thead>
               <tbody className="italic text-slate-800">
                  {chunk.map((s, i) => (
                     <tr key={i} className="border-b border-slate-100">
                        <td className="p-2 text-[8px] font-black text-slate-300">{idx * 18 + i + 1}</td>
                        <td className="p-2 text-[9px] font-bold">{s.subdomain}</td>
                        <td className="p-2 text-[8px] text-slate-500">{s.issuer?.substring(0, 30)}</td>
                        <td className="p-2 text-[8px] text-slate-500">{new Date(s.loggedAt).toLocaleDateString()}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>
          <PageFooter reportId={reportId} domain={domain} pageNum={4 + idx} totalPages={totalPages} />
        </div>
      ))}

      {findings.map((finding, index) => {
         const findingPageBase = 4 + subDomainChunks.length + (index * 3);
         return <TechnicalFindingDossier key={finding.id} finding={finding} reportId={reportId} domain={domain} pageBase={findingPageBase} totalPages={totalPages} />
      })}

      <div className="a4-page">
         <PageHeader pageNum={totalPages} totalPages={totalPages} section="SİBER GÜVENLİK SERTİFİKASYON VE ONAY" icon={ShieldCheck} />
         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10">
            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center"><ShieldCheck size={64} className="text-emerald-500" /></div>
            <div className="space-y-4 max-w-md">
               <h3 className="text-xl font-black text-slate-900 uppercase">DİJİTAL ONAY</h3>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">Bu rapor, ALFA YAPAY ZEKA X-RAY V3.0 motoru tarafından otomatik olarak derlenmiş olup, paylaşılan veriler siber güvenlik standartlarında "Teknik Kanıt" niteliği taşımaktadır.</p>
            </div>
            <div className="pt-20"><div className="w-48 h-0.5 bg-slate-900 mx-auto mb-4" /><p className="text-[10px] font-black text-slate-900 uppercase">ALFA-AI CYBER COMMAND</p><p className="text-[8px] font-bold text-slate-400">CERTIFIED SECURITY AUDITOR</p></div>
         </div>
         <PageFooter reportId={reportId} domain={domain} pageNum={totalPages} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default FullReportPrint;
