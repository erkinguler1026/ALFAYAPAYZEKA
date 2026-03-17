import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, Cpu, Zap, ChevronRight, Globe, Settings, 
  LifeBuoy, Shield, CheckCircle2, HelpCircle 
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("AI Web Studio Home Loaded - V1.0.5");
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bir hata oluştu!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Globe className="text-primary w-8 h-8" />,
      title: "AI Web Sitesi Hazırlama",
      desc: "İşinize özel kodlanmış, yapay zeka asistanları entegre edilmiş modern web arayüzleri.",
      tags: ["Tasarım", "Yazılım", "AI"]
    },
    {
      icon: <LifeBuoy className="text-accent w-8 h-8" />,
      title: "Teknik Destek & Servis",
      desc: "7/24 kesintisiz teknik destek, güvenlik güncellemeleri ve periyodik sunucu bakımları.",
      tags: ["Bakım", "Güvenlik", "7/24"]
    },
    {
      icon: <Bot className="text-secondary w-8 h-8" />,
      title: "AI Bot Entegrasyonu",
      desc: "Mevcut web sitelerinize ChatGPT veya Claude tabanlı akıllı müşteri asistanları.",
      tags: ["LLM", "Chatbot", "Support"]
    }
  ];

  const processSteps = [
    { title: "Analiz & Strateji", desc: "İş modelinizi inceliyor, size en uygun AI yol haritasını belirliyoruz." },
    { title: "Tasarım & Prototip", desc: "Mühendislik disipliniyle premium ve kullanıcı odaklı arayüzler çiziyoruz." },
    { title: "AI Geliştirme", desc: "Yapay zeka modellerini web sitenizin kalbine yerleştiriyoruz." },
    { title: "Test & Optimizasyon", desc: "Hız, güvenlik ve yapay zeka performansını en üst seviyeye çıkarıyoruz." },
    { title: "Yayına Alma & Satış", desc: "Sitenizi dünyanın en hızlı altyapılarıyla yayına alıyoruz." },
    { title: "Sürekli Bakım", desc: "Siz işinize odaklanın, teknik her şeyi biz yönetelim." }
  ];

  const faqs = [
    { q: "Neden Yapay Zeka destekli bir siteye ihtiyacım var?", a: "AI siteler, müşterilerinizle 7/24 etkileşime girer, verileri analiz eder ve satış süreçlerinizi otomatikleştirir." },
    { q: "Sitemin bakımını kim yapacak?", a: "Tüm teknik bakım, güncelleme ve güvenlik süreçlerini biz üstleniyoruz. Siz sadece işinizle ilgileniyorsunuz." },
    { q: "Fiyatlandırma nasıl belirleniyor?", a: "Projenin kapsamına, sayfa sayısına ve entegre edilecek AI özelliklerine göre esnek paketler sunuyoruz." },
    { q: "Mevcut siteme AI eklenebilir mi?", a: "Evet! Web sitenizin altyapısı ne olursa olsun, akıllı bot ve asistanlarımızı entegre edebiliyoruz." }
  ];

  return (
    <div className="px-6 relative overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center max-w-6xl mx-auto py-32 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-[11px] font-bold tracking-[0.4em] uppercase text-primary mb-12 shadow-lg shadow-primary/5"
        >
          Yapay Zeka & Web Mühendisliği
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-bold tracking-tighter leading-[1] mb-12 text-gradient"
        >
          YENİ NESİL <br /> AI SERVİSİ - Akıllı Web Sitesi
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl text-xl md:text-3xl text-white/60 leading-relaxed mb-16 font-light"
        >
          Geleceğin işletmeleri için akıllı web siteleri <span className="text-white font-medium">üretiyor</span>, 
          satışını <span className="text-white font-medium">yapıyor</span> ve 
          sözleşme süresince <span className="text-white font-medium">teknik servis</span> sağlıyoruz.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a href="#contact" className="px-14 py-6 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-white/10 active:scale-95">
            Sitenizi Bugün Kurun
          </a>
          <Link to="/pricing" className="px-14 py-6 glass-morphism rounded-full font-bold text-xl hover:bg-white/10 transition-colors">
            Servis Paketleri
          </Link>
        </motion.div>
      </section>

      {/* 2. core values / Mission */}
      <section className="max-w-7xl mx-auto py-40 border-b border-white/5">
         <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-gradient">Sadece Kod Değil, <br /> Bir Strateji Satıyoruz.</h2>
               <p className="text-white/40 text-lg leading-relaxed mb-10">
                  Bir web sitesinin sadece güzel görünmesi artık yetmiyor. Biz, işletmenize değer katan, müşterilerinizi tanıyan ve teknik dertleri üzerinizden alan akıllı sistemler kuruyoruz. 
               </p>
               <div className="space-y-4">
                  {[
                    "Kâr odaklı yapay zeka çözümleri",
                    "Kesintisiz teknik bakım ve güncellik",
                    "Minimum enerji, maksimum dijital verimlilik"
                  ].map((val, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-medium">
                      <CheckCircle2 className="text-primary" size={20} /> {val}
                    </div>
                  ))}
               </div>
            </div>
            <div className="relative">
               <div className="aspect-square glass-morphism rounded-[60px] p-12 flex items-center justify-center relative overflow-hidden group">
                  <Bot className="text-primary w-40 h-40 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
               </div>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/10 blur-[80px] rounded-full" />
            </div>
         </div>
      </section>

      {/* 3. Services Grid (Bento) */}
      <section id="services" className="max-w-7xl mx-auto py-40 border-b border-white/5">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Uçtan Uca Hizmet.</h2>
            <p className="text-white/40 text-lg">Hazırlıktan bakıma, ihtiyacınız olan her şey tek çatı altında.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className={`premium-card p-12 rounded-[50px] flex flex-col justify-between ${i === 0 ? 'md:col-span-2' : ''}`}
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">{service.title}</h3>
                <p className="text-white/40 text-lg leading-relaxed mb-10">
                  {service.desc}
                </p>
              </div>
              <div className="flex gap-3">
                {service.tags.map((tag, t) => (
                  <span key={t} className="text-[10px] uppercase tracking-widest font-bold text-white/20 border border-white/5 px-3 py-1 rounded-full bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Process Section (Longer Content) */}
      <section className="max-w-7xl mx-auto py-40 border-b border-white/5">
         <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/3">
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 sticky top-32">Nasıl <br /> Çalışıyoruz?</h2>
            </div>
            <div className="md:w-2/3 grid gap-12">
               {processSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                     <span className="text-6xl font-bold text-white/5 group-hover:text-primary/20 transition-colors leading-none">0{i+1}</span>
                     <div>
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-white/40 text-lg leading-relaxed">{step.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Interactive Stats / Tech Stack */}
      <section className="max-w-7xl mx-auto py-40 border-b border-white/5 text-center">
         <h2 className="text-3xl font-bold mb-20 text-white/30 uppercase tracking-[0.3em]">Güçlü Teknolojik Altyapı</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 opacity-40">
            <div className="flex flex-col items-center gap-4">
               <Cpu size={40} /> <span className="font-bold text-xs tracking-widest uppercase">Custom Models</span>
            </div>
            <div className="flex flex-col items-center gap-4">
               <Globe size={40} /> <span className="font-bold text-xs tracking-widest uppercase">Edge Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-4">
               <Zap size={40} /> <span className="font-bold text-xs tracking-widest uppercase">Lightning Speed</span>
            </div>
            <div className="flex flex-col items-center gap-4">
               <Shield className="w-10 h-10" /> <span className="font-bold text-xs tracking-widest uppercase">Safe & Secure</span>
            </div>
         </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="max-w-4xl mx-auto py-40 border-b border-white/5">
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">Sıkça Sorulanlar</h2>
         <div className="space-y-8">
            {faqs.map((faq, i) => (
               <div key={i} className="premium-card p-10 rounded-3xl">
                  <div className="flex gap-4 items-start">
                     <HelpCircle className="text-primary mt-1 flex-shrink-0" size={24} />
                     <div>
                        <h4 className="text-xl font-bold mb-4">{faq.q}</h4>
                        <p className="text-white/40 leading-relaxed">{faq.a}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 7. Final CTA & Contact */}
      <section id="contact" className="max-w-7xl mx-auto py-40">
        <div className="premium-card rounded-[60px] p-12 md:p-24 overflow-hidden relative group border-white/5">
          <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-1000" />
          
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Yeni Bir Başarı <br /> Hikayesi Yazalım.</h2>
              <p className="text-white/40 text-xl leading-relaxed mb-12">
                Hemen formu doldurun, 48 saat içerisinde projenizi teknik olarak projelendirip sizi arayalım.
              </p>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 py-4 border-b border-white/5">
                    <span className="text-primary font-bold text-2xl">01</span>
                    <span className="text-white/80 font-medium">Demo Tasarımı Hazırlıyoruz</span>
                 </div>
                 <div className="flex items-center gap-4 py-4 border-b border-white/5">
                    <span className="text-accent font-bold text-2xl">02</span>
                    <span className="text-white/80 font-medium">AI Entegrasyon Planını Çıkarıyoruz</span>
                 </div>
                 <div className="flex items-center gap-4 py-4">
                    <span className="text-secondary font-bold text-2xl">03</span>
                    <span className="text-white/80 font-medium">Fiyatlandırma & Servis Önerisi</span>
                 </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
              <input 
                type="text" 
                placeholder="İsim" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-xl focus:outline-none focus:border-primary transition-colors hover:bg-white/10"
              />
              <input 
                type="email" 
                placeholder="E-posta" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-xl focus:outline-none focus:border-primary transition-colors hover:bg-white/10"
              />
              <textarea 
                rows="5" 
                placeholder="Proje hedefiniz veya servis talebiniz..." 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-xl focus:outline-none focus:border-primary transition-colors hover:bg-white/10"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-7 rounded-3xl text-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'Hazırlanıyor...' : (
                  <>Hemen Teklif Al <ChevronRight size={28} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
