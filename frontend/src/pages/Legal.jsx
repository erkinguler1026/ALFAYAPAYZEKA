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
                {/* ... other sections for Privacy ... */}
              </>
            )}

            {isTerms && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Genel Bilgilendirme</h2>
                  <p>
                    Bu web sitesi, ziyaretçilerine sunulan Zırhlı Web Üretimi, SEO ve Meta Tag Optimizasyonu, 
                    Teknik Sigorta ve Siber Güvenlik faaliyetleri hakkında bilgilendirme amacıyla hazırlanmıştır. 
                    İçerikler herhangi bir ön ticari taahhüt içermemektedir.
                  </p>
                </section>
                {/* ... other sections for Terms ... */}
              </>
            )}

            {isKVKK && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Veri Sorumlusu</h2>
                  <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz; veri sorumlusu 
                    olarak Alfa Yapay Zeka tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                  </p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
                  <p>
                    Kişisel verileriniz, iş faaliyetlerinin yürütülmesi, müşteri ilişkileri yönetimi süreçlerinin 
                    yürütülmesi ve siber güvenlik hizmetlerimizin sunulması amaçlarıyla sınırlı olarak işlenmektedir.
                  </p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Aktarılan Taraflar</h2>
                  <p>
                    Kişisel verileriniz, yasal yükümlülükler haricinde üçüncü taraflarla kesinlikle paylaşılmaz. 
                    Verileriniz kendi sunucularımızda, SSL korumalı altyapıda güvenle saklanır.
                  </p>
                </section>
              </>
            )}

            {isCookie && (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Çerezler Nedir?</h2>
                  <p>
                    Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza 
                    veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
                  </p>
                </section>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. Kullanım Amacımız</h2>
                  <p>
                    Alfa Yapay Zeka olarak, sitemizde kullanıcıları takip eden veya reklam hedefleyen 
                    <strong> üçüncü taraf çerezleri kullanmamaktayız</strong>. Sadece sitenin istikrarlı 
                    çalışması için gerekli teknik oturum yönetimi yapılmaktadır.
                  </p>
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
