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
  const siteChunks = Math.max(1, Math.ceil(sitemap.length / 32));
  const dumpChunks = Math.max(5, Math.ceil(dumpText.length / 1200)); // 1200 char per page for forensic granularity

  let p = 0;
  const layout = {};

  layout.cover  = ++p; // 1
  layout.toc    = ++p; // 2
  layout.cert   = ++p; // 3
  layout.summary= ++p; // 4
  layout.summary2= ++p; // 5
  layout.s1     = ++p; // 6
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

// ── ISO 27001:2022 GLOBAL MAPPING ──
export const GLOBAL_ISO_MAPPING = {
  s1:  { id: "A.8.20", name: "Ağ güvenliği" },
  s2:  { id: "A.8.21", name: "Ağ hizmetlerinin güvenliği" },
  s3:  { id: "A.8.26", name: "Uygulama güvenliği gereksinimleri" },
  s4:  { id: "A.8.24", name: "Hizmetlerin kullanımı (Kriptografi)" },
  s5:  { id: "A.8.8",  name: "Teknik zafiyet yönetimi" },
  s6:  { id: "A.8.21", name: "Ağ hizmetlerinin güvenliği" },
  s7:  { id: "A.8.26", name: "Uygulama güvenliği gereksinimleri" },
  s8:  { id: "A.8.20", name: "Ağ güvenliği" },
  s9:  { id: "A.8.24", name: "Hizmetlerin kullanımı (Kriptografi)" },
  s10: { id: "A.5.9",  name: "Bilgi envanteri ve diğer ilişkili varlıklar" },
  s11: { id: "A.8.26", name: "Uygulama güvenliği gereksinimleri" },
  s12: { id: "A.8.26", name: "Uygulama güvenliği gereksinimleri" },
  s13: { id: "A.8.8",  name: "Teknik zafiyet yönetimi" },
  s14: { id: "A.5.7",  name: "Tehdit istihbaratı" },
  s15: { id: "A.5.7",  name: "Tehdit istihbaratı" },
  s16: { id: "A.5.9",  name: "Bilgi envanteri ve diğer ilişkili varlıklar" }
};
