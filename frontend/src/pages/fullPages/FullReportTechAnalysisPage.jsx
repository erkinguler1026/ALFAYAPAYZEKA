import React, { useMemo } from 'react';
import { Page, IsoBadge } from './FullReportComponents';
import { safeUpper } from './FullReportUtils';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

/**
 * @function getDynamicDescription
 * @description ScoreCard'daki dinamik özet motorunun rapor versiyonu.
 */
const getDynamicDescription = (catId, data, isTr) => {
  if (!data) return "";

  switch (catId) {
    case 'service': {
      const hasCrit = data.sensitiveData?.hasCritical;
      if (hasCrit) {
        return isTr 
          ? `Kritik yapılandırma dosyaları (.env, .git) dışa açık durumda tespit edildi. Bu durum veritabanı şifreleri ve API anahtarlarının sızmasına neden olabilir. Dizin listeleme özellikleri üzerinden hassas sistem dosyalarına doğrudan erişim sağlandığı dökümante edilmiştir.`
          : `Critical configuration files (.env, .git) were detected as publicly exposed. This could lead to leaks of database passwords and API keys. Direct access to sensitive system files through directory listing has been documented.`;
      }
      return isTr
        ? `Derinlemesine yapılan dizin taraması sonucunda kritik yapılandırma dosyalarına (.env, .git/config) doğrudan erişim saptanmadı. Sistem, hassas dizin yollarını yetkisiz erişime karşı korumalı (403/Forbidden) olarak yapılandırmıştır.`
        : `Deep directory scanning conducted on the target did not reveal direct access to critical configuration files (.env, .git/config). The system has configured sensitive directory paths as protected against unauthorized access.`;
    }

    case 'headers': {
      const missing = (data.findings || []).filter(f => ['hsts', 'csp', 'x-frame-options'].includes(f.id));
      if (missing.length > 0) {
        const names = missing.map(m => m.id.toUpperCase()).join(', ');
        return isTr
          ? `Yapılan HTTP başlık analizinde ${names} gibi modern savunma katmanlarının eksik olduğu tespit edildi. Bu durum, tarayıcı tabanlı XSS ve Clickjacking saldırılarına karşı koruma derinliğini zayıflatmaktadır.`
          : `HTTP header analysis revealed that modern defense layers such as ${names} are missing. This weakens the defense-in-depth against browser-based XSS and Clickjacking attacks.`;
      }
      return isTr
        ? `HTTP güvenlik başlıkları (HSTS, CSP, X-Frame) endüstri standartlarına uygun olarak yapılandırılmış. Sunucu, modern tarayıcı saldırılarına karşı aktif bir koruma kalkanı sağlamaktadır.`
        : `HTTP security headers (HSTS, CSP, X-Frame) are configured in accordance with industry standards. The server provides an active defense shield against modern browser attacks.`;
    }

    case 'network': {
      const openPorts = data.network?.ports || [];
      if (openPorts.length > 0) {
        const portStr = openPorts.map(p => p.port).join(', ');
        return isTr
          ? `${data.ipAddress} adresi üzerinde ${openPorts.length} adet açık servis (Port: ${portStr}) tespit edildi. Bu servislerin internete açık olması, kaba kuvvet ve servis sömürü saldırılarına zemin hazırlamaktadır.`
          : `${openPorts.length} open services (Ports: ${portStr}) were detected on ${data.ipAddress}. These services being exposed to the internet creates a surface for brute-force and service exploitation attacks.`;
      }
      return isTr
        ? `Yapılan TCP port taramasında dış şebekeye açık herhangi bir kritik servis girişi tespit edilmedi. Ağ izolasyonu ve firewall kuralları, yetkisiz erişim denemelerini etkili bir şekilde engellemektedir.`
        : `TCP port scanning did not detect any critical service entry points exposed to the external network. Network isolation and firewall rules effectively block unauthorized access attempts.`;
    }

    case 'domain': {
      const ssl = data.sslGrade?.grade || 'N/A';
      const isp = data.ipGeo?.isp || 'Bilinmiyor';
      return isTr
        ? `Sertifikasyon analizinde ${ssl} seviyesinde güvenlik skoru saptandı. Sunucu altyapısı ${isp} üzerinden hizmet vermekte olup, DNS katmanındaki güvenlik kayıtları (SPF/DMARC) ve WHOIS verileri potansiyel sızıntı vektörü olarak değerlendirilmiştir.`
        : `Certification analysis revealed a ${ssl} grade security score. The infrastructure is served via ${isp}, and DNS security records (SPF/DMARC) along with WHOIS data have been evaluated as potential leak vectors.`;
    }

    case 'patching': {
      const techs = (data.technologies || []).map(t => t.name).slice(0, 3).join(', ');
      return isTr
        ? `Sistem üzerinde ${techs} gibi teknolojilerin aktif olduğu saptandı. Sunucu yanıt başlıklarında versiyon bilgilerinin ifşa edilmesi, bilinen zafiyetlerin (CVE) hedefli olarak aranmasını kolaylaştırmaktadır.`
        : `Technologies such as ${techs} were detected active on the system. Disclosure of version information in server response headers facilitates targeted searches for known vulnerabilities (CVE).`;
    }
    default: return "";
  }
};

