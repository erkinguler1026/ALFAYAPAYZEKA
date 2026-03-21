import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ChevronRight, BarChart3, Lock, Zap, CheckCircle2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const WebRisk = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Web-Risk Raporu & Güvenlik Analizi | Alfa Yapay Zeka';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Note: Backend endpoint should handle this with "Web-Risk Talebi" tag logic
      await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/contact`, {
        ...formData,
        subject: 'TEMEL WEB-RİSK Analizi Talebi',
        type: 'web-risk'
      });
      toast.success('Analiz talebiniz başarıyla alındı! Teknik ekibimiz 24 saat içinde sizinle iletişime geçecektir.');
      setFormData({ name: '', email: '', website: '', company: '', message: '' });
    } catch {
      toast.error('Talep gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest mb-8">
              <ShieldAlert size={14} className="animate-pulse" /> Siber Risk Analizi
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
              Web Siteniz <br /> <span className="text-red-500">Ne Kadar</span> <br /> Güvende?
            </h1>
            <p className="text-xl text-white/50 font-light leading-relaxed mb-12 max-w-xl">
              Görünmeyen açıklar, SEO hataları ve performans darboğazları işletmenize her gün zarar veriyor olabilir. 
              Yapay zeka destekli <strong>TEMEL WEB-RİSK RAPORU</strong> ile gerçek durumu görün.
            </p>

            <div className="space-y-6">
              {[
                { title: "Penetrasyon Analizi", desc: "Hackerların kullanabileceği giriş noktalarını tespit ediyoruz." },
                { title: "SEO Uyumluluk Skoru", desc: "Google aramalarında neden geride olduğunuzun teknik kanıtları." },
                { title: "Performans & Hız Teşhisi", desc: "Ziyaretçi kaybına neden olan yükleme darboğazları." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-red-500/20 transition-all">
                  <div className="p-3 h-fit bg-red-500/10 rounded-xl text-red-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-10 md:p-16 rounded-[40px] border border-white/10 shadow-2xl relative"
          >
            <div className="absolute -top-6 -right-6 p-6 bg-red-500 text-white rounded-3xl font-black text-xl shadow-xl rotate-12">
              ÜCRETSİZ <br /> ÖN İNCELEME
            </div>
            
            <h3 className="text-3xl font-bold mb-8">Analiz Talebi Oluştur</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-4">İsim & Soyisim</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all" 
                    placeholder="Adınız"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-4">E-posta</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all" 
                    placeholder="ornek@firma.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-4">İncelenecek Web Adresi</label>
                <input 
                  required 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all" 
                  placeholder="https://www.siteniz.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-4">Şirket Unvanı</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all" 
                  placeholder="X Ticaret Ltd. Şti."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30 ml-4">Ek Notlar</label>
                <textarea 
                  rows="3" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500/50 transition-all resize-none" 
                  placeholder="Analiz için özel olarak belirtmek istediğiniz bir konu var mı?"
                />
              </div>

              <div className="flex items-start gap-3 px-2">
                <input 
                  type="checkbox" 
                  id="kvkk_webrisk" 
                  required 
                  className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-red-500 focus:ring-red-500 accent-red-600" 
                />
                <label htmlFor="kvkk_webrisk" className="text-sm text-white/40 leading-relaxed cursor-pointer">
                  <Link to="/kvkk" className="text-white/60 hover:text-white underline font-medium">KVKK Aydınlatma Metni</Link>'ni okudum ve verilerimin işlenmesini kabul ediyorum.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'ANALİZ TALEBİNİ GÖNDER'} <Send size={20} />
              </button>
              
              <p className="text-[10px] text-white/20 text-center uppercase tracking-widest font-bold">
                * Bu form ile iletilen veriler <Link to="/kvkk" className="text-white/40 hover:text-white underline">KVKK Aydınlatma Metni</Link> kapsamında işlenmektedir.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WebRisk;
