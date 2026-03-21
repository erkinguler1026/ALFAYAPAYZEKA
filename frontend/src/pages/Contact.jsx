import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

/**
 * Contact — İletişim Sayfası Bileşeni
 *
 * Kullanıcılara iletişim formu aracılığıyla mesaj gönderme imkânı sunar.
 *
 * State:
 *   - formData     : { name, email, message } — form alanlarını tutar.
 *   - isSubmitting : Form POST isteği süresince butonu devre dışı bırakır.
 *
 * İşleyiciler:
 *   - handleSubmit : e.preventDefault() ile sayfa yenilenmeden fetch() ile
 *                   backend'e (POST /api/contact) veri gönderir.
 *                   Başarıda → toast.success, hata durumunda → toast.error.
 *   - handleChange : Gerçek zamanlı olarak formData state'ini günceller.
 *
 * Sayfa yapısı (2 sütun):
 *   Sol  → Şirket bilgileri (e-posta, telefon, adres) — ContactInfoItem bileşeni.
 *   Sağ  → Glass-morphism stilli form kartı.
 *
 * Alt bileşen:
 *   <ContactInfoItem> → Her iletişim bilgisi satırını (ikon + başlık + içerik)
 *                       hover animasyonuyla gösterir.
 *
 * NOT: Bu sayfa fetch() API kullanır. Home.jsx iletişim formu ise axios kullanır.
 *      İkisi de aynı /api/contact endpoint'ine bağlanır.
 */
const Contact = () => {
  useEffect(() => {
    console.log("Contact Page Mounted - Premium Version");
    document.title = 'İletişim | Alfa Yapay Zeka — Bursa Web Tasarım & Siber Güvenlik';
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Mesajınız başarıyla iletildi!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Sunucu bağlantı hatası.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent normal tracking-tighter uppercase leading-tight">
                BİZE ULAŞIN<span className="text-primary">.</span>
              </h1>
              <p className="text-white/50 text-lg leading-relaxed max-w-md font-light">
                Yapay zeka devrimini firmanıza taşımak veya aklınızdaki projeyi hayata geçirmek için buradayız. Formu doldurun, 48 saat içinde dönüş yapalım.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <ContactInfoItem icon={<Mail size={20} className="text-primary" />} title="E-posta" content="info@alfayapayzeka.com" />
              <ContactInfoItem icon={<Phone size={20} className="text-primary" />} title="Telefon" content="+90 (532) 466 30 76" />
              <ContactInfoItem icon={<MapPin size={20} className="text-primary" />} title="Ofis" content="Esentepe Mah. Gürler Cad. Akayya Sok. Evşenkent Sitesi C Blok. No:3/C 16130 Nilüfer, Bursa Türkiye" />
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-morphism p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group shadow-2xl shadow-primary/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Ad Soyad</label>
                  <div className="relative group/input">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-primary transition-colors" />
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Erkin GÜLER"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Email Adresi</label>
                  <div className="relative group/input">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/input:text-primary transition-colors" />
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@mail.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Mesajınız</label>
                <div className="relative group/input">
                  <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-white/20 group-focus-within/input:text-primary transition-colors" />
                  <textarea 
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projenizden bahsedin..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10 resize-none"
                  />
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="kvkk_consent" 
                    required 
                    className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary accent-primary cursor-pointer" 
                  />
                  <label htmlFor="kvkk_consent" className="text-[12px] text-white/30 leading-relaxed cursor-pointer select-none">
                    <Link to="/kvkk" className="text-white/60 hover:text-white underline font-medium">KVKK Aydınlatma Metni</Link>'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                  </label>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    MESAJI GÖNDER
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Google Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={18} className="text-primary" />
            <span className="text-white/50 text-sm font-bold uppercase tracking-widest">Ofisimize Ulaşın</span>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5 group hover:border-primary/30 transition-all duration-500">
            {/* Subtle color overlay to match dark theme */}
            <div className="absolute inset-0 bg-primary/5 pointer-events-none z-10 mix-blend-multiply" />
            <iframe
              title="Alfa Yapay Zeka - Ofis Konumu"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.798!2d28.9752!3d40.2176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDEzJzAzLjQiTiAyOMKwNTgnMzAuNyJF!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str&q=Esentepe+Mah.+G%C3%BCrler+Cad.+Akayya+Sok.+Ev%C5%9Fenkent+Sitesi+C+Blok+No:3%2FC+Nil%C3%BCfer+Bursa+T%C3%BCrkiye"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-white/20 text-xs text-center mt-4 tracking-wide">
            Esentepe Mah. Gürler Cad. Akayya Sok. Evşenkent Sitesi C Blok. No:3/C 16130 Nilüfer, Bursa
          </p>
        </motion.div>

      </div>
    </div>
  );
};

const ContactInfoItem = ({ icon, title, content }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="flex items-center gap-5 group cursor-default"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest font-black text-white/30">{title}</span>
      <span className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">{content}</span>
    </div>
  </motion.div>
);

export default Contact;
