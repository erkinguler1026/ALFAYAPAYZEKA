import { motion } from 'framer-motion';
import { Target, Lightbulb, TrendingUp, ShieldCheck, LifeBuoy, Zap } from 'lucide-react';

/**
 * About — Hakkımızda Sayfası Bileşeni
 *
 * Kurumun vizyon, misyon ve hizmet standartlarını anlatan tanıtım sayfası.
 * İçerisindeki bölümler:
 *   - Üst kısım : Sayfa başlığı ve açıklama yazısı (fade-in animasyonlu)
 *   - Alt kısım : 3 değer kartı (Hızlı Üretim / Kesintisiz Destek / Güvenli Bakım)
 *
 * Animasyonlar:
 *   - Framer Motion ile giriş sırasında opacity ve y ekseninde fade-in efekti.
 *   - Kartlarda ikon renkleri CSS değişkenleri (--primary, --secondary, --accent) kullanır.
 */
const About = () => {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-[80vh]">
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-8"
        >
          Vizyonumuz & Hizmet Standartlarımız
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-8xl font-bold tracking-tight mb-12 text-gradient"
        >
          DİJİTAL SERVİSİN <br /> YENİ STANDARTI.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 text-xl md:text-2xl leading-relaxed mb-20"
        >
          Alfa Yapay Zeka Stüdyosu olarak, sadece kod yazmıyoruz. 
          <span className="text-white"> Yapay zeka destekli web siteleri tasarlıyor, satışını gerçekleştiriyor ve teknik bakım hizmetlerini üstleniyoruz.</span> 
          İşletmenizi dijitalde yorulmayan, akıllı ve sürekli güncel kalan bir sisteme dönüştürüyoruz.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-white/5">
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Zap className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Hızlı Üretim</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Mühendislik disipliniyle AI hızını birleştirerek, profesyonel web sitelerinizi rekor sürede hazır hale getirip teslim ediyoruz.
          </p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
            <LifeBuoy className="text-secondary w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Kesintisiz Destek</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Satış sonrası 7/24 yanınızdayız. Teknik sorunlar, güncellemeler ve AI model geliştirmeleri için tam servis desteği başlıyoruz.
          </p>
        </div>
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
            <ShieldCheck className="text-accent w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Güvenli Bakım</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            Periyodik güvenlik taramaları ve performans bakımları ile web sisteminizin her zaman ilk günkü hızında kalmasını sağlıyoruz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
