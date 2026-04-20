/**
 * FULL REPORT: TABLE OF CONTENTS (İÇİNDEKİLER)
 *
 * layout prop'u calculatePageLayout(auditData) fonksiyonundan gelir.
 * Her bölümün gerçek sayfa numarasını dinamik olarak gösterir.
 */
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Page } from './FullReportComponents';

export const TableOfContents = ({ t, layout }) => {
  const totalPages = layout?.total ?? '?';
  const fmt = (n) => String(n ?? '?').padStart(3, '0');

  const items = [
    { title: t.sections.s1,  page: layout?.s1 },
    { title: t.sections.s3,  page: layout?.s2 },
    { title: t.sections.s5,  page: layout?.s3 },
    { title: t.sections.s8,  page: layout?.s4 },
    { title: t.sections.n1,  page: layout?.s5 },
    { title: t.sections.n2,  page: layout?.s6 },
    { title: t.sections.n3,  page: layout?.s7 },
    { title: t.sections.n4,  page: layout?.s8 },
    { title: t.sections.n5,  page: layout?.s9 },
    { title: t.sections.n6,  page: layout?.s10 },
    { title: t.sections.n7,  page: layout?.s11 },
    { title: t.sections.n8,  page: layout?.s12 },
    { title: "TEKNİK BULGU VE KANIT DOSYASI (JSON DUMP)", page: layout?.dump1 },
    { title: "YASAL BİLGİLENDİRME VE SORUMLULUK",       page: layout?.legal },
    { title: t.items?.final || "RESMİ ONAY VE DİJİTAL İMZA", page: layout?.final },
  ];

  return (
    <>
      {/* PAGE 2: İÇİNDEKİLER LİSTESİ */}
      <Page pageNum={layout?.toc} totalPages={totalPages} title={t.tocTitle} t={t}>
        <div className="space-y-12">
          <p className="text-gray-500 italic text-base leading-relaxed bg-slate-50 p-8 rounded-[2.5rem] border-l-8 border-primary shadow-sm text-left">
            {t.tocDesc}
          </p>

          <div className="grid grid-cols-1 gap-4 px-4 text-left">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center group">
                <span className="font-black tracking-tighter text-slate-700 uppercase group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <div className="flex-1 mx-4 border-b border-dotted border-slate-200" />
                <span className="font-mono font-black text-slate-400 group-hover:text-slate-900 transition-colors text-right">
                  PAG. {fmt(item.page)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* PAGE 3: GÜVENLİK SERTİFİKASYONU */}
      <Page pageNum={layout?.cert} totalPages={totalPages} title="GÜVENLİK SERTİFİKASYONU BEYANI" t={t}>
        <div className="flex items-center justify-center h-full pb-[150px]">
          <div className="p-10 bg-slate-50 border border-slate-200 rounded-[3rem] relative overflow-hidden shadow-sm animate-in fade-in zoom-in duration-700 w-full">
            <ShieldCheck
              className="absolute -top-4 -right-4 text-primary opacity-5 print:!opacity-5 print:text-slate-200"
              style={{ opacity: 0.05 }}
              size={110}
              strokeWidth={1}
            />
            <div className="relative z-10 text-left">
              <h4 className="text-slate-900 text-2xl font-black mb-4 uppercase tracking-tighter">
                GÜVENLİK SERTİFİKASYONU VE BÜTÜNLÜK
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed font-bold italic pr-20">
                Bu rapor, ALFA XRAY-V3 motoru tarafından üretilmiş olup, uluslararası sızma testi standartlarına (OWASP, NIST, ISO 27001:2022 BGYS) tam uyumluluk göstermektedir. Dijital hash imzası ile bütünüyle korunmaktadır.
              </p>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};
