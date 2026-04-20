import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

export const CVSSBadge = ({ score }) => {
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

export const DataItem = ({ label, value, inverted }) => (
  <div className={`flex flex-col border-l-2 ${inverted ? 'border-white/20' : 'border-primary'} pl-4 py-1`}>
    <span className={`text-[9px] font-bold ${inverted ? 'text-white/40' : 'text-slate-400'} uppercase tracking-widest`}>{label}</span>
    <span className={`text-[13px] font-black ${inverted ? 'text-white' : 'text-slate-900'} tracking-tight`}>{value || 'N/A'}</span>
  </div>
);

/**
 * PAGE KONTROL MERKEZİ (A4 Standartları & Layout)
 * 
 * Bu bileşen, tüm Full Rapor sayfalarının (Kapak dahil) ana iskeletini oluşturur.
 * A4 boyutları (210x297mm) ve yazdırma standartları burada tanımlanmıştır.
 * 
 * @param {boolean} isCover - Eğer true ise kapak sayfası düzenine geçer (Padding ve Header/Footer farkı).
 */
export const Page = ({ children, pageNum, title, isCover, t }) => (
  /* 
     ANA KONTEYNIR:
     - w-[210mm] h-[297mm]: Kesin A4 boyutları.
     - print:p-0: Yazdırırken tarayıcı padding'lerini sıfırlar.
     - isCover ? 'p-[15mm]' : 'p-[20mm]': 
        * Kapak sayfasında çerçeve (border) kenardan 15mm içeride durur (Snap Report ile uyum).
        * İçerik sayfalarında ise daha ferah bir okuma için 20mm boşluk bırakılır.
  */
  <div className={`bg-white border-b border-gray-100 relative w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] overflow-hidden flex flex-col print:border-none print:p-0 print:mb-0 ${isCover ? 'p-[15mm]' : 'p-[20mm]'}`} style={{ breakAfter: 'page', pageBreakAfter: 'always' }}>
    {!isCover && (
      <div className="absolute top-[8mm] left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none text-center">
         <span className="text-[12px] font-black tracking-[12px] uppercase">{t?.classificationLabel || 'TİCARİ SIR — KİŞİYE ÖZEL GİZLİ'}</span>
      </div>
    )}

    {!isCover && (
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={20} />
            <span className="font-black tracking-tighter text-lg uppercase underline decoration-primary decoration-4 underline-offset-4">{t.unitTitle || 'ALFA YAPAY ZEKA — GÜVENLİK BİRİMİ'}</span>
          </div>
          <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">REAL-TIME PENETRATION AUDIT — CODE: ALFA-XRAY-V3</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-black text-gray-900 bg-gray-100 px-3 py-1 rounded">PAG: {pageNum.toString().padStart(3, '0')} / 250</span>
        </div>
      </div>
    )}

    {!isCover && title && (
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tighter border-l-8 border-primary pl-4 bg-slate-50 py-3 uppercase">{title}</h2>
        <div className="h-0.5 bg-gradient-to-r from-primary to-transparent mt-1" />
      </div>
    )}

    <div className={`flex-1 ${isCover ? 'flex flex-col relative' : 'text-[11px] leading-relaxed relative'}`}>
      {children}
    </div>

    {!isCover && (
      <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] border-t border-gray-200 pt-3 flex justify-between items-center text-[8px] text-slate-300 font-bold">
        <span className="tracking-widest">{t.footer?.meta}</span>
        <div className="flex items-center gap-2">
           <ShieldCheck size={12} className="text-primary" />
           <span>{t.footer?.copyright}</span>
        </div>
      </div>
    )}
  </div>
);