const TechFrame = ({ cat, isTr }) => {
  const healthColor = cat.health >= 80 ? 'border-emerald-500' : (cat.health >= 50 ? 'border-amber-500' : 'border-rose-500');
  const bgColor = cat.health >= 80 ? 'bg-emerald-50/20' : (cat.health >= 50 ? 'bg-amber-50/20' : 'bg-rose-50/20');
  const textColor = cat.health >= 80 ? 'text-emerald-800' : (cat.health >= 50 ? 'text-amber-800' : 'text-rose-800');

  return (
    <div className={`border-l-8 ${healthColor} ${bgColor} rounded-r-3xl p-6 shadow-sm mb-6 transition-all hover:shadow-md`}>
      <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center font-black text-xs shadow-sm">
            {cat.index}
          </div>
          <h3 className="font-black text-[13px] text-slate-800 tracking-tight uppercase">
            {safeUpper(cat.name)}
          </h3>
        </div>
        <div className="flex items-center gap-4">
           <IsoBadge isoId={cat.iso} isoName={isTr ? "ISO 27001 Standardı" : "ISO 27001 Standard"} />
           <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-white border border-gray-100 shadow-sm ${cat.health >= 80 ? 'text-emerald-500' : (cat.health >= 50 ? 'text-amber-500' : 'text-rose-500')}`}>
             {safeUpper(cat.status)}
           </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className={`text-[12px] font-medium leading-relaxed italic ${textColor}`}>
          {cat.desc}
        </p>
        
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">
            REFERENCE: {cat.isoTitle}
          </span>
          <div className="flex items-center gap-2">
            {cat.health >= 80 ? <ShieldCheck size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className={cat.health >= 50 ? 'text-amber-500' : 'text-rose-500'} />}
            <span className="text-[10px] font-black text-slate-700">%{cat.health} SECURITY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TechAnalysisPage = ({ auditData, t, layout, totalPages }) => {
  const isTr = t.reportTitle?.includes('MÜHENDİSLİĞİ');

  const categories = useMemo(() => {
    if (!auditData) return [];
    
    return [
      {
        id: 'service',
        index: 'S4',
        name: isTr ? 'BÖLÜM IV: HASSAS DOSYA ANALİZİ (S4)' : 'SECTION IV: SENSITIVE FILE AUDIT (S4)',
        iso: 'A.8.9',
        health: auditData.categoricalHealth?.service ?? 100,
        isoTitle: isTr ? 'ISO 27001:2022 A.8.9 Konfigürasyon Yönetimi' : 'ISO 27001:2022 A.8.9 Configuration Management',
        desc: getDynamicDescription('service', auditData, isTr)
      },
      {
        id: 'headers',
        index: 'S3',
        name: isTr ? 'BÖLÜM III: GÜVENLİK BAŞLIKLARI (S3)' : 'SECTION III: SECURITY HEADERS (S3)',
        iso: 'A.8.26',
        health: auditData.categoricalHealth?.headers ?? 100,
        isoTitle: isTr ? 'ISO 27001:2022 A.8.26 Uygulama Güvenliği' : 'ISO 27001:2022 A.8.26 Application Security',
        desc: getDynamicDescription('headers', auditData, isTr)
      },
      {
        id: 'network',
        index: 'S2',
        name: isTr ? 'BÖLÜM II: AĞ VE PORT GÜVENLİĞİ (S2)' : 'SECTION II: NETWORK & PORT SECURITY (S2)',
        iso: 'A.8.20',
        health: auditData.categoricalHealth?.network ?? 100,
        isoTitle: isTr ? 'ISO 27001:2022 A.8.20 Ağ Güvenliği Kontrolü' : 'ISO 27001:2022 A.8.20 Network Security Control',
        desc: getDynamicDescription('network', auditData, isTr)
      },
      {
        id: 'domain',
        index: 'S6',
        name: isTr ? 'BÖLÜM VI: SSL LABS GÜVENLİK (S6)' : 'SECTION VI: SSL LABS SECURITY (S6)',
        iso: 'A.5.7',
        health: auditData.categoricalHealth?.domain ?? 100,
        isoTitle: isTr ? 'ISO 27001:2022 A.5.7 Tehdit İstihbaratı' : 'ISO 27001:2022 A.5.7 Threat Intelligence',
        desc: getDynamicDescription('domain', auditData, isTr)
      },
      {
        id: 'patching',
        index: 'S10',
        name: isTr ? 'BÖLÜM X: YAZILIM VE YAMA (S10)' : 'SECTION X: SOFTWARE PATCHING (S10)',
        iso: 'A.8.8',
        health: auditData.categoricalHealth?.patching ?? 100,
        isoTitle: isTr ? 'ISO 27001:2022 A.8.8 Teknik Zafiyet Yönetimi' : 'ISO 27001:2022 A.8.8 Technical Vulnerability Management',
        desc: getDynamicDescription('patching', auditData, isTr)
      }
    ].map(item => ({
      ...item,
      status: item.health >= 80 ? (isTr ? 'GÜVENLİ' : 'SECURE') : (item.health >= 50 ? (isTr ? 'RİSKLİ' : 'RISKY') : (isTr ? 'KRİTİK' : 'CRITICAL'))
    }));
  }, [auditData, isTr]);

  return (
    <>
      {/* SAYFA 1: S4, S3, S2 */}
      <Page pageNum={layout?.techSummary1} totalPages={totalPages} title="TEKNİK ANALİZ VE BULGULAR — I" t={t}>
        <div className="space-y-4 pt-4">
          <p className="text-[11px] text-slate-500 italic mb-6 border-b border-slate-100 pb-2">
            {isTr 
              ? "Hedef altyapı üzerinde gerçekleştirilen katmansal güvenlik analizlerinin özet bulguları ve ISO 27001:2022 eşleşmeleri aşağıda sunulmuştur."
              : "Summary findings of layered security analyses conducted on the target infrastructure and ISO 27001:2022 mappings are presented below."}
          </p>
          {categories.slice(0, 3).map((cat, i) => (
            <TechFrame key={i} cat={cat} isTr={isTr} />
          ))}
        </div>
      </Page>

      {/* SAYFA 2: S6, S10 */}
      <Page pageNum={layout?.techSummary2} totalPages={totalPages} title="TEKNİK ANALİZ VE BULGULAR — II" t={t}>
        <div className="space-y-4 pt-4">
           <p className="text-[11px] text-slate-500 italic mb-6 border-b border-slate-100 pb-2">
            {isTr 
              ? "Sertifikasyon, SSL/TLS şifreleme kalitesi ve yazılım güncelliği analizlerine dayalı teknik özetler:"
              : "Technical summaries based on certification, SSL/TLS encryption quality, and software patch analysis:"}
          </p>
          {categories.slice(3, 5).map((cat, i) => (
            <TechFrame key={i} cat={cat} isTr={isTr} />
          ))}
          
          <div className="mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-dashed border-slate-200">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 text-center">ANALİZ METODOLOJİSİ</h4>
             <p className="text-[10px] leading-relaxed text-slate-500 text-center font-medium">
               {isTr 
                 ? "Yukarıdaki puanlamalar; gerçek zamanlı sızma testi motoru (ALFA-V3) tarafından elde edilen teknik kanıtların, CVSS v3.1 skorlama sistemi ve ISO 27001:2022 BGYS kontrolleriyle çapraz referanslanması sonucunda otomatik olarak hesaplanmıştır."
                 : "The scorings above are automatically calculated by cross-referencing technical evidence obtained by the real-time penetration testing engine (ALFA-V3) with the CVSS v3.1 scoring system and ISO 27001:2022 ISMS controls."}
             </p>
          </div>
        </div>
      </Page>
    </>
  );
};
