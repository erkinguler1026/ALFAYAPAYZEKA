/**
 * @file FullReportUtils.js
 * @description ALFA X-RAY V3 Raporlama Sistemi için yardımcı fonksiyonlar ve sabit veriler.
 * 
 * Bu dosya, raporun dinamik sayfalama (pagination) mantığını, veri parçalama (chunking) işlemlerini
 * ve ISO 27001:2022 kontrol maddeleriyle olan merkezi eşleştirmeyi (mapping) barındırır.
 */

/**
 * @function chunkArray
 * @description Bir diziyi belirtilen boyutlarda parçalara ayırır. Sayfalama işlemlerinde kullanılır.
 */
export const chunkArray = (arr, size) => {
  const result = [];
  if (!arr) return result;
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
};

/**
 * @function safeUpper
 * @description İngilizce teknik terimleri güvenli bir şekilde büyük harfe dönüştürür.
 * 
 * Tarayıcı 'lang=tr' modundayken '.toUpperCase()' fonksiyonu 'i' harfini 'İ' yapar.
 * Bu fonksiyon '.toLocaleUpperCase('en-US')' kullanarak 'STRICT', 'SECURITY' gibi 
 * terimlerin doğru (noktasız) görünmesini sağlar.
 */
export const safeUpper = (str) => (str || '').toLocaleUpperCase('en-US');

/**
 * calculatePageLayout(auditData)
 *
 * Gerçek veriye göre her bölümün hangi sayfaya düşeceğini ve
 * toplam sayfa sayısını önceden hesaplar.
 *
 * Döndürdüğü nesne:
 *   layout.cover, layout.toc, layout.cert,
 *   layout.s1 .. layout.s12,
 *   layout.dump1, layout.dump2, layout.legal, layout.final,
 *   layout.total
 */
export function calculatePageLayout(auditData) {
  const subdomains = auditData?.subdomainList || [];
  const sitemap    = auditData?.sitemapData?.urls || [];
  const dumpText   = JSON.stringify(auditData || {}, null, 2);

  // Chunk Page Counts (Forensic Edition: Higher Density)
  const subdChunks = Math.max(1, Math.ceil(subdomains.length / 28));
  const siteChunks = Math.max(1, Math.ceil(sitemap.length / 20)); // NextGenPage'deki SITEMAP_PER_PAGE ile senkronize (20/sayfa)
  const dumpChunks = Math.max(5, Math.ceil(dumpText.length / 1200)); // 1200 char per page for forensic granularity

  let p = 0;
  const layout = {};

  layout.cover  = ++p; // 1
  layout.toc    = ++p; // 2
  layout.cert   = ++p; // 3
  layout.summary= ++p; // 4
  layout.summary2= ++p; // 5
  layout.techSummary1 = ++p; // 6: (S4, S3, S2)
  layout.techSummary2 = ++p; // 7: (S6, S10)
  layout.s1     = ++p; // 8
  layout.s2     = ++p; 
  layout.s3     = ++p; 
  layout.s4     = ++p; 
  layout.s5     = ++p; 
  layout.s6     = ++p; 
  layout.s7     = ++p; 
  layout.s8     = ++p; // Subdomains Start
  p += subdChunks - 1; // Subdomain Overflow
  layout.s9     = ++p; 
  layout.s10    = ++p; 
  layout.s11    = ++p; 
  layout.s12    = ++p; 
  layout.s13    = ++p; 
  layout.s14    = ++p; 
  layout.s15    = ++p; 
  layout.s16    = ++p; // Sitemap Start
  p += siteChunks - 1; // Sitemap Overflow

  layout.dump1  = ++p; // JSON Dump Start
  p += dumpChunks - 1; 


  layout.legal  = ++p; //     — Yasal Bilgilendirme
  layout.isoMapping = ++p; //     — ISO 27001 Mapping Table (NEW)
  layout.final  = ++p; //     — Resmi Onay & İmza

  layout.total  = p;   // GERÇEK TOPLAM SAYFA

  return layout;
}

