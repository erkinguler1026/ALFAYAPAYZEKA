import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

/**
 * Footer Bileşeni — Alt Bilgi ve Navigasyon
 *
 * Versiyon: V1.3.1
 * 
 * Özellikler:
 *   - SPA Uyumu: Tüm navigasyon Link bileşenleri ile sayfa yenilenmeden yapılır.
 *   - Logo Linkleme: Ajans logosu ve ismi ana sayfaya (/) yönlendirir.
 *   - Responsive: Mobil ekranlarda daraltılmış padding (py-16) kullanılır.
 */
const Footer = () => {
  return (
    <footer className="py-16 md:py-32 px-6 border-t border-white/5 relative z-10 bg-gradient-to-br from-[#050505] to-purple-700/20 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-16 md:mb-32">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-4 mb-8 group cursor-pointer w-fit">
              <Bot className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="font-black text-2xl tracking-tighter uppercase text-white group-hover:text-primary transition-colors">ALFA YAPAY ZEKA</span>
            </Link>
            <p className="text-white/30 text-base leading-relaxed font-light mb-3">
              Siber Tehditlere Kapalı, Müşterilere Açık — İşte Web Siteniz
            </p>
            <p className="text-white/20 text-sm leading-relaxed font-light">
              Hackerlara karşı zırhlanmış, 7/24 satışa açık dijital sistemler kuruyoruz.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-24 text-[13px] font-bold tracking-widest uppercase text-white/40">
            <div className="flex flex-col gap-6">
              <span className="text-white text-[11px] tracking-[0.4em] mb-2">Platform</span>
              <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolyo</Link>
              <Link to="/pricing" className="hover:text-primary transition-colors">Fiyatlandırma</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white text-[11px] tracking-[0.4em] mb-2">Şirket</span>
              <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
              <Link to="/about" className="hover:text-primary transition-colors">Hakkımızda</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">İletişim</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-white text-[11px] tracking-[0.4em] mb-2">Sosyal</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase tracking-widest">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold tracking-[0.3em] text-white/20 uppercase">
          <span>© 2026 ALFA YAPAY ZEKA AJANSI — Siber Tehditlere Kapalı, Müşterilere Açık.</span>
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-end">
            <Link to="/privacy" className="hover:text-white transition-colors cursor-pointer">GİZLİLİK POLİTİKASI</Link>
            <Link to="/terms" className="hover:text-white transition-colors cursor-pointer">KULLANIM ŞARTLARI</Link>
            <Link to="/kvkk" className="hover:text-white transition-colors cursor-pointer">KVKK AYDINLATMA</Link>
            <Link to="/cookie" className="hover:text-white transition-colors cursor-pointer">ÇEREZ POLİTİKASI</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
