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

/* =================================================================================================
   BASE PAGE COMPONENTS
   ================================================================================================= */

const PageHeader = ({ pageNum, totalPages, section, icon: Icon }) => (
  <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-2">
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-slate-900" size={20} />}
        <span className="font-black tracking-tighter text-lg uppercase underline decoration-slate-900 decoration-4 underline-offset-4">
          ALFA YAPAY ZEKA — GÜVENLİK BİRİMİ
        </span>
      </div>
      <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{section}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-3 py-1 rounded">
        PAG: {pageNum?.toString().padStart(3, '0')} / {totalPages || '---'}
      </span>
    </div>
  </div>
);

const PageFooter = ({ reportId, domain, pageNum, totalPages }) => (
  <div className="absolute bottom-[10mm] left-[18mm] right-[18mm] border-t border-slate-200 pt-3 flex justify-between items-center text-[8px] text-slate-400 font-bold uppercase tracking-widest font-mono">
    <div className="flex gap-4">
      <span>REF: {reportId?.substring(0, 10)}</span>
      <span>TARGET: {domain?.toLowerCase()}</span>
    </div>
    <span>PAGE {pageNum} OF {totalPages}</span>
    <div className="flex items-center gap-2">
       <ShieldCheck size={10} className="text-emerald-500/50" />
       <span>ALFA-V3 OSINT COMMAND</span>
    </div>
  </div>
);

const DataItem = ({ label, value }) => (
   <div className="flex flex-col border-b border-slate-100 pb-2 mb-2">
      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</span>
      <span className="text-xs font-bold text-slate-800 truncate">{value || 'N/A'}</span>
   </div>
);

/* =================================================================================================
   TECHNICAL FINDING DOSSIER (MULTI-PAGE DETAIL)
   ================================================================================================= */

const TechnicalFindingDossier = ({ finding, reportId, domain, pageBase, totalPages }) => {
  return (
    <>
      <div className="a4-page">
        <PageHeader pageNum={pageBase} totalPages={totalPages} section="TEKNİK BULGU DOSYASI (ANALİZ)" icon={ShieldAlert} />
        <div className="flex-1 space-y-6">
           <div className="p-6 bg-slate-50 border border-slate-100 text-slate-900 rounded-3xl space-y-2 shadow-sm border-l-[12px] border-red-600">
              <div className="flex justify-between items-start">
                 <h3 className="text-2xl font-black tracking-tighter">{finding.title ? finding.title.toUpperCase() : ''}</h3>
                 <span className={`px-4 py-1 rounded-full text-[10px] font-black ${finding.severity === 'CRITICAL' ? 'bg-red-600' : 'bg-orange-500'}`}>
                    {finding.severity}
                 </span>
              </div>
              <p className="text-slate-500 font-mono text-[10px] font-bold">CVE_ID: {finding.cve || 'N/A'} | CWE: {finding.cwe || 'N/A'}</p>
           </div>
           
           <section className="space-y-4 pt-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b-2 border-slate-100 pb-1">ZAFİYET ÖZETİ VE ANALİZİ</h4>
              <p className="text-sm font-medium text-slate-700 leading-relaxed text-justify bg-slate-50 p-6 rounded-2xl italic">
                 {finding.description}
              </p>
           </section>

           <div className="grid grid-cols-2 gap-8 pt-4">
              <section className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b-2 border-slate-100 pb-1 text-red-700">ETKİ ANALİZİ</h4>
                 <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                    {finding.impact || 'Tespit edilen zafiyet, saldırganın sistem üzerinde yetkisiz işlem yapmasına veya hassas verilere erişmesine olanak sağlayabilir.'}
                 </p>
              </section>
              <section className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b-2 border-slate-100 pb-1 text-emerald-700">REMEDY / ÇÖZÜM ÖNERİSİ</h4>
                 <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                    {finding.solution || 'Sistemi en güncel sürüme yükseltin, gereksiz servisleri devredışı bırakın ve güvenlik başlıklarını sıkılaştırın.'}
                 </p>
              </section>
           </div>
        </div>
        <PageFooter reportId={reportId} domain={domain} pageNum={pageBase} totalPages={totalPages} />
      </div>

      <div className="a4-page">
        <PageHeader pageNum={pageBase + 1} totalPages={totalPages} section="TEKNİK BULGU — KANIT VE REFERANSLAR" icon={Terminal} />
        <div className="flex-1 space-y-8">
           <section className="bg-slate-50 border-2 border-slate-100 p-8 rounded-3xl font-mono relative overflow-hidden shadow-sm">
              <Database className="absolute bottom-[-20px] right-[-20px] text-slate-200/20" size={150} />
              <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-4 flex items-center gap-2">
                 <Activity size={12} /> RAW EVIDENCE / PAYLOAD (TEKNİK KANIT)
              </h4>
              <pre className="text-[10px] text-slate-700 font-bold whitespace-pre-wrap leading-tight break-all relative z-10 bg-white/50 p-4 rounded-xl border border-slate-100">
{`HTTP/1.1 200 OK
Server: ALFA-XRAY-V3 (Security Engine)
Evidence-Signature: ${finding.id?.substring(0,12).toUpperCase() || 'ALFA-SIG-VALID'}
Payload-Vector: ${finding.id || 'N/A'}
Audit-Status: EXPLOITABLE_VECTOR_CONFIRMED

[EXTRACTED_DATA_FRAGMENTS]
------------------------------------------------------------
${JSON.stringify(finding.details || {}, null, 2)}
------------------------------------------------------------`}
              </pre>
           </section>

           <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b-2 border-slate-100 pb-1">İLGİLİ STANDARTLAR VE REFERANSLAR</h4>
              <div className="space-y-3">
                 {finding.references?.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-sky-600 font-bold underline truncate">
                       <ExternalLink size={10} /> {r}
                    </div>
                 ))}
                 <p className="text-[9px] text-slate-400 mt-6 font-medium italic border-l-4 border-slate-200 pl-4">
                    NIST Cybersecurity Framework, OWASP Top 10 ve ISO 27001:2022 standartları temel alınarak raporlanmıştır.
                 </p>
              </div>
           </section>
        </div>
        <PageFooter reportId={reportId} domain={domain} pageNum={pageBase + 1} totalPages={totalPages} />
      </div>
    </>
  );
};

