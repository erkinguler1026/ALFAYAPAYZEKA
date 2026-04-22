/**
 * @file FullReportComponents.jsx
 * @description ALFA X-RAY V3 "Forensic Edition" Görsel Sistem Bileşenleri.
 * 
 * Bu dosya, raporun tüm bölümlerinde kullanılan atomik UI bileşenlerini içerir.
 * Tasarım Prensipleri:
 *  - Pastel Kurumsal Renk Paleti (Mint, Blue, Slate).
 *  - Print-Ready: PDF çıktıları için optimize edilmiş CSS ve layout.
 *  - Premium Tipografi: Yüksek yoğunluklu teknik veri sunumu.
 */

import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

/**
 * @component IsoBadge
 * @description Tekil ISO maddelerini göstermek için kullanılan klasik rozet.
 * Geriye dönük uyumluluk için korunmuştur.
 */
export const IsoBadge = ({ isoId, isoName }) => (
  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/50 px-2 py-0.5 rounded-lg shadow-sm">
    <ShieldCheck size={10} className="text-blue-600" />
    <span className="text-[7px] font-black text-blue-800 uppercase tracking-tighter">{isoName || 'ISO 27001'}:</span>
    <span className="text-[8px] font-mono font-black text-blue-600">{isoId}</span>
  </div>
);

const Badge = ({ label, value, color = "emerald" }) => (
  <div className={`flex items-center gap-1.5 bg-${color}-50 border border-${color}-100/50 px-2 py-0.5 rounded-lg shadow-sm`}>
    <span className={`text-[7px] font-black text-${color}-800 uppercase tracking-tighter`}>{label}:</span>
    <span className={`text-[8px] font-mono font-black text-${color}-600 whitespace-nowrap`}>{value}</span>
  </div>
);

/**
 * @component ComplianceBadges
 * @description Bölüm başlıklarında kullanılan çoklu standart uyumluluk rozetleri.
 * ISO 27001/2/5, ITIL ve COBIT çapraz eşleştirmelerini görselleştirir.
 */
export const ComplianceBadges = ({ mapping }) => {
  if (!mapping) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {mapping.iso27005 && <Badge label="ISO 27005" value={mapping.iso27005} color="blue" />}
      {mapping.iso27001 && <Badge label="ISO 27001" value={mapping.iso27001} color="emerald" />}
      {mapping.iso27002 && <Badge label="ISO 27002" value={mapping.iso27002} color="slate" />}
      {mapping.itil && <Badge label="ITIL v4" value={mapping.itil} color="indigo" />}
      {mapping.cobit && <Badge label="COBIT" value={mapping.cobit} color="amber" />}
    </div>
  );
};

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
    <span className={`text-[9px] font-bold ${inverted ? 'text-white/40' : 'text-slate-400'} tracking-widest`}>
      {String(label || '').toLocaleUpperCase('en-US')}
    </span>
    <span className={`text-[13px] font-black ${inverted ? 'text-white' : 'text-slate-900'} tracking-tight`}>{value || 'N/A'}</span>
  </div>
);

/**
 * PAGE KONTROL MERKEZİ (A4 Standartları & Layout)
 *
 * pageNum ve totalPages doğrudan prop olarak gelir.
 * calculatePageLayout() fonksiyonu ile hesaplanan gerçek değerler kullanılır.
 *
 * @param {number} pageNum    - Bu sayfanın sıra numarası
 * @param {number} totalPages - Toplam sayfa sayısı (gerçek veriden hesaplanmış)
 * @param {string} title      - Sayfa başlığı
 * @param {boolean} isCover   - Kapak sayfası düzeni
 * @param {object} t          - Dil çeviri nesnesi
 */
