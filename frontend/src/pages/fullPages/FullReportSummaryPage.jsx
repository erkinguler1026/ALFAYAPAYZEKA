import React from 'react';
import { Page } from './FullReportComponents';

export const SummaryPage = ({ auditData, t, layout, totalPages }) => {
  const { grade, categoricalHealth, findings } = auditData;
  const isTr = t.classification === 'GİZLİ' || true; // Varsayılan TR kabul edelim, fallback.

  // Dinamik renkler
  const gradeColors = {
    'A+': 'text-emerald-500',
    'A': 'text-emerald-500',
    'B': 'text-emerald-400',
    'C': 'text-orange-500',
    'D': 'text-rose-500',
    'F': 'text-rose-600'
  };

  const currentGrade = grade || 'A';
  const currentGradeColor = gradeColors[currentGrade] || 'text-emerald-500';

  const grades = [
    { g: 'A+', label: isTr ? 'Mükemmel' : 'Excellent' },
    { g: 'A', label: isTr ? 'Sıkı İst.' : 'Hardened' },
    { g: 'B', label: isTr ? 'Güvenli' : 'Fair' },
    { g: 'C', label: isTr ? 'Orta Risk' : 'Weak' },
    { g: 'D', label: isTr ? 'Zayıf' : 'Risky' },
    { g: 'F', label: isTr ? 'Tehlikeli' : 'Danger' }
  ];

  const categories = [
    { name: isTr ? 'SERVICE SECURITY' : 'SERVICE SECURITY', val: categoricalHealth?.service ?? 100 },
    { name: isTr ? 'SECURITY HEADERS' : 'SECURITY HEADERS', val: categoricalHealth?.headers ?? 100 },
    { name: isTr ? 'NETWORK SECURITY' : 'NETWORK SECURITY', val: categoricalHealth?.network ?? 100 },
    { name: isTr ? 'DOMAIN & WHOIS' : 'DOMAIN & WHOIS',   val: categoricalHealth?.domain ?? 100 },
    { name: isTr ? 'SOFTWARE PATCHING': 'SOFTWARE PATCHING',val: categoricalHealth?.patching ?? 100 }
  ];

  // Sadece yüksek önemdeki (major/kritik) bulguları hesaba katalım
  const displayFindings = findings?.filter(f => {
    const s = f.severity?.toUpperCase();
    return s === 'CRITICAL' || s === 'HIGH' || s === 'MEDIUM';
  }) || [];

  const findingCountText = isTr 
    ? `${displayFindings.length} KRİTİK/MAJÖR BULGU TESPİT EDİLDİ` 
    : `${displayFindings.length} CRITICAL/MAJOR FINDINGS DETECTED`;

  return (
    <Page pageNum={layout?.summary} totalPages={totalPages} title="" t={t}>
      <div className="flex flex-col items-center justify-between h-full pt-4 pb-4">
        
        {/* SNAP UI CUSTOM HEADER */}
        <div className="w-full text-left mb-6">
          <h2 className="text-[14px] font-black tracking-widest uppercase text-slate-500 mb-4 ml-6">SECURITY GRADE</h2>
          <div className="w-full h-[1px] bg-slate-200" />
        </div>

        {/* YATAY HARF CETVELİ */}
        <div className="w-full max-w-3xl px-8 py-6 mb-16 mt-2">
          <div className="flex justify-between items-start w-full relative">
            {grades.map((item) => {
              const isCurrent = currentGrade === item.g;
              return (
                <div key={item.g} className="flex flex-col items-center relative w-16">
                  <span className={`text-[13px] font-black mb-2 ${isCurrent ? 'text-orange-500' : 'text-slate-300'}`}>
                     {item.g}
                  </span>
                  <span className={`text-[8px] font-black tracking-widest uppercase ${isCurrent ? 'text-orange-500' : 'text-slate-300/50'}`}>
                     {item.label}
                  </span>
                  {isCurrent && (
                    <div className="absolute -bottom-4 w-10 h-1.5 bg-orange-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DEV HARF / MERKEZ GÖRSELİ */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-12">
          <div className={`text-[280px] font-black leading-none ${currentGradeColor} tracking-tighter`}>
            {currentGrade}
          </div>
        </div>

        {/* BULGU ÖZETİ VE BUTON */}
        <div className="flex flex-col items-center space-y-8 mb-24">
           <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[14px]">
             {findingCountText}
           </p>
           <div className={`px-12 py-4 rounded-[2rem] text-white text-[12px] font-black tracking-widest uppercase shadow-lg ${displayFindings.length > 0 ? 'bg-orange-500 shadow-orange-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
             {displayFindings.length > 0 ? (isTr ? 'İYİLEŞTİRME ÖNERİLİR' : 'REMEDIATION SUGGESTED') : (isTr ? 'SİSTEM GÜVENLİ' : 'SYSTEM SECURE')}
           </div>
        </div>

        {/* DONUT SAĞLIK KARTLARI (EN ALT BÖLÜM) */}
        <div className="w-full bg-slate-50/70 border border-slate-100 rounded-[2.5rem] p-12 mt-auto">
           <div className="text-center mb-10">
              <span className="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase">
                 ATTACK SURFACE HEALTH (ANALYSIS)
              </span>
           </div>
           
           <div className="grid grid-cols-5 gap-6">
             {categories.map((cat, i) => {
               // Sağlık yüzdesine göre renk tespiti
               const colorClass = cat.val >= 80 ? 'text-emerald-500' : (cat.val >= 50 ? 'text-orange-500' : 'text-rose-500');
               
               // SVG Donut matematiği
               const radius = 42;
               const circumference = 2 * Math.PI * radius; 
               const dashoffset = circumference - (cat.val / 100) * circumference;

               return (
                 <div key={i} className="flex flex-col items-center">
                   <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                     <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                       <circle cx="50" cy="50" r="42" strokeWidth="8" fill="transparent" stroke="currentColor" className="text-gray-200/60" />
                       <circle 
                         cx="50" cy="50" r="42" strokeWidth="8" stroke="currentColor" strokeLinecap="round" fill="transparent" 
                         className={colorClass}
                         strokeDasharray={circumference}
                         strokeDashoffset={dashoffset} 
                       />
                     </svg>
                   </div>
                   <span className="text-[9px] font-black text-slate-800 tracking-[0.1em] text-center uppercase leading-tight w-24">
                     {cat.name}
                   </span>
                 </div>
               );
             })}
           </div>
        </div>

      </div>
    </Page>
  );
};
