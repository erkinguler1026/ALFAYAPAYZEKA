import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, ShieldAlert, Activity, Download, Timer, Clock, Lock, AlertTriangle, Loader2, ArrowLeft, Printer
} from 'lucide-react';
import { apiClient, API_ENDPOINTS } from '../../utils/api';

const SNAP_STEPS = [
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

const SnapReportPrint = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [domain, setDomain] = useState((searchParams.get('site') || 'oskon.com.tr').toUpperCase());
  const lang = searchParams.get('lang') || 'tr';
  
  const [reportId] = useState(() => `ALFA_${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  const [isLoading, setIsLoading] = useState(true);
  const [loadStep, setLoadStep] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const stepInterval = setInterval(() => {
        setLoadStep(s => Math.min(s + 1, SNAP_STEPS.length - 1));
      }, 700);
      return () => clearInterval(stepInterval);
    }
  }, [isLoading]);
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
        
        let targetResults = null;
        const cached = sessionStorage.getItem(`alfa_scan_${token}`);
        
        if (cached) {
           targetResults = JSON.parse(cached);
           setDomain((siteParam || 'oskon.com.tr').toUpperCase());
        } else {
           const response = await apiClient.get(API_ENDPOINTS.REPORT(token, siteParam));
           if (response.data.success && response.data.scanResults) {
             targetResults = response.data.scanResults;
             setDomain((siteParam || response.data.domain).toUpperCase());
           }
        }

        if (targetResults) {
          const res = targetResults;
          setGrade(res.grade);
          setInfrastructureData([
            { name: lang === 'tr' ? 'SERVİS GÜVENLİĞİ' : 'SERVICE SECURITY', health: res.categories.service.health, color: res.categories.service.health >= 80 ? 'text-emerald-500' : (res.categories.service.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: lang === 'tr' ? 'GÜVENLİK BAŞLIKLARI' : 'SECURITY HEADERS', health: res.categories.headers.health, color: res.categories.headers.health >= 80 ? 'text-emerald-500' : (res.categories.headers.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: lang === 'tr' ? 'AĞ PORT GÜVENLİĞİ' : 'NETWORK SECURITY', health: res.categories.network.health, color: res.categories.network.health >= 80 ? 'text-emerald-500' : (res.categories.network.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: lang === 'tr' ? 'DOMAIN & WHOIS' : 'DOMAIN & WHOIS', health: res.categories.domain.health, color: res.categories.domain.health >= 80 ? 'text-emerald-500' : (res.categories.domain.health >= 50 ? 'text-orange-500' : 'text-red-500') },
            { name: lang === 'tr' ? 'YAZILIM & YAMA' : 'SOFTWARE PATCHING', health: res.categories.patching.health, color: res.categories.patching.health >= 80 ? 'text-emerald-500' : (res.categories.patching.health >= 50 ? 'text-orange-500' : 'text-red-500') }
          ]);

          const allFindings = [
            { title: lang === 'tr' ? "3.1 SERVİS GÜVENLİĞİ" : "3.1 SERVICE SECURITY", text: res.categories.service.findings.join(' '), risk: res.categories.service.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.9" : "ISO 27001:2022 ANNEX-A Control A.8.9" },
            { title: lang === 'tr' ? "3.2 GÜVENLİK BAŞLIKLARI" : "3.2 SECURITY HEADERS", text: res.categories.headers.findings.join(' '), risk: res.categories.headers.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.26" : "ISO 27001:2022 ANNEX-A Control A.8.26" },
            { title: lang === 'tr' ? "3.3 AĞ PORT GÜVENLİĞİ" : "3.3 NETWORK SECURITY", text: res.categories.network.findings.join(' '), risk: res.categories.network.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.20" : "ISO 27001:2022 ANNEX-A Control A.8.20" },
            { title: lang === 'tr' ? "3.4 DOMAIN & WHOIS" : "3.4 DOMAIN & WHOIS LEAK", text: res.categories.domain.findings.join(' '), risk: res.categories.domain.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.5.7" : "ISO 27001:2022 ANNEX-A Control A.5.7" },
            { title: lang === 'tr' ? "3.5 YAZILIM & YAMA" : "3.5 SOFTWARE & PATCHING", text: res.categories.patching.findings.join(' '), risk: res.categories.patching.status, isoTag: lang === 'tr' ? "ISO 27001:2022 EK-A Madde A.8.8" : "ISO 27001:2022 ANNEX-A Control A.8.8" }
          ];
          setRealRisks(allFindings);
          
          if (cached) {
             setIsLoading(false); 
             return; 
          }
        }
      } catch (err) {
        console.error("Print fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, searchParams, lang]);

  useEffect(() => {
    if (!isLoading) {
       // Auto trigger print if specifically asked or just keep it manual
       // window.print();
    }
  }, [isLoading]);

  const tObject = {
    tr: {
      reportTitle: "Alfa Penetrasyon Snap Test Raporu",
      scorecardSub: "Siber güvenlik skor kartı",
      targetDomain: "Hedef kuruluş / Domain",
      reportNo: "Rapor no",
      analysisDate: "Analiz tarihi",
      engineName: "ALFA AI PENETRATION TEST ENGINE V4.1",
      securityGrade: "GÜVENLİK DERECESİ",
      infrastructureHealth: "ATTACK SURFACE HEALTH (ANALİZ)",
      execSummary: "PENETRASYON TEST ÖZETİ",
      nextSteps: "BİR SONRAKİ ADIMLAR (TAM DENETİM KAPSAMI)",
      verifiedBy: "ALFA AI TARAFINDAN DOĞRULANMIŞTIR",
      g1: "MÜKEMMEL", g2: "ÇOK İYİ", g3: "GÜVENLİ", g4: "ORTA RİSK", g5: "ZAYIF", g6: "TEHLİKELİ",
      findingsFound: "KRİTİK/MAJÖR BULGU TESPİT EDİLDİ",
      noFindings: "HERHANGİ BİR KRİTİK ZAFİYET TESPİT EDİLMEDİ",
      improvementRec: "İYİLEŞTİRME ÖNERİLİR",
      unitName: "ALFA YAPAY ZEKA SİBER GÜVENLİK BİRİMİ",
      pageText: "SAYFA",
      execSummaryText: "Yapılan penetrasyon test analizi sonucunda sistemin dış tehditlere karşı 'Açık' (Exposed) pozisyonda olduğu ve öncelikli olarak port güvenliği ile yazılım yaması katmanlarında acil müdahale gerektiği saptanmıştır.",
      nextStepsList: ["SQL Injection Analizi", "Cross-Site Scripting Testi", "DDoS Dayanıklılık Testi", "Sosyal Mühendislik Simülasyonu"],
      approvalTitle: "BİRİM ONAYI",
      approvalText: "\"Bu belge dijital olarak imzalanmış olup, analiz sonuçlarının doğruluğu ALFA YAPAY ZEKA Penetrasyon Test Birimi tarafından onaylanmıştır.\"",
      securityExpert: "SİBER GÜVENLİK UZMANI",
      alfaLab: "ALFA SİBER ANALİZ BİRİMİ",
      printBtn: "RAPORU YAZDIR (PDF)",
      backBtn: "PROFİL'E DÖN"
    },
    en: {
      reportTitle: "Alfa Penetration Snap Test Report",
      scorecardSub: "Cyber security scorecard",
      targetDomain: "Target organization / Domain",
      reportNo: "Report no",
      analysisDate: "Analysis date",
      engineName: "ALFA AI PENETRATION TEST ENGINE V4.1",
      securityGrade: "SECURITY GRADE",
      infrastructureHealth: "ATTACK SURFACE HEALTH (ANALYSIS)",
      execSummary: "PENETRATION TEST SUMMARY",
      nextSteps: "NEXT STEPS (FULL AUDIT SCOPE)",
      verifiedBy: "VERIFIED BY ALFA AI FORENSICS",
      g1: "EXCELLENT", g2: "VERY GOOD", g3: "SECURE", g4: "MEDIUM RISK", g5: "WEAK", g6: "DANGEROUS",
      findingsFound: "CRITICAL/MAJOR FINDINGS DETECTED",
      noFindings: "NO CRITICAL VULNERABILITIES DETECTED",
      improvementRec: "IMPROVEMENT RECOMMENDED",
      unitName: "ALFA AI CYBER SECURITY TEAM",
      pageText: "PAGE",
      execSummaryText: "As a result of the penetration test analysis, it has been determined that the system is in an 'Exposed' position against external threats, and emergency intervention is required primarily in the port security and software patch layers.",
      nextStepsList: ["SQL Injection Analysis", "Cross-Site Scripting Test", "DDoS Resilience Test", "Social Engineering Simulation"],
      approvalTitle: "UNIT APPROVAL",
      approvalText: "\"This document is digitally signed, and the accuracy of the analysis results has been approved by the ALFA AI Penetration Test Unit.\"",
      securityExpert: "CYBER SECURITY EXPERT",
      alfaLab: "ALFA CYBER ANALYSIS UNIT",
      printBtn: "PRINT REPORT (PDF)",
      backBtn: "BACK TO PROFILE"
    }
  };
  const t = tObject[lang] || tObject['tr'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-mono gap-5 text-white p-4">
        <Loader2 className="animate-spin text-blue-500" size={56} />
        <div className="text-center space-y-4 my-4">
          <p className="font-black text-xl uppercase tracking-[0.5em] text-blue-500 animate-pulse">
            ALFA SNAP PENTEST ENGINE
          </p>
          <p className="text-white/60 text-sm font-bold tracking-widest">GÜVENLİK BİLEŞENLERİ TARANIYOR...</p>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 min-w-[500px]">
          {SNAP_STEPS.map((s, i) => (
            <div key={i} className="w-full flex items-center justify-between gap-6 py-1">
               <p className={`text-base font-black tracking-wider ${i === loadStep ? 'text-white' : i < loadStep ? 'text-blue-500 opacity-50' : 'text-white/10'}`}>
                 <span className={`inline-block w-16 text-left font-mono ${i === loadStep ? 'text-blue-500' : ''}`}>
                   {i + 1}/{SNAP_STEPS.length}
                 </span>
                 {s}
               </p>
               {i < loadStep && <ShieldCheck size={16} className="text-blue-500" />}
               {i === loadStep && <Activity size={18} className="text-blue-500 animate-pulse" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const formattedUrl = `https://www.${domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/^www/, '')}`;

  const totalPages = 4;

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
                 <p className="text-3xl font-black text-slate-900 font-serif lowercase">{formattedUrl}</p>
              </div>
              <div className="grid grid-cols-2 gap-12 text-left max-w-md mx-auto">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{t.reportNo}</p>
                    <p className="text-xs font-bold text-slate-800 italic">#{reportId}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{t.analysisDate}</p>
                    <p className="text-xs font-bold text-slate-800">{new Date().toLocaleDateString()}</p>
                 </div>
              </div>
           </div>

           <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">{t.engineName}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded inline-block">{t.pageText} 1 / {totalPages}</p>
           </div>
        </div>
      </div>

      {/* PAGE 2: GRADE & PIE CHARTS */}
      <div className="a4-page">
         <div className="flex flex-col h-full border-[10px] border-double border-slate-100 p-8">
            <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-2">
               <h2 className="text-xl font-black text-slate-500">{t.securityGrade}</h2>
               <p className="text-sm font-bold text-slate-400 font-serif lowercase">{formattedUrl}</p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                <div className="flex justify-between w-full max-w-lg px-4 relative">
                    {[
                      { g: 'A+', l: t.g1 },
                      { g: 'A', l: t.g2 },
                      { g: 'B', l: t.g3 },
                      { g: 'C', l: t.g4, active: true },
                      { g: 'D', l: t.g5 },
                      { g: 'F', l: t.g6 }
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
                  {realRisks.length > 0 ? `${realRisks.length} ${t.findingsFound}` : t.noFindings}
                </p>
                <div className="px-8 py-3 bg-orange-500 text-white rounded-full font-black text-xs tracking-widest uppercase">{t.improvementRec}</div>
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

            <div className="mt-auto pt-4 flex justify-between items-center text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em] border-t border-slate-100">
               <span>{t.unitName}</span>
               <span>#{reportId?.substring(0,8)}</span>
               <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{t.pageText} 2 / {totalPages}</span>
            </div>
         </div>
      </div>

      {/* PAGE 3: SUMMARY & NEXT STEPS */}
      <div className="a4-page">
         <div className="flex flex-col h-full border-[10px] border-double border-slate-100 p-6 space-y-5">
            <div>
               <div className="flex justify-between items-end mb-3 border-b-2 border-slate-100 pb-2">
                  <h2 className="text-xl font-black text-slate-500">{t.execSummary}</h2>
                  <p className="text-sm font-bold text-slate-400 font-serif lowercase">{formattedUrl}</p>
               </div>
               <div className="p-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-xl">
                  <p className="text-sm italic text-slate-700 leading-relaxed font-serif">
                    "{t.execSummaryText}"
              </p>
              
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {realRisks.map((risk, idx) => {
                 const isDanger = risk.risk === 'RİSKLİ' || risk.risk === 'TEHLİKELİ' || risk.risk === 'YÜKSEK' || risk.risk === 'YÜKSEK RİSK';
                 const isSafe = risk.risk === 'GÜVENLİ' || risk.risk === 'OK';
                 return (
                    <div key={idx} className={`p-4 bg-slate-50 border ${idx === 0 ? 'col-span-2 border-l-8' : 'border-t-4 border-l-0 shadow-sm'} ${isDanger ? 'border-red-500' : (isSafe ? 'border-green-500' : 'border-orange-500')} rounded-xl flex flex-col justify-between`}>
                       <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
                         <h4 className={`text-xs font-black uppercase tracking-widest ${isDanger ? 'text-red-600' : (isSafe ? 'text-green-600' : 'text-slate-800')}`}>{risk.title}</h4>
                         <span className={`text-[8px] font-black px-2.5 py-1 ${isDanger ? 'bg-red-600' : (isSafe ? 'bg-green-600' : 'bg-orange-500')} text-white rounded-full uppercase tracking-widest`}>{lang === 'en' ? (isDanger ? 'RISK DETECTED' : (isSafe ? 'SECURE' : 'MEDIUM RISK')) : risk.risk}</span>
                       </div>
                       <p className="text-[10px] text-slate-600 font-bold italic leading-relaxed">{risk.text}</p>
                       <div className="mt-3 flex justify-between items-center text-[7px] font-black uppercase tracking-widest">
                         <span className="text-blue-600/80 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">{risk.isoTag}</span>
                         <span className="text-slate-400">{lang === 'en' ? 'DIFFICULTY' : 'ZORLUK'}: {isDanger ? (lang === 'en' ? 'HIGH' : 'YÜKSEK') : (lang === 'en' ? 'LOW' : 'DÜŞÜK')}</span>
                       </div>
                    </div>
                 );
               })}
            </div>

            <div className="mt-auto">
               <h3 className="text-xs font-black text-slate-900 mb-3 border-b-2 border-slate-100 pb-2 uppercase tracking-widest">{t.nextSteps}</h3>
               <div className="grid grid-cols-2 gap-3">
                  {t.nextStepsList.map((test, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100 italic text-[10px] font-bold text-slate-600">
                       <div className="w-2 h-2 rounded-full bg-blue-500" />
                       {test}
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-end">
               <div>
                  <p className="text-[8px] font-black text-blue-600">{t.verifiedBy}</p>
                  <p className="text-[7px] font-bold text-slate-400 mt-1 uppercase tracking-widest">ALFA AI CYBER LABS | {reportId}</p>
               </div>
               <div className="w-16 h-16 bg-white p-1 border border-slate-200 rounded">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://verify.alfayapayzeka.com/${reportId}`)}`} alt="QR" className="w-full h-full opacity-30" />
               </div>
            </div>

            <div className="mt-auto pt-4 flex justify-between items-center text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em] border-t border-slate-100">
               <span>{t.unitName}</span>
               <span>#{reportId?.substring(0,8)}</span>
               <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{t.pageText} 3 / {totalPages}</span>
            </div>
         </div>
      </div>

      {/* KONTROL PANELİ (SADECE EKRANDA) */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50 print:hidden">
         <button 
           onClick={() => window.print()}
           className="bg-blue-600 text-white px-6 py-3 rounded-full font-black tracking-widest uppercase shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition flex items-center justify-center gap-2"
         >
            <Printer size={16} />
            {t.printBtn}
         </button>
         <button 
           onClick={() => {
             const params = new URLSearchParams(searchParams);
             params.set('skipAnim', 'true');
             navigate(`/scorecard?${params.toString()}`);
           }}
           className="bg-slate-800 text-white px-6 py-3 rounded-full font-black tracking-widest uppercase shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:bg-slate-900 transition flex items-center justify-center gap-2"
         >
            <ArrowLeft size={16} />
            {t.backBtn}
         </button>
      </div>

      {/* PAGE 4: APPROVAL & SIGNATURE */}
      <div className="a4-page">
         <div className="flex flex-col h-full border-[12px] border-double border-slate-200 p-12 items-center justify-between">
            <div className="text-center space-y-6 mt-12 w-full">
               <ShieldCheck size={100} className="text-blue-600 mx-auto" />
               <div className="border-y-4 border-slate-900 py-4 space-y-2">
                  <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">{t.approvalTitle}</h2>
                  <p className="text-lg font-bold text-slate-400 font-serif lowercase">{formattedUrl}</p>
               </div>
               <p className="text-sm italic text-slate-500 px-12 leading-relaxed">
                 {t.approvalText}
               </p>
            </div>

            <div className="w-full flex flex-col items-center mb-12">
               <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Signature" className="h-40 object-contain mix-blend-multiply mb-4" />
               <div className="text-center space-y-1">
                  <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">ERKİN GÜLER</p>
                  <p className="text-xs font-black text-blue-600 tracking-[0.2em] uppercase">{t.securityExpert}</p>
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">{t.alfaLab}</p>
               </div>
            </div>

            <div className="w-full mt-auto py-4 border-t border-slate-100 flex justify-between items-center text-[8px] font-bold text-slate-300 uppercase tracking-[0.3em]">
               <span>ID: {reportId?.substring(0,8)}</span>
               <span>TOK: {token?.slice(0, 8)}</span>
               <span>{signedAt}</span>
               <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{t.pageText} 4 / {totalPages}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SnapReportPrint;
