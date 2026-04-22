import React from 'react';
import { Database, Shield, ShieldAlert, ShieldCheck, Cpu } from 'lucide-react';
import { Page, DataItem, ComplianceBadges } from './FullReportComponents';
import { GLOBAL_ISO_MAPPING, safeUpper } from './FullReportUtils';

export const NextGenPages = ({ auditData, t, layout, totalPages }) => {
  const whois = auditData.whoisData || {};
  const cookies = auditData.cookies || [];
  const cors = auditData.corsData || {};
  const techs = auditData.technologies || [];
  const geoData = auditData.ipGeo || {};
  const ipReputation = auditData.ipReputation || {};
  const sitemapData = auditData.sitemapData || {};
  const sitemapUrls = sitemapData.urls || [];
  
  const SITEMAP_PER_PAGE = 20; // Sayfa taşmasını önlemek için A4 sayfasına sığan maksimum URL sayısı
  const sitemapChunks = sitemapUrls.length > 0 ? Array.from({ length: Math.ceil(sitemapUrls.length / SITEMAP_PER_PAGE) }, (_, i) =>
    sitemapUrls.slice(i * SITEMAP_PER_PAGE, i * SITEMAP_PER_PAGE + SITEMAP_PER_PAGE)
  ) : [[]];

  return (
    <>
      {/* S10: WHOIS & RDAP */}
      <Page pageNum={layout?.s10} totalPages={totalPages} title={t.sections.s10} t={t}>
         <div className="space-y-10">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">{t.items?.whoisTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s10} />
               </div>
               <div className="bg-blue-50/30 border border-blue-100/50 rounded-[2.5rem] p-8 font-mono text-[10px] leading-relaxed relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <Database size={100} className="text-slate-900" />
                  </div>
                  <div className="space-y-4 text-slate-700">
                     <div className="grid grid-cols-3 gap-4 border-b border-blue-100/50 pb-4">
                        <div>
                           <p className="text-slate-400 mb-1 tracking-widest text-[8px]">{safeUpper(t.items?.registrar)}</p>
                           <p className="text-blue-700 font-black text-[11px] truncate">{safeUpper(whois.registrar) || (t.reportTitle?.includes('MÜHENDİSLİĞİ') ? 'GİZLİ / KORUMALI' : 'PROTECTED')}</p>
                        </div>
                        <div>
                           <p className="text-slate-400 mb-1 uppercase tracking-widest text-[8px]">{t.items?.createdDate}</p>
                           <p className="text-slate-900 font-black text-[11px]">{whois.createdDate ? new Date(whois.createdDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                           <p className="text-slate-400 mb-1 uppercase tracking-widest text-[8px]">{t.items?.expiryDate}</p>
                           <p className="text-red-500 font-black text-[11px]">{whois.expiryDate ? new Date(whois.expiryDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-slate-400 uppercase tracking-widest text-[8px]">DNS NAMESERVERS (NS)</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                           {(whois.nameservers || []).map((ns, i) => (
                              <span key={i} className="px-3 py-1 bg-white border border-blue-100 rounded-full text-blue-600 font-bold text-[9px] lowercase">{ns}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S11: COOKIE SECURITY */}
      <Page pageNum={layout?.s11} totalPages={totalPages} title={t.sections.s11} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary mb-4">
                  <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">{t.items?.cookieTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s11} />
               </div>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between mb-6 shadow-sm">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.items?.cookieCount}</p>
                     <p className="text-4xl font-black text-slate-900 tracking-tighter">{cookies.length}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.items?.secureConsent}</p>
                     <p className={`text-xl font-black tracking-tighter ${cookies.every(c => c.httpOnly && c.secure) ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {cookies.every(c => c.httpOnly && c.secure) ? safeUpper(t.items?.systemSecure) : (t.reportTitle?.includes('MÜHENDİSLİĞİ') ? 'RİSKLİ / EKSİK BAYRAK' : 'RISKY / MISSING FLAGS')}
                     </p>
                  </div>
               </div>
               <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm">
                  <table className="w-full text-[10px]">
                     <thead className="bg-slate-100 text-slate-900 font-black tracking-tighter">
                        <tr>
                           <th className="p-4 text-left">{safeUpper('COOKIE NAME')}</th>
                           <th className="p-4 text-center">{safeUpper('HTTPONLY')}</th>
                           <th className="p-4 text-center">{safeUpper('SECURE')}</th>
                           <th className="p-4 text-center">{safeUpper('SAMESITE')}</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cookies.map((c, i) => (
                           <tr key={i} className="border-b">
                              <td className="p-4 font-bold text-slate-800">{c.name}</td>
                              <td className="p-4 text-center">{c.httpOnly ? <span className="text-emerald-600">{t.items?.yes}</span> : <span className="text-red-600 font-bold underline">{t.items?.no}</span>}</td>
                              <td className="p-4 text-center">{c.secure ? <span className="text-emerald-600">{t.items?.yes}</span> : <span className="text-red-600 font-bold underline">{t.items?.no}</span>}</td>
                              <td className="p-4 text-center font-mono">{c.sameSite || 'None'}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
         </div>
      </Page>

      {/* S12: CORS POLICY */}
      <Page pageNum={layout?.s12} totalPages={totalPages} title={t.sections.s12} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary mb-4">
                  <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">{t.items?.corsTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s12} />
               </div>
               <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200 shadow-sm">
                  <div className="grid grid-cols-2 gap-8">
                     <DataItem label="CONTROL-ALLOW-ORIGIN" value={cors.allowOrigin || 'Restricted'} />
                     <DataItem label="CONTROL-ALLOW-METHODS" value={cors.allowMethods || 'Default'} />
                     <DataItem label="ALLOW-CREDENTIALS" value={cors.allowCredentials ? t.items?.yes : t.items?.no} />
                     <DataItem label={t.items?.statusLabel} value={cors.isWildcard ? (t.reportTitle?.includes('MÜHENDİSLİĞİ') ? 'KRİTİK / WILDCARD (*)' : 'CRITICAL / WILDCARD (*)') : (t.reportTitle?.includes('MÜHENDİSLİĞİ') ? 'GÜVENLİ / KISITLI' : 'SECURE / RESTRICTED')} />
                  </div>
                  {cors.isWildcard && (
                     <div className="mt-6 p-4 bg-red-600/20 border border-red-600/40 rounded-2xl flex items-center gap-4 animate-pulse">
                        <ShieldAlert className="text-red-500" size={24} />
                        <p className="text-[10px] text-red-100 font-bold uppercase tracking-tight">{t.items?.wildcardAlert}</p>
                     </div>
                  )}
               </div>
            </section>
         </div>
      </Page>

      {/* S13: TECH STACK */}
      <Page pageNum={layout?.s13} totalPages={totalPages} title={t.sections.s13} t={t}>
         <div className="space-y-8">
            <div className="flex justify-between items-start border-b-2 border-primary mb-4">
               <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">{t.items?.techStackTitle}</h4>
               <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s13} />
            </div>
            <div className="grid grid-cols-1 gap-4">
               {techs.map((tech, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:border-primary transition-all group shadow-sm">
                     <div className="w-14 h-14 bg-white border shadow-sm rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Cpu size={28} />
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                           <h5 className="font-black text-sm uppercase tracking-tight text-slate-800">{tech.name}</h5>
                           <span className="bg-primary/10 text-primary text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{tech.category}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">DETECTION VECTOR: <span className="text-slate-900">{tech.source}</span></p>
                     </div>
                  </div>
               ))}
               {techs.length === 0 && (
                  <div className="p-10 text-center text-slate-400 italic bg-slate-50 rounded-[2rem]">{t.items?.noTechFound}</div>
               )}
            </div>
         </div>
      </Page>

      {/* S14: GEO-IP ANALYSIS */}
      <Page pageNum={layout?.s14} totalPages={totalPages} title={t.sections.s14} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary mb-4">
                  <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">{t.items?.geoTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s14} />
               </div>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="grid grid-cols-2 gap-8">
                     <DataItem label="IP ADDRESS" value={geoData.ip} />
                     <DataItem label="COUNTRY" value={geoData.country ? `${geoData.country} (${geoData.countryCode})` : 'N/A'} />
                     <DataItem label="REGION / CITY" value={geoData.city ? `${geoData.city}, ${geoData.region}` : 'N/A'} />
                     <DataItem label="TIMEZONE" value={geoData.timezone} />
                     <DataItem label="ISP" value={geoData.isp} />
                     <DataItem label="ORGANIZATION" value={geoData.org} />
                     <DataItem label="ASN" value={geoData.asn} />
                     <DataItem label="COORDINATE" value={geoData.lat && geoData.lon ? `${geoData.lat}, ${geoData.lon}` : 'N/A'} />
                  </div>
               </div>
            </section>
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-6 uppercase tracking-widest">{t.items?.infraRisk}</h4>
               <div className="grid grid-cols-3 gap-6">
                   <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isProxy ? 'bg-red-50 border-red-200' : 'bg-green-50/50 border-green-100'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">PROXY / VPN</p>
                      <p className={`text-xl font-black ${ geoData.isProxy ? 'text-red-700' : 'text-green-600'}`}>{geoData.isProxy ? (t.reportTitle?.includes('MÜHENDİSLİĞİ') ? 'TESPİT EDİLDİ' : 'DETECTED') : t.items?.clean}</p>
                   </div>
                   <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isHosting ? 'bg-amber-50 border-amber-200' : 'bg-green-50/50 border-green-100'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">HOSTING / DATACENTER</p>
                      <p className={`text-xl font-black ${ geoData.isHosting ? 'text-amber-700' : 'text-green-600'}`}>{geoData.isHosting ? t.items?.yes : t.items?.no}</p>
                   </div>
                  <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isMobile ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                     <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">MOBILE NETWORK</p>
                     <p className={`text-xl font-black ${ geoData.isMobile ? 'text-blue-700' : 'text-slate-700'}`}>{geoData.isMobile ? t.items?.yes : t.items?.no}</p>
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S15: IP REPUTATION */}
      <Page pageNum={layout?.s15} totalPages={totalPages} title={t.sections.s15} t={t}>
         <div className="space-y-8">
            <section>
               <div className="flex justify-between items-start border-b-2 border-primary mb-4">
                  <h4 className="text-sm font-black uppercase tracking-widest leading-none py-2">{t.items?.reputationTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s15} />
               </div>
               <div className={`p-8 rounded-[2rem] border-2 shadow-sm ${ipReputation.isMalicious ? 'bg-red-50 border-red-200' : 'bg-green-50/50 border-green-100'}`}>
                   <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border ${ipReputation.isMalicious ? 'bg-red-100 text-red-600 border-red-200' : 'bg-green-100 text-green-600 border-green-200'}`}>
                         {ipReputation.isMalicious ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                      </div>
                      <div className="flex-1">
                         <h5 className={`text-xl font-black uppercase tracking-tight ${ipReputation.isMalicious ? 'text-red-700' : 'text-green-600'}`}>
                            {ipReputation.isMalicious ? t.items?.maliciousIpDetected : t.items?.cleanIpReputation}
                         </h5>
                         <p className="text-xs font-bold text-slate-400 mt-1">{t.items?.intelligenceSource}: AlienVault Open Threat Exchange (OTX) API v1</p>
                      </div>
                   </div>
                  <div className="grid grid-cols-3 gap-6 mt-8">
                     <DataItem label="PULSE COUNT" value={ipReputation.pulseCount || 0} />
                     <DataItem label="MALWARE SAMPLES" value={ipReputation.malwareCount || 0} />
                     <DataItem label="OBSERVED URLS" value={ipReputation.urlCount || 0} />
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S16: SITEMAP ANALİZİ (DYNAMIK MULTI-PAGE) */}
      {sitemapChunks.map((chunk, idx) => (
         <Page key={`sitemap-${idx}`} pageNum={(layout?.s16 ?? 25) + idx} totalPages={totalPages} title={`${t.sections.s16} — PART ${idx + 1}`} t={t}>
            <div className="space-y-8">
               <div className="flex justify-between items-start border-b-2 border-primary/20 pb-2 mb-4">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">{t.items?.sitemapTitle}</h4>
                  <ComplianceBadges mapping={GLOBAL_ISO_MAPPING.s16} />
               </div>
               <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <table className="w-full text-[10px]">
                     <thead className="bg-slate-50 text-slate-400 font-black uppercase tracking-widest">
                        <tr>
                           <th className="px-5 py-4 text-left border-b border-slate-100 w-12">#</th>
                           <th className="px-5 py-4 text-left border-b border-slate-100">TARGET URL</th>
                        </tr>
                     </thead>
                     <tbody>
                        {chunk.map((item, i) => (
                           <tr key={i} className="border-b border-slate-50 transition-colors hover:bg-slate-50/50">
                              <td className="px-5 py-2 font-mono text-slate-300">{(idx * 20) + i + 1}</td>
                              <td className="px-5 py-2 font-mono text-blue-600 truncate max-w-[600px]">{typeof item === 'string' ? item : item.url || item.subdomain}</td>
                           </tr>
                        ))}
                        {chunk.length === 0 && (
                           <tr><td colSpan="2" className="p-12 text-center text-slate-300 italic">{t.items?.sitemapDesc}</td></tr>
                        )}
                     </tbody>
                  </table>
               </div>
               {idx === sitemapChunks.length - 1 && sitemapUrls.length > 40 && (
                  <p className="text-center text-[9px] text-slate-400 font-bold italic uppercase tracking-widest mt-4">
                     {t.reportTitle?.includes('MÜHENDİSLİĞİ') 
                       ? `NOT: Toplam ${sitemapUrls.length} link tespit edilmiştir. Listenin tamamı "JSON DUMP" bölümünde dijital kanıt olarak sunulmaktadır.`
                       : `NOTE: Total ${sitemapUrls.length} links detected. The complete list is provided as digital evidence in the "JSON DUMP" section.`}
                  </p>
               )}
            </div>
         </Page>
      ))}
    </>
  );
};
