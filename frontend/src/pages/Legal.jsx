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

          <div className="space-y-8 text-white/60 leading-relaxed text-lg font-light">
            <section>
              <h2 className="text-white font-bold text-xl mb-4">1. Giriş</h2>
              <p>
                Alfa Yapay Zeka olarak, dijital varlıklarınızın güvenliği bizim önceliğimizdir. Bu metin, sunduğumuz hizmetlerin
                kapsamını ve verilerinizin korunmasına yönelik taahhütlerimizi içerir.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">2. Hizmet Kapsamı</h2>
              <p>
                Sunduğumuz tüm web sistemleri, "Hacker Kalkanı" ve "Teknik Garanti (Warranty)" paketleri ile korunmaktadır. 
                Sistemlerimizin siber saldırılara karşı dirençli olması için en güncel güvenlik protokolleri uygulanmaktadır.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold text-xl mb-4">3. Veri Güvenliği</h2>
              <p>
                Müşterilerimize ait veriler, endüstri standardı şifreleme yöntemleri ile korunur. Üçüncü taraflarla veri paylaşımı, 
                yalnızca yasal zorunluluklar çerçevesinde gerçekleştirilir.
              </p>
            </section>

            {/* Additional placeholders to make it look full */}
            <section className="pt-8 border-t border-white/5">
              <p className="text-sm">
                Detaylı bilgi ve özel sorularınız için lütfen <Link to="/contact" className="text-primary hover:underline inline-flex items-center gap-1">iletişim sayfamızı<ChevronRight size={14} /></Link> ziyaret edin.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
