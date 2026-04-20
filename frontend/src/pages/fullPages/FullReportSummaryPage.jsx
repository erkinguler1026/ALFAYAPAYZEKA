import React from 'react';
import { Page } from './FullReportComponents';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export const SummaryPage = ({ auditData, t, layout, totalPages }) => {
  const { grade, categoricalHealth, findings } = auditData;
  const isTr = t.classification === 'GİZLİ' || true; // Fallback to TR

  // Harf Renkleri
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

  // Filtrelenmiş yüksek riskli bulgular
  const displayFindings = findings?.filter(f => {
    const s = f.severity?.toUpperCase();
    return s === 'CRITICAL' || s === 'HIGH' || s === 'MEDIUM';
  }) || [];

  const findingCountText = isTr 
    ? `${displayFindings.length} KRİTİK/MAJÖR BULGU TESPİT EDİLDİ` 
    : `${displayFindings.length} CRITICAL/MAJOR FINDINGS DETECTED`;

  return (
    <>
      {/* İLK SAYFA: DASHBOARD & DONUTS */}
      <Page pageNum={layout?.summary} totalPages={totalPages} title="" t={t}>
        <div className="flex flex-col items-center justify-between h-full pt-4 pb-4">
          
          {/* SNAP UI CUSTOM HEADER */}
          <div className="w-full text-left mb-6">
            <h2 className="text-[14px] font-black tracking-widest uppercase text-slate-500 mb-4 ml-6">SECURITY GRADE</h2>
            <div className="w-full h-[1px] bg-slate-200" />
          </div>

          {/* YATAY HARF CETVELİ */}
          <div className="w-full max-w-3xl px-8 py-4 mb-2 mt-4">
            <div className="flex justify-between items-start w-full relative">
              {grades.map((item) => {
                const isCurrent = currentGrade === item.g;
                return (
                  <div key={item.g} className="flex flex-col items-center relative w-16">
                    <span className={`text-[13px] font-black mb-2 transition-colors ${isCurrent ? 'text-orange-500 scale-110' : 'text-slate-300'}`}>
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

          {/* DEV HARF / MERKEZ GÖRSELİ - %50 KÜÇÜLTÜLDÜ (280px -> 140px) */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className={`text-[140px] font-black leading-none ${currentGradeColor} tracking-tighter`}>
              {currentGrade}
            </div>
            
            <div className="flex flex-col items-center mt-12 space-y-8">
               <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[12px]">
                 {findingCountText}
               </p>
               <div className={`px-10 py-3 rounded-full text-white text-[10px] font-black tracking-widest uppercase shadow-md ${displayFindings.length > 0 ? 'bg-orange-500 shadow-orange-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
                 {displayFindings.length > 0 ? (isTr ? 'İYİLEŞTİRME ÖNERİLİR' : 'REMEDIATION SUGGESTED') : (isTr ? 'SİSTEM GÜVENLİ' : 'SYSTEM SECURE')}
               </div>
            </div>
          </div>

          {/* DONUT SAĞLIK KARTLARI (EN ALT BÖLÜM - EBADI KORUNDU) */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-10 mt-auto">
             <div className="text-center mb-10">
                <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
                   ATTACK SURFACE HEALTH (ANALYSIS)
                </span>
             </div>
             
             <div className="grid grid-cols-5 gap-6">
               {categories.map((cat, i) => {
                 const colorClass = cat.val >= 80 ? 'text-emerald-500' : (cat.val >= 50 ? 'text-orange-500' : 'text-rose-500');
                 const radius = 38;
                 const circumference = 2 * Math.PI * radius; 
                 const dashoffset = circumference - (cat.val / 100) * circumference;

                 return (
                   <div key={i} className="flex flex-col items-center">
                     <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                       <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                         <circle cx="50" cy="50" r="38" strokeWidth="8" fill="transparent" stroke="currentColor" className="text-gray-200/50" />
                         <circle 
                           cx="50" cy="50" r="38" strokeWidth="8" stroke="currentColor" strokeLinecap="round" fill="transparent" 
                           className={colorClass}
                           strokeDasharray={circumference}
                           strokeDashoffset={dashoffset} 
                         />
                       </svg>
                       <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-slate-700">
                         %{cat.val}
                       </span>
                     </div>
                     <span className="text-[8px] font-black text-slate-800 tracking-[0.1em] text-center uppercase leading-tight w-20">
                       {cat.name}
                     </span>
                   </div>
                 );
               })}
             </div>
          </div>

        </div>
      </Page>

      {/* İKİNCİ SAYFA: BULGULAR VE DETAYLAR */}
      <Page pageNum={layout?.summary2} totalPages={totalPages} title="ALFA YAPAY ZEKA DEĞERLENDİRMESİ" t={t}>
        <div className="space-y-12">
          
          <div className="bg-blue-50/50 border-l-4 border-blue-500 p-8 rounded-r-3xl">
            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck size={24} className="text-blue-600" />
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">GENEL DEĞERLENDİRME ÖZETİ</h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 font-medium text-justify">
              Hedef sistem üzerinde gerçekleştirilen geniş çaplı zafiyet tarama ve sızma testi sonuçlarına göre hesaplanan genel güvenlik durumu ön sayfalarda özetlenmiştir. 
              Mevcut skor, dışarıdan gelebilecek karmaşık saldırılara, yapılandırma hatalarına ve teknoloji ifşalarına karşı varlıklarınızın genel direncini ifade eder. 
              Aşağıdaki "Teknik Kanıtlar ve Bulgular" listesi, acil müdahale gerektiren riskleri ve CVSS puanlarını içermektedir.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2">ÖNCELİKLİ BULGULAR LİSTESİ (CVSS DEĞERLERİ)</h4>
            
            {displayFindings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 mt-6">
                {displayFindings.map((f, idx) => (
                  <div key={idx} className={`flex flex-col border border-slate-200 rounded-xl p-5 bg-white shadow-sm border-l-4 ${f.severity === 'CRITICAL' ? 'border-l-rose-600' : f.severity === 'HIGH' ? 'border-l-orange-500' : 'border-l-amber-400'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ShieldAlert size={16} className={f.severity === 'CRITICAL' ? 'text-rose-600' : 'text-orange-500'} />
                        <span className="font-black text-sm text-slate-800 uppercase tracking-tighter">{f.id.replace(/_/g, ' ')}</span>
                      </div>
                      <span className={`px-3 py-1 rounded text-[9px] font-black tracking-widest text-white ${f.severity === 'CRITICAL' ? 'bg-rose-600' : f.severity === 'HIGH' ? 'bg-orange-600' : 'bg-amber-500'}`}>
                        CVSS: {f.cvss || 'N/A'} - {f.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {f.title || 'Tespit Edilen Güvenlik Konfigürasyon Hatası'} durum tespit edilmiştir. İlgili güvenlik kontrolü, sistemin genel güvenlik bütünlüğünü sağlamak adına detaylandırılmış risk değerlendirmesi kapsamındadır.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl p-8 text-center text-emerald-800">
                 <ShieldCheck size={40} className="mx-auto mb-4 opacity-50" />
                 <p className="font-black text-sm tracking-widest uppercase">KRİTİK YA DA YÜKSEK SEVİYELİ BULGUYA RASTLANMAMIŞTIR</p>
              </div>
            )}
          </div>
          
        </div>
      </Page>
    </>
  );
};
