/**
 * FULL REPORT: TABLE OF CONTENTS (İÇİNDEKİLER)
 * 
 * Bu modül, raporun adli bilişim (forensic) hiyerarşisini listeler.
 * Sayfa numaraları manuel (static) olarak verilmiştir çünkü 
 * raporun fiziki yapısı (A4 dökümü) sabittir.
 */
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Page } from './FullReportComponents';

/**
 * TableOfContents Component
 * 
 * @param {object} t - Dil çeviri nesnesi
 * @param {number} totalPages - Toplam sayfa sayısı (250)
 */
export const TableOfContents = ({ t, totalPages }) => {
  return (
    <Page pageNum={2} totalPages={totalPages} title={t.tocTitle} t={t}>
      <div className="space-y-12">
        {/* Giriş Özeti: Raporun amacını açıklar */}
        <p className="text-gray-500 italic text-base leading-relaxed bg-slate-50 p-8 rounded-[2.5rem] border-l-8 border-primary shadow-sm text-left">
          {t.tocDesc}
        </p>
        
        {/* Bölüm Listesi: S1 - S12 Forensic Sequence */}
        <div className="grid grid-cols-1 gap-4 px-4 text-left">
          {[
            { id: "S1", title: t.sections.s1, page: "010" },
            { id: "S2", title: t.sections.s3, page: "025" },
            { id: "S3", title: t.sections.s5, page: "040" },
            { id: "S4", title: t.sections.s8, page: "055" },
            { id: "S5", title: t.sections.n1, page: "070" },
            { id: "S6", title: t.sections.n2, page: "115" },
            { id: "S7", title: t.sections.n3, page: "130" },
            { id: "S8", title: t.sections.n4, page: "145" },
            { id: "S9", title: t.sections.n5, page: "160" },
            { id: "S10", title: t.sections.n6, page: "175" },
            { id: "S11", title: t.sections.n7, page: "190" },
            { id: "S12", title: t.sections.n8, page: "210" },
            { id: "DUMP", title: "TEKNİK BULGU VE KANIT DOSYASI (JSON DUMP)", page: "235" },
            { id: "LEGAL", title: "YASAL BİLGİLENDİRME VE SORUMLULUK", page: "248" },
            { id: "LAST", title: t.items?.final || "RESMİ ONAY VE DİJİTAL İMZA", page: "250" },
          ].map((item) => (
            <div key={item.id} className="flex items-center group">
              <span className="font-mono text-primary font-black opacity-40 group-hover:opacity-100 transition-opacity w-12">{item.id}</span>
              <span className="font-black tracking-tighter text-slate-700 uppercase group-hover:text-primary transition-colors">{item.title}</span>
              <div className="flex-1 mx-4 border-b border-dotted border-slate-200" />
              <span className="font-mono font-black text-slate-400 group-hover:text-slate-900 transition-colors text-right">PAG. {item.page}</span>
            </div>
          ))}
        </div>

        {/* Sertifikasyon Vurgu Kartı: Güven mesajı verir */}
        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] relative overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-700">
           <ShieldCheck className="absolute -top-4 -right-4 text-white opacity-10" size={160} />
           <div className="relative z-10 text-left">
              <h4 className="text-white text-2xl font-black mb-4 uppercase tracking-tighter">GÜVENLİK SERTİFİKASYONU VE BÜTÜNLÜK</h4>
              <p className="text-white/70 text-sm leading-relaxed font-bold italic pr-20">
                 Bu rapor, ALFA XRAY-V3 motoru tarafından üretilmiş olup, uluslararası sızma testi standartlarına (OWASP, NIST, ISO 27001) tam uyumluluk göstermektedir. Dijital hash imzası ile bütünüyle korunmaktadır.
              </p>
           </div>
        </div>
      </div>
    </Page>
  );
};
