import React from 'react';
import { Database, Shield, ShieldAlert, ShieldCheck, Cpu } from 'lucide-react';
import { Page, DataItem } from './FullReportComponents';

export const NextGenPages = ({ auditData, t, layout, totalPages }) => {
  const whois = auditData.whoisData || {};
  const cookies = auditData.cookies || [];
  const cors = auditData.corsData || {};
  const techs = auditData.technologies || [];
  const geoData = auditData.ipGeo || {};
  const ipReputation = auditData.ipReputation || {};

  return (
    <>
      {/* S7: WHOIS & RDAP */}
      <Page pageNum={layout?.s7} totalPages={totalPages} title={t.sections.n3} t={t}>
         <div className="space-y-10">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">WHOIS & RDAP DOMAIN KAYIT ANALİZİ</h4>
               <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-[10px] leading-relaxed relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                     <Database size={100} className="text-slate-900" />
                  </div>
                  <div className="space-y-4 text-slate-700">
                     <div className="grid grid-cols-3 gap-4 border-b border-slate-200 pb-4">
                        <div>
                           <p className="text-slate-400 mb-1 uppercase tracking-widest text-[8px]">REGISTRAR</p>
                           <p className="text-blue-600 font-black uppercase text-[11px] truncate">{whois.registrar || 'GİZLİ'}</p>
                        </div>
                        <div>
                           <p className="text-slate-400 mb-1 uppercase tracking-widest text-[8px]">KAYIT TARİHİ</p>
                           <p className="text-slate-900 font-black text-[11px]">{whois.createdDate ? new Date(whois.createdDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                           <p className="text-slate-400 mb-1 uppercase tracking-widest text-[8px]">BİTİŞ TARİHİ</p>
                           <p className="text-red-500 font-black text-[11px]">{whois.expiryDate ? new Date(whois.expiryDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <p className="text-slate-400 uppercase tracking-widest text-[8px]">DNS NAMESERVERS (NS)</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                           {(whois.nameservers || []).map((ns, i) => (
                              <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 font-bold text-[9px] lowercase">{ns}</span>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S8: COOKIE SECURITY */}
      <Page pageNum={layout?.s8} totalPages={totalPages} title={t.sections.n4} t={t}>
         <div className="space-y-8">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">COOKIE (ÇEREZ) GÜVENLİK ANALİZİ</h4>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between mb-6 shadow-sm">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TESPİT EDİLEN ÇEREZ SAYISI</p>
                     <p className="text-4xl font-black text-slate-900 tracking-tighter">{cookies.length}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">GÜVENLİ ONAY DURUMU</p>
                     <p className={`text-xl font-black tracking-tighter ${cookies.every(c => c.httpOnly && c.secure) ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {cookies.every(c => c.httpOnly && c.secure) ? 'TAM GÜVENLİ' : 'RİSKLİ / EKSİK BAYRAK'}
                     </p>
                  </div>
               </div>
               <div className="bg-white border rounded-[2rem] overflow-hidden shadow-sm">
                  <table className="w-full text-[10px]">
                     <thead className="bg-slate-100 text-slate-900 font-black uppercase tracking-tighter">
                        <tr>
                           <th className="p-4 text-left">ÇEREZ ADI (COOKIE NAME)</th>
                           <th className="p-4 text-center">HTTPONLY</th>
                           <th className="p-4 text-center">SECURE</th>
                           <th className="p-4 text-center">SAMESITE</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cookies.map((c, i) => (
                           <tr key={i} className="border-b">
                              <td className="p-4 font-bold text-slate-800">{c.name}</td>
                              <td className="p-4 text-center">{c.httpOnly ? <span className="text-emerald-600">EVET</span> : <span className="text-red-600 font-bold underline">HAYIR</span>}</td>
                              <td className="p-4 text-center">{c.secure ? <span className="text-emerald-600">EVET</span> : <span className="text-red-600 font-bold underline">HAYIR</span>}</td>
                              <td className="p-4 text-center font-mono">{c.sameSite || 'None'}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
         </div>
      </Page>

      {/* S9: CORS POLICY */}
      <Page pageNum={layout?.s9} totalPages={totalPages} title={t.sections.n5} t={t}>
         <div className="space-y-8">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">CORS POLİTİKASI VE API GÜVENLİĞİ</h4>
               <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200 relative overflow-hidden group shadow-sm">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                     <Shield size={120} className="text-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-8 relative z-10">
                     <DataItem label="CONTROL-ALLOW-ORIGIN" value={cors.allowOrigin || 'Kısıtlı'} />
                     <DataItem label="CONTROL-ALLOW-METHODS" value={cors.allowMethods || 'Varsayılan'} />
                     <DataItem label="ALLOW-CREDENTIALS" value={cors.allowCredentials ? 'EVET' : 'HAYIR'} />
                     <DataItem label="POLİTİKA GÜVENLİK DURUMU" value={cors.isWildcard ? 'KRİTİK / WILDCARD (*)' : 'GÜVENLİ / KISITLI'} />
                  </div>
                  {cors.isWildcard && (
                     <div className="mt-6 p-4 bg-red-600/20 border border-red-600/40 rounded-2xl flex items-center gap-4 animate-pulse">
                        <ShieldAlert className="text-red-500" size={24} />
                        <p className="text-[10px] text-red-100 font-bold uppercase tracking-tight">Kritik Uyarı: Wildcard (*) CORS politikası, saldırganların kullanıcı verilerini çalmasına olanak tanır!</p>
                     </div>
                  )}
               </div>
            </section>
         </div>
      </Page>

      {/* S10: TECH STACK */}
      <Page pageNum={layout?.s10} totalPages={totalPages} title={t.sections.n6} t={t}>
         <div className="space-y-8">
            <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">TEKNOLOJİ PARMAK İZİ TESPİTİ (TECH STACK)</h4>
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
                  <div className="p-10 text-center text-slate-400 italic bg-slate-50 rounded-[2rem]">Aktif teknoloji tespiti yapılamadı (Güvenlik duvarı engeli).</div>
               )}
            </div>
         </div>
      </Page>

      {/* S11: GEO-IP ANALYSIS */}
      <Page pageNum={layout?.s11} totalPages={totalPages} title={t.sections.n7} t={t}>
         <div className="space-y-8">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">IP ADRESİ COĞRAFİ KONUM VE ALTYAPI ANALİZİ</h4>
               <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="grid grid-cols-2 gap-8">
                     <DataItem label="IP ADRESİ" value={geoData.ip} />
                     <DataItem label="ÜLKE" value={geoData.country ? `${geoData.country} (${geoData.countryCode})` : 'N/A'} />
                     <DataItem label="BÖLGE / ŞEHİR" value={geoData.city ? `${geoData.city}, ${geoData.region}` : 'N/A'} />
                     <DataItem label="TIMEZONE" value={geoData.timezone} />
                     <DataItem label="ISP" value={geoData.isp} />
                     <DataItem label="ORGANİZASYON" value={geoData.org} />
                     <DataItem label="ASN" value={geoData.asn} />
                     <DataItem label="KOORDİNAT" value={geoData.lat && geoData.lon ? `${geoData.lat}, ${geoData.lon}` : 'N/A'} />
                  </div>
               </div>
            </section>
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-6 uppercase tracking-widest">ALTYAPI RİSK GÖSTERGELERİ</h4>
               <div className="grid grid-cols-3 gap-6">
                   <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isProxy ? 'bg-red-50 border-red-200' : 'bg-green-50/50 border-green-100'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">PROXY / VPN</p>
                      <p className={`text-xl font-black ${ geoData.isProxy ? 'text-red-700' : 'text-green-600'}`}>{geoData.isProxy ? 'TESPİT EDİLDİ' : 'TEMİZ'}</p>
                   </div>
                   <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isHosting ? 'bg-amber-50 border-amber-200' : 'bg-green-50/50 border-green-100'}`}>
                      <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">HOSTING / DATACENTER</p>
                      <p className={`text-xl font-black ${ geoData.isHosting ? 'text-amber-700' : 'text-green-600'}`}>{geoData.isHosting ? 'EVET' : 'HAYIR'}</p>
                   </div>
                  <div className={`p-6 rounded-[2rem] border-2 text-center shadow-sm ${ geoData.isMobile ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
                     <p className="text-[9px] font-black uppercase tracking-widest mb-2 text-slate-400">MOBİL AĞ</p>
                     <p className={`text-xl font-black ${ geoData.isMobile ? 'text-blue-700' : 'text-slate-700'}`}>{geoData.isMobile ? 'EVET' : 'HAYIR'}</p>
                  </div>
               </div>
            </section>
         </div>
      </Page>

      {/* S12: IP REPUTATION */}
      <Page pageNum={layout?.s12} totalPages={totalPages} title={t.sections.n8} t={t}>
         <div className="space-y-8">
            <section>
               <h4 className="text-sm font-black border-b-2 border-primary mb-4 uppercase tracking-widest">ALIENVAULT OTX — IP REPUTATION CHECK</h4>
                <div className={`p-8 rounded-[2rem] border-2 shadow-sm ${ipReputation.isMalicious ? 'bg-red-50 border-red-200' : 'bg-green-50/50 border-green-100'}`}>
                   <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border ${ipReputation.isMalicious ? 'bg-red-100 text-red-600 border-red-200' : 'bg-green-100 text-green-600 border-green-200'}`}>
                         {ipReputation.isMalicious ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                      </div>
                      <div className="flex-1">
                         <h5 className={`text-xl font-black uppercase tracking-tight ${ipReputation.isMalicious ? 'text-red-700' : 'text-green-600'}`}>
                            {ipReputation.isMalicious ? 'TEHLİKELİ / MALICIOUS IP TESPİT EDİLDİ' : 'TEMİZ / GÜVENLİ IP REPUTASYONU'}
                         </h5>
                         <p className="text-xs font-bold text-slate-400 mt-1">İstihbarat Kaynağı: AlienVault Open Threat Exchange (OTX) API v1</p>
                      </div>
                   </div>
                  <div className="grid grid-cols-3 gap-6 mt-8">
                     <DataItem label="AKTİF PULSE SAYISI" value={ipReputation.pulseCount || 0} />
                     <DataItem label="MALWARE ÖRNEKLERİ" value={ipReputation.malwareCount || 0} />
                     <DataItem label="GÖZLEMLENEN URL" value={ipReputation.urlCount || 0} />
                  </div>
               </div>
            </section>
         </div>
      </Page>
    </>
  );
};
