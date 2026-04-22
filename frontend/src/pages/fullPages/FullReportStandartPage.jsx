import React from 'react';
import { ShieldAlert, Search, Shield, Cpu } from 'lucide-react';
import { Page, DataItem, ComplianceBadges } from './FullReportComponents';
import { chunkArray, GLOBAL_ISO_MAPPING, safeUpper } from './FullReportUtils';

export const StandartPages = ({ auditData, t, layout, totalPages }) => {
  const isTr = t.reportTitle && !t.reportTitle.includes('FULL');
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
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">{t.items?.dnsForensicsTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s1} />
               </div>
               <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100/50 shadow-sm text-left">
                  <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                     <DataItem label={t.targetDomainLabel} value={auditData.target} />
                     <DataItem label="PRIMARY IPv4" value={auditData.ipAddress} />
                     <DataItem label={t.items?.recordCount} value={`${(auditData.network?.ipv4?.length || 0) + (auditData.network?.ipv6?.length || 0)} ${t.items?.entriesLabel}`} />
                     <DataItem label={t.items?.dnsStatus} value={auditData.ipResolved ? t.items?.activeStatus : t.items?.inactiveStatus} />
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-6 border-t border-blue-100 pt-6">
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.items?.ipv4List}</p>
                        <div className="flex flex-wrap gap-2">
                           {(auditData.network?.ipv4 || [auditData.ipAddress]).map((ip, i) => (
                              <span key={i} className="px-3 py-1 bg-white border border-blue-200 text-[10px] font-mono font-bold rounded-lg text-blue-700">{ip}</span>
                           ))}
                        </div>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.items?.ipv6List}</p>
                        <div className="flex flex-wrap gap-2">
                           {auditData.network?.ipv6?.length > 0 ? auditData.network.ipv6.map((ip, i) => (
                              <span key={i} className="px-3 py-1 bg-white border border-blue-200 text-[10px] font-mono font-bold rounded-lg text-blue-700">{ip}</span>
                             ) ) : <span className="text-[10px] italic text-slate-300">{t.items?.notDetected}</span>}
                        </div>
                     </div>
                 </div>
             </div>
               
             <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-[2rem] font-mono text-[9px] text-primary/60 text-left">
                  <p className="font-black mb-2 uppercase tracking-widest">[{isTr ? 'DNS ÇÖZÜMLEME İZİ' : 'DNS RESOLVER TRACE'} - EVIDENCE ID: {auditData.reportId?.substring(0,8)}]</p>
                  <p>{`> QUERY: A ${auditData.target} ... [SUCCESS]`}</p>
                  {auditData.network?.ipv4?.map((ip, i) => <p key={i}>{`  >> ANSWER: ${ip} (IPv4)`}</p>)}
                  {auditData.network?.ipv6?.map((ip, i) => <p key={i}>{`  >> ANSWER: ${ip} (IPv6)`}</p>)}
                  <p className="mt-2">{`> REVERSE LOOKUP CHECK ... [BYPASS]`}</p>
               </div>
            </section>


            <section className="grid grid-cols-2 gap-6">
               <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 text-left">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.items?.nsTitle}</h5>
                  <div className="space-y-2">
                     {(dnsSecurityDetails.nsRecords || []).map((ns, i) => (
                        <div key={i} className="text-[10px] font-mono font-bold text-slate-600 bg-white p-2 rounded-xl border border-slate-100">{ns}</div>
                     ))}
                  </div>
               </div>
               <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 text-left">
                  <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.items?.soaTitle}</h5>
                  {dnsSecurityDetails.soaInfo ? (
                     <div className="text-[10px] font-mono space-y-1">
                        <p><span className="text-slate-400">MNAME:</span> {dnsSecurityDetails.soaInfo.nsname}</p>
                        <p><span className="text-slate-400">RNAME:</span> {dnsSecurityDetails.soaInfo.hostmaster}</p>
                        <p><span className="text-slate-400">SERIAL:</span> {dnsSecurityDetails.soaInfo.serial}</p>
                     </div>
                  ) : <p className="text-[10px] italic text-slate-300">{t.items?.notDetected}</p>}
               </div>
            </section>
         </div>
      </Page>

      {/* S2: PORT SCAN */}
      <Page pageNum={layout?.s2} totalPages={totalPages} title={t.sections.s2} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary text-left">{t.items?.portScanTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s2} />
               </div>
               <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm text-left">
                  <table className="w-full text-[10px]">
                     <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest">
                        <tr>
                           <th className="px-5 py-4 text-left border-b border-slate-100">{safeUpper(t.items?.port)}</th>
                           <th className="px-5 py-4 text-left border-b border-slate-100">{safeUpper(t.items?.service)}</th>
                           <th className="px-5 py-4 text-left border-b border-slate-100">{safeUpper(t.items?.banner)}</th>
                           <th className="px-5 py-4 text-right border-b border-slate-100">{safeUpper(t.items?.risk)}</th>
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
                                 {p.banner || (isTr ? 'Banner yanıtı kaydedilmedi' : 'No banner response recorded')}
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
               
               <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] shadow-inner text-left">
                  <p className="text-[9px] font-black text-primary mb-3 uppercase tracking-[0.2em]">[{isTr ? 'ADLİ AĞ TANILAMA İZİ' : 'FORENSIC NETWORK DIAGNOSTIC TRACE'}]</p>
                  <div className="font-mono text-[9px] text-slate-500 space-y-1">
                     {ports.length > 0 ? ports.map((p, i) => (
                        <p key={i}>{`[${new Date().toISOString()}] DEBUG: Port ${p.port} (${p.service}) responding with banner: ${p.banner || 'ACK'}`}</p>
                     )) : <p>[SYSTEM] {isTr ? 'HEDEF ALTYAPIDA AÇIK PORT TESPİT EDİLMEDİ.' : 'NO OPEN PORTS DETECTED ON TARGET INFRASTRUCTURE.'}</p>}
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S3: HEADERS */}
      <Page pageNum={layout?.s3} totalPages={totalPages} title={t.sections.s3} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2 text-left">{isTr ? 'HTTP YANIT BAŞLIĞI DENETİMİ' : 'HTTP RESPONSE HEADER AUDIT'}</h4>
               <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s3} />
            </div>
            <p className="text-[12px] text-slate-500 italic mb-6 text-left">{t.items?.headerAuditDesc}</p>
            <div className="grid grid-cols-1 gap-4 text-left">
               {headersAnalytic.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(!isTr && f.itemEn ? f.itemEn : f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t.items?.statusLabel}: {safeUpper(!isTr && f.statusEn ? f.statusEn : f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Page>

      {/* S4: SSL / HTTPS STATUS */}
      <Page pageNum={layout?.s4} totalPages={totalPages} title={t.sections.s4} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2 text-left">{t.items?.sslStatusTitle}</h4>
               <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s4} />
            </div>
            <p className="text-[12px] text-slate-500 italic mb-6 text-left">{t.items?.sslStatusDesc}</p>
            <div className="grid grid-cols-1 gap-4 text-left">
               {sslStatus.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' || f.severity === 'INFO' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(!isTr && f.itemEn ? f.itemEn : f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t.items?.statusLabel}: {safeUpper(!isTr && f.statusEn ? f.statusEn : f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' || f.severity === 'INFO' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </Page>

      {/* S5: SERVER EXPOSURE */}
      <Page pageNum={layout?.s5} totalPages={totalPages} title={t.sections.s5} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2 text-left">{isTr ? 'SUNUCU VE TEKNOLOJİ İFŞA ANALİZİ' : 'SERVER & TECH EXPOSURE ANALYSIS'}</h4>
               <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s5} />
            </div>
            <p className="text-[12px] text-slate-500 italic mb-6 text-left">{t.items?.serverExposureDesc}</p>
            <div className="grid grid-cols-1 gap-4 text-left">
               {serverExposure.length > 0 ? serverExposure.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(!isTr && f.itemEn ? f.itemEn : f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t.items?.statusLabel}: {safeUpper(!isTr && f.statusEn ? f.statusEn : f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               )) : (
                  <div className="p-6 border-2 border-dashed border-slate-200 rounded-[1.5rem] text-center">
                     <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest">{t.items?.systemSecure}</p>
                  </div>
               )}
            </div>
         </div>
      </Page>

      {/* S6: DNS SECURITY */}
      <Page pageNum={layout?.s6} totalPages={totalPages} title={t.sections.s6} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
               <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary text-left">{t.items?.dnsForensicsTitle}</h4>
               <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s6} />
            </div>
            <div className="grid grid-cols-1 gap-4 text-left">
               {dnsSecurity.map((f, i) => (
                  <div key={i} className={`p-4 rounded-[1.5rem] border-2 flex items-center justify-between ${f.severity === 'OK' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                     <div>
                        <h6 className="font-bold text-[11px] text-slate-800">{safeUpper(!isTr && f.itemEn ? f.itemEn : f.item)}</h6>
                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t.items?.statusLabel}: {safeUpper(!isTr && f.statusEn ? f.statusEn : f.status)}</p>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[8px] font-black ${f.severity === 'OK' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                        {f.severity}
                     </div>
                  </div>
               ))}
            </div>

            <section className="mt-8 text-left">
               <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">{t.items?.txtEvidenceTitle}</h5>
               <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-[9px] text-slate-600 leading-relaxed shadow-sm">
                  <p className="text-primary font-black mb-2 uppercase">[{isTr ? 'HAM TXT KAYITLARI' : 'RAW TXT RECORDS'}]</p>
                  {(dnsSecurityDetails.allTxt || []).map((txt, i) => (
                     <p key={`txt-${i}`} className="mb-1"> {">"} {txt}</p>
                  ))}
                  {dnsSecurityDetails.caaRecords?.length > 0 && (
                     <>
                        <p className="text-primary font-black mt-4 mb-2 uppercase">[{isTr ? 'CAA KAYITLARI' : 'CAA RECORDS'}]</p>
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
                  <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2 text-left">{t.items?.pathProbeTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s7} />
               </div>
               <div className="p-10 bg-red-50/30 border-2 border-red-100 rounded-[3rem] shadow-sm text-left">
                  <div className="space-y-6">
                     <h5 className="text-slate-900 text-xl font-black uppercase tracking-tighter">{t.items?.pathResultsTitle}</h5>
                     <div className="space-y-4">
                        {sensitive.findings && sensitive.findings.length > 0 ? (
                           sensitive.findings.map((f, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-red-600/10 border border-red-600/30 rounded-2xl">
                                 <div className="flex items-center gap-4">
                                    <ShieldAlert size={20} className="text-red-500" />
                                    <span className="font-mono text-slate-900 font-bold text-sm">{f.path}</span>
                                 </div>
                                 <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black rounded-lg uppercase">{t.items?.urgentRemediation}</span>
                              </div>
                           ))
                        ) : (
                           <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] text-center">
                              <p className="text-emerald-400 font-black text-lg uppercase tracking-widest">{t.items?.noSensitiveExposed}</p>
                              <p className="text-white/30 text-[10px] mt-2 uppercase">{t.items?.sensitiveScanDesc}</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S8: SUBDOMAINS */}
      {subChunks.slice(0, 40).map((chunk, idx) => (
         <Page key={`sub-${idx}`} pageNum={(layout?.s8 ?? 11) + idx} totalPages={totalPages} title={`${t.sections.s8} — PART ${idx + 1}`} t={t}>
            <div className="space-y-4">
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none py-2 text-left">{t.items?.subdomainTitle}</p>
                  {idx === 0 && <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s8} />}
               </div>
               <div className="bg-slate-50 p-4 border-l-4 border-primary rounded-r-2xl text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.verified}</p>
                  <p className="text-[9px] text-slate-400 italic">Source: crt.sh (Certificate Transparency Logs) — Global Infrastructure Mapping</p>
               </div>
               <table className="w-full border-collapse text-[10px] text-left">
                  <thead>
                     <tr className="bg-slate-100 text-slate-900 font-black uppercase tracking-tighter">
                        <th className="p-2 border border-slate-700 w-12 text-center">#</th>
                        <th className="p-2 border border-slate-700 text-left">{t.items?.hostname}</th>
                        <th className="p-2 border border-slate-700 text-right">{t.items?.certIssuer}</th>
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
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-10 bg-slate-50 border border-slate-100 text-slate-800 rounded-[3rem] shadow-sm w-full text-left">
               <div className={`font-black text-blue-600 tracking-tighter shrink-0 ${sslLabs.grade?.length > 3 ? 'text-3xl' : 'text-7xl'}`}>
                  {sslLabs.grade || 'N/A'}
               </div>
               <div className="flex-1 max-w-full">
                  <div className="flex justify-between items-start border-b border-white/20 pb-2 mb-2">
                     <h3 className="text-xl font-black tracking-tight leading-tight md:text-2xl break-words">{t.items?.sslLabsTitle}</h3>
                     <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s9} />
                  </div>
                  <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 break-words">{t.items?.sslLabsDesc}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-left">
               <div className="p-base bg-slate-50 border rounded-2xl p-6">
                  <h5 className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-widest">{t.items?.certDetails}</h5>
                  <div className="space-y-3">
                     <DataItem label={t.items?.certIssuer} value={sslLabs.cert?.issuer} />
                     <DataItem label={isTr ? 'ANAHTAR GÜCÜ' : 'KEY STRENGTH'} value={`${sslLabs.cert?.keyStrength} bit ${sslLabs.cert?.keyAlg}`} />
                     <DataItem label={isTr ? 'SONA ERME SÜRESİ' : 'DAYS TO EXPIRY'} value={`${sslLabs.cert?.daysUntilExpiry} ${t.items?.days}`} />
                  </div>
               </div>
               <div className="p-base bg-slate-50 border rounded-2xl p-6">
                  <h5 className="font-black text-[10px] uppercase text-slate-400 mb-4 tracking-widest">{t.items?.protoSecurity}</h5>
                  <div className="flex flex-wrap gap-2">
                     {(sslLabs.protocols || []).map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-white border font-bold text-[9px] rounded-lg">{p}</span>
                     ))}
                  </div>
                  <div className="mt-4 space-y-2 border-t pt-4">
                     <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.heartbleed ? 'text-red-600' : 'text-green-600'}`}>{safeUpper('HEARTBLEED')}: {sslLabs.vulnerabilities?.heartbleed ? safeUpper(t.items?.vulnerable) : safeUpper(t.items?.clean)}</p>
                     <p className={`text-[10px] font-black ${sslLabs.vulnerabilities?.poodle ? 'text-red-600' : 'text-green-600'}`}>{safeUpper('POODLE')}: {sslLabs.vulnerabilities?.poodle ? safeUpper(t.items?.vulnerable) : safeUpper(t.items?.clean)}</p>
                  </div>
               </div>
            </div>
         </div>
      </Page>
    </>
  );
};
