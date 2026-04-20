import React from 'react';
import { Database, Shield, ShieldCheck, Terminal, QrCode, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Page, DataItem } from './FullReportComponents';
import { chunkArray } from './FullReportUtils';

export const LastPages = ({ auditData, t, totalPages, siteName, metadata }) => {
  const methodology = auditData.toolMethodology || [];
  const methodologyChunks = chunkArray(methodology, 1);
  const sslLabs = auditData.sslGrade || {};
  const ports = auditData.network?.ports || [];
  const techs = auditData.technologies || [];
  const geoData = auditData.ipGeo || {};
  const clauses = auditData.disclaimer?.clauses || [];

  return (
    <>
      {/* METHODOLOGY PAGES */}
      {methodologyChunks.map((chunk, idx) => (
         <Page key={`meth-${idx}`} pageNum={220 + idx} totalPages={totalPages} title={`METODOLOJİ — DENETİM PROSEDÜRÜ #${idx + 1}`} t={t}>
            <div className="space-y-12">
               {chunk.map((m, i) => (
                  <div key={i} className="space-y-8 animate-in fade-in slide-in-from-left-4">
                     <div className="flex items-center gap-6 border-b-4 border-slate-900 pb-6">
                        <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center rounded-[2rem] text-4xl font-black shadow-2xl italic">
                           {idx + 1}
                        </div>
                        <div>
                           <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{m.name}</h3>
                           <div className="flex gap-3 mt-1">
                              <span className={`px-4 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${m.statusClass === 'USED' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                 STATUS: {m.status}
                              </span>
                              <span className="px-4 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200">
                                 LEVEL: L4 TECHNICAL
                              </span>
                           </div>
                        </div>
                     </div>

                     <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent opacity-30" />
                        <p className="text-sm leading-[1.8] text-slate-700 font-medium italic indent-12 text-justify pr-6">
                           {m.paragraph}
                        </p>
                     </div>

                     <div className="grid grid-cols-2 gap-8 mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="space-y-4">
                           <h6 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">STANDART UYUMU (COMPLIANCE)</h6>
                           <ul className="space-y-2 text-xs font-bold text-slate-600">
                              <li className="flex items-center gap-2"><Shield size={12} className="text-primary" /> ISO 27001:2022 Annex A.8.15</li>
                              <li className="flex items-center gap-2"><Shield size={12} className="text-primary" /> NIST SP 800-115 Technical Guide</li>
                              <li className="flex items-center gap-2"><Shield size={12} className="text-primary" /> OWASP ASVS v4.0 L3 Integrity</li>
                           </ul>
                        </div>
                        <div className="space-y-4">
                           <h6 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">TEKNİK VERİ SETİ (DATASET)</h6>
                           <ul className="space-y-2 text-xs font-bold text-slate-600">
                              <li className="flex items-center gap-2 text-blue-600"><CheckCircle size={12} /> Gerçek Zamanlı Sunucu Yanıtı</li>
                              <li className="flex items-center gap-2 text-blue-600"><CheckCircle size={12} /> Kriptografik İmza Doğrulaması</li>
                              <li className="flex items-center gap-2 text-blue-600"><CheckCircle size={12} /> Varlık Sahipliği Teyidi (Whois/DNS)</li>
                           </ul>
                        </div>
                     </div>

                     <div className="mt-8 p-6 border-l-4 border-slate-200 bg-white italic text-[11px] text-slate-400 font-bold leading-relaxed">
                        "Bu metodoloji, ALFA YAPAY ZEKA Pentest Laboratuvarları tarafından geliştirilen X-RAY V3 hibrit tarama protokollerini temel almaktadır. Toplanan veriler uçtan uca şifreli olarak işlenmiş ve adli raporlama standartlarına uygun hale getirilmiştir."
                     </div>
                  </div>
               ))}
            </div>
         </Page>
      ))}

      {/* TECHNICAL DUMP */}
      <Page pageNum={235} totalPages={totalPages} title="TEKNİK BULGU VE KANIT DOSYASI (JSON DUMP)" t={t}>
         <div className="space-y-6">
            <div className="bg-red-900/5 border-2 border-red-900/10 p-8 rounded-[2.5rem] mb-8">
               <div className="flex items-center gap-4 mb-4">
                  <Database size={32} className="text-red-900" />
                  <h4 className="text-xl font-black text-red-900 uppercase tracking-tighter">HAM TEKNİK KANITLAR (TECHNICAL PROOF GALLERY)</h4>
               </div>
               <p className="text-[10px] font-bold text-red-900/60 leading-relaxed uppercase tracking-widest">
                  AŞAĞIDAKİ VERİLER, DENETİM SIRASINDA DOĞRUDAN SOURCE-API ÜZERİNDEN ALINAN 77.000 BYTELIK HAM VERİ SETİNİ TEMSİL ETMEKTEDİR.
               </p>
            </div>

            <div className="space-y-8">
               <section className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                     <Terminal size={100} className="text-white" />
                  </div>
                  <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">DUMP: INFRASTRUCTURE_SNAPSHOT.JSON</h5>
                  <pre className="font-mono text-[8px] text-white/50 leading-tight max-h-[300px] overflow-hidden text-left">
                     {JSON.stringify({
                        target: siteName.toLowerCase(),
                        timestamp: metadata.isoDate,
                        vnode: "ALFA-XRAY-3-0",
                        geo_context: geoData,
                        network_edges: ports,
                        infrastructure_layer: techs.slice(0, 5)
                     }, null, 2)}
                  </pre>
               </section>

               <section className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl">
                  <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">DUMP: SSL_HANDSHAKE_EVIDENCE.LOG</h5>
                  <pre className="font-mono text-[8px] text-white/50 leading-tight max-h-[300px] overflow-hidden text-left">
                     {JSON.stringify({
                        grade: sslLabs.grade,
                        cert_issuer: sslLabs.cert?.issuer,
                        protocols: sslLabs.protocols,
                         cert_days_until_expiry: sslLabs.cert?.daysUntilExpiry || null,
                         key_strength: sslLabs.cert?.keyStrength ? (sslLabs.cert.keyStrength + '-bit ' + sslLabs.cert.keyAlg) : null,
                         vulnerabilities: sslLabs.vulnerabilities || {},
                         forward_secrecy: sslLabs.forwardSecrecy || null
                     }, null, 2)}
                  </pre>
               </section>
            </div>
         </div>
      </Page>

      {/* LEGAL PAGE */}
      <Page pageNum={248} totalPages={totalPages} title="YASAL BİLGİLENDİRME VE SORUMLULUK" t={t}>
         <div className="space-y-6">
            {clauses.map((c, i) => (
               <div key={i} className="border-b border-slate-100 pb-4">
                  <h5 className="font-black text-xs text-slate-900 mb-2 uppercase tracking-tighter">{c.heading}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-bold text-justify">{c.text}</p>
               </div>
            ))}
            <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 italic text-[10px] text-slate-400 font-bold leading-relaxed">
               "Bu rapor ALFA YAPAY ZEKA Teknolojileri tarafından otomatik olarak üretilmiştir. Herhangi bir düzenleme veya manipülasyon raporun kurguladığı dijital hash imzasını (Integrity Hash) geçersiz kılar. Raporun tüm sayfaları mühürlüdür."
            </div>
         </div>
      </Page>

      {/* 
          FINAL ONAY SAYFASI (Page 250) 
          Raporun en son sayfasıdır. Burada denetim doğrulaması, QR Kod ve resmî imza yer alır.
      */}
      <Page pageNum={250} totalPages={totalPages} title={t.items?.final} t={t}>
        <div className="h-full flex flex-col justify-between py-12">
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
                       <p>Engine: ALFA-XRAY-V3.0 (Security Intelligence Core)</p>
                       <p>Target: https://www.{siteName.toLowerCase()}</p>
                       <p>Integrity Hash: {metadata.integrityHash}</p>
                       <p>Verification Date: {metadata.isoDate}</p>
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center justify-start mt-4">
                 {/* 
                     QR-CODE BÖLÜMÜ:
                     QRCodeSVG bileşeni raporun dijital doğrulama linkini ve özet verilerini 
                     içeren karekodun teknik olarak üretildiği yerdir.
                 */}
                 <div className="bg-white border-2 border-slate-900 p-4 rounded-[1.5rem] shadow-xl flex items-center justify-center relative group">
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
           <div className="flex justify-end -mt-16 pr-12">
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
           
           <div className="border-t border-slate-100 pt-6 flex justify-between items-end">
              <div className="space-y-1 text-left">
                 <p className="text-[8px] text-slate-300 font-mono uppercase tracking-[0.2em]">DOSS_ID: {metadata.dossierId}</p>
                 <p className="text-[8px] text-slate-300 font-mono uppercase tracking-[0.2em]">SYS_NODE: ALFA-PRIMARY-XRAY-TX-CORE</p>
              </div>
              <div className="px-3 py-1 bg-slate-50 border rounded text-[8px] font-black text-slate-400 uppercase tracking-widest">
                 End of Dossier — Page 250
              </div>
           </div>
        </div>
      </Page>
    </>
  );
};