// ── MULTI-STANDARD COMPLIANCE MAPPING (ISO 27005:2022 PRIMARY) ──
// Bu tablo, ALFA X-RAY V3 denetim modüllerinin uluslararası standartlarla olan çapraz eşleştirmesini barındırır.
export const GLOBAL_ISO_MAPPING = {
  s1: {
    iso27001: "A.8.20",
    iso27002: "8.20",
    iso27005: "8.1.1",
    itil: "ISM-01",
    cobit: "APO13.01",
    name: "Ağ Güvenliği (Network Security)",
    nameEn: "Network Security Audit"
  },
  s2: {
    iso27001: "A.8.21",
    iso27002: "8.21",
    iso27005: "8.1.2",
    itil: "ISM-02",
    cobit: "APO13.02",
    name: "Ağ Hizmetlerinin Güvenliği",
    nameEn: "Security of Network Services"
  },
  s3: {
    iso27001: "A.8.26",
    iso27002: "8.26",
    iso27005: "8.2.1",
    itil: "SD-04",
    cobit: "BAI03.05",
    name: "Uygulama Güvenliği Gereksinimleri",
    nameEn: "Application Security Requirements"
  },
  s4: {
    iso27001: "A.8.24",
    iso27002: "8.24",
    iso27005: "8.2.2",
    itil: "SD-05",
    cobit: "BAI03.06",
    name: "Kriptografik Kontroller",
    nameEn: "Cryptographic Controls & PKI"
  },
  s5: {
    iso27001: "A.8.8",
    iso27002: "8.8",
    iso27005: "9.2.1",
    itil: "ISM-08",
    cobit: "DSS05.01",
    name: "Teknik Zafiyet Yönetimi",
    nameEn: "Technical Vulnerability Mgmt."
  },
  s6: {
    iso27001: "A.8.21",
    iso27002: "8.21",
    iso27005: "8.1.2",
    itil: "ISM-02",
    cobit: "APO13.02",
    name: "Servis Güvenliği",
    nameEn: "Service Security"
  },
  s7: {
    iso27001: "A.8.26",
    iso27002: "8.26",
    iso27005: "8.2.1",
    itil: "SD-04",
    cobit: "BAI03.05",
    name: "Web Uygulama Güvenliği",
    nameEn: "Web Application Security"
  },
  s8: {
    iso27001: "A.8.20",
    iso27002: "8.20",
    iso27005: "8.1.1",
    itil: "ISM-01",
    cobit: "APO13.01",
    name: "Varlık Envanteri (Subdomains)",
    nameEn: "Asset Inventory (Subdomains)"
  },
  s9: {
    iso27001: "A.8.24",
    iso27002: "8.24",
    iso27005: "8.2.2",
    itil: "SD-05",
    cobit: "BAI03.06",
    name: "TLS/SSL Bütünlüğü",
    nameEn: "TLS/SSL Integrity"
  },
  s10: {
    iso27001: "A.5.9",
    iso27002: "5.9",
    iso27005: "7.1.1",
    itil: "AM-01",
    cobit: "BAI09.01",
    name: "Bilgi Varlıkları Envanteri",
    nameEn: "Information Asset Inventory"
  },
  s11: {
    iso27001: "A.8.26",
    iso27002: "8.26",
    iso27005: "8.2.1",
    itil: "SD-04",
    cobit: "BAI03.05",
    name: "Form ve Girdi Güvenliği",
    nameEn: "Form & Input Security"
  },
  s12: {
    iso27001: "A.8.26",
    iso27002: "8.26",
    iso27005: "8.2.1",
    itil: "SD-04",
    cobit: "BAI03.05",
    name: "İstemci Tarafı Güvenliği",
    nameEn: "Client-Side Security"
  },
  s13: {
    iso27001: "A.8.8",
    iso27002: "8.8",
    iso27005: "9.2.1",
    itil: "ISM-08",
    cobit: "DSS05.01",
    name: "Sunucu Yapılandırma Analizi",
    nameEn: "Server Configuration Analysis"
  },
  s14: {
    iso27001: "A.5.7",
    iso27002: "5.7",
    iso27005: "6.1.1",
    itil: "ISM-07",
    cobit: "APO12.01",
    name: "Tehdit İstihbaratı",
    nameEn: "Threat Intelligence"
  },
  s15: {
    iso27001: "A.5.7",
    iso27002: "5.7",
    iso27005: "6.1.1",
    itil: "ISM-07",
    cobit: "APO12.01",
    name: "IP Repütasyon Analizi",
    nameEn: "IP Reputation Analysis"
  },
  s16: {
    iso27001: "A.5.9",
    iso27002: "5.9",
    iso27005: "7.1.1",
    itil: "AM-01",
    cobit: "BAI09.01",
    name: "Mimari ve Haritalama",
    nameEn: "Architecture & Mapping"
  },
};
