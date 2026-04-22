/**
 * FULL REPORT: TABLE OF CONTENTS (İÇİNDEKİLER)
 *
 * layout prop'u calculatePageLayout(auditData) fonksiyonundan gelir.
 * Her bölümün gerçek sayfa numarasını dinamik olarak gösterir.
 */
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Page } from './FullReportComponents';

const TocItem = ({ num, title, page }) => (
  <div className="flex items-center group py-0.5">
    <span className="font-mono text-slate-400 mr-4 text-[10px]">{num}</span>
    <span className="font-bold tracking-tight text-slate-600 uppercase group-hover:text-primary transition-colors text-[11px]">
      {title}
    </span>
    <div className="flex-1 mx-4 border-b border-dotted border-slate-200" />
    <span className="font-mono font-black text-slate-400 group-hover:text-slate-900 transition-colors text-right text-[10px]">
      PAG. {String(page ?? '?').padStart(3, '0')}
    </span>
  </div>
);

export const TableOfContents = ({ t, layout }) => {
  const totalPages = layout?.total ?? '?';

  const items = [
    { title: t.items?.evalSummary, page: layout?.summary },
    { title: t.sections.s1, page: layout?.s1 },
    { title: t.sections.s2, page: layout?.s2 },
    { title: t.sections.s3, page: layout?.s3 },
    { title: t.sections.s4, page: layout?.s4 },
    { title: t.sections.s5, page: layout?.s5 },
    { title: t.sections.s6, page: layout?.s6 },
    { title: t.sections.s7, page: layout?.s7 },
    { title: t.sections.s8, page: layout?.s8 },
    { title: t.sections.s9, page: layout?.s9 },
    { title: t.sections.s10, page: layout?.s10 },
    { title: t.sections.s11, page: layout?.s11 },
    { title: t.sections.s12, page: layout?.s12 },
    { title: t.sections.s13, page: layout?.s13 },
    { title: t.sections.s14, page: layout?.s14 },
    { title: t.sections.s15, page: layout?.s15 },
    { title: t.sections.s16, page: layout?.s16 },
    { title: t.items?.dumpTitle, page: layout?.last },
    { title: t.items?.final, page: layout?.final },
  ];

  return (
    <>
      {/* PAGE 2: İÇİNDEKİLER LİSTESİ */}
      <Page pageNum={layout?.toc} totalPages={totalPages} title={t.tocTitle} t={t}>
        <div className="space-y-6">
          <p className="text-gray-500 italic text-[15px] leading-relaxed bg-slate-50 px-8 py-5 rounded-[2.5rem] border-l-8 border-primary shadow-sm text-left">
            {t.tocDesc}
          </p>

          <div className="grid grid-cols-1 gap-2 px-4 text-left mt-[-10px]">
            {items.map((item, idx) => (
              <TocItem 
                key={idx} 
                num={String(idx + 1).padStart(2, '0')} 
                title={item.title} 
                page={item.page} 
              />
            ))}
          </div>
        </div>
      </Page>

      {/* PAGE 3: GÜVENLİK SERTİFİKASYONU */}
      <Page pageNum={layout?.cert} totalPages={totalPages} title={t.items?.certTitle} t={t}>
        <div className="flex flex-col h-full space-y-12 pt-10">
          {/* Certification Frame */}
          <div className="p-10 bg-slate-50 border border-slate-200 rounded-[3rem] relative overflow-hidden shadow-sm animate-in fade-in zoom-in duration-700 w-full">
            <ShieldCheck
              className="absolute -top-4 -right-4 text-primary opacity-5 print:!opacity-5 print:text-slate-200"
              style={{ opacity: 0.05 }}
              size={110}
              strokeWidth={1}
            />
            <div className="relative z-10 text-left">
              <h4 className="text-slate-900 text-2xl font-black mb-4 uppercase tracking-tighter">
                {t.items?.certHeading}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed font-bold italic pr-20">
                {t.items?.certDesc}
              </p>
            </div>
          </div>

          {/* Referenced Standards Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="h-px flex-1 bg-slate-100" />
               <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
                  {t.reportTitle?.includes('PENETRASYON') ? 'REFERANS ALINAN STANDARTLAR' : 'REFERENCED STANDARDS'}
               </h5>
               <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { id: "ISO 27001:2022", name: "Information Security Management", color: "emerald" },
                 { id: "ISO 27002:2022", name: "Security Control Implementation", color: "slate" },
                 { id: "ISO 27005:2022", name: "Information Security Risk Management", color: "blue" },
                 { id: "ITIL v4", name: "Service Management & IT Operations", color: "indigo" },
                 { id: "COBIT 2019", name: "Governance & Enterprise IT Control", color: "amber" },
                 { id: "OWASP TOP 10", name: "Web Application Security Risks", color: "rose" }
               ].map((std, i) => (
                 <div key={i} className={`flex items-start gap-4 p-5 rounded-[2rem] border border-${std.color}-100 bg-${std.color}-50/30 transition-all hover:bg-${std.color}-50 shadow-sm`}>
                    <div className={`w-10 h-10 rounded-xl bg-white border border-${std.color}-200 flex items-center justify-center shadow-sm flex-shrink-0`}>
                       <span className={`text-[10px] font-black text-${std.color}-600`}>{i+1}</span>
                    </div>
                    <div className="text-left">
                       <p className={`text-[11px] font-black text-${std.color}-800 tracking-tighter`}>{std.id}</p>
                       <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase tracking-tight mt-0.5">{std.name}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] mt-4 shadow-sm">
               <p className="text-[9px] font-mono text-slate-500 leading-relaxed text-center uppercase tracking-widest">
                  {t.reportTitle?.includes('PENETRASYON')
                    ? "ALFA X-RAY V3 CORE MOTORU, YUKARIDAKİ ÇERÇEVELERLE DOĞAL OLARAK UYUMLUDUR."
                    : "ALFA X-RAY V3 CORE ENGINE IS NATIVELY COMPLIANT WITH THE ABOVE FRAMEWORKS."}
                  <br/>
                  <span className="text-primary font-black">
                    {t.reportTitle?.includes('PENETRASYON') ? "OTOMATİK ÇAPRAZ REFERANS AKTİF." : "AUTOMATED CROSS-REFERENCING ACTIVE."}
                  </span>
               </p>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};
