import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';

/**
 * Portfolio — Portfolyo Sayfası Bileşeni
 *
 * Ajansın önceki çalışmalarını sergileyen vitrin sayfası.
 *
 * Veri yapısı:
 *   `projects` dizisi içindeki her nesne şu alanları taşır:
 *     - title : Proje adı
 *     - tag   : Kategori etiketi (Industrial AI, Business SaaS vb.)
 *     - color : Tailwind gradient sınıfları (hover'da arka plana uygulanır)
 *     - desc  : Kısa açıklama cümlesi
 *
 * Animasyonlar:
 *   - Framer Motion ile her kart sırayla (delay: i * 0.1s) aşağıdan yukarı fade-in yapar.
 *   - Hover'da gradient arka plan `opacity-0 → opacity-10` ile açılır.
 *   - ExternalLink ikonu hover'da `rotate-12` + primary renk ile belirginleşir.
 *
 * NOT: Proje detay sayfaları henüz geliştirilmedi. İleride her karta link eklenecek.
 */
const Portfolio = () => {
  const projects = [
    { title: "AI-FMEA Portal", tag: "Industrial AI", color: "from-blue-600 to-cyan-500", desc: "Mühendislik standartlarına tam uyumlu, yapay zeka destekli süreç analiz platformu." },
    { title: "SWOT Analysis Pro", tag: "Business SaaS", color: "from-indigo-600 to-purple-500", desc: "İşletmeler için anlık verilerle desteklenen akıllı strateji yönetim aracı." },
    { title: "ISO9001-Auditor Beta", tag: "Compliance Tech", color: "from-green-500 to-emerald-400", desc: "Denetçiler için otonom raporlama ve risk değerlendirme paneli." },
    { title: "Smart Dashboard UI", tag: "Premium Dashboard", color: "from-orange-500 to-red-500", desc: "Gerçek zamanlı animasyonlu ve glassmorphism temalı premium yönetim ekranları." }
  ];

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gradient"
        >
          Seçkin İşlerimiz.
        </motion.h1>
        <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
          Teknik mükemmellik ve estetiğin buluştuğu noktada, işinizi dijital bir sanat eserine dönüştürüyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="premium-card rounded-[40px] p-10 h-[400px] flex flex-col justify-end group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
            
            <div className="relative z-10">
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4 block">{project.tag}</span>
              <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-white/40 text-sm mb-8 max-w-sm leading-relaxed">{project.desc}</p>
              
              <button className="flex items-center gap-2 text-white font-bold hover:gap-3 transition-all group/btn">
                Detayları İncele <ChevronRight size={20} className="text-primary" />
              </button>
            </div>
            
            <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
              <ExternalLink size={32} className="text-white/20 group-hover:text-primary" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
