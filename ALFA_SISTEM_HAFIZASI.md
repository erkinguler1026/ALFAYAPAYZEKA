# ALFA YAPAY ZEKA - SİSTEM VE MİMARİ HAFIZA KURALLARI

> **DİKKAT (ANTIGRAVITY İÇİN):** Bu dosya, oturum (session) koptuğunda projenin tasarım kararlarını, kritik isimlendirmelerini ve mimari yapılarını hatırlaman için otomatik güncellenen KALICI HAFIZA dosyasıdır. Kullanıcı "Kaldığımız yerden devam" dediğinde, kod yazmaya veya bug çözmeye başlamadan **ÖNCE BU DOSYAYI OKU**.

## 1. TERMINOLOJIK KURALLAR (KIRMIZI ÇİZGİLER)
- Proje genelinde hiçbir yerde **"Adli Bilişim"** kelimesi kullanılmayacaktır. Tüm terminoloji **"Penetrasyon Test"** veya **"Penetrasyon Analizi"** olarak güncellenmiştir.
- Hata / Hızlı Tarama ekranlarındaki geçici domain (URL) metinleri rastgele veya "SYSTEM_SCAN" gibi jenerik metinlerle doldurulamaz. Her zaman `searchParams.get('site')` üzerinden URL alınmalı, başlıkta küçük harfli tam URL (`https://www.ornek.com`) şeklinde kullanılmalıdır.

## 2. SNAP SCORE CARD (`SnapScoreCard.jsx`) MİMARİSİ
- **Çift Pencereli UI:** Yükleme ekranı (`isAnalyzing`) tasarımında birbirine %100 uyumlu, yüksekliği 650px olan Yan Yana Çift Çerçeve (Çift Pencere) mimarisi mevcuttur. Biri Genel yüzey işlemlerini (Sol), diğeri ise Matrix / Daktilo tarzı detaylı terminal işlemlerini (Sağ) gösterir.
- **Scroll Bar Hilesi:** `overflow-hidden` kullanılmamalıdır. Sayfa yüksekliği ve terminal kaydırma fonksiyonu tarayıcı penceresini dışarıdan kilitlemeyecek şekilde `containerRef.current.scrollTop` kurgusu ile kendi içinde çözülmüştür, sayfa zıplamasına neden olacak `scrollIntoView()` KULLANILAMAZ.

## 3. PDF YAZDIRMA & RAPORLAMA MİMARİSİ (ÇOK KRİTİK)
- **TEK DOSYADA YAZDIRMA YOK:** `SnapScoreCard.jsx` üzerinden `window.print()` ile ENTEGRE yazdırma **KESİNLİKLE YAPILMAMALIDIR**.
- **Ayrı Daktilo Şablonu:** PDF yazdırma işlemi için her zaman `downloadPDF` fonksiyonu `window.open('/scorecard-print', '_blank')` yöntemini kullanmalıdır.
- **SnapReportPrint.jsx Tasarımı:** Bu dosya (`SnapReportPrint.jsx`), A4 boyutunda özel "Daktilo (Typewriter)" şablonuyla tasarlanmıştır. Bu şablonun CSS, Margin veya `@media print` yapısı **KESİNLİKLE DEĞİŞTİRİLEMEZ**, aksi takdirde kullanıcıya çıkan PDF rapora yansıyan tasarımlarda kaymalar (kaçıklıklar) olur.
- **Mükerrer Yükleme Sorununun Çözümü:** İkinci sekmede (`SnapReportPrint.jsx`) API'nin tekrar tekrar 32 saniye tarama animasyonu yapmasını (Joker mode rescan) engellemek için, `SnapScoreCard.jsx` gelen ana verileri `sessionStorage.setItem('alfa_scan_TOKEN')` ile önbelleğe (cache) yazar. `SnapReportPrint.jsx` açılır açılmaz API hit etmek yerine bu `sessionStorage`'ı kontrol eder, veriyi saliseler içerisinde bulup animasyonları atlar.

## 4. BACKEND & PENTEST ENGINE LOGIC
- `JOKER_ADMIN_777` : Bu token ile beraber `site` parametresi de gönderilirse, sistem her seferinde 32 saniyelik GERÇEK ve senkron/asenkron sızma testleri gerçekleştirir.
- 32 saniye bekleme bilerek tasarlanmıştır çünkü arka planda 5 kategoride (SSL, NMAP Port Probe, Headers, Patching ifşası vs.) gerçek asenkron web istekleri atılmaktadır.

---

