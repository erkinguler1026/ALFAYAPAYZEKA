import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Legal = () => {
  const { pathname } = useLocation();
  const isPrivacy = pathname.includes('privacy');

  useEffect(() => {
    document.title = isPrivacy ? 'Gizlilik Politikası | Alfa Yapay Zeka' : 'Kullanım Şartları | Alfa Yapay Zeka';
    window.scrollTo(0, 0);
  }, [isPrivacy]);

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
            {isPrivacy ? 'GİZLİLİK POLİTİKASI' : 'KULLANIM ŞARTLARI'}
          </h1>

          <div className="space-y-10 text-white/70 leading-relaxed text-lg font-light">
            <div className="pb-6 border-b border-white/5">
              <p className="text-primary font-bold">Yürürlük Tarihi: 21.05.2025</p>
              <p>Web Sitesi: www.alfayapayzeka.com</p>
            </div>

            {isPrivacy ? (
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
                  <p>
                    Sitemizi ziyaret ettiğinizde sizden herhangi bir kişisel veri talep edilmez. Ancak iletişim formu 
                    aracılığıyla bizimle iletişime geçtiğinizde aşağıdaki bilgiler talep edilir:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Ad ve Soyad</li>
                    <li>E-posta Adresi</li>
                    <li>Soru ve Mesaj İçeriği</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
                  <p>Toplanan kişisel veriler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Soru ve taleplerinizi değerlendirmek ve yanıtlamak</li>
                    <li>Size teknik servis ve destek için geri dönüş sağlamak</li>
                    <li>Siber güvenlik bildirimleri ve güncellemeler hakkında bilgilendirmek</li>
                  </ul>
                  <p className="mt-4 font-bold text-primary">
                    Bu bilgiler üçüncü kişilerle kesinlikle paylaşılmaz ve yalnızca yukarıdaki amaçlarla sınırlı olarak kullanılır.
                  </p>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">4. Veri Güvenliği</h2>
                  <p>Kişisel verilerinizin güvenliği bizim için önceliklidir:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Sunucumuz SSL sertifikası ile uçtan uca şifrelenmiştir.</li>
                    <li>Verilere yalnızca yetkili teknik ekip erişebilir.</li>
                    <li>Form verileri doğrudan e-posta ile iletilir, sunucuda kalıcı olarak depolanmaz.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">5. Çerez (Cookie) Kullanımı</h2>
                  <p>Sitemiz, kullanıcıyı izlemeye veya reklam hedeflemeye yönelik herhangi bir çerez kullanmamaktadır.</p>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">6. Haklarınız (KVKK & GDPR)</h2>
                  <p>
                    İlgili yasalar uyarınca, hangi verilerinizin işlendiğini öğrenme, düzeltme veya silme talep etme hakkınız 
                    bulunmaktadır. Bu haklarınızı kullanmak için <strong>info@alfayapayzeka.com</strong> adresinden bize ulaşabilirsiniz.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">1. Genel Bilgilendirme</h2>
                  <p>
                    Bu web sitesi, ziyaretçilerine sunulan Zırhlı Web Üretimi, SEO ve Meta Tag Optimizasyonu, 
                    Teknik Sigorta ve Siber Güvenlik faaliyetleri hakkında bilgilendirme amacıyla hazırlanmıştır. 
                    İçerikler herhangi bir ön ticari taahhüt içermemektedir.
                  </p>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">2. Hizmet Tanımı</h2>
                  <p>
                    Web sitesi teknik bilgilendirme amacı taşır. İletişim formu aracılığıyla iletilen bilgiler 
                    yalnızca kullanıcının sorusuna yanıt vermek amacıyla kullanılır.
                  </p>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">3. Fikri Mülkiyet</h2>
                  <p>
                    Sitede yer alan tüm metinler, görseller, kod yapıları ve tasarımlar Alfa Yapay Zeka'ya aittir. 
                    İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
                  </p>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">4. Sorumluluk Sınırlaması</h2>
                  <p>
                    Site, kesintisiz erişimi teknik nedenlerle garanti etmez. Form aracılığıyla iletilen sorulara 
                    en kısa sürede yanıt verilir, ancak kesin bir süre taahhüdü bulunmamaktadır.
                  </p>
                </section>

                <section>
                  <h2 className="text-white font-bold text-2xl mb-4">5. Uygulanacak Hukuk</h2>
                  <p>Bu metin Türkiye Cumhuriyeti mevzuatına tabidir. Uyuşmazlıklarda Bursa Mahkemeleri yetkilidir.</p>
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
