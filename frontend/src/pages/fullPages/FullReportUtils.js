/**
 * ALFA Forensic Report Utilities
 */

export const chunkArray = (arr, size) => {
  const result = [];
  if (!arr) return result;
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
};

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
  const subdomains   = auditData?.subdomainList || [];


  // Kaç "chunk" sayfası oluşacağını hesapla
  const subdChunks = Math.max(1, Math.ceil(subdomains.length / 22));
  // Subdomain 0 ise yine de 1 sayfa (no-data sayfası) render edilecek

  let p = 0;
  const layout = {};

  layout.cover  = ++p; // 1  — Kapak Sayfası
  layout.toc    = ++p; // 2  — İçindekiler
  layout.cert   = ++p; // 3  — Güvenlik Sertifikasyon Beyanı
  layout.s1     = ++p; // 4  — IP Çözümleme
  layout.s2     = ++p; // 5  — Port Tarama
  layout.s3     = ++p; // 6  — HTTP Başlıkları
  layout.s4     = ++p; // 7  — SSL/TLS Analizi
  layout.s5     = ++p; // 8  — Sunucu Bilgi İfşası
  layout.s6     = ++p; // 9  — DNS E-Posta Güvenliği (SPF/DMARC)
  layout.s7     = ++p; // 10 — Hassas Dosya Tarama
  layout.s8     = ++p; // 11 — Subdomain (ilk chunk)
  p += subdChunks - 1; //    — Kalan subdomain chunk'ları
  layout.s9     = ++p; //    — SSL Labs
  layout.s10    = ++p; //    — WHOIS / RDAP
  layout.s11    = ++p; //    — Cookie Güvenliği
  layout.s12    = ++p; //    — CORS
  layout.s13    = ++p; //    — Teknoloji Tespiti
  layout.s14    = ++p; //    — Geo-IP
  layout.s15    = ++p; //    — IP İtibar
  layout.s16    = ++p; //    — Sitemap Analizi

  layout.dump1  = ++p; //     — JSON Dump Part 1
  layout.dump2  = ++p; //     — JSON Dump Part 2
  layout.legal  = ++p; //     — Yasal Bilgilendirme
  layout.final  = ++p; //     — Resmi Onay & İmza

  layout.total  = p;   // GERÇEK TOPLAM SAYFA

  return layout;
}
