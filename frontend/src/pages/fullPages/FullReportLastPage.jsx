import React from 'react';
import { Database, Shield, ShieldCheck, Terminal, QrCode, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Page, DataItem } from './FullReportComponents';


export const LastPages = ({ auditData, t, layout, totalPages, siteName, metadata }) => {

  const clauses = auditData.disclaimer?.clauses || [];

  const dumpText = JSON.stringify(auditData || {}, null, 2);
  const dumpChunks = Array.from({ length: Math.ceil(dumpText.length / 1200) }, (_, i) =>
    dumpText.slice(i * 1200, i * 1200 + 1200)
  );

  return (
    <>


      {/* DYNAMIC TECHNICAL DUMP CHUNKS */}
      {dumpChunks.map((chunk, idx) => (
         <Page key={`dump-${idx}`} pageNum={(layout?.dump1 ?? 30) + idx} totalPages={totalPages} title={`TEKNİK KANIT VE VERİ DUMPU — PART ${idx + 1}`} t={t}>
            <div className="space-y-6">
               {idx === 0 && (
                  <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-[2.5rem] mb-4">
                     <div className="flex items-center gap-4 mb-4">
                        <Database size={32} className="text-blue-900" />
                        <h4 className="text-xl font-black text-blue-900 uppercase tracking-tighter">HAM TEKNİK KANITLAR (FORENSIC DUMP)</h4>
                     </div>
                     <p className="text-[10px] font-bold text-blue-900/60 leading-relaxed uppercase tracking-widest">
                        AŞAĞIDAKİ VERİLER, ADLİ ANALİZİ YAPILAN SİSTEMİN TÜM JSON ÇIKTILARINI VE RAW-API YANITLARINI İÇERMEKTEDİR.
                     </p>
                  </div>
               )}

               <div className="space-y-8">
                  <section className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Terminal size={100} className="text-blue-600" />
                     </div>
                     <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">DUMP PART_{idx + 1}.LOG</h5>
                     <pre className="font-mono text-[7px] text-slate-500 leading-tight max-h-[750px] overflow-hidden text-left whitespace-pre-wrap break-all">
                        {chunk}
                     </pre>
                  </section>
               </div>
            </div>
         </Page>
      ))}

      {/* LEGAL PAGE */}
      <Page pageNum={layout?.legal} totalPages={totalPages} title="YASAL BİLGİLENDİRME VE SORUMLULUK" t={t}>
         <div className="space-y-6">
            {clauses.map((c, i) => (
               <div key={i} className="border-b border-slate-100 pb-4">
                  <h5 className="font-black text-xs text-slate-900 mb-2 uppercase tracking-tighter">{c.heading}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold text-justify">{c.text}</p>
               </div>
            ))}
            <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-[10px] text-slate-400 font-bold leading-relaxed">
               "Bu rapor ALFA YAPAY ZEKA Teknolojileri tarafından AI destekli olarak gerçek şartlarda üretilmiştir. Herhangi bir düzenleme veya manipülasyon raporun kurguladığı dijital hash imzasını (Integrity Hash) geçersiz kılar. Raporun tüm sayfaları dijital olarak şifrelenmiştir."
            </div>
         </div>
      </Page>

      {/* 
          FINAL ONAY SAYFASI (Page 250) 
          Raporun en son sayfasıdır. Burada denetim doğrulaması, QR Kod ve resmî imza yer alır.
      */}
      <Page pageNum={layout?.final} totalPages={totalPages} title={t.items?.final} t={t}>
        <div className="h-full flex flex-col justify-between pt-12 pb-6">
           <div className="space-y-[40px]">
              {/* 
                  DİNAMİK METİNLER (Translation Object):
                  Aşağıdaki {t.signatureDisclaimer} ifadesi dil seçimine göre (TR/EN) otomatik dolar. 
                  Bu metinler doğrudan burada yazılı değildir, merkezi çeviri dosyasından beslenir.
              */}
              <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-slate-200 pl-6 pr-12 text-left">
                 {t.signatureDisclaimer}
              </p>
    
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[2rem] space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-left">AUDIT INTEGRITY VERIFICATION</h4>
                 <div className="flex items-center gap-8">
                    <ShieldCheck size={40} className="text-green-600" />
                    <div className="font-mono text-[9px] text-slate-500 uppercase leading-loose text-left">
                       <p>ENGINE: ALFA-XRAY-V3.0 (SECURITY INTELLIGENCE CORE)</p>
                       <p>TARGET: HTTPS://WWW.{siteName.toUpperCase()}</p>
                       <p>INTEGRITY HASH: {metadata.integrityHash}</p>
                       <p>VERIFICATION DATE: {metadata.isoDate}</p>
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center justify-start mt-4">
                 {/* 
                     QR-CODE BÖLÜMÜ:
                     QRCodeSVG bileşeni raporun dijital doğrulama linkini ve özet verilerini 
                     içeren karekodun teknik olarak üretildiği yerdir.
                 */}
                 <div className="bg-white border-2 border-slate-200 p-4 rounded-[1.5rem] shadow-sm flex items-center justify-center relative group">
                    <QRCodeSVG 
                      value={`TGT: www.${siteName.toLowerCase()}\nHASH: ${metadata.integrityHash.slice(0, 20)}...\nDATE: ${metadata.isoDate}`}
                      size={120}
                      level={"H"}
                      includeMargin={true}
                    />
                 </div>
              </div>
           </div>
    
           {/* 
               İmza ve Unvan Alanı:
               Sayfa taşmasını önlemek için 'pt-4' (padding-top) kullanılarak yukarı çekilmiştir. 
               Görselliği bozan eski 'STAMP' (Damga) yapısı buradan kaldırılmıştır.
           */}
           <div className="flex justify-end -mt-24 pr-12">
              <div className="text-right flex flex-col items-end">
                 <div className="relative inline-block z-10 -mb-12 mr-6">
                    <img src="/CLEAN_SIGNATURE_EG_FINAL.png" alt="Signature" className="h-[120px] mix-blend-multiply brightness-90 contrast-125" />
                 </div>
                 <div className="space-y-1 relative z-0 pt-4 min-w-[250px]">
                    <p className="text-3xl font-black tracking-tighter leading-none text-slate-900">{t.signatureName}</p>
                    <p className="text-base font-bold text-primary mt-1">{t.signatureHead}</p>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mt-1">{t.signatureUnit}</p>
                 </div>
              </div>
           </div>
           
           <div className="pt-4 flex justify-between items-end">
              <div className="space-y-1 text-left">
                 <p className="text-[8px] text-slate-300 font-mono uppercase tracking-[0.2em]">DOSS_ID: {metadata.dossierId}</p>
                 <p className="text-[8px] text-slate-300 font-mono uppercase tracking-[0.2em]">SYS_NODE: ALFA-PRIMARY-XRAY-TX-CORE</p>
              </div>
              <div className="px-3 py-1 bg-slate-50 border rounded text-[8px] font-black text-slate-400 uppercase tracking-widest">
                 END OF DOSSIER — PAGE 250
              </div>
           </div>
        </div>
      </Page>
    </>
  );
};
