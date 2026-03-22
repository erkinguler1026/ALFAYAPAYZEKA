/**
 * ALFA YAPAY ZEKA - SÖZLEŞME VERİ MERKEZİ
 * 
 * Bu dosya, AI-WEB ve AI-PENTEST sözleşmelerinin şablonlarını tutar.
 */

/**
 * Hukuki Sözleşme Verileri (V1.4.0)
 * 
 * Açıklama: AI-WEB-TASARIM ve AI-PENTEST hizmet sözleşmelerinin kurumsal 
 * şablonlarını barındıran merkezi veri dosyasıdır.
 * 
 * Not: Bu dosyadaki değişiklikler ContractView üzerinden tüm müşterilere yansır.
 * 
 * © 2026 ALFA YAPAY ZEKA — Siber Tehditlere Kapalı, Müşterilere Açık.
 */
export const contractsData = {
  "ai-web": {
    title: "AI-WEB-TASARIM HİZMET SÖZLEŞMESİ",
    code: "ALFA-WEB-2026",
    sections: [
      {
        id: 1,
        title: "TESLİM VE KAPSAM",
        content: `1.1. Teknik Kapsam (EK-1): Sözleşme konusu iş; Ek-1'de belirtilen modülleri, sayfa yapılarını ve API entegrasyonlarını kapsar. Her türlü kapsam dışı talep ayrıca ücretlendirilir.\n1.2. Teslim Biçimi: Web sitesinin [alan adı] adresinde tüm fonksiyonları çalışır halde yayına alınması, testlerinin (Frontend/Backend) tamamlanması ve Müşteri’ye mail ile onay bildiriminin yapılması ile proje "Teslim Edilmiş" sayılır.`
      },
      {
        id: 2,
        title: "SÜRE VE BAKIM",
        content: `2.1. Geliştirme Süresi: Projenin teknik hazırlık süresi 30 ile 60 iş günüdür.\n2.2. Bakım Süresi: Yayın tarihinden itibaren minimum 12 Ay boyunca bakım hizmeti verilir.\n2.3. Bakım Kapsamı: Güvenlik yamaları, periyodik yedeklemeler ve sistem hatalarının giderilmesi bakıma dahildir. Tasarım değişiklikleri ve yeni fonksiyon talepleri bakım dışıdır.`
      },
      {
        id: 3,
        title: "ÜCRET VE ÖDEME PLANI",
        content: `3.1. Ödeme Şartı: Kurumsal planlama ve kaynak rezervasyonu gereği, proje bedeli sözleşme imzasında TAMAMI PEŞİN olarak tahsil edilir.\n3.2. Gecikme: Bakiyenin veya ek hizmet bedellerinin ödenmemesi durumunda, Hizmet Sağlayıcı yayını durdurma ve hizmeti askıya alma hakkına sahiptir.`
      },
      {
        id: 4,
        title: "SORUMLULUK SINIRI",
        content: `4.1. Altyapı: Hosting sağlayıcısı, alan adı yenileme ihmali veya müşterinin yönetim paneli üzerinden yaptığı hatalı müdahalelerden kaynaklanan kesintilerden Hizmet Sağlayıcı sorumlu değildir.\n4.2. SEO: Hizmet Sağlayıcı teknik SEO uyumluluğu sağlar; ancak belirli bir Google sıralaması veya ziyaretçi sayısı taahhüdünde bulunmaz.`
      },
      {
        id: 5,
        title: "VERİ GÜVENLİĞİ VE YEDEKLEME",
        content: `5.1. Operasyon: Hizmet Sağlayıcı, ISO 27001 standartları çerçevesinde makul ticari özenle yedekleme yapar. Mücbir sebepler ve üçüncü taraf saldırılarında sorumluluk, sistemin mevcut son başarılı yedeği ile sınırlıdır.\n5.2. KVKK: Kişisel veriler, Müşteri'nin web sitesindeki [KVKK Aydınlatma Metni] uyarınca işlenir.`
      },
      {
        id: 6,
        title: "İPTAL VE FESİH",
        content: `6.1. Süreç İptali: Müşteri çalışmayı proje ortasında iptal ederse, ayrılan teknik zaman ve teslim edilen ön çalışmalar nedeniyle ödenen peşinat iade edilmez.\n6.2. Bakım Feshi: 12 aylık zorunlu bakımın erken iptalinde, kalan ayların toplam bedeli fesih tarihinde tek seferde tahakkuk eder.`
      },
      {
        id: 7,
        title: "SİGORTA VE ÜÇÜNCÜ TARAFLAR",
        content: `7.1. Sigorta Statüsü: Siber risk ve kâr kaybı sigortaları sadece yetkili acentelerce sunulur. Hizmet Sağlayıcı teknik altyapı desteği verir; sigorta sözleşmesinin tarafı değildir.\n7.2. Yönlendirme: Üçüncü taraf yönlendirme ve iş ortaklığı ilişkileri ayrı bir gizlilik protokolüne tabidir.`
      }
    ]
  },
  "ai-pentest": {
    title: "AI-PENTEST SİBER SAVUNMA SÖZLEŞMESİ",
    code: "ALFA-PENTEST-2026",
    sections: [
      {
        id: 1,
        title: "TESLİM VE KAPSAM (AI-PENTEST)",
        content: `1.1. Analiz Kapsamı (EK-1): Müşteri adına gerçekleştirilecek "Dış Ağ" ve "İç Ağ" sızma testi modüllerini, zafiyet tarama derinliğini ve raporlama detaylarını kapsar.\n1.2. Teslim Biçimi: Test analizlerinin tamamlanması, zafiyet bulgularının teknik olarak raporlanması ve raporun Müşteri’ye şifreli kanal üzerinden teslim edilmesi ile hizmet "Teslim Edilmiş" sayılır.`
      },
      {
        id: 2,
        title: "SÜRE VE GÜNCELLEME",
        content: `2.1. Analiz Süresi: Teknik hazırlık ve aktif tarama süresi 15 ile 30 iş günüdür.\n2.2. Periyodik Kontrol: Proje bitiminden sonraki 12 ay boyunca kritik zero-day alarmları ve periyodik "re-scan" imkanı sunulur.\n2.3. Güncelleme Kapsamı: Sadece teslim edilen rapor kapsamındaki varlıkların takibi yapılır; yeni domain/sunucu eklenmesi ayrıca ücretlendirilir.`
      },
      {
        id: 3,
        title: "ÜCRET VE ÖDEME ŞARTLARI",
        content: `3.1. Peşin Ödeme: AI-PENTEST hizmeti, teknik kaynak ve uzman zaman rezervasyonu gerektirdiğinden, bedelin TAMAMI PEŞİN olarak projenin en başında tahsil edilir.\n3.2. Kesinti: Ödemesi yapılmamış analiz süreçlerine başlanmaz ve rapor teslimi yapılmaz.`
      },
      {
        id: 4,
        title: "SORUMLULUK SINIRI (TEKNİK)",
        content: `4.1. Teknik Risk: Pentest işlemi sırasında hedef sistemlerde oluşabilecek anlık yavaşlamalar veya servis kesintilerinden Hizmet Sağlayıcı sorumlu tutulamaz. Müşteri, test öncesi yedekleme yapmaktan sorumludur.\n4.2. Zaman Riski: AI-PENTEST "Anlık" bir durum tespitidir. Analiz bittikten sonra oluşabilecek yeni siber tehditler sorumluluk dışıdır.`
      },
      {
        id: 5,
        title: "VERİ GÜVENLİĞİ VE ISO 27001",
        content: `5.1. Gizlilik: Tüm bulgular ISO 27001 BGYS standartlarında "Çok Gizli" olarak işlenir. Müşteri verileri harici ortamlarda saklanmaz.\n5.2. KVKK: Siber güvenlik analizleri sırasında işlenen kurumsal veriler, Müşteri'nin gizlilik politikasına uygun olarak yönetilir.`
      },
      {
        id: 6,
        title: "İPTAL VE FESİH",
        content: `6.1. Başlamış Analiz: Teknik analiz süreci başladıktan sonra iptal talebi gelmesi durumunda, peşinat iadesi yapılmaz.\n6.2. Bakım İptali: Periyodik takip ve re-scan sürecinin erken iptalinde, kalan dönemin bedeli tahakkuk eder.`
      },
      {
        id: 1,
        title: "SİGORTA VE ÜÇÜNCÜ TARAFLAR",
        content: `7.1. Sigorta Sorumluluğu: Siber suç sigortası ancak sigorta şirketlerince tanzim edilir. Hizmet Sağlayıcı sadece ISO 27001 uyumlu teknik veri ve risk analizi sunar; sigorta poliçesinin tarafı değildir.\n7.2. Yönlendirme: İş ortağı sigorta acenteleri ile olan yönlendirme ilişkisi Hizmet Sağlayıcı ile Üçüncü Taraf arasındaki protokol ile mahfuzdur.`
      }
    ]
  }
};
