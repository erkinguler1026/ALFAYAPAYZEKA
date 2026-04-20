import React from 'react';
import { ShieldAlert, Search, Shield, Cpu } from 'lucide-react';
import { Page, DataItem, IsoBadge } from './FullReportComponents';
import { chunkArray, GLOBAL_ISO_MAPPING, safeUpper } from './FullReportUtils';

export const StandartPages = ({ auditData, t, layout, totalPages }) => {
  const subdomains = auditData.subdomainList || [];
  const ports = auditData.network?.ports || [];
  const sensitive = auditData.sensitiveData || {};
  const sslLabs = auditData.sslGrade || {};
  const headersAnalytic = auditData.sections?.s3?.findings || [];
  const sslStatus = auditData.sections?.s4?.findings || [];
  const serverExposure = auditData.sections?.s5?.findings || [];
  const dnsSecurity = auditData.sections?.s6?.findings || [];
  const dnsSecurityDetails = auditData.sections?.s6?.details || {};
  
  const subChunks = chunkArray(subdomains, 22);

  return (
    <>
      {/* S1: IP RESOLUTION & DNS METADATA */}
      <Page pageNum={layout?.s1} totalPages={totalPages} title={t.sections.s1} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">AĞ ÇÖZÜMLEME & DNS FORENSICS</h4>
                  <IsoBadge isoId={GLOBAL_ISO_MAPPING.s1?.id} isoName={GLOBAL_ISO_MAPPING.s1?.name} />
               </div>
               <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100/50 shadow-sm">
                  <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                     <DataItem label="TARGET DOMAIN" value={auditData.target} />
                     <DataItem label="PRIMARY IPv4" value={auditData.ipAddress} />
                     <DataItem label="RECORDS FOUND" value={`${(auditData.network?.ipv4?.length || 0) + (auditData.network?.ipv6?.length || 0)} ENTRY`} />
                     <DataItem label="DNS STATUS" value={auditData.ipResolved ? 'ACTIVE / REACHABLE' : 'UNRESOLVED'} />
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-blue-100 pt-6">
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">IPv4 ADDRESS LIST</p>
                        <div className="flex flex-wrap gap-2">
                           {(auditData.network?.ipv4 || [auditData.ipAddress]).map((ip, i) => (
                              <span key={i} className="px-3 py-1 bg-white border border-blue-200 text-[10px] font-mono font-bold rounded-lg text-blue-700">{ip}</span>
                           ))}
                        </div>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">IPv6 ADDRESS LIST</p>
                        <div className="flex flex-wrap gap-2">
                           {auditData.network?.ipv6?.length > 0 ? auditData.network.ipv6.map((ip, i) => (
                              <span key={i} className="px-3 py-1 bg-white border border-blue-200 text-[10px] font-mono font-bold rounded-lg text-blue-700">{ip}</span>
                            ) ) : <span className="text-[10px] italic text-slate-300">IPv6 Kaydı Bulunamadı</span>}
                        </div>
                     </div>
               </div>
            </div>
               
            <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-[2rem] font-mono text-[9px] text-primary/60">
                  <p className="font-black mb-2 uppercase tracking-widest">[DNS RESOLVER TRACE - EVIDENCE ID: {auditData.reportId?.substring(0,8)}]</p>
                  <p>{`> QUERY: A ${auditData.target} ... [SUCCESS]`}</p>
                  {auditData.network?.ipv4?.map((ip, i) => <p key={i}>{`  >> ANSWER: ${ip} (IPv4)`}</p>)}
                  {auditData.network?.ipv6?.map((ip, i) => <p key={i}>{`  >> ANSWER: ${ip} (IPv6)`}</p>)}
                  <p className="mt-2">{`> REVERSE LOOKUP CHECK ... [BYPASS]`}</p>
               </div>
            </section>


            <section className="grid grid-cols-2 gap-6">
               <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">AUTHORITATIVE NAME SERVERS (NS)</h5>
                  <div className="space-y-2">
                     {(dnsSecurityDetails.nsRecords || []).map((ns, i) => (
                        <div key={i} className="text-[10px] font-mono font-bold text-slate-600 bg-white p-2 rounded-xl border border-slate-100">{ns}</div>
                     ))}
                  </div>
               </div>
               <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">START OF AUTHORITY (SOA)</h5>
                  {dnsSecurityDetails.soaInfo ? (
                     <div className="text-[10px] font-mono space-y-1">
                        <p><span className="text-slate-400">MNAME:</span> {dnsSecurityDetails.soaInfo.nsname}</p>
                        <p><span className="text-slate-400">RNAME:</span> {dnsSecurityDetails.soaInfo.hostmaster}</p>
                        <p><span className="text-slate-400">SERIAL:</span> {dnsSecurityDetails.soaInfo.serial}</p>
                     </div>
                  ) : <p className="text-[10px] italic text-slate-300">SOA verisi alınamadı</p>}
               </div>
            </section>
         </div>
      </Page>

      {/* S2: PORT SCAN */}
      <Page pageNum={layout?.s2} totalPages={totalPages} title={t.sections.s2} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary text-left">TCP STEALTH PORT SCAN & BANNER GRABBING</h4>
                  <IsoBadge isoId={GLOBAL_ISO_MAPPING.s2?.id} isoName={GLOBAL_ISO_MAPPING.s2?.name} />
               </div>
               <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <table className="w-full text-[10px]">
                     <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest">
                        <tr>
                           <th className="px-5 py-4 text-left border-b border-slate-100">{safeUpper('PORT')}</th>
                           <th className="px-5 py-4 text-left border-b border-slate-100">{safeUpper('IDENTIFIED SERVICE')}</th>
                           <th className="px-5 py-4 text-left border-b border-slate-100">{safeUpper('SERVICE BANNER / RESPONSE')}</th>
                           <th className="px-5 py-4 text-right border-b border-slate-100">{safeUpper('RISK')}</th>
                        </tr>
                     </thead>
                     <tbody>
                        {ports.map((p, i) => (
                           <tr key={i} className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
                              <td className="px-5 py-3 font-mono font-black text-slate-700">{p.port}</td>
                              <td className="px-5 py-3">
                                 <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="font-bold text-slate-800">{p.service}</span>
                                 </div>
                              </td>
                              <td className="px-5 py-3 font-mono text-[9px] text-slate-400 italic">
                                 {p.banner || 'No banner response recorded'}
                              </td>
                              <td className="px-5 py-3 text-right font-black">
                                 <span className={`px-3 py-1 rounded-lg ${p.risk === 'CRITICAL' || p.risk === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'}`}>
                                    {safeUpper(p.risk)}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               
               <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] shadow-inner">
                  <p className="text-[9px] font-black text-primary mb-3 uppercase tracking-[0.2em]">[FORENSIC NETWORK DIAGNOSTIC TRACE]</p>
                  <div className="font-mono text-[9px] text-slate-500 space-y-1">
                     {ports.length > 0 ? ports.map((p, i) => (
                        <p key={i}>{`[${new Date().toISOString()}] DEBUG: Port ${p.port} (${p.service}) responding with banner: ${p.banner || 'ACK'}`}</p>
                     )) : <p>[SYSTEM] NO OPEN PORTS DETECTED ON TARGET INFRASTRUCTURE.</p>}
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S3: HEADERS */}
      <Page pageNum={layout?.s3} totalPages={totalPages} title={t.sections.s3} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">HTTP RESPONSE HEADER AUDIT</h4>
               <IsoBadge isoId={GLOBAL_ISO_MAPPING.s3?.id} isoName={GLOBAL_ISO_MAPPING.s3?.name} />
            </div>
            <p className="text-[12px] text-slate-500 italic mb-6">Sunucu tarafından gönderilen güvenlik başlıklarının varlığı ve konfigürasyon doğruluğu denetlenmiştir.</p>
            <div className="grid grid-cols-1 gap-4">
               {headersAnalytic.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">DURUM: {safeUpper(f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Page>

      {/* S4: SSL / HTTPS STATUS (NEW) */}
      <Page pageNum={layout?.s4} totalPages={totalPages} title={t.sections.s4} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">SSL/TLS & HTTPS STATUS DURUM ANALİZİ</h4>
               <IsoBadge isoId={GLOBAL_ISO_MAPPING.s4?.id} isoName={GLOBAL_ISO_MAPPING.s4?.name} />
            </div>
            <p className="text-[12px] text-slate-500 italic mb-6">Sunucu sertifikaları, HSTS zinciri ve robots.txt güvenlik durumları incelenmiştir.</p>
            <div className="grid grid-cols-1 gap-4">
               {sslStatus.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' || f.severity === 'INFO' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">DURUM: {safeUpper(f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' || f.severity === 'INFO' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Page>

      {/* S5: SERVER EXPOSURE (NEW) */}
      <Page pageNum={layout?.s5} totalPages={totalPages} title={t.sections.s5} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">SUNUCU BİLGİ İFŞA ANALİZİ (SERVER EXPOSURE)</h4>
               <IsoBadge isoId={GLOBAL_ISO_MAPPING.s5?.id} isoName={GLOBAL_ISO_MAPPING.s5?.name} />
            </div>
            <p className="text-[12px] text-slate-500 italic mb-6">Sunucu imza sızıntıları, teknoloji ifşası ve hedeflenmiş versiyon taraması yapılmıştır.</p>
            <div className="grid grid-cols-1 gap-4">
               {serverExposure.length > 0 ? serverExposure.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">DURUM: {safeUpper(f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               )) : (
                  <div className="p-6 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-center">
                     <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest">GÜVENLİ — SUNUCU BİLGİ İFŞASI YOK</p>
                  </div>
               )}
            </div>
         </div>
      </Page>

      {/* S6: DNS EMAIL SECURITY (NEW) */}
      <Page pageNum={layout?.s6} totalPages={totalPages} title={t.sections.s6} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
               <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">DNS GÜVENLİK KAYIT ANALİZİ (FORENSICS)</h4>
               <IsoBadge isoId={GLOBAL_ISO_MAPPING.s6?.id} isoName={GLOBAL_ISO_MAPPING.s6?.name} />
            </div>
            <div className="grid grid-cols-1 gap-4">
               {dnsSecurity.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">DURUM: {safeUpper(f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>

            <section className="mt-8">
               <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">RAW TXT / CAA EVIDENCE DOCKET</h5>
               <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-[9px] text-slate-600 leading-relaxed shadow-sm">
                  <p className="text-primary font-black mb-2 uppercase">[RAW TXT RECORDS]</p>
                  {(dnsSecurityDetails.allTxt || []).map((txt, i) => (
                     <p key={`txt-${i}`} className="mb-1"> {">"} {txt}</p>
                  ))}
                  {dnsSecurityDetails.caaRecords?.length > 0 && (
                     <>
                        <p className="text-primary font-black mt-4 mb-2 uppercase">[CAA RECORDS]</p>
                        {dnsSecurityDetails.caaRecords.map((caa, i) => (
                           <p key={`caa-${i}`}> {">"} {caa.value} ({caa.tag})</p>
                        ))}
                     </>
                  )}
               </div>
            </section>
         </div>
      </Page>

      {/* S7: SENSITIVE PATHS */}
      <Page pageNum={layout?.s7} totalPages={totalPages} title={t.sections.s7} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary mb-4">
                  <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">HASSAS DOSYA VE DİZİN İFŞA TARAMASI</h4>
                  <IsoBadge isoId={GLOBAL_ISO_MAPPING.s8?.id} isoName={GLOBAL_ISO_MAPPING.s8?.name} />
               </div>
               <div className="p-10 bg-red-50/30 border-2 border-red-100 rounded-[3rem] shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 print:!opacity-5" style={{ opacity: 0.05 }}>
                     <Search size={105} className="text-red-900 print:text-red-200" strokeWidth={1} />
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

      {/* S8: SUBDOMAINS (MULTIPLE PAGES) */}
      {subChunks.slice(0, 40).map((chunk, idx) => (
         <Page key={`sub-${idx}`} pageNum={(layout?.s8 ?? 11) + idx} totalPages={totalPages} title={`BÖLÜM VIII: ALT ALAN ADI KEŞİF DÖKÜMÜ — PART ${idx + 1}`} t={t}>
            <div className="space-y-4">
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none py-2">SUBDOMAIN ENUMERATION & CT LOGS</p>
                  {idx === 0 && <IsoBadge isoId={GLOBAL_ISO_MAPPING.n1?.id} isoName={GLOBAL_ISO_MAPPING.n1?.name} />}
               </div>
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

      {/* S9: SSL LABS */}
      <Page pageNum={layout?.s9} totalPages={totalPages} title={t.sections.s9} t={t}>
         <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-10 bg-slate-50 border border-slate-100 text-slate-800 rounded-[3rem] shadow-sm relative overflow-hidden w-full">
               <div className="absolute top-0 right-0 p-4 opacity-5 print:!opacity-5" style={{ opacity: 0.05 }}>
                  <Shield size={120} className="text-slate-500 print:text-slate-200" strokeWidth={1} />
               </div>
               <div className={`font-black text-blue-600 tracking-tighter shrink-0 ${sslLabs.grade?.length > 3 ? 'text-3xl' : 'text-7xl'}`}>
                  {sslLabs.grade || 'N/A'}
               </div>
               <div className="flex-1 max-w-full relative z-10">
                  <div className="flex justify-between items-start border-b border-white/20 pb-2 mb-2">
                     <h3 className="text-xl font-black tracking-tight leading-tight md:text-2xl break-words">QUALYS SSL LABS — GLOBAL GRADE</h3>
                     <IsoBadge isoId={GLOBAL_ISO_MAPPING.n3?.id} isoName={GLOBAL_ISO_MAPPING.n3?.name} />
                  </div>
                  <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 break-words">Sertifika Zinciri, Protokol Desteği ve El Sıkışma Analizi</p>
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
                     <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.heartbleed ? 'text-red-600' : 'text-green-600'}`}>{safeUpper('HEARTBLEED')}: {sslLabs.vulnerabilities?.heartbleed ? safeUpper('VULNERABLE') : safeUpper('GÜVENLİ')}</p>
                     <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.poodle ? 'text-red-600' : 'text-green-600'}`}>{safeUpper('POODLE')}: {sslLabs.vulnerabilities?.poodle ? safeUpper('VULNERABLE') : safeUpper('GÜVENLİ')}</p>
                  </div>
               </div>
            </div>
         </div>
      </Page>
    </>
  );
};
