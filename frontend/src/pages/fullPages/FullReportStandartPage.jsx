import React from 'react';
import { ShieldAlert, Search, Shield, Cpu } from 'lucide-react';
import { Page, DataItem } from './FullReportComponents';
import { chunkArray } from './FullReportUtils';

export const StandartPages = ({ auditData, t, totalPages }) => {
  const subdomains = auditData.subdomainList || [];
  const ports = auditData.network?.ports || [];
  const sensitive = auditData.sensitiveData || {};
  const sslLabs = auditData.sslGrade || {};
  const headersAnalytic = auditData.sections?.s3?.findings || [];
  
  const subChunks = chunkArray(subdomains, 22);

  return (
    <>
      {/* S1: IP RESOLUTION */}
      <Page pageNum={10} totalPages={totalPages} title={t.sections.s1} t={t}>
         <div className="space-y-10">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">AĞ ÇÖZÜMLEME ANALİZİ</h4>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="grid grid-cols-2 gap-8">
                     <DataItem label="HEDEF DOMAIN" value={`https://www.${auditData.target}`} />
                     <DataItem label="RESOLVED IP" value={auditData.ipAddress} />
                     <DataItem label="IP PROTOKOLÜ" value={auditData.ipFamily} />
                     <DataItem label="SİSTEM DURUMU" value={auditData.ipResolved ? 'AKTİF / ÇEVRİMİÇİ' : 'BİLİNMİYOR'} />
                  </div>
               </div>
            </section>
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">OPERASYONEL ANALİZ NOTLARI</h4>
               <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-[10px] text-slate-600 leading-relaxed shadow-sm">
                  {auditData.sections?.s1?.logs?.map((log, i) => (
                     <p key={i}>{log}</p>
                  ))}
               </div>
            </section>
         </div>
      </Page>

      {/* S2: PORT SCAN */}
      <Page pageNum={25} totalPages={totalPages} title={t.sections.s3} t={t}>
         <div className="space-y-8">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">TCP STEALTH PORT SCAN (17 KRİTİK NOKTA)</h4>
               <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm">
                  <table className="w-full text-[10px]">
                     <thead className="bg-slate-100 text-slate-900 font-black uppercase tracking-tighter">
                        <tr>
                           <th className="p-3 text-left">PORT</th>
                           <th className="p-3 text-left">SERVİS ADI</th>
                           <th className="p-3 text-center">DURUM</th>
                           <th className="p-3 text-right">RİSK SEVİYESİ</th>
                        </tr>
                     </thead>
                     <tbody>
                        {ports.map((p, i) => (
                           <tr key={i} className="border-b">
                              <td className="p-3 font-bold">{p.port}</td>
                              <td className="p-3 font-mono">{p.service}</td>
                              <td className="p-3 text-center">
                                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-black">OPEN</span>
                              </td>
                              <td className={`p-3 text-right font-black ${p.risk === 'CRITICAL' || p.risk === 'HIGH' ? 'text-red-600' : 'text-slate-400'}`}>
                                 {p.risk}
                              </td>
                           </tr>
                        ))}
                        {ports.length === 0 && (
                           <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Kritik port tespit edilmedi. Firewall aktif görünüyor.</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </section>
         </div>
      </Page>

      {/* S3: HEADERS */}
      <Page pageNum={40} totalPages={totalPages} title={t.sections.s5} t={t}>
         <div className="space-y-8">
            <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">HTTP RESPONSE HEADER AUDIT</h4>
            <p className="text-[12px] text-slate-500 italic mb-6">Sunucu tarafından gönderilen güvenlik başlıklarının varlığı ve konfigürasyon doğruluğu denetlenmiştir.</p>
            <div className="grid grid-cols-1 gap-4">
               {headersAnalytic.map((f, i) => (
                  <div key={i} className={`p-6 rounded-[2rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-black text-xs uppercase text-slate-800">{f.item}</h6>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">DURUM: {f.status}</p>
                     </div>
                     <div className={`px-4 py-1 rounded-full text-[9px] font-black ${f.severity === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Page>

      {/* S4: SENSITIVE PATHS */}
      <Page pageNum={55} totalPages={totalPages} title={t.sections.s8} t={t}>
         <div className="space-y-8">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">HASSAS DOSYA VE DİZİN İFŞA TARAMASI</h4>
               <div className="p-10 bg-red-50/30 border-2 border-red-100 rounded-[3rem] shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Search size={150} className="text-red-900" />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <h5 className="text-slate-900 text-xl font-black uppercase tracking-tighter">V3.0 PATH BRUTEFORCE SONUÇLARI</h5>
                     <div className="space-y-4">
                        {sensitive.findings && sensitive.findings.length > 0 ? (
                           sensitive.findings.map((f, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-red-600/10 border border-red-600/30 rounded-2xl">
                                 <div className="flex items-center gap-4">
                                    <ShieldAlert size={20} className="text-red-500" />
                                    <span className="font-mono text-white text-sm">{f.path}</span>
                                 </div>
                                 <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black rounded-lg uppercase">ACİL MÜDAHALE GEREKLİ</span>
                              </div>
                           ))
                        ) : (
                           <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] text-center">
                              <p className="text-emerald-400 font-black text-lg uppercase tracking-widest">HASSAS DOSYA İFŞASI TESPİT EDİLMEDİ</p>
                              <p className="text-white/30 text-[10px] mt-2 uppercase">.env, .git, .htaccess ve yedek dosyaları taranmıştır.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S5: SUBDOMAINS (MULTIPLE PAGES) */}
      {subChunks.slice(0, 40).map((chunk, idx) => (
         <Page key={`sub-${idx}`} pageNum={70 + idx} totalPages={totalPages} title={`BÖLÜM V: ALT ALAN ADI KEŞİF DÖKÜMÜ — PART ${idx + 1}`} t={t}>
            <div className="space-y-4">
               <div className="bg-slate-50 p-4 border-l-4 border-primary rounded-r-2xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.verified}</p>
                  <p className="text-[9px] text-slate-400 italic">Kaynak: crt.sh (Certificate Transparency Logs) — Global Infrastructure Mapping</p>
               </div>
               <table className="w-full border-collapse text-[10px]">
                  <thead>
                     <tr className="bg-slate-100 text-slate-900 font-black uppercase tracking-tighter">
                        <th className="p-2 border border-slate-700 w-12 text-center">#</th>
                        <th className="p-2 border border-slate-700 text-left">TECHNICAL HOSTNAME / DOMAIN</th>
                        <th className="p-2 border border-slate-700 text-right">CERTIFICATE ISSUER</th>
                     </tr>
                  </thead>
                  <tbody>
                     {chunk.map((s, i) => (
                        <tr key={i} className="border-b hover:bg-slate-50/50 transition-colors">
                           <td className="p-2 border text-center text-[8px] text-slate-400 font-mono">{(idx * 22) + i + 1}</td>
                           <td className="p-2 border font-mono font-bold text-blue-600">{s.subdomain}</td>
                           <td className="p-2 border text-right text-[8px] font-medium text-slate-500">{s.issuer?.split(',')[0]}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </Page>
      ))}

      {/* S6: SSL LABS */}
      <Page pageNum={115} totalPages={totalPages} title={t.sections.n2} t={t}>
         <div className="space-y-8">
            <div className="flex items-center gap-6 p-10 bg-slate-50 border border-slate-100 text-slate-800 rounded-[3rem] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Shield size={120} />
               </div>
               <div className="text-6xl font-black text-blue-600">{sslLabs.grade || 'T'}</div>
               <div>
                  <h3 className="text-2xl font-black">QUALYS SSL LABS — GLOBAL GRADE</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sertifika Zinciri, Protokol Desteği ve El Sıkışma Analizi</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="p-base bg-slate-50 border rounded-2xl p-6">
                  <h5 className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-widest">SERTİFİKA DETAYLARI</h5>
                  <div className="space-y-3">
                     <DataItem label="ISSUER (YAYINLAYICI)" value={sslLabs.cert?.issuer} />
                     <DataItem label="KEY STRENGTH" value={`${sslLabs.cert?.keyStrength} bit ${sslLabs.cert?.keyAlg}`} />
                     <DataItem label="DAYS TO EXPIRY" value={`${sslLabs.cert?.daysUntilExpiry} GÜN`} />
                  </div>
               </div>
               <div className="p-base bg-slate-50 border rounded-2xl p-6">
                  <h5 className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-widest">PROTOKOL GÜVENLİĞİ</h5>
                  <div className="flex flex-wrap gap-2">
                     {(sslLabs.protocols || []).map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-white border font-bold text-[9px] rounded-lg">{p}</span>
                     ))}
                  </div>
                  <div className="mt-4 space-y-2 border-t pt-4">
                     <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.heartbleed ? 'text-red-600' : 'text-green-600'}`}>HEARTBLEED: {sslLabs.vulnerabilities?.heartbleed ? 'VULNERABLE' : 'GÜVENLİ'}</p>
                     <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.poodle ? 'text-red-600' : 'text-green-600'}`}>POODLE: {sslLabs.vulnerabilities?.poodle ? 'VULNERABLE' : 'GÜVENLİ'}</p>
                  </div>
               </div>
            </div>
         </div>
      </Page>
    </>
  );
};