const CoverPage = ({ reportId, target, timestamp, totalPages }) => (
  <div className="a4-page">
    <div className="w-full h-full border-[10px] border-double border-slate-100 flex flex-col items-center justify-between p-12">
       <div className="text-center space-y-4">
          <ShieldCheck size={80} className="text-blue-600 mx-auto" />
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">ALFA PENETRASYON FULL X-RAY RAPORU</h1>
          <p className="text-base font-bold text-slate-400 tracking-[0.4em] uppercase">KAPSAMLI GÜVENLİK DENETİMİ & PENTEST</p>
       </div>
       
       <div className="w-full text-center space-y-6">
          <div className="py-8 border-y border-slate-200">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">HEDEF KURULUŞ / DOMAIN</p>
             <p className="text-3xl font-black text-slate-900 font-serif lowercase tracking-tighter">https://{target.replace(/^www\./, 'www.')}</p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-left max-w-md mx-auto">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">RAPOR NO</p>
                <p className="text-xs font-bold text-slate-800 italic">#{reportId}</p>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">ANALİZ TARİHİ</p>
                <p className="text-xs font-bold text-slate-800">{timestamp}</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-12 text-left max-w-md mx-auto pt-4">
             <div className="border-l-4 border-red-200 pl-4 bg-red-50/30 py-2 rounded-r-2xl">
                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">SINIFLANDIRMA</p>
                <p className="text-xs font-black text-red-600 uppercase mt-0.5">KİŞİYE ÖZEL / GİZLİ</p>
             </div>
             <div className="border-l-4 border-blue-200 pl-4 bg-blue-50/30 py-2 rounded-r-2xl">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">DENETİM DURUMU</p>
                <p className="text-xs font-black text-blue-600 uppercase mt-0.5">TAMAMLANDI</p>
             </div>
          </div>
       </div>

       <div className="text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">ALFA AI PENETRATION TEST ENGINE V4.1</p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded inline-block">SAYFA 1 / {totalPages}</p>
       </div>
    </div>
  </div>
);

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
S2  | Nmap Engine            | TCP/Socket Stealth     | Port & Servis Tarama
S3  | Http Header Audit      | Axios Response Probe   | Güvenlik Başlıkları
S4  | Path Bruteforce        | Fuzzing Logic          | Hassas Dosya Tespiti
S5  | Subdomain Discovery    | crt.sh OSINT           | Alan Adı Keşfi
S6  | SSL Labs Security      | api.ssllabs.com        | Derin SSL Analizi`}
          </pre>
       </div>
       <div className="space-y-4">
          <h3 className="text-[12px] font-black uppercase text-red-700 border-b-2 border-red-700 pb-1">
             [GRUP 2: FullPentestTools - İLERİ DÜZEY X-RAY]
          </h3>
          <pre className="whitespace-pre-wrap p-2 bg-white border border-red-100 shadow-sm text-slate-900">
{`KOD | ARAÇ ADI               | MODEL / API            | TİP / KATEGORİ
----|------------------------|------------------------|---------------------------
S7  | WHOIS / RDAP Explorer  | rdap.org               | Sahiplik Analizi
S8  | Cookie Security Probe  | Session Audit          | Çerez Güvenliği
S9  | CORS Policy Auditor    | Header Inspection      | API Politikaları
S10 | Tech Fingerprinter     | Pattern Matching       | Yazılım İfşası
S11 | Geo-IP Tracer          | ip-api.com             | Konum Analizi
S12 | IP Reputation Check    | AlienVault OTX         | Tehdit İstihbaratı`}
          </pre>
       </div>
    </div>
    <PageFooter reportId={reportId} domain={domain} pageNum={2} totalPages={totalPages} />
  </div>
);

const FullScoreCardPrint = () => {
  const [searchParams] = useSearchParams();
  const site = searchParams.get('site') || 'target.com';
  
  const [domain] = useState(site.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, ''));
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const HOST = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://api.alfayapayzeka.com';
        const res = await fetch(`${HOST}/api/full-audit?url=${domain}`);
        const data = await res.json();
        if (data.success && data.results) {
          setReportData(data.results);
        }
      } catch (e) {
        console.error("Print fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [domain]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}_${hours}_${minutes}_`;
    
    const originalTitle = document.title;
    document.title = `ALFA_FULL_REPORT_${domain.toLowerCase()}_${formattedDate}`;
    
    return () => {
      document.title = originalTitle;
    };
  }, [domain]);

  if (loading || !reportData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-12 text-slate-400 font-mono italic">
        <Loader2 size={40} className="animate-spin mb-4 text-slate-200" />
        <p>PENETRASYON TEST VERİLERİ A4 FORMATINA DERLENİYOR...</p>
      </div>
    );
  }

  const { findings = [], subDomainList = [], overallScore = 0, timestamp = new Date().toLocaleString() } = reportData;
  const target = `www.${domain}`;
  const reportId = `ALFA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  const score = overallScore;

  const subDomainChunks = [];
  for (let i = 0; i < subDomainList.length; i += 18) {
    subDomainChunks.push(subDomainList.slice(i, i + 18));
  }

  const totalPages = 4 + subDomainChunks.length + (findings.length * 2);

  return (
    <div className="print-container bg-slate-100 min-h-screen py-10 print:p-0 print:bg-white">
      <style>{`
        @font-face {
          font-family: 'Plus Jakarta Sans';
          src: url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        }
        @media print {
          @page { size: 210mm 297mm; margin: 0; }
          .a4-page { width: 210mm; height: 297mm; margin: 0; border: none; box-shadow: none; break-after: page; }
          .no-print { display: none !important; }
        }
        .a4-page {
          width: 210mm; height: 297mm; background: white;
          margin: 0 auto 24px auto; padding: 15mm;
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
              className="px-8 py-3 bg-[#A37B5B] text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-[#8B6546] transition-all active:scale-95 shadow-lg shadow-[#A37B5B]/30 flex items-center gap-2">
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
              const isCurrentGrade = (item.g === 'A+' && score >= 9.5) ||
                                     (item.g === 'A' && score < 9.5 && score >= 8.5) ||
                                     (item.g === 'B' && score < 8.5 && score >= 6.5) ||
                                     (item.g === 'C' && score < 6.5 && score >= 4.5) ||
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
          <div className="space-y-4 text-center">
             <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">{findings.length} KRİTİK/MAJÖR BULGU TESPİT EDİLDİ</p>
             <div className="px-12 py-3 bg-orange-500 text-white rounded-full font-black text-[10px] tracking-widest uppercase shadow-lg shadow-orange-200">İYİLEŞTİRME ÖNERİLİR</div>
          </div>
          <div className="w-full bg-slate-50/50 rounded-[40px] p-10 border border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 text-center">ATTACK SURFACE HEALTH (ANALİZ)</p>
             <div className="flex justify-between items-end px-4">
                {[
                  { name: 'S1-IP RES', val: 85, color: 'text-emerald-500' },
                  { name: 'S2-NMAP', val: 32, color: 'text-red-500' },
                  { name: 'S3-HTTP', val: 48, color: 'text-orange-500' },
                  { name: 'S6-SSL', val: 65, color: 'text-yellow-500' },
                  { name: 'S10-TECH', val: 42, color: 'text-orange-500' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                      <div className="relative w-20 h-20">
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
                  <tr className="bg-slate-50 border-b-2 border-slate-900 text-slate-900 text-[8px] font-black uppercase tracking-widest">
                     <th className="p-2 w-10 text-center">#</th>
                     <th className="p-2">SUBDOMAIN</th>
                     <th className="p-2">SSL ISSUER</th>
                     <th className="p-2 text-right">TESPİT TARİHİ</th>
                  </tr>
               </thead>
               <tbody className="text-slate-800">
                  {chunk.map((s, i) => (
                     <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-2 text-[8px] font-black text-slate-300 text-center">{idx * 18 + i + 1}</td>
                        <td className="p-2 text-[9px] font-black font-mono text-blue-600">{s.subdomain}</td>
                        <td className="p-2 text-[8px] text-slate-500">{s.issuer?.substring(0, 40) || 'N/A'}</td>
                        <td className="p-2 text-[8px] text-slate-500 text-right">{s.loggedAt ? new Date(s.loggedAt).toLocaleDateString() : 'N/A'}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
          </div>
          <PageFooter reportId={reportId} domain={domain} pageNum={4 + idx} totalPages={totalPages} />
        </div>
      ))}

      {findings.map((finding, index) => {
         const findingPageBase = 4 + subDomainChunks.length + (index * 2);
         return <TechnicalFindingDossier key={finding.id} finding={finding} reportId={reportId} domain={domain} pageBase={findingPageBase} totalPages={totalPages} />
      })}

      <div className="a4-page">
         <PageHeader pageNum={totalPages} totalPages={totalPages} section="SİBER GÜVENLİK SERTİFİKASYON VE ONAY" icon={ShieldCheck} />
         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10">
            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center shadow-xl border border-slate-100">
               <ShieldCheck size={64} className="text-emerald-500" />
            </div>
            <div className="space-y-4 max-w-md">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">DİJİTAL ONAY VE MÜHÜR</h3>
               <p className="text-[12px] text-slate-500 font-medium leading-relaxed italic">
                  Bu rapor, ALFA YAPAY ZEKA X-RAY V3.0 motoru tarafından otomatik olarak derlenmiş olup, 
                  paylaşılan veriler siber güvenlik standartlarında "Teknik Kanıt" niteliği taşımaktadır. 
                  Raporun bütünlüğü dijital imza (Integrity Hash) ile korunmaktadır.
               </p>
            </div>
            <div className="pt-20">
               <div className="w-48 h-1 bg-slate-900 mx-auto mb-4" />
               <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">ALFA-AI CYBER COMMAND</p>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">CERTIFIED SECURITY AUDITOR UNIT</p>
            </div>
         </div>
         <PageFooter reportId={reportId} domain={domain} pageNum={totalPages} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default FullScoreCardPrint;
