# 🦾 PROJECT: MALIBU PROTOCOL (ALFA AI-LAB)
## 🛡️ "The Iron Man 3 Diagnostic & Intelligence Core"

Bu belge, "Vendor Lock-in" (Google / Bulut sistemlerine bağımlılık) riskini ortadan kaldırmak için oluşturulmuş %100 Otonom Yerel Yapay Zeka Kurulum Stratejisidir.

## 1. Stratejik Vizyon (Vurkaç Taktiği)

- **Amaç:** Antigravity alt yapısına olan bağımlılığı kırmak ve kendi masamızda duran, internet kesintisinden etkilenmeyen, ajan (agentic) özelliklere sahip yerel bir "Lokal Jarvis" kurmak.
- **Yöntem:** Bulut tabanlı hizmetleri ücretsizken sonuna kadar sömürerek (Alfa Card, Raporlama vb.) sermaye yaratmak ve o sermayeyi donanıma (Ekran Kartına) yatırmak.

## 2. Mevcut Masaüstü PC Röntgeni

- **Anakart:** Gigabyte B450M S2H (Tek Ekran Kartı için Mükemmel - ANAKART MASRAFI YOK)
- **İşlemci:** AMD Ryzen 5 5600X (Yedek işleme gücü olarak iyi - İŞLEMCİ MASRAFI YOK)
- **RAM:** 32 GB RAM (Çok Yeterli - RAM MASRAFI YOK)
- **Ekran Kartı:** AMD Radeon R9 390 (DEĞİŞİMİ ZORUNLU! VRAM Yetersiz, CUDA Çekirdekleri Yok)

## 3. Donanım Yükseltme (Upgrade) Reçetesi

Sistemi çöpe ATMİYORUZ. Sadece zekanın "Kalbi" (GPU) ile kalp krizini önleyecek "Damarları" (PSU) güçlendiriyoruz.

1. **LİDER NESİL KESİN İHTİYAÇ (AI BEYNİ):** Nvidia'nın en son "Blackwell" mimarisine (GDDR7 bellek) sahip, dev VRAM'li ve garantili son model ekran kartı.
    - **✅ NİHAİ ŞAMPIYON:** MSI GeForce RTX 5070 Ti Inspire 3X OC (16GB GDDR7). (ChatGPT ve kızınızın ortak kararı: Daha güçlü soğutma bloğu, kaliteli VRM tasarımı ve sessiz çalışma).
    - **Finansman ve Tedarik (Vatan Bilgisayar - Direkt Satın Alım):**
      - **✅ Şampiyon Seçenek:** Vatan Bilgisayar üzerinden peşin fiyatına **6 Taksit (Aylık 8.499,83 TL)**. Toplam Fiyat: **50.999 TL**.
      - **Neden Bu Model?** Ventus serisinden bir üst segmente konumlandırılması, daha stabil voltaj yönetimi ve yoğun AI yüklerinde dahi serin kalabilmesi (Premium Heatsink).
      - **Kırmızı Çizgi (Uzak Durulacaklar):** Karaborsa fiyatı olan 62.000 TL+ seviyesinden kesinlikle kaçınılacaktır. Sadece resmi Vatan fiyatı (51k altı) kabul edilmiştir.
2. **ÜST SEGMENT İHTİYAÇ (GÜCÜN KALBİ - PSU):** Sistemin beynini koruyacak, en üst segment (High-End) güç kaynağı. (Outlet riskinden KALICI OLARAK KAÇILDI).
    - **✅ NİHAİ ŞAMPIYON MODEL:** MSI MPG A850G PCIE5 850W 80+ Gold (ATX 3.0)
    - **Teknik Karne (Neden Bu Modeli Seçtik?):**
      - Kondansatörler: **%100 Japon Üretimi** (En uzun ömür ve stabilite).
      - Garanti: **120 Ay (10 YIL)** ✅ (N11/incehesap üzerinden sıfır kapalı kutu güvencesiyle).
      - Teknoloji: **Native PCIe 5.0** (RTX 5070 Ti için güvenli, direkt bağlantı).
    - **Finansman ve Tedarik:**
      - **✅ Şampiyon Seçenek (N11 - Satıcı: incehesap):** Peşin fiyatına **6 Taksit (Aylık ~1.260 TL)**. Toplam Fiyat: **7.565 TL**.
      - **ZAFER NOTU:** Giriş seviyesi MAGserisi fiyatına, üst segment MPG serisi sıfır/kapalı kutu olarak yakalanmıştır.
