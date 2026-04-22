/**
 * FULL REPORT: COVER PAGE (KAPAK SAYFASI) - RESTORED & FIXED
 * 
 * Bu modül, raporun en ön yüzünü oluşturur. 
 * 'Harika' tasarım standartlarını korur.
 */
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Page } from './FullReportComponents';

/**
 * CoverPage Component
 */
export const CoverPage = ({ siteName, t, metadata, totalPages }) => {
  return (
    <Page pageNum={1} totalPages={totalPages} isCover t={t}>
       <div className="w-full h-full border-[10px] border-double border-slate-100 flex flex-col items-center justify-between p-12 relative bg-white w-full z-10">
          
          {/* 1. ÜST GRUP: Logo ve Başlık */}
          <div className="flex flex-col items-center mt-4">
             <div className="mb-10">
                <ShieldCheck size={100} className="text-blue-600" />
             </div>
             <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase flex flex-col items-center">
                   <span>{t.reportTitle}</span>
                   <span className="mt-2 text-slate-900">{t.reportVariant} {t.reportSuffix}</span>
                </h1>
                <p className="text-[14px] font-bold text-slate-400 tracking-[0.4em] uppercase">
                   {t.items?.coverScope}
                </p>
             </div>
          </div>
  
          {/* 2. ORTA GRUP: Domain ve Metadata (Sayfanın Tam Merkezinde) */}
          <div className="w-full max-w-4xl px-16 space-y-16">
             <div className="space-y-12">
                <div className="w-full h-px bg-slate-200/60" />
                <div className="text-center py-4">
                   <p className="text-[11px] font-black text-slate-300 uppercase tracking-[4px] mb-6">{t.targetDomainLabel}</p>
                   <h5 className="font-serif font-black text-slate-900 tracking-[-0.02em] leading-none text-center px-4 whitespace-nowrap" 
                        style={{ fontSize: (siteName.length > 20 ? '1.6rem' : '2.2rem') }}>
                       https://www.{siteName.toLowerCase()}
                    </h5>
                </div>
                <div className="w-full h-px bg-slate-200/60" />
             </div>

             <div className="grid grid-cols-2 gap-x-16 gap-y-10 px-4">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.reportNo}</p>
                   <p className="text-sm font-mono font-black text-slate-800 tracking-tighter">#ALFA-XRAY-V3-FULL</p>
                </div>
                <div className="space-y-1 text-right">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.analysisDate}</p>
                   <p className="text-sm font-mono font-black text-slate-800">{metadata.dateStr} {metadata.timeStr}</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 bg-red-50/40 py-2 rounded-r-xl">
                   <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{t.classification}</p>
                   <p className="text-xs font-black text-red-700 uppercase">{t.confidential}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/40 py-2 rounded-r-xl">
                   <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{t.status}</p>
                   <p className="text-xs font-black text-blue-700 uppercase">{t.completed}</p>
                </div>
             </div>
          </div>

          {/* 3. ALT GRUP: Teknik Footer (Bağımsız değil, justify-between ile en alta itilir) */}
          <div className="w-full flex flex-col items-center gap-4 px-16 mb-6">
             <div className="w-full h-px bg-slate-100 max-w-4xl" />
             <p className="text-[11px] font-mono font-black text-slate-300 uppercase tracking-[0.5em]">
                ALFA AI PENETRATION TEST ENGINE V4.1
             </p>
          </div>
       </div>
    </Page>
  );
};
