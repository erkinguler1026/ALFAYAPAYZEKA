import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Legal = () => {
  const { pathname } = useLocation();
  const isPrivacy = pathname.includes('privacy');
  const isTerms = pathname.includes('terms');
  const isKVKK = pathname.includes('kvkk');
  const isCookie = pathname.includes('cookie');

  useEffect(() => {
    let title = 'Alfa Yapay Zeka';
    if (isPrivacy) title = 'Gizlilik Politikası | Alfa Yapay Zeka';
    else if (isTerms) title = 'Kullanım Şartları | Alfa Yapay Zeka';
    else if (isKVKK) title = 'KVKK Aydınlatma Metni | Alfa Yapay Zeka';
    else if (isCookie) title = 'Çerez Politikası | Alfa Yapay Zeka';
    
    document.title = title;
    window.scrollTo(0, 0);
  }, [isPrivacy, isTerms, isKVKK, isCookie]);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism p-8 md:p-16 rounded-[40px] border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            {isPrivacy ? <Shield size={120} /> : <FileText size={120} />}
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
            {isPrivacy && 'GİZLİLİK POLİTİKASI'}
            {isTerms && 'KULLANIM ŞARTLARI'}
            {isKVKK && 'KVKK AYDINLATMA METNİ'}
            {isCookie && 'ÇEREZ POLİTİKASI'}
          </h1>

          <div className="space-y-10 text-white/70 leading-relaxed text-lg font-light">
            <div className="pb-6 border-b border-white/5">
              <p className="text-primary font-bold">Yürürlük Tarihi: 21.05.2025</p>
              <p>Web Sitesi: www.alfayapayzeka.com</p>
            </div>

            {isPrivacy && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Amaç ve Kapsam</h2>
                  <p>
                    Bu Gizlilik Politikası, www.alfayapayzeka.com (bundan sonra "Site" olarak anılacaktır), 
                    ziyaretçilerine Zırhlı Web Sistemleri, Hacker Kalkanı, Teknik Sigorta ve Yapay Zeka Destekli 
                    Dijital Çözümler hakkında bilgi sunan bir platformdur. Bu Gizlilik Politikası, Site'yi kullanan 
                    ziyaretçilerin kişisel verilerinin nasıl toplandığını, işlendiğini ve korunduğunu açıklar.
                  </p>
                  <p className="mt-4">
                    Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Genel Veri Koruma 
                    Tüzüğü (GDPR) gibi ilgili mevzuat hükümlerine uygun olarak hazırlanmıştır.
                  </p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. Toplanan Kişisel Veriler</h2>
                  <p>Sitemizi ziyaret ettiğinizde sizden herhangi bir kişisel veri talep edilmez. Ancak iletişim veya Web-Risk formları aracılığıyla bizimle iletişime geçtiğinizde aşağıdaki bilgiler talep edilir:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Ad ve Soyad / Şirket Bilgisi</li>
                    <li>E-posta Adresi</li>
                    <li>Telefon Numarası</li>
                    <li>Web Sitesi URL (Analiz talepleri için)</li>
                    <li>Mesaj İçeriği</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
                  <p>Toplanan kişisel veriler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Soru ve taleplerinizi (Web-Risk Analizi vb.) değerlendirmek ve yanıtlamak</li>
                    <li>Size teknik servis ve destek süreçlerinde geri dönüş sağlamak</li>
                    <li>Verileriniz üçüncü kişilerle kesinlikle paylaşılmaz ve pazarlama amacıyla satılmaz</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">4. Veri Güvenliği</h2>
                  <p>Dijital varlıklarınızın güvenliği Alfa Yapay Zeka'nın önceliğidir:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Sunucularımız 256-bit SSL sertifikası ve kurumsal WAF (Web Application Firewall) ile korunmaktadır.</li>
                    <li>Verilere yalnızca yetkili teknik personel erişebilir.</li>
                    <li>İletişim verileri sunucuda kalıcı bir veri tabanında tutulmaz, doğrudan güvenli e-posta protokolü ile iletilir.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">5. Çerez (Cookie) Kullanımı</h2>
                  <p>Sitemiz kullanıcıları izlemeye veya reklam hedeflemeye yönelik üçüncü taraf "takip çerezleri" kullanmaz. Sadece oturumun stabil çalışması için gerekli teknik çerezler kullanılır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">6. Üçüncü Taraf Bağlantılar</h2>
                  <p>Site üzerinden referanslarımıza veya sosyal medya hesaplarımıza yönlendirme linkleri verilebilir. Bu dış sitelerin gizlilik politikalarından Alfa Yapay Zeka sorumlu değildir.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">7. Haklarınız (KVKK)</h2>
                  <p>KVKK 11. maddesi uyarınca veri işlenip işlenmediğini öğrenme, yanlış işlenmişse düzeltme, verilerin silinmesini talep etme ve kanuna aykırı işlem nedeniyle zararın giderilmesini talep etme haklarınız saklıdır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">8. Politika Güncellemeleri</h2>
                  <p>Bu politika teknolojik gelişmelere ve mevzuat değişikliklerine göre güncellenebilir. Güncellemeler yayınlandığı tarihten itibaren geçerli olur.</p>
                </section>
              </>
            )}

            {isTerms && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Genel Bilgilendirme</h2>
                  <p>
                    www.alfayapayzeka.com web sitesi, ziyaretçilerine sunulan Zırhlı Web Üretimi, SEO, Teknik Sigorta ve Siber Güvenlik faaliyetleri hakkında bilgilendirme amacıyla hazırlanmıştır. 
                    Sitede yer alan içerikler bilgilendirme mahiyetindedir.
                  </p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. Hizmet Tanımı</h2>
                  <p>Alfa Yapay Zeka; endüstriyel standartlarda güvenli web altyapıları, yapay zeka entegrasyonları ve siber risk raporlaması sunan bir teknoloji ajansıdır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Kişisel Verilerin Korunması</h2>
                  <p>Formlar aracılığıyla ilettiğiniz bilgiler KVKK ve GDPR hükümlerine uygun şekilde, sadece talebinize yanıt vermek amacıyla işlenir. Detaylar için Gizlilik Politikamıza bakınız.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">4. Veri Güvenliği</h2>
                  <p>İletilen siber risk analizleri ve operasyonel veriler kurumsal gizlilik standartlarında korunur ve asla yetkisiz erişime açılmaz.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">5. Sorumluluk Reddi</h2>
                  <p>Site üzerindeki bilgiler dönemsel olarak güncellenir. İçeriklerin mutlak güncelliği veya eksiksizliği konusunda herhangi bir resmi taahhüt sunulmamaktadır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">6. Kullanıcı Yükümlülükleri</h2>
                  <p>Siteyi yasalara aykırı (spam, hack denemesi vb.) amaçlarla kullanamazsınız. Formlarda doğru bilgi sağlamak kullanıcının sorumluluğundadır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">7. Hizmet Sınırlaması</h2>
                  <p>Site kesintisiz erişimi garanti etmez. Teknik bakım veya mucbir sebeplerden doğan kısa süreli kesintilerden ajansımız sorumlu tutulamaz.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">8. Fikri Mülkiyet Hakları</h2>
                  <p>Sitede yer alan tüm tasarım, kod yapısı (Hacker Kalkanı vb. mimariler), metinler ve logolar Alfa Yapay Zeka'ya aittir. İzinsiz kopyalanamaz.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">9. Uygulanacak Hukuk</h2>
                  <p>Bu metin Türkiye Cumhuriyeti yasalarına tabidir. Herhangi bir uyuşmazlık durumunda Bursa Mahkemeleri ve İcra Daireleri yetkilidir.</p>
                </section>
              </>
            )}

            {isKVKK && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Veri Sorumlusu</h2>
                  <p>6698 sayılı KVKK uyarınca kişisel verileriniz veri sorumlusu Alfa Yapay Zeka tarafından kanuna uygun şekilde işlenmektedir.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. İşleme Amaçları</h2>
                  <p>Talep edilen veriler; analiz raporlarının hazırlanması, satış sonrası teknik desteğin sunulması ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenir.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Aktarılan Taraflar</h2>
                  <p>Kişisel verileriniz, yasal zorunluluklar dışında hiçbir kurum veya üçüncü şahısla paylaşılmaz. Veriler bulut tabanlı yüksek güvenlikli sunucularımızda saklanır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">4. Veri Toplama Yöntemi</h2>
                  <p>Verileriniz, sitemizdeki dijital formlar (İletişim, Web-Risk talebi) ve e-posta yazışmaları yoluyla elektronik ortamda toplanmaktadır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">5. Veri Sahibi Hakları (Madde 11)</h2>
                  <p>Verilerinizin silinmesini isteme, işlenip işlenmediğini öğrenme ve düzeltme talep etme haklarınızı kullanmak için info@alfayapayzeka.com adresine başvurabilirsiniz.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">6. Veri Güvenliği</h2>
                  <p>ISO/IEC 27001 standartlarına uyumlu siber güvenlik önlemleri ile verilerinizin gizliliği ve bütünlüğü en üst seviyede korunmaktadır.</p>
                </section>
              </>
            )}

            {isCookie && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Çerezler Nedir?</h2>
                  <p>Çerezler, ziyaret ettiğiniz siteler tarafından tarayıcınıza bırakılan küçük veri dosyalarıdır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. Çerez Türleri</h2>
                  <p>Sitemizde sadece "Zorunlu Çerezler" (Sistemin güvenliği ve hızı için gerekli olanlar) kullanılmaktadır. Reklam veya pazarlama odaklı çerez kullanılmaz.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Kullanım Amacımız</h2>
                  <p>Kullanıcı oturumunun güvenliğinin sağlanması, siber saldırıların tespiti ve sayfa yüklenme performansının optimize edilmesi temel amaçlarımızdır.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">4. Çerez Yönetimi</h2>
                  <p>Tarayıcı ayarlarınızdan çerezleri tamamen engelleyebilir veya silebilirsiniz. Ancak bu durum sitenin bazı fonksiyonlarının çalışmasını etkileyebilir.</p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">5. Veri Güvenliği</h2>
                  <p>Kullanılan teknik çerezler kişisel kimlik bilgilerini içermez ve üçüncü taraflara veri aktarımı yapmaz.</p>
                </section>
              </>
            )}

            <section className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm">
                Sorularınız için: <span className="text-white font-bold">info@alfayapayzeka.com</span>
              </p>
              <Link to="/contact" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-2 text-sm font-bold">
                İletişim Formu <ChevronRight size={16} className="text-primary" />
              </Link>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
