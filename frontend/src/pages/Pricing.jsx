import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, LifeBuoy, ShieldCheck } from 'lucide-react';

const Pricing = () => {
  const [isTurkish, setIsTurkish] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Hızlı başlangıç yapmak isteyen küçük işletmeler için hazırlık ve kurulum.",
      price: isTurkish ? "4.999 ₺" : "$299",
      features: [
        "AI Destekli Web Sitesi Kurulumu",
        "Responsive Tasarım",
        "Temel SEO Altyapısı",
        "1 Ay Ücretsiz Teknik Destek",
        "Haftalık Yedekleme"
      ],
      cta: "Hemen Başlat",
      popular: false
    },
    {
      name: "Business",
      description: "Büyüyen firmalar için tam kapsamlı üretim ve servis paketi.",
      price: isTurkish ? "12.999 ₺" : "$899",
      features: [
        "5 Sayfaya Kadar AI Web Tasarımı",
        "Müşteri Destek AI Bot Entegrasyonu",
        "Gelişmiş Teknik Destek (7/24)",
        "Aylık Bakım & Güncelleme",
        "Performans Raporlama",
        "Sınırsız Teknik Revizyon"
      ],
      cta: "Servis Al",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Büyük ölçekli projeler ve özel yazılım servis planları.",
      price: "Özel Teklif",
      features: [
        "Kurumsal AI Ekosistemleri",
        "Özel Model Eğitimi & Entegrasyon",
        "SLA Garantili Teknik Servis",
        "Ömür Boyu Bakım Planı",
        "Yedekli Bulut Sunucu Yönetimi"
      ],
      cta: "Teklif Al",
      popular: false
    }
  ];

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
          >
            Servis & Bakım Paketleri
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto mb-10"
          >
            Yapay zeka sitelerinizi sadece hazırlamıyoruz; satış sonrası teknik destek ve periyodik bakımlarımızla hep yanınızdayız.
          </motion.p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isTurkish ? 'text-white' : 'text-white/40'}`}>Global ($)</span>
            <button 
              onClick={() => setIsTurkish(!isTurkish)}
              className="w-14 h-8 bg-white/10 rounded-full relative p-1 transition-colors hover:bg-white/20"
            >
              <div className={`w-6 h-6 bg-primary rounded-full transition-all duration-300 ${isTurkish ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm ${isTurkish ? 'text-white' : 'text-white/40'}`}>Türkiye (₺)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`pricing-card premium-card p-10 rounded-3xl flex flex-col ${plan.popular ? 'popular border-primary/50' : ''}`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-white/40 text-sm mb-6 leading-relaxed min-h-[48px]">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold">{plan.price}{isTurkish && plan.price !== "Özel Teklif" ? " +KDV" : ""}</span>
                {plan.price !== "Özel Teklif" && <span className="text-white/40 text-sm ml-2">/ proje başı</span>}
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-primary" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.popular 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-lx shadow-primary/20' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global Support info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-white/5 pt-12">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <LifeBuoy size={24} />
                </div>
                <div className="text-left">
                    <h4 className="font-bold">Anlık Teknik Servis</h4>
                    <p className="text-white/40 text-xs">Olası sorunlarda 1 saat içinde müdahale.</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <ShieldCheck size={24} />
                </div>
                <div className="text-left">
                    <h4 className="font-bold">Güvenli Altyapı</h4>
                    <p className="text-white/40 text-xs">ISO Kalite standartlarında veri güvenliği ve bakım.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
