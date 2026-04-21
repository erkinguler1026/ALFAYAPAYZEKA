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

- **Scoring Senkronizasyonu:** Snap ve Full motorları arasındaki puan farkı giderildi. SSH (22), SMTP (25), POP3/IMAP gibi kritik servisler artık her iki motorda da "YÜKSEK RİSK" (-60 puan) olarak puanlanıyor.
- **Dinamik Özet Motoru:** `FullScoreCard.jsx` üzerindeki 3.1 - 3.5 kategorileri artık %100 dinamik ve veriye dayalı.
- **Terminoloji:** Tüm "Full" katmanı bileşenlerinden "Forensic/Adli" ibareleri temizlendi.



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

- **MGK (MÜŞTERİ GÖZÜYLE KONTROL) İLKESİ:** UI, CSS ve içerik düzenlemeleri yaparken her zaman "müşteri/son kullanıcı bunu nasıl görür?" vizyonuyla hareket et. Kullanıcının uyarısını beklemeden; dil/karakter çeviri hatalarını (örneğin CSS uppercase kaynaklı 'i' -> 'İ' sorunları), hizalama kaçıklıklarını veya okunaksız renk seçimlerini proaktif analiz et ve baştan mükemmelleştir. Müşteri "olmamış" demeden sen işi parlat.

- **İnternet Araması (Search Web) Yasağı:** Proje içi UI, metin veya basit mantık hataları için ASLA `search_web` kullanma. Sadece daha önce hiç duyulmamış bir kütüphane veya hata kodu varsa kullanıcıya sorarak kullan.
- **Tarayıcı (Browser) Kullanımını Sınırla:** UI görsel hatalarını kod üzerinden tahmin etmeye çalış. Tarayıcıyı (`browser_subagent`) sadece "görmeden çözülmesi imkansız" olan karmaşık CSS yerleşim hataları için kullan.
- **Tek Seferde Çoklu Düzenleme:** Dosya düzenlerken `replace_file_content` yerine, mümkün olan her durumda `multi_replace_file_content` kullanarak tek bir "turn" içerisinde tüm değişiklikleri yap. (Daha az mesaj = Daha az kota).
- **Analiz Fazını Kısa Tut:** Basit isteklerde (örneğin: "Şu butonu kırmızı yap") 5 sayfalık plan ve analiz yapma, doğrudan uygulamaya geç.
- **Önce Yerel Hafıza:** Bilgiye ihtiyaç duyduğunda önce bu dosyayı (`ALFA_SISTEM_HAFIZASI.md`) veya yerel kodları (`grep_search`) tara. Google'da arama yapmak en pahalı agent işlemidir.
- **Kullanıcıya Seçenek Sun:** Eğer bir işlem çok fazla agent turu (turn) gerektirecekse, başlamadan önce kullanıcıya "Bu işlem 5-10 turn sürebilir, devam edelim mi?" diye sor.

---

## 7. KRİTİK MİMARİ KURALLAR
1. **TERMINOLOJİ:** "Forensic/Adli" terimi ASLA kullanılmayacak. Tüm sistem "Penetrasyon Testi" olarak adlandırılacak.
2. **DINAMİK İÇERİK:** 3.x maddelerindeki açıklamalar asla statik/kitabi olmayacak. `auditData` içindeki bulgulara göre gerçek zamanlı üretilecek.
3. **SKOR SENKRONİZASYONU:** Snap (Hızlı) ve Full (Detaylı) raporların kategori bazlı sağlık puanları (categoricalHealth) her zaman senkron olmalıdır. Port 22, 25, 110, 143, 445 gibi riskli servisler her iki motorda da "YÜKSEK RİSK" seviyesinde dedüksiyon (-60 puan) tetikleyerek ilgili kategoriyi %40 seviyesine çeker.
4. **PDF GENERATION:** PDF'ler için `_blank` pencerede açılan dedicated print rotaları (`FullScoreCardPrint.jsx`) kullanılacak. 
5. **HATA YÖNETİMİ:** `scrollIntoView` yasaktır, `scrollTop` kullanılacak.
6. **VERİ KAYNAĞI:** `realFullPentestEngine.js` tek ve mutlak veri kaynağıdır (V3.0 V-CORE).

