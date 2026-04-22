import React from 'react';
import { Page, RiskMatrix, ComplianceBadges } from './FullReportComponents';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { safeUpper, GLOBAL_ISO_MAPPING } from './FullReportUtils';

/**
 * @component SummaryPage
 * @description Raporun yönetici özeti (Executive Summary) ve "Security Scorecard" sayfası.
 */
export const SummaryPage = ({ auditData, t, layout, totalPages }) => {
  const { grade, categoricalHealth, findings } = auditData;

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
    { g: 'A+', label: t.items?.excellent },
    { g: 'A', label: t.items?.hardened },
    { g: 'B', label: t.items?.fair },
    { g: 'C', label: t.items?.weak },
    { g: 'D', label: t.items?.risky },
    { g: 'F', label: t.items?.danger }
  ];

  const categories = [
    { name: safeUpper('SERVICE SECURITY'), val: categoricalHealth?.service ?? 100, mapping: GLOBAL_ISO_MAPPING.s7 },
    { name: safeUpper('SECURITY HEADERS'), val: categoricalHealth?.headers ?? 100, mapping: GLOBAL_ISO_MAPPING.s3 },
    { name: safeUpper('NETWORK SECURITY'), val: categoricalHealth?.network ?? 100, mapping: GLOBAL_ISO_MAPPING.s1 },
    { name: safeUpper('DOMAIN & WHOIS'),   val: categoricalHealth?.domain ?? 100,  mapping: GLOBAL_ISO_MAPPING.s10 },
    { name: safeUpper('SOFTWARE PATCHING'),val: categoricalHealth?.patching ?? 100, mapping: GLOBAL_ISO_MAPPING.s5 }
  ];

  const FINDING_ISO_MAP = {
    'hsts': 'A.8.26', 'csp': 'A.8.26', 'x-frame-options': 'A.8.26',
    'dmarc_missing': 'A.8.21', 'spf_missing': 'A.8.21',
    'insecure_http': 'A.8.24', 'ssl_grade_f': 'A.8.24',
    'open_database': 'A.8.21', 'insecure_ftp': 'A.8.21',
    'ip_reputation_low': 'A.5.7', 'insecure_cookies': 'A.8.26',
    'cors_misconfiguration': 'A.8.26', 'technology_exposure': 'A.8.8',
    'exposed_sensitive_files': 'A.8.26'
  };

  const displayFindings = findings?.filter(f => {
    const s = f.severity?.toUpperCase();
    return s === 'CRITICAL' || s === 'HIGH' || s === 'MEDIUM';
  }) || [];

  const findingCountText = `${displayFindings.length} ${t.items?.findingDetected}`;

  return (
    <>
      {/* İLK SAYFA: DASHBOARD & DONUTS */}
      <Page pageNum={layout?.summary} totalPages={totalPages} title="" t={t}>
        <div className="flex flex-col items-center justify-between h-full pt-4 pb-4">
          
          <div className="w-full text-left mb-6 px-6">
            <h2 className="text-[11px] font-black tracking-[0.3em] uppercase text-primary mb-4">{t.items?.benchmarkTitle}</h2>
            <div className="w-full h-px bg-slate-100" />
          </div>

          <div className="w-full max-w-3xl px-8 py-4 mb-2 mt-4 bg-slate-50/50 rounded-[2rem] border border-slate-100">
            <div className="flex justify-between items-start w-full relative">
              {grades.map((item) => {
                const isCurrent = currentGrade === item.g;
                return (
                  <div key={item.g} className="flex flex-col items-center relative w-16">
                    <span className={`text-[12px] font-black mb-1 transition-colors ${isCurrent ? 'text-primary scale-125' : 'text-slate-300'}`}>
                       {item.g}
                    </span>
                    <span className={`text-[7px] font-black tracking-widest uppercase ${isCurrent ? 'text-primary' : 'text-slate-300/50'}`}>
                       {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className={`text-[140px] font-black leading-none ${currentGradeColor} tracking-tighter`}>
              {currentGrade}
            </div>
            
            <div className="flex flex-col items-center mt-12 space-y-8">
               <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[12px]">
                 {findingCountText}
               </p>
               <div className={`px-10 py-3 rounded-full text-white text-[10px] font-black tracking-widest uppercase shadow-md ${displayFindings.length > 0 ? 'bg-orange-500 shadow-orange-500/20' : 'bg-emerald-500 shadow-emerald-500/20'}`}>
                 {displayFindings.length > 0 ? t.items?.remediationSuggested : t.items?.systemSecure}
               </div>
            </div>
          </div>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-10 mt-auto">
             <div className="text-center mb-10">
                <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">
                   {t.items?.healthTitle}
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
                     <span className="text-[8px] font-black text-slate-800 tracking-[0.1em] text-center leading-tight w-20 mb-2">
                       {cat.name}
                     </span>
                     <div className="scale-[0.65] origin-top">
                        <ComplianceBadges mapping={cat.mapping} />
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>

        </div>
      </Page>

      {/* İKİNCİ SAYFA: BULGULAR & RISK MATRİSİ */}
      <Page pageNum={layout?.summary2} totalPages={totalPages} title={t.items?.evalTitle} t={t}>
        <div className="flex flex-col h-full space-y-8">
          
          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-6">
                <div className="bg-blue-50/50 border-l-4 border-blue-500 p-8 rounded-r-3xl shadow-sm">
                   <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                         <ShieldCheck size={24} className="text-blue-600" />
                         <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">{t.items?.evalSummary}</h4>
                      </div>
                      <ComplianceBadges mapping={{ iso27005: "GLOBAL RISK" }} />
                   </div>
                   <p className="text-[10px] leading-relaxed text-slate-600 font-bold text-justify uppercase tracking-tight">
                      {t.items?.evalDesc}
                   </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center justify-center shadow-inner">
                   <div className="w-full flex justify-between items-center mb-6">
                      <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">DYNAMICS RISK HEATMAP (ISO 27005)</h5>
                      <ComplianceBadges mapping={{ iso27005: "8.1.1", iso27002: "5.1", itil: "ISM-01" }} />
                   </div>
                   <RiskMatrix findings={findings} t={t} />
                </div>
             </div>

             <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2">{t.items?.priorityFindings}</h4>
                
                <div className="space-y-3 max-h-[600px] overflow-hidden pr-2">
                   {displayFindings.length > 0 ? (
                      displayFindings.slice(0, 5).map((f, idx) => (
                         <div key={idx} className={`flex flex-col border border-slate-200 rounded-2xl p-4 bg-white shadow-sm border-l-4 ${f.severity === 'CRITICAL' ? 'border-l-rose-600' : f.severity === 'HIGH' ? 'border-l-orange-500' : 'border-l-amber-400'}`}>
                            <div className="flex items-center justify-between mb-2">
                               <span className="font-black text-[10px] text-slate-800 tracking-tighter uppercase">
                                  {String(f.id).replace(/_/g, ' ')}
                               </span>
                               <span className={`px-2 py-0.5 rounded text-[7px] font-black tracking-widest text-white ${f.severity === 'CRITICAL' ? 'bg-rose-600' : f.severity === 'HIGH' ? 'bg-orange-600' : 'bg-amber-500'}`}>
                                  CVSS: {f.cvss}
                               </span>
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold leading-tight line-clamp-2">
                               {f.title || 'SECURITY CONFIGURATION GAP DETECTED.'}
                            </p>
                         </div>
                      ))
                   ) : (
                      <div className="bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl p-8 text-center text-emerald-800">
                         <ShieldCheck size={40} className="mx-auto mb-4 opacity-50" />
                         <p className="font-black text-[10px] tracking-widest uppercase">{t.items?.noFindings}</p>
                      </div>
                   )}
                </div>
             </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center opacity-40">
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">ALFA X-RAY V3 — SECURITY AUDIT SYSTEM</span>
             <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">CONFIDENTIAL REPORT</span>
          </div>
        </div>
      </Page>
    </>
  );
};

