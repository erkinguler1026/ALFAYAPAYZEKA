import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, ChevronRight, Globe, Shield, CheckCircle2, 
  Rocket, Wrench, Settings, BarChart3, Headphones,
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
      icon: <Rocket className="text-primary w-10 h-10" />,
      title: "Işık Hızında Çalışan Web Sitesi",
      desc: "Google'ın sevdiği, anında açılan ve müşterinizi bekletmeyen modern altyapı.",
      outcome: "Yüksek SEO Sıralaması"
    },
    {
      icon: <Headphones className="text-accent w-10 h-10" />,
      title: "7/24 Akıllı Asistan",
      desc: "Siz uyurken müşterilerinizin sorularını yanıtlayan, randevu alan akıllı yapay zeka.",
      outcome: "Kesintisiz Müşteri İlişkisi"
    },
    {
      icon: <Wrench className="text-secondary w-10 h-10" />,
      title: "Bizden, Full Servis",
      desc: "Bakım, güvenlik, güncelleme... Siz işinizle ilgilenin, teknik dertleri biz çözelim.",
      outcome: "Sıfır Teknik Sorun"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-white selection:bg-primary/30 overflow-x-hidden pt-10">
      {/* Nuclear Deployment Marker */}
      <div 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#dc2626', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '10px 0', textAlign: 'center', zIndex: 9999, textTransform: 'uppercase', letterSpacing: '0.5em' }}
      >
        DEPLOYMENT SYNC Status: V.1.5.0 - ACTIVE ✅
      </div>

      <div className="bg-mesh" />
      
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-10 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[12px] font-bold tracking-[0.3em] uppercase text-primary mb-10 inline-block"
          >
            <Zap size={12} className="inline-block mr-2 animate-pulse" /> ALFA AI SİSTEM STRATEJİMİZ (V.1.5.0)
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-bold tracking-tight leading-[1.1] mb-10 text-white uppercase"
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
            Yapay zeka destekli akıllı web siteleriyle müşteri kazanın, satışlarınızı otomatikleştirin ve işinizi büyütün.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#contact" className="px-12 py-6 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-primary/20">
              Ücretsiz Strateji Analizi Al
            </a>
            <Link to="/pricing" className="px-12 py-6 glass-morphism rounded-2xl font-bold text-xl hover:bg-white/5 transition-colors border border-white/10">
              Sistemleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6 border-y border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, i) => (
            <div key={i} className="premium-card p-12 rounded-[40px] border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:-translate-y-2 transition-all duration-300 group">
              <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl border border-white/10 group-hover:bg-primary/10 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-white/40 text-lg mb-8 leading-relaxed">{benefit.desc}</p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <CheckCircle2 size={16} /> {benefit.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Digital Safety & Risk Management Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              İşiniz Sadece Kodla Değil, <br />
              <span className="text-primary">Sigorta ile de</span> Güvende.
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12 max-w-2xl">
              İş ortaklığı ağımız üzerinden, dijital varlıklarınızı siber risklere karşı <span className="text-white font-bold underline decoration-primary underline-offset-4">poliçe kapsamına</span> alıyoruz.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Siber Risk Poliçesi", desc: "Veri sızıntısı, hacking ve dijital itibar suikastlerine karşı mali teminat." },
                { title: "İş Durması Teminatı", desc: "Olası teknik aksaklıklardan kaynaklanan gelir kaybını koruma altına alan çözümler." },
                { title: "Acente Danışmanlığı", desc: "Anlaşmalı acentelerimiz aracılığıyla projenize en uygun poliçenin hazırlanması." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                   <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                     <CheckCircle2 size={14} className="text-primary" />
                   </div>
                   <div>
                     <h4 className="text-lg font-bold text-white">{item.title}</h4>
                     <p className="text-white/40 text-sm">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
             <div 
               style={{ width: '550px', height: '550px' }}
               className="flex flex-col items-center justify-center p-16 glass-morphism rounded-[60px] border border-white/10 text-center relative group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-500 flex-shrink-0 overflow-hidden"
             >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-8 hover:scale-110 transition-all duration-500 cursor-pointer" />
                <h3 className="text-3xl font-bold mb-4">ISO31000:2018 Risk Yönetim Sistemi Kapsamında  <br /> & Güvence</h3>
                <p className="text-white/30 text-xs uppercase tracking-widest font-black">Insurance Partnership</p>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-4 opacity-30 grayscale contrast-125">
                   <span className="font-black italic text-xs uppercase tracking-tighter">Siber Güvence Partnerliği</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. After-Sales / Technical Service (The "Garage" Analogy) */}
      <section className="max-w-7xl mx-auto py-24 px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Arabanızın Servisi <br />
              Varsa, <span className="text-primary">Sitenizin de Olmalı.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12">
              Biz, işletmenizin dijital motoru olan sitenize tam kapsamlı "Satış Sonrası Servis" sağlıyoruz.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Zap className="text-primary" size={32} />, title: "Alfa Dakik", desc: "Küçük revizyonlar için 60 dakikada müdahale sözü." },
                { icon: <Activity className="text-accent" size={32} />, title: "Teknik Sigorta", desc: "12 ay zorunlu teknik bakım ve siber kalkan." },
                { icon: <Wrench className="text-secondary" size={32} />, title: "Yedek Parça", desc: "Gelecekteki her yeni AI modülü için hazır şasi." },
                { icon: <Cpu className="text-white" size={32} />, title: "Ağır Bakım", desc: "Sitenizin kod tabanını her yıl en yeni teknolojiye güncelliyoruz." }
              ].map((card, i) => (
                <div key={i} className="flex flex-col gap-8 p-16 bg-white/5 rounded-[60px] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:-translate-y-2 transition-all duration-300 min-h-[420px] justify-center text-center items-center">
                  {card.icon}
                  <h4 className="text-2xl font-bold">{card.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
             <div 
               style={{ width: '550px', height: '550px' }}
               className="flex flex-col items-center justify-center p-16 glass-morphism rounded-[60px] border border-white/10 text-center relative group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-500 flex-shrink-0 overflow-hidden"
             >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <Wrench className="w-32 h-32 text-primary mb-8 group-hover:rotate-45 transition-transform duration-700" />
                <h3 className="text-3xl font-bold mb-4">Tam Yetkili <br /> Teknik Servis</h3>
                <p className="text-white/30 uppercase tracking-widest font-bold text-xs">Alfa AI Studio Assurance</p>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-4 opacity-30 grayscale contrast-125">
                   <span className="font-black italic text-xs uppercase tracking-tighter">Siber Güvence Partnerliği</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Direct Contact Form */}
      <section id="contact" className="max-w-7xl mx-auto py-40 px-6">
        <div className="premium-card rounded-[60px] p-12 md:p-24 overflow-hidden relative border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:-translate-y-2 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">Bize Bir Mesaj <br /> Bırakın.</h2>
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                <input 
                  type="text" 
                  placeholder="İsim veya Firma Unvanı" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xl focus:outline-none focus:border-primary transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="E-posta Adresiniz" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xl focus:outline-none focus:border-primary transition-colors"
                />
                <textarea 
                  rows="4" 
                  placeholder="Nasıl yardımcı olabiliriz?" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-xl focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold py-6 rounded-2xl text-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Teklif Almak İstiyorum'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
