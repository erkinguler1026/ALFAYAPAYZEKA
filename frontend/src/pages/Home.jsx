import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ChevronRight, Globe, CheckCircle2, 
  Rocket, Wrench, BarChart3, Headphones,
  Activity, Cpu, Lock, ShieldCheck, ShieldAlert
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/contact`, formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bir hata oluştu!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Rocket className="text-white w-10 h-10" />,
      title: "Işık Hızında Çalışan Web Sitesi",
      desc: "Google'ın sevdiği, anında açılan ve müşterinizi bekletmeyen modern altyapı.",
      outcome: "YÜKSEK SEO SIRALAMASI"
    },
    {
      icon: <Headphones className="text-white w-10 h-10" />,
      title: "7/24 Akıllı Asistan",
      desc: "Siz uyurken müşterilerinizin sorularını yanıtlayan, randevu alan akıllı yapay zeka.",
      outcome: "KESİNTİSİZ MÜŞTERİ İLİŞKİSİ"
    },
    {
      icon: <Wrench className="text-white w-10 h-10" />,
      title: "Bizden, Full Servis",
      desc: "Bakım, güvenlik, güncelleme... Siz işinizle ilgilenin, teknik dertleri biz çözelim.",
      outcome: "SIFIR TEKNİK SORUN"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-primary/30 overflow-x-hidden">
      <div className="bg-mesh" />
      
      {/* 1. Hero Section - Elegant */}
      <section className="relative pt-48 pb-20 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[12px] font-bold tracking-[0.3em] uppercase text-white/50 mb-10 inline-block"
          >
            <Zap size={12} className="inline-block mr-2 text-primary" /> ALFA AI SİSTEM STRATEJİMİZ
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-10 text-white"
          >
            Web Siteniz Sizin <br /> 
            İçin <span className="text-gradient">Çalışsın</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-white/50 leading-relaxed mb-16 font-light"
          >
            Yapay zeka destekli akıllı web siteleriyle müşteri kazanın, satışlarınızı otomatikleştirin ve işinizi büyütün. <span className="text-white/70 italic">Biz sadece site tasarlamıyoruz; sizin yerinize 7/24 satış yapan akıllı sistemler kuruyoruz.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-20 text-[14px] uppercase tracking-[0.2em] font-bold text-white/60 group cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            <ShieldCheck size={16} /> 100% TEKNİK SERVİS GARANTİSİ
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#contact" className="px-12 py-6 bg-transparent border border-white/10 text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all">
              Ücretsiz Strateji Analizi Al
            </a>
            <Link to="/pricing" className="px-12 py-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors">
              Sistemleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Feature Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { id: "01", icon: <Globe size={24} />, title: "Ziyaretçi Çekin", desc: "SEO ve yapay zeka destekli içeriklerle hedef kitlenize anında ulaşın." },
            { id: "02", icon: <Rocket size={24} />, title: "Müşteriye Dönüştürün", desc: "Kusursuz kullanıcı deneyimi ile ziyaretçileri sadık müşterilere çevirin." },
            { id: "03", icon: <Zap size={24} />, title: "Otomatikleştirin", desc: "Tüm satış ve iletişim süreçlerinizi 7/24 çalışan sistemlere devredin." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-6 group">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-white/5 group-hover:text-primary/20 transition-colors">{item.id}</span>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-primary">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Benefit Cards */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-12 rounded-[40px] hover:border-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-white/40 text-lg mb-8 leading-relaxed">{benefit.desc}</p>
              <div className="flex items-center gap-2 text-white/20 font-bold text-[10px] tracking-widest uppercase">
                <CheckCircle2 size={14} /> {benefit.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Layered System */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">3 Katmanlı Sistem Gücü.</h2>
          <p className="text-white/40 text-xl font-light">Sadece site yapıp bırakmıyoruz; işinizi büyüten yaşayan bir ekosistem kuruyoruz.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { layer: "TEK SEFERLİK", title: "1. Kurulum (Start)", desc: "Web mimarisi, AI entegrasyonu ve temel SEO altyapısının 2-12 gün içinde sıfırdan inşası." },
            { layer: "ZORUNLU SERVİS", title: "2. Yönetim (Manage)", desc: "12 ay boyunca hosting, güvenlik, teknik sigorta ve yapay zeka sağlığı takibi.", active: true },
            { layer: "STRATEJİK KATMAN", title: "3. Büyüme (Grow)", desc: "Google Ads, AI Lead Gen ve dönüşüm optimizasyonu ile kârınızı katlayan stratejik destek." }
          ].map((item, i) => (
            <div key={i} className={`p-10 rounded-[30px] border transition-all duration-300 ${item.active ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5'}`}>
              <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase block mb-6">{item.layer}</span>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Process Roadmap */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Sisteminiz Nasıl Doğuyor?</h2>
          <p className="text-white/40 text-xl font-light">Paranızı ve vaktinizi boşa harcamıyoruz; her adımı planlanmış bir mühendislik süreci işletiyoruz.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {[
            { id: "DAY 01", icon: <BarChart3 className="mx-auto mb-6 text-primary" size={32} />, title: "Analiz & Plan", desc: "İş modelinizi ve rakiplerinizi analiz edip AI stratejinizi belirliyoruz." },
            { id: "DAY 03", icon: <Cpu className="mx-auto mb-6 text-primary" size={32} />, title: "Mühendislik", desc: "Zırhlı kod yapısı ve AI modüllerini projenize entegre ediyoruz." },
            { id: "DAY 07", icon: <ShieldCheck className="mx-auto mb-6 text-primary" size={32} />, title: "Test & Kalite", desc: "Lighthouse performans ve siber güvenlik taramalarını yapıyoruz." },
            { id: "DAY 10", icon: <Rocket className="mx-auto mb-6 text-primary" size={32} />, title: "Lansman & Büyüme", desc: "Sistemi yayına alıp 7/24 satış yapacak şekilde devreye alıyoruz." }
          ].map((item, i) => (
            <div key={i}>
              <div className="mb-4">{item.icon}</div>
              <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">{item.id}</span>
              <h4 className="text-xl font-bold mt-2 mb-4">{item.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Philosophy Section */}
      <section className="max-w-5xl mx-auto py-32 px-6 text-center">
        <span className="text-[11px] font-bold tracking-[0.4em] text-white/20 uppercase block mb-12 underline decoration-primary underline-offset-8">NEDEN ALFA AI STUDİO?</span>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight italic text-white/80">
          "Biz sadece kod yazmıyoruz; işinizi dijital bir satış makinesine dönüştüren akıllı bir mimari inşa ediyoruz."
        </h2>
      </section>

      {/* 7. Security Header */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="px-5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest uppercase text-white/40 mb-8 inline-block">
            <ShieldAlert size={12} className="inline-block mr-2 text-primary" /> DİJİTAL ZIRH & GÜVENLİK
          </span>
          <h2 className="text-5xl md:text-8xl font-black mb-6 italic">İşiniz Zırhlı Kodlarla Güvende.</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Sitenizi sadece tasarlamıyoruz; siber saldırılara, hacking girişimlerine ve veri sızıntılarına karşı askeri düzeyde koruyoruz.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Lock size={40} />, title: "Zırhlı Kod Yapısı", desc: "Hacking ve siber saldırılara karşı askeri düzeyde koruma sağlayan akıllı mimari." },
            { icon: <ShieldCheck size={40} />, title: "Veri Kalkanı", desc: "Müşteri bilgileriniz ve ticari sırlarınız uçtan uca şifreli, 100% güvenli depolanır." },
            { icon: <Activity size={40} />, title: "Anlık Sızma Testi", desc: "Sistemimiz her gün yapay zeka tarafından 1.000+ senaryo ile hack girişimlerine karşı taranır." }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white/[0.02] border border-white/5 rounded-[40px] hover:bg-white/[0.04] transition-all group">
              <div className="mb-8 text-primary group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/40 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Risk Management (Symmetric) */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              İşiniz Sadece Kodla Değil, <br />
              Sigorta ile de Güvende.
            </h2>
            <p className="text-white/40 text-xl mb-12 font-light leading-relaxed">
              İş ortaklığı ağımız üzerinden, dijital varlıklarınızı siber risklere karşı <span className="text-white font-bold underline decoration-primary underline-offset-4">poliçe kapsamına</span> alıyoruz.
            </p>
            <div className="space-y-6">
              {[
                { title: "Siber Risk Poliçesi", desc: "Veri sızıntısı, hacking ve dijital itibar suikastlerine karşı mali teminat." },
                { title: "İş Durması Teminatı", desc: "Olası teknik aksaklıklardan kaynaklanan gelir kaybını koruma altına alan çözümler." },
                { title: "Acente Danışmanlığı", desc: "Anlaşmalı acentelerimiz aracılığıyla projenize en uygun poliçenin hazırlanması." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-white/30 text-sm italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="symmetric-frame bg-white/[0.02] border border-white/5 rounded-[60px] p-16 text-center relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <ShieldCheck size={80} className="mx-auto mb-8 text-primary group-hover:scale-110 transition-transform duration-500" />
               <h3 className="text-3xl font-bold mb-4 leading-tight">ISO31000:2018 Risk Yönetim Sistemi Kapsamında & Güvence</h3>
               <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase font-mono tracking-widest">INSURANCE PARTNERSHIP</span>
               <div className="mt-12 pt-12 border-t border-white/5 text-[10px] font-bold text-white/20 tracking-widest italic uppercase font-mono">SİBER GÜVENCE PARTNERLİĞİ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Technical Service (Symmetric) */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Arabanızın Servisi Varsa, <br />
              Sitenizin de Olmalı.
            </h2>
            <p className="text-white/40 text-xl mb-12 font-light leading-relaxed">Biz, işletmenizin dijital motoru olan sitenize tam kapsamlı "Satış Sonrası Servis" sağlıyoruz.</p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Zap />, title: "Alfa Dakik", desc: "Küçük revizyonlar için 60 dakikada müdahale sözü." },
                { icon: <Activity />, title: "Teknik Sigorta", desc: "12 ay zorunlu teknik bakım ve siber kalkan." },
                { icon: <Wrench />, title: "Yedek Parça", desc: "Gelecekteki her yeni AI modülü için hazır şasi." },
                { icon: <Cpu />, title: "Ağır Bakım", desc: "Sitenizin kod tabanını her yıl en yeni teknolojiye güncelliyoruz." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-6 p-10 bg-white/5 border border-white/10 rounded-[40px] hover:border-primary/50 transition-all text-center items-center min-h-[420px] justify-center shadow-xl">
                   <div className="text-primary scale-150 mb-6">{item.icon}</div>
                   <h4 className="text-2xl font-bold">{item.title}</h4>
                   <p className="text-white/30 text-xs leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="symmetric-frame bg-white/[0.02] border border-white/5 rounded-[60px] p-16 text-center relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <Wrench size={80} className="mx-auto mb-8 text-primary group-hover:rotate-45 transition-transform duration-1000" />
               <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Tam Yetkili <br /> Teknik Servis</h3>
               <span className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase font-mono tracking-widest">ALFA AI STUDIO ASSURANCE</span>
               <div className="mt-12 pt-12 border-t border-white/5 text-[10px] font-bold text-white/20 tracking-widest italic uppercase font-mono">SERVIS GARANTISI SÖZLEŞMESİ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Pricing Section - Elegant Version (1.jpg) */}
      <section className="max-w-7xl mx-auto py-24 px-6 mb-24">
        <div className="bg-[#111] border border-white/5 rounded-[60px] p-20 md:p-24 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={120} strokeWidth={1} />
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Hemen Başlayalım mı?</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Sürpriz maliyetler yok. Teknik karmaşa yok. Sadece işinize odaklanan net servis paketleri.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 mb-16 items-center">
            <div className="text-center px-8 border-r border-white/10 last:border-0 h-full flex flex-col justify-center">
               <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase block mb-4">KURULUM BAŞLANGICI</span>
               <div className="flex items-baseline justify-center gap-2">
                 <span className="text-5xl md:text-6xl font-black text-white tracking-widest">6.999 ₺</span>
                 <span className="text-[12px] font-mono text-white/30 uppercase tracking-tighter">+KDV /tek</span>
               </div>
            </div>
            
            <div className="text-center px-8 border-r border-white/10 last:border-0 h-full flex flex-col justify-center">
               <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase block mb-4">YÖNETİM PAKETİ</span>
               <div className="flex items-baseline justify-center gap-2">
                 <span className="text-5xl md:text-6xl font-black text-white tracking-widest">499 ₺</span>
                 <span className="text-[12px] font-mono text-white/30 uppercase tracking-tighter">+KDV /ay</span>
               </div>
            </div>

            <div className="text-center px-8 flex flex-col justify-center h-full">
               <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase block mb-4">HİZMET TAAHHÜDÜ</span>
               <div className="text-4xl md:text-5xl font-black text-white mb-1">12 AY</div>
               <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-black">TEKNİK SİGORTA</span>
            </div>
          </div>

          <div className="text-center">
            <Link to="/pricing" className="inline-flex items-center gap-3 px-16 py-6 bg-white text-black font-black rounded-2xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl">
              Servis Paketlerini İncele <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Contact Section - Elegant Version (1.jpg) */}
      <section id="contact" className="max-w-7xl mx-auto py-24 px-6 mb-40">
        <div className="bg-[#111113] border border-white/5 rounded-[60px] p-16 md:p-24 relative overflow-hidden group shadow-2xl">
          <div className="absolute -left-40 -top-40 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-colors pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">Bize Bir Mesaj <br /> Bırakın.</h2>
              <p className="text-white/40 text-xl leading-relaxed mb-12 font-light max-w-xl">
                Projenizi veya ihtiyacınızı yazın, en geç 24 saat içinde sizi arayıp teknik çözümümüzü sunalım.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                  <Zap size={14} className="text-primary" /> Hız süreçlerinizde her zaman yanınızdayız
                </div>
              </div>
            </div>
            
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
              <input 
                type="text" 
                placeholder="İsim veya Firma Unvanı" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-white/10"
              />
              <input 
                type="email" 
                placeholder="E-posta Adresiniz" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-white/10"
              />
              <textarea 
                rows="5" 
                placeholder="Nasıl yardımcı olabiliriz?" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-xl focus:outline-none focus:border-primary transition-all resize-none placeholder:text-white/10"
              />
              <div className="text-center pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-black py-8 rounded-[30px] text-2xl hover:bg-white hover:text-black transition-all active:scale-[0.98] shadow-2xl"
                >
                  {isSubmitting ? 'GÖNDERİLİYOR...' : 'Teklif Almak İstiyorum'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
