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
      
      {/* 1. Hero Section - The Anchor of Elegance */}
      <section className="relative pt-56 pb-24 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-[12px] font-bold tracking-[0.4em] uppercase text-white/40 mb-12 inline-block"
          >
            <Zap size={14} className="inline-block mr-2 text-primary animate-pulse" /> ALFA AI SİSTEM STRATEJİMİZ
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-[140px] font-black tracking-tight leading-[0.95] mb-12 text-white uppercase italic"
          >
            Siz Uyuyun, <br /> 
            Siteniz <span className="text-gradient">Satsın</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto text-2xl md:text-3xl text-white/40 leading-relaxed mb-20 font-light"
          >
            Yapay zeka destekli akıllı web siteleriyle müşteri kazanın, satışlarınızı otomatikleştirin ve işinizi büyütün. <span className="text-white/80 italic font-medium">Sizin için 7/24 çalışan dijital bir satış ordusu kuruyoruz.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-20 text-[16px] uppercase tracking-[0.3em] font-black text-white group cursor-default"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <ShieldCheck size={20} className="text-primary" /> 100% TEKNİK SERVİS GARANTİSİ
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a href="#contact" className="px-16 py-8 bg-white text-black rounded-[30px] font-black text-2xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
              Ücretsiz Strateji Analizi Al
            </a>
            <Link to="/pricing" className="px-16 py-8 bg-white/5 border border-white/10 text-white rounded-[30px] font-black text-2xl hover:bg-white/10 transition-all">
              Sistemleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Feature Grid (01, 02, 03) */}
      <section className="max-w-7xl mx-auto py-32 px-6 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-24">
          {[
            { id: "01", icon: <Globe size={32} />, title: "Ziyaretçi Çekin", desc: "SEO ve yapay zeka destekli içeriklerle hedef kitlenize anında ulaşın ve pazar payınızı artırın." },
            { id: "02", icon: <Rocket size={32} />, title: "Müşteriye Dönüştürün", desc: "Kusursuz kullanıcı deneyimi ve akıllı etkileşimlerle ziyaretçileri sadık müşterilere çevirin." },
            { id: "03", icon: <Zap size={32} />, title: "Otomatikleştirin", desc: "Tüm satış ve iletişim süreçlerinizi 7/24 çalışan, hata yapmayan akıllı sistemlere devredin." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-8 group">
              <div className="flex items-center gap-6">
                <span className="text-7xl font-black text-white/[0.03] group-hover:text-primary/10 transition-colors duration-700">{item.id}</span>
                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
              <p className="text-white/30 text-xl leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Benefit Cards Bento */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {benefits.map((benefit, i) => (
            <div key={i} className="bg-[#0f0f11] border border-white/5 p-14 rounded-[60px] hover:border-primary/20 transition-all duration-700 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-12 border border-white/10 group-hover:bg-primary transition-colors relative z-10">
                {benefit.icon}
              </div>
              <h3 className="text-4xl font-bold mb-6 tracking-tight relative z-10">{benefit.title}</h3>
              <p className="text-white/30 text-xl mb-12 leading-relaxed font-light relative z-10">{benefit.desc}</p>
              <div className="flex items-center gap-3 text-white/20 font-bold text-[12px] tracking-[0.3em] uppercase relative z-10">
                <CheckCircle2 size={16} className="text-primary" /> {benefit.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Layered System Power */}
      <section className="max-w-7xl mx-auto py-32 px-6 border-t border-white/5">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic">3 Katmanlı Sistem Gücü.</h2>
          <p className="text-white/30 text-2xl max-w-4xl mx-auto font-light leading-relaxed italic">
            Biz site yapıp kenara çekilmiyoruz; işinizi her açıdan koruyan ve büyüten profesyonel bir zırh inşa ediyoruz.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { layer: "TEK SEFERLİK", title: "1. Kurulum (Start)", desc: "Web mimarisi, AI entegrasyonu ve temel SEO altyapısının 2-12 gün içinde sıfırdan inşası." },
            { layer: "ZORUNLU SERVİS", title: "2. Yönetim (Manage)", desc: "12 ay boyunca hosting, güvenlik, teknik sigorta ve yapay zeka sağlığı takibi.", active: true },
            { layer: "STRATEJİK KATMAN", title: "3. Büyüme (Grow)", desc: "Google Ads, AI Lead Gen ve dönüşüm optimizasyonu ile kârınızı katlayan stratejik destek." }
          ].map((item, i) => (
            <div key={i} className={`p-14 rounded-[50px] border transition-all duration-700 ${item.active ? 'bg-white/5 border-primary/30 shadow-[0_30px_60px_rgba(168,85,247,0.1)]' : 'bg-transparent border-white/5'}`}>
              <span className="text-[11px] font-bold tracking-[0.4em] text-white/20 uppercase block mb-10">{item.layer}</span>
              <h4 className="text-3xl font-bold mb-6 tracking-tight">{item.title}</h4>
              <p className="text-white/30 text-xl leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Workflow Timeline */}
      <section className="max-w-7xl mx-auto py-32 px-6 border-t border-white/5">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic">Sisteminiz Nasıl Doğuyor?</h2>
          <p className="text-white/30 text-2xl max-w-4xl mx-auto font-light italic">Disiplinli mühendislik, hatasız kod ve kusursuz planlama ile hedefe giden yolculuk.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-20 text-center relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-white/5 z-0" />
          {[
            { id: "DAY 01", icon: <BarChart3 className="mx-auto mb-10 text-primary relative z-10" size={40} />, title: "Analiz & Plan", desc: "İş modelinizi ve rakiplerinizi analiz edip AI stratejinizi belirliyoruz." },
            { id: "DAY 03", icon: <Cpu className="mx-auto mb-10 text-primary relative z-10" size={40} />, title: "Mühendislik", desc: "Zırhlı kod yapısı ve AI modüllerini projenize entegre ediyoruz." },
            { id: "DAY 07", icon: <ShieldCheck className="mx-auto mb-10 text-primary relative z-10" size={40} />, title: "Test & Kalite", desc: "Lighthouse performans ve siber güvenlik taramalarını yapıyoruz." },
            { id: "DAY 10", icon: <Rocket className="mx-auto mb-10 text-primary relative z-10" size={40} />, title: "Lansman & Büyüme", desc: "Sistemi yayına alıp 7/24 satış yapacak şekilde devreye alıyoruz." }
          ].map((item, i) => (
            <div key={i} className="group relative z-10">
              <div className="mb-6 transform group-hover:-translate-y-3 transition-transform duration-700">{item.icon}</div>
              <span className="text-[12px] font-bold tracking-[0.5em] text-white/20 uppercase">{item.id}</span>
              <h4 className="text-2xl font-bold mt-4 mb-4 uppercase tracking-tighter">{item.title}</h4>
              <p className="text-white/30 text-lg leading-relaxed italic">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Philosophy Quote - Balanced Spacing */}
      <section className="max-w-6xl mx-auto py-48 px-6 text-center">
        <span className="text-[14px] font-bold tracking-[0.6em] text-white/20 uppercase block mb-16 underline decoration-primary underline-offset-[20px] decoration-4 leading-loose">NEDEN ALFA AI STUDİO?</span>
        <h2 className="text-5xl md:text-[90px] font-black leading-[1] tracking-tighter italic text-white group cursor-default">
          "Biz sadece kod yazmıyoruz; işinizi dijital bir <span className="text-gradient">satış makinesine</span> dönüştüren akıllı bir mimari inşa ediyoruz."
        </h2>
      </section>

      {/* 7. Security Deep-Dive Section */}
      <section className="max-w-7xl mx-auto py-32 px-6 border-t border-white/5">
        <div className="text-center mb-24">
          <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.4em] uppercase text-white/40 mb-12 inline-block">
            <ShieldAlert size={14} className="inline-block mr-2 text-primary" /> DİJİTAL ZIRH & GÜVENLİK
          </span>
          <h2 className="text-6xl md:text-9xl font-black mb-10 italic uppercase tracking-tighter">İşiniz Zırhlı Kodlarla Güvende.</h2>
          <p className="text-white/30 text-2xl max-w-4xl mx-auto font-light leading-relaxed italic">
            Siteniz sadece güzel görünmekle kalmaz; en sert dijital saldırılara karşı profesyonel bir kalkanla korunur.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Lock size={56} />, title: "Zırhlı Kod Yapısı", desc: "Hacking ve siber saldırılara karşı askeri düzeyde koruma sağlayan akıllı mimari." },
            { icon: <ShieldCheck size={56} />, title: "Veri Kalkanı", desc: "Müşteri bilgileriniz ve ticari sırlarınız uçtan uca şifreli, 100% güvenli depolanır." },
            { icon: <Activity size={56} />, title: "Anlık Sızma Testi", desc: "Sistemimiz her gün yapay zeka tarafından 1.000+ senaryo ile hack girişimlerine karşı taranır." }
          ].map((item, i) => (
            <div key={i} className="p-16 bg-[#0f0f11] border border-white/5 rounded-[60px] hover:border-primary/30 transition-all duration-700 group">
              <div className="mb-12 text-primary group-hover:scale-110 transition-transform duration-700 shadow-[0_0_30px_rgba(168,85,247,0.2)]">{item.icon}</div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">{item.title}</h3>
              <p className="text-white/30 text-xl leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Risk Management Section (RESTORED SYMMETRY) */}
      <section className="max-w-7xl mx-auto py-32 px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase italic">
              İşiniz Sadece Kodla Değil, <br />
              Sigorta ile Güvende.
            </h2>
            <p className="text-white/30 text-2xl mb-16 font-light leading-relaxed">
              İş ortaklığı ağımız üzerinden, dijital varlıklarınızı siber risklere karşı <span className="text-white font-bold underline decoration-primary underline-offset-8">poliçe kapsamına</span> alıyoruz.
            </p>
            <div className="space-y-10">
              {[
                { title: "Siber Risk Poliçesi", desc: "Veri sızıntısı, hacking ve dijital itibar suikastlerine karşı mali teminat." },
                { title: "İş Durması Teminatı", desc: "Olası teknik aksaklıklardan kaynaklanan gelir kaybını koruma altına alan çözümler." },
                { title: "Acente Danışmanlığı", desc: "Anlaşmalı acentelerimiz aracılığıyla projenize en uygun poliçenin hazırlanması." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8">
                  <CheckCircle2 size={28} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-3xl mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-white/20 text-xl italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="symmetric-frame bg-[#0f0f11] border-2 border-primary/20 rounded-[80px] p-24 text-center relative group overflow-hidden hover:border-primary/50 transition-all duration-700 shadow-[0_0_100px_rgba(168,85,247,0.05)]">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <ShieldCheck size={120} className="mx-auto mb-12 text-primary group-hover:scale-125 transition-transform duration-1000 shadow-2xl" />
               <h3 className="text-4xl font-black mb-8 leading-tight tracking-tight italic uppercase">ISO31000:2018 <br /> Risk Yönetimi</h3>
               <span className="text-[12px] font-bold tracking-[0.5em] text-white/20 uppercase font-mono">INSURANCE PARTNERSHIP</span>
               <div className="mt-16 pt-16 border-t border-white/10 text-[12px] font-bold text-white/30 tracking-[0.6em] italic uppercase font-mono">SİBER GÜVENCE PARTNERLİĞİ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Tech Service Section (RESTORED SYMMETRY & CARDS) */}
      <section className="max-w-7xl mx-auto py-32 px-6 border-t border-white/5">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase italic leading-[0.9]">
              Arabanızın Servisi Varsa, <br />
              Sitenizin de Olmalı.
            </h2>
            <p className="text-white/30 text-2xl mb-16 font-light leading-relaxed italic">İşletmenizin dijital motoruna tam kapsamlı "Satış Sonrası Ağır Bakım" sağlıyoruz.</p>
            <div className="grid sm:grid-cols-2 gap-10">
              {[
                { icon: <Zap />, title: "Alfa Dakik", desc: "Küçük revizyonlar için 60 dakikada müdahale sözü." },
                { icon: <Activity />, title: "Teknik Sigorta", desc: "12 ay zorunlu teknik bakım ve siber kalkan." },
                { icon: <Wrench />, title: "Yedek Parça", desc: "Gelecekteki her yeni AI modülü için hazır şasi." },
                { icon: <Cpu />, title: "Ağır Bakım", desc: "Sitenizin kod tabanını her yıl en yeni teknolojiye güncelliyoruz." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-8 p-14 bg-[#0f0f11] border border-white/5 rounded-[60px] hover:border-primary/50 transition-all duration-500 text-center items-center min-h-[480px] justify-center shadow-2xl group/card">
                   <div className="text-primary scale-[2.5] mb-12 lg:mb-16 group-hover/card:scale-[3] transition-transform duration-700">{item.icon}</div>
                   <h4 className="text-3xl font-black tracking-tight">{item.title}</h4>
                   <p className="text-white/20 text-lg leading-relaxed italic max-w-[240px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="symmetric-frame bg-[#0f0f11] border-2 border-primary/20 rounded-[80px] p-24 text-center relative group overflow-hidden hover:border-primary/50 transition-all duration-700 shadow-[0_0_100px_rgba(168,85,247,0.05)]">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <Wrench size={120} className="mx-auto mb-12 text-primary group-hover:rotate-[135deg] transition-transform duration-1000 shadow-2xl" />
               <h3 className="text-4xl font-black mb-8 leading-tight tracking-tight italic uppercase">Tam Yetkili <br /> Teknik Servis</h3>
               <span className="text-[12px] font-bold tracking-[0.5em] text-white/20 uppercase font-mono">ALFA AI STUDIO ASSURANCE</span>
               <div className="mt-16 pt-16 border-t border-white/10 text-[12px] font-bold text-white/30 tracking-[0.6em] italic uppercase font-mono">SERVİS GARANTİSİ SÖZLEŞMESİ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Pricing & Call to Action Stripe (RESTORED PIXEL PERFECT 1.jpg) */}
      <section className="max-w-7xl mx-auto py-24 px-6 mb-32">
        <div className="bg-[#111113] border border-white/5 rounded-[80px] p-20 md:p-32 relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-16 right-16 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Zap size={220} strokeWidth={1} />
          </div>
          
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic leading-none">Hemen Başlayalım mı?</h2>
            <p className="text-white/30 text-2xl max-w-4xl mx-auto font-light mb-20 italic">
              Sürpriz maliyetler yok. Teknik karmaşa yok. Sadece işinize odaklanan net servis paketleri.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 mb-24 items-center border-y border-white/5 py-24">
            {/* Column 1 */}
            <div className="text-center px-12 border-r border-white/5 last:border-0 h-full flex flex-col justify-center">
               <span className="text-[12px] font-mono font-bold tracking-[0.6em] text-white/20 uppercase block mb-8">KURULUM BAŞLANGICI</span>
               <div className="flex items-baseline justify-center gap-4">
                 <span className="text-7xl md:text-[110px] font-black text-white tracking-widest leading-none">6.999 ₺</span>
                 <span className="text-[16px] font-mono text-white/20 uppercase tracking-tighter font-black">+KDV /tek</span>
               </div>
            </div>
            
            {/* Column 2 */}
            <div className="text-center px-12 border-r border-white/5 last:border-0 h-full flex flex-col justify-center">
               <span className="text-[12px] font-mono font-bold tracking-[0.6em] text-white/20 uppercase block mb-8">YÖNETİM PAKETİ</span>
               <div className="flex items-baseline justify-center gap-4">
                 <span className="text-7xl md:text-[110px] font-black text-white tracking-widest leading-none">499 ₺</span>
                 <span className="text-[16px] font-mono text-white/20 uppercase tracking-tighter font-black">+KDV /ay</span>
               </div>
            </div>

            {/* Column 3 */}
            <div className="text-center px-12 flex flex-col justify-center h-full">
               <span className="text-[12px] font-mono font-bold tracking-[0.6em] text-white/20 uppercase block mb-8">HİZMET TAAHHÜDÜ</span>
               <div className="text-6xl md:text-[100px] font-black text-white mb-4 tracking-widest leading-none uppercase italic">12 AY</div>
               <span className="text-[14px] font-mono text-white/10 uppercase tracking-[0.4em] font-black italic">TEKNİK SİGORTA</span>
            </div>
          </div>

          <div className="text-center">
            <Link to="/pricing" className="inline-flex items-center gap-6 px-24 py-10 bg-white text-black font-black text-3xl rounded-[40px] hover:bg-primary hover:text-white transition-all transform hover:-translate-y-2 shadow-[0_30px_60px_rgba(255,255,255,0.1)] active:scale-95 duration-500">
              Servis Paketlerini İncele <ChevronRight size={32} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Contact Section (FINAL & DEFINITIVE VERSION) */}
      <section id="contact" className="max-w-7xl mx-auto py-24 px-6 mb-56">
        <div className="bg-[#0a0a0c] border border-purple-500/20 rounded-[100px] p-24 md:p-36 relative overflow-hidden group shadow-[0_0_150px_rgba(168,85,247,0.08)]">
          <div className="absolute -left-60 -top-60 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full group-hover:bg-primary/10 transition-all duration-1000 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="space-y-16">
              <h2 className="text-7xl md:text-[130px] font-black mb-12 tracking-tighter leading-[0.9] italic uppercase text-white shadow-primary/20">Bize Bir <br /> Mesaj <br /> Bırakın.</h2>
              <p className="text-white/30 text-3xl leading-relaxed mb-20 font-light max-w-2xl italic">
                Projenizi veya ihtiyacınızı yazın, en geç 24 saat içinde sizi arayıp teknik çözümümüzü sunalım.
              </p>
              <div className="flex flex-wrap gap-10">
                <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/10 text-[14px] font-black tracking-[0.4em] text-white/30 group/tag cursor-default hover:border-primary/50 transition-all uppercase italic">
                  <Zap size={18} className="text-primary animate-pulse" /> Hızlı Dönüş garantisi
                </div>
                <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/10 text-[14px] font-black tracking-[0.4em] text-white/30 group/tag cursor-default hover:border-primary/50 transition-all uppercase italic">
                  <ShieldCheck size={18} className="text-primary" /> Güvenli İletişim
                </div>
              </div>
            </div>
            
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-12 group/form">
              <div className="space-y-6">
                <input 
                  type="text" 
                  placeholder="İsim veya Firma Unvanı" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-[40px] px-12 py-10 text-3xl focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 font-bold tracking-tight"
                />
              </div>
              <div className="space-y-6">
                <input 
                  type="email" 
                  placeholder="E-posta Adresiniz" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-[40px] px-12 py-10 text-3xl focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all placeholder:text-white/10 font-bold tracking-tight"
                />
              </div>
              <div className="space-y-6">
                <textarea 
                  rows="6" 
                  placeholder="Nasıl yardımcı olabiliriz?" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-[40px] px-12 py-10 text-3xl focus:outline-none focus:border-primary/50 focus:bg-white/[0.04] transition-all resize-none placeholder:text-white/10 font-bold tracking-tight"
                />
              </div>
              <div className="text-center pt-12">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="text-white font-black text-6xl uppercase tracking-[0.2em] italic hover:text-primary transition-all duration-700 disabled:opacity-50 transform hover:scale-105 active:scale-95 drop-shadow-[0_20px_40px_rgba(168,85,247,0.3)]"
                >
                  {isSubmitting ? 'GÖNDERİLİYOR...' : 'Teklif Almak İstiyorum'}
                </button>
                <div className="mt-8 text-white/5 font-black uppercase text-xl tracking-[1em] animate-pulse">ALFA AI STUDIO</div>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