---

## 8. AI OPERASYON PROTOKOLLERİ (MACROS)

Sistemde tekrarlayan görevleri hızlandırmak için aşağıdaki komut kalıpları (makrolar) tanımlanmıştır. Kullanıcı bu komutları verdiğinde, AI o işlemi hiç soru sormadan, önceden belirlenmiş adımlarla uygular:

- **[ALFA_CHECKPOINT] :** Kullanıcı bu komutu verdiği anda AI;
  1. O anki aktif değişiklikleri tarar ve profesyonel bir log mesajı ile `git commit` işlemini gerçekleştirir.
  2. Başarıları ve güncellemeleri `ALFA_SISTEM_HAFIZASI.md` (Madde 25) içine yazar.
  3. `README.md` dosyasındaki "Son Güncelleme" tarihini ve notunu günceller.
  4. Kullanıcıya her şeyin güvene alındığına dair bitirme onayı verir.

---
---
*Son Güncelleme: 20.04.2026*

## 9. REVİZYON 10 (20 Nisan 2026) - Mizanpaj, Tipografi ve Adli Bilişim Düzeltmeleri
1. **CSS Uppercase & Türkçe Karakter (İ/I) Optimizasyonları:** İngilizce teknik terimlerin (Örn: *SECURITY INTELLIGENCE, DOMAIN*) CSS üzerinde hatalı (noktalı) `İ` ve `ı` harfiyle render edilmesini engellemek için tüm bu terimler doğrudan JS içinde BÜYÜK HARFLE hardcode edilmiştir. Yasal uyarıdaki `Hash Cracking` -> `HASH CRACKING` gibi.
2. **Yasal Metin (Legal Disclaimer) Revizyonları:** Rapor son sayfasındaki yasal mühür metni adli formata uygun olarak *"Raporun tüm sayfaları dijital olarak şifrelenmiştir"* şeklinde değiştirildi.
3. **TOC (İçindekiler) A4 Formatı Taşma Koruması:** `FullReportTOCPage.jsx` sayfasındaki son çerçeve ("Güvenlik Sertifikasyonu") sayfa limitini aştığı için `Sayfa 003` olarak ayrı ve özel bir konuma merkeze alınarak taşınmıştır. Standardizasyon ismi `ISO 27001:2022 BGYS` şeklinde profesyonelleştirildi.
4. **Target URL (Dinamik Format):** IP Çözümleme bölümündeki çıplak domain adı, `https://www.ornek.com` şeklinde (Dinamik URL) formatlanmıştır.
5. **JSON Dump (Sayfa 235) Taşma Çözümü:** Sayfa altında footer sınırını ihlal eden `<pre>` Terminal çerçevesinin dış/iç boşlukları (`mb`, `p`) kısılarak ve `max-h-[460px]` seviyesine çekilerek tam bir milimetrik mizanpaj sağlanmıştır.
6. **Güvenli Arşivleme:** Numaralandırma kontrolünden önce `YEDEK_R10_20042026.zip` isimli projenin `node_modules` ve `.git` barındırmayan %100 sağlıklı tam arşiv backup'u alınmıştır.

---

**MGK (MÜŞTERİ GÖZÜYLE KONTROL) İLKESİ:** 
UI, CSS ve içerik düzenlemeleri yaparken her zaman "müşteri/son kullanıcı bunu nasıl görür?" vizyonuyla hareket et. Kullanıcının uyarısını beklemeden; dil/karakter çeviri hatalarını (örneğin CSS uppercase kaynaklı 'i' -> 'İ' sorunları), hizalama kaçıklıklarını veya okunaksız renk seçimlerini proaktif analiz et ve baştan mükemmelleştir. Müşteri "olmamış" demeden sen işi parlat.