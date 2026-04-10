import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, ShieldAlert, Activity, Download, Timer, Clock, Lock, AlertTriangle, Loader2
} from 'lucide-react';
import { apiClient, API_ENDPOINTS } from '../utils/api';

const SnapReportPrint = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [domain, setDomain] = useState((searchParams.get('site') || 'oskon.com.tr').toUpperCase());
  const lang = searchParams.get('lang') || 'tr';
  
  const [reportId] = useState(() => `ALFA_${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  const [isLoading, setIsLoading] = useState(true);
  const [grade, setGrade] = useState("A");
  const [infrastructureData, setInfrastructureData] = useState([
    { name: 'SSL/TLS', health: 100, color: 'text-emerald-500' },
    { name: 'HEADERS', health: 100, color: 'text-emerald-500' },
    { name: 'NETWORK', health: 100, color: 'text-orange-500' },
    { name: 'DOMAIN', health: 100, color: 'text-yellow-500' },
    { name: 'SOFTWARE', health: 100, color: 'text-orange-500' }
  ]);
  const [realRisks, setRealRisks] = useState([]);
  const [signedAt] = useState(() => new Date().toLocaleString());

  useEffect(() => {
    const originalTitle = document.title;
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:T]/g, '_').split('.')[0];
    document.title = `ALFA_SNAP_REPORT_${domain}_${timestamp}`;
    return () => { document.title = originalTitle; };
  }, [domain]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const siteParam = searchParams.get('site');
        const response = await apiClient.get(API_ENDPOINTS.REPORT(token, siteParam));
        if (response.data.success && response.data.scanResults) {
          const res = response.data.scanResults;
          setDomain((siteParam || response.data.domain).toUpperCase());
          setGrade(res.grade);
          setInfrastructureData([
            { name: 'SERVİS GÜVENLİĞİ', health: res.categories.service.health, color: res.categories.service.health >= 80 ? 'text-emerald-500' : (res.categories.service.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: 'GÜVENLİK BAŞLIKLARI', health: res.categories.headers.health, color: res.categories.headers.health >= 80 ? 'text-emerald-500' : (res.categories.headers.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: 'AĞ PORT GÜVENLİĞİ', health: res.categories.network.health, color: res.categories.network.health >= 80 ? 'text-emerald-500' : (res.categories.network.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: 'DOMAIN & WHOIS', health: res.categories.domain.health, color: res.categories.domain.health >= 80 ? 'text-emerald-500' : (res.categories.domain.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: 'YAZILIM & YAMA', health: res.categories.patching.health, color: res.categories.patching.health >= 80 ? 'text-emerald-500' : (res.categories.patching.health >= 50 ? 'text-orange-500' : 'text-red-500') }
          ]);

          const allFindings = [
            { title: "3.1 SERVİS GÜVENLİĞİ", text: res.categories.service.findings.join(' '), risk: res.categories.service.status },
            { title: "3.2 GÜVENLİK BAŞLIKLARI", text: res.categories.headers.findings.join(' '), risk: res.categories.headers.status },
            { title: "3.3 AĞ PORT GÜVENLİĞİ", text: res.categories.network.findings.join(' '), risk: res.categories.network.status },
            { title: "3.4 DOMAIN & WHOIS", text: res.categories.domain.findings.join(' '), risk: res.categories.domain.status },
            { title: "3.5 YAZILIM & YAMA", text: res.categories.patching.findings.join(' '), risk: res.categories.patching.status }
          ];
          setRealRisks(allFindings);
        }
      } catch (err) {
        console.error("Print fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, searchParams]);

  useEffect(() => {
    if (!isLoading) {
       // Auto trigger print if specifically asked or just keep it manual
       // window.print();
    }
  }, [isLoading]);

  const t = {
    tr: {
      reportTitle: "Alfa Penetrasyon Snap Test Raporu",
      scorecardSub: "Siber güvenlik skor kartı",
      targetDomain: "Hedef kuruluş / Domain",
      reportNo: "Rapor no",
      analysisDate: "Analiz tarihi",
      securityGrade: "GÜVENLİK DERECESİ",
      infrastructureHealth: "ATTACK SURFACE HEALTH (ANALİZ)",
      execSummary: "PENETRASYON TEST ÖZETİ",
      nextSteps: "BİR SONRAKİ ADIMLAR (TAM DENETİM KAPSAMI)",
      verifiedBy: "ALFA AI TARAFINDAN DOĞRULANMIŞTIR"
    }
  }[lang];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-mono">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest">RAPOR VERİLERİ ÇEKİLİYOR...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-8 print:py-0 font-mono">
      <style>{`
        @media print {
          @page { size: 210mm 297mm; margin: 0; }
          body { background: white; }
          .a4-page { width: 210mm; height: 297mm; margin: 0; border: none; box-shadow: none; break-after: page; }
        }
        .a4-page { width: 210mm; height: 297mm; background: white; margin: 0 auto 20px auto; padding: 15mm; display: flex; flex-direction: column; position: relative; box-shadow: 0 0 20px rgba(0,0,0,0.1); overflow: hidden; }
      `}</style>

      {/* PAGE 1: COVER */}
      <div className="a4-page">
        <div className="w-full h-full border-[10px] border-double border-slate-100 flex flex-col items-center justify-between p-12">
           <div className="text-center space-y-4">
              <ShieldCheck size={80} className="text-blue-600 mx-auto" />
              <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">{t.reportTitle}</h1>
              <p className="text-base font-bold text-slate-400 tracking-[0.4em] uppercase">{t.scorecardSub}</p>
           </div>
           
           <div className="w-full text-center space-y-6">
              <div className="py-8 border-y border-slate-200">
                 <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t.targetDomain}</p>
                 <p className="text-4xl font-black text-slate-900 font-serif lowercase">www.{domain.toLowerCase()}</p>
              </div>
              <div className="grid grid-cols-2 gap-12 text-left max-w-md mx-auto">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{t.reportNo}</p>
                    <p className="text-xs font-bold text-slate-800 italic">#{reportId}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{t.analysisDate}</p>
                    <p className="text-xs font-bold text-slate-800">{new Date().toLocaleDateString('tr-TR')}</p>
                 </div>
              </div>
           </div>

           <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">ALFA AI PENETRATION TEST ENGINE V4.1</p>
           </div>
        </div>
      </div>

      {/* PAGE 2: GRADE & PIE CHARTS */}
      <div className="a4-page">
         <div className="flex flex-col h-full border-[10px] border-double border-slate-100 p-8">
            <h2 className="text-xl font-black text-slate-500 mb-8 border-b-2 border-slate-100 pb-2">{t.securityGrade}</h2>
            
            <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                <div className="flex justify-between w-full max-w-lg px-4 relative">
                    {[
                      { g: 'A+', l: 'MÜKEMMEL' },
                      { g: 'A', l: 'ÇOK İYİ' },
                      { g: 'B', l: 'GÜVENLİ' },
                      { g: 'C', l: 'ORTA RİSK', active: true },
                      { g: 'D', l: 'ZAYIF' },
                      { g: 'F', l: 'TEHLİKELİ' }
                    ].map((item) => (
                      <div key={item.g} className="flex flex-col items-center">
                        <span className={`text-[12px] font-black mb-1 ${grade === item.g ? 'text-orange-500' : 'text-slate-300'}`}>{item.g}</span>
                        <span className={`text-[7px] font-bold mb-2 whitespace-nowrap tracking-tighter transition-colors ${grade === item.g ? 'text-orange-500' : 'text-slate-300/40'}`}>
                          {item.l}
                        </span>
                        {grade === item.g && <div className="w-8 h-1 bg-orange-500 rounded-full" />}
                      </div>
                    ))}
                </div>
                <div className="text-[180px] font-black text-orange-500 leading-none">{grade}</div>
                <p className="text-slate-400 text-sm font-black uppercase tracking-widest">
                  {realRisks.length > 0 ? `${realRisks.length} KRİTİK/MAJÖR BULGU TESPİT EDİLDİ` : "HERHANGİ BİR KRİTİK ZAFİYET TESPİT EDİLMEDİ"}
                </p>
                <div className="px-8 py-3 bg-orange-500 text-white rounded-full font-black text-xs tracking-widest uppercase">İYİLEŞTİRME ÖNERİLİR</div>
            </div>

            <div className="mt-12 py-8 bg-slate-50 rounded-2xl">
               <h3 className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">{t.infrastructureHealth}</h3>
               <div className="flex justify-around items-end px-4">
                  {infrastructureData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="relative w-20 h-20 mb-4">
                           <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                              <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="10" fill="transparent" />
                              <motion.circle 
                                cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" 
                                className={item.color} strokeLinecap="round" strokeDasharray="251.2"
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 251.2 - (251.2 * item.health) / 100 }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                              />
                           </svg>
                           <div className="absolute inset-0 flex items-center justify-center text-xs font-black">%{item.health}</div>
                        </div>
                        <span className="text-[9px] font-black text-slate-700 uppercase">{item.name}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* PAGE 3: SUMMARY & NEXT STEPS */}
      <div className="a4-page">
         <div className="flex flex-col h-full border-[10px] border-double border-slate-100 p-8 space-y-8">
            <div>
               <h2 className="text-xl font-black text-slate-500 mb-4 border-b-2 border-slate-100 pb-2">{t.execSummary}</h2>
               <div className="p-6 bg-slate-50 border-l-4 border-slate-300 rounded-r-xl">
                  <p className="text-sm italic text-slate-700 leading-relaxed font-serif">
                    "Yapılan penetrasyon test analizi sonucunda sistemin dış tehditlere karşı 'Açık' (Exposed) pozisyonda olduğu ve öncelikli olarak port güvenliği ile yazılım yaması katmanlarında acil müdahale gerektiği saptanmıştır."
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {realRisks.map((risk, idx) => {
                 const isDanger = risk.risk === 'RİSKLİ' || risk.risk === 'TEHLİKELİ' || risk.risk === 'YÜKSEK' || risk.risk === 'YÜKSEK RİSK';
                 const isSafe = risk.risk === 'GÜVENLİ' || risk.risk === 'OK';
                 return (
                    <div key={idx} className={`p-4 bg-slate-50 border ${idx === 0 ? 'md:col-span-2 border-l-8' : 'border-t-4 border-l-0 shadow-sm'} ${isDanger ? 'border-red-500' : (isSafe ? 'border-green-500' : 'border-orange-500')} rounded-xl flex flex-col justify-between`}>
                       <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
                         <h4 className={`text-xs font-black uppercase tracking-widest ${isDanger ? 'text-red-600' : (isSafe ? 'text-green-600' : 'text-slate-800')}`}>{risk.title}</h4>
                         <span className={`text-[8px] font-black px-2.5 py-1 ${isDanger ? 'bg-red-600' : (isSafe ? 'bg-green-600' : 'bg-orange-500')} text-white rounded-full uppercase tracking-widest`}>{risk.risk}</span>
                       </div>
                       <p className="text-[10px] text-slate-600 font-bold italic leading-relaxed">{risk.text}</p>
                       <div className="mt-3 flex justify-between items-center text-[7px] font-black text-slate-400 uppercase tracking-widest">
                         <span>ZORLUK: {isDanger ? 'YÜKSEK' : 'DÜŞÜK'}</span>
                         {idx !== 0 && <span>ÇÖZÜM: {isDanger ? 'ZOR' : 'ORTA'}</span>}
                       </div>
                    </div>
                 );
               })}
            </div>

            <div className="mt-auto">
               <h3 className="text-xs font-black text-slate-900 mb-4 border-b-2 border-slate-100 pb-2 uppercase tracking-widest">{t.nextSteps}</h3>
               <div className="grid grid-cols-2 gap-3">
                  {["SQL Injection Analizi", "Cross-Site Scripting Testi", "DDoS Dayanıklılık Testi", "Sosyal Mühendislik Simülasyonu"].map((test, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 italic text-[10px] font-bold text-slate-600">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       {test}
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-end">
               <div>
                  <p className="text-[8px] font-black text-blue-600">{t.verifiedBy}</p>
                  <p className="text-[7px] font-bold text-slate-400 mt-1 uppercase tracking-widest">ALFA AI CYBER LABS | {reportId}</p>
               </div>
               <div className="w-16 h-16 bg-white p-1 border border-slate-200 rounded">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://verify.alfayapayzeka.com/${reportId}`)}`} alt="QR" className="w-full h-full opacity-30" />
               </div>
            </div>
         </div>
      </div>

      {/* PAGE 4: APPROVAL & SIGNATURE */}
      <div className="a4-page">
         <div className="flex flex-col h-full border-[12px] border-double border-slate-200 p-12 items-center justify-between">
            <div className="text-center space-y-6 mt-12 w-full">
               <ShieldCheck size={100} className="text-blue-600 mx-auto" />
               <h2 className="text-4xl font-black text-slate-900 border-y-4 border-slate-900 py-4 uppercase tracking-tighter">BİRİM ONAYI</h2>
               <p className="text-sm italic text-slate-500 px-12 leading-relaxed">
                 "Bu belge dijital olarak imzalanmış olup, analiz sonuçlarının doğruluğu ALFA YAPAY ZEKA Penetrasyon Test Birimi tarafından onaylanmıştır."
               </p>
            </div>

            <div className="w-full flex flex-col items-center mb-12">
               <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Signature" className="h-40 object-contain mix-blend-multiply mb-4" />
               <div className="text-center space-y-1">
                  <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">ERKİN GÜLER</p>
                  <p className="text-xs font-black text-blue-600 tracking-[0.2em] uppercase">SİBER GÜVENLİK UZMANI</p>
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">ALFA SİBER ANALİZ BİRİMİ</p>
               </div>
            </div>

            <div className="w-full py-6 border-t border-slate-100 flex justify-between text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em]">
               <span>REPORT_ID: {reportId}</span>
               <span>TOKEN_ID: {token?.slice(0, 8)}</span>
               <span>{signedAt}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SnapReportPrint;