## 🛑 SON DURUM & KALINAN NOKTA (Aktüel)
- **Modüller:** Web UI yükleme animasyonları, Adli Bilişim temizlikleri, URL formatlama işlemleri tamamlandı.
- **Full Pentest Rapor (UI):** `FullReport.jsx` (Scorecard arayüzü) modern Light-Gray temasına geçirildi. Mock veriler temizlenerek `%100 gerçek analiz` verilerine (ISO27001 eşleştirmeleri, Whois/GeoIP detayları) bağlandı.
- **Baskı & Rapor:** `SnapReportPrint.jsx` (Daktilo A4 formatı) tam kapasite aktif. SessionStorage caching stabil.
- **Localization (i18n):** Tüm sistem (Web UI, Terminal Analiz Logları ve PDF Raporu) tam dinamik İngilizce (EN) ve Türkçe (TR) dil desteğine kavuşturuldu. `lang` parametresi tüm akışlarda korunmaktadır.
- **Kurumsal Kimlik & URL Sabitleme:** Raporun her sayfasında ve Web UI Dashboard'da hedef firmanın tam URL bilgisi (`https://www...`) konumlandırıldı. `www` çiftleme (doubling) hatası, akıllı bir regex temizleyicisi (`formattedUrl`) ile tüm sayfalarda kalıcı olarak giderildi.
- **Navigasyon Optimizasyonu (`skipAnim`):** Kullanıcı "Yazdır" sayfasından "Profile Dön" dediğinde gereksiz 6.5s bekleme süresi, URL'ye eklenen `skipAnim=true` parametresi ile akıllıca atlanarak akıcı bir UX sağlandı. Sayfa yenilemelerinde şov (animasyon) hala aktiftir.
- **Onay Sayfası Tasarımı:** 4. Sayfadaki "UNIT APPROVAL" mühür kutusu; hem başlığı hem de firma URL'sini (text-lg) iki kalın daktilo çizgisi içinde barındıracak şekilde finalize edildi.

---
---

## 5. Mimari Yapılandırma (Tiered Organization)
Sistem, "Free" ve "Full" katmanlarına göre kategorize edilmiştir. Bu hiyerarşik yapı korunmalı ve yeni dosyalar ilgili alt klasörlere eklenmelidir.

### 5.1 Frontend (pages/)
- **freePages/**: Ücretsiz servisler (`WebRisk.jsx`, `AIPentest.jsx`, `SnapReport.jsx`, `SnapScoreCard.jsx`, `SnapReportPrint.jsx`).
- **fullPages/**: Profesyonel denetim ve raporlama araçları (`FullReportPrint.jsx`, `AuditReportGenerator.jsx`, `ContractView.jsx`).

### 5.2 Backend (utils/)
- **freeUtils/**: Temel analiz motorları (`freePentestEngine.js`, `pentestEngine.js`, `urlAnalyzer.js`).
- **fullUtils/**: Gelişmiş sızma testi motorları ve kütüphaneler (`realFullPentestEngine.js`, `findingLibrary.js`, `fullPentestEngine.js`).

---

## 6. ANTIGRAVITY / ARGON OPTİMİZASYON KURALLARI (BÜTÇE KORUMA)

> **ÖNEMLİ:** Kullanıcının kısıtlı ücretsiz kotalarını (Argon) korumak için aşağıdaki kurallar zorunludur:

- **İnternet Araması (Search Web) Yasağı:** Proje içi UI, metin veya basit mantık hataları için ASLA `search_web` kullanma. Sadece daha önce hiç duyulmamış bir kütüphane veya hata kodu varsa kullanıcıya sorarak kullan.
- **Tarayıcı (Browser) Kullanımını Sınırla:** UI görsel hatalarını kod üzerinden tahmin etmeye çalış. Tarayıcıyı (`browser_subagent`) sadece "görmeden çözülmesi imkansız" olan karmaşık CSS yerleşim hataları için kullan.
- **Tek Seferde Çoklu Düzenleme:** Dosya düzenlerken `replace_file_content` yerine, mümkün olan her durumda `multi_replace_file_content` kullanarak tek bir "turn" içerisinde tüm değişiklikleri yap. (Daha az mesaj = Daha az kota).
- **Analiz Fazını Kısa Tut:** Basit isteklerde (örneğin: "Şu butonu kırmızı yap") 5 sayfalık plan ve analiz yapma, doğrudan uygulamaya geç.
- **Önce Yerel Hafıza:** Bilgiye ihtiyaç duyduğunda önce bu dosyayı (`ALFA_SISTEM_HAFIZASI.md`) veya yerel kodları (`grep_search`) tara. Google'da arama yapmak en pahalı agent işlemidir.
- **Kullanıcıya Seçenek Sun:** Eğer bir işlem çok fazla agent turu (turn) gerektirecekse, başlamadan önce kullanıcıya "Bu işlem 5-10 turn sürebilir, devam edelim mi?" diye sor.

---
*Son Güncelleme: 13.04.2026*
*Durum: Tiered Refactoring Tamamlandı. Argon Optimizasyon Kuralları (Eco-Mode) devreye alındı.*


