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
    <div className="px-6 relative overflow-hidden bg-[#050505]">
      
      {/* 1. Hero Section - Extreme Focus */}
      <section className="min-h-[45vh] flex flex-col items-center justify-center text-center max-w-6xl mx-auto pt-12 pb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[12px] font-bold tracking-[0.3em] uppercase text-primary mb-10"
        >
          <Zap size={12} className="inline-block mr-2 animate-pulse" /> ALFA AI SİSTEM STRATEJİMİZ (V.1.3.0)
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-bold tracking-tight leading-[1.1] mb-10 text-white uppercase"
        >
          Web Siteniz Sizin <br /> 
          İçin <span className="text-gradient">Çalışsın</span><span className="inline-block ml-3 tracking-normal">.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl text-xl md:text-2xl text-white/50 leading-relaxed mb-16 font-light"
        >
          Yapay zeka destekli akıllı web siteleriyle müşteri kazanın, satışlarınızı otomatikleştirin ve işinizi büyütün. Biz sadece site tasarlamıyoruz; <span className="text-white font-medium">sizin yerinize 7/24 satış yapan akıllı sistemler kuruyoruz.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-10 text-white text-[16px] uppercase tracking-widest font-bold underline decoration-primary underline-offset-4"
        >
          <Shield size={14} className="text-primary" /> 100% Teknik Servis Garantisi
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a href="#contact" className="px-12 py-6 bg-primary text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-primary/20 active:scale-95">
            Ücretsiz Strateji Analizi Al
          </a>
          <Link to="/pricing" className="px-12 py-6 glass-morphism rounded-2xl font-bold text-xl hover:bg-white/5 transition-colors border border-white/10">
            Sistemleri İncele
          </Link>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto py-10 border-y border-white/5">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", icon: <Globe size={32} />, title: "Ziyaretçi Çekin", desc: "SEO ve yapay zeka destekli içeriklerle hedef kitlenize anında ulaşın." },
            { step: "02", icon: <Rocket size={32} />, title: "Müşteriye Dönüştürün", desc: "Kusursuz kullanıcı deneyimi ile ziyaretçileri sadık müşterilere çevirin." },
            { step: "03", icon: <Zap size={32} />, title: "Otomatikleştirin", desc: "Tüm satış ve iletişim süreçlerinizi 7/24 çalışan sistemlere devredin." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-6 p-8 group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 rounded-[30px] border border-transparent">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-white/10 group-hover:text-primary transition-colors">{item.step}</span>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-primary">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Outcomes (Bento Box style but minimal) */}
      <section className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* 4. Service Lifecycle (Sistem Yaşam Döngüsü) - NEW */}
      <section className="max-w-7xl mx-auto py-10 border-t border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">3 Katmanlı <span className="text-primary">Sistem Gücü.</span></h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">Sadece site yapıp bırakmıyoruz; işinizi büyüten yaşayan bir ekosistem kuruyoruz.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "1. Kurulum (Start)", 
              desc: "Web mimarisi, AI entegrasyonu ve temel SEO altyapısının 2-12 gün içinde sıfırdan inşası.",
              badge: "Tek Seferlik"
            },
            { 
              title: "2. Yönetim (Manage)", 
              desc: "12 ay boyunca hosting, güvenlik, teknik sigorta ve yapay zeka sağlığı takibi.",
              badge: "Zorunlu Servis",
              highlight: true
            },
            { 
              title: "3. Büyüme (Grow)", 
              desc: "Google Ads, AI Lead Gen ve dönüşüm optimizasyonu ile kârınızı katlayan stratejik destek.",
              badge: "Stratejik Katman"
            }
          ].map((layer, i) => (
            <div key={i} className={`p-10 rounded-[40px] border hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 ${layer.highlight ? 'border-primary/30 bg-primary/5 shadow-2xl shadow-primary/10' : 'border-white/5 bg-white/5'}`}>
              <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 ${layer.highlight ? 'bg-primary text-white' : 'bg-white/10 text-white/50'}`}>
                {layer.badge}
              </span>
              <h4 className="text-2xl font-bold mb-4 text-white">{layer.title}</h4>
              <p className="text-white/40 leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: Workflow / Success Timeline - SATAN SISTEM */}
      <section className="max-w-7xl mx-auto py-12 border-t border-white/5">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Sisteminiz <span className="text-primary">Nasıl Doğuyor?</span></h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto">Paranızı ve vaktinizi boşa harcamıyoruz; her adımı planlanmış bir mühendislik süreci işletiyoruz.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-px bg-white/10 -z-10" />
           
           {[
             { day: "Day 01", title: "Analiz & Plan", desc: "İş modelinizi ve rakiplerinizi analiz edip AI stratejinizi belirliyoruz.", icon: <BarChart3 size={24}/> },
             { day: "Day 03", title: "Mühendislik", desc: "Zırhlı kod yapısı ve AI modüllerini projenize entegre ediyoruz.", icon: <Cpu size={24}/> },
             { day: "Day 07", title: "Test & Kalite", desc: "Lighthouse performans ve siber güvenlik taramalarını yapıyoruz.", icon: <ShieldCheck size={24}/> },
             { day: "Day 10", title: "Lansman & Büyüme", desc: "Sistemi yayına alıp 7/24 satış yapacak şekilde devreye alıyoruz.", icon: <Rocket size={24}/> }
           ].map((step, i) => (
             <div key={i} className="p-8 text-center flex flex-col items-center group hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-6">
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">{step.day}</span>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 5. Trust Bridge / Philosophy - NEW TRANSITION */}
      <section className="max-w-5xl mx-auto py-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/50 to-transparent" />
        <h1 className="text-white text-lg uppercase tracking-[0.5em] font-black mb-6 mt-12 underline decoration-primary underline-offset-8">Neden Alfa AI Studio?</h1>
        <p className="text-3xl md:text-5xl font-light text-white leading-tight">
          "Biz sadece kod yazmıyoruz; işinizi <span className="text-primary font-medium">dijital bir satış makinesine</span> dönüştüren akıllı bir mimari inşa ediyoruz."
        </p>
      </section>

      {/* 5. Digital Safety & Security (Zırhlı Kod) - NEW SECTION */}
      <section className="max-w-7xl mx-auto py-12 border-t border-white/5 bg-[radial-gradient(circle_at_center,_rgba(0,102,255,0.03)_0%,_transparent_70%)]">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6 bg-white/5 w-fit mx-auto px-4 py-2 rounded-full border border-white/10 text-primary text-[10px] uppercase tracking-[0.3em] font-black"
          >
            <ShieldAlert size={12} className="animate-pulse" /> Dijital Zırh & Güvenlik
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            İşiniz <span className="text-white">Zırhlı Kodlarla</span> Güvende.
          </h2>
          <p className="max-w-3xl mx-auto text-white/40 text-xl font-light">
            Sitenizi sadece tasarlamıyoruz; siber saldırılara, hacking girişimlerine ve 
            veri sızıntılarına karşı askeri düzeyde koruyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Lock className="text-primary" size={40} />, 
              title: "Zırhlı Kod Yapısı", 
              desc: "Hacking ve siber saldırılara karşı askeri düzeyde koruma sağlayan akıllı mimari." 
            },
            { 
              icon: <ShieldCheck className="text-accent" size={40} />, 
              title: "Veri Kalkanı", 
              desc: "Müşteri bilgileriniz ve ticari sırlarınız uçtan uca şifreli, 100% güvenli depolanır." 
            },
            { 
              icon: <Activity className="text-secondary" size={40} />, 
              title: "Anlık Sızma Testi", 
              desc: "Sistemimiz her gün yapay zeka tarafından 1.000+ senaryo ile hack girişimlerine karşı taranır." 
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-10 rounded-[40px] border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col gap-6"
            >
              <div className="p-4 bg-white/5 w-fit rounded-2xl border border-white/10 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-white/40 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Digital Insurance & Assurance - NEW SECTION */}
      <section className="max-w-7xl mx-auto py-12 border-t border-white/5 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
            >
              İşiniz Sadece Kodla Değil, <br />
              <span className="text-primary">Sigorta ile de</span> Güvende.
            </motion.h2>
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

          <div className="lg:w-1/2 flex justify-center lg:justify-end">
             <div className="w-[500px] h-[500px] flex flex-col items-center justify-center p-16 glass-morphism rounded-[60px] border border-white/10 text-center relative group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-500 flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <ShieldCheck className="w-24 h-24 text-primary mx-auto mb-8 hover:scale-110 hover:text-purple-400 transition-all duration-500 cursor-pointer" />
                <h3 className="text-3xl font-bold mb-4">ISO31000:2018 Risk Yönetim Sistemi Kapsamında  <br /> & Güvence</h3>
                <p className="text-white/30 text-xs uppercase tracking-widest font-black">Insurance Partnership</p>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-4 opacity-30 grayscale contrast-125">
                   {/* Placeholder for insurance branding */}
                   <span className="font-black italic text-xs uppercase tracking-tighter">Siber Güvence Partnerliği</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. After-Sales / Technical Service (The "Garage" Analogy) */}
      <section className="max-w-7xl mx-auto py-12 border-t border-white/5">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Arabanızın Servisi <br />
              Varsa, <span className="text-primary">Sitenizin de Olmalı.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12">
              Bir web sitesi kurup kaçmıyoruz. Biz, işletmenizin dijital motoru olan sitenize
              tam kapsamlı "Satış Sonrası Servis" (After-Sales) sağlıyoruz.
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6 p-14 bg-white/5 rounded-[50px] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-2 transition-all duration-300 min-h-[380px] justify-center">
                <Zap className="text-primary" size={32} />
                <h4 className="text-xl font-bold">Alfa Dakik</h4>
                <p className="text-white/40 text-sm">Hızda Sınır Yok: Küçük içerik ve tasarım revizyonları için <span className="text-white font-bold text-xs uppercase">60 Dakika</span> müdahale sözü.</p>
              </div>
              <div className="flex flex-col gap-6 p-14 bg-white/5 rounded-[50px] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-2 transition-all duration-300 min-h-[380px] justify-center">
                <Activity className="text-accent" size={32} />
                <h4 className="text-xl font-bold">Teknik Sigorta</h4>
                <p className="text-white/40 text-sm text-[11px]">12 ay zorunlu bakım; siber risklere karşı <span className="text-white font-bold text-xs uppercase tracking-tighter">İsteğe Bağlı Poliçe</span> ve kesintisiz çalışma kalkanı.</p>
              </div>
              <div className="flex flex-col gap-6 p-14 bg-white/5 rounded-[50px] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-2 transition-all duration-300 min-h-[380px] justify-center">
                <Wrench className="text-secondary" size={32} />
                <h4 className="text-xl font-bold">Yedek Parça</h4>
                <p className="text-white/40 text-sm">Modüler Mimarisi; Gelecekte eklemek istediğiniz her yeni 'AI modülü' için şasiniz bugünden hazır.</p>
              </div>
              <div className="flex flex-col gap-6 p-14 bg-white/5 rounded-[50px] border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-2 transition-all duration-300 min-h-[380px] justify-center">
                <Cpu className="text-white" size={32} />
                <h4 className="text-xl font-bold">Ağır Bakım</h4>
                <p className="text-white/40 text-sm">Yıllık Rektifiye; Sitenizin motorunu ve kod tabanını her yıl en yeni teknolojiye (GPT-5 vb.) güncelliyoruz.</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
             <div className="w-[500px] h-[500px] flex flex-col items-center justify-center p-16 glass-morphism rounded-[60px] border border-white/10 text-center relative group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-500 flex-shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <Wrench className="w-32 h-32 text-primary mb-8 group-hover:rotate-45 transition-transform duration-700" />
                <h3 className="text-3xl font-bold mb-4">Tam Yetkili <br /> Teknik Servis</h3>
                <p className="text-white/30 uppercase tracking-widest font-bold text-xs">Alfa AI Studio Assurance</p>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-4 opacity-30 grayscale contrast-125">
                   {/* Placeholder for insurance branding */}
                   <span className="font-black italic text-xs uppercase tracking-tighter">Siber Güvence Partnerliği</span>
                </div>
             </div>
             {/* Decorative glow */}
             <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-1000" />
          </div>
        </div>
      </section>

      {/* 5. Pricing Preview Stripe (Direct Answer) */}
      <section className="max-w-5xl mx-auto py-6 text-center">
        <div className="glass-morphism p-12 md:p-20 rounded-[60px] border border-primary/30 bg-primary/5 relative overflow-hidden group hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] transition-all duration-500">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={120} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 normal text-white tracking-tighter">Hemen Başlayalım mı?</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">Sürpriz maliyetler yok. Teknik karmaşa yok. Sadece işinize odaklanan net servis paketleri.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <span className="block text-white text-[16px] uppercase tracking-widest font-bold mb-2 font-mono">Kurulum Başlangıcı</span>
              <p className="text-5xl font-black text-white tracking-tighter flex items-baseline justify-center gap-1">
                6.999 ₺ 
                <span className="text-[18px] text-white/80 font-black ml-1">+KDV</span> 
                <span className="text-white font-bold text-lg">/tek</span>
              </p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden md:block" />
            <div className="text-center">
              <span className="block text-white text-[16px] uppercase tracking-widest font-bold mb-2 font-mono">Yönetim Paketi</span>
              <p className="text-5xl font-black text-primary tracking-tighter flex items-baseline justify-center gap-1">
                499 ₺ 
                <span className="text-[18px] text-primary/80 font-black ml-1">+KDV</span> 
                <span className="text-white font-bold text-lg">/ay</span>
              </p>
            </div>
            <div className="w-px h-16 bg-white/10 hidden md:block" />
            <div className="text-center">
              <span className="block text-white text-[16px] uppercase tracking-widest font-bold mb-2 font-mono">Hizmet Taahhüdü</span>
              <p className="text-3xl font-bold text-white uppercase tracking-tighter">12 Ay <br /> <span className="text-white text-[16px] font-bold">Teknik Sigorta</span></p>
            </div>
          </div>
          <Link to="/pricing" className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-bold rounded-2xl hover:bg-primary hover:text-white transition-all">
            Servis Paketlerini İncele <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* 5. Direct Contact Form */}
      <section id="contact" className="max-w-7xl mx-auto py-40">
        <div className="premium-card rounded-[60px] p-12 md:p-24 overflow-hidden relative border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] hover:-translate-y-2 transition-all duration-500">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">Bize Bir Mesaj <br /> Bırakın.</h2>
              <p className="text-white/40 text-xl leading-relaxed mb-12">
                Projenizi veya ihtiyacınızı yazın, en geç 24 saat içinde sizi arayıp teknik çözümümüzü sunalım.
              </p>
              <div className="flex items-center gap-6 text-white/50">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Zap size={16} className="text-yellow-400" /> Hızlı Dönüş
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <Shield size={16} className="text-primary" /> Güvenli İletişim
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
      </section>

    </div>
  );
};

export default Home;