export const Page = ({ children, pageNum, totalPages, title, isCover, t }) => {
  const pStr = String(pageNum ?? '?').padStart(3, '0');
  const tStr = String(totalPages ?? '?').padStart(3, '0');

  return (
    <div
      className={`bg-white border-b border-gray-100 relative w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] overflow-hidden flex flex-col print:border-none print:p-[20mm] print:mb-0 ${isCover ? 'p-[15mm]' : 'p-[20mm]'}`}
      style={{ breakAfter: 'page', pageBreakAfter: 'always' }}
    >
      {!isCover && (
        <div className="absolute top-[7mm] left-0 right-0 flex justify-center opacity-10 pointer-events-none select-none text-center">
          <span className="text-[12px] font-black tracking-[12px] uppercase">
            {t?.classificationLabel || (t?.reportTitle?.includes('PENETRASYON') ? 'TİCARİ SIR — KİŞİYE ÖZEL GİZLİ' : 'COMMERCIAL SECRET — PRIVATE & CONFIDENTIAL')}
          </span>
        </div>
      )}

      {!isCover && (
        <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Shield className="text-primary" size={20} />
              <span className="font-black tracking-tighter text-lg uppercase underline decoration-primary decoration-4 underline-offset-4">
                {t?.unitTitle || (t?.reportTitle?.includes('PENETRASYON') ? 'ALFA YAPAY ZEKA — GÜVENLİK BİRİMİ' : 'ALFA ARTIFICIAL INTELLIGENCE — SECURITY UNIT')}
              </span>
            </div>
            <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              REAL-TIME PENETRATION AUDIT — CODE: ALFA-XRAY-V3
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-black text-gray-900 bg-gray-100 px-3 py-1 rounded">
              PAG: {pStr} / {tStr}
            </span>
          </div>
        </div>
      )}

      {!isCover && title && (
        <div className="mb-6">
          <h2 className="text-3xl font-black tracking-tighter border-l-8 border-primary pl-4 bg-slate-50 py-3 uppercase">
            {title}
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-primary to-transparent mt-1" />
        </div>
      )}

      <div className={`flex-1 ${isCover ? 'flex flex-col relative' : 'text-[11px] leading-relaxed relative'}`}>
        {children}
      </div>

      {!isCover && (
        <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] border-t border-gray-200 pt-3 flex justify-between items-center text-[8px] text-slate-300 font-bold">
          <span className="tracking-widest">{t?.footer?.meta}</span>
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-primary" />
            <span>{t?.footer?.copyright}</span>
          </div>
        </div>
      )}
    </div>
  );
};
/**
 * @component RiskMatrix
 * @description Yönetici özeti için 5x5 Risk Isı Haritası (Likelihood vs Impact).
 */
export const RiskMatrix = ({ findings = [], t }) => {
  // Severity to Matrix mapping (Olasılık ve Etki tahmini)
  const matrixData = findings.map(f => {
    if (f.severity === 'CRITICAL') return { x: 4, y: 4, color: 'bg-rose-600' };
    if (f.severity === 'HIGH') return { x: 3, y: 4, color: 'bg-orange-500' };
    if (f.severity === 'MEDIUM') return { x: 2, y: 2, color: 'bg-yellow-400' };
    return { x: 1, y: 1, color: 'bg-blue-400' };
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        {/* Y-Axis Label (Rotated) */}
        <div className="flex items-center h-full">
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] -rotate-90 whitespace-nowrap origin-center">
              {t?.reportTitle?.includes('PENETRASYON') ? 'ETKİ (IMPACT)' : 'IMPACT'}
           </span>
        </div>
        
        {/* Grid */}
        <div className="relative flex-1">
           <div className="grid grid-cols-5 grid-rows-5 gap-1 w-[220px] h-[220px] border-b-2 border-l-2 border-slate-200 p-1">
              {[...Array(25)].map((_, i) => {
                 const x = i % 5;
                 const y = 4 - Math.floor(i / 5);
                 
                 // Renk paleti (Heatmap mantığı)
                 let bg = 'bg-slate-50';
                 if (x + y >= 6) bg = 'bg-rose-50';
                 else if (x + y >= 4) bg = 'bg-orange-50';
                 else if (x + y >= 2) bg = 'bg-yellow-50';
                 
                 return (
                    <div key={i} className={`rounded-sm ${bg} transition-colors relative flex items-center justify-center`}>
                       {matrixData.map((d, idx) => (d.x === x && d.y === y) && (
                          <div key={idx} className={`w-3 h-3 rounded-full ${d.color} shadow-sm animate-pulse absolute`} style={{ left: `${Math.random()*40 + 30}%`, top: `${Math.random()*40 + 30}%` }} />
                       ))}
                    </div>
                 );
              })}
           </div>
           
           {/* X-Axis Label */}
           <div className="w-full text-center mt-2">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">
                 {t?.reportTitle?.toUpperCase().includes('PENETRASYON') || t?.reportTitle?.toUpperCase().includes('PENETRATION') ? 'OLASILIK (LIKELIHOOD)' : 'LIKELIHOOD'}
              </span>
           </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2">
         <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-rose-600" />
            <span className="text-[7px] font-bold text-slate-400 uppercase">Critical</span>
         </div>
         <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-[7px] font-bold text-slate-400 uppercase">High</span>
         </div>
         <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-[7px] font-bold text-slate-400 uppercase">Medium</span>
         </div>
      </div>
    </div>
  );
};