3. **MECBURİ İHTİYAÇ (FERAH ZIRH - KASA):** Önü tam Mesh panelli, devasa 160mm fanlı, "Lokal AI LAB" estetiğine sahip yüksek hava akışlı PC Kasası.
    - **✅ ONAYLANAN ŞAMPIYON MODEL:** Lian Li Lancool 216 ARGB Siyah (E-ATX)
    - **Teknik Karne (Fabrika Spesifikasyonlarından Doğrulandı):**
      - Boyutlar (D×G×Y): **48 × 23,5 × 49,1 cm** (Eski Corsair'den %40 daha geniş iç hacim!)
      - Dahil Fanlar: **2×160mm ARGB + 1×140mm** (160mm = devasa hava akışı, çok sessiz!)
      - Maks GPU Uzunluğu: **392 mm** ✅ (RTX 5070 Ti ~305mm, bol bol yer var)
      - Maks CPU Soğutucu: **180 mm** ✅
    - **Finansman ve Tedarik (Güncel Piyasa Analizi):**
      - **✅ Şampiyon Seçenek (Amazon TR - Amazon Direkt Satıcı):** Vade farksız **3 Taksit (Aylık 1.946 TL)**. Toplam Fiyat: **5.838 TL**.

## 4. Lokal Jarvis Entegrasyon Çizelgesi (Maksimum 1 Ay)

Yeni Nvidia Ekran Kartı kasaya takıldığı an sayaç başlar:

- **Aşama 1 (2-3 Gün):** Açık Kaynaklı Askeri Sınıf modellerin (Meta Llama 3 / DeepSeek vb.) indirilmesi ve Ollama altyapısıyla PC'ye gömülmesi.
- **Aşama 2 (1-2 Hafta):** Python tabanlı "Agentic Workflow" (Ajanlaşma). Yani modele terminal kullanma, C: dizininde dolaşma, dosya okuma/yazma/silme ve kod çalıştırma yetkilerinin benim (Antigravity'nin) tarafından öğretilmesi.
- **Aşama 3 (1 Hafta):** Mimarın (Benim) karakterimi, Prompt Engineering ile yeni yerel yapay zekaya (klonuma) miras bırakmam. ("Sen bir siber güvenlik uzmanısın, her zaman kod yazarken bunu dikkate al vs.")

---

## 5. NİHAİ FİNANSMAN PLANI (Tüm Bileşenler Onaylandı ✅)

| #   | Bileşen               | Model                              | Site      | Kart  | Taksit | Aylık        | Toplam    |
| --- | --------------------- | ---------------------------------- | --------- | ----- | ------ | ------------ | --------- |
| 1   | **GPU (AI Beyni)**    | MSI RTX 5070 Ti Inspire 3X OC 16GB | Vatan     | Tümü  | 6 ay   | **8.500 TL** | 50.999 TL |
| 2   | **PSU (Güç Kaynağı)** | MSI MPG A850G PCIE5 850W (SIFIR)   | N11       | Tümü  | 6 ay   | **1.260 TL** | 7.565 TL  |
| 3   | **KASA (Zırh)**       | Lian Li Lancool 216 ARGB Siyah     | Amazon    | Tümü  | 3 ay   | **1.946 TL** | 5.838 TL  |
| 4   | **SSD (Depo)**        | Samsung 870 EVO 2TB SATA SSD       | Hepsiburada| Tümü  | 9 ay   | **2.212 TL** | 19.911 TL |

### Aylık Ödeme Takvimi (Nihai - 30 Mart 2026):

| Dönem                  | GPU      | PSU      | KASA     | SSD (2TB) | **TOPLAM/AY** |
| ---------------------- | -------- | -------- | -------- | --------- | ------------- |
| **1. - 3. Ay**         | 8.500 TL | 1.260 TL | 1.946 TL | 2.212 TL  | **13.918 TL** |
| **4. - 6. Ay**         | 8.500 TL | 1.260 TL | —        | 2.212 TL  | **11.972 TL** |
| **7. - 9. Ay**         | —        | —        | —        | 2.212 TL  | **2.212 TL**  |
| **10. Aydan İtibaren** | —        | —        | —        | —         | **0 TL 🎉**   |

**Toplam Yatırım: 84.313 TL** (Aylık ödemeler bütçeye uygun şekilde, en kaliteli bileşenlerle yapılandırılmıştır.)

---

**DURUM:** 🟢 SATIN ALMA AŞAMASINDA — GPU: Vatan ONAYLANDI ✅. PSU: N11 ONAYLANDI ✅. KASA: Amazon ONAYLANDI ✅. SSD: Hepsiburada ONAYLANDI ✅.

---

## 6. 🛒 SİPARİŞ KILAVUZU (Adım Adım - Kopyala/Yapıştır Hazır!)

| #   | Ürün     | 🌐 Site Adresi                                 | 🔍 Arama Terimi                        | 💳 Hangi Kart     | ✅ Seçilecek Taksit                    |
| --- | -------- | ---------------------------------------------- | -------------------------------------- | ----------------- | ------------------------------------- |
| 1   | **GPU**  | [Vatan Bilgisayar](https://www.vatanbilgisayar.com) | `MSI RTX 5070 Ti Inspire 3X`          | **TÜM KARTLAR**   | 6 Taksit (8.500 TL/ay) |
| 2   | **PSU**  | [N11.com](https://www.n11.com)                  | `MSI MPG A850G PCIE5 incehesap`        | **TÜM KARTLAR**   | 6 Taksit (~1.260 TL/ay) |
| 3   | **KASA** | [Amazon.com.tr](https://www.amazon.com.tr)      | `Lian Li Lancool 216 Black`            | **WORLD / BONUS** | 3 Taksit (1.946 TL/ay) |
| 4   | **SSD**  | [Hepsiburada.com](https://www.hepsiburada.com)  | `Samsung 870 EVO 2TB`                 | **WORLD / PREMIUM**| 9 Taksit (2.212 TL/ay) |

### ⚠️ Sipariş Verirken Dikkat Edilecekler:

| Ürün              | Kritik Kontrol                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| **GPU (VATAN)**   | Taksit ekranında "Vade Farkı: 0" (Seçenek: 6 Taksit) yazıyor mu? Kontrol et!    |
| **PSU (N11)**     | Satıcının **Incehesap** olduğundan emin ol. Peşin fiyatına 6 taksit seçeneğini işaretlemeyi unutma! |
| **KASA (Amazon)** | "Amazon'un Seçimi" rozeti ve satıcı "Amazon" olmalı. 3 taksit seç.                                 |
| **SSD (H.BURADA)**| **Satıcı: Hepsiburada** olmasına dikkat et. 19.911 TL fiyattan sepete ekle ve 9 taksiti seç.        |

### 🚫 Kesinlikle Yapılmayacaklar:

- ❌ **Outlet / Teşhir ürünü almak** (Sıfır İncehesap ilanı varken asla maceraya gerek yok!)
- ❌ Trendyol veya Cimri üzerinden GPU almak (karaborsa fiyat riski)
- ❌ Bilinmeyen üçüncü parti satıcılardan almak (garanti riski)

---

## 7. 🚀 Vizyoner Ek Proje: ALFA-CODE (Yerel AI-Native IDE)

Bu proje, donanım yükseltmesi sonrası "ALFA AI-LAB" içerisinde geliştirilecek olan ticari ve teknik amiral gemisidir.

- **Çekirdek:** VS Code Open Source (vscode) Engine.
- **Konsept:** "Local-First" güvenlik odaklı, veriyi buluta göndermeyen, yerel Llama 3/DeepSeek modelleriyle %100 entegre kod düzenleyici.
- **Fark Yaratan Özellikler:**
    - Dahili siber güvenlik ve kod denetim asistanı.
    - Cursor/Windsurf rakibi, ancak tamamen gizlilik odaklı ve yerel çalışma kapasiteli.
    - Aylık $5 gibi rekabetçi bir abonelik veya yerel donanım sahiplerine ücretsiz kullanım modeli.
- **Ölçeklenme Stratejisi:** İleride talep artışı durumunda Amazon AWS (EC2/S3) altyapısı üzerinden bulut destekli hibrit çalışma modeli.

> **NOT:** Bu proje, Antigravity'nin (benim) teknik rehberliği ve yeni alınan RTX 5070 Ti gücüyle inşa edilecektir.

### 🛠️ ALFA-CODE: Uygulama Adımları (Application Steps)

1.  **Hazırlık:** Donanım montajı sonrası Windows/Linux ortamının ve NVMe/SSD dizinlerinin yüksek performanslı derleme (build) için optimize edilmesi.
2.  **AI Motoru Kurulumu:** Ollama/Llama.cpp altyapısının GPU (RTX 5070 Ti) üzerinde VRAM odaklı çalıştırılması.
3.  **Çekirdek Çatallama (Forking):** VS Code (vscode) açık kaynak deposunun klonlanması ve Microsoft telemetrilerinin (takip kodlarının) temizlenmesi.
4.  **Markalama & UI Özelleştirme:** "ALFA" teması, logoları, ikonları ve kullanıcı arayüzü bileşenlerinin editöre giydirilmesi.
5.  **ALFA-Bridge Geliştirme:** Editörün içinden yerel AI modeline (Local Inference) giden yüksek hızlı veri yolunun (IPC/Socket) kodlanması.
6.  **Kendi Kendini İnşa Etme (Self-Hosting):** ALFA-CODE'un özelliklerini kullanarak bizzat ALFA-CODE'u geliştirmek (En büyük test aşaması!).
7.  **Yayın & Ticari Altyapı:** $5/Ay Cloud abonelik ve "Local-Pro" lisanslama modüllerinin entegre edilmesi.

---

## 8. 🔍 Gelecek Vizyonu: ALFA-AI-HARDWARE (Akıllı Donanım Danışmanı)

ALFA-CODE ekosisteminin amiral gemisi donanım asistanı ve teşhis (diagnostic) ürünüdür. Proje üç ana katmandan oluşacaktır:

### 8.1. 🏠 Kişisel Katman (PC Enthusiast)
- **Konsept:** "Donanımını konuştur, sınırlarını zorla!" - Ham veriyi alıp, kullanıcıya insani dilde stratejik tavsiyeler veren dünyadaki ilk AI-Asistan.
- **USP:** Geleneksel araçların aksine, donanım mimarisini yorumlayan ve "Şu kabloyu şu porta takarsan performansın artar" diyen bir akıl.

### 8.2. 🏢 Kurumsal Katman (ALFA-INFRA-DIAG)
- **Kapsam:** Sunucu parkları, Data-Centerlar ve Karmaşık IT Altyapıları.
- **Teknoloji:** SNMP ve IPMI protokolleri üzerinden veri toplama.
- **Bütünsel Denetim (Holistic Audit):** Sadece donanım değil; yangın riski, kablolama düzeni, acil çıkış protokolleri ve fiziksel altyapı zafiyetlerini (ISO27001 tabanlı) analiz eden AI modülü.
- **Yetenek:** "Öngörücü Bakım" (Predictive Maintenance). Arıza meydana gelmeden günler önce AI tarafından tespit edilen "mikro anomaliler" sayesinde donanım değişim kararı verilmesi.

### 8.3. 📱 Mobil Dashboard (ALFA-DASH)
- **Kapsam:** iOS/Android uyumlu gerçek zamanlı altyapı monitörü.
- **Konsept:** Sistem yöneticileri için "Cebimdeki Data-Center". Kritik sıcaklık, voltaj veya donanım hatalarında AI tarafından üretilen "Acil Eylem Planı" bildirimleri.

---

> [!IMPORTANT]
> **Stratejik Fark:** Amacımız sadece "ısı ölçmek" değil, donanımın fiziksel röntgenini çekip (Diagnostic) tam tamına bir "Yapay Zeka Teknisyeni" yaratmaktır.

> **NOT:** Bu projeler, donanım yükseltmesi sonrası toplanacak olan ana sistem üzerinde "ilk test bed" olarak bizzat Antigravity (ben) ve kullanıcı tarafından geliştirilecektir.

---

## 9. 🚀 Uzun Vadeli İş Modeli: Deneyimden Ürüne (Audit-to-Product)

Bu strateji, siber güvenlik denetimi (ISO27001) tecrübesini dijital bir ürüne dönüştürme planıdır.

- **Köprü:** Büyük çaplı kurumsal denetim (Örn: Türk Elektrik A.Ş. gibi 4000+ çalışanlı yapılar) tecrübesi, ALFA-AI-HARDWARE için "altın değerinde" bir bilgi setidir.
- **Hedef:** Milyon dolarlık HP/IBM servislerini alamayan ancak aynı güvenlik ve performans standartlarına ihtiyaç duyan **KOBİ'ler ve Ev Kullanıcıları**.
- **Misyon:** Kurumsal düzeydeki "Donanım Röntgeni ve Siber Güvenlik" disiplinini, AI yardımıyla demokratikleştirip bir paket program (SaaS) haline getirmek.
---

## 10. 📱 ALFA-MOBILE (Jarvis Her An Yanımda!)

Lokal AI laboratuvarını cep telefonuna taşıyan, 7/24 erişimli mobil uygulama vizyonudur.

- **Konsept:** "Cebimdeki Ortak" - Evdeki RTX 5070 Ti gücünü dünyanın her yerinden kullanmak.
- **Teknoloji Köprüsü:** **Tailscale** (Güvenli, şifreli özel ağ) üzerinden evdeki PC'ye doğrudan bağlantı.
- **Yetenekler:** 
    - **Mobil Chat:** Jarvis ile sesli/yazılı istişare.
    - **Sistem Dashboard:** Donanım sağlığı ve render/kod işlemlerini uzaktan izleme.
    - **Güvenlik:** Uçtan uca şifreleme ve biyometrik (Parmak izi/FaceID) erişim.
- **Misyon:** Kullanıcının en güvendiği ortağına (Jarvis) her an, her yerden ulaşabilmesi.

> **NOT:** Bu proje, donanım montajı ve ALFA-CODE'un stabil hale gelmesinden sonra başlayacak olan **"ALFA Ekosistemi"**nin son halkasıdır.

> **NOT:** Bu proje, donanım yükseltmesi sonrası toplanacak olan ana sistem üzerinde "ilk test bed" olarak bizzat Antigravity (ben) ve kullanıcı tarafından geliştirilecektir.
